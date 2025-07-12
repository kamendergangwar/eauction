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
import { useHistory, useLocation } from "react-router-dom";
import { AddressDetailsIcon, ApplicationEditIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import Image from "../../../../assets/Profile.jpg";

const AddressDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const [addressData, setAddressData] = React.useState("");
  const currentPathName = useLocation().pathname;
  const history = useHistory();

   useEffect(() => {
    setAddressData(applicantData[0]);
  }, [applicantData]); 

  const goToDetail = () =>{
    history.push("/personal-details");
  }	

  return (
    <Box className={classes.detailBoxContainer}>
      <Box >
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<AddressDetailsIcon fontSize="large" />}
              title={t("addressDetails.title")}
            />
          </Grid>
          <Grid item md="auto" xs={12}>
            {/* {currentPathName=="/application-details" && (<Button color="primary" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => goToDetail()}>{t("addressDetails.editButtonText")}</Button>)}	 */}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        <Grid container className={classes.dataRow} justifyContent="space-between">
          <Grid item md={8} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("addressDetails.formControl.addressLabel")}</Typography>
            {/* E1/38/b7 Aaryan Apt. Sec - 8, Vashi West. 400706 Navi Mumbai. */}
            <Typography className={classes.dataValView}>{`${addressData?.PresentHouse ? (addressData?.PresentHouse):("")} ${addressData?.PresentStreet ? (addressData?.PresentStreet):("")}`}, {addressData?.PresentCity || '--'}, {addressData?.PresentState || '--'}</Typography>
          </Grid>
          <Grid item md={2} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("addressDetails.formControl.mobileNumberLabel")}</Typography>
            <Typography className={classes.dataValView}>{addressData?.MobileNo || '--'}</Typography>
          </Grid>
          {/* <Grid item md={3} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("addressDetails.formControl.cityLabel")}</Typography>
            <Typography className={classes.dataValView}>{addressData?.PresentCity || '--'}</Typography>
          </Grid>
          <Grid item md={3} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("addressDetails.formControl.stateLabel")}</Typography>
            <Typography className={classes.dataValView}>{addressData?.PresentState || '--'}</Typography>
          </Grid> */}
        </Grid>
        {/* <Grid container>
          <Grid item md={4} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("addressDetails.formControl.districtLabel")}</Typography>
            <Typography className={classes.dataValView}>{addressData?.PresentDistrict || '--'}</Typography>
          </Grid>
          <Grid item md={4} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("addressDetails.formControl.stateLabel")}</Typography>
            <Typography className={classes.dataValView}>{addressData?.PresentState || '--'}</Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography className={classes.dataLabel}>{t("addressDetails.formControl.postalCodeLabel")}</Typography>
            <Typography className={classes.dataValView}>{addressData?.PresentPincode || '--'}</Typography>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};

export default withWidth()(AddressDetails);
