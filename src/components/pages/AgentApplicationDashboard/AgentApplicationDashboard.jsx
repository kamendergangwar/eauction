import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import AgentApplicationsView from "../../organisms/AgentApplicationsViewsComponents/AgentApplicationsView/AgentApplicationsView";

const AgentApplicationDashboard = () => {
  return (
    <AgentLayout isStepper={false}>
      <AgentApplicationsView />
    </AgentLayout>
  );
};

export default AgentApplicationDashboard;
