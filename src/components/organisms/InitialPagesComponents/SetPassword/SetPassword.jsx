import React, { useEffect, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import withWidth from "@material-ui/core/withWidth";
import { useSelector, useDispatch } from "react-redux";
import TitleDescriBox from "../../../atoms/TitleDescriBox/TitleDescriBox";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import FormControl from "../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../InitialPages.styles";
import {
  signupUser,
  applicantAuthSelector,
  clearAuthState,
  setSigninPassword,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
// import { addEditStepper } from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import Recaptcha from "react-google-invisible-recaptcha";
import axios from "axios";
import { SiteKey, SecretKey } from "../../../../utils/Common";
import VerifyOTP from "../../../../assets/VerifyOTP.svg";
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

import VerifyPassPc from "../../../../assets/VerifyPassPc.svg";
import SetPasswordPhn from "../../../../assets/SetPasswordPhn.svg";

const SignUp = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const refRecaptcha = useRef(null);
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isVerified, setVerified] = React.useState(false);
  const [errorVerified, setErrorVerified] = React.useState(false);
  //   const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
  //   const [isResenOtpText, setResenOtpText] = React.useState(false);
  //   const [userVerifyCrdtls, setUserVerifyCrdtls] = React.useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(0);
  const [atleast1UppercaseLetterIs, setAtleast1UppercaseLetterIs] =
    React.useState(false);
  const [atleast1LowercaseLetterIs, setAtleast1LowercaseLetterIs] =
    React.useState(false);
  const [atleast1DigitIs, setAtleast1DigitIs] = React.useState(false);
  const [atleast1SpecialCharIs, setAtleast1SpecialCharIs] =
    React.useState(false);
  const [passStrengthTxt, setPassStrengthTxt] = React.useState("");

  const {
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    isOtpSuccess,
    signupUserErrorData,
  } = useSelector(applicantAuthSelector);

  /* const {
    isFetchingStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
  } = useSelector((state) => state.stepper);

  const superStepper = useSelector((state) => state.stepper.superStepper); */
  const [errorMsgSignUp, setErrorMsgSignUp] = React.useState("");

  const initialValues = {
    password: "",
    confirmPassword: "",
    oneTimePassword: "",
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])(?=.{8,50})/,
        t("signUpForm.formControl.passwordErrors.limitation")
      )
      .required(t("signUpForm.formControl.passwordErrors.required")),
    confirmPassword: yup
      .string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("password")],
            t("signUpForm.formControl.confirmPasswordErrors.limitation")
          ),
      })
      .required(t("signUpForm.formControl.confirmPasswordErrors.required")),
  });

  /* const validateOTP = (value) => {
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
  }; */

  const passwordChangeEvent = (passValue) => {
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
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // if (isVerified) {
    if (values.confirmPassword && values.password) {
      const requestData = {
        MobileNo: localStorage.getItem("mobileNo"),
        Password: values.password,
        Lang: localStorage.getItem("i18nextLng"),
      };
      //   setUserVerifyCrdtls(requestData);
      dispatch(setSigninPassword(requestData));
    }
    // if (values.oneTimePassword) {
    //   // history.push("/new-password");
    //   const requestData = {
    //     MobileNo: values.mobileNumber,
    //     Otp: values.oneTimePassword.toString(),
    //     MobileVerification: "1",
    //   };
    //   // localStorage.setItem("mobileNumber", values.mobileNumber);
    //   localStorage.setItem("otp", values.oneTimePassword);
    //   dispatch(verifyOtp(requestData));
    // }
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
      Type: "ForgotPassword",
    };
    dispatch(sendOrResendOtp(requestData));
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
    const formik = formikRef.current;
    formik.resetForm();
    dispatch(clearAuthState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSuccess) {
      history.push("/terms-conditions");
      localStorage.removeItem("mobileNo");
    }
  }, [isSuccess]);

  return (
    <AuthTemplate>
      {(isFetching) && (
        <Loading isOpen={isFetching} />
      )}
      <div className={classes.root}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              <>
                <TitleDescriBox
                  title={t("setPassword.title")}
                  description={t("setPassword.descp")}
                />
                {/* <Box textAlign="center" marginY={2}>
                    <img className={classes.iconStyle} src={OTP} alt="OTP" />
                  </Box> */}
                {errorVerified && (
                  <AlertBox severity="error">
                    {t("signUpForm.formControl.isBotOrHumanText")}
                  </AlertBox>
                )}
                {isError && (
                  <AlertBox severity="error">{errorMessage}</AlertBox>
                )}
                {/* {isErrorStepper && (
                  <AlertBox severity="error">{errorMessageStepper}</AlertBox>
                )} */}

                <Box textAlign="center" marginY={5}>
                  <img
                    className={classes.iconStyle}
                    src={width === "xs" ? SetPasswordPhn : VerifyPassPc}
                    alt="Verify Password"
                  />
                </Box>

                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("signUpForm.formControl.passwordLabel")}
                  name="password"
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                    passwordChangeEvent(e.target.value);
                  }}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {isShowPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                {values.password && (
                  <Box
                    marginBottom={1}
                    className={`${classes.passValidationIndicator} ${passStrengthTxt}`}
                  >
                    <Typography variant="body2">{passStrengthTxt}</Typography>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                )}

                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("signUpForm.formControl.confirmPasswordLabel")}
                  name="confirmPassword"
                  id="confirmPassword"
                  type={isShowPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {isShowPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                  required
                  onChange={(e) => {
                    setFieldValue("confirmPassword", e.target.value);
                    if (values.password === e.target.value) {
                      refRecaptcha.current.execute();
                    }
                  }}
                />
                <Recaptcha
                  ref={refRecaptcha}
                  sitekey={SiteKey}
                  onResolved={onResolved}
                />
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
                  >
                    {t("setPassword.button")}
                  </Button>
                </Box>
              </>
            </Form>
          )}
        </Formik>
      </div>
    </AuthTemplate>
  );
};

export default withWidth()(SignUp);
