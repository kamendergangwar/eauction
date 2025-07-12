import {
  Box,
  Button,
  Container,
  Grid,
  ListItem,
  ListItemIcon,
  Popover,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  Settings,
  GroupAdd,
  VideoLabel,
  Dashboard,
  AccountCircle,
  AccountBalance,
  GroupAddOutlined,
  PersonAdd,
  LocalAtm,
  AssignmentTurnedIn,
  Apartment,
  Timer,
  PaymentOutlined,
  EmojiPeople,
  Cancel,
  ErrorOutline,
} from "@material-ui/icons";
import DateRangeIcon from '@material-ui/icons/DateRange';
import withWidth from "@material-ui/core/withWidth";
import { CheckBoxOutlineBlankRounded, VerifiedUser } from "@material-ui/icons";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import {
  DownloadPrimaryIcon,
  FloorIcon,
  FloorStepIcon,
  PendingDocIcon,
  RejectedDocIcon,
  RoomTypeIcon,
  RupeePriceIcon,
  ScaleIcon,
  UnitTypeIcon,
  VerifiedDocIcon,
  VerifiedSuccessIcon,
  WingIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import { FcfsDialogsStyles } from "./FcfsDialog.style";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPreferencesList } from "../../../../redux/features/preferences/PreferencesSlice";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { ApiEndPoint } from "../../../../utils/Common";
import { addEditApplicantProgress, ApplicantProgressSelector, ApplicantStepperActiveStep } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";


const FcfsDashboardDialogs = (props) => {
  const {
    width,
    step,
    anchorEl,
    handleClose,
    doclist,
    applicantData,
    reservationCategory,
  } = props;
  const { ApplicantStepperData, isSuccessProgressResStepper, superActiveStep, superStepper } = useSelector(ApplicantProgressSelector);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [category, setcategory] = useState();
  const classes = FcfsDialogsStyles();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const history = useHistory();
  const [verifiedDocs, setVerifiedDocs] = useState("")
  const [totalDocsCount,setTtotalDocsCount] = useState();
  const [totalVerifiedDocsCount,setTtotalVerifiedDocsCount] = useState();
  const [UploadedDocsCount,setUploadedDocsCount] = useState();
  const [rejectedDocsCount,setRejectedDocsCount] = useState(0);

  useEffect(()=>{
    let tempDocUploadedCount=0;
    if(doclist){
      doclist.forEach((doc)=>{
        if(doc.IsUploaded){
          tempDocUploadedCount++;
        }
      })
    }
    setUploadedDocsCount(tempDocUploadedCount);
  },[doclist])

  const getTransactionDetailsPdf = () => {
    dispatch(getPreferencesList()).then((res) => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/ApplicationTransaction/applicationTransactionPaymentReceiptPdf/${localStorage.getItem("applicantId")}?Lang=${localStorage.getItem("i18nextLng")}`;
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
            link.download = "Application Fee" + "receipt";
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
      }
    });
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
  const getFlatTransactionDetailsPdf = () => {
    dispatch(getPreferencesList()).then(res => {
      if (res.payload.success) {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/PDFDownloader/receipt/${applicantData.ApplicationDetails[0].TransactionDetails[0]?.TransactionReferenceNo}?Lang=${localStorage.getItem('i18nextLng')}&gateway=sbiepay`;
        fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }).then((response) => response.blob()).then((blob) => {
          setPdfLoading(false);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = applicantData.ApplicationDetails[0].TransactionDetails[0]?.TransactionReferenceNo + '-Transaction';
          document.body.append(link);
          link.click();
          link.remove();
          // in case the Blob uses a lot of memory
          setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(function (error) {
          setPdfLoading(false);
          alert("Transaction not found");
        });
      }

    });
  };
  useEffect(() => {
    reservationCategory.forEach((element) => {
      if (element.value == applicantData.RservationCatIds)
        setcategory(element.label);
    });

    if (step == 8 || step == 12) {
      setTtotalVerifiedDocsCount(doclist.reduce((value, document) => document.hmoVerifiedFlag == 1 ? value + 1 : value, 0));
      setRejectedDocsCount(doclist.reduce((value, document) => document.hmoVerifiedFlag == 2 ? value + 1 : value, 0));
      setTtotalDocsCount(doclist.length)
    }
  }, [category, open]);

  

  let docStep;

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      
      const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
      docStep = ApplicantStepper.filter((step)=> step.StepId == 6)
      if (docStep) {
        setVerifiedDocs(docStep[0].Documents)
      }
      if (step == 8 || step == 12) {
        setTtotalVerifiedDocsCount(doclist.reduce((value, document) => document.hmoVerifiedFlag == 1 ? value + 1 : value, 0));
        setTtotalDocsCount(doclist.length)
      }
    }
  }, [isSuccessProgressResStepper])

  const ErrorTooltip = withStyles((theme) => ({
    arrow: {
      color: 'rgba(200, 0, 0, 0.87)',
    },
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(200, 0, 0, 0.87)',
      boxShadow: "0 0 20px rgba(223 19 19 / 50%)",
      fontSize: 11,
    },
  }))(Tooltip);
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        //   className={classes.popoverContainer}
      >
        {step == 1 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <ExitToAppIcon color="primary" />
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                User SignUp
              </Typography>
            </Box>
            <Grid container className={classes.dialogGrid}>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Account Created
                </Typography>
                <Typography
                  style={{
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <VerifiedSuccessIcon />
                  {applicantData.CreatedAt}
                </Typography>
              </Box>
            </Grid>
          </Container>
        )}
        {step == 2 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <VerifiedUser color="primary" />
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                KYC Verification
              </Typography>
            </Box>
            <Grid container className={classes.dialogGrid}>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Aadhaar Number
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700" }}>
                  {applicantData.IsAadharVerified
                    ? (
                        "X".repeat(8) +
                        applicantData.AadharNo.toString().slice(8)
                      ).replace(/(.{4})/g, "$1 ")
                    : "--"}
                </Typography>
                {applicantData.IsAadharVerified ? (
                  <Typography
                    style={{
                      color: "#219653",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <VerifiedSuccessIcon />
                    Aaadhar Verified
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Pan Number
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700" }}>
                  {applicantData.isPanVerified
                    ? "X".repeat(6) + applicantData.PANNo.toString().slice(6)
                    : "--"}
                </Typography>
                {applicantData.isPanVerified ? (
                  <Typography
                    style={{
                      color: "#219653",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <VerifiedSuccessIcon /> Pan Verified
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Container>
        )}
        {step == 3 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <AccountCircle color="primary" />
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                Personal Details
              </Typography>
            </Box>
            <Grid container style={{ background: "#F9FAFB" }}>
              <Grid item xs={12} sm={12} md={6}>
                <Box className={classes.dialogContent}>
                  <Typography style={{ color: "#65707D" }} gutterBottom>
                    Full Name
                  </Typography>
                  <Typography gutterBottom style={{ fontWeight: "700" }}>
                    {`${applicantData.FirstName} ${
                      applicantData.MiddleName ? applicantData.MiddleName : ""
                    } ${applicantData.LastName ? applicantData.LastName : ""}`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* <Box className={classes.dialogContent}>
                  <Typography style={{ color: "#65707D" }} gutterBottom>
                    Marital Status
                  </Typography>
                  <Typography gutterBottom style={{ fontWeight: "700" }}>
                    Single
                  </Typography>
                </Box> */}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className={classes.dialogContent}>
                  <Typography style={{ color: "#65707D" }} gutterBottom>
                    Mobile Number
                  </Typography>
                  <Typography gutterBottom style={{ fontWeight: "700" }}>
                    {applicantData.MobileNo ? applicantData.MobileNo : "--"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className={classes.dialogContent}>
                  <Typography style={{ color: "#65707D" }} gutterBottom>
                    Email Address
                  </Typography>
                  <Typography gutterBottom style={{ fontWeight: "700" }}>
                    {applicantData.EmailId ? applicantData.EmailId : "--"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box className={classes.dialogAction}>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                variant="contained"
                color="primary"
                onClick={() => history.push("/my-profile")}
              >
                View Profile
              </Button>
            </Box>
          </Container>
        )}
        {step == 4 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <GroupAdd color="primary" />
              <Typography style={{ marginLeft: "5px", fontSize: "13px" }} variant="p1">
                Co-Applicant
              </Typography>
            </Box>
            {applicantData.CoApplicantDetails[0]? <Grid container className={classes.dialogGrid}>
            {/* <Box className={classes.dialogContent}>
                  <Typography style={{ color: "#65707D" }} gutterBottom>
                    Co-Applicant Name:
                  </Typography>
                  <Typography gutterBottom style={{ fontWeight: "700" }}>
                    {applicantData.CoApplicantDetails[0]?.FirstName}
                  </Typography>
                </Box> */}
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D", fontSize: "12px" }} gutterBottom>
                  Aadhaar Number
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700", fontSize: "12px" }}>
                  {applicantData.CoApplicantDetails[0]?.AadharNo
                    ? (
                        "X".repeat(8) +
                        applicantData.CoApplicantDetails[0]?.AadharNo.toString().slice(8)
                      ).replace(/(.{4})/g, "$1 ")
                    : "--"}
                </Typography>
                <Typography
                  style={{
                    color: "#219653",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <VerifiedSuccessIcon style={{fontSize: "1rem"}}/>
                  Aaadhar Verified
                </Typography>
              </Box>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" ,fontSize: "12px"}} gutterBottom>
                  Pan Number
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700",fontSize: "12px" }}>
                {applicantData.CoApplicantDetails[0]?.PANNo
                    ? "X".repeat(6) + applicantData.CoApplicantDetails[0]?.PANNo.toString().slice(6)
                    : "--"}
                </Typography>
                <Typography
                  style={{
                    color: "#219653",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <VerifiedSuccessIcon style={{fontSize: "1rem"}}/> Pan Verified
                </Typography>
              </Box>
            </Grid>: <Box margin={2}><Typography>Co-applicant Not added</Typography></Box>}
          </Container>
        )}
        {step == 5 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <CategoryOutlinedIcon color="primary" />
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                Category Details
              </Typography>
            </Box>
            <Grid container className={classes.dialogGrid}>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Selected Category
                </Typography>
                <Typography
                  style={{
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {applicantData.RservationCatIds ? category : "--"}
                </Typography>
              </Box>
            </Grid>
          </Container>
        )}
        {step == 6 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <DescriptionOutlinedIcon color="primary" />
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                <Box className={classes.verifiedBox}>
                  <span>{UploadedDocsCount}/{doclist.length} Document Uploaded</span>
                </Box>
              </Typography>
            </Box>
            <Box className={classes.dialogContent}>
              <Typography
                style={{
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className={classes.orderList}>
                  {doclist?.map((doc,index) => {
                    if (doc.IsUploaded == 1) {
                      return <ListItem key={index}>
                      <ListItemIcon>
                      <CheckCircleIcon color="primary"  />
                      </ListItemIcon>
                      {doc.DocumentName}
                    </ListItem>
                    }
                    if (doc.IsUploaded == 0) {
                      return <ListItem key={index}>
                      <ListItemIcon>
                            <ErrorOutline color="disabled" />
                      </ListItemIcon>
                      {doc.DocumentName}
                    </ListItem>
                    }
                  })}
                </div>
              </Typography>
            </Box>
          </Container>
        )}
        {step == 7 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <PaymentOutlined color="primary" />
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                Application Fee Transaction
              </Typography>
            </Box>
            <Grid container className={classes.dialogGrid} spacing={2}>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Transaction Id
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700" }}>
                  {applicantData.twoThousandPaymentDetails[0]?.TransId}
                </Typography>
              </Box>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Total Amount Paid
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700" }}>
                  ₹ {numberWithCommas(applicantData.twoThousandPaymentDetails[0]?.Amount)}
                </Typography>
              </Box>
            </Grid>
            <Box className={classes.dialogAction}>
              <box>
                <Button
                  startIcon={<DownloadPrimaryIcon />}
                  onClick={() => getTransactionDetailsPdf()}
                >
                  Download Receipt
                </Button>
              </box>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => history.push("/transaction-details")}
                >
                  My Transactions
                </Button>
              </Box>
            </Box>
          </Container>
        )}
        {step == 8 && (
          <Container className={classes.container}>
            <Grid  spacing={2} container className={classes.dialogHeader} style={{height: "fit-content"}}>
              <Grid item xs={6}>
                <Box style={{display:'flex'}}>
                  <CheckCircleOutlinedIcon color="primary" />
                  <Typography style={{ marginLeft: "5px" }} variant="p1">
                    <Box className={classes.verifiedBox}>
                      <span>{totalVerifiedDocsCount}/{totalDocsCount} Document Verified</span>
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                {(rejectedDocsCount > 0 && superActiveStep == 8) &&
                  <Button color="primary" variant="outlined" style={{borderRadius: "40px"}} onClick={(e) => {
                    history.push('/upload-documents')
                  }}>Re-Upload Document</Button>
                }
              </Grid>
            </Grid>
            <Box className={classes.dialogContent}>
              <Typography
                style={{
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  {doclist?.map((doc, index) => {
                    if (doc.hmoVerifiedFlag == 1) {
                      return (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <VerifiedSuccessIcon />
                          </ListItemIcon>
                          {doc.DocumentName}
                        </ListItem>
                      );
                    } else if (doc.hmoVerifiedFlag == 2){

                      return (
                        <ErrorTooltip title={doc.hmoVerifiedReason} arrow>
                          <ListItem key={index}>
                            <ListItemIcon>
                            <RejectedDocIcon style={{fontSize: "1.4rem"}}/>
                            </ListItemIcon>
                            {doc.DocumentName}
                          </ListItem>
                        </ErrorTooltip>
                      );
                    } else {

                      return (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <PendingDocIcon/>
                          </ListItemIcon>
                          {doc.DocumentName}
                        </ListItem>
                      );
                    }
                  })}
                </div>
              </Typography>
            </Box>
          </Container>
        )}
        {step == 9 && 
                <>
                  <Container className={classes.container} >
                  <Box className={classes.dialogHeader}>
                  <Apartment color="primary" />
                    <Typography style={{ marginLeft: "5px" }} variant="p1">
                     Booked Flat Summary
                    </Typography>
                    </Box>
                    <Box style={{background: "#F9FAFB"}}>
                    <Box style={{width: "400px",padding: "10px"}}>
                      <Grid container >
                        <Grid item xs={6}>
                          <>
                            <Grid container alignItems="center">
                              <Grid item>
                                <UnitTypeIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    Unit No. :{" "}
                                    <span className={classes.dataValue}>
                                      {applicantData.Applicant_Booking_Status ? applicantData.Applicant_Booking_Status[0]?.FlatNo : "--"}
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
                                  <Typography className={classes.dataTitle}>
                                    RERA Carpet Area :{" "}
                                    <span className={classes.dataValue}>
                                      {" "}
                                      {applicantData.Applicant_Booking_Status ? applicantData.Applicant_Booking_Status[0]?.BuiltupArea : "--"}
                                      SQFT
                                    </span>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                            <Grid item>
                              <FloorStepIcon className={classes.scaleIconView} />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  Floor No :{" "}
                                  <span className={classes.dataValue}>
                                  {applicantData.Applicant_Booking_Status ? applicantData.Applicant_Booking_Status[0]?.FloorNo : "--"}
                                  </span>
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          </>
                        </Grid>
                        <Grid item xs={5}>
                          <>
                            <Grid container alignItems="center">
                              <Grid item>
                                <RoomTypeIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    Room Type :{" "}
                                    <span className={classes.dataValue}>
                                    {applicantData.Applicant_Booking_Status ? applicantData.Applicant_Booking_Status[0]?.flat_type : "--"}
                                    </span>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                              <Grid item>
                                <RupeePriceIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    Price :{" "}
                                    <span className={classes.dataValue}>
                                      ₹ {applicantData.Applicant_Booking_Status ? applicantData.Applicant_Booking_Status[0]?.Cost : "--"}
                                    </span>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                            <Grid item>
                              <WingIcon className={classes.scaleIconView} />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  Tower :{" "}
                                  <span className={classes.dataValue}>
                                  {applicantData.Applicant_Booking_Status ? applicantData.Applicant_Booking_Status[0]?.Wing : "--"}
                                  </span>
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          </>
                        </Grid>
                      </Grid>
                      </Box>
                    </Box>
                  </Container>
                </>
              }
        {step == 10 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <AccountBalance color="primary" />
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                Flat Payment
              </Typography>
            </Box>
            <Grid container className={classes.dialogGrid} spacing={2}>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Transaction Id
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700" }}>
                  {applicantData.ApplicationDetails[0].TransactionDetails[0]?.TransactionReferenceNo} 
                </Typography>
              </Box>
              <Box className={classes.dialogContent}>
                <Typography style={{ color: "#65707D" }} gutterBottom>
                  Total Amount Paid
                </Typography>
                <Typography gutterBottom style={{ fontWeight: "700" }}>
                  ₹ {applicantData.ApplicationDetails[0].TransactionDetails[0]?.AmountPaid}
                </Typography>
              </Box>
            </Grid>
            <Box className={classes.dialogAction}>
              <box>
                <Button
                  startIcon={<DownloadPrimaryIcon />}
                  onClick={() => getFlatTransactionDetailsPdf()}
                >
                  Download Receipt
                </Button>
              </box>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => history.push("/transaction-details")}
                >
                  My Transactions
                </Button>
              </Box>
            </Box>
          </Container>
        )}
        {step == 11 && (
          <Container className={classes.container}>
            <Box className={classes.dialogHeader}>
              <DateRangeIcon color="primary"/>
              <Typography style={{ marginLeft: "5px" }} variant="p1">
                My Appointment
              </Typography>
            </Box>
            <Box className={classes.dialogAction}>
              <Box style={{padding: "10px"}}>
                <Button
                endIcon={<ArrowForwardIosIcon />}
                  color="primary"
                  variant="contained"
                  onClick={() => history.push("/reschedule")}
                >
                  Go to My Appointments
                </Button>
              </Box>
            </Box>
          </Container>
        )}
        {step == 12 && (
          <Container className={classes.container}>
            <Grid  spacing={2} container className={classes.dialogHeader} style={{height: "fit-content"}}>
              <Grid item xs={6}>
                <Box style={{display:'flex'}}>
                  <CheckCircleOutlinedIcon color="primary" />
                  <Typography style={{ marginLeft: "5px" }} variant="p1">
                    <Box className={classes.verifiedBox}>
                      <span>{totalVerifiedDocsCount}/{totalDocsCount} Document Verified</span>
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                {rejectedDocsCount > 0 &&
                  <Button color="primary" variant="outlined" style={{borderRadius: "40px"}} onClick={(e) => {
                    history.push('/upload-documents')
                  }}>Re-Upload Document</Button>
                }
              </Grid>
            </Grid>
            <Box className={classes.dialogContent}>
              <Typography
                style={{
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  {doclist?.map((doc, index) => {
                    if (doc.hmoVerifiedFlag == 1) {
                      return (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <VerifiedSuccessIcon />
                          </ListItemIcon>
                          {doc.DocumentName}
                        </ListItem>
                      );
                    } else if (doc.hmoVerifiedFlag == 2){

                      return (
                        <ErrorTooltip title={doc.hmoVerifiedReason} arrow>
                          <ListItem key={index}>
                            <ListItemIcon>
                            <RejectedDocIcon style={{fontSize: "1.4rem"}}/>
                            </ListItemIcon>
                            {doc.DocumentName}
                          </ListItem>
                        </ErrorTooltip>
                      );
                    } else {

                      return (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <ErrorOutline color="disabled" />
                          </ListItemIcon>
                          {doc.DocumentName}
                        </ListItem>
                      );
                    }
                  })}
                </div>
              </Typography>
            </Box>
          </Container>
        )}
      </Popover>
    </>
  );
};

export default withWidth()(FcfsDashboardDialogs);
