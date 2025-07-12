import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Alert from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AuthTemplate from "../../../../templates/AuthTemplate/AuthTemplate";
import TitleDescriBox from "../../../../atoms/TitleDescriBox/TitleDescriBox";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../../InitialPages.styles";
import KycTemplate from "../../../../templates/KycTemplate/KycTemplate";
import KycTitleDescriBox from "../../../../atoms/KycTitleDescriBox/KycTitleDescriBox";
import Recaptcha from "react-google-invisible-recaptcha";
import { useSelector, useDispatch } from "react-redux";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import IconButton from "@material-ui/core/IconButton";
import { blue } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  NextArrowIcon,
  WhiteArrowIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import PancardPlaceholderIcon from "../../../../../assets/PancardIcon.png";
// import PanPhn from "../../../../../assets/PanPhn.svg";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
  getDetailsFromPanCard,
  tempPanCardVarification
} from "../../../../../redux/features/applicant/ApplicantSlice";
import Hidden from "@material-ui/core/Hidden";
import KycStepperBox from "../../../../atoms/KycStepperBox/KycStepperBox";
import withWidth from "@material-ui/core/withWidth";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars, clearApplicantKycStepperVars } from "../../../../../redux/features/stepper/StepperSlice";
import { createAccountLog } from "../../../../../redux/features/masterdata/MasterDataSlice";
import { addEditApplicantProgress, ApplicantProgressSelector, getApplicantProgress } from "../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import checkGif from "../../../../../assets/checkGif.webp";

const VerifyPanCard = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false)
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(null);
  const [formEditIs, setFormEditIs] = useState(false);
  const {
    isFetchingApplicant,
    isSuccessResPanCard,
    isErrorPanCard,
    errorMessagePanCard,
    isFetchingPanCard,
    panCardData,
    isFetchingApplicantGet,

    isSuccessResApplicantGet,
    applicantData,

    isSuccessResTempVerify,
    isFetchingTempVerify,
    isErrorTempVerify,
    errorMsgTempVerify
  } = useSelector(applicantSelector);
  // const stepperData = useSelector((state) => state.stepper.stepperData);
  // const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);

  const initialValues = {
    pancardNumber: "",
  };

  const validationSchema = yup.object({
    pancardNumber: formEditIs == false && yup
      .string()
      .required(t("verifyPanCardForm.formControl.pancardNumErrors.required"))
      .matches(
        /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
        t("verifyPanCardForm.formControl.pancardNumErrors.limitation")
      ),
  });

  useEffect(() => {
    dispatch(clearSuperStepperEditVars());
    dispatch(getStepperDetails());
    dispatch(getApplicantProgress());
    dispatch(getApplicant());
    
  }, [dispatch, t])

  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } = useSelector(ApplicantProgressSelector);
  const updateApplicantProgressStepper = () => {
    let newStepper = [];
    let newStep = {};
    const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
    ApplicantStepper.forEach(step => {
      if (step.StepId == 2) {
        newStep = {
          ...step,
          Status: "completed",
          Description: "KYC done Successfully"
        }
      } else {
        newStep = step
      }
      newStepper.push(newStep);
    });
    dispatch(addEditApplicantProgress(newStepper));
  }

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.pancardNumber && formEditIs == false) {
      let sendParam = {
        docNumber: values.pancardNumber,
        Lang: localStorage.getItem("i18nextLng"),
        ApplicantId: localStorage.getItem("applicantId"),
        type: applicantData.register_type,
        IsCoApplicant: 0
      };
      dispatch(getDetailsFromPanCard(sendParam));
      // dispatch(tempPanCardVarification("0"));
      // updateStepperUI();
    }

    if (formEditIs == true) {
      updateStepperUI();
      skipFlow();
    }
  };

  /* useEffect(() => {
    if (isSuccessResTempVerify) {
      updateStepperUI();
    }
  }, [isSuccessResTempVerify]); */

  useEffect(() => {
    if (isSuccessResPanCard) {
      // const requestData = {
      //   PANNo: formikRef.current.values.pancardNumber,
      //   ApplicantId: localStorage.getItem("applicantId"),
      //   steps: "step_4",
      //   debug:0,
      // }

      // dispatch(createAccountLog(requestData));
      updateStepperUI();
      history.push("/bank-account-detail");
    }
  }, [isSuccessResPanCard]);

  // useEffect(() => {
  //   if (isSuccessResStepper) {
  //     stepperData.superStepper[0].applicantKycStepper.forEach(element => {
  //       if (element.title == "Verify Aadhaar") {
  //         if (element.status != "completed") {
  //           history.push("/auth-verify-aadhaar");
  //         }
  //       }
  //       if (element.title == "Verify GST") {
  //         if (element.status != "completed") {
  //           history.push("/auth-verify-gst");
  //         }
  //       }
  //       // console.log(element, "element")
  //       if (element.title == "Verify PAN" && element.status == "completed") {
  //         dispatch(getApplicant());
  //       }
  //     });
  //   }
  // }, [isSuccessResStepper])

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStepperUI = () => {
    console.log("hit");
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
          if (inner_element.step == 2) {
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
console.log(isSuccessReqStepper);
  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(clearSuperStepperEditVars());
      dispatch(clearApplicantState());
      dispatch(getStepperDetails());
      dispatch(clearApplicantKycStepperVars());
      // setTimeout(() => {
      //   history.push("/bank-account-detail");
      // }, 2000)
      setShowSuccessAlert(true)
    }
  }, [isSuccessReqStepper]);

  const skipFlow = () => {
    history.push("/bank-account-detail");
     //updateApplicantProgressStepper()
  }

  useEffect(() => {
    if (isSuccessResApplicantGet && isSuccessProgressResStepper) {
      if (applicantData.isPanVerified == "1") {
        // updateApplicantProgressStepper();
      }
    }
  }, [isSuccessResApplicantGet, isSuccessProgressResStepper]);

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.isPanVerified == "1") {
        if (showSuccessAlert == false) {
          setFormEditIs(true);
        }
        const savedValue = {
          pancardNumber: applicantData.PANNo,
        };
        setFormValue(savedValue);
      }
    }
  }, [isSuccessResApplicantGet]);

  return (
    <KycTemplate>
      {(isFetchingApplicant || isFetchingStepper || isFetchingPanCard || isFetchingApplicantGet) && (
        <Loading isOpen={isFetchingApplicant || isFetchingStepper || isFetchingPanCard || isFetchingApplicantGet} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={applicantData?.register_type === 'company' ? "Verify Non-Individual PAN Card":t("verifyPanCardForm.title")}
            description={t("verifyPanCardForm.description")}
          />
        </Hidden>
        <Hidden mdUp>
          <KycStepperBox
            callingForMobileIs={true}
            title={t("verifyPanCardForm.title")}
            description={t("verifyPanCardForm.description")}
          />
        </Hidden>
        <Formik
          // initialValues={initialValues}
          initialValues={formEditIs ? formValue : initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
          enableReinitialize
        >
          {({ submitForm }) => (
            <Form noValidate autoComplete="off" className={classes.kycFormContainer}>
              <div className={classes.kycCardFormRoot}>
                <Box textAlign="center" marginY={2}>
                  <img
                    className={classes.iconStyle}
                    src={PancardPlaceholderIcon}
                    alt="Verify Pancard"
                  />
                </Box>
                {isErrorPanCard && (
                  <AlertBox severity="error">{errorMessagePanCard}</AlertBox>
                )}
                <Box className={classes.formControlRoot}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "verifyPanCardForm.formControl.pancardNumInputLabel"
                    )}
                    placeholder={t(
                      "verifyPanCardForm.formControl.pancardNumPlaceholder"
                    )}
                    name="pancardNumber"
                    type="text"
                    id="pancardNumber"
                    required
                    inputProps={{
                      maxLength: 10,
                    }}
                    autoFocus={true}
                    onInput={(e) =>
                      (e.target.value = ("" + e.target.value).toUpperCase())
                    }
                    disabled={formEditIs}
                  />
                </Box>
                {formEditIs &&
                  <Box mt={3}>
                    <AlertBox icon={false} variant="filled" style={{ padding: "0px 12px" }} severity="success" className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success" style={{marginRight: 6}}/>{t("verifyPanCardForm.formControl.messageText0")}</Grid></AlertBox>
                  </Box>
                }
                {(showSuccessAlert && formEditIs == false) && <Alert icon={false} variant="filled" style={{ padding: "0px 12px" }} severity="success" className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success" style={{marginRight: 6}}/>{t("verifyPanCardForm.formControl.panSuccessTxt")}</Grid></Alert>}
              </div>
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
                 // disabled={showSuccessAlert}
                  // fullWidth
                  endIcon={
                    width === "xs" ? (
                      <WhiteArrowIcon style={{ fill: "transparent" }} />
                    ) : (
                      <NextArrowIcon style={{ fill: "transparent" }} />
                    )
                  }
                >
                  {t("verifyPanCardForm.formControl.buttonText3")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </KycTemplate>
  );
};

export default withWidth()(VerifyPanCard);
