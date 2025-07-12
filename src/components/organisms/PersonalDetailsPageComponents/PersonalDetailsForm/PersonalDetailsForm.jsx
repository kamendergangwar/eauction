import React, { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Formik, Form } from "formik";
// import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
// import Button from "@material-ui/core/Button";
import { CircularProgress, Button, Avatar } from '@material-ui/core';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
// import PersonalDetails from "../PersonalDetails/PersonalDetails";
import FormControl from "../../../molecules/FormControl/FormControl";
// import Image from "../../../../assets/Profile.jpg";
// import ImageDialogBox from "../../../molecules/DialogBoxes/ImageDialogBox/ImageDialogBox";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { personalDetailsFormStyles } from "./PersonalDetailsForm.styles";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import RecentActorsOutlinedIcon from "@material-ui/icons/RecentActorsOutlined";
import withWidth from "@material-ui/core/withWidth";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  WhiteArrowIcon,
  WhatsappIcon,
  PersonalDetailsTitleIcon,
  ApplicationEditIcon,
  HomeIcon,
  VerifiedSuccessIcon,
  EditWhiteICon,
  LockIcon,
  PassIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
// import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
// import IconTitle from "../../../atoms/IconTitle/IconTitle";
// import SubStepperBar1 from "../../../atoms/StepperBar/SubStepperBar1/SubStepperBar1";
// import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import AddPostalAddressDialogBox from "../../../molecules/DialogBoxes/AddPostalAddressDialogBox/AddPostalAddressDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
  getDetailsFromPanCard,
  sendEmailVerificationOTP,
  clearEmailVerificationOTPState,
  verifyEmailVerificationOTP,
  clearVerifyEmailVerificationOTPState
} from "../../../../redux/features/applicant/ApplicantSlice";
/* import {
  fileUploadSelector,
  setImageUrl,
  clearImageUrl,
} from "../../../../redux/features/file/FileUploadSlice"; */
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import moment from "moment";
// import { SourceOfInformation } from "../../../../utils/MasterData";
// import Input from "@material-ui/core/Input";
// import { CollectionsOutlined } from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import {
  getMaritalStatusList,
  masterDataSelector
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  getCoApplicantDetails,
  coApplicantSelector
} from "../../../../redux/features/coApplicant/CoApplicantSlice";
import { getStepperDetails, addEditStepper, clearApplicantKycStepperVars, clearSuperStepperEditVars } from "../../../../redux/features/stepper/StepperSlice";
import { addEditApplicantProgress, ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import LocalFormControl from "../../../molecules/FormControl/FormControl";
import SnackBox from "../../../atoms/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert";

const PersonalDetailsForm = (props) => {
  const { width } = props;
  const classes = personalDetailsFormStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  // const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  // const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [addressDialogOpenIs, setAddressDialogOpenIs] = useState(false);
  const [verifyEmailDialogOpen, setVerifyEmailDialogOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(null);
  const [formValues, setFormValues] = useState(null);
  // const [isAadharVerified, setIsAadharVerified] = useState(true);
  // const [success, setSuccess] = useState(false);
  // const [isPanCardFieldReadOnly, setIsPanCardFieldReadOnly] = useState(false);
  const myScrollContainerRef = useRef(null);
  // const adhaarRef = useRef(null);
  // const nameRef = useRef(null);
  const [isWhatsappNotification, setWhatsappNotification] = useState(false);
  const [isViewAddress, setIsViewAddress] = useState(false);
  const [postalAddressIs, setPostalAddressIs] = useState("");
  const [maritalStatusList, setMaritalStatusList] = useState([]);
  const [editCoApplicantIs, setEditCoApplicantIs] = useState(false);
  const [error, setError] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [verifyEmailAlert, setVerifyEmailAlert] = useState(false);
  const [disableEmailVerifyBtn, setDisableEmailVerifyBtn] = useState(true);
  const [isSendingVerificationOTP, setIsSendingVerificationOTP] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [countOtp, setCountOtp] = React.useState(90);
  /* const executeScroll = () => {
    myScrollContainerRef.current.scrollTo(
      0,
      myScrollContainerRef.current.offsetTop
    );
  }; */
  // const [selectVal, setSelectVal] = useState([]);
  // const handleChange = (event) => {
  //   setSelectVal(event.target.value);
  // };
  const dispatch = useDispatch();
  const {
    isFetchingApplicant,
    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,
    isSuccessEmailVerificationOTP,
    isErrorVerifyEmailVerificationOTP,
    errorMsgVerifyEmailVerificationOTP,
    isSuccessVerifyEmailVerificationOTP,
    isFetchingVerifyEmailVerificationOTP,
  } = useSelector(applicantSelector);
  const {
    maritalStatusListData,
    isFetchingMaritalStatus,
    isSuccessMaritalStatus,
    isErrorMaritalStatus,
    errorMsgMaritalStatus,
  } = useSelector(masterDataSelector);
  const {
    isFetchingGetCoApplicant,
    isSuccessResGetCoApplicant,
    isErrorGetCoApplicant,
    errorMsgGetCoApplicant,
    coApplicantData,
  } = useSelector(coApplicantSelector);
  const {
    isSuccessResStepper,
    stepperData,
    isSuccessReqStepper
  } = useSelector((state) => state.stepper);
  // const { imageUrl } = useSelector(fileUploadSelector);


  useEffect(() => {
    dispatch(getMaritalStatusList());
    // dispatch(getStepperDetails());
    dispatch(getApplicant());
    dispatch(clearApplicantKycStepperVars());
    if (applicantData.CoApplicantId) {
      dispatch(getCoApplicantDetails());
    }
  }, [dispatch, t]);

  const handleChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (coApplicantData?.IsAadharVerified !== "0" && coApplicantData?.isPanVerified !== "0" && isSuccessResGetCoApplicant) {
      setEditCoApplicantIs(true);
    }
  }, [coApplicantData, isSuccessResGetCoApplicant]);

  // const [{ alt, src }, setImg] = useState({
  //   src: "https://mass-dev-documents.s3.ap-south-1.amazonaws.com/lottery_132591_1625461229_profile.png",
  //   alt: "Upload an Image",
  // });

  // useEffect(() => {
  //   if (isSuccessResStepper) {
  //     let pageUrl;
  //     stepperData.superStepper.forEach(item => {
  //       if (item.step == 1) {
  //         if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
  //           if (item.applicantKycStepper[0].status != "completed") {
  //             pageUrl = "/auth-verify-aadhaar";
  //           }
  //         }

  //         if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
  //           if (item.applicantKycStepper[1].status != "completed") {
  //             pageUrl = "/verify-pancard";
  //           }
  //         }
  //       }

  //     })
  //     history.push(pageUrl)
  //   }
  // }, [isSuccessResStepper]);

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(clearSuperStepperEditVars());
      if (editCoApplicantIs) {
        //history.push("/select-projects");
        history.push("/income-details");
      } else {
        //history.push("/select-projects");
        // history.push("/co-applicant-benefits");
        history.push("/income-details");
      }
    }
  }, [isSuccessReqStepper])

  const initialValues = {
    maritalStatus: "",
    dateOfBirth: null,
    whatsappNumber: "",
    emailId: "",
    emailIdConfirm: "",
    emailIdVerify: "",
  };

  const validationSchema = yup.object().shape({
    whatsappNumber: yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t("personalDetailsForm.formControl.whatsappNumberErrors.limitation")
      ),
    emailId: yup
      .string()
      .email(t("personalDetailsForm.formControl.emailErrors.limitation"))
      .required(
        t(
          "personalDetailsForm.formControl.emailErrors.required"
        )
      ),
    emailIdConfirm: yup
      .string()
      .oneOf([yup.ref('emailId'), null], 'Email Address must match')
      .email(t("personalDetailsForm.formControl.emailConErrors.limitation"))
      .required(t(
        "personalDetailsForm.formControl.emailConErrors.required"
      )),
    maritalStatus: yup
      .string()
      .required(
        t(
          "personalDetailsForm.formControl.maritalStatus.maritalStatusErrors.required"
        )
      ),
    dateOfBirth: yup
      .date()
      .nullable()
      .default(null)
      .required(t("personalDetailsForm.formControl.dob.dobErrors.required")),
  });

  useEffect(() => {
    if (isSuccessMaritalStatus) {
      let temp_marital_status_list = [];
      for (let m = 0; m < maritalStatusListData.length; m++) {
        const element = maritalStatusListData[m];
        let new_obj = {
          value: element.DdtId,
          label: element.Title,
        };
        temp_marital_status_list.push(new_obj);
      }
      setMaritalStatusList(temp_marital_status_list);
    }
  }, [isSuccessMaritalStatus]);

  useEffect(() => {
    if (isSuccessResApplicantGet && maritalStatusList.length > 0) {
      let marritalStatus = "";
      if (applicantData.MarritalStatus) {
        marritalStatus = maritalStatusList[Number(applicantData.MarritalStatus)].value;
      }
      let dateOfBirth = null;
      if (applicantData.DOB) {
        if (applicantData.DOB !== "00/00/0000") {
          let apiDate = applicantData.DOB;
          let convertDate = apiDate.split("/");
          const finalDate = new Date(
            parseInt(convertDate[2]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[0])
          );
          dateOfBirth = finalDate;
        }
      }
      let whatsapp_no = "";
      if (applicantData.WhatsappNo) {
        if (applicantData.WhatsappNo !== "0") {
          whatsapp_no = applicantData.WhatsappNo;
        }
      }
      if (applicantData.PresentPincode != "0") {
        setIsViewAddress(true)
      } else {
        setIsViewAddress(false)
      }

      let email_id = "";
      if (applicantData.EmailId) {
        if (applicantData.EmailId !== null) {
          email_id = applicantData.EmailId;
        }
      }
      if (applicantData.IsSamePermanentAddress == "1") {
        setPostalAddressIs("yes");
        setError(false);
      }
      if (applicantData.IsSamePermanentAddress == "0") {
        setPostalAddressIs("no");
        setError(false);
      }
      if (applicantData.IsWhatsupNotification == "1") {
        setWhatsappNotification(true);
      }
      const savedValues = {
        dateOfBirth: dateOfBirth || null,
        maritalStatus: marritalStatus,
        whatsappNumber: whatsapp_no,
        emailId: email_id,
        emailIdConfirm: email_id,
        emailIdVerify: email_id != "" ? "1" : "",
        // SourceInfo: source || "1",
      };
      localStorage.setItem("ApplicantEmail", email_id);
      setFormValues(savedValues);
      setEmailValue(email_id);
      /* setSuccess(true);
      if (applicantData.IsAadharVerified === "1") {
        setIsAadharVerified(true);
      } else {
        setIsAadharVerified(false);
      }
      if (applicantData.PANNo) {
        setIsPanCardFieldReadOnly(true);
      } else {
        setIsPanCardFieldReadOnly(false);
      } */
    }
  }, [isSuccessResApplicantGet, applicantData, dispatch, maritalStatusList]);

  /* useEffect(() => {
    console.log("panCardData", panCardData);
    console.log("errorMessagePanCard", errorMessagePanCard);
    console.log("isErrorPanCard", isErrorPanCard);
  }, [panCardData, errorMessagePanCard, isErrorPanCard]); */

  /* useEffect(() => {
    if (isSuccessResPanCard) {
      setIsPanCardFieldReadOnly(true);
    }
  }, [isSuccessResPanCard]);

  const onInputOfPanNumber = (e) => {
    let panValue = ("" + e.target.value).toUpperCase();
    if (panValue.length == 10) {
      panVerificationReq(panValue);
    }
    return (e.target.value = ("" + e.target.value).toUpperCase());
  };

  const panVerificationReq = (pan_no) => {
    if (/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan_no)) {
      let sendParam = {
        docNumber: pan_no,
        Lang: localStorage.getItem("i18nextLng"),
        ApplicantId: localStorage.getItem("applicantId"),
      };
      dispatch(getDetailsFromPanCard(sendParam));
    }
  }; */

  useEffect(() => {
    dispatch(getApplicantProgress());
  }, [dispatch]);
  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } = useSelector(ApplicantProgressSelector);
  const updateApplicantProgressStepper = () => {
    let newStepper = [];
    let newStep = {};
    // if (isSuccessProgressResStepper) {
    // }
    const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
    ApplicantStepper.forEach(step => {
      if (step.StepId == 3) {
        newStep = {
          ...step,
          Status: "completed",
          Description: "Personal details updated successfully"
        }
      } else {
        newStep = step
      }
      newStepper.push(newStep);
    });
    dispatch(addEditApplicantProgress(newStepper));
  }

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log(values);
    if (values.emailIdVerify === "") {
      setVerifyEmailAlert(true);
      return false;
    }
    //return false;
    if (postalAddressIs == "" && isViewAddress == false) {
      setError(true);
    } else {
      const requestData = {
        DOB: moment(values.dateOfBirth).format("DD-MM-YYYY"),
        EmailId: values.emailId,
        WhatsappNo: values.whatsappNumber,
        IsWhatsupNotification: isWhatsappNotification ? "1" : "0",
        MarritalStatus: values.maritalStatus,
        isAddressSameOrNot: postalAddressIs === "yes" ? "1" : "0",
        Type: "PersonalDetails",
        Lang: localStorage.getItem("i18nextLng"),
      };
      dispatch(editApplicant(requestData));
      // updateApplicantProgressStepper();
    }

  };

  useEffect(() => {
    if (isSuccessResApplicant) {
      updateStepperUI();
      // const requestData = {
      //   EmailId: formikRef.current.values.emailId,
      //   WhatsappNo: formikRef.current.values.whatsappNumber,
      //   ApplicantId: localStorage.getItem("applicantId"),
      //   IsWhatsappNotification: isWhatsappNotification ? "1" : "0",
      //   MarritalStatus: formikRef.current.values.maritalStatus,
      //   steps: "step_8"
      // };
      // dispatch(createAccountLog(requestData));
      dispatch(clearApplicantState());
      dispatch(clearApplicantKycStepperVars());
      // || formikRef.current.values.maritalStatus == 1 || formikRef.current.values.maritalStatus == 2 || formikRef.current.values.maritalStatus == 11 || formikRef.current.values.maritalStatus == 123
    }
  }, [isSuccessResApplicant]);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "2" && item.Status == "pending") {
          history.push("/select-projects");
        }
      })
    }
  }, [isSuccessProgressResStepper])

  // const updateStepperUI = () => {
  //   const stepper = stepperData.superStepper;
  //   const newStepper = [];
  //   for (let s = 0; s < stepper.length; s++) {
  //     const element = stepper[s];
  //     let new_obj = {};
  //     if (element.step == 1) {
  //       new_obj = {
  //         ...element,
  //         status: "completed"
  //       };
  //     } else {
  //       new_obj = {
  //         ...element
  //       };
  //     }
  //     newStepper.push(new_obj);
  //   }
  //   dispatch(addEditStepper(newStepper));
  // };

  const updateStepperUI = () => {
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

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    setIsEligible(false);
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  /* const handleClickOpenPhotoDialog = () => {
    setOpenPhotoDialog(true);
  };

  const handleClosePhotoDialog = (value) => {
    // console.log("====================================");
    // console.log(value);
    // console.log("====================================");
    setOpenPhotoDialog(false);
    // setImg({
    //   src: value,
    //   alt: "Crop Image",
    // });
  }; */

  const postalAddCheckChangehandle = (event) => {
    setPostalAddressIs(event.target.value);
    setError(false);
    if (event.target.value == "no") {
      setAddressDialogOpenIs(true);
    }
  };

  /* const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  }; */

  /* const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "No") {
      history.push("/contact-details");
      setSelectedValue(null);
    }
  }; */

  /* const genderList = [
    {
      value: "1",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.gender.options.male"
      ),
    },
    {
      value: "2",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.gender.options.female"
      ),
    },
    {
      value: "3",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.gender.options.other"
      ),
    },
  ]; */

  /* const maritalStatusList = [
    {
      value: "1",
      label: t("personalDetailsForm.formControl.maritalStatus.options.single"),
    },
    {
      value: "2",
      label: t("personalDetailsForm.formControl.maritalStatus.options.married"),
    },
    {
      value: "3",
      label: t(
        "personalDetailsForm.formControl.maritalStatus.options.divorced"
      ),
    },
    {
      value: "4",
      label: t("personalDetailsForm.formControl.maritalStatus.options.widow"),
    },
    {
      value: "5",
      label: t("personalDetailsForm.formControl.maritalStatus.options.widower"),
    },
  ]; */

  /* const SourceOfInformation = [
    {
      value: "1",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.soi.options.newsPaper"
      ),
    },
    {
      value: "2",
      label: t("applicatntDetailsForm.formControl.otherInfo.soi.options.Radio"),
    },
    {
      value: "3",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.soi.options.Television"
      ),
    },
    {
      value: "4",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.soi.options.OutdoorHoarding"
      ),
    },
    {
      value: "5",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.soi.options.NMMTbus"
      ),
    },
    {
      value: "6",
      label: t("applicatntDetailsForm.formControl.otherInfo.soi.options.STbus"),
    },
    {
      value: "7",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.soi.options.SocialMedia"
      ),
    },
    {
      value: "8",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.soi.options.DigitalGoogle"
      ),
    },
    {
      value: "9",
      label: t(
        "applicatntDetailsForm.formControl.otherInfo.soi.options.TollFreeNumber"
      ),
    },
  ]; */

  /* useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); */ // eslint-disable-line react-hooks/exhaustive-deps

  const calculateAge = (dob) => {
    const diffMs = Date.now() - dob.getTime();
    const ageDT = new Date(diffMs);
    const age = Math.abs(ageDT.getUTCFullYear() - 1970);
    if (age < 18) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  /* const EligibleText = () => {
    const formik = formikRef.current;
    if (!formik.values.dateOfBirth) return null;
    return (
      <Grid item xs={12} sm={6}>
        <Box paddingY={width === "xs" ? 0 : 4}>
          <FormHelperText error variant="filled">
            {t("applicatntDetailsForm.formControl.otherInfo.dob.eligibleText")}
          </FormHelperText>
        </Box>
      </Grid>
    );
  }; */

  /* const scrollonError = (up, down) => {
    console.log(up, down);
    if (up && !down) {
      adhaarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (!up && down) {
      nameRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (up && down) {
      adhaarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToAdhaar = (errors, submitForm) => {
    // adhaarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    // submitForm();
    let up = false;
    let down = false;
    for (const property in errors) {
      if (property === "aadhaarNumber" || property === "panNumber") {
        up = true;
        // down = false;
        // scrollonError(true, false);
      }
      if (
        property === "firstName" ||
        property === "lastName" ||
        property === "fatherName" ||
        property === "gender" ||
        property === "maritalStatus"
      ) {
        // up = false;
        down = true;
        // scrollonError(false, true);
      }

      scrollonError(up, down);
    }
    submitForm();
    // console.log("errors", formikRef.current.errors);
  }; */

  const recieveUpdateCheckChangehandle = (event) => {
    setWhatsappNotification(event.target.checked);
  };

  const refreshData = () => {
    dispatch(getApplicant());
  }

  const scrollDown = () => {
    myScrollContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }

  const initialValuesVerifyemail = {
    emailIdVerifyemail: "",
    oneTimePasswordVerifyemail: "",
  };

  const formikRefVerifyemail = useRef();

  const otpCounter = () => {
    //dispatch(clearBookingOtpState())
    //setCountOtp(90);
    dispatch(clearEmailVerificationOTPState());
    let timeleft = 90;
    window.downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(window.downloadTimer);
      }
      setCountOtp(timeleft);
      timeleft -= 1;
    }, 1000);
  };

  const validateEmailOTP = (value) => {
    let error;
    if (!value) {
      error = t("personalDetailsForm.formControl.otpReqText");
    } else if (!/^[0-9]{4}$/i.test(value)) {
      error = t("personalDetailsForm.formControl.otpReqText");
    }
    return error;
  };

  const onSubmitVerifyemail = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.oneTimePasswordVerifyemail) {
      const requestData = {
        Otp: values.oneTimePasswordVerifyemail,
        ApplicantId: localStorage.getItem("applicantId"),
        EmailId: emailValue,
      };
      dispatch(verifyEmailVerificationOTP(requestData));
    }
  };

  useEffect(() => {
    var AppEmail = localStorage.getItem("ApplicantEmail", "noEmail");
    if (AppEmail != "" && AppEmail != "noEmail") {
      if (AppEmail != emailValue) {
        setIsEmailVerified(false);
        setDisableEmailVerifyBtn(false);
        formikRef.current.values.emailIdVerify = "";
      } else {
        setIsEmailVerified(true);
        setDisableEmailVerifyBtn(true);
        formikRef.current.values.emailIdVerify = 1;
        setVerifyEmailAlert(false);
      }
    }
    if (emailValue.length > 0) {
      let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (emailReg.test(emailValue) === true) {
        setDisableEmailVerifyBtn(false);
      } else {
        setDisableEmailVerifyBtn(true);
      }
    } else {
      setDisableEmailVerifyBtn(true);
    }
  }, [emailValue]);

  const copyValueToConfirm = (e) => {
    //console.log(formikRef.current.values);
    formikRef.current.values.emailId = e.target.value;
    formikRef.current.values.emailIdConfirm = e.target.value;
    setEmailValue(e.target.value);
  }

  const verifyEmailFunc = () => {
    setIsSendingVerificationOTP(true);
    const requestData = {
      EmailId: formikRef.current.values.emailId,
      ApplicantId: localStorage.getItem("applicantId"),
    };
    dispatch(sendEmailVerificationOTP(requestData));
    setResenOtpText(false);
    //setCountOtp(90);
    //setResenOtpText(false);
    //setTimeout(() => setResenOtpText(true), 90000);    
  }

  const resendOtp = () => {
    if (window.downloadTimer != undefined && window.downloadTimer != 'undefined') {
      window.clearInterval(window.downloadTimer);
    }
    const requestData = {
      EmailId: formikRef.current.values.emailId,
      ApplicantId: localStorage.getItem("applicantId"),
    };
    dispatch(sendEmailVerificationOTP(requestData));
    setResenOtpText(false);
    //setTimeout(() => setResenOtpText(true), 90000);
  };

  useEffect(() => {
    if (isSuccessEmailVerificationOTP) {
      dispatch(clearEmailVerificationOTPState());
      setIsSendingVerificationOTP(false);
      setVerifyEmailDialogOpen(true);
      setTimeout(() => setResenOtpText(true), 90000);
      otpCounter();
    }
  }, [dispatch, t, isSuccessEmailVerificationOTP, otpCounter]);

  const handleVerifyClose = () => {
    dispatch(clearVerifyEmailVerificationOTPState());
  }

  useEffect(() => {
    if (isErrorVerifyEmailVerificationOTP) {
      //alert('Hmmmm');
    }
  }, [isErrorVerifyEmailVerificationOTP]);

  useEffect(() => {
    if (isSuccessVerifyEmailVerificationOTP) {
      //dispatch(clearVerifyEmailVerificationOTPState());
      setVerifyEmailDialogOpen(false);
      formikRef.current.values.emailIdVerify = 1;
      setIsEmailVerified(true);
      setDisableEmailVerifyBtn(true);
      setVerifyEmailAlert(false);
      localStorage.setItem("ApplicantEmail", formikRef.current.values.emailId);
    }
  }, [isSuccessVerifyEmailVerificationOTP]);

  return (
    <>
      {(isFetchingApplicantGet) && (
        <Loading isOpen={isFetchingApplicantGet} />
      )}
      {(isSendingVerificationOTP) && (
        <Loading isOpen={isSendingVerificationOTP} />
      )}
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, touched, errors, values }) => (
          <Form noValidate autoComplete="off" >
            {/* <Hidden only={["sm", "md", "lg"]}>
                <Box marginLeft={2} paddingY={2}>
                  <Button
                    onClick={() => history.push("/dashboard")}
                    color="primary"
                    startIcon={<NavigateBeforeIcon />}
                  >
                    {t("backButtonText")}
                  </Button>
                </Box>
              </Hidden> */}
            {/* <Hidden only="xs">
                <SubStepperBar1 step={0} />
              </Hidden> */}
            {/* <FormMandatoryText /> */}


            <Box >
              {isErrorApplicant && (
                <AlertBox severity="error">{errorMessage}</AlertBox>
              )}
              <Grid
                container
                spacing={width === "xs" ? 1 : 3}
                justify="space-evenly"
              >
                {/* {applicantData && <Grid container item xs={12} sm={6} alignItems="center">
                  <Grid className={classes.nameBox} container alignItems="center">
                    <Avatar src={applicantData.ImagePath} className={classes.imagelarge} />
                    <Grid item style={{ marginLeft: "10px" }}>
                      <Typography className={classes.applicantName}>{applicantData.FirstName}</Typography>
                      {applicantData.Age > 0 && <span style={{ color: "#65707D", fontSize: "14px" }}>{t('personalDetailsForm.formControl.ageTxt')}: {applicantData.Age} |</span>}
                      <span style={{ color: "#65707D", fontSize: "14px" }}>{applicantData.Gender == 1 ? t('personalDetailsForm.formControl.maleTxt') : t('personalDetailsForm.formControl.femaleTxt')}</span>
                    </Grid>
                  </Grid>
                </Grid>} */}
                {/* <Grid item xs={12} sm={6}>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    id="maritalStatus"
                    name="maritalStatus"
                    label={t(
                      "personalDetailsForm.formControl.maritalStatus.maritalStatusLabel"
                    )}
                    options={maritalStatusList}
                    required
                  />
                </Grid> */}

              </Grid>
              {/* <Grid
                container
                spacing={width === "xs" ? 1 : 3}
                justify="space-evenly"
              >
                <Grid item xs={12} sm={6}>
                  <FormControl
                    control="datepicker"
                    name="dateOfBirth"
                    label={t(
                      "personalDetailsForm.formControl.dob.dobLabel"
                    )}
                    placeholder={t(
                      "personalDetailsForm.formControl.dob.dobPlaceholder"
                    )}
                    onChange={(value) => {
                      if (value) {
                        calculateAge(value);
                        setFieldValue("dateOfBirth", value);
                      } else {
                        setFieldValue("dateOfBirth", null);
                      }
                    }}
                    // variant={width === "lg" ? "inline" : ""}
                    maxDate={new Date()}
                    inputVariant="outlined"
                    required
                  />
                  {isEligible && (
                    <AlertBox severity="error">{t("personalDetailsForm.formControl.dob.dobErrors.eligibleText")}</AlertBox>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} style={{ position: "relative" }}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "personalDetailsForm.formControl.emailInputLabel"
                    )}
                    placeholder={t(
                      "personalDetailsForm.formControl.emailPlaceholder"
                    )}
                    name="emailId"
                    type="email"
                    id="emailId"
                    inputProps={{ maxLength: 100 }}
                    required
                    value={emailValue}
                    onChange={copyValueToConfirm}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment variant="standard" position="end" disablePointerEvents={disableEmailVerifyBtn} >
                  //       {!isEmailVerified &&
                  //             <Button variant="contained" disabled={disableEmailVerifyBtn} color="primary" size="small" endIcon={<PassIcon />} onClick={verifyEmailFunc}>
                  //                 {t("personalDetailsForm.formControl.verifyEmail")}
                  //             </Button>
                  //       }
                  //       {isEmailVerified &&
                  //             <Button variant="contained" disabled={disableEmailVerifyBtn} color="primary" size="small" endIcon={<VerifiedSuccessIcon />}>
                  //                 {t("personalDetailsForm.formControl.emailVerified")}
                  //             </Button>
                  //       }
                  //     </InputAdornment>
                  //   ),
                  // }}
                  />
                  <Grid item md={6} xs={6} style={{ position: "absolute" }}>
                    <Box className="rightSide">
                      {!isEmailVerified &&
                        <Button variant="contained" disabled={disableEmailVerifyBtn} color="primary" size="small" endIcon={<PassIcon />} onClick={verifyEmailFunc}>
                          {t("personalDetailsForm.formControl.verifyEmail")}
                        </Button>
                      }
                      {isEmailVerified &&
                        <Button variant="contained" disabled={disableEmailVerifyBtn} color="primary" size="small" endIcon={<VerifiedSuccessIcon />}>
                          {t("personalDetailsForm.formControl.emailVerified")}
                        </Button>
                      }
                    </Box>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid
                container
                spacing={width === "xs" ? 1 : 3}
              >
                {/* <Grid item xs={12} sm={6}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={`${t(
                            "personalDetailsForm.formControl.whatsappNumberInputLabel"
                          )} (${t(
                            "personalDetailsForm.formControl.optionaltxt"
                          )})`}
                          placeholder={t(
                            "personalDetailsForm.formControl.whatsappNumberPlaceholder"
                          )}
                          name="whatsappNumber"
                          type="number"
                          id="whatsappNumber"
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 10);
                          }}
                          onChange={(e) => {
                            setFieldValue("whatsappNumber", e.target.value);
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <strong>+91 - </strong>{" "}
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isWhatsappNotification}
                                name="isWhatsappNotification"
                                color="primary"
                                onChange={recieveUpdateCheckChangehandle}
                              />
                            }
                            label={
                              <Typography
                                variant="body1"
                                className={classes.recieveUpdateCheckBoxLabel}
                              >
                                {t(
                                  "personalDetailsForm.formControl.checkBoxLabel1"
                                )}
                                <WhatsappIcon
                                  className={classes.whatsAppIcon}
                                  fontSize="small"
                                />
                                <span className={classes.whatsAppTxt}>
                                  {" "}
                                  {t(
                                    "personalDetailsForm.formControl.whatsAppTxt"
                                  )}
                                </span>
                              </Typography>
                            }
                          />
                        </FormGroup>
                      </Grid> */}
                {/* <Grid item xs={12} sm={4}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "personalDetailsForm.formControl.emailInputLabel"
                    )}
                    placeholder={t(
                      "personalDetailsForm.formControl.emailPlaceholder"
                    )}
                    name="emailId1"
                    type="email"
                    id="emailId1"
                    inputProps={{ maxLength: 100 }}
                    style={{ display: "none" }}
                  />
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t(
                      "personalDetailsForm.formControl.emailConInputLabel"
                    )}
                    placeholder={t(
                      "personalDetailsForm.formControl.emailConPlaceholder"
                    )}
                    name="emailIdConfirm"
                    type="email"
                    id="emailIdConfirm"
                    onCut={handleChange}
                    onCopy={handleChange}
                    onPaste={handleChange}
                    inputProps={{ maxLength: 100 }}
                    value={emailValue}
                    required
                    onClick={() => scrollDown()}
                    style={{ display: "none" }}
                  />
                  <FormControl
                    control="input"
                    variant="outlined"
                    label=""
                    placeholder="Verification Status"
                    name="emailIdVerify"
                    type="hidden"
                    id="emailIdVerify"
                    style={{ display: "none" }}
                  />
                </Grid> */}
              </Grid>
            </Box>
            <div className={`${classes.checkboxSection} ${!isViewAddress ? "active" : ""}`}>
              {(!isViewAddress && applicantData?.IspostalAddressSame == "") && (
                <Grid container spacing={width === "xs" ? 1 : 3} justify="space-evenly" alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <Typography className={classes.postalAddYesOrNoTxt}>
                      {t("personalDetailsForm.formControl.isPostalAddSameTxt")}
                    </Typography>
                    <Typography className={classes.postalAddSub}>
                      {t("personalDetailsForm.formControl.isPostalAddSameSubTxt")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <RadioGroup
                      row
                      aria-label="postalAddSameIs"
                      name="postalAddSameIs"
                      value={postalAddressIs}
                      onChange={postalAddCheckChangehandle}
                      className={classes.yesOrNoRadioGroup}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label={t(
                          "personalDetailsForm.formControl.isPostalAddYesTxt"
                        )}
                        labelPlacement="end"
                        className={`${classes.yesOrNoCheckBox} ${postalAddressIs == "yes" ? "active" : ""
                          }`}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label={t(
                          "personalDetailsForm.formControl.isPostalAddNoTxt"
                        )}
                        labelPlacement="end"
                        className={`${classes.yesOrNoCheckBox} ${postalAddressIs == "no" ? "active" : ""
                          }`}
                      />
                    </RadioGroup>
                    {error && <FormHelperText className={classes.errorTxt}>Please Select the option</FormHelperText>}
                  </Grid>
                </Grid>
              )}
              {(isViewAddress) && <Grid container spacing={width === "xs" ? 1 : 3} justify="space-evenly" alignItems="center">
                <Grid item xs={12} sm={12}>
                  <Box className={classes.currentAddressContainer}>
                    <Box className="header">
                      {/* spacing={4} */}
                      <Grid container alignItems="center" justify="center">
                        <Grid item md={9} xs={9}>
                          <Box className="leftSide">
                            <HomeIcon />
                            <Box>
                              {t("personalDetailsForm.formControl.myCurrentAddressTxt")}
                              <Typography className={classes.postalAddSub}>
                                {t("personalDetailsForm.formControl.isPostalAddSameSubTxt")}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item md={3} xs={3}>
                          <Box className="rightSide">
                            <Button color="primary" size="small" startIcon={<ApplicationEditIcon />} onClick={() => setAddressDialogOpenIs(true)}>
                              {t("coApplicant.addDetailsSection.editBtnTxt")}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="body">
                      {applicantData?.PresentHouse}, {applicantData?.PresentArea} {applicantData?.PresentCity}, {applicantData?.PresentDistrict}, {applicantData?.PresentState} - {applicantData?.PresentPincode}
                    </Box>
                  </Box>
                </Grid>
              </Grid>}
              {postalAddressIs == "yes" && <Grid container spacing={width === "xs" ? 1 : 3} justify="space-evenly" alignItems="center">
                <Grid item xs={12} sm={9}>
                  <Box className={classes.currentAddressContainer} marginTop={4}>
                    <Box className="header">
                      {/* spacing={4} */}
                      <Grid container alignItems="center" justify="center">
                        <Grid item md={9} xs={9}>
                          <Box className="leftSide">
                            <HomeIcon />
                            <Box>
                              {t("personalDetailsForm.formControl.myCurrentAddressTxt")}
                              <Typography className={classes.postalAddSub}>
                                {t("personalDetailsForm.formControl.isPostalAddSameSubTxt")}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item md={3} xs={3}>
                          {/* <Box className="rightSide">
                                <Button color="primary" size="small" startIcon={<ApplicationEditIcon />} onClick={() => setAddressDialogOpenIs(true)}>
                                  Edit
                                </Button>
                              </Box> */}
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="body">
                      {applicantData?.PresentHouse}, {applicantData?.PresentArea} {applicantData?.PresentCity} , {applicantData?.PresentDistrict} , {applicantData?.PresentState} - {applicantData?.PresentPincode}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              }
            </div>


            {/* <div className={classes.actionSection}>
                {verifyEmailAlert && (
                  <AlertBox severity="error">{t("personalDetailsForm.formControl.verifyEmailAlert")}</AlertBox>
                )}
                <Grid container alignItems="center" justify="flex-end">
                  {isFetchingApplicant &&
                    <Grid item xs="auto">
                      <Box>
                        <Typography className={classes.progressView}>
                          {t("savingLoaderTxt")}...
                        </Typography>
                      </Box>
                    </Grid>
                  }
                  <Grid item xs="auto">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={
                        <WhiteArrowIcon style={{ fill: "transparent" }} />
                      }
                      // onClick={submitForm}
                      disabled={isEligible || isFetchingApplicant}
                    >
                      {isFetchingApplicant && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                      {t("saveButtonText")}
                    </Button>
                  </Grid>
                </Grid>
              </div> */}
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
      {addressDialogOpenIs &&
        <AddPostalAddressDialogBox
          open={addressDialogOpenIs}
          onClose={setAddressDialogOpenIs}
          applicantData={applicantData}
          isSuccessResApplicantGet={isSuccessResApplicantGet}
          refreshData={refreshData}
          postalAddressIs={postalAddressIs}
        />
      }
      {/* <ConfirmDialogBox
        title={t("Translation:skipDialog.title")}
        description={t("Translation:skipDialog.description")}
        question={t("Translation:skipDialog.question")}
        selectedValue={selectedValue}
        open={skipDialogOpen}
        onClose={handleCloseSkipDialog}
      /> */}
      <SnackBox open={isSuccessVerifyEmailVerificationOTP} autoHideDuration={5000} onClose={handleVerifyClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {t("personalDetailsForm.formControl.emailVerificationCompleted")}
        </Alert>
      </SnackBox>
      <Dialog sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: 435 } }} open={verifyEmailDialogOpen}>
        {isFetchingVerifyEmailVerificationOTP && <Loading isOpen={isFetchingVerifyEmailVerificationOTP} />}
        <SnackBox open={isErrorVerifyEmailVerificationOTP} autoHideDuration={3000} onClose={handleVerifyClose}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {errorMsgVerifyEmailVerificationOTP}
          </Alert>
        </SnackBox>
        <DialogTitle id="alert-dialog-title">
          {t("personalDetailsForm.formControl.emailVerificationTxt")}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontWeight: "bold", fontStyle: "oblique", fontSize: "medium" }}>{t("personalDetailsForm.formControl.verificationCheckEmailTxt")}</span>
          </DialogContentText>
        </DialogContent>
        <Grid Container style={{ padding: "0 50px", display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
          <Typography className={classes.sendOtpTxt} style={{ fontWeight: "600", marginRight: "75px", marginTop: "-50px", visibility: "visible" }}>{t("personalDetailsForm.formControl.getOtpButtonText")}<span style={{ fontStyle: "italic" }}>{formikRef?.current?.values?.emailId}</span></Typography>
          <Formik
            initialValues={initialValuesVerifyemail}
            onSubmit={onSubmitVerifyemail}
            innerRef={formikRefVerifyemail}
          >
            {({ submitForm, setFieldValue, values }) => (
              <Form className={classes.form} noValidate autoComplete="off">
                <LocalFormControl
                  control="input"
                  variant="outlined"
                  label={t("personalDetailsForm.formControl.enterOtpText")}
                  placeholder={t("personalDetailsForm.formControl.enterOtpText")}
                  name="oneTimePasswordVerifyemail"
                  type="tel"
                  id="oneTimePasswordVerifyemail"
                  required
                  inputProps={{ maxLength: 4 }}
                  validate={validateEmailOTP}
                />
                {!isResenOtpText && (
                  <Box textAlign="left">
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      style={{ color: "#65707D" }}
                    >
                      {t("personalDetailsForm.formControl.resendOtpText")} 00:{countOtp} {t("personalDetailsForm.formControl.sec")}
                    </Typography>
                  </Box>
                )}
                {isResenOtpText && (
                  <Box display="flex">
                    <Box marginLeft={1}>
                      <Typography variant="body2" gutterBottom>
                        <Link
                          to="#"
                          onClick={() => resendOtp(values.emailIdVerifyemail)}
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
                    {t("personalDetailsForm.formControl.submitBtn")}
                  </Button>
                  <Button
                    onClick={() => {
                      if (window.downloadTimer != undefined && window.downloadTimer != 'undefined') {
                        window.clearInterval(window.downloadTimer);
                      }
                      setCountOtp(0);
                      setResenOtpText(false);
                      setVerifyEmailDialogOpen(false);
                    }}
                    color="primary">
                    {t("personalDetailsForm.formControl.cancelBtn")}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Grid>
      </Dialog>
    </>
  );
};

export default withWidth()(PersonalDetailsForm);
