import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import axios from "axios";
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
import { DownloadIcon } from "../../../atoms/SvgIcons/SvgIcons";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useSelector, useDispatch } from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ApiEndPoint, InfoWebSiteUrl } from "../../../../utils/Common";
import SampleLead from "../../../../assets/sample_lead.csv";
import { AgentLeadViewsStyles } from "../AgentLeadViews.styles";
import {
  AgentMaleIcon,
  AgentFemaleIcon,
  AgentOtherIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import Image from "../../../../assets/Profile.jpg";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import ImageDialogBox from "../../../molecules/DialogBoxes/ImageDialogBox/ImageDialogBox";
import CloseIcon from '@material-ui/icons/Close';
import {
  uploadAgentLeadData,
  getAgentLeadData,
  clearAgentLeadState,
  clearAgentLeadData,
  clearUpdateRes,
  agentLeadSelector,
  clearUploadMessage,
  clearAgentUploadLeadResponse,
} from "../../../../redux/features/agent/AgentLeadSlice";
import AgentLeadFilter from "../AgentLeadFilter/AgentLeadFilter";
import AgentLeadTable from "../AgentLeadTable/AgentLeadTable";
import { ButtonGroup, Slide, Snackbar, TableBody, TableCell, TableRow } from "@material-ui/core";
import AgentLeadDetailCard from "../AgentLeadDetailcard/AgentLeadDetailcard";
import { agentProfileSelector, getAgentProfileData } from "../../../../redux/features/agent/AgentProfileSlice";
import { getReservationCategories, masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import _ from 'lodash';
import { Alert } from "@material-ui/lab";
import { agentApplicantSelector, getAgentReservationCategories } from "../../../../redux/features/agent/AgentApplicantsSlice";
import { green } from "@material-ui/core/colors";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const AgentUploadLeadView = (props) => {
  const { width } = props;
  const { t } = useTranslation("AgentLeadPageTrans");
  const classes = AgentLeadViewsStyles();
  const dispatch = useDispatch();
  const {
    agentLeadData,
    updateAgentLeadData,
    isFetchingAgentLead,
    isSuccessResAgentLead,
    isErrorAgentLead,
    errorMsgAgentLead,
    isSuccessResUploadAgentLead,
    isErrorUploadAgentLead,
    isErroruploadAgentLead,
    errorMessageUploadpdateLead,
    isFetchingUploadAgentLead,
    errorMessageUploadLead,
    agentUploadLeadResponse,
    successMsgUploadLead
  } = useSelector(agentLeadSelector);

  // const { isSuccessResUpdateAgentProfilePhoto, updateagentProfilePhotoData } =
  //   useSelector(agentProfileSelector);
  /* const [applicationStatus, setApplicationStatus] = useState("");
  const [appliedApplicationStatus, setAppliedApplicationStatus] = useState("");
  const [searchedText, setSearchedText] = useState("");*/
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsSendIs, setNotificationsSendIs] = useState(false);
  const [storeLeadData, setStoreLeadData] = useState([]);
  const history = useHistory();
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const isNotifyFirstRender = useRef(true);
  const isImageUrlFirstRender = useRef(true);
  const [leadFile, setLeadFile] = useState(null);
  const [searchedText, setSearchedText] = React.useState("");
  const [clear, setClear] = React.useState(false);
  const [validate, setValidate] = React.useState(true);
  const [leadsCounts, setLeadsCount] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const hiddenFileInput = React.useRef(null);
  const [agentProfile, setAgentProfile] = useState(null);
  const { isFetchingAgentProfile, agentProfileData, isSuccessResAgentProfile } = useSelector(agentProfileSelector);
  const [filterCategoryData, setFilterCategoryData] = useState([]);
  const [allLeadData, setAllLeadData] = useState();
  const [leadFileName, setLeadFileName] = useState(null);

  const {
    allCategory,
    isSuccessMasterData
  } = useSelector(agentApplicantSelector);

  React.useEffect(() => {
    dispatch(getAgentReservationCategories());
    dispatch(getAgentProfileData())
  }, []);

  useEffect(() => {
    if (isSuccessMasterData && allCategory) {
      const uniqueData = _.uniqBy(allCategory, 'value');
      setFilterCategoryData(uniqueData);
    }
  }, [t, isSuccessMasterData, allCategory])

  React.useEffect(() => {
    if (isSuccessResAgentProfile && agentProfileData.AgentDetails.length > 0) {
      setAgentProfile(agentProfileData?.AgentDetails[0]);
    }
  }, [isSuccessResAgentProfile, agentProfileData]);

  useEffect(() => {
    if (agentProfile) {
      if (agentProfile.source == 'bank') {
        history.push('/cfc-applicants-analytics-dashboard')
      }
    }
  }, [agentProfile])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const fileSelect = (file) => {
    setLeadFile(null);
    let fileName = file.name;
    let fileExtension = fileName.split(".").pop().trim().toLowerCase();
    if (fileExtension == "csv") {
      setValidate(true);
      setLeadFile(file);
    } else {
      setValidate(false);
    }
  };
  const onSubmit = () => {
    const requestData = new FormData();
    requestData.append("file", leadFile ? leadFile : "file");
    requestData.append("AgentId", localStorage.getItem("agentcode"));
    dispatch(uploadAgentLeadData(requestData));
    // setStoreLeadData(updateAgentLeadData);

    setLeadFile(null);
    setLeadFileName(null)
  };
  useEffect(() => {
    getAppDetailsWithFilter();
    dispatch(getAgentLeadData());
    setPage(0);
  }, [t, searchedText, selectedCategory, selectedSort, selectedStatus]);

  useEffect(() => {
    if (isSuccessResAgentLead) {
      setStoreLeadData(agentLeadData.CustomerList);
      setAllLeadData(agentLeadData);
      setLeadsCount(agentLeadData.Total);
    }
  }, [agentLeadData, isSuccessResAgentLead]);

  useEffect(() => {
    if (isSuccessResUploadAgentLead) {
      getAppDetailsWithFilter();
      dispatch(getAgentLeadData());
      setPage(0);
    }
  }, [isSuccessResUploadAgentLead, updateAgentLeadData]);

  const getAppDetailsWithFilter = () => {
    let params = "?perpage=&page=";
    // if(rowsPerPage){
    //   params+= "?perpage="+ rowsPerPage;
    // }
    // if(page){
    //   params+="&page="+page;
    // }
    if (searchedText) {
      params += "&search=" + searchedText;
    }
    if (selectedCategory) {
      params += "&category=" + selectedCategory;
    }
    if (selectedSort) {
      params += "&sortby=" + selectedSort;
    }
    if (selectedStatus || selectedStatus == 0) {
      params += "&status=" + selectedStatus;
    }

    localStorage.setItem("agentLeadApiParam", params);
    window.scroll(
      {
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    // dispatch(getAgentLeadData());
  };


  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => dispatch(clearAgentUploadLeadResponse())}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      {isFetchingAgentLead && <Loading isOpen={isFetchingAgentLead} />}
      {isFetchingUploadAgentLead && <Loading isOpen={isFetchingUploadAgentLead} />}
      {isErrorAgentLead && (
        <AlertBox severity="error">{errorMsgAgentLead}</AlertBox>
      )}
      {isErroruploadAgentLead && (
        <AlertBox severity="error">{errorMessageUploadpdateLead}</AlertBox>
      )}
      {/* <Snackbar open={agentUploadLeadResponse}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={5000}
        TransitionComponent={TransitionLeft}
        onClose={() => dispatch(clearAgentUploadLeadResponse())}
        action={action} >

      </Snackbar> */}
      <Snackbar open={agentUploadLeadResponse}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={5000}
        TransitionComponent={TransitionLeft}
        onClose={() => dispatch(clearAgentUploadLeadResponse())}
        action={action} >
        <Box padding={1}>
          {(typeof errorMessageUploadLead == 'object' && !_.isEmpty(errorMessageUploadLead)) &&
            <Alert onClose={() => dispatch(clearAgentUploadLeadResponse())} severity="warning" variant="filled" style={{ marginBottom: 8 }}>
              {Object.keys(errorMessageUploadLead).map((error) => (
                <>{errorMessageUploadLead[error]}</>
              ))}
            </Alert>}
          <Alert onClose={() => dispatch(clearAgentUploadLeadResponse())} severity={isErrorUploadAgentLead ? "error" : "success"} variant="filled">
            {successMsgUploadLead}
          </Alert>
        </Box>
      </Snackbar>
      <Paper elevation={4}>
        <div className={classes.container}>
          {/* <Box marginBottom={1.5}>
            <Button
              color="primary"
              onClick={() => history.goBack()}
            >
              <KeyboardBackspaceIcon style={{ marginRight: 10 }} />{" "}
              {t("pageTitle")}
            </Button>
          </Box> */}
          {filterCategoryData && <AgentLeadFilter
            searchedText={searchedText}
            setSearchedText={setSearchedText}
            setSelectedCategory={setSelectedCategory}
            setSelectedSort={setSelectedSort}
            setSelectedStatus={setSelectedStatus}
            setClear={setClear}
            clear={clear}
            setSelectedTab={setSelectedTab}
            filterCategoryData={filterCategoryData}
            selectedStatus={selectedStatus}
          />}
          <Box className={classes.dataContainer}>
            <Box className={`${classes.leadHeader} innerSection`}>
              <Grid container className={classes.innerGrid}>
                <Grid item>
                  <Typography
                    variant="h6"
                    className={classes.sectionCardTitle}
                    style={{ margin: "10px" }}
                  >
                    {/* {t("notifcationsSection.title")} */}
                    {t("pageTitle")}
                  </Typography>
                </Grid>

                <Grid item className={classes.docsCard}>
                  <Box className={classes.downloadBtnArea}>
                    <Button
                      startIcon={<DownloadIcon />}
                      href="#text-buttons"
                      color="primary"
                      className={classes.downloadBtn}
                      onClick={() => window.open(SampleLead)}
                    >
                      {t("uploadCardSection.sampleTxt")}
                    </Button>
                  </Box>
                  <input
                    className={classes.input}
                    ref={hiddenFileInput}
                    id="fileData"
                    name="file"
                    type="file"
                    accept=".csv"
                    required
                    onChange={(event) => {
                      if (event.currentTarget.files[0]) {
                        fileSelect(event.currentTarget.files[0]);
                        setLeadFileName(event.currentTarget.files[0].name)
                        event.currentTarget.value = ''
                      }
                    }}
                  />
                  <Typography
                    className={classes.validateText}
                    style={validate ? { color: " " } : { color: "#f44336" }}
                  >
                    {t("Support")}
                    <strong> ( {t("csv Format")} ) </strong>
                    <br />
                  </Typography>
                  {leadFileName && <Typography style={{ fontSize: 12, fontWeight: 600 }}>{leadFileName?.length > 18 ? `${leadFileName.slice(0, 12)}...${leadFileName.slice(-6)}` : leadFileName}</Typography>}
                  <ButtonGroup variant="contained" color="primary" size="small">
                    <Button
                      size="small"
                      component="span"
                      onClick={() => hiddenFileInput.current.click()}
                    >
                      {t("uploadCardSection.browseTxt")}
                    </Button>

                    <ColorButton
                      component="span"
                      size="small"
                      disabled={leadFile == null}
                      onClick={onSubmit}
                      color="secondry"
                    >
                      {t("uploadCardSection.submitTxt")}
                    </ColorButton>
                  </ButtonGroup>
                </Grid>
                {allLeadData && <AgentLeadDetailCard
                  storeLeadData={storeLeadData}
                  leadsCounts={leadsCounts}
                  allLeadData={allLeadData}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />}
              </Grid>
            </Box>
            <Box>

              {((isSuccessResAgentLead || isSuccessResUploadAgentLead)) && (
                <AgentLeadTable
                  storeLeadData={storeLeadData}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  page={page}
                  setPage={setPage}
                  filterCategoryData={filterCategoryData}
                  agentProfile={agentProfile}
                  selectedStatus={selectedStatus}
                />
              )}
            </Box>
          </Box>
        </div>
      </Paper>
    </div>
  );
};

export default withWidth()(AgentUploadLeadView);
