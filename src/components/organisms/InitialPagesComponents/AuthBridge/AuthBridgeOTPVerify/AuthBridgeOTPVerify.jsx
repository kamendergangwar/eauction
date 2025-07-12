import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AuthTemplate from "../../../../templates/AuthTemplate/AuthTemplate";
import TitleDescriBox from "../../../../atoms/TitleDescriBox/TitleDescriBox";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../../InitialPages.styles";
import withWidth from "@material-ui/core/withWidth";
import FormHelperText from "@material-ui/core/FormHelperText";
import OTP from "../../../../../assets/OTP.png";
import { useSelector, useDispatch } from "react-redux";
import {
  aadhaarVerifyOtp,
  verifyAadhaarSelector,
  sendOTP,
  clearVerifyAadhaarState,
  clearVerifyAadhaarData,
  tempVerifyAadhaarPost,
  aadhaarVerifyOtpMahaIT
} from "../../../../../redux/features/verify/VerifyAadhaarSlice";
import {
  getApplicantTermAndCondition,
  applicantSelector,
  clearApplicantState,
  clearApplicantData
} from "../../../../../redux/features/applicant/ApplicantSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
// import moment from "moment";
import KycTitleDescriBox from "../../../../atoms/KycTitleDescriBox/KycTitleDescriBox";
import KycTemplate from "../../../../templates/KycTemplate/KycTemplate";
import VerifyOTPIcon from "../../../../../assets/VerifyOTP.svg";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import {
  NextArrowIcon,
  WhiteArrowIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import Hidden from "@material-ui/core/Hidden";
import KycStepperBox from "../../../../atoms/KycStepperBox/KycStepperBox";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../../redux/features/stepper/StepperSlice";
import checkGif from "../../../../../assets/checkGif.webp"
import { Grid } from "@material-ui/core";

const AuthBridgeOTPVerify = (props) => {
  const { onValueChange, setCustomErrorMsg, width, mahaItFailed, setMahaItFailed } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [countOtp, setCountOtp] = React.useState(90);
  const dispatch = useDispatch();
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const {
    isFetchingVerifyAadhaar,
    isSuccessVerifyAadhaar,
    isErrorVerifyAadhaar,
    aadhaarErrorMessage,
    sentOTPData,
    aadhaarData,
    isSuccessSent,
    captchData,

    isFetchingTempAdrVrf,
    isSuccessTempAdrVrf,
    isErrorTempAdrVrf,
    errorMessageTempAdrVrf,

    //Maha- IT adhaar sent otp
    isFetchingVerifyAadhaarMahaIT,
    isSuccessSentMahaIT,
    isErrorSendOtpMahaIT,
    sentOTPDataMahaIT,
    //Maha- IT adhaar Verify otp
    isSuccessVerifyAadhaarMahaIT,
    isErrorVerifyAadhaarMahaIT,
    aadhaarErrorMessageMahaIT,
    aadhaarDataMahaIT
  } = useSelector(verifyAadhaarSelector);

  const { isFetchingAplcntTermsCndtn,
    isSuccessResAplcntTermsCndtn,
    isErrorAplcntTermsCndtn,
    errorMsgAplcntTermsCndtn,
    aplcntTermsCndtnData } = useSelector(applicantSelector);

  /* const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
  } = useSelector(applicantSelector); */

  /* useEffect(() => {
    if (isSuccessResApplicant) {
      history.push("/personal-details");
      dispatch(clearApplicantState());
    }
  }, [dispatch, history, isSuccessResApplicant]); */

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

  useEffect(() => {
    setTimeout(() => setResenOtpText(true), 90000);
    otpCounter();
  }, []);

  useEffect(() => {
    if (isSuccessSent) {
      setTimeout(() => setResenOtpText(true), 90000);
      otpCounter();
    }
  }, [isSuccessSent]);

  const initialValues = {
    oneTimePassword: "",
  };

  const validationSchema = yup.object({
    oneTimePassword: yup
      .string()
      .min(6, t("authOTpVerifyForm.formControl.oneTimePasswordErrors.limitation"))
      .required(t("authOTpVerifyForm.formControl.oneTimePasswordErrors.required")),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.oneTimePassword && !mahaItFailed) {
      const requestData = {
        tsTransID: sentOTPDataMahaIT?.tsTransID || "",
        mobileCode: values.oneTimePassword,
        docNumber: localStorage.getItem("aadharNo"),
        IsCoApplicant: 0
      };
      // setCustomErrorMsg("");
      dispatch(aadhaarVerifyOtpMahaIT(requestData));
    }
    if (values.oneTimePassword && mahaItFailed) {
      const requestData = {
        transID: sentOTPData?.tsTransID || "",
        mobileCode: values.oneTimePassword,
        AadharNo: localStorage.getItem("aadharNo"),
        IsCoApplicant: 0
      };
      // setCustomErrorMsg("");
      dispatch(aadhaarVerifyOtp(requestData));
    }
    /* const stepper = stepperData.superStepper;
    let redirect_url = "";
    for (let i = 0; i < stepper[0].applicantKycStepper.length; i++) {
      const element = stepper[0].applicantKycStepper[i];
      if (element.step === 1) {
        if (element.status !== "completed") {
          redirect_url = "/auth-verify-aadhaar";
          break;
        }
      } else if (element.step === 2) {
        if (element.status !== "completed") {
          redirect_url = "/upload-aadhaar";
          break;
        }
      } else if (element.step === 3) {
        if (element.status !== "completed") {
          redirect_url = "/verify-pancard";
          break;
        }
      } else if (element.step === 4) {
        if (element.status !== "completed") {
          redirect_url = "/upload-pancard";
          break;
        }
      } else if (element.step === 5) {
        if (element.status !== "completed") {
          redirect_url = "/bank-account-detail";
          break;
        }
      } else if (element.step === 6) {
        if (element.status !== "completed") {
          redirect_url = "/upload-cheque";
          break;
        }
      }
    }
    history.push(redirect_url); */
  };

  useEffect(() => {
    if (isSuccessVerifyAadhaarMahaIT) {
      updateStepperUI();
    }
  }, [isSuccessVerifyAadhaarMahaIT])

  useEffect(() => {
    if (isSuccessVerifyAadhaar && aadhaarData) {
      setCustomErrorMsg("");
      updateStepperUI();
    }
  }, [isSuccessVerifyAadhaar, aadhaarData]);

  useEffect(() => {
    if (isErrorVerifyAadhaar && aadhaarErrorMessage) {
      let err_msg = aadhaarErrorMessage;
      setCustomErrorMsg(err_msg);
      // tempVerifyAadhaar();
      // setTimeout(() => {
      dispatch(clearVerifyAadhaarState());
      dispatch(clearVerifyAadhaarData());
      onValueChange(false);
      setMahaItFailed(false);
      // }, 3000);
    }
  }, [isErrorVerifyAadhaar, aadhaarErrorMessage]);

  useEffect(() => {
    if (isErrorVerifyAadhaarMahaIT && aadhaarErrorMessageMahaIT) {
      let err_msg = aadhaarErrorMessageMahaIT;
      setCustomErrorMsg(err_msg);
      dispatch(clearVerifyAadhaarState());
      dispatch(clearVerifyAadhaarData());
      onValueChange(false);
      setMahaItFailed(true);
    }
  }, [isErrorVerifyAadhaarMahaIT, aadhaarErrorMessageMahaIT]);

  /* const tempVerifyAadhaar = () => {
    const requestData = {
      adharNumber: localStorage.getItem("aadharNo"),
      IsCoApplicant: "0"
    };
    dispatch(tempVerifyAadhaarPost(requestData));
  }; */

  /* useEffect(() => {
    if (isSuccessTempAdrVrf) {
      updateStepperUI();
    }
  }, [isSuccessTempAdrVrf]); */

  const validateOTP = (value) => {
    let error;
    if (!value) {
      error = t("authOTpVerifyForm.formControl.oneTimePasswordErrors.required");
    } else if (!/^[0-9]{6}$/i.test(value)) {
      error = t(
        "authOTpVerifyForm.formControl.oneTimePasswordErrors.limitation"
      );
    }
    return error;
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const resendOtp = () => {
    dispatch(clearVerifyAadhaarState());
    dispatch(clearVerifyAadhaarData());
    setCustomErrorMsg("");
    onValueChange(false);
    // if (!mahaItFailed) {
    //   setMahaItFailed(true)
    // }
    /* const requestData = {
      docNumber: localStorage.getItem("aadharNo"),
      secretToken: captchData?.secretToken || "",
      tsTransID: captchData?.tsTransID || "",
      captchaCode: localStorage.getItem("securePin"),
    };
    dispatch(sendOTP(requestData));
    setResenOtpText(false);
    setTimeout(() => setResenOtpText(true), 90000); */
  };

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_sub_stepper = [];
      let new_obj = {};
      if (element.step == 1) {
        for (let i = 0; i < element.applicantKycStepper.length; i++) {
          const inner_element = element.applicantKycStepper[i];
          let new_sub_obj = {};
          if (inner_element.step == 1) {
            new_sub_obj = {
              ...inner_element,
              status: "completed"
            };
          } else {
            new_sub_obj = {
              ...inner_element
            };
          }
          new_sub_stepper.push(new_sub_obj);
        }
        new_obj = {
          ...element,
          applicantKycStepper: new_sub_stepper
        };
      } else {
        new_obj = {
          ...element,
        };
      }
      newStepper.push(new_obj);
    }
    dispatch(addEditStepper(newStepper));
  };

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(getStepperDetails());
      dispatch(clearSuperStepperEditVars());
      dispatch(clearVerifyAadhaarState());
      dispatch(clearVerifyAadhaarData());
      localStorage.removeItem("aadharNo");
      localStorage.removeItem("securePin");
      setShowSuccessAlert(true)
      setTimeout(() => {
        history.push("/verify-pancard");
      }, 2000)

    }
  }, [isSuccessReqStepper]);

  const regestredTxt = () => {
    const lang = localStorage.getItem("i18nextLng");
    let aadhaar = localStorage.getItem("aadharNo");
    if (aadhaar) {
      aadhaar = aadhaar.toString().replace(/\d{4}(?=.)/g, '$& ');
    }
    if (lang == "en") {
      return (
        <>
          {t("authOTpVerifyForm.sendTxt1")} <span style={{ fontWeight: 700 }}>{aadhaar}.</span>
          &nbsp;<span onClick={resendOtp} style={{ textDecoration: "underline", cursor: 'pointer', color: '#0b0bf1' }}>{t("authOTpVerifyForm.changeTxt")}</span>
        </>
      );
    }
    if (lang == "hi") {
      return (
        <>
          {t("authOTpVerifyForm.sendTxt1")} <span style={{ fontWeight: 700 }}>{aadhaar}</span> {t("authOTpVerifyForm.sendTxt2")}
          &nbsp;<span onClick={resendOtp} style={{ textDecoration: "underline", cursor: 'pointer', color: '#0b0bf1' }}>{t("authOTpVerifyForm.changeTxt")}</span>
        </>
      );
    }
    if (lang == "mr") {
      return (
        <>
          {t("authOTpVerifyForm.sendTxt1")} <span style={{ fontWeight: 700 }}>{aadhaar}</span> {t("authOTpVerifyForm.sendTxt2")}
          &nbsp;<span onClick={resendOtp} style={{ textDecoration: "underline", cursor: 'pointer', color: '#0b0bf1' }}>{t("authOTpVerifyForm.changeTxt")}</span>
        </>
      );
    }
  }

  return (
    <KycTemplate>
      {(isFetchingVerifyAadhaar || isFetchingStepper || isFetchingVerifyAadhaarMahaIT) && (
        <Loading isOpen={isFetchingVerifyAadhaar || isFetchingStepper || isFetchingVerifyAadhaarMahaIT} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={t("authOTpVerifyForm.title")}
            description={t("authOTpVerifyForm.description")}
            otpOn={true}
            onBack={resendOtp}
          />
        </Hidden>
        <Hidden mdUp>
          <KycStepperBox
            callingForMobileIs={true}
            title={t("authOTpVerifyForm.title")}
            description={t("authOTpVerifyForm.description")}
            otpOn={true}
            onBack={resendOtp}
          />
        </Hidden>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm }) => (
            <Form noValidate autoComplete="off" className={classes.kycFormContainer}>
              <div className={classes.kycCardFormRoot}>
                <Box style={{ gap: 20 }} display="flex" marginY={2} alignItems='center'>
                  <img
                    className={classes.iconStyle}
                    src={VerifyOTPIcon}
                    alt="Verify OTP"
                  />
                  <span style={{ fontSize: 13, fontWeight: 500, }}>{regestredTxt()}</span>
                </Box>
                {/* {isError && (
                  <AlertBox severity="error">{aadhaarErrorMessage}</AlertBox>
                )} */}
                {(isErrorVerifyAadhaar || isErrorVerifyAadhaarMahaIT) && (
                  <AlertBox severity="error">{aadhaarErrorMessage}</AlertBox>
                )}
                {/* {isErrorTempAdrVrf && (
                  <AlertBox severity="error">{errorMessageTempAdrVrf}</AlertBox>
                )} */}
                <Box className={classes.formControlRoot}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "authOTpVerifyForm.formControl.otpInputLabel"
                    )}
                    placeholder={t(
                      "authOTpVerifyForm.formControl.otpInputPlaceholder"
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
                </Box>
                {!isResenOtpText && (
                  <Box textAlign="left">
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      style={{ color: "#65707D" }}
                    >
                      {t("authOTpVerifyForm.formControl.resendOtpTxt")} 0:{countOtp} {t("authOTpVerifyForm.formControl.resendOtpSecTxt")}
                    </Typography>
                  </Box>
                )}
                {isResenOtpText && (
                  <Box display="flex">
                    <Box marginLeft={1}>
                      <Typography variant="body2" gutterBottom>
                        <Link
                          to="#"
                          onClick={resendOtp}
                          style={{ textDecoration: "none", color: "#007ae7" }}
                        >
                          {t("authOTpVerifyForm.formControl.resendText")}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                )}
                {showSuccessAlert && <Alert icon={false} variant="filled" severity="success" style={{padding : "0px 12px"}} className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success" style={{marginRight: 6}}/>  {t("authOTpVerifyForm.formControl.aadhaarVerification")}</Grid></Alert>}
              </div>
              <Box className={classes.kycCardFooterRoot}>
                <Button
                  type="submit"
                  variant="text"
                  color="primary"
                  size="large"
                  // onClick={submitForm}
                  className={classes.nxtBtn}
                  disabled={showSuccessAlert}
                  endIcon={
                    width === "xs" ? (
                      <WhiteArrowIcon style={{ fill: "transparent" }} />
                    ) : (
                      <NextArrowIcon style={{ fill: "transparent" }} />
                    )
                  }
                >
                  {t("authOTpVerifyForm.formControl.submitButtonText")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </KycTemplate>
  );
};

export default withWidth()(AuthBridgeOTPVerify);
