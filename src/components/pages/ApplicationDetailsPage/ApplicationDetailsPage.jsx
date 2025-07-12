import React from "react";
import Layout from "../Layout/Layout";
import ApplicationDetailsView from "../../organisms/ApplicationDetailsComponents/ApplicationDetailsView/ApplicationDetailsView";

const ApplicationDetailsPage = () => {
  return (
    <Layout isStepper={false}>
      <ApplicationDetailsView />
    </Layout>
  );
};

export default ApplicationDetailsPage;
