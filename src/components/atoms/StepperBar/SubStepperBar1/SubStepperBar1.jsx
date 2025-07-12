import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import RecentActorsOutlinedIcon from "@material-ui/icons/RecentActorsOutlined";
import AddLocationOutlinedIcon from "@material-ui/icons/AddLocationOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import WcIcon from "@material-ui/icons/Wc";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
    1: <RecentActorsOutlinedIcon fontSize="small" />,
    2: <AddLocationOutlinedIcon fontSize="small" />,
    3: <WcIcon fontSize="small" />,
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
    padding: theme.spacing(2)
  },
  sectionTitle: {
    color: "#00437E"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const SubStepperBar1 = (props) => {

  const { t } = useTranslation("Translation");
  const history = useHistory();

  const classes = useStyles();

  const stepValue = useSelector((state) => state.stepper.sub1ActiveStep);

  const stepperData = useSelector((state) => state.stepper.stepperData);

  const [stepperList, setStepperList] = useState([]);


  // const subStepperBar1 = [
  //   {
  //     value: "step1",
  //     label: t("subStepperSection1.step1"),
  //     page: ("/personal-details")
  //   },
  //   {
  //     value: "step2",
  //     label: t("subStepperSection1.step2"),
  //     page: ("/contact-details")
  //   },
  //   {
  //     value: "step3",
  //     label: t("subStepperSection1.step3"),
  //     page: ("/family-details")
  //   },
  // ]


  useEffect(() => {
    setStepperList([]);
    let modifiedStpprList = [];
    if (stepperData.superStepper) {
      // console.log("push>>>>>>", stepperData.superStepper[2].subStepper)

      for (let y = 0; y < stepperData.superStepper[0].subStepper.length; y++) {
        const element = stepperData.superStepper[0].subStepper[y];
        var new_obj = {};
        if (element.description == "Basic Details") {
          new_obj = {
            ...element,
            pageName: t("subStepperSection1.step1"),
            page: "/personal-details"
          };
        } else if (element.description == "Address Details") {
          new_obj = {
            ...element,
            pageName: t("subStepperSection1.step2"),
            page: "/contact-details"
          };
        } else {
          new_obj = {
            ...element,
            pageName: t("subStepperSection1.step3"),
            page: "/family-details"
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
        <Container maxWidth="sm">
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
                  <StepLabel style={{ cursor: "pointer" }} onClick={() => history.push(item.page)} StepIconComponent={ColorlibStepIcon}>
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

export default SubStepperBar1;
