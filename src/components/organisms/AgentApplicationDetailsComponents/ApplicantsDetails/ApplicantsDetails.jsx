import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  IDIcon, PhotoIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { AppDetailsViewStyles } from "../AppDetailsView/AppDetailsView.styles";

const ApplicantsDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("AgentAppDetailsViewPageTrans");
  const classes = AppDetailsViewStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [marritalStatus, setMarritalStatus] = React.useState("");
  const history = useHistory();

  useEffect(() => {
    var fullName = "--";
    if (applicantData.FirstName || applicantData.MiddleName || applicantData.LastName) {
      fullName = "";
    }
    if (applicantData.FirstName) {
      fullName = applicantData.FirstName + " ";
    }
    if (applicantData.MiddleName) {
      fullName += applicantData.MiddleName + " ";
    }
    if (applicantData.LastName) {
      fullName += applicantData.LastName;
    }
    setApplicantsFullName(fullName);

    if (applicantData.Gender) {
      if (applicantData.Gender == "1") {
        setGender("Male");
      } else {
        setGender("Female");
      }
    }

    switch (applicantData.MarritalStatus) {
      case "1": setMarritalStatus("Single");
        break;
      case "2": setMarritalStatus("Married");
        break;
      case "3": setMarritalStatus("Divorced");
        break;
      case "4": setMarritalStatus("Widow");
        break;
      case "5": setMarritalStatus("Widower");
        break;
    }
  }, [applicantData]);

  return (
    <Box className={classes.secContainer}>
      <Grid container alignItems="center">
        <Grid item>
          <AgentIconTitle
            icon={<PhotoIcon fontSize="large" />}
            title={t("applicatntProfilePage.applicantDetail.title")}
          />
        </Grid>
        <Grid item style={{ paddingLeft: 15 }}>
          <Button
            startIcon={<EditOutlinedIcon />}
            color="primary"
            component="span"
            style={{ fontSize: 12 }}
            onClick={() => history.push("/personal-details")}
          >
            {t("applicatntProfilePage.applicantDetail.editButtonText")}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "15px" }}>
        <Grid item md={4} xs={12}>
          <Typography
            gutterBottom
            className={classes.grayscaleLabel}
          >
            {t("applicatntProfilePage.applicantDetail.formControl.aadhaarNumberLabel")}
          </Typography>
          <Typography>{applicantData.AadharNo || "--"}</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            gutterBottom
            className={classes.grayscaleLabel}
          >
            {t("applicatntProfilePage.applicantDetail.formControl.panNumberLabel")}
          </Typography>
          <Typography>{applicantData.PANNo || "--"}</Typography>
        </Grid>
      </Grid>
      <Box borderTop={1} borderColor="grey.400" marginY={2} />
      <Typography variant="h6" style={{ marginBottom: 20 }}>{t("applicatntProfilePage.personalDetail.title")}</Typography>
      <Grid container>
        <Grid item>
          <img className={classes.profilePhoto} src={applicantData.ImagePath ? applicantData.ImagePath : "https://mass-dev-documents.s3.ap-south-1.amazonaws.com/lottery_132591_1625461229_profile.png"} alt="Profile Img" />
        </Grid>
        <Grid item md xs={12}>
          <Box padding={1} paddingLeft={2} md={{ paddingLeft: 5 }}>
            <Grid container>
              <Grid item md={4} xs={6}>
                <Box marginBottom={2}>
                  <Typography
                    variant="subtitle1"
                    className={classes.infoLabel}
                  >
                    {t("applicatntProfilePage.personalDetail.formControl.applicantNameLabel")}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{applicantsFullName}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    className={classes.infoLabel}
                  >
                    {t("applicatntProfilePage.personalDetail.formControl.fatherNameLabel")}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{applicantData.FatherName || "--"}</Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={6}>
                <Box marginBottom={2}>
                  <Typography
                    variant="subtitle1"
                    className={classes.infoLabel}
                  >
                    {t("applicatntProfilePage.personalDetail.formControl.genderLabel")}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{gender || "--"}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    className={classes.infoLabel}
                  >
                    {t("applicatntProfilePage.personalDetail.formControl.maritalStatusLable")}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{marritalStatus || "--"}</Typography>
                </Box>
              </Grid>
              <Grid item md={4} xs={6}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    className={classes.infoLabel}
                  >
                    {t("applicatntProfilePage.personalDetail.formControl.dobLabel")}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>
                    {(applicantData.DOB && applicantData.DOB != "0000-00-00") ? moment(applicantData.DOB).format("DD MMM, YYYY") : "--"}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withWidth()(ApplicantsDetails);
