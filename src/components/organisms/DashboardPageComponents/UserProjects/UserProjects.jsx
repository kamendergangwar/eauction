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
import AppliedProjects from "./AppliedProjects/AppliedProjects";
import ApplicationsCard from "./ApplicationsCard/ApplicationsCard";
import GrievanceTab from "./GrievanceTab/GrievanceTab";
import Banner from "../../../atoms/DashboardHeaderBanner/Banner";
import BookAppointmentCard from "../../../organisms/SchedulerPageComponents/BookAppointmentCard";
import {
  estampingDocumentSelector,
  getDocumentDetails,
} from "../../../../redux/features/file/EstampingDocSlice";
import { isSchemeExpired, masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import UserProgressStepper from "./UserProgressStepper/UserProgressStepper";
import { Fcfs_Flow } from "../../../../utils/Common";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";

const useStyles = makeStyles((theme) => ({
  tabsView: {
    padding: theme.spacing(3, 0),
    "& .MuiTabs-root": {
      minHeight: "auto"
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
  const { isDataSuccess,doclist, reservationCategory } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedTabValue, setSelectedTabValue] = useState(0);
  const { t } = useTranslation("DashboardPageTrans");
  const [showBanner, setShowBanner] = useState();
  const { isErrorScheme, isSuccessScheme, errorMsgScheme } = useSelector(masterDataSelector)
  const [fcfs , setFcfs] =useState(Fcfs_Flow);
  const [activeStep, setActiveStep] = useState();

  const { ApplicantStepperData, isSuccessProgressResStepper, LastUpdatedDate, superActiveStep, superStepper } = useSelector(ApplicantProgressSelector);

  useEffect(()=>{
    dispatch(getApplicantProgress());
  },[dispatch, t])

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      setActiveStep(superActiveStep);
      if(superActiveStep>10){
        localStorage.setItem("dashboardTabIndex",1)
        setSelectedTabValue(1)
      }
    }
  },[isSuccessProgressResStepper]);

  useEffect(() => {
    let url_param = localStorage.getItem("dashboardTabIndex");
    if (url_param) {
      setSelectedTabValue(parseFloat(url_param));
      // localStorage.removeItem("urlParam");
    }
    // dispatch(isSchemeExpired());
  }, []);

  // useEffect(()=>{
  //   if(activeStep>10){
  //   localStorage.setItem("dashboardTabIndex", 1);
  // }
  // },[activeStep])

  const handleTabChange = (event, newValue) => {
    localStorage.setItem("dashboardTabIndex", newValue);
    setSelectedTabValue(newValue);
  };
  const handleSelectChange = (newValue) => {
    localStorage.setItem("dashboardTabIndex", newValue);
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
      { <>
        {/* {(showBanner != 0 && showBanner != undefined && applicantData.appointment_details?.length == 0) && <Banner applicationState={showBanner} />} */}
        {/* {(applicantData.appointment_details?.length == 1 && isDataSuccess) && < BookAppointmentCard applicantData={applicantData} />} */}
      </>}
      <AppliedProjects reservationCategoryData={reservationCategory} doclist={doclist} bannerState={pull_data} activeStep={activeStep} state="completed" schemeStatus={isErrorScheme} />
      {/* <Hidden mdUp>
        <Box className={classes.selectFormContainer}>
          <FormControl className={classes.selectFormContrl} variant="outlined">
            <Select labelId="demo-customized-select-label" id="demo-customized-select" value={selectedTabValue} onChange={(e) => handleSelectChange(e.target.value)}>
              <MenuItem value={0} style={{display: activeStep>10 ? "none" : ""}}>{t("userProjects.applied.title")}</MenuItem>
              <MenuItem value={1} style={{display: activeStep<=10 ? "none" : ""}}>{t("userProjects.saved.title")}</MenuItem>
              <MenuItem value={2}>{t("userProjects.grievance.title")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Hidden> */}
      {/* <Hidden smDown>
        <Box className={classes.tabsView}>
          <Tabs vari="scrollable" scrollButtons="auto" value={selectedTabValue} onChange={handleTabChange} aria-label="Floor Tabs" variant="scrollable"
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <Tab label={t("userProjects.applied.title")} style={{display: activeStep>10 ? "none" : ""}}/>
           <Tab label={t("userProjects.saved.title")} style={{display: activeStep<=10 ? "none" : ""}}/>
            <Tab label={t("userProjects.grievance.title")}  />
          </Tabs>
        </Box>
      </Hidden> */}
      {/* <TabPanel value={selectedTabValue} index={0} hidden={activeStep>10}>
        isPendingDocUpload={isPendingDocUpload}
        <AppliedProjects applicantData={applicantData} bannerState={pull_data} state="inProgress" schemeStatus={isErrorScheme} />
        {fcfs ? <UserProgressStepper applicantData={applicantData} reservationCategory={reservationCategory} doclist={doclist} /> : <AppliedProjects applicantData={applicantData} bannerState={pull_data} state="inProgress" schemeStatus={isErrorScheme} />}
        {activeStep < 11 && <UserProgressStepper applicantData={applicantData} reservationCategory={reservationCategory} doclist={doclist} />}
      </TabPanel>
      <TabPanel value={selectedTabValue} index={1} hidden={activeStep<=10}>
        <ApplicationsCard applicantData={applicantData} isPendingDocUpload={isPendingDocUpload} />
        isPendingDocUpload={isPendingDocUpload} 
        <AppliedProjects reservationCategoryData={reservationCategory} doclist={doclist} applicantData={applicantData} bannerState={pull_data} activeStep={activeStep} state="completed" schemeStatus={isErrorScheme} />
      </TabPanel>
      <TabPanel value={selectedTabValue} index={2}>
        <GrievanceTab />
      </TabPanel> */}
    </div>
  );
};

export default UserProjects;
