import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Switch from '@material-ui/core/Switch';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import { AgentAnlyDashboardStyles } from "../AgentAnlyDashboard.styles";
import ApplicationsCountCard from "../ApplicationsCountCard/ApplicationsCountCard";
import ReservationCountCard from "../ReservationCountCard/ReservationCountCard";
import ProgressChartCard from "../ProgressChartCard/ProgressChartCard";
import ProjectOverviewCard from "../ProjectOverviewCard/ProjectOverviewCard";
import RecentActivityCard from "../RecentActivityCard/RecentActivityCard";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from "react-redux";
import { getAgentAnalDashboard, agentApplicantsSelector } from "../../../../redux/features/agent/AgentAnalDashboardSlice";
import moment from "moment";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const AnalyticsDashboard = (props) => {
  const { width } = props;
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const dispatch = useDispatch();
  const {
    isFetchingAgentAnalDashboard,
    isSuccessResAgentAnalDashboard,
    isErrorAgentAnalDashboard,
    errorMsgAgentAnalDashboard,
    agentAnalDashboardData,
  } = useSelector(agentApplicantsSelector);
  const classes = AgentAnlyDashboardStyles();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [avtiveSchemeIs, setAvtiveSchemeIs] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const handleFromDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedToDate(date);
  };


  useEffect(() => {
    // let params = "time_range=date_range&from_date=2021-08-09&to_date=2021-08-10";
    let params = "time_range=";
    let from_date = moment(selectedFromDate).format("YYYY-MM-DD");
    let to_date = moment(selectedToDate).format("YYYY-MM-DD");
    if (selectedPeriod === "all") {
      params += "";
    }else if(selectedPeriod === "this_year"){
       params += "this_year";
    }else if(selectedPeriod === "last_week"){
      params += "last_week";
    }else if(selectedPeriod === "last_2_week"){
      params += "last_2_week";
    }else if(selectedPeriod === "last_month"){
      params += "last_month";
    }
     else  {
      if(from_date != "Invalid date" && to_date != "Invalid date") {
        params += "date_range&from_date=" + from_date + "&to_date=" + to_date;
      }
    }
    if (selectedProject) {
      params += "&project_id=" + selectedProject;
    }
    let thisYear = new Date().getFullYear();
    params += "&project_overview_application_status=1&bargraph_year="+thisYear;
    if (avtiveSchemeIs) {
      params += "&activescheme=0&schemeid=1";
    } else {
      params += "&activescheme=1&schemeid=false";
    }
    localStorage.setItem("analDashboardApiParam", params);
    dispatch(getAgentAnalDashboard());
  }, [dispatch, t, selectedPeriod, selectedFromDate, selectedToDate, selectedProject, avtiveSchemeIs]);

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedFromDate(null);
      setSelectedToDate(null);
      setSelectedPeriod(newPeriod);
    }
  };

  // useEffect(() => {
  //   let newObj = {
  //     type: "completed",
  //     status: null
  //   }
  //   //console.log("getItemBefore", localStorage.getItem("appDashboardFiltersParam"));
  //   localStorage.setItem("appDashboardFiltersParam", JSON.stringify(newObj));
  // })

  const switchHandleChange = (event) => {
    setAvtiveSchemeIs(!avtiveSchemeIs);
  };

  return (
    <div className={classes.root}>
      {isFetchingAgentAnalDashboard && <Loading isOpen={isFetchingAgentAnalDashboard} />}
      {isErrorAgentAnalDashboard && (
        <AlertBox severity="error">{errorMsgAgentAnalDashboard}</AlertBox>
      )}
      {/* <Grid container spacing={width === "xs" || width === "sm" ? 0 : 3}> */}
      <Box component={Paper} className={classes.container}>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6" color="primary">{t("analyticsDashboard.title")}</Typography>
            <Typography><small>{t("analyticsDashboard.subTitle")}</small></Typography>
          </Grid>
          <Grid item>
            <label htmlFor="activeScheme" className={classes.activeSchmTxt}>{t("analyticsDashboard.activeSchemeTxt")}</label>
            <Switch
              id="activeScheme"
              checked={avtiveSchemeIs}
              onChange={switchHandleChange}
              color="primary"
              name="avtiveSchemeIs"
              inputProps={{ 'aria-label': 'Active Scheme' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Box paddingBottom={2} paddingTop={2}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Box>
                    <ToggleButtonGroup
                      value={selectedPeriod}
                      exclusive
                      onChange={handlePeriodChange}
                      aria-label="Data Period"
                      className={classes.toggleBtnsContainer}
                    >
                      <ToggleButton value="all" aria-label="All">
                        {t("toggleButtonGroup.button1")}
                      </ToggleButton>
                      <ToggleButton value="last_week" aria-label="Last Week">
                        {t("toggleButtonGroup.button2")}
                      </ToggleButton>
                      <ToggleButton value="last_2_week" aria-label="Last 2 Week">
                        {t("toggleButtonGroup.button3")}
                      </ToggleButton>
                      <ToggleButton value="last_month" aria-label="Last Month">
                        {t("toggleButtonGroup.button4")}
                      </ToggleButton>
                      <ToggleButton value="this_year" aria-label="This Year">
                        {t("toggleButtonGroup.button5")}
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Grid>
                <Grid item>
                  {/* <Button variant="contained" size="small" startIcon={<CalendarTodayOutlinedIcon />}> {t("filterByDateTxt")}</Button> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="from-date-picker-dialog"
                      label={t("dateFilter.fromDateLabel")}
                      format="MMM-dd-yyyy"
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      className={classes.datePickerCont}
                      maxDate={new Date()}
                      invalidDateMessage=""
                      InputLabelProps={{ shrink: true }}  
                    />
                    <KeyboardDatePicker
                      id="to-date-picker-dialog"
                      label={t("dateFilter.toDateLabel")}
                      format="MMM-dd-yyyy"
                      value={selectedToDate}
                      onChange={handleToDateChange}
                      className={classes.datePickerCont}
                      maxDate={new Date()}
                      invalidDateMessage=""
                      InputLabelProps={{ shrink: true }} 
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Box>
            {isSuccessResAgentAnalDashboard &&
              <Grid container spacing={2}>
                <Grid item sm={4}>
                  <ApplicationsCountCard cardData={{ title: t("appCardGroup.card1"), count: agentAnalDashboardData.TotalApplications, cardType: "total" }} />
                </Grid>
                <Grid item sm={4}>
                  <ApplicationsCountCard cardData={{ title: t("appCardGroup.card2"), count: agentAnalDashboardData.TotalSubmitted, cardType: "submitted" }} agentAnalDashboardData={agentAnalDashboardData} />
                </Grid>
                <Grid item sm={4}>
                  <ApplicationsCountCard cardData={{ title: t("appCardGroup.card3"), count: agentAnalDashboardData.ApplicationProgress, cardType: "inProgress" }} agentAnalDashboardData={agentAnalDashboardData} />
                </Grid>
              </Grid>
            }
            <Box paddingTop={2}>
              {isSuccessResAgentAnalDashboard &&
                <ProgressChartCard agentAnalDashboardData={agentAnalDashboardData} />
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            {isSuccessResAgentAnalDashboard &&
              <ReservationCountCard agentAnalDashboardData={agentAnalDashboardData} 
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject} />
            }
          </Grid>
        </Grid>

        <Box paddingTop={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              {isSuccessResAgentAnalDashboard &&
                <ProjectOverviewCard agentAnalDashboardData={agentAnalDashboardData} />
              }
            </Grid>
            <Grid item xs={12} sm={3}>
              {isSuccessResAgentAnalDashboard &&
                <RecentActivityCard agentAnalDashboardData={agentAnalDashboardData} />
              }
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default withWidth()(AnalyticsDashboard);
