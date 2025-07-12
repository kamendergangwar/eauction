import React, { useEffect, useState, useRef } from "react";
import i18n from "i18next";
import { useTranslation, Trans } from "react-i18next";
import { useHistory, Link, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { CloseIcon, DialogBackArrowIcon } from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import { useSelector, useDispatch } from "react-redux";
import TitleDescriBox from "../../../atoms/TitleDescriBox/TitleDescriBox";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import FormControl from "../../../molecules/FormControl/FormControl";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { initialPagesStyles } from "../InitialPages.styles";
import {
  signupUser,
  applicantAuthSelector,
  clearAuthState,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import { addEditStepper, clearSuperStepperEditVars } from "../../../../redux/features/stepper/StepperSlice";
import { getAccessToken, createAccountLog } from "../../../../redux/features/masterdata/MasterDataSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import Recaptcha from "react-google-invisible-recaptcha";
import axios from "axios";
import { SiteKey, SecretKey, Fcfs_Flow } from "../../../../utils/Common";
// import VerifyOTP from "../../../../assets/VerifyOTP.svg";
import {
  sendOrResendOtp,
  verifyOtp,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";
import SignUpPC from "../../../../assets/SignUpPC.svg";
import { masterDataSelector, isSchemeExpired } from "../../../../redux/features/masterdata/MasterDataSlice";
import { addEditApplicantProgress, ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from "@material-ui/core";
import { truncate } from "lodash";
import { changeReadInstructionErrorMessage, uncontrolledFormSelector } from "../../../../redux/features/uncontrolledForm/UncontrolledForm";
import Onboarding from "../Onboarding/Onboarding";
import { RegistrationStepperSave, RegistrationStepperSelector, getRegistrationProgress } from "../../../../redux/features/registration/registrationStepperSlice";

const languages = [
  { code: "mr", label: "मराठी" },
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

const SignUp = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const refRecaptcha = useRef(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [errorVerified, setErrorVerified] = useState(false);
  const [isGeneratedOtp, setIsGeneratedOtp] = useState(false);
  const [isResenOtpText, setResenOtpText] = useState(false);
  const [userVerifyCrdtls, setUserVerifyCrdtls] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const currentLanguage = (element) =>
    element.code === localStorage.getItem("i18nextLng");
  const [selectedIndex, setSelectedIndex] = useState(
    languages.findIndex(currentLanguage)
  );
  const [progress, setProgress] = useState(0);
  const [atleast1UppercaseLetterIs, setAtleast1UppercaseLetterIs] =
    useState(false);
  const [atleast1LowercaseLetterIs, setAtleast1LowercaseLetterIs] =
    useState(false);
  const [atleast1DigitIs, setAtleast1DigitIs] = useState(false);
  const [atleast1SpecialCharIs, setAtleast1SpecialCharIs] =
    useState(false);
  const [passStrengthTxt, setPassStrengthTxt] = useState("");
  const [countOtp, setCountOtp] = useState(90);
  const [showNotice, setShowNotice] = useState(true)

  const { isReadInstruction } = useSelector(uncontrolledFormSelector);

  const { isErrorScheme } = useSelector(masterDataSelector);

  const {
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    isOtpSuccess,
    signupUserErrorData,
    resendOtpData
  } = useSelector(applicantAuthSelector);

  const {
    isFetchingStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
  } = useSelector((state) => state.stepper);

  const { isFetchRegStepper,
    isSuccessgetRegStepper,
    getRegStepper,
    getRegActiveStep,
    isErrorgetRegStepper,
    getRegStepperData,
    errorMessagegetRegStepper,
    getRegTotalStep,
    isSuccessRegStepper,
  } = useSelector(RegistrationStepperSelector);


  const superStepper = useSelector((state) => state.stepper.superStepper);
  const ApplicantSuperStepper = useSelector((state) => state.applicantStepper.superStepper);
  const [errorMsgSignUp, setErrorMsgSignUp] = useState("");
  const [urlSource, setUrlSource] = useState("");
  const [prelaunch, setPrelaunch] = useState(false);
  const [isReverify, setIsReverify] = useState(false);

  useEffect(() => {
    if (isSuccessgetRegStepper) {
      const number = formikRef.current.values.mobileNumber;
      localStorage.setItem("mobileNo", number)
      history.push("/registration");
    }

  }, [isSuccessgetRegStepper])


  useEffect(() => {
    const readNotice = sessionStorage.getItem("isReadNotice")
    if (readNotice) {
      setShowNotice(false)
    }
  }, [showNotice])

  const otpCounter = () => {
    // dispatch(clearAuthState());
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
    if (isSuccess) {
      // const timer = setTimeout(() => setResenOtpText(true), 90000);
      setTimeout(() => setResenOtpText(true), 90000);
      setIsGeneratedOtp(true);
      otpCounter();
      /* const requestData = {
        Applicantid: localStorage.getItem("applicantId"),
        Stepper: { superStepper: superStepper },
      }; */
      dispatch(clearAuthState());
    }
    if (isOtpSuccess) {
      // dispatch(addEditStepper(superStepper));
      // dispatch(addEditApplicantProgress(ApplicantSuperStepper))
      dispatch(RegistrationStepperSave('1'));
      
      dispatch(clearAuthState());
      // history.push("/set-password");
      localStorage.removeItem("mobileNo");
    }
    if(isSuccessRegStepper ){
      dispatch(getRegistrationProgress());
    }
    if (isError) {
      if (signupUserErrorData?.Link) {
        const mobileData = { mobileNumber: localStorage.getItem("mobileNo") }
        /* let msgArr = errorMessage.split(/click here/gi);
        console.log("initialValues", initialValues);
        let msgText = [<span key={0}>{msgArr[0]}</span>, <a onClick={() => cloneOfOnSubmit(initialValues)} key={1} style={{ color: "#007ae7", cursor: "pointer" }}>click here</a>, <span key={2}>{msgArr[1]}</span>];
        setErrorMsgSignUp(msgText);
        setIsGeneratedOtp(true); */
        sendOtpForVerify(mobileData);
      }
      setErrorMsgSignUp(errorMessage);
    }
  }, [
    isError,
    errorMessage,
    isSuccess,
    isOtpSuccess,
    isSuccessRegStepper 
  ]);

  // useEffect(() => {
  //   if (isSuccessProgressReqStepper) {
  //     dispatch(getApplicantProgress());
  //   }
  // }, [isSuccessProgressReqStepper])

  useEffect(() => {
    var checkUserCredentials = localStorage.getItem("userVerifyCredentials");
    if (checkUserCredentials) {
      checkUserCredentials = JSON.parse(checkUserCredentials);
      if (checkUserCredentials.IsMobileVerified == 0) {
        initialValues.mobileNumber = checkUserCredentials.mobileNumber;
        initialValues.password = checkUserCredentials.Password;
        initialValues.confirmPassword = checkUserCredentials.Password;
        sendOtpForVerify(checkUserCredentials);
        setIsReverify(true);
      }
    }
  }, []);

  // useEffect(() => {
  //   const formik = formikRef.current;
  //   formik.resetForm();
  // }, [t]);

  const sendOtpForVerify = (user_data) => {
    const requestData = {
      MobileNo: user_data.mobileNumber,
      Type: "Reverify",
    };
    dispatch(sendOrResendOtp(requestData));
    setIsGeneratedOtp(true);
    localStorage.removeItem("userVerifyCredentials")
  };

  const handleOnLangChange = (event, index) => {
    i18n.changeLanguage(languages[index].code);
    setSelectedIndex(index);
  };
  const initialValues = {
    fullname: "",
    mobileNumber: "",
    oneTimePassword: "",
  };

  const validationSchema = yup.object({
    fullname: !isGeneratedOtp && yup
      .string()
      .required(t("signUpForm.formControl.fullname.required"))
      .matches(
        /^[\u0900-\u097F.~a-zA-Z ]*$/,
        t("signUpForm.formControl.fullname.limitation")
      ),
    mobileNumber: !isGeneratedOtp && yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t("signUpForm.formControl.phoneNumberErrors.limitation")
      )
      .required(t("signUpForm.formControl.phoneNumberErrors.required")),
    // password: yup
    //   .string()
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])(?=.{8,50})/,
    //     t("signUpForm.formControl.passwordErrors.limitation")
    //   )
    //   .required(t("signUpForm.formControl.passwordErrors.required")),
    // confirmPassword: yup
    //   .string()
    //   .when("password", {
    //     is: (val) => (val && val.length > 0 ? true : false),
    //     then: yup
    //       .string()
    //       .oneOf(
    //         [yup.ref("password")],
    //         t("signUpForm.formControl.confirmPasswordErrors.limitation")
    //       ),
    //   })
    //   .required(t("signUpForm.formControl.confirmPasswordErrors.required")),
  });

  const validateOTP = (value) => {
    let error;
    if (!value) {
      error = t(
        "forgotPasswordForm.formControl.oneTimePasswordErrors.required"
      );
    } else if (!/^[0-9]{6}$/i.test(value)) {
      error = t(
        "forgotPasswordForm.formControl.oneTimePasswordErrors.limitation"
      );
    }
    return error;
  };

  /* const passwordChangeEvent = (passValue) => {
    let atleast_one_uppercase_lttr = new RegExp("(?=.*[A-Z])");
    let one_uppercase_is = atleast_one_uppercase_lttr.test(passValue);
    let progressIncrement = 0;
    setAtleast1UppercaseLetterIs(one_uppercase_is);
    if (one_uppercase_is) {
      progressIncrement += 20;
    }

    let atleast_one_lowercase_lttr = new RegExp("(?=.*[a-z])");
    let one_lowercase_is = atleast_one_lowercase_lttr.test(passValue);
    setAtleast1LowercaseLetterIs(one_lowercase_is);
    if (one_lowercase_is) {
      progressIncrement += 20;
    }

    let atleast_one_digit = new RegExp("(?=.*[0-9])");
    let one_digit_is = atleast_one_digit.test(passValue);
    setAtleast1DigitIs(one_digit_is);
    if (one_digit_is) {
      progressIncrement += 20;
    }

    let atleast_one_special_char = new RegExp("([^A-Za-z0-9])");
    let one_special_char_is = atleast_one_special_char.test(passValue);
    setAtleast1SpecialCharIs(one_special_char_is);
    if (one_special_char_is) {
      progressIncrement += 20;
    }
    let atleast_eighth_char = new RegExp("(?=.{8,})");
    let one_eighth_char_is = atleast_eighth_char.test(passValue);
    if (one_eighth_char_is) {
      progressIncrement += 20;
    }
    setProgress(progressIncrement);
    switch (progressIncrement) {
      case 20:
        setPassStrengthTxt("week");
        break;
      case 40:
        setPassStrengthTxt("fair");
        break;
      case 60:
        setPassStrengthTxt("good");
        break;
      case 80:
        setPassStrengthTxt("good");
        break;
      case 100:
        setPassStrengthTxt("great");
        break;
      default:
        setPassStrengthTxt("");
    }
  }; */
  const handleClose = () => {
    if (!isReadInstruction) {
      dispatch(changeReadInstructionErrorMessage(t("onboarding.acceptConditionError")))
      return;
    } else {
      setShowNotice(false);
      sessionStorage.setItem("isReadNotice", true)
    }
  }

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // if (isVerified) {
    // console.log("values", values);
    if (values.mobileNumber && values.fullname && !values.oneTimePassword) {
      localStorage.setItem("mobileNo", values.mobileNumber);
      // if(!isReadInstruction) {
      //   dispatch(changeReadInstructionErrorMessage("Please make sure, you read the instructions"))
      //   return;
      // }

      const requestData = {
        MobileNo: values.mobileNumber,
        FullName: values.fullname,
        Lang: localStorage.getItem("i18nextLng"),
        fcfs_flow: Fcfs_Flow ? "on" : "off",
        Agentcode: localStorage.getItem("agentjwtToken") && localStorage.getItem("agentcode") ? localStorage.getItem("agentcode") : undefined,
      };
      setUserVerifyCrdtls(requestData);
      dispatch(signupUser(requestData));
      // window.webengage.track("User Signed Up", {
      //   "MobileNo": values.mobileNumber,
      //   "FullName": values.fullname,
      //   "Platform": "web"
      // });
    }
    if (values.oneTimePassword) {
      localStorage.setItem("mobileNo", values.mobileNumber);
      // history.push("/new-password");
      const requestData = {
        MobileNo: values.mobileNumber,
        Otp: values.oneTimePassword.toString(),
        MobileVerification: "1",
      };
      // localStorage.setItem("mobileNumber", values.mobileNumber);
      localStorage.setItem("otp", values.oneTimePassword);
      dispatch(verifyOtp(requestData));
    }
    // }
  };

  /* const reVerifyUserOtp = () => {
    if (values.oneTimePassword) {
      // history.push("/new-password");
      const requestData = {
        MobileNo: values.mobileNumber,
        Otp: values.oneTimePassword.toString(),
        MobileVerification: "1",
      };
      // localStorage.setItem("mobileNumber", values.mobileNumber);
      localStorage.setItem("otp", values.oneTimePassword);
      dispatch(verifyOtp(requestData));
    }
  }; */

  const resendOtp = (value) => {
    const requestData = {
      MobileNo: value,
      // Type: "ForgotPassword",
      Type: "Reverify",
    };
    dispatch(sendOrResendOtp(requestData));
    setResenOtpText(false);
    setTimeout(() => setResenOtpText(true), 90000);
  };

  const onResolved = () => {
    // const headers = {
    //   "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
    //   "Access-Control-Allow-Origin": "*",
    // };
    //`https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify?secret=`
    axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=` +
        SecretKey +
        "&response=" +
        refRecaptcha.current.getResponse()
        // {},
        // { headers }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.score > 0.5) {
          setVerified(true);
          setErrorVerified(false);
        } else {
          setVerified(false);
          setErrorVerified(true);
        }
      });
  };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // const formik = formikRef.current;
    // formik.resetForm();
    dispatch(clearAuthState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const reEnterMobileNumber = () => {
    setIsGeneratedOtp(false);
    setResenOtpText(false);
    dispatch(clearAuthState());
  };

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(clearSuperStepperEditVars());
    }
  }, [isSuccessReqStepper]);

  return (
    <AuthTemplate>
      {(isFetching || isFetchingStepper) && (
        <Loading isOpen={isFetching || isFetchingStepper} />
      )}
      <div className={classes.root}>
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              {!isGeneratedOtp && (
                <>
                  <TitleDescriBox
                    title={urlSource == "grievance" ? t("signUpForm.grievanceTitle") : t("signUpForm.title")}
                  // description={t("signUpForm.description")} 
                  />
                  {/* <Box textAlign="center" marginY={2}>
                    <img className={classes.iconStyle} src={OTP} alt="OTP" />
                  </Box> */}

                  {/* <Box textAlign="center" marginY={3}>
                    <img
                      className={classes.iconStyle}
                      src={SignUpPC}
                      alt="Verify OTP"
                    />
                  </Box> */}
                  <Box className={classes.inputFormBox}>
                    <FormControl
                      control="input"
                      variant="outlined"
                      label={t("signUpForm.formControl.fullname.fullnameLabel")}
                      placeholder={t(
                        "signUpForm.formControl.fullname.fullnamePlaceholderL"
                      )}
                      name="fullname"
                      type="text"
                      id="fullname"
                      required
                      inputProps={{ maxLength: 50 }}
                    />
                    <FormControl
                      control="input"
                      variant="outlined"
                      label={t("signUpForm.formControl.phoneNumberLabel")}
                      placeholder={t(
                        "signUpForm.formControl.phoneNumberPlaceholder"
                      )}
                      name="mobileNumber"
                      type="number"
                      id="mobileNumber"
                      required
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10);
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
                    {errorVerified && (
                      <AlertBox severity="error">
                        {t("signUpForm.formControl.isBotOrHumanText")}
                      </AlertBox>
                    )}
                    {isError && (
                      <AlertBox severity="error">{errorMsgSignUp}</AlertBox>
                    )}
                    {isErrorStepper && (
                      <AlertBox severity="error">{errorMessageStepper}</AlertBox>
                    )}
                  </Box>
                  <Box textAlign="center" marginY={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      // onClick={submitForm}
                      // onClick={() => history.push("/signup-success")}
                      fullWidth={width === "xs" ? true : false}
                      className={width === "xs" ? null : classes.button}
                      disabled={isErrorScheme}
                    >
                      {t("signUpForm.formControl.next")}
                    </Button>
                  </Box>
                  <Box textAlign="center" marginY={1.5}>
                    <Typography className={classes.bottomTxtView}>
                      {prelaunch === true ? <Trans i18nKey="InitialPageTrans:signUpForm.formControl.messageText">
                        Already signed up?
                        <Link
                          to="/otp-login?skip=prelaunch"
                        >
                          Login
                        </Link>
                      </Trans> : <Trans i18nKey="InitialPageTrans:signUpForm.formControl.messageText">
                        Already signed up?
                        <Link
                          to="/otp-login"
                        >
                          Login
                        </Link>
                      </Trans>}
                    </Typography>
                  </Box>
                  <Recaptcha
                    ref={refRecaptcha}
                    sitekey={SiteKey}
                    onResolved={onResolved}
                  />
                </>
              )}

              {isGeneratedOtp && (
                <>

                  <TitleDescriBox title={urlSource == "grievance" ? t("signUpForm.formControl.otpVerify.verifyAccountGrievance") : t("signUpForm.formControl.otpVerify.verifyAccount")} description={t("signUpForm.formControl.otpVerify.desc")} brkTxt={"+91 " + values.mobileNumber} />
                  {/* <TitleDescriBox
                    title={t("signUpForm.formControl.otpVerify.verifyAccount")}
                    description={t("signUpForm.formControl.otpVerify.desc")}
                    brkTxt={"+91 " + values.mobileNumber}
                  /> */}

                  {/* <Box textAlign="center">
                    <img
                      className={classes.iconStyle}
                      src={VerifyOTP}
                      alt="Verify OTP"
                    />
                  </Box> */}
                  {isError && (
                    <AlertBox severity="error">{errorMsgSignUp}</AlertBox>
                  )}
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "forgotPasswordForm.formControl.oneTimePasswordInputLabel"
                    )}
                    placeholder={t(
                      "forgotPasswordForm.formControl.oneTimePasswordPlaceholder"
                    )}
                    name="oneTimePassword"
                    type="number"
                    id="oneTimePassword"
                    required
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 6);
                    }}
                    // inputProps={{ maxLength: 6 }}
                    validate={validateOTP}
                    autoFocus={true}
                  />
                  {isResenOtpText && resendOtpData?.ResendOTP != false && (
                    <Box display="flex">
                      <Box marginLeft={1}>
                        <Typography variant="body2" gutterBottom>
                          <Link
                            to="#"
                            onClick={() => resendOtp(values.mobileNumber)}
                            style={{ textDecoration: "none", color: "#007ae7" }}
                          >
                            {t("forgotPasswordForm.formControl.resendText")}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {!isResenOtpText && resendOtpData?.ResendOTP != false && (
                    <Box textAlign="left">
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#65707D" }}
                      >
                        {t("signUpForm.formControl.ResendOTPin0")} 00:{countOtp} {t("signUpForm.formControl.ResendOTPin1")}
                      </Typography>
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
                    >
                      {t("signUpForm.formControl.otpVerify.button")}
                    </Button>
                  </Box>
                </>
              )}
              {/* <Divider />
              <Typography style={{marginTop:24}} align="center">{t("onboarding.noticePoint5")}: <br /><span style={{ color: "#0038C0", fontWeight: "700" }}> +91 9930870000</span></Typography> */}
            </Form>
          )}
        </Formik>
        {/* <Dialog open={showNotice} maxWidth="md" fullWidth>
          <DialogTitle sx={{ m: 0, p: 1 }} style={{ padding: "8px 24px 0 24px" }}>
            <Grid container xs={12}>
              <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {t("onboarding.noticeHeading")}
                <Box className={classes.toggleBtnWrapper}>
                  <ToggleButtonGroup
                    value={selectedIndex}
                    exclusive
                    onChange={handleOnLangChange}
                    className={`${classes.langToggleBtnGroup} `}
                  >
                    {languages.map((item, index) => (
                      <ToggleButton
                        size="small"
                        value={index}
                        key={item.code}
                        style={{
                          display:
                            selectedIndex === index ? "none" : "inline-flex",
                        }}
                      >
                        <Typography
                          className={`${classes.langToggleBtn} `}
                        >
                          {item.label}
                        </Typography>
                      </ToggleButton>
                    ))}
                    <span></span>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
            </Grid>
          </DialogTitle>
          <Onboarding handleClose={handleClose}/>
          
        </Dialog> */}
      </div>
    </AuthTemplate>
  );
};

export default withWidth()(SignUp);
