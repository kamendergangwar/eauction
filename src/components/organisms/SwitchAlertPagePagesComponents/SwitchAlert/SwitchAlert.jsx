import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { SwitchAlertStyles } from "./SwitchAlert.styles";
import MobileAppIcon from "../../../../assets/header/mobileAppIcon.png";

const ViewAllNotifications = () => {
  const classes = SwitchAlertStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const closePopUpPage = () => {
    sessionStorage.setItem("popupShownIs", true);
    history.goBack();
  };

  const openApp = () => {
    sessionStorage.setItem("popupShownIs", true);
    window.location.href = "https://install.appcenter.ms/orgs/mobisoft-infotech/apps/helioscart-android-dev/distribution_groups/helioscart_android_client";
  };

  return (
    <div className={classes.mainRoot}>
      <Box marginBottom={5}>
        <img src={MobileAppIcon} alt="Icon" className={classes.mobIcon} />
      </Box>
      <Box marginBottom={5}>
        <Typography variant="h4" className={classes.msgTextBox}>
          {t("Complete your Online registration on the CIDCO Housing App")}
        </Typography>
      </Box>
      <Box marginBottom={2.5}>
        <Button className={classes.actionBtn} color="primary" variant="contained" size="large" onClick={openApp}>Continue in app</Button>
      </Box>
      <Box>
        <Button className={classes.actionBtn} color="primary" size="large" onClick={closePopUpPage}>Continue in browser</Button>
      </Box>
    </div>
  );
};

export default ViewAllNotifications;
