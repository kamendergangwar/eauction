import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
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
import { ApplicationDtlsIcon, ApplicationDownloadIcon, BlackBackArrowIcon, SourceQuestionIcon } from "../../../atoms/SvgIcons/SvgIcons";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
// import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import { ApplicationDetailsViewStyles } from "../../ApplicationDetailsComponents/ApplicationDetailsView.styles";
import ApplicantPersonalDetails from "../../ApplicationDetailsComponents/ApplicantPersonalDetails/ApplicantPersonalDetails";
import ApplicantKycDetails from "../../ApplicationDetailsComponents/ApplicantKycDetails/ApplicantKycDetails";
import ContactDetails from "../../ApplicationDetailsComponents/ContactDetails/ContactDetails";
import AddressDetails from "../../ApplicationDetailsComponents/AddressDetails/AddressDetails";
import CategoryDetails from "../../ApplicationDetailsComponents/CategoryDetails/CategoryDetails";
import IncomeDetails from "../../ApplicationDetailsComponents/IncomeDetails/IncomeDetails";
import CoApplicantDetails from "../../ApplicationDetailsComponents/CoApplicantDetails/CoApplicantDetails";
import SelectedProjects from "../../ApplicationDetailsComponents/SelectedProjects/SelectedProjects";
import { useSelector, useDispatch } from "react-redux";
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
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import TermsPrivacyPolicyDialogBox from "../../../molecules/DialogBoxes/TermsPrivacyPolicyDialogBox/TermsPrivacyPolicyDialogBox";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { jsPDF } from "jspdf";

const AgentApplicationDetailsView = (props) => {
  const { width } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const currentPathName = useLocation().pathname;
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
  const [applicationStatus, setApplicationStatus] = useState("");
  const [appliedApplicationStatus, setAppliedApplicationStatus] = useState("");
  const [printIs, setPrintIs] = useState(false);
  const [downloadDialogOpenIs, setDownloadDialogOpenIs] = useState(false);
  const [termsPrivacyPolicyDialogOpenIs, setTermsPrivacyPolicyDialogOpenIs] = useState(false);
  // const [selectedSource, setSelectedSource] = useState("");
  // const [termschecked, setTermsChecked] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [applicationData, setApplicationData] = useState([]);
  const [formValues, setFormValues] = useState(null);

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
      value: "9",
      label: t("sourceInformationList.label9"),
    },
  ];

  const initialValues = {
    sourceOfInformation: "",
    acceptTerms: true,
  };

  const validationSchema = yup.object().shape({
    acceptTerms: yup
      .bool()
      .oneOf([true], "Acknowledge the Terms & Conditions"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
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
    if (isSuccessResApplicant) {
      dispatch(clearApplicantState());
      dispatch(clearApplicantData());
      history.push("/make-payments");
    }
  }, [isSuccessResApplicant])

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]);

  const handleCloseTermsPrivacyPolicyDialogBox = () => {
    setTermsPrivacyPolicyDialogOpenIs(false);
  };
  useEffect(() => {
    // dispatch(getApplicant());
    let applicationId = localStorage.getItem("applicationId");
    if(applicationId === null || applicationId === undefined || applicationId == "undefined" || applicationId == "null")
    {
      applicationId = "";
    }
    dispatch(applicationOverview(applicationId));
    // dispatch(getFamilyMembers());
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



  const printDocument = () => {
    setPrintIs(true);
    var printMainContainer =
      document.getElementsByClassName("MuiContainer-root")[0];
    printMainContainer.classList.add("print");
    setTimeout(() => {
      var node = document.getElementById("mainPrintSection");
      htmlToImage.toJpeg(node, { quality: 1 }).then(function (dataUrl) {
        const image_pdf = new jsPDF();
        const imgProps = image_pdf.getImageProperties(dataUrl);
        const pdfWidth = imgProps.width;
        const pageHeight = imgProps.height;
        const pdf = new jsPDF({
          format: [pdfWidth, pageHeight],
        });
        // const pdfWidth = pdf.internal.pageSize.getWidth();
        // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "jpeg", 0, 0, pdfWidth, pageHeight);
        pdf.save("download.pdf");
        /* var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click(); */
        printMainContainer.classList.remove("print");
        setPrintIs(false);
      });
    }, 2000);
  };

  const openPdfFile = (file) => {
    window.open(file, '_blank');
  }

  const TermsConditionCheck = (e) => {
    e.preventDefault();
    setTermsPrivacyPolicyDialogOpenIs(true);
  };

  return (
    <>
      {isFetchingApplicationOverview && (
        <Loading isOpen={isFetchingApplicationOverview} />
      )}
      <div
        className={`${classes.overviewRoot} ${printIs ? "print" : ""}`}
        id="mainPrintSection"
      >
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={validationSchema}
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
                    onClick={() => history.push("/cfc-application-dashboard")}
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
                <div
                  className={`${classes.container} ${printIs ? "print" : ""}`}
                >
                  {isProjectDataError && (
                    <AlertBox severity="error">{projectDataErrorMessage}</AlertBox>
                  )}
                  {errorMsgApplicationOverview && (
                    <AlertBox severity="error">{errorMsgApplicationOverview}</AlertBox>
                  )}
                  <Box className={classes.applicantDtlsBar}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item md="auto" xs={12}>
                        <Typography
                          variant="h4"
                          className={classes.applicatioNoView}
                        >
                          {t(
                            "applicationDetails.formControl.applicationNoLabel"
                          )}{" "}
                          {applicationData?.ApplicantId || "--"}
                        </Typography>
                      </Grid>
                      <Grid item md="auto" xs={12}>
                        <Typography className={classes.applicatioInfoView}>
                          {t("applicationDetails.formControl.appliedDateLabel")}{" "}
                          :{" "}
                          <strong>
                            {applicationData?.AppliedOn || "--"}
                          </strong>
                        </Typography>
                      </Grid>
                      {/* <Grid item md="auto" xs={12}>
                      <Typography className={classes.applicatioInfoView}>{t("applicationDetails.formControl.statusLabel")} : <strong>--</strong></Typography>
                    </Grid> */}
                      <Grid item md="auto" xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ApplicationDownloadIcon />}
                          onClick={() => openPdfFile('http://sanghamitraschool.co.in/Documents/Cbse_Mandatory_Info/Coming-Soon.pdf')}>
                          {t(
                            "applicationDetails.formControl.downloadButtonText"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <div className={classes.formSection}>
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
                    <Box className={classes.sectionContainer}>
                      <CategoryDetails
                        applicantData={applicationOverviewData}
                      />
                    </Box>
                    <Box className={classes.sectionContainer}>
                      <IncomeDetails
                        applicantData={applicationOverviewData}
                      />
                    </Box>
                    <Box className={classes.sectionContainer}>
                      <CoApplicantDetails
                        CoAppData={applicationOverviewData[0]?.CoApplicantDetails[0]}
                      />
                    </Box>
                    <Box className={classes.sectionContainer}>
                      <SelectedProjects
                        applicantData={applicationOverviewData}
                      />
                    </Box>
                  </div>
                  {currentPathName=="/application-details" && (
                    <Box className={`${classes.sourceInfoSection} ${printIs ? "print" : ""}`}>
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
                  )}	
                  {currentPathName=="/application-details" && (
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
                  )}	
                </div>
                {currentPathName=="/application-details" && (
                  <div className={classes.actionSection}>
                    <Button type="submit" variant="contained" color="primary">
                    {t("confirmAppBtnText")}
                    </Button>
                  </div>
                )}	
              </FormCard>
            </Form>
          )}
        </Formik>
        <TermsPrivacyPolicyDialogBox
          open={termsPrivacyPolicyDialogOpenIs}
          onClose={handleCloseTermsPrivacyPolicyDialogBox} />
      </div>
    </>
  );
};

export default withWidth()(AgentApplicationDetailsView);
