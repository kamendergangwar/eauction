import React from "react";
import Layout from "../Layout/Layout";
import RefundPolicy from "../../organisms/SupportPageComponents/RefundPolicy/RefundPolicy";

const RefundPolicyPage = () => {
  return (
    <Layout isStepper={false}>
      <RefundPolicy />
    </Layout>
  );
};

export default RefundPolicyPage;
