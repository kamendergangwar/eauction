import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import { initialPagesStyles } from "../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  sendOrResendOtp,
  verifyOtp,
  applicantAuthSelector,
  clearAuthState,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const SignUpSuccess = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const formikRef = useRef();
  const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage, isOtpSuccess } =
    useSelector(applicantAuthSelector);

  useEffect(() => {
    // if (isSuccess) {
    //   const timer = setTimeout(() => setResenOtpText(true), 90000);
    //   setIsGeneratedOtp(true);
    // }
    if (isOtpSuccess) {
      //history.push("/terms-conditions");
      history.push("/registration");
      dispatch(clearAuthState());
    }
  }, [dispatch, history, isError, isOtpSuccess, isSuccess]);

  const initialValues = {
    mobileNumber: "",
    oneTimePassword: "",
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
    if (values.mobileNumber) {
      const requestData = {
        MobileNo: values.mobileNumber,
      };
    }
    if (values.oneTimePassword) {
      const requestData = {
        // Otp: values.oneTimePassword.toString(),
        MobileNo: Number(localStorage.getItem("mobileNumber")),
        Otp: values.oneTimePassword.toString(),
        MobileVerification: "1",
      };
      //   localStorage.setItem("otp", values.oneTimePassword);
      dispatch(verifyOtp(requestData));
      console.log(requestData, "reques->>>>>>>>>>>", values.mobileNumber);
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
    <AuthTemplate>
      {isFetching && <Loading isOpen={isFetching} />}
      <div className={classes.root}>
        <TitleDescriBox
          title={t("forgotPasswordForm.formControl.oneTimePasswordInputLabel")}
          description={
            isGeneratedOtp
              ? t("forgotPasswordForm.description") + ` ` + mobileNumber
              : ""
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
                            {t("forgotPasswordForm.formControl.resendText")}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Box textAlign="center" marginY={3} marginBottom={2}>
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
                  </Box>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </AuthTemplate>
  );
};
export default withWidth()(SignUpSuccess);
