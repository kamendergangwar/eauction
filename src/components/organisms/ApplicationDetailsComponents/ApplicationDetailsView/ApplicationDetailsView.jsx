import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import withWidth from "@material-ui/core/withWidth";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "../../../molecules/FormControl/FormControl";
import { ApplicationDtlsIcon, ApplicationDownloadIcon, BlackBackArrowIcon, SourceQuestionIcon, DownArrow, UpArrow, SourceInfoIcon } from "../../../atoms/SvgIcons/SvgIcons";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
// import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import ApplicantPersonalDetails from "../ApplicantPersonalDetails/ApplicantPersonalDetails";
import ApplicantKycDetails from "../ApplicantKycDetails/ApplicantKycDetails";
import ContactDetails from "../ContactDetails/ContactDetails";
import AddressDetails from "../AddressDetails/AddressDetails";
import CategoryDetails from "../CategoryDetails/CategoryDetails";
import IncomeDetails from "../IncomeDetails/IncomeDetails";
import CoApplicantDetails from "../CoApplicantDetails/CoApplicantDetails";
import SelectedProjects from "../SelectedProjects/SelectedProjects";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ApiEndPoint, Fcfs_Flow } from "../../../../utils/Common";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
  clearApplicantData
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  applicationOverview,
  clearApplicationOverviewState,
  applicationSelector
} from "../../../../redux/features/application/ApplicationSlice";
import {
  getFamilyMembers,
  familyMemberSelector,
  deleteFamilyMember,
  clearFamilyState,
  clearFamilyData,
} from "../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import {
  setDummyProjectList,
  projectDataSelector,
  clearProjectList,
} from "../../../../redux/features/projectdata/ProjectDataSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../redux/features/preferences/PreferencesSlice";
import {
  getStepperDetails
} from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import TermsPrivacyPolicyDialogBox from "../../../molecules/DialogBoxes/TermsPrivacyPolicyDialogBox/TermsPrivacyPolicyDialogBox";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import { CallToActionRounded, Check, GetApp, PhoneRounded } from "@material-ui/icons";
import { CardMedia } from "@material-ui/core";
import { myProfileSelector } from "../../../../redux/features/myProfile/MyProfileSlice";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import UploadedDocumentsDetails from "../UploadedDocumentsDetails/UploadedDocumentsDetails";
const ApiEndPointPdf = ApiEndPoint + "/Applicant/applicationOverviewPdf/";

const ApplicationDetailsView = (props) => {
  const { width } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const history = useHistory();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { applicantData, isSuccessResApplicant, isFetchingApplicant, isErrorApplicant, errorMessage } = useSelector(applicantSelector);
  const {
    isFetchingFamilyMember,
    isSuccessFamilyMembers,
    isErrorFamilyMember,
    errorMsgFamilyMember,
    familyMembersData,
  } = useSelector(familyMemberSelector);
  const {
    applicationOverviewData,
    isFetchingApplicationOverview,
    isSuccessResApplicationOverview,
    isErrorApplicationOverview,
    errorMsgApplicationOverview,
  } = useSelector(applicationSelector);
  const {
    isProjectDataFetching,
    isProjectDataError,
    projectDataErrorMessage,
    demoProjectList,
    schemeData,
  } = useSelector(projectDataSelector);
  const {
    isSuccessResGetPreferences
  } = useSelector(preferencesSelector);
  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );
  const [applicationStatus, setApplicationStatus] = useState("");
  const [appliedApplicationStatus, setAppliedApplicationStatus] = useState("");
  const [printIs, setPrintIs] = useState(false);
  const [downloadDialogOpenIs, setDownloadDialogOpenIs] = useState(false);
  const [termsPrivacyPolicyDialogOpenIs, setTermsPrivacyPolicyDialogOpenIs] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  // const [selectedSource, setSelectedSource] = useState("");
  // const [termschecked, setTermsChecked] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [formValues, setFormValues] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const ref = useRef(null);
  const [isDownArrow, setIsDownArrow] = useState(true);
  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const [isFcfs, setIsFcsf] = useState(Fcfs_Flow);
  const containerRef = useRef(null);
  const [myProfileData, setMyProfileData] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const { applicationMyProfile, isSuccessMyProfile, isFetchingMyProfile } = useSelector(myProfileSelector);
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);

  const sourceList = [
    {
      value: "1",
      label: t("sourceInformationList.label1"),
    },
    {
      value: "2",
      label: t("sourceInformationList.label2"),
    },
    {
      value: "3",
      label: t("sourceInformationList.label3"),
    },
    {
      value: "4",
      label: t("sourceInformationList.label4"),
    },
    {
      value: "5",
      label: t("sourceInformationList.label5"),
    },
    {
      value: "6",
      label: t("sourceInformationList.label6"),
    },
    {
      value: "7",
      label: t("sourceInformationList.label7"),
    },
    {
      value: "8",
      label: t("sourceInformationList.label8"),
    },
    {
      value: "10",
      label: t("sourceInformationList.label10"),
    },
    {
      value: "9",
      label: t("sourceInformationList.label9"),
    },
  ];

  const initialValues = {
    sourceOfInformation: "",
    acceptTerms: false,
  };

  const validationSchema = yup.object().shape({
    acceptTerms: yup
      .bool()
      .oneOf([true], "Acknowledge the Terms & Conditions"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const formik = formikRef.current;
    if (formik.values.acceptTerms == false) {
      formik.setErrors({ acceptTerms: t("termsAndCondiErrorMessage") })
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }

    // history.push("/dashboard");

    // if (isPanCardFieldReadOnly) {
    const requestData = {
      TermsAndConditionsSetByCIDCO: values.acceptTerms,
      Source: values.sourceOfInformation,
      Type: "TermsAndCondition",
    };

    dispatch(editApplicant(requestData));
  };


  useEffect(() => {
    if (isSuccessMyProfile) {
      setProfileUrl(
        "https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
      );
      setMyProfileData(applicationMyProfile);
    }
  }, [applicationMyProfile, isSuccessMyProfile]);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "10") {
          item.Status == "completed" ? setIsPaymentDone(true) : setIsPaymentDone(false);
        }
      })
    }
  }, [isSuccessProgressResStepper])

  useEffect(() => {
    if (isSuccessResApplicant) {
      dispatch(clearApplicantState());
      dispatch(clearApplicantData());
      history.push("/make-payments");
    }
  }, [isSuccessResApplicant])

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
            if (item.applicantKycStepper[1].status != "completed") {
              pageUrl = "/verify-pancard";
            }
          }
        }

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }

      })
      history.push(pageUrl)
    }
  }, [isSuccessResStepper])


  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]);

  const handleCloseTermsPrivacyPolicyDialogBox = () => {
    setTermsPrivacyPolicyDialogOpenIs(false);
  };
  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getApplicantProgress());
    dispatch(getStepperDetails());
    dispatch(applicationOverview());
  }, [dispatch, t]);

  useEffect(() => {
    if (applicationOverviewData[0]) {
      setApplicationData(applicationOverviewData[0]);
      dispatch(clearApplicationOverviewState());

      let sourceOfInfo = "";
      let termCond = false;
      if (
        applicationOverviewData[0]?.Source &&
        applicationOverviewData[0]?.Source != 0
      ) {
        sourceOfInfo = applicationOverviewData[0]?.Source;
      }

      if (applicationOverviewData[0]?.TermsAndConditionsSetByCIDCO == "1") {
        termCond = true;
      } else {
        termCond = false;
      }

      const savedValue = {
        sourceOfInformation: sourceOfInfo,
        acceptTerms: termCond,
      };

      setFormValues(savedValue);
    }
  }, [isSuccessResApplicationOverview, applicationOverviewData]);

  // useEffect(() => {
  //   dispatch(clearProjectList());
  //   if (applicationData.length > 0) {
  //     applicationData.forEach((innerItem) => {
  //       if (!Array.isArray(innerItem.ProjectDetails)) {
  //         console.log(innerItem.AadharNo, "innerItem ")
  //       }
  //     });
  //   }
  // }, [applicationData]);

  /* useEffect(() => {
    const uniqueschemename = Array.from(
      new Set(demoProjectList.map((a) => a.projectId))
    ).map((projectId) => {
      return demoProjectList.find((a) => a.projectId === projectId);
    });
    console.log("uniqueschemename", uniqueschemename);
    setSchemes(uniqueschemename);
  }, [demoProjectList]); */



  const TermsConditionCheck = (e) => {
    e.preventDefault();
    setTermsPrivacyPolicyDialogOpenIs(true);
  };


  const checkSession = () => {
    dispatch(getPreferencesList());
  }

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      // downloadPdf();
      dispatch(clearPreferencesState());
    }
  }, [isSuccessResGetPreferences])

  const downloadPdf = () => {
    setPdfLoading(true);
    let fileUrl = ApiEndPointPdf +
      localStorage.getItem("applicantId") +
      "?Lang=" +
      localStorage.getItem("i18nextLng") + "&isApplicationOverview=1"
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((response) => response.blob()).then((blob) => {
      setPdfLoading(false);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      let today = new Date();
      const dateTime = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('YYYY-MM-DD-h:mm');
      link.download = `${localStorage.getItem("applicantId")} -${dateTime}`;
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
      setPdfLoading(false);
    });
  };


  const handleScroll = event => {
    // event.currentTarget.offsetHeight
    if (event.currentTarget.scrollTop >= 1000) {
      setShowScrollIcon(false);
    } else {
      setShowScrollIcon(true);
    }
  };

  return (
    <>
      {isFetchingApplicationOverview && (
        <Loading isOpen={isFetchingApplicationOverview} />
      )}
      {isFetchingApplicant && (
        <Loading isOpen={isFetchingApplicant} />
      )}
      {pdfLoading && (
        <Loading isOpen={pdfLoading} />
      )}
      <div className={`${classes.root} ${printIs ? "print" : ""}`} id="mainPrintSection" style={{ height: "100%" }}>
        <Formik
          initialValues={formValues || initialValues}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
          enableReinitialize
        >
          {({ submitForm, setFieldValue, touched, errors, values }) => (
            <Form noValidate autoComplete="off" className={classes.formContainer}>
              <FormCard isApplicationDetails={true}>
                <Box className={classes.pageHeader}>
                  <IconButton
                    className={classes.backBtn}
                    onClick={() => history.push("/select-projects")}
                  >
                    <BlackBackArrowIcon fontSize="small" />
                  </IconButton>
                  <Box className={classes.headerContainer}>
                    <ApplicationDtlsIcon fontSize="large" />
                    <Typography variant="h6" className={classes.pageTitle}>
                      {t("applicationDetails.title")}
                    </Typography>
                  </Box>
                </Box>
                <div className={`${classes.container} ${printIs ? "print" : ""}`} onScroll={handleScroll}>
                  <div ref={containerRef}>
                    {isProjectDataError && (
                      <AlertBox severity="error">{projectDataErrorMessage}</AlertBox>
                    )}
                    {errorMsgApplicationOverview && (
                      <AlertBox severity="error">{errorMsgApplicationOverview}</AlertBox>
                    )}
                    <div className={classes.formSection}>
                      <Box className={classes.sectionContainer} style={{backgroundColor:"#fff"}}>
                        <Box className={classes.applicantDtlsBar}>
                          <Grid container alignItems="center" justify="space-between">
                            <Grid item md={5} xs={12}>
                              <Grid container>
                                  <Grid item md={3} xs={12}>
                                    <CardMedia
                                      className={classes.applicationProfileImgCover}
                                      image={"data:image;base64," + myProfileData.ImageData?.ImageString}
                                      title="Profile Cover" component="img"
                                      referrerPolicy="no-referrer"
                                    />
                                  </Grid>
                                  <Grid item md="auto" xs={12}>
                                    <Typography className={classes.applicatioInfoLabel}>
                                      {t(
                                        "applicationDetails.formControl.applicationNoLabel"
                                      )}{" "}
                                    </Typography>
                                    <Typography className={classes.dataValView}>{applicationData?.ApplicantId || "--"}</Typography>
                                  </Grid>
                                  {/* <Grid item md={5} xs={12}>
                                    { applicationOverviewData[0]?.barcode_url && 
                                      <CardMedia
                                        style={{padding: "0px 18px"}}
                                        image={applicationOverviewData[0]?.barcode_url}
                                        title="Barcode Image" component="img"
                                        referrerPolicy="no-referrer"
                                      />
                                    }
                                  </Grid> */}
                              </Grid>
                            </Grid>
                            <Grid item md={2} xs={12}>
                              <Typography className={classes.applicatioInfoLabel}>
                                {t("applicationDetails.formControl.appliedDateLabel")}{" "}
                                :{" "}
                              </Typography>
                              <Typography className={classes.dataValView}>{currentDate || "--"}</Typography>
                            </Grid>
                            {/* <Grid item md={5} xs={12}>
                              <Grid container alignItems="center" justify="space-between" style={{padding: '0px 8px'}}>
                                  <Grid item md="auto" xs={6}>
                                    <Typography className={classes.applicatioInfoLabel}>Application Status</Typography>
                                    <Box className={classes.applicatioInfoLabelCompleted} alignItems="center">
                                      <Check style={{fontSize:"initial",marginRight:'5px'}} />
                                      <Typography style={{fontWeight: 800,fontSize: '10px'}}> 
                                        {applicationOverviewData[0]?.ApplicationStatus}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid item md="auto" xs={6}>
                                    {
                                      isPaymentDone &&
                                      <Button color="primary" variant="contained" startIcon={<ApplicationDownloadIcon />} onClick={() => checkSession()}>
                                        {t("applicationDetails.formControl.downloadButtonText")}
                                      </Button>
                                    }
                                  </Grid>
                              </Grid>
                            </Grid> */}
                            {/* <Grid item md="auto" xs={12}>
                          <Typography className={classes.applicatioInfoView}>{t("applicationDetails.formControl.statusLabel")} : <strong>--</strong></Typography>
                        </Grid> */}
                            {/* <Grid item md="auto" xs={12}>
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ApplicationDownloadIcon />}
                                onClick={() => checkSession()}>
                                {t(
                                  "applicationDetails.formControl.downloadButtonText"
                                )}
                              </Button>
                            </Grid> */}
                          </Grid>
                        </Box>
                      </Box>
                      <Box className={classes.sectionContainer}>
                        <ApplicantPersonalDetails
                          applicantData={applicationOverviewData}
                        />
                      </Box>
                      <Box className={classes.sectionContainer}>
                        <ApplicantKycDetails applicantData={applicationOverviewData} />
                      </Box>
                      <Box className={classes.sectionContainer}>
                        <ContactDetails
                          applicantData={applicationOverviewData}
                        />
                      </Box>
                      <Box className={classes.sectionContainer}>
                        <AddressDetails
                          applicantData={applicationOverviewData}
                        />
                      </Box>
                      {/* <Box className={classes.sectionContainer}>
                        <CategoryDetails
                          applicantData={applicationOverviewData}
                        />
                      </Box> */}
                      <Box className={classes.sectionContainer}>
                        <IncomeDetails
                          applicantData={applicationOverviewData}
                        />
                      </Box>
                      { applicationOverviewData[0]?.CoApplicantDetails[0] &&
                        <Box className={classes.sectionContainer}>
                          <CoApplicantDetails
                            CoAppData={applicationOverviewData[0]?.CoApplicantDetails[0]}
                          />
                        </Box>
                      }

                       <Box className={classes.sectionContainer}>
                        <SelectedProjects
                          projectDetailsObjct={applicantData?.Applicant_Booking_Status}
                          applicantData={applicationOverviewData}
                        />
                      </Box> 

                      <Box className={classes.sectionContainer}>
                        <UploadedDocumentsDetails 
                          applicantData={applicantData}
                        />
                      </Box>
                      <Box className={classes.sectionContainer}>
                        <Box className={classes.detailBoxContainer}>
                          <Box>
                            <Grid container alignItems="center">
                              <Grid item md xs={12}>
                                <IconTitle
                                  icon={<PhoneRounded   style={{color:"white", backgroundColor:'blue',padding:'4px',borderRadius:'50%'}} />}
                                  // icon={<SourceInfoIcon fontSize="large" />}
                                  title={t("sourceOfInfoLabel")}
                                />
                              </Grid>
                              <Box className={classes.secCardContent}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <Box className={` ${printIs ? "print" : ""}`}>
                                      <Grid container alignItems="center" justify="space-between">
                                        <Grid item md="auto" xs={12}>
                                          <Typography className={classes.gatherInfoQuestion}>
                                            <SourceQuestionIcon />
                                            {t("sourceOfInfoQuestion")}
                                          </Typography>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                          <FormControl
                                            control="selectbox"
                                            variant="outlined"
                                            name="sourceOfInformation"
                                            id="sourceOfInformation"
                                            label={t("sourceOfInfoLabel")}
                                            options={sourceList}
                                          />
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box className={classes.termsAndConditionSec}>
                                      <FormControl
                                        control="checkbox"
                                        type="checkbox"
                                        name="acceptTerms"
                                        id="acceptTerms"
                                        label={
                                          <Typography variant="body1" className={classes.termsNdCondiCheckBoxLabel}>
                                            {t("termsAndConditionsText1")}{" "}
                                            <span onClick={(e) => TermsConditionCheck(e)}>
                                              {t("termsAndConditionsText2")}
                                            </span>{" "}
                                            {t("termsAndConditionsText3")}
                                          </Typography>
                                        }
                                        color="primary"
                                      />
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </div>
                <div className={classes.actionSection}>
                  <Button type="submit" variant="contained" color="primary">
                    {t("confirmAppBtnText")}
                  </Button>
                </div>
              </FormCard>
              {showScrollIcon &&
                <div className={classes.Iconcontainer}>
                  <div className={classes.subWrapper}>
                    <div className={classes.chevron}></div>
                    <div className={classes.chevron}></div>
                    <div className={classes.chevron}></div>
                    <div className={classes.scrollTxt}>
                      Scroll Down
                    </div>
                  </div>
                </div>
              }
            </Form>
          )}
        </Formik>
        <TermsPrivacyPolicyDialogBox
          open={termsPrivacyPolicyDialogOpenIs}
          onClose={handleCloseTermsPrivacyPolicyDialogBox} />
        {/* <div className={classes.downArrow} onClick={() => scrollDown()}>
          {isDownArrow == true ? <DownArrow /> : <UpArrow />}
        </div> */}
      </div>
    </>
  );
};

export default withWidth()(ApplicationDetailsView);
