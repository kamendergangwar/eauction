import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import withWidth from "@material-ui/core/withWidth";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { ToWords } from 'to-words';
import { EchallanStyles } from "./Echallan.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
/* import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice"; */
import {
  InfoMarkIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import PaymentSecCard from "../../../molecules/Cards/PaymentSecCard/PaymentSecCard";
import { MerchantId, WorkingKey, ApiEndPoint } from "../../../../utils/Common";
import { getEChallanPdfFile, masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../redux/features/preferences/PreferencesSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
// import sbiLogo from "../../../../assets/bankIcons/sbi-logo.png";

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});

const nodeCCAvenue = require("node-ccavenue");

const ccav = new nodeCCAvenue.Configure({
  merchant_id: MerchantId,
  working_key: WorkingKey,
});

const Echallan = (props) => {
  const { width } = props;
  const classes = EchallanStyles();
  const { t } = useTranslation("SuccessDetailsPageTrans");
  const history = useHistory();
  const location = useLocation();
  const [orderStatus, setOrderStatus] = useState("Success");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [finishStatus, setfinishStatus] = useState();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );

  /* useEffect(() => {
    const query = new URLSearchParams(location.search);
    const url = window.location.href;
    if (url.indexOf("?data=") !== -1) {
      const decryptedData = ccav.decrypt(query.get("data"));
      const decryptedList = decryptedData.split(/[&]/);
      setOrderStatus("");
      setPaymentInfo({});
      decryptedList.forEach((item) => {
        const information = item.split(/[=]/);
        // console.log(information);
        if (information[0] === "order_id") {
          setPaymentInfo((prevData) => {
            return {
              ...prevData,
              orderId: information[1],
            };
          });
        }
        if (information[0] === "tracking_id") {
          setPaymentInfo((prevData) => {
            return {
              ...prevData,
              trackingId: information[1],
            };
          });
        }
        if (information[0] === "payment_mode") {
          setPaymentInfo((prevData) => {
            return {
              ...prevData,
              paymentMode: information[1],
            };
          });
        }
        if (information[0] === "card_name") {
          setPaymentInfo((prevData) => {
            return {
              ...prevData,
              cardName: information[1],
            };
          });
        }
        if (information[0] === "amount") {
          setPaymentInfo((prevData) => {
            return {
              ...prevData,
              amount: information[1],
            };
          });
        }
        if (information[0] === "trans_date") {
          setPaymentInfo((prevData) => {
            return {
              ...prevData,
              transDate: information[1],
            };
          });
        }
        if (information[0] === "order_status") {
          setPaymentInfo((prevData) => {
            return {
              ...prevData,
              orderStatus: information[1],
            };
          });
          setOrderStatus(information[1]);
        }
      });
    }
  }, [location]); */

  useEffect(() => {
    dispatch(getStepperDetails());
    dispatch(getApplicant());
    let check_loan_details = localStorage.getItem("paymentDetails");
    if (check_loan_details) {
      let bankDtls = JSON.parse(check_loan_details);
      setPaymentInfo(bankDtls);
    } else {
      history.goBack();
    }
  }, [dispatch]);

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

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.alert("There is no way back... E-Challan is already generated!!")) {
        setfinishStatus(true)
        history.push("/e-challan");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false)
      }
    }
  }
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);

  // const { isEStampSelected } = useSelector(documentsSelector);
  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,
  } = useSelector(applicantSelector);

  const {
    isSuccessResGetPreferences
  } = useSelector(preferencesSelector);

  /* useEffect(() => {
    if (isSuccessResApplicant) {
      if (applicantData.IsEstamp) {
        dispatch(
          eStampSelectOrDeselect(applicantData.IsEstamp === "1" ? true : false)
        );
      }
    }
  }, [applicantData.IsEstamp, dispatch, isSuccessResApplicant]); */

  const checkSession = () => {
    dispatch(getPreferencesList());
  }

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      printThePaymentPage();
      dispatch(clearPreferencesState());
    }
  }, [isSuccessResGetPreferences])

  const printThePaymentPage = () => {
    // window.open(`${ApiEndPoint}/PDFDownloader/echallan/${paymentInfo.challan.ChallanId}`);
    // dispatch(getEChallanPdfFile(paymentInfo.challan.ChallanId));
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/PDFDownloader/echallan/${paymentInfo.challan.ChallanId}`;
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((response) => response.blob()).then((blob) => {
      setPdfLoading(false);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = paymentInfo.challan.ChallanId + '-E-challan';
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
      setPdfLoading(false);
      alert("E-challan not found");
    });
  };

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

  const amountToWords = (amount_val) => {
    return toWords.convert(amount_val);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {isFetchingApplicant && <Loading isOpen={isFetchingApplicant} />}
      {pdfLoading && <Loading isOpen={pdfLoading} />}
      <PaymentSecCard>
        <div className={classes.container}>
          {isErrorApplicant && (
            <AlertBox severity="error">{errorMessage}</AlertBox>
          )}
          {(orderStatus === "Success" || orderStatus === "Aborted") && (
            <>
              {/* <Box display="flex">
                <Box flexGrow={1} />
                <Box className="printBtnSection">
                  <Hidden only="xs">
                    <Button color="primary" startIcon={<PrintOutlinedIcon />} onClick={() => printThePaymentPage()}>
                      {t("printButtonText")}
                    </Button>
                  </Hidden>
                </Box>
              </Box> */}
              <Box className={classes.cardHeader}>
                <Typography
                  variant="h5"
                  className={classes.pageTitle}
                >
                  {t("eChallanPage.title")}
                </Typography>
                <Typography className={classes.subTitleTxt}>
                  {t("eChallanPage.description")} <br />
                  <span>
                    {paymentInfo?.challan?.ExpiryDate ? "on " + moment(paymentInfo?.challan?.ExpiryDate).format("MMM DD, h:mm a") : "--"}
                  </span>
                </Typography>
              </Box>
            </>
          )}

          <Box className={classes.pageHeader}>
            <Typography
              variant="h6"
              className={classes.headerTxt}
            >
              {t("offLineBank.title")}
            </Typography>

            <ul className={classes.unorderList}>
              <li><strong>{t("offLineBank.step1")} {t("offLineBank.step2")}</strong></li>
              <li>{t("offLineBank.step3")} <strong>{t("offLineBank.step4")}</strong> {t("offLineBank.step5")}</li>
            </ul>
            <Box className={classes.sectionInfo}>
              <Typography variant="h6">
                {t("offLineBank.infoTxt")}
              </Typography>
              <Box className="infoIcon" onClick={handleClickOpen}>
                <InfoMarkIcon />
              </Box>
            </Box>
          </Box>

          <Box className={classes.scratchLine}><span></span><Divider className={classes.dividerCell} /><span className="last"></span></Box>
          {/* {orderStatus === "Failure" && (
            <>
              <Box textAlign="center" marginTop={3}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "#32BA7C" }}
                >
                  {t("title1")}
                </Typography>
              </Box>
            </>
          )} */}
          <Box className={classes.dataContainer}>
            {!paymentInfo?.TotalEMDAmount && (<Box className={classes.dataViewBox}>
              <Typography variant="body1" className="title">
                {t("bankNameLabel")}
              </Typography>
              <Typography variant="body1" className="valueView">
                {/* <img src={sbiLogo} alt="logo" /> */}
                <span>--</span>
              </Typography>
            </Box>)}
            <Box className={classes.dataViewBox}>
              <Typography variant="body1" className="title">
                {t("eChallanIdLabel")}
              </Typography>
              <Typography variant="body1" className="valueView">{paymentInfo?.challan?.ChallanId || "--"}</Typography>
            </Box>
            <Box className={classes.dataViewBox}>
              <Typography variant="body1" className="title">
                {t("virtualAcountNoLabel")}
              </Typography>
              <Typography variant="body1" className="valueView">{paymentInfo?.challan?.VirtualAccountNumber || "--"}</Typography>
            </Box>
          </Box>
          <Divider className={classes.dividerCell} />
          {!paymentInfo?.TotalEMDAmount && (<Grid container justify="space-between" className={classes.totalSection}>
            <Grid item xs={6}>
              <Typography className={classes.totalAmtLabel}>{t("totalLoanAmountLabel")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="right">
                <Typography className={classes.totalAmtView}>
                  ₹ {paymentInfo?.FeeDetail?.LoanAmount ? numberWithCommas(paymentInfo?.FeeDetail?.LoanAmount) : "--"}
                </Typography>
                <Typography className={classes.totalAmtViewInWord}>{paymentInfo?.FeeDetail?.LoanAmountWords || "--"}</Typography>
              </Box>
            </Grid>
          </Grid>)}

          <Grid container>
            <Grid item xs={12}>
              <div className={classes.totalAmoutSection}>
                <Typography variant="body1" className={classes.AmtLabel}>{t("amountToBePaid")}</Typography>
                <Typography className={classes.totalAmtValue}>
                  ₹ {paymentInfo?.FeeDetail?.PayableAmount || paymentInfo?.TotalEMDAmount ? numberWithCommas(paymentInfo?.FeeDetail?.PayableAmount || paymentInfo?.TotalEMDAmount) : "--"}
                </Typography>
                <Typography className={classes.totalAmtTxt}>
                  {paymentInfo?.FeeDetail?.PayableAmountWords || "--"}
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Divider className={classes.dividerCell} />
          <Box className={classes.cardFooter}>
            <Typography className={classes.noteTextView}><span>{t("noteText")} :</span> {t("notePara")}</Typography>
            <Box className={classes.buttonContainer}>
              <Grid container spacing={3} justify="space-between">
                <Grid item md="auto" xs={12}>
                  <Button color="primary" size="large"
                    startIcon={<PrintOutlinedIcon />} onClick={() => checkSession()}>
                    {t("downloadEchallanBtn")}
                  </Button>
                </Grid>
                <Grid item md="auto" xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => history.push("/upload-documents")}
                  >
                    {t("uploadDocumentsBtn")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* {(orderStatus === "Success" || orderStatus === "Aborted") && (
            <>
              {!isEStampSelected && (
                <>
                  <Hidden only={["sm", "md", "lg"]}>
                    <Box textAlign="center">
                      <Button color="primary" startIcon={<PrintOutlinedIcon />}>
                        {t("printButtonText")}
                      </Button>
                    </Box>
                  </Hidden>
                  <Box display="flex" justifyContent="center" paddingY={2} className="printBtnSection">
                    <Box className={classes.buttonContainer}>
                      <Grid container spacing={width === "xs" ? 1 : 3}>
                        <Grid item xs={12} sm={5} md={5} lg={5}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={() => history.push("/application-details")}
                          >
                            {t("viewButtonText")}
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2} />
                        <Grid item xs={12} sm={5} md={5} lg={5}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={() => history.push("/dashboard")}
                          >
                            {t("doneButtonText")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </>
              )}
              {isEStampSelected && (
                <>
                  <Box textAlign="center" marginTop={3}>
                    <Box paddingY={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => history.push("/estamping-documents")}
                      >
                        {t("proceedToEStampText")}
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </>
          )} */}
          {orderStatus === "Failure" && (
            <>
              <Box textAlign="center" marginTop={3}>
                <Typography variant="body1" gutterBottom>
                  {t("paymentFailedText")}
                </Typography>
                <Box paddingY={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<NavigateBeforeIcon />}
                    onClick={() => history.push("/make-payments")}
                  >
                    {t("backButtonText")}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </div>
      </PaymentSecCard>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle className={classes.dialogTitle}>{t("stepstoDoTheChequeTransfer.title")}</DialogTitle>
        <DialogContent>
          <ul className={classes.dialogBoxContent}>
            <li>{t("stepstoDoTheChequeTransfer.step1")} <strong> {t("stepstoDoTheChequeTransfer.step2")}</strong></li>
            <li>{t("stepstoDoTheChequeTransfer.step3")}</li>
            <li>{t("stepstoDoTheChequeTransfer.step4")}</li>
            <li>{t("stepstoDoTheChequeTransfer.step5")}</li>
            <li>{t("stepstoDoTheChequeTransfer.step6")}</li>
          </ul>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default withWidth()(Echallan);
