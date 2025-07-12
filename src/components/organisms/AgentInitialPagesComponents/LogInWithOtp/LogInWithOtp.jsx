import React, { useRef, useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { DialogBackArrowIcon } from "../../../atoms/SvgIcons/SvgIcons";
import TitleDescriBox from "../../../atoms/TitleDescriBox/TitleDescriBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import VerifyOTP from "../../../../assets/VerifyOTP.svg";
import OTP from "../../../../assets/OTP.png";
import { initialPagesStyles } from "../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  sendOrResendOtp,
  loginMobile,
  applicantAuthSelector,
  clearAuthState,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import {
  getApplicantTermAndCondition,
  applicantSelector,
  clearApplicantState,
  clearApplicantData
} from "../../../../redux/features/applicant/ApplicantSlice";
import { clearSuperStepperEditVars, getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { LockIcon } from "../../../atoms/SvgIcons/SvgIcons";
import InputAdornment from "@material-ui/core/InputAdornment";
import { isSchemeExpired, masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import { Fcfs_Flow } from "../../../../utils/Common";
import { ApplicantProgressSelector, clearApplicantStepper, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { clearFamilyData, clearFamilyState } from "../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import { Divider } from "@material-ui/core";
import { changeReadInstructionErrorMessage, uncontrolledFormSelector } from "../../../../redux/features/uncontrolledForm/UncontrolledForm";

const LogInWithOtp = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const formikRef = useRef();
  const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [countOtp, setCountOtp] = React.useState(90);
  const [redirectLogin, setRedirectLogin] = React.useState("");
  const dispatch = useDispatch();
  const { isReadInstruction } = useSelector(uncontrolledFormSelector);
  const {
    mobileResponseData,
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    isOtpSuccess,
    mobileUserErrorData,
    loginUserData,
    resendOtpData
  } = useSelector(applicantAuthSelector);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const { isFetchingAplcntTermsCndtn,
    isSuccessResAplcntTermsCndtn,
    isErrorAplcntTermsCndtn,
    errorMsgAplcntTermsCndtn,
    aplcntTermsCndtnData } = useSelector(applicantSelector);
  const [customErrorMsg, setCustomErrorMsg] = React.useState("");
  const [saveValuesForVerify, setSaveValuesForVerify] = React.useState({});
  const { isSuccessProgressResStepper, superActiveStep } = useSelector(ApplicantProgressSelector);
  const lang = localStorage.getItem("i18nextLng");

  // if (localStorage.getItem("jwtToken")) {
  //   history.push('/dashboard');
  // }

  useEffect(() => {
    const search = window.location.search;
    if (search == "?skip=prelaunch") {
      localStorage.setItem("skipFlow", true);
    } else {
      localStorage.setItem("skipFlow", false);
    }
  }, []);

  useEffect(() => {
    if (redirectLogin) {
      history.push(redirectLogin);
    }
  }, [redirectLogin])
  const otpCounter = () => {
    dispatch(clearAuthState());
    let timeleft = 90;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
      }
      setCountOtp(timeleft);
      timeleft -= 1;
    }, 1000);
  };

  useEffect(() => {
    if (isOtpSuccess) {
      dispatch(getApplicantProgress())
    }
  }, [dispatch, isOtpSuccess])
  useEffect(() => {
    if (isSuccessProgressResStepper) {
      switch (superActiveStep) {
        case 1:
          setRedirectLogin("/dashboard");
          break;
        case 2:
          setRedirectLogin("/terms-conditions");
          break;
        case 3:
          // setRedirectLogin("/question-1");
          setRedirectLogin("/dashboard");
          break;
        case 4:
          // setRedirectLogin("/add-co-applicant");
          setRedirectLogin("/dashboard");
          break;
        case 5:
          // setRedirectLogin("/income-details");
          setRedirectLogin("/dashboard");
          break;
        case 6:
          setRedirectLogin("/dashboard");
          break;
        case 7:
          setRedirectLogin("/dashboard");
          break;
        case 8:
          setRedirectLogin("/dashboard");
          break;
        case 9:
          setRedirectLogin("/dashboard");
          break;
        case 10:
          setRedirectLogin("/dashboard");
          break;
        case 11:
          setRedirectLogin("/dashboard");
          break;
        default:
          setRedirectLogin("/dashboard");
      }
    }
  }, [isSuccessProgressResStepper])
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setResenOtpText(true), 90000);
      setIsGeneratedOtp(true);
      // dispatch(clearApplicantStepper())
      otpCounter();
      // dispatch(clearAuthState());
      // let timeleft = 59;
      // var downloadTimer = setInterval(function () {
      //   if (timeleft <= 0) {
      //     clearInterval(downloadTimer);
      //   }
      //   setCountOtp(10 - timeleft);
      //   timeleft -= 1;
      // }, 1000);
    }
    if (isOtpSuccess) {
      // handleRedirection(superActiveStep);

      if (mobileResponseData.isTermsConditionsAccepted === "0") {
        dispatch(clearAuthState());
      } else {
        let url_param = localStorage.getItem("urlParam");
        if (url_param && url_param === "grievance") {
          dispatch(clearAuthState());
          history.push("/dashboard");
        } else {
          dispatch(getStepperDetails());
        }
      }
    }
    //for fcfs flow on or not
    if (isOtpSuccess) {
      // if(mobileResponseData.fcfs_flow === "on"){
      //   localStorage.setItem("fcfsFlow", true);
      // }
      // else{
      //   localStorage.setItem("fcfsFlow", false)
      // }
      localStorage.setItem("fcfsFlow", Fcfs_Flow);
    }
    if (isError) {
      if (mobileUserErrorData?.Link || resendOtpData?.Link) {
        let msgArr = errorMessage.split(/click here/gi);
        let save_values = {
          // ...saveValuesForVerify,
          Password: "dummyPass@123",
          IsMobileVerified: mobileUserErrorData.IsMobileVerified || resendOtpData.IsMobileVerified,
          mobileNumber: localStorage.getItem("mobileNo")
        };
        let msgText = [
          <span key={0}>{msgArr[0]},</span>,
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={() => goToSignUpForVerify(save_values)}
            key={1}
            style={{ color: "#007ae7", cursor: "pointer" }}
          >
            {t("loginWithOtpForm.formControl.clickhere")}
          </a>,
          <span key={2}>{" "}
            {/* {msgArr[1]} */}
            {"to validate"}
          </span>,
        ];
        setCustomErrorMsg(msgText);
      } else {
        setCustomErrorMsg(errorMessage);
      }
    }
  }, [dispatch, history, t, isError, errorMessage, isOtpSuccess, isSuccess, redirectLogin, isSuccessProgressResStepper]);

  // useEffect(()=>{
  //   if(isSuccessProgressResStepper){
  //       if(superActiveStep>10){
  //       localStorage.setItem("dashboardTabIndex", 1)
  //       }
  //       localStorage.setItem("activeStep",superActiveStep)
  //   }
  // },[isSuccessProgressResStepper])

  useEffect(() => {
    if (isSuccessResStepper) {
      if (localStorage.getItem("applicantId")) {
        dispatch(getApplicantTermAndCondition());
      }
      /* const stepper = stepperData.superStepper;
      if (localStorage.getItem("applicantId")) {
        if (!stepper[0].subStepper[0].completed) {
          history.push("/personal-details");
        } else if (!stepper[0].subStepper[1].completed) {
          history.push("/contact-details");
        } else if (!stepper[0].subStepper[2].completed) {
          history.push("/family-details");
        } else if (!stepper[1].subStepper[0].completed) {
          history.push("/category-details");
        } else if (!stepper[1].subStepper[1].completed) {
          history.push("/select-projects");
        } else if (!stepper[2].completed) {
          history.push("/submit-documents");
        } else if (!stepper[3].completed) {
          history.push("/make-payments");
        } else {
          history.push("/dashboard");
        }
      } */
    }
  }, [history, isSuccessResStepper, stepperData]);

  useEffect(() => {
    if (isSuccessResAplcntTermsCndtn) {
      if (localStorage.getItem("applicantId")) {
        if (aplcntTermsCndtnData === "1") {
          const stepper = stepperData.superStepper;
          let redirect_url = "";
          for (let i = 0; i < stepper[0].applicantKycStepper.length; i++) {
            const element = stepper[0].applicantKycStepper[i];
            if (element.step === 1) {
              if (element.status !== "completed") {
                redirect_url = "/auth-verify-aadhaar";
                break;
              }
            }
            // else if (element.step === 2) {
            //   if (element.status !== "completed") {
            //     redirect_url = "/upload-aadhaar";
            //     break;
            //   }
            // }
            else if (element.step === 2) {
              if (element.status !== "completed") {
                redirect_url = "/verify-pancard";
                break;
              }
            }
            // else if (element.step === 4) {
            //   if (element.status !== "completed") {
            //     redirect_url = "/upload-pancard";
            //     break;
            //   }
            // } else if (element.step === 5) {
            //   if (element.status !== "completed") {
            //     redirect_url = "/bank-account-detail";
            //     break;
            //   }
            // } else if (element.step === 6) {
            //   if (element.status !== "completed") {
            //     redirect_url = "/upload-cheque";
            //     break;
            //   }
            // }
          }
          // if (!redirect_url) {
          //   if (!(mobileResponseData.agreed_declaration === "1")) {
          //     localStorage.setItem("agreedDeclaration", true);
          //     redirect_url = "/upload-cheque";
          //   }
          // }
          if (!redirect_url) {
            if (!(mobileResponseData.isPmyNonPmyFlowCompleted === "1")) {
              redirect_url = "/question-1";
            }
          }
          if (!redirect_url) {
            for (let i = 0; i < stepper[0].coApplicantKycStepper.length; i++) {
              const element = stepper[0].coApplicantKycStepper[i];
              if (stepper[0].coApplicantKycStepper[0].step === 1) {
                if (stepper[0].coApplicantKycStepper[0].status === "completed") {

                  // if (element.step === 2) {
                  //   if (element.status !== "completed") {
                  //     redirect_url = "/co-applicant-upload-aadhaar";
                  //     break;
                  //   }
                  // }
                  if (element.step === 3) {
                    if (element.status !== "completed") {
                      redirect_url = "/co-applicant-verify-pancard";
                      break;
                    }
                  }
                  // else if (element.step === 4) {
                  //   if (element.status !== "completed") {
                  //     redirect_url = "/co-applicant-upload-pancard";
                  //     break;
                  //   }
                  // }
                } else {
                  break;
                }
              }
            }
          }
          // Commented this dynamic logic
          // if (!redirect_url) {
          //   for (let i = 0; i < stepper.length; i++) {
          //     const element = stepper[i];
          //     if (element.step === 1) {
          //       if (element.status !== "completed") {
          //         redirect_url = "/personal-details";
          //         break;
          //       }
          //     } else if (element.step === 2) {
          //       if (element.status !== "completed") {
          //         redirect_url = "/category-details";
          //         break;
          //       }
          //     } else if (element.step === 3) {
          //       if (element.status !== "completed") {
          //         redirect_url = "/document-declaration";
          //         break;
          //       }
          //     } else if (element.step === 4) {
          //       if (element.status !== "completed") {
          //         redirect_url = "/make-payments";
          //         break;
          //       }
          //     }
          //   }
          // }
          if (!redirect_url) {
            redirect_url = "/dashboard";
          }
          dispatch(clearAuthState());
          history.push(redirect_url);
        } else {
          dispatch(clearAuthState());
          history.push("/terms-conditions");
        }
      }
    }
  }, [isSuccess, aplcntTermsCndtnData, isSuccessResAplcntTermsCndtn]);

  const goToSignUpForVerify = (getValues) => {
    console.log("getValues", getValues);
    localStorage.setItem("userVerifyCredentials", JSON.stringify(getValues));
    history.push("/");
    // const requestData = {
    //   MobileNo: localStorage.getItem("mobileNo"),
    //   Type: "Reverify",
    // };
    // dispatch(sendOrResendOtp(requestData));
  };

  const initialValues = {
    mobileNumber: "",
    oneTimePassword: "",
  };

  const validateMobileNumber = (value) => {
    let error;
    if (!value) {
      error = t("loginWithOtpForm.formControl.phoneNumberErrors.required");
    } else if (!/^[6-9]\d{9}$/i.test(value)) {
      error = t("loginWithOtpForm.formControl.phoneNumberErrors.limitation");
    }
    return error;
  };

  const validateOTP = (value) => {
    let error;
    if (!value) {
      error = t("loginWithOtpForm.formControl.oneTimePasswordErrors.required");
    } else if (!/^[0-9]{6}$/i.test(value)) {
      error = t(
        "loginWithOtpForm.formControl.oneTimePasswordErrors.limitation"
      );
    }
    return error;
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.mobileNumber && values.oneTimePassword === "") {

      // if(!isReadInstruction) {
      //   dispatch(changeReadInstructionErrorMessage("Please make sure, you read the instructions"))
      //   return;
      // }

      // * Clear Previous Applicant data before login Start
      dispatch(clearSuperStepperEditVars());
      dispatch(clearAuthState());
      dispatch(clearApplicantData());
      dispatch(clearApplicantState());
      dispatch(clearFamilyData());
      dispatch(clearFamilyState());

      dispatch(clearApplicantStepper())
      var myItem = localStorage.getItem('i18nextLng');
      localStorage.clear();
      if (myItem) {
        localStorage.setItem('i18nextLng', myItem);
      }
      // * Clear Previous Applicant data before login End
      localStorage.setItem("mobileNo", values.mobileNumber)
      const requestData = {
        MobileNo: values.mobileNumber,
        Type: "MobileLogin",
      };
      dispatch(sendOrResendOtp(requestData));
    }
    if (values.oneTimePassword) {
      const requestData = {
        MobileNo: values.mobileNumber,
        otp: values.oneTimePassword.toString(),
      };
      localStorage.setItem("mobileNo", values.mobileNumber);
      setSaveValuesForVerify(requestData);
      dispatch(loginMobile(requestData));
    }
  };

  const resendOtp = (value) => {
    const requestData = {
      MobileNo: value,
      Type: "MobileLogin",
    };
    dispatch(sendOrResendOtp(requestData));
    setResenOtpText(false);
    const formik = formikRef.current;
    formik.values.oneTimePassword = ""
    setTimeout(() => setResenOtpText(true), 90000);
    otpCounter();
  };

  useEffect(() => {
    // const formik = formikRef.current;
    // formik.resetForm();
    // setIsGeneratedOtp(false);
    dispatch(clearAuthState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const reEnterMobileNumber = () => {
    setIsGeneratedOtp(false);
    setResenOtpText(false);
    dispatch(clearAuthState());
    const formik = formikRef.current;
    formik.values.oneTimePassword = ""
  };

  return (
    <AuthTemplate>
      {isFetching && <Loading isOpen={isFetching} />}
      <div
        className={classes.root}
        style={
          {
            // marginTop: width === "xs" ? theme.spacing(10) : theme.spacing(16),
            // backgroundColor: "pink",
            // height: 520,
          }
        }
      >
        {/* {!isGeneratedOtp &&
          <IconButton
            aria-label="Close"
            // onClick={() => history.goBack()}
            className={classes.closeBtn}
          >
            <CloseOutlinedIcon />
          </IconButton>
        } */}
        {isGeneratedOtp &&
          <IconButton
            aria-label="Close"
            onClick={reEnterMobileNumber}
            className={`${classes.closeBtn} back`}
          >
            <DialogBackArrowIcon size="small" />
          </IconButton>
        }
        <TitleDescriBox
          title={
            isGeneratedOtp
              ? t("loginWithOtpForm.formControl.verifyAccount")
              : t("loginForm.title")
          }
          description={isGeneratedOtp ? t("loginWithOtpForm.description2")
            :
            t("loginWithOtpForm.description1")}
          brkTxt={isGeneratedOtp && (<span className={`${classes.mobileNuTxt}`}> {"+91 " + mobileNumber} </span>)}
        /* description={
          isGeneratedOtp ? (lang != 'en' ?
            (t("loginWithOtpForm.description3") + " +91 " + mobileNumber + " " + t("loginWithOtpForm.description4"))
            : t("loginWithOtpForm.description2") + " +91 " + mobileNumber)
            : t("loginWithOtpForm.description1") + " +91 " + mobileNumber
        } */
        />

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              {!isGeneratedOtp && (
                <>
                  {/* <Box textAlign="center" marginY={2}>
                    <img className={classes.iconStyle} src={OTP} alt="OTP" />
                  </Box> */}
                  {isError && (
                    <AlertBox severity="error">{customErrorMsg}</AlertBox>
                  )}
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t("loginWithOtpForm.formControl.phoneNumberLabel")}
                    placeholder={t(
                      "loginWithOtpForm.formControl.phoneNumberPlaceholder"
                    )}
                    name="mobileNumber"
                    // type="number"
                    type="text"
                    id="mobileNumber"
                    required
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                    }}
                    inputProps={{
                      maxLength: 10,
                    }}
                    /* onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }} */
                    validate={validateMobileNumber}
                    onChange={(e) => {
                      setFieldValue("mobileNumber", e.target.value);
                      setMobileNumber(e.target.value);
                      /* setMobileNumber(
                        e.target.value.slice(0, 2) +
                        `*******` +
                        e.target.value.slice(e.target.value.length - 1)
                      ); */
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <strong>+91 - </strong>{" "}
                        </InputAdornment>
                      ),
                    }}
                  // autoFocus={true}
                  />
                  {/* <Box marginY={5} />
                  <Box marginY={5} />

                  <Box marginY={5} /> */}

                  <Box textAlign="center" marginTop={5} marginBottom={5}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      // onClick={submitForm}
                      fullWidth={width === "xs" ? true : false}
                      className={width === "xs" ? null : classes.button}
                    >
                      {t("loginWithOtpForm.formControl.generateOTPButtonText")}
                    </Button>
                  </Box>
                  {/* <Box display="flex" alignItems="center">
                    <div className={classes.dividerLine} />
                    <span className={classes.content}>
                      {t("loginForm.formControl.or")}
                    </span>
                    <div className={classes.dividerLine} />
                  </Box> */}
                  {/* <Box textAlign="center" marginTop={5} marginBottom={12}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      startIcon={<LockIcon fontSize="large" />}
                      onClick={() => history.push("/login")}
                      fullWidth={width === "xs" ? true : false}
                      className={width === "xs" ? null : classes.button}
                    >
                      {t("loginWithOtpForm.formControl.loginWithPasswordText")}
                    </Button>
                  </Box> */}
                  {/* <Box marginY={5} />
                  <Box marginY={5} />
                  <Box marginY={5} /> */}

                  <Box textAlign="center" marginBottom={1.5}>
                    <Typography className={classes.bottomTxtView}>
                      <Trans i18nKey="InitialPageTrans:loginForm.formControl.messageText">
                        Don’t have an account?
                        <Link to="/">
                          Register for New Account.
                        </Link>
                      </Trans>
                    </Typography>
                  </Box>
                  {/* <Box textAlign="center" paddingY={2}>
                    <Typography variant="body1" gutterBottom>
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "#007ae7" }}
                      >
                        {t(
                          "loginWithOtpForm.formControl.loginWithPasswordText"
                        )}
                      </Link>
                    </Typography>
                  </Box> */}
                </>
              )}
              {isGeneratedOtp && (
                <>
                  {/* <Box textAlign="center" marginY={10}>
                    <img
                      className={classes.iconStyle}
                      src={VerifyOTP}
                      alt="Verify OTP"
                    />
                  </Box> */}
                  {isError && (
                    <AlertBox severity="error">{customErrorMsg}</AlertBox>
                  )}
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "loginWithOtpForm.formControl.oneTimePasswordInputLabel"
                    )}
                    placeholder={t(
                      "loginWithOtpForm.formControl.oneTimePasswordPlaceholder"
                    )}
                    name="oneTimePassword"
                    type="tel"
                    id="oneTimePassword"
                    required
                    // onInput={(e) => {
                    //   e.target.value = Math.max(0, parseInt(e.target.value))
                    //     .toString()
                    //     .slice(0, 6);
                    // }}
                    inputProps={{ maxLength: 6 }}
                    validate={validateOTP}
                  // autoFocus={true}
                  />
                  {!isResenOtpText && resendOtpData?.ResendOTP != false && (
                    <Box textAlign="left">
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#65707D" }}
                      >
                        {t("loginWithOtpForm.formControl.ResendOTPin0")} 00:{countOtp} {t("loginWithOtpForm.formControl.ResendOTPin1")}
                      </Typography>
                    </Box>
                  )}
                  {isResenOtpText && resendOtpData?.ResendOTP != false && (
                    <Box display="flex">
                      <Box marginLeft={1}>
                        <Typography variant="body2" gutterBottom>
                          <Link
                            to="#"
                            onClick={() => resendOtp(values.mobileNumber)}
                            style={{ textDecoration: "none", color: "#0038C0", fontWeight: 600 }}
                          >
                            {t("loginWithOtpForm.formControl.resendText")}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Box textAlign="center" marginY={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      // onClick={submitForm}
                      fullWidth={width === "xs" ? true : false}
                      className={width === "xs" ? null : classes.button}
                    >
                      {t("loginForm.formControl.buttonText")}
                    </Button>
                  </Box>
                  {/* <Box textAlign="center" paddingY={2}>
                    <Typography variant="body1" gutterBottom>
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "#007ae7" }}
                      >
                        {t(
                          "loginWithOtpForm.formControl.loginWithPasswordText"
                        )}
                      </Link>
                    </Typography>
                  </Box> */}
                </>
              )}
              {/* <Box display="flex" paddingX={1} paddingY={2}>
                <Box flexGrow={1}>
                  <Typography variant="body1" gutterBottom>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "#007ae7" }}
                    >
                      {t("loginWithOtpForm.formControl.loginWithPasswordText")}
                    </Link>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" gutterBottom>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "#007ae7" }}
                    >
                      {t("signUpForm.formControl.buttonText")}
                    </Link>
                  </Typography>
                </Box>
              </Box> */}
              {/* <Divider />
              <Typography style={{marginTop:24}} align="center">{t("onboarding.noticePoint5")}:  <br /><span style={{ color: "#0038C0", fontWeight: "700" }}> +91 9930870000</span></Typography> */}
            </Form>
          )}
        </Formik>
      </div>
    </AuthTemplate>
  );
};

export default withWidth()(LogInWithOtp);
