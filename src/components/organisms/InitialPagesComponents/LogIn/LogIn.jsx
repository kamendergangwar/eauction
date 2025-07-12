import React, { useState,useRef, useEffect } from "react";
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
import TitleDescriBox from "../../../atoms/TitleDescriBox/TitleDescriBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import { initialPagesStyles } from "../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  applicantAuthSelector,
  clearAuthState
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import {
  getApplicantTermAndCondition,
  applicantSelector,
  clearApplicantState,
  clearApplicantData
} from "../../../../redux/features/applicant/ApplicantSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { TextIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";

const LogIn = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const formikRef = useRef();
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const { isFetchingUserLogin, isSuccessUserLogin, isErrorUserLogin, errorMessageUserLogin, loginUserErrorData, loginUserData } =
    useSelector(applicantAuthSelector);

  const { isFetchingAplcntTermsCndtn,
    isSuccessResAplcntTermsCndtn,
    isErrorAplcntTermsCndtn,
    errorMsgAplcntTermsCndtn,
    aplcntTermsCndtnData } = useSelector(applicantSelector);

  const {
    isFetchingStepper,
    isSuccessResStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const { isSuccessProgressResStepper, superActiveStep } = useSelector(ApplicantProgressSelector);
  const [customErrorMsg, setCustomErrorMsg] = React.useState("");
  const [saveValuesForVerify, setSaveValuesForVerify] = React.useState({});
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (isSuccessUserLogin) {
      dispatch(getStepperDetails());
      dispatch(getApplicantProgress());
      // history.push("/personal-details");
      alert(redirect)

    }
    if (isErrorUserLogin) {
      if (loginUserErrorData?.Link) {
        let msgArr = errorMessageUserLogin.split(/click here/gi);
        let save_values = {
          ...saveValuesForVerify,
          IsMobileVerified: loginUserErrorData.IsMobileVerified,
        };
        let msgText = [
          <span key={0}>{msgArr[0]}</span>,
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={() => goToSignUpForVerify(save_values)}
            key={1}
            style={{ color: "#007ae7", cursor: "pointer" }}
          >
            click here
          </a>,
          <span key={2}>{msgArr[1]}</span>,
        ];
        setCustomErrorMsg(msgText);
      } else {
        setCustomErrorMsg(errorMessageUserLogin);
      }
    }
  }, [dispatch, history, isErrorUserLogin, isSuccessUserLogin]);

  const goToSignUpForVerify = (getValues) => {
    localStorage.setItem("userVerifyCredentials", JSON.stringify(getValues));
    history.push("/");
  };

  const handleRedirection = (superActiveStep) =>{
    switch (Number(superActiveStep)) {
      case 1:
        setRedirect("/dashboard");
        break;
      case 2:
        setRedirect("/terms-conditions");
        break;
      case 3:
        setRedirect("/question-1");
        break;
      case 4:
        setRedirect("/add-co-applicant");
        break;
      case 5:
        setRedirect("/income-details");
        break;
      case 6:
        setRedirect("/upload-documents");
        break;
      case 7:
        setRedirect("/make-application-payment");
        break;
      case 8:
        setRedirect("/dashboard");
        break;
      case 9:
        setRedirect("/select-projects");
        break;
      case 10:
        setRedirect("/make-payments");
        break;
      case 11:
        setRedirect("/book-appointment");
        break;
      default:
        setRedirect("/");
    }
  }
  useEffect(() => {
    if (isSuccessResStepper) {
      if (localStorage.getItem("applicantId")) {
        dispatch(getApplicantTermAndCondition());
      }
      if (isSuccessProgressResStepper) {
        handleRedirection(superActiveStep);
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
          //   if (!(loginUserData.agreed_declaration === "1")) {
          //     localStorage.setItem("agreedDeclaration", true);
          //     redirect_url = "/upload-cheque";
          //   }
          // }
          if (!redirect_url) {
            if (!(loginUserData.isPmyNonPmyFlowCompleted === "1")) {
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
                  // } else
                  if (element.step === 3) {
                    if (element.status !== "completed") {
                      redirect_url = "/co-applicant-verify-pancard";
                      break;
                    }
                  }
                  //   else if (element.step === 4) {
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
  }, [isSuccessUserLogin, aplcntTermsCndtnData, isSuccessResAplcntTermsCndtn]);

  const initialValues = {
    mobileNumber: "",
    password: "",
  };

  const validationSchema = yup.object({
    mobileNumber: yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t("loginForm.formControl.phoneNumberErrors.limitation")
      )
      .required(t("loginForm.formControl.phoneNumberErrors.required")),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])(?=.{8,50})/,
        t("loginForm.formControl.passwordErrors.limitation")
      )
      .required(t("loginForm.formControl.passwordErrors.required")),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.mobileNumber && values.password) {
      const requestData = {
        MobileNo: values.mobileNumber,
        Password: values.password,
      };
      setSaveValuesForVerify(requestData);
      dispatch(loginUser(requestData));
    }
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
      {(isFetchingUserLogin || isFetchingStepper || isFetchingAplcntTermsCndtn) && (
        <Loading isOpen={isFetchingUserLogin || isFetchingStepper || isFetchingAplcntTermsCndtn} />
      )}
      <div className={classes.root}>
        <TitleDescriBox title={t("loginForm.title")} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              {isErrorUserLogin && (
                <AlertBox severity="error">{customErrorMsg}</AlertBox>
              )}
              {isErrorStepper && (
                <AlertBox severity="error">{errorMessageStepper}</AlertBox>
              )}
              {isErrorAplcntTermsCndtn && (
                <AlertBox severity="error">{errorMsgAplcntTermsCndtn}</AlertBox>
              )}
              <FormControl
                control="input"
                variant="outlined"
                label={t("loginForm.formControl.phoneNumberLabel")}
                placeholder={t("loginForm.formControl.phoneNumberPlaceholder")}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <strong>+91 - </strong>{" "}
                    </InputAdornment>
                  ),
                }}
              // autoFocus={true}
              />
              <FormControl
                control="input"
                variant="outlined"
                label={t("loginForm.formControl.passwordLabel")}
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
              {/* <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="body1" gutterBottom>
                    <Link
                      to="/otp-login"
                      style={{ textDecoration: "none", color: "#007ae7" }}
                    >
                      {t("loginForm.formControl.loginWithOTPText")}
                    </Link>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" gutterBottom>
                    <Link
                      to="/forgot-password"
                      style={{ textDecoration: "none", color: "#007ae7" }}
                    >
                      {t("loginForm.formControl.passwordText")}
                    </Link>
                  </Typography>
                </Box>
              </Box> */}
              <Box textAlign="center" marginY={5}>
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
                <Box textAlign="center" marginY={2}>
                  <Typography variant="body1" gutterBottom>
                    <Link
                      to="/forgot-password"
                      style={{ textDecoration: "none", color: "#007ae7" }}
                    >
                      {t("loginForm.formControl.passwordText")}
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center">
                <div className={classes.dividerLine} />
                <span className={classes.content}>
                  {t("loginForm.formControl.or")}
                </span>
                <div className={classes.dividerLine} />
              </Box>
              <Box textAlign="center" marginY={5}>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<TextIcon />}
                  onClick={() => history.push("/otp-login")}
                  fullWidth={width === "xs" ? true : false}
                  className={width === "xs" ? null : classes.button}
                >
                  {t("loginForm.formControl.loginWithOTPText")}
                </Button>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className={classes.registerLinkTxt}
                >
                  <Trans i18nKey="InitialPageTrans:loginForm.formControl.messageText">
                    Don’t have an account?
                    <Link to="/" className={classes.linktext}>
                      Register for New Account
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

export default withWidth()(LogIn);
