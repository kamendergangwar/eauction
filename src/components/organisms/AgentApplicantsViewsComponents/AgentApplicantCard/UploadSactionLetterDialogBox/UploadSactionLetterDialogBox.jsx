import React, { useState, useRef, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import {
  DeclarationtitleIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import DialogTitleBox from "../../../../atoms/DialogTitleBox/DialogTitleBox";
import UploadedKyc from "../../../../../assets/UploadedKyc.svg";
import * as yup from "yup";
import { ImageSizes, SupportedFormats, ApiEndPoint } from "../../../../../utils/Common";
import withWidth from "@material-ui/core/withWidth";
import Loading from "../../../../atoms/Loading/Loading";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import { useSelector, useDispatch } from "react-redux";
import {
  AgentFileDataUpload,
  clearFileState,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl
} from "../../../../../redux/features/file/FileUploadSlice";
import { UploadDocumentStyles } from "../../../../molecules/DialogBoxes/UploadDocumentDialogBox/UploadDocument.Style";
import { Dialog } from "@material-ui/core";
import { useMemo } from "react";
import { agentApplicantSelector, clearSanctionSuccessMsg, saveSanctionLetter } from "../../../../../redux/features/agent/AgentApplicantsSlice";

const UploadSactionLetterDialogBox = (props) => {
  const { afterSubmitCloseHandler,open,handleClose, width, ApplicantData } = props;
  const classes = UploadDocumentStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const formikRef = useRef();
  const [docFileData, setDocFileData] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [dragBoxClass, setDragBoxClass] = useState("");
  const [formValue, setFormValue] = React.useState({});
  const [formEditIs, setFormEditIs] = React.useState(false);

  const Applicant = useMemo(()=>ApplicantData,[ApplicantData])
  
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
  } = useSelector(agentApplicantSelector);

//   useEffect(() => {
//     if (docData?.DocumentName) {
//       var detailObj = {};
//       var keys = [];
//       var values = [];
//       docData.subList.forEach((element) => {
//         keys.push(element.DocFieldName);
//         values.push(element.DocumentValue);
//       });
//       for (var i = 0; i < keys.length; i++) {
//         detailObj[keys[i]] = values[i];
//       }


//       let url = "";
//       if (detailObj.DocumentFileUrl) {
//         url = detailObj.DocumentFileUrl;
//         console.log("url", url);
//         let fileExtension = url.split('.').pop().trim().toLowerCase();
//         if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png") {
//           setIsImage(true);
//         } else {
//           setIsImage(false);
//         }
//         setUploaded(true);
//         dispatch(setImageUrl(url));
//       }

//       const savedValue = {
//         file: null,
//       };
//       setFormValue(savedValue);
//       setFormEditIs(true);
//     }
//   }, [docData]);

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
    if (docFileData.name) {
      if (SupportedFormats.DocsFormats.includes(docFileData['type'])) {
        if (docFileData['type'].split('/')[0] == 'image') {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        dispatch(AgentFileDataUpload({fileData:docFileData,ApplicantId:Applicant.ApplicantId}));
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

  useEffect(() => {
    if (isFileError) {
      formikRef.current.setFieldValue("fileData", null);
    }
  }, [isFileError])

  const initialValues = {
    fileData: null,
  };

  const validationSchema = yup.object({
    fileData: !imageUrl && yup
      .mixed()
      .required(
        t("documentsForm.affidavitBForm.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "documentsForm.affidavitBForm.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "documentsForm.affidavitBForm.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ),
  });


  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
        "ApplicantId": Applicant?.ApplicantId,
        "Lang": localStorage.getItem("i18nextLng"),
        "SanctionLetterFile": imageUrl ? imageUrl : ''
    };
    dispatch(saveSanctionLetter(requestData));
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearSanctionSuccessMsg());
        handleClose();
        afterSubmitCloseHandler(Applicant?.ApplicantId)
        setUploaded(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <Dialog
        onClose={handleClose}
        className={classes.dialogBox}
        open={open}
        disableBackdropClick
        fullScreen={width === "xs" ? true : false}
        fullWidth={true}
        maxWidth="md"
      >
    
      <DialogTitleBox
        title={`Sanction Letter`}
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
                            >{t("browse")}</Button>
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
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                <Grid container justifyContent="center">
                  <Grid item xs={3} className={classes.innerCont} style={{ border: "none" }}>
                    <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}> Applicant Id</Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.innerCont} style={{ border: "none" }}>:</Grid>
                  <Grid item xs={5} className={classes.innerCont} style={{ border: "none" }}>
                    <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}>{Applicant.ApplicantId} </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item xs={3} className={classes.innerCont} style={{ border: "none" }}>
                    <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}> Application No.</Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.innerCont} style={{ border: "none" }}>:</Grid>
                  <Grid item xs={5} className={classes.innerCont} style={{ border: "none" }}>
                    <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}>{Applicant.ApplicationNo ? (Applicant.ApplicationNo) : ('--')} </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item xs={3} className={classes.innerCont} style={{ border: "none" }}>
                    <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}> Applicant Name</Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.innerCont} style={{ border: "none" }}>:</Grid>
                  <Grid item xs={5} className={classes.innerCont} style={{ border: "none" }}>
                    <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}>{Applicant.FirstName} </Typography>
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
              
              <Box className={classes.footerBox}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                 {t("documentsForm.saveButtonText")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default withWidth()(UploadSactionLetterDialogBox);
