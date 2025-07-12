import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Loading from "../../../../atoms/Loading/Loading";
import ProfileWrap from "../../ProfileWrap/ProfileWrap";
import { CancelBookingStyle } from "./CancelBookingStyle.style";
import CancelBookingStage1 from "./CancelStages/CancelBookingStage1";
import CancelBookingStage2 from "./CancelStages/CancelBookingStage2";
import { ApplicantProgressSelector } from "../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { applicantSelector, getApplicant } from "../../../../../redux/features/applicant/ApplicantSlice";
import CancelProgressCard from "./CancelInProgressCard/CancelProgressCard";
import { Badge, Button, Paper } from "@material-ui/core";
import CancelHistory from "./CancelStages/CancelHistory";
import { CancelBookingSelector, GetCancelStatus } from "../../../../../redux/features/cancelBookingSlice/cancelBookingSlice";
import { CancelBookingIllus, EmptyFlatCancel } from "../../../../atoms/SvgIcons/SvgIcons";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Schedule } from "@material-ui/icons";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";

function CancelBooking(props) {
  const classes = CancelBookingStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const history = useHistory();
  const [cancelStage, setCancelStage] = useState(1)
  const [cancelStatusData, setCancelStatusData] = useState(null);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [isActiveRequest, setIsActiveRequest] = useState(false);
  const [inProgressReqData, setInProgressReqData] = useState(null);
  const dispatch = useDispatch();
  const [bookingPaymentDone, setBookingPaymentDone] = useState(false);
  const { isFetchingCancelStatus, isSuccessCancelStatus, isErrorCancelStatus, cancelStatus, errorMessageCancelStatus } = useSelector(CancelBookingSelector)
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const { applicantData, isFetchingApplicantGet, isSuccessResApplicant, isSuccessResApplicantGet, isErrorApplicant, errorMsgApplicant, } = useSelector(applicantSelector);
  const [completedReqData, setCompletedReqData] = useState([]);
  const [isPreviousCancel, setIsPreviousCancel] = useState(true); // temp to true 


  useEffect(() => {
    dispatch(GetCancelStatus());
  }, [])

  useEffect(() => {
    if (isSuccessCancelStatus && cancelStatus) {
      setCancelStatusData(cancelStatus)
    }
  }, [isSuccessCancelStatus, cancelStatus])

  useEffect(() => {
    if (cancelStatusData) {
      const hasActiveRequest = cancelStatusData.some(data => data.cancel_status == 0);
      const inProgressRequestData = cancelStatusData.find((item) => item.cancel_status == 0);
      const cancelledObjects = cancelStatusData.filter((item) => item.cancel_status == 1);
      setCompletedReqData(cancelledObjects);
      setInProgressReqData(inProgressRequestData);
      setIsActiveRequest(hasActiveRequest);
    }
  }, [cancelStatusData]);

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.ApplicationNo) {
        const number = applicantData.ApplicationNo?.slice(2, 3);
        if (number > 1) {
          setIsPreviousCancel(true);
        }
      }
    }
  }, [isSuccessResApplicantGet, applicantData])

  useEffect(() => {
    if (isSuccessProgressResStepper && isSuccessCancelStatus) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "11" && item.Status != "completed" && !isPreviousCancel) {
          history.push("/dashboard");
        }
        if (item.StepId == "11" && item.Status == "completed") {
          setBookingPaymentDone(true);
        }
      })
    }
  }, [isSuccessProgressResStepper, isSuccessCancelStatus, isPreviousCancel]);

  // useEffect(() => {
  //   if (isActiveRequest) {
  //     setCancelStage(3);
  //   }
  // }, [isActiveRequest])

  return (
    <ProfileWrap>
      {(isFetchingCancelStatus || isFetchingApplicantGet) && (
        <Loading isOpen={isFetchingCancelStatus || isFetchingApplicantGet} />
      )}
      <div className={classes.docContainer}>
        {(cancelStage === 1 || cancelStage === 4) && <Box className={classes.pageHeader}>
          <Grid container justifyContent="space-between" >
            <Grid item>
              <Typography variant="h4" className={classes.pageTitle}>{t("Cancel Booking")}</Typography>
            </Grid>
            <Grid>
              <Badge color="error" badgeContent={completedReqData.length} invisible={completedReqData.length === 0} max={9}>
                <Button variant="outlined" color="primary" size='small' onClick={() => setCancelStage(3)}>Cancellation History</Button>
              </Badge>
            </Grid>
          </Grid>
        </Box>}
        {(isErrorCancelStatus && cancelStage === 1) && <AlertBox severity="error">{errorMessageCancelStatus}</AlertBox>}
        {(cancelStage === 1 && bookingPaymentDone && !showCancelForm && !isActiveRequest) && <Paper elevation={5} xs={12} className={classes.applyCancelBox} >
          <Grid style={{ position: "relative" }}><CancelBookingIllus style={{ fontSize: "10rem", position: "absolute", top: "-80px" }} /></Grid>
          <Button variant='contained' className={classes.cancelBookingBtn} onClick={() => setShowCancelForm(true)}>Apply for cancellation</Button>
        </Paper>}
        {(cancelStage === 1 && bookingPaymentDone && showCancelForm && !isActiveRequest) && <CancelBookingStage1 setCancelStage={setCancelStage} setShowCancelForm={setShowCancelForm} />}
        {cancelStage === 2 && applicantData && <CancelBookingStage2 setCancelStage={setCancelStage} setCancelStatusData={setCancelStatusData} />}
        {cancelStage === 3 && <CancelHistory setCancelStage={setCancelStage} completedReqData={completedReqData} />}
        {(!bookingPaymentDone && cancelStage === 1) && <Box className={classes.NoDetailsCon} style={{ marginTop: 65 }}>
          <EmptyFlatCancel className={classes.NoDetailsSvg} />
          <Typography className={classes.nodetailSubHeading}>You cannot apply for cancellation now.</Typography>
          <Button endIcon={<ArrowForwardIosIcon />} size="small" color="primary" onClick={() => setCancelStage(3)}>View Cancellation History</Button>
        </Box>}
        {(cancelStage === 1 && isActiveRequest && Object.keys(applicantData).length > 0) && <CancelProgressCard setCancelStage={setCancelStage} cancelStatusData={inProgressReqData} applicantData={applicantData} />}
        {/* {(cancelStage === 1 && isActiveRequest) && <Box className={classes.NoDetailsCon} style={{ marginTop: 65 }}>
          <Schedule style={{ fontSize: "10rem", color: "#F27807" }} />
          <Typography className={classes.nodetailSubHeading}>In Progress</Typography>
          <Grid item xs={7}><Typography className={classes.nodetailHeading}>Your cancellation request is currently being processed. Please navigate to the cancellation history section to view its status.</Typography></Grid>
          <Button endIcon={<ArrowForwardIosIcon />} onClick={() => setCancelStage(3)}>View Cancellation History</Button>
        </Box>} */}
      </div>
    </ProfileWrap >
  );
}

export default CancelBooking;