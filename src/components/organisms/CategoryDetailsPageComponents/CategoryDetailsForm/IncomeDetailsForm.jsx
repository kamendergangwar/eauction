import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
// import Button from "@material-ui/core/Button";
import { CircularProgress, Button, FormControlLabel, FormLabel, Radio, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
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
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import SubStepperBar2 from "../../../atoms/StepperBar/SubStepperBar2/SubStepperBar2";
import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  convertAmountToWords,
  getReservationCategories,
  masterDataSelector,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  getApplicant,
  editApplicant,
  setApplicantFilter,
  applicantSelector,
  clearApplicantState,
  clearApplicantData,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getStepperDetails,
  addEditStepper,
  superStepperActiveStep,
  subSteppper2ActiveStep,
  clearSuperStepperEditVars,
} from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import MultiCategoryDialogBox from "../../../molecules/DialogBoxes/MultiCategoryDialogBox/MultiCategoryDialogBox";
import ReservationMappingDialogBox from "../../../molecules/DialogBoxes/ReservationMappingDialogBox/ReservationMappingDialogBox";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import {
  WhiteArrowIcon,
  IncomeWalletIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import { Link } from "react-router-dom";
import { addEditApplicantProgress, ApplicantProgressSelector, clearApplicantStepperUpdateRes, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { ApiEndPoint, Fcfs_Flow } from "../../../../utils/Common";
import { RadioGroup } from "formik-material-ui";
import UserPDFViewDialogBox from "../../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import axios from "axios";

import CcConfirmDialogBox from "../../../molecules/DialogBoxes/CcConfirmDialogBox/CcConfirmDialogBox";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import SnackBox from "../../../atoms/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LocalFormControl from "../../../molecules/FormControl/FormControl";
import { preferencesSelector, sendConfirmCatChangeOtp, clearCatChangeSendOtpState, changeCatResetDoc, clearChangeCatResetDoc } from "../../../../redux/features/preferences/PreferencesSlice";
import { truncate } from "lodash";
import { useLocation } from "react-router-dom";
import { RegistrationStepperSave } from "../../../../redux/features/registration/registrationStepperSlice";

function IncomeDetailsForm(props) {
  const { width, active } = props;
  const locationState = useLocation();
  const classes = categoryDetailsFormStyles();
  const { t } = useTranslation("CategoryDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [stepCompleted, setIsStepCompleted] = useState(false)
  const [incomeGroup, setIncomeGroup] = useState("");
  const [incomeGroupId, setIncomeGroupId] = useState("");
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [formValues, setFormValues] = React.useState(null);
  const categoryRef = useRef(null);
  const incomeRef = useRef(null);
  const myScrollContainerRef = useRef(null);
  const [minFamilyIncome, setMinFamilyIncome] = useState(null);
  const [maxFamilyIncome, setMaxFamilyIncome] = useState(null);
  const [familyIncome, setFamilyIncome] = useState("");
  const [averageIncomeError, setAverageIncomeError] = useState("");
  const [amountText, setAmountText] = useState("");
  const [timer, setTimer] = useState(null);
  const [isFcfs, setIsFcsf] = useState(Fcfs_Flow);
  // const [toNext, setToNext] = useState(false);
  const [casteReservationRecords, setCasteReservationRecords] = useState([]);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [termsPrivacyPolicyDialogOpenIs, setTermsPrivacyPolicyDialogOpenIs] =
    useState(false);

  const [multiCatDialogOpen, setMultiCatDialogOpen] = React.useState(false);
  const [isStepperUpdate, setIsStepperUpdate] = React.useState(false);
  const containerRef = useRef(null);
  const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);
  const [ReligionLists, setReligionLists] = useState([]);
  const dispatch = useDispatch();
  //const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  // const [showConfirmCatChange, setShowConfirmCatChange] = useState(false);
  const [showConfirmationOtp, setShowConfirmationOtp] = React.useState(false);
  const [isGeneratedConfirmationOtp, setIsGeneratedConfirmationOtp] = React.useState(false);
  const [isResenConfirmationOtpText, setResenConfirmationOtpText] = React.useState(false);
  const [countConfirmationOtp, setCountConfirmationOtp] = React.useState(90);
  const [applicantMobile, setApplicantMobile] = useState(JSON.parse(localStorage.getItem("mobileNo")));
  const [isApplicationPaymentDone, setIsApplicationPaymentDone] = useState(false);
  const [islocationState, setIsLocationState] = useState(false);
  const formikRefConfirm = useRef();

  const { isFetchingSendCatChangeOtp, isErrorSendCatChangeOtp, errorMessageSendCatChangeOtp, isSuccessSendCatChangeOtp, sendCatChangeOtpData, sendCatChangeOtpErrorData, isFetchingChangeCatResetDoc, isSuccessChangeCatResetDoc, isErrorChangeCatResetDoc, errorMsgChangeCatResetDoc } = useSelector(preferencesSelector);

  const {
    isSuccessAmountToWords,
    dataAmountToWords,
    reservationCategory,
    castCategory,
    isSuccessMasterData,
  } = useSelector(masterDataSelector);

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
  const { ApplicantStepperData, isSuccessProgressResStepper, isSuccessProgressReqStepper, superStepper } = useSelector(ApplicantProgressSelector);

  const docPreviewDialogCloseFun = () => {
    setDocPreviewDialogOpen(false);
  };
  useEffect(() => {
    setIsStepCompleted(active > 4)
  }, [active])
  const documentCategories = {
    "1": "GN",
    "2": "SC",
    "3": "ST",
    "4": "NT",
    "5": "DT",
    "11": "PH" // Assuming "PH" stands for "Physically Handicapped"
  };


  const requiredDocuments = [
    "Aadhar Card",
    "PAN Card",
    "Domicile Certificate",
    "Income Certificate / IT Return (3 yrs) / Employer Certificate"
  ];


  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "7") {
          if (!islocationState) {
            item.Status == "completed" ? setIsPaymentDone(true) : setIsPaymentDone(false);
          } else {
            setIsPaymentDone(false);
          }
          item.Status == "completed" ? setIsApplicationPaymentDone(true) : setIsApplicationPaymentDone(false);
        }
      })
    }
  }, [isSuccessProgressResStepper])

  useEffect(() => {
    if (locationState && typeof (locationState) != 'undefined') {
      console.log('inn1', locationState);
      if (locationState?.state?.from_category_change_menu == 1) {
        console.log('inn2');
        setIsLocationState(true);
      }
    }
  }, [locationState]);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(superStepperActiveStep(1));
    dispatch(subSteppper2ActiveStep(0));
    dispatch(getReservationCategories());
    // const selectedFamIncome = localStorage.getItem("selectedFamIncome");
    const selectedFamIncome = "above25K"
    if (selectedFamIncome == "below25K") {
      setMaxFamilyIncome(25000);
      setMinFamilyIncome(5000);
      setIncomeGroupId(1);
      setIncomeGroup("EWS");
      // setFamilyIncome("Upto ₹ 25,000");
      setFamilyIncome("₹ 25,000");
      setAverageIncomeError(
        t(
          "incomeGroupForm.incomeForm.formControl.familyincomeErrors.errorMessage1"
        )
      );
    }
    // else if (selectedFamIncome == "between50KTo75K") {
    //   setMinFamilyIncome(50001);
    //   setMaxFamilyIncome(75000);
    //   setIncomeGroupId(2);
    //   setIncomeGroup("LIG");
    //   setFamilyIncome("₹ 50,001 To ₹ 75,000");
    //   setAverageIncomeError(t("incomeGroupForm.incomeForm.formControl.familyincomeErrors.errorMessage2"))
    // }
    else if (selectedFamIncome == "above25K") {
      setMaxFamilyIncome(100000000);
      setMinFamilyIncome(25001);
      setIncomeGroupId(2);
      setIncomeGroup("LIG");
      // setFamilyIncome("Above ₹ 25,000");
      setFamilyIncome("₹ 25,000");
      setAverageIncomeError(
        t(
          "incomeGroupForm.incomeForm.formControl.familyincomeErrors.errorMessage3"
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      // const selectedFamIncome = localStorage.getItem("selectedFamIncome");
      const selectedFamIncome = "above25K"
      const oldvalue = localStorage.getItem("selectedFamIncomeOldVal");
      let castCategoryId = "";
      if (applicantData.RservationCatIds) {
        if (applicantData.RservationCatIds !== "0") {
          castCategoryId = applicantData.RservationCatIds;
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

      let employmentOther = "";
      if (applicantData.EmploymentType) {
        if (applicantData.EmploymentStatus == "5") {
          employmentOther = applicantData.EmploymentType;
        } else {
          employmentOther = "";
        }
      }

      let religion = "";
      if (applicantData.Religion) {
        if (applicantData.RservationCatIds == "12" || applicantData.RservationCatIds == "13" || applicantData.RservationCatIds == "6") {
          getReligionOptions(applicantData.RservationCatIds);
          religion = applicantData.Religion
        }
        else {
          religion = ""
        }
      }

      let annualFamilyIncome = "";
      if (applicantData.AnnualFamilyIncome) {
        if (applicantData.AnnualFamilyIncome !== "0") {
          // checkIncomeGroup(applicantData.AnnualFamilyIncome);
          annualFamilyIncome = applicantData.AnnualFamilyIncome;
        } else {
          annualFamilyIncome = "";
        }
      }
      /* const reservationCategoryId = [];
       if (applicantData.RservationCatIds) {
         const tempReservationCategory =
           applicantData.RservationCatIds.split(",");
         reservationCategory.forEach((item) => {
           tempReservationCategory.forEach((element) => {
             if (item.value === element.toString()) {
               reservationCategoryId.push(item);
             }
           });
         });
       } */
      if (castCategoryId != "" && castCategoryId !== null) {
        localStorage.setItem("ApplicantCategory", castCategoryId);
      }
      const savedValues = {
        castCategory: castCategoryId || "",
        // reservationCategory: [...reservationCategoryId],
        // occupation: applicantData.Occupation || "",
        employementStatus: employementStatus || "",
        familyIncome:
          (selectedFamIncome != oldvalue) == true
            ? ""
            : annualFamilyIncome || "",
        employeeOther: employmentOther,
        religion: religion,
        acceptTerms: false,
      };
      // setSelectedValue(savedValues.familyIncome);
      setFormValues(savedValues);
      dispatch(clearApplicantState());
    }
  }, [isSuccessResApplicantGet, applicantData]);

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

  const initialValues = {
    // occupation: "",
    castCategory: "",
    acceptTerms: false,
    employementStatus: "",
    religion: "",
    familyIncome: "",
  };

  const validationSchema = yup.object({
    // occupation: yup
    //   .string()
    //   .required(
    //     t(
    //       "incomeGroupForm.incomeForm.formControl.occupation.occupationErrors.required"
    //     )
    //   ),
    employeeOther: yup
      .string()
      .matches(
        /^([a-zA-Z0-9\_]\s*)+$/,
        t(
          "incomeGroupForm.incomeForm.formControl.employment.charactersNotAllowed"
        )
      ),
    employementStatus: yup
      .string()
      .required(
        t(
          "incomeGroupForm.incomeForm.formControl.employment.employmentStatusErrors.required"
        )
      ),
    // familyIncome: yup
    //   .number()
    //   .required(
    //     t("incomeGroupForm.incomeForm.formControl.familyincomeErrors.required")
    //   )
    //   .min(minFamilyIncome, averageIncomeError)
    //   .max(maxFamilyIncome, averageIncomeError),
    // isITR: yup
    //   .string()
    //   .required(
    //     t("incomeGroupForm.incomeForm.formControl.isITR.isITRErrors.required")
    //   ),
  });

  const validationSchema1 = yup.object({
    // employeeOther: yup
    //   .string()
    //   .matches(
    //     /^([a-zA-Z0-9\_]\s*)+$/,
    //     t(
    //       "incomeGroupForm.incomeForm.formControl.employment.charactersNotAllowed"
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
    //   .number()
    //   .required(
    //     t("incomeGroupForm.incomeForm.formControl.familyincomeErrors.required")
    //   )
    //   .min(minFamilyIncome, averageIncomeError)
    //   .max(maxFamilyIncome, averageIncomeError),
    castCategory: yup
      .string()
      .required(
        t(
          "categoryForm.castCategoryForm.formControl.caste.casteCategoryErrors.required"
        )
      ),
    // religion : yup
    // .string()
    // .required(
    //   t(
    //     "Religion is required for the selected category"
    //   )
    // ),
    // acceptTerms: yup
    //   .boolean()
    //   .oneOf(
    //     [true],
    //     t("categoryForm.castCategoryForm.acknowledgeErrors.required")
    //   ),
  });

  function validateAccountNumber(value) {
    let error;
    if (!value) {
      error = t(
        "incomeGroupForm.incomeForm.formControl.familyincomeErrors.required"
      );
    } else if (!(value.length > 0 && value >= 5000)) {
      error = t(
        "incomeGroupForm.incomeForm.formControl.familyincomeErrors.limitation"
      );
    }
    return error;
  }

  useEffect(() => {
    dispatch(clearApplicantStepperUpdateRes())
    dispatch(getApplicantProgress());
  }, [dispatch]);
  const updateApplicantProgressStepper = () => {
    let newStepper = [];
    let newStep = {};
    if (isSuccessProgressResStepper) {
      const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
      ApplicantStepper.forEach(step => {
        if (step.StepId == 5) {
          newStep = {
            ...step,
            Status: "completed",
            Description: "Category details updated successfully"
          }
        } else {
          newStep = step
        }
        newStepper.push(newStep);
      });
      dispatch(addEditApplicantProgress(newStepper));
    }
  }

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const formik = formikRef.current;
    // if (formik.values.acceptTerms == false && isFcfs) {
    //   formik.setErrors({
    //     acceptTerms: t(
    //       "categoryForm.castCategoryForm.acknowledgeErrors.required"
    //     ),
    //   });
    //   containerRef.current?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end",
    //   });
    // }

    const requestData = {
      RservationCatIds: values.castCategory,
      Occupation: "",
      EmploymentStatus: values.employementStatus ? values.employementStatus : 5,
      AnnualFamilyIncome: values.familyIncome,
      IncomeGroup: incomeGroupId.toString(),
      Type: "IncomeDetails",
      EmploymentType: "permanant",
      // values?.employementStatus == 5 ? values.employeeOther : null,
      Religion: values.religion,
      Lang: localStorage.getItem("i18nextLng"),
    };

    dispatch(editApplicant(requestData));
    // setToNext(true);
    // const requestDataObj = {
    //    CasteCatId: applicantData.CasteCatId,
    //   RservationCatIds: values.castCategory,
    //   // Occupation: values.occupation,
    //   EmploymentStatus: values.employementStatus,
    //   AnnualFamilyIncome: values.familyIncome,
    //   IncomeGroup: incomeGroupId.toString(),
    //   Type: "Category",
    //   Lang: localStorage.getItem("i18nextLng"),
    // };

    // dispatch(setApplicantFilter(requestDataObj));

    const selectedFamIncome = localStorage.getItem("selectedFamIncome");
    // const selectedFamIncome = "above25K"
    localStorage.setItem("selectedFamIncomeOldVal", selectedFamIncome);
    // if (isSuccessResApplicant) {
    // }
    dispatch(clearApplicantStepperUpdateRes())
    setIsStepperUpdate(true)
    // updateApplicantProgressStepper();

  };

  useEffect(() => {
    if (isSuccessResApplicant) {
      dispatch(clearApplicantState());
      dispatch(clearApplicantData());
      dispatch(clearSuperStepperEditVars());
      // history.push(isFcfs ? "/upload-documents" : "/select-projects"); // FCFS Flag
      // if (applicantData.is_pmy == "1") {
      //   history.push("/select-preferences");
      // } else {
      //   history.push("/select-projects");
      // }
    }
  }, [isSuccessResApplicant]);

  useEffect(() => {
    if (isSuccessResApplicant && isStepperUpdate) {
      // dispatch(getApplicantProgress())
      dispatch(RegistrationStepperSave("5"))
    }
  }, [isSuccessResApplicant, isStepperUpdate])

  useEffect(() => {
    if (isSuccessProgressResStepper && isStepperUpdate) {
      dispatch(clearChangeCatResetDoc());
      //history.push("/upload-documents");
    }
  }, [isStepperUpdate, isSuccessProgressResStepper])
      
  /* useEffect(() => {
    if (isSuccessResApplicant && toNext) {
      const stepper = stepperData.superStepper;
      const newStepper = [...stepper];
      newStepper[1] = {
        ...stepper[1],
        subStepper: [
          {
            step: 0,
            description: "Category Details",
            completed: true,
          },
          { ...stepper[1].subStepper[1] },
        ],
      };
      const requestData = {
        Applicantid: localStorage.getItem("applicantId"),
        Stepper: { superStepper: newStepper },
      };
      dispatch(addEditStepper(requestData));
      dispatch(getStepperDetails());
      history.push("/select-projects");
    }
  }, [isSuccessResApplicant, toNext]); */

  /* const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  };

  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "No") {
      // dispatch(clearMasterDataList());
      history.push("/select-projects");
      setSelectedValue(null);
    }
  };

  const goPreviousPage = () => {
    history.push("/family-details");
  }; */

  const employmentStatusList = [
    {
      value: 1,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.selfEmployed"
      ),
    },
    {
      value: 2,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.salaried"
      ),
    },
    // {
    //   value: 3,
    //   label: t(
    //     "incomeGroupForm.incomeForm.formControl.employment.options.regularWage"
    //   ),
    // },
    // {
    //   value: 4,
    //   label: t(
    //     "incomeGroupForm.incomeForm.formControl.employment.options.labour"
    //   ),
    // },
    {
      value: 5,
      label: t(
        "incomeGroupForm.incomeForm.formControl.employment.options.other"
      ),
    },
  ];

  const religionList = [
    {
      value: 1,
      label: t("categoryForm.castCategoryForm.formControl.religion.Muslims"),
    },
    {
      value: 2,
      label: t("categoryForm.castCategoryForm.formControl.religion.Christians"),
    },
    {
      value: 3,
      label: t("categoryForm.castCategoryForm.formControl.religion.Zoroastrians"),
    },
    {
      value: 4,
      label: t("categoryForm.castCategoryForm.formControl.religion.Buddhist"),
    },
    {
      value: 5,
      label: t("categoryForm.castCategoryForm.formControl.religion.Jain"),
    },
    {
      value: 6,
      label: t("categoryForm.castCategoryForm.formControl.religion.Sikhs"),
    },
  ];

  const occupationList = [
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
  ];

  // const checkIncomeGroup = () => {
  //   const Familyincome = localStorage.getItem("selectedFamIncome");
  //   console.log(Familyincome, "Familyincome -->")
  //   if (value >= 0 && value <= 25000) {
  //     setIncomeGroupId(1);
  //     setIncomeGroup("EWS");
  //   } else if (value >= 25001 && value <= 50000) {
  //     setIncomeGroupId(2);
  //     setIncomeGroup("LIG");
  //   } else if (value >= 50001 && value <= 100000) {
  //     setIncomeGroupId(3);
  //     setIncomeGroup("MIG - I");
  //   } else if (value >= 100001 && value <= 150000) {
  //     setIncomeGroup("MIG - II");
  //     setIncomeGroupId(4);
  //   } else if (value >= 150001 && value <= 9999999999) {
  //     setIncomeGroupId(5);
  //     setIncomeGroup("HIG");
  //   } else {
  //     setIncomeGroupId("");
  //     setIncomeGroup("");
  //   }
  // };

  // useEffect(() => {
  //   const formik = formikRef.current;
  //   formik.resetForm();
  // }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollonError = (up, down) => {
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
  };

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

  const getWords = (number) => {
    var inputAmount = number;
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (inputAmount != "") {
        const newTimer = setTimeout(() => {
          dispatch(convertAmountToWords(inputAmount));
        }, 500);
      } else {
        dispatch(convertAmountToWords(""));
      }
    }, 500);

    setTimer(newTimer);
  };

  useEffect(() => {
    if (isSuccessAmountToWords) {
      setAmountText(dataAmountToWords);
    }
  }, [isSuccessAmountToWords, dataAmountToWords]);

  const scrollDown = () => {
    myScrollContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

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
          {t("categoryForm.castCategoryForm.acknowledgeContent")}{" "}
          <span onClick={(e) => { setDocPreviewDialogOpen(true); e.stopPropagation() }}>
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
          {t("categoryForm.castCategoryForm.acknowledgeContent")}{" "}{t("categoryForm.castCategoryForm.documentlistTxt")}{" "}
          <span onClick={(e) => { setDocPreviewDialogOpen(true); e.stopPropagation() }}>
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

  useEffect(() => {
    if (reservationCategory && castCategory && isSuccessMasterData) {
      const merged = [...castCategory, ...reservationCategory];
      setCasteReservationRecords(merged);
    }
  }, [castCategory, reservationCategory, isSuccessMasterData]);
  // console.log("--castCategory1--", castCategory);
  // console.log("--reservationCategory1--", reservationCategory);


  const getReligionOptions = (val) => {
    if (+val == 6 || +val == 12 || +val == 13) {
      axios
        .get(
          ApiEndPoint + `/ReservationCategory/reservationSubCategories/` + val + '?Lang=' + localStorage.getItem("i18nextLng")
        )
        .then((res) => {
          var data = res?.data;
          var success = data?.success;
          if (success) {
            var DataArr = data?.data;
            if (DataArr.length > 0) {
              var tmpArr = DataArr.map((item, indx) => {
                return { value: item?.DdtId, label: item?.Title }
              });
              setReligionLists(tmpArr);
            }
          }
        });
    }
  }

  useEffect(() => {
    const values = formikRef.current.values;
    const castCategory = values?.castCategory;
    if (+castCategory > 0) {
      getReligionOptions(castCategory);
    }
  }, [t]);

  /* Category Change Script - Ashwin - START */

  useEffect(() => {
    if (isSuccessChangeCatResetDoc) {
      formikRef.current.values.acceptTerms = true;
      formikRef.current.submitForm();
      //dispatch(clearChangeCatResetDoc());
    }
  }, [dispatch, t, isSuccessChangeCatResetDoc])

  const initialValuesConfirm = {
    mobileNumberConfirm: "",
    oneTimePasswordConfirm: "",
  };

  const validateOTP = (value) => {
    let error;
    if (!value) {
      error = t("otpReqText");
    } else if (!/^[0-9]{6}$/i.test(value)) {
      error = t("otpReqText");
    }
    return error;
  };

  const otpCounterCatChange = () => {
    let timeleftCatchange = 90;
    window.downloadTimerCatChange = setInterval(function () {
      //console.log("--timeleftCancel--",timeleftCancel);
      if (timeleftCatchange <= 0) {
        clearInterval(window.downloadTimerCatChange);
      }
      setCountConfirmationOtp(timeleftCatchange);
      timeleftCatchange -= 1;
    }, 1000);
  };

  useEffect(() => {
    if (isSuccessSendCatChangeOtp) {
      setTimeout(() => setResenConfirmationOtpText(true), 90000);
      //setConfirmDialogOpen(false);
      // setShowConfirmCatChange(true);
      setIsGeneratedConfirmationOtp(true);
      otpCounterCatChange();
      dispatch(clearCatChangeSendOtpState())
    }
  }, [dispatch, t, isSuccessSendCatChangeOtp, otpCounterCatChange])

  const onSubmitConfirm = (values, { setSubmitting }) => {
    setSubmitting(false)
    if (values.oneTimePasswordConfirm) {
      doCatChange(values.oneTimePasswordConfirm);
    }
  };

  const doCatChange = (OTP) => {
    const requestData = {
      ApplicantId: localStorage.getItem("applicantId"),
      Otp: OTP,
      platform: 'web',
    };
    dispatch(changeCatResetDoc(requestData));
  }

  const resendConfirmOtp = () => {
    if (window.downloadTimerCatChange != undefined && window.downloadTimerCatChange != 'undefined') {
      window.clearInterval(window.downloadTimerCatChange);
    }
    setCountConfirmationOtp(0);
    dispatch(sendConfirmCatChangeOtp());
    setResenConfirmationOtpText(false);
  };

  const goToNext = () => {
    const values = formikRef.current.values;
    const currSelCategory = values?.castCategory;
    var prevSelCategory = applicantData?.RservationCatIds;
    if (+prevSelCategory > 0) {
      if (prevSelCategory !== currSelCategory) {
        // setConfirmDialogOpen(true);
        formikRef.current.submitForm();
      } else {
        formikRef.current.submitForm();
      }
    } else {
      formikRef.current.submitForm();
    }
  }

  const handleCloseSkipDialog = (value) => {
    //  setConfirmDialogOpen(false);
    setSelectedValue(value);
    if (window.downloadTimerCatChange != undefined && window.downloadTimerCatChange != 'undefined') {
      window.clearInterval(window.downloadTimerCatChange);
    }
    setCountConfirmationOtp(0);
    if (value == "Yes") {
      if (isApplicationPaymentDone) {
        dispatch(sendConfirmCatChangeOtp());
      } else {
        const requestData = {
          ApplicantId: localStorage.getItem("applicantId"),
          platform: 'web',
        };
        dispatch(changeCatResetDoc(requestData));
      }
    } else {
      setPreviousCategory();
    }
  };

  const setPreviousCategory = () => {
    var prevSelCategory = applicantData?.RservationCatIds;
    if (+prevSelCategory > 0) {
      formikRef.current.values.castCategory = prevSelCategory;
    }
  }

  const handleClose = () => {
    setPreviousCategory();
  };

  const handleAlertClose = () => {
    dispatch(clearCatChangeSendOtpState());
    dispatch(clearChangeCatResetDoc());
  }

  //console.log("--queryParams---",islocationState);
  /* Category Change Script - Ashwin - END */

  return (
    <>
      {isFetchingSendCatChangeOtp && <Loading isOpen={isFetchingSendCatChangeOtp} />}
      {isFetchingChangeCatResetDoc && <Loading isOpen={isFetchingChangeCatResetDoc} />}
      {isFetchingApplicantGet && <Loading isOpen={isFetchingApplicantGet} />}
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={isFcfs ? validationSchema1 : validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, touched, errors, values }) => (
          <Form noValidate autoComplete="off" className={classes.formContainer}>



            <div >
              <div ref={myScrollContainerRef}>
                {isErrorApplicant && (
                  <AlertBox severity="error">{errorMessage}</AlertBox>
                )}


                <Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6} >
                      <FormControl
                        control="categoryselectbox"
                        margin="dense"
                        variant="outlined"
                        name="castCategory"
                        id="castCategory"
                        label={t(
                          "categoryForm.castCategoryForm.formControl.caste.casteLabel"
                        )}
                        options={casteReservationRecords.filter(
                          (data, index, acc) =>
                            index ===
                            acc.findIndex((t) => t.value === data.value)
                        )}
                        required
                        //disabled={isPaymentDone}
                        onChange={(e) => {
                          getReligionOptions(e.target.value);
                          setFieldValue(
                            "castCategory",
                            e.target.value
                          );
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Alert severity="none" elevation={6} component={Paper}>
                        <Typography style={{ fontWeight: 600 }}>
                          Required documents for {documentCategories[values.castCategory]}
                        </Typography>
                        <ul>
                          {requiredDocuments.map((document, index) => (
                            <li key={index}>{document}</li>
                          ))}
                          {values.castCategory === "11" && (
                            <li>Handicap Certificate (Disability minimum 40%)</li>
                          )}
                        </ul>
                        <Typography variant="body1" className={classes.termsNdCondiCheckBoxLabel}>
                          {getInfoText()}
                        </Typography>
                      </Alert>
                    </Grid>






                  </Grid>




                  {/*                 
                    <Box className={classes.termsAndConditionSec}>
                    
                      <Typography
                        variant="body1"
                        className={classes.termsNdCondiCheckBoxLabel}
                      >
                        {getInfoText()}
                      </Typography>
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
                            {t("categoryForm.castCategoryForm.acknowledgeLabel")}{" "}
                          </Typography>
                        }
                        color="primary"
                      />
                    
                     
                    </Box>
                   */}
                </Box>



              </div>
            </div>

            <Grid container alignItems="center" justify="flex-end" style={{ marginTop: "10px" }}>
              {isFetchingApplicant && (
                <Grid item xs="auto">
                  <Typography className={classes.progressView}>
                    {t(
                      "categoryForm.castCategoryForm.formControl.savingText"
                    )}
                  </Typography>
                </Grid>
              )}
              {!stepCompleted && <Grid item xs="auto">


                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={goToNext}

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
                  Save & Continue

                </Button>
              </Grid>}
            </Grid>


          </Form>
        )}
      </Formik>
      <SnackBox open={isErrorChangeCatResetDoc} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMsgChangeCatResetDoc}
        </Alert>
      </SnackBox>
      <SnackBox open={isSuccessChangeCatResetDoc} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {errorMsgChangeCatResetDoc}
        </Alert>
      </SnackBox>
      {/* <CcConfirmDialogBox
        title={t("ccConfirmTitle")}
        description={''}
        question={''}
        selectedValue={selectedValue}
        open={confirmDialogOpen}
        onClose={handleCloseSkipDialog}
      /> */}
      <SnackBox open={isSuccessSendCatChangeOtp} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {errorMessageSendCatChangeOtp}
        </Alert>
      </SnackBox>
      {/* <Dialog sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: 435 } }} open={showConfirmCatChange}>
        <SnackBox open={isErrorSendCatChangeOtp} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {errorMessageSendCatChangeOtp}
          </Alert>
        </SnackBox>
        <DialogTitle id="alert-dialog-title">
          {t("confirmChangeText")}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            {t("confirmChangeNote")}
          </DialogContentText>
        </DialogContent>
        <Grid Container style={{ display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
          <DialogActions>
          </DialogActions>
          {isGeneratedConfirmationOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "50%", marginTop: "-50px" }}>{t("sendOtpText")}<span>&nbsp;&nbsp;{`+91 XXXXXX${applicantMobile?.toString().slice(-4)}`}</span></Typography>
            <Formik
              initialValues={initialValuesConfirm}
              onSubmit={onSubmitConfirm}
              innerRef={formikRefConfirm}
            >
              {({ submitForm, setFieldValue, values }) => (
                <Form className={classes.form} noValidate autoComplete="off">
                  <LocalFormControl
                    control="input"
                    variant="outlined"
                    label={t("enterOtpText")}
                    placeholder={t("enterOtpText")}
                    name="oneTimePasswordConfirm"
                    type="tel"
                    id="oneTimePasswordConfirm"
                    required
                    inputProps={{ maxLength: 6 }}
                    validate={validateOTP}
                  />
                  {!isResenConfirmationOtpText && (
                    <Box textAlign="left">
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#65707D" }}
                      >
                        {t("resendOtpText")} 00:{countConfirmationOtp} {t("sec")}
                      </Typography>
                    </Box>
                  )}
                  {isResenConfirmationOtpText && (
                    <Box display="flex">
                      <Box marginLeft={1}>
                        <Typography variant="body2" gutterBottom>
                          <Link
                            to="#"
                            onClick={() => resendConfirmOtp()}
                            style={{ textDecoration: "none", color: "#0038C0", fontWeight: 600 }}
                          >
                            {t("Resend")}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <DialogActions>
                    <Button autoFocus variant="contained" type="submit" color="primary">
                      {t("submitBtn")}
                    </Button>
                    <Button
                      onClick={() => {
                        if (window.downloadTimerCatChange != undefined && window.downloadTimerCatChange != 'undefined') {
                          window.clearInterval(window.downloadTimerCatChange);
                        }
                        setPreviousCategory();
                        // setShowConfirmCatChange(false);
                        setIsGeneratedConfirmationOtp(false);
                        dispatch(clearCatChangeSendOtpState());
                      }}
                      color="primary">
                      {t("cancelBtn")}
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik> </>}
        </Grid>
      </Dialog> */}
      <UserPDFViewDialogBox showDownload={true} open={docPreviewDialogOpenIs} onClose={docPreviewDialogCloseFun} fileUrl={`${ApiEndPoint}/uploads/files/Mandatory_Document.pdf`} />
      <ReservationMappingDialogBox
        open={termsPrivacyPolicyDialogOpenIs}
        onClose={handleCloseTermsPrivacyPolicyDialogBox}
      />
    </>
  );
}

export default withWidth()(IncomeDetailsForm);
