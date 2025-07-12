import React, { useEffect } from 'react'
import ProfileWrap from '../ProfileWrap/ProfileWrap'
import { Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Hidden, IconButton, Paper, Step, StepContent, StepIcon, StepLabel, Stepper, Table, TableCell, TableRow, Tooltip, Typography, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CompletedCheckWhiteIcon, DownloadPrimaryIcon, HouseIllustration, LockedIcon, OverdueIcon, RupeeWhiteIcon, VerifiedDocIcon, VerifiedDocIconGreen } from '../../../atoms/SvgIcons/SvgIcons';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SendIcon from '@material-ui/icons/Send';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import { ColorlibConnector, MakeHousePaymentStyle } from './MakeHousePayment.style';
import { Schedule } from '@material-ui/icons';
import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { InstallmentSliceSelector, clearInstallmentData, clearInstallmentState, clearInstallmentTransData, clearInstallmentTransState, clearTransDetailData, clearTransDetailState, getInstallmentSummary, getInstallments, installmentCreateTrans, installmentSbiReq, installmentTransDetail } from '../../../../redux/features/installments/installmentSlice';
import AlertBox from '../../../atoms/AlertBox/AlertBox';
import Loading from '../../../atoms/Loading/Loading';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { ApplicantProgressSelector } from '../../../../redux/features/ApplicantStepper/ApplicantStepperSlice';
import SnackBox from '../../../atoms/Snackbar/Snackbar';
import moment from 'moment';
import LaunchIcon from '@material-ui/icons/Launch';
import { ApiEndPoint } from '../../../../utils/Common';

const StyledStepIcon = withStyles((theme) => ({
  root: {
    color: '#bdbdbd',// Default color
    '&$active': {
      color: '#3f51b5', // Active color
      '&.Mui-error': {
        color: '#f44336'
      },
    },
    '&$completed': {
      color: '#4caf50', // Completed color
      '&.Mui-error': {
        color: '#f44336'
      },
    },
  },
  active: {},
  completed: {},
}))(StepIcon);

const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);

const MakeHousePayment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = MakeHousePaymentStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const [installments, setInstallments] = useState([]);
  const [activeInstallment, setActiveInstallment] = useState()
  const [expanded, setExpanded] = React.useState(null);
  const [allInstallmentData, setAllInstallmentData] = useState({});
  const [appFeeData, setAppFeeData] = useState({});
  const [bookingFeeData, setBookingFeeData] = useState({});
  const { isFetchingInstallment, isSuccessInstallment, isErrorInstallment, errorMessageInstallment, installmentData } = useSelector(InstallmentSliceSelector)
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [paymentGateway, setPaymentGateway] = useState({});
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [inProcessTrans, setInProcessTrans] = useState(false);
  const [showToasterMsg, setShowToasterMsg] = React.useState(false);
  const [openTransDetail, setOpenTransDetail] = useState(false);
  const [transData, setTransData] = useState(null);
  const [curTransData, setcurTransData] = useState(null);

  const { isFetchingSummary,
    isSuccessSummary,
    isErrorSummary,
    errorMessageSummary,
    summaryData,

    //installment create trans 
    isFetchingCreateTrans,
    isSuccessCreateTrans,
    isErrorCreateTrans,
    errorMessageCreateTrans,
    createTransData,

    //sbi payment gateway api 
    isFetchingSbiReq,
    isSuccessSbiReq,
    isErrorSbiReq,
    errorMessageSbiReq,
    sbiReqData,

    //trans detail api
    isFetchingTransDetail,
    isSuccessTransDetail,
    isErrorTransDetail,
    errorMessageTransDetail,
    transDetailData } = useSelector(InstallmentSliceSelector)


  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "12" && item.Status != "completed") {
          history.push("/dashboard");
        }
      })
    }
  }, [isSuccessProgressResStepper]);

  const handleChange = (index) => {
    if (index + 1 <= activeInstallment) {
      setExpanded((prevExpandedStep) =>
        prevExpandedStep === index + 1 ? null : index + 1
      );
    }
  };

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

  const getTransactionPdf = (id) => {
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/InstallmentsTransactions/applicationTransactionPaymentReceiptPdf/${localStorage.getItem('applicantId')}?installment_id=${id}`;
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((response) => response.blob()).then((blob) => {
      setPdfLoading(false);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = curTransData.TransId + "-Receipt";
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
      setPdfLoading(false);
      alert(error, "Transaction not found",);
    });
  };

  useEffect(() => {
    dispatch(getInstallments());
    return () => {
      dispatch(clearInstallmentState());
      dispatch(clearInstallmentData());
      dispatch(clearInstallmentTransState());
      dispatch(clearInstallmentTransData());
      dispatch(clearTransDetailState());
      dispatch(clearTransDetailData());
    };
  }, [])

  const handleClose = () => {
    setConfirmPayment(false);
    setSelectedData(null);
    dispatch(clearInstallmentTransState());
    dispatch(clearInstallmentTransData());
  }

  useEffect(() => {
    if (isSuccessInstallment && installmentData) {
      setActiveInstallment(installmentData.activeInstallment);
      setInstallments(installmentData.installments);
      setAllInstallmentData(installmentData);
      setAppFeeData(installmentData?.applicationFee[0]);
      setBookingFeeData(installmentData?.bookingFee[0]);
    }
  }, [installmentData, isSuccessInstallment]);

  const makePayment = (id, number, name) => {
    const sendData = {
      id: id,
      number: number,
      name: name
    }
    setSelectedData(sendData);
    dispatch(getInstallmentSummary(sendData))
  }

  useEffect(() => {
    if (isSuccessSummary && summaryData) {
      setPaymentData(summaryData);
      setConfirmPayment(true);
    }
  }, [isSuccessSummary, summaryData]);

  const openPaymentGateway = () => {
    if (isSuccessSummary && summaryData && selectedData) {
      let requestData = {
        "ApplicantId": localStorage.getItem('applicantId'),
        // "ApplicantId": 19,
        "RequestType": "PayInstallment",
        "installmentId": selectedData.id,
        "installmentNumber": selectedData.number,
        "TransFor": "Payment-SBI",
        "TransMode": "online",
        "Platform": "web",
        "Amount": summaryData.TransactionTotal
      }
      dispatch(installmentCreateTrans(requestData));
    }
  };

  useEffect(() => {
    if (isSuccessCreateTrans && createTransData) {
      const sendData = {
        "ApplicantId": localStorage.getItem('applicantId'),
        "TransId": createTransData.TransId,
        "origin": "mobile"
      };
      dispatch(installmentSbiReq(sendData));
    }
  }, [createTransData, isSuccessCreateTrans])

  useEffect(() => {
    if (isSuccessSbiReq && sbiReqData) {
      setPaymentGateway(sbiReqData);
      setInProcessTrans(true);
      setTimeout(() => {
        document.forms["redirect"].submit();
      }, [1000]);
    }
  }, [sbiReqData, isSuccessSbiReq]);

  const handleCloseToast = () => {
    setShowToasterMsg(false);
  };

  const openTranDetail = (TransId, name, id) => {
    const sendData = {
      Lang: localStorage.getItem('i18nextLng'),
      TransId: TransId
    }
    dispatch(installmentTransDetail(sendData))
    let data = {
      name: name,
      TransId: TransId,
      id: id,
    }
    setcurTransData(data)
  };

  useEffect(() => {
    if (isSuccessTransDetail && transDetailData) {
      setOpenTransDetail(true);
      setTransData(transDetailData);
    };
  }, [isSuccessTransDetail, transDetailData]);

  const handleDetailClose = () => {
    setOpenTransDetail(false);
    setTransData(null);
    setcurTransData(null);
    dispatch(clearTransDetailState());
    dispatch(clearTransDetailData());
  };


  return (
    <ProfileWrap>
      {(isFetchingInstallment || isFetchingTransDetail || pdfLoading) && (
        <Loading isOpen={isFetchingInstallment || isFetchingTransDetail || pdfLoading} />
      )}
      <div className={classes.docContainer}>
        <Box>
          {(!isErrorInstallment && !isFetchingInstallment) &&
            <>
              <Grid container xs={12} className={classes.totalPayCon}>
                <Hidden smDown>
                  <Grid item xs={3}>
                    <HouseIllustration style={{ fontSize: "13rem" }} />
                  </Grid>
                </Hidden>
                <Grid container direction='column' xs={12} md={9} className={classes.detailCon}>
                  <Grid container justifyContent='space-between' style={{ margin: "12px 0px" }}>
                    <Grid item>
                      <Typography gutterBottom variant='h6'>Installments Details&nbsp;{installmentData.totalInstallmentOverdue > 0 && <span style={{ fontSize: 16, color: 'rgb(255 249 0' }}>({installmentData.totalInstallmentOverdue} installment overdue)</span>}</Typography>
                      {/* <Typography gutterBottom variant='body2'>Installment done till date towards this recurring Deposit  </Typography> */}
                    </Grid>
                  </Grid>
                  <Grid container className={classes.paymentDetail} justifyContent='space-around'>
                    <Grid item>
                      <Grid container alignItems='center'>
                        <Hidden smDown>
                          <Grid item style={{ marginRight: 16, marginTop: 4 }}>
                            <RupeeWhiteIcon />
                          </Grid>
                        </Hidden>
                        <Grid item>
                          <Typography  >Total amount Paid till now</Typography>
                          <span style={{ fontSize: 18, fontWeight: 700 }}>{`₹${numberWithCommas(allInstallmentData.amountPaid)} / `}</span><span style={{ fontSize: 18, fontWeight: 500 }}>{`₹${numberWithCommas(allInstallmentData.totalAmount)}`}</span>
                          {/* <span style={{ fontSize: 14, fontWeight: 700 }}>{`₹xxxxxx / `}</span><span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>{`₹xxxxxxx`}</span> */}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider orientation='vertical' style={{ background: "rgba(255, 255, 255, 0.2)" }} flexItem />
                    <Grid item>
                      <Grid container alignItems='center'>
                        <Hidden smDown>
                          <Grid item style={{ marginRight: 16, marginTop: 4 }}>
                            <CompletedCheckWhiteIcon />
                          </Grid>
                        </Hidden>
                        <Grid item>
                          <Typography style={{ fontSize: 14 }}>Completed Installment</Typography>
                          <span style={{ fontSize: 18, fontWeight: 700 }}>{`${allInstallmentData.totalInstallmentPaid} / `}</span><span style={{ fontSize: 18, fontWeight: 500 }}>{`${allInstallmentData.totalInstallment}`}</span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box className={classes.tableCon}>
                <Grid className={classes.table} >
                  {/* <Typography style={{ fontWeight: 600, fontSize: '0.9rem', marginLeft: 14 }}>Application Fee Details</Typography> */}
                  <Table padding='dense' size='small'>
                    <TableRow>
                      <TableCell className={classes.th}>Application Fee</TableCell >
                      <TableCell className={classes.th}>GST ({appFeeData.Gst_Percentage}%)</TableCell >
                      <TableCell className={classes.th}>Total Paid</TableCell >
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.td}>₹ {numberWithCommas(appFeeData.ApplicationFee)}</TableCell >
                      <TableCell className={classes.td}>₹ {numberWithCommas(appFeeData.Gst)}</TableCell >
                      <TableCell className={classes.td}>₹ {numberWithCommas(appFeeData.Amount)}</TableCell >
                    </TableRow>
                  </Table>
                </Grid>
                <Divider orientation='vertical' flexItem style={{ background: "rgba(255, 255, 255, 0.2)" }} />
                <Grid className={classes.table}>
                  {/* <Typography style={{ fontWeight: 600, fontSize: '0.9rem', marginLeft: 14 }}>Booking Fee Details</Typography> */}
                  <Table size='small' >
                    <TableRow>
                      <TableCell className={classes.th}>Booking Fee</TableCell>
                      <TableCell className={classes.th}>GST (1%)</TableCell>
                      <TableCell className={classes.th}>Total Paid</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.td}>₹ {numberWithCommas(bookingFeeData.LoanAmount)}</TableCell>
                      <TableCell className={classes.td}>₹ {numberWithCommas(bookingFeeData.ApplicationFeeGST)}</TableCell>
                      <TableCell className={classes.td}>₹ {numberWithCommas(bookingFeeData.Amount)}</TableCell>
                    </TableRow>
                  </Table>
                </Grid>
              </Box>
            </>}
          {isErrorInstallment && <AlertBox severity='error' style={{ margin: 8 }}>{errorMessageInstallment}</AlertBox>}
          {isErrorSummary && <AlertBox severity='error' style={{ margin: 8 }}>{errorMessageSummary}</AlertBox>}
          {isErrorTransDetail && <AlertBox severity='error' style={{ margin: 8 }}>{errorMessageTransDetail}</AlertBox>}
          <Stepper activeStep={activeInstallment - 1} connector={<ColorlibConnector />} orientation="vertical">
            {installments.map((step, index) => (
              <Step key={step.label}
                expanded={activeInstallment == index + 1 || step.status == '3' || expanded == index + 1}
              >
                <StepLabel
                  StepIconComponent={StyledStepIcon}
                  error={step.status == '3' ? true : false}
                // optional={index === 2 ? (<Typography variant="caption">Last step</Typography>) : null}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.stepperLabelCon}
                  >
                    <Typography style={{ fontSize: "16px", color: "#65707D", fontWeight: "bold", }}>
                      {step.name}
                    </Typography>
                    <Grid item >
                      {(step.dueInDays > 0 && step.status != 2 && step.status != 3) && <Chip className={`${classes.progressChip} ${step.status == 3 && 'overdue'} ${step.status == 1 && 'daysChip'}`} icon={<DateRangeIcon style={{ color: step.status == 1 ? '#0038C0' : step.status == 3 && '#FD000D' }} />} style={{ marginRight: 6 }} label={`${step.dueInDays} days left`} />}
                      {step.status == '3' && <Chip className={`${classes.progressChip} ${'overdue'}`} icon={<ErrorOutlinedIcon style={{ color: "#FD000D" }} />} label={"Payment Overdue"} />}
                      {step.status != '3' && <Chip color={'secondary'} className={`${classes.progressChip} ${activeInstallment == index + 1 ? "pending" : ""} ${activeInstallment > index + 1 ? "done" : ""}`} icon={activeInstallment > index + 1 ? <VerifiedDocIconGreen /> : <Schedule />} label={activeInstallment > index + 1 ? `Paid on ${step.paidDate}` : "Payment Pending"} />}
                      {step.status == '4' ?
                        <CustomTooltip arrow placement="top" title={"Please Pay Pending Installment to Unlock next Installment"}>
                          <span>
                            <IconButton size="small" disabled>
                              <LockTwoToneIcon size='small' />
                            </IconButton>
                          </span>
                        </CustomTooltip>
                        :
                        <IconButton size="small" onClick={() => handleChange(index)} disabled={step.status == '3' || step.status == '1'}>
                          <ExpandMoreIcon size="small" />
                        </IconButton>}
                    </Grid>
                  </Grid>

                </StepLabel>
                <StepContent className={`${classes.stepContent} ${(activeInstallment == index + 1 || step.status == '3') ? "active" : ""} ${activeInstallment > index + 1 ? "done" : ""}`} >
                  {step.status == '2' && <Grid xs={12} className={classes.stepperCollapseCon}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                      <Grid>
                        <Typography className={classes.subHeading}>Amount Paid :</Typography>
                        <Typography className={classes.amountTxt}>₹{" "}{numberWithCommas(step.amount)} &nbsp;<span>{step.amountInWords}</span></Typography>
                      </Grid>
                      <Grid>
                        <Typography className={classes.subHeading}>Paid on :</Typography>
                        <Typography className={classes.dateTxt}>{step.paidDate}</Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ margin: 8 }} light />
                    <Grid container justifyContent='flex-end'>
                      <Button color='primary' size='small' onClick={() => openTranDetail(step.TransId, step.name, step.id)}>
                        View Transaction Details
                      </Button>
                    </Grid>
                  </Grid>}
                  {step.status == '1' && <Grid xs={12} className={classes.stepperCollapseCon}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                      <Grid>
                        <Typography className={classes.subHeading}>Amount to be Paid :</Typography>
                        <Typography className={classes.amountTxt}>₹{" "}{numberWithCommas(step.amount)} &nbsp;<span>{step.amountInWords}</span></Typography>
                      </Grid>
                      <Grid>
                        <Typography className={classes.subHeading}>Due on :</Typography>
                        <Typography className={classes.dateTxt}>{step.dueDate}</Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ margin: 8 }} light />
                    <Grid container justifyContent='flex-end'>
                      <Button color='primary' variant='contained' size='small' onClick={() => makePayment(step.id, step.number, step.name)} disabled={isFetchingSummary}>
                        {isFetchingSummary && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                        {!isFetchingSummary && <>Make Payment</>}
                      </Button>
                    </Grid>
                  </Grid>}
                  {step.status == '3' && <Grid xs={12} className={classes.stepperCollapseCon}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                      <Grid>
                        <Typography className={classes.subHeading}>Amount to be Paid :</Typography>
                        <Typography className={classes.amountTxt}>₹{" "}{numberWithCommas(step.amount)} &nbsp;<span>{step.amountInWords}</span></Typography>
                      </Grid>
                      <Grid>
                        <Typography className={classes.subHeading}>Due on :</Typography>
                        <Typography className={classes.dateTxt} style={{ color: "#FD000D" }}>{step.dueDate}</Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ margin: 8 }} light />
                    <Grid container justifyContent='space-between'>
                      <Alert severity="error" style={{ padding: 0, background: 'none', color: '#FD000D' }}>You've missed the due date. Please pay to avoid late charges.</Alert>
                      <Button color='primary' variant='contained' size='small' onClick={() => makePayment(step.id, step.number, step.name)} disabled={isFetchingSummary}>
                        {isFetchingSummary && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                        {!isFetchingSummary && <>Make Payment</>}
                      </Button>
                    </Grid>
                  </Grid>}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
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

      {/* make installment payment dialog box */}
      <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={confirmPayment} fullWidth={true} className={classes.modelBoxConfirm} >
        {(isFetchingCreateTrans || isFetchingSbiReq) && <Loading isOpen={(isFetchingCreateTrans || isFetchingSbiReq)} />}
        <SnackBox open={(isErrorCreateTrans || isErrorSbiReq)} autoHideDuration={3000} onClose={handleCloseToast}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {(errorMessageCreateTrans || errorMessageSbiReq)}
          </Alert>
        </SnackBox>
        <DialogTitle>Make payment for {selectedData ? selectedData.name : "installment"}</DialogTitle>
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
          <Button onClick={() => handleClose(false)} color="primary" disabled={inProcessTrans}>Cancel</Button>
          <Button onClick={openPaymentGateway} endIcon={inProcessTrans ? "" : <LaunchIcon />} color="primary" variant="contained" disabled={inProcessTrans}>
            {inProcessTrans && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
            {!inProcessTrans && <>Make Payment</>}
            {inProcessTrans && <>redirecting...</>}
          </Button>
        </DialogActions>
      </Dialog>

      {/* trans detail dialog box */}
      <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={openTransDetail} onClose={handleDetailClose} fullWidth={true} className={classes.modelBoxConfirm} >
        {(pdfLoading) && <Loading isOpen={(pdfLoading)} />}
        <DialogTitle>Transaction details for {transData ? transData.Name : "installment"}
          <Button
            size='small'
            color="primary"
            style={{ float: 'right' }}
            variant='outlined'
            startIcon={<DownloadPrimaryIcon />}
            onClick={() => getTransactionPdf(transData.InstallmentId)}
          >
            Download Receipt
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className={classes.amountLabel}><span className={`${classes.amountLabel} grtl`}>Paid on:</span>&nbsp;{transData && moment(transData.CreatedAt).format("MMM DD, YYYY h:mm a")}</Typography>
          <Box className={classes.paymentSummSec} style={{ marginTop: 0 }}>
            <Grid
              container
              justify="space-between"
              className={classes.amountListBox}
            >
              <Grid item xs="auto">
                <Typography className={classes.amountLabel}>Transaction Id</Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography className={`${classes.amountBox} grtl`}>{transData && transData.TransactionId}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              className={classes.amountListBox}
            >
              <Grid item xs="auto">
                <Typography className={classes.amountLabel}>Amount</Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography className={classes.amountBox}>₹ {transData && numberWithCommas(transData.ApplicationFee)}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              className={classes.amountListBox}
            >
              <Grid item xs="auto">
                <Typography className={classes.amountLabel}>GST (@ 1%)</Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography className={classes.amountBox}>₹ {transData && numberWithCommas(transData.GstAmount)}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              className={classes.amountListBox}
            >
              <Grid item xs="auto">
                <Typography className={`${classes.amountLabel} grtl`}>Total Paid</Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography className={`${classes.amountBox} grtl`} style={{ float: 'right' }}>₹ {transData && numberWithCommas(transData.totalAmount)}</Typography>
                <br />
                <Typography className={`${classes.amountBox}`} style={{ fontSize: 11, float: 'right' }}>{transData && transData.totalIncludingGstWords}</Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDetailClose()} color="primary" disabled={inProcessTrans}>Close</Button>
        </DialogActions>
      </Dialog>
    </ProfileWrap>
  )
}

export default MakeHousePayment