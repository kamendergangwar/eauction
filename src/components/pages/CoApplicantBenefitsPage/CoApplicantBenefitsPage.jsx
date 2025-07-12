import React from "react";
import Layout from "../Layout/Layout";
import CoApplicantBenefitsView from "../../organisms/CoApplicantDetailsPageComponents/CoApplicantBenefitsView/CoApplicantBenefitsView";

const CoApplicantBenefitsPage = () => {
  return (
    <Layout isStepper={true} step={0}>
      <CoApplicantBenefitsView />
    </Layout>
  );
};

export default CoApplicantBenefitsPage;
