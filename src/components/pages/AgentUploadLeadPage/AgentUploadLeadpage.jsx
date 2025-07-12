import React from "react";
import AgentProfileView from "../../organisms/AgentProfilePageComponents/AgentProfileView/AgentProfileView";
import AgentUploadLeadView from "../../organisms/AgentUploadLeadComponent/AgentUpoadLeads/AgentUploadLeadView";
import AgentLayout from "../AgentLayout/AgentLayout";

const AgentUploadLeadPage = () => {
  return (
    <AgentLayout>
      <AgentUploadLeadView/>
    </AgentLayout>
  );
};

export default AgentUploadLeadPage;