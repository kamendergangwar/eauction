import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import withWidth from "@material-ui/core/withWidth";

import {
  addEditApplicantProgress,
  ApplicantProgressSelector,
  getApplicantProgress,
} from "../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import {
  PaymentSuccessfullIcon,
  PaymentFailedIcon,
  DownloadPrimaryIcon,
  QuestionMarkIcon,
} from "../../atoms/SvgIcons/SvgIcons";
import { paymentSuccessfulStyles } from "./PaymentSuccessful.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  applicantSelector,
} from "../../../redux/features/applicant/ApplicantSlice";
import {
  docDeclarationSelector,
  getUploadDocumentsList,
} from "../../../redux/features/file/DocDeclarationSlice";
import Loading from "../../atoms/Loading/Loading";
import AlertBox from "../../atoms/AlertBox/AlertBox";
import PaymentSecCard from "../../molecules/Cards/PaymentSecCard/PaymentSecCard";
import {
  addEditStepper,
  getStepperDetails,
  clearSuperStepperEditVars,
} from "../../../redux/features/stepper/StepperSlice";
import {
  razorpayPaymentGatewaySelector,
  clearSbiTransmodeStates,
  sbiTrasactionDetails,
  applicationFeeSbiTransDetails,
  documentapiverify,
  clearApplicationPaymentSbiTransmodeStates,
  eauctionFeeSbiTransDetails,
  clearEauctionPaymentSbiTransmodeStates,
} from "../../../redux/features/transaction/RazorpayPaymentSlice";
import sbiLogo from "../../../assets/bankIcons/sbi-logo.png";
import { ToWords } from "to-words";
import { withStyles } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { getPreferencesList } from "../../../redux/features/coApplicant/CoApplicantSlice";
import { ApiEndPoint, Fcfs_Flow } from "../../../utils/Common";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  },
});
const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PaymentSuccessful = (props) => {
  const { width } = props;
  const classes = paymentSuccessfulStyles();
  const { t } = useTranslation("SuccessDetailsPageTrans");
  const history = useHistory();
  const location = useLocation();
  const [orderStatus, setOrderStatus] = useState("success");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [finishStatus, setfinishStatus] = useState();
  const [isFcfs, setIsFcsf] = useState(Fcfs_Flow);
  const [paymentFor, setPaymentFor] = useState("");
  const [documentUploaded, setDocumentUploaded] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    isFetchingEauctionFeeSbiTransDetails,
    isSuccessResEauctionFeeSbiTransDetails,
    isErrorEauctionFeeSbiTransDetails,
    errorMsgEauctionFeeSbiTransDetails,
    eauctionFeeSbiTransDetailsData,
  } = useSelector(razorpayPaymentGatewaySelector);
  const { isSuccessResStepper, stepperData } = useSelector(
    (state) => state.stepper
  );
  const {
    isFetchingGetUploadList,
    isSuccessResUploadList,
    isErrorGetUploadList,
    errorMsgGetUploadList,
    getUploadListData,
  } = useSelector(docDeclarationSelector);

  useEffect(() => {
    dispatch(getStepperDetails());
    dispatch(getApplicantProgress());
  }, [dispatch]);

  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } =
    useSelector(ApplicantProgressSelector);
  // useEffect(() => {
  //   if (isSuccessResStepper) {
  //     let pageUrl;
  //     stepperData.superStepper.forEach((item) => {
  //       if (item.step == 1) {
  //         if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
  //           if (item.applicantKycStepper[0].status != "completed") {
  //             pageUrl =  "/apply-now";
  //           }
  //         }

  //         if (
  //           item.applicantKycStepper[1].title == "Verify PAN" &&
  //           pageUrl == undefined
  //         ) {
  //           if (item.applicantKycStepper[1].status != "completed") {
  //             pageUrl =  "/apply-now";
  //           }
  //         }
  //       }

  //       if (item.step == 1 && pageUrl == undefined) {
  //         if (item.status != "completed") {
  //           pageUrl =  "/apply-now";
  //         }
  //       }
  //     });
  //     history.push(pageUrl);
  //   }
  // }, [isSuccessResStepper]);

  const getTransactionDetailsPdf = () => {
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

  useEffect(() => {
    const search = window.location.search;
    const transId = new URLSearchParams(search).get("transId");
    if (
      window.location.pathname == "/eauctionfee-payment-successful" &&
      transId
    ) {
      let jsonParams = {
        TransId: transId,
      };
      dispatch(eauctionFeeSbiTransDetails(jsonParams));
    }
    if (window.location.pathname == "/eauctionfee-payment-failed") {
      let jsonParams = {
        TransId: transId,
      };
      dispatch(eauctionFeeSbiTransDetails(jsonParams));
      setOrderStatus("failed");
    }
  }, []);
console.log(eauctionFeeSbiTransDetailsData,"datatatsssss")
  // useEffect(()=>{
  //   const search = window.location.search;
  //   const transId = new URLSearchParams(search).get("transId");
  //   dispatch(applicationFeeSbiTransDetails({transId: transId}));
  //   console.log(applicationFeeSbiTransDetailsData?.data,"thef datatatatat")
  // },[])

  useEffect(() => {
    if (isSuccessResEauctionFeeSbiTransDetails) {
      setPaymentInfo(eauctionFeeSbiTransDetailsData);
  dispatch(clearEauctionPaymentSbiTransmodeStates());
  
    }
  }, [isSuccessResEauctionFeeSbiTransDetails]);

  useEffect(() => {
    if (
      isSuccessProgressResStepper &&
      isSuccessResEauctionFeeSbiTransDetails
    ) {
      if (eauctionFeeSbiTransDetailsData.PaymentStatus == 1) {
        // updateApplicantProgressStepper();
      }
    }
  }, [isSuccessProgressResStepper, isSuccessResEauctionFeeSbiTransDetails]);

  const printThePaymentPage = () => {
    window.print();
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.alert("There is no way back...Payment is already done!!")) {
        setfinishStatus(true);
        history.push("/eauctionfee-payment-successful");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

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

  const goToNext = () => {
    localStorage.removeItem("paymentDetails");
    history.push("/dashboard");
  };

  return (
    <React.Fragment>
      {isFetchingEauctionFeeSbiTransDetails && (
        <Loading isOpen={isFetchingEauctionFeeSbiTransDetails} />
      )}
      {pdfLoading && <Loading isOpen={pdfLoading} />}
      <PaymentSecCard>
        <div className={classes.container}>
          {isErrorEauctionFeeSbiTransDetails && (
            <AlertBox severity="error">
              {errorMsgEauctionFeeSbiTransDetails}
            </AlertBox>
          )}
          {orderStatus == "success" && (
            <Box>
              <Box
                className={classes.cardHeader}
                style={{ paddingBottom: "0" }}
              >
                <Typography className={classes.successIcon}>
                  <PaymentSuccessfullIcon />
                </Typography>
                <Typography variant="h5" className={classes.pageTitle}>
                  {t("paymentSuccessPage.title")}
                  <br />
                  <span className={classes.subTitleTxt}>
                    {paymentInfo?.CreatedAt
                      ? "on " +
                      moment(paymentInfo?.CreatedAt).format("MMM DD, h:mm a")
                      : "--"}
                  </span>
                </Typography>
                <Typography className={classes.subTitleTxt}>
                  {t("paymentSuccessPage.checkEmailTxt")} &nbsp;
                  <span style={{ margin: 0, color: "#004382", fontWeight: "bold" }}>(+91) 9930870000</span>
                  
                  {/* <span>on Nov 10, 9:03 PM</span> */}
                  
                </Typography>
              </Box>
              <Box
                className={classes.DialogContainer}
                style={{ marginTop: "0" }}
              >
                {/* <Typography className={classes.DialogTittle}>
                  {t("Document Verification Notes")}
                </Typography> */}

                <Box>
                  <div>
                    <ul style={{ marginTop: "0", paddingRight: "20px",paddingTop: 20 }}>
                      <li>
                        {t("paymentSuccessPage.noticeListTxt.point1")}
                      </li>
                      <li>
                        {t("paymentSuccessPage.noticeListTxt.point2")}
                      </li>
                      <li>
                        {t("paymentSuccessPage.noticeListTxt.point3")}
                      </li>
                      {/* <li>
                        {t("paymentSuccessPage.noticeListTxt.point4")}
                      </li> */}

                    </ul>
                  </div>
                </Box> 
                {/* <CustomTooltip
                  arrow
                  enterTouchDelay={0}
                  title={
                    <DialogContent>
                      {isFetchingGetUploadList && (
                        <Loading
                          isOpen={isFetchingApplicationFeeSbiTransDetails}
                        />
                      )}
                      {isErrorGetUploadList && (
                        <AlertBox severity="error">
                          {errorMsgGetUploadList}
                        </AlertBox>
                      )}
                      <Typography className={classes.tooltipTittle}>
                        {t("Uploaded Documents")}
                      </Typography>
                      <ul className={classes.orderList}>
                        {documentUploaded?.map((doc) => {
                          if (doc.IsUploaded == 1) {
                            return <li>{doc.DocumentName}</li>;
                          }
                        })}
                      </ul>
                    </DialogContent>
                  }
                >
                  <Typography className={classes.toolTipTittle}>
                    {t("Click to View Your Uploaded Documents")}
                    <QuestionMarkIcon style={{ fontSize: "1.2rem" }} />
                  </Typography>
                </CustomTooltip> */}
              </Box>
              <Typography variant="body2" style={{padding: "20px 40px", fontWeight: "bold"}}>
              {t("paymentSuccessPage.noteTxt")}
                </Typography>
              <Box className={classes.scratchLine}>
                <span></span>
                <Divider className={classes.dividerCell} />
                <span className="last"></span>
              </Box>
              <Box className={classes.dataViewBox} style={{marginBottom:"0px",paddingTop:"10px",paddingBottom:"10px"}}>
                  <Grid container style={{textAlign:"center"}}>
                    <Grid item md xs={12}>
                      <Typography variant="body1" className="title" style={{display:"inline-block",verticalAlign:"bottom"}}>
                      {t("paymentSuccessPage.applicationno")} :
                      </Typography>
                      <Typography variant="body1" style={{display:"inline-block",verticalAlign:"bottom"}}>
                        <img src={paymentInfo?.barcodeFile} alt="logo" />
                        <span style={{verticalAlign:"top",marginTop:"5px",display:"inline-block"}}>#{paymentInfo?.applicationNum}</span>
                      </Typography>
                    </Grid>
                    </Grid>
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
                        <span>{paymentInfo?.BankName}</span>
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
                        {paymentInfo?.Method || "--"}
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
                      {t("paymentSuccessPage.gstTxt2")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="right">
                    <Typography className={classes.totalAmtView}>
                      ₹{" "}
                      {paymentInfo?.totalAmount
                        ? numberWithCommas(paymentInfo?.totalAmount)
                        : "--"}
                    </Typography>
                    <Typography className={classes.totalAmtViewInWord}>
                      {paymentInfo?.AmountWords || "--"}
                    </Typography>
                  </Box>
                </Grid>
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
                    onClick={() => history.push("/make-application-payment")}
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
                        {paymentInfo?.Method || "--"}
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
                      {paymentInfo?.AmountWords || "--"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
          {orderStatus == "success" ? (
            <>
              <Box className={classes.scratchLine}>
                <span></span>
                <Divider className={classes.dividerCell} />
                <span className="last"></span>
              </Box>
              <Box className={classes.footerContainer}>
                <box>
                  <Button
                    startIcon={<DownloadPrimaryIcon />}
                    onClick={() => getTransactionDetailsPdf()}
                  >
                    {t("paymentSuccessPage.downloadReceiptBtn")}
                  </Button>
                </box>
                {/* <Box>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={goToNext}
                  >
                    {t("paymentSuccessPage.goToDashboardBtn")}
                  </Button>
                </Box> */}
                <Box>
                  <Button
                    color="primary"
                    variant="contained"
                     onClick={() => history.push("/apply-now")}
                  >
                    {("Continue to Application...")}
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <></>
          )}
        </div>
      </PaymentSecCard>
    </React.Fragment>
  );
};

export default withWidth()(PaymentSuccessful);
