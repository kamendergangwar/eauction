import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import { useHistory } from "react-router-dom";
import {
  AccomodationIcon, UploadFileIcon, ContactIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { AppDetailsViewStyles } from "../AppDetailsView/AppDetailsView.styles";

const ContactInformation = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("AgentAppDetailsViewPageTrans");
  const classes = AppDetailsViewStyles();
  const [permanentAddress, setPermanentAddress] = React.useState("");
  const [communicationAddress, setCommunicationAddress] = React.useState("");
  const history = useHistory();

  useEffect(() => {
    var prmnt_add = "";
    var house = (applicantData.House ? applicantData.House : "--") + ", ";
    var area = (applicantData.Area ? applicantData.Area : "--") + ", ";
    var landmark = (applicantData.Landmark ? applicantData.Landmark : "--") + ", ";
    var street = (applicantData.Street ? applicantData.Street : "--") + ", ";
    var city = (applicantData.City ? applicantData.City : "--") + ", ";
    var district = (applicantData.District ? applicantData.District : "--") + ", ";
    var state = (applicantData.State ? applicantData.State : "--") + ", ";
    var pincode = (applicantData.Pincode ? applicantData.Pincode : "--");
    var permanent_address = prmnt_add.concat(area, house, landmark, street, city, district, state, pincode);
    setPermanentAddress(permanent_address);
    if (applicantData.IsSamePermanentAddress == "1") {
      setCommunicationAddress(permanent_address);
    } else {
      var cmmctn_add = "";
      var house = (applicantData.PresentHouse ? applicantData.PresentHouse : "--") + ", ";
      var area = (applicantData.PresentArea ? applicantData.PresentArea : "--") + ", ";
      var landmark = (applicantData.PresentLandmark ? applicantData.PresentLandmark : "--") + ", ";
      var street = (applicantData.PresentStreet ? applicantData.PresentStreet : "--") + ", ";
      var city = (applicantData.PresentCity ? applicantData.PresentCity : "--") + ", ";
      var district = (applicantData.PresentDistrict ? applicantData.PresentDistrict : "--") + ", ";
      var state = (applicantData.PresentState ? applicantData.PresentState : "--") + ", ";
      var pincode = (applicantData.PresentPincode ? applicantData.PresentPincode : "--");
      var communication_address = cmmctn_add.concat(area, house, landmark, street, city, district, state, pincode);
      setCommunicationAddress(communication_address);
    }
  }, [applicantData]);

  return (
    <Box className={classes.secContainer}>
      <Grid container alignItems="center">
        <Grid item>
          <AgentIconTitle
            icon={<ContactIcon fontSize="large" />}
            title={t("applicatntProfilePage.contactInformation.title")}
          />
        </Grid>
        <Grid item style={{ paddingLeft: 15 }}>
          <Button
            startIcon={<EditOutlinedIcon />}
            color="primary"
            component="span"
            style={{ fontSize: 12 }}
            onClick={() => history.push("/contact-details")}
          >
            {t("applicatntProfilePage.contactInformation.editButtonText")}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "15px" }}>
        <Grid item md={4} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.contactInformation.formControl.mobileNumberLabel")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{applicantData.MobileNo || "--"}</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.contactInformation.formControl.whatsappLabel")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{applicantData.WhatsappNo || "--"}</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.contactInformation.formControl.emailLabel")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{applicantData.EmailId || "--"}</Typography>
        </Grid>
      </Grid>

      <Box borderTop={1} borderColor="grey.400" marginY={2} />
      <AgentIconTitle
        icon={<AccomodationIcon fontSize="large" />}
        title={t("applicatntProfilePage.accomodationDetal.title")}
      />
      <Grid container spacing={3} style={{ marginTop: "15px" }}>
        <Grid item md={4} xs={12}>
          <Typography variant="subtitle1" className={classes.infoLabel}>
            {t("applicatntProfilePage.accomodationDetal.formControl.permanentAddressLabel")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{permanentAddress}</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="subtitle1" className={classes.infoLabel}>
            {t("applicatntProfilePage.accomodationDetal.formControl.communicationAddressLabel")}
          </Typography>
          <Typography variant="subtitle1"
            color="textSecondary" className={classes.infoValueTxt}>{communicationAddress}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withWidth()(ContactInformation);
