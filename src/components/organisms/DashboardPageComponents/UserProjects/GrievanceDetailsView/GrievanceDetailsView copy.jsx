import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FormControl from "../../../../molecules/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { projectDataSelector } from "../../../../../redux/features/projectdata/ProjectDataSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import { GrievanceDetailsViewStyles } from "./GrievanceDetailsView.styles";
import {
  grievanceSelector,
  searchGrievance,
  getGrievanceLog,
  setGrievanceLog,
} from "../../../../../redux/features/Grievance/GrievanceSlice";

const chatData = [
  {
    type: "applicant",
    CreatedAt: "30 Mins Ago",
    comment: "Okay, Thank you for your response.",
  },
  {
    type: "admin",
    CreatedAt: "2 Hours Ago",
    comment:
      "Hi, the Problem was caused by our server. If your funds were debited they will be refunded in 4 to 5 Business days.",
  },
];

const GrievanceDetailsView = (props) => {
  const classes = GrievanceDetailsViewStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const [details, setDetails] = useState("");
  const [textLog, setTextLog] = useState();
  const [messages, setmessages] = useState("");
  const dispatch = useDispatch();
  const {
    isGrievanceSuccess,
    grievanceData,
    isFetchingGrievance,
    isSearchFetching,
    isLogFetching,
    isLogSuccess,
    logData,
    logPost,
  } = useSelector(grievanceSelector);

  const { isProjectDataFetching, isProjectDataError, projectDataErrorMessage } =
    useSelector(projectDataSelector);
  const formikRef = useRef();

  const initialValues = {
    commentTxt: "",
  };

  useEffect(() => {
    if (isGrievanceSuccess) {
      const data = grievanceData[0];
      console.log(grievanceData);
      setDetails(data);
    }
  }, [grievanceData, isGrievanceSuccess, logPost]);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      grvId: details.grvid,
      type: "applicant",
      comment: values.commentTxt,
      attachment: "",
    };
    console.log("requestData", requestData);
    dispatch(setGrievanceLog(requestData));
  };

  const handleClickToTable = () => {
    const tempObj = {
      mobile: props.phnNumber,
    };
    // dispatch(searchGrievance(tempObj));
    props.setGrievanceSecStates("table");
  };

  useEffect(() => {
    dispatch(getGrievanceLog(details.grvid));
  }, [details.grvid, dispatch]);

  useEffect(() => {
    if (isLogSuccess) {
      setTextLog(logData);
      console.log(logData);
      console.log(textLog);
    }
  }, [isLogSuccess, logData]);

  return (
    <div>
      {isFetchingGrievance && <Loading isOpen={isFetchingGrievance} />}
      {isProjectDataError && (
        <AlertBox severity="error">{projectDataErrorMessage}</AlertBox>
      )}
      <div className={classes.detailsSecContainer}>
        {isGrievanceSuccess && (
          <Grid container>
            <Grid item md={6} xs={12}>
              <Box className={classes.detailsSection}>
                <Typography variant="h6">
                  <IconButton aria-label="close" onClick={handleClickToTable} size="small">
                    <KeyboardBackspaceOutlinedIcon />
                  </IconButton> {t("grievanceDetailsSection.title")}
                </Typography>
                <span
                  className={`${classes.grievanceStatus} ${true ? "inProgress" : ""
                    }`}
                >
                  {details?.status || "In progress"}
                </span>

                <Box marginBottom={3}>
                  <Typography className={classes.infosLabel}>
                    {t("grievanceDetailsSection.formControl.fullNameLabel")}
                  </Typography>
                  <Typography className={classes.infosText}>
                    {details?.full_name?.length > 0 && details.full_name}
                  </Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography className={classes.infosLabel}>
                    {t("grievanceDetailsSection.formControl.emailLabel")}
                  </Typography>
                  <Typography className={classes.infosText}>
                    {details?.email?.length > 0 && details.email}
                  </Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography className={classes.infosLabel}>
                    {t("grievanceDetailsSection.formControl.mobileNumberLabel")}
                  </Typography>
                  <Typography className={classes.infosText}>
                    {details?.mobile_no?.length > 0 && details.mobile_no}
                  </Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography className={classes.infosLabel}>
                    {t(
                      "grievanceDetailsSection.formControl.grievanceCategoryLabel"
                    )}
                  </Typography>
                  <Typography className={classes.infosText}>
                    {details?.grievance_category || ""}
                  </Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography className={classes.infosLabel}>
                    {t(
                      "grievanceDetailsSection.formControl.grievanceTypeLabel"
                    )}
                  </Typography>
                  <Typography className={classes.infosText}>
                    {details?.grievances_type || ""}
                  </Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography className={classes.infosLabel}>
                    {t(
                      "grievanceDetailsSection.formControl.grievanceDescriptionLabel"
                    )}
                  </Typography>
                  <Typography className={classes.infosText}>
                    {details?.description?.length > 0 && details.description}
                  </Typography>
                </Box>
                <Box>
                  <Typography className={classes.trxScrnShotFileName}>
                    {details?.attachment && details.attachment.slice(-20)}
                    <Button color="primary" size="small">
                      {t(
                        "grievanceDetailsSection.formControl.clickToOpenBtnTxt"
                      )}
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box className={classes.commentsSec}>
                <Typography variant="h6">
                  {t("grievanceDetailsSection.commentTitle")}
                </Typography>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  innerRef={formikRef}
                >
                  {({ submitForm }) => (
                    <Form
                      noValidate
                      autoComplete="off"
                      style={{ marginBottom: 30 }}
                    >
                      <Grid container spacing={1} alignItems="center">
                        {isLogFetching && <Loading isOpen={isLogFetching} />}
                        <Grid item xs>
                          <FormControl
                            control="input"
                            variant="outlined"
                            placeholder={t(
                              "grievanceDetailsSection.commentSectionForm.addCommentPlaceholder"
                            )}
                            name="commentTxt"
                            type="text"
                            id="commentTxt"
                            className={classes.commentInputBox}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="Attach File"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="small"
                                  >
                                    <AttachFileOutlinedIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            onSubmit={submitForm}
                            color="primary"
                            size="small"
                          >
                            {t(
                              "grievanceDetailsSection.commentSectionForm.postBtnTxt"
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
                <Grid className={classes.chatViewSection}>
                  {chatData.map((element, index) => (
                    <Grid
                      className={`${classes.chatMainCardView} ${element.name == "Admin" ? "rightBox" : ""
                        }`}
                      key={index}
                    >
                      <Grid
                        className={`${classes.chatMainCardView} ${
                          element.type == "admin" ? "rightBox" : ""
                        }`}
                        key={index}
                      >
                        <Grid item>
                          <Avatar
                            className={`${classes.userProfileIcon} ${element.name == "Admin" ? "rightBox" : ""
                              }`}
                          >
                            <PersonOutlineOutlinedIcon fontSize="small" />
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.applicantName}>
                            {element.name}
                          </Typography>
                          <Typography className={classes.chatDateNdTime}>
                            {element.date}
                          </Typography>
                        </Grid>
                        <Box
                          className={`${classes.msgBox} ${
                            element.type == "admin" ? "rightBox" : ""
                          }`}
                        >
                          <Typography>{element.comment}</Typography>
                        </Box>
                      </Grid>
                      <Box
                        className={`${classes.msgBox} ${element.name == "Admin" ? "rightBox" : ""
                          }`}
                      >
                        <Typography>{element.message}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Box paddingTop={1.5} textAlign="right">
                  <Button
                    className={classes.resolvedBtn}
                    variant="outlined"
                    size="small"
                    endIcon={<CheckOutlinedIcon />}
                  >
                    {t(
                      "grievanceDetailsSection.commentSectionForm.markAsResolvedBtnTxt"
                    )}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default GrievanceDetailsView;
