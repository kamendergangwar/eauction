import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
// import Button from "@material-ui/core/Button";
import { CircularProgress, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "../../../molecules/FormControl/FormControl";
import { categoryDetailsFormStyles } from "./CategoryDetailsForm.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import {
  CatecoryDetailIcon,
  IncomeIcon,
  RupeesIcon,
  CategoryTitleIcon,
  WhiteArrowIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import SubStepperBar2 from "../../../atoms/StepperBar/SubStepperBar2/SubStepperBar2";
import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import { useSelector, useDispatch } from "react-redux";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
  clearApplicantData,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getStepperDetails,
  addEditStepper,
  superStepperActiveStep,
  subSteppper2ActiveStep,
} from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import MultiCategoryDialogBox from "../../../molecules/DialogBoxes/MultiCategoryDialogBox/MultiCategoryDialogBox";
import ReservationMappingDialogBox from "../../../molecules/DialogBoxes/ReservationMappingDialogBox/ReservationMappingDialogBox";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import { NextArrowIcon, ChipCrossIcon } from "../../../atoms/SvgIcons/SvgIcons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import StepperBar from "../../../atoms/StepperBar/StepperBar";

import { Field } from "formik";
import MuiTextField from "@material-ui/core/TextField";
import { Autocomplete } from "formik-material-ui-lab";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MUICheckbox from "@material-ui/core/Checkbox";
// import LoadingButton from '@material-ui/core/LoadingButton';
// import LoadingButton from '@material-ui/lab/LoadingButton';
// import LoadingButton from '@mui/lab/LoadingButton';

// import LoadingButton from "@material-ui/lab/LoadingButton";

const CategoryDetailsForm = (props) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

  const { width } = props;
  const classes = categoryDetailsFormStyles();
  const { t } = useTranslation("CategoryDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [incomeGroup, setIncomeGroup] = useState("");
  const [incomeGroupId, setIncomeGroupId] = useState("");
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [formValues, setFormValues] = React.useState(null);
  const categoryRef = useRef(null);
  const incomeRef = useRef(null);
  const [dummyArray, setDummyArray] = useState([]);
  const [multiCatDialogOpen, setMultiCatDialogOpen] = React.useState(false);
  const [termsPrivacyPolicyDialogOpenIs, setTermsPrivacyPolicyDialogOpenIs] =
    useState(false);
  const dispatch = useDispatch();
  const { reservationCategory, castCategory } = useSelector(masterDataSelector);
  const containerRef = useRef(null);
  //console.log(reservationCategory, "reservationCategory KKKK");

  // var x = ['a', 'b', 'c'];

  // const zList = reservationCategory.concat(y);

  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,

    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isErrorApplicantGet,
    errorMsgApplicantGet,
  } = useSelector(applicantSelector);

  const { stepperData, isFetchingStepper, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );

  useEffect(() => {
    dispatch(getApplicant());
    // dispatch(getStepperDetails());
    // dispatch(superStepperActiveStep(1));
    // dispatch(subSteppper2ActiveStep(0));
  }, [dispatch, t]);

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach((item) => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (
            item.applicantKycStepper[1].title == "Verify PAN" &&
            pageUrl == undefined
          ) {
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
      });
      history.push(pageUrl);
    }
  }, [isSuccessResStepper]);

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      let castCategoryId = "";
      if (applicantData.CasteCatId) {
        if (applicantData.CasteCatId !== "0") {
          castCategoryId = applicantData.CasteCatId;
        } else {
          castCategoryId = "";
        }
      }
      let employementStatus = "";
      if (applicantData.EmploymentStatus) {
        if (applicantData.EmploymentStatus !== "0") {
          employementStatus = applicantData.EmploymentStatus;
        } else {
          employementStatus = "";
        }
      }
      let annualFamilyIncome = "";
      if (applicantData.AnnualFamilyIncome) {
        if (applicantData.AnnualFamilyIncome !== "0") {
          checkIncomeGroup(applicantData.AnnualFamilyIncome);
          annualFamilyIncome = applicantData.AnnualFamilyIncome;
        } else {
          annualFamilyIncome = "";
        }
      }
      const reservationCategoryId = [];
      if (applicantData.RservationCatIds) {
        let tempReservationCategory = "";
        tempReservationCategory = applicantData.RservationCatIds.split(",");
        // console.log(tempReservationCategory, "reservationCategory ------")
        reservationCategory.forEach((item) => {
          tempReservationCategory.forEach((element) => {
            if (item.value === element.toString()) {
              const index = reservationCategoryId.findIndex(
                (object) => object.value === element.toString()
              );
              if (index === -1) {
                reservationCategoryId.push(item);
                //reservationCategoryId.push({ value: item.value, label: item.label, disable: false });
              }
            }
          });
        });
      }
      const savedValues = {
        castCategory: castCategoryId || "",
        reservationCategory: [...reservationCategoryId],
        acceptTerms: false,
      };
      setFormValues(savedValues);
    }
  }, [isSuccessResApplicantGet, applicantData, reservationCategory]);

  /* const handleClose = (value) => {
    setMultiCatDialogOpen(false);
    if (value) {
      // dispatch(clearMasterDataList());
      // history.push("/select-projects");
      const values = formikRef.current.values;
      const reservationCategory = [];
      values.reservationCategory.forEach((item) => {
        reservationCategory.push(item.value);
      });
      const requestData = {
        CasteCatId: values.castCategory,
        RservationCatIds: reservationCategory.join(),
        Occupation: values.occupation,
        EmploymentStatus: values.employementStatus,
        AnnualFamilyIncome: values.familyIncome,
        IncomeGroup: incomeGroupId.toString(),
        Type: "Category",
        Lang: localStorage.getItem("i18nextLng"),
      };
      // console.log("====================================");
      // console.log("====================================");
      dispatch(editApplicant(requestData));
    }
  }; */

  const dashBoardRedirect = (event) => {
    history.push("/personal-details");
  };
  const initialValues = {
    castCategory: "",
    reservationCategory: [],
    acceptTerms: false,
  };

  const validationSchema = yup.object({
    castCategory: yup
      .string()
      .required(
        t(
          "categoryForm.castCategoryForm.formControl.caste.casteCategoryErrors.required"
        )
      ),
    // acceptTerms: yup
    // .bool()
    // .oneOf([true], t("categoryForm.castCategoryForm.acknowledgeErrors.required")),
    // reservationCategory: yup
    //   .array()
    //   .test("notEmptyArr", "Reservation Category is required", (value) => {
    //     return value.length > 0;
    //   }),
    // occupation: yup
    //   .string()
    //   .required(
    //     t(
    //       "incomeGroupForm.incomeForm.formControl.occupation.occupationErrors.required"
    //     )
    //   ),
    // employementStatus: yup
    //   .string()
    //   .required(
    //     t(
    //       "incomeGroupForm.incomeForm.formControl.employment.employmentStatusErrors.required"
    //     )
    //   ),
    // familyIncome: yup
    //   .string()
    //   .required(
    //     t("incomeGroupForm.incomeForm.formControl.familyincomeErrors.required")
    //   ),
    // // isITR: yup
    // //   .string()
    // //   .required(
    // //     t("incomeGroupForm.incomeForm.formControl.isITR.isITRErrors.required")
    // //   ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const formik = formikRef.current;
    if (formik.values.acceptTerms == false) {
      formik.setErrors({
        acceptTerms: t(
          "categoryForm.castCategoryForm.acknowledgeErrors.required"
        ),
      });
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    } else {
      let castName = castCategory.find(
        (item) => item.value == values.castCategory
      );
      let categorySesstion = {
        castName: castName,
        reservationCategory: values.reservationCategory,
      };
      localStorage.setItem("selectCategory", JSON.stringify(categorySesstion));

      // console.log(values.reservationCategory.length);
      // if (values.reservationCategory.length > 0) {
      //   setMultiCatDialogOpen(true);
      // } else {
      const reservationCategory = [];
      values.reservationCategory.forEach((item) => {
        reservationCategory.push(item.value);
      });
      const requestData = {
        CasteCatId: values.castCategory,
        RservationCatIds: reservationCategory.join(),
        // Occupation: values.occupation,
        // EmploymentStatus: values.employementStatus,
        // AnnualFamilyIncome: values.familyIncome,
        // IncomeGroup: incomeGroupId.toString(),
        Type: "Category",
        Lang: localStorage.getItem("i18nextLng"),
      };
      dispatch(editApplicant(requestData));

      localStorage.setItem("RservationCategory", reservationCategory.join());
    }
  };

  useEffect(() => {
    if (isSuccessResApplicant) {
      updateStepperUI();
      dispatch(clearApplicantState());
      dispatch(clearApplicantData());
     // history.push("/income-details");
     history.push("/upload-documents");
    }
  }, [isSuccessResApplicant]);

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 2) {
        new_obj = {
          ...element,
          status: "completed",
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

  /* const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  }; */

  /* const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "No") {
      // dispatch(clearMasterDataList());
      history.push("/income-details");
      setSelectedValue(null);
    }
  };

  const goPreviousPage = () => {
    history.push("/family-details");
  }; */

  /* const employmentStatusList = [
    {
      value: 1,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.salaried"
      ),
    },
    {
      value: 2,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.regularWage"
      ),
    },
    {
      value: 3,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.labour"
      ),
    },
    {
      value: 4,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.selfEmployed"
      ),
    },
    {
      value: 5,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.other"
      ),
    },
  ];

  const occupationList = [
    {
      value: "Agriculture",
      label: t(
        "incomeGroupForm.incomeForm.formControl.occupation.options.agriculture"
      ),
    },
    {
      value: "Business",
      label: t(
        "incomeGroupForm.incomeForm.formControl.occupation.options.business"
      ),
    },
    {
      value: "Self-Employed",
      label: t(
        "incomeGroupForm.incomeForm.formControl.occupation.options.selfEmployed"
      ),
    },
    {
      value: "Service",
      label: t(
        "incomeGroupForm.incomeForm.formControl.occupation.options.service"
      ),
    },
    {
      value: "Other",
      label: t(
        "incomeGroupForm.incomeForm.formControl.occupation.options.other"
      ),
    },
  ]; */

  const checkIncomeGroup = (value) => {
    if (value >= 0 && value <= 25000) {
      setIncomeGroupId(1);
      setIncomeGroup("EWS");
    } else if (value >= 25001 && value <= 50000) {
      setIncomeGroupId(2);
      setIncomeGroup("LIG");
    } else if (value >= 50001 && value <= 100000) {
      setIncomeGroupId(3);
      setIncomeGroup("MIG - I");
    } else if (value >= 100001 && value <= 150000) {
      setIncomeGroup("MIG - II");
      setIncomeGroupId(4);
    } else if (value >= 150001 && value <= 9999999999) {
      setIncomeGroupId(5);
      setIncomeGroup("HIG");
    } else {
      setIncomeGroupId("");
      setIncomeGroup("");
    }
  };

  // useEffect(() => {
  //   const formik = formikRef.current;
  //   formik.resetForm();
  // }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  /* const scrollonError = (up, down) => {
    console.log(up, down);
    if (up && !down) {
      categoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // console.log(contactRef.current);
    }
    if (!up && down) {
      incomeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // console.log(addressRef.current);
    }
    if (up && down) {
      categoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }; */

  /* const scrollSubmit = (errors, submitForm) => {
    let up = false;
    let down = false;

    for (const property in errors) {
      if (property === "castCategory") {
        up = true;
      }
      if (
        property === "occupation" ||
        property === "employementStatus" ||
        property === "familyIncome"
      ) {
        down = true;
      }
      scrollonError(up, down);
      // console.log(property);
    }
    submitForm();
  }; */

  function changeHandler2(event) {
    //onBlur={(e)=>changeHandler1(values)}
    //console.dir(event.target);
    //val.reservationCategory.shift({value: event.target.dataset.optionIndex, label: 'Religious Minorities'});
    console.dir(event.target);
    var checked = event.target.checked;
    var selected = event.target.value;
    //formikRef.current.values;
    if (formikRef.current.values.reservationCategory.length > 0) {
      //formikRef.current.values.reservationCategory = formikRef.current.values.reservationCategory.filter(item => item.value != "");
      //console.log(formikRef.current.values.reservationCategory, "value.reservationCategory");
      //setDummyArray(formikRef.current.values.reservationCategory);
    } else {
      //setDummyArray([]);
    }
  }

  let reservationCategoryCopy = JSON.parse(JSON.stringify(reservationCategory)); //[...reservationCategory];
  if (formValues?.reservationCategory?.length > 0) {
    reservationCategoryCopy.unshift({
      label: t(
        "categoryForm.castCategoryForm.formControl.caste.noneBelowLavel"
      ),
      value: "",
      disable: true,
    });
  } else {
    reservationCategoryCopy.unshift({
      label: t(
        "categoryForm.castCategoryForm.formControl.caste.noneBelowLavel"
      ),
      value: "",
      disable: false,
    });
  }
  if (reservationCategoryCopy) {
    reservationCategoryCopy = reservationCategoryCopy.map(
      (currentValue, index) => {
        if (index > 0) {
          currentValue.disable = false;
        }
        return currentValue;
      }
    );
  }

  function resetCheckBoxDisabled() {
    if (reservationCategoryCopy) {
      reservationCategoryCopy = reservationCategoryCopy.map(
        (currentValue, index) => {
          currentValue.disable = false;
          return currentValue;
        }
      );
    }
  }

  function changeHandler(event) {
    if (
      event.target.localName === "li" ||
      event.target.localName.toLowerCase() === "div"
    ) {
      event.cancelBubble = true;
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
    var checked = event.target.checked;
    var selected = event.target.value;
    if (!checked && selected === "") {
      resetCheckBoxDisabled();
    } else if (!checked && selected !== "") {
      resetCheckBoxValues(formikRef.current.values);
    } else {
      if (reservationCategoryCopy) {
        reservationCategoryCopy = reservationCategoryCopy.map(
          (currentValue, index) => {
            if (selected === "" && index > 0) currentValue.disable = true;
            if (selected !== "" && index === 0) currentValue.disable = true;
            return currentValue;
          }
        );
      }
    }
  }

  function resetCheckBoxValues(values) {
    if (values.reservationCategory.length === 1) {
      if (reservationCategoryCopy) {
        reservationCategoryCopy = reservationCategoryCopy.map(
          (currentValue, index) => {
            currentValue.disable = false;
            return currentValue;
          }
        );
      }
    }
  }

  function checkBoxLabelClick(e) {
    console.log(e.target.localName);
    if (
      e.target.localName.toLowerCase() === "li" ||
      e.target.localName.toLowerCase() === "div"
    ) {
      console.log(e);
      e.cancelBubble = true;
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    //return false;
    console.dir(e.target);
    if (e.target.localName === "div") {
      var className =
        e.target.childNodes[0].childNodes[0].childNodes[0].className;
      e.target.querySelector("[class=" + className + "]").checked = true;
      e.target.querySelector("[class=" + className + "]").click();
      //return true;
    }
    if (e.target.localName.toLowerCase() === "input") {
      var className = e.target.className;
      //e.target.querySelector('[class=' + className + ']').checked = true;
      e.target.parentElement.querySelector("[class=" + className + "]").click();
      //return true;
    }
  }

  const handleCloseTermsPrivacyPolicyDialogBox = () => {
    setTermsPrivacyPolicyDialogOpenIs(false);
  };

  const TermsConditionCheck = (e) => {
    e.preventDefault();
    setTermsPrivacyPolicyDialogOpenIs(true);
  };

  function getInfoText() {
    let checkBoxTitle = "";
    if (t("categoryForm.castCategoryForm.clickTxt") == "Click Here") {
      checkBoxTitle = (
        <Typography
          variant="body1"
          className={classes.termsNdCondiCheckBoxLabel}
        >
          <span onClick={(e) => TermsConditionCheck(e)}>
            {t("categoryForm.castCategoryForm.clickTxt")}
          </span>{" "}
          {t("categoryForm.castCategoryForm.documentlistTxt")}
        </Typography>
      );
    } else {
      checkBoxTitle = (
        <Typography
          variant="body1"
          className={classes.termsNdCondiCheckBoxLabel}
        >
          {t("categoryForm.castCategoryForm.documentlistTxt")}{" "}
          <span onClick={(e) => TermsConditionCheck(e)}>
            {t("categoryForm.castCategoryForm.clickTxt")}
          </span>{" "}
        </Typography>
      );
    }

    return checkBoxTitle;
  }
  const kendraCenterHelpTxt = () => {
    const lang = localStorage.getItem("i18nextLng");
    if (lang == "en") {
      return (
        <>
          {t("helpCenterTxt.helpTxt")}{" "}
          <span
            onClick={() =>
              window.open("https://cidcohomes.com/en/aaple-sarkar-kendra/")
            }
          >
            {t("helpCenterTxt.helpClickTxt")}
          </span>{" "}
          {t("helpCenterTxt.kendralistTxt")}
        </>
      );
    }
    if (lang == "hi") {
      return (
        <>
          {t("helpCenterTxt.helpTxt")} {t("helpCenterTxt.kendralistTxt")}{" "}
          <span
            onClick={() =>
              window.open("https://cidcohomes.com/hi/aaple-sarkar-kendra-hi/")
            }
          >
            {t("helpCenterTxt.helpClickTxt")}
          </span>
        </>
      );
    }

    if (lang == "mr") {
      return (
        <>
          {t("helpCenterTxt.helpTxt")} {t("helpCenterTxt.kendralistTxt")}{" "}
          <span
            onClick={() =>
              window.open("https://cidcohomes.com/aaple-sarkar-kendra-mr/")
            }
          >
            {t("helpCenterTxt.helpClickTxt")}
          </span>
        </>
      );
    }
  };

  return (
    <>
      {isFetchingApplicantGet && <Loading isOpen={isFetchingApplicantGet} />}
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
                  title={t("categoryForm.title")}
                  backUrl={
                    localStorage.getItem("coApplicantFormPageIs")
                      ? "/add-co-applicant"
                      : "/add-co-applicant"
                  }
                  titleIcon={<CategoryTitleIcon fontSize="large" />}
                />
              </Hidden>
              <Hidden mdUp>
                <StepperBar
                  callingForMobileIs={true}
                  title={t("categoryForm.title")}
                  backUrl={
                    localStorage.getItem("coApplicantFormPageIs")
                      ? "/add-co-applicant"
                      : "/add-co-applicant"
                  }
                />
              </Hidden>
              <div className={classes.formSection}>
                <div ref={containerRef}>
                  {isErrorApplicant && (
                    <AlertBox severity="error">{errorMessage}</AlertBox>
                  )}
                  <Box marginY={2} marginX={width === "xs" ? 1 : 10}>
                    <Box marginBottom={3}>
                      <IconTitle
                        icon={<CatecoryDetailIcon fontSize="large" />}
                        title={t("categoryForm.title")}
                      />
                    </Box>
                    <Box marginX={width === "xs" ? 1 : 6}>
                      <Grid
                        container
                        spacing={width === "xs" ? 1 : 10}
                        ref={categoryRef}
                      >
                        <Grid item xs={12} sm={12} md={6}>
                          <Typography
                            variant="body2"
                            style={{ marginLeft: "14px", color: "#f93d5c" }}
                          >
                            {t(
                              "categoryForm.castCategoryForm.formControl.caste.requiredLabel"
                            )}
                          </Typography>
                          <FormControl
                            control="selectbox"
                            variant="outlined"
                            name="castCategory"
                            label={t(
                              "categoryForm.castCategoryForm.formControl.caste.casteLabel"
                            )}
                            options={castCategory.filter(
                              (data, index, acc) =>
                                index ===
                                acc.findIndex((t) => t.value === data.value)
                            )}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Typography
                            variant="body2"
                            style={{ marginLeft: "14px" }}
                          >
                            {t(
                              "categoryForm.castCategoryForm.formControl.reservation.requiredLabel"
                            )}
                          </Typography>
                          {/* const zList = reservationCategory.concat(y); */}
                          {/* {console.log("options")} */}
                          {/* <FormControl
                          control="autocompletemultiple"
                          variant="outlined"
                          name="reservationCategory"
                          label={t(
                            "categoryForm.castCategoryForm.formControl.reservation.reservationLabel"
                          )}
                          options={reservationCategoryCopy.filter(
                            (data, index, acc) =>
                              index ===
                              acc.findIndex((t) => t.value === data.value)
                          )}
                          value={values.reservationCategory.filter(
                            (data, index, acc) =>
                              index ===
                              acc.findIndex((t) => t.value === data.value)
                          )}
                          touched={touched}
                          errors={errors}
                        /> */}
                          <Field
                            name="reservationCategory"
                            multiple
                            component={Autocomplete}
                            options={reservationCategoryCopy.filter(
                              (data, index, acc) =>
                                index ===
                                acc.findIndex((t) => t.value === data.value)
                            )}
                            value={values.reservationCategory.filter(
                              (data, index, acc) =>
                                index ===
                                acc.findIndex((t) => t.value === data.value)
                            )}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.label}
                            getOptionDisabled={(option) => option?.disable}
                            getOptionSelected={(option, value) =>
                              option.value === value.value
                            }
                            renderOption={(option, { selected }) => (
                              <div
                                onClick={(e) => changeHandler(e)}
                                style={{ width: "110%" }}
                              >
                                {/* <input
                                  key={option.label}
                                  value={option.value}
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  type="checkbox"
                                  style={{ marginRight: 8,pointerEvents: "auto" }}
                                  checked={selected}
                                  disabled={option?.disable}
                                  onChange={(e) => changeHandler(e)}
                                /> */}
                                <Checkbox
                                  className="reservationChk"
                                  key={option.label}
                                  value={option.value}
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{
                                    marginRight: 8,
                                    transform: "scale(2)",
                                  }}
                                  checked={selected}
                                  disabled={option?.disable}
                                  // onClick={(e) => changeHandler(e)}
                                />
                                {option.label}
                              </div>
                            )}
                            onInputChange={(event, newInputValue) => {
                              console.log(newInputValue);
                              console.log(event.target.nodeName);
                              if (
                                event.target.nodeName === "svg" ||
                                event.target.nodeName === "path"
                              ) {
                                resetCheckBoxDisabled();
                              }
                            }}
                            renderTags={() => null}
                            renderInput={(params) => (
                              <MuiTextField
                                id="autoCompleteTxtFld"
                                variant="outlined"
                                label={t(
                                  "categoryForm.castCategoryForm.formControl.reservation.reservationLabel"
                                )}
                                {...params}
                                error={
                                  touched["reservationCategory"] &&
                                  !!errors["reservationCategory"]
                                }
                                helperText={
                                  touched["reservationCategory"] &&
                                  errors["reservationCategory"]
                                }
                                margin="normal"
                              />
                            )}
                            touched={touched}
                            errors={errors}
                          />
                          <Box m={1} flexDirection="row" width="100%">
                            {values.reservationCategory.map((v) => (
                              <Chip
                                className={classes.chips}
                                key={v.value}
                                label={v.label}
                                deleteIcon={<ChipCrossIcon fontSize="small" />}
                                onDelete={() => {
                                  setFieldValue(
                                    "reservationCategory",
                                    values.reservationCategory.filter(
                                      (val) => val.value !== v.value
                                    )
                                  );
                                  resetCheckBoxValues(values);
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                    >
                      <Box width="93%" p={2} className={classes.incomeTextBox}>
                        {/* <Typography variant="body2" gutterBottom style={{ color: "#0038C0" }}>
                          {t("categoryForm.castCategoryForm.multipleCategoryMessage")} {" "}
                          <span style={{ color: "#65707D" }}>
                            {t("categoryForm.castCategoryForm.multipleCategoryDescription0")}
                          </span>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {t("categoryForm.castCategoryForm.multipleCategoryDescription1")}
                        </Typography> */}

                        <Box className={classes.termsAndConditionSec}>
                          {getInfoText()}
                          <br />
                          <Typography
                            className={classes.termsNdCondiCheckBoxLabel}
                          >
                            {kendraCenterHelpTxt()}
                          </Typography>
                          <br />
                          <FormControl
                            control="checkbox"
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            label={
                              <Typography
                                variant="body1"
                                className={classes.termsNdCondiCheckBoxLabel}
                              >
                                {t(
                                  "categoryForm.castCategoryForm.acknowledgeContent"
                                )}
                              </Typography>
                            }
                            color="primary"
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* <Box
                    width="100%"
                    textAlign="center"
                    mt={width === "xs" ? 5 : 15}
                  >
                    <ToggleButtonGroup
                      exclusive
                      aria-label="text alignment"
                      size="small"
                      className={classes.bottomGroup}
                    >
                      <ToggleButton
                        className={classes.toggleBtn}
                        disableRipple
                        disableFocusRipple
                        disabled
                      >
                        <BottomRectIcon />
                      </ToggleButton>
                      <ToggleButton
                        value="center"
                        aria-label="centered"
                        className={classes.toggleBtn}
                        disableRipple
                        disableFocusRipple
                        disabled
                      >
                        <BottomCircleIcon fontSize="small" />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box> */}
                  </Box>
                </div>
              </div>
              <div className={classes.actionSection}>
                <Grid container alignItems="center" justify="flex-end">
                  {isFetchingApplicant && (
                    <Grid item xs="auto">
                      <Typography className={classes.progressView}>
                        {t(
                          "categoryForm.castCategoryForm.formControl.savingText"
                        )}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs="auto">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      // onClick={submitForm}
                      endIcon={
                        <WhiteArrowIcon style={{ fill: "transparent" }} />
                      }
                      disabled={isFetchingApplicant}
                    >
                      {isFetchingApplicant && (
                        <CircularProgress
                          size={20}
                          style={{ marginRight: "10px" }}
                        />
                      )}
                      {t("categoryForm.castCategoryForm.formControl.submitBtn")}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </FormCard>
          </Form>
        )}
      </Formik>

      <ReservationMappingDialogBox
        open={termsPrivacyPolicyDialogOpenIs}
        onClose={handleCloseTermsPrivacyPolicyDialogBox}
      />

      {/* <ApplicantDialogBoxShowProcess header="HHHHH" action={dashBoardRedirect}></ApplicantDialogBoxShowProcess> */}
    </>
    // <>
    //   {(isFetchingApplicant || isFetchingStepper) && (
    //     <Loading isOpen={isFetchingApplicant || isFetchingStepper} />
    //   )}
    // <Formik
    //   initialValues={formValues || initialValues}
    //   validationSchema={validationSchema}
    //   onSubmit={onSubmit}
    //   innerRef={formikRef}
    //   enableReinitialize
    // >
    //   {({ submitForm, setFieldValue, touched, errors, values }) => (
    //     <Form noValidate autoComplete="off">
    //         <FormCard>
    //           <Hidden only={["sm", "md", "lg"]}>
    //             <Box marginLeft={2} paddingY={2}>
    //               <Button
    //                 onClick={goPreviousPage}
    //                 color="primary"
    //                 startIcon={<NavigateBeforeIcon />}
    //               >
    //                 {t("backButtonText")}
    //               </Button>
    //             </Box>
    //           </Hidden>
    //           <Hidden only="xs">
    //             <SubStepperBar2 step={0} />
    //           </Hidden>
    //           <div className={classes.container}>
    //             <FormMandatoryText />
    //             {isErrorApplicant && (
    //               <AlertBox severity="error">{errorMessage}</AlertBox>
    //             )}
    // <Box marginY={2}>
    //   <IconTitle
    //     icon={<CategoryIcon fontSize="large" />}
    //     title={t("categoryForm.title")}
    //   />
    //   <Grid
    //     container
    //     spacing={width === "xs" ? 1 : 3}
    //     ref={categoryRef}
    //   >
    //     <Grid item xs={12} sm={6}>
    //       <FormControl
    //         control="selectbox"
    //         variant="outlined"
    //         name="castCategory"
    //         label={t(
    //           "categoryForm.castCategoryForm.formControl.caste.casteLabel"
    //         )}
    //         options={castCategory.filter(
    //           (data, index, acc) =>
    //             index ===
    //             acc.findIndex((t) => t.value === data.value)
    //         )}
    //         required
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={6}>
    //       <FormControl
    //         control="autocompletemultiple"
    //         variant="outlined"
    //         name="reservationCategory"
    //         label={t(
    //           "categoryForm.castCategoryForm.formControl.reservation.reservationLabel"
    //         )}
    //         options={reservationCategory.filter(
    //           (data, index, acc) =>
    //             index ===
    //             acc.findIndex((t) => t.value === data.value)
    //         )}
    //         value={values.reservationCategory.filter(
    //           (data, index, acc) =>
    //             index ===
    //             acc.findIndex((t) => t.value === data.value)
    //         )}
    //         touched={touched}
    //         errors={errors}
    //       />
    //     </Grid>
    //   </Grid>
    // </Box>
    //             <Box borderTop={1} borderColor="grey.400" marginY={3} />
    //             <Box marginY={2}>
    //               <IconTitle
    //                 icon={<IncomeIcon fontSize="large" />}
    //                 title={t("incomeGroupForm.title")}
    //               />
    //               <Grid
    //                 container
    //                 spacing={width === "xs" ? 1 : 3}
    //                 ref={incomeRef}
    //               >
    //                 <Grid item xs={12} sm={4}>
    //                   <FormControl
    //                     control="selectbox"
    //                     variant="outlined"
    //                     name="occupation"
    //                     label={t(
    //                       "incomeGroupForm.incomeForm.formControl.occupation.occupationLabel"
    //                     )}
    //                     options={occupationList}
    //                     required
    //                   />
    //                 </Grid>
    //                 <Grid item xs={12} sm={4}>
    //                   <FormControl
    //                     control="selectbox"
    //                     variant="outlined"
    //                     name="employementStatus"
    //                     label={t(
    //                       "incomeGroupForm.incomeForm.formControl.employment.employementLabel"
    //                     )}
    //                     options={employmentStatusList}
    //                     required
    //                   />
    //                 </Grid>
    //                 <Grid item xs={12} sm={4}>
    //                   <FormControl
    //                     control="input"
    //                     variant="outlined"
    //                     label={t(
    //                       "incomeGroupForm.incomeForm.formControl.familyincomeInputLabel"
    //                     )}
    //                     placeholder={t(
    //                       "incomeGroupForm.incomeForm.formControl.familyincomePlaceholder"
    //                     )}
    //                     name="familyIncome"
    //                     type="number"
    //                     id="familyIncome"
    //                     InputProps={{
    //                       startAdornment: (
    //                         <InputAdornment position="start">
    //                           <RupeesIcon />
    //                         </InputAdornment>
    //                       ),
    //                     }}
    //                     onChange={(e) => {
    //                       setFieldValue("familyIncome", e.target.value);
    //                       checkIncomeGroup(e.target.value);
    //                     }}
    //                     onInput={(e) => {
    //                       e.target.value = Math.max(0, parseInt(e.target.value))
    //                         .toString()
    //                         .slice(0, 10);
    //                     }}
    //                     required
    //                   />
    //                   <Typography variant="body2" gutterBottom>
    //                     <span style={{ color: "#f27807" }}>
    //                       {t(
    //                         "incomeGroupForm.incomeForm.formControl.incomeMessage"
    //                       )}
    //                     </span>
    //                     {"\t"}
    //                     {incomeGroup}
    //                   </Typography>
    //                   <Typography variant="body2" gutterBottom>
    //                     {t(
    //                       "incomeGroupForm.incomeForm.formControl.incomeDescription"
    //                     )}
    //                   </Typography>
    //                 </Grid>
    //               </Grid>
    //             </Box>
    //           </div>
    //         </FormCard>
    //         <Box
    //           marginY={width === "xs" ? 1 : 4}
    //           paddingY={width === "xs" ? 2 : 0}
    //           paddingX={2}
    //         >
    //           <Grid
    //             container
    //             spacing={2}
    //             direction="row"
    //             justify="space-between"
    //             alignItems="center"
    //           >
    //             <Hidden only="xs">
    //               <Grid item xs={12} sm={2} md={2} lg={2}>
    //                 <Button
    //                   type="button"
    //                   variant="outlined"
    //                   color="primary"
    //                   startIcon={<NavigateBeforeIcon />}
    //                   fullWidth
    //                   onClick={goPreviousPage}
    //                 >
    //                   {t("backButtonText")}
    //                 </Button>
    //               </Grid>
    //               <Grid item xs={12} sm={3} md={4} lg={6}></Grid>
    //             </Hidden>
    //             <Grid item xs={12} sm={3} md={3} lg={2}>
    //               <Button
    //                 type="button"
    //                 color="primary"
    //                 fullWidth
    //                 onClick={() => handleOnSkip("openDialog")}
    //               >
    //                 {t("completeLaterButtonText")}
    //               </Button>
    //             </Grid>
    //             <Grid item xs={12} sm={4} md={3} lg={2}>
    //               <Button
    //                 type="button"
    //                 variant="contained"
    //                 color="primary"
    //                 endIcon={<NavigateNextIcon />}
    //                 fullWidth
    //                 onClick={() => scrollSubmit(errors, submitForm)}
    //               >
    //                 {t("saveButtonText")}
    //               </Button>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </Form>
    //     )}
    //   </Formik>
    //   <MultiCategoryDialogBox open={multiCatDialogOpen} onClose={handleClose} />
    //   <ConfirmDialogBox
    //     title={t("Translation:skipDialog.title")}
    //     description={t("Translation:skipDialog.description")}
    //     question={t("Translation:skipDialog.question")}
    //     selectedValue={selectedValue}
    //     open={skipDialogOpen}
    //     onClose={handleCloseSkipDialog}
    //   />
    // </>
  );
};

export default withWidth()(CategoryDetailsForm);
