import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Checkbox, FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import Radiogroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "../../../molecules/FormControl/FormControl";
import SbiPayIcon from "../../../../assets/paymentModeIcons/sbiPay.jpeg";
import RazorpayIcon from "../../../../assets/paymentModeIcons/razorPay.jpeg";
import { FormControl as MUIform } from "@material-ui/core";
import {
  MakePaymentIcon,
  WhiteArrowIcon,
  ProjectSearchIcon,
  BillingIcon,
  LoanAppliedIcon,
  InfoMarkIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Divider from "@material-ui/core/Divider";
import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import MakePaymentDialogBox from "../../../molecules/DialogBoxes/MakePaymentDialogBox/MakePaymentDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import { getApplication } from "../../../../redux/features/application/ApplicationSlice";
import {
  getBillingDetails,
  masterDataSelector,
  calculateTotalBill,
  getApplicationPaymentSummary,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import { withStyles } from "@material-ui/core/styles";
import {
  addEditStepper,
  getStepperDetails,
  clearSuperStepperEditVars,
} from "../../../../redux/features/stepper/StepperSlice";
import { addEditApplicantProgress, ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
/* import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice"; */
import {
  applicationPaymentCreateTrans,
  razorpayPaymentGatewaySelector,
  clearRazorpayPaymentGatewayState,
  clearRazorpayAfterPaymentStates,
  razorpayTransmode,
  clearRazorpayTransmodeStates,
  clearRazorpayPaymentGatewayData,
  clearApplicationPaymentCreateTransState,
  applicationPaymentSbiTransmode,
  clearApplicationPaymentSbiTransmodeStates,
} from "../../../../redux/features/transaction/RazorpayPaymentSlice";
// import CcavenuePaymentGateway from "../CcavenuePaymentGateway/CcavenuePaymentGateway";
// import RazorpayPaymentGateway from "../RazorpayPaymentGateway/RazorpayPaymentGateway";
import Loading from "../../../atoms/Loading/Loading";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import Tooltip from "@material-ui/core/Tooltip";

import hdfcLogo from "../../../../assets/bankIcons/hdfc-logo.png";
import hsbcLogo from "../../../../assets/bankIcons/hsbc-logo.png";
import iciciLogo from "../../../../assets/bankIcons/icici-logo.png";
import kotakLogo from "../../../../assets/bankIcons/kotak-logo.png";
import { ApplicationFeeStyles } from "../ApplicationFeeView.styles";
import RazorpayPaymentGateway from "../../EmdLoanApplicationPageComponents/RazorpayPaymentGateway/RazorpayPaymentGateway";

const ApplicationFeeView = (props) => {
  const { width } = props;
  const classes = ApplicationFeeStyles();
  const { t } = useTranslation("BankDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  // const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [currentTotalBill, setCurrentTotalBill] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);
  const [applyEMDLoanIs, setApplyEMDLoanIs] = useState("");
  const [isHousingLoan, setIsHousingLoan] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [isOpenPaymentGateway1, setOpenPaymentGateway1] = useState(false);
  const [isOpenPaymentGateway2, setOpenPaymentGateway2] = useState(false);
  const [confirmScheme, setConfirmScheme] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [isConfirmCheckbox, setConfirmCheckbox] = useState(false);
  const [inProcessTrans, setInProcessTrans] = useState(false)
  const updateConfirmCheckbox = () => setConfirmCheckbox(!isConfirmCheckbox);

  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    isErrorApplicant,
    isFetchingApplicantGet,
    errorMessage,
    applicantData,
  } = useSelector(applicantSelector);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const {
    totalBill,
    billingDetails,
    downloadBanklist,
    isFetchingBanklist,
    isErrorBanklist,
    isSuccessBanklist,
    errorMsgBanklist,

    dataApplicationPaymentSummry,
    isFetchingApplicationPaymentSummry,
    isErrorApplicationPaymentSummry,
    isSuccessApplicationPaymentSummry,
    errorMsgApplicationPaymentSummry,
  } = useSelector(masterDataSelector);
  const {
    isFetchingApplicationPaymentCreateTrans,
    isSuccessResApplicationPaymentCreateTrans,
    isErrorApplicationPaymentCreateTrans,
    errorMsgApplicationPaymentCreateTrans,
    applicationPaymentCreateTransData,

    isFetchingRazorpayAfterPayment,
    isSuccessResRazorpayAfterPayment,
    isErrorRazorpayAfterPayment,
    errorMsgRazorpayAfterPayment,
    razorpayAfterPaymentData,

    isFetchingRazorpayTransmode,
    isSuccessResRazorpayTransmode,
    isErrorRazorpayTransmode,
    errorMsgRazorpayTransmode,
    razorpayTransmodeData,

    isFetchingApplicationPaymentSbiTransmode,
    isSuccessApplicationPaymentResSbiTransmode,
    isErrorApplicationPaymentSbiTransmode,
    errorMsgApplicationPaymentSbiTransmode,
    applicationPaymentsbiTransmodeData,
  } = useSelector(razorpayPaymentGatewaySelector);
  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } = useSelector(ApplicantProgressSelector);
  // const { isEStampSelected } = useSelector(documentsSelector);
  const [tempBillingDetails, setTempBillingDetails] = useState({});
  const [paymentGateway, setPaymentGateway] = useState({});
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  // const [bankDetailsList, setBankDetailsList] = useState([]);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getApplicationPaymentSummary());
    dispatch(getApplicantProgress());
    // dispatch(getBankList());
    // dispatch(getApplication());
    // dispatch(superStepperActiveStep(3));

    let currentEnv = window.location.origin;

    setApplyEMDLoanIs("sbi");
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

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }
      });
      history.push(pageUrl);
    }
  }, [isSuccessResStepper]);
  
  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "7") {
          item.Status == "completed" ? setIsPaymentDone(true) : setIsPaymentDone(false);
        }
        if (item.StepId == "6" && item.Status == "pending") {
          history.push("/dashboard");
        }
      })
    }
  }, [isSuccessProgressResStepper])

  /* const selectBankList = [
    {
      bankName: "HDFC",
      bankIcon: hdfcLogo,
      value: "hdfc",
      processingFees: 1000
    },
    {
      bankName: "HSBC",
      bankIcon: hsbcLogo,
      value: "hsbc",
      processingFees: 1200
    },
    {
      bankName: "Kotak Mahendra",
      bankIcon: kotakLogo,
      value: "kotakMahendra",
      processingFees: 800
    },
    {
      bankName: "ICICI",
      bankIcon: iciciLogo,
      value: "icici",
      processingFees: 1000
    }
  ]; */

  const initialValues = {
    postalAddSameIs: "",
  };

  const validationSchema = yup.object({
    /* accountNumber: yup
      .string()
      .required(
        t("bankForm.bankDetailsForm.formControl.accountNumberErrors.required")
      )
      .matches(
        /^\d{9,20}$/,
        t("bankForm.bankDetailsForm.formControl.accountNumberErrors.limitation")
      ),
    branchName: yup
      .string()
      .required(
        t("bankForm.bankDetailsForm.formControl.branchNameErrors.required")
      )
      .matches(
        // /^[a-zA-Z]{3,50}$/,
        /^[a-zA-Z ]{3,50}$/,
        t("bankForm.bankDetailsForm.formControl.branchNameErrors.limitation")
      ),
    bankName: yup
      .string()
      .required(
        t("bankForm.bankDetailsForm.formControl.bankNameErrors.required")
      )
      .matches(
        /^[a-zA-Z ]{3,50}$/,
        t("bankForm.bankDetailsForm.formControl.bankNameErrors.limitation")
      ),
    ifscCode: yup
      .string()
      .required(
        t("bankForm.bankDetailsForm.formControl.ifscCodeErrors.required")
      )
      .matches(
        /^[A-Z]{4}0[A-Z0-9]{6}$/,
        t("bankForm.bankDetailsForm.formControl.ifscCodeErrors.limitation")
      ), */
  });

  /* useEffect(() => {
    if (isSuccessResApplicantGet && applicantData) {
      // setCurrentTotalBill(totalBill);
      if (applicantData.IncomeGroup) {
        dispatch(getBillingDetails(applicantData.IncomeGroup));
      }
    }
  }, [applicantData, isSuccessResApplicantGet]); */

  useEffect(() => {
    if (isSuccessApplicationPaymentSummry && dataApplicationPaymentSummry) {
      if (applyEMDLoanIs === "sbi") {
        let new_obj = {
          totalAmount:
            parseFloat(dataApplicationPaymentSummry?.ApplicationTransactionAmount).toFixed(2),
          totalAmountInWords: dataApplicationPaymentSummry?.TotalWords,
          totalGst: parseFloat(dataApplicationPaymentSummry?.ApplicationTransactionGstAmount).toFixed(2),
          totalIncludingGst: parseFloat(dataApplicationPaymentSummry?.ApplicationTransactionTotal).toFixed(2),
          totalGstPercent: dataApplicationPaymentSummry?.ApplicationTransactionGstPercentage
        };
        setTempBillingDetails(new_obj);
      } else {
        let new_obj = {
          totalAmount:
          parseFloat(dataApplicationPaymentSummry?.ApplicationTransactionAmount).toFixed(2),
          totalAmountInWords: dataApplicationPaymentSummry?.TotalWords,
          totalGst: parseFloat(dataApplicationPaymentSummry?.ApplicationTransactionGstAmount).toFixed(2),
          totalIncludingGst: parseFloat(dataApplicationPaymentSummry?.ApplicationTransactionTotal).toFixed(2),
          totalGstPercent: dataApplicationPaymentSummry?.ApplicationTransactionGstPercentage
        };
        setTempBillingDetails(new_obj);
      }
      console.log(tempBillingDetails);
    }
  }, [
    isSuccessApplicationPaymentSummry,
    dataApplicationPaymentSummry,
    applyEMDLoanIs,
  ]);

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      maxWidth: 454,
      color: "#65707D",
      fontSize: theme.typography.pxToRem(14),
      padding: 20,
      border: "1px solid #0038C0",
      boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06)",
      borderRadius: "8px",
    },
  }))(Tooltip);

  /* useEffect(() => {
    if (billingDetails.length > 0) {
      let billngBtlsObj = billingDetails[0];
      let new_obj = {
        appFeePlusGst: Number(billngBtlsObj.ApplicationFee) + Number(billngBtlsObj.ApplicationGST),
        emdPlusGst: Number(billngBtlsObj.Emd) + Number(billngBtlsObj.EMDGST),
        total: Number(billngBtlsObj.Total)
      };
      setTempBillingDetails(new_obj);
    }
  }, [billingDetails]); */

  /* useEffect(() => {
    if (isSuccessBanklist && downloadBanklist) {
      setBankDetailsList(downloadBanklist);
    }
  }, [downloadBanklist, isSuccessBanklist]); */

  // const applyLoanCheckChangehandle = (event) => {
  //   setApplyEMDLoanIs(event.target.value);
  // };


  const onSubmit = (values, { setSubmitting }) => {
    //handleOnSkip();
    //return false;
    setSubmitting(false);
    // history.push("/emd-loan-select-bank");
    let transFor = "";
    if (applyEMDLoanIs === "sbi") {
      transFor = "Payment-SBI";
    } else if (applyEMDLoanIs === "razorpay") {
      transFor = "online";
    }
    let send_obj = {
      ApplicantId: applicantData.ApplicantId,
      Amount: tempBillingDetails.totalIncludingGst,
      TransFor: transFor,
      TransMode: "online"
    };
    dispatch(applicationPaymentCreateTrans(send_obj));

  };

  useEffect(() => {
    if (
      isSuccessResApplicationPaymentCreateTrans &&
      applicationPaymentCreateTransData
    ) {
      console.log("isSuccessResApplicationPaymentCreateTrans");
      dispatch(clearApplicationPaymentCreateTransState());
      if (applyEMDLoanIs === "sbi" || applyEMDLoanIs === "razorpay") {
        let new_obj = {
          ...tempBillingDetails,
          TransId: applicationPaymentCreateTransData.TransId,
          PaymentGateway: "sbi",
        };
        localStorage.setItem("paymentDetails", JSON.stringify(new_obj));

        if (applyEMDLoanIs === "razorpay") {
          let payment_details = {
            ApplicantId: applicantData.ApplicantId,
            TransId: applicationPaymentCreateTransData.TransId,
            TransMode: "online",
            LoanAmount: tempBillingDetails.totalIncludingGst,
            PayableAmount: tempBillingDetails.totalIncludingGst,
            PaymentGateway: "razorpay",
          };
          localStorage.setItem(
            "paymentDetails",
            JSON.stringify(payment_details)
          );
          // history.push("/payment-details-view");
        } else {
          // let sendObj = {
          //   ApplicantId: applicantData.ApplicantId,
          //   TransId: applicationPaymentCreateTransData.TransId,
          //   // "BankId": paymentDetailsObj.BankId,
          //   TransMode: "online",
          //   LoanAmount: tempBillingDetails.totalAmount,
          //   PayableAmount: tempBillingDetails?.totalAmount,
          // };

          // dispatch(razorpayTransmode(sendObj));

          let check_loan_details = localStorage.getItem("paymentDetails");
          let bankDtls = JSON.parse(check_loan_details);

          let sendObjNew = {
            TransId: bankDtls.TransId,
            applicant_id: localStorage.getItem("applicantId"),
            origin: "mobile",
          };
          // history.push(`/applicationfee-payment-successful?transId=${sendObjNew.TransId}`)
          dispatch(applicationPaymentSbiTransmode(sendObjNew));
          
        }
      }
    }
    // else {
    //   let payment_details = {
    //     "ApplicantId": applicantData.ApplicantId,
    //     "TransId": applicationPaymentCreateTransData.TransId,
    //     "TransMode": "online",
    //     "LoanAmount": tempBillingDetails.totalAmount,
    //     "PayableAmount": tempBillingDetails.totalAmount
    //   };
    //   localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
    //   setOpenPaymentGateway2(true);
    //   dispatch(razorpayTransmode(payment_details));
    // }
  }, [
    isSuccessResApplicationPaymentCreateTrans,
    applicationPaymentCreateTransData,
  ]);

  // useEffect(() => {
  //   if (isSuccessResRazorpayTransmode && razorpayTransmodeData) {
  //       dispatch(clearRazorpayTransmodeStates());
  //     let payment_details = {
  //       ...applicantData,
  //       totalAmount: tempBillingDetails.ApplicationTransactionAmount,
  //       transactionId: razorpayTransmodeData.TransactionId,
  //       origin: razorpayTransmodeData.Origin,
  //     };
  //     localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
  //     setOpenPaymentGateway2(true);
  //     dispatch(clearRazorpayTransmodeStates());

  //     console.log("useEffect isSuccessResRazorpayTransmode");

  //     let check_loan_details = localStorage.getItem("paymentDetails");
  //     let bankDtls = JSON.parse(check_loan_details);
  //     let sendObjNew = {
  //       TransId: bankDtls.transactionId,
  //       applicant_id: localStorage.getItem("applicantId"),
  //       origin: "",
  //     };

  //     dispatch(applicationPaymentSbiTransmode(sendObjNew));
  //   }
  // }, [isSuccessResRazorpayTransmode, razorpayTransmodeData]);

  //  useEffect(() => {
  //   if (isSuccessResApplicationPaymentCreateTrans && applicationPaymentCreateTransData) {
  //     let payment_details = {
  //       ...applicantData,
  //       totalAmount: tempBillingDetails.totalAmount,
  //       transactionId: applicationPaymentCreateTransData.TransId,
  //       origin: ""
  //     };
  //     localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
  //     // setOpenPaymentGateway2(true);
  //     dispatch(clearRazorpayPaymentGatewayState());
  //   }
  // }, [isSuccessResApplicationPaymentCreateTrans, applicationPaymentCreateTransData]);

  useEffect(() => {
    if (isSuccessResRazorpayAfterPayment && razorpayAfterPaymentData) {
      let payment_dtls = JSON.parse(localStorage.getItem("paymentDetails"));
      let new_obj = {
        ...payment_dtls,
        ...razorpayAfterPaymentData,
      };
      localStorage.setItem("paymentDetails", JSON.stringify(new_obj));
      dispatch(clearRazorpayAfterPaymentStates());
      updateStepperUI();
    }
  }, [isSuccessResRazorpayAfterPayment, razorpayAfterPaymentData]);

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 4) {
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

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(clearSuperStepperEditVars());
      let payment_dtls = JSON.parse(localStorage.getItem("paymentDetails"));
      let check_loan_details = localStorage.getItem("paymentDetails");
      // console.log("ForLoop -----------------------------", payment_dtls);
      // console.log(dataApplicationPaymentSummry, "dataApplicationPaymentSummry");
      // console.log(check_loan_details, "check_loan_details ------");

      if (payment_dtls?.ApplicationDetails.length > 0) {
        payment_dtls?.ApplicationDetails.forEach((element) => {
          if (element?.ApplicationStatus == 0) {
            const requestData = {
              Title: element?.projectname,
              // Location: Bamandongri,
              ReservationId: payment_dtls?.RservationCatIds,
              ApplicationId: element?.ApplicationId,
              ApplicationFormPercentage: "100",
              PaymentStatus: "1",
              PaymentDate: element?.CreatedAt,
              TransactionReferenceNo: payment_dtls?.transactionId,
              AmountPaid: dataApplicationPaymentSummry?.GrandTotal,
              ApplicationStatus: "1",
              Opportunitysource: "Website",
              // ReferralCode: "",
              // IsEMDHoldForNextScheme - 1 / 0
              EMDAmount: dataApplicationPaymentSummry.TotalEMDAmount,
              ApplicationType: payment_dtls?.is_pmy == 1 ? "PMAY" : "NON-PMAY",
              // IsEMDloanApplied - 1 / 0
              // LoanAppliedBank - HDFC bank
              // VirtualAccountNumber - 1112220000399478
              // ChallanNumber - ECL623ADAE8BF8CA
              // Loanprocessingfeepaidonlie - 1 / 0 (offline = 0, online=1)
              // Loanprocessingfeeamount - 708 (Application Fee + GST)
              // EMDLoanApproved - 1 / 0 (EMD YES = 1, NO =0)
              IsCancellationRequestRaised: "0",
              CancellationRequestStatus: "0",
              CancellationType: "",
              // Agentcode - 1526
              // AgentFirstName - Amit
              ApplicantId: payment_dtls?.ApplicantId,
            };
          }
        });
      }
      history.push("/payment-successful");
    }
  }, [dispatch, history, isSuccessReqStepper]);

  // useEffect(() => {
  // if (isSuccessResApplicant) {
  //   if (
  //     applicantData.FirstName &&
  //     applicantData.City &&
  //     applicantData.PresentDistrict &&
  //     applicantData.PresentState &&
  //     applicantData.Pincode &&
  //     applicantData.MobileNo &&
  //     applicantData.EmailId
  //   ) {
  //     console.log(
  //       applicantData.FirstName,
  //       applicantData.City,
  //       applicantData.PresentDistrict,
  //       applicantData.PresentState,
  //       applicantData.Pincode,
  //       applicantData.MobileNo,
  //       applicantData.EmailId
  //     );
  //     // setOpenPaymentGateway(true);
  //   }
  // }
  // }, [isSuccessResApplicant, applicantData]);

  /* const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  };
  
  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "razorpay") {
      history.push("/dashboard");
      setSelectedValue(null);
    }
  };
  
  const goPreviousPage = () => {
    history.push("/submit-documents");
  }; */

  useEffect(() => {
    if (isSuccessApplicationPaymentResSbiTransmode) {
      // dispatch(clearApplicationPaymentSbiTransmodeStates)
      setPaymentGateway(applicationPaymentsbiTransmodeData);
      setInProcessTrans(true);
      setTimeout(() => {
        document.forms["redirect"].submit();
      }, [1000]);

    }
  }, [isSuccessApplicationPaymentResSbiTransmode]);

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    // dispatch(clearApplicantState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

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
  
  const [skipDialogOpen, setSkipDialogOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  };

  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if(value === 'yes') {
      const formik = formikRef.current;
      formik.handleSubmit();
      // formik.dispatchEvent(
      //   new Event("submit", { cancelable: true, bubbles: true })
      // );
    }
  };

  return (
    <>
      {(isFetchingApplicantGet ||
        isFetchingStepper ||
        isFetchingApplicationPaymentCreateTrans ||
        isFetchingRazorpayTransmode ||
        isFetchingApplicationPaymentSbiTransmode || inProcessTrans) && (
        <Loading
          isOpen={
            isFetchingApplicantGet ||
            isFetchingStepper ||
            isFetchingApplicationPaymentCreateTrans ||
            isFetchingRazorpayTransmode ||
            isFetchingApplicationPaymentSbiTransmode || inProcessTrans
          }
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, values }) => (
          <Form noValidate autoComplete="off" className={classes.formContainer}>
            <FormCard>
              <Hidden smDown>
                <FormTitleBox
                  title={t("tittle2")}
                  backUrl="/upload-documents"
                  titleIcon={<MakePaymentIcon fontSize="large" />}
                />
              </Hidden>
              <Hidden mdUp>
                <StepperBar
                  callingForMobileIs={true}
                  title={t("tittle2")}
                  backUrl="/upload-documents"
                />
              </Hidden>
              <div className={classes.container} style={{ padding: 0 }}>
                {/* <div className={classes.EMDSection}>
                <div className={classes.EMDHeader}>
                  <IconTitle
                    icon={<BillingIcon />}
                    title={t("applyLoanYesNoSection.earnestMoneyDepTitle")}
                  />
                  <Typography className={classes.EMDDesc}>{t("applyLoanYesNoSection.earnestMoneyDepDesc")}</Typography>
                </div>
              </div> */}
                
                {/* {isErrorRazorpayTransmode && (
                  <AlertBox severity="error">{errorMsgRazorpayTransmode}</AlertBox>
                )} */}
                {/* {isErrorRazorpayAfterPayment && (
                  <AlertBox severity="error">{errorMsgRazorpayAfterPayment}</AlertBox>
                )} */}
                {isErrorBanklist && (
                  <AlertBox severity="error">{errorMsgBanklist}</AlertBox>
                )}

                <div className={classes.formSection}>
                  {/* <Typography className={classes.secTitle}>
                    {t("selectPaymentTypeSection.paymentSummary.applicationTxt")} {t("applyLoanYesNoSection.paymentSummary.title")}
                  </Typography> */}
                  <Box className={classes.paymentSummSec}>
                    <Grid
                      container
                      justify="space-between"
                      className={classes.amountListBox}
                    >
                      <Grid item xs="auto">
                        <Typography className={classes.amountLabel}>
                          {t("billingDetails.tableHeaders.head1")}
                        </Typography>
                        {/* <Typography className={classes.amountSubLabel}>
                          (
                          {t(
                            "applyLoanYesNoSection.paymentSummary.nonRefundableTxt"
                          )}
                          )
                        </Typography> */}
                      </Grid>
                      <Grid item xs="auto">
                        <Typography className={classes.amountBox}>
                          ₹ {numberWithCommas(tempBillingDetails.totalAmount)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justify="space-between"
                      className={classes.amountListBox}
                    >
                      <Grid item xs="auto">
                        <Typography className={classes.amountLabel}>
                        {t("billingDetails.tableHeaders.head9")}&nbsp;({tempBillingDetails.totalGstPercent}%)
                        </Typography>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography className={classes.amountBox}>
                          ₹ {numberWithCommas(tempBillingDetails.totalGst)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justify="space-between"
                      className={classes.amountListBox}
                    >
                      <Grid item xs="auto">
                        <Typography className={`${classes.amountLabel} grtl`}>
                          {t(
                            "applyLoanYesNoSection.paymentSummary.grandTotalTxt"
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography className={`${classes.amountBox} grtl`}>
                          ₹ {numberWithCommas(tempBillingDetails.totalIncludingGst)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
                <Box className={classes.noteTxtSection}>
                  <Typography style={{fontWeight: "700"}}>
                    <span>{t("billingDetails.note.label")}</span>{t("billingDetails.note.content")}
                  </Typography>
                </Box>
                <Grid item xs={12} md className={classes.checkboxSection}>
                  <MUIform component="fieldset" error={!isConfirmCheckbox}>
                    <FormControlLabel
                      name="isPuccaHouse"
                      checked={isConfirmCheckbox}
                      onChange={updateConfirmCheckbox}
                      control={<Checkbox color="primary" />}
                      label={t("billingDetails.acknowledgeContent")}
                      labelPlacement="end"
                    />
                  </MUIform>
                </Grid>
              </div>
              {isErrorApplicant && (
                  <AlertBox severity="error">{errorMessage}</AlertBox>
                )}
                {isErrorApplicationPaymentCreateTrans && (
                  <AlertBox severity="error">
                    {errorMsgApplicationPaymentCreateTrans}
                  </AlertBox>
                )}
                {isErrorApplicationPaymentSbiTransmode && (
                  <AlertBox severity="error">
                    {errorMsgApplicationPaymentSbiTransmode}
                  </AlertBox>
                )}
              <div className={classes.actionSection}>
                <Grid container alignItems="center" justify="flex-end">
                  <Grid item xs="auto">
                    {isFetchingApplicant && (
                      <Box>
                        <Typography className={classes.progressView}>
                          {t("savingLoaderTxt")}...
                        </Typography>
                      </Box>
                    )}
                    <Box>
                      {isPaymentDone && <Typography className={classes.paymentTxt}>
                      {t("billingDetails.paymentAlertMsg")}
                      </Typography>}
                    </Box>
                  </Grid>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={
                        <WhiteArrowIcon style={{ fill: "transparent" }} />
                      }
                      onClick={handleOnSkip}
                      disabled={!isConfirmCheckbox || isFetchingApplicationPaymentSbiTransmode || inProcessTrans || isPaymentDone}
                    >
                      {t("makePaymentBtn")}
                    </Button>
                    {/* {t("saveButtonText")} */}
                  </Grid>
                </Grid>
              </div>
            </FormCard>
          </Form>
        )}
      </Formik>
      <MakePaymentDialogBox
        title={t("dialogTitle")}
        description={t("dialogDesc")}
        acceptBtn={t("billingDetails.emdInfoModal.acceptBtn")}
        declineBtn={t("billingDetails.emdInfoModal.declineBtn")}
        selectedValue={selectedValue}
        open={skipDialogOpen}
        onClose={handleCloseSkipDialog}
      />
      <form method="post" name="redirect" action={paymentGateway.sbi_form_url}>
        <input
          type="hidden"
          name="EncryptTrans"
          value={paymentGateway.sbi_EncryptTrans}
        />
        <input
          type="hidden"
          name="merchIdVal"
          value={paymentGateway.sbi_merchant_id}
        />
      </form>
      {/* {isOpenPaymentGateway1 && (
        <CcavenuePaymentGateway
          totalBill={currentTotalBill}
          applicantDetails={applicantData}
        />
      )} */}
      {isOpenPaymentGateway2 && (
        <RazorpayPaymentGateway
          setOpenPaymentGateway2={setOpenPaymentGateway2}
        />
      )}
    </>
  );
};

export default withWidth()(ApplicationFeeView);
