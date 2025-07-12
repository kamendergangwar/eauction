import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import AnalyticsDashboard from "../../organisms/AgentAnlyDashboardPageComponents/AnalyticsDashboard/AnalyticsDashboard";

const AgentAnalyticsDashboard = () => {
  return (
    <AgentLayout isStepper={false}>
      <AnalyticsDashboard />
    </AgentLayout>
  );
};

export default AgentAnalyticsDashboard;
