import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import Typography from "@material-ui/core/Typography";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import { useSelector, useDispatch } from "react-redux";
import { applicationSelector } from "../../../../../redux/features/application/ApplicationSlice";
import { projectDataSelector } from "../../../../../redux/features/projectdata/ProjectDataSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import UploadedKyc from "../../../../../assets/UploadedKyc.svg"
import {
  GrievanceCategoryList,
  GrievanceTypeList,
  GrievanceTypeListPreBook,
  GrievanceTypeListOthers,
  GrievanceTypeListMaintenance,
  GrievanceTypeListAllotment,
  GrievanceTypeListCallCenter,
  GrievanceTypeListLottery,
} from "../../../../../utils/MasterData";
import {
  UploadFileIcon,
  ToolsIcon,
  NextArrowIcon1,
  BackArrowIcon,
  GrevianceBannerIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import { ImageSizes, SupportedFormats } from "../../../../../utils/Common";
import { GrievanceTabStyles } from "../GrievanceTab/GrievanceTab.styles";
import {
  fileUploadSelector,
  clearFileState,
  fileDataUpload,
} from "../../../../../redux/features/file/FileUploadSlice";
import {
  raiseGrievance,
  setGrievanceLog,
  grievanceSelector,
  clearSuccessMsg,
} from "../../../../../redux/features/Grievance/GrievanceSlice";
import {
  applicantSelector,
  clearApplicantData,
  clearApplicantState,
  getApplicant,
} from "../../../../../redux/features/applicant/ApplicantSlice";

import { clearFamilyData, clearFamilyState } from "../../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import { clearSuperStepperEditVars } from "../../../../../redux/features/stepper/StepperSlice";
import { clearAuthState } from "../../../../../redux/features/applicant/ApplicantAuthSlice";
import { GrievanceDetailsViewStyles } from "../GrievanceDetailsView/GrievanceDetailsView.styles";

// import { GrievanceTabStyles } from "../GrievanceTab/GrievanceTab.styles";

import IconTitle from "../../../../atoms/IconTitle/IconTitle";

const GrievanceUploadImageForm = (props) => {
  const classes1 = GrievanceTabStyles();
  const classes = GrievanceDetailsViewStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const dispatch = useDispatch();
  const history = useHistory();
  const { applicationData } = useSelector(applicationSelector);
  const [phnNumber, setPhnNumber] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [category, setCategory] = useState([]);
  const [Type, setType] = useState([]);
  const { isProjectDataFetching, isProjectDataError, projectDataErrorMessage } =
    useSelector(projectDataSelector);
  const { isFetchingApplicant, isSuccessResApplicant, applicantData } =
    useSelector(applicantSelector);
  // const [isEligible, setIsEligible] = useState(false);
  const formikRef = useRef();
  const [fileData, setFileData] = React.useState({});
  const [dragBoxClass, setDragBoxClass] = useState("");
  const [docFileData, setDocFileData] = useState({});
  const [isUploaded, setUploaded] = useState(false);

  const {
    isFileFetching,
    isFileSuccess,
    imageUrl,
    isFileError,
    fileErrorMessage,
  } = useSelector(fileUploadSelector);
  const {
    isGrievanceSuccess,
    grievanceData,
    isGrievanceError,
    grievanceErrorMsg,
    issearchSuccess,
    searchData,
    isFetchingGrievance,
    categoryDataList,
    typeData,
  } = useSelector(grievanceSelector);

  useEffect(() => {
    if (docFileData.name) {
      setUploaded(true);
      let jsonObject = {
        docType: docFileData["type"].split("/")[1],
        doc: docFileData,
        docName: 'grievance document'
      };

      dispatch(fileDataUpload(jsonObject));
    }
  }, [docFileData]);

  useEffect(() => {
    if (isFileSuccess) {
      dispatch(clearFileState());
    }
  }, [isFileSuccess]);

  // useEffect(() => {
  //   if (isGrievanceSuccess) {
  //     console.log(grievanceData);
  //   }
  // }, [grievanceData, isGrievanceSuccess]);

  const initialValues = {
    grievanceDescription: "",
    fileData: null,
  };

  const validationSchema = yup.object({
    // fullName: yup
    //   .string()
    //   .required(t("grievanceForm.formControl.fullNameErrors.required")),
    // emailId: yup
    //   .string()
    //   .email(t("grievanceForm.formControl.emailIdErrors.limitation"))
    //   .required(t("grievanceForm.formControl.emailIdErrors.required")),
    // mobileNumber: yup
    //   .string()
    //   .matches(
    //     /^[6-9]\d{9}$/,
    //     t("grievanceForm.formControl.mobileNumberErrors.limitation")
    //   )
    //   .required(t("grievanceForm.formControl.mobileNumberErrors.required")),
    // grievanceCategory: yup
    //   .string()
    //   .required(
    //     t("grievanceForm.formControl.grievanceCategoryErrors.required")
    //   ),
    // grievanceType: yup
    //   .string()
    //   .required(t("grievanceForm.formControl.grievanceTypeErrors.required")),
    // grievanceDescription: yup
    //   .string()
    //   .required(
    //     t("grievanceForm.formControl.grievanceDescriptionErrors.required"),
    //   ),
    grievanceDescription: yup.string()
      .matches(/^([a-zA-Z0-9\_,]\s*)+$/, t("grievanceForm.formControl.charactersNotAllowed"))
      .max(1150, 'Description must be at most 150 characters').required(t("grievanceForm.formControl.grievanceDescriptionErrors.required")),
    // fileData: yup
    //   .mixed()
    //   .required(t("grievanceForm.formControl.uploadErrors.required"))
    //   .test(
    //     "fileSize",
    //     t("grievanceForm.formControl.uploadErrors.limitation"),
    //     (value) => value && value.size <= ImageSizes.TwoMB
    //   )
    //   .test(
    //     "fileFormat",
    //     t("grievanceForm.formControl.uploadErrors.fileFormat"),
    //     (value) => value && SupportedFormats.DocsFormats.includes(value.type)
    //   ),
  });

  const fileChangeEvent = (event) => {
    setFileData(event.currentTarget.files[0]);
  };

  const handleOnRemoveFile = () => {
    setUploaded(false);
    // let jsonObject = {
    //   docType: "",
    //   doc: "",
    // };
    // dispatch(fileDataUpload(jsonObject));
    dispatch(clearFileState());

  };

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

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    const formPageData = JSON.parse(localStorage.getItem("selectedFormData"));
    console.log(formPageData, "formPageData");
    setSubmitting(false);
    if (values.grievanceDescription) {
      const requestData = new FormData();
      // props.setGrievanceSecStates("thankYou");
      requestData.append(
        "full_name",
        applicantData?.FirstName
      );
      requestData.append("email", formPageData?.emailId);
      requestData.append("grievance_category", formPageData?.grievanceCategory);
      requestData.append("grievances_type", formPageData?.grievanceType);
      requestData.append("description", values.grievanceDescription);
      requestData.append("attachment", imageUrl != undefined ? imageUrl : "");
      requestData.append("status", "New");
      requestData.append("mobile_no", applicantData?.MobileNo);
      requestData.append("applicantid", localStorage.getItem("applicantId"));
      dispatch(raiseGrievance(requestData));
    }
  };
  useEffect(() => {
    if (isGrievanceSuccess) {
      dispatch(clearSuccessMsg());
      props.setformData(grievanceData);
      let params = {
        grvId: grievanceData.grvid,
        type: "Applicant",
        comment: grievanceData.description,
        attachment: imageUrl != undefined ? imageUrl : "",
        Lang: localStorage.getItem("i18nextLng"),
        fromcrm: 0,
        caseNumber: grievanceData.crm?.caseNumber,
        caseId: grievanceData.crm?.caseId,
        status: "",
      };

      dispatch(setGrievanceLog(params));
      if (grievanceData.crm?.caseId) {
        props.setGrievanceSecStates("thankYou");
      }
    }
  }, [isGrievanceSuccess]);

  useEffect(() => {
    if (grievanceErrorMsg == "Unauthorized Access!") {
      var myItem = localStorage.getItem('i18nextLng');
      localStorage.clear();
      localStorage.setItem('i18nextLng', myItem);
      dispatch(clearSuperStepperEditVars());
      dispatch(clearAuthState());
      dispatch(clearApplicantData());
      dispatch(clearApplicantState());
      dispatch(clearFamilyData());
      dispatch(clearFamilyState());
      // setTimeout(() => {
      //   history.push("/otp-login");
      // }, 3000);

    }
  }, [grievanceErrorMsg])

  // useEffect(() => {
  //   if (isSuccessResApplicant) {
  //     // console.log(applicantData.MobileNo);
  //     setPhnNumber(
  //       applicantData?.MobileNo.length > 0 && applicantData.MobileNo
  //     );
  //     setApplicantId(
  //       applicantData?.ApplicantId.length > 0 && applicantData.ApplicantId
  //     );
  //   }
  // }, [isSuccessResApplicant]);

  useEffect(() => {
    dispatch(getApplicant());
  }, [dispatch]);

  return (
    <div>
      {isFileFetching && <Loading isOpen={isFileFetching} />}
      <Box textAlign="center">
        <Box className={classes.grevianceContainer}>
          <Grid container justifyContent="center">
            <Grid item md={4}>
              <Box className={classes.grievanceLeftSection}>
                <Hidden smDown>
                  <GrevianceBannerIcon className="bannerIconSmall" />
                  <Typography variant="h6" className={classes.secHeader}>
                    {t("grievanceForm.step2nfo.questionText")}
                  </Typography>

                  <Box className="stepsInfoContainer">
                    <Box className="stepContent">
                      <Box className="stepCount">1</Box>
                      <Typography variant="subtitle2" className="setpTxt">
                        {t("grievanceForm.step2nfo.step1")}
                      </Typography>
                    </Box>

                    <Box className="stepContent">
                      <Box className="stepCount">2</Box>
                      <Typography variant="subtitle2" className="setpTxt">
                        {t("grievanceForm.step2nfo.step1")}
                      </Typography>
                    </Box>

                    <Box className="stepContent">
                      <Box className="stepCount">3</Box>
                      <Typography variant="subtitle2" className="setpTxt">
                        {t("grievanceForm.step2nfo.step2")}
                      </Typography>
                    </Box>
                  </Box>
                </Hidden>
              </Box>
            </Grid>
            <Grid item md={8}>
              <Box className={classes.grievanceRightSection}>
                <div className={classes.grievanceFormCont}>
                  {isFetchingGrievance && (
                    <Loading isOpen={isFetchingGrievance} />
                  )}

                  <Hidden smDown>
                    <Typography variant="h6" className={classes.secTitle}>
                      {t("grievanceForm.step2nfo.title")}
                    </Typography>
                  </Hidden>

                  <Hidden mdUp>
                    <Typography variant="h6" className={classes.secTitle}>
                      {t("grievanceForm.title")}
                    </Typography>

                    <Typography variant="h6" className={classes.secHeader}>
                      {t("grievanceForm.step1Info.title")}
                    </Typography>
                  </Hidden>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    innerRef={formikRef}
                  >
                    {({ submitForm, setFieldValue, values }) => (
                      <Form noValidate autoComplete="off">
                        <Box className={classes.fileUploadSection}>
                          {/* {isFileFetching && <Box className={classes.uploadDocLoader}><UploadLoading /></Box>} */}
                          <Typography className={classes.formLabel}>{t("grievanceForm.formControl.UploadImage")} <small style={{ color: "#6f7f8c" }}>(optional)</small></Typography>
                          {isUploaded == false ? (<Box className={`${classes.kycDragnDropBox} ${dragBoxClass}`}
                            onDragOver={dragOver}
                            onDragEnter={dragEnter}
                            onDragLeave={dragLeave}
                            onDrop={fileDrop}
                          >
                            <Box className="fileIploadDes">
                              {/* <IconTitle icon={<UploadFileIcon />} title={t("grievanceForm.formControl.uploadButtonText")} /> */}
                              <Grid container alignItems="center">
                                <Grid item md={4} xs={12}>
                                  <label htmlFor="fileData">
                                    <Button
                                      color="primary"
                                      variant="text"
                                      component="span"
                                      size="large"
                                      className={classes.kycUploadBtn}
                                      startIcon={
                                        <UploadFileIcon
                                          style={{ fontSize: "1.875rem" }}
                                        />
                                      }
                                    >
                                      {t("grievanceForm.formControl.uploadButtonText")}
                                    </Button>
                                  </label>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                  <Typography
                                    className={classes.dragAndDropTxt}
                                  >
                                    <FormHelperText error variant="filled">
                                      <ErrorMessage name="fileData" />
                                    </FormHelperText>
                                    <Hidden smDown>
                                      <span className="placeHolderTxt">
                                        {isUploaded == false
                                          && t("grievanceForm.formControl.fileUploadDescription")}
                                      </span>
                                    </Hidden>
                                    {/* <Hidden mdUp>
                                      {console.log(isUploaded, "isUploaded 1212")}
                                      <span className="placeHolderTxt">
                                        {isUploaded == true
                                          ? imageUrl?.length > 20
                                            ? `...${imageUrl.slice(-20)}`
                                            : imageUrl
                                          : "or Drag & Drop image 1212"}
                                      </span>
                                    </Hidden> */}
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
                                          setDocFileData(
                                            event.currentTarget.files[0]
                                          );
                                        }
                                      }}
                                    />
                                  </Typography>
                                </Grid>

                                {/* <Typography className="placeHolderTxt">
                                    {t("grievanceForm.formControl.fileUploadDescription")}
                                  </Typography> */}
                              </Grid>
                            </Box>
                          </Box>) : (
                            <Box className={`${classes.fileDetailSection}`}>
                              <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                                <Grid item xs={2}>
                                  {isFileError == false &&
                                    <img
                                      className={classes.previewImg}
                                      src={UploadedKyc}
                                      alt="uploaded"
                                      height='38px'
                                      style={{ marginTop: 6 }}
                                    />}
                                </Grid>
                                <Grid item xs={7}>
                                  <Typography className={classes.fileNameTxt}>
                                    {isFileError == false && (docFileData.name?.length > 20 ? `...${docFileData.name.slice(-20)}` : docFileData.name)}
                                  </Typography>
                                  {isFileError && (
                                    <>
                                      <Typography variant="subtitle1" className={classes.ErrorMessageTxt}>{fileErrorMessage}</Typography>
                                    </>
                                  )}
                                </Grid>
                                <Grid item xs={3}>
                                  <IconButton className={classes.clearIcon}>
                                    <CloseOutlinedIcon onClick={() => handleOnRemoveFile()} />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Box>
                          )}
                        </Box>
                        {(grievanceErrorMsg != "Unauthorized Access!" && isGrievanceError) && <AlertBox severity="error">{grievanceErrorMsg}</AlertBox>}
                        <Typography className={classes.formLabel}>{t("grievanceForm.formControl.grievanceDescriptionLabel")}</Typography>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "grievanceForm.formControl.grievanceDescriptionLabel"
                          )}
                          placeholder={t(
                            "grievanceForm.formControl.grievanceDescriptionPlaceholder"
                          )}
                          name="grievanceDescription"
                          type="text"
                          multiline
                          rows={5}
                          id="grievanceDescription"
                          inputProps={{ maxLength: 150 }}
                          required
                        />

                        <Grid>
                          <FormHelperText error variant="filled">
                            <ErrorMessage name="file" />
                          </FormHelperText>
                        </Grid>

                        <Box className={classes.formFooter}>
                          <Grid
                            container
                            style={{ marginTop: "40px" }}
                          >
                            <Grid item xs={4}>
                              <Box textAlign="center">
                                <Button
                                  color="primary"
                                  size="large"
                                  className="formBtn"
                                  onClick={() =>
                                    props.setGrievanceSecStates("form")
                                  }
                                  startIcon={
                                    <BackArrowIcon
                                      className="arrowLeft"
                                      style={{ fontSize: "0.8rem" }}
                                    />
                                  }
                                >
                                  {t(
                                    "grievanceForm.formControl.backButtonText"
                                  )}
                                </Button>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box textAlign="center">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  onClick={submitForm}
                                  className="formBtn"
                                  endIcon={
                                    <NextArrowIcon1
                                      className="arrowRight"
                                      style={{ fontSize: "1rem" }}
                                    />
                                  }
                                  disabled={isFileError}
                                >
                                  {t(
                                    "grievanceForm.formControl.submitButtonText"
                                  )}
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Box className="footerNote">
            {grievanceErrorMsg == "Unauthorized Access!" && <AlertBox severity="error">Your session is expired, kindly login again.</AlertBox>}
            <IconTitle
              icon={<ToolsIcon />}
              title={t("grievanceForm.homeSection.userNoteText")}
            />
          </Box>
        </Box>

        {/* <Box className={classes.errorMsgView}>
          <Box marginBottom={1}>
            <img src={DataNoteFoundIcon} width={180} />
          </Box>
          <Typography>{props.firstLineMsg}</Typography>
          <Typography>{props.secdLineMsg}</Typography>
        </Box>
        <Button variant="contained"
          color="primary"
          size="large" endIcon={<ChevronRightOutlinedIcon />} onClick={() => props.action()}>{props.actionBtnTxt}</Button> */}
      </Box>
    </div>
  );
};

export default GrievanceUploadImageForm;
