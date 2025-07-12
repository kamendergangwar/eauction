import React from "react";
import Typography from "@material-ui/core/Typography";
import { permanentAddressStyles } from "./PermanentAddress.styles";

const PermanentAddress = () => {
  const classes = permanentAddressStyles();
  return (
    <div className={classes.box}>
      <Typography variant="h6" gutterBottom>
        Permanent Address
      </Typography>
      <Typography variant="body2" gutterBottom>
        G88, Vigneshwaram,
        <br /> Opp to Tukaram Patil Gate,
        <br /> Block G, Sector 12,
        <br /> Kharghar, <br />
        Mumbai, Maharashtra 410210
      </Typography>
    </div>
  );
};

export default PermanentAddress;
