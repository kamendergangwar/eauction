import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiTooltip from '@material-ui/core/Tooltip';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ManagerDashboardStyles } from "../ManagerDashboard.styles";

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group D', value: 200 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0090BD', '#F26618', '#007DF1', '#00B3DA', '#182659', '#066381'];
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

const ReservationCountCard = (props) => {
  const { managerDashboardData, selectedProject, setSelectedProject } = props;
  const classes = ManagerDashboardStyles();
  const { t } = useTranslation("ManagerDashboardPageTrans");
  const [chartData, setChartData] = useState([]);
  const [appTotalCount, setAppTotalCount] = useState(0);

  useEffect(() => {
    let total = 0;
    managerDashboardData.CategoryWiseProjectApplication.map((element) => {
      total += parseFloat(element["count(app.ApplicationId)"]);
    });
    setAppTotalCount(total);
    let modifyData = [];
    for (let e = 0; e < managerDashboardData.CategoryWiseProjectApplication.length; e++) {
      const element = managerDashboardData.CategoryWiseProjectApplication[e];
      let newObj = {
        name: element.ReservationCategoryName,
        applications: element["count(app.ApplicationId)"],
        value: parseFloat(((element["count(app.ApplicationId)"] / total) * 100).toFixed(1)),
      };
      modifyData.push(newObj);
    }
    setChartData(modifyData);
  }, [managerDashboardData]);

  return (
    <Box component={Paper} p={1}>
      <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("reservationCountCard.title")}</Typography>
      <Typography className={classes.subTitle}>{t("reservationCountCard.subTitle")}</Typography>
      <FormControl variant="outlined" className={classes.areaFormControl}>
        <Select id="demo-simple-select-outlined" onChange={(event) => setSelectedProject(event.target.value)} value={selectedProject}>
          {managerDashboardData.ApplicationProjectWise.map((element, i) => (
            <MenuItem key={i} value={element.ProjectId}>{element.ProjectId}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box className={classes.chartContainer}>
        <PieChart width={250} height={215}>
          <Pie
            data={chartData}
            cx={120}
            cy={100}
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
          <Typography variant="h6">{appTotalCount}</Typography>
          <Typography>Applications</Typography>
        </Box>
      </Box>
      <Box>
        {managerDashboardData.CategoryWiseProjectApplication.map((element, i) => (
          <Grid container alignItems="center" justify="space-between" key={i}>
            <Grid item>
              <MuiTooltip title={element.ReservationCategoryName}>
                <Typography className={classes.legendsDotTxt}><span style={{ backgroundColor: COLORS[i] }}></span> {element.ReservationCategoryName}</Typography>
              </MuiTooltip>
            </Grid>
            <Grid item>
              <Typography className={classes.legendsCountTxt}><strong>{element["count(app.ApplicationId)"]}</strong> Applications</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default ReservationCountCard;
