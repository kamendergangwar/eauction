import { Box, Button, CardMedia, Chip, Dialog, Divider, Grid, Hidden, Paper, Typography } from "@material-ui/core"
import { CancelBookingStyle } from "../CancelBookingStyle.style";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CancelFlatCardIluss, CancelFlatCardIlussLong, VerifiedDocIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { Schedule } from "@material-ui/icons";
import pdfIcon from "../../../../../../assets/pdfIcon.png";
import imageGallery from "../../../../../../assets/imageGallery.png"
import UserPDFViewDialogBox from "../../../../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import CancelDocumentBox from "../../../../../atoms/DocumentUploadBox/CancelDocumentBox";
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from "../../../../../../redux/features/file/FileUploadSlice";
import { GetCancelStatus } from "../../../../../../redux/features/cancelBookingSlice/cancelBookingSlice";
import CancelDocDialogBox from "../../../../../molecules/DialogBoxes/UploadDocumentDialogBox/CancelDocDialogBox/CancelDocDialogBox";

const CancelProgressCard = (props) => {
    const { setCancelStage, cancelStatusData, applicantData } = props;
    const classes = CancelBookingStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);
    const [documentURL, setDocumentURL] = useState("");
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = useState(false);
    const [allDocVerified, setAllDocVerified] = useState(false);

    const docPreviewDialogCloseFun = () => {
        setDocPreviewDialogOpen(false);
    };

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

    return (
        <>
            <Typography style={{ fontSize: "0.8rem", marginTop: 16 }}>{cancelStatusData.CreatedAt}</Typography>
            <Paper elevation={4} xs={12} className={classes.cancelInprogressCon}>
                {/* <Hidden smDown>
                    <Grid container xs={3} alignItems="end">
                        <CancelFlatCardIlussLong style={{ fontSize: "14rem", marginTop: 26 }} />
                    </Grid>
                </Hidden> */}
                <Grid container direction='column' xs={12} md={12} className={classes.detailInprogressCon}>
                    <Grid container justifyContent='space-between' style={{ margin: "7px 0px" }}>
                        <Grid item>
                            {cancelStatusData.cancel_status == 0 && <>
                                <Typography gutterBottom variant='h6'>Cancel Booking Request raised</Typography>
                                {allDocVerified ?
                                    <Typography gutterBottom variant='body2'>Cancellation Document verification is completed.</Typography>
                                    :
                                    <Typography gutterBottom variant='body2'>Cancellation Document verification is under proccess.</Typography>
                                }
                            </>}
                            {cancelStatusData.cancel_status == 1 && <>
                                <Typography gutterBottom variant='h6'>Cancel Booking Request accepted</Typography>
                                <Typography gutterBottom variant='body2'>Cancel Booking request is completed.</Typography>
                            </>}
                        </Grid>
                        <Grid container className={classes.statusChip} justifyContent='center' alignItems='center' xs={4} direction="column">
                            <Typography gutterBottom>Request ID: <strong>{cancelStatusData.id}</strong></Typography>
                            {cancelStatusData.cancel_status == 0 && <Chip icon={<Schedule />} label="In progress" variant={'outlined'} />}
                            {cancelStatusData.cancel_status == 1 && <Chip icon={<VerifiedDocIcon />} label="Completed" variant={'outlined'} />}
                        </Grid>
                    </Grid>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Typography style={{ fontSize: 12 }} gutterBottom><strong>Cancelation Reason :</strong> {cancelStatusData.reason}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.cancelDetail} >
                        {cancelStatusData.verificationData && <CancelDocumentBox documentCardList={cancelStatusData.verificationData} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} inVerication={true} setAllDocVerified={setAllDocVerified} />}
                    </Grid>
                    {(cancelStatusData.cancel_status == 0 && applicantData.Applicant_Booking_Status[0]) &&
                        <Box
                            display="flex"
                            alignItems="center"
                            justify="space-between"
                            padding={1}
                        >
                            <Typography className={classes.TranIDTxt} display="inline" style={{ textAlign: 'center' }}>
                                Flat Details
                            </Typography>
                            <Divider variant="middle" flexItem orientation="vertical" style={{ backgroundColor: "#ffffff87" }} />
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography className={classes.footerText}>Project Name: <span>{applicantData.Applicant_Booking_Status[0].ProjectName}</span></Typography>
                                </Grid>
                                <Grid>
                                    <Typography className={classes.footerText}>Flat No. : <span>{applicantData.Applicant_Booking_Status[0].FlatNo}({applicantData.Applicant_Booking_Status[0].flat_type})&nbsp;</span> Floor No. : <span>{applicantData.Applicant_Booking_Status[0].FloorNo}</span>&nbsp; Tower No. : <span>{applicantData.Applicant_Booking_Status[0].Wing}</span>&nbsp; RERA Carpet Area: <span>{applicantData.Applicant_Booking_Status[0].CarpetArea} SQFT</span></Typography>
                                </Grid>
                            </Grid>
                        </Box>}
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
                        docData={cancelStatusData.verificationData.filter((doc) => doc.DocumentId == selectedDialog)[0]}
                        requestID={cancelStatusData.id}
                        requestType={"CancelApplications"}
                    />}
                </Dialog>
            </Paper >
        </>
    )
};

export default CancelProgressCard;