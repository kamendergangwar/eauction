import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BackButton = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Box>
      <Button
        color="primary"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => history.goBack()}
      >
        {t("backButton")}
      </Button>
    </Box>
  );
};

export default BackButton;
