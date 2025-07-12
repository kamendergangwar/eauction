import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
// import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
// import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotelOutlined";
// import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
// import SquareFootOutlinedIcon from "@material-ui/icons/SquareFootOutlined";
// import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
// import PriorityHighOutlinedIcon from "@material-ui/icons/PriorityHighOutlined";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { DateLastUpdateIcon, PersonalDtlsStsIcon, CatDtlsStsIcon, ProjectDtlsStsIcon, PaymentDtlsStsIcon, SubmitDocDtlsStsIcon, ProjectStsCompletedIcon } from "../../../../atoms/SvgIcons/SvgIcons";
// import DefaultMessageBox from "../../../../atoms/DefaultMessageBox/DefaultMessageBox";
/* import {
  getApplication,
  applicationSelector,
} from "../../../../../redux/features/application/ApplicationSlice"; */
/* import {
  getApplicant,
  clearApplicantState,
  applicantSelector
} from "../../../../../redux/features/applicant/ApplicantSlice"; */
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import {
  getStepperDetails
} from "../../../../../redux/features/stepper/StepperSlice";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    padding: theme.spacing(5, 15),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2),
    },
  },
  defaultInfoMsgBox: {
    textAlign: "center",
    padding: theme.spacing(8, 0, 3),
    "& .MuiTypography-body1": {
      color: "#65707D",
      fontSize: "0.8rem",
      marginBottom: theme.spacing(2.5)
    }
  },
  secTitle: {
    color: "#0F2940",
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: theme.spacing(0.5)
  },
  secTitleSubText: {
    color: "#65707D",
    fontSize: "0.8rem",
    fontWeight: "normal",
    marginBottom: theme.spacing(3)
  },
  applctnProcessBox: {
    background: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10
  },
  boxHeader: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    padding: theme.spacing(1.5, 2)
  },
  lastUpdatedDateView: {
    color: "#4C5D6C",
    fontSize: "0.8rem",
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
      verticalAlign: "middle",
      marginRight: theme.spacing(0.5)
    },
    "& span": {
      verticalAlign: "middle",
      display: "inline-block",
      marginRight: theme.spacing(0.5)
    },
    "& strong": {
      verticalAlign: "middle",
      display: "inline-block"
    },
  },
  statusViewChip: {
    backgroundColor: "rgba(33, 150, 83, 0.05)",
    border: "1px solid rgba(33, 150, 83, 0.1)",
    borderRadius: 40,
    color: "#219653",
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1, 4),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(0.5, 3),
    },
    "&.rejected": {
      backgroundColor: "rgba(235, 87, 87, 0.05)",
      borderColor: "rgba(235, 87, 87, 0.1)",
      color: "#EB5757"
    }
  },
  boxContentCont: {
    padding: theme.spacing(2, 2.5),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  stsHeader: {
    padding: theme.spacing(2, 2, 0)
  },
  stepperSec: {
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 0),
    },
  },
  stepperBox: {
    textAlign: "center",
    position: "relative",
    height: 80,
  },
  numRoundBox: {
    backgroundColor: "#FFFFFF",
    border: "2px solid #F1F4F8",
    boxShadow: "0px 0px 20px rgba(0, 25, 121, 0.06)",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    color: "#FFFFFF",
    /* "&.active": {
      borderColor: "rgba(204, 222, 245, 0.6)",
      width: 46,
      height: 46,
    }, */
    "&.completed": {
      backgroundColor: "#219653",
      boxShadow: "0px 0px 40px rgba(0, 25, 121, 0.1)"
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem"
    },
  },
  stepperText: {
    color: "rgba(76, 93, 108, 0.8)",
    fontSize: "0.6rem",
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    /* "&.active": {
      color: "#FFFFFF",
      fontWeight: "bold",
    }, */
    "&.completed": {
      color: "#0F2940",
    },
  },
  stepBeforeAfterLine: {
    borderTop: "2px solid #F1F4F8",
    position: "absolute",
    top: "30%",
    left: 0,
    width: "calc(50% - 14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transform: "translate(0, -50%)",
    zIndex: 1,
    "&.after": {
      left: "50%",
      transform: "translate(14px, -50%)"
    },
    "&.completed": {
      borderColor: "#219653"
    }
  },
  actionBtnSection: {
    [theme.breakpoints.down("sm")]: {
      borderTop: "1px solid rgba(1, 81, 202, 0.1)",
      padding: theme.spacing(1.25),
      textAlign: "center"
    },
  },
  compldBtn: {
    background: "linear-gradient(326deg, rgb(0 13 199) 0%, rgb(16 147 245) 70%)",
    border: 0
  },
  docUploadErrorTxtView: {
    textAlign: "center",
    fontSize: "0.8rem",
    color: "#ff9800",
    padding: theme.spacing(1, 0),
  },
  applyNewProjBtnCol: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginBottom: theme.spacing(1)
    }
  },
}));

const ApplicationsCard = (props) => {
  const { applicantData, isPendingDocUpload } = props;
  const classes = useStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const dispatch = useDispatch();
  // const { applicationData } = useSelector(applicationSelector);
  /* const {
    isFetchingApplicantGet,
    applicantData,
    isSuccessResApplicantGet,
    isErrorApplicantGet,
    errorMessageGet
  } = useSelector(applicantSelector); */
  const history = useHistory();
  const { stepperData, isFetchingStepper, errorMessageStepper, isErrorStepper } = useSelector((state) => state.stepper);
  const [stepperList, setStepperList] = useState([]);
  const [overallApplicationStatus, setOverallApplicationStatus] = useState("");
  const [projLastUpdatedDate, setProjLastUpdatedDate] = useState("");
  const [savedProjCompletedIs, setSavedProjCompletedIs] = useState(false);

  useEffect(() => {
    // dispatch(getApplicant());
    dispatch(getStepperDetails());
  }, [dispatch, t]);

  useEffect(() => {
    setStepperList([]);
    let modifiedStpprList = [];
    if (stepperData.superStepper) {
      for (let y = 0; y < stepperData.superStepper.length; y++) {
        const element = stepperData.superStepper[y];
        var new_obj = {};
        if (element.step === 1) {
          new_obj = {
            ...element,
            pageName: t("userProjects.saved.mainStepperSection.step1"),
            stepIcon: element.status === "completed" ? <ProjectStsCompletedIcon /> : <PersonalDtlsStsIcon />,
            isBeforeLine: false,
            isAfterLine: true
          };
        } else if (element.step === 2) {
          new_obj = {
            ...element,
            pageName: t("userProjects.saved.mainStepperSection.step2"),
            stepIcon: element.status === "completed" ? <ProjectStsCompletedIcon /> : <CatDtlsStsIcon />,
            isBeforeLine: true,
            isAfterLine: true
          };
        } else if (element.step === 3) {
          new_obj = {
            ...element,
            pageName: t("userProjects.saved.mainStepperSection.step3"),
            stepIcon: element.status === "completed" ? <ProjectStsCompletedIcon /> : <ProjectDtlsStsIcon />,
            isBeforeLine: true,
            isAfterLine: true
          };
        } else {
          if (element.status === "completed") {
            setOverallApplicationStatus("completed");
            setSavedProjCompletedIs(true);
          } else {
            setOverallApplicationStatus("pending");
          }
          new_obj = {
            ...element,
            pageName: t("userProjects.saved.mainStepperSection.step4"),
            stepIcon: element.status === "completed" ? <ProjectStsCompletedIcon /> : <PaymentDtlsStsIcon />,
            isBeforeLine: true,
            isAfterLine: false
          };
        }
        modifiedStpprList.push(new_obj);
      }
      setStepperList(modifiedStpprList);
    }
  }, [stepperData]);

  const pendingPageRedirecting = () => {
    const stepper = stepperData.superStepper;
    let redirectPagePath = "";
    for (let i = 0; i < stepper[0].applicantKycStepper.length; i++) {
      const element = stepper[0].applicantKycStepper[i];
      if (element.step === 1) {
        if (element.status !== "completed") {
          redirectPagePath = "/auth-verify-aadhaar";
          break;
        }
      }
      // else if (element.step === 2) {
      //   if (element.status !== "completed") {
      //     redirectPagePath = "/upload-aadhaar";
      //     break;
      //   }
      // }
      else if (element.step === 2) {
        if (element.status !== "completed") {
          redirectPagePath = "/verify-pancard";
          break;
        }
      }
      // else if (element.step === 4) {
      //   if (element.status !== "completed") {
      //     redirectPagePath = "/upload-pancard";
      //     break;
      //   }
      // } else if (element.step === 5) {
      //   if (element.status !== "completed") {
      //     redirectPagePath = "/bank-account-detail";
      //     break;
      //   }
      // } else if (element.step === 6) {
      //   if (element.status !== "completed") {
      //     redirectPagePath = "/upload-cheque";
      //     break;
      //   }
      // }
    }
    if (!redirectPagePath) {
      for (let y = 0; y < stepper.length; y++) {
        const element = stepper[y];
        if (element.step === 1) {
          if (element.status !== "completed") {
            redirectPagePath = "/personal-details";
            break;
          }
        } else if (element.step === 2) {
          if (element.status !== "completed") {
            redirectPagePath = "/category-details";
            break;
          }
        } else if (element.step === 3) {
          if (element.status !== "completed") {
            redirectPagePath = "/document-declaration";
            break;
          }
        } else {
          if (element.status !== "completed") {
            redirectPagePath = "/make-payments";
            break;
          }
        }
      }
    }
    history.push(redirectPagePath);
  };

  useEffect(() => {
    if (applicantData) {
      setProjLastUpdatedDate(applicantData.UpdatedAt);
    }
  }, [applicantData]);

  /* useEffect(() => {
    if (Array.isArray(stepperData.superStepper)) {
      let tempStppArr = [];
      for (let i = 0; i < stepperData.superStepper.length; i++) {
        const element = stepperData.superStepper[i];
        let statusDescTxt = "";
        if (element.description ==== "Personal Details") {
          statusDescTxt = t("userProjects.saved.progressStatusText.step1");
        } else if (element.description ==== "Category Details") {
          statusDescTxt = t("userProjects.saved.progressStatusText.step2");
        } else if (element.description ==== "Submit Documents") {
          statusDescTxt = t("userProjects.saved.progressStatusText.step3");
        } else {
          statusDescTxt = t("userProjects.saved.progressStatusText.step4");
        }
        let new_obj = {
          ...element,
          descriptionTxt: statusDescTxt
        };
        tempStppArr.push(new_obj);
      }
      setSuperStepperData(tempStppArr);
    }
  }, [stepperData]); */

  /* const checkProjectStatus = (projObj) => {
    history.push("/personal-details");
  }; */

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
    <div className={classes.mainRoot}>
      {isFetchingStepper && <Loading isOpen={isFetchingStepper} />}
      {isErrorStepper && (
        <AlertBox severity="error">{errorMessageStepper}</AlertBox>
      )}
      {stepperList.length === 0 && (
        <Box className={classes.defaultInfoMsgBox}>
          <Typography>{t("userProjects.saved.noDataHelpText")}</Typography>
          <Button variant="contained" color="primary">{t("userProjects.saved.noDataStartApplyBtnTxt")}</Button>
        </Box>
      )}
      {stepperList.length > 0 && (
        <Box>
          <Grid container alignItems="center" justify="space-between">
            <Grid item md xs={12}>
              <Typography variant="h4" className={classes.secTitle}>{t("userProjects.saved.title")}</Typography>
              <Typography className={classes.secTitleSubText}>{t("userProjects.saved.titleHelpText")}</Typography>
            </Grid>
            <Grid item md="auto" xs={12} className={classes.applyNewProjBtnCol}>
              <Button color="primary" variant="contained" onClick={() => history.push("/upload-documents")}>{t("userProjects.applied.goUploadDocumentsBtnTxt")}</Button>
              {isPendingDocUpload &&
                <Typography className={classes.docUploadErrorTxtView}>{t("userProjects.applied.uploadDocsPendingStatusTxt")}</Typography>
              }
            </Grid>
          </Grid>
          <Box className={classes.applctnProcessBox}>
            <Grid container alignItems="center" justify="space-between" className={classes.boxHeader}>
              <Grid item>
                <Typography className={classes.lastUpdatedDateView}><DateLastUpdateIcon /> <span>{t("userProjects.saved.lastUpatedDateLabel")} : </span> <strong>{moment(projLastUpdatedDate).format("MMM DD, YY")}</strong></Typography>
              </Grid>
              <Hidden smDown>
                <Grid item>
                  <Box className={`${classes.statusViewChip} ${overallApplicationStatus}`}>{t("userProjects.saved.progressStatusText." + overallApplicationStatus)}</Box>
                </Grid>
              </Hidden>
            </Grid>
            <Box className={classes.boxContentCont}>
              <Hidden mdUp>
                <Grid container alignItems="center" justify="space-between" className={classes.stsHeader}>
                  <Grid item>
                    <Typography className={classes.lastUpdatedDateView}>{t("userProjects.saved.appStatusLabel")}</Typography>
                  </Grid>
                  <Grid item>
                    <Box className={`${classes.statusViewChip} ${overallApplicationStatus}`}>{t("userProjects.saved.progressStatusText." + overallApplicationStatus)}</Box>
                  </Grid>
                </Grid>
              </Hidden>
              <Grid container alignItems="flex-end">
                <Grid item md xs={12} className={classes.stepperSec}>
                  <Grid container>
                    {stepperList.map((element, index) => (
                      <Grid item xs key={index}>
                        <Box className={classes.stepperBox}>
                          <Box className={`${classes.numRoundBox} ${element.status}`}>
                            {element.stepIcon}
                          </Box>
                          <Typography
                            className={`${classes.stepperText} ${element.status}`}
                          >
                            {element.pageName}
                          </Typography>
                          {element.isBeforeLine && (
                            <span className={`${classes.stepBeforeAfterLine} ${element.status}`}></span>
                          )}
                          {element.isAfterLine && (
                            <span className={`${classes.stepBeforeAfterLine} after ${element.status}`}></span>
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item md="auto" xs={12} className={classes.actionBtnSection}>
                  {savedProjCompletedIs ?
                    <Button color="primary" variant="contained" className={classes.compldBtn} onClick={() => history.push("/personal-details")}>{t("userProjects.saved.applyNewBtnText")}</Button>
                    :
                    <Button color="primary" variant="contained" className={classes.compldBtn} onClick={() => pendingPageRedirecting()}>{t("userProjects.saved.prcdToCompleteBtnTxt")}</Button>
                  }
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ApplicationsCard;
