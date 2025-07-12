import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import AppDetailsView from "../../organisms/AgentApplicationDetailsComponents/AppDetailsView/AppDetailsView";

const AgentAppDetailsPage = () => {
  return (
    <AgentLayout isStepper={false}>
      <AppDetailsView />
    </AgentLayout>
  );
};

export default AgentAppDetailsPage;
