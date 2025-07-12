import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import ManagerDashboard from "../../organisms/ManagerDashboardPageComponents/ManagerDashboard/ManagerDashboard";

const ManagerDashboardPage = () => {
  return (
    <AgentLayout isStepper={false}>
      <ManagerDashboard />
    </AgentLayout>
  );
};

export default ManagerDashboardPage;
