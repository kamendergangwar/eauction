import React, { useState, useRef, useEffect } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
import DocumentMobileIcon from "../../../../../assets/DocumentMobileIcon.svg";
import * as yup from "yup";
import { ImageSizes, SupportedFormats, ApiEndPoint } from "../../../../../utils/Common";
import Paper from "@material-ui/core/Paper";
import withWidth from "@material-ui/core/withWidth";
import { RadioGroup } from "formik-material-ui";
import { FormControlLabel, Radio } from "@material-ui/core";
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

const DomocileDialogBox = (props) => {
  const { handleClose, afterSubmitCloseHandler, width, docData, allDocData } = props;
  const classes = UploadDocumentStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const formikRef = useRef();
  const [docFileData, setDocFileData] = useState([]);
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
      if (detailObj.CertificateNo) {
        docNo = detailObj.CertificateNo;
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
      let barCode = "";
      if (detailObj.BarCodeNum) {
        barCode = detailObj.BarCodeNum;
      }
      let code = "";
      if (detailObj.IsBarCode) {
        code = detailObj.IsBarCode;
      }
      if (detailObj.IsBarCode == "yes") {
        setIsBarCode("yes")
      }
      let mhOnline = "yes";
      if (detailObj.IsMahaOnline) {
        mhOnline = detailObj.IsMahaOnline;
      }
      let state = "MH";
      if (detailObj.State) {
        state = detailObj.State;
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
        // documentNumber: docNo || "",
        // nameOnDomicile: name || "",
        // documentState: state || "MH",
        // documentDate: date || null,
        barCodeNumber: barCode || "",
        isBarCode: code || "",
        // isMahaOnline: mhOnline || "yes",
        file: null,
      };
      // need to change
      setFormValue(savedValue);
      setFormEditIs(true);
    }
  }, [docData]);

  const stateList = [
    {
      value: "MH",
      label: t(
        "documentsForm.domicileForm.formControl.domicileState.options.maharashtra"
      ),
    },
  ];

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

  const initialValues = {
    barCodeNumber: "",
    documentDate: null,
    isBarCode: "",
    // fileData: null,
    // documentNumber: "",
    // nameOnDomicile: "",
    // documentState: "MH",
    // isMahaOnline: "yes",
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
    fileData: !imageUrl && yup
      .mixed()
      .required(
        t("documentsForm.domicileForm.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "documentsForm.domicileForm.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "documentsForm.domicileForm.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ),
    // documentNumber: isBarCode == "no" && yup
    //   .string()
    //   .required(
    //     t("documentsForm.domicileForm.formControl.certifcateErrors.required")
    //   )
    //   .matches(
    //     /^[0-9]*$/,
    //     t("documentsForm.domicileForm.formControl.certifcateErrors.limitation")
    //   ),
    // nameOnDomicile: isBarCode == "no" && yup
    //   .string()
    //   .required(t("documentsForm.domicileForm.formControl.nameErrors.required"))
    //   .matches(
    //     /^[a-zA-Z ]*$/,
    //     t("documentsForm.domicileForm.formControl.nameErrors.limitation")
    //   ),
    // documentState: isBarCode == "no" && yup
    //   .string()
    //   .required(
    //     t(
    //       "documentsForm.domicileForm.formControl.domicileState.domicileStateErrors.required"
    //     )
    //   ),
    // documentDate: isBarCode == "no" && yup
    //   .date()
    //   .nullable()
    //   .default(null)
    //   .required(
    //     t(
    //       "documentsForm.domicileForm.formControl.documentDate.documentDateErrors.required"
    //     )
    //   ),
  });

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
    requestData.append("DocumentId", "1");
    requestData.append("ApplicantId", localStorage.getItem("applicantId"));
    requestData.append("Lang", localStorage.getItem("i18nextLng"));
    requestData.append("isReupload", isRejected ? "1" : "0");
    // requestData.append("CertificateNo", values.documentNumber);
    // requestData.append("DisplayName", values.nameOnDomicile);
    // requestData.append("State", values.documentState);
    // requestData.append(
    //   "DocDate",
    //   moment(values.documentDate).format("YYYY-MM-DD")
    // );
    requestData.append("IsBarCode", values.isBarCode);
    // requestData.append("IsMahaOnline", values.isMahaOnline);
    requestData.append("BarCodeNum", values.barCodeNumber);
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
        afterSubmitCloseHandler("1");
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
                        {t("documentsForm.domicileForm.formControl.downloadCertiText0")}
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
                              window.open(ApiEndPoint + "/DocumentDownload/1")
                            }>{t("documentsForm.downloadButtonText")}</Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box> */}
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={classes.inputsSection}>
                    {/* {isBarCode == "no" && 
                      <>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "documentsForm.domicileForm.formControl.nameInputLabel"
                          )}
                          placeholder={t(
                            "documentsForm.domicileForm.formControl.namePlaceholder"
                          )}
                          name="nameOnDomicile"
                          type="text"
                          id="nameOnDomicile12"
                          required
                          inputProps={{ maxLength: 50 }}
                        />
                        <FormControl
                          control="datepicker"
                          name="documentDate"
                          maxDate={new Date()}
                          label={t(
                            "documentsForm.domicileForm.formControl.documentDate.documentDateLabel"
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
                          control="input"
                          variant="outlined"
                          label={t(
                            "documentsForm.domicileForm.formControl.certifcateInputLabel"
                          )}
                          placeholder={t(
                            "documentsForm.domicileForm.formControl.certifcatePlaceholder"
                          )}
                          name="documentNumber"
                          type="number"
                          id="documentNumber12"
                          required
                          inputProps={{ maxLength: 100 }}
                        />
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          name="documentState"
                          label={t(
                            "documentsForm.domicileForm.formControl.domicileState.domicileStateLabel"
                          )}
                          options={stateList}
                          required
                        />  
                      </>
                    } */}
                    <Box marginTop={width === "xs" ? 1 : 2}>
                      <Grid container spacing={1}>
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
                        {/* {isBarCode == "no" && <>
                          <Grid container spacing={1}>
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
                                  "documentsForm.domicileForm.formControl.mahaCertificateLabel"
                                )}
                                <span style={{ color: "#f93d5c" }}>*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md="auto">
                            <Field component={RadioGroup} name="isMahaOnline" row>
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
                          </Grid>
                        </>} */}

                        {/* <Grid item xs={12} md={12}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-end"
                            marginY={3}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={submitForm}
                            >
                              Save
                            </Button>
                          </Box>
                        </Grid> */}
                      </Grid>
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

export default withWidth()(DomocileDialogBox);
