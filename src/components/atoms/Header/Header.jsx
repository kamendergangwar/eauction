import React, { useEffect, useRef, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import moment from "moment";
import * as yup from "yup";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
// import TranslateIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Logo from "../../../assets/Logo.svg";
import DarkLogo from "../../../assets/DarkLogo.svg";
import announcementSpeaker from "../../../assets/announcement_speaker_audio_media_multimedia_icon.svg";
import hurryImage from "../../../assets/Vector-min.png";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import EditIcon from '@material-ui/icons/Edit';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SubjectIcon from '@material-ui/icons/Subject';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  HeaderMenuIcon,
  UserLogoIcon,
  MenuDashboardIcon,
  MenuPersonalDtlsIcon,
  MenuTransactionDtlsIcon,
  MenuMyDocumentsIcon,
  MenuLanguageSettingIcon,
  MenuFaqNavBtnIcon,
  MenuWhatsAppNavBtnIcon,
  MenuVideoTtrlNavBtnIcon,
  MenuManualDownldNavBtnIcon,
  MenuTermsNdPryNavBtnIcon,
  MenuLogoutIcon,
  SupportIcon,
  SupportMobileIcon,
  DashboardIcon,
  ApplicationIcon,
  LanguageTranslateIcon,
  FaqNavBtnIcon,
  WhatsAppNavBtnIcon,
  VideoTtrlNavBtnIcon,
  ManualDownldNavBtnIcon,
  TermsNdPryNavBtnIcon,
  HelpCellIcon,
  AlamIcon,
  MenuNocIcon,
  MenuAllotmentLetterIcon,
  LOIMenuIcon,
  CancelFlatIcon,
  EditCoApplicantIcon,
  EditDetailIcon,
  AgreementIcon,
} from "../SvgIcons/SvgIcons";
import { headerStyles } from "./Header.styles";
import FormControl from "../../molecules/FormControl/FormControl";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicant,
  clearApplicantData,
  clearApplicantState,
  applicantSelector,
} from "../../../redux/features/applicant/ApplicantSlice";
import {
  clearFamilyData,
  clearFamilyState,
} from "../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import { clearSuperStepperEditVars } from "../../../redux/features/stepper/StepperSlice";
import { clearAuthState } from "../../../redux/features/applicant/ApplicantAuthSlice";
import {
  isSchemeExpired,
  masterDataSelector,
} from "../../../redux/features/masterdata/MasterDataSlice";
import { preferencesSelector, getBookingEndTime, cancelBooking, clearBookingState } from "../../../redux/features/preferences/PreferencesSlice";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import GlobalSearchIcon from "../../../assets/header/globalSearchIcon.png";
import FaqQuestionsDialogBox from "../../molecules/DialogBoxes/FaqQuestionsDialogBox/FaqQuestionsDialogBox";
import VideoTutorialHelpDialogBox from "../../molecules/DialogBoxes/VideoTutorialHelpDialogBox/VideoTutorialHelpDialogBox";
import TermsPrivacyPolicyDialogBox from "../../molecules/DialogBoxes/TermsPrivacyPolicyDialogBox/TermsPrivacyPolicyDialogBox";
import DownloadDialogBox from "../../molecules/DialogBoxes/DownloadDialogBox/VideoTutorialHelpDialogBox";
import {
  getconfiguration,
  helpDeskSelector,
} from "../../../redux/features/helpDesk/HelpDeskSlice";
import { ApiEndPoint } from "../../../utils/Common";
import { he } from "date-fns/locale";
import {
  getApplication,
  addApplication,
  addToSalesForce,
  clearApplicationState,
  applicationSelector,
  editApplication,
} from "../../../redux/features/application/ApplicationSlice";
import { ApplicantProgressSelector, clearApplicantStepper } from "../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { AccountBalanceWalletOutlined, ExpandLess, ExpandMore } from "@material-ui/icons";
import { Collapse, Grow } from "@material-ui/core";
import RestorePageOutlinedIcon from '@material-ui/icons/RestorePageOutlined';
import AlertBox from "../../atoms/AlertBox/AlertBox";
import SnackBox from "../../atoms/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert";
import NotificationSection from "../NotificationSection/NotificationSection";
import { NotificationSliceSelector, clearNotificationOverlay } from "../../../redux/features/Notifications/notificationSlice";
import NotificationOverlay from "../NotificationSection/NotificationOverlay";
import { cleargetRegistrationStepperData } from "../../../redux/features/registration/registrationStepperSlice";

const languages = [
  { code: "mr", label: "मराठी" },
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
];

const Header = (props) => {
  const { width, kycPagesIs } = props;
  const classes = headerStyles();
  const formikRef = useRef();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPathName = useLocation().pathname;
  // const currentLanguage = (element) => localStorage.getItem("i18nextLng") ? element.code === localStorage.getItem("i18nextLng") : "mr";
  // const [anchorElLang, setAnchorElLang] = useState(null);
  const currentLanguage = (element) =>
    element.code === localStorage.getItem("i18nextLng");
  const [anchorEl, setAnchorEl] = useState(null);
  const [supportMenuAnchorEl, setSupportMenuAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(
    languages.findIndex(currentLanguage)
  );
  // const [selectedLang, setSelectedLang] = useState("");
  const [faqQuestionsDialogOpenIs, setFaqQuestionsDialogOpenIs] =
    useState(false);
  const [videoTutorialDialogOpenIs, setVideoTutorialDialogOpenIs] =
    useState(false);
  const [downloadDialogOpenIs, setDownloadDialogOpenIs] = useState(false);
  const [termsPrivacyPolicyDialogOpenIs, setTermsPrivacyPolicyDialogOpenIs] =
    useState(false);
  const [profileMenuList, setProfileMenuList] = useState([]);
  const [supportData, setSupportData] = useState([]);
  const [bookingEndDate, setBookingEndDate] = useState("");
  const [isPmay, setIsPmay] = useState(false);
  const [isPreviousCancel, setIsPreviousCancel] = useState(true); //temp to true
  const [isFinalPaymentDone, setIsFinalPaymentDone] = useState(false);
  const [isLoiGenerated, setIsLoiGenerated] = useState(false);
  const { isSuccessConfiguration, resDataConfiguration } =
    useSelector(helpDeskSelector);
  const { bookingEndTime, isSuccessBookingEndTime, isErrorBookingEndTime, isSuccessResAddFloor, floorDetails } = useSelector(preferencesSelector);

  const { isSuccessScheme, isErrorScheme, dataScheme, errorMsgScheme } = useSelector(masterDataSelector);
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const [showTimerRibbin, setShowTimerRibbin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [collapseItemPath, setCollapseItemPath] = useState(['/cancel-booking', '/edit-coapplicant', '/change-name', '/start-fresh'])
  const [applPaymentDone, setApplPaymentDone] = useState(false);
  const [docVerificationDone, setDocVerificationDone] = useState(false);
  const [allotmentGenrated, setAllotmentGenrated] = useState(false);
  const [loiGenrated, setLoiGenrated] = useState(false);
  const [installmentDone, setInstallmentDone] = useState(false);
  const [isAutoBookingCancelled, setIsAutoBookingCancelled] = useState(false);
  const [anchorElLang, setAnchorElLang] = React.useState(null);
  const { isNewNotification } = useSelector(NotificationSliceSelector);
  const [showOverlay, setShowOverlay] = useState(false);
  // const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  // const handleOnline = () => {
  //   setIsOnline(true);
  // };

  // const handleOffline = () => {
  //   setIsOnline(false);
  // };
  // //check active internet connection
  // useEffect(() => {
  //   window.addEventListener('online', handleOnline);
  //   window.addEventListener('offline', handleOffline);

  //   return () => {
  //     window.removeEventListener('online', handleOnline);
  //     window.removeEventListener('offline', handleOffline);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isNewNotification && currentPathName == '/dashboard') {
  //     setTimeout(() => {
  //       setShowOverlay(true);
  //     }, 2000);
  //   }
  //   if (!isNewNotification && currentPathName != '/dashboard') {
  //     setShowOverlay(false);
  //   }
  // }, [currentPathName, isNewNotification])

  const handleOnLangMenuClose = () => {
    setAnchorElLang(null);
  };

  const handleOnLangItem = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleOnLangMenuItem = (code, index) => {
    i18n.changeLanguage(code);
    setSelectedIndex(index);
    setAnchorElLang(null);
  };

  const handleExpand = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (collapseItemPath.includes(currentPathName)) {
      setOpen(true)
    }
  }, [currentPathName])
  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isSuccessResApplicantGet,
    applicantData,
  } = useSelector(applicantSelector);

  /* CountDown Timer - By Ashwin - START */

  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00:00');

  useEffect(() => {
    if (timer) {
      if (timer?.split(":")[0] + timer?.split(":")[1] + timer?.split(":")[2] + timer?.split(":")[3] > 0) {
        if (isSuccessProgressResStepper) {
          ApplicantStepperData.superStepper.forEach(item => {
            if (item.StepId == "10" && item.Status == "pending") {
              setShowTimerRibbin(true);
            }
          })
        }
      }
      localStorage.setItem("RibbonTimer", timer);
    }
  }, [timer]);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "10" && item.Status == "completed") {
          setShowTimerRibbin(false);
        }
      })
    }
  }, [isSuccessProgressResStepper])

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.is_pmy == 0) {
        setIsPmay(true)
      }
      if (applicantData.ApplicationNo) {
        const number = applicantData.ApplicationNo?.slice(2, 3);
        if (number > 1) {
          setIsPreviousCancel(true);
        }
      }
    }
  }, [isSuccessResApplicantGet])

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach((item) => {
        if (item.StepId == "10") {
          item.Status == "completed"
            ? setIsFinalPaymentDone(true)
            : setIsFinalPaymentDone(false);
        }

        if (item.StepId == "11") {
          item.Status == "completed"
            ? setIsLoiGenerated(true)
            : setIsLoiGenerated(false);
        }
        if (item.StepId == "7") {
          item.Status == "completed"
            ? setApplPaymentDone(true)
            : setApplPaymentDone(false);
        }
        if (item.StepId == "8") {
          item.Status == "completed"
            ? setDocVerificationDone(true)
            : setDocVerificationDone(false);
        }
        if (item.StepId == "11") {
          item.Status == "completed"
            ? setLoiGenrated(true)
            : setLoiGenrated(false);
        }
        if (item.StepId == "12") {
          item.Status == "completed"
            ? setAllotmentGenrated(true)
            : setAllotmentGenrated(false);
        }
        if (item.StepId == "13") {
          item.Status == "completed"
            ? setInstallmentDone(true)
            : setInstallmentDone(false);
        }
        // if (item.StepId == "5" && item.Status == "pending") {
        //   history.push("/dashboard");
        // }
      });
    }
  }, [isSuccessProgressResStepper]);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, days, hours, minutes, seconds
    };
  }


  const startTimer = (e) => {
    let { total, days, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {

      // update the timer
      // check if less than 10 then we need to 
      // add '0' at the beginning of the variable
      setTimer(
        (days > 9 ? days : '0' + days) + ':' +
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    } else {
      //console.log("bookingEndTime",bookingEndTime);
      setTimer('00:00:00:00');
      localStorage.setItem("showPaymentExpRibbon", false);
      cancelFlatBooking(bookingEndTime);
      clearInterval(Ref.current);
      localStorage.setItem("RibbonTimer", "");
      ///removeRibbonAfterSomeTime();
    }
  }


  const clearTimer = (e) => {

    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    setTimer('00:00:00:00');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    if (+bookingEndTime?.Applicant_Booking_Status?.length > 0) {
      var endTime = bookingEndTime?.Applicant_Booking_Status[0]?.booked_valid_date;
      var startTime = bookingEndTime?.Applicant_Booking_Status[0]?.current_time;
      let deadline = new Date();

      // This is where you need to adjust if 
      // you entend to add more time
      deadline.setSeconds(deadline.getSeconds() + (endTime - startTime));
      //setShowTimerRibbin(true);
      return deadline;
    } else {
      setShowTimerRibbin(false);
      return 0;
    }
  }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    if (bookingEndTime) {
      clearTimer(getDeadTime());
    }
  }, [bookingEndTime]);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  }

  const cancelFlatBooking = (bookingDetails) => {
    var flatBookingDetails = bookingDetails?.Applicant_Booking_Status;
    if (flatBookingDetails?.length > 0) {
      let flatObj = {
        "ApplicantId": localStorage.getItem("applicantId"),
        "ProjectId": flatBookingDetails[0]?.ProjectId,
        "Wing": flatBookingDetails[0]?.Wing,
        "FloorNo": flatBookingDetails[0]?.FloorNo,
        "FlatNo": flatBookingDetails[0]?.FlatNo,
        "FrdId": flatBookingDetails[0]?.FrdId
      }
      dispatch(cancelBooking(flatObj));
      dispatch(clearBookingState());
      // dispatch(clearApplicantState());
      // dispatch(clearApplicationState());
      // dispatch(getApplication());
      const requestData = {
        ApplicationId: flatBookingDetails[0]?.ApplicationId,
        ApplicationStatus: "9",
        Lang: localStorage.getItem("i18nextLng"),
      };
      dispatch(editApplication(requestData)).then((resp) => {
        removeRibbonAfterSomeTime();
        setIsAutoBookingCancelled(true);
      });
    }
  }

  const removeRibbonAfterSomeTime = () => {
    const hideRibbonTimer = setTimeout(() => {
      setShowTimerRibbin(false);
    }, 60000);
  }
  /* CountDown Timer - By Ashwin - END */

  const [timerDays, setTimerDays] = useState("");
  const [timerHours, setTimerHours] = useState("");
  const [timerMinutes, setTimerMinutes] = useState("");
  const [timerSeconds, setTimerSeconds] = useState("");

  /* const {
    applicantData,
    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isErrorApplicantGet,
    errorMsgApplicantGet
  } = useSelector(applicantSelector); */


  useEffect(() => {
    if (localStorage.getItem("showPaymentExpRibbon")) {
      let jsonObj = {
        "ApplicantId": localStorage.getItem("applicantId")
      }
      dispatch(getBookingEndTime(jsonObj));
    }
  }, [""]);


  useEffect(() => {
    if (isSuccessBookingEndTime) {
      setBookingEndDate(moment(bookingEndTime.Applicant_Booking_Status[0].endTime).format("DD-MMM-YYYY"))
    }
  }, [isSuccessBookingEndTime]);


  useEffect(() => {
    if (isErrorBookingEndTime) {
      setShowTimerRibbin(false);
      createCidcoCountDown("-0", -1);
    }
  }, [isErrorBookingEndTime])

  useEffect(() => {
    // dispatch(getApplicant());
    if (localStorage.getItem("applicantId")) {
      // dispatch(isSchemeExpired());
    }
  }, []);

  /* const handleOnLangItem = (event) => {
    setAnchorElLang(event.currentTarget);
  }; */

  const handleOnLangChange = (event, index) => {
    i18n.changeLanguage(languages[index].code);
    setSelectedIndex(index);
    // window.webengage.track("Choose Your Language", {
    //   "Option Selected": languages[index].code,
    //   "Platform": "web"
    // });
  };

  /* const handleOnLangMenuItem = (code, index) => {
    i18n.changeLanguage(code);
    setSelectedIndex(index);
    setAnchorElLang(null);
  }; */

  /* const handleOnLangMenuClose = () => {
    setAnchorElLang(null);
  }; */

  const supportMenuHandleClick = (event) => {
    setSupportMenuAnchorEl(event.currentTarget);
  };

  const supportMenuHandleClose = () => {
    setSupportMenuAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnProfileMenuItem = (value) => {
    redirectPages(value);
    setAnchorEl(null);
  };

  const redirectPages = (value) => {
    if (value === "dashboard") {
      history.push("/dashboard");
    } else if (value === "profile") {
      history.push("/my-profile");
    } else if (value === "grievance") {
      history.push("/my-grievance");
    } else if (value === "transaction") {
      history.push("/transaction-details");
    } else if (value === "myDocuments") {
      history.push("/my-documents");
    } else if (value === "langSetting") {
      history.push("/language-setting");
    } else if (value === "application") {
      history.push("/application-details");
    } else if (value === "supportPrivacy") {
      history.push("/privacy-policy");
    } else if (value === "supportRefund") {
      history.push("/refund-policy");
    } else if (value === "supportTerms") {
      history.push("/terms-of-use");
    } else if (value === "myLOI") {
      history.push("/my-loi");
    } else if (value === "allotmentLetter") {
      history.push("/my-allotment-letter");
    } else if (value === "agreement") {
      history.push("/agreement-letter");
    } else if (value === "RequestNoc") {
      history.push("/loan-application");
    } else if (value === "installments") {
      history.push("/make-house-payment");
    } else if (value === "cancelBooking") {
      history.push("/cancel-booking");
    } else if (value === "editCoApplicant") {
      history.push("/edit-coapplicant");
    } else if (value === "changeName") {
      history.push("/change-name");
    } else if (value === "changeCategory") {
      history.push("/start-fresh");
    } else if (value === "logout") {
      clearBeSession();
      var myItem = localStorage.getItem("i18nextLng");
      localStorage.clear();
      if (myItem) {
        localStorage.setItem("i18nextLng", myItem);
      }
      dispatch(cleargetRegistrationStepperData());
      dispatch(clearSuperStepperEditVars());
      dispatch(clearAuthState());
      dispatch(clearApplicantData());
      dispatch(clearApplicantState());
      dispatch(clearFamilyData());
      dispatch(clearFamilyState());
      dispatch(clearApplicantStepper());
      setTimeout(() => {
        history.push("/");
      }, 500);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const allProfileMenuList = [
    {
      value: "profile",
      label: t("headerSection.profileMenu.profile"),
      icon: <MenuPersonalDtlsIcon />,
    },
    {
      value: "dashboard",
      label: t("headerSection.profileMenu.dashboard"),
      icon: <MenuDashboardIcon />,
    },
    {
      value: "grievance",
      label: t("headerSection.profileMenu.grievance"),
      icon: <HeadsetMicIcon />,
    },
    /* {
      value: "application",
      label: t("headerSection.profileMenu.application"),
      icon: <ApplicationIcon />,
    }, */
    {
      value: "logout",
      label: t("headerSection.profileMenu.logout"),
      icon: <MenuLogoutIcon />,
    },
  ];

  const mobileMenuList = [
    {
      value: "profile",
      pathName: "/my-profile",
      icon: <MenuPersonalDtlsIcon fontSize="small" />,
      label: t("headerSection.profileMenu.personalDetails"),
      display: "always"
    },
    {
      value: "grievance",
      pathName: "/my-grievance",
      icon: <HeadsetMicIcon />,
      label: t("My Grievance"),
      display: "always"
    },
    {
      value: "transaction",
      pathName: "/transaction-details",
      icon: <MenuTransactionDtlsIcon fontSize="small" />,
      label: t("headerSection.profileMenu.transactionDetails"),
      display: "always"
    },
    {
      value: "myDocuments",
      pathName: "/my-documents",
      icon: <MenuMyDocumentsIcon fontSize="small" />,
      label: t("headerSection.profileMenu.myDocuments"),
      display: "always"
    },
    {
      value: "myLOI",
      pathName: "/my-loi",
      icon: <LOIMenuIcon style={{ fill: "transparent", fontSize: "x-large" }} stroke={currentPathName == "/my-loi" ? "#0038c0" : "#1d3d62"} />,
      label: t("Letter of Intent"),
      display: "finalPayment"
    },
    {
      value: "allotmentLetter",
      pathName: "/my-allotment-letter",
      icon: <MenuAllotmentLetterIcon style={{ fill: "transparent", fontSize: "22px" }} stroke={currentPathName == "/my-allotment-letter" ? "#0038c0" : "#1d3d62"} />,
      label: t("Allotment Letter"),
      display: "finalPayment"
    },
    {
      value: "RequestNoc",
      pathName: "/loan-application",
      icon: <MenuNocIcon style={{ fill: "transparent", fontSize: "x-large" }} stroke={currentPathName == "/loan-application" ? "#0038c0" : "#1d3d62"} />,
      label: t("Request NOC"),
      display: "noc"
    },
    {
      value: "installments",
      pathName: "/make-house-payment",
      icon: <AccountBalanceWalletOutlined style={{ fontSize: "22px" }} />,
      label: t("Installments"),
      display: "allotmentLetter"
    },
    {
      value: "agreement",
      pathName: "/agreement-letter",
      icon: <AgreementIcon style={{ fontSize: "24px" }} stroke={currentPathName == "/agreement-letter" ? "#0038c0" : "#1d3d62"} />,
      label: t("Agreement"),
      display: "agreementLetter"
    },
    {
      value: "otherRequest",
      pathName: "#",
      icon: <SubjectIcon style={{ fontSize: "22px" }} stroke={currentPathName == "/loan-application" ? "#0038c0" : "#1d3d62"} />,
      label: t("Other Request"),
      type: "collapse",
      children: [{
        value: "cancelBooking",
        pathName: "/cancel-booking",
        icon: <CancelFlatIcon style={{ fontSize: "22px" }} stroke={currentPathName == "/cancel-booking" ? "#0038c0" : "#1d3d62"} />,
        label: t("Cancel Booking"),
        display: "loiLetter",
      },
      {
        value: "editCoApplicant",
        pathName: "/edit-coapplicant",
        icon: <EditCoApplicantIcon style={{ fontSize: "22px" }} stroke={currentPathName == "/edit-coapplicant" ? "#0038c0" : "#1d3d62"} />,
        label: t("Edit Co-Applicant"),
        display: "afterApplPayment",
      }, {
        value: "changeName",
        pathName: "/change-name",
        icon: <EditDetailIcon style={{ fontSize: "22px" }} stroke={currentPathName == "/change-name" ? "#0038c0" : "#1d3d62"} />,
        label: t("Change Name"),
        display: "allotmentLetter",
      }, {
        value: "changeCategory",
        pathName: "/start-fresh",
        icon: <RestorePageOutlinedIcon style={{ fontSize: "22px" }} />,
        label: t("Change Category"),
        display: "afterDocverification",
      }]
    }
    // {
    //   value: "langSetting",
    //   pathName: "/language-setting",
    //   icon: <MenuLanguageSettingIcon fontSize="small" />,
    //   label: t("headerSection.profileMenu.languageSetting"),
    //   display: "always"
    // },
  ];

  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };

  function createCidcoCountDown(endTime, nowTime) {

    if (endTime > 0) {
      setTimeout(() => {
        setShowTimerRibbin(true);
      }, [1000])
    }
    if (typeof (x) != "undefined") { clearInterval(x); setTimerDays(0); setTimerHours(0); setTimerMinutes(0); setTimerSeconds(0); }
    var countDownDate = new Date(endTime * 1000);

    var x = setInterval(function () {

      var now = new Date(nowTime * 1000);
      //console.log('Current : '+now);

      // Find the distance between now an the count down date
      var distance = (countDownDate) - (now);
      //console.log('distance : '+distance);

      //Hint on converting from object to the string.
      //var distance = Date.parse(countDownDate) - Date.parse(now);

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      //console.log(days);

      setTimerDays(days);
      setTimerHours(hours);
      if (timerMinutes < minutes)
        setTimerMinutes(minutes);
      if (timerSeconds < seconds)
        setTimerSeconds(seconds);

      // Display the result in the element with id="demo"
      // document.getElementById(elementId).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      //document.getElementById(elementId).innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
      //document.getElementById(elementId).innerHTML = "D : H : M : S<br>"+days + " : " + hours + " : " + minutes + " : " + seconds + " ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        localStorage.setItem("showPaymentExpRibbon", false);
        setTimerDays("0");
        setTimerHours("0");
        setTimerMinutes("0");
        setTimerSeconds("0");
        setShowTimerRibbin(false);
        // document.getElementById(elementId).style.color = "red";
        // document.getElementById(elementId).innerHTML = "TIME EXPIRED";
        //, PLEASE SELECT FLAT AGAIN AND MAKE PAYMENT WIHTIN TIME.
        //Cancel temp flat booking API
      }
      nowTime++;
    }, 1000);
  }

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "10" && item.Status == "completed") {
          setShowTimerRibbin(false);
        }
      })
    }
  }, [isSuccessProgressResStepper])

  const fetchMobileSwipeDrawerList = (anchor) => (
    <div
      className={clsx(classes.drawerListContainer)}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Box className={classes.mobSideMenuHeader}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <img src={DarkLogo} alt={"Logo"} className={classes.logo} />
            </Grid>
            <Grid item>
              <IconButton
                aria-label="close"
                onClick={toggleDrawer(anchor, false)}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        {headerState == "loggedIn" && (
          <>
            <ListItem
              button
              onClick={() => redirectPages("dashboard")}
              className={`${classes.listItemCont} ${currentPathName == "/dashboard" ? "active" : ""
                }`}
            >
              <ListItemIcon>
                <MenuDashboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={t("headerSection.profileMenu.dashboard")}
              />
            </ListItem>
            <Divider className={classes.sideMenuDivider} />
            <Typography variant="h5" className={classes.menuSecTitle}>
              {t("headerSection.profileMenu.profile")}
            </Typography>
            {mobileMenuList.map((element, i) => {
              if (element.display == 'always' && element.type != 'collapse') {
                return <ListItem
                  key={i}
                  button
                  onClick={() => redirectPages(element.value)}
                  className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""
                    }`}
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.label} />
                </ListItem>
              }
              if (element.display == 'finalPayment' && isFinalPaymentDone && element.type != 'collapse') {
                return <ListItem
                  key={i}
                  button
                  onClick={() => redirectPages(element.value)}
                  className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""
                    }`}
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.label} />
                </ListItem>
              }
              if (element.display == 'allotmentLetter' && allotmentGenrated && element.type != 'collapse') {
                return <ListItem
                  key={i}
                  button
                  onClick={() => redirectPages(element.value)}
                  className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""
                    }`}
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.label} />
                </ListItem>
              }
              if (element.display == 'agreementLetter' && installmentDone && element.type != 'collapse') {
                return <ListItem
                  key={i}
                  button
                  onClick={() => redirectPages(element.value)}
                  className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""
                    }`}
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.label} />
                </ListItem>
              }
              if (element.display === 'noc' && isFinalPaymentDone && isLoiGenerated && element.type != 'collapse') {
                return <ListItem
                  key={i}
                  button
                  onClick={() => redirectPages(element.value)}
                  className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""
                    }`}
                >
                  <ListItemIcon>{element.icon}</ListItemIcon>
                  <ListItemText primary={element.label} />
                </ListItem>
              }
              if (element.type == 'collapse') {
                return <>
                  <ListItem button onClick={handleExpand}>
                    <ListItemIcon>
                      {element.icon}
                    </ListItemIcon>
                    <ListItemText primary={element.label} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {element.children.map((element, i) => {
                        if (element.display === 'always') {
                          return (
                            <ListItem button onClick={() => redirectPages(element.value)} className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                              <ListItemIcon>
                                {element.icon}
                              </ListItemIcon>
                              <ListItemText primary={element.label} />
                            </ListItem>
                          )
                        }
                        if (element.display === 'loiLetter' && (isLoiGenerated || isPreviousCancel)) {
                          return (
                            <ListItem button onClick={() => redirectPages(element.value)} className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                              <ListItemIcon>
                                {element.icon}
                              </ListItemIcon>
                              <ListItemText primary={element.label} />
                            </ListItem>
                          )
                        }
                        if (element.display === 'afterApplPayment' && applPaymentDone) {
                          return (
                            <ListItem button onClick={() => redirectPages(element.value)} className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                              <ListItemIcon>
                                {element.icon}
                              </ListItemIcon>
                              <ListItemText primary={element.label} />
                            </ListItem>
                          )
                        }
                        if (element.display === 'afterDocverification' && !isFinalPaymentDone && docVerificationDone) {
                          return (
                            <ListItem button onClick={() => redirectPages(element.value)} className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                              <ListItemIcon>
                                {element.icon}
                              </ListItemIcon>
                              <ListItemText primary={element.label} />
                            </ListItem>
                          )
                        }
                        if (element.display === 'allotmentLetter' && allotmentGenrated) {
                          return (
                            <ListItem button onClick={() => redirectPages(element.value)} className={`${classes.listItemCont} ${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                              <ListItemIcon>
                                {element.icon}
                              </ListItemIcon>
                              <ListItemText primary={element.label} />
                            </ListItem>
                          )
                        }
                      })}
                    </List>
                  </Collapse>
                </>
              }
            })}
          </>
        )}
        <Divider className={classes.sideMenuDivider} />
        <Typography variant="h5" className={classes.menuSecTitle}>
          {t("headerSection.support")}
        </Typography>
        <ListItem
          button
          className={classes.listItemCont}
          onClick={() => setFaqQuestionsDialogOpenIs(true)}
        >
          <ListItemIcon>
            <MenuFaqNavBtnIcon fontSize="small" style={{ fill: "none" }} />
          </ListItemIcon>
          <ListItemText
            primary={t("headerSection.helpDeskDropDown.helpButtonText1Mobile")}
          />
        </ListItem>
        {/* <ListItemLink
          button
          className={classes.listItemCont}
          href={supportData?.whatsapp_help_service?.url}
          rel="noopener"
          target="_blank"
        >
          <ListItemIcon>
            <MenuWhatsAppNavBtnIcon fontSize="small" style={{ fill: "none" }} />
          </ListItemIcon>
          <ListItemText
            primary={t("headerSection.helpDeskDropDown.helpButtonText2")}
          />
        </ListItemLink> */}
        <ListItem
          button
          className={classes.listItemCont}
          onClick={() => setVideoTutorialDialogOpenIs(true)}
        >
          <ListItemIcon>
            <MenuVideoTtrlNavBtnIcon
              fontSize="small"
              style={{ fill: "none" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={t("headerSection.helpDeskDropDown.helpButtonText3")}
          />
        </ListItem>
        <ListItem
          button
          className={classes.listItemCont}
          onClick={() => setDownloadDialogOpenIs(true)}
        >
          <ListItemIcon>
            <MenuManualDownldNavBtnIcon
              fontSize="small"
              style={{ fill: "none" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={t("headerSection.helpDeskDropDown.helpButtonText4")}
          />
        </ListItem>
        {/* <ListItem
          button
          className={classes.listItemCont}
          onClick={() => setTermsPrivacyPolicyDialogOpenIs(true)}
        >
          <ListItemIcon>
            <MenuTermsNdPryNavBtnIcon
              fontSize="small"
              style={{ fill: "none" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={t("headerSection.helpDeskDropDown.helpButtonText5")}
          />
        </ListItem> */}
        {headerState != "loggedOut" && (
          <>
            <Divider className={classes.sideMenuDivider} />
            <ListItem
              button
              onClick={() => redirectPages("logout")}
              className={classes.listItemCont}
            >
              <ListItemIcon>
                <MenuLogoutIcon fontSize="small" style={{ fill: "none" }} />
              </ListItemIcon>
              <ListItemText primary={t("headerSection.profileMenu.logout")} />
            </ListItem>
          </>
        )}
        <Divider className={classes.sideMenuDivider} />
        <Typography variant="h5" className={classes.querryNumberView}>
          <span>
            {t("headerSection.helpDeskDropDown.querryCallUsText")} :{" "}
          </span>
          {/* <a href={`tel: ${supportData?.phone_service?.contact_number1}`}><strong> {supportData?.phone_service?.contact_number1}</strong></a> / */}
          <span>
            <HelpCellIcon />
            <a href={`tel: ${supportData?.phone_service?.contact_number2}`}>
              <strong> {supportData?.phone_service?.contact_number2}</strong>
            </a>
          </span>
          <br />
          <span>
            {t("headerSection.helpDeskDropDown.callUsTimingTxt")}
          </span>
        </Typography>
        {/* <>
            {mobileMenuList.map((item) => (
              <ListItem
                button
                key={item.value + `MOB`}
                onClick={() => redirectPages(item.value)}
              >
                <React.Fragment>
                  <ListItemIcon style={{ minWidth: 30 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </React.Fragment>
              </ListItem>
            ))}
          </> */}
      </List>
    </div>
  );

  // =========
  const initialValues = {
    searchedQuestion: "",
  };

  /* const validationSchema = yup.object({
    searchedQuestion: yup
      .string()
      .required(
        t("Search something...")
      )
      .matches(
        /^[a-zA-Z ]*$/,
        t("Write properly...")
      ),
  }); */

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log("values", values);
    // const requestData = new FormData();
    // dispatch(saveDocument(requestData));
  };

  /* useEffect(() => {
    formikRef.current.resetForm();
  }, [t]); */

  const handleCloseFaqQuestionsDialogBox = () => {
    setFaqQuestionsDialogOpenIs(false);
  };

  const handleCloseVideoTutorialDialogBox = () => {
    setVideoTutorialDialogOpenIs(false);
  };

  const handleCloseTermsPrivacyPolicyDialogBox = () => {
    setTermsPrivacyPolicyDialogOpenIs(false);
  };

  const handleCloseTermsPrivacyPolicyDialogBox1 = () => {
    setDownloadDialogOpenIs(false);
  };

  const [headerState, setHeaderState] = useState("");

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      if (kycPagesIs) {
        setHeaderState("kyc");
        if (
          currentPathName === "/co-applicant-verify-aadhaar" ||
          currentPathName === "/co-applicant-upload-aadhaar" ||
          currentPathName === "/co-applicant-verify-pancard" ||
          currentPathName === "/co-applicant-upload-pancard"
        ) {
          setProfileMenuList(allProfileMenuList);
        } else {
          setProfileMenuList([
            {
              value: "logout",
              label: t("headerSection.profileMenu.logout"),
              icon: <MenuLogoutIcon />,
            },
          ]);
        }
      } else {
        setHeaderState("loggedIn");
        setProfileMenuList(allProfileMenuList);
      }
    }
    if (!localStorage.getItem("jwtToken")) {
      setHeaderState("loggedOut");
    }
    dispatch(getconfiguration());
  }, [t]);

  useEffect(() => {
    if (isSuccessConfiguration) {
      setSupportData(resDataConfiguration);
    }
  }, [isSuccessConfiguration]);

  /* useEffect(() => {
    if (isSuccessResApplicantGet) {
      console.log("applicantData", applicantData);
      if(applicantData.IsAadharVerified && applicantData.isPanVerified){

      }
    }
  }, [isSuccessResApplicantGet, applicantData]); */
  const timeValidText = () => {
    const lang = localStorage.getItem("i18nextLng");
    var Applicant_Booking_Status = bookingEndTime?.Applicant_Booking_Status;
    var flatRemainingCountTxt = "";
    if (Applicant_Booking_Status != "" && Applicant_Booking_Status != null && Applicant_Booking_Status?.length > 0) {
      flatRemainingCountTxt = t('headerSection.timeValidTxt3') + Applicant_Booking_Status[0]?.booking_attempt;
    }
    if (lang == "en") {
      return (
        <>
          ({t('headerSection.timeValidTxt1')} {bookingEndDate})&nbsp;&nbsp;&nbsp;&nbsp;{flatRemainingCountTxt}
        </>
      );
    }
    if (lang == "hi") {
      return (
        <>
          ({bookingEndDate} {t('headerSection.timeValidTxt1')})
        </>
      );
    }

    if (lang == "mr") {
      return (
        <>
          ({bookingEndDate} {t('headerSection.timeValidTxt1')})
        </>
      );
    }
  };

  var handleAutoCancellationClose = () => {
    setIsAutoBookingCancelled(false);
  }
  const handleCloseOverlay = () => {
    // Your existing logic to close the overlay and clear the flag
    // You might use the setAnimationClass and setTimeout here
    // Dispatch the action to clear isNewNotification flag
    dispatch(clearNotificationOverlay());
  };
  return (
    <>
      <Box flexGrow={1}>
        <AppBar position="sticky" className={`${classes.root} ${headerState}`}>
          <Toolbar>
            {(headerState == "loggedIn" ||
              headerState == "kyc" ||
              headerState == "loggedOut") && (
                <Hidden mdUp>
                  <IconButton
                    onClick={toggleDrawer("left", true)}
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className={classes.mobileMenuIconBtn}
                  >
                    <HeaderMenuIcon />
                  </IconButton>
                </Hidden>
              )}

            <Hidden smDown>
              {/* {((currentPathName === "/")
                || (currentPathName === "/switch-to-app")
                || (currentPathName === "/login")
                || (currentPathName === "/set-password")
                || (currentPathName === "/otp-login")
                || (currentPathName === "/signup")
                || (currentPathName === "/signup-success")
                || (currentPathName === "/forgot-password")
                || (currentPathName === "/new-password")) &&
              } */}
              <Box flexGrow={1} display='flex' alignItems='center'>
                <img src={Logo} alt={"Logo_1"} className={classes.logo} />
                <Divider variant="middle" orientation="vertical" flexItem style={{ background: 'lightgray', marginTop: 10, marginBottom: 10 }} />
                <Typography style={{ whiteSpace: 'nowrap', fontWeight: 'bolder' }} variant="h6">E-Auction</Typography>
              </Box>
            </Hidden>
            <Hidden mdUp>
              <Box flexGrow={1}>
                {headerState == "kyc" ? (
                  <img src={DarkLogo} alt={"Logo_2"} className={classes.logo} />
                ) : (
                  <img src={Logo} alt={"Logo_3"} className={classes.logo} />
                )}
              </Box>
            </Hidden>
            {/* <Box flexGrow={1}>
                <img
                  src={Logo}
                  alt={"Logo"}
                  className={classes.logo}
                />
              </Box> */}
            <div className={`${classes.rightSection} ${headerState}`}>
              {/* {(headerState === "loggedIn" || headerState === "kyc") && ( */}
              <Hidden smDown>
                <Button
                  startIcon={<SupportIcon />}
                  endIcon={<ExpandMoreIcon />}
                  size="small"
                  className={classes.supportButton}
                  aria-controls="support-menu"
                  aria-haspopup="true"
                  onClick={supportMenuHandleClick}
                >
                  {t("headerSection.support")}
                </Button>
                <Menu
                  id="support-menu"
                  anchorEl={supportMenuAnchorEl}
                  keepMounted
                  open={Boolean(supportMenuAnchorEl)}
                  onClose={supportMenuHandleClose}
                  variant="menu"
                >
                  <Box className={classes.helpDeskMenuCont}>
                    <Typography variant="h4" className={classes.menuTitle}>
                      {t("headerSection.helpDeskDropDown.title")}
                    </Typography>
                    <IconButton
                      aria-label="close"
                      onClick={supportMenuHandleClose}
                      className={classes.closeButton}
                    >
                      <CloseOutlinedIcon />
                    </IconButton>
                    {/* <Box className={classes.searchBoxContainer}>
                        <Grid container alignItems="center">
                          <Grid item xs="auto">
                            <img src={GlobalSearchIcon} className={classes.searchQstnImg} alt="Search a Question" />
                          </Grid>
                          <Grid item xs>
                            <Formik
                              initialValues={initialValues}
                              // validationSchema={validationSchema}
                              onSubmit={onSubmit}
                              innerRef={formikRef}
                              enableReinitialize
                            >
                              {({ submitForm }) => (
                                <Form noValidate autoComplete="off">
                                  <FormControl
                                    className={classes.globSearchInputBox}
                                    control="input"
                                    variant="outlined"
                                    placeholder={t("headerSection.helpDeskDropDown.globSearchInputPlaceholder")}
                                    name="searchedQuestion"
                                    type="text"
                                    id="searchedQuestion"
                                    // required
                                    inputProps={{ maxLength: 50 }}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            type="submit"
                                            aria-label="Submit"
                                            edge="end"
                                          >
                                            <SearchOutlinedIcon />
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Form>
                              )}
                            </Formik>
                          </Grid>
                        </Grid>
                      </Box> */}
                    <Box className={classes.navListSection}>
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<FaqNavBtnIcon />}
                          onClick={() => setFaqQuestionsDialogOpenIs(true)}
                        >
                          {t("headerSection.helpDeskDropDown.helpButtonText1")}
                        </Button>
                      </Box>
                      {/* <Box>
                        <Button
                          variant="outlined"
                          startIcon={<WhatsAppNavBtnIcon />}
                          onClick={() =>
                            window.open(supportData?.whatsapp_help_service?.url)
                          }
                        >
                          {t("headerSection.helpDeskDropDown.helpButtonText2")}
                        </Button>
                      </Box> */}
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<VideoTtrlNavBtnIcon />}
                          onClick={() => setVideoTutorialDialogOpenIs(true)}
                        >
                          {t("headerSection.helpDeskDropDown.helpButtonText3")}
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<ManualDownldNavBtnIcon />}
                          onClick={() => setDownloadDialogOpenIs(true)}
                        >
                          {t("headerSection.helpDeskDropDown.helpButtonText4")}
                        </Button>
                      </Box>
                      {/* <Box>
                        <Button
                          variant="outlined"
                          startIcon={<TermsNdPryNavBtnIcon />}
                          onClick={() =>
                            setTermsPrivacyPolicyDialogOpenIs(true)
                          }
                        >
                          {t("headerSection.helpDeskDropDown.helpButtonText5")}
                        </Button>
                      </Box> */}
                    </Box>
                    <Typography
                      variant="h5"
                      className={classes.querryNumberView}
                    >
                      <span>
                        {t("headerSection.helpDeskDropDown.querryCallUsText")} :{" "}
                        <HelpCellIcon />
                      </span>
                      {/* <a href={`tel: ${supportData?.phone_service?.contact_number1}`}><strong> {supportData?.phone_service?.contact_number1}</strong></a> / */}
                      <a
                        href={`tel: ${supportData?.phone_service?.contact_number2}`}
                      >
                        <strong>
                          {" "}
                          {supportData?.phone_service?.contact_number2}
                        </strong>
                      </a>
                      <br />
                      <span>
                        {t("headerSection.helpDeskDropDown.callUsTimingTxt")}
                      </span>
                    </Typography>
                  </Box>
                  {/* <MenuItem
                    onClick={() => history.push("/privacy-policy")}
                  >
                    {t("Privacy Policy")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => history.push("/refund-policy")}
                  >
                    {t("Refund Policy")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => history.push("/terms-of-use")}
                  >
                    {t("Terms & Conditions")}
                  </MenuItem> */}
                </Menu>
              </Hidden>
              {localStorage.getItem("jwtToken") &&
                currentPathName !== "/set-password" &&
                currentPathName !== "/otp-login" &&
                currentPathName !== "/signup" &&
                currentPathName !== "/login" &&
                currentPathName !== "/signup-success" &&
                currentPathName !== "/forgot-password" &&
                currentPathName !== "/new-password" &&
                currentPathName !== "/" && <NotificationSection />}
              <div>
                {/* <ToggleButtonGroup
                  value={selectedIndex}
                  exclusive
                  onChange={handleOnLangChange}
                  className={`${classes.langToggleBtnGroup} ${headerState}`}
                >
                  {languages.map((item, index) => (
                    <ToggleButton
                      value={index}
                      key={item.code}
                      style={{
                        display:
                          selectedIndex === index ? "none" : "inline-flex",
                      }}
                    >
                      <Typography
                        className={`${classes.langToggleBtn} ${headerState}`}
                      >
                        {item.label}
                      </Typography>
                    </ToggleButton>
                  ))}
                  <span></span>
                </ToggleButtonGroup> */}
                <Button
                  aria-controls="langMenu"
                  aria-haspopup="true"
                  variant="outlined"
                  className={classes.userMenuToggleBtn}
                  size="small"
                  onClick={(e) => handleOnLangItem(e)}
                  startIcon={<LanguageTranslateIcon fontSize="large" />}
                  endIcon={<ExpandMoreIcon />}
                  disableElevation
                  style={{ marginLeft: 0 }}
                >
                  <Hidden only="xs">
                    <span className={classes.buttonText}>
                      {languages[selectedIndex].label}
                    </span>
                  </Hidden>
                  <Hidden only={["sm", "md", "lg"]}>
                    {languages[selectedIndex].code}
                  </Hidden>
                </Button>
                <Menu
                  id="langMenu"
                  anchorEl={anchorElLang}
                  keepMounted
                  open={Boolean(anchorElLang)}
                  onClose={handleOnLangMenuClose}
                  className={classes.prflMenuDropdown}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {languages.map((item, index) => (
                    index !== selectedIndex && (
                      <MenuItem
                        key={item.code}
                        onClick={() => handleOnLangMenuItem(item.code, index)}
                      >
                        {item.label}
                      </MenuItem>
                    )
                  ))}
                </Menu>
                {/* <Button
                aria-controls="langMenu"
                aria-haspopup="true"
                variant="contained"
                size="small"
                onClick={handleOnLangItem}
                startIcon={<LanguageTranslateIcon fontSize="large" />}
                endIcon={<ExpandMoreIcon />}
                disableElevation
              >
                <Hidden only="xs">
                  <span className={classes.buttonText}>
                    {languages[selectedIndex].label}
                  </span>
                </Hidden>
                <Hidden only={["sm", "md", "lg"]}>
                  {languages[selectedIndex].code}
                </Hidden>
              </Button>
              <Menu
                id="langMenu"
                anchorEl={anchorElLang}
                keepMounted
                open={Boolean(anchorElLang)}
                onClose={handleOnLangMenuClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
              >
                {languages.map((item, index) => (
                  <MenuItem
                    key={item.code}
                    disabled={index === selectedIndex}
                    selected={index === selectedIndex}
                    onClick={() => handleOnLangMenuItem(item.code, index)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu> */}


                {localStorage.getItem("jwtToken") &&
                  currentPathName !== "/set-password" &&
                  currentPathName !== "/otp-login" &&
                  currentPathName !== "/signup" &&
                  currentPathName !== "/login" &&
                  currentPathName !== "/signup-success" &&
                  currentPathName !== "/forgot-password" &&
                  currentPathName !== "/new-password" && (
                    <>
                      {currentPathName === "/" ||
                        currentPathName === "/login" ||
                        currentPathName === "/signup" ||
                        currentPathName === "/signup-success" ||
                        currentPathName === "/new-password" ? null : (
                        <Hidden smDown>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<UserLogoIcon />}
                            endIcon={<ExpandMoreIcon />}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            className={classes.userMenuToggleBtn}
                          >
                            {t("headerSection.rightSideMenuTitle")}
                          </Button>
                        </Hidden>
                      )}
                    </>
                  )}
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.prflMenuDropdown}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {profileMenuList.map((item, index) => (
                    <MenuItem
                      key={item.value}
                      onClick={() => handleOnProfileMenuItem(item.value)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </Toolbar>
          <div>
            <React.Fragment key={"left"}>
              <SwipeableDrawer
                anchor={"left"}
                open={drawerState["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {fetchMobileSwipeDrawerList("left")}
              </SwipeableDrawer>
            </React.Fragment>
          </div>
        </AppBar>
        {/* {true &&
          <div className={classes.ribContainer}>
            <marquee direction="left" className="marqueeTxt"> {t("headerSection.ribbion.banner")} {moment(dataScheme?.EndDate).format("MMM Do YY")} {t("headerSection.ribbion.banner1")}</marquee>
            <div className={classes.innerRib}>
              <img src={announcementSpeaker} className="ribIcon" /> {t("headerSection.ribbion.tittle")}
            </div>
          </div>
        } */}

        <SnackBox open={isAutoBookingCancelled} autoHideDuration={10000} onClose={handleAutoCancellationClose}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {t("headerSection.timeValidTxt4")}
          </Alert>
        </SnackBox>

        {(showTimerRibbin && currentPathName != "/" && currentPathName != "/login" && currentPathName != "/forgot-password" && currentPathName != "/otp-login" && currentPathName != "/terms-conditions") &&
          <div className={`${classes.ribContainer} ${classes.hurryRib}`}>
            <Box className={classes.timeContainer}>
              <Grid container>
                <Grid item xs={8}>
                  {(timer.split(":")[0] + timer.split(":")[1] + timer.split(":")[2] + timer.split(":")[3] <= 0) ? <Box className="marqueeTxt">
                    {t('headerSection.timeValidTxt2')}
                  </Box> : <Box className="marqueeTxt">
                    {timeValidText()}
                  </Box>}
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Grid container className={classes.timerContent}>
                      <Grid item xs={1}>
                        <AlamIcon />
                      </Grid>
                      <Grid item xs={2}>
                        <Box className="timeLabel">
                          {timer.split(":")[0]} {t('headerSection.dayTxt')}
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className="timeLabel">
                          {timer.split(":")[1]} {t('headerSection.hrTxt')}
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className="timeLabel">
                          {timer.split(":")[2]} {t('headerSection.minTxt')}
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className="timeLabel">
                          {timer.split(":")[3]} {t('headerSection.secTxt')}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                </Grid>
              </Grid>
            </Box>
            <div className={`${classes.innerRib} ${classes.hurryInnerRib}`}>
              {timer.split(":")[0] == "0" && timer.split(":")[1] == "0" && timer.split(":")[2] == "0" && timer.split(":")[3] == "0" ? <Typography variant="h4">
                TIME OUT
              </Typography> : <img src={hurryImage} className="hurryImage" />}
            </div>
          </div>
        }
        {/* {!isOnline && <Box width='100%' height='25px' color='white' textAlign='center' style={{ background: "orangered" }}>
          <Grow
            in={!isOnline}
            style={{ transformOrigin: '0 0 0' }}
            {...(!isOnline ? { timeout: 1000 } : {})}
          ><Typography style={{ fontWeight: 'bold' }}>You are offline. Please check your internet connection.</Typography>
          </Grow>
        </Box>} */}
      </Box>
      {faqQuestionsDialogOpenIs && (
        <FaqQuestionsDialogBox
          open={faqQuestionsDialogOpenIs}
          onClose={handleCloseFaqQuestionsDialogBox}
        />
      )}
      {videoTutorialDialogOpenIs && (
        <VideoTutorialHelpDialogBox
          open={videoTutorialDialogOpenIs}
          onClose={handleCloseVideoTutorialDialogBox}
        />
      )}
      {termsPrivacyPolicyDialogOpenIs && (
        <TermsPrivacyPolicyDialogBox
          open={termsPrivacyPolicyDialogOpenIs}
          onClose={handleCloseTermsPrivacyPolicyDialogBox}
        />
      )}
      {downloadDialogOpenIs && (
        <DownloadDialogBox
          open={downloadDialogOpenIs}
          onClose={handleCloseTermsPrivacyPolicyDialogBox1}
        />
      )}
      {/* {showOverlay && <NotificationOverlay onCloseOverlay={handleCloseOverlay} />} */}
    </>
  );
};

export default withWidth()(Header);
