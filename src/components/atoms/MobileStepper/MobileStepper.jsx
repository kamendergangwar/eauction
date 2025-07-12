import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  container: {
    color: "#FFFFFF",
    borderRadius: 50,
    border: "1px solid #FFFFFF",
  },
  innerBox: {
    color: "#FFFFFF",
    borderRadius: 50,
    border: "1px solid #FFFFFF",
    width: "80%",
    height: "80%",
    textAlign: "center",
  },
}));

function CircularProgressWithLabel(props) {
  const classes = styles();
  return (
    <Box
      position="relative"
      display="inline-flex"
      className={classes.container}
    >
      <CircularProgress
        variant="determinate"
        color="inherit"
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box pt={0.5} className={classes.innerBox}>
          <strong>{props.count}</strong>/{props.total}
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

export default function CircularStatic(props) {
  const { stepperList } = props;
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cnt_nmbr = 0;
    for (let i = 0; i < stepperList.length; i++) {
      const element = stepperList[i];
      if (element.status == "completed") {
        cnt_nmbr++;
      }
    }
    setCount(cnt_nmbr);
  }, [stepperList]);

  useEffect(() => {
    if (count > 0) {
      let percentage = parseInt(((100 * (count + 1)) / stepperList.length).toFixed(0));
      setProgress(percentage);
    }
  }, [count]);

  return <CircularProgressWithLabel value={progress} count={count} total={stepperList.length} />;
}
