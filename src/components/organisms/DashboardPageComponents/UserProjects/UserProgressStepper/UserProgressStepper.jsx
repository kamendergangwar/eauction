import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import DateRangeIcon from "@material-ui/icons/DateRange";
import RefreshIcon from '@material-ui/icons/Refresh';
import {
  Stepper,
  Step,
  StepLabel,
  Card,
  Box,
  Typography,
  CardContent,
  Button,
  Divider,
  Popover,
  CircularProgress,
  ListItem,
  Grid,
  List,
  Avatar,
  withStyles,
} from "@material-ui/core";
import {
  ColorlibConnector,
  useColorlibStepIconStyles,
  useStyles,
} from "./UserProgressStepperStyles";
import { getSteps, icons, checkicons } from "./mockdata";
import { useHistory } from "react-router-dom";
import {
  CheckedOutlinedIcon,
  RejectedDocIcon,
  VerifiedDocIcon,
  VerifiedSuccessIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import CheckIcon from "@material-ui/icons/Check";
import FcfsDashboardDialogs from "../../../../molecules/DialogBoxes/FcfsDashboardDialogBoxes/FcfsDashboardDialogs";
import { addEditApplicantProgress, ApplicantProgressSelector, ApplicantStepperActiveStep, clearApplicantStepper, getApplicantProgress } from "../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { applicantSelector, clearApplicantState, getApplicant } from "../../../../../redux/features/applicant/ApplicantSlice";
import EditIcon from '@material-ui/icons/Edit';
import UserStepperNew from "./UserStepperNew/UserStepperNew";
import UserStepperV3 from "./UserProgressStepperV3/UserProgressStepperV3";
import { useTranslation } from "react-i18next";
import { Alert, AlertTitle } from "@material-ui/lab";
import { CancelBookingSelector, GetCancelStatus } from "../../../../../redux/features/cancelBookingSlice/cancelBookingSlice";
import Loading from "../../../../atoms/Loading/Loading";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#fa8231",
    '&:hover': {
      backgroundColor: "#d35400",
    },
  },
}))(Button);

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" color="primary" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          style={{ fontWeight: "600" }}
          color="primary"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  if (props?.StepCount) {
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {/* {completed ? checkicons[String(props.icon)] : icons[String(props.icon)]} */}
        {props.StepCount}
      </div>
    );
  } else {
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {completed ? checkicons[String(props.icon)] : icons[String(props.icon)]}
      </div>
    );
  }
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,

  stepCount: PropTypes.number,
};

const UserProgressStepper = (props) => {
  const { doclist, reservationCategory, savedProjectsGroupList } = props;
  const classes = useStyles();
  const [redirect, setRedirect] = useState("");
  const [title, setTitle] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogStep, setDialogStep] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const [verifiedDocs, setVerifiedDocs] = useState([])
  const [totalDocsCount, setTotalDocsCount] = useState("");
  const [totalVerifiedDocsCount, setTotalVerifiedDocsCount] = useState("");
  const [rejectedDocsCount, setRejectedDocsCount] = useState("");
  const [totalPostDocsCount, setTotalPostDocsCount] = useState("");
  const [totalPostVerifiedDocsCount, setTotalPostVerifiedDocsCount] = useState("");
  const [rejectedPostDocsCount, setRejectedPostDocsCount] = useState("");
  const [postVerifiedDocs, setPostVerifiedDocs] = useState([])
  const { t } = useTranslation("DashboardPageTrans");
  const [nocRejectedDocsCount, setNocRejectedDocsCount] = useState("");
  const [nocApprovedDocsCount, setNocApprovedDocsCount] = useState("");
  const [totalNocDocsCount, setTotalNocDocsCount] = useState("");
  const [nocVerificationData, setNocVerificationData] = useState(null);
  const [nocData, setNocData] = useState();
  const [changeNameVerificationData, setChangeNameVerificationData] = useState();
  const [isAllChangeNameDocVerified, setIsAllChangeNameDocVerified] = useState(false);
  const [changeNameData, setChangeNameData] = useState();
  const [isLatestNocPaymentDone, setLatestNocPaymentDone] = useState(false);
  const [cancelStatusData, setCancelStatusData] = useState(null);
  const [applNoGenrated, setApplNoGenrated] = useState(false)
  const [isActiveCancelRequest, setIsActiveCancelRequest] = useState(false);
  const [inProgressReqData, setInProgressReqData] = useState(null);
  const [lastCancelReqData, setLastCancelReqData] = useState(null);
  const [cancelDocData, setCancelDocData] = useState([]);
  const [skipDocs, setSkipDocs] = useState([]);
  const [rejectedDocument, setRejectedDocument] = useState([]);
  const { isFetchingCancelStatus, isSuccessCancelStatus, isErrorCancelStatus, cancelStatus, errorMessageCancelStatus } = useSelector(CancelBookingSelector)
  const {
    isSuccessResApplicantGet,
    isFetchingApplicantGet,
    isErrorApplicantGet,
    errorMessageGet,
    applicantData
  } = useSelector(applicantSelector);
  const { ApplicantStepperData, isSuccessProgressResStepper, LastUpdatedDate, superActiveStep, superStepper, documentPostVerificationData, documentPreVerificationData } = useSelector(ApplicantProgressSelector);

  useEffect(() => {
    const filteredArray = doclist.filter(item => {
      return item.DocumentDetails[0]?.IsSkipped == "1";

    });
    setSkipDocs(filteredArray);

  }, [doclist])
  useEffect(() => {
    dispatch(GetCancelStatus());
    dispatch(getApplicantProgress());
  }, [dispatch]);


  useEffect(() => {
    if (isSuccessCancelStatus && cancelStatus[0]) {
      setCancelStatusData(cancelStatus)
    }
  }, [isSuccessCancelStatus, cancelStatus])

  useEffect(() => {
    if (cancelStatusData) {
      const hasActiveRequest = cancelStatusData.some(data => data.cancel_status == 0);
      const inProgressRequest = cancelStatusData.find((item) => item.cancel_status == 0);
      const lastCancelRequest = cancelStatusData.find((item) => item.cancel_status == 1);
      setLastCancelReqData(lastCancelRequest);
      setInProgressReqData(inProgressRequest);
      setIsActiveCancelRequest(hasActiveRequest);
      setCancelDocData(inProgressRequest?.verificationData);
    }
  }, [cancelStatusData]);

  useEffect(() => {
    if (nocVerificationData) {

    }
  }, [nocVerificationData])

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.ApplicationNo) {
        setApplNoGenrated(true)
      }
    }
  }, [isSuccessResApplicantGet])

  const manageVerifiedDocs = () => {
    // const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
    // docStep = ApplicantStepper.filter((step) => step.StepId == 6)
    if (documentPreVerificationData) {
      setVerifiedDocs(documentPreVerificationData);
      setTotalVerifiedDocsCount(documentPreVerificationData.reduce((value, document) => document.hmoVerifiedFlag == 1 ? value + 1 : value, 0));
      setRejectedDocsCount(documentPreVerificationData.reduce((value, document) => document.hmoVerifiedFlag == 2 ? value + 1 : value, 0));
      const rejectedData = documentPreVerificationData.filter(item => item.isResubmitted == 0 && item.hmoVerifiedFlag == 2);
      setRejectedDocument(rejectedData);
      setTotalDocsCount(documentPreVerificationData.length)
    }
  }

  const managePostVerifiedDocs = () => {
    if (documentPostVerificationData) {
      setPostVerifiedDocs(documentPostVerificationData)
      setTotalPostVerifiedDocsCount(documentPostVerificationData.reduce((value, document) => document.hmoVerifiedFlag == 1 ? value + 1 : value, 0));
      setRejectedPostDocsCount(documentPostVerificationData.reduce((value, document) => document.hmoVerifiedFlag == 2 ? value + 1 : value, 0));
      setTotalPostDocsCount(documentPostVerificationData.length)
    }
  }

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      handleRedirection(superActiveStep);
      manageVerifiedDocs();
      // managePostVerifiedDocs();
      // if (superActiveStep == 8) {
      //   dispatch(getApplicantProgress());
      //   // setTotalDocsCount(doclist.length)
      // }
    }
  }, [isSuccessProgressResStepper, documentPreVerificationData, superActiveStep])

  useEffect(() => {
    if (applicantData && isSuccessResApplicantGet) {

      setNocVerificationData(applicantData.LatestNocApplication?.DocumentsVerificationInfoNew)
      setNocData(applicantData.LatestNocApplication?.ApplicationDetails[0]);
      setTotalNocDocsCount(applicantData.LatestNocApplication?.DocumentsVerificationInfo?.length)
      setNocRejectedDocsCount(applicantData.LatestNocApplication?.DocumentsVerificationInfo?.reduce((value, document) => document.VerifiedFlag == 2 ? value + 1 : value, 0));
      setNocApprovedDocsCount(applicantData.LatestNocApplication?.DocumentsVerificationInfo?.reduce((value, document) => document.VerifiedFlag == 1 ? value + 1 : value, 0));

      applicantData.nocPaymentDetails?.map((Item, Index) => {
        if (Item.NocApplicationId == applicantData.LatestNocApplication?.ApplicationDetails[0]?.id) {
          setLatestNocPaymentDone(true);
        }
      });

    }
  }, [applicantData, isSuccessResApplicantGet]);

  useEffect(() => {
    if (applicantData && isSuccessResApplicantGet && applicantData?.LatestChangeNameApplication) {
      setChangeNameData(applicantData.LatestChangeNameApplication?.ApplicationDetails);
      setChangeNameVerificationData(applicantData.LatestChangeNameApplication?.DocumentsVerificationInfo);
    }
  }, [applicantData, isSuccessResApplicantGet]);

  useEffect(() => {
    if (changeNameVerificationData) {
      const allDocVerified = changeNameVerificationData.every(item => item.VerifiedFlag == 1);
      setIsAllChangeNameDocVerified(allDocVerified);
    }
  }, [changeNameVerificationData])

  const handleRedirection = (superActiveStep) => {
    switch (Number(superActiveStep)) {
      case 1:
        setTitle(t("dashboard.redirectionBtnTxt.signUp"));
        setRedirect("/dashboard");
        break;
      case 2:
        setTitle(t("'dashboard.redirectionBtnTxt.completeKyc"));
        setRedirect("/terms-conditions");
        break;
      case 3:
        setTitle(t("dashboard.redirectionBtnTxt.personalDetail"));
        setRedirect("/question-1");
        break;
      case 4:
        setTitle(t("dashboard.redirectionBtnTxt.addCoApplicant"));
        setRedirect("/add-co-applicant");
        break;
      case 5:
        setTitle(t("dashboard.redirectionBtnTxt.addCategory"));
        setRedirect("/income-details");
        break;
      case 6:
        setTitle(t("dashboard.redirectionBtnTxt.uploadDoc"));
        setRedirect("/upload-documents");
        break;
      case 7:
        setTitle(t("dashboard.redirectionBtnTxt.appPayment"));
        setRedirect("/make-application-payment");
        break;
      case 8:
        setTitle("Verifying Documents");
        setRedirect("/dashboard");
        break;
      case 9:
        setTitle(t("dashboard.redirectionBtnTxt.bookFlat"));
        setRedirect("/select-projects");
        break;
      case 10:
        setTitle(t("dashboard.redirectionBtnTxt.flatPayment"));
        setRedirect("/select-projects");
        break;
      case 11:
        setTitle(t("dashboard.redirectionBtnTxt.myProfile"));
        setRedirect("/my-loi");
        break;
      case 12:
        setTitle(t("dashboard.redirectionBtnTxt.myProfile"));
        setRedirect("/my-allotment-letter");
        break;
      case 13:
        setTitle(t("dashboard.redirectionBtnTxt.myProfile"));
        setRedirect("/make-house-payment");
        break;
      case 14:
        setTitle(t("dashboard.redirectionBtnTxt.myProfile"));
        setRedirect("/agreement-letter");
        break;
      default:
        setTitle("Dashboard");
        setRedirect("/dashboard");
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const goToNextStep = () => {
    if (redirect) {
      history.push(redirect);
    }
  };

  return (
    <div className={classes.mainRoot}>
      {isFetchingCancelStatus && <Loading isOpen={isFetchingCancelStatus} />}
      <Grid container className={classes.secTitle} justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" className={classes.secText} >{t('dashboard.myApplicationTxt')} </Typography>
          <span>{t('dashboard.trackAppTxt')}</span>
        </Grid>
        <Grid className={classes.updatedDate}>
          <DateRangeIcon />
          <Typography style={{ fontWeight: "800" }}>
            <span>{t('dashboard.lastUpdateTxt')} </span>{LastUpdatedDate}
          </Typography>
        </Grid>
      </Grid>

      <Card className={classes.applicantCard} elevation={0}>
        <Grid container justifyContent="space-between" alignItems="center" direction="row" style={{ padding: "10px", }}>
          {applicantData && <Grid container xs={6} alignItems="center">
            <Avatar src={applicantData.ImagePath} className={classes.imagelarge} />
            <Grid item style={{ marginLeft: "10px" }}>
              <Typography className={classes.applicantName}>{applicantData.FirstName}</Typography>
              {applicantData.Age > 0 && <span style={{ color: "#65707D", fontSize: "14px" }}>{t('dashboard.ageTxt')}: {applicantData.Age} |</span>}
              {applicantData.Gender && <span style={{ color: "#65707D", fontSize: "14px" }}>{applicantData.Gender == 1 ? t('dashboard.maleTxt') : t('dashboard.femaleTxt')}</span>}
            </Grid>
            {(applicantData.ApplicationNumBarcode && applicantData.ApplicationNo) && <>
              <Divider orientation="vertical" flexItem variant="middle" />
              <Grid item style={{ maxWidth: 115 }}>
                <Typography style={{ fontSize: "0.8rem", lineHeight: 1.2, marginLeft: 10 }}>{t("userjourney.ApplNoLbl")}</Typography>
                <img src={applicantData.ApplicationNumBarcode} alt="barcode" />
                <Typography style={{ fontSize: "0.8rem", lineHeight: 0.8, marginLeft: 12, letterSpacing: "1.5px" }}>{applicantData.ApplicationNo}</Typography>
              </Grid></>}

          </Grid>}
          <Grid item xs={6}>
            {superActiveStep == 8 && <><Typography className={classes.docHeader}>{t('dashboard.docVerificationProgressTxt')}</Typography>
              <Typography style={{ color: "#4C5D6C", fontSize: "0.9rem" }}>{t('dashboard.docVerificationUnderVerificationTxt')}</Typography></>}
            {superActiveStep == 9 && <><Typography className={classes.docHeader}>{t('dashboard.docVerifiedCompleteTxt')}</Typography>
              <Typography style={{ fontSize: "0.9rem" }}>{t('dashboard.contiToBookFlatTxt')}</Typography></>}
            {superActiveStep > 11 && superActiveStep < 13 && !isLatestNocPaymentDone && (applicantData.LatestNocApplication?.DocumentsVerificationInfo?.length > 0) && nocApprovedDocsCount !== totalNocDocsCount && <><Typography className={classes.docHeader}>You have successfully applied for NOC.</Typography>
              <Typography style={{ fontSize: "0.9rem" }}>Once the verification of your documents is completed, the NOC letter will be made available to you within 2 to 3 business days.</Typography></>}
            {(superActiveStep <= 10 && superActiveStep != 8) &&
              <ColorButton
                varient="contained"
                onClick={goToNextStep}
                disabled={superActiveStep == 8}
                className={classes.continueBtn}
              >
                {title}
              </ColorButton>
            }
            {(superActiveStep > 10 && superActiveStep != 8) &&
              <ColorButton
                varient="contained"
                onClick={() => history.push('/my-profile')}
                disabled={superActiveStep == 8}
                className={classes.continueBtn}
              >
                {t('dashboard.goToProfileBtn')}
              </ColorButton>
            }
          </Grid>
        </Grid>
      </Card>
      {rejectedDocument.length > 0 && <Alert severity="error" style={{ margin: '12px 0' }} action={
        <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/upload-documents')}>
          {t("userjourney.ReUpload")}
        </Button>
      }>
        <AlertTitle>{t("dashboard.rejectedDocTxt")}</AlertTitle>
        <ul>
          {rejectedDocument.map((doc) =>
            <li className={classes.timerValidText}>{doc.DocumentName} is rejected. Please <span onClick={() => history.push('/upload-documents')}>Re-upload</span></li>
          )}
        </ul>
      </Alert>}

      {nocRejectedDocsCount > 0 && (superActiveStep > 11 && superActiveStep < 13) && <Alert severity="error" style={{ margin: '12px 0' }} action={
        <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/loan-application')}>
          {t("userjourney.ReUpload")}
        </Button>
      }>{t("Some of your document you uploaded for NOC is rejected. Please Re-Upload")}</Alert>}



      {(nocApprovedDocsCount === totalNocDocsCount && totalNocDocsCount > 0) && (superActiveStep > 11 && superActiveStep < 13) && !isLatestNocPaymentDone && <Alert severity="success" style={{ margin: '12px 0' }} action={
        <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/loan-application')}>
          {t("Make Noc Payment")}
        </Button>
      }>{t("Your Request NOC Documents verified successfully")}</Alert>}

      {(isActiveCancelRequest && cancelStatusData && inProgressReqData) && <Alert severity="info" color="error" style={{ margin: '12px 0' }} action={
        <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/cancel-booking')}>
          {t("View Status")}
        </Button>
      }><AlertTitle>Your request for booking cancellation with Application no. <strong>{applicantData.ApplicationNo && `${applicantData.ApplicationNo}`}</strong> has been successfully submitted.</AlertTitle>
        <ul>
          {cancelDocData.every(item => item.VerifiedFlag == 1) ?
            <li>Your Document verification for "Cancel Booking Request" is successfully completed.</li>
            :
            <li>Your document for cancellation is under verification.</li>
          }
          {cancelDocData.length &&
            cancelDocData.map((doc) => (
              (doc.VerifiedFlag == 2 && doc.IsResubmitted == 0) &&
              <li className={classes.timerValidText}>{doc.DocumentName} is rejected. Please <span onClick={() => history.push('/cancel-booking')}>Re-upload</span></li>
            ))}
        </ul>
      </Alert>}
      {(superActiveStep > 8 && skipDocs.length != 0) && <Alert severity="warning" style={{ margin: '12px 0' }} action={
        <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/upload-documents')}>
          {t("Upload")}
        </Button>}>
        <AlertTitle>
          You have skipped uploading the following document. Please upload it before generating the allotment letter. The allotment letter will only be generated after following document is uploaded.
        </AlertTitle>
        <ul>
          {skipDocs.map((skipDoc, index) => (
            <li key={index}>{skipDoc?.DocumentName}</li>
          ))}
        </ul>
      </Alert>}

      {(nocVerificationData && nocData) && <Alert severity={nocData.Status == 1 ? "success" : "info"} color={nocData.Status == 1 ? "success" : "info"} style={{ margin: '12px 0' }} action={
        <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/loan-application')}>
          {t("View Status")}
        </Button>}>
        {nocData.Status == 0 ?
          <AlertTitle>Your request for CIDCO NOC with NOC Reference no. <strong>{`${nocData.id}`}</strong> has been successfully submitted.
            <br />
            <strong>Bank Name: {nocData.BankName}</strong>
          </AlertTitle>
          :
          <AlertTitle>Your request for CIDCO NOC with NOC Reference no. <strong>{`${nocData.id}`}</strong> has been successfully completed.
            <br />
            <strong>Bank Name: {nocData.BankName}</strong>
          </AlertTitle>}
        <ul>
          {nocData.Status == 0 && <>
            {(nocData.VerificationStatus == 1 && nocData.Status == 0) ?
              <li>Your Document verification for "NOC Request" is successfully completed.</li>
              :
              <li>Your document for NOC Request is under verification.</li>
            }
            {(nocData.VerificationStatus == 1 && nocData.Status == 0 && nocData.Is_pmay == 1) ?
              <li><strong>Payment required for NOC request. </strong><span style={{ textDecoration: "underline", fontWeight: 600, cursor: "pointer" }} onClick={() => history.push('/loan-application')}>Make Payment</span></li>
              :
              ""
            }
            {nocVerificationData.length > 0 &&
              nocVerificationData.map((doc) => {
                return (doc.VerifiedFlag == 2 && doc.IsResubmitted == 0) && <li className={classes.timerValidText}>{doc.DocumentName} is rejected. Please <span onClick={() => history.push('/loan-application')}>Re-upload</span></li>
              }
              )}
          </>}
        </ul>
      </Alert>}

      {(changeNameVerificationData && changeNameData) && <Alert severity={changeNameData.Status == 1 ? "success" : "info"} color={changeNameData.Status == 1 ? "success" : "info"} style={{ margin: '12px 0' }} action={
        <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/change-name')}>
          {t("View Status")}
        </Button>}>
        {changeNameData.Status == 0 ?
          <AlertTitle>Your request for Change Name with Request ID <strong>{`${changeNameData.RequestId}`}</strong> has been successfully submitted.
          </AlertTitle>
          :
          <AlertTitle>Your request for Change Name with Request ID <strong>{`${changeNameData.RequestId}`}</strong> has been successfully completed.
            <br />
          </AlertTitle>}
        <ul>
          {changeNameData.Status == 0 && <>
            {(isAllChangeNameDocVerified && changeNameData.Status == 0) ?
              <li>Your Document verification for <b>Change name Request</b> is successfully completed.</li>
              :
              <li>Your document for <b>Change name Request</b> is under verification.</li>
            }
            {(isAllChangeNameDocVerified && changeNameData.IsPaymentRequired == 1 && changeNameData.Status == 0) ?
              <li><strong>Payment required for Change name Request. </strong><span style={{ textDecoration: "underline", fontWeight: 600, cursor: "pointer" }} onClick={() => history.push('/change-name')}>Make Payment</span></li>
              :
              ""
            }
            {changeNameVerificationData.length > 0 &&
              changeNameVerificationData.map((doc) => {
                return (doc.VerifiedFlag == 2 && doc.IsResubmitted == 0) && <li className={classes.timerValidText}>{doc.DocumentName} is rejected. Please <span onClick={() => history.push('/change-name')}>Re-upload</span></li>
              })}
          </>}
        </ul>
      </Alert>}

      {
        (!isActiveCancelRequest && cancelStatusData && !applNoGenrated && lastCancelReqData) && <Alert severity="success" color="info" variant="filled" style={{ margin: '12px 0' }} action={
          <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/question-1')}>
            {t("Start Fresh")}
          </Button>}>
          Your last request for cancellation with Application no.
          <strong>{`${lastCancelReqData.cancel_flat_data.old_application_no}`}</strong>
          was successfully accepted.
          You can start fresh application at any time.</Alert>
      }


      <Card className={classes.cardRoot} gutterBottom>
        <Box>
          {(Object.keys(applicantData).length > 0 && documentPreVerificationData) && <UserStepperV3
            title={title}
            redirect={redirect}
            activeStep={superActiveStep}
            setDialogStep={setDialogStep}
            handleClickPopover={handleClickPopover}
            doclist={doclist}
            preVerifyDocList={verifiedDocs}
            postVerifyDocList={postVerifiedDocs}
            applicantData={applicantData}
            reservationCategory={reservationCategory}
            totalVerifiedDocsCount={totalVerifiedDocsCount}
            totalDocsCount={totalDocsCount}
            rejectedDocsCount={rejectedDocsCount}
            savedProjectsGroupList={savedProjectsGroupList}
            nocApprovedDocsCount={nocApprovedDocsCount}
            totalNocDocsCount={totalNocDocsCount}
            isLatestNocPaymentDone={isLatestNocPaymentDone}
            skipDocs={skipDocs}
          />}
        </Box>
        {Object.keys(applicantData).length > 0 &&
          <FcfsDashboardDialogs
            anchorEl={anchorEl}
            handleClose={handleClose}
            step={dialogStep}
            doclist={(dialogStep == 8 || dialogStep == 12) ? (dialogStep == 12 ? postVerifiedDocs : verifiedDocs) : doclist}
            applicantData={applicantData}
            reservationCategory={reservationCategory}
          />
        }
      </Card>
    </div >

  );
};

export default UserProgressStepper;
