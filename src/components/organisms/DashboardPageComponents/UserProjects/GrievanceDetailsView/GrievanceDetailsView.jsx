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
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { projectDataSelector } from "../../../../../redux/features/projectdata/ProjectDataSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import { GrievanceDetailsViewStyles } from "./GrievanceDetailsView.styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import * as yup from "yup";
import moment from "moment";
import {
  raiseGrievance,
  getApplicantsGrievancesChat,
  clearSuccessMsg,
  grievanceSelector,
  searchGrievance,
  getGrievanceLog,
  setGrievanceLog,
  updateGrievanceStatus,
  getGrievanceDetails,
} from "../../../../../redux/features/Grievance/GrievanceSlice";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { UploadFileIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import RefreshIcon from '@material-ui/icons/Refresh';
import {
  fileDataUpload,
  fileUploadSelector,
} from "../../../../../redux/features/file/FileUploadSlice";


const GrievanceDetailsView = (props) => {
  const { itemDetails } = props;
  const classes = GrievanceDetailsViewStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const [details, setDetails] = useState(true);
  const [textLog, setTextLog] = useState([]);
  const [messages, setmessages] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [gridetail, setGridetail] = useState([]);
  // const [isUpload, setIsOpenUpload] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [imageBox, setImgBox] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fullScreenBox = useMediaQuery(theme.breakpoints.down("sm"));
  const [resolved, setResolved] = React.useState(false);
  const [chatData, setChatData] = React.useState([]);
  const handleClickImgBox = () => {
    setImgBox(true);
  };

  const handleCloseImgBox = () => {
    setImgBox(false);
  };

  const {
    isGrievanceSuccess,
    isGriDetailSuccess,
    isFetchingGriDetail,
    isGriDetailError,
    griDetailErrorMsg,
    GriDetailData,
    grievanceData,
    isLogFetching,
    isLogSuccess,
    logData,
    logPost,
    statusError,
    statusErrorMsg,
    logPostData,
    ChatSuccess,
    ChatFetching,
    ChatError,
    ChatRecords,
    ChatErrorMsg,
  } = useSelector(grievanceSelector);
  const { clearFileState, setImageUrl, clearImageUrl, imageUrl } =
    useSelector(fileUploadSelector);

  const { isProjectDataFetching, isProjectDataError, projectDataErrorMessage } =
    useSelector(projectDataSelector);
  const formikRef = useRef();

  const initialValues = {
    commentTxt: "",
  };

  const validationSchema = yup.object({
    commentTxt: yup.string()
      .matches(/^([a-zA-Z0-9.,\_]\s*)+$/, t(
        "grievanceForm.formControl.charactersNotAllowed"
      ))
      .required("enter text in before post"),
  });


  useEffect(() => {
    if (ChatSuccess) {
      setChatData(ChatRecords);
    }
  }, [ChatSuccess]);

  useEffect(() => {
    if (isGrievanceSuccess) {
      const data = grievanceData[0];
      // if (data?.status === "1") {
      //   setStatus(true);
      // }
      // if (data?.status === "2") {
      //   setStatus(true);
      // }
      // if (data?.status === "3") {
      //   setStatus(false);
      // }
      //   let params = {
      //     "grvId":grievanceData.grvid,
      //     "type":"Applicant",
      //     "comment":grievanceData.description,
      //     "attachment":imageUrl,
      //     "Lang": localStorage.getItem("i18nextLng"),
      //     "fromcrm": 0,
      //     "caseNumber":grievanceData.crm?.caseNumber,
      //     "caseId":grievanceData.crm?.caseId,
      //     "status" : ""
      // }
      // dispatch(setGrievanceLog(params))

      setDetails(data);
      dispatch(getApplicantsGrievancesChat(itemDetails));
      dispatch(clearSuccessMsg);
    }
  }, [grievanceData, isGrievanceSuccess]);

  // useEffect(() => {
  //   dispatch(fileDataUpload(fileData));
  // }, [dispatch, fileData]);

  const UploadFile = () => {
    if (imageUrl) {
      const requestData = {
        grvId: gridetail.grvid,
        type: "applicant",
        comment: "attached file",
        attachment: imageUrl,
      };
      dispatch(setGrievanceLog(requestData));
      setmessages(true);
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    var logsParams = {
      "grvId": gridetail.grvid,
      "type": "admin",
      "comment": values.commentTxt,
      "attachment": "",
      "Lang": "en",
      "fromcrm": 0,
      "caseNumber": itemDetails.caseNumber,
      "caseId": itemDetails.caseId,
      "status": gridetail.status
    }


    dispatch(setGrievanceLog(logsParams));

    setmessages(true);
    resetForm({ values: "" });
  };

  const handleClickToTable = () => {
    const tempObj = {
      mobile: props.phnNumber,
    };
    // dispatch(searchGrievance(tempObj));
    props.setGrievanceSecStates("table");
  };

  useEffect(() => {
    if (itemDetails?.grvid) {
      dispatch(getGrievanceLog(itemDetails.grvid));
      dispatch(getApplicantsGrievancesChat(itemDetails));
      dispatch(getGrievanceDetails(itemDetails.grievance_number));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isGriDetailSuccess) {
      setGridetail(GriDetailData[0]);
    }
  }, [isGriDetailSuccess])

  useEffect(() => {
    if (gridetail.grvid && logPostData) {
      dispatch(getApplicantsGrievancesChat(itemDetails));
      dispatch(getGrievanceLog(gridetail.grvid));
      // formikRef.current.setFieldValue("commentTxt", "");
      formikRef.current.setFieldValue("commentTxt", null);
    }
  }, [logPostData]);

  // useEffect(() => {
  //   if (messages && details?.grvid) {
  //     dispatch(getGrievanceLog(details.grvid));
  //     setmessages(false);
  //   }
  //   console.log(messages);
  // }, [messages]);

  // useEffect(() => {
  //   if (isFetchingGrievance) {
  //     setmessages(false);
  //   }
  // }, [isFetchingGrievance]);

  useEffect(() => {
    // console.log(logData);
    if (isLogSuccess && logData) {
      setTextLog(logData);
      // formikRef.current.setFieldValue("commentTxt", "");
    }
  }, [isLogSuccess, logData]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnRemoveFile = () => {
    formikRef.current.setFieldValue("file", null);
    setFileData([]);
  };

  function validate(value) {
    let error;
    if (!value) {
      error = "Please Enter Comment";
    }
    return error;
  }

  const updateStatus = () => {
    const requestData = {
      grvid: details.grvid,
      status: "3",
    };
    dispatch(updateGrievanceStatus(requestData));
  };

  const refreshChat = () => {
    dispatch(getApplicantsGrievancesChat(itemDetails));
    const requestData = {
      grievanceNumber: itemDetails.grievance_number,
    };
    dispatch(getGrievanceDetails(requestData.grievanceNumber));
  }


  return (
    <div>
      {isFetchingGriDetail && <Loading isOpen={isFetchingGriDetail} />}
      {/* {isLogFetching && <Loading isOpen={isLogFetching} />} */}
      {logPost && <Loading isOpen={logPost} />}
      {ChatFetching && <Loading isOpen={ChatFetching} />}

      {statusError && <AlertBox severity="error">{statusErrorMsg}</AlertBox>}
      {ChatError && <AlertBox severity="error">{ChatErrorMsg}</AlertBox>}
      {isGriDetailError && <AlertBox severity="error">{griDetailErrorMsg}</AlertBox>}
      <div className={classes.detailsSecContainer}>
        {isGriDetailSuccess && (
          <>
            <Grid container>
              <Grid item md={6}>
                <Box paddingX={2}>
                  <IconButton
                    aria-label="close"
                    onClick={handleClickToTable}
                    size="small"
                  >
                    <KeyboardBackspaceOutlinedIcon />
                  </IconButton>{" "}
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box paddingX={2}>
                  <Typography variant="h6">
                    {t("grievanceDetailsSection.title")}
                  </Typography>
                </Box>
                <Box className={classes.detailsSection}>
                  <Box>
                    <Typography variant="subtitle2">
                      {`#${itemDetails?.caseNumber}`}
                    </Typography>

                    {(gridetail.status == "pending" || gridetail.status == "Under Review" || gridetail.status == "In Progress" || gridetail.status == "Transferred") && (
                      <span className={classes.warningTag}>
                        {gridetail.status}
                      </span>
                    )}

                    {(gridetail.status == "New" || gridetail.status == "Reopen") && (
                      <span className={classes.successTag}>
                        {gridetail.status}
                      </span>
                    )}

                    {(gridetail.status == "Closed." || gridetail.status == "Resolved") && (
                      <span className={classes.closedTag}>
                        {gridetail.status}
                      </span>
                    )}
                  </Box>

                  <Box marginY={5}>
                    <Divider />
                  </Box>

                  <Box marginBottom={3} className={classes.multiFormContent}>
                    <Box className="leftbox">
                      <Typography className={classes.infosLabel}>
                        {t("grievanceDetailsSection.formControl.fullNameLabel")}
                      </Typography>
                      <Typography className={classes.infosText}>
                        {itemDetails.full_name || '--'}
                      </Typography>
                    </Box>

                    <Box className="rightbox">
                      <Typography className={classes.infosLabel}>
                        Raised On :
                      </Typography>
                      <Typography className={classes.infosText}>
                        {moment(new Date(itemDetails.CreatedAt)).format("DD-MMM-YY")}
                      </Typography>
                    </Box>

                  </Box>
                  <Box marginBottom={3}>
                    <Typography className={classes.infosLabel}>
                      {t("grievanceDetailsSection.formControl.emailLabel")}
                    </Typography>
                    <Typography className={classes.infosText}>
                      {itemDetails.email || '--'}
                    </Typography>
                  </Box>
                  <Box marginBottom={3}>
                    <Typography className={classes.infosLabel}>
                      {t("grievanceDetailsSection.formControl.mobileNumberLabel")}
                    </Typography>
                    <Typography className={classes.infosText}>
                      {itemDetails.mobile_no || '--'}
                    </Typography>
                  </Box>
                  <Box marginBottom={3}>
                    <Typography className={classes.infosLabel}>
                      {t(
                        "grievanceDetailsSection.formControl.grievanceCategoryLabel"
                      )}
                    </Typography>
                    <Typography className={classes.infosText}>
                      {itemDetails.grievance_category}
                    </Typography>
                  </Box>
                  <Box marginBottom={3}>
                    <Typography className={classes.infosLabel}>
                      {t(
                        "grievanceDetailsSection.formControl.grievanceTypeLabel"
                      )}
                    </Typography>
                    <Typography className={classes.infosText}>
                      {itemDetails.grievances_type}
                    </Typography>
                  </Box>
                  <Box marginBottom={3}>
                    <Typography className={classes.infosLabel}>
                      {t(
                        "grievanceDetailsSection.formControl.grievanceDescriptionLabel"
                      )}
                    </Typography>
                    <Typography className={classes.infosText}>
                      {itemDetails.description || '--'}
                    </Typography>
                  </Box>

                  {gridetail?.attachment && (<Box>
                    <Typography className={classes.trxScrnShotFileName}>
                      {gridetail?.attachment && gridetail.attachment.slice(-20)}
                      <Button color="primary" size="small" onClick={handleClickImgBox}>
                        {t("grievanceDetailsSection.formControl.clickToOpenBtnTxt")}
                      </Button>
                    </Typography>
                    <Dialog
                      // fullScreen={fullScreenBox}
                      open={imageBox}
                      onClose={handleCloseImgBox}
                      aria-labelledby="responsive-dialog-title"
                    >
                      {"pdf" == gridetail?.attachment?.split('.').pop() ? (
                        <iframe src={gridetail.attachment} className={classes.attachmentIframe}></iframe>
                      ) : (gridetail?.attachment && (
                        <img src={gridetail.attachment} alt="sttached " />
                      ))}
                    </Dialog>
                  </Box>)}
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.commentsSec}>
                  {gridetail.status == "Closed." && (<Box textAlign="center">
                    <Grid container>
                      <Grid item md={12}>
                        <Box>
                          <Typography variant="h4" className={classes.grievanceClosedheaderTxt}>
                            {`Grievance id #${itemDetails?.caseNumber} has been closed. You can raise new Grievance.`}
                          </Typography>
                        </Box>
                        <Box mb={3}>
                          <Button variant="contained" color="primary" size="large" onClick={() => props.setGrievanceSecStates('form')}>Raise New Grievance</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>)}

                  <Typography variant="h6">
                    {t("grievanceDetailsSection.commentTitle")}
                    <IconButton aria-label="clear" className={classes.margin} size="medium" onClick={(e) => refreshChat()}>
                      <RefreshIcon fontSize="inherit" />
                    </IconButton>
                  </Typography>
                  {gridetail.status != "Closed." && (<>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                      innerRef={formikRef}
                    >
                      {({ submitForm }) => (
                        <Form
                          noValidate
                          autoComplete="off"
                          style={{ marginBottom: 30 }}
                        >
                          <Grid container spacing={1} alignItems="flex-start">
                            {isLogFetching && <Loading isOpen={isLogFetching} />}
                            <Grid item xs>
                              {/* <FormHelperText error variant="outlined">
                            <ErrorMessage name="commentTxt" />
                          </FormHelperText> */}
                              <FormControl
                                control="input"
                                variant="outlined"
                                placeholder={t(
                                  "grievanceDetailsSection.commentSectionForm.addCommentPlaceholder"
                                )}
                                name="commentTxt"
                                type="text"
                                id="commentTxt"
                                validate={validate}
                                className={classes.commentInputBox}
                              // InputProps={{
                              //   endAdornment: (
                              //     <div>
                              //       <InputAdornment position="end">
                              //         <IconButton
                              //           aria-label="Attach File"
                              //           // onClick={handleClickShowPassword}
                              //           // onMouseDown={handleMouseDownPassword}
                              //           edge="end"
                              //           size="small"
                              //           onClick={handleClickOpen}
                              //         >
                              //           <AttachFileOutlinedIcon />
                              //         </IconButton>
                              //       </InputAdornment>

                              //       <Dialog
                              //         fullScreen={fullScreen}
                              //         open={open}
                              //         onClose={handleClose}
                              //         aria-labelledby="responsive-dialog-title"
                              //       >
                              //         <DialogTitle id="responsive-dialog-title">
                              //           {"Upload file"}
                              //         </DialogTitle>
                              //         <DialogContent>
                              //           <DialogContentText>
                              //             Upload Images/File You want to share
                              //             with Admin regarding Grievance
                              //           </DialogContentText>
                              //           <input
                              //             accept="image/jpeg,image/png,application/pdf,image/x-eps"
                              //             className={classes.input}
                              //             id="fileUpload"
                              //             type="file"
                              //             name="file"
                              //             onChange={(event) => {
                              //               if (event.currentTarget.files[0]) {
                              //                 formikRef.current.setFieldValue(
                              //                   "file",
                              //                   event.currentTarget.files[0]
                              //                 );
                              //                 setFileData(
                              //                   event.currentTarget.files[0]
                              //                 );
                              //               }
                              //             }}
                              //           />
                              //           <label htmlFor="fileUpload">
                              //             <Button
                              //               startIcon={<UploadFileIcon />}
                              //               color="primary"
                              //               variant="outlined"
                              //               fullWidth
                              //               component="span"
                              //               style={{ fontSize: 12, width: "50%" }}
                              //             >
                              //               upload
                              //             </Button>
                              //           </label>
                              //           {fileData["name"] && (
                              //             <Box
                              //               display="flex"
                              //               alignItems="center"
                              //               borderRadius="borderRadius"
                              //             >
                              //               <Box p={1} flexGrow={1}>
                              //                 <Typography variant="body2">
                              //                   {fileData["name"]}
                              //                 </Typography>
                              //               </Box>
                              //               <Box p={1}>
                              //                 <IconButton
                              //                   aria-label="delete"
                              //                   onClick={handleOnRemoveFile}
                              //                 >
                              //                   <CloseOutlinedIcon fontSize="small" />
                              //                 </IconButton>
                              //               </Box>
                              //             </Box>
                              //           )}
                              //           <FormHelperText error variant="filled">
                              //             <ErrorMessage name="file" />
                              //           </FormHelperText>
                              //         </DialogContent>
                              //         <DialogActions>
                              //           <Button
                              //             color="primary"
                              //             variant="contained"
                              //             fullWidth
                              //             component="span"
                              //             style={{ fontSize: 12, width: "20%" }}
                              //             onClick={UploadFile}
                              //           >
                              //             Save
                              //           </Button>

                              //           <Button
                              //             onClick={handleClose}
                              //             color="primary"
                              //             autoFocus
                              //           >
                              //             Back
                              //           </Button>
                              //         </DialogActions>
                              //       </Dialog>
                              //     </div>
                              //   ),
                              // }}
                              />
                            </Grid>
                            <Grid item>
                              <Button
                                variant="contained"
                                onSubmit={submitForm}
                                color="primary"
                                size="small"
                                type="submit"
                              >
                                {t(
                                  "grievanceDetailsSection.commentSectionForm.postBtnTxt"
                                )}
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik></>)}

                  <Grid className={classes.chatViewSection}>
                    {ChatRecords.length > 0 &&
                      ChatRecords.map((element, index) => (
                        <Grid
                          className={`${classes.chatMainCardView} ${element.fromcrm == 1 ? "rightBox" : ""
                            }`}
                          key={index}
                        >
                          <Grid
                            container
                            alignItems="center"
                            direction={
                              element.fromcrm == 1 ? "row-reverse" : "row"
                            }
                          >
                            <Grid item>
                              <Avatar
                                className={`${classes.userProfileIcon} ${element.fromcrm == 1 ? "rightBox" : ""
                                  }`}
                              >
                                <PersonOutlineOutlinedIcon fontSize="small" />
                              </Avatar>
                            </Grid>
                            <Grid item>
                              <Typography className={classes.applicantName}>
                                {element.fromcrm == 1 ? "Admin" : "Applicant"}
                              </Typography>
                              <Typography className={classes.chatDateNdTime}>
                                {element.CreatedAt}
                              </Typography>
                            </Grid>
                          </Grid>
                          {element?.comment === "attached file" ? (
                            <Box
                              className={`${classes.msgBox} ${element.type == 1 ? "rightBoxImg" : ""
                                }`}
                              onClick={() =>
                                window.open(element.attachment, "_blank")
                              }
                            >
                              <img
                                src={element.attachment}
                                alt="error Loading"
                                style={{
                                  width: "40%",
                                  height: "auto",
                                  padding: "4px",
                                }}
                              />
                            </Box>
                          ) : (
                            <Box
                              className={`${classes.msgBox} ${element.fromcrm == 1 ? "rightBox" : ""
                                }`}
                            >
                              <Typography>{element.comment}</Typography>
                            </Box>
                          )}
                        </Grid>
                      ))}
                  </Grid>

                  {/* {!resolved && (
                  <Box paddingTop={1.5} textAlign="right">
                    <Button
                      className={classes.resolvedBtn}
                      variant="outlined"
                      size="small"
                      endIcon={<CheckOutlinedIcon />}
                      onClick={updateStatus}
                    >
                      {t(
                        "grievanceDetailsSection.commentSectionForm.markAsResolvedBtnTxt"
                      )}
                    </Button>
                  </Box>
                )} */}
                </Box>
              </Grid>
            </Grid>

          </>
        )}
      </div>
    </div>
  );
};

export default GrievanceDetailsView;
