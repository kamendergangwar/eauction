import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import { useHistory, Link } from "react-router-dom";

const ColorlibConnector = withStyles({
  active: {
    "& $line": {
      borderColor: "#007ae7",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#007ae7",
    },
  },
  line: {
    borderTop: "3px dashed rgba(0, 0, 0, 0.54)",
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    width: 25,
    height: 25,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
  },
  active: {
    color: "#007ae7",
  },
  completed: {
    color: "#007ae7",
  },
}));

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CategoryOutlinedIcon fontSize="small" />,
    2: <ApartmentOutlinedIcon fontSize="small" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {completed ? (
        <CheckCircleOutlineOutlinedIcon color="primary" fontSize="small" />
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 70,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const SubStepperBar2 = (props) => {
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(props.step);
  const { t } = useTranslation("Translation");
  const history = useHistory();


  // const steps = [t("subStepperSection2.step1"), t("subStepperSection2.step2")];

  // // const handleNext = () => {
  // //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // // };

  // // const handleBack = () => {
  // //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // // };

  // // const handleReset = () => {
  // //   setActiveStep(0);
  // // };

  const stepValue = useSelector((state) => state.stepper.sub2ActiveStep);

  // const subStepper2 = useSelector(
  //   (state) => state.stepper.superStepper[1].subStepper
  // );

  // const dispatch = useDispatch();

  const stepperData = useSelector((state) => state.stepper.stepperData);

  const [stepperList, setStepperList] = useState([]);

  // useEffect(() => {
  //   dispatch(getStepperDetails());
  // }, [dispatch]);


  // const subStepperBar2 = [
  //   {
  //   value: "step1",
  //   label: t("subStepperSection2.step1"),
  //   page: ("/category-details")
  //   },
  //   {
  //   value: "step2",
  //   label: t("subStepperSection2.step2"),
  //   page: ("/select-projects")
  // },
  // ]


  useEffect(() => {
    setStepperList([]);
    let modifiedStpprList = [];
    if (stepperData.superStepper) {
      // console.log("push>>>>>>", stepperData.superStepper[2].subStepper)

      for (let y = 0; y < stepperData.superStepper[1].subStepper.length; y++) {
        const element = stepperData.superStepper[1].subStepper[y];
        var new_obj = {};
        if (element.description == "Category Details") {
          new_obj = {
            ...element,
            pageName: t("subStepperSection2.step1"),
            page: "/category-details"
          };
        } else {
          new_obj = {
            ...element,
            pageName: t("subStepperSection2.step2"),
            page: "/select-projects"
          };
        }
        modifiedStpprList.push(new_obj);
      }
      setStepperList(modifiedStpprList);
    }
  }, [stepperData]);

  return (
    <div className={classes.root}>
      <Paper elevation={0} style={{ backgroundColor: "#F2F9FF" }}>
        <Container maxWidth="xs">
          {/* <Stepper
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            style={{ backgroundColor: "transparent" }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper> */}
          <Stepper
            activeStep={stepValue}
            connector={<ColorlibConnector />}
            style={{ backgroundColor: "transparent" }}
          >
            {stepperList.map((item, index) => {
              const stepProps = {};
              stepProps.completed = item.completed;
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel style={{cursor: "pointer"}} onClick={() => history.push(item.page)} StepIconComponent={ColorlibStepIcon}>
                    <span>{item.pageName}</span>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Container>
      </Paper>
    </div>
  );
};

export default SubStepperBar2;
