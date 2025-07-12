import React from "react";
import GrievanceTab from "../../organisms/DashboardPageComponents/UserProjects/GrievanceTab/GrievanceTab";
import Layout from "../Layout/Layout";


const MyGrievancePage = () => {
  return (
    <Layout isStepper={false} noScrollIs={true}>
      <GrievanceTab/>
    </Layout>
  );
};

export default MyGrievancePage;
