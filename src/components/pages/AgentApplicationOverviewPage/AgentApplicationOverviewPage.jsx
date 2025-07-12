import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import AgentApplicationDetailsView from "../../organisms/AgentApplicationsViewsComponents/AgentApplicationDetailsView/AgentApplicationDetailsView";

// ApplicationDetailsComponents/ApplicationDetailsView/ApplicationDetailsView

const AgentApplicationOverviewPage = () => {
  return (
    <AgentLayout isStepper={false}>
      <AgentApplicationDetailsView />
    </AgentLayout>
  );
};

export default AgentApplicationOverviewPage;


