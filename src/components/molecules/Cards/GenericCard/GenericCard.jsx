import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { genericCardStyles } from "./GenericCard.styles";

const GenericCard = (props) => {
  const { children } = props;
  const classes = genericCardStyles();
  return (
    <Card>
      <CardContent className={classes.root}>{children}</CardContent>
    </Card>
  );
};

export default GenericCard;
