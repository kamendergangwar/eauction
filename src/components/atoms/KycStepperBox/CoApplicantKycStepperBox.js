import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { KycStepperBoxStyle } from "./KycStepperBox.style";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import MobileStepper from "../MobileStepper/MobileStepper";
import { useSelector, useDispatch } from "react-redux";
import { getStepperDetails } from "../../../redux/features/stepper/StepperSlice";
import { CheckRounded, WhiteBackArrowIcon } from "../SvgIcons/SvgIcons";
import { IconButton } from "@material-ui/core";

const CoApplicantKycStepperBox = (props) => {
  const { title, description, callingForMobileIs, onBack, otpOn } = props;
  const classes = KycStepperBoxStyle();
  const { t } = useTranslation("Translation");
  const currentPathName = useLocation().pathname;
  const dispatch = useDispatch();
  const stepperData = useSelector((state) => state.stepper.stepperData);
  const [stepperList, setStepperList] = useState([]);

  useEffect(() => {
    dispatch(getStepperDetails());
  }, [dispatch]);

  useEffect(() => {
    if (stepperData.superStepper) {
      let modifiedStpprList = [];
      for (let y = 0; y < stepperData.superStepper[0].coApplicantKycStepper.length; y++) {
        const element = stepperData.superStepper[0].coApplicantKycStepper[y];
        let json_path = "subStepperSection.step" + element.step;
        let activePath = ''
        var new_obj = {
          ...element,
          activePath,
          pageName: t(json_path)
        };
        modifiedStpprList.push(new_obj);
      }
      if (currentPathName === "/co-applicant-verify-aadhaar") {
        // modifiedStpprList[0].status = "active";
        modifiedStpprList[0].activePath = 'active'
      }
      if (currentPathName === "/co-applicant-upload-aadhaar") {
        // modifiedStpprList[1].status = "active";
        modifiedStpprList[1].activePath = 'active'
      }
      // if (currentPathName === "/co-applicant-verify-pancard") {
      //   modifiedStpprList[2].status = "active";
      // }
      // if (currentPathName === "/co-applicant-upload-pancard") {
      //   modifiedStpprList[3].status = "active";
      // }
      setStepperList(modifiedStpprList);
    }
    /* if (stepperData.superStepper) {
      setStepperList(stepperData.superStepper[0].coApplicantKycStepper);
    } */
  }, [stepperData]);

  return (
    <>
      {!callingForMobileIs && (
        <Container className={classes.stepperContainer}>
          <Grid container>
            {stepperList.map((element, index) => (
              <Grid item xs key={index}>
                <Box className={classes.stepperBox}>
                  <Box className={`${classes.numRoundBox} ${element.activePath}`}>
                    <span
                      className={`${classes.stepperNumber} ${element.activePath}`}
                    >
                        {element.status != 'completed' ? element.step : <CheckRounded color="white" style={{fontSize: '1.9rem'}}/>} 
                    </span>
                  </Box>
                  <Typography
                    className={`${classes.stepperText} ${element.activePath}`}
                  >
                    {element.pageName}
                  </Typography>
                  {element.isBeforeLine && (
                    <span className={`${classes.stepBeforeAfterLine} ${element.status}`}></span>
                  )}
                  {element.isAfterLine && (
                    <span className={`${classes.stepBeforeAfterLine} after ${element.status}`}></span>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {callingForMobileIs && (
        <>
          <div className={classes.titleContainer} >
          {otpOn ? <Grid container style={{ gap: 16 }} alignItems="center">
              <IconButton style={{ marginBottom: 14 }} onClick={() => onBack()}> <WhiteBackArrowIcon fontSize="small" /></IconButton>
              <Typography variant="h5" style={{fontSize: "1.6rem"}} gutterBottom className={classes.title}>
                {title}
              </Typography>
            </Grid> :
              <Typography variant="h5" gutterBottom className={classes.title}>
                {title}
              </Typography>}
              {/* <Grid item xs={2}>
                {stepperList.length > 0 &&
                  <MobileStepper stepperList={stepperList} />
                }
              </Grid> */}
                {description && (
                  <Typography variant="subtitle1" className={classes.subtitle} style={{ textAlign: "center" }}>
                    {description}
                  </Typography>
                )}
              {/* <Grid item xs={4}></Grid> */}
          
          </div>
        </>
      )}
    </>
  );
};

export default CoApplicantKycStepperBox;
