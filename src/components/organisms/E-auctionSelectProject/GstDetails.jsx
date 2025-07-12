import React, { useEffect, useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AuthTemplate from "../../templates/AuthTemplate/AuthTemplate";
import TitleDescriBox from "../../atoms/TitleDescriBox/TitleDescriBox";
import FormControl from "../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../InitialPagesComponents/InitialPages.styles";
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
  sendOTPMahaIT,
} from "../../../redux/features/verify/VerifyAadhaarSlice";
import {
  addEditStepper,
  getStepperDetails,
  clearSuperStepperEditVars,
  clearApplicantKycStepperVars,
} from "../../../redux/features/stepper/StepperSlice";
import {
  getApplicant,
  applicantSelector,
} from "../../../redux/features/applicant/ApplicantSlice";
import { createAccountLog } from "../../../redux/features/masterdata/MasterDataSlice";
import Loading from "../../atoms/Loading/Loading";
import AlertBox from "../../atoms/AlertBox/AlertBox";
import Recaptcha from "react-google-invisible-recaptcha";
import axios from "axios";
import { SiteKey, SecretKey, ApiEndPoint } from "../../../utils/Common";
import { NextArrowIcon, WhiteArrowIcon } from "../../atoms/SvgIcons/SvgIcons";
import KycTemplate from "../../templates/KycTemplate/KycTemplate";
import KycTitleDescriBox from "../../atoms/KycTitleDescriBox/KycTitleDescriBox";
import KycStepperBox from "../../atoms/KycStepperBox/KycStepperBox";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import { Tooltip, withStyles } from "@material-ui/core";
import UserPDFViewDialogBox from "../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import checkGif from "../../../assets/checkGif.webp";
import {
  PmayNonPmaySelector,
  clearGstData,
  getBidderType,
  saveGstValue,
} from "../../../redux/features/pmayNonPmay/pmayNonPmaySlice";

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

const GstDetails = (props) => {
  const {
    onValueChange,
    customErrorMsg,
    setCustomErrorMsg,
    width,
    mahaItFailed,
    setMahaItFailed,
  } = props;
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
    isSuccessSaveGst,
    applicationPmay,
    isSuccessPmay,
    isFetchingPmay,
    isSuccessLeadForm,
    isFetchingLeadForm,
    isErrorLeadForm,
    errorMsgLeadForm,
    applicationLeadForm,
  } = useSelector(PmayNonPmaySelector);

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
    aadhaarDataMahaIT,
  } = useSelector(verifyAadhaarSelector);

  const { applicantData, isSuccessResApplicantGet } =
    useSelector(applicantSelector);

  const initialValues = {
    GstNo: "",
    acceptTerms: false,
  };

  const validationSchema = yup.object({
    GstNo:
      formEditIs == false &&
      yup
        .string()
        .matches(
          /^[0-9A-Za-z]{15}$/,
          t("authVerifyAadhaarForm.formControl.aadhaarNumErrors.limitation")
        )
        .required(
          t("authVerifyAadhaarForm.formControl.aadhaarNumErrors.required")
        ),
    acceptTerms: yup
      .bool()
      .oneOf(
        [true],
        t("authVerifyAadhaarForm.formControl.checkBoxErrors.required")
      ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const gstnumber = values.GstNo;

    const requestData = {
      GstNo: values.GstNo,
      Type: "OtherDetails",
    };
    dispatch(saveGstValue(requestData));
    if (formEditIs == true) {
      updateStepperUI();
      //skipFlow();
    }
  };

  useEffect(() => {
    if (isSuccessSaveGst) {
      updateStepperUI();
    //  history.push("/verify-pancard");
    }
  }, [isSuccessSaveGst]);
  // useEffect(() => {
  //     if (isSuccessTempAdrVrf) {
  //       updateStepperUI();
  //         // history.push("/upload-aadhaar");
  //     }
  // }, [isSuccessTempAdrVrf]);

  // useEffect(() => {
  //   if (isSuccessResStepper) {
  //     let pageUrl;
  //     stepperData.superStepper.forEach((item) => {
  //       if (item.step == 1) {
  //         if (
  //           (item.applicantKycStepper[1].title == "Verify PAN" && stepperData,
  //           item.applicantKycStepper[0].status == "completed" &&
  //             pageUrl == undefined)
  //         ) {
  //           if (item.applicantKycStepper[1].status != "completed") {
  //             pageUrl = "/verify-pancard";
  //           }
  //         }
  //         if (
  //           item.applicantKycStepper[0].title == "Verify Aadhaar" &&
  //           item.applicantKycStepper[0].status == "completed"
  //         ) {
  //           dispatch(getApplicant());
  //         }
  //       }
  //     });

  //     pageUrl && history.push(pageUrl);
  //   }
  // }, [isSuccessResStepper]);

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
              status: "completed",
            };
          } else {
            new_sub_obj = {
              ...inner_element,
            };
          }
          new_sub_stepper.push(new_sub_obj);
        }
        new_obj = {
          ...element,
          applicantKycStepper: new_sub_stepper,
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
      dispatch(clearGstData());
      dispatch(clearVerifyAadhaarState());
      dispatch(clearSuperStepperEditVars());
      dispatch(clearApplicantKycStepperVars());
      history.push("/verify-pancard");
    }
  }, [isSuccessReqStepper]);

  const skipFlow = () => {
    history.push("/verify-pancard");
  };

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.isGstVerified == "1") {
        setFormEditIs(true);
        // let AadharNo = applicantData.AadharNo.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
        let GstNo = applicantData.GstNo;
        const savedValue = {
          GstNo: GstNo,
          acceptTerms: true,
        };
        setFormValue(savedValue);
      }
    }
  }, [isSuccessResApplicantGet]);

  return (
    <KycTemplate>
      {(isFetchingVerifyAadhaar ||
        isFetchingStepper ||
        isFetchingGetAdarCaptch ||
        isFetchingVerifyAadhaarMahaIT) && (
        <Loading
          isOpen={
            isFetchingVerifyAadhaar ||
            isFetchingStepper ||
            isFetchingGetAdarCaptch ||
            isFetchingVerifyAadhaarMahaIT
          }
        />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={"Verify Your GST Number For KYC"}
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
            <Form
              noValidate
              autoComplete="off"
              className={classes.kycFormContainer}
            >
              <div className={classes.kycCardFormRoot}>
                {errorVerified && (
                  <AlertBox severity="error">
                    {t("authVerifyAadhaarForm.formControl.isBotOrHumanText")}
                  </AlertBox>
                )}
                {(isErrorVerifyAadhaar ||
                  isErrorGetAdarCaptch ||
                  isErrorVerifyAadhaar) && (
                  <AlertBox severity="error">{aadhaarErrorMessage}</AlertBox>
                )}

                <Box className={classes.formControlRoot}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={"Enter Your 15 Digit GSTIN Number"}
                    placeholder={"Enter Your GST Number"}
                    name="GstNo"
                    // type="number"
                    type="text"
                    id="GstNo"
                    required
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^A-Za-z0-9]/g, "")
                        .substr(0, 15);
                    }}
                    inputProps={{
                      maxLength: 15,
                    }}
                    //  onInput={(e) => {
                    //   e.target.value = Math.max(0, parseInt(e.target.value))
                    //     .toString()
                    //     .slice(0, 15);
                    // }}
                    autoFocus={true}
                    disabled={formEditIs}
                  />
                </Box>

                <Box className={classes.formControlRoot}>
                  <Box className={classes.KycTnc}>
                    <FormControl
                      control="checkbox"
                      type="checkbox"
                      name="acceptTerms"
                      id="acceptTerms"
                      label={
                        <Typography className={classes.tncTxtField}>
                          I have read the
                          <span>&nbsp;Terms and Conditions&nbsp;</span>
                          and given my consent for GSTIN verification.
                        </Typography>
                      }
                      color="primary"
                    />
                  </Box>

                  {formEditIs && (
                    <Box mt={3}>
                      <AlertBox
                        icon={false}
                        variant="filled"
                        style={{ padding: "0px 12px" }}
                        className={classes.customAlert}
                      >
                        <Grid container alignItems="center">
                          <img src={checkGif} height="40px" alt="success" />{" "}
                          {t("verifyAadhaarForm.formControl.messageText4")}
                        </Grid>
                      </AlertBox>
                    </Box>
                  )}
                </Box>
              </div>

              <Box className={classes.kycCardFooterRoot}>
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
        <UserPDFViewDialogBox
          showDownload={false}
          open={docPreviewDialogOpenIs}
          onClose={docPreviewDialogCloseFun}
          fileUrl={`${ApiEndPoint}/uploads/files/Terms.pdf`}
        />
      </div>
    </KycTemplate>
  );
};

export default withWidth()(GstDetails);
