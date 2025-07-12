import { Box, Button, Chip, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormHelperText, FormLabel, Grid, Hidden, IconButton, Paper, Snackbar, Typography, withWidth } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import { GenericDocSliceSelector, genericGetDocuments } from '../../../../../redux/features/UttilSlice/genericDocumentSlice';
import { useState } from 'react';
import { LoanApplicationStyle } from '../LoanApplication.style';
import Loading from '../../../../atoms/Loading/Loading';
import DocumentUploadBox from '../../../../atoms/DocumentUploadBox/DocumentUploadBox';
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from '../../../../../redux/features/file/FileUploadSlice';
import GenericDocDialogBox from '../../../../molecules/DialogBoxes/UploadDocumentDialogBox/GenericDocDialogBox/GenericDocDialogBox';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import { Schedule } from '@material-ui/icons';
import { GenericTransactionSelector, clearGenericCreateTransState, clearGenericPaySummaryState, clearGenericSbiReqState, genericCreateTrans, genericPaymentSummary, genericSbiReq } from '../../../../../redux/features/UttilSlice/genericTransactionSlice';
import AlertBox from '../../../../atoms/AlertBox/AlertBox';
import CancelDocDialogBox from '../../../../molecules/DialogBoxes/UploadDocumentDialogBox/CancelDocDialogBox/CancelDocDialogBox';
import CancelDocumentBox from '../../../../atoms/DocumentUploadBox/CancelDocumentBox';
import LaunchIcon from '@material-ui/icons/Launch';
import { getNocTransactionHistory } from '../../../../../redux/features/noc/NocSlice';
import SnackBox from '../../../../atoms/Snackbar/Snackbar';

const NocInProgress = (props) => {
    const { setNocStage, NocProgressData } = props;
    const { t } = useTranslation("DocumentsPageTrans");
    const classes = LoanApplicationStyle();
    const [allDocVerified, setAllDocVerified] = useState(false);
    const [paymentGateway, setPaymentGateway] = React.useState({});
    const [inProcessTrans, setInProcessTrans] = React.useState(false)
    const [allDocumentList, setAllDocumentList] = useState([]);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = useState(false);
    const [isAllDocsUploaded, setIsAllDocsUploaded] = useState(false);
    const [uploadDialog, setUploadDialog] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [requestId, setRequestId] = useState()
    const dispatch = useDispatch();
    const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
    const [paymentData, setPaymentData] = useState(null);
    const [confirmPayment, setConfirmPayment] = useState(false);
    const [showToasterMsg, setShowToasterMsg] = React.useState(false);
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

    const handleCloseToast = () => {
        setShowToasterMsg(false);
    };


    useEffect(() => {
        if (NocProgressData && NocProgressData.VerificationStatus == 1) {
            setIsVerified(true);
        }
    }, [NocProgressData]);

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
        // const requestData = {
        //     ApplicantId: localStorage.getItem("applicantId"),
        //     ReqType: "RequestNOC",
        //     Lang: localStorage.getItem("i18nextLng"),
        //     RequestId: NocProgressData.NocApplicationId
        // };
        dispatch(getNocTransactionHistory());
        dispatch(clearImageUrl());
        dispatch(clearDocumentImageUrl());
        dispatch(clearOtherFile());
        setDocumentDialogBoxOpen(false);
        setTimeout(() => {
            dispatch(clearFileState());
        }, 500);
    };

    const handleClose = () => {
        setDocumentDialogBoxOpen(false);
    };

    const handleCloseSummary = () => {
        setConfirmPayment(false);
        dispatch(clearGenericPaySummaryState());
        dispatch(clearGenericCreateTransState());
        dispatch(clearGenericSbiReqState());
    }

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

    const getPaySummary = (type) => {
        dispatch(genericPaymentSummary(type));
    }

    useEffect(() => {
        if (isSuccessGenericPaySummary && genericPaySummaryData && requestId == NocProgressData.NocApplicationId) {
            setPaymentData(genericPaySummaryData);
            setConfirmPayment(true);
        }
    }, [genericPaySummaryData, isSuccessGenericPaySummary, requestId]);

    useEffect(() => {
        if (isSuccessGenericCreateTrans && genericCreateTransData && requestId == NocProgressData.NocApplicationId) {
            const sendData = {
                "ApplicantId": localStorage.getItem('applicantId'),
                "TransId": genericCreateTransData.TransId,
                "origin": "mobile"
            };
            dispatch(genericSbiReq(sendData));
        }
    }, [genericCreateTransData, isSuccessGenericCreateTrans, requestId]);

    useEffect(() => {
        if (isSuccessGenericSbiReq && genericSbiReqData && requestId == NocProgressData.NocApplicationId) {
            setPaymentGateway(genericSbiReqData);
            setInProcessTrans(true);
            setTimeout(() => {
                document.forms["redirect"].submit();
            }, [1000]);

        }
    }, [genericSbiReqData, isSuccessGenericSbiReq, requestId]);

    const makePayment = (requestId) => {
        if (isSuccessGenericPaySummary && genericPaySummaryData) {
            let requestData = {
                "ApplicantId": localStorage.getItem('applicantId'),
                "Amount": genericPaySummaryData.TransactionTotal,
                "TransFor": "Payment-SBI",
                "TransMode": "online",
                "RequestId": requestId,
                "RequestType": "RequestNOC",
                "Platform": "web"
            }
            dispatch(genericCreateTrans(requestData));
        }
    };

    return (
        <>
            {(inProcessTrans) && <Loading isOpen={inProcessTrans} />}
            <Box paddingY={1} width={'inherit'}>
                <Typography className={classes.nocDetailTxtlabel} style={{ paddingBottom: 5 }}>{moment(NocProgressData.CreatedOn).format("MMM DD, YYYY h:mm a")}</Typography>
                <Paper elevation={3}>
                    <Grid container style={{ padding: 16 }}>
                        <Grid container justifyContent='space-between'>
                            <Grid item>
                                <Typography variant={'subtitle1'}>NOC Generation is in progress ({NocProgressData.IsPmy === '0' ? "PMAY" : "Non-PMAY"}) </Typography>
                                <Typography variant={'caption'} style={{ color: '#666664', fontWeight: "bold" }}>Bank : {NocProgressData.BankName}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ fontSize: "0.8rem", padding: 4 }}>Reference No. : <strong style={{ color: "#0038C0" }}>{NocProgressData.NocApplicationId}</strong></Typography>
                                {!isVerified && <Grid item><Chip color={'secondary'} icon={<Schedule />} label="In progress" variant={'outlined'} /></Grid>}
                                {(isVerified && NocProgressData.IsPmy == 1) && <Grid item><Chip color={'secondary'} icon={<Schedule />} label="Payment Required" variant={'outlined'} /></Grid>}
                            </Grid>
                        </Grid>
                        <Grid xs={12} item>
                            <Divider variant="middle" style={{ margin: "16px 0" }} />
                            {!isVerified && <Typography style={{ fontSize: "1rem", color: 'rgb(102, 102, 100)', fontWeight: 'bold' }}>Document verification for NOC is under progress.</Typography>}
                            {isVerified && <Typography style={{ fontSize: "1rem", color: 'rgb(102, 102, 100)', fontWeight: 'bold' }}>Document verification for NOC is completed.</Typography>}
                            {NocProgressData.VerificationData?.length > 0 && <CancelDocumentBox documentCardList={NocProgressData.VerificationData} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} inVerication={true} setAllDocVerified={setAllDocVerified} />}
                        </Grid>
                        {isErrorGenericPaySummary && <AlertBox severity="error" style={{ margin: 8 }}>{errorMessageGenericPaySummary}</AlertBox>}
                        {(isVerified && NocProgressData.IsPmy == 1) && <Grid xs={12} item style={{margin: 8}}>
                            <Button style={{ float: 'right' }} endIcon={<LaunchIcon />} disabled={isFetchingGenericPaySummary} variant="contained" color="primary" onClick={() => { getPaySummary("RequestNOC"); setRequestId(NocProgressData.NocApplicationId) }} >
                                {isFetchingGenericPaySummary && <CircularProgress size={20} />}
                                {!isFetchingGenericPaySummary && <>Make Payment</>}
                            </Button>
                        </Grid>}
                    </Grid>
                </Paper>
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
            <Dialog
                onClose={handleClose}
                className={classes.dialogBox}
                open={documentDialogBoxOpen}
                disableBackdropClick
                fullWidth={true}
                maxWidth="md"
            >
                {selectedDialog && <CancelDocDialogBox
                    handleClose={handleCloseDocBox}
                    afterSubmitCloseHandler={afterSubmitCloseHandler}
                    docData={NocProgressData.VerificationData.filter((doc) => doc.DocumentId == selectedDialog)[0]}
                    requestID={NocProgressData.NocApplicationId}
                    requestType={"RequestNOC"}
                />
                }
            </Dialog>
            <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={confirmPayment} fullWidth={true} className={classes.modelBoxConfirm} >
                {(isFetchingGenericCreateTrans || isFetchingGenericSbiReq) && <Loading isOpen={(isFetchingGenericCreateTrans || isFetchingGenericSbiReq)} />}
                <SnackBox open={(isErrorGenericCreateTrans || isErrorGenericSbiReq)} autoHideDuration={3000} onClose={handleCloseToast}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {(errorMessageGenericCreateTrans || errorMessageGenericSbiReq)}
                    </Alert>
                </SnackBox>
                <DialogTitle>Make payment for Mortgage NOC</DialogTitle>
                <DialogContent dividers>
                    <Box className={classes.paymentSummSec}>
                        {/* <Grid
                            container
                            justify="space-between"
                            className={classes.amountListBox}
                        >
                            <Grid item xs="auto">
                                <Typography className={classes.amountLabel}>Reference No.</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography className={`${classes.amountBox} grtl`}>{requestId ? requestId : ""}</Typography>
                            </Grid>
                        </Grid> */}
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
                                <Typography className={`${classes.amountLabel} grtl`}>Total</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography className={`${classes.amountBox} grtl`}>₹ {paymentData && numberWithCommas(paymentData.TransactionTotal)}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseSummary(false)} color="primary" disabled={inProcessTrans}>Cancel</Button>
                    <Button onClick={() => makePayment(NocProgressData.NocApplicationId)} endIcon={inProcessTrans ? "" : <SendIcon />} color="primary" variant="contained" disabled={inProcessTrans}>
                        {inProcessTrans && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                        {!inProcessTrans && <>Make Payment</>}
                        {inProcessTrans && <>redirecting...</>}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default withWidth()(NocInProgress);