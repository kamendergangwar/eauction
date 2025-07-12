import React, { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import moment from "moment";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useSelector, useDispatch } from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotifcationsSecCard from "../NotifcationsSecCard/NotifcationsSecCard";
import CompanyDetailsSecCard from "../CompanyDetailsSecCard/CompanyDetailsSecCard";
import ApplicationsCountCard from "../ApplicationsCountCard/ApplicationsCountCard";
import PersonalInformationSecCard from "../PersonalInformationSecCard/PersonalInformationSecCard";
import { AgentProfileViewsStyles } from "../AgentProfileViews.styles";
import { AgentMaleIcon, AgentFemaleIcon, AgentOtherIcon } from "../../../atoms/SvgIcons/SvgIcons";
import Image from "../../../../assets/DummyProfile.jpg";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import ImageDialogBox from "../../../molecules/DialogBoxes/ImageDialogBox/ImageDialogBox";
import {
  fileUploadSelector,
  setImageUrl,
  clearImageUrl,
} from "../../../../redux/features/file/FileUploadSlice";
import { getAgentProfileData, updateAgentProfileInfo, clearAgentProfileState, clearAgentProfileData, agentProfileSelector } from "../../../../redux/features/agent/AgentProfileSlice";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const AntTabs = withStyles((theme) => ({
  root: {
    marginBottom: 15,
    minHeight: "auto",
    "& .MuiTabs-scroller": {
      display: "flex"
    },
    "& .MuiTabs-flexContainer": {
      background: "#0F2940",
      borderRadius: 30,
      [theme.breakpoints.only("xs")]: {
        overflow: "auto",
        padding: "0 12px"
      },
    }
  },
  indicator: {
    display: "none"
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    color: "#C1C1C1",
    textTransform: "none",
    letterSpacing: "0.04em",
    opacity: 1,
    padding: 8,
    fontWeight: "normal",
    "&:hover": {
      color: "#ffffff",
      opacity: 1,
    },
    "&$selected": {
      color: "#ffffff",
      fontWeight: "bold"
    },
    "&:focus": {
      color: "#ffffff",
    },
  },
  selected: {

  },
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const AgentApplicationsView = (props) => {
  const { width } = props;
  const { t } = useTranslation("AgentProfilePageTrans");
  const classes = AgentProfileViewsStyles();
  const dispatch = useDispatch();
  const {
    agentProfileData,
    isFetchingAgentProfile,
    isSuccessResAgentProfile,
    isErrorAgentProfile,
    errorMsgAgentProfile,
    updateAgentProfileData,
    isSuccessResUpdateAgentProfile,
    isErrorUpdateAgentProfile,
    errorMessageUpdateProfile
  } = useSelector(agentProfileSelector);

  const {
    isSuccessResUpdateAgentProfilePhoto,
    updateagentProfilePhotoData
  } = useSelector(agentProfileSelector);
  /* const [applicationStatus, setApplicationStatus] = useState("");
  const [appliedApplicationStatus, setAppliedApplicationStatus] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); */
  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsSendIs, setNotificationsSendIs] = useState(false);
  const [storeProfileData, setStoreProfileData] = useState({});
  const history = useHistory();
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const { imageUrl, isFileSuccess } = useSelector(fileUploadSelector);
  const isNotifyFirstRender = useRef(true);
  const isImageUrlFirstRender = useRef(true);
  const [showToast, setShowToast] = React.useState(false);

  const referralUrl = useMemo(() => `https://cidcohomes.com?utm_campaign=All&utm_medium=sales&utm_source=${localStorage.getItem("agentcode")}&utm_SchemeId=1&node=`, [localStorage.getItem("agentcode")]);
  const QRCodeUrl = useMemo(() => `https://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=${referralUrl}`, [referralUrl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const genderList = [
    {
      value: "1",
      label: t(
        "personalInfoEdit.formControl.genderOptions.male"
      ),
    },
    {
      value: "2",
      label: t(
        "personalInfoEdit.formControl.genderOptions.female"
      ),
    },
    {
      value: "3",
      label: t(
        "personalInfoEdit.formControl.genderOptions.other"
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAgentProfileData());
  }, [t]);

  useEffect(() => {
    if (isSuccessResAgentProfile) {
      var new_obj = {
        ...agentProfileData.AgentDetails[0],
        fullName: agentProfileData.AgentDetails[0].FirstName,
        genderText: genderList[agentProfileData.AgentDetails[0].Gender - 1].label
      };
      console.log("new_object", new_obj);
      var notiIs = new_obj.Notifications == "1" ? true : false;
      setNotificationsSendIs(notiIs);
      /* if (new_obj.ImagePath) {
        // dispatch(setImageUrl(new_obj.ImagePath));
        setProfileImageUrl(new_obj.ImagePath);
      } */
      setStoreProfileData(new_obj);
    }
  }, [agentProfileData, isSuccessResAgentProfile]);

  const afterUpdateProfile = () => {
    dispatch(getAgentProfileData());
    dispatch(clearAgentProfileState());
    dispatch(clearAgentProfileData());
  };

  const handleClickOpenPhotoDialog = () => {
    setOpenPhotoDialog(true);
  };

  const handleClosePhotoDialog = (value) => {
    setOpenPhotoDialog(false);
  };

  const handleClickRemoveImage = (value) => {
    dispatch(clearImageUrl());
  };



  // useEffect(() => {
  //   if (isImageUrlFirstRender.current) {
  //     isImageUrlFirstRender.current = false;
  //   } else {
  //     updateFunction();
  //   }
  // }, [imageUrl]);

  useEffect(() => {
    if (isSuccessResUpdateAgentProfilePhoto) {
      updateFunction();
    }
  }, [isSuccessResUpdateAgentProfilePhoto]);

  const notificationSettingToggle = () => {
    setNotificationsSendIs((prev) => !prev);
  };

  const updateFunction = () => {
    console.log("imageurl", updateagentProfilePhotoData.UploadedFileUrl);

    var sendData = {
      // "FullName": storeProfileData.fullName,
      // "Gender": storeProfileData.Gender,
      // "MobileNo": storeProfileData.MobileNo,
      // "EmailId": storeProfileData.EmailId,
      // "Address": storeProfileData.AgentAddress,
      "ImagePath": updateagentProfilePhotoData.UploadedFileUrl ? updateagentProfilePhotoData.UploadedFileUrl : "",
      "Notifications": notificationsSendIs ? "1" : "0",
      "Lang": localStorage.getItem("agentcode")
    };
    dispatch(updateAgentProfileInfo(sendData))
    // .then(() =>{
    //   setOpenPhotoDialog(false);
    // })
  };

  useEffect(() => {
    if (isSuccessResUpdateAgentProfile) {
      afterUpdateProfile();
    }
  }, [updateAgentProfileData, isSuccessResUpdateAgentProfile]);

  /* useEffect(() => {
    let getFilterParamsObj = localStorage.getItem("appDashboardFiltersParam");
    if (getFilterParamsObj) {
      let newObj = JSON.parse(getFilterParamsObj);
      if (newObj.type == "completed") {
        setSelectedTab(1);
      }
    }
  }, []);

  useEffect(() => {
    // let params = "perpage=100&page=1&sortby=asc&search=&type=inprogress&category=&status=Estamp";
    let params = "sortby=asc&search=";
    if (searchedText) {
      params += searchedText;
    }
    if (selectedTab == 0) {
      params += "&type=inprogress";
    }
    if (selectedTab == 1) {
      params += "&type=completed";
    }
    if (selectedTab == 2) {
      params += "&type=rejected";
    }
    if (selectedCategory) {
      params += "&category=" + selectedCategory;
    }
    if (selectedStatus) {
      params += "&status=" + selectedStatus;
    }
    params += "&perpage=100&page=1";
    localStorage.setItem("applctnsDashboardApiParam", params);
    dispatch(GetAgentApplications());
  }, [dispatch, t, selectedTab, searchedText, selectedCategory, selectedStatus]); */

  const handleCopyQR = () => {
    navigator.clipboard.writeText(referralUrl)
    setShowToast(true);
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast(false);
  };

  return (
    <div className={classes.root}>
      {console.log("agentDataa", updateAgentProfileData)}
      {isFetchingAgentProfile && <Loading isOpen={isFetchingAgentProfile} />}
      {isErrorAgentProfile && <AlertBox severity="error">{errorMsgAgentProfile}</AlertBox>}
      {isErrorUpdateAgentProfile && <AlertBox severity="error">{errorMessageUpdateProfile}</AlertBox>}

      <Paper elevation={4}>
        <div className={classes.container}>
          <Box marginBottom={1.5}>
            <Button color="primary" onClick={() => history.goBack()}><KeyboardBackspaceIcon style={{ marginRight: 10 }} /> {t("pageTitle")}</Button>
          </Box>
          <Box className={classes.profileCoverBox}>
            <Grid container>
              <Grid item xs>
                <Box className={classes.profileImgSection}>
                  <CardMedia
                    className={classes.profileImgCover}
                    image={Image}
                    // image={updateagentProfilePhotoData?.UploadedFileUrl || storeProfileData?.ImagePath || Image}
                    title="Profile Cover"
                  />
                  {/* <IconButton className={classes.uploadPhotoBtn} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <CameraAltOutlinedIcon />
                  </IconButton> */}
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => { handleClose(); handleClickOpenPhotoDialog() }}>Take Photo</MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleClickOpenPhotoDialog() }}>Upload Photo</MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleClickRemoveImage() }}>Remove Photo</MenuItem>
                  </Menu>
                </Box>
                {isSuccessResAgentProfile &&
                  <>
                    <Typography variant="h5" className={classes.agentFullName}>{storeProfileData.fullName}</Typography>

                    <Typography className={classes.agentGenderView}>
                      {storeProfileData.Gender == "1" && <AgentMaleIcon />}
                      {storeProfileData.Gender == "2" && <AgentFemaleIcon />}
                      {storeProfileData.Gender == "3" && <AgentOtherIcon />}
                      {storeProfileData.genderText}</Typography>
                  </>
                }
              </Grid>
              <Grid item>
                {/* <Typography variant="h5" style={{ marginBottom: "16px" }}>{t("appCardSection.mainTitle")}</Typography> */}
                <Grid container spacing={2}>
                  <Grid item>
                    <Box>
                      <img src={QRCodeUrl} alt="qrcode" />
                    </Box>
                    <Box textAlign={"center"}>
                      <Button variant="contained" onClick={handleCopyQR}>Copy QR Link</Button>
                    </Box>
                    {/* <ApplicationsCountCard cardData={{ title: t("appCardSection.cardTitle1"), count: storeProfileData.TotalApplications, cardType: "total" }} /> */}
                  </Grid>
                  <Grid item>
                    {/* <ApplicationsCountCard cardData={{ title: t("appCardSection.cardTitle2"), count: storeProfileData.ApplicationInProgress, cardType: "inProgress" }} /> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          {/* <Box>
            <NotifcationsSecCard agentProfileData={storeProfileData} notificationsSendIs={notificationsSendIs} notificationSettingToggle={notificationSettingToggle} />
          </Box> */}
          {/* <Box>
            <CompanyDetailsSecCard agentProfileData={storeProfileData} />
          </Box> */}
          <Box>
            <PersonalInformationSecCard agentProfileData={storeProfileData} profileImageUrl={storeProfileData.ImagePath} afterUpdateProfile={afterUpdateProfile} />
          </Box>
        </div>
      </Paper>
      {openPhotoDialog && (
        <ImageDialogBox
          selectedValue={updateagentProfilePhotoData?.UploadedFileUrl}
          profileImg={storeProfileData?.ImagePath}
          open={openPhotoDialog}
          onClose={handleClosePhotoDialog}
        />
      )}
      <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={showToast} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          Copied !!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default withWidth()(AgentApplicationsView);
