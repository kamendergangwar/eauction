import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import MobileStepperBg from "../../../assets/mobileStepperBg.jpg";

const styles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${MobileStepperBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "50%",
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  progressBoxCont: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  innerBox: {
    color: "#072AC8",
    fontSize: "0.9rem"
  },
}));

function CircularProgressWithLabel(props) {
  const classes = styles();
  return (
    <Box
      className={classes.container}
    >
      {/* <CircularProgress
        variant="determinate"
        value={props.value * 16}
        color="inherit"
      /> */}
      <Box className={classes.progressBoxCont}>
        <Box className={classes.innerBox}>
          <strong>{props.value}</strong>/{props.total}
        </Box>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function MobileStepperAfterLogin(props) {
  const { stepperList } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progCount = 0;
    for (let i = 0; i < stepperList.length; i++) {
      const element = stepperList[i];
      if (element.status === "completed") {
        progCount++;
      }
    }
    setProgress(progCount);
  }, [stepperList]);

  return <CircularProgressWithLabel value={progress} total={stepperList.length} />;
}
