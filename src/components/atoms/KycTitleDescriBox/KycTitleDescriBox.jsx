import React from "react";
import Typography from "@material-ui/core/Typography";
import { kycTitleDescriBoxStyles } from "./KycTitleDescriBox.style";
import { Grid, IconButton } from "@material-ui/core";
import { BlackBackArrowIcon, WhiteBackArrowIcon } from "../SvgIcons/SvgIcons";

function KycTitleDescriBox(props) {
  const { title, description, otpOn, onBack } = props;
  const classes = kycTitleDescriBoxStyles();
  return (
    <div className={classes.titleContainer} >
      {otpOn ? <Grid container style={{ gap: 50 }} alignItems="center">
        <IconButton style={{ marginBottom: 9 }} onClick={()=>onBack()}> <WhiteBackArrowIcon fontSize="small" /></IconButton>
        <Typography variant="h4" gutterBottom className={classes.title}>
          {title}
        </Typography>
      </Grid> :
        <Typography variant="h4" gutterBottom className={classes.title}>
          {title}
        </Typography>}
      {description && (
        <Typography variant="h5" className={classes.subtitle}>
          {description}
        </Typography>
      )}
    </div>
  );
}

export default KycTitleDescriBox;
