import React from "react";
import Layout from "../Layout/Layout";
import DocumentPreview from "../../organisms/EstampingDocumentsComponents/DocumentPreviewComponents/DocumentPreview";
import EstampingStepper from "../../atoms/EstampingStepper/EstampingStepper";
import { Box } from "@material-ui/core";

function PreviewDocuments() {
  return (
    <div>
      <DocumentPreview />
    </div>
  );
}

export default PreviewDocuments;
