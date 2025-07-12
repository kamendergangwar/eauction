import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import ImageDialogBox from "../../../molecules/DialogBoxes/ImageDialogBox/ImageDialogBox";
import { PersonalDetailsTitleIcon, ApplicationEditIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
// import Image from "../../../../assets/Profile.jpg";
import myprofileimage from "../../../../assets/Profile-Vector.png";

import {
  getMyProfile,
  myProfileSelector,
} from "../../../../redux/features/myProfile/MyProfileSlice";

const ApplicantPersonalDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const dispatch = useDispatch();
  const classes = ApplicationDetailsViewStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  // const [marritalStatus, setMarritalStatus] = React.useState("");
  const [personalDob, setPersonalDob] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const currentPathName = useLocation().pathname;
  // const [personalData, setPersonalData] = React.useState([]);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [myProfileData, setMyProfileData] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");
  const { applicationMyProfile, isSuccessMyProfile, isFetchingMyProfile } =
    useSelector(myProfileSelector);
  const history = useHistory();

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessMyProfile) {
      setProfileUrl(
        "https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
      );
      setMyProfileData(applicationMyProfile);
    }
  }, [applicationMyProfile, isSuccessMyProfile]);

  useEffect(() => {
    // var fullName = "--";
    // if (applicantData?.FirstName || applicantData?.MiddleName || applicantData?.LastName) {
    //   fullName = "";
    // }
    // setPersonalData(applicantData[0]);
    if (applicantData[0]?.FirstName) {
      setApplicantsFullName(applicantData[0].FirstName);
    }
    // if (personalData?.MiddleName) {
    //   fullName += personalData.MiddleName + " ";
    // }
    // if (personalData?.LastName) {
    //   fullName += personalData.LastName;
    // }
    // if (applicantData[0]?.Gender) {
    //   if (applicantData[0]?.Gender == "1") {
    //     setGender("Male");
    //   } else if (applicantData[0]?.Gender == "2") {
    //     setGender("Female");
    //   } else {
    //     setGender("Other");
    //   }
    // }


    // switch (personalData?.MarritalStatus) {
    //   case "1": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.single"));
    //     break;
    //   case "2": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.married"));
    //     break;
    //   case "3": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.divorced"));
    //     break;
    //   case "4": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.widow"));
    //     break;
    //   case "5": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.widower"));
    //     break;
    // }



    // if (applicantData[0]) {
    //   let MarritalStatusString;
    //   if (applicantData[0].MarritalStatus == 0) {
    //     MarritalStatusString = "Single";
    //   } else if (applicantData[0].MarritalStatus == 1) {
    //     MarritalStatusString = "Married";
    //   } else if (applicantData[0].MarritalStatus == 2) {
    //     MarritalStatusString = "Other";
    //   }

    //   setMarritalStatus(MarritalStatusString)

    // }


    if (applicantData[0]?.DOB && applicantData[0]?.DOB != "0000-00-00") {
      let dates = applicantData[0].DOB.split("/");
      let dobFormated = moment(new Date(dates[1] + " " + dates[0] + " " + dates[2])).format("DD MMM YYYY")
      setPersonalDob(dobFormated);
    }

    if (applicantData[0]?.ImagePath) {
      setProfileImage(applicantData[0]?.ImagePath);
    } else {
      setProfileImage("https://freepikpsd.com/file/2019/10/default-profile-picture-png-1-Transparent-Images.png");
    }
  }, [applicantData]);


  const goToDetail = () => {
    history.push("/personal-details");
  }

  const handleClickOpen = () => {
    setOpenPhotoDialog(true);
  };

  const handleClosePhotoDialog = (value) => {

    dispatch(getMyProfile());
    console.log("==================================== handleClosePhotoDialog");
    // console.log(value);
    // console.log("====================================");
    setOpenPhotoDialog(false);
    // setImg({
    //   src: value,
    //   alt: "Crop Image",
    // });
  };

  return (
    <>
    <Box className={`${classes.detailBoxContainer} applicantPersonal`}>
      <Box className={`applicantPersonal`}>
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<PersonalDetailsTitleIcon fontSize="large" />}
              title={t("applicantDetails.title")}
            />
          </Grid>
          <Grid item md="auto" xs={12}>
            {/* {currentPathName == "/application-details" && (<Button color="primary" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => goToDetail()}>{t("applicantDetails.editButtonText")}</Button>)} */}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        <Grid container>
          <Grid item md xs={12}>
            <Box>
              <Grid container className={classes.dataRow}>
                <Grid item md={3} xs={12}>
                  <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.fullNameLabel")}</Typography>
                  <Typography className={classes.dataValView}>{applicantsFullName || '--'}</Typography>
                </Grid>
                <Hidden smDown>
                  <Grid item md={3}>
                    <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.maritalStatusLabel")}</Typography>
                    <Typography className={classes.dataValView}>{applicantData[0]?.MarritalStatus || '--'}</Typography>
                  </Grid>
                </Hidden>
                <Hidden smDown>
                  <Grid item md={3}>
                    <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.genderLabel")}</Typography>
                    <Typography className={classes.dataValView}>{applicantData[0]?.Gender || '--'}</Typography>
                  </Grid>
                </Hidden>
                <Grid item md={3} xs={12}>
                  <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.dateOfBirthLabel")}</Typography>
                  <Typography className={classes.dataValView}>{personalDob || '--'}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openPhotoDialog && (
        <ImageDialogBox
          selectedValue={"data:image;base64," + myProfileData.ImageData?.ImageString}
          open={openPhotoDialog}
          onClose={handleClosePhotoDialog}
        />
      )}
    </Box>
    {/* <Box className={`${classes.sectionCard} applicantPersonal`}>
      <Box className={`${classes.secCardHeader} applicantPersonal`}>
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<PersonalDetailsTitleIcon fontSize="large" />}
              title={t("applicantDetails.title")}
            />
          </Grid>
          <Grid item md="auto" xs={12}>
            {currentPathName == "/application-details" && (<Button color="primary" variant="outlined" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => goToDetail()}>{t("applicantDetails.editButtonText")}</Button>)}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        <Grid container>
          <Grid item md="auto" xs={12}>
            <Grid container alignItems="center">
              <Grid item>
                <CardMedia
                  className={classes.profileImgCover}
                  image={"data:image;base64," + myProfileData.ImageData?.ImageString}
                  title="Profile Cover" component="img"
                  referrerPolicy="no-referrer"
                />
                <Button
                  color="primary"
                  size="small"
                  style={{ marginTop: "8px" }}
                  onClick={handleClickOpen}
                  startIcon={<ApplicationEditIcon className="editIcon" />}
                >
                  {t("applicantDetails.editProfileButtonText")}
                </Button>
              </Grid>
              <Hidden mdUp>
                <Grid item className={classes.prsnlDtlsSideBox}>
                  <Box className={classes.dataRow}>
                    <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.maritalStatusLabel")}</Typography>
                    <Typography className={classes.dataValView}>{applicantData[0]?.MarritalStatus || '--'}</Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.genderLabel")}</Typography>
                    <Typography className={classes.dataValView}>{gender || '--'}</Typography>
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item md xs={12}>
            <Box className={classes.applicantDetailsBox}>
              <Grid container className={classes.dataRow}>
                <Grid item md={6} xs={12}>
                  <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.fullNameLabel")}</Typography>
                  <Typography className={classes.dataValView}>{applicantsFullName || '--'}</Typography>
                </Grid>
                <Hidden smDown>
                  <Grid item md={6}>
                    <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.maritalStatusLabel")}</Typography>
                    <Typography className={classes.dataValView}>{applicantData[0]?.MarritalStatus || '--'}</Typography>
                  </Grid>
                </Hidden>
              </Grid>
              <Grid container>
                <Hidden smDown>
                  <Grid item md={6}>
                    <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.genderLabel")}</Typography>
                    <Typography className={classes.dataValView}>{gender || '--'}</Typography>
                  </Grid>
                </Hidden>
                <Grid item md={6} xs={12}>
                  <Typography className={classes.dataLabel}>{t("applicantDetails.formControl.dateOfBirthLabel")}</Typography>
                  <Typography className={classes.dataValView}>{personalDob || '--'}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openPhotoDialog && (
        <ImageDialogBox
          selectedValue={"data:image;base64," + myProfileData.ImageData?.ImageString}
          open={openPhotoDialog}
          onClose={handleClosePhotoDialog}
        />
      )}
    </Box> */}
    </>
  );
};

export default withWidth()(ApplicantPersonalDetails);
