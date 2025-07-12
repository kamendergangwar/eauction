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

function NocUploadLoading() {
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
    <Grid container spacing={3} style={{padding:'6px'}}>
      <Grid item md={2}>
          <img className={classes.iconStyle} style={{minHeight:0,minWidth:0, width:"100%", maxHeight:'53px'}} src={LoadingUpload} alt="Loading" />
      </Grid>
      <Grid item md='auto' style={{alignSelf:"center",textAlign:"left"}}>
        <Typography
          variant="subtitle2"
          className={classes.valText}
          color="primary"
        >
          {`Uploading... ${counter}%`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NocUploadLoading;
