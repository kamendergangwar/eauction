import React, { useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";
import TitleDescriBox from "../../../atoms/TitleDescriBox/TitleDescriBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import VerifyOTP from "../../../../assets/VerifyOTP.svg";
import forgotpwd from "../../../../assets/forgotpwd.jpg";
import { initialPagesStyles } from "../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  sendOrResendOtp,
  verifyOtp,
  verifiedOtp,
  applicantAuthSelector,
  clearAuthState,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import InputAdornment from "@material-ui/core/InputAdornment";

const ForgotPassword = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const formikRef = useRef();
  const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [countOtp, setCountOtp] = React.useState(90);
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage, isOtpSuccess } =
    useSelector(applicantAuthSelector);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setResenOtpText(true), 90000);
      otpCounter();
      setIsGeneratedOtp(true);
      // return () => clearTimeout(timer);
      // dispatch(clearAuthState());
    } else {
      setResenOtpText(false);
    }
    if (isOtpSuccess) {
      history.push("/new-password");
      dispatch(clearAuthState());
    }
  }, [dispatch, history, isError, isOtpSuccess, isSuccess]);

  const otpCounter = () => {
    let timeleft = 90;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
      }
      setCountOtp(timeleft);
      timeleft -= 1;
    }, 1000);
  };

  /* useEffect(() => {
    setTimeout(() => setResenOtpText(true), 90000);
    otpCounter();
  }, []); */

  /* useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setResenOtpText(true), 90000);
      otpCounter();
    }
  }, [isSuccess]); */

  const initialValues = {
    mobileNumber: "",
    oneTimePassword: "",
  };

  const validateMobileNumber = (value) => {
    let error;
    if (!value) {
      error = t("forgotPasswordForm.formControl.phoneNumberErrors.required");
    } else if (!/^[6-9]\d{9}$/i.test(value)) {
      error = t("forgotPasswordForm.formControl.phoneNumberErrors.limitation");
    }
    return error;
  };

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

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.mobileNumber && values.oneTimePassword === "") {
      const requestData = {
        MobileNo: values.mobileNumber,
        Type: "ForgotPassword",
      };
      dispatch(sendOrResendOtp(requestData));
      // setIsGeneratedOtp(true);
    }
    if (values.oneTimePassword) {
      // history.push("/new-password");
      const requestData = {
        MobileNo: values.mobileNumber,
        Otp: values.oneTimePassword.toString(),
      };
      localStorage.setItem("mobileNumber", values.mobileNumber);
      localStorage.setItem("otp", values.oneTimePassword);
      // dispatch(verifyOtp(requestData));
      dispatch(verifyOtp(requestData));
    }
  };

  const resendOtp = (value) => {
    dispatch(clearAuthState());
    const requestData = {
      MobileNo: value,
      Type: "ForgotPassword",
    };
    dispatch(sendOrResendOtp(requestData));
  };

  useEffect(() => {
    const formik = formikRef.current;
    // formik.resetForm();
    // setIsGeneratedOtp(isGeneratedOtp);
    dispatch(clearAuthState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <TitleDescriBox
          title={
            isGeneratedOtp
              ? t("forgotPasswordForm.verifyOtpTitle")
              : t("forgotPasswordForm.title")
          }
          description={
            isGeneratedOtp
              ? t("forgotPasswordForm.verifyOtpDescription") + " +91 " + mobileNumber
              : t("forgotPasswordForm.description")
          }
        />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
              {!isGeneratedOtp && (
                <>
                  <Box textAlign="center" marginY={2}>
                    <img className={classes.iconStyle} src={forgotpwd} alt="OTP" />
                  </Box>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t("forgotPasswordForm.formControl.phoneNumberLabel")}
                    placeholder={t(
                      "forgotPasswordForm.formControl.phoneNumberPlaceholder"
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
                    validate={validateMobileNumber}
                    onChange={(e) => {
                      setFieldValue("mobileNumber", e.target.value);
                      setMobileNumber(
                        e.target.value.slice(0, 2) +
                        `*******` +
                        e.target.value.slice(e.target.value.length - 1)
                      );
                    }}
                  // autoFocus={true}
                  />
                  <Box marginY={5} />
                  <Box textAlign="center" marginY={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      // onClick={submitForm}
                      fullWidth={width === "xs" ? true : false}
                      className={classes.button}
                    >
                      {t(
                        "forgotPasswordForm.formControl.generateOTPButtonText"
                      )}
                    </Button>
                  </Box>
                </>
              )}

              {isGeneratedOtp && (
                <>
                  <Box textAlign="center">
                    <img
                      className={classes.iconStyle}
                      src={VerifyOTP}
                      alt="Verify OTP"
                    />
                  </Box>
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
                    autoFocus={true}
                  />
                  {!isResenOtpText && (
                    <Box textAlign="left">
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#65707D" }}
                      >
                        Resend OTP in 00:{countOtp} sec.
                      </Typography>
                    </Box>
                  )}
                  {isResenOtpText && (
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
                  <Box textAlign="center" marginY={3} marginBottom={2}>
                    {isGeneratedOtp
                      ?
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        // onClick={submitForm}
                        fullWidth={width === "xs" ? true : false}
                      >
                        {t("forgotPasswordForm.formControl.submitButtonText")}
                      </Button>
                      :
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        // onClick={submitForm}
                        fullWidth={width === "xs" ? true : false}
                        className={classes.button}
                      >
                        {t("forgotPasswordForm.formControl.submitButtonText")}
                      </Button>
                    }
                  </Box>
                </>
              )}
              <Box display="flex" paddingX={1}>
                {!isGeneratedOtp
                  ?
                  <Box flexGrow={1}>
                    <Typography variant="body1" gutterBottom className={classes.registerLinkTxt}>
                      <Trans i18nKey="InitialPageTrans:forgotPasswordForm.msgText">
                        Did you remember your Password?
                        <Link
                          to="/login"
                          style={{ textDecoration: "none", color: "#007ae7" }}
                        >
                          Try to Login
                        </Link>
                      </Trans>
                    </Typography>
                  </Box>
                  : ""}
                {/* <Box>
                  <Typography variant="body1" gutterBottom>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "#007ae7" }}
                    >
                      {t("signUpForm.formControl.buttonText")}
                    </Link>
                  </Typography>
                </Box> */}
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </AuthTemplate>
  );
};

export default withWidth()(ForgotPassword);
