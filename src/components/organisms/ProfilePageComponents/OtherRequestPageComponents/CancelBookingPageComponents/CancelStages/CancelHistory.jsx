import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Button, IconButton } from "@material-ui/core";
import { CancelBookingStyle } from "../CancelBookingStyle.style";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { applicantSelector } from "../../../../../../redux/features/applicant/ApplicantSlice";
import { ApplicantProgressSelector } from "../../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { EmptyFlatCancel } from "../../../../../atoms/SvgIcons/SvgIcons";
import { clearCancelRequestState } from "../../../../../../redux/features/cancelBookingSlice/cancelBookingSlice";
import CancelHistoryCard from "../CancelHistoryCard/CancelHistoryCard";


function CancelHistory(props) {
  const { setCancelStage, completedReqData } = props;
  const classes = CancelBookingStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const [historyData, setHistoryData] = useState([])
  const history = useHistory();
  const dispatch = useDispatch();
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const { applicantData } = useSelector(applicantSelector);
  

  useEffect(() => {
    dispatch(clearCancelRequestState())
  }, [])

  return (
    <Box>
      <Grid container alignItems="center" style={{marginBottom: 16}}>
        <IconButton
          aria-label="close"
          onClick={() => setCancelStage(1)}
          style={{ marginRight: 8 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h6' className={classes.cancelTittle}>
          Cancellation History
          <br />
          <Typography variant='body2'>All your past flat cancellation history will appear here.</Typography>
        </Typography>
      </Grid>

      {completedReqData.length > 0 ? <CancelHistoryCard setCancelStage={setCancelStage} cancelStatusData={completedReqData} /> :
        <Box className={classes.NoDetailsCon} style={{ marginTop: 65 }}>
          <EmptyFlatCancel className={classes.NoDetailsSvg} />
          <Typography className={classes.nodetailHeading}>It's Empty</Typography>
          <Typography className={classes.nodetailSubHeading}>Looks Like you haven’t Requested any Cancellation.</Typography>
        </Box>
      }
    </Box>
  );
}

export default CancelHistory;