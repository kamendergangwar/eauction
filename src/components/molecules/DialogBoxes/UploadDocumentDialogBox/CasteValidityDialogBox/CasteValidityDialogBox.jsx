import React, { useState, useRef, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import FormControl from "../../../FormControl/FormControl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormTitleBox from "../../../../atoms/FormTitleBox/FormTitleBox";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import moment from "moment";
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
import { StateList } from "../../../../../utils/List";
import DocumentMobileIcon from "../../../../../assets/DocumentMobileIcon.svg";
import Loading from "../../../../atoms/Loading/Loading";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import { useSelector, useDispatch } from "react-redux";
import { CastValidityYearsList } from "../../../../../utils/MasterData";
import {
  saveDocument,
  eStampSelectOrDeselect,
  documentsSelector,
  clearSuccessMsg,
} from "../../../../../redux/features/file/DocumentsSlice";
import {
  fileDataUpload,
  clearFileState,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl
} from "../../../../../redux/features/file/FileUploadSlice";
import RejectedDocview from "../RejectedDocView/RejectedDocView";
import { Alert } from "@material-ui/lab";

const CasteValidityDialogBox = (props) => {
  const { handleClose, afterSubmitCloseHandler, width, docData, allDocData, verificationDone } = props;
  const classes = UploadDocumentStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const formikRef = useRef();
  const [docFileData, setDocFileData] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [dragBoxClass, setDragBoxClass] = useState("");
  const [formValue, setFormValue] = React.useState({});
  const [formEditIs, setFormEditIs] = React.useState(false);
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

  const initialValues = {
    isBarCode: "",
    barCodeNumber: "",
    certificateNumber: "",
    isBaartiMahaOnline: "baarti",
    documentNumber: "",
    nameOnCertificate: "",
    certificateState: "",
    validity: "",
    documentDate: null,
    file: null,
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
    barCodeNumber: yup.string()
      .when('isBarCode', {
        is: 'yes',
        then: yup.string()
          .required(t("documentsForm.domicileForm.formControl.barcodeRequired"))
          .length(20, t("documentsForm.domicileForm.formControl.barcodeLimit"))
      }),
    // documentNumber: yup
    //   .string()
    //   .required(
    //     t(
    //       "documentsForm.casteValidityForm.formControl.documentNoErrors.required"
    //     )
    //   )
    //   .matches(
    //     /^[a-zA-Z0-9]*$/,
    //     t(
    //       "documentsForm.casteValidityForm.formControl.documentNoErrors.limitation"
    //     )
    //   ),
    // nameOnCertificate: yup
    //   .string()
    //   .required(
    //     t(
    //       "documentsForm.casteValidityForm.formControl.nameCertifcateErrors.required"
    //     )
    //   )
    //   .matches(
    //     /^[a-zA-Z ]*$/,
    //     t(
    //       "documentsForm.casteValidityForm.formControl.nameCertifcateErrors.limitation"
    //     )
    //   ),
    // validity: yup
    //   .string()
    //   .required(
    //     t(
    //       "documentsForm.casteValidityForm.formControl.validity.validityErrors.required"
    //     )
    //   ),
    // certificateState: yup
    //   .string()
    //   .required(
    //     t(
    //       "documentsForm.casteValidityForm.formControl.certificateState.certificateStateErrors.required"
    //     )
    //   ),
    // documentDate: yup
    //   .date()
    //   .nullable()
    //   .default(null)
    //   .required(
    //     t(
    //       "documentsForm.casteValidityForm.formControl.documentDate.documentDateErrors.required"
    //     )
    //   ),
    fileData: !imageUrl && yup
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
      let docCertNo = "";
      if (detailObj.CertificateNo) {
        if (detailObj.CertificateNo !== "0") {
          docCertNo = detailObj.CertificateNo;
        }
      }
      let name = "";
      if (detailObj.DisplayName) {
        name = detailObj.DisplayName;
      }
      let date = null;
      if (detailObj.DocDate) {
        if (detailObj.DocDate !== null || detailObj.DocDate !== "00/00/0000") {
          let apiDate = detailObj.DocDate;
          let convertDate = apiDate.split("/");
          const finalDate = new Date(
            parseInt(convertDate[2]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[0])
          );
          date = finalDate;
        }
      }
      let docState = "";
      if (detailObj.DocumentState) {
        docState = detailObj.DocumentState;
      }
      let valdtDate = "baarti";
      if (detailObj.Validity) {
        valdtDate = detailObj.Validity;
      }
      let mhOnline = "baarti";
      if (detailObj.IsBhartiMahaOnline) {
        mhOnline = detailObj.IsBhartiMahaOnline;
      }
      if (detailObj.IsBarCode == "yes") {
        setIsBarCode("yes")
      }
      let barCode = "";
      if (detailObj.BarCodeNum) {
        barCode = detailObj.BarCodeNum;
      }
      let code = "";
      if (detailObj.IsBarCode) {
        code = detailObj.IsBarCode;
      }
      let url = "";
      if (detailObj.DocumentFileUrl) {
        url = detailObj.DocumentFileUrl;
        const [path] = url.split("?");
        const parts = path.split(".");
        const extension = parts[parts.length - 1];
        if (extension == "jpg" || extension == "jpeg" || extension == "png") {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        setUploaded(true);
        dispatch(setImageUrl(url));
      }

      const savedValue = {
        barCodeNumber: barCode || "",
        isBarCode: code || "",
        isBaartiMahaOnline: mhOnline || "baarti",
        documentNumber: docCertNo || "",
        nameOnCertificate: name || "",
        certificateState: docState || "",
        validity: valdtDate || "",
        documentDate: date || null,
        file: null,
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
    formikRef.current.setFieldValue("fileData", files);
    setDocFileData(files);
    setDragBoxClass("");
  };

  const onReUpload = () => {
    formikRef.current.setFieldValue("fileData", null);
    setDocFileData({});
    setUploaded(false);
    dispatch(clearImageUrl());
  };

  useEffect(() => {
    if (docFileData.name && allDocData.DocumentenName) {
      if (SupportedFormats.DocsFormats.includes(docFileData['type'])) {
        // setUploaded(true);
        if (docFileData['type'].split('/')[0] == 'image') {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        let data = {
          doc: docFileData,
          docName: allDocData.DocumentenName
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
  }, [isFileSuccess])


  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = new FormData();
    requestData.append("DocumentId", "6");
    requestData.append("ApplicantId", localStorage.getItem("applicantId"));
    requestData.append("Lang", localStorage.getItem("i18nextLng"));
    requestData.append("isReupload", isRejected ? "1" : "0");
    requestData.append("IsBarCode", values.isBarCode);
    requestData.append("addedLater", (verificationDone && !isRejected) ? "1" : "0");
    if (values.isBarCode == "yes") {
      requestData.append("BarCodeNum", values.barCodeNumber);
    }
    // requestData.append("CertificateNo", values.documentNumber);
    // requestData.append("DisplayName", values.nameOnCertificate);
    // requestData.append("DocumentState", values.certificateState);
    // requestData.append("DocDate", moment(values.documentDate).format("YYYY-MM-DD"));
    // requestData.append("Validity", values.validity);
    // requestData.append("IsBhartiMahaOnline", values.isBaartiMahaOnline);
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
        afterSubmitCloseHandler("6");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFileError) {
      formikRef.current.setFieldValue("fileData", null);
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
                            id="fileData"
                            type="file"
                            name="file"
                            onChange={(event) => {
                              if (event.currentTarget.files[0]) {
                                setFieldValue(
                                  "fileData",
                                  event.currentTarget.files[0]
                                );
                                setDocFileData(event.currentTarget.files[0]);
                              }
                            }}
                          />
                          <label htmlFor="fileData">
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
                          <ErrorMessage name="fileData" />
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
                                  {imageUrl?.length > 20 ? `...${imageUrl?.slice(-20)}` : imageUrl}
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
                        {t("documentsForm.casteValidityForm.formControl.downloadCertiText0")}
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
                              window.open(ApiEndPoint + "/DocumentDownload/6")
                            }>{t("documentsForm.downloadButtonText")}</Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={classes.inputsSection} paddingLeft={2}>
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
                            "documentsForm.castCertificateForm.formControl.barCodeLabel"
                          )}
                          <span style={{ color: "#f93d5c" }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md="auto">
                        <Field component={RadioGroup} name="isBarCode" row >
                          <FormControlLabel
                            value="yes"
                            control={<Radio color="primary" />}
                            label={t(
                              "documentsForm.selfIncomeForm.formControl.checkBoxLabel2"
                            )}
                            onChange={() => {
                              setIsBarCode("yes");
                            }}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio color="primary" />}
                            label={t(
                              "documentsForm.selfIncomeForm.formControl.checkBoxLabel3"
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
                    {/* <FormControl
                      control="input"
                      variant="outlined"
                      label={t(
                        "documentsForm.casteValidityForm.formControl.documentNoInputLabel"
                      )}
                      placeholder={t(
                        "documentsForm.casteValidityForm.formControl.documentNoPlaceholder"
                      )}
                      name="documentNumber"
                      type="number"
                      id="documentNumberCV"
                      required
                      inputProps={{ maxLength: 30 }}
                    />
                    <FormControl
                      control="input"
                      variant="outlined"
                      label={t(
                        "documentsForm.casteValidityForm.formControl.nameCertifcateInputLabel"
                      )}
                      placeholder={t(
                        "documentsForm.casteValidityForm.formControl.nameCertifcatePlaceholder"
                      )}
                      name="nameOnCertificate"
                      type="text"
                      id="nameOnCertificateCV"
                      required
                      inputProps={{ maxLength: 50 }}
                    />
                    <FormControl
                      control="selectbox"
                      variant="outlined"
                      name="validity"
                      label={t(
                        "documentsForm.casteValidityForm.formControl.validity.validityLabel"
                      )}
                      options={CastValidityYearsList}
                      required
                    />
                    <FormControl
                      control="selectbox"
                      variant="outlined"
                      name="certificateState"
                      label={t(
                        "documentsForm.casteValidityForm.formControl.certificateState.certificateStateLabel"
                      )}
                      options={StateList}
                      required
                    />
                    <FormControl
                      control="datepicker"
                      name="documentDate"
                      maxDate={new Date()}
                      label={t(
                        "documentsForm.casteValidityForm.formControl.documentDate.documentDateLabel"
                      )}
                      placeholder={"DD/MM/YYYY"}
                      inputVariant="outlined"
                      required
                    /> */}
                    {/* <Box marginTop={width === "xs" ? 1 : 2}>
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
                              "documentsForm.casteValidityForm.formControl.isBaartiMahaOnline"
                            )}
                            <span style={{ color: "#f93d5c" }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md="auto">
                          <Field
                            component={RadioGroup}
                            name="isBaartiMahaOnline"
                            row
                          >
                            <FormControlLabel
                              value="baarti"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.casteValidityForm.formControl.checkBoxLabel0"
                              )}
                            />
                            <FormControlLabel
                              value="mahaOnline"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.casteValidityForm.formControl.checkBoxLabel1"
                              )}
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.casteValidityForm.formControl.checkBoxLabel2"
                              )}
                            />
                          </Field>
                        </Grid>
                      </Grid>
                    </Box> */}
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

export default withWidth()(CasteValidityDialogBox);
