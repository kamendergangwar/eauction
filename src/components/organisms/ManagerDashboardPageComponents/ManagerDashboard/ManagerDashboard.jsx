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
import { ManagerDashboardStyles } from "../ManagerDashboard.styles";
import ApplicationsCountCard from "../ApplicationsCountCard/ApplicationsCountCard";
import ReservationCountCard from "../ReservationCountCard/ReservationCountCard";
import ProgressChartCard from "../ProgressChartCard/ProgressChartCard";
import ComparitiveAnalysisCard from "../ComparitiveAnalysisCard/ComparitiveAnalysisCard";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from "react-redux";
import { getManagerDashboard, managerDashboardSelector } from "../../../../redux/features/agent/AgentManagerDashboardSlice";
import moment from "moment";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const ManagerDashboard = (props) => {
  const { width } = props;
  const { t } = useTranslation("ManagerDashboardPageTrans");
  const classes = ManagerDashboardStyles();
  const dispatch = useDispatch();
  const {
    isFetchingManagerDashboard,
    isSuccessResManagerDashboard,
    isErrorManagerDashboard,
    errorMsgManagerDashboard,
    managerDashboardData,
  } = useSelector(managerDashboardSelector);
  const [selectedPeriod, setSelectedPeriod] = useState("this_year");
  const [avtiveSchemeIs, setAvtiveSchemeIs] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date('2021-08-09'));
  const [selectedToDate, setSelectedToDate] = useState(new Date('2021-08-10'));
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
    if (selectedPeriod) {
      params += selectedPeriod;
    } else {
      params += "date_range&from_date=" + from_date + "&to_date=" + to_date;
    }
    if (selectedProject) {
      params += "&project_id=" + selectedProject;
    }
    params += "&project_overview_application_status=1&bargraph_year=2021";
    if (avtiveSchemeIs) {
      params += "&activescheme=0&schemeid=1";
    } else {
      params += "&activescheme=1&schemeid=false";
    }

    localStorage.setItem("managerDashboardApiParam", params);
    dispatch(getManagerDashboard());
  }, [dispatch, t, selectedPeriod, selectedFromDate, selectedToDate, selectedProject, avtiveSchemeIs]);

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
    }
  };

  const switchHandleChange = (event) => {
    setAvtiveSchemeIs(!avtiveSchemeIs);
  };

  return (
    <div className={classes.root}>
      {isFetchingManagerDashboard && <Loading isOpen={isFetchingManagerDashboard} />}
      {isErrorManagerDashboard && (
        <AlertBox severity="error">{errorMsgManagerDashboard}</AlertBox>
      )}
      {/* <Grid container spacing={width === "xs" || width === "sm" ? 0 : 3}> */}
      <Box component={Paper} className={classes.container}>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6" color="primary">{t("managerDashboard.title")}</Typography>
            <Typography><small>{t("managerDashboard.subTitle")}</small></Typography>
          </Grid>
          <Grid item>
            <label htmlFor="activeScheme" className={classes.activeSchmTxt}>{t("managerDashboard.activeSchemeTxt")}</label>
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
                      label="From Date"
                      format="MMM-dd-yyyy"
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      className={classes.datePickerCont}
                    />
                    <KeyboardDatePicker
                      id="to-date-picker-dialog"
                      label="To Date"
                      format="MMM-dd-yyyy"
                      value={selectedToDate}
                      onChange={handleToDateChange}
                      className={classes.datePickerCont}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Box>
            {isSuccessResManagerDashboard &&
              <Grid container spacing={2}>
                <Grid item sm={4}>
                  <ApplicationsCountCard cardData={{ title: t("appCardGroup.card1"), count: managerDashboardData.TotalApplications, cardType: "total" }} />
                </Grid>
                <Grid item sm={4}>
                  <ApplicationsCountCard cardData={{ title: t("appCardGroup.card2"), count: managerDashboardData.TotalSubmitted, cardType: "submitted" }} />
                </Grid>
                <Grid item sm={4}>
                  <ApplicationsCountCard cardData={{ title: t("appCardGroup.card3"), count: managerDashboardData.ApplicationProgress, cardType: "totalEarnings" }} />
                </Grid>
              </Grid>
            }
            <Box paddingTop={2}>
              {isSuccessResManagerDashboard &&
                <ProgressChartCard managerDashboardData={managerDashboardData} />
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            {isSuccessResManagerDashboard &&
              <ReservationCountCard managerDashboardData={managerDashboardData} selectedProject={selectedProject}
                setSelectedProject={setSelectedProject} />
            }
          </Grid>
        </Grid>
        <Box paddingTop={2}>
          {isSuccessResManagerDashboard &&
            <ComparitiveAnalysisCard managerDashboardData={managerDashboardData} avtiveSchemeIs={avtiveSchemeIs} />
          }
        </Box>
      </Box>
    </div>
  );
};

export default withWidth()(ManagerDashboard);
