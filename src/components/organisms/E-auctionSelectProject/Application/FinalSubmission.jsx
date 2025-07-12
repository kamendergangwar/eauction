import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from 'yup';
import {
  Button,
  Typography,
  Container,
  Grid,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Hidden,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  TextField,
  Box,
  InputAdornment,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import DeclerationIcon from "../../../../assets/DeclerationIcon";
import TimeIcon from "../../../../assets/TimeIcon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { EauctionProjectStepperSelector, getFinalSubmissionDetail } from "../../../../redux/features/eauction/projectStepperSlice";
import { useEffect } from "react";
import moment from "moment";
import { DownloadPrimaryIcon, MakePaymentIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApiEndPoint } from "../../../../utils/Common";
import { ApplyProjectSelector, clearSaveDeclerationState, saveDecleration } from "../../../../redux/features/eauction/applyProjectSlice";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { numberWithCommas } from "../../../../utils/util";
import FormControl from "../../../molecules/FormControl/FormControl";
import { Form, Formik } from "formik";
import { Alert } from "@material-ui/lab";
import Loading from "../../../atoms/Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: theme.spacing(2),
  },
  containerg: {
    width: "100%",
    paddingTop: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },

  declarationChip: {
    backgroundColor: "blue",
    color: "white",
  },
  feeChip: {
    backgroundColor: "#00ff14ad",
    color: "black",
    borderColor: "blue",
  },
  technicalChip: {
    backgroundColor: "#0072ffd1",
    color: "white",
    border: "1px solid #0072ffd1",
  },
  financialChip: {
    backgroundColor: "#ff008df2",
    color: "white",
    border: "1px solid #ff008df2",
  },
  scaleIconView: {
    fontSize: "2rem",
  },
  projectDetailsCon: {
    margin: 5,
    marginBottom: 10,
    //background: "#0038c00f",
    background: "#0038c000",
    borderRadius: 5,
    padding: 5,
    border: "2px dashed rgb(1 81 202 / 17%)",
  },
  table: {
    fontWeight: 600,
  },
  modelBoxConfirm: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "620px",
    },
  },
  paymentSummSec: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    borderRadius: 5,
    padding: theme.spacing(3),
    // marginBottom: theme.spacing(3),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  amountLabel: {
    fontWeight: 500,
    fontSize: "0.9rem",
    color: "#0F2940",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    "&.grtl": {
      color: "#0F2940",
      fontWeight: "bold",
    },
  },
  amountSubLabel: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
  },
  amountListBox: {
    borderBottom: "1px solid rgba(231, 231, 231, 0.8)",
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      border: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },
  },
  amountBox: {
    fontWeight: 500,
    fontSize: "1rem",
    color: "#0F2940",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    "&.grtl": {
      color: "#0038C0",
      fontWeight: 800,
    },
    "&.cancel": {
      color: "#FA3D5D",
      textDecoration: "line-through",
    },
  },
}));

function FinalSubmission({ onNext }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [transData, setTransData] = useState(null);
  const [transFor, setTransFor] = useState('');
  const [finalSubmitFlag, setFinalSubmitFlag] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const formikRef = useRef();
  const {
    isFetchingFinalSubmission,
    isSuccessFinalSubmission,
    isErrorFinalSubmission,
    finalSubmissionData,
    errorMessageFinalSubmission,
  } = useSelector(EauctionProjectStepperSelector);

  const { isFetchingSaveDecleration,
    isSuccessSaveDecleration,
    isErrorSaveDecleration,
    saveDeclerationData,
    errorMessageSaveDecleration } = useSelector(ApplyProjectSelector);

  const [openEditFinancialBidDialog, setOpenEditFinancialBidDialog] = useState(false);
  const [editedFinancialBid, setEditedFinancialBid] = useState(finalSubmissionData?.FinacialBid?.FinBidAmount);
  const [number, setNumber] = useState('');
  const handleOpenEditFinancialBidDialog = () => {
    setOpenEditFinancialBidDialog(true);
  };

  const handleCloseEditFinancialBidDialog = () => {
    setOpenEditFinancialBidDialog(false);
  };

  const handleOpenDialog = (data) => {
    setTransData(data);
  };

  useEffect(() => {
    dispatch(getFinalSubmissionDetail());
    return () => {
      dispatch(clearSaveDeclerationState())
    }
  }, [])

  //on submission of Edit Financial bid
  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const reqdata = {
      type: "FinantialBid",
      FinBidAmount: values.bidAmount,
      isEdit: '1'
    }
    dispatch(saveDecleration(reqdata))
  };

  const handleDeclarationSubmit = () => {
    setFinalSubmitFlag(true);
    dispatch(saveDecleration({ type: "FinalSubmission" }));
  };

  useEffect(() => {
    if (isSuccessSaveDecleration) {
      if (finalSubmitFlag) {
        onNext();
      } else {
        handleCloseEditFinancialBidDialog();
        dispatch(getFinalSubmissionDetail());
        dispatch(clearSaveDeclerationState());
        setSuccessToast(true);
      }
    }
  }, [isSuccessSaveDecleration, finalSubmitFlag]);

  useEffect(() => {
   
    const initialNumber = finalSubmissionData?.FinacialBid?.FinBidAmount || '';
    setNumber(initialNumber);

   const numberWithoutCommas = initialNumber.toString().replace(/,/g, '');

   
    setNumber(numberWithoutCommas);
  }, [finalSubmissionData]);


  const formatDate = (dateString) => {
    // Use moment to format the date
    return moment(dateString, "YYYY-MM-DD HH:mm:ss").format("DD.MM.YYYY h:mm A");
  };

  const onlyDate = (dateString) => {
    return moment(dateString, "YYYY-MM-DD HH:mm:ss").format("DD.MM.YYYY ");
  };

  const getTransactionDetailsPdf = () => {
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/FileUpload/getAWSPrivateDocFileDownload?fileName=${finalSubmissionData?.Tech_Bid_Documents?.Documentpath}`;
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        setPdfLoading(false);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Technical_Qualification" + "Document";
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 300);
      })
      .catch(function (error) {
        setPdfLoading(false);
        alert("Transaction not found");
      });
  };

  const downloadRecipt = (val) => {
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/AllApplicationTransations/PaymentReceiptPDF/${localStorage.getItem('applicantId')}?TransId=${val.TransId}`;
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    }).then((response) => response.blob()).then((blob) => {
      setPdfLoading(false);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = val + '-Transaction';
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
  
  const initialValues = {
    bidAmount: number ? number : '',
  };

  const validationSchema = yup.object().shape({
    bidAmount: yup
      .number()
      .min(finalSubmissionData?.baseprice, `Close Bid amount must be greater than the base price ₹${numberWithCommas(finalSubmissionData?.baseprice)}`)
      // .notOneOf([initialValues?.bidAmount], 'Close Bid amount Should not be Equal to the current Close bid Amount')
      .required('Close Bid amount is required'),
  });

  return (
    <FormCard>
      {isFetchingFinalSubmission && <Loading isOpen={isFetchingFinalSubmission} />}
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={successToast} onClose={() => setSuccessToast(false)} autoHideDuration={3000} >
        <Alert severity="success" variant="filled"><strong>Close Bid updated successfully.</strong></Alert>
      </Snackbar>
      <Hidden smDown>
        <FormTitleBox
          title="Final Submission"
          // backUrl="back"
          titleIcon={<MakePaymentIcon fontSize="large" />}
        />
      </Hidden>
      <Hidden mdUp>
        <StepperBar
          callingForMobileIs={true}
          title="Final Submission"
        // backUrl="/select-projects"
        />
      </Hidden>
      <DialogContent dividers>
        <Grid Container className={classes.containerg}>
          <Grid item>
            <Grid
              container
              spacing={1}
              direction="column"
              className={classes.projectDetailsCon}
            >
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
                variant="outlined"
              >
                <Chip size="small" label="Declaration" color="primary" />{" "}
                <Chip
                  variant="outlined"
                  size="small"
                  //label="Completed On 13.09.2023 11.22 PM"
                  label={`Completed On ${formatDate(
                    finalSubmissionData?.Declaration?.DeclarationCompDate
                  )}`}
                  //icon={<TimeIcon />}
                  color="primary"
                />
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                spacing={2}
                direction="row"
              >
                <Grid item>
                  <DeclerationIcon className={classes.scaleIconView} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitile1" style={{ fontWeight: 600 }}>
                    I hereby declare that I agree to Participate in the tender
                    Submission Procedure
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              spacing={1}
              direction="column"
              className={classes.projectDetailsCon}
            >
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip
                  variant="outlined"
                  size="small"
                  label="Pay E-Auction Fee"
                  className={classes.feeChip}
                />{" "}
                <Chip
                  variant="outlined"
                  size="small"
                  //label="Completed On 13.09.2023 11.22 PM"
                  label={`Completed On ${formatDate(
                    finalSubmissionData?.Eauction_Fee?.CreatedOn
                  )}`}
                  //icon={<TimeIcon />}
                  color="primary"
                />
              </Grid>
              <Grid item>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.table}>#</TableCell>
                      <TableCell className={classes.table}>
                        Payment Method
                      </TableCell>
                      <TableCell className={classes.table}>
                        Payment Date
                      </TableCell>
                      <TableCell className={classes.table}>
                        Payment Amount
                      </TableCell>
                      <TableCell className={classes.table}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.table}>1</TableCell>
                      <TableCell className={classes.table}>
                        {finalSubmissionData?.Eauction_Fee?.TransMode}
                      </TableCell>
                      <TableCell className={classes.table}>
                        {onlyDate(finalSubmissionData?.Eauction_Fee?.CreatedOn)}
                      </TableCell>
                      <TableCell className={classes.table}>
                        ₹&nbsp;{numberWithCommas(finalSubmissionData?.Eauction_Fee?.Amount)}
                      </TableCell>
                      <TableCell className={classes.table}>
                        {" "}
                        <Button
                          onClick={() => { handleOpenDialog(finalSubmissionData.Eauction_Fee); setTransFor('E-Auction Fee') }}
                          color="primary"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          size="small"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={1}
              direction="column"
              className={classes.projectDetailsCon}
            >
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip
                  label="Pay EMD"
                  size="small"
                  className={classes.feeChip}
                  variant="outlined"
                />{" "}
                <Chip
                  variant="outlined"
                  size="small"
                  label={`Completed On ${formatDate(
                    finalSubmissionData?.Emd_Data?.CreatedOn
                  )}`}
                  //label="Completed on 13.09.2023 11.22 PM"
                  //icon={<TimeIcon />}
                  color="primary"
                />
              </Grid>
              <Grid item>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.table}>#</TableCell>
                      <TableCell className={classes.table}>
                        Payment Method
                      </TableCell>
                      <TableCell className={classes.table}>
                        Payment Date
                      </TableCell>
                      <TableCell className={classes.table}>
                        Payment Amount
                      </TableCell>
                      <TableCell className={classes.table}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.table}>1</TableCell>
                      <TableCell className={classes.table}>
                        {finalSubmissionData?.Emd_Data?.TransMode}
                      </TableCell>
                      <TableCell className={classes.table}>
                        {onlyDate(finalSubmissionData?.Emd_Data?.CreatedOn)}
                      </TableCell>
                      <TableCell className={classes.table}>
                        ₹&nbsp;{numberWithCommas(finalSubmissionData?.Emd_Data?.Amount)}
                      </TableCell>
                      <TableCell className={classes.table}>
                        <Button
                          onClick={() => { handleOpenDialog(finalSubmissionData.Emd_Data); setTransFor('EMD Fee') }}
                          color="primary"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          size="small"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={1}
              direction="column"
              className={classes.projectDetailsCon}
            >
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip
                  size="small"
                  label="Technical Bid"
                  className={classes.technicalChip}
                />{" "}
                <Chip
                  variant="outlined"
                  size="small"
                  label={`Completed On ${formatDate(
                    finalSubmissionData?.Tech_Bid_Documents?.TechBidCompDate
                  )}`}
                  // label="Completed On 13.09.2023 11.22 PM"
                  //icon={<TimeIcon />}
                  color="primary"
                />
              </Grid>
              <Grid item>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.table}>#</TableCell>
                      <TableCell className={classes.table}>
                        Document Name
                      </TableCell>
                      <TableCell className={classes.table}>
                        Document Size
                      </TableCell>
                      <TableCell className={classes.table}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.table}>1</TableCell>
                      <TableCell className={classes.table}>
                        Bidder Self Declaration To Submit Tender
                      </TableCell>
                      <TableCell className={classes.table}>
                        {finalSubmissionData?.Tech_Bid_Documents?.fileSize}
                      </TableCell>
                      <TableCell className={classes.table}>
                        <box>
                          <Button
                            startIcon={<DownloadPrimaryIcon />}
                            onClick={() => getTransactionDetailsPdf()}
                            color="primary"
                            variant="outlined"
                            size="small"
                          >
                            {"Download Document"}
                          </Button>
                        </box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={1}
              direction="column"
              className={classes.projectDetailsCon}
            >
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip
                  size="small"
                  label="Financial (Close) Bid"
                  className={classes.financialChip}
                />{" "}
                <Chip
                  variant="outlined"
                  size="small"
                  label={`Completed On ${formatDate(
                    finalSubmissionData?.FinacialBid?.FinBidCompDate
                  )}`}
                  //icon={<TimeIcon />}
                  color="primary"
                />
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.table}>#</TableCell>
                    <TableCell className={classes.table}>
                      Close (Financial) Bid Submitted
                    </TableCell>
                    <TableCell className={classes.table}>
                      ₹&nbsp;{finalSubmissionData?.FinacialBid?.FinBidAmount}
                    </TableCell>
                    <TableCell className={classes.table}>
                      <Button
                        onClick={() => handleOpenEditFinancialBidDialog()}
                        startIcon={<EditIcon />}
                        color="primary"
                        variant="outlined"
                        size="small"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Dialog
                open={openEditFinancialBidDialog}
                onClose={handleCloseEditFinancialBidDialog}
                fullWidth
              >
                <DialogTitle>
                  <Typography variant="h5">Edit Financial Bid</Typography>
                </DialogTitle>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  innerRef={formikRef}
                  enableReinitialize
                >
                  {({ submitForm, setFieldValue, isSubmitting, values }) => (
                    <Form noValidate autoComplete="off">
                      <DialogContent dividers>
                        <FormControl
                          control='input'
                          name="bidAmount"
                          id="bidAmount"
                          label="Enter Bid Amount"
                          variant="outlined"
                          type='number'
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><b>₹</b></InputAdornment>,
                          }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseEditFinancialBidDialog}
                          color="primary"
                          size="small"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled={isFetchingSaveDecleration}
                        >
                          {isFetchingSaveDecleration && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                          {!isFetchingSaveDecleration && <>Save</>}
                          {isFetchingSaveDecleration && <>Saving...</>}
                        </Button>
                      </DialogActions>
                    </Form>
                  )}
                </Formik>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDeclarationSubmit()}
          disabled={isFetchingSaveDecleration}
        >
          {isFetchingSaveDecleration && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
          {!isFetchingSaveDecleration && <>Final Submit Tender</>}
          {isFetchingSaveDecleration && <>Submitting...</>}
        </Button>
      </DialogActions>
      <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={transData} onClose={() => setTransData(null)} fullWidth={true} className={classes.modelBoxConfirm} >
        {/* {(pdfLoading) && <Loading isOpen={(pdfLoading)} />} */}
        <DialogTitle >
          <Grid container justifyContent='space-between' alignItems='center'>
            Transaction details for {transFor}
            <Grid item xs={3}>
              <Button
                size='small'
                color="primary"
                variant='outlined'
                startIcon={<DownloadPrimaryIcon />}
                style={{ minWidth: 160 }}
                onClick={() => downloadRecipt(transData)}
              >
                Download Receipt
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className={classes.amountLabel}><span className={`${classes.amountLabel} grtl`}>Paid on: </span>&nbsp;{transData && moment(transData.CreatedOn).format("MMM DD, YYYY h:mm a")}</Typography>
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
                <Typography className={`${classes.amountBox} grtl`}>{transData && transData.TransId}</Typography>
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
                <Typography className={classes.amountLabel}>GST(@{transData && transData.Gst_Percentage}%)</Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography className={classes.amountBox}>₹ {transData && numberWithCommas(transData?.gstAmount)}</Typography>
              </Grid>
            </Grid>
            <Box
              display='flex'
              justifyContent='space-between'
              className={classes.amountListBox}
            >
              <Grid item xs={4}>
                <Typography className={`${classes.amountLabel} grtl`}>Total Paid</Typography>
              </Grid>
              <Grid item xs={7} style={{ textAlign: 'right' }}>
                <Typography className={`${classes.amountBox} grtl`} style={{ float: 'right' }}>₹ {transData && numberWithCommas(transData?.Amount)}</Typography>
                <br />
                <Typography className={`${classes.amountBox}`} style={{ fontSize: 11, float: 'right', textTransform: 'capitalize' }}>{transData && transData?.AmountWords}</Typography>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransData(null)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </FormCard >
  );
}

export default FinalSubmission;
