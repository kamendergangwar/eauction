import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import { EmdLoanFormStyles } from "../EmdLoanForm.styles";
import {
  MakePaymentIcon,
  WhiteArrowIcon,
  ProjectSearchIcon,
  BillingIcon,
  QuestionMarkIcon,
  EChallanIcon,
  LoanAppliedGreenIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import Divider from "@material-ui/core/Divider";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getBillingDetails,
  masterDataSelector,
  calculateTotalBill,
  getBankList,
  getFeeStructure
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  razorpayTransmode,
  razorpayPaymentGatewaySelector,
  clearRazorpayTransmodeStates,
  clearRazorpayAfterPaymentStates
} from "../../../../redux/features/transaction/RazorpayPaymentSlice";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../redux/features/stepper/StepperSlice";
import CcavenuePaymentGateway from "../CcavenuePaymentGateway/CcavenuePaymentGateway";
import RazorpayPaymentGateway from "../RazorpayPaymentGateway/RazorpayPaymentGateway";
import Loading from "../../../atoms/Loading/Loading";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import GooglePayIcon from "../../../../assets/paymentModeIcons/googlePay.png";
import PaypalIcon from "../../../../assets/paymentModeIcons/paypal.png";
import AmazonPayIcon from "../../../../assets/paymentModeIcons/amazonPay.png";
import MasterCardIcon from "../../../../assets/paymentModeIcons/masterCard.png";
import VisaIcon from "../../../../assets/paymentModeIcons/visa.png";

const EmdLoanDetailsView = (props) => {
  const { width } = props;
  const classes = EmdLoanFormStyles();
  const { t } = useTranslation("BankDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [formValues, setFormValues] = useState(null);
  const [currentTotalBill, setCurrentTotalBill] = useState(0);
  const dispatch = useDispatch();
  const [isOpenPaymentGateway1, setOpenPaymentGateway1] = useState(false);
  const [isOpenPaymentGateway2, setOpenPaymentGateway2] = useState(false);
  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    isErrorApplicant,
    isFetchingApplicantGet,
    isSuccessResApplicant,
    errorMessage,
    applicantData
  } = useSelector(applicantSelector);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const {
    isFetchingFeeStrcr,
    isSuccessFeeStrcr,
    isErrorFeeStrcr,
    errorMsgFeeStrcr,
    dataFeeStrcr,
  } = useSelector(masterDataSelector);
  const {
    isFetchingRazorpayTransmode,
    isSuccessResRazorpayTransmode,
    isErrorRazorpayTransmode,
    errorMsgRazorpayTransmode,
    razorpayTransmodeData,

    isFetchingRazorpayAfterPayment,
    isSuccessResRazorpayAfterPayment,
    isErrorRazorpayAfterPayment,
    errorMsgRazorpayAfterPayment,
    razorpayAfterPaymentData,
  } = useSelector(razorpayPaymentGatewaySelector);
  // const { isEStampSelected } = useSelector(documentsSelector);
  const [tempBillingDetails, setTempBillingDetails] = useState({});
  const [paymentDetailsObj, setPaymentDetailsObj] = useState({});
  const [selectPaymentMode, setSelectPaymentMode] = useState("");

  useEffect(() => {
    dispatch(getApplicant());
    let check_loan_details = localStorage.getItem("paymentDetails");
    if (check_loan_details) {
      let bankDtls = JSON.parse(check_loan_details);
      setPaymentDetailsObj(bankDtls);
      let params = `ApplicantId=${localStorage.getItem("applicantId")}&BankId=${bankDtls.BankId}`
      dispatch(getFeeStructure(params));
    } else {
      history.goBack();
    }
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessFeeStrcr && dataFeeStrcr) {
      setTempBillingDetails(dataFeeStrcr);
    }
  }, [isSuccessFeeStrcr, dataFeeStrcr]);

  const initialValues = {
    howApplyForLoan: "",
  };

  const validationSchema = yup.object({
    howApplyForLoan: yup
      .string()
      .required(
        t("selectPaymentTypeSection.selectPaymentMethodError.required")
      )
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // if (values.howApplyForLoan === "online") {
    let sendObj = {
      "ApplicantId": applicantData.ApplicantId,
      "TransId": paymentDetailsObj.TransId,
      "BankId": paymentDetailsObj.BankId,
      "TransMode": values.howApplyForLoan,
      "LoanAmount": paymentDetailsObj?.emdPlusGst,
      "PayableAmount": tempBillingDetails?.PayableAmount
    };
    setSelectPaymentMode(values.howApplyForLoan);
    dispatch(razorpayTransmode(sendObj));
    // } else {
    //   history.push("/e-challan");
    // }
    /* console.log("values", values);
    let payment_details = {
      ...applicantData,
      totalAmount: currentTotalBill
    };
    localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
    setOpenPaymentGateway2(true); */
    // history.push("/payment-successful");
  };

  useEffect(() => {
    if (isSuccessResRazorpayTransmode && razorpayTransmodeData) {
      dispatch(clearRazorpayTransmodeStates());
      if (selectPaymentMode === "online") {
        let payment_details = {
          ...applicantData,
          ...paymentDetailsObj,
          totalAmount: razorpayTransmodeData.FeeDetail.PayableAmount,
          transactionId: razorpayTransmodeData.TransactionId,
          origin: "EMD"
        };
        localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
        setOpenPaymentGateway2(true);
      } else {
        let payment_details = {
          ...applicantData,
          ...paymentDetailsObj,
          ...razorpayTransmodeData
        };
        localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
        history.push("/e-challan");
      }
    }
  }, [isSuccessResRazorpayTransmode, razorpayTransmodeData]);

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    // dispatch(clearApplicantState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

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
    if (isSuccessResRazorpayAfterPayment && razorpayAfterPaymentData) {
      let payment_dtls = JSON.parse(localStorage.getItem("paymentDetails"));
      let new_obj = {
        ...payment_dtls,
        ...razorpayAfterPaymentData
      };
      localStorage.setItem("paymentDetails", JSON.stringify(new_obj));
      dispatch(clearRazorpayAfterPaymentStates());
      updateStepperUI();
    }
  }, [isSuccessResRazorpayAfterPayment, razorpayAfterPaymentData]);

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 4) {
        new_obj = {
          ...element,
          status: "completed"
        };
      } else {
        new_obj = {
          ...element
        };
      }
      newStepper.push(new_obj);
    }
    dispatch(addEditStepper(newStepper));
  };

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(clearSuperStepperEditVars());
      history.push("/payment-successful");
    }
  }, [dispatch, history, isSuccessReqStepper]);

  return (
    <>
      {(isFetchingApplicantGet || isFetchingStepper || isFetchingFeeStrcr || isFetchingRazorpayTransmode || isFetchingRazorpayAfterPayment) && (
        <Loading isOpen={isFetchingApplicantGet || isFetchingStepper || isFetchingFeeStrcr || isFetchingRazorpayTransmode || isFetchingRazorpayAfterPayment} />
      )}
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, values }) => (
          <Form noValidate autoComplete="off" className={classes.formContainer}>
            <FormCard>
              <Hidden smDown>
                <FormTitleBox
                  title={t("title")}
                  backUrl="/emd-loan-select-bank"
                  titleIcon={<MakePaymentIcon fontSize="large" />}
                />
              </Hidden>
              <Hidden mdUp>
                <StepperBar
                  callingForMobileIs={true}
                  title={t("title")}
                  backUrl="/emd-loan-select-bank"
                />
              </Hidden>
              <div className={classes.container}>
                <Box className={classes.payemtnDtlsFormSection}>
                  {isErrorApplicant && (
                    <AlertBox severity="error">{errorMessage}</AlertBox>
                  )}
                  {isErrorFeeStrcr && (
                    <AlertBox severity="error">{errorMsgFeeStrcr}</AlertBox>
                  )}
                  {isErrorRazorpayTransmode && (
                    <AlertBox severity="error">{errorMsgRazorpayTransmode}</AlertBox>
                  )}
                  {isErrorRazorpayAfterPayment && (
                    <AlertBox severity="error">{errorMsgRazorpayAfterPayment}</AlertBox>
                  )}
                  {isErrorStepper && (
                    <AlertBox severity="error">{errorMessageStepper}</AlertBox>
                  )}
                  <Grid container spacing={5} className={classes.paymentDtlsContainer}>
                    <Grid item md={6} xs={12}>
                      <Typography variant="body2" className={classes.tranSecTitle}>
                        {t("selectPaymentTypeSection.title")}
                      </Typography>
                      <Box className={classes.paymentTypeBoxView}>
                        <FormHelperText error variant="filled" style={{ marginBottom: 15 }}>
                          <ErrorMessage name="howApplyForLoan" />
                        </FormHelperText>
                        <Field
                          component={RadioGroup}
                          name="howApplyForLoan"
                          className={classes.radioGroupCont}
                        >
                          <Box className={`${classes.selectBox} ${values.howApplyForLoan === "online" ? "active" : ""}`}>
                            <FormControlLabel
                              className={classes.checkBoxCardTitle}
                              value="online"
                              control={<Radio color="primary" />}
                              label={
                                <Box>
                                  <Typography variant="h4" className={classes.checkBoxTitleLabel}>{t("selectPaymentTypeSection.transactionOnline")}</Typography>
                                  <Grid container>
                                    <Grid item>
                                      <Box className={classes.paymentMethodsIconBox}>
                                        <img src={GooglePayIcon} alt="G-Pay" />
                                      </Box>
                                    </Grid>
                                    <Grid item>
                                      <Box className={classes.paymentMethodsIconBox}>
                                        <img src={PaypalIcon} alt="PayPal" />
                                      </Box>
                                    </Grid>
                                    <Grid item>
                                      <Box className={classes.paymentMethodsIconBox}>
                                        <img src={AmazonPayIcon} alt="Amazon Pay" />
                                      </Box>
                                    </Grid>
                                    <Grid item>
                                      <Box className={classes.paymentMethodsIconBox}>
                                        <img src={VisaIcon} alt="VISA" />
                                      </Box>
                                    </Grid>
                                    <Grid item>
                                      <Box className={classes.paymentMethodsIconBox}>
                                        <img src={MasterCardIcon} alt="Master Card" />
                                      </Box>
                                    </Grid>
                                  </Grid>
                                  <Typography className={classes.checkBoxNoteText}>{t("selectPaymentTypeSection.noteParagraph")}</Typography>
                                </Box>
                              }
                            />
                          </Box>
                          <Box className={`${classes.selectBox} ${values.howApplyForLoan === "offline" ? "active" : ""}`}>
                            <FormControlLabel
                              className={classes.checkBoxCardTitle}
                              value="offline"
                              control={<Radio color="primary" />}
                              label={
                                <Box>
                                  <Typography variant="h4" className={classes.checkBoxTitleLabel}>{t("selectPaymentTypeSection.transactionOffline")}</Typography>
                                  <Typography className={classes.eChallanTxtIcon}><EChallanIcon />{t("selectPaymentTypeSection.eChallanTxt")}</Typography>
                                  <Typography className={classes.checkBoxNoteText}>{t("selectPaymentTypeSection.eChallanInfoTxt")}</Typography>
                                </Box>
                              }
                            />
                          </Box>
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Typography variant="body2" className={classes.tranSecTitle}>
                        {t("selectPaymentTypeSection.paymentSummary.title")}
                      </Typography>
                      <Box className={classes.paymentTypeBoxView}>
                        <Grid>
                          <Box className={classes.emdAmountList}>
                            <Typography className={classes.loanAppliedSuccess}>
                              <LoanAppliedGreenIcon /> {t("selectPaymentTypeSection.paymentSummary.statusTxt")}
                            </Typography>
                            <Grid
                              container
                              alignItems="center"
                              justify="space-between"
                            >
                              <Grid item md="auto">
                                <Typography className="totalAmtLabel">
                                  {t(
                                    "selectPaymentTypeSection.paymentSummary.appFeePlsGst"
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item md="auto">
                                <Typography className="AmtValue">
                                  ₹ {numberWithCommas(tempBillingDetails?.ApplicationFee)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box className={classes.emdAmountList}>
                            <Grid
                              container
                              alignItems="center"
                              justify="space-between"
                            >
                              <Grid item md="auto">
                                <Typography className="totalAmtLabel">
                                  {t(
                                    "selectPaymentTypeSection.paymentSummary.loanAmountforEMD"
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item md="auto">
                                <Typography className="textWarning">
                                  - ₹ {numberWithCommas(tempBillingDetails?.EMDAmount)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box className={classes.emdAmountList}>
                            <Grid
                              container
                              justify="space-between"
                            >
                              <Grid item md="auto">
                                <Typography className="totalAmtLabel">
                                  {t(
                                    "selectPaymentTypeSection.paymentSummary.bankProcessingFee"
                                  )}
                                </Typography>
                                <Typography className="forApplctnTxt">
                                  (
                                  {localStorage.getItem("i18nextLng") === "en" ? t("selectPaymentTypeSection.paymentSummary.forTxt") : ""}
                                  {" "}{tempBillingDetails?.Applications}{" "}
                                  {t("selectPaymentTypeSection.paymentSummary.applicationTxt")})
                                </Typography>
                              </Grid>
                              <Grid item md="auto">
                                <Typography className="AmtValue">
                                  + ₹ {numberWithCommas(tempBillingDetails?.ProcessingFee)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Divider />
                          <Box className={classes.listFooter}>
                            <Grid
                              container
                              alignItems="center"
                              justify="space-between"
                            >
                              <Grid item md="auto">
                                <Typography className="totalAmtLabel">
                                  {t(
                                    "selectPaymentTypeSection.paymentSummary.amountPayable"
                                  )}
                                </Typography>
                              </Grid>
                              <Grid item md="auto">
                                <Typography className="grandTotal">
                                  ₹ {numberWithCommas(tempBillingDetails?.PayableAmount)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className={classes.actionSection}>
                <Grid container alignItems="center" justify="flex-end">
                  <Grid item xs="auto">
                    {isFetchingApplicant &&
                      <Box>
                        <Typography className={classes.progressView}>
                          {t("savingLoaderTxt")}...
                        </Typography>
                      </Box>
                    }
                  </Grid>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={
                        <WhiteArrowIcon style={{ fill: "transparent" }} />
                      }
                      onClick={submitForm}
                    >
                      {t("saveButtonText")}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </FormCard>
          </Form>
        )}
      </Formik>
      {isOpenPaymentGateway1 && (
        <CcavenuePaymentGateway
          totalBill={currentTotalBill}
          applicantDetails={applicantData}
        />
      )}
      {isOpenPaymentGateway2 && (
        <RazorpayPaymentGateway
          setOpenPaymentGateway2={setOpenPaymentGateway2} />
      )}
    </>
  );
};

export default withWidth()(EmdLoanDetailsView);
