import React from "react";
import Layout from "../Layout/Layout";
import EmdetailsView from "../../organisms/EmdLoanApplicationPageComponents/EmdLoanDetailsView/EmdNoDetailsView";

const EmdDetailsPage = () => {
  return (
    <Layout isStepper={true} step={3}>
      <EmdetailsView />
    </Layout>
  );
};

export default EmdDetailsPage;
