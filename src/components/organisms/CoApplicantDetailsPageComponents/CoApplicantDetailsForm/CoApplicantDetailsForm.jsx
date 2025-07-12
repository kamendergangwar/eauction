import React, { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";
import FormControl from "../../../molecules/FormControl/FormControl";
import TextField from '@material-ui/core/TextField';
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import { CoApplicantDetailsFormStyles } from "./CoApplicantDetailsForm.styles";
import withWidth from "@material-ui/core/withWidth";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import { WhiteArrowIcon, QuestionMarkIcon, CoApplicantSectionIcon, PlusIcon, CloseIcon, CompletedIcon, ApplicationEditIcon } from "../../../atoms/SvgIcons/SvgIcons";
// import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import AddCoApplicantBenefitsDialogBox from "../../../molecules/DialogBoxes/AddCoApplicantBenefitsDialogBox/AddCoApplicantBenefitsDialogBox";
import AddCoApplicntPersonalDtlsDialogBox from "../../../molecules/DialogBoxes/AddCoApplicntPersonalDtlsDialogBox/AddCoApplicntPersonalDtlsDialogBox";
import AddCoApplicntAddressDtlsDialogBox from "../../../molecules/DialogBoxes/AddCoApplicntAddressDtlsDialogBox/AddCoApplicntAddressDtlsDialogBox";
import CoApplicntDetailsPreviewDialogBox from "../../../molecules/DialogBoxes/CoApplicntDetailsPreviewDialogBox/CoApplicntDetailsPreviewDialogBox";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
// import moment from "moment";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import {
  getCoApplicantDetails,
  coApplicantSelector,
  editCoApplicant,
  clearCoApplicantState,
  deleteCoApplicant
} from "../../../../redux/features/coApplicant/CoApplicantSlice";
import {
  getFamilyRelationshipList,
  masterDataSelector
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  applicantSelector,
  getApplicant,
  clearApplicantState,
  clearApplicantData,
  skipCoApplicant,
  clearSkipApplicantState
} from "../../../../redux/features/applicant/ApplicantSlice";
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../redux/features/stepper/StepperSlice";
import { createAccountLog } from "../../../../redux/features/masterdata/MasterDataSlice";
import { addEditApplicantProgress, ApplicantProgressSelector, clearApplicantKycStepperVars, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { Fcfs_Flow } from "../../../../utils/Common";

const PersonalDetailsForm = (props) => {
  const { width } = props;
  const classes = CoApplicantDetailsFormStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  // const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  // const [isEligible, setIsEligible] = useState(false);
  // const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [benefitsDialogOpenIs, setBenefitsDialogOpenIs] = useState(false);
  const [coApplcntPersonalDetlsModalOpenIs, setCoApplcntPersonalDetlsModalOpenIs] = useState(false);
  const [coApplcntAddressDetlsModalOpenIs, setCoApplcntAddressDetlsModalOpenIs] = useState(false);
  const [coApplicntDetailsPreviewModalOpenIs, setCoApplicntDetailsPreviewModalOpenIs] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(null);
  const [formValues, setFormValues] = useState(null);
  // const [isAadharVerified, setIsAadharVerified] = useState(true);
  // const [success, setSuccess] = useState(false);
  // const [isPanCardFieldReadOnly, setIsPanCardFieldReadOnly] = useState(false);
  const myScrollContainerRef = useRef(null);
  // const adhaarRef = useRef(null);
  // const nameRef = useRef(null);
  // const [isWhatsappNotification, setWhatsappNotification] = useState(false);
  // const [isViewAddress, setIsViewAddress] = useState(true);
  // const [postalAddressIs, setPostalAddressIs] = useState("");
  const [kycCompletedIs, setKycCompletedIs] = useState(false);
  const [personalDetailsAddedIs, setPersonalDetailsAddedIs] = useState(false);
  const [addressDetailsAddedIs, setAddressDetailsAddedIs] = useState(false);
  const [coApplicantDeletedIs, setCoApplicantDeletedIs] = useState(false);
  const [relationshipList, setRelationshipList] = useState([]);
  const [isSkipOption, setIsSkipOption] = useState(false);
  const [confirmScheme, setConfirmScheme] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  //fcfs is on or not changes
  const [isFcfs, setIsFcsf] = useState(Fcfs_Flow);



  /* const executeScroll = () => {
    myScrollContainerRef.current.scrollTo(
      0,
      myScrollContainerRef.current.offsetTop
    );
  }; */
  const dispatch = useDispatch();
  const stepperData = useSelector((state) => state.stepper.stepperData);
  const {
    isSuccessResStepper,
    isSuccessReqStepper,
  } = useSelector((state) => state.stepper);
  const {
    isFetchingGetCoApplicant,
    isSuccessResGetCoApplicant,
    isErrorGetCoApplicant,
    errorMsgGetCoApplicant,
    coApplicantData,

    isFetchingCoApplicantEdit,
    isSuccessResCoApplicantEdit,
    isErrorCoApplicantEdit,
    errorMsgCoApplicantEdit,
    coApplicantDataEdit,

    isFetchingCoApplicantDelete,
    isSuccessResCoApplicantDelete,
    isErrorCoApplicantDelete,
    errorMsgCoApplicantDelete
  } = useSelector(coApplicantSelector);
  const {
    relationshipListData,
    isFetchingRelationship,
    isSuccessRelationship,
    isErrorRelationship,
    errorMsgRelationship,
  } = useSelector(masterDataSelector);
  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    applicantData,
    isFetchingSkipCoApplicant,
    isSuccessSkipCoApplicant,
  } = useSelector(applicantSelector);
  /* const [personalDtlsReqData, setPersonalDtlsReqData] = useState({});
  const [addressDtlsReqData, setAddressDtlsReqData] = useState({}); */

  useEffect(() => {
    dispatch(getApplicantProgress());
  }, [dispatch]);
  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } = useSelector(ApplicantProgressSelector);
  const updateApplicantProgressStepper = () => {
    let newStepper = [];
    let newStep = {};
    if (isSuccessProgressResStepper) {
      const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
      ApplicantStepper.forEach(step => {
        if (step.StepId == 4) {
          newStep = {
            ...step,
            Status: "completed",
            Description: "Co-applicant added successfully"
          }
        } else {
          newStep = step
        }
        newStepper.push(newStep);
      });
      dispatch(addEditApplicantProgress(newStepper));
    }
  }

  useEffect(() => {
    dispatch(getApplicant());

  }, [dispatch, t]);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "7" && item.Status == "completed") {
          history.push("/dashboard");
        }
      })
    }
  }, [isSuccessProgressResStepper,]);


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

        // if (item.step == 1 && pageUrl == undefined) {
        //   if (item.status != "completed") {
        //     pageUrl = "/personal-details";
        //   }
        // }

      })
      if (pageUrl != undefined) {
        history.push(pageUrl)
      }
    }
  }, [isSuccessResStepper])

  useEffect(() => {

    if (isSuccessResApplicantGet && applicantData) {
      //fcfs is on or not changes
      if (applicantData.Gender == 1 && applicantData.MarritalStatus == 1 && (isFcfs ? applicantData.is_pmy == 0 : 1)) {
        setIsSkipOption(false);
      }
      else {
        setIsSkipOption(true);
      }
    }
  }, [isSuccessResApplicantGet, applicantData])

  useEffect(() => {
    if (relationshipListData) {
      var temp_rel_list = [];
      for (let r = 0; r < relationshipListData.length; r++) {
        const element = relationshipListData[r];
        var new_obj = {
          value: element.DdtId,
          label: element.Title
        };
        temp_rel_list.push(new_obj);
      }
      setRelationshipList(temp_rel_list);
    }
  }, [relationshipListData]);

  useEffect(() => {
    if (isSuccessResApplicantGet && applicantData) {
      let MarritalStatusString;
      if (applicantData.MarritalStatus === "0") {
        MarritalStatusString = "Single";
      } else if (applicantData.MarritalStatus === "1") {
        MarritalStatusString = "Married";
      } else if (applicantData.MarritalStatus === "2" || applicantData.MarritalStatus === "3") {
        MarritalStatusString = "Other";
      }
      dispatch(getFamilyRelationshipList(MarritalStatusString));
      if (applicantData?.CoApplicantDetails.length > 0) {
        // localStorage.setItem("coApplicantId", applicantData.CoApplicantId);
        dispatch(getCoApplicantDetails());
      }
    }
  }, [isSuccessResApplicantGet, applicantData]);

  useEffect(() => {
    if (coApplicantData && isSuccessResGetCoApplicant) {
      if (coApplicantData.IsAadharVerified === "1" && coApplicantData.isPanVerified === "1") {
        setKycCompletedIs(true);
      } else {
        setKycCompletedIs(false);
      }
      if (coApplicantData?.FirstName || coApplicantData?.DOB || coApplicantData?.MobileNo) {
        setPersonalDetailsAddedIs(true);
      } else {
        setPersonalDetailsAddedIs(false);
      }
      if (coApplicantData?.PresentHouse || coApplicantData?.PresentArea || coApplicantData?.Pincode || coApplicantData?.City || coApplicantData?.District || coApplicantData?.State) {
        setAddressDetailsAddedIs(true);
      } else {
        setAddressDetailsAddedIs(false);
      }
      let relationship_val = "";
      if (coApplicantData.Relationship) {
        if (coApplicantData.Relationship !== null) {
          relationship_val = coApplicantData.Relationship;
        } else {
          relationship_val = "";
        }
      }
      const savedValues = {
        relationship: relationship_val
      };
      setFormValues(savedValues);
    }
  }, [coApplicantData, isSuccessResGetCoApplicant]);

  // useEffect(() => {
  //   if(isSuccessResGetCoApplicant && kycCompletedIs) {
  //     const requestData = {
  //       Coapplicantid: coApplicantData?.ApplicantId,
  //       CoAppFullName: coApplicantData?.FirstName + coApplicantData?.FatherName,
  //       CoAppMobileNo: coApplicantData?.MobileNo,
  //       CoAppAadhaarNo: coApplicantData?.AadharNo,
  //       CoAppPANNo: coApplicantData?.PANNo,
  //       ApplicantId: localStorage.getItem("applicantId"),
  //       CoAppRelationship: relationshipList[0]?.label,
  //       steps: "step_9"
  //     };
  //     dispatch(createAccountLog(requestData));
  //   }
  // },[isSuccessResGetCoApplicant,kycCompletedIs])

  const initialValues = {
    relationship: ""
  };

  const validationSchema = yup.object().shape({
    relationship: yup
      .string()
      .required(
        t(
          "coApplicant.relationshipErrors.required"
        )
      ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    updateStepperUI();
    // updateApplicantProgressStepper();
    /* const requestData = {
      IspostalAddressSame: "1",
      Relationship: values.relationship,
      Type: "PersonalDetailsCoApplicantRelationshipv2",
      Lang: localStorage.getItem("i18nextLng"),
    };
    dispatch(editCoApplicant(requestData)); */
  };

  useEffect(() => {
    if (isSuccessResCoApplicantEdit) {
      dispatch(clearCoApplicantState());
      dispatch(getCoApplicantDetails());
      /* if (coApplicantDataEdit.type == "PersonalDetailsCoApplicantRelationshipv2") {
        updateStepperUI();
      } */
    }
  }, [isSuccessResCoApplicantEdit]);

  /* useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    setIsEligible(false);
  }, [t]); */ // eslint-disable-line react-hooks/exhaustive-deps

  /* const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  };

  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "No") {
      history.push("/contact-details");
      setSelectedValue(null);
    }
  }; */

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const removeCoApplicant = () => {
    dispatch(deleteCoApplicant());
  };

  useEffect(() => {
    if (isSuccessResCoApplicantDelete) {
      // setTimeout(() => {
      dispatch(clearCoApplicantState());
      setCoApplicantDeletedIs(true);
      removeCoApplicantAllKycSteps();
      // history.push("/co-applicant-benefits");
      // }, 3000);
    }
  }, [isSuccessResCoApplicantDelete]);

  const removeCoApplicantAllKycSteps = () => {
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
          new_sub_obj = {
            ...inner_element,
            status: "pending"
          };
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

  const goToCoApplicantKycFlow = () => {
    // setKycCompletedIs(true);
    history.push("/co-applicant-verify-aadhaar");
  };

  /* const calculateAge = (dob) => {
    const diffMs = Date.now() - dob.getTime();
    const ageDT = new Date(diffMs);
    const age = Math.abs(ageDT.getUTCFullYear() - 1970);
    if (age < 18) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  }; */

  const updateStepperUI = () => {
    setCoApplicantDeletedIs(false);
    setConfirmScheme(false);
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 1) {
        new_obj = {
          ...element,
          status: "completed"
        };
      } else {
        new_obj = {
          ...element
        };
      }
      newStepper.push(new_obj);
    }
    dispatch(addEditStepper(newStepper));
  };

  const skipFlow = () => {
    setConfirmScheme(!confirmScheme);
  }

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(getStepperDetails());
      dispatch(clearSuperStepperEditVars());
      dispatch(clearApplicantState());
      dispatch(clearApplicantData());
      if (coApplicantDeletedIs) {
        // history.push("/co-applicant-benefits");
        setPersonalDetailsAddedIs(false);
        setAddressDetailsAddedIs(false);
        setKycCompletedIs(false);
        setPersonalDetailsAddedIs(false);
      } else {
        localStorage.setItem("coApplicantFormPageIs", true);
        dispatch(clearApplicantKycStepperVars());
        dispatch(skipCoApplicant());
      }
    }
  }, [isSuccessReqStepper]);

  useEffect(() => {
    if (isSuccessSkipCoApplicant) {
      dispatch(getApplicantProgress());
    }
    if (isSuccessSkipCoApplicant && isSuccessProgressResStepper) {
      dispatch(clearSkipApplicantState())
      history.push((isFcfs ? "/income-details" : "/category-details"));
    }
  }, [isSuccessSkipCoApplicant,isSuccessProgressResStepper])
  

  return (
    <>
      {(isFetchingRelationship || isFetchingCoApplicantDelete || isFetchingGetCoApplicant || isFetchingSkipCoApplicant) && (
        <Loading isOpen={isFetchingRelationship || isFetchingCoApplicantDelete || isFetchingGetCoApplicant || isFetchingSkipCoApplicant} />
      )}
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, touched, errors, values }) => (
          <Form noValidate autoComplete="off" className={classes.formContainer}>
            <FormCard>
              <Hidden smDown>
                <FormTitleBox
                  title={t("coApplicant.title")}
                  optionalTxt={isSkipOption == true && t("coApplicant.optionalTxt")}
                  // backUrl={kycCompletedIs ? "/personal-details" : localStorage.getItem("skipBenefitsPage") == "true" ? "/personal-details" : "/co-applicant-benefits"}
                  backUrl={"/personal-details"}
                  titleIcon={<CoApplicantSectionIcon fontSize="large" />} />
              </Hidden>
              <Hidden mdUp>
                <StepperBar
                  callingForMobileIs={true}
                  title={t("coApplicant.title")}
                  optionalTxt={isSkipOption == true && t("coApplicant.optionalTxt")}
                  // backUrl={kycCompletedIs ? "/personal-details" : localStorage.getItem("skipBenefitsPage") == "true" ? "/personal-details" : "/co-applicant-benefits"}
                  backUrl={"/personal-details"}
                />
              </Hidden>
              <div className={classes.formSection} ref={myScrollContainerRef}>
                <div className={classes.inputsSection}>
                  {isErrorGetCoApplicant && (
                    <AlertBox severity="error">{errorMsgGetCoApplicant}</AlertBox>
                  )}
                  {isErrorCoApplicantEdit && (
                    <AlertBox severity="error">{errorMsgCoApplicantEdit}</AlertBox>
                  )}
                  {isErrorCoApplicantDelete && (
                    <AlertBox severity="error">{errorMsgCoApplicantDelete}</AlertBox>
                  )}
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      {relationshipList[0]?.label && <TextField disabled id="standard-disabled" className={classes.relationshipDropDown} label={t("coApplicant.relationshipInputLabel")} defaultValue={relationshipList[0]?.label} />}
                    </Grid>
                  </Grid>
                </div>
                {isSuccessResCoApplicantDelete && (
                  <AlertBox severity="success">Deleted Successfully!</AlertBox>
                )}
                <div className={classes.checkboxSection}>
                  {kycCompletedIs &&
                    <Button type="button" variant="outlined" color="primary" endIcon={<CloseIcon />} className={classes.removeApplcntBtn} onClick={() => removeCoApplicant()}>{t("coApplicant.addDetailsSection.removeBtnTxt")}</Button>
                  }
                  <Typography variant="h6" className={classes.addDtlsTitle}>{t("coApplicant.addDetailsSection.title")}</Typography>
                  <Grid container spacing={3} justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box className={`${classes.addDtlsAddBox} active`}>
                        {kycCompletedIs ?
                          <>
                            <Typography className={classes.cardTtitle}>
                              <CompletedIcon fontSize="small" /> <span>{t("coApplicant.addDetailsSection.card1Title")}</span>
                            </Typography>
                            <Button type="button" color="primary" size="small" className={classes.addBtn} onClick={() => setCoApplicntDetailsPreviewModalOpenIs(true)}>{t("coApplicant.addDetailsSection.viewBtnTxt")}</Button>
                          </>
                          :
                          <>
                            <Typography className={classes.cardTtitle}>
                              <span>{t("coApplicant.addDetailsSection.card1Title")}</span></Typography>
                            <Button type="button" variant="contained" color="primary" startIcon={<PlusIcon />} size="small" className={classes.addBtn} onClick={() => goToCoApplicantKycFlow()}>{t("coApplicant.addDetailsSection.addBtnTxt")}</Button>
                          </>
                        }
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box className={`${classes.addDtlsAddBox} ${kycCompletedIs ? "active" : ""}`}>
                        {/* {kycCompletedIs ? */}
                        {kycCompletedIs && personalDetailsAddedIs ?
                          <>
                            <Typography className={classes.cardTtitle}><CompletedIcon fontSize="small" /> {t("coApplicant.addDetailsSection.card2Title")}</Typography>
                            <Button type="button" color="primary" startIcon={<ApplicationEditIcon />} size="small" className={classes.addBtn} disabled={!kycCompletedIs} onClick={() => setCoApplcntPersonalDetlsModalOpenIs(true)}>{t("coApplicant.addDetailsSection.editBtnTxt")}</Button>
                          </>
                          :
                          <>
                            <Typography className={classes.cardTtitle}>{t("coApplicant.addDetailsSection.card2Title")}</Typography>
                            <Button type="button" variant="contained" color="primary" startIcon={<PlusIcon />} size="small" className={classes.addBtn} disabled={!kycCompletedIs} onClick={() => setCoApplcntPersonalDetlsModalOpenIs(true)}>{t("coApplicant.addDetailsSection.addBtnTxt")}</Button>
                          </>
                        }
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box className={`${classes.addDtlsAddBox} ${kycCompletedIs ? "active" : ""}`}>
                        {/* {kycCompletedIs ? */}
                        {kycCompletedIs && addressDetailsAddedIs ?
                          <>
                            <Typography className={classes.cardTtitle}><CompletedIcon fontSize="small" /> {t("coApplicant.addDetailsSection.card3Title")}</Typography>
                            <Button type="button" color="primary" startIcon={<ApplicationEditIcon />} size="small" className={classes.addBtn} disabled={!kycCompletedIs} onClick={() => setCoApplcntAddressDetlsModalOpenIs(true)}>{t("coApplicant.addDetailsSection.editBtnTxt")}</Button>
                          </>
                          :
                          <>
                            <Typography className={classes.cardTtitle}>{t("coApplicant.addDetailsSection.card3Title")}</Typography>
                            <Button type="button" variant="contained" color="primary" startIcon={<PlusIcon />} size="small" className={classes.addBtn} disabled={!kycCompletedIs} onClick={() => setCoApplcntAddressDetlsModalOpenIs(true)}>{t("coApplicant.addDetailsSection.addBtnTxt")}</Button>
                          </>
                        }
                      </Box>
                    </Grid>
                  </Grid>
                  {/* <div className={classes.addressPreviewSection}>
                    <Grid container spacing={3} justify="space-between" alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Typography level="body5" className="addressLabel">Address Line 1:</Typography>
                        <Typography className="addressContent">fgghfghgfhfgsdfsfsdfsdfsdfsfdsfsfsdsdfsdfdshfg</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography level="body5" className="addressLabel">Address Line 2:</Typography>
                        <Typography className="addressContent">dfsdfsdfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsf</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography level="body5" className="addressLabel">Pin Code:</Typography>
                        <Typography className="addressContent">234sdfsdf234234234234234234234234234234324</Typography>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3} justify="space-between" alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Typography level="body5" className="addressLabel">City/Town:</Typography>
                        <Typography className="addressContent">fgghfghgfhfgsdfsfsdfsdfsdfsfdsfsfsdsdfsdfdshfg</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography level="body5" className="addressLabel">Distric:</Typography>
                        <Typography className="addressContent">dfsdfsdfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsf</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography level="body5" className="addressLabel">State:</Typography>
                        <Typography className="addressContent">234sdfsdf234234234234234234234234234234324</Typography>
                      </Grid>
                    </Grid>
                  </div> */}

                </div>
                {/* <div className={classes.lastInfoSection}>
                  <Typography className={classes.lastInfoTxt}>{t("coApplicant.coApplicantBenefitsTitle")}</Typography>
                  <IconButton type="button" size="small" onClick={() => setBenefitsDialogOpenIs(true)}><QuestionMarkIcon /></IconButton>
                </div> */}
              </div>
              <div className={classes.actionSection}>
                <Grid container alignItems="center" justify="flex-end">
                  {isFetchingCoApplicantEdit && <Grid item xs="auto">
                    <Box>
                      <Typography className={classes.progressView}>{t("savingLoaderTxt")}...</Typography>
                    </Box>
                  </Grid>}
                  {/* || !personalDetailsAddedIs || !kycCompletedIs */}
                  {isSkipOption && !kycCompletedIs && <Grid item xs="auto">
                    <Button color="primary" onClick={() => skipFlow()} style={{ marginRight: 15 }}>
                      {t("coApplicant.skipBtnText")}
                    </Button>
                  </Grid>
                  }
                  <Grid item xs="auto">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                      // onClick={submitForm}
                      disabled={!kycCompletedIs || !addressDetailsAddedIs || !personalDetailsAddedIs}
                    >
                      {t("saveButtonText")}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </FormCard>
          </Form>
        )}
      </Formik>
      {/* {openPhotoDialog && (
        <ImageDialogBox
          selectedValue={imageUrl}
          open={openPhotoDialog}
          onClose={handleClosePhotoDialog}
        />
      )} */}
      <AddCoApplicantBenefitsDialogBox
        open={benefitsDialogOpenIs}
        onClose={setBenefitsDialogOpenIs}
      />
      {coApplcntPersonalDetlsModalOpenIs &&
        <AddCoApplicntPersonalDtlsDialogBox
          open={coApplcntPersonalDetlsModalOpenIs}
          onClose={setCoApplcntPersonalDetlsModalOpenIs}
        />
      }
      {coApplcntAddressDetlsModalOpenIs &&
        <AddCoApplicntAddressDtlsDialogBox
          open={coApplcntAddressDetlsModalOpenIs}
          onClose={setCoApplcntAddressDetlsModalOpenIs}
        />
      }
      <CoApplicntDetailsPreviewDialogBox
        open={coApplicntDetailsPreviewModalOpenIs}
        onClose={setCoApplicntDetailsPreviewModalOpenIs}
        coApplicantData={coApplicantData}
      />
      {/* <ConfirmDialogBox
        title={t("Translation:skipDialog.title")}
        description={t("Translation:skipDialog.description")}
        question={t("Translation:skipDialog.question")}
        selectedValue={selectedValue}
        open={skipDialogOpen}
        onClose={handleCloseSkipDialog}
      /> */}
      <Dialog
        maxWidth={maxWidth}
        open={confirmScheme}
        onClose={() => {
          setConfirmScheme(false);
        }}
        aria-labelledby="pmay-dialog"
      >
        <DialogTitle id="pmay-dialog">{t("coApplicant.skipCoApplicant.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "black" }}>
            {t("coApplicant.skipCoApplicant.description")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={() => { updateStepperUI(); }}>
            {t("coApplicant.skipCoApplicant.yes")}
          </Button>
          <Button onClick={() => {
            setConfirmScheme(false);
          }} color="primary" autoFocus>
            {t("coApplicant.skipCoApplicant.no")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withWidth()(PersonalDetailsForm);
