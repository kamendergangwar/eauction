import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, inputProps } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { initialPagesStyles } from "../../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import Typography from "@material-ui/core/Typography";
import {
  NextArrowIcon,
  WhiteArrowIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import KycTemplate from "../../../../templates/KycTemplate/KycTemplate";
import KycTitleDescriBox from "../../../../atoms/KycTitleDescriBox/KycTitleDescriBox";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import BankAcc from "../../../../../assets/BankAcc.svg";
import Hidden from "@material-ui/core/Hidden";
import KycStepperBox from "../../../../atoms/KycStepperBox/KycStepperBox";
import withWidth from "@material-ui/core/withWidth";
import BankPhn from "../../../../../assets/BankPhn.svg";
import { applicantSelector, getBankdetails } from "../../../../../redux/features/applicant/ApplicantSlice";

function AccountDetail(props) {
  const { width } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const [formValue, setFormValue] = useState(null);
  const [formEditIs, setFormEditIs] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [proceedParam, setProceedParam] = useState("1");
  const {
    isFetchingApplicantBank,
    isSuccessResApplicantBank,
    isErrorApplicantBank,
    errorMessage,
    isgetBankDetails,
    isSuccessgetBankDetails,
    isErrorgetBankDetails,
    getBankDetailsData,
    errorMessagegetBankDetails

  } = useSelector(applicantSelector);
  const {
    isFetchingApplicant,
    isSuccessResPanCard,
    isErrorPanCard,
    errorMessagePanCard,
    isFetchingPanCard,
    panCardData,
    isFetchingApplicantGet,

    isSuccessResApplicantGet,
    applicantData,

    isSuccessResTempVerify,
    isFetchingTempVerify,
    isErrorTempVerify,
    errorMsgTempVerify
  } = useSelector(applicantSelector);
  useEffect(() => {
    dispatch(getBankdetails());
  }, [])


  const initialValues = {
    account_holder_name:  "",
    account_number: "",
    confirm_account_number:"",
    ifsc_code: "",
    micr_code: "",

  };
  useEffect(() => {
    if (isSuccessgetBankDetails) {
      if (getBankDetailsData && getBankDetailsData[0]) {
        setFormEditIs(true);
        // let AadharNo = applicantData.AadharNo.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
        let AccountName = getBankDetailsData[0]?.account_holder_name;
        let AccountNo = getBankDetailsData[0]?.account_number;
        let ConfirmAccountNo = getBankDetailsData[0]?.confirm_account_number;
        let IFSC = getBankDetailsData[0]?.ifsc_code;
        let MICR = getBankDetailsData[0]?.micr_code;


        const savedValue = {
          account_holder_name: AccountName,
          account_number: AccountNo,
          confirm_account_number: ConfirmAccountNo,
          ifsc_code: IFSC,
          micr_code: MICR,
        };
        setFormValue(savedValue);
      }
    }
  }, [isSuccessgetBankDetails]);
 
  const validationSchema = yup.object({
    account_number: formEditIs == false && yup.string()
      .required(t("kycBank.formControl.accountNumber.required"))
      .min(9, t("kycBank.formControl.accountNumber.limitation")),
    // confirm_account_number: yup.string()
    // .required(t("kycBank.formControl.confirmaccountNumber.required"))
    // .min(9, t("kycBank.formControl.confirmaccountNumber.limitation")), 
    confirm_account_number: formEditIs == false && yup
      .string()
      .required(t("kycBank.formControl.confirmaccountNumber.required"))
      .min(9, t("kycBank.formControl.confirmaccountNumber.limitation"))
      .test(
        "accountNumbersMatch",
        "Confirm Account Number Should be Same As Account number",
        function (value) {
          return value === this.parent.account_number;
        }
      ),
    ifsc_code: formEditIs == false && yup.string()
      .matches(
        /^[A-Za-z]{4}0[A-Z0-9]{6}$/,
        t("kycBank.formControl.ifsc.limitation")
      )
      .required(t("kycBank.formControl.ifsc.required"))
      .min(11, t("kycBank.formControl.ifsc.limitation")),
    micr_code: formEditIs == false && yup.string()
      .required(t("kycBank.formControl.micr.required"))
      .min(9, t("kycBank.formControl.micr.limitation")),
    });

  function validateAccountNumber(value) {
    let error;
    if (!value) {
      error = t("kycBank.formControl.accountNumber.required");
    } else if (!(value.length > 9 && value > 0)) {
      error = t(
        "kycBank.formControl.accountNumber.limitation"
      );
    }
    return error;
  }
  function validateConfirmAccountNumber(value) {
    let error;
    if (!value) {
      error = t("kycBank.formControl.confirmaccountNumber.required");
    } else if (!(value.length > 9 && value > 0)) {
      error = t(
        "kycBank.formControl.confirmaccountNumber.limitation"
      );
    }
    return error;
  }

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    localStorage.setItem("accountDetails", JSON.stringify(values));
    history.push("/bank-detail");
  };

  const skipFlow = () => {
    history.push("/bank-detail");
  }

  return (
    <KycTemplate>
      {/* {(isFetchingApplicant || isFetchingStepper) && (
        <Loading isOpen={isFetchingApplicant || isFetchingStepper} />
      )} */}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
           title={applicantData?.register_type === 'company' ? t("kycBank.title1"): t("kycBank.title")}
           // title={t("kycBank.title1")}
            description={applicantData?.register_type === 'company' ? t("kycBank.descp1"): t("kycBank.descp")}
          />
        </Hidden>
        <Hidden mdUp>
          <KycStepperBox
            callingForMobileIs={true}
              title={applicantData?.register_type === 'company' ? t("kycBank.title1"): t("kycBank.title")}
          //  title={t("kycBank.title")}
            //description={t("kycBank.descp")}
            description={applicantData?.register_type === 'company' ? t("kycBank.descp1"): t("kycBank.descp")}
          />
        </Hidden>
        <Formik
           enableReinitialize={true}
          initialValues={formEditIs ? formValue : initialValues}
          
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, values }) => (
            <Form noValidate autoComplete="off" className={classes.kycFormContainer}>
              <div className={classes.kycCardFormRoot}>
              
                {/* <Box textAlign="center" className={classes.formControlRoot}>
                  <img
                    className={classes.iconStyle}
                    src={width === "xs" ? BankPhn : BankAcc}
                    alt="Bank account"
                  />
                </Box> */}
                {/* {isError && (
                    <AlertBox severity="error">{customErrorMsg}</AlertBox>
                  )} */}
                <Box className={classes.formControlRoot}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t("kycBank.formControl.accountholdername.label")}
                    placeholder={t("kycBank.formControl.accountholdername.placeholder")}
                    name="account_holder_name"
                    type="text"
                    id="account_holder_name"
                    inputProps={{ maxLength: 50 }}
                    required
                    onInput={(e) =>
                      (e.target.value = ("" + e.target.value).toUpperCase())
                    }
                    disabled={formEditIs}
                  />
                </Box>
                <Box className={classes.formControlRoot}>
                  <FormControl
                    validate={validateAccountNumber}
                    control="input"
                    variant="outlined"
                    label={t("kycBank.formControl.accountNumber.label")}
                    placeholder={t(
                      "kycBank.formControl.accountNumber.placeholder"
                    )}
                    name="account_number"
                    type="text"
                    id="account_number"
                    required
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/gi, "");

                    }}
                    inputProps={{
                      minLength: 9,
                      maxLength: 18,
                    }}
                    disabled={formEditIs}
                    autoFocus={true}
                  />
                </Box>
                <Box className={classes.formControlRoot}>
                  <FormControl
                    validate={validateConfirmAccountNumber}
                    control="input"
                    variant="outlined"
                    label={t("kycBank.formControl.confirmaccountNumber.label")}
                    placeholder={t(
                      "kycBank.formControl.confirmaccountNumber.placeholder"
                    )}
                    name="confirm_account_number"
                    type="text"
                    id="confirm_account_number"
                    required
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                    }}
                    inputProps={{
                      minLength: 9,
                      maxLength: 18,
                    }}
                    autoFocus={true}
                    disabled={formEditIs}
                  />
                </Box>
                {/* <Box className={classes.formControlRoot}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {t("kycBank.formControl.radio.label")}
                    
                  </Typography>
                  <Field
                    component={RadioGroup}
                    name="proceededWith"
                    row
                    style={{
                      alignItem: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label={t("kycBank.formControl.radio.ifsc")}
                      onChange={(e) => {
                        setProceedParam(e.target.value);
                      }}
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio color="primary" />}
                      label={t("kycBank.formControl.radio.micr")}
                      onChange={(e) => {
                        setProceedParam(e.target.value);
                      }}
                    />
                  </Field>
                </Box> */}
                <Box className={classes.formControlRoot}>

                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t("kycBank.formControl.ifsc.label")}
                    placeholder={t("kycBank.formControl.ifsc.placeholder")}
                    name="ifsc_code"
                    // type="number"
                    id="ifsc_code"
                    inputProps={{
                      maxLength: 11,
                    }}
                    onInput={(e) =>

                      (e.target.value = ("" + e.target.value).toUpperCase())

                    }
                    required
                    disabled={formEditIs}
                  />
                </Box>
                <Box className={classes.formControlRoot}>

                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t("kycBank.formControl.micr.label")}
                    placeholder={t("kycBank.formControl.micr.placeholder")}
                    name="micr_code"
                    type="number"
                    id="micr_code"
                    required
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 9);
                    }}
                    disabled={formEditIs}
                  />

                </Box>
              </div>

              <Box className={classes.kycCardFooterRoot}>
                {/* {localStorage.getItem("skipFlow") == "true" && <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={skipFlow}
                  className={classes.nxtBtn}
                  endIcon={
                   <NextArrowIcon style={{ fill: "transparent" }} />
                  }
                >
                 Skip Now
                </Button> } */}
                <Button
                  type="submit"
                  variant="text"
                  color="primary"
                  size="large"
                  // onClick={submitForm}
                  className={classes.nxtBtn}
                  // fullWidth
                  endIcon={
                    width === "xs" ? (
                      <WhiteArrowIcon style={{ fill: "transparent" }} />
                    ) : (
                      <NextArrowIcon style={{ fill: "transparent" }} />
                    )
                  }
                >
                  {t("verifyAadhaarForm.formControl.buttonText3")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </KycTemplate>
  );
}

export default withWidth()(AccountDetail);
