import React, { useEffect, useRef, useState } from "react";
import KycTemplate from "../../../../templates/KycTemplate/KycTemplate";
import KycTitleDescriBox from "../../../../atoms/KycTitleDescriBox/KycTitleDescriBox";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
// import FormControl from "../../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../../InitialPages.styles";
import withWidth from "@material-ui/core/withWidth";
import { useSelector, useDispatch } from "react-redux";
import {
  NextArrowIcon,
  FileUploadIcon,
  WhiteArrowIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import Upload from "../../../../../assets/Upload.svg";
import { Typography, Grid } from "@material-ui/core/";
import { ImageSizes, SupportedFormats } from "../../../../../utils/Common";
import UploadedKyc from "../../../../../assets/UploadedKyc.svg";
// import FolderIcon from "@material-ui/icons/Folder";
import Hidden from "@material-ui/core/Hidden";
import CoApplicantKycStepperBox from "../../../../atoms/KycStepperBox/CoApplicantKycStepperBox";
/* import {
  editApplicant,
  applicantSelector,
  clearApplicantState,
  clearApplicantData
} from "../../../../../redux/features/applicant/ApplicantSlice"; */
import {
  coApplicantUploadFiles,
  coApplicantSelector,
  clearCoApplicantState,
  clearCoApplicantData
} from "../../../../../redux/features/coApplicant/CoApplicantSlice";
import {
  fileDataUpload,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl
} from "../../../../../redux/features/file/FileUploadSlice";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../../redux/features/stepper/StepperSlice";

function UploadAadhar(props) {
  const { width } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploadedFileData, setUploadedFileData] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [dragBoxClass, setDragBoxClass] = useState("");
  // const stepperData = useSelector((state) => state.stepper.stepperData);
  // const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const {
    isFileFetching,
    isFileSuccess,
    imageUrl,
    isFileError,
    fileErrorMessage,
  } = useSelector(fileUploadSelector);
  const {
    isFetchingCoApplicantUpload,
    isSuccessResCoApplicantUpload,
    isErrorCoApplicantUpload,
    errorMsgCoApplicantUpload,
    coApplicantDataUpload
  } = useSelector(coApplicantSelector);

  const initialValues = {
    fileData: "",
  };

  const validationSchema = yup.object({
    fileData: !imageUrl && yup
      .mixed()
      .required(
        t("uploadAadhaarCardForm.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "uploadAadhaarCardForm.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "uploadAadhaarCardForm.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ),
  });

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
    setUploadedFileData(files);
    setDragBoxClass("");
  };

  const onReUpload = () => {
    formikRef.current.setFieldValue("fileData", null);
    setUploadedFileData({});
    setUploaded(false);
    dispatch(clearImageUrl());
  };

  useEffect(() => {
    if (uploadedFileData.name) {
      if (SupportedFormats.DocsFormats.includes(uploadedFileData['type'])) {
        setUploaded(true);
        if (uploadedFileData['type'].split('/')[0] == 'image') {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        dispatch(fileDataUpload(uploadedFileData));
      }
    }
  }, [uploadedFileData]);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      // ApplicantId: localStorage.getItem("applicantId"),
      AadharFile: imageUrl,
      Type: "UploadFilesCoApplicant"
    };
    dispatch(coApplicantUploadFiles(requestData));
  };

  useEffect(() => {
    if (isSuccessResCoApplicantUpload) {
      dispatch(clearCoApplicantState());
      dispatch(clearCoApplicantData());
      dispatch(clearImageUrl());
      updateStepperUI();
      // history.push("/verify-pancard");
      // history.push("/bank-detail");
    }
  }, [isSuccessResCoApplicantUpload]);

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_sub_stepper = [];
      let new_obj = {};
      if (element.step == 1) {
        for (let i = 0; i < element.coApplicantKycStepper.length; i++) {
          const inner_element = element.coApplicantKycStepper[i];
          let new_sub_obj = {};
          if (inner_element.step == 2) {
            new_sub_obj = {
              ...inner_element,
              status: "completed"
            };
          } else {
            new_sub_obj = {
              ...inner_element
            };
          }
          new_sub_stepper.push(new_sub_obj);
        }
        new_obj = {
          ...element,
          coApplicantKycStepper: new_sub_stepper
        };
      } else {
        new_obj = {
          ...element,
        };
      }
      newStepper.push(new_obj);
    }
    dispatch(addEditStepper(newStepper));
  };

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(getStepperDetails());
      dispatch(clearSuperStepperEditVars());
      history.push("/co-applicant-verify-pancard");
    }
  }, [isSuccessReqStepper]);

  const skipFlow = ()=> {
    history.push("/co-applicant-verify-pancard");
  }

  return (
    <KycTemplate isCoApplicant={true}>
      {(isFetchingCoApplicantUpload || isFetchingStepper) && (
        <Loading isOpen={isFetchingCoApplicantUpload || isFetchingStepper} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={t("uploadAadhaarCardForm.title1")}
            description={t("uploadAadhaarCardForm.description1")}
          />
        </Hidden>
        <Hidden mdUp>
          <CoApplicantKycStepperBox
            callingForMobileIs={true}
            title={t("uploadAadhaarCardForm.title1")}
            description={t("uploadAadhaarCardForm.description1")}
          />
        </Hidden>
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
                    p={3}
                    className={`${classes.kycDragnDropBox} ${dragBoxClass}`}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                  >
                    {isFileError && (
                      <AlertBox severity="error">{fileErrorMessage}</AlertBox>
                    )}
                    {isErrorCoApplicantUpload && (
                      <AlertBox severity="error">{errorMsgCoApplicantUpload}</AlertBox>
                    )}
                    <Box textAlign="center" marginBottom={3}>
                      <img
                        className={classes.iconStyle}
                        src={Upload}
                        alt="Verify OTP"
                      />
                    </Box>
                    <Box className={classes.dragNdDropText}>
                      {t("uploadAadhaarCardForm.formControl.dragNdDropText")}
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
                            setUploadedFileData(event.currentTarget.files[0]);
                          }
                        }}
                      />
                      <label htmlFor="fileData">
                        <Button
                          type="button"
                          color="primary"
                          variant="contained"
                          component="span"
                          className={classes.kycUploadBtn}
                          size="small"
                        >
                          {t("uploadAadhaarCardForm.formControl.browseBtnText")}
                        </Button>
                      </label>
                    </Box>
                    <FormHelperText error variant="filled" className={classes.helperTextBox}>
                      <ErrorMessage name="fileData" />
                    </FormHelperText>
                    <Box margint={2}>
                      <Typography style={{ fontSize: 12 }}>
                        {t("uploadAadhaarCardForm.formControl.fileLimit0")}
                        <strong> {t("uploadAadhaarCardForm.formControl.fileLimit1")} </strong>
                        {t("uploadAadhaarCardForm.formControl.fileLimit2")}
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
                      {t("uploadAadhaarCardForm.formControl.kycCaptionTxt1")}
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
                        {t("uploadAadhaarCardForm.formControl.success")}
                      </Typography>
                    </Box>}
                    <Box textAlign="left" marginTop={2}>
                      <Typography
                        className={classes.kycCaption}
                        variant="subtitle1"
                      >
                        {t("uploadAadhaarCardForm.formControl.kycCaptionTxt2")}
                      </Typography>
                    </Box>
                    <Box className={classes.fileViewArea}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs="auto">
                          <FileUploadIcon color="primary" />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <Typography variant="body2" className={classes.fileUrlPreview}>
                            {imageUrl || "--"}
                          </Typography>
                        </Grid>
                        <Grid item xs="auto">
                          <Button
                            variant="text"
                            size="small"
                            color="primary"
                            onClick={onReUpload}
                          >
                            {t("uploadAadhaarCardForm.formControl.buttonText2")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}
              </div>
              <Box className={classes.kycCardFooterRoot}>
                {/* {localStorage.getItem("skipFlow") == "true" && <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={skipFlow}
                  className={classes.nxtBtn}
                  endIcon={
                   <NextArrowIcon style={{ fill: "transparent" }} />
                  }
                >
                 Skip Now
                </Button> } */}
                <Button
                  type="submit"
                  variant="text"
                  color="primary"
                  size="large"
                  // onClick={submitForm}
                  className={classes.nxtBtn}
                  endIcon={
                    width === "xs" ? (
                      <WhiteArrowIcon style={{ fill: "transparent" }} />
                    ) : (
                      <NextArrowIcon style={{ fill: "transparent" }} />
                    )
                  }
                >
                  {t("verifyAadhaarForm.formControl.buttonText3")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </KycTemplate>
  );
}

export default withWidth()(UploadAadhar);
