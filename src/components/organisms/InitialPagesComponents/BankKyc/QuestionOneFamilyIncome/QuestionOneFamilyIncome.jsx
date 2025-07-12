import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { Typography, Grid, Hidden, CardMedia } from "@material-ui/core/";
import { initialPagesStyles } from "../../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import KycTemplate from "../../../../templates/KycTemplate/KycTemplate";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "../../../../molecules/FormControl/FormControl";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import {
  QuestionPageYesGrayIcon,
  QuestionPageNoGrayIcon,
  QuestionPageYesBlueIcon,
  QuestionPageNoBlueIcon,
  BlackBackArrowIcon,
  BigSizeSuccessIcon,
  WhatsappIcon,
  SorryVector,
} from "../../../../atoms/SvgIcons/SvgIcons";

import {
  getBidderType,
  saveLeadForm,
  clearProfileData,
  PmayNonPmaySelector,
  RegisterBidderType,
  clearBidderState,
} from "../../../../../redux/features/pmayNonPmay/pmayNonPmaySlice";
import { clearSuperStepperEditVars, getStepperDetails } from "../../../../../redux/features/stepper/StepperSlice";
import {
  ApplicantProgressSelector,
  getApplicantProgress,
} from "../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import {
  projectDataSelector,
  getFilterLocationList,
} from "../../../../../redux/features/projectdata/ProjectDataSlice";
import {
  applicantSelector,
  getApplicant,
} from "../../../../../redux/features/applicant/ApplicantSlice";

function QuestionOneFamilyIncome(props) {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isShowExample, setIsShowExample] = useState(false);
  const [nextPageNo, setNextPageNo] = useState(0);
  const [selectedFamIncome, setSelectedFamIncome] = useState("");
  const [isIndividual, setIsIndividual] = useState("");
  const [isWhatsappNotification, setWhatsappNotification] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const containerRef = useRef(null);
  const {
    isSuccessBidder,
    isSuccessLeadForm,

  } = useSelector(PmayNonPmaySelector);
  const { isSuccessResStepper, stepperData } = useSelector(
    (state) => state.stepper
  );
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(
    ApplicantProgressSelector
  );
  const { locationListData, isSuccessLocationList } =
    useSelector(projectDataSelector);
  const { applicantData, isSuccessResApplicantGet } =
    useSelector(applicantSelector);
  useEffect(() => {
    dispatch(getStepperDetails());
    dispatch(getApplicantProgress());
    dispatch(getFilterLocationList());
  }, [dispatch]);

  const scrollDown = () => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const applyPmay = () => {
    let reqData;
    reqData = isIndividual == "individual" ? "individual" : "company";
    const requestData = {
      RegisterType: reqData,
      Type: "OtherDetails",
    };
    dispatch(RegisterBidderType(requestData));
  };

  // useEffect(() => {
  //   if (isSuccessLocationList && locationListData) {
  //     let temp_loc_list = [];
  //     for (let i = 0; i < locationListData.length; i++) {
  //       const element = locationListData[i];
  //       let new_obj = {
  //         label: element.location_name,
  //         value: element.location_id,
  //       };
  //       temp_loc_list.push(new_obj);
  //     }
  //     setLocationList(temp_loc_list);
  //   }
  // }, [isSuccessLocationList, locationListData]);

  useEffect(() => {
    if (isSuccessBidder) {
      dispatch(clearSuperStepperEditVars())
      const route =
        isIndividual === "individual"
          ? "/auth-verify-aadhaar"
          : "/auth-verify-gst";
      history.push(route);
    }
  }, [isSuccessBidder]);

  useEffect(() => {
    if (isSuccessBidder == 200) {
      //setNextPageNo(6);
      dispatch(clearProfileData());
      dispatch(clearBidderState());
    }
  }, [isSuccessBidder]);

  return (
    <KycTemplate hideStepperIs={true}>
      <div className={classes.qstnContainer} id="mainPrintSection">
        <div ref={containerRef}>
          {nextPageNo != 0 && (
            <IconButton
              aria-label="close"
              className={classes.backButton}
            // onClick={() => nextAndPrevPage("prev")}
            >
              <BlackBackArrowIcon />
            </IconButton>
          )}

          <Box>
            <Typography variant="h4" className={classes.questionText}>
              {"Select Bidder Type"}
            </Typography>
            {/* <Box className={classes.helpTextBox}>
                <Typography className={classes.helpTextPara}>
                  <span className="helpText1">{t("userDeclaration.questionPage1.helpText")}</span>
                  <span>{t("userDeclaration.questionPage1.helpText1")}</span>
                  {!isShowExample &&
                    <Button className={classes.showMoreBtn} color="primary" onClick={() => setIsShowExample(true)}>{t("userDeclaration.questionPage1.showExampleBtnTxt")}</Button>
                  }
                </Typography>
                {isShowExample &&
                  <Typography className={classes.exampleTextPara}>
                    <span>{t("userDeclaration.questionPage1.exampleText")}</span>
                    <Button className={classes.showMoreBtn} color="primary" onClick={() => setIsShowExample(false)}>{t("userDeclaration.questionPage1.hideExampleBtnTxt")}</Button></Typography>
                }
              </Box> */}
            <RadioGroup
              row
              aria-label="bidderType"
              name="bidderType"
              className={classes.radioBtnsGroup}
              value={isIndividual}
              onChange={(e) => {
                setIsIndividual(e.target.value);
                scrollDown();
              }}
            >
              <FormControlLabel
                value="individual"
                control={<Radio color="primary" />}
                label={`${"Individual"}`}
                labelPlacement="end"
                className={`${isIndividual == "individual" ? "active" : ""}`}
              />

              <FormControlLabel
                value="company"
                control={<Radio color="primary" />}
                label={`${"Non-Individual"}`}
                labelPlacement="end"
                className={`${isIndividual == "nonIndividual" ? "active" : ""}`}
              />
            </RadioGroup>
            <Box textAlign="center">
              <Button
                type="button"
                variant="contained"
                color="primary"
                disabled={!isIndividual}
                onClick={() => applyPmay()}
                className={classes.continueBtn}
              >
                {t("userDeclaration.continueBtnText")}
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </KycTemplate>
  );
}

export default withWidth()(QuestionOneFamilyIncome);
