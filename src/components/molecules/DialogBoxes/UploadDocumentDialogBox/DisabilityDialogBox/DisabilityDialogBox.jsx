import React, { useState, useRef, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import { NewsAgenciesList } from "../../../../../utils/MasterData";
import Loading from "../../../../atoms/Loading/Loading";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import { useSelector, useDispatch } from "react-redux";
import {
  saveDocument,
  eStampSelectOrDeselect,
  documentsSelector,
  clearSuccessMsg,
} from "../../../../../redux/features/file/DocumentsSlice";
import {
  fileDataUpload,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl,
  clearFileState,
  setDocumentImageUrl,
  clearDocumentImageUrl
} from "../../../../../redux/features/file/FileUploadSlice";
import RejectedDocview from "../RejectedDocView/RejectedDocView";
import { Alert } from "@material-ui/lab";

const DisabilityDialogBox = (props) => {
  const { handleClose, afterSubmitCloseHandler, width, docData, allDocData } = props;
  const classes = UploadDocumentStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const formikRef = useRef();
  const [isLeaveUploaded, setleaveUploaded] = useState(false);
  const [formValue, setFormValue] = React.useState({});
  const [formEditIs, setFormEditIs] = React.useState(false);
  const [docFileData, setDocFileData] = useState({});
  const [data2, setData2] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isImageLeave, setIsImageLeave] = useState(false);
  const [dragBoxClass, setDragBoxClass] = useState("");
  const [dragBoxClass2, setDragBoxClass2] = useState("");
  const [fileUploadLoaderState, setFileUploadLoaderState] = useState("");
  const [isBarCode, setIsBarCode] = React.useState("");
  const [isRejected, setIsRejected] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState("");
  const [rejectedDocFile, setRejectedDocFile] = useState(null);

  useEffect(() => {
    if (allDocData.IsRejected) {
      if (docData.subList[0]?.DocumentValue) {
        setRejectedDocFile(docData.subList[0]?.DocumentValue);
      }
      setIsRejected(allDocData.IsRejected);
      setRejectionReason(allDocData.DocVerificationMsg)
      setTimeout(onReUpload, 100)
    }
  }, [allDocData])

  const dispatch = useDispatch();
  const {
    isFileFetching,
    isFileSuccess,
    imageUrl,
    documentImageUrl,
    isFileError,
    fileErrorMessage,
  } = useSelector(fileUploadSelector);
  const {
    isEStampSelected,
    isFetching,
    isSuccess,
    isSuccessSent,
    isError,
    errorMessage,
    documentId,
  } = useSelector(documentsSelector);

  useEffect(() => {
    if (docData?.DocumentName) {
      var detailObj = {};
      var keys = [];
      var values = [];
      docData.subList.forEach((element) => {
        keys.push(element.DocFieldName);
        values.push(element.DocumentValue);
      });
      for (var i = 0; i < keys.length; i++) {
        detailObj[keys[i]] = values[i];
      }
      let docNo = "";
      if (detailObj.DocumentNumber) {
        docNo = detailObj.DocumentNumber;
      }
      let code = "";
      if (detailObj.IsBardCodePresent) {
        code = detailObj.IsBardCodePresent;
      }
      let barCode = "";
      if (detailObj.BarCodeNum) {
        barCode = detailObj.BarCodeNum;
      }
      if (detailObj.IsBardCodePresent == "yes") {
        setIsBarCode("yes")
      }
      let ramp = "";
      if (detailObj.IsRampRequired) {
        ramp = detailObj.IsRampRequired;
      }
      let docUrl = "";
      if (detailObj.DisablilityDocumentFileUrl) {
        docUrl = detailObj.DisablilityDocumentFileUrl;
        const [path] = docUrl.split("?");
        const parts = path.split(".");
        const extension = parts[parts.length - 1];
        if (extension == "jpg" || extension == "jpeg" || extension == "png") {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        setUploaded(true);
        dispatch(setDocumentImageUrl(docUrl));
      }
      let affidavit = "";
      if (detailObj.PHDocumentFileUrl) {
        affidavit = detailObj.PHDocumentFileUrl;
        const [path] = affidavit.split("?");
        const parts = path.split(".");
        const extension = parts[parts.length - 1];
        if (extension == "jpg" || extension == "jpeg" || extension == "png") {
          setIsImageLeave(true);
        } else {
          setIsImageLeave(false);
        }
        setleaveUploaded(true);
        dispatch(setImageUrl(affidavit));
      }

      const savedValue = {
        barCodeNumber: barCode || "",
        documentNumber: docNo || "",
        isBarCode: code || "",
        isRamp: ramp || "yes",
        disablityFile: null,
        // pHConsentFile: null,
      };
      setFormValue(savedValue);
      setFormEditIs(true);
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
    formikRef.current.setFieldValue("disablityFile", files);
    setDocFileData(files);
    setDragBoxClass("");
  };

  const onReUpload = () => {
    formikRef.current.setFieldValue("disablityFile", null);
    setDocFileData({});
    setUploaded(false);
    dispatch(clearDocumentImageUrl());
  };

  const dragOver2 = (e) => {
    e.preventDefault();
    setDragBoxClass2("dragover");
  };

  const dragEnter2 = (e) => {
    e.preventDefault();
    setDragBoxClass2("dragover");
  };

  const dragLeave2 = (e) => {
    e.preventDefault();
    setDragBoxClass2("");
  };

  // const fileDrop2 = (e) => {
  //   e.preventDefault();
  //   const files = e.dataTransfer.files[0];
  //   formikRef.current.setFieldValue("pHConsentFile", files);
  //   setData2(files);
  //   setDragBoxClass2("");
  // };

  // const onReUpload2 = () => {
  //   formikRef.current.setFieldValue("pHConsentFile", null);
  //   setData2({});
  //   setleaveUploaded(false);
  //   dispatch(clearImageUrl());
  // };

  useEffect(() => {
    if (docFileData.name && allDocData.DocumentenName) {
      if (SupportedFormats.DocsFormats.includes(docFileData['type'])) {
        // setUploaded(true);
        if (docFileData['type'].split('/')[0] == 'image') {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        const docObj = {
          doc: docFileData,
          docType: "DocumentUrl",
          docName: allDocData.DocumentenName
        };
        setFileUploadLoaderState("doc1");
        dispatch(fileDataUpload(docObj));
      }
    }
  }, [docFileData]);

  useEffect(() => {
    if (data2.name) {
      if (SupportedFormats.DocsFormats.includes(data2['type'])) {
        // setleaveUploaded(true);
        if (data2['type'].split('/')[0] == 'image') {
          setIsImageLeave(true);
        } else {
          setIsImageLeave(false);
        }
        const docObj = {
          doc: data2,
          docType: "PHDocumentFileUrl",
          docName: "PH Document"
        };
        setFileUploadLoaderState("doc2");
        dispatch(fileDataUpload(docObj));
      }
    }
  }, [data2]);

  useEffect(() => {
    // return () => {
    if (isFileSuccess) {
      if (fileUploadLoaderState == "doc1") {
        setUploaded(true);
      }
      if (fileUploadLoaderState == "doc2") {
        setleaveUploaded(true);
      }
      setFileUploadLoaderState("");
      dispatch(clearFileState());
    }
    // }
  }, [dispatch, isFileSuccess]);

  const initialValues = {
    barCodeNumber: "",
    // documentNumber: "",
    isBarCode: "",
    // isRamp: "yes",
    disablityFile: null,
    // pHConsentFile: null,
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d{0,20}$/.test(inputValue)) {
      formikRef.current.setFieldValue('barCodeNumber', inputValue);
    }
  };

  const validationSchema = yup.object({
    isBarCode: yup.string()
      .required(t("barCodeHelperTxt")),
    barCodeNumber: isBarCode == "yes" && yup
      .string()
      .required(t("documentsForm.domicileForm.formControl.barcodeRequired")),
    // documentNumber: isBarCode == "no" && yup
    //   .string()
    //   .required(
    //     t("documentsForm.disabilityForm.formControl.documentNoErrors.required")
    //   )
    //   .matches(
    //     /^[a-zA-Z0-9]*$/,
    //     t(
    //       "documentsForm.disabilityForm.formControl.documentNoErrors.limitation"
    //     )
    //   ),
    disablityFile: !documentImageUrl && yup
      .mixed()
      .required(
        t("documentsForm.disabilityForm.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t("documentsForm.disabilityForm.formControl.uploadErrors.limitation"),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "documentsForm.castCertificateForm.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ),
    // pHConsentFile: !imageUrl && yup
    //   .mixed()
    //   .required(
    //     t("documentsForm.disabilityForm.formControl.uploadErrors.required")
    //   )
    //   .test(
    //     "fileSize",
    //     t("documentsForm.disabilityForm.formControl.uploadErrors.limitation"),
    //     (value) => value && value.size <= ImageSizes.TwoMB
    //   )
    //   .test(
    //     "fileFormat",
    //     t(
    //       "documentsForm.castCertificateForm.formControl.uploadErrors.fileFormat"
    //     ),
    //     (value) => value && SupportedFormats.DocsFormats.includes(value.type)
    //   ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = new FormData();
    requestData.append("DocumentId", "7");
    requestData.append("ApplicantId", localStorage.getItem("applicantId"));
    requestData.append("Lang", localStorage.getItem("i18nextLng"));
    requestData.append("isReupload", isRejected ? "1" : "0");
    // requestData.append("DocumentNumber", values.documentNumber);
    // requestData.append("IsRampRequired", values.isRamp);
    requestData.append("IsBardCodePresent", values.isBarCode);
    if (values.isBarCode == "yes") {
      requestData.append("BarCodeNum", values.barCodeNumber);
    }
    if (documentImageUrl) {
      requestData.append("DisablilityDocumentFileUrl", documentImageUrl);
    } else {
      requestData.append("DisablilityDocumentFileUrl", "");
    }
    if (imageUrl) {
      requestData.append("PHDocumentFileUrl", imageUrl);
    } else {
      requestData.append("PHDocumentFileUrl", "");
    }
    dispatch(saveDocument(requestData));
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMsg());
        afterSubmitCloseHandler("7");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFileError) {
      if (fileUploadLoaderState == "doc1") {
        formikRef.current.setFieldValue("disablityFile", null);
      }
      // if (fileUploadLoaderState == "doc2") {
      //   formikRef.current.setFieldValue("pHConsentFile", null);
      // }

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
          initialValues={formEditIs ? formValue : initialValues}
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
                    <Typography className={classes.fileUploadTitle}>{docData?.DocumentName}</Typography>
                    {isFileFetching && fileUploadLoaderState === "doc1" && <Box className={classes.uploadDocLoader}><UploadLoading /></Box>}
                    {((!isUploaded && !isFileFetching) || (!isUploaded && fileUploadLoaderState === "doc2")) && (
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
                            id="disablityFile"
                            type="file"
                            name="disablityFile"
                            onChange={(event) => {
                              if (event.currentTarget.files[0]) {
                                setFieldValue(
                                  "disablityFile",
                                  event.currentTarget.files[0]
                                );
                                setDocFileData(event.currentTarget.files[0]);
                              }
                            }}
                          />
                          <label htmlFor="disablityFile">
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
                          <ErrorMessage name="disablityFile" />
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
                    {((isUploaded && !isFileFetching) || (isUploaded && fileUploadLoaderState === "doc2")) && (
                      <Box>
                        {isImage ? <Box className={classes.filePreviewCard}>
                          <img
                            className={classes.panPreviewImg}
                            src={documentImageUrl}
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
                                  {documentImageUrl.length > 20 ? `...${documentImageUrl.slice(-20)}` : documentImageUrl}
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
                        {t("documentsForm.disabilityForm.formControl.downloadCertiText0")}
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
                              window.open(ApiEndPoint + "/DocumentDownload/7")
                            }>{t("documentsForm.downloadButtonText")}</Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box> */}
                  </Box>
                  {/* <Box className={classes.fileUploadSection}>
                    <Typography className={classes.fileUploadTitle}>{t("documentsForm.disabilityForm.formControl.fileUploadTitleTxt1")}</Typography>
                    {isFileFetching && fileUploadLoaderState === "doc2" && <Box className={classes.uploadDocLoader}><UploadLoading /></Box>}
                    {((!isLeaveUploaded && !isFileFetching) || (!isLeaveUploaded && fileUploadLoaderState === "doc1")) && (
                      <Box
                        className={`${classes.kycDragnDropBox} ${dragBoxClass2}`}
                        onDragOver={dragOver2}
                        onDragEnter={dragEnter2}
                        onDragLeave={dragLeave2}
                        onDrop={fileDrop2}
                      >
                        <Typography className={classes.dragAndDropTxt}>
                          <Hidden smDown>
                            {t("dragDropLabel")}
                          </Hidden>
                          <input
                            accept="image/jpeg,image/png,application/pdf,image/x-eps"
                            className={classes.input}
                            id="pHConsentFile"
                            type="file"
                            name="pHConsentFile"
                            onChange={(event) => {
                              if (event.currentTarget.files[0]) {
                                setFieldValue(
                                  "pHConsentFile",
                                  event.currentTarget.files[0]
                                );
                                setData2(event.currentTarget.files[0]);
                              }
                            }}
                          />
                          <label htmlFor="pHConsentFile">
                            <Button
                              color="primary"
                              variant="contained"
                              component="span"
                              size="small"
                              className={classes.kycUploadBtn}
                            >{isRejected ? t("documentsForm.reuploadTxt") : t("browse")}</Button>
                          </label>
                        </Typography>
                        {(isFileError == false) && <FormHelperText error variant="filled">
                          <ErrorMessage name="pHConsentFile" />
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
                    {((isLeaveUploaded && !isFileFetching) || (isLeaveUploaded && fileUploadLoaderState === "doc1")) && (
                      <Box>
                        {isImageLeave ? <Box className={classes.filePreviewCard}>
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
                                  {imageUrl.length > 20 ? `...${imageUrl.slice(-20)}` : imageUrl}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="text"
                                  size="small"
                                  color="primary"
                                  onClick={onReUpload2}
                                >
                                  {t("documentsForm.cancelButtonText")}
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box> */}
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={classes.inputsSection}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        md
                        className={classes.radioSection}
                      >
                        <Typography
                          variant="body2"
                          gutterBottom
                          style={{ fontWeight: 600 }}
                        >
                          {t(
                            "documentsForm.domicileForm.formControl.barCodeLabel"
                          )}
                          <span style={{ color: "#f93d5c" }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto">
                        <Field component={RadioGroup} name="isBarCode" row>
                          <FormControlLabel
                            value="yes"
                            control={<Radio color="primary" />}
                            label={t(
                              "documentsForm.domicileForm.formControl.checkBoxLabel0"
                            )}
                            onChange={() => {
                              setIsBarCode("yes");
                            }}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio color="primary" />}
                            label={t(
                              "documentsForm.domicileForm.formControl.checkBoxLabel1"
                            )}
                            onChange={() => {
                              setIsBarCode("no");
                            }}
                          />
                        </Field>
                        <FormHelperText error variant="filled">
                          <ErrorMessage name="isBarCode" />
                        </FormHelperText>
                      </Grid>
                    </Grid>
                    {isBarCode == "yes" &&
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={t("documentsForm.domicileForm.formControl.barcodeNumber")}
                        placeholder={t("documentsForm.domicileForm.formControl.barcodeNumber")}
                        name="barCodeNumber"
                        onChange={handleChange}
                        type="text"
                        id="barCodeNumber"
                        required
                        inputProps={{ maxLength: 20 }}
                      />
                    }

                    {/* {isBarCode == "no" && <FormControl
                      control="input"
                      variant="outlined"
                      label={t(
                        "documentsForm.disabilityForm.formControl.documentNoInputLabel"
                      )}
                      placeholder={t(
                        "documentsForm.disabilityForm.formControl.documentNoPlaceholder"
                      )}
                      name="documentNumber"
                      type="number"
                      id="documentNumber1"
                      required
                      inputProps={{ maxLength: 30 }}
                    />} */}
                    <Box marginTop={width === "xs" ? 1 : 2}>
                      {/* {isBarCode == "no" && <Grid container>
                        <Grid
                          item
                          xs={12}
                          md
                          className={classes.radioSection}
                        >
                          <Typography
                            variant="body2"
                            gutterBottom
                            style={{ fontWeight: 600 }}
                          >
                            {t(
                              "documentsForm.disabilityForm.formControl.rampLabel"
                            )}
                            <span style={{ color: "#f93d5c" }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md="auto">
                          <Field component={RadioGroup} name="isRamp" row>
                            <FormControlLabel
                              value="yes"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.domicileForm.formControl.checkBoxLabel2"
                              )}
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.domicileForm.formControl.checkBoxLabel3"
                              )}
                            />
                          </Field>
                        </Grid>
                      </Grid>} */}
                    </Box>
                  </Box>
                  <Grid item xs={12} className={classes.innerCont} style={{ border: "none" }}>
                    {isRejected && <RejectedDocview imageUrl={rejectedDocFile} rejectionReason={rejectionReason} isUploaded={isUploaded} />}
                    {allDocData.docInfo && <Alert className={classes.docInfoBox} severity="info"><span dangerouslySetInnerHTML={{ __html: allDocData.docInfo }} /></Alert>}
                  </Grid>
                </Grid>
              </Grid>
              <Box className={classes.footerBox}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
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

export default withWidth()(DisabilityDialogBox);
