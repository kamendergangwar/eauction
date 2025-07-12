import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { applicantSelector } from "../../../../../../redux/features/applicant/ApplicantSlice";
import { ApplicantProgressSelector } from "../../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { NoDataFoundVector } from "../../../../../atoms/SvgIcons/SvgIcons";
import ChangeNameHistoryCard from "../ChangeNameHistoryCard/ChangeNameHistoryCard";
import { GenericUpdateReqSliceSelector } from "../../../../../../redux/features/UttilSlice/genericUpdateReqSlice";
import { ChangeNameStyle } from "../ChangeNameStyle.style";


function ChangeNameHistory(props) {
  const { setChangeNameState, completedReqData } = props;
  const classes = ChangeNameStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const { applicantData } = useSelector(applicantSelector);
  const { isFetchingGetReqHistory, isSuccessGetReqHistory, isErrorGetReqHistory, getReqHistoryData, errorMessageGetReqHistory, requestType, allReqData } = useSelector(GenericUpdateReqSliceSelector)
  

  return (
    <Box>
      <Grid container alignItems="center" style={{ marginBottom: 16 }}>
        <IconButton
          aria-label="close"
          onClick={() => setChangeNameState(1)}
          style={{ marginRight: 8 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h6' className={classes.cancelTittle}>
          Change Name History
          <br />
          <Typography variant='body2'>All your completed change name history will appear here.</Typography>
        </Typography>
      </Grid>

      {completedReqData.length > 0 ? <ChangeNameHistoryCard setChangeNameState={setChangeNameState} reqData={completedReqData} /> :
        <Box className={classes.NoDetailsCon} style={{ marginTop: 65 }}>
          <NoDataFoundVector className={classes.NoDetailsSvg} />
          <Typography className={classes.nodetailHeading}>It's Empty</Typography>
          <Typography className={classes.nodetailSubHeading}>Looks Like you haven’t Requested any Name Change.</Typography>
        </Box>
      }
    </Box>
  );
}

export default ChangeNameHistory;