import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AgentProjectsReportsStyles } from "../AgentProjectsReports.styles";
import { useSelector, useDispatch } from "react-redux";
import { getChartProjectOverviewDetails, agentApplicantsSelector } from "../../../../redux/features/agent/AgentAnalDashboardSlice";

/* const chartData = [
  { name: '22 - Taloja', value: 31 },
  { name: '42 - Kharghar', value: 10 },
  { name: '40 - Nerul', value: 12 },
  { name: '23 - Taloja', value: 20 },
  { name: '20 - Kharghar', value: 4 },
  { name: '45 - Nerul', value: 16 },
]; */
const COLORS = ['#00DADA', '#07B7EE', '#E62677', '#F2CC07', '#B2EE07', '#0BEB57'];

const CustomTooltip = ({ payload }) => {
  if (payload.length) {
    return (
      <div className="chartCustomTooltip">
        <p className="chartTitle" style={{ color: payload[0].payload.fill }}>{payload[0].name}</p>
        <p className="chartBody">{payload[0].payload.applications} Applications <span style={{ color: payload[0].payload.fill }}>{payload[0].value}%</span></p>
      </div>
    );
  }
  return null;
};

const ProjectOverviewChart = (props) => {
  // const { agentProjectOverviewData } = props;
  const classes = AgentProjectsReportsStyles();
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const dispatch = useDispatch();
  const {
    isFetchingChartProjectOverview,
    isSuccessResChartProjectOverview,
    isErrorChartProjectOverview,
    errorMsgChartProjectOverview,
    chartProjectOverviewData,
  } = useSelector(agentApplicantsSelector);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // let params = "perpage=10&page=1&sortby=asc&search=1&activescheme=1&schemeid=false";
    let params = "search=&sortby=asc&activescheme=1&schemeid=false&perpage=&page=1";
    /* if (sortByParam) {
      params += "&sortby=" + sortByParam;
    }
    if (avtiveSchemeIs) {
      params += "&activescheme=0&schemeid=1";
    } else {
      params += "&activescheme=1&schemeid=false";
    } */
    // params += "search=&sortby=asc&activescheme=0&schemeid=1&perpage=&page=1";

    localStorage.setItem("chartProjectOverviewApiParam", params);
    dispatch(getChartProjectOverviewDetails());
  }, [dispatch, t]);

  useEffect(() => {
    if (isSuccessResChartProjectOverview) {
      console.log("chartProjectOverviewData", chartProjectOverviewData);
      if (chartProjectOverviewData?.ProjectList.length > 0) {
        var resultData2 = chartProjectOverviewData.ProjectList;
        let modifyData = [];
        for (let e = 0; e < resultData2.length; e++) {
          const element = resultData2[e];
          let newObj = {
            name: element.ProjectName,
            applications: element.Completed,
            value: parseFloat(((element.Completed / chartProjectOverviewData.TotalProjects) * 100).toFixed(1)),
          };
          modifyData.push(newObj);
        }
        setChartData(modifyData);
      }
    }
  }, [chartProjectOverviewData]);

  return (
    <Box component={Paper} p={1}>
      <Typography variant="h6" color="primary" className={classes.chartTotalLanel}>{t("reportsPage.chartComponent.totalAppLabel")} : <strong>{chartProjectOverviewData.Total}</strong></Typography>
      <Box className={classes.chartContainer}>
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            cx={120}
            cy={120}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
        <Box className={classes.chartTotalBox}>
          <Typography variant="h6">{chartProjectOverviewData.TotalProjects}</Typography>
          <Typography>{t("reportsPage.chartComponent.chartProjectsLabel")}</Typography>
        </Box>
      </Box>
      <Box paddingX={3} paddingBottom={3}>
        <Grid container alignItems="center" justify="space-between" style={{ marginBottom: 16 }}>
          <Grid item>
            <Typography className={classes.legendsDotTxt}>{t("reportsPage.chartComponent.totalSubmittedLabel")} :</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.legendsCountTxt}><strong>{chartProjectOverviewData.TotalSubmitted}</strong></Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography className={classes.legendsDotTxt}>{t("reportsPage.chartComponent.appInprogressLabel")} :</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.legendsCountTxt}><strong>{chartProjectOverviewData.ApplicationInProgress}</strong></Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProjectOverviewChart;
