import React from "react";
import Layout from "../Layout/Layout";
import CategoryDetailsForm from "../../organisms/CategoryDetailsPageComponents/CategoryDetailsForm/CategoryDetailsForm";

const CategoryDetailsPage = () => {
  return (
    <Layout isStepper={true} step={1}>
      <CategoryDetailsForm />
    </Layout>
  );
};

export default CategoryDetailsPage;
