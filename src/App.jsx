import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from "@material-ui/core/Link";
import LoginPage from "./components/pages/InitialPages/LogInPage";
import LogInWithOtpPage from "./components/pages/InitialPages/LogInWithOtpPage";
import ForgotPasswordPage from "./components/pages/InitialPages/ForgotPasswordPage";
import SignUpPage from "./components/pages/InitialPages/SignUpPage";
import SignUpSuccessPage from "./components/pages/InitialPages/SignUpSuccessPage";
import NewPasswordPage from "./components/pages/InitialPages/NewPasswordPage";
// import VerifyAadhaarPage from "./components/pages/InitialPages/VerifyAadhaarPage";
import AuthBridVerifyAadhaarPage from "./components/pages/InitialPages/AuthBridVerifyAadhaarPage";
// Pan verify
import VerifyPanCardPage from "./components/pages/InitialPages/VerifyPanCardPage";
import TermsConditionsPage from "./components/pages/InitialPages/TermsConditionsPage";
import PmayInfo from "./components/pages/InitialPages/PmayInfoPage";
import NonPmayInfo from "./components/organisms/InitialPagesComponents/SchemeInfo/NonPmayInfo";
import PersonalDetailsPage from "./components/pages/PersonalDetailsPage/PersonalDetailsPage";
//
import CoApplicantBenefitsPage from "./components/pages/CoApplicantBenefitsPage/CoApplicantBenefitsPage";
import AddCoApplicantDetailsPage from "./components/pages/AddCoApplicantDetailsPage/AddCoApplicantDetailsPage";
import CoApplicantVerifyAadhaarPage from "./components/pages/InitialPages/CoApplicantVerifyAadhaarPage";
// import CoApplicantUploadAadhaarPage from "./components/pages/InitialPages/CoApplicantUploadAadhaarPage";
import CoApplicantVerifyPanCardPage from "./components/pages/InitialPages/CoApplicantVerifyPanCardPage";
// import CoApplicantUploadPanCardPage from "./components/pages/InitialPages/CoApplicantUploadPanCardPage";
//
import ContactDetailsPage from "./components/pages/ContactDetailsPage/ContactDetailsPage";
import FamilyDetailsPage from "./components/pages/FamilyDetailsPage/FamilyDetailsPage";
import CategoryDetailsPage from "./components/pages/CategoryDetailsPage/CategoryDetailsPage";
// import SelectFlatPreferencesPage from "./components/pages/SelectFlatPreferencesPage/SelectFlatPreferencesPage";
import SelectProjectsPage from "./components/pages/SelectProjectsPage/SelectProjectsPage";
import ProjectDetailsPage from "./components/pages/ProjectDetailsPage/ProjectDetailsPage";
import MakePaymentsPage from "./components/pages/MakePaymentsPage/MakePaymentsPage";
import EmdLoanApplicationPage from "./components/pages/EmdLoanApplicationPage/EmdLoanApplicationPage";
// import PaymentSki from "./components/pages/MakePaymentsPage/PaymentSkipPage";
import EmdLoanBankSelectPage from "./components/pages/EmdLoanApplicationPage/EmdLoanBankSelectPage";
import EmdLoanLoanDetailsPage from "./components/pages/EmdLoanApplicationPage/EmdLoanLoanDetailsPage";
import EmdDetailsPage from "./components/pages/EmdLoanApplicationPage/EmdDetailsPage";
// import EchallanPage from "./components/pages/EchallanPage/EchallanPage";
import PaymentSuccessfulPage from "./components/pages/PaymentSuccessfulPage/PaymentSuccessfulPage";
import DashboardPage from "./components/pages/DashboardPages/DashboardPage/DashboardPage";
// import ViewAllNotificationsPages from "./components/pages/ViewAllNotificationsPages/ViewAllNotificationsPages";
// import ApplicationDetailsPage from "./components/pages/ApplicationDetailsPage/ApplicationDetailsPage";
// import ApplicationOverviewPage from "./components/pages/AgentApplicationOverviewPage/AgentApplicationOverviewPage";

import { useDispatch } from "react-redux";
import {
  getReservationCategories,
  clearMasterDataList,
} from "./redux/features/masterdata/MasterDataSlice";
import { clearApplicantData, clearApplicantState } from "./redux/features/applicant/ApplicantSlice";
import { clearFamilyData, clearFamilyState } from "./redux/features/applicant/ApplicantFamilyInfoSlice";
import { clearSuperStepperEditVars } from "./redux/features/stepper/StepperSlice";
import { clearAuthState } from "./redux/features/applicant/ApplicantAuthSlice";
import MyProfilePage from "./components/pages/ProfilePages/MyProfilePage";
// import SchedulerPage from "./components/pages/SchedulerPages/SchedulerPage";
// import SelectSlotPage from "./components/pages/SchedulerPages/SelectSlotPage";
// import AppointmentSuccessfullPage from "./components/pages/SchedulerPages/AppointmentSuccessfull";
// import ReschedulefullPage from "./components/pages/SchedulerPages/ReschedulefullPage";
import TransactionDetailsPage from "./components/pages/ProfilePages/TransactionDetailsPage";
import MyDocumentsPage from "./components/pages/ProfilePages/MyDocumentsPage";
import LanguageSettingPage from "./components/pages/ProfilePages/LanguageSettingPage";
// import EstampingDocuments from "../src/components/pages/EstampingDocumentsPage/EstampingDocuments";
import PreviewDocuments from "../src/components/pages/PreviewDocumentsPage/PreviewDocuments";
import EstampingAgreementPage from "../src/components/pages/EstampingAgreementPage/EstampingAgreementPage";
import MyAllotmentLetterPage from "./components/pages/ProfilePages/MyAllotmentLetterPage";
import MyLoiPage from "./components/pages/ProfilePages/MyLoiPage";

// Support page
import PrivacyPolicyPage from "./components/pages/SupportPages/PrivacyPolicyPage";
import RefundPolicyPage from "./components/pages/SupportPages/RefundPolicyPage";
import TermsOfUsePage from "./components/pages/SupportPages/TermsOfUsePage";
import PageNotFoundPage from "./components/pages/PageNotFoundPage/PageNotFoundPage";
import SwitchAlertPage from "./components/pages/SwitchAlertPage/SwitchAlertPage";

// Agents
import AgentLogInPage from "./components/pages/AgentInitialPages/AgentLogInPage";
import AgentForgotPasswordPage from "./components/pages/AgentInitialPages/AgentForgotPasswordPage";
import AgentNewPasswordPage from "./components/pages/AgentInitialPages/AgentNewPasswordPage";
import AgentDashboardPage from "./components/pages/AgentDashboardPage/AgentDashboardPage";
import AgentApplicationDashboard from "./components/pages/AgentApplicationDashboard/AgentApplicationDashboard";
import AgentAppDetailsPage from "./components/pages/AgentApplicationDetailsPage/AgentAppDetailsPage";
import AgentAnalyticsDashboard from "./components/pages/AgentAnalyticsDashboard/AgentAnalyticsDashboard";
import AgentRecentActivityPage from "./components/pages/AgentRecentActivityPage/AgentRecentActivityPage";
import AgentProjectsReportsPage from "./components/pages/AgentProjectsReportsPage/AgentProjectsReportsPage";
import AgentProfilePage from "./components/pages/AgentProfilePage/AgentProfilePage";
import ManagerDashboardPage from "./components/pages/ManagerDashboardPage/ManagerDashboardPage";
import ManagerEarningsSummaryPage from "./components/pages/ManagerEarningsSummaryPage/ManagerEarningsSummaryPage";
import SetPasswordPage from "./components/pages/InitialPages/SetPasswordPage";
// import BankDetailPage from "./components/pages/InitialPages/BankDetailPage";
import BankAccountDetailPage from "./components/pages/InitialPages/BankAccountDetailPage";
// import UploadChequePage from "./components/pages/InitialPages/UploadChequePage";
import Question1FamilyIncomePage from "./components/pages/InitialPages/Question1FamilyIncomePage";
import IncomeDetailsPage from "./components/pages/IncomeDetailsPage/IncomeDetailsPage";
// import DeclarationPage from "./components/pages/SubmitDocumentsPage/DeclarationPage/DeclarationPage";
import UploadDocumentsPage from "./components/pages/SubmitDocumentsPage/UploadDocumentsPage/UploadDocumentsPage";
import Reschedule from "./components/organisms/SchedulerPageComponents/Reschedule";
import AgentUploadLeadPage from "./components/pages/AgentUploadLeadPage/AgentUploadLeadpage";
import ApplicationFeePage from "./components/pages/ApplicationFeePage/ApplicationFeePage";
import ApplicationPaymentSuccessful from "./components/organisms/ApplicationPaymentSuccessPage/ApplicationPaymentSuccessful";
import ApplicationPaymentSuccessPage from "./components/pages/ApplicationPaymentSuccessPage/ApplicationPaymentSuccessPage";
import { clearApplicantStepper } from "./redux/features/ApplicantStepper/ApplicantStepperSlice";
import MyGrievancePage from "./components/pages/MyGrievancePage/MyGrievancePage";
import LoanApplicationPage from "./components/pages/ProfilePages/LoanApplicationPage";
import MakeHousePaymentPage from "./components/pages/ProfilePages/MakeHousePaymentPage";
import NocPaymentSuccessPage from "./components/pages/NocPaymentSuccessPage/NocPaymentSuccessPage";
import { ApiEndPoint } from "./utils/Common";
import AgentApplicantsDashboard from "./components/pages/AgentApplicantsDashboard/AgentApplicantsDashboard";
import AgentApplicantsAnalyticsDashboard from "./components/pages/AgentApplicantsAnalyticsDashboard/AgentApplicantsAnalyticsDashboard";
import CancelBookingPage from "./components/pages/ProfilePages/OtherRequestPages/CancelBookingPage";
import ChangeNamePage from "./components/pages/ProfilePages/OtherRequestPages/ChangeNamePage";
import EditCoApplicantPage from "./components/pages/ProfilePages/OtherRequestPages/EditCoApplicantPage";
import StartFreshPage from "./components/pages/ProfilePages/OtherRequestPages/StartFreshPage";
import ChangeNamePaymentSuccessPage from "./components/pages/ChangeNamePaymentSuccessPage/ChangeNamePaymentSuccessPage";
import AddCoApplicantPaymentSuccessPage from "./components/pages/AddCoApplicantPaymentSuccessPage/AddCoApplicantPaymentSuccessPage";
import InstallmentPaymentSuccessPage from "./components/pages/InstallmentPaymentSuccessPage/InstallmentPaymentSuccessPage";
import AgreementLetterPage from "./components/pages/ProfilePages/AgreementLetterPage";
import BankDetailPage from "./components/pages/InitialPages/BankDetailPage";
import UploadCheque from "./components/organisms/InitialPagesComponents/BankKyc/UploadCheque/UploadCheque";
import UploadChequePage from "./components/pages/InitialPages/UploadChequePage";
import AllProjectPage from "./components/pages/AllProjectPage/AllProjectPage";
import ApplynowPage from "./components/pages/ApplynowPage/ApplynowPage";
import AuthVerifyCinPage from "./components/pages/InitialPages/AuthVerifyCinPage";
import GstDetailPage from "./components/pages/InitialPages/GstDetailPage";
import EauctionFeePage from "./components/pages/EauctionFeePage/EauctionFeepage";
import BidderRegistrationPage from "./components/pages/BidderRegistration/BidderRegistrationPage";
import { cleargetRegistrationStepperData } from "./redux/features/registration/registrationStepperSlice";


let theme = createMuiTheme({
  palette: {
    primary: { main: "#0038C0" },
    secondary: { main: "#F27807" },
  },
  typography: {
    fontFamily: ['"Noto Sans"', "sans-serif"].join(","),
    h1: { fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","), },
    h2: { fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","), },
    h3: { fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","), },
    h4: { fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","), },
    h5: { fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","), },
    h6: { fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","), },
  },
  overrides: {
    /* MuiContainer: {
      maxWidthLg: {
        maxWidth: "1046px !important"
      }
    }, */
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: ".7em",
          height: ".7em",
        },
        "*::-webkit-scrollbar-track": {
          // boxShadow: "inset 0 0 5px grey",
          // webkitBoxShadow: "inset 0 0 5px grey",
          // background: "rgba(7, 42, 200, 0.1)",
          background: "#fff",
          borderRadius: 10,
        },
        "*::-webkit-scrollbar-thumb": {
          // backgroundColor: "rgba(0,0,0,.1)",
          // background: "linear-gradient(180deg, #0038C0 0%, #006FD5 100%)",
          background: "rgb(0 0 0 / 30%)",
          borderRadius: 10,
        },
        /* ".MuiContainer-maxWidthLg": {
          maxWidth: 1046
        } */
      },
    },
    MuiButton: {
      root: {
        color: "#007AE7",
        fontSize: 16,
        fontWeight: "bold",
        minWidth: 100,
        textTransform: "none",
      },
      containedPrimary: {
        borderRadius: 8,
        // border: "solid 1px #0038C0",
      },
      // outlinedPrimary: {
      //   borderRadius: 8,
      //   backgroundColor: "#E1F4FF",
      //   border: "solid 2px #0038C0",
      //   fontSize: 14,
      //   "&:hover": {
      //     backgroundColor: "transparent",
      //     border: "solid 2px #0038C0",
      //   },
      // },
    },
    MuiTextField: {
      root: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: 8,
            // height: 56,
          },
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 5,
        boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
      },
    },
    MuiFormLabel: {
      asterisk: {
        color: "#f93d5c",
        "&$error": {
          color: "#f93d5c",
        },
      },
    },
    MuiDialog: {
      paperFullWidth: {
        width: "calc(100% - 8px)",
        margin: 24,
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("jwtToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const AgentPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("agentjwtToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/cfc-login" />
        )
      }
    />
  );
};

const App = (props) => {
  const { width } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const [confirmScheme, setConfirmScheme] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  axios.interceptors.request.use((request) => {
    request.headers.Authorization = localStorage.getItem("jwtToken");
    return request;
  })

  axios.interceptors.response.use((response) => {
    if (response.data.message == "Session Timeout!" || response.data.message == "Unauthorized Access!" || response.data.message == "Invalid Token!" || response.data.message == "Please Login Again!" || response.data.message == "Applicant Doesn't Exist!") {
      setConfirmScheme(true);
    }
    return response;
  });

  useEffect(() => {
    dispatch(clearMasterDataList());
    dispatch(getReservationCategories());
  }, [t, dispatch]);
 
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
       // alert('Ctrl + Shift + C is disabled');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  useEffect(() => {
    const handleOnline = () => {
      console.log('Network connection restored, reloading the page.');
      window.location.reload();
    };

    const handleOffline = () => {
      console.log('Network connection lost.');
    };

    // Add event listeners for online and offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  const clearBeSession = () => {
    fetch(
      `${ApiEndPoint}/MobileLogin/logout/${localStorage.getItem(
        "applicantId"
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    )
      .then((response) => { })
      .catch((error) => {
        alert(error, "error");
      });
  };
  //force logout session when browswer/tab close or route change
  // useEffect(() => {
  //   const tabsOpen = localStorage.getItem("tabsOpen");
  //   if (tabsOpen == null) {
  //     localStorage.setItem("tabsOpen", 1);
  //   } else {
  //     localStorage.setItem("tabsOpen", parseInt(tabsOpen) + parseInt(1));
  //   }

  //   window.onunload = function (e) {
  //     const newTabCount = localStorage.getItem("tabsOpen");
  //     if (newTabCount !== null) {
  //       localStorage.setItem("tabsOpen", newTabCount - 1);
  //     }
  //   };
  //   if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //     window.localStorage.isMySessionActive = "false";
  //   } else {
  //     const newTabCount2 = localStorage.getItem("tabsOpen");
  //     let value = localStorage.getItem("isMySessionActive");
  //     if (value == "true") {
  //       if (newTabCount2 - 1 == 0) {
  //         clearBeSession();
  //         window.localStorage.isMySessionActive = "false";
  //       } else {
  //         window.localStorage.isMySessionActive = "false";
  //       }
  //     }
  //   }
  // }, []);

  // Switch to app popup when screen size decreases
  // useEffect(() => {
  //   if (width === "sm" || width === "xs") {
  //     let is_popup_shown = sessionStorage.getItem("popupShownIs");
  //     if (!is_popup_shown) {
  //       history.push("/switch-to-app");
  //     }
  //   }
  // }, [width]);

  const loginAgain = () => {
    var myItem = localStorage.getItem('i18nextLng');
    localStorage.clear();
    if (myItem) {
      localStorage.setItem('i18nextLng', myItem);
    }
    dispatch(clearSuperStepperEditVars());
    dispatch(clearAuthState());
    dispatch(clearApplicantData());
    dispatch(clearApplicantState());
    dispatch(cleargetRegistrationStepperData());
    dispatch(clearFamilyData());
    dispatch(clearFamilyState());
    dispatch(clearApplicantStepper())
    setTimeout(() => {
      history.push("/otp-login");
    }, 500);
    setConfirmScheme(false)
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={SignUpPage} />
          <Route path="/otp-login" component={LogInWithOtpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup-success" component={SignUpSuccessPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/new-password" component={NewPasswordPage} />
          <Route path="/set-password" component={SetPasswordPage} />

          {/* Support */}
          <Route
            path="/privacy-policy"
            component={PrivacyPolicyPage}
          />
          <Route
            path="/refund-policy"
            component={RefundPolicyPage}
          />
          <Route
            path="/terms-of-use"
            component={TermsOfUsePage}
          />
          <PrivateRoute path="/registration" component={BidderRegistrationPage} />
          <PrivateRoute
            path="/auth-verify-aadhaar"
            component={AuthBridVerifyAadhaarPage}
          />
          <PrivateRoute
            path="/auth-verify-gst"
            component={GstDetailPage}
          />
          <PrivateRoute path="/verify-pancard" component={VerifyPanCardPage} />
          {/* <PrivateRoute path="/verify-aadhaar" component={VerifyAadhaarPage} /> */}
          <PrivateRoute
            path="/bank-account-detail"
            component={BankAccountDetailPage}
          />
          <PrivateRoute path="/bank-detail" component={BankDetailPage} />
          <PrivateRoute path="/upload-cheque" component={UploadChequePage} />
          <PrivateRoute path="/question-1" component={Question1FamilyIncomePage} />

          <PrivateRoute
            path="/terms-conditions"
            component={TermsConditionsPage}
          />
          <PrivateRoute
            path="/auth-verify-cin"
            component={AuthVerifyCinPage}
          />
          <PrivateRoute
            path="/personal-details"
            component={PersonalDetailsPage}
          />
          {/*  */}
          <PrivateRoute
            path="/co-applicant-benefits"
            component={CoApplicantBenefitsPage}
          />

          <PrivateRoute
            path="/add-co-applicant"
            component={AddCoApplicantDetailsPage}
          />
          <PrivateRoute
            path="/co-applicant-verify-aadhaar"
            component={CoApplicantVerifyAadhaarPage}
          />
          {/* <PrivateRoute path="/co-applicant-upload-aadhaar" component={CoApplicantUploadAadhaarPage} /> */}
          <PrivateRoute path="/co-applicant-verify-pancard" component={CoApplicantVerifyPanCardPage} />
          {/* <PrivateRoute path="/co-applicant-upload-pancard" component={CoApplicantUploadPanCardPage} /> */}
          {/*  */}
          {/* <PrivateRoute path="/contact-details" component={ContactDetailsPage} /> */}
          {/* <PrivateRoute path="/family-details" component={FamilyDetailsPage} /> */}
          <PrivateRoute
            path="/category-details"
            component={CategoryDetailsPage}
          />
          <PrivateRoute path="/income-details" component={IncomeDetailsPage} />
          {/* <PrivateRoute path="/select-preferences" component={SelectFlatPreferencesPage} /> */}
          <PrivateRoute path="/project-details" component={ProjectDetailsPage} />
          {/* <PrivateRoute
            path="/document-declaration"
            component={DeclarationPage}
          /> */}
          <PrivateRoute
            path="/upload-documents"
            component={UploadDocumentsPage}
          />
          <PrivateRoute path="/make-payments" component={MakePaymentsPage} />
          {/* <PrivateRoute path="/payment-skip" component={PaymentSki} /> */}
          <PrivateRoute path="/emd-loan-application" component={EmdLoanApplicationPage} />
          <PrivateRoute path="/emd-loan-select-bank" component={EmdLoanBankSelectPage} />
          <PrivateRoute path="/emd-loan-details-view" component={EmdLoanLoanDetailsPage} />
          <PrivateRoute path="/payment-details-view" component={EmdDetailsPage} />

          {/* <PrivateRoute path="/make-application-payment" component={ApplicationFeePage} /> */}
          <PrivateRoute path="/make-emdproject-payment" component={ApplicationFeePage} />

          {/* <PrivateRoute
            path="/e-challan"
            component={EchallanPage}
          /> */}
          <PrivateRoute
            path="/payment-successful"
            search='?transId='
            component={PaymentSuccessfulPage}
          />
          <PrivateRoute
            path="/payment-failed"
            search='?transId='
            component={PaymentSuccessfulPage}
          />

          <PrivateRoute
            path="/emdproject-payment-successful"
            search="?transId="
            component={EauctionFeePage}
          />
          <PrivateRoute
            path="/emdproject-payment-failed"
            search="?transId="
            component={EauctionFeePage}
          />

        <PrivateRoute
            path="/eauctionfee-payment-successful"
            search="?transId="
            component={ApplicationPaymentSuccessPage}
          />
          <PrivateRoute
            path="/eauctionfee-payment-failed"
            search="?transId="
            component={ApplicationPaymentSuccessPage}
          />

          <PrivateRoute path="/dashboard" search="?tab=" component={DashboardPage} />
          {/* <PrivateRoute path="/dashboard" component={DashboardPage} /> */}
          <PrivateRoute path="/select-projects" component={SelectProjectsPage} />
          <PrivateRoute path="/apply-now" component={ApplynowPage} />
          <PrivateRoute path="/my-grievance" component={MyGrievancePage} />
          {/* <PrivateRoute path="/view-all-notification" component={ViewAllNotificationsPages} /> */}
          {/* <PrivateRoute path="/application-details" component={ApplicationDetailsPage} /> */}
          {/* <PrivateRoute path="/application-overview" component={ApplicationOverviewPage} /> */}

          {/* my profile menu componenets and other request  */}
          <PrivateRoute path="/my-profile" component={MyProfilePage} />
          <PrivateRoute path="/transaction-details" component={TransactionDetailsPage} />
          <PrivateRoute path="/my-documents" component={MyDocumentsPage} />
          <PrivateRoute path="/language-setting" component={LanguageSettingPage} />
          <PrivateRoute path="/my-allotment-letter" component={MyAllotmentLetterPage} />
          <PrivateRoute path="/agreement-letter" component={AgreementLetterPage} />
          <PrivateRoute path="/my-loi" component={MyLoiPage} />
          <PrivateRoute path="/loan-application" component={LoanApplicationPage} />
          <PrivateRoute path="/make-house-payment" component={MakeHousePaymentPage} />
          <PrivateRoute path="/noc-payment-successful" search="?transId=" component={NocPaymentSuccessPage} />
          <PrivateRoute path="/noc-payment-failed" search="?transId=" component={NocPaymentSuccessPage} />
          <PrivateRoute path="/cancel-booking" component={CancelBookingPage} />
          <PrivateRoute path="/change-name" component={ChangeNamePage} />
          <PrivateRoute path="/change-name-payment-successful" search="?transId=" component={ChangeNamePaymentSuccessPage} />
          <PrivateRoute path="/change-name-payment-failed" search="?transId=" component={ChangeNamePaymentSuccessPage} />
          <PrivateRoute path="/coapplicant-payment-successful" search="?transId=" component={AddCoApplicantPaymentSuccessPage} />
          <PrivateRoute path="/coapplicant-payment-failed" search="?transId=" component={AddCoApplicantPaymentSuccessPage} />
          <PrivateRoute path="/installment-payment-successful" search="?transId=" component={InstallmentPaymentSuccessPage} />
          <PrivateRoute path="/installment-payment-failed" search="?transId=" component={InstallmentPaymentSuccessPage} />
          <PrivateRoute path="/edit-coapplicant" component={EditCoApplicantPage} />
          <PrivateRoute path="/start-fresh" component={StartFreshPage} />
          {/* <PrivateRoute
            path="/estamping-documents"
            component={EstampingDocuments}
          /> */}
          <PrivateRoute path="/preview-documents" component={PreviewDocuments} />
          <PrivateRoute
            path="/estamping-agreement"
            component={EstampingAgreementPage}
          />

          {/* Agents/CFC */}
          <Route exact path="/cfc-login" component={AgentLogInPage} />
          <Route
            path="/cfc-forgot-password"
            component={AgentForgotPasswordPage}
          />
          <Route path="/cfc-new-password" component={AgentNewPasswordPage} />
          <AgentPrivateRoute path="/cfc-dashboard" component={AgentDashboardPage} />
          <AgentPrivateRoute path="/cfc-upload-leads" component={AgentUploadLeadPage} />
          <AgentPrivateRoute
            path="/cfc-application-dashboard"
            component={AgentApplicationDashboard}
          />
          <AgentPrivateRoute
            path="/cfc-applicants-dashboard"
            component={AgentApplicantsDashboard}
          />
          <AgentPrivateRoute path="/cfc-application-view" component={AgentAppDetailsPage} />
          <AgentPrivateRoute
            path="/cfc-analytics-dashboard"
            component={AgentAnalyticsDashboard}
          />
          <AgentPrivateRoute
            path="/cfc-applicants-analytics-dashboard"
            component={AgentApplicantsAnalyticsDashboard}
          />
          <AgentPrivateRoute
            path="/cfc-recent-activities"
            component={AgentRecentActivityPage}
          />
          <AgentPrivateRoute
            path="/cfc-application-reports"
            component={AgentProjectsReportsPage}
          />
          <AgentPrivateRoute path="/cfc-profile" component={AgentProfilePage} />
          <Route path="/manager-dashboard" component={ManagerDashboardPage} />
          <Route
            path="/manager-earnings-summary"
            component={ManagerEarningsSummaryPage}
          />
          {/* switch to app if view port width decreases */}
          <Route path="/switch-to-app" component={SwitchAlertPage} />
          {/* schedule appointment components no need in book your cidco homes*/}
          {/* <Route path="/book-appointment" component={SchedulerPage} />
          <Route path="/book-Slot" component={SelectSlotPage} />
          <Route path="/appointment-Successfull" component={AppointmentSuccessfullPage} />
          <Route path="/reschedule" component={ReschedulefullPage} /> */}
          <Route path="*" exact={true} component={PageNotFoundPage} />

        </Switch>
      </ThemeProvider>

      <Dialog
        maxWidth={maxWidth}
        open={confirmScheme}
        onClose={() => {
          setConfirmScheme(false);
        }}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="SessionExpired-dialog"
      >
        <DialogTitle id="SessionExpired-dialog">Session expired</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dear Customer, Your session has been inactive for a while. Due to security reasons, you need to <Link onClick={() => { loginAgain() }}>login again</Link> .
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withWidth()(App);  