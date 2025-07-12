import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Checkbox, FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import Radiogroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "../../molecules/FormControl/FormControl";
import SbiPayIcon from "../../../assets/paymentModeIcons/sbiPay.jpeg";
import RazorpayIcon from "../../../assets/paymentModeIcons/razorPay.jpeg";
import { FormControl as MUIform } from "@material-ui/core";
import {
  MakePaymentIcon,
  WhiteArrowIcon,
  ProjectSearchIcon,
  BillingIcon,
  LoanAppliedIcon,
  InfoMarkIcon,
} from "../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import FormCard from "../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Divider from "@material-ui/core/Divider";
import FormMandatoryText from "../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../atoms/IconTitle/IconTitle";
import AlertBox from "../../atoms/AlertBox/AlertBox";
import MakePaymentDialogBox from "../../molecules/DialogBoxes/MakePaymentDialogBox/MakePaymentDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../redux/features/applicant/ApplicantSlice";
import { getApplication } from "../../../redux/features/application/ApplicationSlice";
import {
  getBillingDetails,
  masterDataSelector,
  calculateTotalBill,
  getApplicationPaymentSummary,
  getEauctionPaymentSummary,
} from "../../../redux/features/masterdata/MasterDataSlice";
import { withStyles } from "@material-ui/core/styles";
import {
  addEditStepper,
  getStepperDetails,
  clearSuperStepperEditVars,
} from "../../../redux/features/stepper/StepperSlice";
import {
  addEditApplicantProgress,
  ApplicantProgressSelector,
  getApplicantProgress,
} from "../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
/* import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice"; */
import {
  applicationPaymentCreateTrans,
  razorpayPaymentGatewaySelector,
  clearRazorpayPaymentGatewayState,
  clearRazorpayAfterPaymentStates,
  razorpayTransmode,
  clearRazorpayTransmodeStates,
  clearRazorpayPaymentGatewayData,
  clearApplicationPaymentCreateTransState,
  applicationPaymentSbiTransmode,
  clearApplicationPaymentSbiTransmodeStates,
  eauctionPaymentCreateTrans,
  eauctionPaymentSbiTransmode,
} from "../../../redux/features/transaction/RazorpayPaymentSlice";
// import CcavenuePaymentGateway from "../CcavenuePaymentGateway/CcavenuePaymentGateway";
// import RazorpayPaymentGateway from "../RazorpayPaymentGateway/RazorpayPaymentGateway";
import Loading from "../../atoms/Loading/Loading";
import FormTitleBox from "../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../atoms/StepperBar/StepperBar";
import Tooltip from "@material-ui/core/Tooltip";

import hdfcLogo from "../../../assets/bankIcons/hdfc-logo.png";
import hsbcLogo from "../../../assets/bankIcons/hsbc-logo.png";
import iciciLogo from "../../../assets/bankIcons/icici-logo.png";
import kotakLogo from "../../../assets/bankIcons/kotak-logo.png";
import { EmdPaymentStyle } from "./EmdPaymentStyle.style";
import RazorpayPaymentGateway from "../EmdLoanApplicationPageComponents/RazorpayPaymentGateway/RazorpayPaymentGateway";

const EauctionFee = (props) => {
  const { width } = props;
  const classes = EmdPaymentStyle();
  const { t } = useTranslation("BankDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isConfirmCheckbox, setConfirmCheckbox] = useState(false);
  const [inProcessTrans, setInProcessTrans] = useState(false);
  const updateConfirmCheckbox = () => setConfirmCheckbox(!isConfirmCheckbox);

  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    isErrorApplicant,
    isFetchingApplicantGet,
    errorMessage,
    applicantData,
  } = useSelector(applicantSelector);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const {
    totalBill,
    billingDetails,
    downloadBanklist,
    isFetchingBanklist,
    isErrorBanklist,
    isSuccessBanklist,
    errorMsgBanklist,

    dataEauctionPaymentSummry,
    isFetchingEauctionPaymentSummry,
    isErrorEauctionPaymentSummry,
    isSuccessEauctionPaymentSummry,
    errorMsgEauctionPaymentSummry,
  } = useSelector(masterDataSelector);
  const {
    isFetchingEauctionPaymentCreateTrans,
    isSuccessResEauctionPaymentCreateTrans,
    isErrorEauctionPaymentCreateTrans,
    errorMsgEauctionPaymentCreateTrans,
    eauctionPaymentCreateTransData,

    isFetchingRazorpayAfterPayment,
    isSuccessResRazorpayAfterPayment,
    isErrorRazorpayAfterPayment,
    errorMsgRazorpayAfterPayment,
    razorpayAfterPaymentData,

    isFetchingRazorpayTransmode,
    isSuccessResRazorpayTransmode,
    isErrorRazorpayTransmode,
    errorMsgRazorpayTransmode,
    razorpayTransmodeData,

    isFetchingEauctionPaymentSbiTransmode,
    isSuccessEauctionPaymentResSbiTransmode,
    isErrorEauctionPaymentSbiTransmode,
    errorMsgEauctionPaymentSbiTransmode,
    eauctionPaymentsbiTransmodeData,
  } = useSelector(razorpayPaymentGatewaySelector);
  const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } =
    useSelector(ApplicantProgressSelector);
  // const { isEStampSelected } = useSelector(documentsSelector);
  const [tempBillingDetails, setTempBillingDetails] = useState({});
  const [paymentGateway, setPaymentGateway] = useState({});
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  // const [bankDetailsList, setBankDetailsList] = useState([]);

  useEffect(() => {
    dispatch(getApplicant());
    // const data = {
    //   ProjectId: localStorage.getItem("productId"),

    // };
    dispatch(getEauctionPaymentSummary());
  }, []);

  useEffect(() => {
    if (isSuccessEauctionPaymentSummry && dataEauctionPaymentSummry) {
      let new_obj = {
        totalAmount: parseFloat(
          dataEauctionPaymentSummry?.TransactionAmount
        ).toFixed(2),
        totalAmountInWords: dataEauctionPaymentSummry?.TotalWords,
        totalGst: parseFloat(
          dataEauctionPaymentSummry?.TransactionGstAmount
        ).toFixed(2),
        totalIncludingGst: parseFloat(
          dataEauctionPaymentSummry?.TransactionTotal
        ).toFixed(2),
        totalGstPercent:
          dataEauctionPaymentSummry?.TransactionGstPercentage,
        totalWords: dataEauctionPaymentSummry?.TotalWords,
      };
      setTempBillingDetails(new_obj);

      console.log(tempBillingDetails);
    }
  }, [isSuccessEauctionPaymentSummry, dataEauctionPaymentSummry]);

  //   const onSubmit = (values, { setSubmitting }) => {
  //   setSubmitting(false);
  //     console.log(values,"vaklsdjf")
  //     let send_obj = {
  //         ApplicantId: applicantData.ApplicantId,
  //         Amount: tempBillingDetails.totalIncludingGst,
  //         TransFor: 'Payment-SBI',
  //         TransMode: "online",
  //         ProjectId: localStorage.getItem('productId')
  //     };

  //     dispatch(applicationPaymentCreateTrans(send_obj));

  // };
  const submit = () => {
    let send_obj = {
      ApplicantId: applicantData.ApplicantId,
      Amount: tempBillingDetails.totalIncludingGst,
      TransFor: "Payment-SBI",
      TransMode: "online",
      ProjectId: localStorage.getItem("productId"),
      RequestType: "eAuctionFee",
      Platform: "web",
    };

    dispatch(eauctionPaymentCreateTrans(send_obj));
  };

  useEffect(() => {
    if (
      isSuccessResEauctionPaymentCreateTrans &&
      eauctionPaymentCreateTransData
    ) {
      let sendObjNew = {
        TransId: eauctionPaymentCreateTransData.TransId,
        ApplicantId: localStorage.getItem("applicantId"),
        origin: "mobile",
        RequestType: "eAuctionFee",
      };
      dispatch(eauctionPaymentSbiTransmode(sendObjNew));
    }
  }, [
    isSuccessResEauctionPaymentCreateTrans,
    eauctionPaymentCreateTransData,
  ]);

  useEffect(() => {
    if (isSuccessEauctionPaymentResSbiTransmode) {
      // dispatch(clearApplicationPaymentSbiTransmodeStates)
      setPaymentGateway(eauctionPaymentsbiTransmodeData);
      setInProcessTrans(true);
      setTimeout(() => {
        document.forms["redirect"].submit();
      }, [1000]);
    }
  }, [isSuccessEauctionPaymentResSbiTransmode]);

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
      {(isFetchingApplicantGet ||
        isFetchingStepper ||
        isFetchingEauctionPaymentCreateTrans ||
        isFetchingRazorpayTransmode ||
        isFetchingEauctionPaymentSbiTransmode ||
        inProcessTrans) && (
          <Loading
            isOpen={
              isFetchingApplicantGet ||
              isFetchingStepper ||
              isFetchingEauctionPaymentCreateTrans ||
              isFetchingRazorpayTransmode ||
              isFetchingEauctionPaymentSbiTransmode ||
              inProcessTrans
            }
          />
        )}
      <FormCard>
        <Hidden smDown>
          <FormTitleBox
            title="Pay E-Auction Fee"
            // backUrl="back"
            titleIcon={<MakePaymentIcon fontSize="large" />}
          />
        </Hidden>
        <Hidden mdUp>
          <StepperBar
            callingForMobileIs={true}
            title="Pay E-Auction Fee"
          // backUrl="/select-projects"
          />
        </Hidden>
        <div className={classes.container} style={{ padding: 0 }}>
          {isErrorBanklist && (
            <AlertBox severity="error">{errorMsgBanklist}</AlertBox>
          )}

          <div className={classes.formSection}>
            <Box className={classes.paymentSummSec}>
              <Grid
                container
                justifyContent="space-between"
                className={classes.amountListBox}
              >
                <Grid item xs="auto">
                  <Typography className={classes.amountLabel}>
                    {t("billingDetails.tableHeaders.head1")}
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography className={classes.amountBox}>
                    ₹ {numberWithCommas(tempBillingDetails.totalAmount)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                className={classes.amountListBox}
              >
                <Grid item xs="auto">
                  <Typography className={classes.amountLabel}>
                    {t("billingDetails.tableHeaders.head9")}&nbsp;(
                    {tempBillingDetails.totalGstPercent}%)
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography className={classes.amountBox}>
                    ₹ {numberWithCommas(tempBillingDetails.totalGst)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                className={classes.amountListBox}
              >
                <Grid item xs="auto">
                  <Typography className={`${classes.amountLabel} grtl`}>
                    {t("applyLoanYesNoSection.paymentSummary.grandTotalTxt")}
                  </Typography>
                </Grid>
                <Grid item xs="auto" className={classes.gridContainer}>
                  <Typography className={`${classes.amountBox} grtl`}>
                    ₹ {numberWithCommas(tempBillingDetails.totalIncludingGst)}
                  </Typography>

                  <Typography className={classes.totalWords}>
                    {tempBillingDetails.totalWords}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </div>
          <Box className={classes.noteTxtSection}>
            <Typography style={{ fontWeight: "700" }}>
              <span>{t("billingDetails.note.label")}</span>E-Auction Fee Will Be
              Non-Refundable .
            </Typography>
          </Box>
          <Grid item xs={12} md className={classes.checkboxSection}>
            <MUIform component="fieldset" error={!isConfirmCheckbox}>
              <FormControlLabel
                name="isPuccaHouse"
                checked={isConfirmCheckbox}
                onChange={updateConfirmCheckbox}
                control={<Checkbox color="primary" />}
                label={t("billingDetails.acknowledgeContent")}
                labelPlacement="end"
              />
            </MUIform>
          </Grid>
        </div>
        {isErrorApplicant && (
          <AlertBox severity="error">{errorMessage}</AlertBox>
        )}
        {isErrorEauctionPaymentCreateTrans && (
          <AlertBox severity="error">
            {errorMsgEauctionPaymentCreateTrans}
          </AlertBox>
        )}
        {isErrorEauctionPaymentSbiTransmode && (
          <AlertBox severity="error">
            {errorMsgEauctionPaymentSbiTransmode}
          </AlertBox>
        )}
        <div className={classes.actionSection}>
          <Grid container alignItems="center" justifyContent="flex-end">
            <Grid item xs="auto">
              {isFetchingApplicant && (
                <Box>
                  <Typography className={classes.progressView}>
                    {t("savingLoaderTxt")}...
                  </Typography>
                </Box>
              )}
              <Box>
                {isPaymentDone && (
                  <Typography className={classes.paymentTxt}>
                    {t("billingDetails.paymentAlertMsg")}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="contained"
                color="primary"
                endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                onClick={() => {
                  submit();
                }}
                disabled={
                  !isConfirmCheckbox ||
                  isFetchingEauctionPaymentSbiTransmode ||
                  inProcessTrans ||
                  isPaymentDone
                }
              >
                {t("makePaymentBtn")}
              </Button>
              {/* {t("saveButtonText")} */}
            </Grid>
          </Grid>
        </div>
      </FormCard>
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
    </>
  );
};

export default withWidth()(EauctionFee);
