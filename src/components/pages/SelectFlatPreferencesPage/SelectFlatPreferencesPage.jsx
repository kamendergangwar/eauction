import React from "react";
import Layout from "../Layout/Layout";
import FlatPreferencesForm from "../../organisms/SelectFlatPreferencesComponents/SelectFlatPreferencesForm/FlatPreferencesForm"
const SelectFlatPreferencesPage = () => {
  return (
    <Layout isStepper={true} step={1}>
      <FlatPreferencesForm />
    </Layout>
  );
};

export default SelectFlatPreferencesPage;
