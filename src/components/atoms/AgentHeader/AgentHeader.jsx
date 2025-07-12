import React from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// import TranslateIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

import Logo from "../../../assets/Logo-v1.png";
import {
  ProfileIcon,
  SupportIcon,
  SupportMobileIcon,
  DashboardIcon,
  ApplicationIcon,
  LogoutIcon,
  LanguageTranslateIcon,
} from "../SvgIcons/SvgIcons";
import { AgentHeaderStyles } from "./AgentHeader.styles";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { agentProfileSelector, getAgentProfileData } from "../../../redux/features/agent/AgentProfileSlice";
import { clearAgentAnalDashboardData, clearAgentAnalDashboardState } from "../../../redux/features/agent/AgentAnalDashboardSlice";
import { useEffect } from "react";
import { useState } from "react";
// import { clearApplicantData } from "../../../redux/features/applicant/ApplicantSlice";
// import { clearFamilyData } from "../../../redux/features/applicant/ApplicantFamilyInfoSlice";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
];

const AgentHeader = () => {
  const classes = AgentHeaderStyles();
  const { t } = useTranslation("AgentTranslation");
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPathName = useLocation().pathname;

  const currentLanguage = (element) =>
    element.code === localStorage.getItem("i18nextLng");

  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const [agentProfile, setAgentProfile] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuList, setMobileMenuList] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(
    languages.findIndex(currentLanguage)
  );

  const handleOnLangItem = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const { isFetchingAgentProfile, agentProfileData, isSuccessResAgentProfile } = useSelector(agentProfileSelector);

  React.useEffect(() => {
    dispatch(getAgentProfileData())
  }, [dispatch])

  React.useEffect(() => {
    if (isSuccessResAgentProfile && agentProfileData.AgentDetails.length > 0) {
      setAgentProfile(agentProfileData?.AgentDetails[0]);
    }
  }, [isSuccessResAgentProfile, agentProfileData])

  const handleOnLangMenuItem = (code, index) => {
    i18n.changeLanguage(code);
    setSelectedIndex(index);
    setAnchorElLang(null);
  };

  useEffect(() => {
    handleOnLangMenuItem("en", 0);
    localStorage.setItem('i18nextLng', 'en');
  }, [])

  const handleOnLangMenuClose = () => {
    setAnchorElLang(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /* const handleOnProfileMenuItem = (value) => {
    redirectPages(value);
    setAnchorEl(null);
  }; */

  const redirectPages = (value) => {
    if (value === "cfc-dashboard") {
      history.push("/cfc-dashboard");
    } else if (value === "cfc-application-dashboard") {
      history.push("/cfc-application-dashboard");
    } else if (value === "cfc-applicants-dashboard") {
      history.push("/cfc-applicants-dashboard");
    } else if (value === "cfc-profile") {
      history.push("/cfc-profile");
    } else if (value === "cfc-forgot-password") {
      history.push("/cfc-forgot-password");
    } else if (value === "cfc-analytics-dashboard") {
      history.push("/cfc-analytics-dashboard");
    } else if (value === "cfc-applicants-analytics-dashboard") {
      history.push("/cfc-applicants-analytics-dashboard");
    } else if (value === "cfc-upload-leads") {
      history.push("/cfc-upload-leads");
    } else if (value === "logout") {
      localStorage.removeItem("agentId");
      localStorage.removeItem("agentjwtToken");
      localStorage.removeItem("aadharNo");
      localStorage.removeItem("agentcode");
      dispatch(clearAgentAnalDashboardState());
      dispatch(clearAgentAnalDashboardData());
      // dispatch(clearApplicantData());
      // dispatch(clearFamilyData());
      history.push("/cfc-login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /* const profileMenuList = [
    {
      value: "dashboard",
      label: t("headerSection.profileMenu.dashboard"),
      icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
    },
    {
      value: "application",
      label: t("headerSection.profileMenu.application"),
      icon: <ApplicationIcon fontSize="small" style={{ color: "#ffffff" }} />,
    },
    {
      value: "profile",
      label: t("headerSection.profileMenu.profile"),
      icon: <ProfileIcon fontSize="small" style={{ color: "#ffffff" }} />,
    },
    {
      value: "logout",
      label: t("headerSection.profileMenu.logout"),
      icon: <LogoutIcon fontSize="small" style={{ color: "#ffffff" }} />,
    },
  ]; */

  useEffect(() => {
    if (agentProfile) {
      switch (agentProfile.source) {
        case 'sales':
          let MenuListsales = [
            // {
            //   value: "cfc-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.home"),
            //   icon: <HomeOutlinedIcon fontSize="small" color="primary" />,
            // },
            {
              value: "cfc-profile",
              label: t("agentHeaderSection.agentSideMenu.profile"),
              icon: <ProfileIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
            // {
            //   value: "cfc-application-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.applicationDashboard"),
            //   icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
            // },
            {
              value: "cfc-applicants-dashboard",
              label: t("Applicants Dashboard"),
              icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
            // {
            //   value: "cfc-analytics-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.analytics"),
            //   icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
            // },
            {
              value: "cfc-applicants-analytics-dashboard",
              label: t("Applicant Analytics"),
              icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
            },
            {
              value: "cfc-upload-leads",
              label: t("agentHeaderSection.agentSideMenu.uploadLeads"),
              icon: <CloudUploadOutlinedIcon fontSize="small" color="primary" />,
            },

            {
              value: "cfc-forgot-password",
              label: t("agentHeaderSection.agentSideMenu.changePassword"),
              icon: <VpnKeyOutlinedIcon fontSize="small" color="primary" />,
            },
            // {
            //   value: "support",
            //   label: t("support"),
            //   icon: <SupportMobileIcon fontSize="small" style={{ color: "#ffffff" }} />,
            // },
            {
              value: "logout",
              label: t("agentHeaderSection.agentSideMenu.logout"),
              icon: <LogoutIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
          ];
          setMobileMenuList(MenuListsales);
          break;
        case 'bank':
          const MenuListBank = [
            // {
            //   value: "cfc-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.home"),
            //   icon: <HomeOutlinedIcon fontSize="small" color="primary" />,
            // },
            {
              value: "cfc-profile",
              label: t("agentHeaderSection.agentSideMenu.profile"),
              icon: <ProfileIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
            // {
            //   value: "cfc-application-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.applicationDashboard"),
            //   icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
            // },
            {
              value: "cfc-applicants-dashboard",
              label: t("Applicants Dashboard"),
              icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
            // {
            //   value: "cfc-analytics-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.analytics"),
            //   icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
            // },
            {
              value: "cfc-applicants-analytics-dashboard",
              label: t("Applicant Analytics"),
              icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
            },
            // {
            //   value: "cfc-upload-leads",
            //   label: t("agentHeaderSection.agentSideMenu.uploadLeads"),
            //   icon: <CloudUploadOutlinedIcon fontSize="small" color="primary" />,
            // },
            {
              value: "cfc-forgot-password",
              label: t("agentHeaderSection.agentSideMenu.changePassword"),
              icon: <VpnKeyOutlinedIcon fontSize="small" color="primary" />,
            },
            // {
            //   value: "support",
            //   label: t("support"),
            //   icon: <SupportMobileIcon fontSize="small" style={{ color: "#ffffff" }} />,
            // },
            {
              value: "logout",
              label: t("agentHeaderSection.agentSideMenu.logout"),
              icon: <LogoutIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
          ];
          setMobileMenuList(MenuListBank);
          break;
        default:
          const MenuListDefault = [
            // {
            //   value: "cfc-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.home"),
            //   icon: <HomeOutlinedIcon fontSize="small" color="primary" />,
            // },
            {
              value: "cfc-profile",
              label: t("agentHeaderSection.agentSideMenu.profile"),
              icon: <ProfileIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
            // {
            //   value: "cfc-application-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.applicationDashboard"),
            //   icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
            // },
            {
              value: "cfc-applicants-dashboard",
              label: t("Applicants Dashboard"),
              icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
            // {
            //   value: "cfc-analytics-dashboard",
            //   label: t("agentHeaderSection.agentSideMenu.analytics"),
            //   icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
            // },
            {
              value: "cfc-applicants-analytics-dashboard",
              label: t("Applicant Analytics"),
              icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
            },
            {
              value: "cfc-upload-leads",
              label: t("agentHeaderSection.agentSideMenu.uploadLeads"),
              icon: <CloudUploadOutlinedIcon fontSize="small" color="primary" />,
            },

            {
              value: "cfc-forgot-password",
              label: t("agentHeaderSection.agentSideMenu.changePassword"),
              icon: <VpnKeyOutlinedIcon fontSize="small" color="primary" />,
            },
            // {
            //   value: "support",
            //   label: t("support"),
            //   icon: <SupportMobileIcon fontSize="small" style={{ color: "#ffffff" }} />,
            // },
            {
              value: "logout",
              label: t("agentHeaderSection.agentSideMenu.logout"),
              icon: <LogoutIcon fontSize="small" style={{ color: "#ffffff" }} />,
            },
          ];
          setMobileMenuList(MenuListDefault);
      }
    }
  }, [agentProfile, t]);

  // const mobileMenuList = [
  //   // {
  //   //   value: "cfc-dashboard",
  //   //   label: t("agentHeaderSection.agentSideMenu.home"),
  //   //   icon: <HomeOutlinedIcon fontSize="small" color="primary" />,
  //   // },
  //   {
  //     value: "cfc-profile",
  //     label: t("agentHeaderSection.agentSideMenu.profile"),
  //     icon: <ProfileIcon fontSize="small" style={{ color: "#ffffff" }} />,
  //   },
  //   // {
  //   //   value: "cfc-application-dashboard",
  //   //   label: t("agentHeaderSection.agentSideMenu.applicationDashboard"),
  //   //   icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
  //   // },
  //   {
  //     value: "cfc-applicants-dashboard",
  //     label: t("Applicants Dashboard"),
  //     icon: <DashboardIcon fontSize="small" style={{ color: "#ffffff" }} />,
  //   },
  //   // {
  //   //   value: "cfc-analytics-dashboard",
  //   //   label: t("agentHeaderSection.agentSideMenu.analytics"),
  //   //   icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
  //   // },
  //   {
  //     value: "cfc-applicants-analytics-dashboard",
  //     label: t("Applicant Analytics"),
  //     icon: <PieChartOutlinedIcon fontSize="small" color="primary" />,
  //   },
  //   {
  //     value: "cfc-upload-leads",
  //     label: t("agentHeaderSection.agentSideMenu.uploadLeads"),
  //     icon: <CloudUploadOutlinedIcon fontSize="small" color="primary" />,
  //   },

  //   {
  //     value: "cfc-forgot-password",
  //     label: t("agentHeaderSection.agentSideMenu.changePassword"),
  //     icon: <VpnKeyOutlinedIcon fontSize="small" color="primary" />,
  //   },
  //   // {
  //   //   value: "support",
  //   //   label: t("support"),
  //   //   icon: <SupportMobileIcon fontSize="small" style={{ color: "#ffffff" }} />,
  //   // },
  //   {
  //     value: "logout",
  //     label: t("agentHeaderSection.agentSideMenu.logout"),
  //     icon: <LogoutIcon fontSize="small" style={{ color: "#ffffff" }} />,
  //   },
  // ];

  const [drawerState, setDrawerState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Box p={1} flexGrow={1}>
          <img src={Logo} alt={"Logo"} className={classes.logo} />
        </Box>
        {!localStorage.getItem("agentjwtToken") && (
          <ListItem>
            <ListItemIcon style={{ minWidth: 30 }}>
              <SupportMobileIcon
                fontSize="small"
                style={{ color: "#ffffff" }}
              />
            </ListItemIcon>
            <ListItemText primary={t("headerSection.support")} />
          </ListItem>
        )}
        {localStorage.getItem("agentjwtToken") && (
          <>
            {mobileMenuList.map((item) => (
              <ListItem
                button
                key={item.value + `MOB`}
                onClick={() => redirectPages(item.value)}
              >
                <React.Fragment>
                  <ListItemIcon style={{ minWidth: 30 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </React.Fragment>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </div>
  );

  return (
    <>
      <Box flexGrow={1}>
        <AppBar position="sticky" className={classes.root}>
          <Toolbar>
            {/* <Hidden only={["sm", "md", "lg"]}>
              <IconButton
                onClick={toggleDrawer("right", true)}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon style={{ color: "black" }} />
              </IconButton>
            </Hidden> */}
            <Box flexGrow={1}>
              <img src={Logo} alt={"Logo"} className={classes.logo} />
            </Box>
            <div className={classes.rightSection}>
              {!localStorage.getItem("agentjwtToken") && (
                <Hidden only="xs">
                  <Button
                    startIcon={<SupportIcon />}
                    size="small"
                    className={classes.buttonText}
                  >
                    {t("support")}
                  </Button>
                </Hidden>
              )}
              {localStorage.getItem("agentjwtToken") && (
                <Hidden only="xs">
                  <Button color="primary" variant="text" type="button" onClick={() => history.push("/cfc-profile")}>{agentProfile?.FirstName}( {agentProfile?.AgentCompany} )</Button>
                </Hidden>
              )}

              {localStorage.getItem("agentjwtToken") && (
                <Hidden only="xs">
                  <a href="/" target="_blank">
                    {" "}
                    <Button
                      startIcon={<PersonAddOutlinedIcon />}
                      size="small"
                      color="primary"
                      className={classes.buttonText}
                    >
                      {t("registerApplication")}
                    </Button>
                  </a>
                </Hidden>
              )}
              {/* <Button
                aria-controls="langMenu"
                aria-haspopup="true"
                variant="contained"
                size="small"
                onClick={(e) => handleOnLangItem(e)}
                startIcon={<LanguageTranslateIcon fontSize="large" />}
                endIcon={<ExpandMoreIcon />}
                disableElevation
              >
                <Hidden only="xs">
                  <span className={classes.buttonText}>
                    {languages[selectedIndex].label}
                  </span>
                </Hidden>
                <Hidden only={["sm", "md", "lg"]}>
                  {languages[selectedIndex].code}
                </Hidden>
              </Button> */}
              <Menu
                id="langMenu"
                anchorEl={anchorElLang}
                keepMounted
                open={Boolean(anchorElLang)}
                onClose={handleOnLangMenuClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
              >
                {languages.map((item, index) => (
                  <MenuItem
                    key={item.code}
                    disabled={index === selectedIndex}
                    selected={index === selectedIndex}
                    onClick={() => handleOnLangMenuItem(item.code, index)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
              {/* {localStorage.getItem("agentjwtToken") && (
                <>
                  {currentPathName === "/" ||
                    currentPathName === "/signup" ? null : (
                    <Hidden only="xs">
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon={<ProfileIcon />}
                        endIcon={<ExpandMoreIcon />}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        {localStorage.getItem("agentId")}
                      </Button>
                    </Hidden>
                  )}
                </>
              )} */}
              {/* <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    // width: "23ch",
                    // marginTop: 35,
                  },
                }}
              >
                {profileMenuList.map((item, index) => (
                  <MenuItem
                    key={item.value}
                    onClick={() => handleOnProfileMenuItem(item.value)}
                  >
                    <ListItemIcon style={{ minWidth: 30 }}>
                      {item.icon}
                    </ListItemIcon>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu> */}
              {localStorage.getItem("agentjwtToken") && (
                <IconButton
                  onClick={toggleDrawer("right", true)}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon style={{ color: "black" }} />
                </IconButton>
              )}
            </div>
          </Toolbar>
          <div>
            <React.Fragment key={"right"}>
              <SwipeableDrawer
                anchor={"right"}
                open={drawerState["right"]}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
              >
                {list("right")}
              </SwipeableDrawer>
            </React.Fragment>
          </div>
        </AppBar>
      </Box>
    </>
  );
};

export default AgentHeader;
