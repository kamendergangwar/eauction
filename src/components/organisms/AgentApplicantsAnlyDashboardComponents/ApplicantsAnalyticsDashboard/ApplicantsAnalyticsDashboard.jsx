import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Switch from '@material-ui/core/Switch';
import { AgentAnlyDashboardStyles } from "../AgentAnlyDashboard.styles";
import ApplicationsCountCard from "../ApplicationsCountCard/ApplicationsCountCard";
// import ReservationCountCard from "../ReservationCountCard/ReservationCountCard";
import ProgressChartCard from "../ProgressChartCard/ProgressChartCard";
// import ProjectOverviewCard from "../ProjectOverviewCard/ProjectOverviewCard";
// import RecentActivityCard from "../RecentActivityCard/RecentActivityCard";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from "react-redux";
import { agentApplicantsSelector, getAgentApplicantsAnalDashboard } from "../../../../redux/features/agent/AgentAnalDashboardSlice";
import moment from "moment";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { Button, IconButton } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { ApiEndPoint } from "../../../../utils/Common";

const ApplicantsAnalyticsDashboard = (props) => {
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const dispatch = useDispatch();
  const {
    isFetchingAgentApplicantsAnalDashboard,
    isSuccessResAgentApplicantsAnalDashboard,
    isErrorAgentApplicantsAnalDashboard,
    errorMsgAgentApplicantsAnalDashboard,
    agentApplicantsAnalDashboardData,
  } = useSelector(agentApplicantsSelector);
  const classes = AgentAnlyDashboardStyles();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [avtiveSchemeIs, setAvtiveSchemeIs] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [pdfLoading, setPdfLoading] = React.useState(false);

  const handleFromDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedToDate(date);
  };

  const downloadApplicantReport = () => {

    let start_date = moment(selectedFromDate).format("YYYY-MM-DD");
    let end_date = moment(selectedToDate).format("YYYY-MM-DD");
    let params="";

    if(start_date != "Invalid date" && end_date != "Invalid date") {
      params += "?start_date=" + start_date + "&end_date=" + end_date;
    }
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/AgentApplicants/GetApplicantsRecord/${localStorage.getItem('agentcode')}${params}`;
    fetch(fileUrl, {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("agentjwtToken"),
        },
    }).then((response) => response.blob()).then((blob) => {
        setPdfLoading(false);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ApplicantsRecord.csv';
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
        setPdfLoading(false);
        alert("Applicants Record not found");
    });
  };


  useEffect(() => {
    // let params = "time_range=date_range&from_date=2021-08-09&to_date=2021-08-10";
    let params = "time_range=";
    let start_date = moment(selectedFromDate).format("YYYY-MM-DD");
    let end_date = moment(selectedToDate).format("YYYY-MM-DD");
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
      if(start_date != "Invalid date" && end_date != "Invalid date") {
        params += "date_range&start_date=" + start_date + "&end_date=" + end_date;
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
    dispatch(getAgentApplicantsAnalDashboard());
  }, [dispatch, t, selectedPeriod, selectedFromDate, selectedToDate, selectedProject, avtiveSchemeIs]);

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedFromDate(null);
      setSelectedToDate(null);
      setSelectedPeriod(newPeriod);
    }
  };

  const switchHandleChange = (event) => {
    setAvtiveSchemeIs(!avtiveSchemeIs);
  };

  return (
    <div className={classes.root}>
      {isFetchingAgentApplicantsAnalDashboard && <Loading isOpen={isFetchingAgentApplicantsAnalDashboard} />}
      {isErrorAgentApplicantsAnalDashboard && (
        <AlertBox severity="error">{errorMsgAgentApplicantsAnalDashboard}</AlertBox>
      )}
      {/* <Grid container spacing={width === "xs" || width === "sm" ? 0 : 3}> */}
      <Box component={Paper} className={classes.container}>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6" color="primary">{t("My Applicants Analytics Dashboard")}</Typography>
            <Typography><small>{t("analyticsDashboard.subTitle")}</small></Typography>
          </Grid>
          <Grid item style={{alignSelf: 'center'}}>
            <Box paddingRight={2}>
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
                </ToggleButtonGroup>
            </Box>
          </Grid>
          <Grid item>
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
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<GetApp />}
              onClick={downloadApplicantReport}
              style={{marginTop:10}}
            >
              Reports
            </Button>
            {/* <label htmlFor="activeScheme" className={classes.activeSchmTxt}>{t("analyticsDashboard.activeSchemeTxt")}</label>
            <Switch
              id="activeScheme"
              checked={avtiveSchemeIs}
              onChange={switchHandleChange}
              color="primary"
              name="avtiveSchemeIs"
              inputProps={{ 'aria-label': 'Active Scheme' }}
            /> */}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box paddingBottom={2} paddingTop={2}>
              {/* <Grid container alignItems="center" justify="space-between">
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
                    </ToggleButtonGroup>
                  </Box>
                </Grid>
                <Grid item>
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
              </Grid> */}
            </Box>
            {isSuccessResAgentApplicantsAnalDashboard &&
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <ApplicationsCountCard cardData={{ title: t("Total Applicants"), count: agentApplicantsAnalDashboardData.total_applicants_count, cardType: "total" }} />
                </Grid>
                <Grid item sm={3}>
                  <ApplicationsCountCard cardData={{ title: t("Registration Paid Applicants"), count: agentApplicantsAnalDashboardData.registration_paid_applicants_count, cardType: "submitted", detailsTitle:"Registration Fee Paid", detailsSubTitle:"Submitted Registration" }} agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
                </Grid>
                <Grid item sm={3}>
                  <ApplicationsCountCard cardData={{ title: t("Registration Fee Pending"), count: agentApplicantsAnalDashboardData.registration_fee_pending_count, cardType: "inProgress", detailsTitle:"Pending Registration Fee", detailsSubTitle:"Pending Registration" }} agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
                </Grid>
                <Grid item sm={3}>
                  <ApplicationsCountCard cardData={{ title: t("Doc Verification Completed"), count: agentApplicantsAnalDashboardData.doc_verification_completed_count, cardType: "submitted", detailsTitle:"Document Verification Completed", detailsSubTitle:"Document Verified" }} agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
                </Grid>
                <Grid item sm={3}>
                    <ApplicationsCountCard cardData={{ title: t("Doc Verification Pending"), count: agentApplicantsAnalDashboardData.doc_verification_pending_count, cardType: "inProgress", detailsTitle:"Document Verification Pending", detailsSubTitle:"Pending Doc Verification" }} agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
                </Grid>
                <Grid item sm={3}>
                    <ApplicationsCountCard cardData={{ title: t("Total Application(s)"), count: agentApplicantsAnalDashboardData.total_applications_count, cardType: "total" }} />
                </Grid>
                <Grid item sm={3}>
                    <ApplicationsCountCard cardData={{ title: t("Completed Applications"), count: agentApplicantsAnalDashboardData.succesfull_payment_count, cardType: "total" }} />
                </Grid>
                <Grid item sm={3}>
                  <ApplicationsCountCard cardData={{ title: t("Waiting For Loan"), count: agentApplicantsAnalDashboardData.waiting_for_loan, cardType: "total" }} />
                </Grid>
                
              </Grid>
            }
            <Box paddingTop={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {isSuccessResAgentApplicantsAnalDashboard &&
                            <ProgressChartCard agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
                        }
                    </Grid>
                    {/* <Grid item xs={12} sm={3}>
                        {isSuccessResAgentApplicantsAnalDashboard &&
                            <>
                                <Box height={'auto'}>
                                    <ApplicationsCountCard cardData={{ title: t("Doc Verification Pending"), count: agentApplicantsAnalDashboardData.doc_verification_pending_count, cardType: "inProgress", detailsTitle:"Document Verification Pending", detailsSubTitle:"Pending Doc Verification" }} agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
                                </Box>
                                <Box height={170} paddingY={2}>
                                    <ApplicationsCountCard cardData={{ title: t("Total Application(s)"), count: agentApplicantsAnalDashboardData.total_applications_count, cardType: "total" }} />
                                </Box>
                                <Box height={170} paddingY={2}>
                                    <ApplicationsCountCard cardData={{ title: t("Completed Applications"), count: agentApplicantsAnalDashboardData.succesfull_payment_count, cardType: "total" }} />
                                </Box>
                            </>
                        }
                    </Grid> */}
                </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box paddingTop={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              {/* {isSuccessResAgentApplicantsAnalDashboard &&
                <ProjectOverviewCard agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
              } */}
            </Grid>
            <Grid item xs={12} sm={3}>
              {/* {isSuccessResAgentApplicantsAnalDashboard &&
                <RecentActivityCard agentApplicantsAnalDashboardData={agentApplicantsAnalDashboardData} />
              } */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default withWidth()(ApplicantsAnalyticsDashboard);
