import { Typography, Grid, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DomainIcon from '@material-ui/icons/Domain';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ErrorIcon from '@material-ui/icons/Error';
import { RescheduleStyle } from './Reschedule.style';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from '../../atoms/Loading/Loading';
import {
    bookAppointment,
    getApplicant,
    getAppointmentData,
    cancelAppointment,
    applicantSelector,
    clearApplicantData,
} from "../../../redux/features/applicant/ApplicantSlice";
import {
    getPreferencesList,
    clearPreferencesState,
    preferencesSelector
} from "../../../redux/features/preferences/PreferencesSlice";
import { ApiEndPoint } from '../../../utils/Common';
import { ApplicantProgressSelector, addEditApplicantProgress } from '../../../redux/features/ApplicantStepper/ApplicantStepperSlice';

const Reschedule = () => {
    const classes = RescheduleStyle();
    const { t } = useTranslation("Appointment");
    const [open, setOpen] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);
    const [appointmentsRecords, setAppointmentsRecords] = useState([]);
    const [pdfLoading, setPdfLoading] = useState(false);
    const dispatch = useDispatch();
    const {
        isFetchingAppointmentData,
        isSuccessAppointmentData,
        isSuccessAppointmentCancel,
        AppointmentData,
        applicantData
    } = useSelector(applicantSelector);

    const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } = useSelector(ApplicantProgressSelector);
    const cancelApplicantProgressStepper = () => {
        let newStepper = [];
        let newStep = {};
        if (isSuccessProgressResStepper) {
            const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
            ApplicantStepper.forEach(step => {
                if (step.StepId == 11) {
                    newStep = {
                        ...step,
                        Status: "pending",
                        Description: "Slot booked pending"
                    }
                } else {
                    newStep = step
                }
                newStepper.push(newStep);
            });
            dispatch(addEditApplicantProgress(newStepper));
        }
    }

    const {
        isSuccessResGetPreferences
    } = useSelector(preferencesSelector);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const cancelCloseOpen = () => {
        setOpenCancel(true);
    }

    const cancelClose = () => {
        setOpenCancel(false);
    }
    const history = useHistory();


    useEffect(() => {
        dispatch(getAppointmentData());
    }, [])


    useEffect(() => {
        if (isSuccessAppointmentData) {
            setAppointmentsRecords(AppointmentData);
            dispatch(clearApplicantData())
        }
    }, [isSuccessAppointmentData]);


    const checkSession = () => {
        dispatch(getPreferencesList());
    }

    useEffect(() => {
        if (isSuccessResGetPreferences) {
            downloadReceipt();
            dispatch(clearPreferencesState());
        }
    }, [isSuccessResGetPreferences])

    const downloadReceipt = () => {
        setPdfLoading(true);
        let fileUrl = ApiEndPoint + "/appointment/API/Appointment/appointmentPdf/" + localStorage.getItem("applicantId") + "?Lang="+ localStorage.getItem("i18nextLng");
        fetch(fileUrl, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        }).then((response) => response.blob()).then((blob) => {
            setPdfLoading(false);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'AppointmentPass';
            document.body.append(link);
            link.click();
            link.remove();
            // in case the Blob uses a lot of memory
            setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(function (error) {
            setPdfLoading(false);
        });
    }


    const cancelledAppointment = (item) => {
        dispatch(cancelAppointment(item.appointment_id));
    }

    useEffect(() => {
        if (isSuccessAppointmentCancel) {
            setOpenCancel(false);
            dispatch(getAppointmentData());
            // cancelApplicantProgressStepper();
        }
    }, [isSuccessAppointmentCancel]);

    return (
        <>
            {pdfLoading && (<Loading isOpen={pdfLoading} />)}
            {isFetchingAppointmentData && (<Loading isOpen={isFetchingAppointmentData}></Loading>)}
            <div className={classes.AppointmentContainer}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item md={3}>
                        {/* <Button variant="text" style={{ justifyContent: 'left' }} onClick={() => history.push("/appointment-Successfull")}><ArrowBackIcon /></Button> */}
                    </Grid>
                    <Grid item md={6} style={{ textAlign: 'center' }}>
                        <Typography variant='h5' align="center" component='span' className={classes.Heading} >{t("appointmentSuccessfull.myAppointmentBtn")}</Typography>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>

                {appointmentsRecords?.scheduledAppointments?.length == 1 &&
                    <>
                        <Grid container variant="div" className={classes.subheadingContainer} style={{justifyContent:"space-between",alignItems: "center"}} >
                            <Grid item>
                                <Typography component='div' variant='body2'>
                                {t("scheduleAppointment.currentAppointment")}
                                </Typography>
                            </Grid>
                            <Grid item>
                            <Button variant="contained" color="primary"  onClick={() => history.push("/dashboard")}>{t("Dashboard")}</Button>
                            </Grid>
                        </Grid>
                        <Grid container variant="div" className={classes.detailsContainer}>
                            <Grid item md={6}>
                                <Box className={classes.iconHeader}>
                                    <EventNoteIcon className={classes.noteIcon} />
                                <Typography component='span' className={classes.fontstyle}> <span className={classes.textIcon}>{t("scheduleAppointment.idTxt")} :</span> {appointmentsRecords.scheduledAppointments[0]?.appointment_id}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box className={classes.iconHeader1}>
                                    <CheckCircleIcon className={classes.validIcon} />
                                <Typography component="span" className={classes.validIcon}> {t("scheduleAppointment.validTillTxt")} {appointmentsRecords.scheduledAppointments[0].book_date}</Typography>
                                </Box>
                            </Grid>
                            <Grid container variant="div">
                                <Grid item lg={12} style={{ borderBottom: "1px solid #eee" }}></Grid>
                            </Grid>
                            <Grid item md={6} className={classes.detailcontain}>
                            <Typography component="p" variant='body2' className={classes.details}>{t("scheduleAppointment.appointmentCenterLabel")}</Typography>
                                <Box className={classes.centerAddress}>
                                    <DomainIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='h6' color="primary" className={classes.fontTitle}>
                                        {appointmentsRecords.scheduledAppointments[0].center_area}
                                    </Typography>
                                </Box>
                                <Typography component="p" variant='body2' className={classes.details}>{appointmentsRecords.scheduledAppointments[0].center_address}</Typography>
                            </Grid>

                            <Grid item md={6} className={classes.detailcontain1}>
                            <Typography component="p" variant='body2' className={classes.details}>{t("scheduleAppointment.scheduledOn")}
                                </Typography>
                                <Box className={classes.centerAddress}>
                                    <EventNoteIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className={classes.fontTitle} style={{ fontWeight: 400 }}>
                                        {appointmentsRecords.scheduledAppointments[0].book_date}
                                    </Typography>
                                </Box>
                                <Box className={classes.centerAddress}>
                                    <AccessTimeIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className={classes.fontTitle}>{appointmentsRecords.scheduledAppointments[0].start_time} - {appointmentsRecords.scheduledAppointments[0].end_time} </Typography>
                                </Box>
                            </Grid>
                            <Grid container variant="div">
                                <Grid item lg={12} style={{ borderBottom: "1px solid #eee" }}></Grid>
                            </Grid>
                            <Grid container variant="div" style={{ padding: '10px 0px' }}>
                                <Grid item lg={6}>
                                    <Button variant="text" color="primary" className={classes.button} size="medium" startIcon={<GetAppIcon />} onClick={() => checkSession()}>
                                    {t("appointmentSuccessfull.downloadReceiptBtn")}
                                    </Button>
                                </Grid>
                                <Grid item lg={6} style={{ textAlign: 'right' }}>
                                    <Button variant="contained" color="primary" className={classes.button} size="medium" onClick={handleClickOpen}>
                                    {t("rescheduleAppointment.scheduleBtn")}
                                    </Button>
                                    <Button variant="outlined" color="primary" className={classes.button} size="medium" onClick={cancelCloseOpen}>
                                    {t("rescheduleAppointment.cancelBtn")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                }

                {appointmentsRecords?.cancelledAppointments?.length > 0 && appointmentsRecords?.cancelledAppointments?.map((item, index) => (
                    <>
                        {index == 0 &&
                            <Grid container variant="div" className={classes.subheadingContainer}>
                                <Grid item md={12}>
                                    <Typography component='div' variant='body2'>
                                        {t("scheduleAppointment.previousAppointmentTitle")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        <Grid container variant="div" className={classes.detailsContainer}>
                            <Grid item md={6}>
                                <Box className={classes.iconHeader}>
                                    <EventNoteIcon className={classes.noteIcon} />
                                    <Typography component='span' className={classes.fontstyle}> <span className={classes.textIcon}>{t("scheduleAppointment.idTxt")} : </span>{item.appointment_id}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box className={classes.iconHeader1}>
                                    <ErrorIcon className={classes.errorIcon} />
                                    <Typography component="span" className={classes.errorIcon}>{t("scheduleAppointment.CancelledTxt")}</Typography>
                                </Box>
                            </Grid>
                            <Grid container variant="div">
                                <Grid item lg={12} style={{ borderBottom: "1px solid #eee" }}></Grid>
                            </Grid>
                            <Grid item md={6} className={classes.detailcontain}>
                                <Typography component="p" variant='body2' className={classes.details}>{t("scheduleAppointment.appointmentCenterLabel")}</Typography>
                                <Box className={classes.centerAddress}>
                                    <DomainIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='h6' color="primary" className={classes.fontTitle}>
                                        {item.center_area}
                                    </Typography>
                                </Box>
                                <Typography component="p" variant='body2' className={classes.details}>{item.center_address}, {item.center_pincode}</Typography>
                            </Grid>

                            <Grid item md={6} className={classes.detailcontain1}>
                                <Typography component="p" variant='body2' className={classes.details}>{t("scheduleAppointment.scheduledOn")}
                                </Typography>
                                <Box className={classes.centerAddress}>
                                    <EventNoteIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className={classes.fontTitle} style={{ fontWeight: 400 }}>
                                        {item.book_date}
                                    </Typography>
                                </Box>
                                <Box className={classes.centerAddress}>
                                    <AccessTimeIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className={classes.fontTitle}>{item.start_time} - {item.end_time}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                ))}


                {/*
                <Grid container variant="div" className={classes.detailsContainer}>
                    <Grid item md={6}>
                        <Box className={classes.iconHeader}>
                            <EventNoteIcon className={classes.noteIcon} />
                            <Typography component='span' className={classes.fontstyle}> <span className={classes.textIcon}>id :</span> 112233445566</Typography>
                        </Box>

                    </Grid>
                    <Grid item md={6}>
                        <Box className={classes.iconHeader1}>
                            <ErrorIcon className={classes.notArrivedIcon} />
                            <Typography component="span" className={classes.notArrivedIcon}> Not Arrived</Typography>
                        </Box>

                    </Grid>
                    <Grid container variant="div">
                        <Grid item lg={12} style={{ borderBottom: "1px solid #eee" }}></Grid>
                    </Grid>
                    <Grid item md={6} className={classes.detailcontain}>

                        <Typography component="p" variant='body2' className={classes.details}>Appointment Center :</Typography>
                        <Box className={classes.centerAddress}>
                            <DomainIcon className={classes.noteIcon} />
                            <Typography component="span" variant='h6' color="primary" className={classes.fontTitle}>
                                Nerul Post Office</Typography>
                        </Box>
                        <Typography component="p" variant='body2' className={classes.details}>UHP Karave Seawoods West Karave Village Karave Nagar Seawoods Navi Mumbai Maharashtra India, Thane, 400706</Typography>

                    </Grid>

                    <Grid item md={6} className={classes.detailcontain1}>
                        <Typography component="p" variant='body2' className={classes.details}>Scheduled On :
                        </Typography>
                        <Box className={classes.centerAddress}>
                            <EventNoteIcon className={classes.noteIcon} />
                            <Typography component="span" variant='body2' color="primary" className={classes.fontTitle}>
                                Thu, 7th April 2022</Typography>

                        </Box>
                        <Box className={classes.centerAddress}>
                            <AccessTimeIcon className={classes.noteIcon} />
                            <Typography component="span" variant='body2' color="primary" className={classes.fontTitle}> 08:30 AM - 09:00 AM</Typography>
                        </Box>

                    </Grid>
                </Grid> */}

                {appointmentsRecords?.scheduledAppointments?.length == 1 &&
                    <Dialog className={classes.dialogBox} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant='h6' className={classes.fontBoldStyle}>{t("rescheduleAppointment.AppointmentModel.rescheduleModel.title")}</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant='body1' className={classes.fontBoldStyle}>
                                    {t("rescheduleAppointment.AppointmentModel.rescheduleModel.descriptionContent")}
                                </Typography>
                                <Box className={classes.centerAddress} style={{ justifyContent: 'center', paddingTop: 20 }}>
                                    <EventNoteIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle}>
                                        {appointmentsRecords?.scheduledAppointments[0]?.book_date}
                                    </Typography>
                                </Box>
                                <Box className={classes.centerAddress} style={{ justifyContent: 'center' }}>
                                    <AccessTimeIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle}>{appointmentsRecords.scheduledAppointments[0].start_time} - {appointmentsRecords.scheduledAppointments[0].end_time}</Typography>
                                </Box>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className={classes.dialogBoxButton}>
                            <Button autoFocus variant="contained" color="primary" onClick={() => { history.push("/book-appointment") }}>
                                {t("rescheduleAppointment.AppointmentModel.yesBtn")}
                            </Button>
                            <Button onClick={handleClose} variant="outlined" color="primary" autoFocus>
                                {t("rescheduleAppointment.AppointmentModel.noBtn")}
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

                <Dialog className={classes.dialogBox} open={openCancel} onClose={cancelClose} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        <Typography variant='h6' className={classes.dialogTitle}>{t("rescheduleAppointment.AppointmentModel.cancelModel.title")}</Typography>
                    </DialogTitle>
                    <DialogContent>
                        {appointmentsRecords?.scheduledAppointments?.length == 1  && 
                        <DialogContentText>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>{t("rescheduleAppointment.AppointmentModel.cancelModel.descriptionContent")}</Typography>
                            <Box className={classes.centerAddress} style={{ justifyContent: 'center', paddingTop: 20 }}>
                                <EventNoteIcon className={classes.noteIcon} />
                                <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle}>
                                    {appointmentsRecords?.scheduledAppointments[0]?.book_date}
                                </Typography>
                            </Box>
                            <Box className={classes.centerAddress} style={{ justifyContent: 'center' }}>
                                <AccessTimeIcon className={classes.noteIcon} />
                                <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle}>{appointmentsRecords?.scheduledAppointments[0]?.start_time} - {appointmentsRecords?.scheduledAppointments[0]?.end_time}</Typography>
                            </Box>
                        </DialogContentText>
                        }
                    </DialogContent>
                    <DialogActions className={classes.dialogBoxButton}>
                        <Button autoFocus variant="contained" color="primary" onClick={() => cancelledAppointment(appointmentsRecords?.scheduledAppointments[0])}>
                            {t("rescheduleAppointment.AppointmentModel.yesBtn")}
                        </Button>
                        <Button onClick={cancelClose} variant="outlined" color="primary" autoFocus>
                            {t("rescheduleAppointment.AppointmentModel.noBtn")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}
export default Reschedule;