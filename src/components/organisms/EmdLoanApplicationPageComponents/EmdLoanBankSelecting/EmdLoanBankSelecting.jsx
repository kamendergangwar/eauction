import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { FormControlLabel, Radio } from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import { EmdLoanFormStyles } from "../EmdLoanForm.styles";
import {
  MakePaymentIcon,
  WhiteArrowIcon,
  ProjectSearchIcon,
  BillingIcon,
  QuestionMarkIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getBillingDetails,
  masterDataSelector,
  calculateTotalBill,
  getBankList,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  razorpayTransmode,
  razorpayPaymentGatewaySelector,
  clearRazorpayTransmodeStates
} from "../../../../redux/features/transaction/RazorpayPaymentSlice";
import Loading from "../../../atoms/Loading/Loading";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";

import hdfcLogo from "../../../../assets/bankIcons/hdfc-logo.png";
// import hsbcLogo from "../../../../assets/bankIcons/hsbc-logo.png";
// import iciciLogo from "../../../../assets/bankIcons/icici-logo.png";
// import kotakLogo from "../../../../assets/bankIcons/kotak-logo.png";

const EmdLoanBankSelecting = (props) => {
  const { width } = props;
  const classes = EmdLoanFormStyles();
  const { t } = useTranslation("BankDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  // const [formValues, setFormValues] = useState(null);
  // const [searchedText, setSearchedText] = useState("");
  const dispatch = useDispatch();

  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    isErrorApplicant,
    isFetchingApplicantGet,
    isSuccessResApplicant,
    errorMessage,
    applicantData
  } = useSelector(applicantSelector);
  const { stepperData, isFetchingStepper } = useSelector(
    (state) => state.stepper
  );
  const {
    totalBill,
    billingDetails,
    downloadBanklist,
    isFetchingBanklist,
    isErrorBanklist,
    isSuccessBanklist,
    errorMsgBanklist,
  } = useSelector(masterDataSelector);
  const {
    isFetchingRazorpayTransmode,
    isSuccessResRazorpayTransmode,
    isErrorRazorpayTransmode,
    errorMsgRazorpayTransmode,
    razorpayTransmodeData
  } = useSelector(razorpayPaymentGatewaySelector);
  // const { isEStampSelected } = useSelector(documentsSelector);
  const [bankDetailsList, setBankDetailsList] = useState([]);
  const [paymentDetailsObj, setPaymentDetailsObj] = useState({});
  const [selectedBankId, setSelectedBankId] = useState("");

  useEffect(() => {
    // dispatch(getApplicant());
    let getBillingDetails = localStorage.getItem("paymentDetails");
    if (getBillingDetails) {
      let billDtlsObj = JSON.parse(getBillingDetails);
      setPaymentDetailsObj(billDtlsObj);
      let params = "LoanAmount=" + billDtlsObj.totalAmount;
      dispatch(getBankList(params));
    } else {
      history.goBack();
    }
    // dispatch(getApplication());
    // dispatch(superStepperActiveStep(3));
  }, [dispatch]);

  /* const selectBankList = [
    {
      bankName: "HDFC",
      bankIcon: hdfcLogo,
      value: "hdfc",
      processingFees: 1000
    },
    {
      bankName: "HSBC",
      bankIcon: hsbcLogo,
      value: "hsbc",
      processingFees: 1200
    },
    {
      bankName: "Kotak Mahendra",
      bankIcon: kotakLogo,
      value: "kotakMahendra",
      processingFees: 800
    },
    {
      bankName: "ICICI",
      bankIcon: iciciLogo,
      value: "icici",
      processingFees: 1000
    }
  ]; */

  const initialValues = {
    searchedText: ""
  };

  /* const validationSchema = yup.object({
    searchedText: yup
      .string()
      .required(
        t("selectBankSection.selectBankErrors.required")
      ).matches(
        /^[\u0900-\u097F.a-zA-Z ]*$/,
        t("selectBankSection.selectBankErrors.limitation")
      ),
  }); */

  useEffect(() => {
    if (isSuccessBanklist && downloadBanklist) {
      setBankDetailsList(downloadBanklist);
    }
  }, [downloadBanklist, isSuccessBanklist]);

  useEffect(() => {
    if (isErrorBanklist) {
      setBankDetailsList([]);
    }
  }, [isErrorBanklist]);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.searchedText) {
      getBankListWithFilter(values.searchedText);
    }
  };

  const clearFilter = () => {
    formikRef.current.setFieldValue("searchedText", "");
    getBankListWithFilter("");
  };

  const getBankListWithFilter = (filterVal) => {
    let params = "LoanAmount=" + paymentDetailsObj.totalAmount;
    if (filterVal) {
      params += "&SearchParam=" + filterVal;
    }
    setSelectedBankId("");
    dispatch(getBankList(params));
  };

  const submitAndNext = () => {
    let filteredExistingPrjcts = bankDetailsList.filter(obj => obj.BankId === selectedBankId);
    let new_obj = {
      ...paymentDetailsObj,
      ...filteredExistingPrjcts[0]
    };
    localStorage.setItem("paymentDetails", JSON.stringify(new_obj));
    history.push("/emd-loan-details-view");
  };

  /* useEffect(() => {
    if (isSuccessResRazorpayTransmode && razorpayTransmodeData) {
      console.log("razorpayTransmodeData", razorpayTransmodeData);
      localStorage.setItem("loanDetailsData", JSON.stringify(razorpayTransmodeData));
      history.push("/emd-loan-details-view");
    }
  }, [isSuccessResRazorpayTransmode, razorpayTransmodeData]); */

  /* useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); */

  /* const numberWithCommas = (amount_val) => {
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
  }; */

  return (
    <>
      {(isFetchingApplicantGet || isFetchingStepper || isFetchingBanklist || isFetchingRazorpayTransmode) && (
        <Loading isOpen={isFetchingApplicantGet || isFetchingStepper || isFetchingBanklist || isFetchingRazorpayTransmode} />
      )}
      <FormCard>
        <Hidden smDown>
          <FormTitleBox
            title={t("title")}
            backUrl="/emd-loan-application"
            titleIcon={<MakePaymentIcon fontSize="large" />}
          />
        </Hidden>
        <Hidden mdUp>
          <StepperBar
            callingForMobileIs={true}
            title={t("title")}
            backUrl="/emd-loan-application"
          />
        </Hidden>
        <div className={classes.container}>
          <Box className={`${classes.formSection} banksec`}>
            <Typography
              variant="body2"
              className={`${classes.secTitle} bank`}
            >
              {t("selectBankSection.title")}
            </Typography>
            <Typography className={classes.noteText}>
              <span>{t("selectBankSection.noteText")}</span> :{" "}
              {t("selectBankSection.noteParagraph")} <br /> {t("selectBankSection.noteParagraph2")}
            </Typography>
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
              innerRef={formikRef}
              enableReinitialize
            >
              {({ submitForm, setFieldValue, values }) => (
                <Form noValidate autoComplete="off">
                  <div className={classes.filterInputCtrl}>
                    <FormControl
                      className="inputRounded"
                      control="input"
                      variant="outlined"
                      placeholder={t("selectBankSection.searchTxt")}
                      name="searchedText"
                      type="text"
                      id="searchedText"
                      inputProps={{ maxLength: 50 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="submit"
                              aria-label="Submit"
                              edge="end"
                            >
                              <ProjectSearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {values.searchedText &&
                      <Box textAlign="right">
                        <Button color="primary" size="small" onClick={clearFilter}>{t("selectBankSection.clearFilterBtnTxt")}</Button>
                      </Box>
                    }
                  </div>
                </Form>
              )}
            </Formik>
            <Box className={classes.selectBankCont}>
              {isErrorBanklist && (
                <AlertBox severity="error">{errorMsgBanklist}</AlertBox>
              )}
              {/* <FormHelperText error variant="filled" style={{ marginBottom: 15 }}>
                <ErrorMessage name="selectedBank" />
              </FormHelperText> */}
              {/* <Field component={RadioGroup}> */}
              <RadioGroup aria-label="select bank" name="bankIdSelect" value={selectedBankId} onChange={(event) => setSelectedBankId(event.target.value)}>
                {bankDetailsList.map((element, i) => (
                  <FormControlLabel
                    key={i}
                    className={`${classes.selectBankBox} ${element.BankId == selectedBankId
                      ? "active"
                      : ""
                      }`}
                    value={element.BankId}
                    control={<Radio color="primary" />}
                    label={
                      <Box>
                        <Typography
                          className={`${classes.bankNameNdIcon}`}
                        >
                          <img
                            src={element.BankLogo || hdfcLogo}
                            alt="Bank Logo"
                          />
                          <span>{element.BankName}</span>
                        </Typography>
                        <Box className={classes.proccFeeSec}>
                          <Typography className="pressFeeText">
                            {t("selectBankSection.processingFeeText")} : <span className="amountView">₹ {element.ProcessingFee} /-</span>
                          </Typography>
                        </Box>
                        <Box className={`${classes.noRefundableTxt} ${element.BankId == selectedBankId
                          ? "active"
                          : ""
                          }`}
                        >
                          {t("selectBankSection.nonRefundableText")}
                        </Box>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
              {/* </Field> */}
            </Box>
          </Box>
        </div>
        <div className={classes.actionSection}>
          <Grid container alignItems="center" justify="flex-end">
            <Grid item xs="auto">
              {isFetchingApplicant &&
                <Box>
                  <Typography className={classes.progressView}>
                    {t("savingLoaderTxt")}...
                  </Typography>
                </Box>
              }
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="contained"
                color="primary"
                endIcon={
                  <WhiteArrowIcon style={{ fill: "transparent" }} />
                }
                onClick={submitAndNext}
                disabled={!selectedBankId}
              >
                {t("saveButtonText")}
              </Button>
            </Grid>
          </Grid>
        </div>
      </FormCard>
    </>
  );
};

export default withWidth()(EmdLoanBankSelecting);
