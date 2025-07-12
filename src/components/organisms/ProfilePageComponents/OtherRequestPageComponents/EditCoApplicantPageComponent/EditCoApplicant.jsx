import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Badge, Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Loading from "../../../../atoms/Loading/Loading";
import ProfileWrap from "../../ProfileWrap/ProfileWrap";
import { EditCoApplicantStyle } from "./EditCoApplicantStyle.style";
import { ChangeNameIllus } from "../../../../atoms/SvgIcons/SvgIcons";
import EditCoApplicantHistory from "./EditCoApplicantHistory/EditCoApplicantHistory";
import EditCoApplicantStage1 from "./EditCoApplicantStages/EditCoApplicantStage1";
import { applicantSelector } from "../../../../../redux/features/applicant/ApplicantSlice";
import EditCoapplicantStage3 from "./EditCoApplicantStages/EditCoApplicantStage3";
import EditCoApplicantStage2 from "./EditCoApplicantStages/EditCoApplicantStage2";
import { AddCoApplicantHistory, GenericUpdateReqSliceSelector, clearCoApplicantReqState, clearTempAddCoAppReqState, getTempAddCoAppReq } from "../../../../../redux/features/UttilSlice/genericUpdateReqSlice";
import ReqProgressCard from "./ReqProgressCard/ReqProgressCard";
import { GenericDocSliceSelector, genericGetDocuments } from "../../../../../redux/features/UttilSlice/genericDocumentSlice";
import { clearGenericPaySummaryState } from "../../../../../redux/features/UttilSlice/genericTransactionSlice";
import EditCoapplicantStage5 from "./EditCoApplicantStages/EditCoApplicantStage5";


function EditCoApplicant(props) {
  const classes = EditCoApplicantStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const { applicantData, isFetchingApplicantGet, isSuccessResApplicant, isErrorApplicant, errorMsgApplicant, } = useSelector(applicantSelector);
  const [completedReqData, setCompletedReqData] = useState([]);
  const [editCoApplicantStage, setEditCoApplicantStage] = useState(1);
  const [isActiveRequest, setIsActiveRequest] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reasonValue, setReasonValue] = useState("");
  const [reqData, setReqData] = useState(null);
  const [inProgressReqData, setInProgressReqData] = useState(null);
  const [onGoingReqData, setOnGoingReqData] = useState(null);
  const { isFetchingCoApplicantReq, isSuccessCoApplicantReq, isErrorCoApplicantReq, coApplicantReqData, errorMessageCoApplicantReq } = useSelector(GenericUpdateReqSliceSelector);
  const { isFetchingTempAddCoAppReq, isSuccessTempAddCoAppReq, isErrorTempAddCoAppReq, tempAddCoAppReqData, errorMessageTempAddCoAppReq } = useSelector(GenericUpdateReqSliceSelector)
  const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
  const [flag, setFlag] = useState(false);


  //------------Flow details code level---------------------
  //------------flow stages component----------
  // Edit CoApplicant stage 1 ==> Select weather to add co-applicant or remove
  // Edit CoApplicant stage 2 ==> for add co-applicant form and kyc stages
  // Edit CoApplicant stage 3 ==> add co applicant doc upload and raise request and do payment
  // Edit CoApplicant stage 4==> Completed request history (uses editcoapplicanthistory & editcoapplicanthistorycard component)
  // Edit CoApplicant stage 5==> remove co-applicant flow
  // Request progress card display on stage 1 showing ongoing request
  // ----------------------end-------------------------------


  //Api call onmount and clear on unmount
  useEffect(() => {
    dispatch(AddCoApplicantHistory());
    return () => {
      dispatch(clearCoApplicantReqState());
      dispatch(clearGenericPaySummaryState());
    };
  }, []);

  //saving data into local state
  useEffect(() => {
    if (isSuccessCoApplicantReq && coApplicantReqData) {
      setReqData(coApplicantReqData)
    }
  }, [coApplicantReqData, isSuccessCoApplicantReq]);

  //getting incomplete unraised temp request data if applicant did kYC in adding coapplicant but payment not done
  useEffect(() => {
    dispatch(getTempAddCoAppReq());
    return () => {
      dispatch(clearTempAddCoAppReqState());
    };
  }, []);

  //setting incomplete unraised temp request data into local state
  useEffect(() => {
    if (isSuccessTempAddCoAppReq && tempAddCoAppReqData && typeof tempAddCoAppReqData === 'object') {
      setOnGoingReqData(tempAddCoAppReqData)
    }
    if (isErrorTempAddCoAppReq) {
      setOnGoingReqData(null)
    }
  }, [isSuccessTempAddCoAppReq, tempAddCoAppReqData, isErrorTempAddCoAppReq]);


  //flitering ongoing request and completed request in two seprate state
  useEffect(() => {
    if (reqData) {
      const hasActiveRequest = reqData.some(data => data.CoAppStatus == 0);
      const inProgressRequestData = reqData.find(item => item.CoAppStatus == 0);
      const completedReq = reqData.filter(item => item.CoAppStatus == 1);
      setCompletedReqData(completedReq);
      setInProgressReqData(inProgressRequestData);
      setIsActiveRequest(hasActiveRequest);
    }
  }, [reqData]);

  //if incomplete request is there continue user to incomplete ongoing request
  useEffect(() => {
    if (onGoingReqData) {
      const requestData = {
        ApplicantId: localStorage.getItem("applicantId"),
        ReqType: 'AddCoApplicant',
        Lang: localStorage.getItem("i18nextLng"),
        RequestId: onGoingReqData.RequestId
      };
      dispatch(genericGetDocuments(requestData));
      setFlag(true);
    }
  }, [onGoingReqData]);

  //only redirect after success of docs api and flag is upadted
  useEffect(() => {
    if (isSuccessGenericGetDoc && genericGetDocData && flag) {
      setEditCoApplicantStage(2)
    }
  }, [isSuccessGenericGetDoc, flag]);


  return (
    <ProfileWrap>
      {(isFetchingCoApplicantReq || isFetchingTempAddCoAppReq || isFetchingGenericGetDoc) && (
        <Loading isOpen={isFetchingCoApplicantReq || isFetchingTempAddCoAppReq || isFetchingGenericGetDoc} />
      )}
      <div className={classes.docContainer}>
        {editCoApplicantStage === 1 && <Box className={classes.pageHeader}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" className={classes.pageTitle}>{t("Edit Co-Applicant")}</Typography>
            </Grid>
            <Grid>
              <Badge color="error" badgeContent={completedReqData.length} invisible={completedReqData.length === 0} max={9}>
                <Button variant="outlined" color="primary" size='small' onClick={() => setEditCoApplicantStage(4)}>History</Button>
              </Badge>
            </Grid>
          </Grid>
        </Box>}
        {(editCoApplicantStage === 1 && !showForm && !isActiveRequest) && <Paper elevation={5} xs={12} className={classes.applyCancelBox} >
          <Grid style={{ position: "relative" }}><ChangeNameIllus style={{ fontSize: "8rem", position: "absolute", top: "-80px" }} /></Grid>
          <Button variant='contained' className={classes.cancelBookingBtn} onClick={() => setShowForm(true)}>Add Or Remove Co-Applicant</Button>
        </Paper>}
        {(editCoApplicantStage === 1 && showForm && !isActiveRequest && Object.keys(applicantData).length != 0) && <EditCoApplicantStage1 setEditCoApplicantStage={setEditCoApplicantStage} setShowForm={setShowForm} applicantData={applicantData} setReasonValue={setReasonValue} onGoingReqData={onGoingReqData} />}
        {editCoApplicantStage === 2 && applicantData && <EditCoApplicantStage2 setEditCoApplicantStage={setEditCoApplicantStage} setShowForm={setShowForm} onGoingReqData={onGoingReqData} />}
        {editCoApplicantStage === 4 && <EditCoApplicantHistory setEditCoApplicantStage={setEditCoApplicantStage} completedReqData={completedReqData} />}
        {(editCoApplicantStage === 1 && isActiveRequest && Object.keys(applicantData).length > 0) && <ReqProgressCard setEditCoApplicantStage={setEditCoApplicantStage} reqData={inProgressReqData} applicantData={applicantData} />}
        {(editCoApplicantStage === 5 && showForm && !isActiveRequest && Object.keys(applicantData).length != 0) && <EditCoapplicantStage5 setEditCoApplicantStage={setEditCoApplicantStage} setShowForm={setShowForm} applicantData={applicantData} setReasonValue={setReasonValue} onGoingReqData={onGoingReqData} />}
      </div>
    </ProfileWrap >
  );
}

export default EditCoApplicant;