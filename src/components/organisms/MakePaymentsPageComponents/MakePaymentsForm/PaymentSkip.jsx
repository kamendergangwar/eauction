import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from "../../../molecules/FormControl/FormControl";
import { makePaymentsFormStyles } from "./MakePaymentsForm.styles";
import {
  BillingIcon,
  ReferralCodeIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import BillingTable from "../BillingTable/BillingTable";
import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import { getApplication } from "../../../../redux/features/application/ApplicationSlice";
import {
  getBillingDetails,
  masterDataSelector,
  calculateTotalBill,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  // getStepperDetails,
  addEditStepper,
  clearSuperStepperEditVars
} from "../../../../redux/features/stepper/StepperSlice";
/* import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice"; */
import Loading from "../../../atoms/Loading/Loading";
// import EStampBillingTable from "../../../molecules/Tables/EStampBillingTable/EStampBillingTable";
import { WhiteArrowIcon, MakePaymentIcon } from "../../../atoms/SvgIcons/SvgIcons";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import { ToWords } from 'to-words';

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});

const PaymentFlow = (props) => {
  const { width } = props;
  const classes = makePaymentsFormStyles();
  const { t } = useTranslation("BankDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [currentTotalBill, setCurrentTotalBill] = useState(0);
  const [postalAddressIs, setPostalAddressIs] = useState("");
  // const stepperData = useSelector((state) => state.stepper.stepperData);
  // const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);
  const dispatch = useDispatch();
  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    isErrorApplicant,
    isFetchingApplicantGet,
    isSuccessResApplicant,
    errorMessage,
    applicantData
  } = useSelector(applicantSelector);

  const { totalBill, totalEStampBill } = useSelector(masterDataSelector);
  // const { isEStampSelected } = useSelector(documentsSelector);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getApplication());
  }, [dispatch, t]);

  const initialValues = {
    referralCode: "",
    accountNumber: "",
    branchName: "",
    bankName: "",
    ifscCode: "",
  };

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      // console.log("applicantData", applicantData);
      /* let accountNo = "";
      if (applicantData.AccountNo) {
        if (applicantData.AccountNo !== "0") {
          accountNo = applicantData.AccountNo;
        } else {
          accountNo = "";
        }
      }
      let iFSCCode = "";
      if (applicantData.IFSCCode) {
        if (applicantData.IFSCCode !== "0") {
          iFSCCode = applicantData.IFSCCode;
        } else {
          iFSCCode = "";
        }
      }
      let bankName = "";
      if (applicantData.BankName) {
        if (applicantData.BankName !== "0") {
          bankName = applicantData.BankName;
        } else {
          bankName = "";
        }
      }
      let branchName = "";
      if (applicantData.BranchName) {
        if (applicantData.BranchName !== "0") {
          branchName = applicantData.BranchName;
        } else {
          branchName = "";
        }
      } */
      const savedValues = {
        referralCode: "",
        /* accountNumber: accountNo,
        ifscCode: iFSCCode,
        bankName: bankName,
        branchName: branchName, */
      };

      if (applicantData.IsEstamp) {
        if (applicantData.IsEstamp === "1") {
          setPostalAddressIs("yes");
        } else {
          setPostalAddressIs("no");
        }
      }
      // console.log("savedValues", savedValues);
      /* dispatch(
        eStampSelectOrDeselect(applicantData.IsEstamp === "1" ? true : false)
      ); */
      /* if (applicantData.IsEstamp === "1") {
        const latestTotalBill = totalBill + totalEStampBill;
        setCurrentTotalBill(latestTotalBill);
      }
      if (applicantData.IsEstamp === "0") {
        setCurrentTotalBill(totalBill);
      } */
      setCurrentTotalBill(totalBill);
      if (applicantData.IncomeGroup) {
        dispatch(getBillingDetails(applicantData.IncomeGroup));
      }
      setFormValues(savedValues);
    }
  }, [
    applicantData,
    dispatch,
    isSuccessResApplicantGet,
    totalBill
  ]);

  const validationSchema = yup.object({
    // accountNumber: yup
    //   .string()
    //   .required(
    //     t("bankForm.bankDetailsForm.formControl.accountNumberErrors.required")
    //   )
    //   .matches(
    //     /^\d{9,20}$/,
    //     t("bankForm.bankDetailsForm.formControl.accountNumberErrors.limitation")
    //   ),
    /* referralCode: yup
      .string()
      .required(
        t("bankForm.bankDetailsForm.formControl.branchNameErrors.required")
      )
      .matches(
        // /^[a-zA-Z]{3,50}$/,
        /^[a-zA-Z ]{3,50}$/,
        t("bankForm.bankDetailsForm.formControl.branchNameErrors.limitation")
      ), */
    // bankName: yup
    //   .string()
    //   .required(
    //     t("bankForm.bankDetailsForm.formControl.bankNameErrors.required")
    //   )
    //   .matches(
    //     /^[a-zA-Z ]{3,50}$/,
    //     t("bankForm.bankDetailsForm.formControl.bankNameErrors.limitation")
    //   ),
    // ifscCode: yup
    //   .string()
    //   .required(
    //     t("bankForm.bankDetailsForm.formControl.ifscCodeErrors.required")
    //   )
    //   .matches(
    //     /^[A-Z]{4}0[A-Z0-9]{6}$/,
    //     t("bankForm.bankDetailsForm.formControl.ifscCodeErrors.limitation")
    //   ),
  });

  const postalAddCheckChangehandle = (event) => {
    setPostalAddressIs(event.target.value);
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // console.log("values", values);
    /* const requestData = {
      // AccountNo: values.accountNumber,
      // IFSCCode: values.ifscCode,
      // BankName: values.bankName,
      // BranchName: values.branchName,
      // EmailId: applicantData.EmailId ? applicantData.EmailId : "paymentgateway.bulk@heliosadvisory.com",
      EmailId: applicantData.EmailId ? applicantData.EmailId : "",
      Type: "Bank",
      Lang: localStorage.getItem("i18nextLng")
    };
    dispatch(editApplicant(requestData)); */
    /* let payment_details = {
      ...applicantData,
      totalAmount: currentTotalBill
    }; */
    // localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
    history.push("/upload-documents");
  };

  /* useEffect(() => {
    if (isSuccessResApplicant) {
      let payment_details = {
        ...applicantData,
        totalAmount: currentTotalBill
      };
      localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
      dispatch(clearApplicantState());
      history.push("/emd-loan-application");
      // setOpenPaymentGateway2(true);
      // updateStepperUI();
    }
  }, [isSuccessResApplicant]); */

  /* useEffect(() => {
    if (isSuccessResApplicantGet) {
      dispatch(clearApplicantState());
      const stepper = stepperData.superStepper;
      const newStepper = [...stepper];
      newStepper[3] = {
        step: 3,
        description: "Make Payments",
        completed: true,
      };
      const requestData = {
        Applicantid: localStorage.getItem("applicantId"),
        Stepper: { superStepper: newStepper },
      };
      dispatch(addEditStepper(requestData));
      dispatch(getStepperDetails());
      setOpenPaymentGateway(true);
    }
  }, [dispatch, history, isSuccessResApplicantGet, stepperData]); */

  // useEffect(() => {
  // if (isSuccessResApplicantGet) {
  //   if (
  //     applicantData.FirstName &&
  //     applicantData.City &&
  //     applicantData.PresentDistrict &&
  //     applicantData.PresentState &&
  //     applicantData.Pincode &&
  //     applicantData.MobileNo &&
  //     applicantData.EmailId
  //   ) {
  //     console.log(
  //       applicantData.FirstName,
  //       applicantData.City,
  //       applicantData.PresentDistrict,
  //       applicantData.PresentState,
  //       applicantData.Pincode,
  //       applicantData.MobileNo,
  //       applicantData.EmailId
  //     );
  //     // setOpenPaymentGateway(true);
  //   }
  // }
  // }, [isSuccessResApplicantGet, applicantData]);

  /* const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: "#ddd",
    },
    tooltip: {
      backgroundColor: "#ddd",
    },
  }));

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
  }

  const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  };

  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "No") {
      history.push("/dashboard");
      setSelectedValue(null);
    }
  }; */

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      maxWidth: 454,
      color: '#65707D',
      fontSize: theme.typography.pxToRem(14),
      padding: 20,
      border: '1px solid #0038C0',
      boxShadow: '0px 4px 20px rgba(23, 33, 61, 0.06)',
      borderRadius: '8px',
    }
  }))(Tooltip);

  /* const goPreviousPage = () => {
    history.push("/submit-documents");
  }; */

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

  const amountToWords = (amount_val) => {
    return toWords.convert(amount_val);
  };

  const skipFlow = ()=> {
    history.push("/upload-documents");
  }

  return (
    <>
      {(isFetchingApplicantGet) && (
        <Loading isOpen={isFetchingApplicantGet} />
      )}
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue }) => (
          <Form noValidate autoComplete="off" className={classes.formContainer}>
            <FormCard>
              {/* <Hidden only={["sm", "md", "lg"]}>
                <Box marginLeft={2} paddingY={2}>
                  <Button
                    onClick={goPreviousPage}
                    color="primary"
                    startIcon={<NavigateBeforeIcon />}
                  >
                    {t("bankForm.backButtonText")}
                  </Button>
                </Box>
              </Hidden> */}
              <Hidden smDown>
                <FormTitleBox 
                title="Thank you page"
                  backUrl="/application-details"
                  titleIcon={<MakePaymentIcon fontSize="large" />} />
              </Hidden>
              <Hidden mdUp>
                <StepperBar
                  callingForMobileIs={true}
                  // title={t("title")}
                  backUrl="/application-details"
                />
              </Hidden>
              <div className={classes.container}>
                  <div className={classes.messageSection}>
                    <Typography variant="h5" className="thankTxt">Thank you, we have save all of your data for future use.</Typography>
                    <Typography variant="subtitle1">Please upload all necessary documents for fast process.</Typography>
                    <Typography variant="subtitle1">To upload a document, click the "Upload Documents" button below.</Typography>
                    <Typography variant="subtitle1">We will get back to you soon.</Typography>
                  </div>
                    
                
                {/* <div className={classes.checkboxSection}>
                  <Grid
                    container
                    spacing={width === "xs" ? 1 : 3}
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={6}>
                      <Typography className={classes.holdEmdTxt}>
                        Do you want to <strong>hold EMD</strong> for the next scheme?
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography color="primary" className={classes.headertxt}>
                                <strong>Holding EMD for next Scheme</strong>
                              </Typography>
                              <Typography variant="body2">
                                EMD (earnest money deposit) is a <strong>refundable amount</strong> in case your application doesn't get selected in the lottery. If you decide to apply for another scheme later, we will hold this amount and you will not have to pay again.
                              </Typography>
                            </React.Fragment>
                          }
                        >
                          <span className={classes.emdMoreTxt}>
                            Know Details
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.1111 16.4444H12.8889V11.1111H11.1111V16.4444ZM12 7.55556C11.5556 7.55556 11.1111 8 11.1111 8.44444C11.1111 8.88889 11.5556 9.33333 12 9.33333C12.4444 9.33333 12.8889 8.88889 12.8889 8.44444C12.8889 8 12.4444 7.55556 12 7.55556ZM12 4C7.55556 4 4 7.55556 4 12C4 16.4444 7.55556 20 12 20C16.4444 20 20 16.4444 20 12C20 7.55556 16.4444 4 12 4ZM12 18.2222C8.53333 18.2222 5.77778 15.4667 5.77778 12C5.77778 8.53333 8.53333 5.77778 12 5.77778C15.4667 5.77778 18.2222 8.53333 18.2222 12C18.2222 15.4667 15.4667 18.2222 12 18.2222Z" fill="url(#paint0_linear_6059_23991)" />
                              <defs>
                                <linearGradient id="paint0_linear_6059_23991" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                                  <stop offset="0.201042" stopColor="#0038C0" />
                                  <stop offset="0.878125" stopColor="#006FD5" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </span>
                        </HtmlTooltip>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RadioGroup
                        row
                        aria-label="postalAddSameIs"
                        name="postalAddSameIs1"
                        className={classes.yesOrNoRadioGroup}
                        value={postalAddressIs}
                        onChange={postalAddCheckChangehandle}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio color="primary" />}
                          label={t(
                            "billingDetails.isPostalAddYesTxt"
                          )}
                          labelPlacement="end"
                          className={`${classes.yesOrNoCheckBox} ${postalAddressIs == "yes" ? "active" : ""}`}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio color="primary" />}
                          label={t(
                            "billingDetails.isPostalAddNoTxt"
                          )}
                          labelPlacement="end"
                          className={`${classes.yesOrNoCheckBox} ${postalAddressIs == "no" ? "active" : ""}`}
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </div> */}

                {/* {isEStampSelected && (
                  <>
                    <IconTitle
                      icon={<EStampPinkIcon fontSize="large" />}
                      title={t(
                        "DocumentsPageTrans:eStampForm.billingSummary.title"
                      )}
                    />
                    <EStampBillingTable isRemoveOption={true} />
                  </>
                )} */}
              </div>
              <div className={classes.actionSection}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item xs="auto">
                    <Hidden mdUp>
                      <Typography className="cardTitle">{t("billingDetails.TotalTxt")}</Typography>
                      <Typography className="totalAmtView"><strong>₹ {numberWithCommas(currentTotalBill)}</strong></Typography>
                    </Hidden>
                    {isFetchingApplicant &&
                      <Box>
                        <Typography className={classes.progressView}>{t("savingLoaderTxt")}...</Typography>
                      </Box>
                    }
                  </Grid>
                  <Grid item xs="auto">
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={skipFlow}
                      endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                      style={{ marginRight: "30px" }}
                    >
                      Upload Documents
                    </Button>
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                      // onClick={submitForm}
                      disabled={currentTotalBill <= 0}
                    >
                      {t("saveButtonText")}
                    </Button> */}
                  </Grid>
                </Grid>
              </div>
            </FormCard>
            {/* <Box
              marginY={width === "xs" ? 1 : 4}
              paddingY={width === "xs" ? 2 : 0}
              paddingX={2}
            >
              <Grid
                container
                spacing={2}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Hidden only="xs">
                  <Grid item xs={12} sm={2} md={2} lg={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<NavigateBeforeIcon />}
                      fullWidth
                      onClick={goPreviousPage}
                    >
                      {t("bankForm.backButtonText")}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={4} lg={6}></Grid>
                </Hidden>
                <Grid item xs={12} sm={3} md={3} lg={2}>
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => handleOnSkip("openDialog")}
                  >
                    {t("bankForm.completeLaterButtonText")}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                    fullWidth
                    onClick={submitForm}
                  >
                    {t("bankForm.saveButtonText")} ₹{numberWithCommas(currentTotalBill)}
                  </Button>
                </Grid>
              </Grid>
            </Box> */}
          </Form>
        )}
      </Formik>
      {/* <ConfirmDialogBox
        title={t("Translation:skipDialog.title")}
        description={t("Translation:skipDialog.description")}
        question={t("Translation:skipDialog.question")}
        selectedValue={selectedValue}
        open={skipDialogOpen}
        onClose={handleCloseSkipDialog}
      /> */}
    </>
  );
};

export default withWidth()(PaymentFlow);
