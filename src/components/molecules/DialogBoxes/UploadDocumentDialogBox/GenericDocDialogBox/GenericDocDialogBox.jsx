import React, { useState, useRef, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormTitleBox from "../../../../atoms/FormTitleBox/FormTitleBox";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import {
  NextArrowIcon,
  ChipCrossIcon,
  DownloadIcon,
  DeclarationtitleIcon,
  HomeIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import { UploadDocumentStyles } from "../UploadDocument.Style";
import DialogTitleBox from "../../../../atoms/DialogTitleBox/DialogTitleBox";
import UploadedKyc from "../../../../../assets/UploadedKyc.svg";
import Upload from "../../../../../assets/Upload.svg";
import * as yup from "yup";
import { ImageSizes, SupportedFormats, ApiEndPoint } from "../../../../../utils/Common";
import Paper from "@material-ui/core/Paper";
import withWidth from "@material-ui/core/withWidth";
import { RadioGroup } from "formik-material-ui";
import { FormControlLabel, Radio } from "@material-ui/core";
import DocumentMobileIcon from "../../../../../assets/DocumentMobileIcon.svg";
import Loading from "../../../../atoms/Loading/Loading";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import { useSelector, useDispatch } from "react-redux";

import {
  fileDataUpload,
  clearFileState,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl
} from "../../../../../redux/features/file/FileUploadSlice";
import RejectedDocview from "../RejectedDocView/RejectedDocView";
import { Alert } from "@material-ui/lab";
import { GenericDocSliceSelector, clearSuccessMsg, genericSaveDocuments } from "../../../../../redux/features/UttilSlice/genericDocumentSlice";
import { UtilsSelector } from "../../../../../redux/features/UttilSlice/genericOtpSlice";
import { documentsSelector, saveDocument } from "../../../../../redux/features/file/DocumentsSlice";

const GenericDocDialogBox = (props) => {
  const { handleClose, afterSubmitCloseHandler, width, docData, RequestId, reqType } = props;
  const classes = UploadDocumentStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const formikRef = useRef();
  const [docFileData, setDocFileData] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [dragBoxClass, setDragBoxClass] = useState("");
  const [isRejected, setIsRejected] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState("");
  const [rejectedDocFile, setRejectedDocFile] = useState(null);

  useEffect(() => {
    if (docData.DocumentDetails[0]?.VerifiedFlag == 2) {
      if (docData.DocumentDetails[0]?.DocumentValue) {
        setRejectedDocFile(docData.DocumentDetails[0]?.DocumentValue);
      }
      setIsRejected(true);
      setRejectionReason(docData.DocumentDetails[0]?.VerifiedReason)
      setTimeout(onReUpload, 100)
    }
  }, [docData]);

  const dispatch = useDispatch();
  const {
    isFileFetching,
    isFileSuccess,
    imageUrl,
    isFileError,
    fileErrorMessage,
  } = useSelector(fileUploadSelector);
  const {
    isFetching,
    isSuccess,
    isSuccessSent,
    isError,
    errorMessage,
    documentId,
  } = useSelector(documentsSelector);

  useEffect(() => {
    if (docData?.DocumentName && docData?.DocumentDetails[0]) {
      setUploaded(true);
      let file = docData.DocumentDetails[0].DocumentValue;
      const [path] = file.split("?");
      const parts = path.split(".");
      const extension = parts[parts.length - 1];
      if (extension == "jpg" || extension == "jpeg" || extension == "png") {
        setIsImage(true);
      } else {
        setIsImage(false);
      }
      dispatch(setImageUrl(docData.DocumentDetails[0].DocumentValue));
    }
  }, [docData]);

  const dragOver = (e) => {
    e.preventDefault();
    setDragBoxClass("dragover");
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setDragBoxClass("dragover");
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setDragBoxClass("");
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    formikRef.current.setFieldValue("genericDocument", files);
    setDocFileData(files);
    setDragBoxClass("");
  };

  const onReUpload = () => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("genericDocument", null);
    }
    setDocFileData({});
    setUploaded(false);
    dispatch(clearImageUrl());
  };

  useEffect(() => {
    if (docFileData.name && docData.DocumentName) {
      if (SupportedFormats.DocsFormats.includes(docFileData['type'])) {
        // setUploaded(true);
        if (docFileData['type'].split('/')[0] == 'image') {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        let data = {
          doc: docFileData,
          docName: docData.DocumentName
        }
        dispatch(fileDataUpload(data));
      }
    }
  }, [docFileData]);


  useEffect(() => {
    if (isFileSuccess) {
      setUploaded(true);
      setTimeout(() => {
        dispatch(clearFileState());
      }, 3000)
    }
  }, [isFileSuccess]);

  const initialValues = {
    genericDocument: null,
  };

  const validationSchema = yup.object({
    genericDocument: !imageUrl && yup
      .mixed()
      .required(
        t("documentsForm.castCertificateForm.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "documentsForm.castCertificateForm.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "documentsForm.castCertificateForm.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = new FormData();
    requestData.append("DocumentId", docData.DocumentId);
    requestData.append("ApplicantId", localStorage.getItem("applicantId"));
    requestData.append("Lang", localStorage.getItem("i18nextLng"));
    requestData.append("isReupload", isRejected ? "1" : "0");
    requestData.append("IsBardCodePresent", values.isBarCode);
    if (values.isBarCode == "yes") {
      requestData.append("BarCodeNum", values.barCodeNumber);
    }
    if (imageUrl) {
      requestData.append("DocumentFileUrl", imageUrl);
    } else {
      requestData.append("DocumentFileUrl", "");
    }
    dispatch(saveDocument(requestData));
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMsg());
        afterSubmitCloseHandler(documentId.DocumentId);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFileError) {
      formikRef.current.setFieldValue("genericDocument", null);
    }
  }, [isFileError])

  return (
    <>
      <DialogTitleBox
        title={isRejected ? `${t("documentsForm.reuploadTxt")} ${docData.DocumentName}` : docData.DocumentName}
        titleIcon={<DeclarationtitleIcon fontSize="large" />}
        handleClose={handleClose}
      />
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form noValidate autoComplete="off">
              {(isFetching) && (
                <Loading isOpen={isFetching} />
              )}
              <Grid container>
                <Grid item md={6} xs={12} className={classes.innerCont}>
                  <Box className={classes.fileUploadSection}>
                    {isFileFetching && <Box className={classes.uploadDocLoader}><UploadLoading /></Box>}
                    {(!isUploaded && !isFileFetching) && (
                      <Box
                        className={`${classes.kycDragnDropBox} ${dragBoxClass}`}
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                      >
                        {/* <Box>
                          <Hidden smDown>
                            <img className={classes.iconStyle} src={Upload} alt="Doc Icon" />
                          </Hidden>
                          <Hidden smUp>
                            <img className={classes.iconStyle} src={DocumentMobileIcon} alt="Doc Icon" />
                          </Hidden>
                        </Box> */}
                        <Typography className={classes.dragAndDropTxt}>
                          <Hidden smDown>
                            {t("dragDropLabel")}
                          </Hidden>
                          <input
                            accept="image/jpeg,image/png,application/pdf,image/x-eps"
                            className={classes.input}
                            id="genericDocument"
                            type="file"
                            name="file"
                            onChange={(event) => {
                              if (event.currentTarget.files[0]) {
                                setFieldValue(
                                  "genericDocument",
                                  event.currentTarget.files[0]
                                );
                                setDocFileData(event.currentTarget.files[0]);
                              }
                            }}
                          />
                          <label htmlFor="genericDocument">
                            <Button
                              color="primary"
                              variant="contained"
                              component="span"
                              size="small"
                              className={classes.kycUploadBtn}
                            >{isRejected ? t("documentsForm.reuploadTxt") : t("browse")}</Button>
                          </label>
                        </Typography>
                        {isFileError == false && <FormHelperText error variant="filled">
                          <ErrorMessage name="genericDocument" />
                        </FormHelperText>}
                        {isFileError && (
                          <>
                            <FormHelperText error variant="filled">
                              {fileErrorMessage}
                            </FormHelperText>
                          </>
                        )}
                        <Typography className={classes.validateText}>
                          {t("fileLimit0")}
                          <strong> {t("fileLimit1")} </strong>
                          <br />
                          {t("fileLimit2")}
                        </Typography>
                      </Box>
                    )}
                    {(isUploaded && !isFileFetching) && (
                      <Box>
                        {isImage ? <Box className={classes.filePreviewCard}>
                          <img
                            className={classes.panPreviewImg}
                            src={imageUrl}
                            alt="uploaded successfully"
                          />
                        </Box> : <Box className={classes.filePreviewCard}>
                          <img
                            className={classes.panPreviewImg}
                            src={UploadedKyc}
                            alt="uploaded successfully"
                          />
                          <Typography className={classes.fileUploadedSuccessText}>{t("documentsForm.docUploadedSuccessMsg")}</Typography>
                        </Box>}
                        <Box>
                          <Typography
                            className={classes.kycCaption}
                            variant="subtitle1"
                          >
                            {t("documentsForm.fileUploadedTitle")}
                          </Typography>
                          <Box className={classes.fileViewArea}>
                            <Grid container alignItems="center">
                              <Grid item>
                                <InsertDriveFileIcon
                                  color="primary"
                                />
                              </Grid>
                              <Grid item xs>
                                <Typography variant="body2">
                                  {imageUrl?.length > 20 ? `...${imageUrl.slice(-20)}` : imageUrl}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="text"
                                  size="small"
                                  color="primary"
                                  onClick={onReUpload}
                                >
                                  {t("documentsForm.cancelButtonText")}
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {/* <Box>
                      <Typography variant="body2" className={classes.sampleDownTitle}>
                        {t("documentsForm.affidavitForm.formControl.downloadCertiText0")}
                      </Typography>
                      <Paper elevation={4} className={classes.downloadSampleFileBox}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <InsertDriveFileIcon color="primary" />
                          </Grid>
                          <Grid item xs>
                            <Typography variant="body2">Template1.png</Typography>
                          </Grid>
                          <Grid item>
                            <Button color="primary" size="small" startIcon={<DownloadIcon />} onClick={() =>
                              window.open(ApiEndPoint + "/DocumentDownload/4")
                            }>{t("documentsForm.downloadButtonText")}</Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid item md={6} xs={12} className={classes.innerCont} style={{ border: "none" }}>
                  {isRejected && <RejectedDocview imageUrl={rejectedDocFile} rejectionReason={rejectionReason} isUploaded={isUploaded} />}
                  {docData.DocInfo && <Alert className={classes.docInfoBox} severity="info"><span dangerouslySetInnerHTML={{ __html: docData.DocInfo }} /></Alert>}
                </Grid>
              </Grid>
              <Box className={classes.footerBox}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isFileFetching}
                // onClick={submitForm}
                >
                  {t("documentsForm.saveButtonText")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}

export default withWidth()(GenericDocDialogBox);
