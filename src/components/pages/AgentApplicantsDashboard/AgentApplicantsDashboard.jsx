import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import AgentApplicantsView from "../../organisms/AgentApplicantsViewsComponents/AgentApplicantsView/AgentApplicantsView";

const AgentApplicantsDashboard = () => {
  return (
    <AgentLayout isStepper={false}>
      <AgentApplicantsView />
    </AgentLayout>
  );
};

export default AgentApplicantsDashboard;
