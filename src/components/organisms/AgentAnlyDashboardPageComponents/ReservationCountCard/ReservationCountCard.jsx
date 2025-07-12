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
import { AgentAnlyDashboardStyles } from "../AgentAnlyDashboard.styles";

/* const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group D', value: 200 },
  { name: 'Group D', value: 200 },
]; */
const COLORS = ['#0090BD', '#F26618', '#007DF1', '#00B3DA', '#182659', '#066381'];

const CustomTooltip = ({ payload }) => {
  if (payload.length) {
    return (
      <div className="chartCustomTooltip">
        <p className="chartTitle" style={{ color: payload[0].payload.fill }}>{payload[0].name}</p>
        <p className="chartBody">{payload[0].payload.applications}  Applications <span style={{ color: payload[0].payload.fill }}>{payload[0].value}%</span></p>
      </div>
    );
  }
  return null;
};

const ReservationCountCard = (props) => {
  const { agentAnalDashboardData, selectedProject,
    setSelectedProject } = props;
  const classes = AgentAnlyDashboardStyles();
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const [chartData, setChartData] = useState([]);
  const [appTotalCount, setAppTotalCount] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [categryDetailsWithProjectId, setCategoryDetailsWithProjectId] = useState([]);
  const [value, setValue] = useState(agentAnalDashboardData.ProjectListDropdown[0]?.ProjectName);
  const [id, setId] = useState(agentAnalDashboardData.ProjectListDropdown[0]?.ProjectId)

  const handleChange = (e) => {
    setSelectedProject(e.target.value);
    setValue(e.target.value);
  };

  const setProjectId = (data) => {
    if (data) {
      let selectedProjectDetails = agentAnalDashboardData.CategoryWiseProjectApplication.filter(projectName => {
        return projectName.projectId === data
      });
      setCategoryDetailsWithProjectId(selectedProjectDetails);
    }
  };

  useEffect(() => {
    setProjectId(id);
  }, []);

  useEffect(() => {
    let total = 0;
    categryDetailsWithProjectId.forEach((element) => {
      total += parseFloat(element.projectWiseTotalApplicationCount);
    });
    setAppTotalCount(total);
    let modifyData = [];
    categryDetailsWithProjectId?.forEach((item, key) => {
      for (let e = 0; e < item.categoriesApplication.length; e++) {
        let newObj = {
          name: item.categoriesApplication[e].ReservationCategoryName,
          applications: item.categoriesApplication[e].totalApplications,
          value: parseFloat(((item.categoriesApplication[e].totalApplications / total) * 100).toFixed(1)),
        };
        modifyData.push(newObj);
      }
    });
    setChartData(modifyData);
  }, [categryDetailsWithProjectId]);

  return (
    <Box component={Paper} p={1}>
      <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("reservationCountCard.title")}</Typography>
      <Typography className={classes.subTitle}>{t("reservationCountCard.subTitle")}</Typography>
      <FormControl variant="outlined" className={classes.areaFormControl}>
        <Select id="demo-simple-select-outlined" onChange={handleChange} value={value}>
          {agentAnalDashboardData.ProjectListDropdown?.map((element, i) => (
            <MenuItem onClick={() => setProjectId(element.ProjectId)} key={i} value={element.ProjectName}>{element.ProjectName}</MenuItem>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} ></Cell>
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip
          />} />
        </PieChart>
        <Box className={classes.chartTotalBox}>
          <Typography variant="h6">{appTotalCount}</Typography>
          <Typography>{t("reservationCountCard.applicationsBtnTxt")}</Typography>
        </Box>
      </Box>
      <Box>
        {categryDetailsWithProjectId.map((element, i) => (
          <Box key={i}>
            {element.categoriesApplication.map((items, inner_i) => (
              <Grid container alignItems="center" justify="space-between" key={inner_i}>
                <Grid item>
                  <MuiTooltip title={items.ReservationCategoryName}>
                    <Typography className={classes.legendsDotTxt}><span style={{ backgroundColor: COLORS[inner_i] }}></span> {items.ReservationCategoryName}</Typography>
                  </MuiTooltip>
                </Grid>
                <Grid item>
                  <Typography className={classes.legendsCountTxt}><strong>{items.totalApplications}</strong> {t("reservationCountCard.applicationsBtnTxt")}</Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReservationCountCard;
