import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
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
} from "../SvgIcons/SvgIcons";
import Container from "@material-ui/core/Container";
// import { useTranslation } from "react-i18next";
import { stepperBarStyles } from "../../atoms/StepperBar/StepperBar.styles";
const ColorlibConnector = withStyles({
  line: {
    display: "none",
  },
})(StepConnector);

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
  //   const { active, completed } = props;
  const active = 0;
  const completed = 0;

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

function EstampingStepper(props) {
  const classes = stepperBarStyles();
  const [stepperList, setStepperList] = useState([
    "Preview Documents",
    "Verify Aadhaar",
  ]);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Stepper
          className={classes.stepper}
          activeStep={1}
          connector={<ColorlibConnector />}
        >
          {stepperList.map((item, index) => {
            const stepProps = {};
            stepProps.completed = item.completed;
            return (
              <Step {...stepProps} key={index}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <span style={{ color: "#ffff" }}>{item}</span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Container>
    </div>
  );
}

export default EstampingStepper;
