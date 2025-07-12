import { Box, Button, CardMedia, Chip, Dialog, Divider, Grid, Hidden, Paper, Typography } from "@material-ui/core"
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CancelFlatCardIluss, CancelFlatCardIlussLong, DownloadPrimaryIcon, EditNameCardImage, VerifiedDocIcon, VerifiedDocIconGreen } from "../../../../../atoms/SvgIcons/SvgIcons";
import { Schedule } from "@material-ui/icons";
import { ChangeNameStyle } from "../ChangeNameStyle.style";
import DocumentUploadBox from "../../../../../atoms/DocumentUploadBox/DocumentUploadBox";
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from "../../../../../../redux/features/file/FileUploadSlice";
import { genericGetDocuments } from "../../../../../../redux/features/UttilSlice/genericDocumentSlice";
import GenericDocDialogBox from "../../../../../molecules/DialogBoxes/UploadDocumentDialogBox/GenericDocDialogBox/GenericDocDialogBox";
import { GenericTransactionSelector, genericCreateTrans, genericPaymentSummary, genericSbiReq } from "../../../../../../redux/features/UttilSlice/genericTransactionSlice";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Loading from "../../../../../atoms/Loading/Loading";
import SendIcon from '@material-ui/icons/Send';
import moment from "moment";
import { ApiEndPoint } from "../../../../../../utils/Common";

const ChangeNameHistoryCard = (props) => {
    const { setChangeNameState, reqData, documents, reqType } = props;
    const classes = ChangeNameStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [pdfLoading, setPdfLoading] = useState(false);

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
            link.download = val + '-NOCTransaction';
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
            {reqData.map((reqData) =>
                <Box pb={1.5}>
                    <Typography className={classes.nocDetailTxtlabel} style={{ paddingBottom: 5 }}>{moment(reqData.CreatedAt).format("MMM DD, h:mm a")}</Typography>
                    <Paper elevation={3}>
                        <Box paddingY={1}>
                            <Grid container>
                                <Hidden mdDown>
                                    <Grid item md={2} style={{ alignSelf: 'center', position: 'relative', overflow: 'auto' }}>
                                        <EditNameCardImage style={{ width: "100%", height: "auto", maxHeight: "80px", marginTop: 6 }} />
                                    </Grid>
                                </Hidden>
                                <Grid container justifyContent="space-between" md={10}>
                                    <Box padding={1} width={"100%"} justifyContent={'space-between'} display={'flex'}>
                                        <Grid container direction="column">
                                            <Grid container alignItems="center" style={{ gap: 10 }}>
                                                <Typography variant="subtittle" gutterBottom className={classes.boldColortxt}>Change Name Request successfully completed.</Typography>
                                                {(reqData.TransDetails.length > 0 && reqData.TransDetails[0]?.TransID) &&
                                                    <Button
                                                        startIcon={<DownloadPrimaryIcon />}
                                                        onClick={() => getTransactionDetailsPdf(reqData.TransDetails[0]?.TransID)}
                                                        size='small'
                                                        color="primary"
                                                    >
                                                        Download Receipt
                                                    </Button>
                                                }
                                            </Grid>
                                            {(reqData.Status == 1 && reqData.RequestDetails) && reqData.RequestDetails.map((type) =>
                                                <Grid>
                                                    {type.ReqType == 'UpdateApplicant' && <Typography gutterBottom variant="subtittle">New Name (First Applicant): <span style={{ fontSize: "1rem", fontWeight: 600 }}>{type.FullName}</span></Typography>}
                                                    {type.ReqType == 'UpdateCoApplicant' && <Typography variant="subtittle">New Name (Co-Applicant): <span style={{ fontSize: "1rem", fontWeight: 600 }}>{type.FullName}</span></Typography>}
                                                </Grid>)}
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{ fontSize: "0.8rem", padding: 4 }} className={classes.boldColortxt}>Request ID: <strong style={{ color: "#0038C0" }}>{reqData.RequestId}</strong></Typography>
                                            {reqData.Status == 1 && <Chip color="primary" icon={<VerifiedDocIconGreen />} label="Completed" variant={'outlined'} />}
                                        </Grid>
                                    </Box>
                                    {reqData.TransDetails.length > 0 &&
                                        <>
                                            <Box paddingY={1} width={"100%"} borderTop="1px solid #80808045">
                                                <Grid container>
                                                    <Grid item style={{ borderRight: 'dashed 2px #EEEEEE' }} md={6}>
                                                        <Grid container spacing={2}>
                                                            <Grid item md={5} className={classes.nocDetailTxtlabel}>Transction Id</Grid>
                                                            <Grid item md={1}>:</Grid>
                                                            <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{reqData.TransDetails[0]?.TransID}</Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <Grid item md={5} className={classes.nocDetailTxtlabel} style={{ lineHeight: 1 }}>Amount Paid <br /><span style={{ fontSize: 'x-small' }}> incluing (GST 18%) </span> </Grid>
                                                            <Grid item md={1}>:</Grid>
                                                            <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{`₹ ${reqData.TransDetails[0]?.Amount}`}</Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item md={6} style={{ paddingLeft: 10 }}>
                                                        <Grid container spacing={2}>
                                                            <Grid item md={5} className={classes.nocDetailTxtlabel}>Payment Method</Grid>
                                                            <Grid item md={1}>:</Grid>
                                                            <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{reqData.TransDetails[0]?.Method}</Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper >
                </Box >
            )}
        </>
    )
};

export default ChangeNameHistoryCard;