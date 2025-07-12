import React from "react";
import Layout from "../Layout/Layout";
// import FormTemplate from "../../templates/FormTemplate/FormTemplate";
import EmdApplyLoanYesNoForm from "../../organisms/EmdLoanApplicationPageComponents/EmdApplyLoanYesNoForm/EmdApplyLoanYesNoForm";
// import GenericCard from "../../molecules/Cards/GenericCard/GenericCard";

const EmdLoanApplicationPage = () => {
  return (
    <Layout isStepper={true} step={3}>
      <EmdApplyLoanYesNoForm />
    </Layout>
  );
};

export default EmdLoanApplicationPage;
