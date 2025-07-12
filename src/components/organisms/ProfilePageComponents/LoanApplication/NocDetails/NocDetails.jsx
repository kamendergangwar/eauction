import { Box, Button, Chip, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from "@material-ui/core";
import { Schedule } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import { NocApplicationSelector, clearNocApplication,
    //  clearNocPdfSate,
     // getNocPdf, 
      getNocTransactionHistory } from "../../../../../redux/features/noc/NocSlice";
import { applicantSelector } from "../../../../../redux/features/applicant/ApplicantSlice";
import { ApiEndPoint } from "../../../../../utils/Common";
import Loading from "../../../../atoms/Loading/Loading";
import { DownloadPrimaryIcon, GeneratedTag, NoDataFoundVector, NocLetterImg } from "../../../../atoms/SvgIcons/SvgIcons";
import { LoanApplicationStyle } from "../LoanApplication.style";
import NocInProgress from "../NocInProgress/NocInProgress";
import GetAppIcon from '@material-ui/icons/GetApp';
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import { Alert } from "@material-ui/lab";

const NocDetails = (props) => {
    const { setNocStage } = props;
    const classes = LoanApplicationStyle();
    const dispatch = useDispatch()
    const [pdfLoading, setPdfLoading] = useState(false);
    const [isPmay, setIsPmay] = useState(false);
    const [nocPdfLink, setNocPdfLink] = useState('');
    const { nocTransactionHistoryData, isFetchingNocTransactionHistory, isSuccessNocTransactionHistory } = useSelector(NocApplicationSelector)
    const { isFetchingNocPdf, isSuccessNocPdf, isErrorNocPdf, errorMessageNocPdf, nocPdfData } = useSelector(NocApplicationSelector);
    const {
        isSuccessResApplicantGet,
        applicantData,
    } = useSelector(applicantSelector);

    useEffect(() => {
        dispatch(getNocTransactionHistory());
    }, []);

    useEffect(() => {
        if (isSuccessResApplicantGet) {
            if (applicantData.is_pmy == 0) {
                setIsPmay(true)
            }
        }
    }, [isSuccessResApplicantGet]);

    useEffect(() => {
        dispatch(clearNocApplication());
    }, []);


    const getNocTransactionDetailsPdf = (val) => {
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

    const downloadFile = (fileUrl) => {
        var lastItem = fileUrl.split("/").pop();
        setPdfLoading(true)
        fetch(`${ApiEndPoint}/FileUpload/getAWSPrivateDocFileDownload?fileName=${lastItem}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        }).then((response) => response.blob()).then((blob) => {
            setPdfLoading(false)
            // Create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileUrl.substring(fileUrl.lastIndexOf('/') + 1).split('?')[0]);
            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();
            // Clean up and remove the link
            link.parentNode.removeChild(link);
          //  dispatch(clearNocPdfSate());
        }).catch(error => {
            setPdfLoading(false)
            //dispatch(clearNocPdfSate());
            alert(error, "error");
        });
    };

    const downloadNocLetter = (val) => {
        //dispatch(getNocPdf(val))
    }

    useEffect(() => {
        if (isSuccessNocPdf && nocPdfData) {
            setNocPdfLink(nocPdfData?.url_s3);
            downloadFile(nocPdfData?.url_s3);
        }
    }, [isSuccessNocPdf, nocPdfData])

    return (
        <>
            {(isFetchingNocTransactionHistory || pdfLoading || isFetchingNocPdf) && (
                <Loading isOpen={isFetchingNocTransactionHistory || pdfLoading || isFetchingNocPdf} />
            )}
            {isErrorNocPdf && <Alert severity="error" style={{ margin: 10 }}>{errorMessageNocPdf}</Alert>}
            <Box className={classes.NoDetailsCon}>
                {nocTransactionHistoryData.length <= 0 && (
                    <React.Fragment>
                        <NoDataFoundVector className={classes.NoDetailsSvg} />
                        <Typography className={classes.nodetailHeading}>OOPS! Its Empty</Typography>
                        <Typography className={classes.nodetailSubHeading}>Looks Like you haven’t Requeted any “NOC“ yet</Typography>
                        <Button size="small" variant="contained" color="primary" onClick={() => setNocStage(1)}>Request NOC</Button>
                    </React.Fragment>
                )}

                {nocTransactionHistoryData.length > 0 && nocTransactionHistoryData.map((row, index) => (
                    <>
                        {(row.NocStatus == 0) && <NocInProgress NocProgressData={row} />}
                        {(row.PaymentDetails.length > 0 || (row.IsPmy == 0 && row.VerificationStatus == 1)) && <Box paddingY={1} width={'inherit'}>
                            <Typography className={classes.nocDetailTxtlabel} style={{ paddingBottom: 5 }}>{moment(row.CreatedOn).format("MMM DD, YYYY h:mm a")}</Typography>
                            <Paper elevation={3}>
                                <Box paddingY={1} style={{ background: row.NocStatus == 1 ? "#c1f5c147" : "" }}>
                                    <Grid container spacing={3}>
                                        <Grid item md={2} style={{ alignSelf: 'center', position: 'relative', overflow: 'auto' }}>
                                            {row.NocStatus == 1 && <GeneratedTag className={classes.generatedTag} />}
                                            <NocLetterImg style={{ width: "100%", height: "auto", maxHeight: "80px", marginTop: 25 }} />
                                        </Grid>
                                        <Grid item md={10} xs={'auto'}>
                                            <Box padding={1} justifyContent={'space-between'} display={'flex'}>
                                                <Box width={"77%"}>
                                                    <Grid container alignItems="center" style={{ gap: 10 }}>
                                                        <Typography variant={'subtitle1'}>{row.NocStatus == 1 ? "NOC is Generated" : "NOC Generation is in proccess"} ({row.IsPmy === '0' ? "PMAY" : "Non-PMAY"}) </Typography>
                                                        {(row.IsPmy === '1' && row.PaymentDetails[0]?.TransID) &&
                                                            <Button
                                                                startIcon={<DownloadPrimaryIcon />}
                                                                onClick={() => getNocTransactionDetailsPdf(row.PaymentDetails[0]?.TransID)}
                                                                size='small'
                                                                color="primary"
                                                            >
                                                                Download Receipt
                                                            </Button>
                                                        }
                                                    </Grid>
                                                    <Grid item>
                                                        {row.NocStatus == 0 ? <Typography variant={'caption'} style={{ color: '#666664' }}>NOC is currently being generated and will be ready within <strong>2 to 3 business days</strong>.</Typography> :
                                                            <Typography variant={'caption'} style={{ color: '#666664' }}>Your NOC letter is ready.</Typography>}
                                                    </Grid>
                                                    {row.IsPmy === '0' && <>
                                                        <Grid container>
                                                            <Grid item md={3} className={classes.nocDetailTxtlabel}>Bank</Grid>
                                                            <Grid item md={1}>:</Grid>
                                                            <Grid item md={8} className={classes.nocDetailTxtlabelVal}>{row.BankName}</Grid>
                                                        </Grid>
                                                        <Grid container>
                                                            <Grid item md={3} className={classes.nocDetailTxtlabel}>Reference No.</Grid>
                                                            <Grid item md={1}>:</Grid>
                                                            <Grid item md={8} className={classes.nocDetailTxtlabelVal}>{row.NocApplicationId}</Grid>
                                                        </Grid>
                                                    </>
                                                    }
                                                    {row.IsPmy === '1' && <Typography variant={'caption'} style={{ color: '#666664', fontWeight: "bold" }}>Bank : {row.BankName}</Typography>}
                                                </Box>
                                                {row.NocStatus == 0 ? <Chip color={'secondary'} icon={<Schedule />} label="In progress" variant={'outlined'} /> :
                                                    <Button onClick={() => downloadNocLetter(row.NocApplicationId)} style={{ height: 40 }} variant="contained" endIcon={<GetAppIcon />} color='primary' size="small"> Download NOC </Button>
                                                }
                                            </Box>
                                            {(row.IsPmy === '1' && row.PaymentDetails.length > 0) &&
                                                <React.Fragment>
                                                    <Divider />
                                                    <Box paddingY={1}>
                                                        <Grid container>
                                                            <Grid item style={{ borderRight: 'dashed 2px #EEEEEE' }} md={6}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={5} className={classes.nocDetailTxtlabel}>Reference No.</Grid>
                                                                    <Grid item md={1}>:</Grid>
                                                                    <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{`${row.NocApplicationId}`}</Grid>
                                                                </Grid>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={5} className={classes.nocDetailTxtlabel}>Transction Id</Grid>
                                                                    <Grid item md={1}>:</Grid>
                                                                    <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{row.PaymentDetails[0]?.TransID}</Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item md={6} style={{ paddingLeft: 10 }}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={5} className={classes.nocDetailTxtlabel} style={{ lineHeight: 1 }}>Amount Paid <br /><span style={{ fontSize: 'x-small' }}> incluing (GST 18%) </span> </Grid>
                                                                    <Grid item md={1}>:</Grid>
                                                                    <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{`₹ ${row.PaymentDetails[0]?.Amount}`}</Grid>
                                                                </Grid>
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={5} className={classes.nocDetailTxtlabel}>Payment Method</Grid>
                                                                    <Grid item md={1}>:</Grid>
                                                                    <Grid item md={6} className={classes.nocDetailTxtlabelVal}>{row.PaymentDetails[0]?.Method}</Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </React.Fragment>
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                        }
                    </>
                ))}
            </Box >
        </>
    )
}

export default NocDetails;