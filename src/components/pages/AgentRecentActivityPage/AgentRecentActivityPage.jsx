import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import RecentActivitiesNotifications from "../../organisms/AgentRecentActivityPageComponents/RecentActivitiesNotifications/RecentActivitiesNotifications";

const AgentRecentActivityPage = () => {
  return (
    <AgentLayout isStepper={false}>
      <RecentActivitiesNotifications />
    </AgentLayout>
  );
};

export default AgentRecentActivityPage;
