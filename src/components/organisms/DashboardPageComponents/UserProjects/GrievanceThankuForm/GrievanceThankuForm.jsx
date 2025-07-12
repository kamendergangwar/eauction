import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import Typography from "@material-ui/core/Typography";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import { projectDataSelector } from "../../../../../redux/features/projectdata/ProjectDataSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import { GrievanceTabStyles } from "../GrievanceTab/GrievanceTab.styles";
import { UploadFileIcon, ToolsIcon, NextArrowIcon1, BackArrowIcon, GrevianceBannerIcon, PassIcon} from "../../../../atoms/SvgIcons/SvgIcons";
import { GrievanceDetailsViewStyles } from "../GrievanceDetailsView/GrievanceDetailsView.styles";
import IconTitle from "../../../../atoms/IconTitle/IconTitle";
import {
  grievanceSelector,
  getGrievanceDetails,
} from "../../../../../redux/features/Grievance/GrievanceSlice";

const GrievanceThankuForm = (props) => {
  const { grievanceResponse } = props;
  const dispatch = useDispatch();
  // const classes = GrievanceTabStyles();
  const classes = GrievanceDetailsViewStyles();
  const [savedValue, setSavedValue] = useState("");
  const [grievanceRecord, setGrievanceRecord] = useState({});
  const { t } = useTranslation("DashboardPageTrans");
  const { isProjectDataFetching, isProjectDataError, projectDataErrorMessage } =
    useSelector(projectDataSelector);
  const { isGrievanceSuccess, grievanceData, isFetchingGrievance } =
    useSelector(grievanceSelector);
  useEffect(() => {
    if (grievanceResponse) {
      setGrievanceRecord(grievanceResponse);
      // const existingValue = {
      //   grievanceNumber: grievanceResponse.grievance_number,
      // };
      // setSavedValue(existingValue);
    }
  }, [grievanceResponse]);
  // const [isEligible, setIsEligible] = useState(false);
  const thnkuFormikRef = useRef();

  /* useEffect(() => {
    if (grievanceSecStates === "thankYou") {
      thnkuFormikRef.current.resetForm();
    }
  }, [t]); */

  const thnkuFormInitialValues = {
    grievanceNumber: "",
  };

  const thnkuFormValidationSchema = yup.object({
    grievanceNumber: yup
      .string()
      .required(t("grievanceForm.thankYouForm.grievanceNumberErrors.required")),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.grievanceNumber) {
      const requestData = {
        grievanceNumber: values.grievanceNumber,
      };
      props.setGrievanceSecStates("table");
      // dispatch(getGrievanceDetails(requestData.grievanceNumber));
    }
    // props.setGrievanceSecStates("details");
  };


  const goNext = () => {
    props.setGrievanceSecStates("table");
  }

  const goGrevianceForm = () => {
    props.setGrievanceSecStates("form");
  }  

  return (
    <div>
      <Box textAlign="center">
        <Box className={classes.grevianceContainer}>
          <Grid container>
            <Grid item md={4}>
              <Box className={classes.grievanceLeftSection}>
              <Hidden smDown>
             
                <GrevianceBannerIcon className="bannerIconSmall" />
                <Typography variant="h6" className={classes.secHeader}>
                    {t("grievanceForm.step1Info.title")}
                </Typography>

                <Box className="stepsInfoContainer">
                  <Box className="stepContent">
                    <Box className="stepCount">1</Box>
                    <Typography variant="subtitle2" className="setpTxt">
                      {t("grievanceForm.step1Info.step1")}
                    </Typography>
                  </Box>

                  <Box className="stepContent">
                    <Box className="stepCount">2</Box>
                    <Typography variant="subtitle2" className="setpTxt">
                    {t("grievanceForm.step1Info.step2")}
                    </Typography>
                  </Box>

                  <Box className="stepContent">
                    <Box className="stepCount">3</  Box>
                    <Typography variant="subtitle2" className="setpTxt">
                    {t("grievanceForm.step1Info.step3")}
                    </Typography>
                  </Box>

                  <Box className="stepContent">
                    <Box className="stepCount">4</Box>
                    <Typography variant="subtitle2" className="setpTxt">
                    {t("grievanceForm.step1Info.step4")}
                    </Typography>
                  </Box>

                </Box>
              </Hidden>
              </Box>
            </Grid>
            <Grid item md={8}>
              <Box className={classes.grievanceRightSection}>
                <div className={classes.grievanceFormCont}>
                  {isFetchingGrievance && (
                    <Loading isOpen={isFetchingGrievance} />
                  )}

                  <PassIcon className="passIcon"/>

                  <Typography variant="h6" className={classes.thankuTitle}>
                  {t("grievanceForm.thankYouForm.subText")} {'#' + grievanceRecord?.crm?.caseNumber} {t("grievanceForm.thankYouForm.subText1")}
                  </Typography>

                  <Typography variant="h6" className="subTitle">
                    on {moment(grievanceRecord.CreatedAt).format("Do MMM, h:mm A")}
                  </Typography>

                 
                 <Box marginY={2.5} paddingTop={6.25}>
                    <Button variant="contained" color="primary" size="large" fullWidth className={classes.trackGriBtn} onClick={goNext}>
                      {t("grievanceForm.thankYouForm.trackButtonText")}
                    </Button>
                 </Box>


                <Box marginY={2.5}>
                  <Button variant="outlined" color="primary" fullWidth size="large"  onClick={goGrevianceForm} >
                  {t("grievanceForm.thankYouForm.newGrevianceButtonText")}
                    
                  </Button>
                </Box>
                  
                </div>
              </Box>
            </Grid>
          </Grid>

          <Box className="footerNote">
            <IconTitle
              icon={<ToolsIcon />}
              title={t("grievanceForm.homeSection.userNoteText")}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default GrievanceThankuForm;
