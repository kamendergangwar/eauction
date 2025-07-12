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
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars, clearApplicantKycStepperVars } from "../../../../../redux/features/stepper/StepperSlice";
import {
  getApplicant,
  applicantSelector
} from "../../../../../redux/features/applicant/ApplicantSlice";
import { createAccountLog } from "../../../../../redux/features/masterdata/MasterDataSlice";
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
import KycStepperBox from "../../../../atoms/KycStepperBox/KycStepperBox";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import { Tooltip, withStyles } from "@material-ui/core";
import UserPDFViewDialogBox from "../../../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import checkGif from "../../../../../assets/checkGif.webp"

const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);

const AuthBridgeVerifyAadhaar = (props) => {
  const { onValueChange, customErrorMsg, setCustomErrorMsg, width, mahaItFailed, setMahaItFailed } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const refRecaptcha = useRef(null);
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isVerified, setVerified] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [formEditIs, setFormEditIs] = useState(false);
  const [errorVerified, setErrorVerified] = useState(false);
  const isCalledRef = useRef(false);
  const [counter, setCounter] = useState(0);
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
  const showSkipOption = [
    '9987540214',
    '9860130198',
    '8080192355',
    '9767303806',
    '9657722365',
    '6260172536',
    '7017114412',
    '9833150455',
    '9595553307',
    '9867091099',
    '8669062239'
  ];

  useEffect(() => {
    if (!isCalledRef.current) {
      isCalledRef.current = true;
      dispatch(getAadhaarCaptcha());
      setCounter(counter + 1)
      // dispatch(getStepperDetails());
    }
    dispatch(getApplicant());
    // if (width == "xs" || width == "sm") {
    // }
  }, []);

  const initialValues = {
    aadharNumber: "",
    securityPin: "",
    acceptTerms: false,
  };

  const validationSchema = yup.object({
    aadharNumber: formEditIs == false && yup
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
    //  && values.securityPin
    if (!mahaItFailed && values.aadharNumber && formEditIs == false) {
      let aadhaar_num = values.aadharNumber.replace(/-/g, "");
      const requestData = {
        docNumber: aadhaar_num,
        // secretToken: captchData?.secretToken || "",
        // tsTransID: captchData?.tsTransID || "",
        // captchaCode: "HF9DC",
        // captchaCode: values.securityPin,
        IsCoApplicant: 0
      };
      localStorage.setItem("aadharNo", aadhaar_num);
      localStorage.setItem("securePin", values.securityPin);
      dispatch(sendOTPMahaIT(requestData));
    }
    if (values.aadharNumber && formEditIs == false && mahaItFailed) {
      let aadhaar_num = values.aadharNumber.replace(/-/g, "");
      console.log("captchData", captchData);
      const requestData = {
        docNumber: aadhaar_num,
        secretToken: captchData?.secretToken || "",
        tsTransID: captchData?.tsTransID || "",
        captchaCode: "HF9DC",
        // captchaCode: values.securityPin,
        IsCoApplicant: 0
      };
      localStorage.setItem("aadharNo", aadhaar_num);
      localStorage.setItem("securePin", values.securityPin);
      dispatch(sendOTP(requestData));
    }
    if (formEditIs == true) {
      // updateStepperUI();
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
      IsCoApplicant: "0"
    };
    dispatch(tempVerifyAadhaarPost(requestData));
  };

  useEffect(() => {
    if (isSuccessTempAdrVrf) {
      updateStepperUI();
      // history.push("/upload-aadhaar");
    }
  }, [isSuccessTempAdrVrf]);

  

  // useEffect(() => {
  //   if (isSuccessResStepper && counter == 1) {
  //     let pageUrl;
  //     stepperData.superStepper.forEach(item => {
  //       if (item.step == 1) {
  //         if (item.applicantKycStepper[1].title == "Verify PAN" && stepperData, item.applicantKycStepper[0].status == "completed" && pageUrl == undefined) {
  //           if (item.applicantKycStepper[1].status != "completed") {
  //             pageUrl = "/verify-pancard";
  //           }
  //         }
  //         if (item.applicantKycStepper[0].title == "Verify Aadhaar" && item.applicantKycStepper[0].status == "completed") {
  //           dispatch(getApplicant());
  //         }
  //       }

  //     });

  //     pageUrl && history.push(pageUrl)

  //   }
  // }, [isSuccessResStepper])
 

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
      onValueChange(true);
      // const requestData = {
      //   AadharNo: localStorage.getItem("aadharNo"),
      //   ApplicantId: localStorage.getItem("applicantId"),
      //   steps: "step_2",
      //   debug: 0,
      // };
      // dispatch(createAccountLog(requestData));
      setCustomErrorMsg("");
      dispatch(clearVerifyAadhaarState());
      // dispatch(clearVerifyAadhaarData());
    }
  }, [isSuccessSent, isSuccessSentMahaIT]);

  useEffect(() => {
    if (isErrorSendOtp && aadhaarErrorMessage) {
      let err_msg = aadhaarErrorMessage;
      setCustomErrorMsg(err_msg);
      dispatch(clearVerifyAadhaarState());
      // dispatch(clearVerifyAadhaarData());
      refreshCaptcha();
      setMahaItFailed(false);
    }
  }, [isErrorSendOtp, aadhaarErrorMessage]);

  useEffect(() => {
    if (isErrorSendOtpMahaIT && aadhaarErrorMessageMahaIT) {
      let err_msg = aadhaarErrorMessageMahaIT;
      setCustomErrorMsg(err_msg);
      dispatch(clearVerifyAadhaarState());
      setMahaItFailed(true);
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
      dispatch(clearVerifyAadhaarState());
      dispatch(clearSuperStepperEditVars());
      dispatch(clearApplicantKycStepperVars());
      history.push("/verify-pancard");
    }
  }, [isSuccessReqStepper]);

  const skipFlow = () => {
    history.push("/verify-pancard");
  }

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.IsAadharVerified == "1") {
        setFormEditIs(true);
        // let AadharNo = applicantData.AadharNo.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
        let AadharNo = applicantData.AadharNo;
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
    <KycTemplate>
      {(isFetchingVerifyAadhaar || isFetchingStepper || isFetchingGetAdarCaptch || isFetchingVerifyAadhaarMahaIT) && (
        <Loading isOpen={isFetchingVerifyAadhaar || isFetchingStepper || isFetchingGetAdarCaptch || isFetchingVerifyAadhaarMahaIT} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={t("verifyAadhaarForm.title")}
          // description={t("verifyAadhaarForm.description")}
          />
        </Hidden>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
          initialValues={formEditIs ? formValue : initialValues}
          enableReinitialize
        >
          {({ submitForm, setFieldValue }) => (
            <Form noValidate autoComplete="off" className={classes.kycFormContainer}>
              <div className={classes.kycCardFormRoot}>
                {errorVerified && (
                  <AlertBox severity="error">
                    {t("authVerifyAadhaarForm.formControl.isBotOrHumanText")}
                  </AlertBox>
                )}
                {(isErrorVerifyAadhaar || isErrorGetAdarCaptch || isErrorVerifyAadhaar) && (
                  <AlertBox severity="error">{aadhaarErrorMessage}</AlertBox>
                )}
                {/* {customErrorMsg && customErrorMsg != "Aadhaar server not responding please refresh and Try Again." && customErrorMsg != "आधार सर्व्हर प्रतिसाद देत नाही कृपया रिफ्रेश करा आणि पुन्हा प्रयत्न करा." && customErrorMsg != "आधार सर्वर प्रतिक्रिया नहीं दे रहा है कृपया रीफ्रेश करें और पुनः प्रयास करें।" && (
                  <AlertBox severity="error">{`${customErrorMsg}`}</AlertBox>
                )} */}
                {/* { Need to comment this for code PROD and UAT } */}
                {customErrorMsg == "Aadhaar server not responding please refresh and Try Again." && showSkipOption.includes(localStorage.getItem("mobileNo")) && <AlertBox severity="error">{`Aadhaar server not responding please Refresh and Try Again. OR `}
                  <Link
                    // to={{
                    //   pathname:
                    //     "upload-aadhaar",
                    // }}
                    onClick={() => tempVerifyAadhaar()}
                    style={{ textDecoration: "none", color: "#007ae7" }}
                  >
                    SKIP
                  </Link> for now</AlertBox>}

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
                    <Grid item md={6} xs={12}>
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
                    <Grid item md={6} xs={12}>
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
                              // onClick={(e) => {setDocPreviewDialogOpen(true); e.stopPropagation()}}
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
                  {formEditIs &&
                    <Box mt={3}>
                      <AlertBox icon={false} variant="filled" style={{padding : "0px 12px"}} className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success"/> {t("verifyAadhaarForm.formControl.messageText2")}</Grid></AlertBox>
                    </Box>
                  }
                </Box>
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
