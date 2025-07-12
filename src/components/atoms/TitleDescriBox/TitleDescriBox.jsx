import React from "react";
import Typography from "@material-ui/core/Typography";
import { titleDescriBoxStyles } from "./TitleDescriBox.styles";

const TitleDescriBox = (props) => {
  const { title, description, brkTxt } = props;
  const classes = titleDescriBoxStyles();
  return (
    <div className={classes.titleContainer}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        {title}
      </Typography>
      {description &&
        <Typography variant="subtitle1" className={classes.subtitle}>
          {description} {brkTxt && <><br />{brkTxt}</>}
        </Typography>
      }
    </div>
  );
};

export default TitleDescriBox;
