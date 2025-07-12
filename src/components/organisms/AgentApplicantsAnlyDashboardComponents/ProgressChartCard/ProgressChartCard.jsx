import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AgentAnlyDashboardStyles } from "../AgentAnlyDashboard.styles";

const dummyChartData = [
  {
    name: 'Jan',
    fullMonth: 'January',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Feb',
    fullMonth: 'February',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Mar',
    fullMonth: 'March',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Apr',
    fullMonth: 'April',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'May',
    fullMonth: 'May',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Jun',
    fullMonth: 'June',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Jul',
    fullMonth: 'July',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Aug',
    fullMonth: 'August',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Sep',
    fullMonth: 'September',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Oct',
    fullMonth: 'October',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Nov',
    fullMonth: 'November',
    inProgress: 0,
    completed: 0,
  },
  {
    name: 'Dec',
    fullMonth: 'December',
    inProgress: 0,
    completed: 0,
  },
];

const ProgressChartCard = (props) => {
  const { agentApplicantsAnalDashboardData } = props;
  const { t } = useTranslation("AgentDashboardPageTrans");
  const [chartData, setChartData] = useState(dummyChartData);

  useEffect(() => {
    
    if (agentApplicantsAnalDashboardData.BarGraphCompletedInProgress.length > 0) {

      let newDummyChartData = dummyChartData
      for (let e = 0; e < agentApplicantsAnalDashboardData.BarGraphCompletedInProgress.length; e++) {
        const element = agentApplicantsAnalDashboardData.BarGraphCompletedInProgress[e];
        for (let x = 0; x < newDummyChartData.length; x++) {
          const inner_element = newDummyChartData[x];
          if (inner_element.fullMonth == element.Month) {
            newDummyChartData[x].completed = element.Completed;
            newDummyChartData[x].inProgress = element.InProgress;
          }
        }
      }
      setChartData(newDummyChartData);
    } else {
      console.log(dummyChartData);
      setChartData(dummyChartData);
    }
  }, [agentApplicantsAnalDashboardData]);

  return (
    <Box component={Paper} p={1}>
      <Box>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" stackId="a" fill="#007AE7" />
            <Bar dataKey="inProgress" stackId="a" fill="#F27807" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ProgressChartCard;
