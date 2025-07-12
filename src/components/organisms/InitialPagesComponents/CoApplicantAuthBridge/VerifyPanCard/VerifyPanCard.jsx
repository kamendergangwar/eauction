import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
import Alert from '@material-ui/lab/Alert';
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
import CoApplicantKycStepperBox from "../../../../atoms/KycStepperBox/CoApplicantKycStepperBox";
import withWidth from "@material-ui/core/withWidth";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../../redux/features/stepper/StepperSlice";
import checkGif from "../../../../../assets/checkGif.webp";

const VerifyPanCard = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [formValue, setFormValue] = useState(null);
  const [formEditIs, setFormEditIs] = useState(false);
  const dispatch = useDispatch();
  const {
    isFetchingApplicant,
    isSuccessResPanCard,
    isErrorPanCard,
    errorMessagePanCard,
    isFetchingPanCard,
    panCardData,

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

  const {
    isSuccessResApplicantGet,
    applicantData
  } = useSelector(applicantSelector);

  const initialValues = {
    pancardNumber: "",
  };

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.coApplicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.coApplicantKycStepper[0].status != "completed") {
              pageUrl = "/co-applicant-verify-aadhaar";
            }
          }
          if (item.coApplicantKycStepper[1].title == "Verify PAN" && item.coApplicantKycStepper[1].status == "completed") {
            dispatch(getApplicant());
          }
        }


      })
      history.push(pageUrl)
    }
  }, [isSuccessResStepper])

  const validationSchema = yup.object({
    pancardNumber: yup
      .string()
      .required(t("verifyPanCardForm.formControl.pancardNumErrors.required"))
      .matches(
        /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
        t("verifyPanCardForm.formControl.pancardNumErrors.limitation")
      ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.pancardNumber && formEditIs == false) {
      let sendParam = {
        docNumber: values.pancardNumber,
        Lang: localStorage.getItem("i18nextLng"),
        ApplicantId: localStorage.getItem("applicantId"),
        IsCoApplicant: 1
      };
      dispatch(getDetailsFromPanCard(sendParam));
      // dispatch(tempPanCardVarification("1"));
    }
    if (formEditIs == true) {
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
      updateStepperUI();
      dispatch(clearApplicantState());
      setTimeout(() => {
        history.push("/add-co-applicant");
      }, 2000)
      setShowSuccessAlert(true);
    }
  }, [isSuccessResPanCard]);

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
          coApplicantKycStepper: new_sub_stepper
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
    }
  }, [isSuccessReqStepper]);

  const skipFlow = () => {
    history.push("/add-co-applicant");
  }

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.CoApplicantDetails[0]?.isPanVerified == "1") {
          if (showSuccessAlert == false) {        
              setFormEditIs(true);
          }
        const savedValue = {
          pancardNumber: applicantData.CoApplicantDetails[0].PANNo,
        };
        setFormValue(savedValue);
      }
    }
  }, [isSuccessResApplicantGet]);

  return (
    <KycTemplate isCoApplicant={true}>
      {(isFetchingApplicant || isFetchingStepper || isFetchingPanCard) && (
        <Loading isOpen={isFetchingApplicant || isFetchingStepper || isFetchingPanCard} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={t("verifyPanCardForm.title1")}
            description={t("verifyPanCardForm.description1")}
          />
        </Hidden>
        <Hidden mdUp>
          <CoApplicantKycStepperBox
            callingForMobileIs={true}
            title={t("verifyPanCardForm.title1")}
            description={t("verifyPanCardForm.description1")}
          />
        </Hidden>
        <Formik
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
              {(showSuccessAlert && formEditIs == false) && <Alert icon={false} variant="filled" style={{ padding: "0px 12px" }} severity="success" className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success" style={{marginRight: 6}}/>{t("verifyPanCardForm.formControl.panSuccessTxt")}</Grid></Alert>}
              {formEditIs &&
                  <Box mt={3}>
                    <AlertBox icon={false} variant="filled" style={{ padding: "0px 12px" }} severity="success" className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success" style={{marginRight: 6}}/>{t("verifyPanCardForm.formControl.messageText1")}</Grid></AlertBox>
                  </Box>
                }
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
                  disabled={showSuccessAlert}
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
