import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Grid, Button, Box, Paper, Typography } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import { RecentActivitiesNotificationsStyles } from "../RecentActivitiesNotifications.styles";
import { useSelector, useDispatch } from "react-redux";
import TablePagination from '@material-ui/core/TablePagination';
import { getAgentAllNotifications, agentApplicantsSelector } from "../../../../redux/features/agent/AgentAnalDashboardSlice";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import moment from "moment";
import NoRecentActivityIcon from "../../../../assets/NoRecentActivityIcon.svg"
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useLocation } from "react-router-dom";
import { ApplicationDtlsIcon, ApplicationDownloadIcon, BlackBackArrowIcon, SourceQuestionIcon } from "../../../atoms/SvgIcons/SvgIcons";

const RecentActivitiesNotifications = (props) => {
  const history   = useHistory();
  const { width } = props;
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const dispatch = useDispatch();
  const {
    isFetchingAgentAllNotifi,
    isSuccessResAgentAllNotifi,
    isErrorAgentAllNotifi,
    errorMsgAgentAllNotifi,
    agentAllNotifiData,
  } = useSelector(agentApplicantsSelector);
  const classes = RecentActivitiesNotificationsStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [earlierNotificationList, setEarlierNotificationList] = React.useState([]);
  const [todaysNotificationList, setTodaysNotificationList] = React.useState([]);
  const [tableRowCount, setTableRowCount] = useState(0);

  useEffect(() => {
    // let params = "perpage=10&page=1&sortby=desc";
    let params = "sortby=desc";
    params += "&perpage=" + rowsPerPage + "&page=" + (page + 1);
    localStorage.setItem("agentAllNotifiApiParam", params);
    dispatch(getAgentAllNotifications());
  }, [dispatch, t, page, rowsPerPage]);

  useEffect(() => {
    if (Array.isArray(agentAllNotifiData.data)) {
      let tempTodaysNotifiData = [];
      let tempEarlierNotifiData = [];
      let today_date = moment(new Date()).format("DD/MM/yyyy");
      for (let i = 0; i < agentAllNotifiData.data.length; i++) {
        const element = agentAllNotifiData.data[i];
        let only_date = moment(element.CreatedAt).format("DD/MM");
        if (today_date == moment(element.CreatedAt).format("DD/MM/yyyy")) {
          only_date = "Today";
          let formated_date = only_date + " at " + moment(element.CreatedAt).format("MM:SS a");
          let new_obj = {
            ...element,
            formatedDate: formated_date
          };
          tempTodaysNotifiData.push(new_obj);
        } else {
          let formated_date = only_date + " at " + moment(element.CreatedAt).format("MM:SS a");
          let new_obj = {
            ...element,
            formatedDate: formated_date
          };
          tempEarlierNotifiData.push(new_obj);
        }
      }
      setTodaysNotificationList(tempTodaysNotifiData);
      setEarlierNotificationList(tempEarlierNotifiData);
    }
  }, [agentAllNotifiData]);

  const handleChangePage = (event, newPage) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(newPage);
  };

  return (
    <div className={classes.root}>
      {isFetchingAgentAllNotifi && <Loading isOpen={isFetchingAgentAllNotifi} />}
      {isErrorAgentAllNotifi && (
        <AlertBox severity="error">{errorMsgAgentAllNotifi}</AlertBox>
      )}
      {/* <Grid container spacing={width === "xs" || width === "sm" ? 0 : 3}> */}
      <Box component={Paper} className={classes.container}>
        <IconButton
          className={classes.backBtn}
          onClick={() => history.push("/cfc-analytics-dashboard")}
        >
          <BlackBackArrowIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("recentActivityCard.title")}</Typography>
        <Typography variant="h6" color="primary" className={classes.subTitle}>{t("Today")}</Typography>
        {todaysNotificationList.length == 0 &&
          <Box className={classes.errorMsgBox}>
            <Box textAlign="center">
              <img src={NoRecentActivityIcon} />
              <Typography>{t("recentActivityCard.errorMsgTxt")}</Typography>
            </Box>
          </Box>
        }
        <Box marginBottom={3}>
          {todaysNotificationList.map((element, index) => (
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
        <Typography variant="h6" color="primary" className={classes.subTitle}>{t("Earlier")}</Typography>
        {earlierNotificationList.length == 0 &&
          <Box className={classes.errorMsgBox}>
            <Box textAlign="center">
              <img src={NoRecentActivityIcon} />
              <Typography>{t("recentActivityCard.errorMsgTxt")}</Typography>
            </Box>
          </Box>
        }
        <Box>
          {earlierNotificationList.map((element, index) => (
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
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={tableRowCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </div>
  );
};

export default withWidth()(RecentActivitiesNotifications);
