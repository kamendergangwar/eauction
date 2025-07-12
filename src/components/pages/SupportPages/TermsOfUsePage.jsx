import React from "react";
import Layout from "../Layout/Layout";
import TermsOfUse from "../../organisms/SupportPageComponents/TermsOfUse/TermsOfUse";

const TermsOfUsePage = () => {
  return (
    <Layout isStepper={false}>
      <TermsOfUse />
    </Layout>
  );
};

export default TermsOfUsePage;
