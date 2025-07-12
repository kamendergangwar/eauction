import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import Typography from "@material-ui/core/Typography";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useSelector, useDispatch } from "react-redux";
import { applicationSelector } from "../../../../../redux/features/application/ApplicationSlice";
import { projectDataSelector } from "../../../../../redux/features/projectdata/ProjectDataSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
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
import { UploadFileIcon, ToolsIcon, NextArrowIcon1, BackArrowIcon, GrevianceBannerIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import { ImageSizes, SupportedFormats } from "../../../../../utils/Common";
import { GrievanceTabStyles } from "../GrievanceTab/GrievanceTab.styles";
import {
  fileUploadSelector,
  fileDataUpload,
} from "../../../../../redux/features/file/FileUploadSlice";
import {
  raiseGrievance,
  clearGrievanceData,
  grievanceSelector,
} from "../../../../../redux/features/Grievance/GrievanceSlice";
import {
  applicantSelector,
  getApplicant,
} from "../../../../../redux/features/applicant/ApplicantSlice";
import { GrievanceDetailsViewStyles } from "../GrievanceDetailsView/GrievanceDetailsView.styles";

// import { GrievanceTabStyles } from "../GrievanceTab/GrievanceTab.styles";

import IconTitle from "../../../../atoms/IconTitle/IconTitle";

const GrievanceForm = (props) => {
  const classes1 = GrievanceTabStyles();
  const classes = GrievanceDetailsViewStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const dispatch = useDispatch();
  const { applicationData } = useSelector(applicationSelector);
  const [phnNumber, setPhnNumber] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [Type, setType] = useState([]);
  const { isProjectDataFetching, isProjectDataError, projectDataErrorMessage } =
    useSelector(projectDataSelector);
  const { isFetchingApplicant, isSuccessResApplicant, applicantData } =
    useSelector(applicantSelector);
  // const [isEligible, setIsEligible] = useState(false);
  const formikRef = useRef();
  const [fileData, setFileData] = React.useState({});

  const { imageUrl } = useSelector(fileUploadSelector);
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

  // useEffect(() => {
  //   dispatch(fileDataUpload(fileData));
  // }, [fileData]);


  useEffect(() => {
    const finalList = categoryDataList.filter((v, i, a) => a.findIndex(t => (t.value === v.value)) === i)
    setCategoryList(finalList);
  }, [categoryDataList])

  // useEffect(() => {
  //   if (isGrievanceSuccess) {
  //     console.log(grievanceData);
  //   }
  // }, [grievanceData, isGrievanceSuccess]);

  const initialValues = {
    // fullName: "",
    emailId: "",
    // mobileNumber: "",
    grievanceCategory: "",
    grievanceType: "",
    // grievanceDescription: "",
    // file: null,
  };

  const setTypeData = (catID) => {
    let typeBucket = [];
    const tempType = typeData.filter((list) => list.GrivianceCatId === catID);
    tempType.forEach((element) => {
      typeBucket.push({ value: element.id, label: element.name });
    });
    setType(typeBucket);
  }

  useEffect(() => {
    let typeBucket = [];
    const tempType = typeData.filter(
      (list) => list.GrivianceCatId === category
    );
    tempType.forEach((element) => {
      typeBucket.push({ value: element.id, label: element.name });
    });
    setType(typeBucket);
  }, [category]);

  const validationSchema = yup.object({
    // fullName: yup
    //   .string()
    //   .required(t("grievanceForm.formControl.fullNameErrors.required")),
    emailId: yup
      .string()
      .email(t("grievanceForm.formControl.emailIdErrors.limitation")),
    // .required(t("grievanceForm.formControl.emailIdErrors.required")),
    // mobileNumber: yup
    //   .string()
    //   .matches(
    //     /^[6-9]\d{9}$/,
    //     t("grievanceForm.formControl.mobileNumberErrors.limitation")
    //   )
    //   .required(t("grievanceForm.formControl.mobileNumberErrors.required")),
    grievanceCategory: yup
      .string()
      .required(
        t("grievanceForm.formControl.grievanceCategoryErrors.required")
      ),
    grievanceType: yup
      .string()
      .required(t("grievanceForm.formControl.grievanceTypeErrors.required")),
    // grievanceDescription: yup
    //   .string()
    //   .required(
    //     t("grievanceForm.formControl.grievanceDescriptionErrors.required")
    //   ),
    /* file: yup
      .mixed()
      .required(
        t("grievanceForm.formControl.uploadErrors.required")
      )
      .test(
        "fileSize",
        t(
          "grievanceForm.formControl.uploadErrors.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "grievanceForm.formControl.uploadErrors.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ), */
  });

  const fileChangeEvent = (event) => {
    setFileData(event.currentTarget.files[0]);
  };

  const handleOnRemoveFile = () => {
    formikRef.current.setFieldValue("file", null);
    setFileData({});
  };

  const onSubmit = (values, { setSubmitting }) => {
    localStorage.setItem("selectedFormData", JSON.stringify(values));
    setSubmitting(false);
    if (
      values.grievanceCategory &&
      values.grievanceType
    ) {
      const requestData = new FormData();
      props.setGrievanceSecStates("uploadImageForm");

      // requestData.append("full_name", values.fullName);
      // requestData.append("email", values.emailId);
      // requestData.append("mobile_no", values.mobileNumber);
      // requestData.append("mobile_no", phnNumber);
      // requestData.append("grievance_category", values.grievanceCategory);
      // requestData.append("grievances_type", values.grievanceType);
      // requestData.append("description", values.grievanceDescription);
      // requestData.append("attachment", imageUrl);
      // requestData.append("status", "1");
      // requestData.append("applicantid", applicantId);
      // dispatch(raiseGrievance(requestData));
    }
  };
  // useEffect(() => {
  //   if (isGrievanceSuccess) {
  //     console.log("thankYou 1")
  //     props.setGrievanceSecStates("thankYou");
  //   }
  // }, [isGrievanceSuccess]);

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

  const handleCloseClick = () => {
    if (issearchSuccess) {
      if (searchData?.length > 0) {
        props.setGrievanceSecStates("table");
      } else {
        props.setGrievanceSecStates("default");
      }
    } else {
      props.setGrievanceSecStates("default");
    }
  };

  return (
    <div>
      <Box textAlign="center">
        <Box className={classes.grevianceContainer}>
          <Grid container>
            <Grid item md={4}>
              <Box className={classes.grievanceLeftSection}>
                <Hidden smDown>
                  <GrevianceBannerIcon className="bannerIconSmall" />

                  <Typography variant="h6" className={classes.secHeader}>
                    {t("grievanceForm.step1Info.title")}
                  </Typography>
                  <Box className="stepsInfoContainer">
                    <Box className="stepContent">
                      <Box className="stepCount">1</Box>
                      <Typography variant="subtitle2" className="setpTxt"> {t("grievanceForm.step1Info.step1")}</Typography>
                    </Box>

                    <Box className="stepContent">
                      <Box className="stepCount">2</Box>
                      <Typography variant="subtitle2" className="setpTxt">{t("grievanceForm.step1Info.step2")}</Typography>
                    </Box>

                    <Box className="stepContent">
                      <Box className="stepCount">3</Box>
                      <Typography variant="subtitle2" className="setpTxt">{t("grievanceForm.step1Info.step3")}</Typography>
                    </Box>

                    <Box className="stepContent">
                      <Box className="stepCount">4</Box>
                      <Box>
                        <Typography variant="subtitle2" className="setpTxt">{t("grievanceForm.step1Info.step4")}</Typography>
                      </Box>
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
                  <Typography variant="h6" className={classes.secTitle}>
                    {t("grievanceForm.title")}
                  </Typography>

                  <Hidden mdUp>
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
                        {/* {isGrievanceError && (
                          <AlertBox severity="error">
                            {grievanceErrorMsg}
                          </AlertBox>
                        )} */}

                        {/* <FormControl
                control="input"
                variant="outlined"
                label={t("grievanceForm.formControl.fullNameLabel")}
                placeholder={t("grievanceForm.formControl.fullNamePlaceholder")}
                name="fullName"
                type="text"
                id="fullName"
                required
              /> */}
                        {/* <FormControl
                control="input"
                variant="outlined"
                label={t("grievanceForm.formControl.mobileNumberLabel")}
                placeholder={t(
                  "grievanceForm.formControl.mobileNumberPlaceholder"
                )}
                name="mobileNumber"
                type="number"
                id="mobileNumber"
                required
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              /> */}

                        <Typography className={classes.formLabel}>{t("grievanceForm.formControl.grievanceCategoryLabel")}</Typography>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          // label={t(
                          //   "grievanceForm.formControl.grievanceCategoryLabel"
                          // )}
                          name="grievanceCategory"
                          id="grievanceCategory"
                          options={categoryList}
                          required
                          onChange={(e) => {
                            setFieldValue("grievanceCategory", e.target.value);
                            setCategory(e.target.value);
                          }}
                        />
                        <Typography className={classes.formLabel}>{t("grievanceForm.formControl.grievanceTypeLabel")}</Typography>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          // label={t(
                          //   "grievanceForm.formControl.grievanceTypeLabel"
                          // )}
                          disabled={!category}
                          name="grievanceType"
                          id="grievanceType"
                          options={Type}
                          required
                        />
                        {/* <Typography className={classes.formLabel}>{t("grievanceForm.formControl.emailIdLabel")} <small style={{ color: "#6f7f8c" }}>(optional)</small></Typography>
                        <FormControl
                          control="input"
                          variant="outlined"
                          // label={t("grievanceForm.formControl.emailIdLabel")}
                          placeholder={t(
                            "grievanceForm.formControl.emailIdPlaceholder"
                          )}
                          name="emailId"
                          type="email"
                          id="emailId"
                        /> */}



                        {/* <FormControl
                control="input"
                variant="outlined"
                label={t("grievanceForm.formControl.grievanceDescriptionLabel")}
                placeholder={t(
                  "grievanceForm.formControl.grievanceDescriptionPlaceholder"
                )}
                name="grievanceDescription"
                type="text"
                multiline
                rows={4}
                id="grievanceDescription"
                required
              /> */}

                        {/* <Grid>
                <input
                  accept="image/jpeg,image/png,application/pdf,image/x-eps"
                  className={classes.input}
                  id="affidavitDocument"
                  type="file"
                  name="file"
                  onChange={(event) => {
                    if (event.currentTarget.files[0]) {
                      formikRef.current.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                      fileChangeEvent(event);
                    }
                  }}
                />
                {!fileData.name && (
                  <label htmlFor="affidavitDocument">
                    <Button
                      startIcon={<UploadFileIcon />}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      component="span"
                      style={{ fontSize: 15 }}
                    >
                      {t("grievanceForm.formControl.uploadButtonText")}
                    </Button>
                  </label>
                )}
                {fileData.name && (
                  <Grid>
                    <Typography className={classes.selectedFileNameView}>
                      {fileData.name}
                    </Typography>
                    <Box textAlign="right" marginTop={0.5}>
                      <label htmlFor="affidavitDocument">
                        <Button
                          startIcon={<UploadFileIcon />}
                          color="primary"
                          component="span"
                          style={{ fontSize: 12 }}
                        >
                          {t("grievanceForm.formControl.reUploadButtonText")}
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                )}
                {isGrievanceError && (
                  <AlertBox severity="error">{grievanceErrorMsg}</AlertBox>
                )} 
                <FormHelperText error variant="filled">
                  <ErrorMessage name="file" />
                </FormHelperText>
              </Grid> */}
                        {/* <Box textAlign="center">
                <small>
                  {t("grievanceForm.formControl.fileUploadConditionsText")}
                </small>
              </Box> */}

                        <Box
                          className={classes.formFooter}>
                          <Grid container>
                            <Grid item xs={4}>
                              <Box>
                                <Button color="primary" size="large" className="formBtn" onClick={() =>
                                  props.setGrievanceSecStates("default")
                                }
                                  startIcon={<BackArrowIcon className="arrowLeft" style={{ fontSize: "0.8rem" }} />}
                                >
                                  {t("grievanceForm.formControl.backButtonText")}
                                </Button>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  type="submit"
                                  className="formBtn"
                                  endIcon={<NextArrowIcon1 className="arrowRight" style={{ fontSize: "1rem" }} />}
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

export default GrievanceForm;
