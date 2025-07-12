import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Document, Page } from "react-pdf";
import {
  getDocumentId,
  getDocumentDetails,
  estampingDocumentSelector,
} from "../../../../redux/features/file/EstampingDocSlice";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import Loading from "../../../atoms/Loading/Loading";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles((theme) => ({}));

function DocumentPreview() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [encodedFile, setEncodedFile] = useState("");
  const [isSignFlag, setIsSignFlag] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastBtn, setLastBtn] = useState(false);

  const {
    isDocIdSuccess,
    docIdData,
    isFetchingDoc,
    isDocIdFetching,
    isDocFileSuccess,
    docSuccessMessage,
    docFileData,
    docFileError,
    deocErrorMessage,
  } = useSelector(estampingDocumentSelector);
  const { applicantData, isSuccessResApplicant } =
    useSelector(applicantSelector);

  useEffect(() => {
    dispatch(getApplicant());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessResApplicant) {
      if (applicantData) {
        dispatch(getDocumentId(applicantData.ApplicantId));
      }
    }
  }, [applicantData, dispatch, isSuccessResApplicant]);
  useEffect(() => {
    if (isDocIdSuccess && docIdData?.length > 0) {
      // console.log(docIdData[0].DocumentId);
      dispatch(getDocumentDetails(docIdData[0].DocumentId));
    }
  }, [isDocIdSuccess]);
  useEffect(() => {
    if (isDocFileSuccess) {
      console.log(docFileData);
      const sign = docFileData.requests.map((data) => data.signed);
      console.log(sign[0]);
      console.log(...sign);
      setIsSignFlag(...sign);
      if (!sign[0]) {
        history.push("/dashboard");
      }
      const signed = docFileData.files;
      // console.log(signed);
      setEncodedFile(...signed);
      // console.log(encodedFile);
    }
  }, [isDocFileSuccess]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const setPage = () => {
    if (pageNumber < numPages) {
      if (numPages - pageNumber > 1) {
        setPageNumber(pageNumber + 1);
      } else {
        setLastBtn(true);
        setPageNumber(pageNumber + 1);
      }
    }
    if (pageNumber === numPages) {
      history.push("/dashboard");
    }
  };
  const prevPage = () => {
    if (pageNumber === 1) {
      setPageNumber(pageNumber);
    }
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setLastBtn(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      {(isFetchingDoc || isDocIdFetching) && (
        <Loading isOpen={isFetchingDoc || isDocIdFetching} />
      )}
      {encodedFile && (
        <div>
          <Document
            file={`data:application/pdf;base64,${encodedFile}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
      {encodedFile && (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          m={0}
          style={{ width: "20%" }}
        >
          <Button
            color="primary"
            variant="outlined"
            size="small"
            style={{ width: "30%", margin: "20px" }}
            onClick={prevPage}
          >
            previous
          </Button>

          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={setPage}
            style={{ width: lastBtn ? "50%" : "30%", margin: "20px" }}
          >
            {lastBtn ? "go to dashboard" : "next"}
          </Button>
        </Box>
      )}
    </div>
  );
}

export default DocumentPreview;
