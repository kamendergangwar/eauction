import { Box, Button, CardMedia, Chip, CircularProgress, Dialog, Divider, Grid, Hidden, Paper, Typography } from "@material-ui/core"
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CancelFlatCardIluss, CancelFlatCardIlussLong, DownloadPrimaryIcon, VerifiedDocIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { Schedule } from "@material-ui/icons";
import pdfIcon from "../../../../../../assets/pdfIcon.png";
import imageGallery from "../../../../../../assets/imageGallery.png"
import UserPDFViewDialogBox from "../../../../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import CancelDocumentBox from "../../../../../atoms/DocumentUploadBox/CancelDocumentBox";
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from "../../../../../../redux/features/file/FileUploadSlice";
import { GetCancelStatus } from "../../../../../../redux/features/cancelBookingSlice/cancelBookingSlice";
import CancelDocDialogBox from "../../../../../molecules/DialogBoxes/UploadDocumentDialogBox/CancelDocDialogBox/CancelDocDialogBox";
import { EditCoApplicantStyle } from "../EditCoApplicantStyle.style";
import { getFamilyRelationshipList, masterDataSelector } from "../../../../../../redux/features/masterdata/MasterDataSlice";
import moment from "moment";
import { ApiEndPoint } from "../../../../../../utils/Common";
import Loading from "../../../../../atoms/Loading/Loading";

const ReqProgressCard = (props) => {
    const { setEditCoApplicantStage, reqData, applicantData } = props;
    const classes = EditCoApplicantStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);
    const [documentURL, setDocumentURL] = useState("");
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = useState(false);
    const [allDocVerified, setAllDocVerified] = useState(false);
    const [relationLabel, setRelationLabel] = useState('');
    const [pdfLoading, setPdfLoading] = useState(false);
    const {
        relationshipListData,
        isFetchingRelationship,
        isSuccessRelationship,
        isErrorRelationship,
        errorMsgRelationship,
    } = useSelector(masterDataSelector);

    useEffect(() => {
        if (reqData.CoAppMarritalStatus) {
            let MarritalStatusString;
            if (reqData.CoAppMarritalStatus == "1") {
                MarritalStatusString = "Single";
            } else if (reqData.CoAppMarritalStatus == "2") {
                MarritalStatusString = "Married";
            } else if (reqData.CoAppMarritalStatus == "11" || reqData.CoAppMarritalStatus == "123") {
                MarritalStatusString = "Other";
            }
            dispatch(getFamilyRelationshipList(MarritalStatusString));
        }
    }, [reqData])

    useEffect(() => {
        if (isSuccessRelationship && reqData.CoAppMarritalStatus) {
            setRelationLabel(relationshipListData[0]?.Title)
        }
    }, [isSuccessRelationship, reqData])

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
        dispatch(GetCancelStatus());
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

    const getTransactionDetailsPdf = (val) => {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/AllApplicationTransations/PaymentReceiptPDF/${localStorage.getItem('applicantId')}?TransId=${val}`;
        fetch(fileUrl, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        }).then((response) => response.blob()).then((blob) => {
            setPdfLoading(false);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = val + "-Receipt";
            document.body.append(link);
            link.click();
            link.remove();
            // in case the Blob uses a lot of memory
            setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(function (error) {
            setPdfLoading(false);
            alert("Transaction not found");
        });
    };

    return (
        <>
            {(pdfLoading) && <Loading isOpen={(pdfLoading)} />}
            <Typography style={{ fontSize: "0.8rem", marginTop: 16 }} gutterBottom>{moment(reqData.Created_at).format("MMM DD, h:mm a")}</Typography>
            <Paper elevation={4} xs={12} className={classes.cancelInprogressCon}>
                <Grid container direction='column' xs={12} md={12} className={classes.detailInprogressCon}>
                    <Grid container justifyContent='space-between' style={{ margin: "7px 0px" }}>
                        <Grid item>
                            {reqData.CoAppStatus == 0 && <>
                                <Typography gutterBottom variant='h6'>Add Co-Applicant Request raised</Typography>
                                {allDocVerified ?
                                    <Typography gutterBottom variant='body2'>Co-Applicant Document verification is completed.</Typography>
                                    :
                                    <Typography gutterBottom variant='body2'>Co-Applicant Document verification is under progress.</Typography>
                                }
                            </>}
                            {reqData.CoAppStatus == 1 && <>
                                <Typography gutterBottom variant='h6'>Add Co-Applicant Request accepted</Typography>
                                <Typography gutterBottom variant='body2'>Add Co-Applicant request is completed.</Typography>
                            </>}
                        </Grid>
                        <Grid container className={classes.statusChip} justifyContent='center' alignItems='center' xs={4} direction="column">
                            <Typography gutterBottom>Request ID: <strong>{reqData.RequestId}</strong></Typography>
                            {reqData.CoAppStatus == 0 && <Chip icon={<Schedule />} label="In progress" variant={'outlined'} />}
                            {reqData.CoAppStatus == 1 && <Chip icon={<VerifiedDocIcon />} label="Completed" variant={'outlined'} />}
                        </Grid>
                    </Grid>
                    <Grid container alignItems='center' >
                        <Grid item>
                            <Typography style={{ fontSize: 14, marginRight: 16 }} gutterBottom><strong>Co-Applicant Name :</strong> {reqData.CoApplicantName}</Typography>
                        </Grid>
                        <Grid item>
                            {relationLabel && <Typography style={{ fontSize: 14 }} gutterBottom><strong>Relation with Co-Applicant: &nbsp;</strong>{relationLabel}</Typography>}
                        </Grid>
                    </Grid>
                    <Divider variant="middle" style={{ margin: "8px 0" }} />
                    <Grid item>
                        <Typography style={{ fontSize: 16, fontWeight: 600 }} gutterBottom>Uploaded Documents (Verification in progress) :</Typography>
                    </Grid>
                    <Grid container className={classes.cancelDetail} >
                        {reqData.VerificationData && <CancelDocumentBox documentCardList={reqData.VerificationData} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} inVerication={true} setAllDocVerified={setAllDocVerified} />}
                    </Grid>
                    {reqData.PaymentDetails.length > 0 &&
                        <>
                            <Divider variant="middle" style={{ margin: "8px 0" }} />
                            <Box paddingY={1} width={"100%"}>
                                {(reqData.PaymentDetails.length > 0 && reqData.PaymentDetails[0]?.TransID) &&
                                    <Grid container justifyContent="space-between">
                                        <Typography style={{ fontWeight: 600 }}>Transaction Details :</Typography>
                                        <Button
                                            startIcon={<DownloadPrimaryIcon />}
                                            onClick={() => getTransactionDetailsPdf(reqData.PaymentDetails[0]?.TransID)}
                                            size='small'
                                            color="primary"
                                        >
                                            Download Receipt
                                        </Button>
                                    </Grid>
                                }
                                <Grid container>
                                    <Grid item style={{ borderRight: 'dashed 2px #EEEEEE' }} md={6}>
                                        <Grid container spacing={2}>
                                            <Grid item md={5} className={classes.nocDetailTxtlabel}>Transction Id</Grid>
                                            <Grid item md={1}>:</Grid>
                                            <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{reqData.PaymentDetails[0]?.TransID}</Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={5} className={classes.nocDetailTxtlabel} style={{ lineHeight: 1 }}>Amount Paid <br /><span style={{ fontSize: 'x-small' }}> incluing (GST 18%) </span> </Grid>
                                            <Grid item md={1}>:</Grid>
                                            <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{`₹ ${reqData.PaymentDetails[0]?.Amount}`}</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} style={{ paddingLeft: 10 }}>
                                        <Grid container spacing={2}>
                                            <Grid item md={5} className={classes.nocDetailTxtlabel}>Payment Method</Grid>
                                            <Grid item md={1}>:</Grid>
                                            <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{reqData.PaymentDetails[0]?.Method}</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    }
                </Grid>
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
                        docData={reqData.VerificationData.filter((doc) => doc.DocumentId == selectedDialog)[0]}
                        requestID={reqData.RequestId}
                        requestType={"AddCoApplicant"}
                    />}
                </Dialog>
            </Paper >
        </>
    )
};

export default ReqProgressCard;