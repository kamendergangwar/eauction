import React from "react";
import Layout from "../Layout/Layout";
import FamilyDetails from "../../organisms/FamilyDetailsPageComponents/FamilyDetails/FamilyDetails";

const FamilyDetailsPage = () => {
  return (
    <Layout isStepper={true} step={0}>
      <FamilyDetails />
    </Layout>
  );
};

export default FamilyDetailsPage;
