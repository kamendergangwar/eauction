import React, { useEffect, useState, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";
import { PaymentSecCardCardStyles } from "./PaymentSecCard.styles";

const PaymentSecCard = (props) => {
  const { width, children } = props;
  const classes = PaymentSecCardCardStyles();
  const [triangleArr, setTriangleArr] = useState([]);
  const rootElementRef = useRef();

  /* useEffect(() => {
    window.addEventListener('resize', updateTriangle);
    updateTriangle();
  }, []);

  const updateTriangle = () => {
    const arrElements = [];
    var totalWidth = rootElementRef.current.offsetWidth;
    const loopLength = (totalWidth / 22).toFixed(0);
    for (let i = 0; i < loopLength; i++) {
      arrElements.push(i);
    }
    setTriangleArr(arrElements);
  }; */

  return (
    <Paper className={classes.cardRoot} ref={rootElementRef}>
      {children}

      <Box className={classes.triangleCont}>
        <Box className={classes.triangle}></Box>
        {/* {triangleArr.map((o, i) => (
          <Box key={i} className={classes.triangle}></Box>
        ))} */}
      </Box>
    </Paper>
  );
};

export default withWidth()(PaymentSecCard);
