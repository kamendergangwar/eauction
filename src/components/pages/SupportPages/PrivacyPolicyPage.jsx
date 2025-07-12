import React from "react";
import Layout from "../Layout/Layout";
import PrivacyPolicy from "../../organisms/SupportPageComponents/PrivacyPolicy/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <Layout isStepper={false}>
      <PrivacyPolicy />
    </Layout>
  );
};

export default PrivacyPolicyPage;
