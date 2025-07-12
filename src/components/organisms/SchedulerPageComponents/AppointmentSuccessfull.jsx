import { Typography, Grid, Button, AppBar, Box, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation, Trans } from "react-i18next";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DomainIcon from '@material-ui/icons/Domain';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { AppointmentSucessfulStyle } from './AppointmentSucessful.style';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useHistory } from "react-router-dom";
import Loading from "../../atoms/Loading/Loading";
import moment from "moment";
import { ApiEndPoint } from '../../../utils/Common';
import {
    getPreferencesList,
    clearPreferencesState,
    preferencesSelector
} from "../../../redux/features/preferences/PreferencesSlice";
import { useSelector, useDispatch } from "react-redux";
const AppointmentSucsessfull = () => {
    const classes = AppointmentSucessfulStyle();
    const history = useHistory();
    const { t } = useTranslation("Appointment");
    const dispatch = useDispatch();
    const selectedAppointment = JSON.parse(localStorage.getItem("SelectedSlot"));
    const AppointmentTime = JSON.parse(localStorage.getItem("AppointmentTime"));
    const [pdfLoading, setPdfLoading] = useState(false);

    const {
        isSuccessResGetPreferences
    } = useSelector(preferencesSelector);

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
        let fileUrl = ApiEndPoint + "/appointment/API/Appointment/appointmentPdf/" + localStorage.getItem("applicantId") + "?Lang=" + localStorage.getItem("i18nextLng");
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

    const goNext = () => {
        console.log("goNext");
        history.push("/reschedule")
    }

    return (
        <>
            {pdfLoading && (
                <Loading isOpen={pdfLoading} />
            )}
            <div className={classes.AppoinetmentContainer}>
                <Grid container justify="left">
                    <Grid item md={3}>
                        {/* <Button variant="text" style={{ justifyContent: 'left' }} onClick={() => history.push("/book-slot")}><ArrowBackIcon /></Button> */}
                    </Grid>
                    <Grid item md={6} className={classes.headContainer}>
                        <Typography align='center' variant='h1'> <EventAvailableIcon className={classes.CalnFontsize} /></Typography>
                        <Typography variant='h5' align="center" className={classes.Heading}>{t("appointmentSuccessfull.title")} </Typography>
                        <Typography variant='p' align="center" display='block' className={classes.subHeading}>{t("appointmentSuccessfull.descriptionTxt")}</Typography>
                        <Button style={{marginRight: "10px"}} variant="outlined" color="default" className={classes.AppoinButton} onClick={() => goNext()}>{t("appointmentSuccessfull.myAppointmentBtn")}</Button>
                        <Button variant="contained" color="primary" className={classes.AppoinButton} onClick={() => history.push("/dashboard")}>{t("Dashboard")}</Button>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>

                <Grid container variant="div" className={classes.detailsContainer}>
                    <Grid item md={6}>
                        <Box className={classes.iconHeader}>
                            <EventNoteIcon className={classes.noteIcon} />
                            <Typography component='span' className={classes.fontstyle}> <span className={classes.textIcon}>{t("scheduleAppointment.idTxt")} :</span> {AppointmentTime.appointmentId}</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box className={classes.iconHeader1}>
                            <CheckCircleIcon className={classes.validIcon} />
                            <Typography component="span" className={classes.validIcon}>{t("scheduleAppointment.validTillTxt")} {moment(selectedAppointment?.date).format("Do MMMM")}</Typography>
                        </Box>
                    </Grid>
                    <Grid container variant="div">
                        <Grid item lg={12} style={{ borderBottom: "1px solid #eee" }}></Grid>
                    </Grid>
                    <Grid item md={6} className={classes.detailcontain}>
                        <Typography component="p" variant='subtitle1'>{t("scheduleAppointment.appointmentCenterLabel")}</Typography>
                        <Box className={classes.centerAddress}>
                            <DomainIcon className={classes.noteIcon} />
                            <Typography component="span" variant='h6' color="primary" className={classes.fontBoldStyle}>
                                {selectedAppointment?.centerDetails?.center_area}
                            </Typography>
                        </Box>
                        <Typography component="p" variant='body2' className={classes.details}>{selectedAppointment?.centerDetails?.center_address}, {selectedAppointment?.centerDetails?.center_pincode}</Typography>
                    </Grid>

                    <Grid item md={6} className={classes.detailcontain}>
                        <Typography component="p" variant='subtitle1'>{t("scheduleAppointment.scheduledOn")}
                        </Typography>
                        <Box className={classes.centerAddress}>
                            <EventNoteIcon className={classes.noteIcon} />
                            <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle} style={{ fontWeight: 400 }}>
                                {moment(selectedAppointment?.date).format("ddd, Do MMMM, YYYY")}
                            </Typography>
                        </Box>
                        <Box className={classes.centerAddress}>
                            <AccessTimeIcon className={classes.noteIcon} />
                            <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle}>{AppointmentTime.slotTime}</Typography>
                        </Box>
                    </Grid>
                    <Grid container variant="div">
                        <Grid item lg={12} style={{ borderBottom: "1px solid #eee" }}></Grid>
                    </Grid>
                    <Grid container variant="div">
                        <Grid item lg={12} style={{ padding: '0px 10px' }}>
                            <Button variant="text" color="primary" className={classes.button} size="large" startIcon={<GetAppIcon />} onClick={() => checkSession()}>
                                {t("appointmentSuccessfull.downloadReceiptBtn")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container variant="div" className={classes.instructionContainer}>
                    <Grid item md={12}>
                        <Typography component='div' variant="h5" align="center" className={classes.button}>Instruction</Typography>
                        <ul className={classes.insList}>
                            <li className={classes.li}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>

                            <li className={classes.li}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</li>

                            <li className={classes.li}>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</li>

                            <li className={classes.li}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>

                            <li className={classes.li}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</li>

                            <li className={classes.li}>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</li>

                            <li className={classes.li}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  </li>
                        </ul>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
export default AppointmentSucsessfull;