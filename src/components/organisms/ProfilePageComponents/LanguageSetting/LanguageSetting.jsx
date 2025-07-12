import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Loading from "../../../atoms/Loading/Loading";
import ProfileWrap from "../ProfileWrap/ProfileWrap";
import { LanguageSettingStyles } from "./LanguageSetting.style";
import {
  setDefaultLanguage,
  myProfileSelector,
} from "../../../../redux/features/myProfile/MyProfileSlice";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
];

function LanguageSetting(props) {
  const classes = LanguageSettingStyles();
  const { t } = useTranslation("ProfilePageTrans");
  const currentLanguage = (element) => localStorage.getItem("i18nextLng") ? element.code === localStorage.getItem("i18nextLng") : "mr";
  const [selectedIndex, setSelectedIndex] = useState(
    languages.findIndex(currentLanguage)
  );
  const dispatch = useDispatch();
  const { applicationLanguage, isSuccessLanguage, isFetchingLanguage } =
    useSelector(myProfileSelector);

  const handleOnLangChange = (event, index) => {
    i18n.changeLanguage(languages[index].code);
    setSelectedIndex(index);
  };
  const updateUserSetting = () => {
    let lan;
    if (selectedIndex == 0) {
      lan = "en"
    } else if (selectedIndex == 1) {
      lan = "hi"
    } else if (selectedIndex == 2) {
      lan = "mr"
    }
    dispatch(setDefaultLanguage(lan));
  }

  return (
    <ProfileWrap>
      {(isFetchingLanguage) && (
        <Loading isOpen={isFetchingLanguage} />
      )}
      <div className={classes.settingContainer}>
        <Box className={classes.pageHeader}>
          <Typography variant="h4" className={classes.pageTitle}>{t("languageSec.title")}</Typography>
          <Typography className={classes.pageSubTitle}>{t("languageSec.subTitle")}</Typography>
        </Box>

        <Box className={classes.langChangeSection}>
          <Grid container alignItems="center">
            <Grid item md xs={12}>
              <Typography variant="h4" className={classes.langSettingLabel}>{t("languageSec.langLabel")}</Typography>
            </Grid>
            <Grid item md="auto" xs={12}>
              <ToggleButtonGroup
                value={selectedIndex}
                exclusive
                onChange={handleOnLangChange}
                className={`${classes.langToggleBtnGroup}`}
              >
                {languages.map((item, index) => (
                  <ToggleButton
                    value={index}
                    key={item.code}
                  >{item.label}</ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.actionSection}>
          <Button color="primary" variant="contained" onClick={() => updateUserSetting()}>{t("languageSec.applySettingBtnText")}</Button>
        </Box>
      </div>
    </ProfileWrap>
  );
}

export default LanguageSetting;
