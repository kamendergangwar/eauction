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
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import {
  PaymentSuccessfullIcon,
  PaymentFailedIcon,
  ScaleIcon,
  WingIcon,
  RupeePriceIcon,
  RoomTypeIcon,
  FloorStepIcon,
  UnitTypeIcon,
  DownloadPrimaryIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import { paymentSuccessfulStyles } from "./PaymentSuccessful.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import PaymentSecCard from "../../../molecules/Cards/PaymentSecCard/PaymentSecCard";
import { ApiEndPoint, Fcfs_Flow, MerchantId, WorkingKey } from "../../../../utils/Common";
import {
  addEditStepper,
  getStepperDetails,
  clearSuperStepperEditVars,
} from "../../../../redux/features/stepper/StepperSlice";
import {
  razorpayPaymentGatewaySelector,
  clearSbiTransmodeStates,
  sbiTrasactionDetails,
} from "../../../../redux/features/transaction/RazorpayPaymentSlice";
import sbiLogo from "../../../../assets/bankIcons/sbi-logo.png";
import { ToWords } from "to-words";
import {
  addEditApplicantProgress,
  ApplicantProgressSelector,
  getApplicantProgress,
} from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import {
  applicationSelector,
  getApplication,
} from "../../../../redux/features/application/ApplicationSlice";
import { getPreferencesList } from "../../../../redux/features/preferences/PreferencesSlice";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  },
});

const nodeCCAvenue = require("node-ccavenue");

const ccav = new nodeCCAvenue.Configure({
  merchant_id: MerchantId,
  working_key: WorkingKey,
});

const PaymentSuccessful = (props) => {
  const { width } = props;
  const classes = paymentSuccessfulStyles();
  const { t } = useTranslation("SuccessDetailsPageTrans");
  const history = useHistory();
  const location = useLocation();
  const [orderStatus, setOrderStatus] = useState("success");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [finishStatus, setfinishStatus] = useState();
  const dispatch = useDispatch();
  const [isFcfs, setIsFcfs] = useState(Fcfs_Flow);
  const [bookingDetail, setBookingDetail] = useState({});
  const [pdfLoading, setPdfLoading] = useState(false);

  const {
    isFetchingSbiTrasactionDetails,
    isSuccessResSbiTrasactionDetails,
    isErrorSbiTrasactionDetails,
    errorMsgSbiTrasactionDetails,
    sbiTrasactionDetailsData,
  } = useSelector(razorpayPaymentGatewaySelector);

  const {
    isFetchingApplication,
    isSuccessResApplication,
    isErrorApplication,
    errorMsgApplication,
    applicationData,
    applicationBookingStatus,
  } = useSelector(applicationSelector);
  const { isSuccessResStepper, stepperData } = useSelector(
    (state) => state.stepper
  );

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getStepperDetails());
    dispatch(getApplicantProgress());
    dispatch(getApplication());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessResApplication) {
      if (applicationBookingStatus) {
        setBookingDetail(applicationBookingStatus[0]);
        console.log(applicationBookingStatus[0]);
      }
    }
  }, [isSuccessResApplication]);

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach((item) => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (
            item.applicantKycStepper[1].title == "Verify PAN" &&
            pageUrl == undefined
          ) {
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
      });
      history.push(pageUrl);
    }
  }, [isSuccessResStepper]);

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

  // useEffect(() => {
  //   dispatch(getApplicant());
  //   let jsonParams = {
  //     "transId": "TXN6335249006EDC"
  //   }
  //   dispatch(sbiTrasactionDetails(jsonParams))
  // }, [dispatch]);

  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,
  } = useSelector(applicantSelector);
  /* const { isEStampSelected } = useSelector(documentsSelector);

  useEffect(() => {
    if (isSuccessResApplicant) {
      if (applicantData.IsEstamp) {
        dispatch(
          eStampSelectOrDeselect(applicantData.IsEstamp === "1" ? true : false)
        );
      }
    }
  }, [applicantData.IsEstamp, dispatch, isSuccessResApplicant]); */

  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } =
    useSelector(ApplicantProgressSelector);
  const updateApplicantProgressStepper = () => {
    let newStepper = [];
    let newStep = {};
    if (isSuccessProgressResStepper) {
      const ApplicantStepper = ApplicantStepperData.superStepper
        ? ApplicantStepperData.superStepper
        : superStepper;
      ApplicantStepper.forEach((step) => {
        if (step.StepId == 10) {
          newStep = {
            ...step,
            Status: "completed",
            Description: "Flat payment done successfully",
          };
        } else {
          newStep = step;
        }
        newStepper.push(newStep);
      });
      dispatch(addEditApplicantProgress(newStepper));
    }
  };
  useEffect(() => {
    const search = window.location.search;
    const transId = new URLSearchParams(search).get("transId");

    let getOrdrDtls = localStorage.getItem("paymentDetails");
    if (transId == null && getOrdrDtls) {
      let orderDtls = JSON.parse(getOrdrDtls);
      setPaymentInfo(orderDtls);
    } else {
      // history.goBack();
      let jsonParams = {
        transId: transId,
      };
      dispatch(sbiTrasactionDetails(jsonParams));
    }

    if (window.location.pathname == "/payment-failed") {
      setOrderStatus("failed");
    }
  }, []);

  useEffect(() => {
    if (isSuccessResSbiTrasactionDetails) {
      setPaymentInfo(sbiTrasactionDetailsData);
      dispatch(clearSbiTransmodeStates());
    }
  }, [isSuccessResSbiTrasactionDetails]);

  useEffect(() => {
    if (isSuccessResSbiTrasactionDetails && isSuccessProgressResStepper) {
      if (sbiTrasactionDetailsData.PaymentStatus == 1) {
        // updateApplicantProgressStepper();
      }
    }
  }, [isSuccessProgressResStepper, isSuccessResSbiTrasactionDetails]);

  const printThePaymentPage = () => {
    window.print();
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.alert("There is no way back...Payment is already done!!")) {
        setfinishStatus(true);
        history.push("/payment-successful");
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
    history.push(isFcfs ? "/dashboard" : "/upload-documents");
  };

  const getFlatTransactionDetailsPdf = () => {
    dispatch(getPreferencesList()).then(res => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/PDFDownloader/receipt/${applicantData.ApplicationDetails[0].TransactionDetails[0]?.TransactionReferenceNo}?Lang=${localStorage.getItem('i18nextLng')}&gateway=sbiepay`;
        fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }).then((response) => response.blob()).then((blob) => {
          setPdfLoading(false);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = applicantData.ApplicationDetails[0].TransactionDetails[0]?.TransactionReferenceNo + '-Transaction';
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

  return (
    <React.Fragment>
      {isFetchingSbiTrasactionDetails ||
        (isFetchingApplication && (
          <Loading
            isOpen={isFetchingSbiTrasactionDetails || isFetchingApplication}
          />
        ))}
      <PaymentSecCard>
        <div className={classes.container}>
          {isErrorSbiTrasactionDetails && (
            <AlertBox severity="error">{errorMsgSbiTrasactionDetails}</AlertBox>
          )}
          {orderStatus == "success" && (
            <Box>
              <Box className={classes.cardHeader}>
                <Typography className={classes.successIcon}>
                  <PaymentSuccessfullIcon />
                </Typography>
                <Typography variant="h5" className={classes.pageTitle}>
                  {t('paymentSuccessPage.congratulationsTxt')}
                </Typography>
                <Typography className={classes.subTitleTxt}>
                  {t('paymentSuccessPage.successDescTxt')}&nbsp;
                  <span style={{ margin: 0, color: "#004382", fontWeight: "bold" }}>(+91) 9930870000</span>
                  <br />
                  {/* <span>on Nov 10, 9:03 PM</span> */}
                  <span>
                    {paymentInfo?.CreatedAt
                      ? "on " +
                      moment(paymentInfo?.CreatedAt).format("MMM DD, h:mm a")
                      : "--"}
                  </span>
                </Typography>
                <Grid container alignItems="center" justifyContent="center" textAlign="center">
                  <Button
                    startIcon={<DownloadPrimaryIcon />}
                    onClick={getFlatTransactionDetailsPdf}
                  >
                    {t('paymentSuccessPage.downloadReceiptBtn')}
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    // onClick={() => history.push("/dashboard")}
                    onClick={goToNext}
                  >
                    {/* {t("paymentSuccessPage.goToDashboardBtn")} */}
                    {isFcfs ? t("paymentSuccessPage.goToDashboardBtn") : t("uploadDocumentsBtn")}
                  </Button>

                </Grid >

              </Box>
              <Box className={classes.dataViewBox}>
                  <Grid container style={{textAlign:"center"}}>
                    <Grid item md xs={12}>
                      <Typography variant="body1" className="title" style={{display:"inline-block",verticalAlign:"bottom"}}>
                      {t("paymentSuccessPage.applicationno")} :
                      </Typography>
                      <Typography variant="body1" style={{display:"inline-block",verticalAlign:"bottom"}}>
                        <img src={paymentInfo?.barcodeFile} alt="logo" />
                        <span style={{verticalAlign:"top",marginTop:"5px",display:"inline-block"}}>#{paymentInfo?.ApplicationNo}</span>
                      </Typography>
                    </Grid>
                    </Grid>
              </Box>
              {bookingDetail && (
                <>
                  <Box className={classes.scratchLine}>
                    <span></span>
                    <Divider className={classes.dividerCell} />
                    <span className="last"></span>
                  </Box>
                  <Box className={classes.dataContainer}>
                    <Typography className={classes.invoiceTitle}>
                      -- {t("paymentSuccessPage.bookedFlatSummeryTxt")} --
                    </Typography>
                    <Box className={classes.dataViewBox}>
                      <Grid container className={classes.selectedFlatCon}>
                        <Grid xs={12} container justifyContent="center" style={{ padding: "0px 7px 7px", fontSize: 15 }}><span className={classes.dataValue}>{bookingDetail.ProjectName}</span></Grid>
                        <Grid item xs={6}>
                          <Grid container alignItems="center">
                            <UnitTypeIcon className={classes.scaleIconView} />
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle}>
                                {t("unitNo")} :{" "}
                                <span className={classes.dataValue}>
                                  {bookingDetail.FlatNo}
                                </span>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid container alignItems="center">
                            <FloorStepIcon className={classes.scaleIconView} />
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle}>
                                {t("floorText")} :{" "}
                                <span className={classes.dataValue}>
                                  {bookingDetail.FloorNo}
                                </span>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid container alignItems="center">
                            <WingIcon className={classes.scaleIconView} />
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle}>
                                {t("towerNo")} :{" "}
                                <span className={classes.dataValue}>
                                  {bookingDetail.Wing}
                                </span>
                              </Typography>
                            </Box>
                          </Grid>

                        </Grid>
                        <Grid item xs={6}>
                          <Grid container alignItems="center">
                            <RoomTypeIcon className={classes.scaleIconView} />
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle}>
                                {t("unitType")} :{" "}
                                <span className={classes.dataValue}>
                                  {bookingDetail.flat_type}
                                </span>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid container alignItems="center">
                            <ScaleIcon className={classes.scaleIconView} />
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle} style={{fontSize: 11}}>
                                {t("reraArea")} :{" "}
                                <span className={classes.dataValue}>
                                  {" "}
                                  {bookingDetail.BuiltupArea}&nbsp;
                                  {t("SQFT")}
                                </span>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid container alignItems="center">
                            <RupeePriceIcon className={classes.scaleIconView} />
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle}>
                                {t("priceRangeLabel")} :{" "}
                                <span className={classes.dataValue}>
                                  {/* ₹ {bookingDetail.Cost} */}
                                  ₹ XXXX
                                </span>
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </>
              )}                    
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
                        {paymentInfo?.TransactionId || "TXN6412B71942B7C"}
                      </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Typography variant="body1" className="title">
                        {t("paymentMethod")}
                      </Typography>
                      <Typography variant="body1" className="valueView">
                        {paymentInfo?.Method || "Net Banking"}
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
                      {t("paymentSuccessPage.gstTxt")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="right">
                    <Typography className={classes.totalAmtView}>
                      ₹{" "}
                      {paymentInfo?.totalAmount
                        ? numberWithCommas(paymentInfo?.totalAmount)
                        : "75,295"}
                    </Typography>
                    <Typography className={classes.totalAmtViewInWord}>
                      {paymentInfo?.PayableAmountWords || "--"}
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
                    onClick={() => history.push("/make-payments")}
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
                        <img src={paymentInfo?.BankIcon || "#"} alt="logo" />
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
                      {paymentInfo?.PayableAmountWords || "--"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
          {/* <Box
            className={classes.dataContainer}
            style={{ background: "#feff9c" }}
          >
            <Typography className={classes.invoiceTitle}>
              -- {t("termsandconditions.noteLabel")} --
            </Typography>
            <Box className={classes.dataViewBox}>
              <Grid container>
                <Grid item md xs={12}>
                  <Typography
                    variant="body1"
                    className="title"
                    style={{ color: "#4C5D6C" }}
                  >
                    {t("termsandconditions.noteContent")}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="valueView"
                    style={{ color: "#d32f2f" }}
                  >
                    {t("termsandconditions.Termsconditionslabel")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box> */}
        </div>
      </PaymentSecCard>
    </React.Fragment>
  );
};

export default withWidth()(PaymentSuccessful);
