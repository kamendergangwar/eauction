import React from "react";
import Layout from "../Layout/Layout";
import SelectProjectForm from "../../organisms/SelectProjectsPageComponents/SelectProjectForm/SelectProjectForm";


const SelectProjectsPage = () => {
  return (
    <Layout isStepper={true} step={1} width="1400px">
      <SelectProjectForm />
    </Layout>
  );
};

export default SelectProjectsPage;
