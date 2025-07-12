import React from "react";
import Layout from "../Layout/Layout";
// import FormTemplate from "../../templates/FormTemplate/FormTemplate";
import MakePaymentsForm from "../../organisms/MakePaymentsPageComponents/MakePaymentsForm/MakePaymentsForm";
// import GenericCard from "../../molecules/Cards/GenericCard/GenericCard";

const MakePaymentsPage = () => {
  return (
    <Layout isStepper={true} step={3}>
      <MakePaymentsForm />
    </Layout>
  );
};

export default MakePaymentsPage;
