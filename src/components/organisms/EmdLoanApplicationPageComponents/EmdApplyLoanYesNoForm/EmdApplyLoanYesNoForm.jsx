import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { CardMedia, FormControlLabel, InputAdornment, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import Radiogroup from "@material-ui/core/RadioGroup";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "../../../molecules/FormControl/FormControl";
import { EmdLoanFormStyles } from "../EmdLoanForm.styles";
import SbiPayIcon from "../../../../assets/paymentModeIcons/sbiPay.jpeg";
import RazorpayIcon from "../../../../assets/paymentModeIcons/razorPay.jpeg";
import {
  MakePaymentIcon,
  WhiteArrowIcon,
  ProjectSearchIcon,
  BillingIcon,
  LoanAppliedIcon,
  InfoMarkIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import withWidth from "@material-ui/core/withWidth";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Divider from "@material-ui/core/Divider";
import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import EmdConfirmDialogBox from "../../../molecules/DialogBoxes/EmdConfirmDialogBox/EmdConfirmDialogBox";
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
  getPaymentSummery,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import { withStyles } from '@material-ui/core/styles';
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../redux/features/stepper/StepperSlice";
/* import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice"; */
import {
  razorpayCreateTrans,
  razorpayPaymentGatewaySelector,
  clearRazorpayPaymentGatewayState,
  clearRazorpayAfterPaymentStates,
  razorpayTransmode,
  clearRazorpayTransmodeStates,
  clearRazorpayPaymentGatewayData,
  clearRazorpayCreateTransState,
  sbiTransmode
} from "../../../../redux/features/transaction/RazorpayPaymentSlice";
import CcavenuePaymentGateway from "../CcavenuePaymentGateway/CcavenuePaymentGateway";
import RazorpayPaymentGateway from "../RazorpayPaymentGateway/RazorpayPaymentGateway";
import Loading from "../../../atoms/Loading/Loading";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import Tooltip from '@material-ui/core/Tooltip';

import hdfcLogo from "../../../../assets/bankIcons/hdfc-logo.png";
import hsbcLogo from "../../../../assets/bankIcons/hsbc-logo.png";
import iciciLogo from "../../../../assets/bankIcons/icici-logo.png";
import kotakLogo from "../../../../assets/bankIcons/kotak-logo.png";

import axios from "axios";
import { preferencesSelector, getBookingEndTime, cancelBooking, clearBookingState } from "../../../../redux/features/preferences/PreferencesSlice";

const EmdApplyLoanYesNoForm = (props) => {
  const { width } = props;
  const classes = EmdLoanFormStyles();
  const { t } = useTranslation("BankDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
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
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [inProcessTrans, setInProcessTrans] = useState(false);
  const [banksList, setBanksList] = useState([]);
  const [banksListCopy, setBanksListCopy] = useState([])
  const [userBankName, setUserBankName] = useState("");
  const [userSavedBankName, setUserSavedBankName] = useState("");
  const bankformRef = useRef();

  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    isErrorApplicant,
    isFetchingApplicantGet,
    errorMessage,
    applicantData
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

    isFetchingPaymentSummry,
    isErrorPaymentSummry,
    errorMsgPaymentSummry,
    isSuccessPaymentSummry,
    dataPaymentSummry,
    isErrorScheme,
  } = useSelector(masterDataSelector);
  const {
    isFetchingRazorpayCreateTrans,
    isSuccessResRazorpayCreateTrans,
    isErrorRazorpayCreateTrans,
    errorMsgRazorpayCreateTrans,
    razorpayCreateTransData,

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

    isFetchingSbiTransmode,
    isSuccessResSbiTransmode,
    sbiTransmodeData
  } = useSelector(razorpayPaymentGatewaySelector);
  // const { isEStampSelected } = useSelector(documentsSelector);
  const [tempBillingDetails, setTempBillingDetails] = useState({});
  const [paymentGateway, setPaymentGateway] = useState({});
  const [isPmay, setIsPmay] = useState();
  // const [bankDetailsList, setBankDetailsList] = useState([]);
  
  const [canGenerateChallan, setCanGenerateChallan] = useState('yes');
  const { bookingEndTime, isSuccessBookingEndTime, isErrorBookingEndTime } = useSelector(preferencesSelector);
  const [challanMinRemaining, setChallanMinRemaining] = useState(0);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getPaymentSummery());
    // dispatch(getBankList());
    // dispatch(getApplication());
    // dispatch(superStepperActiveStep(3));

    // let currentEnv = window.location.origin;
    // if (currentEnv == "http://localhost:3000" || currentEnv == "https://lotterydev.cidcohomes.com" || currentEnv == "https://lotteryuat.cidcohomes.com") {
    //   setApplyEMDLoanIs("razorpay")
    // } else {
    setApplyEMDLoanIs("sbi")
    // }
  }, [dispatch, t]);

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
    postalAddSameIs: ""
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
    if (isSuccessResApplicantGet && applicantData) {
      if (applicantData.is_pmy == 0) {
        setIsPmay(true)
      }
      else {
        setIsPmay(false)
      }
    }
  }, [applicantData, isSuccessResApplicantGet])

  useEffect(() => {
    if (isSuccessPaymentSummry && dataPaymentSummry) {
      if (applyEMDLoanIs === "sbi") {
        let new_obj = {
          appFeePlusGst: dataPaymentSummry.TotalApplicationFee,
          emdPlusGst: dataPaymentSummry.TotalEMDAmount,
          // // totalAmount: dataPaymentSummry.GrandTotal - dataPaymentSummry.TotalEMDAmount
          totalAmount: dataPaymentSummry.GrandTotal
        };
        setTempBillingDetails(new_obj);
      } else {
        let new_obj = {
          appFeePlusGst: dataPaymentSummry.TotalApplicationFee,
          emdPlusGst: dataPaymentSummry.TotalEMDAmount,
          totalAmount: dataPaymentSummry.GrandTotal
        };
        setTempBillingDetails(new_obj);
      }
    }
  }, [isSuccessPaymentSummry, dataPaymentSummry, applyEMDLoanIs]);

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      maxWidth: 454,
      color: '#65707D',
      fontSize: theme.typography.pxToRem(14),
      padding: 20,
      border: '1px solid #0038C0',
      boxShadow: '0px 4px 20px rgba(23, 33, 61, 0.06)',
      borderRadius: '8px',
    }
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
    setSubmitting(false);
    // history.push("/emd-loan-select-bank");
    //console.log('Inn hererer1');
    //return false;
    if (userSavedBankName != "") {
      const requestData = {
        interested_in_loan: userSavedBankName,
        Type: "InterestedInLoan",
        Lang: localStorage.getItem("i18nextLng"),
      };
      dispatch(editApplicant(requestData));
    }

    let transFor = "";
    if (applyEMDLoanIs === "sbi") {
      transFor = "Payment";
    } else if (applyEMDLoanIs === "razorpay") {
      transFor = "Payment";
    }
    let send_obj = {
      "ApplicantId": applicantData.ApplicantId,
      "Amount": tempBillingDetails.totalAmount,
      "TransFor": transFor,
      "interested_in_housing_loan": isHousingLoan
    };
    dispatch(razorpayCreateTrans(send_obj));
  };

  useEffect(() => {
    if (isSuccessResRazorpayCreateTrans && razorpayCreateTransData) {
      dispatch(clearRazorpayCreateTransState());
      if (applyEMDLoanIs === "sbi" || applyEMDLoanIs === "razorpay") {
        let new_obj = {
          ...tempBillingDetails,
          TransId: razorpayCreateTransData.TransId,
          "PaymentGateway": "sbi"
        };
        localStorage.setItem("paymentDetails", JSON.stringify(new_obj));

        if (applyEMDLoanIs === "razorpay") {
          let payment_details = {
            "ApplicantId": applicantData.ApplicantId,
            "TransId": razorpayCreateTransData.TransId,
            "TransMode": "online",
            "LoanAmount": tempBillingDetails.totalAmount,
            "PayableAmount": tempBillingDetails.totalAmount,
            "PaymentGateway": "razorpay"
          };
          localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
          history.push("/payment-details-view");
        } else {
          let sendObj = {
            "ApplicantId": applicantData.ApplicantId,
            "TransId": razorpayCreateTransData.TransId,
            // "BankId": paymentDetailsObj.BankId,
            "TransMode": "online",
            "LoanAmount": tempBillingDetails.emdPlusGst,
            "PayableAmount": tempBillingDetails?.totalAmount
          };

          dispatch(razorpayTransmode(sendObj));


          // let check_loan_details = localStorage.getItem("paymentDetails");
          // let bankDtls = JSON.parse(check_loan_details);

          // let sendObjNew = {
          //   "TransId": bankDtls.TransId,
          //   "applicant_id": localStorage.getItem("applicantId"),
          //   "origin": "EMD"
          // }
          // dispatch(sbiTransmode(sendObjNew));

        }
      }

    }
    // else {
    //   let payment_details = {
    //     "ApplicantId": applicantData.ApplicantId,
    //     "TransId": razorpayCreateTransData.TransId,
    //     "TransMode": "online",
    //     "LoanAmount": tempBillingDetails.totalAmount,
    //     "PayableAmount": tempBillingDetails.totalAmount
    //   };
    //   localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
    //   setOpenPaymentGateway2(true);
    //   dispatch(razorpayTransmode(payment_details));
    // }
  }, [isSuccessResRazorpayCreateTrans, razorpayCreateTransData]);

  useEffect(() => {
    if (isSuccessResRazorpayTransmode && razorpayTransmodeData) {
      let payment_details = {
        ...applicantData,
        totalAmount: tempBillingDetails.totalAmount,
        transactionId: razorpayTransmodeData.TransactionId,
        origin: razorpayTransmodeData.Origin
      };
      localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
      // setOpenPaymentGateway2(true);
      dispatch(clearRazorpayTransmodeStates());

      console.log("useEffect isSuccessResRazorpayTransmode");


      let check_loan_details = localStorage.getItem("paymentDetails");
      let bankDtls = JSON.parse(check_loan_details);
      let sendObjNew = {
        "TransId": bankDtls.transactionId,
        "applicant_id": localStorage.getItem("applicantId"),
        "origin": "EMD"
      }

      dispatch(sbiTransmode(sendObjNew));
    }
  }, [isSuccessResRazorpayTransmode, razorpayTransmodeData]);

  /* useEffect(() => {
    if (isSuccessResRazorpayCreateTrans && razorpayCreateTransData) {
      let payment_details = {
        ...applicantData,
        totalAmount: tempBillingDetails.totalAmount,
        transactionId: razorpayCreateTransData.TransId,
        origin: ""
      };
      localStorage.setItem("paymentDetails", JSON.stringify(payment_details));
      setOpenPaymentGateway2(true);
      dispatch(clearRazorpayPaymentGatewayState());
    }
  }, [isSuccessResRazorpayCreateTrans, razorpayCreateTransData]); */

  // useEffect(() => {
  //   if (isSuccessResRazorpayAfterPayment && razorpayAfterPaymentData) {
  //     let payment_dtls = JSON.parse(localStorage.getItem("paymentDetails"));
  //     let new_obj = {
  //       ...payment_dtls,
  //       ...razorpayAfterPaymentData
  //     };
  //     localStorage.setItem("paymentDetails", JSON.stringify(new_obj));
  //     dispatch(clearRazorpayAfterPaymentStates());
  //     updateStepperUI();
  //   }
  // }, [isSuccessResRazorpayAfterPayment, razorpayAfterPaymentData]);

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 4) {
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
    if (isSuccessReqStepper) {
      dispatch(clearSuperStepperEditVars());
      history.push("/payment-successful");
    }
  }, [dispatch, history, isSuccessReqStepper]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleOnSkip = (value) => {
    setSelectedValue(value);
    setConfirmDialogOpen(true);
  };
  
  const handleCloseSkipDialog = (value) => {
    setConfirmDialogOpen(false);
    setSelectedValue(value);
    if (value == "Yes") {
      formikRef.current.submitForm();
    }
  };
  
  /* const goPreviousPage = () => {
    history.push("/submit-documents");
  }; */

  useEffect(() => {
    if (isSuccessResSbiTransmode) {
      setPaymentGateway(sbiTransmodeData);
      setInProcessTrans(true);
      setTimeout(() => {
        document.forms["redirect"].submit();
      }, [1000])
    }
  }, [isSuccessResSbiTransmode])


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


  const emdConfirm = () => {
    console.log(bankformRef);
    setIsHousingLoan("1");
    setConfirmScheme(false);
    //bankformRef.current.formSubmit();
    setUserSavedBankName(userBankName);
    // const requestData = {
    //   interested_in_loan: userBankName,
    //   Type: "InterestedInLoan",
    //   Lang: localStorage.getItem("i18nextLng"),
    // };
    // dispatch(editApplicant(requestData));
  }

  useEffect(
    () => {
      axios
        .get(
          `https://cidcohomes.com/wp-json/wp/v2/categories?lang=en&category=2&banking_partners=1&restapi=1`
        )
        .then((res) => {
          var data = res?.data;
          if (data) {
            var status = data?.status;
            if (status === '200') {
              let result = Object.values(data?.banks).map(obj => obj);
              setBanksList(result);
              setBanksListCopy(result);
            }
          }
        });
    }, []
  );

  const assignSelectedBank = (bankid) => {
    setUserBankName(bankid);
  }

  const initialBankValues = {
    bankradio: ""
  };

  const onBankForSubmit = (values, { setSubmitting }) => {
    //e.preventDefault();
    // var formData = new FormData(e.target);
    // const form_values = Object.fromEntries(formData);
    return false;
  }

  // const clearSearch = () => {
  //   formikRef.current.setFieldValue("searchedBank", "");
  //   setAllFaqList(allFaqListCopy);
  // }
  const handleSearch = (allbanksList, data) => (
    allbanksList.filter((obj) => (
      Object.values(obj)
        .flat()
        .some((v) => (
          `${v}`.toLowerCase().includes(`${data}`.toLowerCase())
        ))
    ))
  );
  const clearSearch = () => {
    formikRef.current.setFieldValue("searchedBank", "");
    setBanksList(banksListCopy);
  }

  const onBankSearch = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
    const result = handleSearch(banksList, values.searchedBank == "" ? "" : values.searchedBank);
    if (result.length != 0) {
      setBanksList(handleSearch(banksList, values.searchedBank));
    }
  }; 
  
  // useEffect(() => {
  //   console.log('--in canGenerateChallan--',canGenerateChallan);
  //   if (canGenerateChallan && canGenerateChallan == 'no' ) {
  //      alert(canGenerateChallan);
  //     //setCanGenerateChallan(bookingEndTime.Applicant_Booking_Status[0].canGenerateChallan);
  //   }
  // }, [canGenerateChallan]);

  // useEffect(() => {
  //   if (isSuccessBookingEndTime) {
  //     console.log('--in isSuccessBookingEndTime--',bookingEndTime.Applicant_Booking_Status[0].canGenerateChallan);
  //     setCanGenerateChallan(bookingEndTime.Applicant_Booking_Status[0].canGenerateChallan);
  //   }
  // }, [isSuccessBookingEndTime]);

  const getEndChallanTimer = () => {
    let jsonObj = {
      "ApplicantId": localStorage.getItem("applicantId")
    }
    dispatch(getBookingEndTime(jsonObj)).then((resp) => {      
      var resp_payload = resp?.payload;
      if (resp_payload !== undefined) {
        if (resp_payload.hasOwnProperty("data")) {
          if (resp_payload?.success) {
            var resp_data = resp_payload?.data;
            var canGenerateChallan = resp_data?.Applicant_Booking_Status[0]?.canGenerateChallan;
            var minRemain          = resp_data?.Applicant_Booking_Status[0]?.minRemain;
            if(+minRemain > 0) {
              if(+minRemain > 60) {
                minRemain = parseInt(minRemain / 60) + ' Hours';
              } else {
                minRemain = minRemain + " Minutes";
              }
            }
            if(canGenerateChallan == 'no') {
              setChallanMinRemaining(minRemain);
              setConfirmDialogOpen(true);
            } else {
              formikRef.current.submitForm();
            }
          }
        }
      }
    });
  }

  const challanConfirmation = () => {
    getEndChallanTimer();
  }

  return (
    <>
      {(isFetchingApplicantGet || isFetchingStepper || isFetchingRazorpayCreateTrans || isFetchingRazorpayTransmode || isFetchingSbiTransmode || inProcessTrans) && (
        <Loading isOpen={isFetchingApplicantGet || isFetchingStepper || isFetchingRazorpayCreateTrans || isFetchingRazorpayTransmode || isFetchingSbiTransmode || inProcessTrans} />
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
                  title={t("title")}
                  backUrl="/make-payments"
                  titleIcon={<MakePaymentIcon fontSize="large" />}
                />
              </Hidden>
              <Hidden mdUp>
                <StepperBar
                  callingForMobileIs={true}
                  title={t("title")}
                  backUrl="/make-payments"
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
                {isErrorApplicant && (
                  <AlertBox severity="error">{errorMessage}</AlertBox>
                )}
                {isErrorRazorpayCreateTrans && (
                  <AlertBox severity="error">{errorMsgRazorpayCreateTrans}</AlertBox>
                )}
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
                  {/* <Typography className={classes.secTitle}>{t("applyLoanYesNoSection.paymentSummary.title")}</Typography> */}
                  <Box className={classes.paymentSummSec}>
                    <Grid
                      container
                      justify="space-between"
                      className={classes.amountListBox}
                    >
                      <Grid item xs="auto">
                        <Typography className={classes.amountLabel}>{t("billingDetails.tableHeaders.head6")}</Typography>
                        {/* <Typography className={classes.amountSubLabel}>({t("applyLoanYesNoSection.paymentSummary.nonRefundableTxt")})</Typography> */}
                      </Grid>
                      <Grid item xs="auto">
                        <Typography className={classes.amountBox}>₹ {numberWithCommas(tempBillingDetails.emdPlusGst)}</Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justify="space-between"
                      className={classes.amountListBox}
                    >
                      <Grid item xs="auto">
                        <Typography className={classes.amountLabel}>{t("billingDetails.tableHeaders.head8")}</Typography>
                        {/* <Typography className={classes.amountSubLabel}>({t("applyLoanYesNoSection.paymentSummary.nonRefundableTxt")})</Typography> */}
                      </Grid>
                      <Grid item xs="auto">
                        <Typography className={classes.amountBox}>₹ {numberWithCommas(tempBillingDetails.appFeePlusGst)}</Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid
                      container
                      justify="space-between"
                    >
                      <Grid item xs="auto">
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography className={classes.amountLabel}>{t("applyLoanYesNoSection.paymentSummary.totalEmdAmtTxt")}</Typography>
                            <Typography className={classes.amountSubLabel}>{t("applyLoanYesNoSection.paymentSummary.emdPlsGstTxt")}</Typography>
                          </Grid>
                          <Hidden smDown>
                            <Grid item>
                              {applyEMDLoanIs === "sbi" &&
                                <Box className={classes.appliedTextBox}><LoanAppliedIcon />{t("applyLoanYesNoSection.paymentSummary.loanAppliedTxt")}</Box>
                              }
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography className={`${classes.amountBox} ${applyEMDLoanIs === "sbi" ? "cancel" : ""}`}>₹ {numberWithCommas(tempBillingDetails.emdPlusGst)}</Typography>
                      </Grid>
                    </Grid> */}
                    {/* <Grid
                      container
                      justify="space-between"
                      className={classes.amountListBox}
                    >
                      <Hidden mdUp>
                        <Grid item xs="auto">
                          {applyEMDLoanIs === "sbi" &&
                            <Box className={classes.appliedTextBox}><LoanAppliedIcon />{t("applyLoanYesNoSection.paymentSummary.loanAppliedTxt")}</Box>
                          }
                        </Grid>
                      </Hidden>
                    </Grid> */}
                    <Grid
                      container
                      justify="space-between"
                      className={classes.amountListBox}
                    >
                      <Grid item xs="auto">
                        <Typography className={`${classes.amountLabel} grtl`}>{t("applyLoanYesNoSection.paymentSummary.grandTotalTxt")}</Typography>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography className={`${classes.amountBox} grtl`}>₹ {numberWithCommas(tempBillingDetails.totalAmount)}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </div>

                {/* <div className={classes.checkboxSection}>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={6}>
                      //  <Typography className={classes.applyEmdTxt}>{t("applyLoanYesNoSection.applyLoanYesNo")}</Typography> 
                      <Typography className={classes.applyEmdTxt}>{t("applyLoanYesNoSection.paymentOptionTxt")}</Typography>
                      <div
                        className={classes.EMDBenefitInfo}
                        onClick={handleClickOpen}
                      >
                        //  <Typography className="label">{t("benefitsOfApplyingLoan.title")}</Typography> 
                        //  <InfoMarkIcon className="EMDIcon" /> 
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Radiogroup
                        row
                        aria-label="postalAddSameIs"
                        name="postalAddSameIs"
                        className={classes.yesOrNoRadioGroup}
                        value={applyEMDLoanIs}
                        onChange={applyLoanCheckChangehandle}
                        style={{ justifyContent: "space-around", marginRight: "30px" }}
                      >
                        <FormControlLabel
                          value="sbi"
                          control={
                            <Radio
                              color="primary"
                              checked={
                                applyEMDLoanIs === "sbi" ? true : false
                              }
                            />
                          }
                          label={<img src={SbiPayIcon} alt="Sbi" width="80" />}
                          labelPlacement="end"
                          className={`${classes.yesOrNoCheckBox} ${applyEMDLoanIs === "sbi" ? "active" : ""
                            }`}
                        />
                        <FormControlLabel
                          value="razorpay"
                          disabled
                          control={
                            <Radio
                              color="primary"
                              checked={applyEMDLoanIs === "razorpay" ? true : false}
                            />
                          }
                          label={<img src={RazorpayIcon} alt="Razor-Pay" width="80" />}
                          labelPlacement="end"
                          className={`${classes.yesOrNoCheckBox} ${applyEMDLoanIs === "razorpay" ? "active" : ""
                            }`}
                        />
                      </Radiogroup>
                    </Grid>
                  </Grid>
                </div> */}

                <div className={classes.checkboxSection}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography className={classes.holdEmdTxt}>{t("applyLoanYesNoSection.housingLoan")} ?
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography color="primary" className={classes.headertxt}>
                                {!isPmay ? t("applyLoanYesNoSection.nocDialogHeading") : t("applyLoanYesNoSection.nocDialogHeadingPMAY")}
                              </Typography>
                              <Typography variant="body1" style={{ color: "black" }}>
                                <ul>
                                  <li>{t("applyLoanYesNoSection.nocDialogPoint1")}</li>
                                  <li>{t("applyLoanYesNoSection.nocDialogPoint2")}</li>
                                </ul>
                              </Typography>
                            </React.Fragment>
                          }
                        >
                          <span className={classes.emdMoreTxt}>
                            {t("applyLoanYesNoSection.readmoreTxt")}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.1111 16.4444H12.8889V11.1111H11.1111V16.4444ZM12 7.55556C11.5556 7.55556 11.1111 8 11.1111 8.44444C11.1111 8.88889 11.5556 9.33333 12 9.33333C12.4444 9.33333 12.8889 8.88889 12.8889 8.44444C12.8889 8 12.4444 7.55556 12 7.55556ZM12 4C7.55556 4 4 7.55556 4 12C4 16.4444 7.55556 20 12 20C16.4444 20 20 16.4444 20 12C20 7.55556 16.4444 4 12 4ZM12 18.2222C8.53333 18.2222 5.77778 15.4667 5.77778 12C5.77778 8.53333 8.53333 5.77778 12 5.77778C15.4667 5.77778 18.2222 8.53333 18.2222 12C18.2222 15.4667 15.4667 18.2222 12 18.2222Z" fill="url(#paint0_linear_6059_23991)" />
                              <defs>
                                <linearGradient id="paint0_linear_6059_23991" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                                  <stop offset="0.201042" stopColor="#0038C0" />
                                  <stop offset="0.878125" stopColor="#006FD5" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </span>
                        </HtmlTooltip>
                      </Typography>
                      <div
                        className={classes.EMDBenefitInfo}
                        onClick={handleClickOpen}
                      >
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Radiogroup
                        row
                        aria-label="housingLoan"
                        name="housingLoan"
                        className={classes.yesOrNoRadioGroup}
                        value={isHousingLoan}
                        onChange={(event) => {
                          if (event.target.value) {
                            setIsHousingLoan(event.target.value);
                            if (event.target.value == "1") {
                              setBanksList(banksListCopy);
                              setConfirmScheme(true);
                            }
                          }
                        }}
                      >
                        <FormControlLabel
                          value="1"
                          control={
                            <Radio
                              color="primary"
                              checked={
                                isHousingLoan == "1" ? true : false
                              }
                            />
                          }
                          label={t("applyLoanYesNoSection.loanYesTxt")}
                          labelPlacement="end"
                          className={`${classes.yesOrNoCheckBox} ${isHousingLoan == "1" ? "active" : ""
                            }`}
                          style={{ padding: "16px 24px" }}
                        />
                        <FormControlLabel
                          value="0"
                          control={
                            <Radio
                              color="primary"
                              checked={isHousingLoan == "0" ? true : false}
                            />
                          }
                          label={t("applyLoanYesNoSection.loanNoTxt")}
                          labelPlacement="end"
                          className={`${classes.yesOrNoCheckBox}  ${isHousingLoan == "0" ? "active" : ""
                            }`}
                          style={{ padding: "16px 24px" }}
                          onClick={() => { setUserSavedBankName(''); setUserBankName(''); }}
                        />
                      </Radiogroup>
                    </Grid>
                  </Grid>
                </div>
                {/* <div className={classes.EMDBenefit}>
                <div
                  className={classes.EMDBenefitInfo}
                  onClick={handleClickOpen}
                >
                  <IconTitle title={t("benefitsOfApplyingLoan.title")} />
                  <QuestionMarkIcon className="EMDIcon" />
                </div>
              </div> */}
                {userSavedBankName != "" ?
                  <div className={classes.checkboxSection}>{t("selectedBank")} : <Typography className={classes.emdMoreTxt}>{userSavedBankName}</Typography></div>
                  : ""
                }
              </div>
              <div className={classes.actionSection}>
                <Grid container alignItems="center" justify="flex-end">
                  <Grid item xs="auto">
                    {isFetchingApplicant &&
                      <Box>
                        <Typography className={classes.progressView}>
                          {t("savingLoaderTxt")}...
                        </Typography>
                      </Box>
                    }
                  </Grid>
                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={
                        <WhiteArrowIcon style={{ fill: "transparent" }} />
                      }
                      // onClick={submitForm}
                      onClick={challanConfirmation}
                      disabled={isErrorScheme == false && (applyEMDLoanIs == "sbi" || applyEMDLoanIs == "razorpay") && (isHousingLoan == "1" || isHousingLoan == "0") ? false : true || inProcessTrans}
                    >
                      {t("makePaymentBtn")}
                    </Button>
                    {/* {t("saveButtonText")} */}
                  </Grid>
                </Grid>
              </div>
            </FormCard>
            {/* <Box
              marginY={width === "xs" ? 1 : 4}
              paddingY={width === "xs" ? 2 : 0}
              paddingX={2}
            >
              <Grid
                container
                spacing={2}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Hidden only="xs">
                  <Grid item xs={12} sm={2} md={2} lg={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<NavigateBeforeIcon />}
                      fullWidth
                      onClick={goPreviousPage}
                    >
                      {t("bankForm.backButtonText")}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={4} lg={6}></Grid>
                </Hidden>
                <Grid item xs={12} sm={3} md={3} lg={2}>
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => handleOnSkip("openDialog")}
                  >
                    {t("bankForm.completeLaterButtonText")}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                    fullWidth
                    onClick={submitForm}
                  >
                    {t("bankForm.saveButtonText")} ₹
                    {numberWithCommas(currentTotalBill)}
                  </Button>
                </Grid>
              </Grid>
            </Box> */}
          </Form>
        )}
      </Formik>
      <EmdConfirmDialogBox
        title={t("emdconfirmDialog.title")}
        description={challanMinRemaining}
        question={''}
        selectedValue={selectedValue}
        open={confirmDialogOpen}
        onClose={handleCloseSkipDialog}
      />
      <form
        method="post"
        name="redirect"
        action={paymentGateway.sbi_form_url}
      >
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

      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialogBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.dialogTitle}>
          {t("benefitsOfApplyingLoan.title")}
        </DialogTitle>
        <DialogContent>
          <ul className={classes.dialogBoxContent}>
            <li>{t("benefitsOfApplyingLoan.infoTxt0")}</li>
            <li>{t("benefitsOfApplyingLoan.infoTxt1")}</li>
            <li>{t("benefitsOfApplyingLoan.infoTxt2")}</li>
            <li>{t("benefitsOfApplyingLoan.infoTxt3")}</li>
            <li>{t("benefitsOfApplyingLoan.infoTxt4")}</li>
            <li>{t("benefitsOfApplyingLoan.infoTxt5")}</li>
            <li>{t("benefitsOfApplyingLoan.infoTxt6")}</li>
          </ul>
        </DialogContent>
      </Dialog>


      <Dialog maxWidth={maxWidth} open={confirmScheme} aria-labelledby="pmay-dialog">
        <DialogTitle id="pmay-dialog" style={{ paddingBottom: '0px', borderBottom: "1.5px solid rgb(5 103 249 / 24%)", background: "#F5FAFD" }}>
          {t("applyLoanYesNoSection.housingLoanDialog")}
          <br />
          <span style={{ fontSize: "16px", width: "100%", textAlign: "center" }}>{t("applyLoanYesNoSection.housingLoansubDialog1")}</span>
          <br />
          <span style={{ fontSize: "14px" }}>{t("applyLoanYesNoSection.housingLoansubDialog2")}</span>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '0px', overflowY: 'auto' }}>

          <Formik
            initialValues={{ searchedBank: "" }}
            onSubmit={onBankSearch}
            innerRef={formikRef}
            enableReinitialize
          >
            {({ submitForm }) => (
              <Form noValidate autoComplete="off">
                <FormControl
                  className={classes.globSearchInputBox}
                  control="input"
                  variant="outlined"
                  placeholder={t("billingDetails.emdInfoModal.searchBank")}
                  name="searchedBank"
                  type="text"
                  id="searchedBank"
                  inputProps={{ maxLength: 50 }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {formikRef.current?.values?.searchedBank?.length > 0 ?
                          (<InputAdornment position="end">
                            <IconButton className={classes.clearIcon}>
                              <ClearOutlinedIcon onClick={() => clearSearch()} />
                            </IconButton>
                          </InputAdornment>) : ""}

                        <InputAdornment position="end">
                          <IconButton
                            type="submit"
                            aria-label="Submit"
                            edge="end" className={classes.searchIcon}
                          >
                            <SearchOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                />
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={initialBankValues}
            onSubmit={onBankForSubmit}
            innerRef={bankformRef}
            enableReinitialize
          >
            {({ submitForm, setFieldValue, values }) => (
              <div>
                <Form noValidate autoComplete="off" className={classes.formContainer}>
                  {/* <DialogContentText> */}
                  {/* <strong style={{ color: "rgba(0, 0, 0, 0.87)" }}>{t("billingDetails.emdInfoModal.bodyText1")}</strong> {t("billingDetails.emdInfoModal.bodyText2")} */}
                  {/* <Typography>{t("applyLoanYesNoSection.housingLoanSummary")}</Typography> */}
                  {/* <Typography className="cardTitle">{t("billingDetails.emdInfoModal.bodyText3")}</Typography> */}
                  {/* </DialogContentText> */}
                  <Grid xs={12} container justifyContent="space-evenly" alignItems="center" style={{ padding: 5 }}>
                    {banksList.length > 0 && banksList.map((bank, bankkey) => (
                      <Grid sm={12} lg={5} container spacing={1} alignItems="center" style={{ marginBottom: '10px', border: '1.5px solid #808080ba', borderRadius: 5, height: '65px', paddingLeft: '10px', minWidth: 430 }} onClick={() => { document.getElementById("bank_" + bank?.id).click() }}>
                        <Grid item>
                          <input className={`${classes.yesOrNoCheckBox} ${userBankName == bank?.title ? "active" : ""}`}
                            type="radio"
                            name="bankradio"
                            id={"bank_" + bank?.id}
                            defaultValue={userBankName}
                            onClick={() => { assignSelectedBank(bank?.title) }}
                            style={{ height: '20px', width: '20px' }}
                            checked={userBankName === bank?.title ? true : false}
                          />
                        </Grid>
                        <Grid item>
                          <label htmlFor="bankradio">
                            <img
                              layout="responsive"
                              width={"100px"}
                              height={"40px"}
                              src={bank?.featured_image}
                              style={{ position: 'relative', top: '2px' }}
                              onClick={() => { document.getElementById("bank_" + bank?.id).click() }}
                              alt='bank img'
                            />
                          </label>
                        </Grid>
                        <Grid item>
                          <label htmlFor="bankradio" onClick={() => { document.getElementById("bank_" + bank?.id).click() }}>{bank?.title}</label>
                        </Grid>
                      </Grid>
                    ))}
                    <br />
                  </Grid>
                </Form>
              </div>
            )}
          </Formik>
        </DialogContent>
        <DialogActions style={{ borderTop: "1.5px solid rgb(5 103 249 / 24%)", background: "#F5FAFD", padding: 5 }}>
          <Button variant="contained" disabled={userBankName != "" ? false : true} autoFocus color="primary" onClick={emdConfirm}>
            {t("billingDetails.emdInfoModal.saveBtnText")}
          </Button>
          <Button onClick={() => {
            setConfirmScheme(false);
            setIsHousingLoan("0");
            setUserSavedBankName('');
            setUserBankName('');
          }} color="primary" autoFocus>
            {t("billingDetails.emdInfoModal.cancelBtnText")}
          </Button>
        </DialogActions>
      </Dialog>
      {isOpenPaymentGateway1 && (
        <CcavenuePaymentGateway
          totalBill={currentTotalBill}
          applicantDetails={applicantData}
        />
      )}
      {isOpenPaymentGateway2 && (
        <RazorpayPaymentGateway
          setOpenPaymentGateway2={setOpenPaymentGateway2} />
      )}
    </>
  );
};

export default withWidth()(EmdApplyLoanYesNoForm);
