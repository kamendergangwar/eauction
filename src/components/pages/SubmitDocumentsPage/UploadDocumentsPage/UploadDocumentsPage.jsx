import React from "react";
import Layout from "../../Layout/Layout";
import UploadDocuments from "../../../organisms/SubmitDocumentsPageComponents/UploadDocuments/UploadDocuments";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { DocumentsFormStyles } from "../../../organisms/SubmitDocumentsPageComponents/Document.style";

function UploadDocumentsPage() {
  const classes = DocumentsFormStyles();
  return (
    <Layout noScrollIs={true}>
      <UploadDocuments />
      {/* <Box padding={2}>
        <Typography className={classes.footertxt}>
          Need help with Uploading your Documents? Click here to find{" "}
          <Link to="#" className="link">Link our Nearby Offline Centers.</Link>
        </Typography>
      </Box> */}
    </Layout>
  );
}

export default UploadDocumentsPage;
