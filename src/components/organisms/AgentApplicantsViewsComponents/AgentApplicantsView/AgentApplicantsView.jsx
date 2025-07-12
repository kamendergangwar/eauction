import React, { useEffect, useRef } from "react";
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
import moment from "moment";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { green, orange, red, yellow } from "@material-ui/core/colors";
// import FormCard from "../../../molecules/Cards/FormCard/FormCard";
// import AgentApplicantsFilters from "../AgentApplicantsFilters/AgentApplicantsFilters";
import { useSelector, useDispatch } from "react-redux";
import { GetAgentApplications, agentApplicationsSelector } from "../../../../redux/features/agent/AgentApplicationsSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import AgentApplicantCard from "../AgentApplicantCard/AgentApplicantCard";
import {getProjectsListData, projectDataSelector} from "../../../../redux/features/projectdata/ProjectDataSlice";
import { useState } from "react";
import { GetAgentApplicants, agentApplicantSelector, getAgentReservationCategories } from "../../../../redux/features/agent/AgentApplicantsSlice";
import { AgentApplicantsViewsStyles } from "../AgentApplicantsView.styles";
import { getReservationCategories, getSubReservationCategories } from "../../../../redux/features/masterdata/MasterDataSlice";

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

const AgentApplicantsView = (props) => {
  const { width } = props;
  const { t } = useTranslation("AgentApplicationDashboardPageTrans");
  const classes = AgentApplicantsViewsStyles();
  const dispatch = useDispatch();
  const {
    agentApplicantsData,
    isFetchingAgentApplicants,
    isSuccessResAgentApplicants,
    isErrorAgentApplicants,
    errorMsgAgentApplicants
  } = useSelector(agentApplicantSelector);


  const [applicationStatus, setApplicationStatus] = React.useState("");
  const [appliedApplicationStatus, setAppliedApplicationStatus] = React.useState("");
  const [applicationProject, setApplicationProject] = React.useState("");
  const [searchedText, setSearchedText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [clear, setClear] = React.useState(false)
  const isTabFirstRender = useRef(true);

  const [disabledStatus, setDisabledStatus] = React.useState(true);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if(newValue == 1) {
      setDisabledStatus(false);
    } else {
      setDisabledStatus(true);
    }
    localStorage.setItem("appDashboardFiltersParam", newValue);
    console.log(newValue, "newValue --");    
  };

  useEffect(() => {
    console.log("entr");
    let getFilterParamsObj = localStorage.getItem("appDashboardFiltersParam");
    if (getFilterParamsObj) {
        let newObj = JSON.parse(getFilterParamsObj);
        if (newObj.type == "completed") {
          setSelectedTab(1);
          let newObj = {
            type: "",
            status: ""
          };
          localStorage.setItem("appDashboardFiltersParam", JSON.stringify(newObj));
        } else {
          setSelectedTab(0);
        }
    } else {
      setSelectedTab(0);
    }
    // let getFilterParamsObj = localStorage.getItem("appDashboardFiltersParam");
    // if (getFilterParamsObj) {
    //   let newObj = JSON.parse(getFilterParamsObj);
    //   if (newObj == "1") {
    //     setSelectedTab(1); 
    //   }else if(newObj == "2"){
    //     setSelectedTab(2);
    //     //localStorage.setItem("appDashboardFiltersParam", null)
    //   }else{
    //     setSelectedTab(0);
    //   }
    // }
    
  }, []);

  useEffect(() => {
    if (isTabFirstRender.current) {
      isTabFirstRender.current = false;
    } else {
      setApplicationProject("");
      getAppDetailsWithFilter();
    }
  }, [selectedTab]);

  useEffect(() => {
    getAppDetailsWithFilter();
    dispatch(getProjectsListData());
    dispatch(getAgentReservationCategories());
  }, [dispatch, t,  searchedText, selectedCategory, selectedStatus,applicationProject]);

  useEffect(() => {
    //console.log("enter clear");
    let params = "sortby=asc&search="
    localStorage.setItem("applctnsDashboardApiParam", params);
    //getAppAfterClearFilter();
  },[clear]);

  useEffect(() => {
    setClear(false)
  },[agentApplicantsData.data])

  
  // useEffect(() => {
  //   const type = localStorage.getItem("appDashboardFiltersParam")
  //   let params = "sortby=asc&search="
  //   if(type.type === "completed"){
  //     params += "&type=completed&perpage=100&page=1"
  //     localStorage.setItem("applctnsDashboardApiParam", params);
  //     dispatch(GetAgentApplications());
  //   }
  //   console.log("getItem", localStorage.getItem("appDashboardFiltersParam"));
  // }, [localStorage.getItem("applctnsDashboardApiParam")])

  const getAppAfterClearFilter = () => {
    let params = "sortby=asc&search="
      //console.log("enter else");
    if (searchedText) {
      params += searchedText;
    }
    if (selectedTab == 0) {
      params += "&type=inprogress";
      //console.log("select1", params);
    }
    if (selectedTab == 1) {
      params += "&type=completed";
      //console.log("select2", params);
    }
    if (selectedTab == 2) {
      params += "&type=rejected";
    }
    params += "&perpage=100&page=1";
    localStorage.setItem("applctnsDashboardApiParam", params);
    dispatch(GetAgentApplicants());
  }

  const getAppDetailsWithFilter = () => {
    let params = "sortby=asc&";
    if(applicationProject){
      params += "projectid="+applicationProject
      //console.log("params", params);
    }
    if (searchedText) {
      params += "&search="+ searchedText;
      //console.log("search", params);
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
    //console.log("selectedStatus", selectedStatus);
    dispatch(GetAgentApplicants());
  };

  /* useEffect(() => {
    console.log("agentApplicantsData", agentApplicantsData);
  }, [agentApplicantsData]); */

  return (
    <div className={classes.root}>
      {/* {console.log("agentApplicantsData.data",agentApplicantsData.data)} */}
      {isFetchingAgentApplicants && <Loading isOpen={isFetchingAgentApplicants} />}
      {isErrorAgentApplicants && <AlertBox severity="error">{errorMsgAgentApplicants}</AlertBox>}

      <AntTabs
        variant="scrollable"
        scrollButtons="auto"
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="ant example"
      >
        {/* <AntTab label={t("tabs.item1")} /> */}
        <AntTab label={t("tabs.item2")}   />
        <AntTab label={t("tabs.item3")}  />
        {/* <AntTab label={t("tabs.item4")}   /> */}
      </AntTabs>
      <Grid className={classes.applicationGridContainer}>
        <Paper elevation={4}>
          <div className={classes.container}>
            {/* {isSuccessResAgentApplicants &&
              <AgentApplicantsFilters applicationsData={agentApplicantsData.data}
                searchedText={searchedText}
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
                setSearchedText={setSearchedText}
                setSelectedCategory={setSelectedCategory}
                setSelectedStatus={setSelectedStatus}
                setApplicationProject={setApplicationProject}
                applicationProject={applicationProject}
                setClear = {setClear}
                clear = {clear}
                setSelectedTab={setSelectedTab} 
                disabledStatus={disabledStatus} />
            } */}
            <TabPanel value={selectedTab} index={0}>
              {isSuccessResAgentApplicants &&
                <AgentApplicantCard applicationsData={agentApplicantsData} type="inprogress" />
              }
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              {isSuccessResAgentApplicants &&
                <AgentApplicantCard applicationsData={agentApplicantsData} type="completed" />
              }
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              {isSuccessResAgentApplicants &&
                <AgentApplicantCard 
                applicationsData={agentApplicantsData}
                 type="rejected" />
              }
            </TabPanel>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default withWidth()(AgentApplicantsView);