import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(3),
    boxShadow: "none",
  },
}));

const OutlinedCard = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      {children}
    </Card>
  );
};

export default OutlinedCard;
