import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Loading from "../../../../atoms/Loading/Loading";
import ProfileWrap from "../../ProfileWrap/ProfileWrap";
import { ChangeNameStyle } from "./ChangeNameStyle.style";
import { Badge, Button, Paper } from "@material-ui/core";
import { ChangeNameIllus } from "../../../../atoms/SvgIcons/SvgIcons";
import ChangeNameStage1 from "./ChangeNameStage/ChangeNameState1";
import { applicantSelector } from "../../../../../redux/features/applicant/ApplicantSlice";
import ChangeNameStage2 from "./ChangeNameStage/ChangeNameStage2";
import { GenericDocSliceSelector, clearGenericGetDocState, genericGetDocuments } from "../../../../../redux/features/UttilSlice/genericDocumentSlice";
import { ApplicantReqHistory, GenericUpdateReqSliceSelector, clearGenericUpdateReqState } from "../../../../../redux/features/UttilSlice/genericUpdateReqSlice";
import ChangeNameInProgressCard from "./ChangeNameInProgressCard/ChangeNameInProgressCard";
import ChangeNameHistory from "./ChangeNameStage/ChangeNameHistory";
import { ApplicantProgressSelector } from "../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";


function ChangeName(props) {
  const classes = ChangeNameStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const [changeNameStage, setChangeNameState] = useState(1);
  const [isActiveRequest, setIsActiveRequest] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { applicantData, isFetchingApplicantGet, isSuccessResApplicant, isErrorApplicant, errorMsgApplicant, } = useSelector(applicantSelector);
  const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
  const { isFetchingGetReqHistory, isSuccessGetReqHistory, isErrorGetReqHistory, getReqHistoryData, errorMessageGetReqHistory, requestType, allReqData } = useSelector(GenericUpdateReqSliceSelector)
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const [reasonValue, setReasonValue] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [completedReqData, setCompletedReqData] = useState([]);

  useEffect(() => {
    if (allReqData) {
      let completedData = allReqData.filter((req) => req.Status == 1);
      setCompletedReqData(completedData);
    }
  }, [allReqData]);

  useEffect(() => {
    dispatch(ApplicantReqHistory());
  }, [])

  useEffect(() => {
    if (isSuccessGetReqHistory && getReqHistoryData) {
      if (getReqHistoryData.Status == 0) {
        setIsActiveRequest(true);
      }
    }
  }, [isSuccessGetReqHistory, getReqHistoryData]);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "12" && item.Status != "completed") {
          history.push("/dashboard");
        }
      })
    }
  }, [isSuccessProgressResStepper]);

  useEffect(() => {
    return () => {
      dispatch(clearGenericGetDocState());
    }
  }, [])

  return (
    <ProfileWrap>
      {(isFetchingGetReqHistory || isFetchingApplicantGet || isFetchingGenericGetDoc) && (
        <Loading isOpen={isFetchingGetReqHistory || isFetchingApplicantGet || isFetchingGenericGetDoc} />
      )}
      <div className={classes.docContainer}>
        {changeNameStage === 1 && <Box className={classes.pageHeader}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" className={classes.pageTitle}>{t("Edit Name (After Allotment Letter)")}</Typography>
            </Grid>
            <Grid>
              <Badge color="error" badgeContent={completedReqData.length} invisible={completedReqData.length === 0} max={9}>
                <Button variant="outlined" color="primary" size='small' onClick={() => setChangeNameState(3)}>History</Button>
              </Badge>
            </Grid>
          </Grid>
        </Box>}
        {(changeNameStage === 1 && !showForm && !isActiveRequest) && <Paper elevation={5} xs={12} className={classes.applyCancelBox} >
          <Grid style={{ position: "relative" }}><ChangeNameIllus style={{ fontSize: "8rem", position: "absolute", top: "-80px" }} /></Grid>
          <Button variant='contained' className={classes.cancelBookingBtn} onClick={() => setShowForm(true)}>Apply</Button>
        </Paper>}
        {(changeNameStage === 1 && showForm && !isActiveRequest && Object.keys(applicantData).length != 0) && <ChangeNameStage1 setChangeNameState={setChangeNameState} setShowForm={setShowForm} applicantData={applicantData} setReasonValue={setReasonValue} />}
        {changeNameStage === 2 && applicantData && genericGetDocData && <ChangeNameStage2 setChangeNameState={setChangeNameState} setShowForm={setShowForm} reasonValue={reasonValue} />}
        {(changeNameStage === 1 && isActiveRequest && getReqHistoryData) && <ChangeNameInProgressCard setChangeNameState={setChangeNameState} reqData={getReqHistoryData} />}
        {changeNameStage === 3 && <ChangeNameHistory setChangeNameState={setChangeNameState} completedReqData={completedReqData} />}
      </div>
    </ProfileWrap>
  );
}

export default ChangeName;