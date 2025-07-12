import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Hidden from "@material-ui/core/Hidden";
// import Typography from "@material-ui/core/Typography";
import {
  NumberOneActiveIcon,
  NumberOneIcon,
  NumberTwoActiveIcon,
  NumberTwoIcon,
  NumberActiveThreeIcon,
  NumberThreeIcon,
  NumberActiveFourIcon,
  NumberFourIcon,
  CheckNumberIcon,
  BlackBackArrowIcon
} from "../SvgIcons/SvgIcons";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";
import { stepperBarStyles } from "./StepperBar.styles";
import { useSelector, useDispatch } from "react-redux";
import { getStepperDetails } from "../../../redux/features/stepper/StepperSlice";
import MobileStepperAfterLogin from "../../../components/atoms/MobileStepperAfterLogin/MobileStepperAfterLogin";

/* const ColorlibConnector = withStyles({
  line: {
    display: "none",
  },
})(StepConnector); */

const useColorlibStepIconStyles = makeStyles({
  root: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: active ? (
      <NumberOneActiveIcon fontSize="large" />
    ) : (
      <NumberOneIcon color="primary" fontSize="large" />
    ),
    2: active ? (
      <NumberTwoActiveIcon fontSize="large" />
    ) : (
      <NumberTwoIcon color="primary" fontSize="large" />
    ),
    3: active ? (
      <NumberActiveThreeIcon fontSize="large" />
    ) : (
      <NumberThreeIcon color="primary" fontSize="large" />
    ),
    4: active ? (
      <NumberActiveFourIcon fontSize="large" />
    ) : (
      <NumberFourIcon color="primary" fontSize="large" />
    ),
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {completed ? (
        <CheckNumberIcon color="primary" fontSize="large" />
      ) : (
        icons[String(props.icon)]
      )}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const StepperBar = (props) => {
  const { callingForMobileIs, title, optionalTxt, backUrl } = props;
  const classes = stepperBarStyles();
  const { t } = useTranslation("Translation");
  const currentPathName = useLocation().pathname;
  const history = useHistory();
  const dispatch = useDispatch();
  const stepperData = useSelector((state) => state.stepper.stepperData);
  const [stepperList, setStepperList] = useState([]);

  useEffect(() => {
    dispatch(getStepperDetails());
  }, [dispatch]);

  useEffect(() => {
    setStepperList([]);
    let modifiedStpprList = [];
    if (stepperData.superStepper) {
      for (let y = 0; y < stepperData.superStepper.length; y++) {
        const element = stepperData.superStepper[y];
        var new_obj = {};
        if (element.step === 1) {
          new_obj = {
            ...element,
            pageName: t("mainStepperSection.step1"),
            page: "/personal-details",
            isBeforeLine: false,
            isAfterLine: true
          };
        } else if (element.step === 2) {
          new_obj = {
            ...element,
            pageName: t("mainStepperSection.step2"),
            page: "/category-details",
            isBeforeLine: true,
            isAfterLine: true
          };
        } else if (element.step === 3) {
          new_obj = {
            ...element,
            pageName: t("mainStepperSection.step3"),
            page: "/submit-documents",
            isBeforeLine: true,
            isAfterLine: true
          };
        } else {
          new_obj = {
            ...element,
            pageName: t("mainStepperSection.step4"),
            page: "/make-payments",
            isBeforeLine: true,
            isAfterLine: false
          };
        }
        modifiedStpprList.push(new_obj);
      }
      if (currentPathName === "/personal-details" || currentPathName === "/co-applicant-benefits" || currentPathName === "/add-co-applicant") {
        modifiedStpprList[0].status = "active";
      }
      if (currentPathName === "/category-details" || currentPathName === "/income-details" || currentPathName === "/select-projects") {
        modifiedStpprList[1].status = "active";
      }
      if (currentPathName === "/document-declaration") {
        modifiedStpprList[2].status = "active";
      }
      if (currentPathName === "/make-payments" || currentPathName === "/emd-loan-application" || currentPathName === "/emd-loan-select-bank" || currentPathName === "/emd-loan-details-view" || currentPathName === "/payment-details-view") {
        modifiedStpprList[3].status = "active";
      }
      setStepperList(modifiedStpprList);
    }
  }, [stepperData, t]);

  const goBackCallBackFun = () => {
    if (backUrl) {
      history.push(backUrl);
    } else {
      history.goBack();
    }
  };

  return (
    <>
      {/* <Hidden smDown> */}
      {!callingForMobileIs && (
        <div className={classes.root}>
          <Container maxWidth="md">
            {/* <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              labelProps.error = true;
              stepProps.completed = false;
            }
            if (isStepOptional(index)) {
              if (labelProps.error)
                labelProps.optional = (
                  <Typography variant="caption" style={{ color: "#ffff" }}>
                    Not completed
                  </Typography>
                );
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>
                  <span style={{ color: "#ffff" }}>{label}</span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
            {/* <Stepper
            className={classes.stepper}
            activeStep={stepValue}
            connector={<ColorlibConnector />}
          >
            {stepperList.map((item, index) => {
              const stepProps = {};
              stepProps.completed = item.completed;
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel style={{ cursor: "pointer" }} onClick={() => history.push(item.page)} StepIconComponent={ColorlibStepIcon}>
                    <span style={{ color: "#ffff" }}>{item.pageName}</span>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper> */}

            {/* <Grid container>
              {stepperList.map((element, index) => (
                <Grid item xs key={index}>
                  <Box className={classes.stepperBox}>
                    <Box className={`${classes.numRoundBox} ${element.status}`}>
                      <span
                        className={`${classes.stepperNumber} ${element.status}`}
                      >
                        {element.step}
                      </span>
                    </Box>
                    <Typography
                      className={`${classes.stepperText} ${element.status}`}
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
            </Grid> */}
          </Container>
        </div>
      )}
      {/* </Hidden> */}
      {callingForMobileIs && (
        <>
          <div className={classes.titleContainer}>
            <Grid container alignItems="center">
              <Grid item>
                <IconButton className={classes.backBtn} onClick={() => goBackCallBackFun()}>
                  <BlackBackArrowIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" className={classes.title}>{title} {optionalTxt && <small>({optionalTxt})</small>}</Typography>
              </Grid>
              {/* <Grid item>
                {stepperList.length > 0 &&
                  <MobileStepperAfterLogin stepperList={stepperList} />
                }
              </Grid> */}
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default StepperBar;
