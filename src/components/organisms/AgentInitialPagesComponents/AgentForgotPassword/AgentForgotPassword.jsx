import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";
import AgentTitleDescriBox from "../../../atoms/AgentTitleDescriBox/AgentTitleDescriBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import AgentAuthTemplate from "../../../templates/AgentAuthTemplate/AgentAuthTemplate";
import VerifyOTP from "../../../../assets/VerifyOTP.svg";
import OTP from "../../../../assets/OTP.png";
import { AgentInitialPagesStyles } from "../AgentInitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  sendOrResendOtp,
  verifyOtp,
  agentAuthSelector,
  clearAuthState,
} from "../../../../redux/features/agent/AgentAuthSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const ForgotPassword = (props) => {
  const { width } = props;
  const classes = AgentInitialPagesStyles();
  const { t } = useTranslation("AgentInitialPageTrans");
  const history = useHistory();
  const formikRef = useRef();
  const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage, isOtpSuccess } =
    useSelector(agentAuthSelector);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setResenOtpText(true), 90000);
      setIsGeneratedOtp(true);
      dispatch(clearAuthState());
    }
    if (isOtpSuccess) {
      history.push("/cfc-new-password");
      dispatch(clearAuthState());
    }
  }, [dispatch, history, isError, isOtpSuccess, isSuccess]);

  const initialValues = {
    mobileNumber: "",
    oneTimePassword: "",
  };

  const validateMobileNumber = (value) => {
    let error;
    if (!value) {
      error = t("agentForgotPasswordForm.formControl.phoneNumberErrors.required");
    } else if (!/^[6-9]\d{9}$/i.test(value)) {
      error = t("agentForgotPasswordForm.formControl.phoneNumberErrors.limitation");
    }
    return error;
  };

  const validateOTP = (value) => {
    let error;
    if (!value) {
      error = t(
        "agentForgotPasswordForm.formControl.oneTimePasswordErrors.required"
      );
    } else if (!/^[0-9]{6}$/i.test(value)) {
      error = t(
        "agentForgotPasswordForm.formControl.oneTimePasswordErrors.limitation"
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
      // history.push("/cfc-new-password");
      const requestData = {
        MobileNo: values.mobileNumber,
        Otp: values.oneTimePassword.toString(),
      };
      localStorage.setItem("agentMobileNumber", values.mobileNumber);
      localStorage.setItem("agentOtp", values.oneTimePassword);
      dispatch(verifyOtp(requestData));
    }
  };

  const resendOtp = (value) => {
    const requestData = {
      MobileNo: value,
      Type: "ForgotPassword",
    };
    dispatch(sendOrResendOtp(requestData));
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    setIsGeneratedOtp(false);
    dispatch(clearAuthState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AgentAuthTemplate>
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
        <AgentTitleDescriBox
          title={t("agentForgotPasswordForm.title")}
          description={
            isGeneratedOtp
              ? t("agentForgotPasswordForm.otpDescription")
              : t("agentForgotPasswordForm.description")
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
              <>
                {/* <Box textAlign="center" marginY={2}>
                  <img className={classes.iconStyle} src={OTP} alt="OTP" />
                </Box> */}
                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("agentForgotPasswordForm.formControl.phoneNumberLabel")}
                  placeholder={t(
                    "agentForgotPasswordForm.formControl.phoneNumberPlaceholder"
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
                  validate={validateMobileNumber}
                  onChange={(e) => {
                    setFieldValue("mobileNumber", e.target.value);
                    setMobileNumber(
                      e.target.value.slice(0, 2) +
                      `*******` +
                      e.target.value.slice(e.target.value.length - 1)
                    );
                  }}
                />
                {/* <Box marginY={5} /> */}
                {!isGeneratedOtp && (
                  <Box textAlign="center" marginY={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={submitForm}
                      fullWidth={width === "xs" ? true : false}
                    >
                      {t(
                        "agentForgotPasswordForm.formControl.generateOTPButtonText"
                      )}
                    </Button>
                  </Box>
                )}
              </>
              {isGeneratedOtp && (
                <>
                  {/* <Box textAlign="center">
                    <img
                      className={classes.iconStyle}
                      src={VerifyOTP}
                      alt="Verify OTP"
                    />
                  </Box> */}
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "agentForgotPasswordForm.formControl.oneTimePasswordInputLabel"
                    )}
                    placeholder={t(
                      "agentForgotPasswordForm.formControl.oneTimePasswordPlaceholder"
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
                  />
                  {isResenOtpText && (
                    <Box display="flex">
                      <Box marginLeft={1}>
                        <Typography variant="body2" gutterBottom>
                          <Link
                            to="#"
                            onClick={() => resendOtp(values.mobileNumber)}
                            style={{ textDecoration: "none", color: "#007ae7" }}
                          >
                            {t("agentForgotPasswordForm.formControl.resendText")}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Box textAlign="center" marginY={3} marginBottom={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="large"
                          fullWidth={true}
                        >
                          {t("agentForgotPasswordForm.formControl.backButtonText")}
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={submitForm}
                          fullWidth={true}
                        >
                          {t("agentForgotPasswordForm.formControl.submitButtonText")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </AgentAuthTemplate>
  );
};

export default withWidth()(ForgotPassword);
