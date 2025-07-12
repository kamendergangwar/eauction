import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core/";
import LoadingUpload from "../.././../assets/LoadingUpload.gif";

const styles = makeStyles((theme) => ({
  iconStyle: { maxWidth: 200, maxHeight: 200 },
  valText: {
    fontWeight: "bold",
  },
}));

function UploadLoading() {
  const classes = styles();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timer = 0;
    const loadTime = setInterval(() => {
      timer += 1;
      // console.log(timer);
      setCounter(timer);
      if (timer >= 100) {
        clearInterval(loadTime);
      }
    }, 10);
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box textAlign="center" marginY={1}>
        {/* <img src={LoadingUpload} alt="loading" /> */}
        <img className={classes.iconStyle} src={LoadingUpload} alt="Loading" />
      </Box>
      <Box>
        <Typography
          variant="subtitle2"
          className={classes.valText}
          color="primary"
        >
          {`Uploading... ${counter}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default UploadLoading;
