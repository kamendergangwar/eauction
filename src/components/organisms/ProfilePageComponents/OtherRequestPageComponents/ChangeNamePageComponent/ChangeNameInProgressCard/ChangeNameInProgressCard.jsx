import { Box, Button, CardMedia, Chip, Dialog, Divider, Grid, Hidden, Paper, Typography } from "@material-ui/core"
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CancelFlatCardIluss, CancelFlatCardIlussLong, VerifiedDocIcon, VerifiedDocIconGreen } from "../../../../../atoms/SvgIcons/SvgIcons";
import { Schedule } from "@material-ui/icons";
import { ChangeNameStyle } from "../ChangeNameStyle.style";
import DocumentUploadBox from "../../../../../atoms/DocumentUploadBox/DocumentUploadBox";
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from "../../../../../../redux/features/file/FileUploadSlice";
import { GenericDocSliceSelector, genericGetDocuments } from "../../../../../../redux/features/UttilSlice/genericDocumentSlice";
import GenericDocDialogBox from "../../../../../molecules/DialogBoxes/UploadDocumentDialogBox/GenericDocDialogBox/GenericDocDialogBox";
import { GenericTransactionSelector, genericCreateTrans, genericPaymentSummary, genericSbiReq } from "../../../../../../redux/features/UttilSlice/genericTransactionSlice";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Loading from "../../../../../atoms/Loading/Loading";
import SendIcon from '@material-ui/icons/Send';
import moment from "moment";
import { GenericUpdateReqSliceSelector } from "../../../../../../redux/features/UttilSlice/genericUpdateReqSlice";
import AlertBox from "../../../../../atoms/AlertBox/AlertBox";

const ChangeNameInProgressCard = (props) => {
    const { setChangeNameState, reqData } = props;
    const classes = ChangeNameStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = useState(false);
    const [applicantReq, setApplicantReq] = useState(null);
    const [coApplicantReq, setCoApplicantReq] = useState(null);
    const [paymentGateway, setPaymentGateway] = useState({});
    const [inProcessTrans, setInProcessTrans] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [reqType, setReqType] = useState("");

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

    const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
    const { isFetchingGetReqHistory, isSuccessGetReqHistory, isErrorGetReqHistory, getReqHistoryData, errorMessageGetReqHistory, requestType, allReqData } = useSelector(GenericUpdateReqSliceSelector)


    useEffect(() => {
        if (isSuccessGetReqHistory && getReqHistoryData) {
            let getDoc = [];
            requestType.forEach((req) => getDoc.push(req.ReqType));
            setReqType(getDoc.join(","));
            const requestData = {
                ApplicantId: localStorage.getItem("applicantId"),
                ReqType: getDoc.join(","),
                Lang: localStorage.getItem("i18nextLng"),
                RequestId: getReqHistoryData.RequestId
            };
            dispatch(genericGetDocuments(requestData));
        }
    }, [isSuccessGetReqHistory, getReqHistoryData]);

    useEffect(() => {
        if (isSuccessGenericGetDoc && genericGetDocData) {
            setDocuments(genericGetDocData);
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
            ReqType: reqType,
            Lang: localStorage.getItem("i18nextLng"),
            RequestId: reqData.RequestId
        };
        dispatch(genericGetDocuments(requestData))
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
    }

    const makePayment = () => {
        if (isSuccessGenericPaySummary && genericPaySummaryData) {
            let requestData = {
                "ApplicantId": localStorage.getItem('applicantId'),
                "Amount": genericPaySummaryData.TransactionTotal,
                "TransFor": "Payment-SBI",
                "TransMode": "online",
                "RequestId": reqData.RequestId,
                "RequestType": "ChangeName",
                "Platform": "web"
            }
            dispatch(genericCreateTrans(requestData));
        }
    };

    useEffect(() => {
        if (reqData) {
            let applicant = reqData.RequestDetails.filter((req) => req.ReqType == 'UpdateApplicant');
            let coapplicant = reqData.RequestDetails.filter((req) => req.ReqType == 'UpdateCoApplicant');
            if (applicant.length) {
                setApplicantReq(applicant[0]);
            }
            if (coapplicant.length) {
                setCoApplicantReq(coapplicant[0]);
            }
        }
    }, [reqData]);

    useEffect(() => {
        if (reqData && reqData.IsPaymentRequired == 1) {
            dispatch(genericPaymentSummary("ChangeName"));
        }
    }, [reqData]);

    useEffect(() => {
        if (isSuccessGenericPaySummary && genericPaySummaryData) {
            setPaymentData(genericPaySummaryData);
        }
    }, [genericPaySummaryData, isSuccessGenericPaySummary]);

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

    return (
        <>
            {(inProcessTrans || isFetchingGenericPaySummary || isFetchingGenericCreateTrans || isFetchingGenericSbiReq) && <Loading isOpen={(inProcessTrans || isFetchingGenericPaySummary || isFetchingGenericCreateTrans || isFetchingGenericSbiReq)} />}
            <Grid container justifyContent="space-between" >
                <Typography style={{ fontSize: "0.8rem", marginTop: 16 }}>{moment(reqData.CreatedAt).format("MMM DD, h:mm a")}</Typography>
            </Grid>
            <Paper elevation={3} container xs={12} className={classes.InprogressCon}>
                {/* <Hidden smDown>
                    <Grid item xs={3}>
                        <CancelFlatCardIlussLong style={{ fontSize: "14rem", marginTop: 26 }} />
                    </Grid>
                </Hidden> */}
                <Grid container direction='column' xs={12} className={classes.detailCon}>
                    <Grid container justifyContent='space-between' alignItems="center">
                        <Grid item>
                            {(reqData.Status == 0 && reqData.IsPaymentRequired == 0) && <>
                                <Typography gutterBottom variant='h6'>Change Name Request raised</Typography>
                                <Typography gutterBottom variant='body2'>Document verification is under proccess</Typography>
                                {/* <Typography gutterBottom variant='body2'>Note: If the Document is rejected, you can reupload the document</Typography> */}
                            </>}

                            {reqData.Status == 1 && <>
                                <Typography gutterBottom variant='h6'>Change Name Request successfully completed.</Typography>
                                <Typography gutterBottom variant='body2'>Document verification is completed</Typography>
                            </>}
                            {(reqData.Status == 0 && reqData.IsPaymentRequired == 1) && <>
                                <Typography gutterBottom variant='h6'>Payment required for name change request.</Typography>
                                <Typography gutterBottom variant='body2'>Document verification is completed.</Typography>
                            </>}
                        </Grid>
                        <Grid item >
                            <Typography style={{ fontSize: "0.8rem", marginTop: 16, padding: 4 }}>Request ID: <strong style={{ color: "#0038C0" }}>{reqData.RequestId}</strong></Typography>
                            {(reqData.Status == 0 && reqData.IsPaymentRequired == 0) && <Chip color="primary" icon={<Schedule />} label="In progress" variant={'outlined'} />}
                            {reqData.Status == 1 && <Chip color="primary" icon={<VerifiedDocIconGreen />} label="Completed" variant={'outlined'} />}
                            {(reqData.Status == 0 && reqData.IsPaymentRequired == 1) && <Chip color="secondary" icon={<AccountBalanceWalletIcon />} label="Payment Required" variant={'outlined'} />}
                        </Grid>
                    </Grid>
                    {(reqData.IsPaymentRequired == 0 && reqData.Status == 0) && <>
                        {applicantReq && <>
                            <Paper elevation={3} className={classes.projectSection}>
                                <Typography variant="h6">First Applicant</Typography>
                            </Paper>
                            <Box display='flex' marginX={4} padding={2} xs={12} flexDirection='column' className={classes.applicationBox} justifyContent="space-between">
                                <Grid container xs={12} alignItems="center">
                                    <Typography style={{ fontSize: "1rem" }}>Applied New Name: <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{applicantReq.FullName}</span></Typography>
                                    {/* <Typography style={{ fontSize: "1.3rem", fontWeight: 600 }}>{applicantData.FirstName}</Typography> */}
                                </Grid>
                                <Divider variant="middle" style={{ margin: "16px 0" }} />
                                <Typography >Uploaded Documents (Verification in progress) :</Typography>
                                {documents.UpdateApplicant && <DocumentUploadBox documentCardList={documents.UpdateApplicant} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} type={"UpdateApplicant"} inVerication={true} />}
                            </Box>
                        </>}
                        {coApplicantReq && <>
                            <Paper elevation={3} className={classes.projectSection}>
                                <Typography variant="h6">Co-Applicant</Typography>
                            </Paper>
                            <Box display='flex' marginX={4} padding={2} xs={12} flexDirection='column' className={classes.applicationBox} justifyContent="space-between">
                                <Grid container xs={12} alignItems="center">
                                    <Typography style={{ fontSize: "1rem" }}>Applied New Name: <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{coApplicantReq.FullName}</span></Typography>
                                </Grid>
                                <Divider variant="middle" style={{ margin: "16px 0" }} />
                                <Typography >Uploaded Documents (Verification in progress) :</Typography>
                                {documents.UpdateCoApplicant && <DocumentUploadBox documentCardList={documents.UpdateCoApplicant} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} type={"UpdateCoApplicant"} inVerication={true} />}
                            </Box>
                        </>}
                    </>}
                    {(reqData.IsPaymentRequired == 1 && paymentData && reqData.Status == 0) && <Grid>
                        {applicantReq && <Typography gutterBottom style={{ fontSize: "1rem" }}>Applied New Name (First Applicant): <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{applicantReq.FullName}</span></Typography>}
                        {coApplicantReq && <Typography style={{ fontSize: "1rem" }}>Applied New Name (Co-Applicant): <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{coApplicantReq.FullName}</span></Typography>}
                        <div className={classes.formSection}>
                            {/* <Typography className={classes.secTitle}>{t("applyLoanYesNoSection.paymentSummary.title")}</Typography> */}
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
                                        <Typography className={classes.amountBox}>₹ {numberWithCommas(paymentData.TransactionAmount)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    justify="space-between"
                                    className={classes.amountListBox}
                                >
                                    <Grid item xs="auto">
                                        <Typography className={classes.amountLabel}>GST (@ {paymentData.TransactionGstPercentage}%)</Typography>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <Typography className={classes.amountBox}>₹ {numberWithCommas(paymentData.TransactionGstAmount)}</Typography>
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
                                        <Typography className={`${classes.amountBox} grtl`}>₹ {numberWithCommas(paymentData.TransactionTotal)}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            {isErrorGenericSbiReq && <AlertBox severity="error">{errorMessageGenericSbiReq}</AlertBox>}
                            <Button disabled={inProcessTrans} style={{ float: 'right' }} variant="contained" color="primary" onClick={makePayment} endIcon={<SendIcon />}>Make Payment</Button>
                        </div>
                    </Grid>}
                    {reqData.Status == 1 && <Grid>
                        {applicantReq && <Typography gutterBottom style={{ fontSize: "1rem" }}>Applied New Name (First Applicant): <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{applicantReq.FullName}</span></Typography>}
                        {coApplicantReq && <Typography style={{ fontSize: "1rem" }}>Applied New Name (Co-Applicant): <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{coApplicantReq.FullName}</span></Typography>}
                    </Grid>}
                </Grid>
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
                    {selectedDialog && <GenericDocDialogBox
                        handleClose={handleCloseDocBox}
                        afterSubmitCloseHandler={afterSubmitCloseHandler}
                        docData={selectedDialog.type == "UpdateApplicant" ? documents.UpdateApplicant.filter((doc) => doc.DocumentId == selectedDialog.docId)[0] : documents.UpdateCoApplicant.filter((doc) => doc.DocumentId == selectedDialog.docId)[0]}
                        RequestId={reqData.RequestId}
                    />}
                </Dialog>
            </Paper>
        </>
    )
};

export default ChangeNameInProgressCard;