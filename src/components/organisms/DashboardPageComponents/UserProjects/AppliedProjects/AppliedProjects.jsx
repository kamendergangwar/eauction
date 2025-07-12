import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
// import SearchIcon from "@material-ui/core/Search";
// import SearchIcon from "@material-ui/core/Search";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useHistory } from "react-router-dom";
import moment from "moment";
/* import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotelOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import SquareFootOutlinedIcon from "@material-ui/icons/SquareFootOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { green, orange, red, yellow } from "@material-ui/core/colors"; */
import { useSelector, useDispatch } from "react-redux";
import DefaultMessageBox from "../../../../atoms/DefaultMessageBox/DefaultMessageBox";
import {
  getApplication,
  applicationSelector,
  clearApplicationState
} from "../../../../../redux/features/application/ApplicationSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../../redux/features/preferences/PreferencesSlice";
// import { getApplicant, applicantSelector } from "../../../../../redux/features/applicant/ApplicantSlice";
import { getReservationCategories, isSchemeExpired, masterDataSelector } from "../../../../../redux/features/masterdata/MasterDataSlice";
/* import {
  setDummyProjectList,
  projectDataSelector,
  clearProjectList,
} from "../../../../../redux/features/projectdata/ProjectDataSlice"; */
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import ApplicationsCard from "../ApplicationsCard/ApplicationsCard";
import ApplicationProgressIndicator from "../ApplicationsCard/ApplicationProgressIndicator";
// import EstampingPending from "../EstampingPending/EstampingPending";
/* import {
  getDocumentDetails,
  estampingDocumentSelector,
  getDocumentId,
} from "../../../../../redux/features/file/EstampingDocSlice"; */
import { getStepperDetails } from "../../../../../redux/features/stepper/StepperSlice";
import ProjectImage from "../../../../../assets/bannerImages/image1.png";
import { ApiEndPoint } from "../../../../../utils/Common";
import { VerifiedSuccessIcon, ApplicationProgressIcon6, LostTagIcon, RefundedTagIcon, WinnerTagIcon, ClaimHouseTagIcon, ApplicationSearchIcons, BookedTagIcon, ScaleIcon, RoomTypeIcon, UnitTypeIcon, WingIcon, FloorStepIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import UserProgressStepper from "../UserProgressStepper/UserProgressStepper";
import { applicantSelector } from "../../../../../redux/features/applicant/ApplicantSlice";


const ApiEndPointPDFDownloader = ApiEndPoint + "/PDFDownloader/echallan/";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },
  secTitle: {
    color: "#0F2940",
    fontSize: "1.25rem",
    fontWeight: 600,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(3)
    }
  },
  applyNewProjBtnCol: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginBottom: theme.spacing(1),
      "& .MuiButtonBase-root": {
        fontSize: "0.875rem",
        fontWeight: 700,
      }
    }
  },
  docUploadErrorTxtView: {
    textAlign: "center",
    fontSize: "0.8rem",
    color: "#ff9800",
    paddingTop: theme.spacing(1),
  },
  // applieDate: {
  //   color: "#BBBBBB",
  //   fontSize: "0.8rem",
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(1),
  //   fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","),
  // },
  cardRoot: {
    backgroundColor: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    marginTop: theme.spacing(1),
    position: "relative",
  },
  RefundedRibbon: {
    position: "absolute",
    top: "0",
    left: "-12px",
    "& .MuiSvgIcon-root": {
      width: "auto",
      height: "auto",
    }
  },
  cover: {
    width: 195,
    minHeight: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 80,
      minHeight: "auto"
    },
  },
  cardHeader: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5)
    },
  },
  applicationNoView: {
    display:"flex",
    color: "#4C5C6D",
    fontSize: "0.8rem",
    fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","),
    lineHeight: "24px",
    letterSpacing: "0.04em",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 400,
      fontSize: "0.5rem",
    },
    "& strong": {
      color: "#00437E",
      fontSize: "1rem",
      lineHeight: "24px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        fontWeight: "600",
      },
    },
    "& img": {
      [theme.breakpoints.down("sm")]: {
        display:"none"
      },
    }
  },
  applicationStatusCont: {
    display: "flex",
    color: "rgba(76, 92, 109, 0.8)",
    fontSize: "12px",
    fontFamily: ["Noto Sans", '"Poppins"', "sans-serif"].join(","),
    fontWeight: 400,
    lineHeight: "16px",
    alignItems: "center",
    textAlign: "right"
  },
  statusViewChip: {
    backgroundColor: "rgb(82 82 82 / 5%)",
    border: "1px solid rgb(0 0 0 / 10%)",
    borderRadius: 40,
    color: "#6e6e6e",
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: theme.spacing(0.5, 2.5),
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginLeft: "8px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
      padding: theme.spacing(0.5, 3),
    },
    "&.rejected": {
      backgroundColor: "rgba(235, 87, 87, 0.05)",
      borderColor: "rgba(235, 87, 87, 0.1)",
      color: "#EB5757"
    },
    "&.waiting": {
      backgroundColor: "rgba(242, 153, 74, 0.05)",
      borderColor: "rgba(242, 153, 74, 0.1)",
      color: "#F2994A"
    },
    "&.verified": {
      backgroundColor: "rgba(33, 150, 83, 0.05)",
      borderColor: "rgba(33, 150, 83, 0.1)",
      color: "#219653"
    },
    "&.RefundInitiated": {
      backgroundColor: "rgba(235, 87, 87, 0.05)",
      borderColor: "rgba(235, 87, 87, 0.1)",
      color: "#EB5757"
    },
    "&.completed": {
      backgroundColor: "rgba(33, 150, 83, 0.05)",
      borderColor: "rgba(33, 150, 83, 0.1)",
      color: "#219653"
    },
    "&.InProgress": {
      backgroundColor: "rgba(236, 170, 0, 0.1)",
      borderColor: "rgba(236, 170, 0, 0.2)",
      color: "#ECAA00"
    },
    "&.Progress": {
      backgroundColor: "#E5EFFF",
      borderColor: "rgba(0, 94, 255, 0.2)",
      color: "#005EFF"
    },
    "&.Refunded": {
      backgroundColor: "#E5EFFF",
      borderColor: "rgba(0, 94, 255, 0.2)",
      color: "#005EFF"
    },
  },
  cardContentCont: {
    padding: theme.spacing(2, 2.5),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  projectTitle: {
    color: "#00437E",
    fontSize: "18px",
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      padding: theme.spacing(1.25),
      margin: 0
    },
  },
  catTitleView: {
    color: "#4C5C6D",
    fontSize: "0.8rem",
    marginBottom: theme.spacing(0.8)
  },
  chipCont: {
    whiteSpace: "pre-wrap",
    "& .MuiChip-root": {
      backgroundColor: "#EAF2FC",
      color: "#00437E",
      fontWeight: 600,
      fontSize: "0.8rem",
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      maxWidth: 360,
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        maxWidth: "70%",
        padding: theme.spacing(1)
      },
      "& .MuiChip-label": {
        [theme.breakpoints.down("sm")]: {
          whiteSpace: "initial",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }
    }
  },
  catViewSection: {
    paddingTop: theme.spacing(1.875),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 1.25),
    },
  },
  cardActionSec: {
    [theme.breakpoints.down("sm")]: {
      borderTop: "1px solid rgba(1, 81, 202, 0.1)",
      padding: theme.spacing(1.25),
      textAlign: "center",
      "& .MuiButtonBase-root": {
        fontSize: "0.875rem",
        fontWeight: 600,
        lineHeight: "24px",
      }
    },
  },
  paymentPendingTxt: {
    fontSize: "0.7rem",
    marginBottom: theme.spacing(0.5),
    textAlign: "center"
  },
  orTxt: {
    fontSize: "0.8rem",
    lineHeight: "40px",
    padding: "0 10px"
  },
  uploadDocBtn: {
    background: "linear-gradient(326deg, rgb(0 13 199) 0%, rgb(16 147 245) 70%)",
    border: 0
  },
  requiredDocumentCount: {
    marginRight: "8px",
    "& .reqCount": {
      fontWeight: "700",
      color: "#0F2940"
    }
  },
  selectedDetail: {
    display: "flex",
    alignItems: "center",
    padding: "2px 12px",
    background: "#FFFFFF",
    borderRadius: "40px",
    width: "fit-content",
    color: "#65707D",
    fontWeight: "600",
    fontSize: "12px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    "& span": {
      color: "#00437E",
      fontWeight: "700",
      fontSize: "14px",
    },
  },
  selectedCatCont:{
    padding: theme.spacing(0,2),
    width: "-webkit-fill-available"
  },
  dataValueViewBox: {
    marginLeft: theme.spacing(1.5),
  },
  scaleIconView: {
    fontSize: "2rem",
  },
  dataTitle: {
    color: "#65707D",
    fontWeight: 600,
    fontSize: "0.8rem",
  },
  dataValue: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
}));

let checkWinner;
let checkLost;

const AppliedProjects = (props) => {
  const {state, bannerState, schemeStatus ,activeStep, reservationCategoryData,doclist} = props;
  const classes = useStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const dispatch = useDispatch();
  const [selectedFlat, setSelectedFlat] = useState([]);
  // const [isSigned, setIsSigned] = useState(false);
  // const [isEstampingSelected, setIsEstampingSelected] = useState(false);
  const {
    applicationData,
    isFetchingApplication,
    isSuccessResApplication,
    isErrorApplication,
    applicationBookingStatus,
    errorMsgApplication } = useSelector(applicationSelector);
  const {
    isSuccessResGetPreferences
  } = useSelector(preferencesSelector);
  const { applicantData, isSuccessResApplicant } = useSelector(applicantSelector);
  // const {paymentPending,setPaymentPending}=useState(false);
  // const { demoProjectList} = useSelector(projectDataSelector);
  // const [istransactionComplete, setIsTransactionComplete] = useState(false);
  /* const {
    isDocIdSuccess,
    docIdData,
    isFetchingDoc,
    isDocFileSuccess,
    docSuccessMessage,
    docFileData,
    docFileError,
    deocErrorMessage,
  } = useSelector(estampingDocumentSelector); */
  const history = useHistory();
  const [savedProjectsGroupList, setSavedProjectsGroupList] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const { reservationCategoriesData, reservationCategory, castCategory, isErrorScheme, isFetchingScheme, errorMsgScheme } =
    useSelector(masterDataSelector);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const [age, setAge] = React.useState('10');

  useEffect(() => {
    // dispatch(getReservationCategories());
    dispatch(getApplication());
    dispatch(getStepperDetails());
    // dispatch(isSchemeExpired());
  }, [dispatch, t]);

  /* useEffect(() => {
    if (isSuccessResApplicant) {
      if (applicantData) {
        // console.log(applicantData.ApplicationDetails);
        if (applicantData.ApplicationDetails?.length > 0) {
          if (applicantData.ApplicationDetails[0].TransactionDetails) {
            // console.log("upper", applicantData.ApplicationDetails[0].TransactionDetails);
            if (
              applicantData.ApplicationDetails[0].TransactionDetails.length > 0
            ) {
              // console.log(
              //   "mains",
              //   applicantData.ApplicationDetails[0].TransactionDetails[0]
              //     .PaymentStatus
              // );
              if (
                applicantData.ApplicationDetails[0].TransactionDetails[0]
                  .PaymentStatus == 1
              ) {
                setIsTransactionComplete(true);
              }
            }
          }
        }
        // dispatch(getDocumentId(applicantData.ApplicantId));
        if (applicantData.IsEstamp === "0") {
          setIsEstampingSelected(false);
        } else {
          setIsEstampingSelected(true);
        }
      }
    }
  }, [applicantData, dispatch, isSuccessResApplicant, t]); */

  /* useEffect(() => {
    if (isDocIdSuccess && docIdData?.length > 0) {
      // console.log(docIdData[0].DocumentId);
      dispatch(getDocumentDetails(docIdData[0].DocumentId));
    }
  }, [isDocIdSuccess]); */

  /* useEffect(() => {
    if (isDocFileSuccess) {
      // console.log(docFileData.requests);
      if (docFileData?.requests?.length > 0) {
        const signed = docFileData.requests.map((data) => data.signed);
        // console.log(signed[0]);
        setIsSigned(signed[0]);
      }
      // console.log(isSigned);
    }
  }, [isDocFileSuccess, docFileData]); */

  useEffect(() => {
    if (isSuccessResApplication && applicationData) {
      // dispatch(clearProjectList());
      let temp_proj_list = [];
      applicationData.forEach((innerItem, i) => {
        if (!Array.isArray(innerItem.ProjectDetails)) {
          // && innerItem.ApplicationStatus !== "0"
          let filterState = state == "inProgress" ? (innerItem.ApplicationStatus == "0") : (innerItem.ApplicationStatus == "1" || innerItem.ApplicationStatus == "2" || innerItem.ApplicationStatus == "3" || innerItem.ApplicationStatus == "4" || innerItem.ApplicationStatus == "5" || innerItem.ApplicationStatus == "6" || innerItem.ApplicationStatus == "9");
          if (filterState) {
            let newItem = {
              schemeName: innerItem.ProjectDetails.scheme || "-",
              schemeId: innerItem.schemeId || "-",
              idlisting: innerItem.ProjectDetails.idlisting || "-",
              applicationId: innerItem.ApplicationId || "-",
              transId: innerItem.ApplicationStatus == "1" ? innerItem?.Transaction[0]?.UniqId : "",
              barcodeRrl: innerItem.ApplicationStatus == "1" ? innerItem?.Transaction[0]?.barcode_url : "",
              ApplicationStatus: innerItem.ApplicationStatus || "-",
              projectId: innerItem.ProjectId || "-",
              reservationId: innerItem.ReservationId || "-",
              gps: innerItem.ProjectDetails.gps || "-",
              lat: innerItem.ProjectDetails.lat || "-",
              lng: innerItem.ProjectDetails.lng || "-",
              image: innerItem.ProjectDetails.images[0] || ProjectImage,
              location: innerItem.ProjectDetails.address || "-",
              createdAt: moment(innerItem.CreatedAt).format("DD MMM, YYYY"),
              ChallanDetails: innerItem.ChallanDetails,
              Steps: innerItem.Steps,
              uploaded_Document: innerItem.uploaded_Document,
              Required_Document: innerItem.Required_Document,
              ApplicationAppliedDate: innerItem.ApplicationAppliedDate,
              applicantCategory: innerItem.ApplicantCategory,
            };
            let statusTransTxtPath = "";
            switch (innerItem.ApplicationStatus) {
              case "0":
                newItem.appStatusClass = "saved";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
              case "1":
                newItem.appStatusClass = "completed";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
              case "2":
                newItem.appStatusClass = "RefundInitiated";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "Refund Status :";
                break;
              case "3":
                newItem.appStatusClass = "verified";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = <VerifiedSuccessIcon fontSize="small" />;
                newItem.StatusDesc = "Verification Status :";
                break;
              case "4":
                newItem.appStatusClass = "winner";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
              case "5":
                newItem.appStatusClass = "waiting";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
              case "6":
                newItem.appStatusClass = "lost";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
              case "7":
                newItem.appStatusClass = "Refunded";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "Refund Status :";
                break;
              case "8":
                newItem.appStatusClass = "InProgress";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = <ApplicationProgressIcon6 fontSize="small" />;
                newItem.StatusDesc = "Verification Status :";
                break;
              case "9":
                newItem.appStatusClass = "delete";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
              case "10":
                newItem.appStatusClass = "NotStarted";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "Verification Status :";
                break;
              case "11":
                newItem.appStatusClass = "Progress";
                statusTransTxtPath = "userProjects.applied.applicationStatusValTxt." + newItem.appStatusClass;
                newItem.appStatusTxt = t(statusTransTxtPath);
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
              default:
                newItem.appStatusClass = "";
                newItem.appStatusTxt = "";
                newItem.StatusIcon = "";
                newItem.StatusDesc = "";
                break;
            }
            // if (innerItem.ProjectDetails.attributes) {
            newItem.title = innerItem.ProjectDetails.attributes["Title"] || "-";
            newItem.price = innerItem.ProjectDetails.attributes["Base Price"] || "-";
            newItem.carpetArea =
              innerItem.ProjectDetails.attributes["Carpet Area"] || "-";
            newItem.bhk = innerItem.ProjectDetails.attributes["Type"] || "-";
            newItem.status =
              innerItem.ProjectDetails.attributes["Development Status"] || "-";
            newItem.reraId = innerItem.ProjectDetails.attributes["Rera Id"] || "-";
            newItem.about = innerItem.ProjectDetails.attributes["About"] || "-";
            newItem.incomeGroup =
              innerItem.ProjectDetails.attributes["Income Group"] || "-";
            newItem.amenities =
              innerItem.ProjectDetails.attributes["amenities"] || "-";
            newItem.floorPlan =
              innerItem.ProjectDetails.attributes["floor_plan"] || "-";
            newItem.categories = [];

            let cat_list_string = innerItem.ProjectDetails.attributes["Category"];
            if (cat_list_string) {
              newItem.categories = cat_list_string.split(",").map((item) => item.trim());
            }
            // }
            // dispatch(setDummyProjectList(newItem));
            temp_proj_list.push(newItem);
          }
        }
      });
      let resultData2 = temp_proj_list;
      let get_final_data = temp_proj_list.reduce(function (res, currentValue) {
        if (res.indexOf(currentValue.createdAt) === -1) {
          res.push(currentValue.createdAt);
        }
        return res;
      }, [])
        .map(function (value) {
          return {
            createdAt: value,
            subList: resultData2.filter(function (_el) {
              return _el.createdAt === value;
            }).map(function (_el) {
              return _el;
            }),
          };
        });
      setSavedProjectsGroupList(get_final_data);
      // set dashboard banner status
      // console.log(get_final_data, "get_final_data[0]")
      // let checkWinner = get_final_data[0]?.subList?.find((item) => {
      //   // console.log(item.ApplicationStatus, "item ApplicationStatus check 1")
      //   // item.ApplicationStatus == "4"
      // });
      // let checkLost = get_final_data?.find((item) => {
      //   // item.ApplicationStatus == "6"
      //   // console.log(item.subList, "item ApplicationStatus check 2")
      // });

      dispatch(clearApplicationState());
    }
  }, [applicationData, dispatch, isSuccessResApplication, t]);

  useEffect(() => {
    if (isSuccessResApplication && applicationBookingStatus) {
      setSelectedFlat(applicationBookingStatus);
    }
  }, [isSuccessResApplication && applicationBookingStatus]);

 
  if (applicationData.some(e => e.ApplicationStatus == 4)) {
    bannerState(4);
  } else if (applicationData.some(e => e.ApplicationStatus == 6)) {
    bannerState(6);
  }
  
  // useEffect(() => {
  //   if (savedProjectsGroupList.length > 0) {
  //     console.log(savedProjectsGroupList, "savedProjectsGroupList");
  //     savedProjectsGroupList.forEach((item) => {
  //       item.subList.filter((data) => {
  //         // console.log(data, "check loop")
  //         if (data.ApplicationStatus == 4) {
  //           checkWinner = data.ApplicationStatus;
  //         }
  //         if (data.ApplicationStatus == 6) {
  //           checkLost = data.ApplicationStatus;
  //         }
  //       })
  //     })
  //     if (checkWinner == "4") {
  //       bannerState(checkWinner);
  //     } else {
  //       bannerState(checkLost);
  //     }
  //   }
  // }, [savedProjectsGroupList])

  const categoryTag = (id) => {
    let catName = "";
    for (let i = 0; i < reservationCategoriesData.length; i++) {
      const element = reservationCategoriesData[i];
      if (element.ResrevationCatId === id) {
        catName = element.ReservationCategoryName;
      }
    }
    return <Chip label={catName} />;
  };

  const applyNewApplication = () => {
    history.push("/question-1");
    // const stepper = stepperData.superStepper;
    // let redirect_url = "";
    // for (let i = 0; i < stepper[0].applicantKycStepper.length; i++) {
    //   const element = stepper[0].applicantKycStepper[i];
    //   if (element.step === 1) {
    //     if (element.status !== "completed") {
    //       redirect_url = "/auth-verify-aadhaar";
    //       break;
    //     }
    //   } else if (element.step === 2) {
    //     if (element.status !== "completed") {
    //       redirect_url = "/upload-aadhaar";
    //       break;
    //     }
    //   } else if (element.step === 3) {
    //     if (element.status !== "completed") {
    //       redirect_url = "/verify-pancard";
    //       break;
    //     }
    //   } else if (element.step === 4) {
    //     if (element.status !== "completed") {
    //       redirect_url = "/upload-pancard";
    //       break;
    //     }
    //   } else if (element.step === 5) {
    //     if (element.status !== "completed") {
    //       redirect_url = "/bank-account-detail";
    //       break;
    //     }
    //   } else if (element.step === 6) {
    //     if (element.status !== "completed") {
    //       redirect_url = "/upload-cheque";
    //       break;
    //     }
    //   }
    // }
    /* if (!redirect_url) {
      if (!(applicantData.agreed_declaration === "1")) {
        localStorage.setItem("agreedDeclaration", true);
        redirect_url = "/upload-cheque";
      }
    }
    if (!redirect_url) {
      if (!(applicantData.isPmyNonPmyFlowCompleted === "1")) {
        redirect_url = "/question-1";
      }
    } */
    // if (!redirect_url) {
    //   redirect_url = "/personal-details";
    // }
    // history.push(redirect_url);
  };

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      dispatch(clearPreferencesState());
    }
  }, [isSuccessResGetPreferences])

  const downloadEChallan = (item) => {
    // window.open(ApiEndPointPDFDownloader + item.ChallanDetails.ChallanId)
    dispatch(getPreferencesList()).then(res => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = ApiEndPointPDFDownloader + item.ChallanDetails.ChallanId;
        fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }).then((response) => response.blob()).then((blob) => {
          setPdfLoading(false);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = item.ChallanDetails.ChallanId + '-E-challan';
          document.body.append(link);
          link.click();
          link.remove();
          // in case the Blob uses a lot of memory
          setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(function (error) {
          setPdfLoading(false);
          alert("E-challan not found");
        });
      }

    });
  }

  /* useEffect(() => {
    console.log("demoProjectList", demoProjectList);

    setProjectsGroupList(demoProjectList);
  }, [demoProjectList]); */

  /* const numberWithCommas = (amount_val) => {
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
  }; */
  return (
    <>
    {applicantData && <UserProgressStepper  reservationCategory={reservationCategory} savedProjectsGroupList={savedProjectsGroupList} doclist={doclist} />}
    <div className={classes.mainRoot}>

      {(isFetchingApplication || isFetchingStepper || pdfLoading) && <Loading isOpen={isFetchingApplication || isFetchingStepper || pdfLoading} />}
      {isErrorApplication && (
        <AlertBox severity="error">{errorMsgApplication}</AlertBox>
      )}
      {isErrorStepper && (
        <AlertBox severity="error">{errorMessageStepper}</AlertBox>
      )}
      {/* estamping pending indicator on dashboard 
     it checka for signed status from document api of estamping */}

      {/* {istransactionComplete && !isSigned && isEstampingSelected && (
        <EstampingPending />
      )} */}
      <Grid container justify="space-between">
        {/* <Grid item md xs={12}>
          {<Typography variant="h4" className={classes.secTitle}>{state == "inProgress" ? t("userProjects.applied.title") : t("userProjects.saved.title")}</Typography>}
        </Grid> */}
        <Grid item md xs={12}>
          <Grid container justify="flex-end">
            {/* <Grid item md="auto" xs={12} className={classes.applyNewProjBtnCol}>
              <Button color="primary" variant="contained" onClick={applyNewApplication} disabled={schemeStatus}>{t("userProjects.applied.applyNewProjectBtnTxt")}</Button>
            </Grid> */}
            <Grid item md="auto" xs={12} className={classes.applyNewProjBtnCol}>
              {/* <Button color="primary" variant="contained" onClick={() => history.push("/upload-documents")}>{t("userProjects.applied.goUploadDocumentsBtnTxt")}</Button>
              {isPendingDocUpload &&
                <Typography className={classes.docUploadErrorTxtView}>{t("userProjects.applied.uploadDocsPendingStatusTxt")}</Typography>
              } */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid container alignItems="baseline" justify="space-between" sx={{ width: "100%", padding: "16px 25px" }} >
        <Grid item md="6" xs={12}>
          <Paper sx={{
            p: "2px 4px", display: "flex", alignItems: "center", width: "100%", background: "#FCFCFC",
            border: "1px solid rgba(38, 50, 56, 0.1)",
            borderRadius: "30px"
          }}>
            <InputBase sx={{ ml: 1, flex: 1 }} style={{ width: "90%", padding: "10px", margin: "0px" }} placeholder="Search Projects" inputProps={{ "aria-label": "Search Projects" }} />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} md="2" sx={{ padding: "10px" }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={age}
              label="Age"
            >
              <MenuItem value="">
                <em>Refunded</em>
              </MenuItem>
              <MenuItem value={10}>Not Started</MenuItem>
              <MenuItem value={20}>In Progress</MenuItem>
              <MenuItem value={30}>Verified</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid> */}
      {/* {savedProjectsGroupList.length === 0 && (
        <DefaultMessageBox
          firstLineMsg={t("appliedSavedTabDefaultSection.firstLineErrorMsg")}
          secdLineMsg={t("appliedSavedTabDefaultSection.secondLineErrorMsg")}
          actionBtnTxt={t("appliedSavedTabDefaultSection.actionButtonText")}
          action={() => {
            history.push("/select-projects");
          }}
        />
      )} */}
      {savedProjectsGroupList.map((element, index) => (
        <Box key={index}>
          {index == 0 && < Typography variant="h4" className={classes.secTitle}>{state == "inProgress" ? t("userProjects.applied.title") : t("userProjects.saved.title")}</Typography>}
          {/* <Typography className={classes.applieDate}>{element.createdAt}</Typography> */}
          {element.subList.map((projectDetails, i) => (
            < Card className={classes.cardRoot} key={i} >
              {projectDetails.ApplicationStatus == "4" &&
                <Box className={classes.RefundedRibbon}>
                  <BookedTagIcon />
                </Box>
              }
              {/* {projectDetails.ApplicationStatus == "6" &&
                <Box className={classes.RefundedRibbon}>
                  <LostTagIcon />
                </Box>
              } */}

              < Grid container >
                <Grid item md="auto" xs={12}>
                  <CardMedia
                    className={classes.cover}
                    image={projectDetails.image}
                    title="Projects image"
                    component="img"
                    referrerPolicy="no-referrer"
                    disabled
                  />
                </Grid>
                <Grid item md xs={12}>
                  <Box className={classes.cardBody}>
                    <Grid container alignItems="center" justify="space-between" className={classes.cardHeader}>
                      {/* <Grid item md="auto"> */}
                        {/* | {projectDetails.ApplicationAppliedDate */}
                        {/* {projectDetails.transId && <Typography className={classes.applicationNoView}>{t("userProjects.applied.projectAppNoLabel")} <strong>{projectDetails.transId}</strong><img src={`${projectDetails.barcodeRrl}`}/>
                        </Typography>}
                      </Grid> */}
                      <Grid item xs={12} md="auto" >
                          <Typography className={classes.projectTitle}>{projectDetails.title}</Typography>
                        </Grid>
                      <Grid item xs={12} md="auto">
                        <Grid container alignItems="center" justify="right">
                          {/* {state == "completed" && <span> <Box className={classes.requiredDocumentCount}>{t("userProjects.applied.requiredDocumentCountLabel")} : <span className="reqCount">{projectDetails.uploaded_Document}/</span><span>{projectDetails.Required_Document}</span> |</Box> </span>} */}
                          <Box className={classes.applicationStatusCont}>
                            <Box className={`${classes.statusViewChip} ${projectDetails.appStatusClass}`}> {projectDetails.StatusIcon} {projectDetails.appStatusTxt}</Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box className={classes.cardContentCont}>
                      <Grid container >
                        
                        <Grid container xs={12} >
                          <Grid xs={12} container className={classes.catViewSection} style={{padding: "0"}}>
                              {/* <ApplicationProgressIndicator projectDetails={projectDetails} /> */}
                            <Box className={classes.selectedCatCont}>
                        {selectedFlat != undefined &&
                            (
                            <>
                              {selectedFlat.map((item) => (
                              <Grid container alignItems="center" style={{minWidth: "max-content",marginRight: "40px"}}>
                            <Grid item xs={2} >
                              <Grid container alignItems="center" >
                                <Grid item>
                                  <FloorStepIcon
                                    className={classes.scaleIconView}
                                  />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("Floor")}
                                    </Typography>
                                    <Typography className={classes.dataValue}>
                                      {item.FloorNo || "--"}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={2} >
                              <Grid container alignItems="center" >
                                <Grid item>
                                  <WingIcon
                                    className={classes.scaleIconView}
                                  />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("Tower")}
                                    </Typography>
                                    <Typography className={classes.dataValue}>
                                      {item.Wing || "--"}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={2} >
                              <Grid container alignItems="center" >
                                <Grid item>
                                  <UnitTypeIcon
                                    className={classes.scaleIconView}
                                  />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("Unit")}
                                    </Typography>
                                    <Typography className={classes.dataValue}>
                                      {item.FlatNo|| "--"}{" "}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          <Grid item xs={2} >
                            <Grid container alignItems="center" >
                              <Grid item>
                                <RoomTypeIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    {t("Type")}
                                  </Typography>
                                  <Typography className={classes.dataValue}>
                                    {item.flat_type || "--"}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={2} >
                            <Grid container alignItems="center" >
                              <Grid item>
                                <ScaleIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    {t("RERA Carpet Area")}
                                  </Typography>
                                  <Typography className={classes.dataValue}>
                                    {item.CarpetArea || "--"}{" "}SQFT
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          </Grid>
                              ))}
                            </>
                          )}
                          </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container alignItems="flex-end">
                        <Grid item md xs={12} className={classes.catViewSection}>
                          <Typography className={classes.catTitleView}>{t("userProjects.applied.appliedCatLabel")}</Typography>
                          <Box className={classes.chipCont}>
                            {/* {categoryTag(projectDetails.reservationId)} */}
                            {/* {projectDetails?.applicantCategory.map((item, i) => (
                              <Chip key={i} label={item} />
                            ))} */}
                            {/* {projectDetails.applicantCategory.length === 0 && <span>-</span>} */}
                            {projectDetails?.applicantCategory != undefined && <>
                              {projectDetails?.applicantCategory?.map((item, i) => <Chip key={i} label={item.name} />)}
                            </>}
                          </Box>
                        </Grid>
                        <Grid item md="auto" xs={12} className={classes.cardActionSec}>
                          {/* {projectDetails.appStatusClass === "saved" ?
                            <> */}
                              {/* <Typography className={classes.paymentPendingTxt}>{t("userProjects.applied.paymentPendingStatusTxt")}</Typography> */}
                              {/* <Button color="primary" variant="outlined" onClick={() => history.push("/make-payments")} disabled={schemeStatus}>{t("userProjects.applied.continuePaymentBtnTxt")}</Button>
                            </>
                            : projectDetails.Steps[4].step5 == "Pending" ?
                              <Button color="primary" variant="outlined" onClick={() => history.push("/upload-documents")}>{t("userProjects.applied.uploadDocumentBtnText")}</Button> :
                              state == "completed" && projectDetails.Steps[4].step5 == "Completed" ? <Button color="primary" variant="outlined" onClick={() => history.push("/upload-documents")}>{t("userProjects.applied.editDocumentsBtnTxt")}</Button> : <Button color="primary" variant="outlined" onClick={() => history.push("/transaction-details")}>{t("userProjects.applied.viewAppBtnText")}</Button>
                          } */}
                          {/* {projectDetails.appStatusClass === "waiting" &&
                            <Button color="primary" variant="contained" className={classes.uploadDocBtn}>{t("userProjects.applied.uploadDocumentBtnText")}</Button>
                          } */}
                        </Grid>
                        {(projectDetails?.ChallanDetails && state == "inProgress") && (<Hidden smDown>
                          <Grid item md="auto">
                            <Typography className={classes.orTxt}>{t("userProjects.applied.orTxt")}</Typography>
                          </Grid>
                        </Hidden>)}
                        <Grid item md="auto" xs={12} className={classes.cardActionSec}>
                          {/* {(projectDetails?.ChallanDetails && state == "inProgress") &&
                            <Button color="primary" variant="contained" className={classes.uploadDocBtn} onClick={() => downloadEChallan(projectDetails)}>{t("userProjects.applied.downloadEchallanBtn")}</Button>
                          } */}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          ))
          }
        </Box >
      ))
      }
    </div >
    </>
  );
};

export default AppliedProjects;
