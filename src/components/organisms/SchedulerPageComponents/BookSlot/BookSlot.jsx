import React, { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DomainIcon from "@material-ui/icons/Domain";
import { useHistory } from "react-router-dom";
import FormControl from "../../../molecules/FormControl/FormControl";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import { ScheduleStyle } from "../Schedule.style";
import withWidth from "@material-ui/core/withWidth";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TodayIcon from "@material-ui/icons/Today";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  WhiteArrowIcon,
  WhatsappIcon,
  PersonalDetailsTitleIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  bookAppointment,
  getSlots,
  getApplicant,
  getSlotTimer,
  applicantSelector,
  clearApplicantData,
} from "../../../../redux/features/applicant/ApplicantSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import moment from "moment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import { ApiEndPoint } from "../../../../utils/Common";
import {
  addEditApplicantProgress,
  ApplicantProgressSelector,
  getApplicantProgress,
} from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const BookSlot = (props) => {
  const { width } = props;
  const classes = ScheduleStyle();
  const { t } = useTranslation("Appointment");
  const formikRef = useRef();
  const history = useHistory();
  // const [isEligible, setIsEligible] = useState(false);
  // const [addressDialogOpenIs, setAddressDialogOpenIs] = useState(false);
  const [formValues, setFormValues] = useState(null);
  // const myScrollContainerRef = useRef(null);
  // const [isWhatsappNotification, setWhatsappNotification] = useState(false);
  // const [isViewAddress, setIsViewAddress] = useState(false);
  // const [postalAddressIs, setPostalAddressIs] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [slotTime, setSlotTime] = useState([]);
  // const [maritalStatusList, setMaritalStatusList] = useState([]);
  // const [editCoApplicantIs, setEditCoApplicantIs] = useState(false);
  const dispatch = useDispatch();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [showSlotTimeError, setShowSlotTimeError] = useState(false);
  const [openTimeout, setOpenTimeout] = React.useState(false);
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);
  const [slotTimeRecord, setSlotTimeRecord] = useState([]);
  const [showTimerRibbin, setShowTimerRibbin] = useState(false);
  const [bookingEndDate, setBookingEndDate] = useState("");
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00:00');

  // React.useEffect(() => {
  //   let timerId;

  //   if (runTimer) {
  //     setCountDown(60 * 2);
  //     timerId = setInterval(() => {
  //       setCountDown((countDown) => countDown - 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(timerId);
  //   }

  //   return () => clearInterval(timerId);
  // }, [runTimer]);

  useEffect(() => {
    if (timer) {
      if (timer?.split(":")[0] + timer?.split(":")[1] + timer?.split(":")[2] + timer?.split(":")[3] > 0) {
        setShowTimerRibbin(true);
      }
    }
  }, [timer]);
  
  const selectedAppointment = localStorage.getItem("SelectedSlot")  ? JSON.parse(localStorage.getItem("SelectedSlot")) : "";
  const selectedSlot = localStorage.getItem("activeSlot")  != "undefined" ? JSON.parse(localStorage.getItem("activeSlot")) : "";  

  // React.useEffect(() => {
  //   if (countDown < 0 && runTimer) {
  //     setRunTimer(false);
  //     setCountDown(0);
  //     setOpenTimeout(true);
  //     mySlotUpdated(selectedSlot);
  //   }
  // }, [countDown, runTimer]);

  // const togglerTimer = () => setRunTimer((t) => !t);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  const {
    isFetchingBookAppointment,
    isSuccessResBookAppointment,
    BookAppointmentCenterData,
    isErrorBookAppointment,
    errorMessageBookAppointment,
    isSuccessResApplicantGet,
    applicantData,
    SlotData,
    isSuccessResSlot,
    isSuccessSlotBookEndTime,
    SlotBookEndTime
  } = useSelector(applicantSelector);

  useEffect(() => {
    dispatch(getApplicant());
    let jsonObj = {
      "ApplicantId": localStorage.getItem("applicantId"),
      "selectedDate": selectedAppointment?.date
    }
    dispatch(getSlotTimer(jsonObj));
  }, []);

  useEffect(() => {
    let JsonData = {
      centerId: selectedAppointment?.centerDetails?.center_id,
      applicantId: localStorage.getItem("applicantId"),
      serviceId: 1,
      selectedDate: selectedAppointment.date,
    };
    dispatch(getSlots(JsonData));
  }, []);

  const cancelClose = () => {
    setOpenTimeout(false);
  };

  useEffect(() => {
    if (isSuccessResBookAppointment) {
      // updateApplicantProgressStepper();
      localStorage.setItem(
        "AppointmentTime",
        JSON.stringify({
          slotTime: slotTime,
          appointmentId: BookAppointmentCenterData?.appointment_id,
        })
      );
      dispatch(clearApplicantData());
      history.push("/appointment-Successfull");
    }
  }, [isSuccessResBookAppointment]);

  const initialValues = {
    meetingType: "",
    // dateOfBirth: null,
    // whatsappNumber: "",
    // emailId: "",
  };

  const validationSchema = yup.object({
    meetingType: yup.string().required("Please select meeting type"),
  });

  useEffect(() => {
    dispatch(getApplicantProgress());
  }, [dispatch]);

  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } =
    useSelector(ApplicantProgressSelector);
  const updateApplicantProgressStepper = () => {
    let newStepper = [];
    let newStep = {};
    if (isSuccessProgressResStepper) {
      const ApplicantStepper = ApplicantStepperData.superStepper
        ? ApplicantStepperData.superStepper
        : superStepper;
      ApplicantStepper.forEach((step) => {
        if (step.StepId == 11) {
          newStep = {
            ...step,
            Status: "completed",
            Description: "Slot booked successfully",
          };
        } else {
          newStep = step;
        }
        newStepper.push(newStep);
      });
      dispatch(addEditApplicantProgress(newStepper));
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    let jsonData = {
      CenterId: selectedAppointment?.centerDetails?.center_id,
      ApplicantId: localStorage.getItem("applicantId"),
      ServiceId: 1,
      AppointmentTime: slotTime,
      SelectedDate: selectedAppointment.date,
    };

    if (selectedTime != "") {
      dispatch(bookAppointment(jsonData));
    } else {
      setShowSlotTimeError(true);
    }
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, days, hours, minutes, seconds
    };
  }

  const startTimer = (e) => {
    let { total, days, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to 
      // add '0' at the beginning of the variable
      setTimer(
        (days > 9 ? days : '0' + days) + ':' +
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    } else {
      //console.log("SlotBookEndTime",SlotBookEndTime);
      setTimer('00:00:00:00');
      // localStorage.setItem("showPaymentExpRibbon", false);
      setOpenTimeout(true);
      // cancelFlatBooking(SlotBookEndTime);
      clearInterval(Ref.current);
      ///removeRibbonAfterSomeTime();
    }
  }


  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    setTimer('00:00:00:00');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    if (+SlotBookEndTime?.Applicant_appintment_Booking_Status?.length > 0) {
      var endTime = SlotBookEndTime?.Applicant_appintment_Booking_Status[0]?.booked_valid_date;
      var startTime = SlotBookEndTime?.Applicant_appintment_Booking_Status[0]?.current_time;
      let deadline = new Date();

      // This is where you need to adjust if 
      // you entend to add more time
      deadline.setSeconds(deadline.getSeconds() + (endTime - startTime));
      //setShowTimerRibbin(true);
      return deadline;
    } else {
      setShowTimerRibbin(false);
      return 0;
    }
  }


  useEffect(() => {
    if (isSuccessSlotBookEndTime && SlotBookEndTime) {
      clearTimer(getDeadTime());
    }
  }, [isSuccessSlotBookEndTime, SlotBookEndTime]);

  const holdeSlot = (data) => {
    setSelectedTime(data.start);
    setSlotTime(`${data.start} - ${data.end}`);
    localStorage.setItem("AppointmentTime", data.start);
    setShowSlotTimeError(false);
  };

  const confirmBooking = () => {
    let jsonData = {
      CenterId: selectedAppointment?.centerDetails?.center_id,
      ApplicantId: localStorage.getItem("applicantId"),
      ServiceId: 1,
      AppointmentTime: selectedTime,
      SelectedDate: selectedAppointment.date,
    };

    dispatch(bookAppointment(jsonData));
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     togglerTimer();
  //   }, 3000);
  // }, []);

  useEffect(() => {
    if (isSuccessResSlot) {
      setSlotTimeRecord(SlotData.slottime);
    }
  }, [isSuccessResSlot]);
  async function mySlotUpdated(slotDetails) {
    let url = await fetch(
      `${ApiEndPoint}/appointment/API/Appointment/updateSlotAfterSessionEnd?slotId=${slotDetails?.id
      }&slotNo=${slotDetails?.available_count}&serviceId=${slotDetails?.service_id
      }&centerId=${slotDetails?.center_id}&selectedDate=${slotDetails?.appointment_date
      }&applicantId=${localStorage.getItem("applicantId")}`,
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    );
    let response = url.json();
    response = await response;
    // console.log(response)
    return response.data;
  }

  const clearTimmer = () => {
    // setCountDown(0);
    mySlotUpdated(selectedSlot);
    history.push("/book-appointment");
  };

  const onBack = () => {
    mySlotUpdated(selectedSlot);
    history.push("/book-appointment");
  };

  return (
    <>
      {isFetchingBookAppointment && (
        <Loading isOpen={isFetchingBookAppointment} />
      )}
      <Formik
        initialValues={formValues || initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, touched, errors, values }) => (
          <Form noValidate autoComplete="off" className={classes.formContainer}>
            <FormCard>
              <Hidden smDown>
                <Box onClick={() => onBack()}>
                  <FormTitleBox
                    title="Book your Appointment Slot"
                    backUrl={true}
                    titleIcon={<PersonalDetailsTitleIcon fontSize="large" />}
                  />
                </Box>
              </Hidden>
              <Hidden mdUp>
                <Box onClick={() => onBack()}>
                  <StepperBar
                    callingForMobileIs={true}
                    title="Book your Appointment Slot"
                    backUrl={true}
                  />
                </Box>
              </Hidden>
              <div className={classes.formSection}>
                <Box className={classes.inputsSection}>
                  <Grid container alignItems="flex-start">
                    <Grid item md={8} xs={12} className={classes.DetailsCon}>
                      <Box className={classes.SelectedOfficeContainer}>
                        {applicantData?.appointment_details?.length == 0 && (
                          <>
                            <Typography className={classes.headeTxt}>
                              {selectedAppointment?.centerDetails?.center_area}
                            </Typography>
                            <Typography className={classes.scheduleddeContent}>
                              {
                                selectedAppointment?.centerDetails
                                  ?.center_address
                              }{" "}
                              {
                                selectedAppointment?.centerDetails
                                  ?.center_pincode
                              }
                            </Typography>
                          </>
                        )}
                        {applicantData?.appointment_details?.length > 0 &&
                          applicantData && (
                            <Box className={classes.oldAppointmentSection}>
                              <Typography
                                variant="h6"
                                className={classes.subHeading}
                                style={{ paddingTop: "8px" }}
                              >
                                {t(
                                  "scheduleAppointment.previousAppointmentTitle"
                                )}
                              </Typography>
                              <Grid item md={12}>
                                <Typography
                                  component="p"
                                  variant="subtitle1"
                                  style={{
                                    padding: "8px 0px 10px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {t(
                                    "scheduleAppointment.appointmentCenterLabel"
                                  )}
                                </Typography>
                                <Box className={classes.centerAddress}>
                                  <DomainIcon className={classes.noteIcon} />
                                  <Typography
                                    component="span"
                                    variant="h6"
                                    color="primary"
                                    className={classes.fontBoldStyle}
                                  >
                                    {
                                      applicantData?.appointment_details[0]
                                        ?.center_area
                                    }
                                  </Typography>
                                </Box>
                                <Box className={classes.centerAddress}>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                    className={classes.details}
                                  >
                                    {
                                      applicantData?.appointment_details[0]
                                        ?.center_address
                                    }
                                    ,{" "}
                                    {
                                      applicantData.appointment_details[0]
                                        ?.center_pincode
                                    }
                                  </Typography>
                                </Box>
                              </Grid>

                              <Grid item md={12}>
                                <Typography
                                  component="p"
                                  variant="subtitle1"
                                  style={{
                                    paddingBottom: "10px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {t("scheduleAppointment.scheduledOn")}
                                </Typography>
                                <Box className={classes.centerAddress}>
                                  <EventNoteIcon className={classes.noteIcon} />
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="primary"
                                    className={classes.fontBoldStyle}
                                    style={{ fontWeight: 400 }}
                                  >
                                    {moment(
                                      applicantData?.appointment_details[0]
                                        ?.book_date
                                    ).format("ddd, Do MMMM, YYYY")}
                                  </Typography>
                                </Box>
                                <Box className={classes.centerAddress}>
                                  <AccessTimeIcon
                                    className={classes.noteIcon}
                                  />
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="primary"
                                    className="timeTxt"
                                  >
                                    {
                                      applicantData?.appointment_details[0]
                                        ?.start_time
                                    }{" "}
                                    -{" "}
                                    {
                                      applicantData.appointment_details[0]
                                        ?.end_time
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Box>
                          )}
                        {/* <Box>Meeting Type</Box>
                                                <FormControl
                                                    control="selectbox"
                                                    variant="outlined"
                                                    id="meetingType"
                                                    name="meetingType"
                                                    label="Meeting Type"
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Documents Verification",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Documents Verification 1",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Documents Verification 2",
                                                        }
                                                    ]}
                                                    required
                                                    style={{ maxWidth: "350px" }}
                                                /> */}
                      </Box>
                      {showSlotTimeError && (
                        <AlertBox severity="error">Please select Slot</AlertBox>
                      )}
                      {isErrorBookAppointment && (
                        <AlertBox severity="error">
                          {errorMessageBookAppointment}
                        </AlertBox>
                      )}
                      <Box className={classes.AvalilableSlotContainer}>
                        <Box className="header">
                          {t("bookSlot.chooseSlotTxt")} -{" "}
                          <span style={{ color: "#545454" }}>
                            {/* {" "}
                            {t("bookSlot.timeTxt")}: {minutes}:{seconds} left */}
                            {" "}
                            {t("bookSlot.timeTxt")}: {timer.split(":")[2]} Min : {timer.split(":")[3]} Sec
                          </span>
                          {/* <button type="button" onClick={togglerTimer}>
                                                        {runTimer ? "Stop" : "Start"}
                                                    </button> */}
                          {/* <button type="button" onClick={clearTimmer}>
                                                        Stop/Clear
                                                    </button> */}
                        </Box>
                        <Box className="body">
                          <Grid container justify="flex-start">
                            {slotTimeRecord.length > 0 &&
                              slotTimeRecord?.map((item, index) => (
                                <Grid
                                  item
                                  xs
                                  sm={3}
                                  key={index}
                                  style={{ margin: "5px 5px" }}
                                  onClick={() => holdeSlot(item)}
                                >
                                  <Box
                                    className={`SlotTime ${item.start == selectedTime
                                      ? "selectedTime"
                                      : ""
                                      } `}
                                  >
                                    <Box>{item.start}</Box>
                                    to
                                    <Box>{item.end}</Box>
                                  </Box>
                                </Grid>
                              ))}
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Box className={classes.MeetingDetailContaine}>
                        <h1 className="tittle">
                          {t("bookSlot.meetingDetailTxt")}
                        </h1>
                        <Avatar
                          alt="Remy Sharp"
                          src={applicantData?.ImagePath}
                          style={{
                            width: "150px",
                            height: "150px",
                            margin: "20px auto",
                          }}
                        />
                        <Box className="meetingInfo">
                          <Grid container justify="center">
                            <Grid item sm={8}>
                              <List dense={dense}>
                                <ListItem>
                                  <ListItemIcon>
                                    <PersonOutlineIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={applicantData?.FirstName}
                                    secondary={
                                      secondary ? "Secondary text" : null
                                    }
                                  />
                                </ListItem>
                                <ListSubheader>
                                  {t("bookSlot.appointmentDetailTxt")}{" "}
                                </ListSubheader>
                                <ListItem>
                                  <ListItemIcon>
                                    <TodayIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      moment(selectedAppointment?.date).format(
                                        "DD MMM, YYYY"
                                      ) || "--"
                                    }
                                    secondary={
                                      secondary ? "Secondary text" : null
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon>
                                    {/* <AccessTimeIcon /> */}
                                    <AccessTimeIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={slotTime}
                                    secondary={
                                      secondary ? "Secondary text" : null
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                          </Grid>
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.confirmBtn}
                        >
                          {t("bookSlot.confirmBookingBtn")}
                        </Button>
                      </Box>
                      {applicantData?.appointment_details?.length > 0 && (
                        <Box
                          className={classes.SelectedOfficeContainer}
                          marginTop={2}
                        >
                          <Typography className={classes.headeTxt}>
                            {selectedAppointment?.centerDetails?.center_area}
                          </Typography>
                          <Typography className={classes.scheduleddeContent}>
                            {selectedAppointment?.centerDetails?.center_address}{" "}
                            {selectedAppointment?.centerDetails?.center_pincode}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </FormCard>
          </Form>
        )}
      </Formik>

      <Dialog
        className={classes.dialogBox}
        open={openTimeout}
        onClose={cancelClose}
        aria-labelledby="responsive-dialog-title"
        disableEscapeKeyDown
        disableBackdropClick
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h6" className={classes.dialogTitle}>
            {t("scheduleAppointment.Slot.yourSessionTxt")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("scheduleAppointment.Slot.kindlyselectTxt")}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogBoxButton}>
          {/* onClick={() => cancelledAppointment(applicantData.appointment_details[0])} */}
          <Button
            autoFocus
            variant="contained"
            color="primary"
            onClick={clearTimmer}
          >
            {t("scheduleAppointment.Slot.selectslotBtn")}
          </Button>
          {/* <Button onClick={cancelClose} variant="outlined" color="primary" autoFocus>
                        No
                    </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withWidth()(BookSlot);
