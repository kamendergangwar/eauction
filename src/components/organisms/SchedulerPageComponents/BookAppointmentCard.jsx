import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { ScheduleStyle } from "./Schedule.style";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Loading from '../../atoms/Loading/Loading';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DomainIcon from '@material-ui/icons/Domain';

import {
    makeStyles
} from "@material-ui/core/styles";
import { Route } from 'react-router-dom';
import {
    bookAppointment,
    getApplicant,
    getAppointmentData,
    cancelAppointment,
    applicantSelector,
    clearApplicantData,
} from "../../../redux/features/applicant/ApplicantSlice";
import { addEditApplicantProgress, ApplicantProgressSelector, getApplicantProgress } from '../../../redux/features/ApplicantStepper/ApplicantStepperSlice';

function BookAppointmentCard(props) {
    const { applicantData } = props;
    const classes = ScheduleStyle();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation("Appointment");
    const {
        isFetchingAppointmentData,
        isSuccessAppointmentCancel,
        AppointmentData,
    } = useSelector(applicantSelector);


    const cancelCloseOpen = () => {
        setOpenCancel(true);
    }

    const cancelClose = () => {
        setOpenCancel(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const cancelledAppointment = (item) => {
        dispatch(cancelAppointment(item.appointment_id));
    }

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

    useEffect(() => {
        if (isSuccessAppointmentCancel) {
            dispatch(getApplicant());
            setOpenCancel(false);
            // cancelApplicantProgressStepper()
            // dispatch(getApplicantProgress());
        }
    }, [isSuccessAppointmentCancel]);

    return (
        <>
            {isFetchingAppointmentData && (<Loading isOpen={isFetchingAppointmentData}></Loading>)}
            <Box className={classes.appointmentContainer}>
                <Typography variant="h5">{t("rescheduleAppointment.title")}</Typography>
                <Box className={classes.appointmentWrapper}>
                    <Box className={classes.body}>
                        <Grid container alignItems="baseline" justify="space-around">
                            <Grid item md={6} className={classes.detailcontain}>
                                <Typography component="p" variant='subtitle1'>{t("rescheduleAppointment.appointmentCenterLabel")}</Typography>
                                <Box className={classes.centerAddress}>
                                    <DomainIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='h6' color="primary" className={classes.fontBoldStyle}>
                                        {applicantData.appointment_details[0]?.center_area}
                                    </Typography>
                                </Box>
                                <Typography component="p" variant='body2' className={classes.details}>{applicantData.appointment_details[0]?.center_address}, {applicantData?.centerDetails?.center_pincode}</Typography>
                            </Grid>

                            <Grid item md={6} className={classes.detailcontain}>
                                <Typography component="p" variant='subtitle1'>{t("rescheduleAppointment.scheduledOnLabel")}
                                </Typography>
                                <Box className={classes.centerAddress}>
                                    <EventNoteIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle} style={{ fontWeight: 400 }}>
                                        {moment(applicantData.appointment_details[0]?.book_date).format("ddd, Do MMMM, YYYY")}
                                    </Typography>
                                </Box>
                                <Box className={classes.centerAddress}>
                                    <AccessTimeIcon className={classes.noteIcon} />
                                    <Typography component="span" variant='body2' color="primary" className="timeTxt">{applicantData.appointment_details[0]?.start_time} - {applicantData.appointment_details[0]?.end_time}</Typography>
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>
                    <Divider variant="middle" />
                    <Box className={classes.footer}>
                        <Grid container alignItems="center" justify="flex-end">
                            <Grid item md="auto">
                                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                    {t("rescheduleAppointment.scheduleBtn")}
                                </Button>
                                <Button variant="outlined" color="default" className={classes.scheduledBtn} onClick={cancelCloseOpen}>
                                    {t("rescheduleAppointment.cancelBtn")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Dialog className={classes.dialogBox} open={openCancel} onClose={cancelClose} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        <Typography variant='h6' className={classes.dialogTitle}>{t("rescheduleAppointment.AppointmentModel.cancelModel.title")}</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t("rescheduleAppointment.AppointmentModel.cancelModel.descriptionContent")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.dialogBoxButton}>
                        <Button autoFocus variant="contained" color="primary" onClick={() => cancelledAppointment(applicantData.appointment_details[0])}>
                            {t("rescheduleAppointment.AppointmentModel.yesBtn")}
                        </Button>
                        <Button onClick={cancelClose} variant="outlined" color="primary" autoFocus>
                            {t("rescheduleAppointment.AppointmentModel.noBtn")}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog className={classes.dialogBox} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        <Typography variant='h6' className={classes.dialogTitle}>{t("rescheduleAppointment.AppointmentModel.rescheduleModel.title")}</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>
                                {t("rescheduleAppointment.AppointmentModel.rescheduleModel.descriptionContent")}
                            </Typography>
                            <Box className={classes.centerAddress} style={{ justifyContent: 'center', paddingTop: 20 }}>
                                <EventNoteIcon className={classes.noteIcon} />
                                <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle}>
                                    {applicantData.appointment_details[0]?.book_date}
                                </Typography>
                            </Box>
                            <Box className={classes.centerAddress} style={{ justifyContent: 'center' }}>
                                <AccessTimeIcon className={classes.noteIcon} />
                                <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle}>{applicantData.appointment_details[0].start_time} - {applicantData.appointment_details[0].end_time}</Typography>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.dialogBoxButton}>
                        <Button autoFocus variant="contained" color="primary" onClick={() => { history.push("/book-appointment") }}>
                            {t("rescheduleAppointment.AppointmentModel.yesBtn")}
                        </Button>
                        <Button onClick={handleClose} variant="outlined" color="primary" autoFocus onclick={() => { history.push("/book-appointment") }}>
                            {t("rescheduleAppointment.AppointmentModel.noBtn")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}

export default BookAppointmentCard;