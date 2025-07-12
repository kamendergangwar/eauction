import React from "react";
//import Dashboard from "../../../organisms/DashboardPageComponents/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import ApplicationCard from "../../organisms/E-auctionSelectProject/ApplicationCard";

const AllProjectPage = () => {
  return (
    <Layout isStepper={false} step={1} width="1400px" noScrollIs={true}>
      {/* <Dashboard /> */}
      <ApplicationCard />
    </Layout>
  );
};

export default AllProjectPage;
