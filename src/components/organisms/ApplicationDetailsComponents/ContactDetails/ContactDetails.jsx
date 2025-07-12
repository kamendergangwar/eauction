import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory, useLocation  } from "react-router-dom";
import { ContactDetailsIcon, ApplicationEditIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import Image from "../../../../assets/Profile.jpg";

const ContactDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [marritalStatus, setMarritalStatus] = React.useState("");
  const [contactDetail, setContactDetail] = React.useState("");
  const currentPathName = useLocation().pathname;
  const history = useHistory();

  useEffect(() => {
    setContactDetail(applicantData[0]);
  }, [applicantData]);

  const goToDetail = () =>{
    history.push("/personal-details");
  }

  return (
    <Box className={classes.detailBoxContainer}>
      <Box>
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<ContactDetailsIcon fontSize="large" />}
              title={t("contactDetails.title")}
            />
          </Grid>
          <Grid item md="auto" xs={12}>
          {/* {currentPathName=="/application-details" && (<Button color="primary"  className={classes.editIconBtn} startIcon={<ApplicationEditIcon />}  onClick={() => goToDetail()}>{t("contactDetails.editButtonText")}</Button>)} */}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
      {/* <Grid container className={classes.dataRow}>
          <Grid item md={4} xs={12} className={classes.dataResCell}> */}
        <Grid container className={classes.dataRow}>
          <Grid item md={3} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("contactDetails.formControl.mobileNoLabel")}</Typography>
            <Typography className={classes.dataValView}>{contactDetail?.MobileNo || "--"}</Typography>
          </Grid>
          <Grid item md={3} xs={12}>
            <Typography className={classes.dataLabel}>{t("contactDetails.formControl.whatsAppNoLabel")}</Typography>
            <Typography className={classes.dataValView}>{contactDetail?.WhatsappNo || "--"}</Typography>
          </Grid>
          <Grid item md={6} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("contactDetails.formControl.emailAddLabel")}</Typography>
            <Typography className={`${classes.dataValView} + emailLabel`}>{contactDetail?.EmailId || "--"}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default withWidth()(ContactDetails);
