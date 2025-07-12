import { Box, Button, FormHelperText, Grid, Hidden, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { FileUploadIcon, NextArrowIcon, PdfFileViewIcon, WhiteArrowIcon } from '../../../atoms/SvgIcons/SvgIcons';
import { ErrorMessage, Form, Formik } from 'formik';
import { initialPagesStyles } from '../../InitialPagesComponents/InitialPages.styles';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import KycTitleDescriBox from '../../../atoms/KycTitleDescriBox/KycTitleDescriBox';
import KycStepperBox from '../../../atoms/KycStepperBox/KycStepperBox';
import UploadedKyc from "../../../../assets/UploadedKyc.svg";
import UploadLoading from '../../../atoms/Loading/UploadLoading';
import AlertBox from '../../../atoms/AlertBox/AlertBox';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as yup from "yup";
import { ImageSizes, SupportedFormats } from '../../../../utils/Common';
import { TechnicalBidSave, TechnicalBidUpload, clearFileState, clearImageUrl, fileDataUpload, fileUploadSelector } from '../../../../redux/features/file/FileUploadSlice';
import { useEffect } from 'react';
import { applicantSelector, editApplicant } from '../../../../redux/features/applicant/ApplicantSlice';
import Upload from '../../../../assets/Upload.svg';
import { clearSaveDeclerationState } from '../../../../redux/features/eauction/applyProjectSlice';
import FormCard from '../../../molecules/Cards/FormCard/FormCard';

function TechnicalBid({ width, onNext }) {
  const [dragBoxClass, setDragBoxClass] = useState("");
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [fileName, setFileName] = useState('');
  const initialValues = {
    fileData: "",
  };
  const {
    isFileFetching,
    isFileSuccess,
    imageUrl,
    isFileError,
    fileErrorMessage,
    isTechnicalBidSuccess,
  } = useSelector(fileUploadSelector);

  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
  } = useSelector(applicantSelector);


  const validationSchema = yup.object({
    fileData: yup
      .mixed()
      .required(
        t("kycBank.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "kycBank.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.FiveMB
      )
      .test(
        "fileFormat",
        t(
          "kycBank.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.PdfFormats.includes(value.type)
      ),
  });

  useEffect(() => {
    if (data.name) {
      const fileExtension = data.name.split('.').pop().toLowerCase();
      const fileSize = data.size / (1024 * 1024);
      if (fileExtension === 'pdf') {
        if (fileSize <= 5) {
          setUploaded(true);
          setFileName(data.name);
          let jsonObject = {
            docType: data["type"].split("/")[1],
            doc: data,
            docName: 'technicalBidDoc'
          };
          dispatch(fileDataUpload(jsonObject));
        } else {
          alert("Please upload a file below 5MB.");
        }
      } else {
        alert("Please upload a file with a PDF format only.");
      }
    }
  }, [data]);


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
    setData(files);
    setDragBoxClass("");
  };

  const onReUpload = () => {
    formikRef.current.setFieldValue("fileData", null);
    setData({});
    setFileName('');
    setUploaded(false);
    dispatch(clearImageUrl());
  };

  useEffect(() => {
    if (isFileSuccess) {
      dispatch(clearFileState());
    }
  }, [isFileSuccess]);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      UploadFiles: imageUrl,
      Type: "UploadFiles",
      docName: 'technicalBidDoc'
    };
    dispatch(TechnicalBidSave(requestData));

  };
  useEffect(() => {
    if (isTechnicalBidSuccess) {
      dispatch(clearImageUrl());
      onNext();
    }
  }, [isTechnicalBidSuccess])

  useEffect(() => {
    return () => {
      dispatch(clearSaveDeclerationState())
    }
  }, [])

  return (
    <FormCard>
      <Box className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={("Technical Qualification Document")}
            description={("Upload Your Technical Qualification Document")}
          />
        </Hidden>
        <Hidden mdUp>
          <KycStepperBox
            callingForMobileIs={true}
            title={t("kycBank.formControl.upload.title")}
            description={t("kycBank.formControl.upload.descp")}
          />
        </Hidden>
        <Box sx={{ margin: 5 }}>

          <Alert severity="info">1. Only PDF is allowed <br />
            2. Document Size Should be Less Than 5 MB<br />
            3. Concern Regarding Submit Technical Qualification Document ? Please Contact to CIDCO</Alert>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue }) => (
            <Form noValidate autoComplete="off" className={classes.kycFormContainer}>
              <div className={classes.kycCardFormRoot}>
                {isFileFetching && <UploadLoading />}
                {!isUploaded && !isFileFetching && (
                  <Box
                    textAlign="center"
                    margin={2}
                    p={5}
                    className={`${classes.kycDragnDropBox} ${dragBoxClass}`}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                  >
                    {isFileError && (
                      <AlertBox severity="error">{fileErrorMessage}</AlertBox>
                    )}
                    {isErrorApplicant && (
                      <AlertBox severity="error">{errorMessage}</AlertBox>
                    )}
                    <Box textAlign="center" marginBottom={3}>
                      <img
                        className={classes.iconStyle}
                        src={Upload}
                        alt="Verify OTP"
                      />
                    </Box>
                    <Box>
                      {t("kycBank.formControl.upload.dragNdDropText")}
                      <input
                        accept="application/pdf"
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
                            setData(
                              event.currentTarget.files[0]
                            );
                          }
                        }}
                      />
                      <label htmlFor="fileData">
                        <Button
                          color="primary"
                          variant="contained"
                          component="span"
                          className={classes.kycUploadBtn}
                          size="small"
                        >
                          {t("kycBank.formControl.upload.browseBtnText")}
                        </Button>
                      </label>
                    </Box>
                    <FormHelperText error variant="filled" className={classes.helperTextBox}>
                      <ErrorMessage name="fileData" />
                    </FormHelperText>
                    <Box margint={2}>
                      <Typography style={{ fontSize: 12 }}>
                        {t("kycBank.formControl.upload.fileLimit0")}
                        <strong> {("PDF")} </strong>
                        {'& Maximum Size 5 MB.'}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {isUploaded && !isFileFetching && (
                  <Box>
                    <Typography
                      className={classes.kycCaption}
                      variant="subtitle1"
                    >
                      {t("kycBank.formControl.upload.kycCaptionTxt1")}
                    </Typography>
                    {isImage ? <Box className={classes.panCardPreviewCard}>
                      <img
                        className={classes.panPreviewImg}
                        src={imageUrl}
                        alt="uploaded successfully"
                      />
                    </Box> : <Box textAlign="center" className={classes.panCardPreviewCard}>
                      <img
                        className={classes.panPreviewImg}
                        src={UploadedKyc}
                        alt="uploaded successfully"
                      />
                      <Typography className={classes.kycCaption}>
                        {t("kycBank.formControl.upload.success")}
                      </Typography>
                    </Box>}
                    <Box textAlign="left" marginTop={2}>
                      <Typography
                        className={classes.kycCaption}
                        variant="subtitle1"
                      >
                        {t("kycBank.formControl.upload.uploaded")}
                      </Typography>
                    </Box>
                    <Box className={classes.fileViewArea}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs="auto">
                          <PdfFileViewIcon color="primary" />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <Typography variant="body2" className={classes.fileUrlPreview} style={{ direction: "ltr" }}>
                            {fileName || "--"}
                          </Typography>
                        </Grid>
                        <Grid item xs="auto">
                          <Button
                            variant="text"
                            size="small"
                            color="primary"
                            onClick={onReUpload}
                          >
                            {t("kycBank.formControl.upload.reupload")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}
              </div>

              <Box className={classes.kycCardFooterRoot}>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                >
                  Save & Next
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </FormCard>
  )
}

export default TechnicalBid