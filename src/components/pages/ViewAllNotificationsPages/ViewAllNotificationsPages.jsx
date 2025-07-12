import React from "react";
import ViewAllNotifications from "../../organisms/ViewAllNotificationsPagesComponents/ViewAllNotifications/ViewAllNotifications";
import NotificationPageLayout from "../Layout/NotificationPageLayout";

const ViewAllNotificationsPages = () => {
  return (
    <NotificationPageLayout isStepper={false} step={null}>
      <ViewAllNotifications />
    </NotificationPageLayout>
  );
};

export default ViewAllNotificationsPages;
