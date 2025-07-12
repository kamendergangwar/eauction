import React from "react";
import Layout from "../Layout/Layout";
import CoApplicantDetailsForm from "../../organisms/CoApplicantDetailsPageComponents/CoApplicantDetailsForm/CoApplicantDetailsForm";

const AddCoApplicantDetailsPage = () => {
  return (
    <Layout isStepper={true} step={0}>
      <CoApplicantDetailsForm />
    </Layout>
  );
};

export default AddCoApplicantDetailsPage;
