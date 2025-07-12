import React, { useCallback, useEffect, useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTranslation, Trans } from "react-i18next";
import { CoApplicantBenefitsViewStyles } from "./CoApplicantBenefitsView.styles";
import { Box } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { useHistory } from "react-router-dom";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { AddCoApplicantIcon, CoApplicantSectionIcon } from "../../../atoms/SvgIcons/SvgIcons";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoApplicantDetails,
  coApplicantSelector
} from "../../../../redux/features/coApplicant/CoApplicantSlice";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../redux/features/stepper/StepperSlice";

const CoApplicantBenefitsView = (props) => {
  const { width } = props;
  const classes = CoApplicantBenefitsViewStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSkipOption, setIsSkipOption] = useState(false);
  const {
    isFetchingGetCoApplicant,
    isSuccessResGetCoApplicant,
    isErrorGetCoApplicant,
    errorMsgGetCoApplicant,
    coApplicantData,
  } = useSelector(coApplicantSelector);

  const {
    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isErrorApplicant,
    errorMessage,
    applicantData
  } = useSelector(applicantSelector);
  const [editCoApplicantIs, setEditCoApplicantIs] = useState(false);
  const stepperData = useSelector((state) => state.stepper.stepperData);
  const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);

  useEffect(() => {
    dispatch(getApplicant());
  }, [dispatch, t]);

  useEffect(() => { 
    if(isSuccessResApplicantGet && applicantData){
      if(applicantData.Gender==1 && applicantData.MarritalStatus==1){
        setIsSkipOption(false);
      }else{
        setIsSkipOption(true);
      }
    }

  },[isSuccessResApplicantGet, applicantData])

  /* useEffect(() => {
    dispatch(getCoApplicantDetails());
  }, [dispatch, t]);

  useEffect(() => {
    console.log("coApplicantData", coApplicantData);
    if (coApplicantData && isSuccessResGetCoApplicant) {
      // setEditCoApplicantIs(true);
      history.push("/add-co-applicant");
    }
  }, [coApplicantData, isSuccessResGetCoApplicant]); */

  /* useEffect(() => {
    console.log("stepperData", stepperData);
  }, [stepperData]); */

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 1) {
        new_obj = {
          ...element,
          status: "completed"
        };
      } else {
        new_obj = {
          ...element
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
      localStorage.removeItem("coApplicantFormPageIs");
      history.push("/category-details");
    }
  }, [isSuccessReqStepper]);
  return (
    <FormCard>
       {(isFetchingApplicantGet) && (
        <Loading isOpen={isFetchingApplicantGet} />
      )}
      <Hidden smDown>
        <FormTitleBox
          title={t("coApplicant.title")}
          optionalTxt={t("coApplicant.optionalTxt")}
          backUrl="/personal-details"
          titleIcon={<CoApplicantSectionIcon fontSize="large" />} />
      </Hidden>
      <Hidden mdUp>
        <StepperBar
          callingForMobileIs={true}
          title={t("coApplicant.title")}
          optionalTxt={t("coApplicant.optionalTxt")}
          backUrl="/personal-details"
        />
      </Hidden>

      <div className={classes.formSection}>
        <div className={classes.checkboxSection}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item md="auto" xs={12}>
              <Typography variant="h6" className={classes.wantTextBox}>{t("coApplicant.wantAddCoApplicantTxt")}</Typography>
            </Grid>
            <Grid item md="auto" xs={12} style={{ textAlign: "center" }}>
              <Button variant="outlined" color="primary" onClick={() => history.push("/add-co-applicant")} startIcon={<AddCoApplicantIcon fontSize="small" />}> {t("coApplicant.addCoApplicantBtnTxt")}</Button>
            </Grid>
          </Grid>
        </div>
        <Box className={classes.benefitsSection}>
            {isErrorApplicant && (
                <AlertBox severity="error">{errorMessage}</AlertBox>
            )}
          <Typography variant="h6" className={classes.wantTextBox}>{t("coApplicant.coApplicantBenefitsTitle")}</Typography>
          <ol className={classes.orderList}>
            <li>{t("coApplicant.benefitsListOfPoints.point1")}</li>
            <li>{t("coApplicant.benefitsListOfPoints.point2")}</li>
            <li>{t("coApplicant.benefitsListOfPoints.point3")}</li>
          </ol>
        </Box>
      </div>
      {isSkipOption && <div className={classes.actionSection}>
        <Grid container alignItems="center" justify="flex-end">
          <Grid item>
            <Button
              color="primary"
              onClick={() => updateStepperUI()}
            >
              {t("coApplicant.skipBtnText")}
            </Button>
          </Grid>
        </Grid>
      </div>
      }
    </FormCard>
  );
};

export default CoApplicantBenefitsView;
