import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Loading from "../../../../atoms/Loading/Loading";
import ProfileWrap from "../../ProfileWrap/ProfileWrap";
import { StartFreshStyle } from "./StartFreshStyle.style";
import { Badge, Button, Paper } from "@material-ui/core";
import { ApplicantProgressSelector } from "../../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { CancelBookingIllus, EmptyFlatCancel } from "../../../../atoms/SvgIcons/SvgIcons";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function StartFresh(props) {
  const classes = StartFreshStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [bookingPaymentDone, setBookingPaymentDone] = useState(false);
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "10" && item.Status == "completed") {
          setBookingPaymentDone(true);
        }
      })
    }
  }, [isSuccessProgressResStepper]);

  const redirectToIncomeDetails = () => {
    //history.push("/income-details");
    history.push({ 
      pathname: '/income-details',
      search: '?name=sudheer',
      state: {'from_category_change_menu' : 1}
    });
  }

  return (
    <ProfileWrap>
      {/* {(isFetchingDocuments || isFetchingApplicantGet || isFetchingGetDocsList || downloadLoading) && (
        <Loading isOpen={isFetchingDocuments || isFetchingApplicantGet || isFetchingGetDocsList || downloadLoading} />
      )} */}
      <div className={classes.docContainer}>
        <Box className={classes.pageHeader}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" className={classes.pageTitle}>{t("Change_Category")}</Typography>
            </Grid>
            <Grid>
              <Button variant="outlined" color="primary" size='small' onClick={() => redirectToIncomeDetails()}>{t("Change Category")}</Button>
            </Grid>
          </Grid>
        </Box>
        {(!bookingPaymentDone) && <Box className={classes.NoDetailsCon} style={{ marginTop: 65 }}>
          <EmptyFlatCancel className={classes.NoDetailsSvg} />
          <Typography className={classes.nodetailSubHeading}>{t("ccConfirmDesc")}</Typography>
          <Button endIcon={<ArrowForwardIosIcon />} size="small" color="primary" onClick={() => redirectToIncomeDetails()}>{t("Change_Category")}</Button>
        </Box>}
      </div>
    </ProfileWrap >
  );
}

export default StartFresh;