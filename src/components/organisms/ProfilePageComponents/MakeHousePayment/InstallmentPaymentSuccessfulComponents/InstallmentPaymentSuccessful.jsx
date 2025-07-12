import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addCoAppSuccessfulStyles } from './PaymentSuccessful.styles';
import { InstallmentSliceSelector, clearInstallmentTransData, clearInstallmentTransState, clearTransDetailData, clearTransDetailState, installmentTransDetail } from '../../../../../redux/features/installments/installmentSlice';
import AlertBox from '../../../../atoms/AlertBox/AlertBox';
import { ApiEndPoint } from '../../../../../utils/Common';
import PaymentSecCard from '../../../../molecules/Cards/PaymentSecCard/PaymentSecCard';
import Loading from '../../../../atoms/Loading/Loading';
import { DownloadPrimaryIcon, PaymentFailedIcon, PaymentSuccessfullIcon } from '../../../../atoms/SvgIcons/SvgIcons';

const InstallmentPaymentSuccessful = () => {
  const classes = addCoAppSuccessfulStyles();
  const [orderStatus, setOrderStatus] = useState("success");
  const { t } = useTranslation("SuccessDetailsPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [pdfLoading, setPdfLoading] = useState(false);
  const { isFetchingTransDetail,
    isSuccessTransDetail,
    isErrorTransDetail,
    errorMessageTransDetail,
    transDetailData } = useSelector(InstallmentSliceSelector);

  useEffect(() => {
    const search = window.location.search;
    const transId = new URLSearchParams(search).get("transId");

    if (transId !== null) {
      dispatch(installmentTransDetail({
        Lang: localStorage.getItem('i18nextLng'),
        TransId: transId
      }));
    };

    if (window.location.pathname == "/installment-payment-failed") {
      setOrderStatus("failed");
    }
  }, []);

  useEffect(() => {
    if (isSuccessTransDetail) {
      setPaymentInfo(transDetailData);
      dispatch(clearInstallmentTransState());
      dispatch(clearInstallmentTransData());
    }
  }, [isSuccessTransDetail]);

  useEffect(() => {
    return () => {
      dispatch(clearTransDetailState());
      dispatch(clearTransDetailData());
    };
  }, [])

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val)
      ? "0"
      : amount_val.toString().split(".")[0].length > 3
        ? amount_val
          .toString()
          .substring(0, amount_val.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        amount_val
          .toString()
          .substring(amount_val.toString().split(".")[0].length - 3)
        : amount_val.toString();
  };

  const getTransactionPdf = (val) => {
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/InstallmentsTransactions/applicationTransactionPaymentReceiptPdf/${localStorage.getItem('applicantId')}?installment_id=${paymentInfo.InstallmentId}`;
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((response) => response.blob()).then((blob) => {
      setPdfLoading(false);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = paymentInfo.TransactionId + "-Receipt";
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
      setPdfLoading(false);
      alert(error, "Transaction not found",);
    });
  };

  return (
    <React.Fragment>
      <PaymentSecCard>
        {isFetchingTransDetail || pdfLoading && (
          <Loading isOpen={isFetchingTransDetail || pdfLoading} />
        )}
        <div className={classes.container}>
          {isErrorTransDetail && <AlertBox severity='error' style={{ margin: 8 }}>{errorMessageTransDetail}</AlertBox>}
          {orderStatus == "success" && (
            <Box>
              <Box className={classes.cardHeader}>
                <Typography className={classes.successIcon}>
                  <PaymentSuccessfullIcon />
                </Typography>
                <Typography variant="h5" className={classes.pageTitle}>
                  {t('paymentSuccessPage.title')}
                </Typography>
                <Typography className={classes.subTitleTxt}>
                  Payment for {paymentInfo.Name ? paymentInfo.Name : "installment"} is successful. Check your email for receipt. If not found, check spam folder or contact support.&nbsp;
                  <br />
                  <span>
                    {paymentInfo?.CreatedAt
                      ? "on " +
                      moment(paymentInfo?.CreatedAt).format("MMM DD, h:mm a")
                      : "--"}
                  </span>
                </Typography>
              </Box>

              <Box className={classes.scratchLine}>
                <span></span>
                <Divider className={classes.dividerCell} />
                <span className="last"></span>
              </Box>
              <Box className={classes.dataContainer}>
                <Typography className={classes.invoiceTitle}>
                  -- {t("paymentSuccessPage.paymentInvoiceTitleTxt")} --
                </Typography>
                <Box className={classes.dataViewBox}>
                  <Grid container>
                    <Grid item md xs={12}>
                      <Typography variant="body1" className="title">
                        {t("bankNameLabel")}
                      </Typography>
                      <Typography variant="body1" className="valueView">

                        <img src={paymentInfo?.BankIcon} alt="logo" />
                        <span>{paymentInfo?.BankName || "--"}</span>
                      </Typography>
                    </Grid>
                    {/* <Grid item md={4} xs={12}>
                      <Typography variant="body1" className="title">
                        {t("From Account")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        <span>{"xxxx xxxx xxxx"}</span>
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Box>
                {/* <Divider /> */}
                <Box className={classes.dataViewBox}>
                  <Grid container>
                    <Grid item md xs={12}>
                      <Typography variant="body1" className="title">
                        {t("transactionIdLabel")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        {paymentInfo?.TransactionId ||
                          paymentInfo?.TransId ||
                          "--"}
                      </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Typography variant="body1" className="title">
                        {t("paymentMethod")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        {paymentInfo?.Method || "online"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Divider className={classes.dividerCell} />
              <Grid
                container
                justify="space-between"
                className={classes.totalSection}
              >
                <Grid item xs={6}>
                  <Grid container direction="column">
                    <Typography className={classes.totalAmtLabel}>
                      {t("totalAmountLabel")}
                    </Typography>
                    <Typography className={classes.totalAmtLabel} style={{ color: "#4C5D6C", }}>
                      (Including GST @1%)
                    </Typography>
                    {/* <Typography className={classes.totalAmtLabel} style={{ color: "#4C5D6C", }}>
                      {t("paymentSuccessPage.gstTxt")}
                    </Typography> */}
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="right">
                    <Typography className={classes.totalAmtView}>
                      ₹{" "}
                      {paymentInfo?.totalAmount
                        ? numberWithCommas(paymentInfo?.totalIncludingGst)
                        : "--"}
                    </Typography>
                    <Typography className={classes.totalAmtViewInWord}>
                      {paymentInfo?.totalIncludingGstWords || ""}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider className={classes.dividerCell} />
              <Grid container alignItems="center" justifyContent="space-between" textAlign="center" style={{ padding: "20px 40px" }}>
                <Button
                  startIcon={<DownloadPrimaryIcon />}
                  onClick={getTransactionPdf}
                  color='primary'
                >
                  {t('paymentSuccessPage.downloadReceiptBtn')}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => history.push("/make-house-payment")}
                >
                  {t("Go to intallments")}
                </Button>
              </Grid>
            </Box>
          )}
          {orderStatus == "failed" && (
            <Box>
              <Box className={classes.cardHeader}>
                <Typography className={classes.successIcon}>
                  <PaymentFailedIcon />
                </Typography>
                <Typography variant="h5" className={classes.pageTitle}>
                  {t("paymentFailedPage.title")}
                </Typography>
                <Typography className={classes.subTitleTxt}>
                  {/* {t("paymentFailedPage.description")} */}
                  {paymentInfo?.SuccessFailReason}
                  <br />
                  <span>
                    {paymentInfo?.CreatedAt
                      ? "on " +
                      moment(paymentInfo?.CreatedAt).format("MMM DD, h:mm a")
                      : "--"}
                  </span>
                </Typography>
                <Box textAlign="center">
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.failedBtn}
                    onClick={() => history.push("/make-house-payment")}
                  >
                    {t("paymentFailedPage.tryAgainBtn")}
                  </Button>
                </Box>
              </Box>
              <Box className={classes.scratchLine}>
                <span></span>
                <Divider className={classes.dividerCell} />
                <span className="last"></span>
              </Box>
              <Box className={classes.dataContainer}>
                <Box className={classes.dataViewBox}>
                  <Grid container>
                    <Grid item md xs={12}>
                      <Typography variant="body1" className="title">
                        {t("bankNameLabel")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        {/* <img src={sbiLogo} alt="logo" />
                        <span>State Bank of Maharashtra</span> */}
                        {/* <img src={sbiLogo} alt="logo" /> */}
                        <img src={paymentInfo?.BankIcon} alt="logo" />
                        <span>{paymentInfo?.BankName || "--"}</span>
                      </Typography>
                    </Grid>
                    {/* <Grid item md={4} xs={12}>
                      <Typography variant="body1" className="title">
                        {t("fromAccountLabel")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        <span>{paymentInfo?.AccountNumber || "--"}</span>
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Box>
                <Box className={classes.dataViewBox}>
                  <Grid container>
                    <Grid item md xs={12}>
                      <Typography variant="body1" className="title">
                        {t("transactionIdLabel")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        {paymentInfo?.TransactionId || "--"}
                      </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Typography variant="body1" className="title">
                        {t("paymentMethod")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        {paymentInfo?.Method || "online"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Divider className={classes.dividerCell} />
              <Grid
                container
                justify="space-between"
                className={classes.totalSection}
              >
                <Grid item xs={6}>
                  <Typography className={classes.totalAmtLabel}>
                    {t("totalAmountLabel")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="right">
                    <Typography className={`${classes.totalAmtView} failed`}>
                      ₹{" "}
                      {paymentInfo?.totalAmount
                        ? numberWithCommas(paymentInfo?.totalAmount)
                        : "--"}
                    </Typography>
                    <Typography className={classes.totalAmtViewInWord}>
                      {paymentInfo?.AmountWords || ""}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      </PaymentSecCard>
    </React.Fragment>
  )
}

export default InstallmentPaymentSuccessful