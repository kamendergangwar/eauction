import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Loading from "../../../atoms/Loading/Loading";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ProfileWrap from "../ProfileWrap/ProfileWrap";
import CloseIcon from "@material-ui/icons/Close";
import {
  MenuTransactionDtlsIcon,
  DialogBackArrowIcon,
  DownloadPrimaryIcon,
  TransSuccessIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { TransactionDetailsStyles } from "./TransactionDetails.style";
import {
  getPendingTransDetail,
  getReciptDetails,
  getTransaction,
  getTransactionDetails,
  myProfileSelector,
} from "../../../../redux/features/myProfile/MyProfileSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../redux/features/preferences/PreferencesSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import { ApiEndPoint } from "../../../../utils/Common";
import DarkLogo from "../../../../assets/DarkLogo.svg";
import { applicantSelector, getApplicant } from "../../../../redux/features/applicant/ApplicantSlice";
import TrnsnsactionDetailsReciptDialog from "./TrnsnsactionDetailsReciptDialog";
import { Badge } from "@material-ui/core";
import PendingTransactionDetail from "./PendingTransaction/PendingTransactionDetail";

function TransactionDetails(props) {
  const classes = TransactionDetailsStyles();
  const { t } = useTranslation("ProfilePageTrans");
  const [open, setOpen] = React.useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState([]);
  const [transactionSummary, setTransactionSummary] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [applicationFee, setApplicationFee] = useState({});
  const [transactionScreen, setTransactionScreen] = useState(1);
  const [pendingTransData, setPendingTransData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    applicationTransaction,
    isSuccessTransaction,
    isSuccessTransactionDetail,
    isFetchingTransaction,

    isFetchingTransactionDetail,
    applicationTransactionDetail,
    isSuccessReciptDetail,
    isFetchingReciptDetail,
    applicationReciptDetail,

    isSuccessPendingTransDetail,
    isFetchingPendingTransDetail,
    isErrorPendingTransDetail,
    errorMsgPendingTransDetail,
    pendingTransDetail,
  } = useSelector(myProfileSelector);

  const {
    isFetchingApplicantGet,
    applicantData,
    isSuccessResApplicantGet,
    isErrorApplicantGet,
    errorMessageGet
  } = useSelector(applicantSelector)
  const {
    isSuccessResGetPreferences
  } = useSelector(preferencesSelector);
  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );

  const handleClickOpen = (data) => {
    // console.log(data, "data");
    if (data?.TransactionReferenceNo) {
      setTransactionDetail(data);
      dispatch(getTransactionDetails(data));
      dispatch(getReciptDetails(data));
      setOpen(true);
    } else {
      alert("No transaction Reference no. avaiable on transaction!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getStepperDetails());
    dispatch(getApplicant());
    dispatch(getTransaction());
    dispatch(getPendingTransDetail());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessPendingTransDetail && pendingTransData) {
      setPendingTransData(pendingTransDetail);
    }
  }, [isSuccessPendingTransDetail, pendingTransDetail])

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
            if (item.applicantKycStepper[1].status != "completed") {
              pageUrl = "/verify-pancard";
            }
          }
        }

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }

      })
      history.push(pageUrl)
    }
  }, [isSuccessResStepper])

  useEffect(() => {
    if (applicationTransaction && isSuccessTransaction) {
      setTransactionData(applicationTransaction);
    }
  }, [isSuccessTransaction, applicationTransaction]);

  useEffect(() => {
    if (isSuccessResApplicantGet && applicantData) {
      setApplicationFee(applicantData.twoThousandPaymentDetails[0])
    }
  }, [isSuccessResApplicantGet, applicantData]);

  useEffect(() => {
    if (isSuccessTransactionDetail && applicationTransactionDetail) {
      setTransactionSummary(applicationTransactionDetail);
    }
  }, [isSuccessTransactionDetail, applicationTransactionDetail]);

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

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      dispatch(clearPreferencesState());
    }
  }, [isSuccessResGetPreferences])

  const getTransactionDetailsPdf = (val) => {
    dispatch(getPreferencesList()).then(res => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/PDFDownloader/receipt/${val.TransactionId}?Lang=${localStorage.getItem('i18nextLng')}&gateway=${val.PaymentGateway}`;
        fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }).then((response) => response.blob()).then((blob) => {
          setPdfLoading(false);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = val.TransactionId + '-Transaction';
          document.body.append(link);
          link.click();
          link.remove();
          // in case the Blob uses a lot of memory
          setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(function (error) {
          setPdfLoading(false);
          alert("Transaction not found");
        });
      }

    });
  };

  const getNocTransactionDetailsPdf = (val) => {
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/NocTransaction/nocTransactionPaymentReceiptPdf/${localStorage.getItem('applicantId')}?TransId=${val.TransactionId}`;
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((response) => response.blob()).then((blob) => {
      setPdfLoading(false);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = val.TransactionId + '-Transaction';
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
      setPdfLoading(false);
      alert("Transaction not found");
    });
  };

  const getApplicationTrans = () => {
    dispatch(getPreferencesList()).then((res) => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/ApplicationTransaction/applicationTransactionPaymentReceiptPdf/${localStorage.getItem("applicantId")}?Lang=${localStorage.getItem("i18nextLng")}`;
        fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            setPdfLoading(false);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Application Fee" + "Receipt";
            document.body.append(link);
            link.click();
            link.remove();
            // in case the Blob uses a lot of memory
            setTimeout(() => URL.revokeObjectURL(link.href), 300);
          })
          .catch(function (error) {
            setPdfLoading(false);
            alert("Transaction not found");
          });
      }
    });
  };

  return (
    <ProfileWrap>
      {(isFetchingTransaction || isFetchingTransactionDetail || isFetchingApplicantGet || isFetchingReciptDetail || isFetchingPendingTransDetail) && (
        <Loading isOpen={isFetchingTransaction || isFetchingTransactionDetail || isFetchingApplicantGet || isFetchingReciptDetail || isFetchingPendingTransDetail} />
      )}
      {pdfLoading && (
        <Loading isOpen={pdfLoading} />
      )}
      {transactionScreen == 1 && <div className={classes.profileContainer}>
        <Box paddingBottom={2} display='flex' justifyContent='space-between'>
          <Typography variant="h4">{t("transactionDetails.title")}</Typography>
          {/* <Typography>
          {t("transactionDetails.subTitle")}
          </Typography> */}
          <Badge color="error" badgeContent={pendingTransData.length} invisible={pendingTransData.length === 0} max={99}>
            <Button variant="outlined" color="primary" size='small' onClick={() => setTransactionScreen(2)}>Pending Transactions</Button>
          </Badge>
        </Box>
        <Divider />
        <Box className={classes.translationContainer}>
          {transactionData.map((item, index) =>
            <Box className={classes.tranWrapper} key={index}>
              <Typography className={classes.transDate}>
                {moment(item.CreatedAt).format("Do MMM, h:mm a")}
              </Typography>
              <Box className={classes.tranCard}>
                <Box className={classes.cardHeader}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Box className="headerleft">
                        <MenuTransactionDtlsIcon />
                        <Typography className={classes.TranIDTxt}>
                          {t(
                            "transactionDetails.transactionCards.transactionDetailsModel.receiptNumber"
                          )} : <span className={`${classes.primaryColor} IDValue`}>{item.FlatDetails[0]?.SBIReferenceNumber ? `${item.FlatDetails[0]?.SBIReferenceNumber}` : "--"}</span>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={classes.headerRight}>
                        <Typography className="transTxt">
                          {item.PaymentStatus === "1" &&
                            <>
                              <TransSuccessIcon />
                              <span className="transactionPass">
                                {t(
                                  "transactionDetails.transactionCards.transactionSuccessStatus"
                                )}
                              </span>
                            </>
                          }
                          {item.PaymentStatus === "2" &&
                            <span className="transactionFail">
                              {t(
                                "transactionDetails.transactionCards.transactionFailedStatus"
                              )}
                            </span>
                          }
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box className={classes.cardBody}>
                  <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      padding={0}
                      className={classes.borderDashed}
                    >
                      {/* <Box className={classes.bankDetails}>
                        <Typography className={classes.accountTxt}>
                          {t(
                            "transactionDetails.transactionCards.fromBankACNoLabel"
                          )}{" "}
                          {item.AccountNumber || "--"}{" "}
                          <span className="tranDate">
                            {moment(item.CreatedAt).format("Do MMM, h:mm a")}
                          </span>
                        </Typography>
                      </Box> */}
                      <Box className={classes.bankDetails}>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionlabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={7}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {item.TransactionId ? `${item.TransactionId}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.apnNoLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={7}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {item.FlatDetails[0]?.UniqId ? `#${item.FlatDetails[0]?.UniqId}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.projectLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={7}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {item.FlatDetails[0]?.ProjectName || "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={3}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.categorylabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={7}>
                            {item?.FlatDetails[0] != undefined && <Box className={classes.categoryTag}>
                              {item?.FlatDetails[0]?.ReservationCategory}
                            </Box>}
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={classes.paymentDetails}>
                        {item.LoanApplied === 1 &&
                          <Grid item xs={12} md={12}>
                            <Grid
                              container
                              alignItems="center"
                              justify="flex-end"
                            >
                              <Grid item xs={12} sm={6}>
                                <Box display={"flex"} alignItems="center">
                                  <Typography
                                    className={classes.loadAmountTxt}
                                  >
                                    {t(
                                      "transactionDetails.transactionCards.loanStatusLabel"
                                    )}
                                  </Typography>
                                  <img src={item.LoanAppliedFrom.BankLogo} alt="Bank Logo" className={`${classes.bankLogo} emdLoad`} />
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <Typography
                                    className={classes.loadAmountVal}
                                  >
                                    ₹ {item.LoanAmount ? numberWithCommas(item.LoanAmount) : "--"}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        }
                        <Grid item xs={12} zeroMinWidth>
                          <Grid
                            container
                            alignItems="center"
                            justify="flex-end"
                          >
                            <Grid item xs={12} sm={6}>
                              <Box padding={1.5}>
                                <Typography
                                  className={classes.paidAmountTxt}
                                >
                                  {t(
                                    "transactionDetails.transactionCards.paidAmountLabel"
                                  )}{" "}
                                  :{" "}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <Typography
                                  className={classes.paidAmountVal}
                                >
                                  ₹ {item.TotalAmountPaid ? numberWithCommas(item.TotalAmountPaid) : "--"}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid container alignItems="center" justify="flex-end">
                            <Grid item xs={12} sm={6}>
                              <Box padding={1.5}>
                                <Typography
                                  className={classes.paidAmountTxt}
                                >
                                  {t("transactionDetails.transactionCards.sentFromLabel")}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {/* <Box>
                                <Typography
                                  className={classes.paidAmountVal}
                                >
                                  ₹ {item.TotalAmountPaid ? numberWithCommas(item.TotalAmountPaid) : "--"}
                                </Typography>
                              </Box> */}
                              <img src={item.BankIcon} alt="Bank Logo" className={classes.bankLogo} />
                              <Typography className="bankNameTxt">
                                {item.BankName || "--"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Hidden smDown>
                  <Box className={classes.cardFooter}>
                    <Grid
                      container
                      spacing={3}
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item xs={12} sm={8}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justify="space-between"
                        >
                          <Typography
                            className={classes.TranIDTxt}
                            display="inline"
                          >
                            {t(
                              "transactionDetails.transactionCards.PaymentForLabel"
                            )}{" "}
                            {" "}
                            <span className="IDValue">
                              {/* {item.totalApplication || "--"}{" "} */}
                              {/* {t(
                                "transactionDetails.transactionCards.applicationsCount"
                              )} */}
                              {t(
                                "transactionDetails.transactionCards.bookingAmtTxt"
                              )}
                            </span>
                          </Typography>
                          <Button
                            className="viewDetailBtn"
                            onClick={() => handleClickOpen(item)}
                          >
                            {t(
                              "transactionDetails.transactionCards.applicationsViewDetailBtn"
                            )}
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Grid container alignItems="center" justify="flex-end">
                          <Button
                            className={classes.downloadBtn}
                            startIcon={<DownloadPrimaryIcon />}
                            onClick={() => getTransactionDetailsPdf(item)}
                          >
                            {t(
                              "transactionDetails.transactionCards.downloadReceipt"
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Hidden>

                <Hidden mdUp>
                  <Box className={classes.cardFooter}>
                    <Box paddingY={2} paddingX={2}>
                      <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                      >
                        <Grid item>
                          <Typography className={classes.TranIDTxt}>
                            {t(
                              "transactionDetails.transactionCards.PaymentForLabel"
                            )}{" "}
                            :{" "}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.TranIDTxt}>
                            <span className="IDValue">
                              {item.totalApplication || "--"}{" "}
                              {t(
                                "transactionDetails.transactionCards.applicationsCount"
                              )}
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={classes.cardFooter}>
                    <Box paddingY={1} paddingX={2}>
                      <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                      >
                        <Grid item>
                          <Button
                            className="viewDetailBtn viewBtn"
                            onClick={() => handleClickOpen(item)}
                          >
                            {t(
                              "transactionDetails.transactionCards.applicationsViewDetailBtn"
                            )}
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.downloadBtn}
                            startIcon={<DownloadPrimaryIcon />}
                          >
                            {t(
                              "transactionDetails.transactionCards.downloadReceipt"
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Hidden>
              </Box>
            </Box>
          )}
          {applicationFee && <Box className={classes.tranWrapper} >
            <Typography className={classes.transDate}>
              {moment(applicationFee.CreatedOn).format("Do MMM, h:mm a")}
            </Typography>
            <Box className={classes.tranCard}>
              <Box className={classes.cardHeader}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Box className="headerleft">
                      <MenuTransactionDtlsIcon />
                      <Typography className={classes.TranIDTxt}>
                        {t(
                          "transactionDetails.transactionCards.transactionDetailsModel.receiptNumber"
                        )} : <span className={`${classes.primaryColor} IDValue`}>{applicationFee.SBIReferenceNumber || "--"}</span>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={classes.headerRight}>
                      <Typography className="transTxt">
                        {applicationFee.PaymentStatus === "1" &&
                          <>
                            <TransSuccessIcon />
                            <span className="transactionPass">
                              {t(
                                "transactionDetails.transactionCards.transactionSuccessStatus"
                              )}
                            </span>
                          </>
                        }
                        {applicationFee.PaymentStatus === "2" &&
                          <span className="transactionFail">
                            {t(
                              "transactionDetails.transactionCards.transactionFailedStatus"
                            )}
                          </span>
                        }
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Box className={classes.cardBody}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    padding={0}
                    className={classes.borderDashed}
                  >
                    <Box className={classes.bankDetails}>
                      <Typography className="fromTxt">{t("transactionDetails.transactionCards.sentFromLabel")} :</Typography>
                      <div className="bankLogoDiv">
                        {/* <img
                             src="http://www.logotaglines.com/wp-content/uploads/2016/08/ICICI-Logo.png"
                             className="bankLogo"
                           /> */}
                        <img src={applicationFee.bankLogo} alt="Bank Logo" className={classes.bankLogo} />
                        <Typography className="bankNameTxt">
                          {applicationFee.bankName || "--"}
                        </Typography>
                      </div>

                      {/* <Typography className={classes.accountTxt}>
                          {t(
                            "transactionDetails.transactionCards.fromBankACNoLabel"
                          )}{" "}
                          {item.AccountNumber || "--"}{" "}
                          <span className="tranDate">
                            {moment(item.CreatedAt).format("Do MMM, h:mm a")}
                          </span>
                        </Typography> */}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={classes.paymentDetails}>
                      <Grid item xs={12} zeroMinWidth>
                        <Grid
                          container
                          alignItems="center"
                          justify="flex-end"
                        >
                          <Grid item xs={12} sm={6}>
                            <Box padding={1.5}>
                              <Typography
                                className={classes.paidAmountTxt}
                              >
                                {t(
                                  "transactionDetails.transactionCards.paidAmountLabel"
                                )}{" "}
                                :{" "}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography
                                className={classes.paidAmountVal}
                              >
                                ₹ {applicationFee.Amount ? numberWithCommas(applicationFee.Amount) : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Hidden smDown>
                <Box className={classes.cardFooter}>
                  <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={12} sm={8}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justify="space-between"
                      >
                        <Typography
                          className={classes.TranIDTxt}
                          display="inline"
                        >
                          {t(
                            "transactionDetails.transactionCards.PaymentForLabel"
                          )}{" "}
                          {" "}
                          <span className="IDValue">
                            {t(
                              "transactionDetails.transactionCards.applicationAmtTxt"
                            )}
                          </span>
                        </Typography>
                        {/* <Button
                            className="viewDetailBtn"
                            onClick={() => handleClickOpen(item)}
                          >
                            {t(
                              "transactionDetails.transactionCards.applicationsViewDetailBtn"
                            )}
                          </Button> */}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Grid container alignItems="center" justify="flex-end">
                        <Button
                          className={classes.downloadBtn}
                          startIcon={<DownloadPrimaryIcon />}
                          onClick={() => getApplicationTrans()}
                        >
                          {t(
                            "transactionDetails.transactionCards.downloadReceipt"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Hidden>

              <Hidden mdUp>
                <Box className={classes.cardFooter}>
                  <Box paddingY={2} paddingX={2}>
                    <Grid
                      container
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <Typography className={classes.TranIDTxt}>
                          {t(
                            "transactionDetails.transactionCards.PaymentForLabel"
                          )}{" "}
                          {" "}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.TranIDTxt}>
                          <span className="IDValue">
                            {t(
                              "transactionDetails.transactionCards.applicationAmtTxt"
                            )}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Divider />
                <Box className={classes.cardFooter}>
                  <Box paddingY={1} paddingX={2}>
                    <Grid
                      container
                      alignItems="center"
                      justify="space-between"
                    >
                      {/* <Grid item>
                          <Button
                            className="viewDetailBtn viewBtn"
                            onClick={() => handleClickOpen(item)}
                          >
                            {t(
                              "transactionDetails.transactionCards.applicationsViewDetailBtn"
                            )}
                          </Button>
                        </Grid> */}
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          className={classes.downloadBtn}
                          startIcon={<DownloadPrimaryIcon />}
                          onClick={() => getApplicationTrans()}
                        >
                          {t(
                            "transactionDetails.transactionCards.downloadReceipt"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Hidden>
            </Box>
          </Box>}
          {isSuccessTransaction && transactionData.length == 0 && !applicationFee && <h1 className={classes.notFound}>{t("transactionDetails.noTransDataErrorMsg")}</h1>}
          {/* <Box className={classes.tranWrapper}>
            <Typography className={classes.transDate}>
              04 Dec, 8:54 PM
            </Typography>
            <Box className={classes.tranCard}>
              <Box className={classes.cardHeader}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={6} sm={6}>
                    <Box className="headerleft">
                      <MenuTransactionDtlsIcon />
                      <Typography className={classes.TranIDTxt}>
                        Transaction id :{" "}
                        <span className="IDValue">112233445566</span>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Box className={classes.headerRight}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.00065 14.6654C9.76876 14.6654 11.4645 13.963 12.7147 12.7127C13.9649 11.4625 14.6673 9.76681 14.6673 7.9987C14.6673 6.23059 13.9649 4.5349 12.7147 3.28465C11.4645 2.03441 9.76876 1.33203 8.00065 1.33203C6.23254 1.33203 4.53685 2.03441 3.28661 3.28465C2.03636 4.5349 1.33398 6.23059 1.33398 7.9987C1.33398 9.76681 2.03636 11.4625 3.28661 12.7127C4.53685 13.963 6.23254 14.6654 8.00065 14.6654ZM7.00065 10.9987C7.00065 10.7335 7.10601 10.4791 7.29354 10.2916C7.48108 10.1041 7.73543 9.9987 8.00065 9.9987C8.26587 9.9987 8.52022 10.1041 8.70776 10.2916C8.89529 10.4791 9.00065 10.7335 9.00065 10.9987C9.00065 11.2639 8.89529 11.5183 8.70776 11.7058C8.52022 11.8933 8.26587 11.9987 8.00065 11.9987C7.73543 11.9987 7.48108 11.8933 7.29354 11.7058C7.10601 11.5183 7.00065 11.2639 7.00065 10.9987ZM7.34465 4.54536C7.37248 4.39165 7.45341 4.2526 7.5733 4.15246C7.69319 4.05233 7.84444 3.99748 8.00065 3.99748C8.15686 3.99748 8.30811 4.05233 8.428 4.15246C8.5479 4.2526 8.62882 4.39165 8.65665 4.54536L8.66732 4.66536V7.9987L8.65665 8.1187C8.62882 8.27241 8.5479 8.41146 8.428 8.5116C8.30811 8.61173 8.15686 8.66659 8.00065 8.66659C7.84444 8.66659 7.69319 8.61173 7.5733 8.5116C7.45341 8.41146 7.37248 8.27241 7.34465 8.1187L7.33398 7.9987V4.66536L7.34465 4.54536Z"
                          fill="#EB5757"
                        />
                      </svg>

                      <Typography className="transTxt transactionFail">
                        Transaction Failed
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Box className={classes.cardBody}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    padding={0}
                    className={classes.borderDashed}
                  >
                    <Box className={classes.bankDetails}>
                      <Typography className="fromTxt">Sent From :</Typography>

                      <div className="bankLogoDiv">
                        <img
                          src="http://www.logotaglines.com/wp-content/uploads/2016/08/ICICI-Logo.png"
                          className="bankLogo"
                        />
                        <Typography className="bankNameTxt">
                          ICICI Bank
                        </Typography>
                      </div>

                      <Typography className={classes.accountTxt}>
                        A/C No. XXXXXX2288{" "}
                        <span className="tranDate">on 04 Dec, 8:54 PM</span>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className={classes.paymentDetails}>
                      <Grid item xs={12} sm={12}>
                        <Grid container alignItems="center" justify="flex-end">
                          <Grid item xs={6} sm={5}>
                            <Box padding={1.5}>
                              <Grid item>
                                <Typography className={classes.paidAmountTxt}>
                                  Amount Paid :
                                </Typography>
                              </Grid>
                            </Box>
                          </Grid>

                          <Grid item xs={6} sm={5}>
                            <Box>
                              <Grid item>
                                <Typography className={classes.paidAmountVal}>
                                  5,42,000/-
                                </Typography>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />

              <Hidden smDown>
                <Box className={classes.cardFooter}>
                  <Grid container spacing={3} alignItems="center" justify="space-between">
                    <Grid item xs={12} sm={8}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justify="space-between"
                      >
                        <Typography
                          className={classes.TranIDTxt}
                          display="inline"
                        >
                          Payment Done for :{" "}
                          <span className="IDValue">10 Applications</span>
                        </Typography>
                        <Button className="viewDetailBtn">View details</Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Grid container alignItems="center" justify="flex-end">
                        <Button
                          className={classes.downloadBtn}
                          startIcon={
                            <DownloadPrimaryIcon />
                          }
                        >
                          Download Receipt
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Hidden>


              <Hidden smUp>
                <Box className={classes.cardFooter}>
                  <Box paddingY={2} paddingX={2}>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Typography className={classes.TranIDTxt}>
                              Payment Done for :
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.TranIDTxt}>
                              <span className="IDValue">10 Applications</span>
                            </Typography>
                        </Grid>
                    </Grid>
                  </Box>
                </Box>

                 <Divider />

                <Box className={classes.cardFooter}>
                  <Box paddingY={1} paddingX={2}>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Button className="viewDetailBtn" onClick={handleClickOpen}>View details</Button>
                        </Grid>
                        <Grid item>
                          <Button variant="outlined" color="primary"
                              className={classes.downloadBtn}
                              startIcon={
                                <DownloadPrimaryIcon />
                              }
                            >
                              Receipt
                            </Button>
                        </Grid>
                      </Grid>
                  </Box>
                </Box>
              </Hidden>
            </Box>
          </Box> */}
        </Box>
      </div>}
      {transactionScreen == 2 && <PendingTransactionDetail setTransactionScreen={setTransactionScreen} pendingTransData={pendingTransData} />}
      {applicationReciptDetail &&
        <TrnsnsactionDetailsReciptDialog
          open={open}
          handleClose={handleClose}
          pdfLoading={pdfLoading}
          numberWithCommas={numberWithCommas}
          getTransactionDetailsPdf={getTransactionDetailsPdf}
          isSuccessReciptDetail={isSuccessReciptDetail}
          applicationReciptDetail={applicationReciptDetail}
        />
      }
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={false}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        className={classes.modelBoxContainer}
      >
        <DialogTitle id="max-width-dialog-title">
          {pdfLoading && (
            <Loading isOpen={pdfLoading} />
          )}
          <Box className={classes.cardHeader}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box className="headerleft">
                  <IconButton aria-label="delete" onClick={handleClose} className={classes.modalCloseIconBtn}>
                    <CloseIcon
                      className={classes.backIcon}
                    />
                  </IconButton>
                  <MenuTransactionDtlsIcon />
                  <Typography className={classes.TranIDTxt}>
                    {t(
                      "transactionDetails.transactionCards.transactionDetailsModel.transactionlabel"
                    )}{" "}
                    :{" "}
                    <span className={`${classes.primaryColor} IDValue`}>
                      {transactionDetail.TransactionId}
                    </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.headerRight}>
                  <Button
                    className={classes.downloadBtn}
                    startIcon={<DownloadPrimaryIcon />}
                    onClick={() => getTransactionDetailsPdf(transactionDetail)}
                  >
                    {t(
                      "transactionDetails.transactionCards.transactionDetailsModel.downloadReceipt"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box className={classes.cardBody}>
              <Box className={classes.schemeBody}>
                <Grid container direction="column"
                  justifyContent="center"
                  alignItems="center">
                  <Grid item>
                    <img
                      src={DarkLogo}
                      alt={"CIDCO Logo"}
                      className="cidcoLogo"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1"> CIDCO Mega Housing Scheme</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      Booking Amount Receipt
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Grid
                container
                spacing={3}
                alignItems="center"
                justify="space-between"
              >
                <Grid item xs={12} md={6} padding={0} className={classes.borderDashed}>
                  <Box className={classes.bankDetails}>
                    <Typography className="fromTxt">
                      {" "}
                      {t(
                        "transactionDetails.transactionCards.transactionDetailsModel.sentFromLabel"
                      )}{" "}
                      :
                    </Typography>

                    <div className="bankLogoDiv">
                      <img
                        src={transactionDetail.BankIcon} alt="Bank Logo"
                        className={classes.bankLogo}
                      />
                      <Typography className="bankNameTxt">
                        {transactionDetail.BankName || "--"}
                      </Typography>
                    </div>

                    {/* <Typography className={classes.accountTxt}>
                      {t(
                        "transactionDetails.transactionCards.transactionDetailsModel.fromBankACNoLabel"
                      )}{" "}
                      {transactionDetail.AccountNumber || "--"}{" "}
                      <span className="tranDate">
                        {moment(transactionDetail.CreatedAt).format(
                          "Do MMM, h:mm a"
                        )}
                      </span>
                    </Typography> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={classes.paymentDetails}>
                    {transactionDetail.LoanApplied === 1 &&
                      <Grid
                        container
                        alignItems="center"
                        justify="flex-end"
                      >
                        <Grid item xs={12} sm={6} md={5}>
                          <Box display={"flex"} alignItems="center">
                            <Typography className={classes.loadAmountTxt}>
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.loanStatusLabel"
                              )}
                            </Typography>
                            <img src={transactionDetail.LoanAppliedFrom.BankLogo} alt="Bank Logo" className={`${classes.bankLogo} emdLoad`} />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={5}>
                          <Box>
                            <Typography className={classes.loadAmountVal}>
                              ₹ {transactionDetail.LoanAmount ? numberWithCommas(transactionDetail.LoanAmount) : "--"}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    }
                    <Grid
                      container
                      alignItems="center"
                      justify="flex-end"
                    >
                      <Grid item xs={12} sm={6} md={5}>
                        <Box padding={1.5}>
                          <Grid item>
                            <Typography className={classes.paidAmountTxt}>
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.paidAmountLabel"
                              )}{" "}
                              :{" "}
                            </Typography>
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6} md={5}>
                        <Box>
                          <Grid item>
                            <Typography className={classes.paidAmountVal}>
                              ₹ {transactionDetail.TotalAmountPaid ? numberWithCommas(transactionDetail.TotalAmountPaid) : "--"}
                            </Typography>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box paddingX={3.5} paddingY={1.5}>
              <Box className={classes.cardFooter}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item xs={6} sm={8}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Typography
                        className={classes.TranIDTxt}
                        display="inline"
                      >
                        {t(
                          "transactionDetails.transactionCards.transactionDetailsModel.PaymentForLabel"
                        )}{" "}
                        :{" "}
                        <span className="IDValue">
                          {transactionDetail.totalApplication || "--"}{" "}
                          {t(
                            "transactionDetails.transactionCards.transactionDetailsModel.applicationsCount"
                          )}
                        </span>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Grid container alignItems="center" justify="flex-end">
                      <Box className={classes.headerRight}>
                        <Typography className="transTxt">
                          {transactionDetail.PaymentStatus == "1" &&
                            <>
                              <TransSuccessIcon />
                              <span className="transactionPass">
                                {t(
                                  "transactionDetails.transactionCards.transactionSuccessStatus"
                                )}
                              </span>
                            </>
                          }
                          {transactionDetail.PaymentStatus == "0" &&
                            <span className="transactionFail">
                              {t(
                                "transactionDetails.transactionCards.transactionFailedStatus"
                              )}
                            </span>
                          }
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {transactionSummary.map((item, index) => (
              <Box
                className={classes.paymentDetailsCard}
                key={index}
              >
                <Box className={classes.paymentDetails}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} className="secDivider">
                      <Box className={classes.paymentInfo}>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={2}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.apnNoLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {item.UniqId ? `#${item.UniqId}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={2}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.projectLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {item.ProjectName || "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs="auto" md={2}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.categorylabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs={12} md={8}>
                            {/* {item?.ApplicantCategory != undefined && item?.ApplicantCategory.map((obj, i) => (
                              <Box className={classes.categoryTag} key={obj.id}>
                                {obj.name}
                              </Box>
                            ))} */}
                            <Typography className="infoValue" style={{ textAlign: "left" }}>
                              {item.ReservationCategoryName ? `${item.ReservationCategoryName}` : "--"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={classes.paymentSummary}>
                        <Typography variant="h4" className={classes.paymentTitle}>
                          {t("transactionDetails.transactionCards.transactionDetailsModel.paymentSummaryLabel")}
                        </Typography>
                        <Grid container spacing={3} alignItems="center" justify="space-between">
                          <Grid item xs="auto" sm={5}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.paymentDateLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs sm={6}>
                            <Box textAlign="right">
                              <Typography className="paymentValue">
                                {moment(item.CreatedOn).format("DD MMM, YYYY")}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        {/* <Grid container spacing={3} alignItems="center" justify="space-between">
                          <Grid item xs="auto" sm={5}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.applicationFeeLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs sm={6}>
                            <Box textAlign="right">
                              <Typography className="paymentValue">
                                ₹ {item.ApplicationFee ? numberWithCommas(item.ApplicationFee) : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Grid container spacing={3} alignItems="center" justify="space-between">
                          <Grid item xs="auto" sm={5}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.processingFeeLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs sm={6}>
                            <Box textAlign="right">
                              <Typography className="paymentValue">
                                ₹ {item.ProcessingFee ? numberWithCommas(item.ProcessingFee) : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid> */}

                        <Grid container spacing={3} alignItems="center" justify="space-between">
                          <Grid item xs="auto" sm={5}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.eMDLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs sm={6}>
                            <Box textAlign="right">
                              <Typography className={`paymentValue ${transactionDetail.LoanApplied === 1 ? "loanEmd" : ""}`}>
                                ₹ {item.Emd ? numberWithCommas(item.Emd) : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Grid container spacing={3} alignItems="center" justify="space-between">
                          <Grid item xs="auto" sm={5}>
                            <Typography className="infoLabel">
                              {t(
                                "transactionDetails.transactionCards.transactionDetailsModel.GSTLabel"
                              )}
                            </Typography>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item xs="auto">
                              <Box className="colonTxt">:</Box>
                            </Grid>
                          </Hidden>
                          <Grid item xs sm={6}>
                            <Box textAlign="right">
                              <Typography className="paymentValue">
                                ₹ {item.Gst ? numberWithCommas(item.Gst) : "--"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box className="totalAmoutCon">
                          <Grid container spacing={3} alignItems="center" justify="space-between">
                            <Grid item xs="auto" sm={5}>
                              <Typography className="totalLabel">
                                {t(
                                  "transactionDetails.transactionCards.transactionDetailsModel.totalLabel"
                                )}
                              </Typography>
                            </Grid>
                            <Hidden xsDown>
                              <Grid item xs="auto">
                                <Box className="colonTxt">:</Box>
                              </Grid>
                            </Hidden>
                            <Grid item xs sm={6}>
                              <Box textAlign="right">
                                <Typography className="totalValue">
                                  ₹ {item.TotalAmount ? numberWithCommas(item.TotalAmount) : "--"}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
            {isSuccessTransactionDetail && transactionSummary.length == 0 && <h1 className={classes.notFound}>{t("transactionDetails.noTransSummryDataErrorMsg")}</h1>}
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </ProfileWrap>
  );
}

export default TransactionDetails;
