import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import withWidth from "@material-ui/core/withWidth";
import { formCardStyles } from "./FormCard.styles";

const FormCard = (props) => {
  const { width, children, isApplicationDetails,type } = props;
  const classes = formCardStyles();
  return (
    <Paper elevation={width === "xs" ? 0 : 4} className={`${classes.root} ${isApplicationDetails ? "appDetails" : ""}`} style={{height: type=="selectProject" ? "auto" : "100%"}}>
      {children}
    </Paper>
  );
};

export default withWidth()(FormCard);
