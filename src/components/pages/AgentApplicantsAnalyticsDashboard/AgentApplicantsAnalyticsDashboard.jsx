import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import ApplicantsAnalyticsDashboard from "../../organisms/AgentApplicantsAnlyDashboardComponents/ApplicantsAnalyticsDashboard/ApplicantsAnalyticsDashboard";

const AgentApplicantsAnalyticsDashboard = () => {
  return (
    <AgentLayout isStepper={false}>
      <ApplicantsAnalyticsDashboard />
    </AgentLayout>
  );
};

export default AgentApplicantsAnalyticsDashboard;
