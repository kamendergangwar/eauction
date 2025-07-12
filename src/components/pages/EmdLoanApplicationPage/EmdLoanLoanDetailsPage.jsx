import React from "react";
import Layout from "../Layout/Layout";
// import FormTemplate from "../../templates/FormTemplate/FormTemplate";
import EmdLoanDetailsView from "../../organisms/EmdLoanApplicationPageComponents/EmdLoanDetailsView/EmdLoanDetailsView";
// import GenericCard from "../../molecules/Cards/GenericCard/GenericCard";

const EmdLoanLoanDetailsPage = () => {
  return (
    <Layout isStepper={true} step={3}>
      <EmdLoanDetailsView />
    </Layout>
  );
};

export default EmdLoanLoanDetailsPage;
