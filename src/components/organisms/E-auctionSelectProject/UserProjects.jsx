import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Fcfs_Flow } from "../../../utils/Common";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import ApplicationCard from "./ApplicationCard";
import AppliedProject from "./AppliedProject/AppliedProject";
import { EauctionSelector, getAppliedProjectData } from "../../../redux/features/eauction/eauctionSlice";
import { Badge } from "@material-ui/core";
import Dashboard from "../DashboardPageComponents/Dashboard/Dashboard";
import CompletedBids from "./AppliedProject/CompletedBids";
import UpcomingBid from "./AppliedProject/UpcomingBid";

import WinnerPage from "../DashboardPageComponents/DashBoardTabs/WinnerTab/WinnerPage";

const useStyles = makeStyles((theme) => ({
  tabsView: {
    
    padding: theme.spacing(3, 0),
    "& .MuiTabs-root": {
      minHeight: "auto",
      
    },
    "& .MuiTabs-flexContainer": {
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-start"
      },
    },
    "& .MuiTab-root": {
      color: "#0038C0",
      fontWeight: 600,
      fontSize: "0.9rem",
      textTransform: "initial",
      margin: theme.spacing(0, 1.5),
      padding: theme.spacing(0.5, 2),
      minHeight: "auto",
      opacity: 1,
      "&:hover": {
        color: "#6f93eb"
      },
      "&.Mui-selected": {
        backgroundColor: "#EDF2FF",
        border: "2px solid #0038C0",
        borderRadius: 10,
        boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
      }
    },
  },
  
  selectFormContainer: {
    padding: theme.spacing(1.5),
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#EDF2FF",
      boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
      borderRadius: 10,
      overflow: "hidden"
    },
    "& .MuiSelect-selectMenu": {
      minHeight: "auto",
      paddingTop: theme.spacing(1.6),
      paddingBottom: theme.spacing(1.6),
      fontSize: "0.9rem",
      color: "#0038C0",
      fontWeight: 600,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #0038C0",
    },
    "& .MuiSelect-iconOutlined": {
      backgroundColor: "rgba(1, 81, 202, 0.1)",
      borderRadius: "50%",
      color: "#0151CA",
    }
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`floorPlan-tabpanel-${index}`}
      aria-labelledby={`floorPlan-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const UserProjects = (props) => { 
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedTabValue, setSelectedTabValue] = useState(0);
  const { t } = useTranslation("DashboardPageTrans");
  const [showBanner, setShowBanner] = useState();
  const [fcfs, setFcfs] = useState(Fcfs_Flow);
  const [isPendingDocUpload, setIsPendingDocUpload] = useState(false);
  const [activeStep, setActiveStep] = useState();

  const { ApplicantStepperData, isSuccessProgressResStepper, LastUpdatedDate, superActiveStep, superStepper } = useSelector(ApplicantProgressSelector);
  const {
    //MyProject Listing Variable state
    isFetchingMyProject,
    isSuccessMyProject,
    isErrorMyProject,
    myprojectData,
    errorMessageMyProject,


  } = useSelector(EauctionSelector);

  useEffect(() => {
    dispatch(getApplicantProgress());
  }, [dispatch, t])

  useEffect(() => {
    dispatch(getAppliedProjectData());

  }, []);

  // useEffect(() => {
  //   if (myprojectData.length == 0) {
  //     setSelectedTabValue(0)
  //   } else setSelectedTabValue(1)
  // }, [myprojectData])


  // useEffect(()=>{
  //   if(activeStep>10){
  //   localStorage.setItem("dashboardTabIndex", 1);
  // }
  // },[activeStep])

  const handleTabChange = (event, newValue) => {
    setSelectedTabValue(newValue);
  };
  const handleSelectChange = (newValue) => {
    setSelectedTabValue(newValue);
  };

  const pull_data = (data) => {
    setShowBanner(data);
  }
  

  // useEffect(() => {
  //   if (isSuccessScheme) {
  //     if (isErrorScheme == false) {
  //       setShowBanner(7);
  //     }
  //   }
  // }, [isSuccessScheme])
  return (
    
    <div>

      <Hidden mdUp>
        <Box className={classes.selectFormContainer}>
          <FormControl className={classes.selectFormContrl} variant="outlined">
            <Select labelId="demo-customized-select-label" id="demo-customized-select" value={selectedTabValue} onChange={(e) => handleSelectChange(e.target.value)}>
              <MenuItem value={0} >My Bidding Projects</MenuItem>
              <MenuItem value={1} > Completed Bids </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Hidden>
      <Hidden smDown>
        <Box className={classes.tabsView}>
      
          <Tabs vari="scrollable" scrollButtons="auto" value={selectedTabValue} onChange={handleTabChange} aria-label="Floor Tabs" variant="scrollable"
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <Tab label='My Bidding Projects' />
            {/* <Tab label='Live Bids' /> */}
          
            {/* <Badge color="error" badgeContent={myprojectData.length} max={9}> */}
            {/* <Tab label={`Completed Projects (${myprojectData.length})`}   className={`myLiveAuctionTab`} /> */}
            <Tab label='Completed Bids'   className={`myLiveAuctionTab`} />
            {/* <Tab label='My Journey' /> */}
            <Tab label='My Winning Result' className={`myLiveAuctionTab`} />
            {/* </Badge> */}
          </Tabs>
        </Box>
      </Hidden>
      <TabPanel value={selectedTabValue} index={0} >
         <AppliedProject onTabChange={handleSelectChange} /> 
      </TabPanel>
      {/* <TabPanel value={selectedTabValue} index={1} >
         <UpcomingBid/> 
      </TabPanel> */}
      <TabPanel value={selectedTabValue} index={1} >
        {/* <ApplicationCard onTabChange={handleSelectChange} /> */}
      <CompletedBids/>
  
      </TabPanel>
      {/* <TabPanel value={selectedTabValue} index={2} >
        <Dashboard/>

      </TabPanel> */}
      <TabPanel value={selectedTabValue} index={2} >
        <WinnerPage/>
      </TabPanel>

    </div>
  );
};

export default UserProjects;
