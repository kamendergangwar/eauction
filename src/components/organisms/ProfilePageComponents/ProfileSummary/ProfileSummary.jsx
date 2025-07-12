import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';
import Container from "@material-ui/core/Container";
import { useTranslation, Trans } from "react-i18next";
import Hidden from "@material-ui/core/Hidden";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Loading from "../../../atoms/Loading/Loading";
import Divider from "@material-ui/core/Divider";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProfileWrap from "../ProfileWrap/ProfileWrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { ProfileSummaryStyles } from "./ProfileSummary.style";
import myprofileimage from "../../../../assets/Profile-Vector.png";

import CameraIcon from "../../../../assets/CameraIcon.png";
import ImageDialogBox from "../../../molecules/DialogBoxes/ImageDialogBox/ImageDialogBox";
import {
  VerifiedSuccessIcon,
  ApplicationEditIcon,
  ApplicationDownloadIcon,
  DownloadIcon,
  DialogBackArrowIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import {
  getMyProfile,
  myProfileSelector,
} from "../../../../redux/features/myProfile/MyProfileSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../redux/features/preferences/PreferencesSlice";
import {
  fileUploadSelector,
  setImageUrl,
  clearImageUrl,
} from "../../../../redux/features/file/FileUploadSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import axios from "axios";
import { ApiEndPoint } from "../../../../utils/Common";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ApplicantPersonalDetails from "../../ApplicationDetailsComponents/ApplicantPersonalDetails/ApplicantPersonalDetails";
import ContactDetails from "../../ApplicationDetailsComponents/ContactDetails/ContactDetails";


function ProfileSummary(props) {
  const { width } = props;
  const classes = ProfileSummaryStyles();
  const { t } = useTranslation("ProfilePageTrans");
  const [myProfileData, setMyProfileData] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isFinalPayment, setIsFinalPayment] = useState(false);
  const ApiEndPointPdf = ApiEndPoint + "/Applicant/applicationOverviewPdf/";
  const { applicationMyProfile, isSuccessMyProfile, isFetchingMyProfile, isSuccessLanguage } =
    useSelector(myProfileSelector);
  const {
    isSuccessResGetPreferences
  } = useSelector(preferencesSelector);
  const { imageUrl } = useSelector(fileUploadSelector);
  const [open, setOpen] = React.useState(false);
  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  // const onCrop = () => {
  //   const imageElement: any = cropperRef?.current;
  //   const cropper: any = imageElement?.cropper;
  //   console.log(cropper.getCroppedCanvas().toDataURL());
  // };


  useEffect(() => {
    dispatch(getStepperDetails());
    dispatch(getMyProfile());
    // dispatch(getApplicantProgress());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach((item) => {
        if (item.StepId == "7") {
          item.Status == "completed"
            ? setIsPaymentDone(true)
            : setIsPaymentDone(false);
        }
      });
    }
  }, [isSuccessProgressResStepper]);

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
            if (item.applicantKycStepper[1].status != "completed") {
              pageUrl = "/verify-pancard";
            }
          }
        }

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }

      })
      history.push(pageUrl)
    }
  }, [isSuccessResStepper])

  useEffect(() => {
    if (isSuccessMyProfile) {
      setMyProfileData(applicationMyProfile);
    }
  }, [applicationMyProfile, isSuccessMyProfile]);

  useEffect(() => {
    if (isSuccessProgressResStepper && ApplicantStepperData?.superStepper?.length > 0) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "10") {
          item.Status == "completed" ? setIsFinalPayment(true) : setIsFinalPayment(false);
        }
      })
    }
  }, [isSuccessProgressResStepper, ApplicantStepperData])

  const checkSession = () => {
    dispatch(getPreferencesList());
  }

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      downloadPdf();
      dispatch(clearPreferencesState());
    }
  }, [isSuccessResGetPreferences])

  const downloadPdf = () => {
    setPdfLoading(true);
    let fileUrl = ApiEndPointPdf +
      localStorage.getItem("applicantId") +
      "?Lang=" +
      localStorage.getItem("i18nextLng") + "&isApplicationOverview=2&fcfs=1"
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((response) => response.blob()).then((blob) => {
      setPdfLoading(false);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      let today = new Date();
      const dateTime = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('YYYY-MM-DD-h:mm');
      link.download = `${localStorage.getItem("applicantId")} -${dateTime}`;
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
      setPdfLoading(false);
    });
  };

  const handleClickOpen = () => {
    // setOpen(true);
    setOpenPhotoDialog(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenPhotoDialog = () => {
    setOpenPhotoDialog(true);
  };

  const handleClosePhotoDialog = (value) => {
    dispatch(getMyProfile());
    // console.log("====================================");
    // console.log(value);
    // console.log("====================================");
    setOpenPhotoDialog(false);
    // setImg({
    //   src: value,
    //   alt: "Crop Image",
    // });
  };

  return (
    <ProfileWrap>
      {(isFetchingMyProfile || pdfLoading) && (
        <Loading isOpen={isFetchingMyProfile || pdfLoading} />
      )}
      <div className={classes.profileContainer}>
        <Box className={classes.myProfileHeader}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={9} md="auto">
              <Typography variant="h4" className={classes.pageTitle}>
                {t("PersonalDetails.title")}
              </Typography>
              <Typography className={classes.pageSubText}>
                {t("PersonalDetails.subTitle")}
              </Typography>
            </Grid>
            <Grid item xs={3} md="auto">
              {isFinalPayment && <Box textAlign="right">
                <Hidden smDown>
                  <Button
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={() => checkSession()}>
                    {t("PersonalDetails.DownloadBtn")}
                  </Button>
                </Hidden>
                <Hidden mdUp>
                  <IconButton color="primary"
                    onClick={() => checkSession()} style={{ backgroundColor: '#0063cc', textAlign: 'right' }}>
                    <ApplicationDownloadIcon />
                  </IconButton>
                </Hidden>
              </Box>}
            </Grid>
          </Grid>

          {/* <Grid container spacing={3}>
            <Grid item xs={4}>
              <Box className={classes.projCountViewCard}>
                <span className={classes.dotIndicator}></span>
                <Typography variant="h2" className="count">
                  {myProfileData.AppliedApplication}
                </Typography>
                <Typography className="cardTitle">{t("PersonalDetails.appliedLabel")}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.projCountViewCard}>
                <span className={`${classes.dotIndicator} saved`}></span>
                <Typography variant="h2" className="count">
                  {myProfileData.SavedApplication}
                </Typography>
                <Typography className="cardTitle">{t("PersonalDetails.savedLabel")}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.projCountViewCard}>
                <span className={`${classes.dotIndicator} total`}></span>
                <Typography variant="h2" className="count">
                  {myProfileData.TotalApplication}
                </Typography>
                <Typography className="cardTitle">{t("PersonalDetails.totalLabel")}</Typography>
              </Box>
            </Grid>
          </Grid> */}
        </Box>

        <Box className={classes.myProfileSec}>
          <Box spacing={3} className={classes.contentRow}>
            <Grid container alignItems="center">
              <Grid item >
                <Typography variant="h5" className={classes.pageTitle}>
                  {t("PersonalDetails.personalDetails.ApplicantIDTxt")} : {myProfileData.ApplicantId}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <span>
                    <VerifiedSuccessIcon className={classes.verifiedLogo} />
                  </span>
                  <div
                    className={
                      myProfileData?.KycStatus == "1"
                        ? classes.verified
                        : classes.notVerified
                    }
                  >
                    {t("PersonalDetails.personalDetails.KYCVerifiedlabel")}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={6}>
                <Box display="flex" className={classes.verifiedContent}>
                  {/* <Typography variant="h5" className={classes.headerTxt}>
                    {t("PersonalDetails.personalDetails.title")}
                  </Typography> */}

                </Box>
                {/* <Typography
                  variant="subtitle2"
                  className={classes.subheaderTxt}
                >
                  {t("PersonalDetails.personalDetails.subTitle")}
                </Typography> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container justify="flex-end" alignItems="center">
                  {!isPaymentDone && <Button
                    variant="outlined"
                    color="primary"
                    className={classes.editBtn}
                    onClick={() => history.push("/personal-details")}
                    startIcon={<ApplicationEditIcon className="editIcon" />}
                  >
                    {t("PersonalDetails.personalDetails.formControl.editBtnLabel")}
                  </Button>}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <Box className={classes.mediawrapper}>
            <Grid
              container
              spacing={3}
              justify="space-between"
              alignItems="center"
            >
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.profilePhotolabel")}
                </Typography>
                <Typography variant="subtitle1" className="mediaDec">
                  {t("PersonalDetails.personalDetails.profilesublabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className="avatarSection">
                  {/* <Badge
                    overlap="circular"
                    className={classes.customBadge}
                    badgeContent={<Box>
                      <Avatar src={CameraIcon} style={{
                        background: "#E0EAF5",
                        border: "2px solid #FFFFFF",
                        padding: "5px"
                      }}
                        onClick={handleClickOpen}
                      />
                    </Box>}
                  > */}
                    <Avatar src={
                      myProfileData.ImagePath
                    } className={classes.imagelarge}
                      // "data:image;base64," + myProfileData.ImageData?.ImageString
                    />
                  {/* </Badge>
                  <Button
                    color="primary"
                    size="small"
                    className={classes.editBtn}
                    onClick={handleClickOpen}
                    startIcon={<ApplicationEditIcon className="editIcon" />}
                  >
                    {t("PersonalDetails.personalDetails.editProfileButtonText")}
                  </Button> */}
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <Box className={classes.contentRow}>
            {/* <Grid container justify="space-between" alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.formControl.fullNameLabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.valueViewBox}>
                  <Typography variant="body1" className="valueView">
                    {myProfileData.FirstName} {myProfileData.MiddleName}{" "}
                    {myProfileData.LastName}
                  </Typography>
                </Box>
              </Grid>
            </Grid> */}
            <ApplicantPersonalDetails applicantData={[myProfileData]} />
          </Box>

          {/* <Divider /> */}
          <Box className={classes.contentRow}>
            {/* <Grid container justify="space-between" alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.formControl.mobileNumberLabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.valueViewBox}>
                  <Typography variant="body1" className="valueView">
                    {myProfileData.MobileNo}
                  </Typography>
                </Box>
              </Grid>
            </Grid> */}
            <ContactDetails applicantData={[myProfileData]} />
          </Box>

          {/* <Divider /> */}
          {/* <Box className={classes.contentRow}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.formControl.whatsAppNumberLabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.valueViewBox}>
                  <Typography variant="body1" className="valueView">
                    {myProfileData.WhatsappNo}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <Box className={classes.contentRow}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.formControl.emailLabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.valueViewBox}>
                  <Typography variant="body1" className="valueView">
                    {myProfileData.EmailId}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <Box className={classes.contentRow}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.formControl.maritalStatusLabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.valueViewBox}>
                  <Typography variant="body1" className="valueView">
                    {myProfileData.MarritalStatus}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <Box className={classes.contentRow}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.formControl.dateOfBirthLabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.valueViewBox}>
                  <Typography variant="body1" className="valueView">
                    {myProfileData.DOB}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <Box className={classes.contentRow}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography variant="body1" className="title">
                  {t("PersonalDetails.personalDetails.formControl.GenderLabel")}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.valueViewBox}>
                  <Typography variant="body1" className="valueView">
                    {myProfileData.Gender}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box> */}

          {myProfileData?.BankName &&
            <Box className={classes.contentRow}>
              <Grid
                container
                spacing={width === "xs" ? 1 : 4}
                alignItems="center"
              >
                <Grid item xs={12} sm={6}>
                  <Box display="flex" className={classes.verifiedContent}>
                    <Typography variant="h5" className={classes.headerTxt}>
                      {t("PersonalDetails.myBankDetails.title")}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    className={classes.subheaderTxt}
                  >
                    {t("PersonalDetails.myBankDetails.subTitle")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </Grid>
            </Box>
          }

          {myProfileData?.BankName &&
            <>
              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      {t("PersonalDetails.myBankDetails.formControl.bankNameLabel")}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData.BankName}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          }

          {myProfileData?.BankName &&
            <>
              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      {t("PersonalDetails.myBankDetails.formControl.branchNameLabel")}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData.BranchName || ' '}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          }

          {myProfileData?.BankName &&
            <>
              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      {t("PersonalDetails.myBankDetails.formControl.accountNumberLabel")}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData.AccountNo}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          }

          {myProfileData?.BankName &&
            <>
              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      {myProfileData.Micrno ? t("PersonalDetails.myBankDetails.formControl.MICRNoLabel") : t("PersonalDetails.myBankDetails.formControl.IFSCCodeLabel")}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData.Micrno || myProfileData.IFSCCode || '--'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          }

          {myProfileData?.CoApplicant && (
            <>
              <Box spacing={3} className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" className={classes.verifiedContent}>
                      <Typography variant="h5" className={classes.headerTxt}>
                        Co-Applicant Details
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <span>
                          <VerifiedSuccessIcon
                            className={classes.verifiedLogo}
                          />
                        </span>
                        <div
                          className={
                            myProfileData?.CoApplicant?.KycStatus == "1"
                              ? classes.verified
                              : classes.notVerified
                          }
                        >
                          KYC Verified
                        </div>
                      </Box>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      className={classes.subheaderTxt}
                    >
                      Update your Co-Applicant photo & personal details here.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container justify="flex-end" alignItems="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.editBtn}
                        startIcon={<ApplicationEditIcon className="editIcon" />}
                      >
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              <Divider />
              <Box className={classes.mediawrapper}>
                <Grid
                  container
                  spacing={3}
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      Profile Photo
                    </Typography>
                    <Typography variant="subtitle1" className="mediaDec">
                      This will be displayed on your Application
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box>
                      <Avatar
                        src={
                          myProfileData?.CoApplicant?.ImagePath ||
                          "../MyProfile-pic.jpg"
                        }
                        className={classes.imagelarge}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      Full Name
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData?.CoApplicant?.FirstName}{" "}
                        {myProfileData?.CoApplicant?.MiddleName}{" "}
                        {myProfileData?.CoApplicant?.LastName}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      Mobile Number
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData?.CoApplicant?.MobileNo}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      Email
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData?.CoApplicant?.EmailId}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      Marital Status
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData?.CoApplicant?.MarritalStatus}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      Date of Birth
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData?.CoApplicant?.DOB}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />
              <Box className={classes.contentRow}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item md={6} xs={12}>
                    <Typography variant="body1" className="title">
                      Gender
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={classes.valueViewBox}>
                      <Typography variant="body1" className="valueView">
                        {myProfileData?.CoApplicant?.Gender}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </div>

      <Dialog onClose={handleClose} aria-labelledby="upload-profile-picture" open={open} maxWidth='xs' className={classes.uploadProfileDiaog}>
        <DialogTitle id="upload-profile-picture" onClose={handleClose}>
          <Box className={classes.dialogHeader}>
            <Grid container justify="space-between">
              <Grid item xs={5}>
                {/* <IconButton aria-label="close" className={classes.closeButton}>
                  <DialogBackArrowIcon fontSize="small" />
                </IconButton> */}
                <Box>Set Profile Picture</Box>
              </Grid>
              <Grid item xs={5}>
                <Box className="fileTex">Min Size must be : 3 MB</Box>
              </Grid>
            </Grid>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box className="body">
            <Typography className="infoTxt">
              A picture helps people recognize you and help’s us in Identifying you
            </Typography>
            <Avatar src={myprofileimage} style={{
              margin: "0 auto",
              width: "298px",
              height: "298px"
            }} />
          </Box>
          <Grid container
            direction="column"
            alignItems="center">
            <Button variant="outlined" color="primary" className={classes.editBtn} startIcon={<ApplicationEditIcon className="editIcon" />}>
              Change
            </Button>

            <Button color="primary" className={classes.editBtn}>
              Remove
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
      {openPhotoDialog && (
        <ImageDialogBox
          selectedValue={"data:image;base64," + myProfileData.ImageData?.ImageString}
          open={openPhotoDialog}
          onClose={handleClosePhotoDialog}
        />
      )}
    </ProfileWrap >
  );
}

export default ProfileSummary;
