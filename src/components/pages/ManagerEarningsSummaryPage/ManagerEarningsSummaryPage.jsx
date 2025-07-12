import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import ManagerEarningsSummary from "../../organisms/MngrEarningsSummaryPageComponents/ManagerEarningsSummary/ManagerEarningsSummary";

const ManagerEarningsSummaryPage = () => {
  return (
    <AgentLayout isStepper={false}>
      <ManagerEarningsSummary />
    </AgentLayout>
  );
};

export default ManagerEarningsSummaryPage;
