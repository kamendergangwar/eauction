import React, { createRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSteps } from "../mockdata";
import {
  GroupAdd,
  AccountCircle,
  VerifiedUser,
  AccountBalance,
  AssignmentTurnedIn,
  Apartment,
  PaymentOutlined,
  EmojiPeople,
} from "@material-ui/icons";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CloseIconMui from '@material-ui/icons/Close';
import {
  DownloadIcon,
  DownloadPrimaryIcon,
  PendingDocIcon,
  RejectedDocIcon,
  StepCompletedTag,
  StepInProgressTag,
  VerifiedSuccessIcon,
  ApplyForLoanImg,
  CloseIcon,
  PassIcon
} from "../../../../../atoms/SvgIcons/SvgIcons";
import panVeriedimg from "../../../../../../assets/PANVerified.png"
import aadhaarVeriedimg from "../../../../../../assets/AadharVerified.png"
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { styled } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import PhoneIcon from '@material-ui/icons/Phone';
import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  ListItem,
  Typography,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  DialogActions,
  Chip,
  DialogContentText,
  DialogContent,
  withStyles,
  Tooltip,
  CardMedia,
  Avatar,
  Dialog,
  IconButton,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { StepperV3Styles } from "./UserStepperV3.styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { EmailOutlined, ErrorOutline, InfoOutlined } from "@material-ui/icons";
import { ApplicantProgressSelector } from "../../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { useDispatch, useSelector } from "react-redux";
import { applicantSelector, clearApplicantData, clearUpdateEmailState, editApplicantEmail, getApplicant, sendEmailVerificationOTP, clearEmailVerificationOTPState, verifyEmailVerificationOTP, clearVerifyEmailVerificationOTPState } from "../../../../../../redux/features/applicant/ApplicantSlice";
import { ApiEndPoint } from "../../../../../../utils/Common";
import Loading from "../../../../../atoms/Loading/Loading";
import { getPreferencesList, preferencesSelector } from "../../../../../../redux/features/preferences/PreferencesSlice";
import moment from "moment";
import { masterDataSelector } from "../../../../../../redux/features/masterdata/MasterDataSlice";
import axios from "axios";
import FormControl from "../../../../../molecules/FormControl/FormControl";
import { Form, Formik } from "formik";
import AlertBox from "../../../../../atoms/AlertBox/AlertBox";
import * as yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import UpdateIcon from '@material-ui/icons/Update';
//import SnackBox from "../../../../atoms/Snackbar/Snackbar";
import LocalFormControl from "../../../../../molecules/FormControl/FormControl";
import SnackBox from "../../../../../atoms/Snackbar/Snackbar";
//import FormControl from "../../../../../molecules/FormControl/FormControl";

const CustomTooltip = withStyles({
  tooltip: {
    maxWidth: "500px",
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);

const ErrorTooltip = withStyles((theme) => ({
  arrow: {
    color: 'rgba(200, 0, 0, 0.87)',
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(200, 0, 0, 0.87)',
    boxShadow: "0 0 20px rgba(223 19 19 / 50%)",
    fontSize: 11,
  },
}))(Tooltip);
// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255, .05)"
//       : "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
//   "& .MuiAccordionSummary-root.Mui-expanded": {
//     maxHeight: "35px",
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

const UserStepperV3 = (props) => {
  const {
    activeStep,
    setDialogStep,
    handleClickPopover,
    redirect,
    title,
    doclist,
    nocApprovedDocsCount,
    totalNocDocsCount,

    reservationCategory,
    totalVerifiedDocsCount,
    totalDocsCount,
    rejectedDocsCount,
    preVerifyDocList,
    isLatestNocPaymentDone,
    postVerifyDocList,
    savedProjectsGroupList,
    skipDocs
  } = props;
  const { allCategory, castCategory } = useSelector(masterDataSelector);
  const {
    ApplicantStepperData,
    isSuccessProgressResStepper,
    superActiveStep,
    superStepper,
  } = useSelector(ApplicantProgressSelector);

  const { isSuccessBookingEndTime, bookingEndTime } = useSelector(preferencesSelector);

  const [isInitialized, setIsInitialized] = useState(false);
  const [verifiedDocs, setVerifiedDocs] = useState("");
  const [UploadedDocsCount, setUploadedDocsCount] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = StepperV3Styles();
  const { t } = useTranslation(["DashboardPageTrans", "PersonalDetailsPageTrans"]);
  const formikRef = useRef();
  const stepRefs = useRef([]);
  const [expanded, setExpanded] = React.useState("panel1");
  const [expandedC5, setExpandedC5] = React.useState("allotmentLetter");
  const [pdfLoading, setPdfLoading] = useState(false);
  const ApiEndPointPdf = ApiEndPoint + "/Applicant/applicationOverviewPdf/";
  const [category, setcategory] = useState();
  const [bookingEndDate, setBookingEndDate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isNotRequiredLoan, setIsNotRequiredLoan] = useState(false)
  const [isRequiredLoan, setIsRequiredLoan] = useState(false)
  const [aboutNocShow, setAboutNocShow] = useState(false)
  const [expandNocDetails, setExpandNocDetails] = useState(true)
  const [myAllotmentPath, setMyAllotmentPath] = useState("");
  const [emailEditDialog, setEmailEditDialog] = useState(false)
  const [showToasterMsg, setShowToasterMsg] = React.useState(false);
  const [toasterMsg, setToasterMsg] = useState({})
  const [emailValue, setEmailValue] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [countOtp, setCountOtp] = React.useState(90);
  const [disableEmailVerifyBtn, setDisableEmailVerifyBtn] = useState(true);
  const [isSendingVerificationOTP, setIsSendingVerificationOTP] = useState(false);
  const [verifyEmailAlert, setVerifyEmailAlert] = useState(false);
  const [verifyEmailDialogOpen, setVerifyEmailDialogOpen] = useState(false);

  const handleAlertClose = () => {
    setShowToasterMsg(false);
  };

  useEffect(() => {
    if (isSuccessBookingEndTime && bookingEndTime) {
      setBookingEndDate(moment(bookingEndTime.Applicant_Booking_Status[0].endTime).format("DD-MMM-YYYY"))
    }
  }, [isSuccessBookingEndTime])

  const { applicantData,
    isSuccessResApplicantGet,
    isFetchingApplicantGet,
    isErrorApplicantGet,
    errorMessageGet,
    isFetchingUpdateEmail,
    isSuccessUpdateEmail,
    isErrorUpdateEmail,
    errorMsgUpdateEmail,
    applicantUpdateEmail,
    isSuccessEmailVerificationOTP,
    isErrorVerifyEmailVerificationOTP,
    errorMsgVerifyEmailVerificationOTP,
    isSuccessVerifyEmailVerificationOTP,
    isFetchingVerifyEmailVerificationOTP,
  } = useSelector(applicantSelector);


  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach((item) => {
        if (item.StepId == "7") {
          item.Status == "completed"
            ? setIsPaymentDone(true)
            : setIsPaymentDone(false);
        }
      });
    }
  }, [isSuccessProgressResStepper]);

  useEffect(() => {
    if (activeStep == 11 || activeStep == 13) {
      setExpanded("panel1");
    }
    if (activeStep > 11 && activeStep != 13) {
      setExpanded("panel3");
    }
    if (activeStep < 13) {
      setExpandedC5("allotmentLetter");
    }
    if (activeStep == 13) {
      setExpandedC5("Installment");
    }
    if (activeStep == 14) {
      setExpandedC5("Agreement");
    }
  }, [activeStep]);

  // const steps = getStepsWithDetails();
  const steps = [
    {
      StepName: t("userjourney.stepper.stage1.ApplicantSignUp"),
      StepIcon: <ExitToAppIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: "KYC",
      StepIcon: <VerifiedUser style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage2.Personaldetails"),
      StepIcon: <AccountCircle style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage2.Addapplicant"),
      StepIcon: <GroupAdd style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage2.CategoryDetails"),
      StepIcon: <CategoryOutlinedIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage3.DocumentsUpload"),
      StepIcon: <DescriptionOutlinedIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage3.Applicationpayment"),
      StepIcon: <PaymentOutlined style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage3.DocumentVerification"),
      StepIcon: <CheckCircleOutlinedIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage4.DocumentVerification"),
      StepIcon: <Apartment style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage4.FlatPayment"),
      StepIcon: <AccountBalance style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage4.LOIGeneration"),
      StepIcon: <EmojiPeople style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("userjourney.stepper.stage5.AllotmentLetter"),
      StepIcon: <CheckCircleOutlinedIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    // {
    //   StepName: t("userjourney.stepper.stage5.NOC"),
    //   StepIcon: <CheckCircleOutlinedIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    // },
    {
      StepName: t("userjourney.stepper.stage5.EMIs"),
      StepIcon: <CheckCircleOutlinedIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    },
    {
      StepName: t("Agreement"),
      StepIcon: <CheckCircleOutlinedIcon style={{ color: "#219653", fontSize: 'xx-large' }} />
    }
    // "LOI Genration",
    // "10% Booking Amount",
    // "NOC/Allotment letter GEnration",
    // "EMI Progress",
  ];

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeC5 = (panel) => (event, newExpanded) => {
    setExpandedC5(newExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    allCategory.forEach((element) => {
      if (element.value == applicantData.RservationCatIds)
        setcategory(element.label);
    });
    if (applicantData?.EmailId != "" && applicantData?.EmailId !== null) {
      localStorage.setItem("ApplicantEmail", applicantData?.EmailId);
    }
  }, [applicantData, category, allCategory, t]);

  const goToNextStep = () => {
    if (redirect) {
      history.push(redirect);
    }
  };

  useEffect(() => {
    stepRefs.current = Array(steps.length)
      .fill()
      .map((_, i) => stepRefs.current[i] || createRef());
    setIsInitialized(true);
  }, [steps.length]);

  useEffect(() => {
    if (!isInitialized) return;

    const activeRef = stepRefs.current[activeStep - 1];
    if (activeRef && activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [activeStep, isInitialized]);

  useEffect(() => {
    let tempDocUploadedCount = 0;
    if (doclist) {
      doclist.forEach((doc) => {
        if (doc.IsUploaded) {
          tempDocUploadedCount++;
        }
      });
    }
    setUploadedDocsCount(tempDocUploadedCount);
  }, [doclist]);

  const downloadReceipt = () => {
    setPdfLoading(true);
    let fileUrl =
      ApiEndPoint +
      "/appointment/API/Appointment/appointmentPdf/" +
      localStorage.getItem("applicantId") +
      "?Lang=" +
      localStorage.getItem("i18nextLng");
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        setPdfLoading(false);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "AppointmentPass";
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 300);
      })
      .catch(function (error) {
        setPdfLoading(false);
      });
  };

  const getFlatTransactionDetailsPdf = () => {
    dispatch(getPreferencesList()).then(res => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/PDFDownloader/receipt/${applicantData.ApplicationDetails[0].TransactionDetails[0]?.TransactionReferenceNo}?Lang=${localStorage.getItem('i18nextLng')}&gateway=sbiepay`;
        fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }).then((response) => response.blob()).then((blob) => {
          setPdfLoading(false);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = applicantData.ApplicationDetails[0].TransactionDetails[0]?.TransactionReferenceNo + '-Transaction';
          document.body.append(link);
          link.click();
          link.remove();
          // in case the Blob uses a lot of memory
          setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(function (error) {
          setPdfLoading(false);
          alert("Transaction not found");
        });
      }

    });
  };

  const getTransactionDetailsPdf = () => {
    dispatch(getPreferencesList()).then((res) => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/ApplicationTransaction/applicationTransactionPaymentReceiptPdf/${localStorage.getItem("applicantId")}?Lang=${localStorage.getItem("i18nextLng")}`;
        fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            setPdfLoading(false);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Application Fee" + "receipt";
            document.body.append(link);
            link.click();
            link.remove();
            // in case the Blob uses a lot of memory
            setTimeout(() => URL.revokeObjectURL(link.href), 300);
          })
          .catch(function (error) {
            setPdfLoading(false);
            alert("Transaction not found");
          });
      }
    });
  };

  const downloadPdf = () => {
    setPdfLoading(true);
    let fileUrl = ApiEndPointPdf +
      localStorage.getItem("applicantId") +
      "?Lang=" +
      localStorage.getItem("i18nextLng") + "&isApplicationOverview=2&fcfs=1"
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

  const downloadFile = (url, filename = '') => {
    var applicant_id = localStorage.getItem('applicantId');
    filename = "LOI_Letter_" + applicant_id + ".pdf";
    const ajax_url = ApiEndPoint + "/PostLottery/fetchATPdf";
    if (filename.length === 0) filename = url.split('/').pop();
    const req = new XMLHttpRequest();
    req.open('POST', ajax_url, true);
    req.responseType = 'blob';
    req.onload = function () {
      const blob = new Blob([req.response], {
        type: 'application/pdf',
      });

      const isIE = false || !!document.documentMode;
      if (isIE) {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const windowUrl = window.URL || window.webkitURL;
        const href = windowUrl.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('download', filename);
        a.setAttribute('href', href);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("url=" + url);
  };

  useEffect(() => {
    var applicant_id = localStorage.getItem('applicantId');
    axios
      .post(
        ApiEndPoint + `/PostLottery/getIsLoiGenerated`, {
        applicant_id,
        lang: localStorage.getItem("i18nextLng"),
      }
      )
      .then((res) => {
        var data = res?.data;
        if (data) {
          var letter_path = data?.data?.letter_path;
          if (letter_path != '') {
            setMyAllotmentPath(letter_path);
          }
        }
      });
  }, []);

  const validationSchema = yup.object().shape({
    emailId: yup
      .string()
      .email(t("userjourney.emailUpdate.emailErrors.limitation"))
      .required(
        t(
          "userjourney.emailUpdate.emailErrors.required"
        )
      ),
    emailIdConfirm: yup
      .string()
      .oneOf([yup.ref('emailId'), null], 'Email Address must match')
      .email(t("userjourney.emailUpdate.emailErrors.limitation"))
      .required(t(
        "userjourney.emailUpdate.emailErrors.required"
      )),
  });

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val)
      ? "0"
      : amount_val.toString().split(".")[0].length > 3
        ? amount_val
          .toString()
          .substring(0, amount_val.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        amount_val
          .toString()
          .substring(amount_val.toString().split(".")[0].length - 3)
        : amount_val.toString();
  };
  const initialValues = {
    emailId: "",
    emailIdConfirm: "",
    emailIdVerify: "",
  };
  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log(values);
    //return false;
    if (values.emailIdVerify === "") {
      setVerifyEmailAlert(true);
      return false;
    }
    const requestData = {
      EmailId: values.emailId,
    };
    dispatch(editApplicantEmail(requestData));
  };

  useEffect(() => {
    if (isSuccessUpdateEmail) {
      setEmailEditDialog(false)
      setToasterMsg({ msg: t("Email Updated Successfully"), severity: "success" })
      setShowToasterMsg(true)
      dispatch(clearUpdateEmailState())
      dispatch(getApplicant())
    }
  }, [isSuccessUpdateEmail])

  const urlReplace = (url) => {
    return url.replace("10.200.0.21", "restlotterydev.cidcohomes.com")
  };

  const timeValidText = () => {
    const lang = localStorage.getItem("i18nextLng");
    if (lang == "en") {
      return (
        <>
          ({t('userjourney.timeValidTxt1')} {bookingEndDate}, {t('userjourney.timeValidTxt2')})
        </>
      );
    }
    if (lang == "hi") {
      return (
        <>
          ({bookingEndDate} {t('userjourney.timeValidTxt1')} {t('userjourney.timeValidTxt2')})
        </>
      );
    }

    if (lang == "mr") {
      return (
        <>
          ({bookingEndDate} {t('userjourney.timeValidTxt1')} {t('userjourney.timeValidTxt2')})
        </>
      );
    }
  };

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
      error = t("personalDetailsForm.formControl.otpReqText", { ns: 'PersonalDetailsPageTrans' });
    } else if (!/^[0-9]{4}$/i.test(value)) {
      error = t("personalDetailsForm.formControl.otpReqText", { ns: 'PersonalDetailsPageTrans' });
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
        if (formikRef.current) {
          formikRef.current.values.emailIdVerify = "";
        }
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
    // if(formikRef.current) {
    //   formikRef.current.values.emailId = emailValue+"";
    //   formikRef.current.values.emailIdConfirm = emailValue+"";
    //   console.log("-Email-",formikRef.current.values.emailId);
    // }
  }, [emailValue]);

  const copyValueToConfirm = (e) => {
    console.log(formikRef.current.values);
    setEmailValue(e.target.value);
    //formikRef.current.values.emailId = e.target.value;
    //formikRef.current.values.emailIdConfirm = e.target.value;
    formikRef.current.setFieldValue(
      "emailId",
      e.target.value
    );
    formikRef.current.setFieldValue(
      "emailIdConfirm",
      e.target.value
    );
  }

  const verifyEmailFunc = () => {
    setIsSendingVerificationOTP(true);
    var email_id = (emailValue != "") ? emailValue : formikRef.current.values.emailId;
    if (window.downloadTimer != undefined && window.downloadTimer != 'undefined') {
      window.clearInterval(window.downloadTimer);
    }
    setCountOtp(0);
    const requestData = {
      EmailId: email_id,
      ApplicantId: localStorage.getItem("applicantId"),
    };
    dispatch(sendEmailVerificationOTP(requestData));
    setResenOtpText(false);
  }

  const resendOtp = () => {
    if (window.downloadTimer != undefined && window.downloadTimer != 'undefined') {
      window.clearInterval(window.downloadTimer);
    }
    const requestData = {
      EmailId: (emailValue != "") ? emailValue : formikRef.current.values.emailId,
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
    if (isSuccessVerifyEmailVerificationOTP) {
      //dispatch(clearVerifyEmailVerificationOTPState());
      setVerifyEmailDialogOpen(false);
      formikRef.current.values.emailId = emailValue;
      formikRef.current.values.emailIdVerify = 1;
      setIsEmailVerified(true);
      setDisableEmailVerifyBtn(true);
      setVerifyEmailAlert(false);
      localStorage.setItem("ApplicantEmail", formikRef.current.values.emailId);
    }
  }, [isSuccessVerifyEmailVerificationOTP]);

  return (
    <>
      {pdfLoading && <Loading isOpen={pdfLoading} />}
      <Snackbar open={showToasterMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={toasterMsg.severity} sx={{ width: '100%' }}>
          {toasterMsg.msg}
        </Alert>
      </Snackbar>
      <CardContent className={classes.CardContent}>
        <Grid container xs={16}>
          <ul className={classes.upperStepperCount}>
            {/* {steps.map((step, index) => {
                        return <Grid item xs={1} className={`${classes.UpperStepCon} ${activeStep == index + 1 ? "current" : ""} ${activeStep > index + 1 ? "complete" : ""}`}>
                            <span className={`${classes.stepNoDiv} ${activeStep == index + 1 ? "current" : ""} ${activeStep > index + 1 ? "complete" : ""}`}>{index + 1}</span>
                           
                        </Grid>
                    })} */}
            <Grid
              xs={4}
              className={`${classes.UpperStepCon} ${activeStep > 0 && activeStep < 3 ? "current" : ""
                }`}
              style={{
                border:
                  activeStep > 0 ? "2px solid rgba(208, 234, 189, 1)" : "",
                borderBottom: 0,
              }}
            >
              <span
                className={`${classes.stepNoDiv} ${activeStep > 0 && activeStep < 3 ? "current" : ""
                  }`}
                style={{
                  background: activeStep > 0 ? "rgba(208, 234, 189, 1)" : "",
                  borderBottom: 0,
                }}
              >
                1
              </span>
              {activeStep > 2 && (
                <StepCompletedTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              {activeStep > 0 && activeStep < 3 && (
                <StepInProgressTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              <Typography variant="p1">{t("userjourney.ApplicantSignup.title")}</Typography>
            </Grid>
            <Grid
              xs={4}
              className={`${classes.UpperStepCon} ${activeStep > 2 && activeStep < 6 ? "current" : ""
                }`}
              style={{
                border: activeStep > 2 ? "2px solid #BDEAE2" : "",
                borderBottom: 0,
              }}
            >
              <span
                className={`${classes.stepNoDiv} ${activeStep > 2 && activeStep < 6 ? "current" : ""
                  }`}
                style={{ background: activeStep > 2 ? "#BDEAE2" : "" }}
              >
                2
              </span>
              {activeStep > 5 && (
                <StepCompletedTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              {activeStep > 2 && activeStep < 6 && (
                <StepInProgressTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              <Typography variant="p1">{t("userjourney.ApplicantDetails.title")}</Typography>
            </Grid>
            <Grid
              xs={4}
              className={`${classes.UpperStepCon} ${activeStep > 5 && activeStep < 9 ? "current" : ""
                }`}
              style={{
                border: activeStep > 5 ? "2px solid #bebce6" : "",
                borderBottom: 0,
              }}
            >
              <span
                className={`${classes.stepNoDiv} ${activeStep > 5 && activeStep < 9 ? "current" : ""
                  }`}
                style={{ background: activeStep > 5 ? "#bebce6" : "" }}
              >
                3
              </span>
              {activeStep > 8 && (
                <StepCompletedTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              {activeStep > 5 && activeStep < 9 && (
                <StepInProgressTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              <Typography variant="p1">{t("userjourney.DocumentVerification.title")}</Typography>
            </Grid>
            <Grid
              xs={4}
              className={`${classes.UpperStepCon} ${activeStep > 8 && activeStep < 12 ? "current" : ""
                }`}
              style={{
                border: activeStep > 8 ? "2px solid #F8CBCB" : "",
                borderBottom: 0,
              }}
            >
              <span
                className={`${classes.stepNoDiv} ${activeStep > 8 && activeStep < 12 ? "current" : ""
                  }`}
                style={{ background: activeStep > 8 ? "#F8CBCB" : "" }}
              >
                4
              </span>
              {activeStep > 11 && (
                <StepCompletedTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              {activeStep > 8 && activeStep < 12 && (
                <StepInProgressTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              <Typography variant="p1">{t("userjourney.FlatBooking.title")}</Typography>
            </Grid>
            <Grid
              xs={4}
              className={`${classes.UpperStepCon} ${activeStep > 11 && activeStep < 15 ? "current" : ""
                }`}
              style={{
                border: activeStep > 11 ? "2px solid #B2C3F0" : "",
                borderBottom: 0,
              }}
            >
              <span
                className={`${classes.stepNoDiv} ${activeStep > 11 && activeStep < 15 ? "current" : ""
                  }`}
                style={{ background: activeStep > 11 ? "#B2C3F0" : "" }}
              >
                5
              </span>
              {activeStep > 14 && (
                <StepCompletedTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              {activeStep > 11 && activeStep < 15 && (
                <StepInProgressTag
                  style={{ fontSize: "5.5rem" }}
                  className={classes.StepTag}
                />
              )}
              <Typography variant="p1">{t("userjourney.AllotmentLetter.tittle")}</Typography>
            </Grid>
          </ul>

          <Grid item xs={12}>
            <ul className={classes.stepper}>
              {steps.map((step, index) => {
                return index == 1 ? (
                  <>
                    <li
                      ref={stepRefs.current[index]}
                      key={index}
                      className={`${classes.stepItem} ${activeStep == index + 1 ? "current" : ""} ${activeStep == index + 1 ? classes.arrowBg : ""}  ${activeStep > index + 1 ? "complete" : ""}`}
                      onClick={(e) => {
                        if (
                          activeStep == index + 1 &&
                          activeStep != 8 &&
                          activeStep != 12
                        ) {
                          goToNextStep();
                        }
                      }}
                      style={{
                        cursor:
                          activeStep == index + 1 &&
                            activeStep != 8 &&
                            activeStep != 12
                            ? "pointer"
                            : "",
                      }}
                    >
                      <span style={{ fontSize: "10px" }}> {t("userjourney.stepper.stage1.AadhaarCard")}</span>
                    </li>
                    <li
                      ref={stepRefs.current[index]}
                      key={index}
                      className={`${classes.stepItem} ${activeStep == index + 1 ? "current" : ""
                        } ${activeStep > index + 1 ? "complete" : ""}`}
                      onClick={(e) => {
                        if (
                          activeStep == index + 1 &&
                          activeStep != 8 &&
                          activeStep != 12
                        ) {
                          goToNextStep();
                        }
                      }}
                      style={{
                        cursor:
                          activeStep == index + 1 &&
                            activeStep != 8 &&
                            activeStep != 12
                            ? "pointer"
                            : "",
                      }}
                    >
                      <span style={{ fontSize: "10px" }}>{t("userjourney.stepper.stage1.PanCard")}</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      ref={stepRefs.current[index]}
                      key={index}
                      className={`${classes.stepItem} ${activeStep == index + 1 ? "current" : ""
                        } ${activeStep > index + 1 ? "complete" : ""}`}
                      onClick={(e) => {
                        if (
                          activeStep == index + 1 &&
                          activeStep != 8 &&
                          activeStep != 12
                        ) {
                          goToNextStep();
                        }
                      }}
                      style={{
                        cursor:
                          activeStep == index + 1 &&
                            activeStep != 8 &&
                            activeStep != 12
                            ? "pointer"
                            : "",
                      }}
                    >
                      <span style={{ fontSize: "10px" }}> {step.StepName}</span>
                    </li>
                  </>
                );
              })}
            </ul>
          </Grid>
          <ul className={classes.lowerStepperContainer}>
            {/* {steps.map((step, index) => {
                        return <Grid container xs={1} className={`${classes.lowerStepCon} ${activeStep == index + 1 ? "current" : ""} ${activeStep > index + 1 ? "complete" : ""}`}>
                            {index == 0 &&
                                <Container className={classes.container}>
                                    <Box className={classes.dialogHeader}>
                                        <ExitToAppIcon color="primary" />
                                        <Typography style={{ marginLeft: "5px", }} variant="p1">
                                            User SignUp
                                        </Typography>
                                    </Box>
                                    <Grid container className={classes.dialogGrid}>
                                        <Box className={classes.dialogContent}>
                                            <Typography style={{ color: "#65707D", fontSize: "0.8rem" }} gutterBottom>
                                                Account Created
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontWeight: "700",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    fontSize: "0.8rem"
                                                }}
                                            >
                                                <VerifiedSuccessIcon />
                                                {applicantData?.CreatedAt}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Container>}
                            <Grid container className={classes.viewBtn} style={{ visibility: (index + 1 < activeStep || ((activeStep == 8 || activeStep == 12) && activeStep > index)) ? "visible" : "hidden" }} >
                                <Button onClick={(e) => {
                                    if (activeStep > index + 1 || ((activeStep == 8 || activeStep == 12) && activeStep > index)) {
                                        handleClickPopover(e);
                                        setDialogStep(index + 1);
                                    }
                                }} endIcon={<ExpandMoreIcon />} size='small'>
                                    View Detail
                                </Button>
                            </Grid>
                        </Grid>
                    })} */}
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
              className={`${classes.lowerStepCon}  ${activeStep > 0 && activeStep < 3 ? "current" : ""
                }`}
              spacing={0}
              style={{
                border:
                  activeStep > 0 ? "2px solid rgba(208, 234, 189, 1)" : "",
                borderTop: 0,
              }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                direction="column"
                className={classes.detailBox}
              >
                <Grid item>
                  <span style={{ fontSize: "12px", width: "50%" }}>
                    {t("userjourney.ApplicantSignup.ApplicantID")} {": "}
                    <span style={{ fontWeight: "700" }}>
                      {applicantData.ApplicantId}
                    </span>
                  </span>
                </Grid>
                {applicantData.ApplicationNo && <Grid item>
                  <span style={{ fontSize: "12px", width: "50%" }}>
                    {t("userjourney.ApplNoLbl")}: {" "}
                    <span style={{ fontWeight: "700" }}>
                      {applicantData.ApplicationNo}
                    </span>
                  </span>
                </Grid>}
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.detailBox}
              >
                <Box className={classes.dialogContent}>
                  <Grid style={{ width: "50%" }}>
                    <Typography
                      style={{ color: "#65707D", fontSize: "12px" }}
                      gutterBottom
                    >
                      {t("userjourney.ApplicantSignup.CreatedOn")}
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "11px",
                      }}
                    >
                      {moment(applicantData?.CreatedAt).format('DD-MM-YYYY hh:mm A')}
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.detailBox}
              >
                <Box className={classes.dialogContent}>
                  <Grid style={{ width: "50%" }}>
                    <Typography
                      style={{ color: "#65707D", fontSize: "12px" }}
                      gutterBottom
                    >
                      {t("userjourney.ApplicantSignup.AadhaarLabel")}
                    </Typography>
                    <Typography
                      gutterBottom
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      {applicantData.IsAadharVerified
                        ? (
                          "X".repeat(8) +
                          applicantData.AadharNo.toString().slice(8)
                        ).replace(/(.{4})/g, "$1 ")
                        : "--"}
                    </Typography>
                  </Grid>
                  <Grid>
                    {applicantData.IsAadharVerified ? (
                      <CardMedia
                        component="img"
                        height="40"
                        image={aadhaarVeriedimg}
                        alt="Aadhaar Verified"
                        aadhaarVeriedimg
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Box>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.detailBox}
              >
                <Box className={classes.dialogContent}>
                  <Grid style={{ width: "50%" }}>
                    <Typography
                      style={{ color: "#65707D", fontSize: "12px" }}
                      gutterBottom
                    >
                      {t("userjourney.ApplicantSignup.PANLabel")}
                    </Typography>
                    <Typography
                      gutterBottom
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      {applicantData.isPanVerified
                        ? "X".repeat(6) +
                        applicantData.PANNo.toString().slice(6)
                        : "--"}
                    </Typography>
                  </Grid>
                  <Grid>
                    {applicantData.isPanVerified ? (
                      <CardMedia
                        component="img"
                        height="40"
                        image={panVeriedimg}
                        alt="PAN Verified"

                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Box>
              </Grid>

              {/* <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              xs={2}
            >
              <Grid item>1</Grid>
              <Grid item>2</Grid>
            </Grid> */}
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              className={`${classes.lowerStepCon}  ${activeStep > 2 && activeStep < 6 ? "current" : ""
                }`}
              spacing={0}
              style={{
                border: activeStep > 2 ? "2px solid #BDEAE2" : "",
                borderTop: 0,
                gap: "3.3%"
              }}
            >
              <Box
                container
                alignItems="center"
                style={{ display: "flex", gap: "10px", marginTop: 9 }}
                className={classes.detailBox}
              >
                <Avatar src={applicantData.ImagePath} />
                <Grid>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#65707D",
                    }}
                  >
                    {t("userjourney.ApplicantDetails.FirstName")}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {applicantData.FirstName}
                  </Typography>
                </Grid>
              </Box>
              <Box
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.detailBox}
              >
                <Grid container alignItems="center" justifyContent="space-between">
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#65707D",
                    }}
                  >
                    {t("userjourney.ApplicantDetails.ContactDetails")}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    size="small"
                    style={{ fontSize: "10px", minWidth: 0 }}
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      setEmailEditDialog(true);
                    }}
                  >
                    {t("userjourney.edit")}
                  </Button>
                </Grid>
                <Typography
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  <Grid container alignItems="center"><PhoneIcon color="primary" style={{ fontSize: "1rem" }} /><Grid style={{ marginLeft: 5 }}>+91{" "}{applicantData.MobileNo}</Grid></Grid>
                </Typography>
                <Typography
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  {applicantData.EmailId && <Grid container alignItems="center"><EmailOutlined color="primary" style={{ fontSize: "1rem" }} /><Grid style={{ marginLeft: 5 }}>{applicantData.EmailId}</Grid></Grid>}
                </Typography>
              </Box>
              {/* <Box container
              justifyContent="space-between"
              alignItems="center" className={classes.detailBox}>
              <Typography style={{ fontSize: "10px", color: "#65707D" }}>Email Id</Typography>
              <Typography style={{ fontSize: "12px", fontWeight: "700", padding: "7px 0" }}>{applicantData.EmailId}</Typography>
            </Box> */}
              {activeStep > 5 && <Box
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.detailBox}
              >
                <Grid container alignItems="center" justifyContent="space-between">
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#65707D",
                      marginTop: "4px",
                    }}
                  >
                    {t("userjourney.ApplicantDetails.CategoryLabel")}
                  </Typography>
                  {!isPaymentDone &&
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      style={{ fontSize: "10px", minWidth: 0 }}
                      startIcon={<EditIcon />}
                      onClick={(e) => {
                        history.push("/income-details");
                      }}
                    >
                      {t("userjourney.edit")}
                    </Button>}
                </Grid>
                <Typography
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  {applicantData.RservationCatIds ? category : "--"}
                </Typography>
                <Typography style={{
                  fontSize: "11px",
                  fontWeight: "500",
                }}>
                  {applicantData.is_pmy == 0 ? t("userjourney.ApplicantDetails.pmayLablel") : t("userjourney.ApplicantDetails.nonPmayLabel")}
                </Typography>
              </Box>}
              {activeStep > 4 && <Box
                justifyContent='space-between'
                alignItems="center"
                className={classes.detailBox}
                style={{ display: "flex", gap: "10px" }}
              >
                {applicantData.CoApplicantDetails.length > 0 ?
                  <>
                    <Grid container style={{ gap: "10px" }}>
                      <Avatar src={applicantData.CoApplicantDetails[0]?.ImagePath} />
                      <Grid>
                        <Grid container>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#65707D",
                              marginRight: 5
                            }}
                          >
                            {t("userjourney.ApplicantDetails.CoApplicant")}
                          </Typography>
                          <CustomTooltip
                            arrow
                            enterTouchDelay={0}
                            placement="top"
                            title={
                              <Grid container className={classes.dialogGrid}>
                                <Box >
                                  <Typography style={{ color: "#65707D", fontSize: "12px" }} gutterBottom>
                                    {t("userjourney.ApplicantSignup.AadhaarLabel")}
                                  </Typography>
                                  <Typography gutterBottom style={{ fontWeight: "700", fontSize: "12px" }}>
                                    {applicantData.CoApplicantDetails[0]?.AadharNo
                                      ? (
                                        "X".repeat(8) +
                                        applicantData.CoApplicantDetails[0]?.AadharNo.toString().slice(8)
                                      ).replace(/(.{4})/g, "$1 ")
                                      : "--"}
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "#219653",
                                      fontSize: "11px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <VerifiedSuccessIcon style={{ fontSize: "1rem" }} />
                                    {t("userjourney.ApplicantSignup.AaadharVerified")}
                                  </Typography>
                                </Box>
                                <Box >
                                  <Typography style={{ color: "#65707D", fontSize: "12px" }} gutterBottom>
                                    {t("userjourney.ApplicantSignup.PANLabel")}
                                  </Typography>
                                  <Typography gutterBottom style={{ fontWeight: "700", fontSize: "12px" }}>
                                    {applicantData.CoApplicantDetails[0]?.PANNo
                                      ? "X".repeat(6) + applicantData.CoApplicantDetails[0]?.PANNo.toString().slice(6)
                                      : "--"}
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "#219653",
                                      fontSize: "11px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <VerifiedSuccessIcon style={{ fontSize: "1rem" }} /> Pan Verified
                                  </Typography>
                                </Box>
                              </Grid>
                            }
                            style={{
                              display: "inline-block",
                              paddingLeft: "12px",
                              lineHeight: "10px",
                            }}>
                            <Typography style={{ fontWeight: 600, fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                              <InfoOutlined color="primary" style={{ fontSize: "1.2rem" }} />
                            </Typography>
                          </CustomTooltip>
                        </Grid>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                          }}
                        >
                          {applicantData.CoApplicantDetails[0]?.FirstName}
                        </Typography>
                      </Grid>
                    </Grid>
                    {!isPaymentDone && <Grid container direction="column" alignItems="center" xs={3}>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        style={{ fontSize: "10px", minWidth: 0 }}
                        startIcon={<EditIcon />}
                        onClick={(e) => {
                          history.push("/add-co-applicant");
                        }}
                      >
                        {t("userjourney.edit")}
                      </Button>
                    </Grid>}
                  </>
                  : <Grid container alignItems="center" justifyContent="space-between">
                    <Grid>
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "#65707D",
                        }}
                      >
                        {t("userjourney.ApplicantDetails.CoApplicant")}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        {t("userjourney.NotOpted")}
                      </Typography>
                    </Grid>
                    {!isPaymentDone && <Grid>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        style={{ fontSize: "10px", minWidth: 0 }}
                        startIcon={<EditIcon />}
                        onClick={(e) => {
                          history.push("/add-co-applicant");
                        }}
                      >
                        {t("userjourney.edit")}
                      </Button>
                    </Grid>}
                  </Grid>}
              </Box>}
            </Grid>
            <Grid
              xs={4}
              className={`${classes.lowerStepCon}  ${activeStep > 5 && activeStep < 9 ? "current" : ""
                }`}
              style={{
                border: activeStep > 5 ? "2px solid #bebce6" : "",
                borderTop: 0,
                overflowY: "auto"
              }}
              direction="column"
            >
              {activeStep <= 7 && activeStep > 5 && (
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.DocumentBox}
                >
                  <Box className={classes.dialogHeader}>
                    <DescriptionOutlinedIcon
                      color="primary"
                      style={{ fontSize: "1rem" }}
                    />
                    <Typography style={{ marginLeft: "5px" }} variant="p1">
                      <Box className={classes.verifiedBox}>
                        <span style={{ fontSize: "12px", fontWeight: "600" }}>
                          {UploadedDocsCount}/{doclist.length}{" "}{t("userjourney.DocumentVerification.docUploadTxt")}
                        </span>
                      </Box>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ fontSize: "10px" }}
                      startIcon={UploadedDocsCount == doclist.length ? <EditIcon /> : ""}
                      onClick={(e) => {
                        history.push("/upload-documents");
                      }}
                    >
                      {UploadedDocsCount == doclist.length ? t("userjourney.DocumentVerification.EditTxt") : t("userjourney.DocumentVerification.UploadTxt")}
                    </Button>
                  </Box>
                  <Box className={classes.dialogContent}>
                    <ol
                      style={{
                        width: "100%",
                        fontSize: "12px",
                        padding: "5px 5px 5px 20px",
                        background: "#F6F6F6",
                        borderRadius: "7px",
                        fontWeight: "500",
                      }}
                    >
                      {doclist?.map((doc, index) => {
                        if (doc.IsUploaded == 1) {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <li key={index}>{doc.DocumentName}</li>
                                <CheckCircleIcon
                                  color="primary"
                                  style={{ fontSize: "1rem" }}
                                />
                              </div>
                              {index != doclist.length - 1 && (
                                <Divider style={{ margin: "5px" }} light />
                              )}
                            </>
                          );
                        }
                        if (doc.IsUploaded == 0) {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                {" "}
                                <li key={index}>{doc.DocumentName}</li>
                                <ErrorOutline
                                  color="disabled"
                                  style={{ fontSize: "1rem" }}
                                />
                              </div>
                              {index != doclist.length - 1 && (
                                <Divider style={{ margin: "5px" }} light />
                              )}
                            </>
                          );
                        }
                      })}
                    </ol>
                  </Box>
                </Grid>
              )}
              {activeStep > 7 && (
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.DocumentBox}
                >
                  {(superActiveStep > 8 && skipDocs.length != 0) &&
                    <Box className={classes.dialogHeader} style={{ borderRadius: 8, background: 'rgb(255, 244, 229)' }}>
                      <Typography style={{ marginLeft: "5px" }} variant="p1" s>
                        <span style={{ fontSize: "11px", fontWeight: "600" }}>
                          Please Upload The Skiped Documents Listed Below Before Allotment Letter</span>
                        <Grid container justifyContent="space-between">
                          <ul style={{ paddingLeft: 13 }}>
                            {skipDocs.map((skipDoc, index) => (
                              <li key={index}>{skipDoc?.DocumentName}</li>
                            ))}
                          </ul>
                          <Button size="small" variant="outlined" color="secondary" style={{ minWidth: 0 }} onClick={() => history.push('/upload-documents')}>Upload</Button>
                        </Grid>
                      </Typography>
                    </Box>}
                  <Box className={classes.dialogHeader}>
                    {/* <CheckCircleOutlinedIcon
                  color="primary"
                  style={{ fontSize: "1rem" }}
                /> */}
                    <Typography style={{ marginLeft: "5px" }} variant="p1">
                      <Box className={classes.verifiedBox} style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontWeight: "600" }}>
                          {totalVerifiedDocsCount}/{totalDocsCount} {t("userjourney.DocumentVerification.title")} (MAHA-IT API)
                        </span>
                        <VerifiedSuccessIcon style={{ fontSize: "1rem", marginLeft: 2 }} />
                      </Box>
                    </Typography>
                    {rejectedDocsCount > 0 && (
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<EditIcon />}
                        className={classes.reUploadBtn}
                        style={{ fontSize: "10px" }}
                        onClick={(e) => {
                          history.push("/upload-documents");
                        }}
                      >
                        {t("userjourney.ReUpload")}
                      </Button>
                    )}
                  </Box>
                  <Box className={classes.dialogContent}>
                    <ol
                      style={{
                        width: "100%",
                        fontSize: "12px",
                        padding: "5px 5px 5px 20px",
                        background: "#F6F6F6",
                        borderRadius: "7px",
                        fontWeight: "500",
                      }}
                    >
                      {preVerifyDocList?.map((doc, index) => {
                        if (doc.hmoVerifiedFlag == 1) {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <li key={index}>{doc.DocumentName}</li>
                                <VerifiedSuccessIcon
                                  style={{ fontSize: "1rem" }}
                                />
                              </div>
                              {index != preVerifyDocList.length - 1 && (
                                <Divider style={{ margin: "5px" }} light />
                              )}
                            </>
                          );
                        } else if (doc.hmoVerifiedFlag == 2 && doc.isResubmitted == 0) {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <li key={index}>{doc.DocumentName}</li>
                                <RejectedDocIcon style={{ fontSize: "1rem" }} />
                              </div>
                              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "red" }}>
                                <ErrorTooltip title={doc.hmoVerifiedReason} arrow placement="bottom-start">
                                  <span style={{ fontWeight: "700" }}>
                                    {t("userjourney.DocumentVerification.reason")} {doc.hmoVerifiedReason}
                                  </span>
                                </ErrorTooltip>
                              </div>
                              {index != preVerifyDocList.length - 1 && (
                                <Divider style={{ margin: "5px" }} light />
                              )}
                            </>
                          );
                        } else if (doc.hmoVerifiedFlag == 2 && doc.isResubmitted == 1) {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <li key={index}>{doc.DocumentName}</li>
                                <UpdateIcon style={{ fontSize: "1.1rem" }} color='primary' />
                              </div>
                              <span style={{ fontWeight: "700", color: '#04ac6e' }}>
                                {t("userjourney.DocumentVerification.reuploadedTxt")}
                              </span>
                              {index != preVerifyDocList.length - 1 && (
                                <Divider style={{ margin: "5px" }} light />
                              )}
                            </>
                          );
                        } else {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <li key={index}>{doc.DocumentName}</li>
                                <PendingDocIcon style={{ fontSize: "1rem" }} />
                              </div>
                              {index != preVerifyDocList.length - 1 && (
                                <Divider style={{ margin: "5px" }} light />
                              )}
                            </>
                          );
                        }
                      })}
                    </ol>
                  </Box>
                </Grid>
              )}
              {activeStep > 7 && (
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.DocumentBox}
                  direction="column"
                  style={{ marginTop: "5px" }}
                >
                  <Grid container alignItems="center" style={{ gap: 30, marginTop: 5 }}>
                    <Typography style={{ fontSize: "12px", color: "#65707D", padding: "3px", fontWeight: "700" }}>
                      {t("userjourney.DocumentVerification.ApplicationFee")}
                    </Typography>
                    <Chip
                      label={t("userjourney.ReceivedLabel")}
                      size="small"
                      style={{
                        color: "#6e6e6e",
                        fontWeight: 700,
                        fontSize: "10px",
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid container alignItems="center" style={{ gap: 75, marginLeft: "7px" }}>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      ₹ {numberWithCommas(applicantData.twoThousandPaymentDetails[0]?.Amount)}
                    </Typography>
                    <Button
                      size="small"
                      style={{ fontSize: "10px" }}
                      onClick={() => getTransactionDetailsPdf()}
                    >
                      {t("userjourney.DocumentVerification.DownloadReceipt")}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid
              xs={4}
              className={`${classes.lowerStepCon}  ${activeStep > 8 && activeStep < 12 ? "current" : ""
                }`}
              style={{
                border: activeStep > 8 ? "2px solid #F8CBCB" : "",
                borderTop: 0,
                overflowY: "auto",
                overflowX: "hidden"
              }}
              direction="column"
            >
              {superActiveStep == 9 &&
                <Box
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.detailBox}
                  style={{ borderRadius: 5, padding: 5 }}
                >
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#65707D",
                    }}
                  >
                    {t('dashboard.docVerifiedCompleteTxt')}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {t('dashboard.contiToBookFlatTxt')}
                  </Typography>
                  {/* <Grid container justifyContent="center" style={{ padding: "5px" }}>
                 <Button
                   size="small"
                   variant="contained"
                   color="primary"
                   style={{ fontSize: "11px", padding: "5px" }}
                   onClick={() => history.push('/select-projects')}
                 >
                   Book Your Flat
                 </Button>
               </Grid> */}
                </Box>}
              {activeStep == 10 && <Grid container
                justifyContent="space-between"
                alignItems="center"
                className={classes.DocumentBox}>
                <Grid xs={12} style={{ padiing: 5, marginBottom: 5 }}>

                  <span className={classes.dataValue} style={{ fontSize: "14px", color: "black" }}>
                    {t("userjourney.FlatBooking.selectedFlatLabel")}
                  </span>


                </Grid>

                <Grid container direction="column" alignItems="center" style={{ background: "rgb(246, 246, 246)", borderRadius: "10px" }}>
                  <Grid container>
                    <Grid item xs={12} style={{ padding: 4 }}>
                      <span className={classes.dataValue} style={{ fontSize: "0.8rem" }}>
                        {applicantData.Applicant_Booking_Status
                          ? applicantData.Applicant_Booking_Status[0]
                            ?.ProjectName
                          : "--"}
                      </span>
                    </Grid>
                    <Grid item xs={7}>
                      <>
                        <Grid container alignItems="center">
                          <Grid className={classes.dataValueViewBox}>
                            <Typography className={classes.dataTitle} style={{ padding: 5 }}>
                              {t("userjourney.FlatBooking.UnitNoLabel")}:{" "}
                              <span className={classes.dataValue}>
                                {applicantData.Applicant_Booking_Status
                                  ? applicantData
                                    .Applicant_Booking_Status[0]?.FlatNo
                                  : "--"}
                              </span>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                          <Box className={classes.dataValueViewBox}>
                            <Typography className={classes.dataTitle} style={{ padding: 5 }}>
                              {t("userjourney.FlatBooking.RERAArea")}:{" "}
                              <span className={classes.dataValue}>
                                {
                                  applicantData.Applicant_Booking_Status
                                    ? applicantData
                                      .Applicant_Booking_Status[0]
                                      ?.CarpetArea
                                    : "--"
                                }{" "}
                                {t("userjourney.FlatBooking.SQFT")}
                              </span>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid container alignItems="center">
                          <Box className={classes.dataValueViewBox}>
                            <Typography className={classes.dataTitle} style={{ padding: 5 }}>
                              {t("userjourney.FlatBooking.FloorNo")}:{" "}
                              <span className={classes.dataValue}>
                                {applicantData.Applicant_Booking_Status
                                  ? applicantData
                                    .Applicant_Booking_Status[0]?.FloorNo
                                  : "--"}
                              </span>
                            </Typography>
                          </Box>
                        </Grid>
                      </>
                    </Grid>
                    <Grid item xs={5}>
                      <>
                        <Grid container alignItems="center">
                          <Box className={classes.dataValueViewBox}>
                            <Typography className={classes.dataTitle} style={{ padding: 5 }}>
                              {t("userjourney.FlatBooking.unitTypeLabel")}:{" "}
                              <span className={classes.dataValue}>
                                {applicantData.Applicant_Booking_Status
                                  ? applicantData
                                    .Applicant_Booking_Status[0]
                                    ?.flat_type
                                  : "--"}
                              </span>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid container alignItems="center">
                          <Box className={classes.dataValueViewBox}>
                            <Typography className={classes.dataTitle} style={{ padding: 5 }}>
                              {t("userjourney.FlatBooking.unitPriceLabel")}:{" "}
                              <span className={classes.dataValue}>
                                ₹{" "}
                                {/* {numberWithCommas(
                                  applicantData.Applicant_Booking_Status
                                    ? applicantData
                                      .Applicant_Booking_Status[0]?.Cost
                                    : "--"
                                )} */}
                                xxxx
                              </span>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid container alignItems="center">
                          <Box className={classes.dataValueViewBox}>
                            <Typography className={classes.dataTitle} style={{ padding: 5 }}>
                              {t("userjourney.FlatBooking.Tower")}:{" "}
                              <span className={classes.dataValue}>
                                {applicantData.Applicant_Booking_Status
                                  ? applicantData
                                    .Applicant_Booking_Status[0]?.Wing
                                  : "--"}
                              </span>
                            </Typography>
                          </Box>
                        </Grid>
                      </>
                    </Grid>
                  </Grid>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    {isSuccessBookingEndTime && <span className={classes.timerValidText}>{timeValidText()}</span>}

                  </Grid>
                  <Divider style={{ marginBottom: "3px" }} />
                  <DialogActions style={{ padding: 0, marginBottom: "10px" }}>
                    <Button
                      size="small"
                      style={{ fontSize: "11px" }}
                      onClick={() => history.push("/select-projects")}
                    >
                      {t("userjourney.FlatBooking.EditPreferences")}
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      style={{ fontSize: "11px" }}
                      onClick={() => history.push("/make-payments")}
                    >
                      {t("userjourney.FlatBooking.PayAmount")}
                    </Button>
                  </DialogActions>
                </Grid>
              </Grid>}
              {activeStep > 10 && (
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: classes.accordianSummary }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "#65707D",
                          display: "flex",
                          flexDirection: "column",
                          fontWeight: "700",
                        }}
                      >
                        {t("userjourney.FlatBooking.BookedFlat")}
                        {/* <span className={classes.dataValue}>
                          {applicantData.Applicant_Booking_Status
                            ? applicantData.Applicant_Booking_Status[0]
                                ?.BuildingName
                            : "--"}
                        </span> */}
                        <span style={{ fontSize: 10, color: "black" }}>{t("userjourney.ApplNoLbl")}:{"  "}{applicantData.ApplicationNo}
                        </span>

                      </Typography>
                      {activeStep > 10 && (
                        <Chip
                          label={t("userjourney.BookedLabel")}
                          size="small"
                          style={{
                            color: "#6e6e6e",
                            fontWeight: 700,
                            fontSize: "10px",
                          }}
                          variant="outlined"
                        />
                      )}
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    classes={{ root: classes.accordianDetails }}
                  >
                    <Grid container direction="column" alignItems="center">
                      <Grid container>
                        <Grid container alignItems="center" style={{ padding: 2 }}>
                          {applicantData.Applicant_Booking_Status && <span className={classes.dataValue} style={{ borderBottom: '1px solid #80808057' }}>
                            {applicantData.Applicant_Booking_Status[0]?.ProjectName}
                          </span>}
                        </Grid>
                        <Grid item xs={5}>
                          <>
                            {applicantData.Applicant_Booking_Status.length && <CardMedia
                              className={classes.cover}
                              style={{ cursor: "pointer", objectFit: "contain" }}
                              image={applicantData.Applicant_Booking_Status[0]?.unitplan[1]}
                              title="key Plan"
                              component="img"
                              referrerPolicy="no-referrer"
                              disabled
                              onClick={handleClickOpen}
                            />}
                          </>
                        </Grid>
                        <Grid xs={7} style={{ lineHeight: 1, }}>
                          <>

                            <Grid container alignItems="center">
                              <Grid className={classes.dataValueViewBox} >
                                <Typography className={classes.dataTitle} >
                                  {t("userjourney.FlatBooking.UnitNoLabel")}:{" "}
                                  <span className={classes.dataValue}>
                                    {`${applicantData.Applicant_Booking_Status
                                      ? applicantData
                                        .Applicant_Booking_Status[0]?.FlatNo
                                      : "--"}

                                    (${applicantData.Applicant_Booking_Status
                                        ? applicantData
                                          .Applicant_Booking_Status[0]
                                          ?.flat_type
                                        : "--"})`}
                                  </span>
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {t("userjourney.FlatBooking.FloorNo")}:{" "}
                                  <span className={classes.dataValue}>
                                    {applicantData.Applicant_Booking_Status
                                      ? applicantData
                                        .Applicant_Booking_Status[0]?.FloorNo
                                      : "--"}
                                  </span>
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid container alignItems="center">
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {t("userjourney.FlatBooking.TowerNo")}:{" "}
                                  <span className={classes.dataValue}>
                                    {applicantData.Applicant_Booking_Status
                                      ? applicantData
                                        .Applicant_Booking_Status[0]?.Wing
                                      : "--"}
                                  </span>
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid container alignItems="center">
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {t("userjourney.FlatBooking.RERAArea")}:{" "}
                                  <span className={classes.dataValue}>

                                    {
                                      applicantData.Applicant_Booking_Status
                                        ? applicantData
                                          .Applicant_Booking_Status[0]
                                          ?.CarpetArea
                                        : "--"
                                    } {t("userjourney.FlatBooking.SQFT")}
                                  </span>
                                </Typography>
                              </Box>
                            </Grid>
                            {activeStep > 10 && (
                              <Grid container alignItems="center">
                                <Button
                                  size="small"
                                  // variant="contained"
                                  // color="primary"
                                  style={{ fontSize: "11px" }}
                                  onClick={() => downloadPdf()}
                                // startIcon={<DownloadIcon />}
                                >
                                  {t("userjourney.FlatBooking.DownloadappBtn")}
                                </Button>
                              </Grid>
                            )}
                          </>
                        </Grid>
                      </Grid>
                      <Divider style={{ marginBottom: "3px" }} />
                      {activeStep < 11 && (
                        <>
                          <Divider style={{ marginBottom: "3px" }} />
                          <DialogActions style={{ padding: 0 }}>
                            <Button
                              size="small"
                              style={{ fontSize: "11px" }}
                              onClick={() => history.push("/select-projects")}
                            >
                              {t("userjourney.FlatBooking.EditPreferences")}
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ fontSize: "11px" }}
                              onClick={() => history.push("/make-payments")}
                            >
                              {t("userjourney.FlatBooking.MakePayment")}
                            </Button>
                          </DialogActions>
                        </>
                      )}

                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
              {activeStep > 10 && (
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: classes.accordianSummary }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography style={{ fontSize: "12px", color: "#65707D", fontWeight: "700", }}>
                        {t("userjourney.FlatBooking.FlatAmountLabel")}

                      </Typography>
                      <Chip
                        label={t("userjourney.ReceivedLabel")}
                        size="small"
                        style={{
                          color: "#6e6e6e",
                          fontWeight: 700,
                          fontSize: "10px",
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    classes={{ root: classes.accordianDetailsMiddle }}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid container spacing={2} style={{ padding: "10px 0", marginLeft: "5px" }} >
                        <Grid container alignItems="center" >
                          <Typography className={classes.dataTitle}>
                            {t("userjourney.FlatBooking.TXNId")}:
                          </Typography>
                          {Object.keys(applicantData).length > 0 && (
                            <Typography className={classes.dataValue}>
                              {
                                applicantData?.ApplicationDetails[0]
                                  ?.TransactionDetails[0]
                                  ?.TransactionReferenceNo
                              }
                            </Typography>
                          )}
                        </Grid>
                        <Grid container alignItems="center">
                          <Typography className={classes.dataTitle}>
                            {t("userjourney.FlatBooking.BookingAmount")}:
                          </Typography>
                          {Object.keys(applicantData).length > 0 && (
                            <Typography className={classes.dataValue}>
                              ₹{" "}
                              {numberWithCommas(
                                applicantData?.ApplicationDetails[0]
                                  ?.TransactionDetails[0]?.AmountPaid
                              )}
                            </Typography>
                          )}
                        </Grid>
                        <Grid container alignItems="center">
                          <Typography className={classes.dataTitle}>
                            {t("userjourney.FlatBooking.Date")}:{" "}
                          </Typography>
                          {Object.keys(applicantData).length > 0 && (
                            <Typography className={classes.dataValue}>
                              {moment(applicantData?.ApplicationDetails[0]
                                ?.TransactionDetails[0]?.CreatedOn).format('MMMM Do YYYY, hh:mm A')}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      <hr />
                      <DialogActions style={{ padding: 0 }}>
                        <Button
                          size="small"
                          style={{ fontSize: "10px" }}
                          onClick={() => getFlatTransactionDetailsPdf()}
                        >
                          {t("userjourney.FlatBooking.DownloadRecBtn")}
                        </Button>
                        <Button
                          size="small"
                          style={{ fontSize: "10px" }}
                          color="primary"
                          variant="contained"
                          onClick={() => history.push("/transaction-details")}
                        >
                          {t("userjourney.FlatBooking.MyTransactions")}
                        </Button>
                      </DialogActions>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
              {activeStep > 10 && (
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: classes.accordianSummary }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography style={{ fontSize: "12px", color: "#65707D", fontWeight: "700", }}>
                        {t("userjourney.FlatBooking.LetterIntent")}
                      </Typography>
                      <Chip
                        label={activeStep > 11 ? t("userjourney.GeneratedLabel") : t("userjourney.inProgressLabel")}
                        size="small"
                        style={{
                          color: "#6e6e6e",
                          fontWeight: 700,
                          fontSize: "10px",
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    classes={{ root: classes.accordianDetails }}
                  >
                    {/*<Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                       <Grid container direction="column">
                        <CustomTooltip
                          arrow
                          enterTouchDelay={0}
                          title={
                            <DialogContent className={classes.castDropDown}>
                              <Typography color="primary">Instruction:</Typography>
                              <ul>
                                <li>Thank you for submitting your documents for verification. We would like to remind you that in order to complete the
                                  verification process, you will need to bring the original documents mentioned in your Document Verification Receipt,
                                  along with the receipt itself.</li>
                                <li>Please note that we cannot accept photocopies or digital copies of documents for verification purposes. You must
                                  bring the original documents with you in order for us to verify them and complete the process.</li>
                                <li>If you have any questions about which documents are required or how to prepare for the verification process, please
                                  refer to the Document Verification Receipt that you received when you submitted your documents. This receipt lists all
                                  of the documents that you need to bring with you for verification.</li>
                                <li>We appreciate your cooperation in this matter and look forward to completing the verification process as soon as
                                  possible. If you have any further questions or concerns, please don't hesitate to contact us.</li>

                              </ul>
                            </DialogContent>
                          }
                          style={{
                            display: "inline-block",
                            paddingLeft: "12px",
                            lineHeight: "10px",
                          }}>
                          <Typography style={{ fontWeight: 600, fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
                            Your Appointmend is Scheduled<InfoOutlined color="primary" style={{ fontSize: "1.2rem" }} />
                          </Typography>
                        </CustomTooltip>
                        <Grid container alignItems="center">
                          <Box
                            className={classes.centerAddress}
                            style={{ justifyContent: "center", paddingTop: 10 }}
                          >
                            <EventNoteIcon className={classes.noteIcon} />
                            <Typography
                              component="span"
                              variant="body2"
                              color="primary"
                              className={classes.fontBoldStyle}
                            >
                              {applicantData.appointment_details[0]?.book_date}
                            </Typography>
                          </Box>
                          <Box
                            className={classes.centerAddress}
                            style={{ justifyContent: "center" }}
                          >
                            <AccessTimeIcon className={classes.noteIcon} />
                            <Typography
                              component="span"
                              variant="body2"
                              color="primary"
                              className={classes.fontBoldStyle}
                            >
                              {applicantData.appointment_details[0]?.start_time} -{" "}
                              {applicantData.appointment_details[0]?.end_time}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <hr />
                      <DialogActions style={{ padding: 0 }}>
                        <Button
                          size="small"
                          style={{ fontSize: "10px" }}
                          onClick={() => downloadReceipt()}
                        >
                          Download Appointment Ticket
                        </Button>
                        <Button
                          style={{ fontSize: "10px", padding: 3 }}
                          variant="contained"
                          color="primary"
                          onClick={() => history.push("/reschedule")}
                        >
                          Manage Appoinments
                        </Button>
                      </DialogActions>
                    </Grid> */}
                    {activeStep == 11 && <Box
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.detailBox}
                      style={{ borderRadius: 5, background: "white" }}
                    >
                      {/* <Typography
                          style={{
                            fontSize: "12px",
                            color: "#65707D",
                            marginTop: "8px",
                          }}
                        >
                          Letter Of Intent
                        </Typography> */}
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {t("userjourney.FlatBooking.LOIGeneratProgress")}
                      </Typography>
                      <Grid container justifyContent="center" style={{ padding: "5px" }}>
                        {/* <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          style={{ fontSize: "11px", padding: "5px" }}
                          onClick={() => history.push('/my-loi')}
                        >
                          {t("userjourney.FlatBooking.DownloadLOI")}
                        </Button> */}
                      </Grid>
                    </Box>}
                    {activeStep > 11 && <Box
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.detailBox}
                      style={{ borderRadius: 5, background: "white" }}
                    >
                      {/* <Typography
                          style={{
                            fontSize: "12px",
                            color: "#65707D",
                            marginTop: "8px",
                          }}
                        >
                          Letter Of Intent
                        </Typography> */}
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {t("userjourney.FlatBooking.LOIGenerated")}
                      </Typography>
                      <Grid container justifyContent="center" style={{ padding: "5px" }}>
                        <Button
                          size="small"
                          color="primary"
                          style={{ fontSize: "11px", padding: "5px" }}
                          onClick={() => downloadFile(myAllotmentPath, "test.pdf")}
                        >
                          {t("userjourney.FlatBooking.DownloadLOI")}
                        </Button>
                      </Grid>
                    </Box>}
                  </AccordionDetails>
                </Accordion>
              )}
            </Grid>
            <Grid xs={4} className={`${classes.lowerStepCon}  ${activeStep > 11 && activeStep < 15 ? "current" : ""}`}
              style={{ border: activeStep > 12 ? "2px solid #B2C3F0" : "", borderTop: 0, overflowY: "auto" }}
              direction="column">
              {activeStep > 10 && <Accordion
                expanded={expandedC5 === "allotmentLetter"}
                onChange={handleChangeC5("allotmentLetter")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  classes={{ root: classes.accordianSummary }}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography style={{ fontSize: "12px", color: "#65707D", fontWeight: "700", }}>
                      {t("userjourney.stepper.stage5.AllotmentLetter")}
                    </Typography>
                    <Chip
                      label={activeStep > 12 ? t("userjourney.GeneratedLabel") : t("userjourney.inProgressLabel")}
                      size="small"
                      style={{
                        color: "#6e6e6e",
                        fontWeight: 700,
                        fontSize: "10px",
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </AccordionSummary>
                <AccordionDetails classes={{ root: classes.accordianDetails }}>
                  {activeStep > 10 && activeStep < 13 &&
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {skipDocs != 0 ? <Typography style={{ marginLeft: "14px", fontWeight: "700", }} variant="p1">

                        Please Upload The Skiped Documents Listed Below Before Allotment Letter

                        <ul style={{
                          fontSize: "12px",
                          paddingLeft: 13,
                        }} >
                          {skipDocs.map((skipDoc, index) => (
                            <li key={index}>{skipDoc?.DocumentName}</li>
                          ))}
                        </ul>
                        <Typography align="center">
                          <Box style={{ paddingTop: "2px" }}>
                            <Button
                              onClick={() => history.push("upload-documents")}
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ fontSize: "11px", padding: "5px" }}
                            >
                              Upload
                            </Button>
                          </Box>
                        </Typography>
                      </Typography> : <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {t("userjourney.AllotmentLetter.AllotmentDesc")}
                      </Typography>}

                    </Grid>}
                  {activeStep > 12 &&
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        Your Allotment Letter is Generated.
                      </Typography>
                      <Grid container justifyContent="center" style={{ padding: "5px" }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          style={{ fontSize: "11px", padding: "5px" }}
                          onClick={() => history.push('/my-allotment-letter')}
                        >
                          Download Allotment Letter
                        </Button>
                      </Grid>
                    </Grid>}
                </AccordionDetails>
              </Accordion>}
              {/* {activeStep > 11 && activeStep < 13 && (applicantData.LatestNocApplication?.DocumentsVerificationInfo?.length === 0 || isLatestNocPaymentDone) && (
                <Box
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.setp5Con}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography style={{ fontSize: "11px", color: "#65707D", fontWeight: "700", }}>
                      CIDCO NOC
                    </Typography>
                    {applicantData.nocPaymentDetails.length > 0 && <Chip
                      label={t("In Progress")}
                      size="small"
                      style={{
                        color: "#6e6e6e",
                        fontWeight: 700,
                        fontSize: "10px",
                      }}
                      variant="outlined"
                    />}
                  </Grid>
                  <Divider style={{ margin: "4px 0" }} />
                  <Grid container direction="column">
                    <Grid item>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        // className={classes.detailBox}
                        paddingY={1}
                        style={{ fontSize: "11px", borderRadius: 5 }}
                      >
                        <Button onClick={() => history.push("loan-application")} size="small" variant="contained" color="primary" style={{ fontSize: "11px", padding: "5px" }}>{applicantData.nocPaymentDetails.length > 0 ? "View Details" : "Request NOC"}</Button>
                        <Typography
                          onClick={() => setAboutNocShow(true)}
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            cursor: "pointer"
                          }}
                          align="center"
                        >
                          About NOC
                          <InfoOutlined color="primary" style={{ fontSize: "1rem", transform: 'translate(5px, 4px)' }} />
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Dialog open={isNotRequiredLoan} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ m: 0, p: 1 }} style={{ padding: "8px 24px 0 24px" }}>
                      <Grid container xs={12}>
                        <Grid item xs={11} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}></Grid>
                        <Grid container justifyContent="center" xs={1}>
                          <IconButton
                            aria-label="close"
                            onClick={() => setIsNotRequiredLoan(false)}
                            sx={{
                              position: 'absolute',
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </DialogTitle>
                    <DialogContent>
                      <Box alignSelf="center">
                        <Typography variant="h6" align="center" style={{ fontWeight: "bold" }}>Are you sure you don’t want to apply for loan ? </Typography>
                        <Typography variant="subtitle2" align="center">Make Full Payment or Click on “Apply for Loan” to Generate an NOC.</Typography>
                        <Box paddingY={2}>
                          <ApplyForLoanImg style={{ width: "100%", height: "auto", maxHeight: "130px" }} />
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-evenly" paddingBottom={3}>
                        <Button onClick={() => history.push('loan-application')} variant="outlined" color="primary">Apply For Loan</Button>
                        <Button onClick={() => history.push('make-house-payment')} variant="outlined" color="primary">Make Down Payment</Button>
                      </Box>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={aboutNocShow} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ m: 0, p: 1 }} style={{ padding: "8px 24px 0 24px" }}>
                      <Grid container xs={12}>
                        <Grid item xs={11} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography variant="subtitle1" style={{ fontWeight: "700" }}>About Noc</Typography>
                        </Grid>
                        <Grid container justifyContent="center" xs={1}>
                          <IconButton
                            aria-label="close"
                            onClick={() => setAboutNocShow(false)}
                            sx={{
                              position: 'absolute',
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </DialogTitle>
                    <DialogContent>
                      <Box paddingY={2}>
                        <Typography variant="subtitle1" style={{ fontSize: "small", fontWeight: "700" }} >NOC Validity </Typography>
                        <Typography variant="subtitle2" style={{ color: "#65707D", fontSize: 'small' }}>An NOC is valid for six months. After it is expired, you will not be able to proceed with the same NOC, you will have to request for another NOC. </Typography>
                      </Box>
                      <Box paddingBottom={2}>
                        <Typography variant="subtitle1" style={{ fontSize: "small", fontWeight: "700" }} >Fee and Charge </Typography>
                        <Typography variant="subtitle2" style={{ color: "#65707D", fontSize: 'small' }}>Payment Fee 250rs/- + GST Fee</Typography>
                      </Box>
                    </DialogContent>
                  </Dialog>
                </Box>
              )} */}
              {/* {activeStep > 11 && activeStep < 13 && !isLatestNocPaymentDone && (applicantData.LatestNocApplication?.DocumentsVerificationInfo?.length > 0) && (
                <Accordion
                  expanded={expandNocDetails}//expandedC5 === "NocDocVerificattion"
                  onChange={() => setExpandNocDetails(!expandNocDetails)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: classes.accordianSummary }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography style={{ fontSize: "12px", color: "#65707D", fontWeight: "700", }}>
                        NOC Verification
                      </Typography>
                      <Chip
                        label={nocApprovedDocsCount === totalNocDocsCount && totalNocDocsCount > 0 ? t("Payment Pending") : t("In Progress")}
                        size="small"
                        style={{
                          color: "#6e6e6e",
                          fontWeight: 700,
                          fontSize: "10px",
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    classes={{ root: classes.accordianDetails }}
                    style={{ width: '100%' }}
                  >
                    <Box className={classes.dialogContent}>
                      <ul
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          padding: "5px 5px 5px 20px",
                          borderRadius: "7px",
                          fontWeight: "500",
                          listStyle: 'square',
                        }}
                      >
                        {applicantData.LatestNocApplication?.DocumentsVerificationInfo?.map((doc, index) => {
                          if (doc.VerifiedFlag == 1) {
                            return (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <li key={index}>{doc.DocumentId === '1' ? 'Noc Request Letter' : 'Sanction Letter'}</li>
                                  <VerifiedSuccessIcon
                                    style={{ fontSize: "1rem" }}
                                  />
                                </div>
                                <Divider style={{ margin: "5px" }} light />
                              </>
                            );
                          } else if (doc.VerifiedFlag == 2 && doc.IsResubmitted == 0) {
                            return (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <li key={index}>{doc.DocumentName}</li>
                                  <RejectedDocIcon style={{ fontSize: "1rem" }} />
                                </div>
                                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "red" }}>
                                  <ErrorTooltip title={doc.VerifiedReason} arrow placement="bottom-start">
                                    <span style={{ fontWeight: "700" }}>
                                      {t("userjourney.DocumentVerification.reason")} {doc.VerifiedReason}
                                    </span>
                                  </ErrorTooltip>
                                </div>
                                <Divider style={{ margin: "5px" }} light />
                              </>
                            );
                          } else if (doc.VerifiedFlag == 2 && doc.IsResubmitted == 1) {
                            return (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <li key={index}>{doc.DocumentName}</li>
                                  <UpdateIcon style={{ fontSize: "1.1rem" }} color='primary' />
                                </div>
                                <span style={{ fontWeight: "700", color: '#04ac6e' }}>
                                  {t("userjourney.DocumentVerification.reuploadedTxt")}
                                </span>
                                <Divider style={{ margin: "5px" }} light />
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <li key={index}>{doc.DocumentName}</li>
                                  <PendingDocIcon style={{ fontSize: "1rem" }} />
                                </div>
                                <Divider style={{ margin: "5px" }} light />
                              </>
                            );
                          }
                        })}
                      </ul>
                    </Box>
                    NOC request documents are under verification.
                  </AccordionDetails>
                </Accordion>
              )} */}
              {activeStep > 12 && (
                <Accordion
                  expanded={expandedC5 === "Installment"}
                  onChange={handleChangeC5("Installment")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: classes.accordianSummary }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography style={{ fontSize: "12px", color: "#65707D", fontWeight: "700", }}>
                        Installments
                      </Typography>
                      <Chip
                        label={activeStep > 13 ? t("Completed") : t("userjourney.inProgressLabel")}
                        size="small"
                        style={{
                          color: "#6e6e6e",
                          fontWeight: 700,
                          fontSize: "10px",
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    classes={{ root: classes.accordianDetails }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        View your installments
                      </Typography>
                      <Grid container justifyContent="center" style={{ padding: "5px" }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          style={{ fontSize: "11px", padding: "5px" }}
                          onClick={() => history.push('/make-house-payment')}
                        >
                          View Installments
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
              {activeStep > 13 && (
                <Accordion
                  expanded={expandedC5 === "Agreement"}
                  onChange={handleChangeC5("Agreement")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{ root: classes.accordianSummary }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography style={{ fontSize: "12px", color: "#65707D", fontWeight: "700", }}>
                        Agreement
                      </Typography>
                      <Chip
                        label={activeStep > 14 ? t("userjourney.GeneratedLabel") : t("userjourney.inProgressLabel")}
                        size="small"
                        style={{
                          color: "#6e6e6e",
                          fontWeight: 700,
                          fontSize: "10px",
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails
                    classes={{ root: classes.accordianDetails }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {activeStep > 14 ? 'Agreement letter is generated' : 'Agreement Generation is in progress.'}
                      </Typography>
                      <Grid container justifyContent="center" style={{ padding: "5px" }}>
                        {activeStep > 14 && <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          style={{ fontSize: "11px", padding: "5px" }}
                          onClick={() => history.push('/agreement-letter')}
                        >
                          Download Agreement
                        </Button>}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
            </Grid>
          </ul>
        </Grid>
        <Dialog sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: 435 } }} open={open}>
          <DialogContent>
            <div style={{ heigh: 'auto', marginTop: '16px' }}>
              {applicantData.Applicant_Booking_Status.length && <CardMedia
                component="img"
                className={classes.cover2}
                style={{ objectFit: "contain" }}
                image={applicantData.Applicant_Booking_Status[0].unitplan[1]}
                referrerPolicy="no-referrer"
              />}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              {t("userjourney.FlatBooking.Close")}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={emailEditDialog}>
          {(isSendingVerificationOTP) && (<Loading isOpen={isSendingVerificationOTP} />)}
          {isFetchingUpdateEmail && <Loading isOpen={isFetchingUpdateEmail} />}
          <DialogTitle style={{ padding: "8px 24px" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Update your E-mail ID</Typography>
              <IconButton onClick={() => setEmailEditDialog(false)}>
                <CloseIconMui />
              </IconButton>
            </Grid>
            {isErrorUpdateEmail && <Alert severity="error">{errorMsgUpdateEmail}</Alert>}
          </DialogTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
            enableReinitialize
          >
            {({ submitForm, setFieldValue, touched, errors, values }) => (
              <Form noValidate autoComplete="off" className={classes.formContainer}>
                <DialogContent style={{ paddingTop: 0 }}>
                  <div className={classes.formSection}>
                    <Box className={classes.inputsSection}>
                      {/* {isErrorApplicant && (
                          <AlertBox severity="error">{errorMessage}</AlertBox>
                        )} */}
                      <Grid
                        container
                        justify="space-evenly"
                      >
                        <Grid item xs={12}>
                          <FormControl
                            control="input"
                            variant="outlined"
                            label={t(
                              "userjourney.emailUpdate.emailInputLabel"
                            )}
                            placeholder={t(
                              "userjourney.emailUpdate.emailPlaceholder"
                            )}
                            name="emailId"
                            type="email"
                            id="emailId"
                            inputProps={{ maxLength: 100 }}
                            required
                            value={emailValue}
                            onChange={copyValueToConfirm}
                          />
                          {!isEmailVerified &&
                            <Button variant="contained" disabled={disableEmailVerifyBtn} color="primary" size="small" endIcon={<PassIcon />} onClick={verifyEmailFunc}>
                              {t("personalDetailsForm.formControl.verifyEmail", { ns: 'PersonalDetailsPageTrans' })}
                            </Button>
                          }
                          {isEmailVerified &&
                            <Button variant="contained" disabled={disableEmailVerifyBtn} color="primary" size="small" endIcon={<VerifiedSuccessIcon />}>
                              {t("personalDetailsForm.formControl.emailVerified", { ns: 'PersonalDetailsPageTrans' })}
                            </Button>
                          }
                          <FormControl
                            control="input"
                            variant="outlined"
                            label={t(
                              "userjourney.emailUpdate.cnfemailInputLabel"
                            )}
                            placeholder={t(
                              "userjourney.emailUpdate.cnfemailPlaceholder"
                            )}
                            name="emailIdConfirm"
                            type="email"
                            id="emailIdConfirm"
                            onCut={(e) => e.preventDefault()}
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            inputProps={{ maxLength: 100 }}
                            required
                            value={emailValue}
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
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                  {verifyEmailAlert && (
                    <AlertBox severity="error">{t("personalDetailsForm.formControl.verifyEmailAlert", { ns: 'PersonalDetailsPageTrans' })}</AlertBox>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button size='small' onClick={() => setEmailEditDialog(false)}>cancel</Button>
                  <Button autoFocus variant="contained" color='primary' size='small' type="submit">
                    Save
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
        <SnackBox open={isSuccessVerifyEmailVerificationOTP} autoHideDuration={5000} onClose={handleVerifyClose}>
          <Alert severity="success" sx={{ width: '100%' }}>
            {t("personalDetailsForm.formControl.emailVerificationCompleted", { ns: 'PersonalDetailsPageTrans' })}
          </Alert>
        </SnackBox>
        <Dialog sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: 440 } }} open={verifyEmailDialogOpen}>
          {isFetchingVerifyEmailVerificationOTP && <Loading isOpen={isFetchingVerifyEmailVerificationOTP} />}
          <SnackBox open={isErrorVerifyEmailVerificationOTP} autoHideDuration={3000} onClose={handleVerifyClose}>
            <Alert severity="error" sx={{ width: '100%' }}>
              {errorMsgVerifyEmailVerificationOTP}
            </Alert>
          </SnackBox>
          <DialogTitle id="alert-dialog-title">
            {t("personalDetailsForm.formControl.emailVerificationTxt", { ns: 'PersonalDetailsPageTrans' })}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="alert-dialog-description">
              <span style={{ fontWeight: "bold", fontStyle: "oblique", fontSize: "medium" }}>{t("personalDetailsForm.formControl.verificationCheckEmailTxt", { ns: 'PersonalDetailsPageTrans' })}</span>
            </DialogContentText>
          </DialogContent>
          <Grid Container style={{ padding: "0 50px", display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
            <Typography className={classes.sendOtpTxt} style={{ fontWeight: "600", marginRight: "75px", marginTop: "-50px", visibility: "visible" }}>{t("personalDetailsForm.formControl.getOtpButtonText", { ns: 'PersonalDetailsPageTrans' })}<span style={{ fontStyle: "italic" }}>{(emailValue != "") ? emailValue : formikRef?.current?.values?.emailId}</span></Typography>
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
                    label={t("personalDetailsForm.formControl.enterOtpText", { ns: 'PersonalDetailsPageTrans' })}
                    placeholder={t("personalDetailsForm.formControl.enterOtpText", { ns: 'PersonalDetailsPageTrans' })}
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
                        {t("personalDetailsForm.formControl.resendOtpText", { ns: 'PersonalDetailsPageTrans' })} 00:{countOtp} {t("personalDetailsForm.formControl.sec", { ns: 'PersonalDetailsPageTrans' })}
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
                            {t("Resend", { ns: 'PersonalDetailsPageTrans' })}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <DialogActions>
                    <Button autoFocus variant="contained" type="submit" color="primary">
                      {t("personalDetailsForm.formControl.submitBtn", { ns: 'PersonalDetailsPageTrans' })}
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
                      {t("personalDetailsForm.formControl.cancelBtn", { ns: 'PersonalDetailsPageTrans' })}
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Grid>
        </Dialog>
      </CardContent>
    </>
  );
};

export default UserStepperV3;