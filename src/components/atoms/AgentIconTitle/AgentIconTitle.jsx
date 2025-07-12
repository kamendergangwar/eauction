import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const AgentIconTitle = (props) => {
  const { icon, title, titleVariant } = props;

  return (
    <Box display="flex" alignItems="center" marginY={1}>
      <Box marginRight={1}>{icon}</Box>
      <Box>
        <Typography variant={titleVariant === undefined ? "h6" : titleVariant}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default AgentIconTitle;
