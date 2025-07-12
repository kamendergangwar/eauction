import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { initialPagesStyles } from "../../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  NextArrowIcon,
  WhiteArrowIcon,
  FileUploadIcon
} from "../../../../atoms/SvgIcons/SvgIcons";
import KycTemplate from "../../../../templates/KycTemplate/KycTemplate";
import KycTitleDescriBox from "../../../../atoms/KycTitleDescriBox/KycTitleDescriBox";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { ImageSizes, SupportedFormats } from "../../../../../utils/Common";
import UploadedKyc from "../../../../../assets/UploadedKyc.svg";
import FolderIcon from "@material-ui/icons/Folder";
import { Typography, Grid } from "@material-ui/core/";
import Upload from "../../../../../assets/Upload.svg";
import Hidden from "@material-ui/core/Hidden";
import KycStepperBox from "../../../../atoms/KycStepperBox/KycStepperBox";
import withWidth from "@material-ui/core/withWidth";
import UserDeclarationDialogBox from "../../../../molecules/DialogBoxes/UserDeclarationDialogBox/UserDeclarationDialogBox";
import {
  fileDataUpload,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl
} from "../../../../../redux/features/file/FileUploadSlice";
import {
  editApplicant,
  applicantSelector,
  clearApplicantState,
  clearApplicantData,
  getApplicant
} from "../../../../../redux/features/applicant/ApplicantSlice";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../../redux/features/stepper/StepperSlice";
import { createAccountLog } from "../../../../../redux/features/masterdata/MasterDataSlice";

function UploadCheque(props) {
  const { width } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isUserDeclarationDialogOpen, setUserDeclarationDialogOpen] = useState(false);
  const [dragBoxClass, setDragBoxClass] = useState("");
  // const stepperData = useSelector((state) => state.stepper.stepperData);
  // const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);
  const {
    isFileFetching,
    isFileSuccess,
    imageUrl,
    isFileError,
    fileErrorMessage,
  } = useSelector(fileUploadSelector);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
  } = useSelector(applicantSelector);
  const { applicantData, isSuccessResApplicantGet } = useSelector(applicantSelector);
  const initialValues = {
    fileData: "",
  };
  
  const validationSchema = yup.object({
    fileData: !imageUrl && yup
      .mixed()
      .required(
        t("kycBank.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "kycBank.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "kycBank.formControl.uploadErrors.fileFormat"
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
    setData(files);
    setDragBoxClass("");
  };

  const onReUpload = () => {
    formikRef.current.setFieldValue("fileData", null);
    setData({});
    setUploaded(false);
    dispatch(clearImageUrl());
  };

  useEffect(() => {
    if (data.name) {
      if (SupportedFormats.DocsFormats.includes(data['type'])) {
        // setUploaded(true);
        if (data['type'].split('/')[0] == 'image') {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        let sendData = {
          doc: data,
          docName: 'cancel cheque'
        }
        dispatch(fileDataUpload(sendData));
      }
    }
  }, [data]);

  useEffect(() => {
    if (isFileSuccess) {
      setUploaded(true);
    }
  }, [isFileSuccess])

  

  //console.log(applicantData.register_type,"asasasas")
  useEffect(() => {
    let declrtnAgreedIs = localStorage.getItem("agreedDeclaration");
    if (declrtnAgreedIs) {
      setUserDeclarationDialogOpen(true);
    }
  }, []);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      cancelledcheque: imageUrl,
      Type: "UploadFiles",
    };
    dispatch(editApplicant(requestData));
  };

  useEffect(() => {
    if (isSuccessResApplicant) {
      // const requestData = {
      //   ApplicantId:localStorage.getItem("applicantId"),
      //   steps: "step_7",
      //   debug:0,
      // }
      // dispatch(createAccountLog(requestData));
      dispatch(clearApplicantState());
      dispatch(clearApplicantData());
      // dispatch(clearImageUrl());
      updateStepperUI();
      // history.push("/verify-pancard");
      // history.push("/bank-detail");
    }
  }, [isSuccessResApplicant]);

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_sub_stepper = [];
      let new_obj = {};
      if (element.step == 1) {
        for (let i = 0; i < element.applicantKycStepper.length; i++) {
          const inner_element = element.applicantKycStepper[i];
          let new_sub_obj = {};
          if (inner_element.step == 6) {
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
          applicantKycStepper: new_sub_stepper
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
      setUserDeclarationDialogOpen(true);
    }
  }, [isSuccessReqStepper]);

  const skipFlow = () => {
    history.push("/personal-details");
  }


  return (
    <KycTemplate>
      {(isFetchingApplicant || isFetchingStepper) && (
        <Loading isOpen={isFetchingApplicant || isFetchingStepper} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={t("kycBank.formControl.upload.title")}
            description={t("kycBank.formControl.upload.descp")}
          />
        </Hidden>
        <Hidden mdUp>
          <KycStepperBox
            callingForMobileIs={true}
            title={t("kycBank.formControl.upload.title")}
            description={t("kycBank.formControl.upload.descp")}
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
                            setData(event.currentTarget.files[0]);
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
                        <strong> {t("kycBank.formControl.upload.fileLimit1")} </strong>
                        {t("kycBank.formControl.upload.fileLimit2")}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {/* {isUploaded && (
                  <Box textAlign="center" margin={0} p={2}>
                    <Box textAlign="center" marginY={1}>
                      <img
                        className={classes.iconStyle}
                        src={UploadedKyc}
                        alt="uploaded successfully"
                      />
                    </Box>
                    <Box textAlign="center" marginTop={5}>
                      <Typography className={classes.kycCaption}>
                        {t("kycBank.formControl.upload.success")}
                      </Typography>
                    </Box>
                    <Box textAlign="left" marginTop={5}>
                      <Typography
                        className={classes.kycCaption}
                        variant="subtitle1"
                      >
                        {t("kycBank.formControl.upload.uploaded")}
                      </Typography>
                    </Box>
                    <Box className={classes.fileViewArea}>
                      <Grid container spacing={1}>
                        <Grid item xs={2} sm={1}>
                          <FolderIcon color="primary" fontSize="large" />
                        </Grid>
                        <Grid item xs={4} sm={7}>
                          <Typography variant="body2" style={{ fontSize: 14 }}>
                            {data.name.length > 20
                              ? `...${data.name.slice(-10)}`
                              : data.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4}>
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
                )} */}

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
                            {t("kycBank.formControl.upload.reupload")}
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
                  // fullWidth
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
      <UserDeclarationDialogBox open={isUserDeclarationDialogOpen} onClose={setUserDeclarationDialogOpen}  />
    </KycTemplate>
  );
}

export default withWidth()(UploadCheque);
