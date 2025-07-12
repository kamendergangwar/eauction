import React from "react";
import Layout from "../Layout/Layout";
import IncomeDetailsForm from "../../organisms/CategoryDetailsPageComponents/CategoryDetailsForm/IncomeDetailsForm";

function IncomeDetailsPage() {
  return (
    <Layout isStepper={true} step={1}>
      <IncomeDetailsForm />
    </Layout>
  );
}

export default IncomeDetailsPage;
