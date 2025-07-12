import React from "react";
import Layout from "../../Layout/Layout";
import Declaration from "../../../organisms/SubmitDocumentsPageComponents/Declaration/Declaration";

function DeclarationPage() {
  return (
    <Layout isStepper={true} step={0}>
      <Declaration />
    </Layout>
  );
}

export default DeclarationPage;
