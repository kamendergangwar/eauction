import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import SendIcon from '@material-ui/icons/Send';
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import { Schedule } from "@material-ui/icons";
import { IconButton, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Divider, FormLabel, InputLabel, MenuItem, Select, Chip, FormControl, FormControlLabel, Checkbox, FormHelperText, CircularProgress } from "@material-ui/core";
import Loading from "../../../../../atoms/Loading/Loading";
import { UploadDocsTitleIcon, VerifiedDocIconGreen, WhiteArrowIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { Alert } from "@material-ui/lab";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ApiEndPoint, ImageSizes, SupportedFormats } from "../../../../../../utils/Common";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SnackBox from "../../../../../atoms/Snackbar/Snackbar";
import { applicantSelector, getApplicant } from "../../../../../../redux/features/applicant/ApplicantSlice";
import LocalFormControl from "../../../../../molecules/FormControl/FormControl";
import { UtilsSelector, clearGenericOtpState, sendGenericOtp } from "../../../../../../redux/features/UttilSlice/genericOtpSlice";
import { EditCoApplicantStyle } from "../EditCoApplicantStyle.style";
import { GenericDocSliceSelector, clearGenericGetDocState, genericGetDocuments } from "../../../../../../redux/features/UttilSlice/genericDocumentSlice";
import DocumentUploadBox from "../../../../../atoms/DocumentUploadBox/DocumentUploadBox";
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from "../../../../../../redux/features/file/FileUploadSlice";
import GenericDocDialogBox from "../../../../../molecules/DialogBoxes/UploadDocumentDialogBox/GenericDocDialogBox/GenericDocDialogBox";
import { AddCoApplicantHistory, ApplicantReqHistory, GenericUpdateReqSliceSelector, cancelAddCoApplicantReq, clearCoApplicantReqState, clearDltAddCoAppReqState, clearGenericUpdateReqState, clearTempAddCoAppReqState, genericUpdateReq, getTempAddCoAppReq } from "../../../../../../redux/features/UttilSlice/genericUpdateReqSlice";
import { GenericTransactionSelector, clearGenericPaySummaryState, genericCreateTrans, genericPaymentSummary, genericSbiReq } from "../../../../../../redux/features/UttilSlice/genericTransactionSlice";
import AlertBox from "../../../../../atoms/AlertBox/AlertBox";
import { clearVerifyAadhaarState } from "../../../../../../redux/features/verify/VerifyAadhaarSlice";

function EditCoapplicantStage3(props) {
    const { setEditCoApplicantStage, setShowForm, reasonValue, step1Status, step2Status, martialStatus, onGoingReqData } = props;
    const [formValues, setFormValues] = React.useState(null);
    const classes = EditCoApplicantStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [changeData, setChangeData] = useState();
    const [confirmAdd, setConfirmAdd] = useState(false)
    const [applicantMobile, setApplicantMobile] = useState(JSON.parse(localStorage.getItem("mobileNo")));
    const formikOtpRef = React.useRef();
    const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
    const [isResenOtpText, setResenOtpText] = React.useState(false);
    const [countOtp, setCountOtp] = React.useState(90);
    const [showToasterMsg, setShowToasterMsg] = React.useState(false);
    const [isAllDocsUploaded, setIsAllDocsUploaded] = useState(false)
    const [allDocumentList, setAllDocumentList] = useState([]);
    const [downloadLoading, setdownloadLoading] = React.useState(false);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = useState(false);
    const { applicantData } = useSelector(applicantSelector);
    const [uploadDialog, setUploadDialog] = useState(false);
    const [confirmCancel, setConfirmCancel] = useState(false);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
    const { isFetchingSendOtp, isSuccessSendOtp, isErrorSendOtp, sendOtpData, errorMessageSendOtp } = useSelector(UtilsSelector);
    const { isFetchingGenericUpdateReq, isSuccessGenericUpdateReq, isErrorGenericUpdateReq, genericUpdateReqData, errorMessageGenericUpdateReq } = useSelector(GenericUpdateReqSliceSelector);
    const [flag, setFlag] = useState(false);
    const [isConfirmCheckbox, setIsConfirmCheckbox] = useState(false);
    const { isFetchingGetReqHistory, isSuccessGetReqHistory, isErrorGetReqHistory, getReqHistoryData, errorMessageGetReqHistory, requestType, allReqData } = useSelector(GenericUpdateReqSliceSelector)
    const [isError, setIsError] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [paymentGateway, setPaymentGateway] = useState({});
    const [inProcessTrans, setInProcessTrans] = useState(false);
    const { isFetchingGenericPaySummary,
        isSuccessGenericPaySummary,
        isErrorGenericPaySummary,
        genericPaySummaryData,
        errorMessageGenericPaySummary,

        isFetchingGenericCreateTrans,
        isSuccessGenericCreateTrans,
        isErrorGenericCreateTrans,
        genericCreateTransData,
        errorMessageGenericCreateTrans,

        isFetchingGenericSbiReq,
        isSuccessGenericSbiReq,
        isErrorGenericSbiReq,
        genericSbiReqData,
        errorMessageGenericSbiReq
    } = useSelector(GenericTransactionSelector);

    const { isFetchingDltAddCoAppReq, isSuccessDltAddCoAppReq, isErrorDltAddCoAppReq, dltAddCoAppReqData, errorMessageDltAddCoAppReq } = useSelector(GenericUpdateReqSliceSelector)

    const updateConfirmCheckbox = (event) => {
        setIsConfirmCheckbox(event.target.checked);
        setIsError(false);
    };

    useEffect(() => {
        if (isSuccessGenericGetDoc && genericGetDocData) {
            setAllDocumentList(genericGetDocData.AddCoApplicant);
        }
    }, [genericGetDocData, isSuccessGenericGetDoc])

    const handleCloseDocBox = () => {
        dispatch(clearImageUrl());
        setTimeout(() => {
            dispatch(clearFileState());
        }, 500);
        dispatch(clearDocumentImageUrl());
        dispatch(clearOtherFile());
        setDocumentDialogBoxOpen(false);
    };

    const afterSubmitCloseHandler = (uplDocId) => {
        // dispatch(getApplicant());
        const requestData = {
            ApplicantId: localStorage.getItem("applicantId"),
            ReqType: 'AddCoApplicant',
            Lang: localStorage.getItem("i18nextLng"),
            RequestId: onGoingReqData ? onGoingReqData.RequestId : null
        };
        dispatch(genericGetDocuments(requestData))
        dispatch(clearImageUrl());
        dispatch(clearDocumentImageUrl());
        dispatch(clearOtherFile());
        setTimeout(() => {
            dispatch(clearFileState());
        }, 500);
        setDocumentDialogBoxOpen(false);
    };

    const handleClose = () => {
        setShowToasterMsg(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const otpCounter = () => {
    //     dispatch(clearGenericOtpState())
    //     let timeleft = 90;
    //     var downloadTimer = setInterval(function () {
    //         if (timeleft <= 0) {
    //             clearInterval(downloadTimer);
    //         }
    //         setCountOtp(timeleft);
    //         timeleft -= 1;
    //     }, 1000);
    // };

    // const validateOTP = (value) => {
    //     let error;
    //     if (!value) {
    //         error = t("projectCard.otpReqText");
    //     } else if (!/^[0-9]{6}$/i.test(value)) {
    //         error = t("projectCard.otpReqText");
    //     }
    //     return error;
    // };

    // useEffect(() => {
    //     if (isSuccessSendOtp) {
    //         setTimeout(() => setResenOtpText(true), 90000);
    //         setIsGeneratedOtp(true);
    //         otpCounter();
    //         dispatch(clearGenericOtpState())
    //     }
    // }, [dispatch, t, isSuccessSendOtp, otpCounter])

    // const makePayemnt = () => {
    //     dispatch(sendGenericOtp("addCoApplicant"));
    // };

    // const resendOtp = () => {
    //     dispatch(sendGenericOtp("addCoApplicant"));
    //     setResenOtpText(false);
    //     setTimeout(() => setResenOtpText(true), 90000);
    // };

    const numberWithCommas = (amount_val) => {
        return isNaN(amount_val)
            ? "0"
            : amount_val.toString().split(".")[0].length > 3
                ? amount_val
                    .toString()
                    .substring(0, amount_val.toString().split(".")[0].length - 3)
                    .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
                "," +
                amount_val
                    .toString()
                    .substring(amount_val.toString().split(".")[0].length - 3)
                : amount_val.toString();
    };

    useEffect(() => {
        if (allDocumentList.length > 0) {
            const isAllUploaded = allDocumentList.every(
                (element) => element.IsUploaded == 1 || element.IsRequired == 0
            );
            setIsAllDocsUploaded(isAllUploaded);
        }
    }, [confirmAdd, allDocumentList]);

    const SubmitRequest = () => {
        if (!isConfirmCheckbox) {
            setIsError(true);
            return;
        }
        if (!isAllDocsUploaded || !step1Status || !step2Status) {
            setUploadDialog(true);
            return;
        }
        dispatch(genericPaymentSummary("addCoApplicant"));
    };


    useEffect(() => {
        if (isSuccessGenericPaySummary && genericPaySummaryData) {
            setPaymentData(genericPaySummaryData);
            setConfirmAdd(true);
        }
    }, [isSuccessGenericPaySummary, genericPaySummaryData]);

    const makePayment = () => {
        if (isSuccessGenericPaySummary && genericPaySummaryData && martialStatus && onGoingReqData) {
            let requestData = {
                "ApplicantId": localStorage.getItem('applicantId'),
                "Amount": genericPaySummaryData.TransactionTotal,
                "TransFor": "Payment-SBI",
                "TransMode": "online",
                "MarritalStatus": martialStatus,
                "RequestType": "addCoApplicant",
                "Platform": "web",
                "RequestId": onGoingReqData ? onGoingReqData.RequestId : null
            }
            dispatch(genericCreateTrans(requestData));
        }
    };

    useEffect(() => {
        if (isSuccessGenericCreateTrans && genericCreateTransData) {
            const sendData = {
                "ApplicantId": localStorage.getItem('applicantId'),
                "TransId": genericCreateTransData.TransId,
                "origin": "mobile"
            };
            dispatch(genericSbiReq(sendData));
        }
    }, [genericCreateTransData, isSuccessGenericCreateTrans])

    useEffect(() => {
        if (isSuccessGenericSbiReq && genericSbiReqData) {
            setPaymentGateway(genericSbiReqData);
            setInProcessTrans(true);
            setTimeout(() => {
                document.forms["redirect"].submit();
            }, [1000]);
        }
    }, [genericSbiReqData, isSuccessGenericSbiReq]);

    const CancelRequest = () => {
        if (onGoingReqData) {
            setDeleteFlag(true)
            dispatch(cancelAddCoApplicantReq(onGoingReqData.RequestId))
        } else {
            dispatch(clearVerifyAadhaarState());
            setShowForm(false);
            setEditCoApplicantStage(1);
        }
    }

    useEffect(() => {
        if (isSuccessDltAddCoAppReq && deleteFlag) {
            dispatch(clearVerifyAadhaarState());
            dispatch(clearTempAddCoAppReqState());
            dispatch(clearCoApplicantReqState());
            dispatch(AddCoApplicantHistory());
            dispatch(getTempAddCoAppReq());
            setShowForm(false);
            setEditCoApplicantStage(1);
        }
    }, [isSuccessDltAddCoAppReq, deleteFlag])


    // const onOtpSubmit = (values, { setSubmitting }) => {
    //     setSubmitting(false)
    //     if (values.oneTimePassword) {
    //         // setConfirmAdd(false);
    //         createRequest(values.oneTimePassword);
    //     }
    // };

    // const createRequest = (otp) => {
    //     if (changeData && otp) {
    //         let finalData = {
    //             ApplicantId: localStorage.getItem("applicantId"),
    //             Lang: localStorage.getItem("i18nextLng"),
    //             UpdateReq: 'addCoApplicant',
    //             type: "addCoApplicant",
    //             otp: otp.toString(),
    //             acceptTerms: isConfirmCheckbox,
    //             MarritalStatus: martialStatus
    //         };
    //         dispatch(genericUpdateReq(finalData));
    //     }
    // };

    // useEffect(() => {
    //     if (isSuccessGenericUpdateReq && genericUpdateReqData) {
    //         dispatch(clearGenericGetDocState());
    //         dispatch(ApplicantReqHistory());
    //         setFlag(true)

    //     }
    // }, [isSuccessGenericUpdateReq, genericUpdateReqData]);

    // useEffect(() => {
    //     if (isSuccessGetReqHistory && getReqHistoryData && flag) {
    //         setConfirmAdd(false);
    //         setShowForm(false);
    //         setEditCoApplicantStage(1);
    //     }
    // }, [isSuccessGetReqHistory, getReqHistoryData, flag])
    return (
        <Box>
            {(downloadLoading || isFetchingGenericGetDoc || isFetchingGetReqHistory || isFetchingGenericPaySummary) && <Loading isOpen={(downloadLoading || isFetchingGenericGetDoc || isFetchingGetReqHistory || isFetchingGenericPaySummary)} />}
            {genericGetDocData.AddCoApplicant && <div className={classes.formSection}>
                <Paper elevation={1} square className={`${classes.projectSection} ${isAllDocsUploaded ? "done" : ""}`}>
                    <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', }}><UploadDocsTitleIcon fontSize="large" style={{ marginRight: 8 }} /> Upload Documents</Typography>
                    {/* {isAllDocsUploaded ?
                        <Chip color="primary" icon={<VerifiedDocIconGreen />} className={classes.successChip} label="Completed" variant={'outlined'} /> :
                        <Chip color={'secondary'} icon={<Schedule />} className={classes.pendingChip} label="Pending" variant={'outlined'} />
                    } */}
                </Paper>
                <Box display='flex' marginX={4} padding={2} xs={12} flexDirection='column' className={classes.applicationBox} justifyContent="space-between">
                    {genericGetDocData.AddCoApplicant && <DocumentUploadBox documentCardList={genericGetDocData.AddCoApplicant} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} type={"AddCoApplicant"} disabled={onGoingReqData == null} inVerication={false} />}
                </Box>
            </div>}
            <Box px={1.5}>
                <FormControl component="fieldset" error={!isConfirmCheckbox}>
                    <FormControlLabel
                        name="isPuccaHouse"
                        checked={isConfirmCheckbox}
                        onChange={updateConfirmCheckbox}
                        control={<Checkbox color="primary" />}
                        label='I have read all the instructions, and I agree to all the terms and conditions.'
                        labelPlacement="end"
                    />
                    <FormHelperText>{isError ? 'Please agree to the terms and conditions.' : ''}</FormHelperText>
                </FormControl>
            </Box>
            {isErrorGenericPaySummary && <AlertBox style={{ margin: 8 }} severity="error">{errorMessageGenericPaySummary}</AlertBox>}
            <Box display='flex' justifyContent='center' paddingBottom={1.5}>
                <Button
                    onClick={() => setConfirmCancel(true)}
                    color="primary"
                    size="large"
                    style={{ marginRight: 12 }}
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={SubmitRequest}
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={
                        <WhiteArrowIcon style={{ fill: "transparent" }} />
                    }
                >
                    {t("Submit Request")}
                </Button>
            </Box>
            <form method="post" name="redirect" action={paymentGateway.sbi_form_url}>
                <input
                    type="hidden"
                    name="EncryptTrans"
                    value={paymentGateway.sbi_EncryptTrans}
                />
                <input
                    type="hidden"
                    name="merchIdVal"
                    value={paymentGateway.sbi_merchant_id}
                />
            </form>
            {/* <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={confirmAdd} fullWidth={true} className={classes.modelBoxConfirm} >
                {(isFetchingSendOtp || isFetchingGenericUpdateReq) && <Loading isOpen={(isFetchingSendOtp || isFetchingGenericUpdateReq)} />}
                <SnackBox open={(isErrorSendOtp || isErrorGenericUpdateReq)} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {(errorMessageSendOtp || errorMessageGenericUpdateReq)}
                    </Alert>
                </SnackBox>
                <DialogTitle>Confirm co-applicant request</DialogTitle>
                <DialogContent dividers>
                    <Grid container direction="column" alignItems="baseline" style={{ paddingBottom: "16px" }}>
                        <Typography style={{ fontSize: "1.2rem" }}>Confirm add co-applicant request through OTP</Typography>
                    </Grid>
                    <Grid Container style={{ display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
                        {!isGeneratedOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "65%", fontWeight: "600", marginRight: "130px", visibility: "hidden" }}>{t("projectCard.getOtpButtonText")}</Typography>
                            <DialogActions>
                                <Button autoFocus variant="contained" color="primary" onClick={makePayemnt}>
                                    Get OTP
                                </Button>
                                <Button
                                    onClick={() => {
                                        setConfirmAdd(false);
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
                                                    setConfirmAdd(false);
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
            </Dialog> */}
            <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={confirmAdd} fullWidth={true} className={classes.modelBoxConfirm} >
                {(isFetchingGenericCreateTrans || isFetchingGenericSbiReq) && <Loading isOpen={(isFetchingGenericCreateTrans || isFetchingGenericSbiReq)} />}
                <SnackBox open={(isErrorGenericCreateTrans || isErrorGenericSbiReq)} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {(errorMessageGenericCreateTrans || errorMessageGenericSbiReq)}
                    </Alert>
                </SnackBox>
                <DialogTitle>Make payment for Co-Applicant Addition</DialogTitle>
                <DialogContent dividers>
                    <Box className={classes.paymentSummSec}>
                        <Grid
                            container
                            justify="space-between"
                            className={classes.amountListBox}
                        >
                            <Grid item xs="auto">
                                <Typography className={classes.amountLabel}>Amount</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography className={classes.amountBox}>₹ {paymentData && numberWithCommas(paymentData.TransactionAmount)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justify="space-between"
                            className={classes.amountListBox}
                        >
                            <Grid item xs="auto">
                                <Typography className={classes.amountLabel}>GST (@ {paymentData && paymentData.TransactionGstPercentage}%)</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography className={classes.amountBox}>₹ {paymentData && numberWithCommas(paymentData.TransactionGstAmount)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justify="space-between"
                            className={classes.amountListBox}
                        >
                            <Grid item xs="auto">
                                <Typography className={`${classes.amountLabel} grtl`}>Grand Total</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography className={`${classes.amountBox} grtl`}>₹ {paymentData && numberWithCommas(paymentData.TransactionTotal)}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setConfirmAdd(false); dispatch(clearGenericPaySummaryState()); }} color="primary" disabled={inProcessTrans}>Cancel</Button>
                    <Button onClick={makePayment} endIcon={inProcessTrans ? "" : <SendIcon />} color="primary" variant="contained" disabled={inProcessTrans}>
                        {inProcessTrans && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                        {!inProcessTrans && <>Make Payment</>}
                        {inProcessTrans && <>redirecting...</>}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmCancel}  >
                <DialogTitle>Are you sure you want cancel this request ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmCancel(false)} size="small" color="primary" disabled={isFetchingDltAddCoAppReq}>Cancel</Button>
                    <Button onClick={CancelRequest} size="small" color="primary" variant="contained" disabled={isFetchingDltAddCoAppReq}>
                        {isFetchingDltAddCoAppReq && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                        {!isFetchingDltAddCoAppReq && <>Confirm</>}
                        {isFetchingDltAddCoAppReq && <>processing...</>}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                onClose={handleClose}
                className={classes.dialogBox}
                open={documentDialogBoxOpen}
                disableBackdropClick
                fullWidth={true}
                maxWidth="md"
            >
                {selectedDialog && <GenericDocDialogBox
                    RequestId={onGoingReqData.RequestId}
                    reqType='AddCoApplicant'
                    handleClose={handleCloseDocBox}
                    afterSubmitCloseHandler={afterSubmitCloseHandler}
                    docData={genericGetDocData.AddCoApplicant.filter((doc) => doc.DocumentId == selectedDialog.docId)[0]}
                />}
            </Dialog>
            <Dialog
                open={uploadDialog}
                onClose={() => {
                    setUploadDialog(false);
                }}
                aria-labelledby="pmay-dialog"
            >
                <DialogTitle id="pmay-dialog">
                    Please complete all step and upload all the document before submitting.
                </DialogTitle>
                <DialogActions>
                    <Button
                        autoFocuss
                        color="primary"
                        onClick={() => {
                            setUploadDialog(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default EditCoapplicantStage3;