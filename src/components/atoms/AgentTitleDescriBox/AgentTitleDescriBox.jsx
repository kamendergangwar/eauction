import React from "react";
import Typography from "@material-ui/core/Typography";
import { agentTitleDescriBoxStyles } from "./AgentTitleDescriBox.styles";

const AgentTitleDescriBox = (props) => {
  const { title, description, brkTxt } = props;
  const classes = agentTitleDescriBoxStyles();
  return (
    <div className={classes.titleContainer}>
      <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {description}
      </Typography>
    </div>
  );
};

export default AgentTitleDescriBox;
