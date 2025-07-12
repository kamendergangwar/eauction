import React from "react";
import Layout from "../Layout/Layout";
// import FormTemplate from "../../templates/FormTemplate/FormTemplate";
import EmdLoanBankSelecting from "../../organisms/EmdLoanApplicationPageComponents/EmdLoanBankSelecting/EmdLoanBankSelecting";
// import GenericCard from "../../molecules/Cards/GenericCard/GenericCard";

const EmdLoanBankSelectPage = () => {
  return (
    <Layout isStepper={true} step={3}>
      <EmdLoanBankSelecting />
    </Layout>
  );
};

export default EmdLoanBankSelectPage;
