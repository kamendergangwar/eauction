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
import { RadioGroup } from "formik-material-ui";
import { FormControlLabel, Radio } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import DocumentMobileIcon from "../../../../../assets/DocumentMobileIcon.svg";
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
  clearFileState,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl
} from "../../../../../redux/features/file/FileUploadSlice";
import RejectedDocview from "../RejectedDocView/RejectedDocView";
import { Alert } from "@material-ui/lab";

const APMCertificateDialogBox = (props) => {
  const { handleClose, afterSubmitCloseHandler, width, docData, allDocData } = props;
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
      if (detailObj.IsBarCode == "yes") {
        setIsBarCode("yes")
      }
      let code = "";
      if (detailObj.IsBarCode) {
        code = detailObj.IsBarCode;
      }
      let barCode = "";
      if (detailObj.BarCodeNum) {
        barCode = detailObj.BarCodeNum;
      }
      let name = "";
      if (detailObj.DisplayName) {
        name = detailObj.DisplayName;
      }
      let authorityLocation = "MH";
      if (detailObj.IssuingAuthorityLocation) {
        authorityLocation = detailObj.IssuingAuthorityLocation;
      }
      let workingLocation = "MH";
      if (detailObj.ApplicantWorkingLocation) {
        workingLocation = detailObj.ApplicantWorkingLocation;
      }
      let date = null;
      if (detailObj.DocumentDate) {
        if (
          detailObj.DocumentDate !== null ||
          detailObj.DocumentDate !== "00/00/0000"
        ) {
          let apiDate = detailObj.DocumentDate;
          let convertDate = apiDate.split("/");
          const finalDate = new Date(
            parseInt(convertDate[2]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[0])
          );
          date = finalDate;
        }
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
        // documentNumber: docNo || "",
        // nameOnCertificate: name || "",
        // authorityLocation: authorityLocation || "",
        // workingLocation: workingLocation || "",
        // documentDate: date || "",
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

  const initialValues = {
    barCodeNumber: "",
    isBarCode: "",
    // documentNumber: "",
    // nameOnCertificate: "",
    // authorityLocation: "MH",
    // workingLocation: "MH",
    // documentDate: null,
    fileData: null,
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
      .required(t("documentsForm.domicileForm.formControl.barcodeRequired"))
      .min(20, t("documentsForm.domicileForm.formControl.barcodeLimit"))
      .max(20, t("documentsForm.domicileForm.formControl.barcodeLimit")),
    // documentNumber: isBarCode == "no" && yup
    //   .string()
    //   .required(
    //     t("documentsForm.apmcForm.formControl.documentNoErrors.required")
    //   )
    //   .matches(
    //     /^[a-zA-Z0-9]*$/,
    //     t("documentsForm.apmcForm.formControl.documentNoErrors.limitation")
    //   ),
    // nameOnCertificate: isBarCode == "no" && yup
    //   .string()
    //   .required(t("documentsForm.apmcForm.formControl.nameErrors.required"))
    //   .matches(
    //     /^[a-zA-Z ]*$/,
    //     t("documentsForm.apmcForm.formControl.nameErrors.limitation")
    //   ),
    // authorityLocation: isBarCode == "no" && yup
    //   .string()
    //   .required(
    //     t(
    //       "documentsForm.apmcForm.formControl.authority.authorityErrors.required"
    //     )
    //   ),
    // workingLocation: isBarCode == "no" && yup
    //   .string()
    //   .required(
    //     t("documentsForm.apmcForm.formControl.location.locationErrors.required")
    //   ),
    // documentDate: isBarCode == "no" && yup
    //   .date()
    //   .nullable()
    //   .default(null)
    //   .required(
    //     t(
    //       "documentsForm.apmcForm.formControl.documentDate.documentDateErrors.required"
    //     )
    //   ),
    fileData: !imageUrl && yup
      .mixed()
      .required(
        t("documentsForm.apmcForm.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "documentsForm.apmcForm.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "documentsForm.apmcForm.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ),
  });

  const stateList = [
    {
      value: "MH",
      label: t(
        "documentsForm.domicileForm.formControl.domicileState.options.maharashtra"
      ),
    },
    {
      value: "UK",
      label: t(
        "documentsForm.domicileForm.formControl.domicileState.options.uttarakhand"
      ),
    },
    {
      value: "WB",
      label: t(
        "documentsForm.domicileForm.formControl.domicileState.options.westBengal"
      ),
    },
  ];

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = new FormData();
    requestData.append("DocumentId", "11");
    requestData.append("ApplicantId", localStorage.getItem("applicantId"));
    requestData.append("Lang", localStorage.getItem("i18nextLng"));
    requestData.append("isReupload", isRejected ? "1" : "0");
    // requestData.append("DocumentNumber", values.documentNumber);
    // requestData.append("DisplayName", values.nameOnCertificate);
    // requestData.append(
    //   "DocumentDate",
    //   moment(values.documentDate).format("YYYY-MM-DD")
    // );
    // requestData.append("IssuingAuthorityLocation", values.authorityLocation);
    // requestData.append("ApplicantWorkingLocation", values.workingLocation);
    requestData.append("IsBarCode", values.isBarCode);
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
        afterSubmitCloseHandler("11");
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
                            name="fileData"
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
                        {t("documentsForm.apmcForm.formControl.downloadCertiText0")}
                      </Typography>
                      <Paper elevation={4} className={classes.downloadSampleFileBox}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <InsertDriveFileIcon color="primary" />
                          </Grid>
                          <Grid item xs className="templateNameBox">
                            <Typography variant="body2">Template1.png</Typography>
                          </Grid>
                          <Grid item>
                            <Button color="primary" size="small" startIcon={<DownloadIcon />} onClick={() =>
                              window.open(ApiEndPoint + "/DocumentDownload/11")
                            }>{t("documentsForm.downloadButtonText")}</Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={classes.inputsSection}>
                    <Box marginTop={width === "xs" ? 1 : 2}>
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
                          <Field component={RadioGroup} name="isBarCode" row>
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
                    </Box>
                    {isBarCode == "yes" &&
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={t("documentsForm.domicileForm.formControl.barcodeNumber")}
                        placeholder={t("documentsForm.domicileForm.formControl.barcodeNumber")}
                        name="barCodeNumber"
                        type="text"
                        id="barCodeNumber"
                        onChange={handleChange}
                        required
                        inputProps={{ maxLength: 20 }}
                      />
                    }
                    {/* {isBarCode == "no" && <>
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={t(
                          "documentsForm.apmcForm.formControl.documentNoInputLabel"
                        )}
                        placeholder={t(
                          "documentsForm.apmcForm.formControl.documentNoPlaceholder"
                        )}
                        name="documentNumber"
                        type="number"
                        id="documentNumber6"
                        required
                        inputProps={{ maxLength: 30 }}
                      />
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={t(
                          "documentsForm.apmcForm.formControl.nameInputLabel"
                        )}
                        placeholder={t(
                          "documentsForm.apmcForm.formControl.namePlaceholder"
                        )}
                        name="nameOnCertificate"
                        type="text"
                        id="nameOnCertificate6"
                        required
                        inputProps={{ maxLength: 50 }}
                      />
                      <FormControl
                        control="datepicker"
                        name="documentDate"
                        maxDate={new Date()}
                        label={t(
                          "documentsForm.apmcForm.formControl.documentDate.documentDateLabel"
                        )}
                        placeholder={"DD/MM/YYYY"}
                        // onChange={(value) => {
                        //   if (!isNaN(value) && value !== null) {
                        //     getDateFormat(value);
                        //     setFieldValue("documentDate", getDateFormat(value));
                        //   }
                        // }}
                        inputVariant="outlined"
                        required
                      />
                      <FormControl
                        control="selectbox"
                        variant="outlined"
                        name="authorityLocation"
                        label={t(
                          "documentsForm.apmcForm.formControl.authority.authorityLabel"
                        )}
                        options={stateList}
                        required
                      />
                      <FormControl
                        control="selectbox"
                        variant="outlined"
                        name="workingLocation"
                        label={t(
                          "documentsForm.apmcForm.formControl.location.locationLabel"
                        )}
                        options={stateList}
                        required
                      />
                    </>} */}
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

export default withWidth()(APMCertificateDialogBox);
