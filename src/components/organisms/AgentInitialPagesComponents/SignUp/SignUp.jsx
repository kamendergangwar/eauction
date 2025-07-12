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
import AgentTitleDescriBox from "../../../atoms/AgentTitleDescriBox/AgentTitleDescriBox";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import FormControl from "../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../InitialPages.styles";
import {
  signupUser,
  applicantAuthSelector,
  clearAuthState,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import { addEditStepper } from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import Recaptcha from "react-google-invisible-recaptcha";
import axios from "axios";
import { SiteKey, SecretKey } from "../../../../utils/Common";

const SignUp = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const refRecaptcha = useRef(null);
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isVerified, setVerified] = React.useState(false);
  const [errorVerified, setErrorVerified] = React.useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    applicantAuthSelector
  );

  const {
    isFetchingStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
  } = useSelector((state) => state.stepper);

  const superStepper = useSelector((state) => state.stepper.superStepper);
 
  useEffect(() => {
    if (isSuccess) {
      /* const requestData = {
        Applicantid: localStorage.getItem("applicantId"),
        Stepper: { superStepper: superStepper },
      }; */
      
      dispatch(addEditStepper(superStepper));
      dispatch(clearAuthState());
    }
  }, [dispatch, history, isError, isSuccess, superStepper]);

  useEffect(() => {
    if (isSuccessReqStepper) {
      history.push("/terms-conditions");
    }
  }, [history, isSuccessReqStepper]);

  const initialValues = {
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    mobileNumber: yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t("signUpForm.formControl.phoneNumberErrors.limitation")
      )
      .required(t("signUpForm.formControl.phoneNumberErrors.required")),
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

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // if (isVerified) {
    if (values.mobileNumber && values.password && values.confirmPassword) {
      const requestData = {
        MobileNo: values.mobileNumber,
        Password: values.password,
      };
      dispatch(signupUser(requestData));
    }
    // }
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

  return (
    <AuthTemplate>
      {(isFetching || isFetchingStepper) && (
        <Loading isOpen={isFetching || isFetchingStepper} />
      )}
      <div className={classes.root}>
        <AgentTitleDescriBox
          title={t("signUpForm.title")}
          description={t("signUpForm.description")}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              {errorVerified && (
                <AlertBox severity="error">
                  {t("signUpForm.formControl.isBotOrHumanText")}
                </AlertBox>
              )}
              {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
              {isErrorStepper && (
                <AlertBox severity="error">{errorMessageStepper}</AlertBox>
              )}
              <FormControl
                control="input"
                variant="outlined"
                label={t("signUpForm.formControl.phoneNumberLabel")}
                placeholder={t("signUpForm.formControl.phoneNumberPlaceholder")}
                name="mobileNumber"
                type="number"
                id="mobileNumber"
                required
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
              <FormControl
                control="input"
                variant="outlined"
                label={t("signUpForm.formControl.passwordLabel")}
                name="password"
                id="password"
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
                inputProps={{
                  maxLength: 50,
                }}
                required
              />
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
              // onChange={(e) => {
              //   setFieldValue("confirmPassword", e.target.value);
              //   if (values.password === e.target.value) {
              //     refRecaptcha.current.execute();
              //   }
              // }}
              />
              <Recaptcha
                ref={refRecaptcha}
                sitekey={SiteKey}
                onResolved={onResolved}
              />
              {/* <Box display="flex" justifyContent="center" m={1} p={1}>
                <Box>
                  <ReCAPTCHA sitekey={SiteKey} onChange={onChange} />
                </Box>
              </Box> */}
              <Box textAlign="center" marginY={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={submitForm}
                  fullWidth={width === "xs" ? true : false}
                  className={width === "xs" ? null : classes.button}
                >
                  {t("signUpForm.formControl.buttonText")}
                </Button>
              </Box>
              <Box textAlign="center" marginY={3}>
                <Typography variant="subtitle1" gutterBottom>
                  <Trans i18nKey="InitialPageTrans:signUpForm.formControl.messageText">
                    Already signed up?
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "#007ae7" }}
                    >
                      Login
                    </Link>
                  </Trans>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </AuthTemplate>
  );
};

export default withWidth()(SignUp);
