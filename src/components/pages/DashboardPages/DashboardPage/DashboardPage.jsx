import React from "react";
import Dashboard from "../../../organisms/DashboardPageComponents/Dashboard/Dashboard";
import Layout from "../../Layout/Layout";

const DashboardPage = () => {
  return (
    <Layout isStepper={false} noScrollIs={true}>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
