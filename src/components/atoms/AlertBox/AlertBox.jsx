import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBox = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiAlert {...props} />
    </div>
  );
};

export default AlertBox;
