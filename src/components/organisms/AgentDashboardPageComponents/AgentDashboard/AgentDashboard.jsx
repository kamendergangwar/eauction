import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import ImportantDates from "../ImportantDates/ImportantDates";
import TopNews from "../TopNews/TopNews";
import Notifications from "../Notifications/Notifications";
import AgentProjectCard from "../AgentProjectCard/AgentProjectCard";
import {getNotificationForDashboard,notificationsSelector} from "../../../../redux/features/dashboard/NotificationsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  topContainer: {
    height: "450px",
    [theme.breakpoints.only("xs")]: {
      height: "auto",
    },
  },
  bottomContainer: {
    // backgroundColor: "yellow",
    // height: "40vh",
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2)
    },
  },
  scrollBox: {
    height: "100%",
    overflow: "auto"
  },
  fullHeightResAuto: {
    height: "100%",
    [theme.breakpoints.only("xs")]: {
      height: "auto",
    },
  }
}));

const AgentDashboard = (props) => {
  const { width } = props;
  const classes = useStyles();
  const dispatch = useDispatch();


  

  

  return (
    <div className={classes.root}>
      <Box component={Paper} className={classes.topContainer}>
        <Grid container className={classes.fullHeightResAuto}>
          <Grid item xs={12} sm={3} className={classes.fullHeightResAuto}>
            <Box p={1} className={classes.scrollBox}>
              <ImportantDates />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.fullHeightResAuto}>
            <Box
              p={1}
              bgcolor="grey.100"
              borderLeft={width === "xs" ? 0 : 1}
              borderRight={width === "xs" ? 0 : 1}
              style={{ borderColor: "grey" }}
              className={classes.scrollBox}
            >
              <TopNews />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.fullHeightResAuto}>
            <Box p={1} className={classes.scrollBox}>
              <Notifications />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box component={Paper} className={classes.bottomContainer}>
        <AgentProjectCard />
      </Box>
    </div>
  );
};

export default withWidth()(AgentDashboard);
