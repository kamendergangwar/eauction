import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
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
import { AgentAnlyDashboardStyles } from "../AgentAnlyDashboard.styles";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: props => ({
    borderRadius: 8,
    backgroundColor: props.barcolor
  })
}))(LinearProgress);

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
        <p className="chartBody">{payload[0].payload.applications} Applications <span style={{ color: payload[0].payload.fill }}>{payload[0].value}%1</span></p>
      </div>
    );
  }
  return null;
};

const ProjectOverviewCard = (props) => {
  const { agentAnalDashboardData } = props;
  const classes = AgentAnlyDashboardStyles();
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const history = useHistory();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    var modifyChartData = [];
    for (let x = 0; x < agentAnalDashboardData.ProjectListDropdown.length; x++) {
      const element = agentAnalDashboardData.ProjectListDropdown[x];
      const ele = agentAnalDashboardData.CategoryWiseProjectApplication[x];
      //console.log("element",agentAnalDashboardData.CategoryWiseProjectApplication[x].projectWiseTotalApplicationCount);
      var new_obj = {
        name: element.ProjectName,
        applications: agentAnalDashboardData.CategoryWiseProjectApplication[x].projectWiseTotalApplicationCount,
        value: parseFloat(((agentAnalDashboardData.CategoryWiseProjectApplication[x].projectWiseTotalApplicationCount / agentAnalDashboardData.TotalApplications) * 100).toFixed(1))
      };
      modifyChartData.push(new_obj);
    }
    setChartData(modifyChartData);
  }, [agentAnalDashboardData]);

  return (
    <Box component={Paper} p={1}>
      <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("projectOverviewCard.title")}</Typography>
      <Typography className={classes.subTitle}>{t("projectOverviewCard.subTitle")}</Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Box className={classes.chartContainer} marginRight={3}>
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
              <Typography variant="h6">{agentAnalDashboardData.TotalProjectCount}</Typography>
              <Typography>{t("Projects")}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm>
          <Box marginRight={3}>
            {chartData.map((entry, index) => (
              <Grid container alignItems="center" spacing={2} key={index}>
                <Grid item xs={2}>
                  <Typography variant="body2" color="textSecondary">{entry.name}</Typography>
                </Grid>
                <Grid item xs>
                  {/* <LinearProgress variant="determinate" value={entry.value} className={classes.projOvrProgressLine} /> */}
                  <BorderLinearProgress variant="determinate" value={entry.value} barcolor={COLORS[index]} />
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2" color="textSecondary">{`${Math.round(entry.value)}%`}</Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="right" marginRight={3}>
        <Button size="small" endIcon={<KeyboardArrowRightOutlinedIcon />} onClick={() => history.push("/cfc-application-reports")}> {t("projectOverviewCard.viewDetailsBtnTxt")}</Button>
      </Box>
    </Box>
  );
};

export default ProjectOverviewCard;
