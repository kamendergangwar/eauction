import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { GrievanceDetailsViewStyles } from "../GrievanceDetailsView/GrievanceDetailsView.styles";
import IconTitle from "../../../../atoms/IconTitle/IconTitle";
import {
  ToolsIcon,
  GrevianceBannerIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import {
  getGrievanceList,
  grievanceSelector,
} from "../../../../../redux/features/Grievance/GrievanceSlice";


const RaiseGrievance = (props) => {
  const classes = GrievanceDetailsViewStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const dispatch = useDispatch();
  const { width, documentDetails } = props;

  const {
    GrievanceListSuccess,
    GrievanceListFetching,
    GrievanceListError,
  } = useSelector(grievanceSelector);

  useEffect(() => {
    if (GrievanceListSuccess) {
      props.action('table')
    }
  }, [GrievanceListSuccess])


  const trackGrievance = () => {
    dispatch(getGrievanceList());
  }

  return (
    <div>
      {GrievanceListFetching && <Loading isOpen={GrievanceListFetching} />}
      <Box textAlign="center">
        <Box className={classes.grevianceContainer}>
          <Grid container>
            <Grid item md={4}>
              <Box className={classes.grievanceLeftSection}>
                <Hidden mdUp>
                  <Typography variant="h5" className={classes.headeTxt}>
                    {t("grievanceForm.homeSection.text1")}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.subheading}>
                    {t("grievanceForm.homeSection.text2")}
                  </Typography>
                </Hidden>
                <GrevianceBannerIcon className="bannerIcon" />
              </Box>
            </Grid>
            <Grid item md={8}>
              <div className={classes.grievanceRightSection}>
                <Box className={classes.grievanceFormCont}>
                  <Hidden smDown>
                    <Typography variant="h5" className={classes.headeTxt}>
                      {t("grievanceForm.homeSection.text1")}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subheading}>
                      {t("grievanceForm.homeSection.text2")}
                    </Typography>
                  </Hidden>

                  <Button variant="contained" color="primary" size="large" onClick={() => props.action('form')}>{t("grievanceForm.homeSection.raiseMyGrievanceBtnTxt")}</Button>

                  <div className={classes.customDivider}>
                    <div className={classes.border} />
                    <span className={classes.content}>
                      {t("grievanceForm.homeSection.orTxt")}
                    </span>
                    <div className={classes.border} />
                  </div>

                  <Button color="primary" className={classes.TrackTxt} onClick={() => trackGrievance()}>{t("grievanceForm.homeSection.trackMyGrievanceBtnTxt")}</Button>

                  {GrievanceListError && (
                    <AlertBox severity="warning">{t("grievanceForm.homeSection.noDataErrorMsgTxt")}</AlertBox>
                  )}

                  <Typography variant="subtitle2" className="footerTxt">
                    {t("grievanceForm.homeSection.userInfoText")}
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>

          <Hidden mdUp>
            <Box marginTop={5}>
              <Divider />
            </Box>
          </Hidden>

          <Box className="footerNote">
            <IconTitle icon={<ToolsIcon />} title={t("grievanceForm.homeSection.userNoteText")} />
          </Box>

        </Box>


        {/* <Box className={classes.errorMsgView}>
          <Box marginBottom={1}>
            <img src={DataNoteFoundIcon} width={180} />
          </Box>
          <Typography>{props.firstLineMsg}</Typography>
          <Typography>{props.secdLineMsg}</Typography>
        </Box>
        <Button variant="contained"
          color="primary"
          size="large" endIcon={<ChevronRightOutlinedIcon />} onClick={() => props.action()}>{props.actionBtnTxt}</Button> */}
      </Box>
    </div>
  );
};

export default RaiseGrievance;
