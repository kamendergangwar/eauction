import React, { useEffect, useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AuthTemplate from "../../../../templates/AuthTemplate/AuthTemplate";
import TitleDescriBox from "../../../../atoms/TitleDescriBox/TitleDescriBox";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../../InitialPages.styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import { blue } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
// import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from "react-redux";
import {
  getAadhaarCaptcha,
  verifyAadhaarSelector,
  clearVerifyAadhaarState,
  clearVerifyAadhaarData,
  sendOTP,
  tempVerifyAadhaarPost,
  sendOTPMahaIT
} from "../../../../../redux/features/verify/VerifyAadhaarSlice";
import {
  getApplicant,
  applicantSelector
} from "../../../../../redux/features/applicant/ApplicantSlice";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import Recaptcha from "react-google-invisible-recaptcha";
import axios from "axios";
import { SiteKey, SecretKey, ApiEndPoint } from "../../../../../utils/Common";
import {
  NextArrowIcon,
  WhiteArrowIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import KycTemplate from "../../../../templates/KycTemplate/KycTemplate";
import KycTitleDescriBox from "../../../../atoms/KycTitleDescriBox/KycTitleDescriBox";
import CoApplicantKycStepperBox from "../../../../atoms/KycStepperBox/CoApplicantKycStepperBox";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import UserPDFViewDialogBox from "../../../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import checkGif from "../../../../../assets/checkGif.webp";

const AuthBridgeVerifyAadhaar = (props) => {
  const { onValueChange, customErrorMsg, setCustomErrorMsg, setSentOTPResponseData, width, mahaItFailed, setMahaItFailed } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const refRecaptcha = useRef(null);
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isVerified, setVerified] = useState(false);
  const [errorVerified, setErrorVerified] = useState(false);
  const isCalledRef = useRef(false);
  const [counter, setCounter] = useState(0);
  const [formValue, setFormValue] = useState(null);
  const [formEditIs, setFormEditIs] = useState(false);
  const [skipAadhar, setSkipAadhar] = useState(false);
  const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);

  const docPreviewDialogCloseFun = () => {
    setDocPreviewDialogOpen(false);
  };

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
    isErrorVerifyAadhaar,
    isErrorSendOtp,
    isFetchingGetAdarCaptch,
    isSuccessGetAdarCaptch,
    isErrorGetAdarCaptch,
    aadhaarErrorMessage,
    captchData,
    isSuccessSent,
    sentOTPData,

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
     isErrorVerifyAadhaarMahaI,
     aadhaarErrorMessageMahaIT,
     aadhaarDataMahaIT
  } = useSelector(verifyAadhaarSelector);

  const { applicantData, isSuccessResApplicantGet } = useSelector(applicantSelector);
  useEffect(() => {
    if (!isCalledRef.current) {
      isCalledRef.current = true;
      dispatch(getAadhaarCaptcha());
      // dispatch(getStepperDetails());
    }
  }, []);
  const initialValues = {
    aadharNumber: "",
    securityPin: "",
    acceptTerms: false,
  };

  const validationSchema = yup.object({
    aadharNumber: yup
      .string()
      // .matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
      .matches(/^[2-9]{1}[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
        t("authVerifyAadhaarForm.formControl.aadhaarNumErrors.limitation")
      )
      .required(
        t("authVerifyAadhaarForm.formControl.aadhaarNumErrors.required")
      ),
    // securityPin: yup
    //   .string()
    //   .matches(
    //     /^[a-zA-Z0-9]+/,
    //     t("authVerifyAadhaarForm.formControl.securityPinErrors.limitation")
    //   )
    //   .required(
    //     t("authVerifyAadhaarForm.formControl.securityPinErrors.required")
    //   ),
    acceptTerms: yup
      .bool()
      .oneOf(
        [true],
        t("authVerifyAadhaarForm.formControl.checkBoxErrors.required")
      ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // && values.securityPin
    if (!mahaItFailed && values.aadharNumber && formEditIs == false) {
      let aadhaar_num = values.aadharNumber.replace(/-/g, "");
      const requestData = {
        docNumber: aadhaar_num,
        // secretToken: captchData?.secretToken || "",
        // tsTransID: captchData?.tsTransID || "",
        // captchaCode: "HF9DC",
        // captchaCode: values.securityPin,
        IsCoApplicant: 1
      };
      localStorage.setItem("aadharNo", aadhaar_num);
      localStorage.setItem("securePin", values.securityPin);
      dispatch(sendOTPMahaIT(requestData));
    }
    if (values.aadharNumber && formEditIs == false && mahaItFailed) {
      let aadhaar_num = values.aadharNumber.replace(/-/g, "");
      const requestData = {
        docNumber: aadhaar_num,
        secretToken: captchData?.secretToken || "",
        tsTransID: captchData?.tsTransID || "",
        captchaCode: "HF9DC",
        // captchaCode: values.securityPin,
        IsCoApplicant: 1
      };
      localStorage.setItem("aadharNo", aadhaar_num);
      localStorage.setItem("securePin", values.securityPin);
      // setCustomErrorMsg("");
      dispatch(sendOTP(requestData));
    }

    if (formEditIs == true) {
      skipFlow();
    }
  };

  /* useEffect(() => {
    if (isErrorSendOtp) {
      tempVerifyAadhaar();
    }
  }, [isErrorSendOtp]); */

  const tempVerifyAadhaar = () => {
    const requestData = {
      adharNumber: localStorage.getItem("aadharNo"),
      IsCoApplicant: "1"
    };
    dispatch(tempVerifyAadhaarPost(requestData));
  };

  useEffect(() => {
    if (isSuccessTempAdrVrf) {
      updateStepperUI();
    }
  }, [isSuccessTempAdrVrf]);

  const onResolved = () => {
    axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=` +
        SecretKey +
        "&response=" +
        refRecaptcha.current.getResponse()
      )
      .then((res) => {
        if (res.data.score > 0.5) {
          setVerified(true);
          setErrorVerified(false);
        } else {
          setVerified(false);
          setErrorVerified(true);
        }
      });
  };

  useEffect(() => {
    if (isSuccessSent || isSuccessSentMahaIT) {
      setCustomErrorMsg("");
      setSentOTPResponseData(sentOTPData);
      dispatch(clearVerifyAadhaarState());
      // dispatch(clearVerifyAadhaarData());
      onValueChange(true);
    }
  }, [isSuccessSent, isSuccessSentMahaIT]);

  useEffect(() => {
    if (isErrorSendOtp && aadhaarErrorMessage) {
      let err_msg = aadhaarErrorMessage;
      setCustomErrorMsg(err_msg);
      dispatch(clearVerifyAadhaarState());
      dispatch(clearVerifyAadhaarData());
      refreshCaptcha();
    }
  }, [isErrorSendOtp, aadhaarErrorMessage]);

  useEffect(() => {
    if (isErrorSendOtpMahaIT && aadhaarErrorMessageMahaIT) {
      let err_msg = aadhaarErrorMessageMahaIT;
      setCustomErrorMsg(err_msg);
      dispatch(clearVerifyAadhaarState());
      setMahaItFailed(true)
      // dispatch(clearVerifyAadhaarData());
      // refreshCaptcha();
    }
  }, [isErrorSendOtpMahaIT, aadhaarErrorMessageMahaIT]);

  const refreshCaptcha = () => {
    dispatch(getAadhaarCaptcha());
    formikRef.current.setFieldValue("securityPin", "");
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_sub_stepper = [];
      let new_obj = {};
      if (element.step == 1) {
        for (let i = 0; i < element.coApplicantKycStepper.length; i++) {
          const inner_element = element.coApplicantKycStepper[i];
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
          coApplicantKycStepper: new_sub_stepper
        };
      } else {
        new_obj = {
          ...element,
        };
      }
      newStepper.push(new_obj);
    }
    setSkipAadhar(true)
    dispatch(addEditStepper(newStepper));
  };

  useEffect(() => {
    if(!skipAadhar){
      dispatch(clearSuperStepperEditVars())
    }
  }, [skipAadhar])
  
  useEffect(() => {
    if (isSuccessReqStepper && skipAadhar) {
      dispatch(getStepperDetails());
      dispatch(clearVerifyAadhaarState());
      history.push("/co-applicant-verify-pancard");
    }
  }, [isSuccessReqStepper,skipAadhar]);

  const skipFlow = () => {
    history.push("/co-applicant-verify-pancard");
  }
  useEffect(() => {
    setCounter(counter + 1);
  }, [])

  useEffect(() => {
    if (isSuccessResStepper && counter == 1) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.coApplicantKycStepper[1].title == "Verify PAN" && item.coApplicantKycStepper[0].status == "completed" && pageUrl == undefined) {
            if (item.coApplicantKycStepper[1].status != "completed") {
              pageUrl = "/co-applicant-verify-pancard";
            }

            if (item.coApplicantKycStepper[0].title == "Verify Aadhaar" && item.coApplicantKycStepper[0].status == "completed") {
              dispatch(getApplicant());
            }
          }
        }
      });;
      pageUrl && history.push(pageUrl)
    }
  }, [isSuccessResStepper, counter]);

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.CoApplicantDetails[0]?.IsAadharVerified == "1") {
        setFormEditIs(true);
        let AadharNo = applicantData.CoApplicantDetails[0].AadharNo.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
        const savedValue = {
          aadharNumber: AadharNo,
          securityPin: "",
          acceptTerms: true,
        };
        setFormValue(savedValue);
      }
    }
  }, [isSuccessResApplicantGet]);

  return (
    <KycTemplate isCoApplicant={true}>
      {(isFetchingVerifyAadhaar || isFetchingStepper || isFetchingGetAdarCaptch || isFetchingVerifyAadhaarMahaIT) && (
        <Loading isOpen={isFetchingVerifyAadhaar || isFetchingStepper || isFetchingGetAdarCaptch || isFetchingVerifyAadhaarMahaIT} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={t("verifyAadhaarForm.title1")}
            // description={t("verifyAadhaarForm.description1")}
          />
        </Hidden>
        <Hidden mdUp>
          <CoApplicantKycStepperBox
            callingForMobileIs={true}
            title={t("verifyAadhaarForm.title1")}
            // description={t("verifyAadhaarForm.description1")}
          />
        </Hidden>
        <Formik
          initialValues={formEditIs ? formValue : initialValues}
          validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formikRef} enableReinitialize>
          {({ submitForm, setFieldValue }) => (
            <Form noValidate autoComplete="off" className={classes.kycFormContainer}>
              <div className={classes.kycCardFormRoot}>
                {errorVerified && (
                  <AlertBox severity="error">
                    {t("authVerifyAadhaarForm.formControl.isBotOrHumanText")}
                  </AlertBox>
                )}
                {(isErrorVerifyAadhaar || isErrorGetAdarCaptch  || isErrorVerifyAadhaar) && (
                  <AlertBox severity="error">{aadhaarErrorMessage}</AlertBox>
                )}

                {/* {customErrorMsg && customErrorMsg != "Aadhaar server not responding please refresh and Try Again." && customErrorMsg != "आधार सर्व्हर प्रतिसाद देत नाही कृपया रिफ्रेश करा आणि पुन्हा प्रयत्न करा." && customErrorMsg != "आधार सर्वर प्रतिक्रिया नहीं दे रहा है कृपया रीफ्रेश करें और पुनः प्रयास करें।" && (
                  <AlertBox severity="error">{customErrorMsg}</AlertBox>
                )} */}
                {/* { Need to comment this for code PROD and UAT } */}
                {customErrorMsg == "Aadhaar server not responding please refresh and Try Again." && (
                  <AlertBox severity="error">{`Aadhaar server not responding please Refresh and Try Again. OR `} <Link
                    onClick={() => tempVerifyAadhaar()}
                    style={{ textDecoration: "none", color: "#007ae7" }}
                  >
                    SKIP
                  </Link> for now</AlertBox>
                )}

                {/* {customErrorMsg == "आधार सर्व्हर प्रतिसाद देत नाही कृपया रिफ्रेश करा आणि पुन्हा प्रयत्न करा." && <AlertBox severity="error">{`${customErrorMsg} किंवा आतासाठी`} <Link
                  // to={{
                  //   pathname:
                  //     "upload-aadhaar",
                  // }}
                  onClick={() => tempVerifyAadhaar()}
                  style={{ textDecoration: "none", color: "#007ae7" }}
                >
                  वगळा
                </Link> </AlertBox>} */}

                {/* {customErrorMsg == "आधार सर्वर प्रतिक्रिया नहीं दे रहा है कृपया रीफ्रेश करें और पुनः प्रयास करें।" && <AlertBox severity="error">{`${customErrorMsg} या अभी के लिए`} <Link
                  // to={{
                  //   pathname:
                  //     "upload-aadhaar",
                  // }}
                  onClick={() => tempVerifyAadhaar()}
                  style={{ textDecoration: "none", color: "#007ae7" }}
                >
                  छोड़ें
                </Link> </AlertBox>} */}
                {/* { Need to uncomment this for code PROD and UAT } */}
                {customErrorMsg && <AlertBox severity="error">{`${customErrorMsg}`}</AlertBox>}

                {/* {isErrorTempAdrVrf && (
                <AlertBox severity="error">{errorMessageTempAdrVrf}</AlertBox>
              )} */}
                <Box className={classes.formControlRoot}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "verifyAadhaarForm.formControl.aadhaarNumInputLabel"
                    )}
                    placeholder={t(
                      "verifyAadhaarForm.formControl.aadhaarNumPlaceholder"
                    )}
                    name="aadharNumber"
                    // type="number"
                    type="text"
                    id="aadharNumber"
                    required
                    onInput={(e) => {
                      // e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                      e.target.value = e.target.value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
                    }}
                    inputProps={{
                      maxLength: 14,
                    }}
                    /* onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 12);
                    }} */
                    autoFocus={true}
                    disabled={formEditIs}
                  />
                </Box>
                {/* <Box className={classes.formControlRoot}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <label htmlFor="securityPin" className={classes.inputLabel}>
                        {t("verifyAadhaarForm.formControl.securityCode")}
                      </label>
                      <Box className={classes.captchaBox}>
                        <Grid container alignItems="center">
                          <Grid item xs>
                            {captchData?.captchaCode && (
                              <img
                                src={
                                  "data:image/png;base64," + captchData?.captchaCode
                                }
                                alt="Captcha"
                              />
                            )}
                          </Grid>
                          <Grid item xs="auto">
                            <IconButton className={classes.refreshBtn} aria-label="refresh" onClick={refreshCaptcha}>
                              <RefreshOutlinedIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <label htmlFor="securityPin" className={classes.inputLabel}>{t("verifyAadhaarForm.formControl.securityCodeLabel")}</label>
                      <FormControl
                        control="input"
                        variant="outlined"
                        placeholder={t(
                          "verifyAadhaarForm.formControl.securityCodePlaceholder"
                        )}
                        name="securityPin"
                        type="text"
                        id="securityPin"
                        required
                        inputProps={{ maxLength: 5 }}
                        onChange={(e) => {
                          setFieldValue("securityPin", e.target.value);
                          refRecaptcha.current.execute();
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box> */}
                <Box className={classes.formControlRoot}>
                  <Box className={classes.KycTnc}>
                    <FormControl
                      control="checkbox"
                      type="checkbox"
                      name="acceptTerms"
                      id="acceptTerms"
                      label={
                        <Typography className={classes.tncTxtField}>
                          <Trans i18nKey="InitialPageTrans:authVerifyAadhaarForm.formControl.checkBoxLabel">
                            I have read the
                            <span
                              // to={{
                              //   pathname:
                              //   `${ApiEndPoint}/uploads/files/Terms.pdf`,
                              // }}
                              // target="_blank"
                              // style={{ textDecoration: "none", color: "#007ae7" }}
                            >
                              Terms and Conditions
                            </span>
                            and given my consent for Aadhaar verification.
                          </Trans>
                        </Typography>
                      }
                      color="primary"
                    />
                  </Box>
                  <Recaptcha
                    ref={refRecaptcha}
                    sitekey={SiteKey}
                    onResolved={onResolved}
                  />
                </Box>

                {formEditIs &&
                  <Box mt={3}>
                    <AlertBox icon={false} variant="filled" style={{padding : "0px 12px"}} className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success"/> {t("verifyAadhaarForm.formControl.messageText3")}</Grid></AlertBox>
                  </Box>
                }
              </div>
              {/* <Box display="flex" justifyContent="center" m={1} p={1}>
              <Box>
                <ReCAPTCHA
               sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChange}
                />
              </Box>
            </Box> */}
              <Box className={classes.kycCardFooterRoot}>
                {/* {localStorage.getItem("skipFlow") == "true" && <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={skipFlow}
                  className={classes.nxtBtn}
                  endIcon={
                   <NextArrowIcon style={{ fill: "transparent" }} />
                  }
                >
                 Skip Now
                </Button> } */}
                <Button
                  type="submit"
                  variant="text"
                  color="primary"
                  size="large"
                  // onClick={submitForm}
                  className={classes.nxtBtn}
                  endIcon={
                    width === "xs" ? (
                      <WhiteArrowIcon style={{ fill: "transparent" }} />
                    ) : (
                      <NextArrowIcon style={{ fill: "transparent" }} />
                    )
                  }
                >
                  {t("verifyAadhaarForm.formControl.buttonText3")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <UserPDFViewDialogBox showDownload={false} open={docPreviewDialogOpenIs} onClose={docPreviewDialogCloseFun} fileUrl={`${ApiEndPoint}/uploads/files/Terms.pdf`} />
      </div>
    </KycTemplate>
  );
};

export default withWidth()(AuthBridgeVerifyAadhaar);
