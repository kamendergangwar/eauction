import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import { IconButton, Button, FormControlLabel, FormControl, FormHelperText, Radio, RadioGroup, Container, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Divider, FormLabel } from "@material-ui/core";
import Loading from "../../../../../atoms/Loading/Loading";
import { CancelBookingIllus, DownloadIcon, FloorStepIcon, MonitorNOCIcon, RoomTypeIcon, RupeePriceIcon, ScaleIcon, UnitTypeIcon, WhiteArrowIcon, WingIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { CancelBookingStyle } from "../CancelBookingStyle.style";
import { Alert } from "@material-ui/lab";
import UploadedKyc from "../../../../../../assets/UploadedKyc.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ApiEndPoint, ImageSizes, SupportedFormats } from "../../../../../../utils/Common";
import { clearFileState, clearImageUrl, fileDataUpload, fileUploadSelector } from "../../../../../../redux/features/file/FileUploadSlice";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import NocUploadLoading from "../../../../../atoms/Loading/NocUploadLoading";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SnackBox from "../../../../../atoms/Snackbar/Snackbar";
import { applicantSelector } from "../../../../../../redux/features/applicant/ApplicantSlice";
import LocalFormControl from "../../../../../molecules/FormControl/FormControl";
import { UtilsSelector, clearGenericOtpState, sendGenericOtp } from "../../../../../../redux/features/UttilSlice/genericOtpSlice";
import { CancelBookingSelector, GetCancelStatus, cancelRequest, clearCancelStatusState } from "../../../../../../redux/features/cancelBookingSlice/cancelBookingSlice";

const reasons = [
    "Excessive Debt Burden",
    "Job Loss or Unemployment",
    "Unforeseen Circumstances",
    "Poor Financial Planning",
    "Others",
]

const reasonsList = [
    {
        value: 1,
        label: "Excessive Debt Burden"
    },
    {
        value: 2,
        label: "Job Loss or Unemployment"
    },
    {
        value: 3,
        label: "Unforeseen Circumstances"
    },
    {
        value: 4,
        label: "Poor Financial Planning",
    },
    {
        value: 5,
        label: "Other"
    },
];


function CancelBookingStage2(props) {
    const { setCancelStage, setCancelStatusData } = props;
    const [formValues, setFormValues] = React.useState(null);
    const [isImage, setIsImage] = React.useState(false);
    const classes = CancelBookingStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const [isConfirmCheckbox, setIsConfirmCheckbox] = useState(false);
    const dispatch = useDispatch();
    const [reasonValue, setReasonValue] = React.useState('');
    const [docFileData, setDocFileData] = React.useState({});
    const [dragBoxClass, setDragBoxClass] = React.useState("");
    const [cancelDragBoxClass, setCancelDragBoxClass] = useState('');
    const [isCancelLetterUploaded, setCancelLetterUploaded] = React.useState(false);
    const [isUploadingCancelLetter, setUploadingCancelLetter] = React.useState(false)
    const [cancelLetterFile, setCancelLetterFile] = React.useState("")
    const [isNOCLetterUploaded, setNOCLetterUploaded] = React.useState(false);
    const [isUploadingNOCLetter, setUploadingNOCLetter] = React.useState(false)
    const [NOCLetterFile, setNOCLetterFile] = React.useState("")
    const [fileUploading, setFileUploading] = React.useState(null);
    const [cancelData, setCancelData] = useState();
    const [confirmCancel, setConfirmCancel] = useState(false)
    const [applicantMobile, setApplicantMobile] = useState(JSON.parse(localStorage.getItem("mobileNo")));
    const formikRef = React.useRef();
    const formikOtpRef = React.useRef();
    const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
    const [isResenOtpText, setResenOtpText] = React.useState(false);
    const [countOtp, setCountOtp] = React.useState(90);
    const [showToasterMsg, setShowToasterMsg] = React.useState(false);
    const [downloadLoading, setdownloadLoading] = React.useState(false);
    const { applicantData } = useSelector(applicantSelector);
    const { isFetchingCancelStatus, isSuccessCancelStatus, isErrorCancelStatus, cancelStatus, errorMessageCancelStatus } = useSelector(CancelBookingSelector)
    const { isFileFetching, isFileSuccess, documentImageUrl, imageUrl, isFileError, fileErrorMessage } = useSelector(fileUploadSelector);
    const { isFetchingSendOtp, isSuccessSendOtp, isErrorSendOtp, sendOtpData, errorMessageSendOtp } = useSelector(UtilsSelector);
    const { isFetchingCancelBooking, isSuccessCancelBooking, isErrorCancelBooking, cancelBookingData, errorMessageCancelBooking } = useSelector(CancelBookingSelector)

    const initialValues = {
        reason: "",
        sourceOfFunding: '',
        reasonOther: "",
        CancelLetter: null,
        NOCLetter: null,
        acceptTerms: false
    }

    const validationSchema = yup.object({
        sourceOfFunding: yup
            .string().test("sourceOfFunding", "Please select a source of funding", (value) => {
                return value === "self" || value === "bank";
            }),
        reason: yup
            .string().required("Please enter your cancellation reason")
            .test("reason", "Reason must not exceed 80 characters", (value) => {
                return value && value.length <= 80;
            })
            .test("reasonNoSpecialChars", "Reason must not contain special characters", (value) => {
                return !/[!@#$%^&*(),.?":{}|<>]/g.test(value);
            })
            .test("reasonMinLength", "Reason must be at least 15 characters", (value) => {
                return value && value.length >= 15;
            }),
        // reason: yup
        //     .string().required("Please Select any one option"),
        CancelLetter: yup.mixed().required("Please Upload Cancel Application Letter")
            .test("fileSize", "File is too large", (value) => value && value.size <= ImageSizes.TwoMB)
            .test("fileFormat", "Unsupported Format", (value) => value && SupportedFormats.DocsFormats.includes(value.type)),
        NOCLetter: yup
            .mixed()
            .when('sourceOfFunding', {
                is: 'bank',
                then: yup
                    .mixed()
                    .required("Please Upload NOC Letter")
                    .test("fileSize", "File is too large", (value) => value && value.size <= ImageSizes.TwoMB)
                    .test("fileFormat", "Unsupported Format", (value) => value && SupportedFormats.DocsFormats.includes(value.type)),
            }),
        acceptTerms: yup
            .boolean()
            .oneOf([true], "Please acknowledge the terms and conditions"),
    })

    React.useEffect(() => {
        if (isFileSuccess && isUploadingCancelLetter) {
            dispatch(clearFileState())
            setUploadingCancelLetter(false)
            if (isFileError) {
                setCancelLetterFile('')
            } else {
                setCancelLetterFile(documentImageUrl)
            }
            setCancelLetterUploaded(true)
        }
        if (isFileSuccess && isUploadingNOCLetter) {
            dispatch(clearFileState())
            setUploadingNOCLetter(false)
            if (isFileError) {
                setNOCLetterFile('')
            } else {
                setNOCLetterFile(documentImageUrl)
            }
            setNOCLetterUploaded(true)
        }

    }, [isFileSuccess, isUploadingCancelLetter, isUploadingNOCLetter]);

    useEffect(() => {
        if (isFileError) {
            setUploadingCancelLetter(false)
            setUploadingNOCLetter(false)
        }
    }, [isFileError])

    const onReUpload = (doc) => {
        if (doc == 'CancelLetter') {
            setCancelLetterFile("")
            setUploadingCancelLetter(false)
            formikRef.current.setFieldValue("CancelLetter", null);
            setCancelLetterUploaded(false);
        }
        if (doc == 'NOCLetter') {
            setNOCLetterFile("")
            setUploadingNOCLetter(false)
            formikRef.current.setFieldValue("NOCLetter", null);
            setNOCLetterUploaded(false);
        }
        setDocFileData({});
        dispatch(clearImageUrl());
    };

    const dragOver = (e, doc) => {
        e.preventDefault();
        if (doc === 'CancelLetter') {
            setCancelDragBoxClass("dragover")
        }
        if (doc === 'NOCLetter') {
            setDragBoxClass("dragover");
        }
    };

    const dragEnter = (e, doc) => {
        e.preventDefault();
        if (doc === 'CancelLetter') {
            setCancelDragBoxClass("dragover")
        }
        if (doc === 'NOCLetter') {
            setDragBoxClass("dragover");
        }
    };

    const dragLeave = (e, doc) => {
        e.preventDefault();
        if (doc === 'CancelLetter') {
            setCancelDragBoxClass("")
        }
        if (doc === 'NOCLetter') {
            setDragBoxClass("");
        }
    };

    const fileDrop = (e, doc) => {
        e.preventDefault();
        const files = e.dataTransfer.files[0];
        if (doc === 'CancelLetter') {
            if (files) {
                formikRef.current.setFieldValue("CancelLetter", files);
                setDocFileData(files);
                setFileUploading('CancelLetter')
            }
            setCancelDragBoxClass("")
        }
        if (doc === 'NOCLetter') {
            if (files) {
                formikRef.current.setFieldValue("NOCLetter", files);
                setDocFileData(files);
                setFileUploading('NOCLetter')
            }
            setDragBoxClass("");
        }
    };

    React.useEffect(() => {
        if (docFileData.name) {
            if (SupportedFormats.DocsFormats.includes(docFileData['type'])) {
                if (docFileData['type'].split('/')[0] == 'image') {
                    setIsImage(true);
                } else {
                    setIsImage(false);
                }
                const docObj = {
                    doc: docFileData,
                    docType: "DocumentUrl",
                    docName: fileUploading === 'cancelLetter' ? 'cancel letter' : 'NOC Letter'
                };
                if (fileUploading === 'CancelLetter') {
                    setUploadingCancelLetter(true)
                }
                if (fileUploading === 'NOCLetter') {
                    setUploadingNOCLetter(true)
                }
                dispatch(fileDataUpload(docObj));
            }
        }
    }, [docFileData]);


    const initialOtpValues = {
        mobileNumber: "",
        oneTimePassword: "",
    };

    const handleClose = () => {
        setShowToasterMsg(false);
    };
    const otpCounter = () => {
        dispatch(clearGenericOtpState())
        let timeleft = 90;
        var downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
            }
            setCountOtp(timeleft);
            timeleft -= 1;
        }, 1000);
    };

    const validateOTP = (value) => {
        let error;
        if (!value) {
            error = t("projectCard.otpReqText");
        } else if (!/^[0-9]{6}$/i.test(value)) {
            error = t("projectCard.otpReqText");
        }
        return error;
    };

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false);
        let insertData = {
            "applicant_id": localStorage.getItem('applicantId'),
            "cancel_reason": values?.reason,
            // "cancel_reason_other": values?.reason == 5 ? values.reasonOther : null,
            "cancel_reason_other": "",
            "cancel_letter_url": cancelLetterFile,
            "cancel_type": "USER",
            "accept_cancel_terms": values?.acceptTerms,
            "Lang": localStorage.getItem('i18nextLng') || null,
            "platform": "web",
            "source_of_funding": values?.sourceOfFunding,
            "noc_letter_url": values?.sourceOfFunding == 'bank' ? NOCLetterFile : null
        };
        setCancelData(insertData);
        setConfirmCancel(true);
    }

    useEffect(() => {
        if (isSuccessSendOtp) {
            setTimeout(() => setResenOtpText(true), 90000);
            setIsGeneratedOtp(true);
            otpCounter();
            dispatch(clearGenericOtpState())
        }
    }, [dispatch, t, isSuccessSendOtp, otpCounter])


    const sendOtp = () => {
        dispatch(sendGenericOtp("user_cancel_flat"));
    }

    const resendOtp = () => {
        dispatch(sendGenericOtp("user_cancel_flat"));
        setResenOtpText(false);
        setTimeout(() => setResenOtpText(true), 90000);
    };

    const onOtpSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        if (values.oneTimePassword) {
            // setConfirmCancel(false);
            cancelFlat(values.oneTimePassword);
        }
    };

    const cancelFlat = (otp) => {
        if (cancelData && otp) {
            let finalData = {
                ...cancelData,
                type: "user_cancel_flat",
                otp: otp.toString(),
            };
            dispatch(cancelRequest(finalData));
        }
    };

    useEffect(() => {
        if (isSuccessCancelBooking) {
            dispatch(clearCancelStatusState());
            dispatch(GetCancelStatus());
        }
    }, [isSuccessCancelBooking])

    useEffect(() => {
        if (isSuccessCancelStatus && cancelStatus && isSuccessCancelBooking) {
            setConfirmCancel(false);
            setCancelStatusData(cancelStatus)
            setCancelStage(1);
        }
    }, [isSuccessCancelStatus, cancelStatus, isSuccessCancelBooking])

    const downloadSample = () => {
        setdownloadLoading(true);
        fetch(`${ApiEndPoint}/DocumentDownload/17`, {       //change with actual sample url
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        }).then((response) => response.blob()).then((blob) => {
            setdownloadLoading(false);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Cancel Booking Letter.pdf';
            document.body.append(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(error => {
            setdownloadLoading(false);
            alert(error, "error");
        });
    };

    return (
        <Box>
            {(downloadLoading) && <Loading isOpen={(downloadLoading)} />}
            <Grid container alignItems="center" >
                <IconButton
                    aria-label="close"
                    onClick={() => setCancelStage(1)}
                    style={{ marginRight: 8 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h6' className={classes.cancelTittle}>
                    Flat Booking Cancelation
                    <br />
                    <Typography variant='body2'>Cancellation of your flat booking may result in a penalty.</Typography>
                </Typography>
            </Grid>
            {/* <CancelBookingIllus style={{ fontSize: "9rem", width: "100%" }} /> */}
            <Grid className={classes.projectSection}>
                <Grid item md="auto" xs={12}>
                    <Typography className={classes.cardTitle}>
                        Below is the flat detail that will be cancelled :
                    </Typography>
                </Grid>
                <Grid item md="auto" xs={12}>
                    <Typography >
                        {t("projectCard.projectText")} :{" "}
                        <strong>{applicantData.Applicant_Booking_Status[0]?.ProjectName || "--"}</strong>
                    </Typography>
                </Grid>
                <Box className={classes.catChipCont} style={{ display: "flex" }}>
                    <Box className={classes.selectedDetail}>
                        <Typography style={{ fontSize: '0.8rem' }}>
                            {t("projectCard.unitNo")}: <span>{applicantData.Applicant_Booking_Status[0]?.FlatNo || "--"} ({applicantData.Applicant_Booking_Status[0]?.flat_type || "--"})</span>
                        </Typography>
                        <Divider
                            variant="middle"
                            orientation="vertical"
                            flexItem
                        />
                        <Typography style={{ fontSize: '0.8rem' }}>
                            {t("projectCard.floorNo")}: <span>{applicantData.Applicant_Booking_Status[0]?.FloorNo || "--"}</span>
                        </Typography>
                        <Divider
                            variant="middle"
                            orientation="vertical"
                            flexItem
                        />
                        <Typography style={{ fontSize: '0.8rem' }}>
                            {t("projectCard.towerNo")}: <span>{applicantData.Applicant_Booking_Status[0]?.Wing || "--"}</span>
                        </Typography>
                        <Divider
                            variant="middle"
                            orientation="vertical"
                            flexItem
                        />
                        <Typography style={{ fontSize: '0.8rem' }}>
                            {t("projectCard.carpetAreaLabel")}: <span>{applicantData.Applicant_Booking_Status[0]?.CarpetArea || "--"}{" "}{t("projectCard.sqftText")}</span>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                innerRef={formikRef}
                enableReinitialize
            >
                {({ submitForm, setFieldValue, touched, errors, values }) => (
                    <Form noValidate autoComplete="off" className={classes.formContainer}>
                        <div className={classes.formSection}>
                            <FormControl required className={classes.radioGroup}>
                                <FormLabel id="sourceOfFunding-buttons-group-label">Have you taken out a bank loan?</FormLabel>
                                <Field as={RadioGroup} row name="sourceOfFunding" id="sourceOfFunding">
                                    <FormControlLabel value="bank" control={<Radio color="primary" />} label="Yes" />
                                    <FormControlLabel value="self" control={<Radio color="primary" />} label="No" />
                                </Field>
                                <FormHelperText error variant="filled">
                                    <ErrorMessage name="sourceOfFunding" />
                                </FormHelperText>
                            </FormControl>

                            <Container style={{ margin: 0 }} disableGutters>
                                <Box
                                    marginY={2}
                                // marginX={width === "xs" ? 1 : 10}
                                >
                                    <Grid container justifyContent='space-evenly'>
                                        <Grid container spacing={3} justifyContent="space-evenly">
                                            {/* <Grid style={{ padding: 12 }}>
                                                <Typography variant="body2" style={{ fontWeight: 600 }}>
                                                    Step: 1
                                                </Typography>
                                                <Typography variant="body2" className={classes.sampleDownTitle}>
                                                    {t("Download Cancel Application Letter to be filled")}
                                                </Typography>
                                                <Paper elevation={4} className={classes.downloadSampleFileBox}>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={1}>
                                                            <InsertDriveFileIcon color="primary" style={{ fontSize: '2.5rem' }} />
                                                        </Grid>
                                                        <Grid container xs={11} alignItems="center" direction="column">
                                                            <Typography variant="body2">Cancel Application Letter Sample</Typography>
                                                            <Button color="primary" size="small" startIcon={<DownloadIcon />} onClick={downloadSample}>Download</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid> */}
                                            {values?.sourceOfFunding == 'bank' && <Grid item>
                                                <Typography variant="body2" className={classes.sampleDownTitle}>Upload NOC Letter issued by bank.</Typography>
                                                {isUploadingNOCLetter && <Box className={classes.uploadDocLoader} style={{ minHeight: 0, paddingBottom: 0 }}><NocUploadLoading /></Box>}
                                                {(!isUploadingNOCLetter) && (
                                                    <Paper
                                                        className={`${classes.kycDragnDropBox} ${dragBoxClass}`}
                                                        onDragOver={(e) => dragOver(e, "NOCLetter")}
                                                        onDragEnter={(e) => dragEnter(e, "NOCLetter")}
                                                        onDragLeave={(e) => dragLeave(e, "NOCLetter")}
                                                        onDrop={(e) => fileDrop(e, "NOCLetter")}
                                                        style={{ backgroundColor: "transparent", padding: '10px 20px' }}
                                                        elevation={4}
                                                    >
                                                        <input
                                                            accept="image/jpeg,image/png,application/pdf,image/x-eps"
                                                            className={classes.input}
                                                            id="NOCLetter"
                                                            type="file"
                                                            name="NOCLetter"
                                                            onChange={(event) => {
                                                                if (event.currentTarget.files[0]) {
                                                                    setFieldValue(
                                                                        "NOCLetter",
                                                                        event.currentTarget.files[0]
                                                                    );
                                                                    setDocFileData(event.currentTarget.files[0]);
                                                                    setUploadingNOCLetter(true);
                                                                    setFileUploading('NOCLetter');
                                                                }
                                                            }}
                                                        />
                                                        <Grid container spacing={3}>
                                                            <Grid item md={2}>
                                                                {isNOCLetterUploaded ?
                                                                    (<Box display="flex" alignItems="center">
                                                                        <img
                                                                            style={{ width: '100%', maxHeight: '30px' }}
                                                                            src={UploadedKyc}
                                                                            alt="uploaded successfully"
                                                                        />
                                                                    </Box>)
                                                                    : (<MonitorNOCIcon style={{ width: "100%", height: "auto", maxHeight: "40px", color: 'white' }} />)}
                                                            </Grid>
                                                            <Grid item md={10} style={{ alignSelf: 'center', textAlign: "left" }}>
                                                                {isNOCLetterUploaded ?
                                                                    (<Typography className={classes.fileUploadedSuccessText} style={{ marginTop: 0 }}>{t("docUploadedSuccessMsg")}</Typography>)
                                                                    : (<React.Fragment>
                                                                        <Typography className={classes.dragAndDropTxt}>
                                                                            <Hidden smDown>
                                                                                {t("dragDropLabel")}
                                                                            </Hidden>
                                                                            <label htmlFor="NOCLetter">
                                                                                <Button
                                                                                    color="primary"
                                                                                    variant="text"
                                                                                    component="span"
                                                                                    size="small"
                                                                                    style={{ margin: 0, padding: 0, minWidth: 0 }}
                                                                                    className={classes.kycUploadBtn}
                                                                                >&nbsp; Browse</Button>
                                                                            </label>
                                                                        </Typography>
                                                                        <Typography className={classes.validateText} style={{ fontSize: '0.7rem' }}>
                                                                            {t("fileLimit0")}
                                                                            <strong> {t("fileLimit1")} </strong>
                                                                            {t("fileLimit2")}
                                                                        </Typography>
                                                                        <FormHelperText error variant="filled">
                                                                            <ErrorMessage name="NOCLetter" />
                                                                        </FormHelperText>
                                                                        {isFileError && (
                                                                            <>
                                                                                <FormHelperText error variant="filled">
                                                                                    {fileErrorMessage}
                                                                                </FormHelperText>
                                                                            </>
                                                                        )}
                                                                    </React.Fragment>)}
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                )}
                                                {(isNOCLetterUploaded && NOCLetterFile) && (
                                                    <Box>
                                                        <Typography
                                                            className={classes.kycCaption}
                                                            variant="subtitle1"
                                                        >
                                                            {t("fileUploadedTitle")}
                                                        </Typography>
                                                        <Box className={classes.fileViewArea}>
                                                            <Grid container alignItems="center">
                                                                <Grid item>
                                                                    <InsertDriveFileIcon
                                                                        color="primary"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs>
                                                                    <Typography variant="body2">
                                                                        {NOCLetterFile?.length > 20 ? `...${NOCLetterFile?.slice(-20)}` : NOCLetterFile}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button
                                                                        variant="text"
                                                                        size="small"
                                                                        color="primary"
                                                                        onClick={() => onReUpload('NOCLetter')}
                                                                    >
                                                                        {t("cancelButtonText")}
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Grid>}
                                            <Grid item>
                                                <Grid container justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body2" className={classes.sampleDownTitle}>Upload handwritten Cancel request letter.</Typography>
                                                    <Button
                                                        startIcon={<DownloadIcon />}
                                                        color="primary"
                                                        className={classes.downloadSampleBtn}
                                                        onClick={downloadSample}
                                                        size="small"
                                                    >
                                                        Sample
                                                    </Button>
                                                </Grid>
                                                {isUploadingCancelLetter && <Box className={classes.uploadDocLoader} style={{ minHeight: 0, paddingBottom: 0 }}><NocUploadLoading /></Box>}
                                                {(!isUploadingCancelLetter) && (
                                                    <Paper
                                                        className={`${classes.kycDragnDropBox} ${cancelDragBoxClass}`}
                                                        onDragOver={(e) => dragOver(e, "CancelLetter")}
                                                        onDragEnter={(e) => dragEnter(e, "CancelLetter")}
                                                        onDragLeave={(e) => dragLeave(e, "CancelLetter")}
                                                        onDrop={(e) => fileDrop(e, "CancelLetter")}
                                                        style={{ backgroundColor: "transparent", padding: '10px 20px' }}
                                                        elevation={4}
                                                    >
                                                        <input
                                                            accept="image/jpeg,image/png,application/pdf,image/x-eps"
                                                            className={classes.input}
                                                            id="CancelLetter"
                                                            type="file"
                                                            name="CancelLetter"
                                                            onChange={(event) => {
                                                                if (event.currentTarget.files[0]) {
                                                                    setFieldValue(
                                                                        "CancelLetter",
                                                                        event.currentTarget.files[0]
                                                                    );
                                                                    setDocFileData(event.currentTarget.files[0]);
                                                                    setUploadingCancelLetter(true)
                                                                    setFileUploading('CancelLetter')
                                                                }
                                                            }}
                                                        />
                                                        <Grid container spacing={3}>
                                                            <Grid item md={2}>
                                                                {isCancelLetterUploaded ?
                                                                    (<Box display="flex" alignItems="center">
                                                                        <img
                                                                            style={{ width: '100%', maxHeight: '30px' }}
                                                                            src={UploadedKyc}
                                                                            alt="uploaded successfully"
                                                                        />
                                                                    </Box>)
                                                                    : (<MonitorNOCIcon style={{ width: "100%", height: "auto", maxHeight: "40px", color: 'white' }} />)}
                                                            </Grid>
                                                            <Grid item md={10} style={{ alignSelf: 'center', textAlign: "left" }}>
                                                                {isCancelLetterUploaded ?
                                                                    (<Typography className={classes.fileUploadedSuccessText} style={{ marginTop: 0 }}>{t("docUploadedSuccessMsg")}</Typography>)
                                                                    : (<React.Fragment>
                                                                        <Typography className={classes.dragAndDropTxt}>
                                                                            <Hidden smDown>
                                                                                {t("dragDropLabel")}
                                                                            </Hidden>
                                                                            <label htmlFor="CancelLetter">
                                                                                <Button
                                                                                    color="primary"
                                                                                    variant="text"
                                                                                    component="span"
                                                                                    size="small"
                                                                                    style={{ margin: 0, padding: 0, minWidth: 0 }}
                                                                                    className={classes.kycUploadBtn}
                                                                                >&nbsp; Browse</Button>
                                                                            </label>
                                                                        </Typography>
                                                                        <Typography className={classes.validateText} style={{ fontSize: '0.7rem' }}>
                                                                            {t("fileLimit0")}
                                                                            <strong> {t("fileLimit1")} </strong>
                                                                            {t("fileLimit2")}
                                                                        </Typography>
                                                                        <FormHelperText error variant="filled">
                                                                            <ErrorMessage name="CancelLetter" />
                                                                        </FormHelperText>
                                                                        {isFileError && (
                                                                            <>
                                                                                <FormHelperText error variant="filled">
                                                                                    {fileErrorMessage}
                                                                                </FormHelperText>
                                                                            </>
                                                                        )}
                                                                    </React.Fragment>)}
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                )}
                                                {(isCancelLetterUploaded && cancelLetterFile) && (
                                                    <Box>
                                                        <Typography
                                                            className={classes.kycCaption}
                                                            variant="subtitle1"
                                                        >
                                                            {t("fileUploadedTitle")}
                                                        </Typography>
                                                        <Box className={classes.fileViewArea}>
                                                            <Grid container alignItems="center">
                                                                <Grid item>
                                                                    <InsertDriveFileIcon
                                                                        color="primary"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs>
                                                                    <Typography variant="body2">
                                                                        {cancelLetterFile?.length > 20 ? `...${cancelLetterFile?.slice(-20)}` : cancelLetterFile}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button
                                                                        variant="text"
                                                                        size="small"
                                                                        color="primary"
                                                                        onClick={() => onReUpload('CancelLetter')}
                                                                    >
                                                                        {t("cancelButtonText")}
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        </div>
                        <Box className={classes.footerSection}>
                            {/* <LocalFormControl
                                control="selectbox"
                                variant="outlined"
                                name="reason"
                                label="Select cancellation reason"
                                options={reasonsList}
                                onChange={(e) => {
                                    setFieldValue(
                                        "reason",
                                        e.target.value
                                    );
                                }}
                                required
                            /> */}
                            <LocalFormControl
                                control="input"
                                variant="outlined"
                                label="Enter your cancellation reason"
                                placeholder="Enter your cancellation reason"
                                name="reason"
                                type="text"
                                id="reason"
                                required
                            />
                            <LocalFormControl
                                control="checkbox"
                                type="checkbox"
                                name="acceptTerms"
                                id="acceptTerms"
                                label={
                                    <Typography
                                        variant="body1"
                                        className={classes.termsNdCondiCheckBoxLabel}
                                    >
                                        I agree to the <span>Terms and refund policy</span>.
                                    </Typography>
                                }
                                color="primary"
                            />
                            {/* <Alert icon={false} severity="info" style={{ padding: "0px 16px" }}>
                                By clicking submit you agree to the <span style={{ color: '#007AE7', cursor: "pointer" }}>Terms and condition</span> which include the <span style={{ color: '#007AE7', cursor: "pointer" }}>cancelation and refund policy</span>.
                            </Alert> */}
                        </Box>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={
                                    <WhiteArrowIcon style={{ fill: "transparent" }} />
                                }
                            >
                                {t("Submit")}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={confirmCancel} fullWidth={true} className={classes.modelBoxConfirm} >
                {(isFetchingSendOtp || isFetchingCancelBooking || isFetchingCancelStatus) && <Loading isOpen={(isFetchingSendOtp || isFetchingCancelBooking || isFetchingCancelStatus)} />}
                <SnackBox open={(isErrorSendOtp || isErrorCancelBooking)} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {(errorMessageSendOtp || errorMessageCancelBooking)}
                    </Alert>
                </SnackBox>
                <DialogTitle>Confirm Booking cancellation</DialogTitle>
                <DialogContent dividers>
                    <Grid container justifyContent="space-between" alignItems="baseline" style={{ paddingBottom: "16px" }}>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <UnitTypeIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                    <Box className={classes.dataValueViewBox}>
                                        <Typography className={classes.dataTitle}>
                                            {t("projectCard.unitNo")} :{" "}
                                            <span className={classes.dataValue}>
                                                {applicantData.Applicant_Booking_Status[0]?.FlatNo || "--"}
                                            </span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <RoomTypeIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                    <Box className={classes.dataValueViewBox}>
                                        <Typography className={classes.dataTitle}>
                                            {t("projectCard.unitType")}  :{" "}
                                            <span className={classes.dataValue}>
                                                {applicantData.Applicant_Booking_Status[0]?.flat_type || "--"}
                                            </span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <FloorStepIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                    <Box className={classes.dataValueViewBox}>
                                        <Typography className={classes.dataTitle}>
                                            {t("projectCard.floorNo")} :{" "}
                                            <span className={classes.dataValue}>
                                                {applicantData.Applicant_Booking_Status[0]?.FloorNo || "--"}
                                            </span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <ScaleIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                    <Box className={classes.dataValueViewBox}>
                                        <Typography className={classes.dataTitle} style={{ fontSize: '0.7rem' }}>
                                            {t("projectCard.reraArea")} :{" "}
                                            <span className={classes.dataValue}>
                                                {applicantData.Applicant_Booking_Status[0]?.CarpetArea || "--"}
                                                {t('projectCard.sqftText')}
                                            </span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" >
                                <Grid item>
                                    <WingIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                    <Box className={classes.dataValueViewBox}>
                                        <Typography className={classes.dataTitle}>
                                            {t("projectCard.towerNo")}  :{" "}
                                            <span className={classes.dataValue}>
                                                {applicantData.Applicant_Booking_Status[0]?.Wing || "--"}
                                            </span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            {/* <Grid container alignItems="center">
                                <Grid item>
                                    <RupeePriceIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                    <Box className={classes.dataValueViewBox}>
                                        <Typography className={classes.dataTitle}>
                                            {t("projectForm.formControl.priceRange.priceRangeLabel")} :{" "}
                                            <span className={classes.dataValue}>
                                                ₹ XXXX
                                            </span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid Container style={{ display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
                        {!isGeneratedOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "65%", fontWeight: "600", marginRight: "130px", visibility: "hidden" }}>{t("projectCard.getOtpButtonText")}</Typography>
                            <DialogActions>
                                <Button autoFocus variant="contained" color="primary" onClick={sendOtp}>
                                    {t("projectCard.getOtpButtonText")}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setConfirmCancel(false);
                                        dispatch(clearGenericOtpState());
                                    }}
                                    color="primary">
                                    {t("cancelButtonText")}
                                </Button>
                            </DialogActions> </>}
                        {isGeneratedOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "50%" }}>{t("projectCard.sendOtpText")}<span>{`+91 XXXXXX${applicantMobile?.toString().slice(-4)}`}</span></Typography>
                            <Formik
                                initialValues={initialOtpValues}
                                onSubmit={onOtpSubmit}
                                innerRef={formikOtpRef}
                            >
                                {({ submitForm, setFieldValue, values }) => (
                                    <Form className={classes.form} noValidate autoComplete="off">
                                        <LocalFormControl
                                            control="input"
                                            variant="outlined"
                                            label={t("projectCard.enterOtpText")}
                                            placeholder={t("projectCard.enterOtpText")}
                                            name="oneTimePassword"
                                            type="tel"
                                            id="oneTimePassword"
                                            required
                                            inputProps={{ maxLength: 6 }}
                                            validate={validateOTP}
                                        />
                                        {!isResenOtpText && (
                                            <Box textAlign="left">
                                                <Typography
                                                    variant="subtitle2"
                                                    gutterBottom
                                                    style={{ color: "#65707D" }}
                                                >
                                                    {t("projectCard.resendOtpText")} 00:{countOtp} {t("projectCard.sec")}
                                                </Typography>
                                            </Box>
                                        )}
                                        {isResenOtpText && (
                                            <Box display="flex">
                                                <Box marginLeft={1}>
                                                    <Typography variant="body2" gutterBottom>
                                                        <Link
                                                            to="#"
                                                            onClick={() => resendOtp(values.mobileNumber)}
                                                            style={{ textDecoration: "none", color: "#0038C0", fontWeight: 600 }}
                                                        >
                                                            {t("Resend")}
                                                        </Link>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                        <DialogActions>
                                            <Button autoFocus variant="contained" type="submit" color="primary">
                                                {t("projectCard.submitBtn")}
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setConfirmCancel(false);
                                                    setIsGeneratedOtp(false);
                                                    dispatch(clearGenericOtpState());
                                                }}
                                                color="primary">
                                                {t("cancelButtonText")}
                                            </Button>
                                        </DialogActions>
                                    </Form>
                                )}
                            </Formik> </>}
                    </Grid>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CancelBookingStage2;