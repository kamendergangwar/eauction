import React from "react";
import { Trans } from "react-i18next";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const FormMandatoryText = () => {
  return (
    <Box paddingBottom={2}>
      <Typography variant="body2" gutterBottom color="textSecondary">
        <Trans i18nKey="PersonalDetailsPageTrans:description">
          Fill in the details carefully. The inputs marked in ‘
          <span style={{ color: "#f93d5c" }}>*</span>’ is mandatory input.
        </Trans>
      </Typography>
    </Box>
  );
};

export default FormMandatoryText;
