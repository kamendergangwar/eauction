import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid, Button, Typography, Box, Paper } from "@material-ui/core";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import moment from "moment";
import { AgentAnlyDashboardStyles } from "../AgentAnlyDashboard.styles";
import NoRecentActivityIcon from "../../../../assets/NoRecentActivityIcon.svg"

const recentActList = [{
  activityId: "#00123458",
  activity: "Registered New Applicant",
  date: "12/07 at 11:30 PM",
}]

const RecentActivityCard = (props) => {
  const { agentAnalDashboardData } = props;
  const classes = AgentAnlyDashboardStyles();
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const history = useHistory();
  const [lastFiveNotifications, setLastFiveNotifications] = useState([]);

  useEffect(() => {
    if (Array.isArray(agentAnalDashboardData.getAgentDashboardNotifications)) {
      let tempNotifiData = [];
      let today_date = moment(new Date()).format("DD/MM/yyyy");
      for (let i = 0; i < agentAnalDashboardData.getAgentDashboardNotifications.length; i++) {
        const element = agentAnalDashboardData.getAgentDashboardNotifications[i];
        let only_date = moment(element.CreatedAt).format("DD/MM");
        if (today_date == moment(element.CreatedAt).format("DD/MM/yyyy")) {
          only_date = "Today";
        }
        let formated_date = only_date + " at " + moment(element.CreatedAt).format("MM:SS a");
        let new_obj = {
          ...element,
          formatedDate: formated_date
        };
        tempNotifiData.push(new_obj);
      }
      setLastFiveNotifications(tempNotifiData);
    }
  }, [agentAnalDashboardData]);

  return (
    <Box component={Paper} p={1}>
      <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("recentActivityCard.title")}</Typography>
      {lastFiveNotifications.length == 0 &&
        <Box className={classes.errorMsgBox}>
          <Box textAlign="center">
            <img src={NoRecentActivityIcon} />
            <Typography>{t("recentActivityCard.errorMsgTxt")}</Typography>
          </Box>
        </Box>
      }
      <Box>
        {lastFiveNotifications.map((element, index) => (
          <Box key={index}>
            <Box paddingY={1}>
              <Grid container alignItems="center" className={classes.activityList} key={index}>
                <Grid item>
                  <PersonAddOutlinedIcon />
                </Grid>
                <Grid item xs>
                  <Typography className={classes.activityTxt}>{element.MsgBody || "--"} <strong>#{element.ApplicantId || "--"}</strong></Typography>
                  <Typography className={classes.actDatePreview}>{element.formatedDate || "--"}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
      <Box textAlign="center" paddingY={2}>
        <Button color="primary" onClick={() => history.push("/agent-recent-activities")}>View All</Button>
      </Box>
    </Box >
  );
};

export default RecentActivityCard;
