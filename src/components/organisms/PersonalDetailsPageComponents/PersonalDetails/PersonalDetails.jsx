import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTranslation, Trans } from "react-i18next";
import { personalDetailsStyles } from "./PersonalDetails.styles";
import { useSelector, useDispatch } from "react-redux";
import { applicationOverview, myProfileSelector } from "../../../../redux/features/myProfile/MyProfileSlice";

const PersonalDetails = () => {
  const classes = personalDetailsStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const dispatch = useDispatch();
  const { applicationMyProfile, isSuccessMyProfile } = useSelector(myProfileSelector);

  return (
    <Grid container spacing={3} style={{ marginTop: 5, marginBottom: 5 }}>
      <Grid item xs={12} sm={3}>
        <Typography className={classes.label} variant="body2" gutterBottom>
          {t(
            "applicatntDetailsForm.formControl.applicantDetails.applicantLabel"
          )}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Rakesh Kumar Singh
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography className={classes.label} variant="body2" gutterBottom>
          {t("applicatntDetailsForm.formControl.fatherDetails.fatherInfoLabel")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Ramesh Kumar Singh
        </Typography>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Typography className={classes.label} variant="body2" gutterBottom>
          {t("applicatntDetailsForm.formControl.otherInfo.gender.genderLabel")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Male
        </Typography>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Typography className={classes.label} variant="body2" gutterBottom>
          {t("applicatntDetailsForm.formControl.otherInfo.dob")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          28-04-1992
        </Typography>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Typography className={classes.label} variant="body2" gutterBottom>
          {t(
            "applicatntDetailsForm.formControl.otherInfo.maritalStatus.maritalStatusLabel"
          )}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Single
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PersonalDetails;
