import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { initialPagesStyles } from "../../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import Typography from "@material-ui/core/Typography";
import checkGif from "../../../../../assets/checkGif.webp"
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
import { addEditStepper, getStepperDetails, clearSuperStepperEditVars } from "../../../../../redux/features/stepper/StepperSlice";
import { createAccountLog } from "../../../../../redux/features/masterdata/MasterDataSlice";
import {
  editApplicant,
  applicantSelector,
  clearApplicantState,
  ApplicantBankDetails,
  getApplicant,
  getBankdetails,
} from "../../../../../redux/features/applicant/ApplicantSlice";

function BankDetail(props) {
  const { width } = props;
  const classes = initialPagesStyles();
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const [formValue, setFormValue] = useState(null);
  const [formEditIs, setFormEditIs] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  // const stepperData = useSelector((state) => state.stepper.stepperData);
  // const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);
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
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData
  } = useSelector((state) => state.stepper);
  useEffect(()=>{
    dispatch(getBankdetails());
    },[])
  
  const initialValues = {
    bank_name:"",
    branch_name:"",
    refund_type:"",
  };

  useEffect(() => {
    if (isSuccessgetBankDetails) {
      if (getBankDetailsData && getBankDetailsData[0]) {
        setFormEditIs(true);
        // let AadharNo = applicantData.AadharNo.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
        let BankName = getBankDetailsData[0]?.bank_name;
        let BranchName = getBankDetailsData[0]?.branch_name;
        let RefundType = getBankDetailsData[0]?.refund_type;


        const savedValue = {
          bank_name: BankName,
          branch_name: BranchName,
          refund_type:RefundType
        };
        setFormValue(savedValue);
      }
    }
  }, [isSuccessgetBankDetails]);
  console.log(formValue,"sfdg");
  const { applicantData, isSuccessResApplicantGet } = useSelector(applicantSelector);
  
  const validationSchema = yup.object({
    bank_name:formEditIs == false && yup.string()
      .required(t("kycBank.formControl.bank.required"))
      .matches(
        /^[\u0900-\u097F.a-zA-Z ]*$/,
        t("kycBank.formControl.bank.limitation")
      ),
    branch_name: formEditIs == false && yup.string()
      .required(t("kycBank.formControl.branch.required"))
      .matches(
        /^[\u0900-\u097F.a-zA-Z ]*$/,
         t("kycBank.formControl.branch.limitation")
      ),
      
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    let acccnt_dtls = JSON.parse(localStorage.getItem("accountDetails"));
    let sendParam = {
      account_holder_name:acccnt_dtls.account_holder_name.toString(),
      account_number: acccnt_dtls.account_number.toString(),
      confirm_account_number: acccnt_dtls.confirm_account_number.toString(),
      ifsc_code:acccnt_dtls.ifsc_code.toString(),
      micr_code:acccnt_dtls.micr_code.toString(),
      //ifsc_code: acccnt_dtls.proceededWith === "1" ? acccnt_dtls.IFSC : "",
      //Micrno: acccnt_dtls.proceededWith === "2" ? acccnt_dtls.MICR : "",
      refund_type: values.refund_type,
      bank_name: values.bank_name,
      branch_name: values.branch_name,
      Type: "Bank",
      Lang: localStorage.getItem("i18nextLng")
    };
   
    dispatch(ApplicantBankDetails(sendParam));
  };

  useEffect(() => {
    if (isSuccessResApplicantBank) {
      let acccnt = JSON.parse(localStorage.getItem("accountDetails"));
      // const requestData = {
      //   BankDetailsStatus:1,
      //   ApplicantId:localStorage.getItem("applicantId"),
      //   steps: "step_6",
      //   debug:0,
      // }
      // dispatch(createAccountLog(requestData));
      dispatch(clearApplicantState());
      localStorage.removeItem("accountDetails");
      updateStepperUI();
    }
  }, [isSuccessResApplicantBank]);


  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_sub_stepper = [];
      let new_obj = {};
      if (element.step == 1) {
        for (let i = 0; i < element.applicantKycStepper.length; i++) {
          const inner_element = element.applicantKycStepper[i];
          let new_sub_obj = {};
          if (inner_element.step == 3) {
            new_sub_obj = {
              ...inner_element,
              status: "completed"
            };
          } else {
            new_sub_obj = {
              ...inner_element
            };
          }
          new_sub_stepper.push(new_sub_obj);
        }
        new_obj = {
          ...element,
          applicantKycStepper: new_sub_stepper
        };
      } else {
        new_obj = {
          ...element,
        };
      }
      newStepper.push(new_obj);
    }
    dispatch(addEditStepper(newStepper));
  };
  
  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(getStepperDetails());
      dispatch(clearSuperStepperEditVars());
      history.push("/upload-cheque");
    }
  }, [isSuccessReqStepper]);

  const skipFlow = ()=> {
    history.push("/upload-cheque");
  }

  return (
    <KycTemplate>
      {(isFetchingApplicantBank || isFetchingStepper) && (
        <Loading isOpen={isFetchingApplicantBank || isFetchingStepper} />
      )}
      <div className={classes.kycCompMainBox}>
        <Hidden smDown>
          <KycTitleDescriBox
            title={t("kycBank.title")}
            description={t("kycBank.descp")}
          />
        </Hidden>
        <Hidden mdUp>
          <KycStepperBox
            callingForMobileIs={true}
            title={t("kycBank.title")}
            description={t("kycBank.descp")}
          />
        </Hidden>
        <Formik
          enableReinitialize={true}
          initialValues={formEditIs ? formValue : initialValues}
          
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm }) => (
            <Form noValidate autoComplete="off" className={classes.kycFormContainer}>
              <div className={classes.kycCardFormRoot}>
                {/* <Box textAlign="center" className={classes.formControlRoot}>
                  <img
                    className={classes.iconStyle}
                    src={width === "xs" ? BankPhn : BankAcc}
                    alt="Bank account"
                  />
                </Box> */}
                {isErrorApplicantBank && (
                  <AlertBox severity="error">{errorMessage}</AlertBox>
                )}
                <Box className={classes.formControlRoot}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={t("kycBank.formControl.bank.label")}
                    placeholder={t("kycBank.formControl.bank.placeholder")}
                    name="bank_name"
                    type="text"
                    id="bank_name"
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
                    control="input"
                    variant="outlined"
                    label={t("kycBank.formControl.branch.label")}
                    placeholder={t("kycBank.formControl.branch.placeholder")}
                    name="branch_name"
                    type="text"
                    id="branch_name"
                    inputProps={{ maxLength: 50 }}
                    required
                    onInput={(e) =>
                      (e.target.value = ("" + e.target.value).toUpperCase())
                    }
                    disabled={formEditIs}
                  />
                </Box>
                <Box className={classes.formControlRoot}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {t("kycBank.formControl.radio.label")}
                    
                  </Typography>
                  <Field
                    component={RadioGroup}
                    name="refund_type"
                    
                    style={{
                      alignItem: "center",
                      justifyContent: "space-around",
                    }}
                    disabled={formEditIs}
                  >
                    
                    <FormControlLabel
                      value="other_account"
                      control={<Radio color="primary" />}
                      label={t("kycBank.formControl.radio.rtman")}
                      onChange={(e) => {
                        setProceedParam(e.target.value);
                      }}
                      disabled={formEditIs}
                    />
                    
                    <FormControlLabel
                      value='source_account'
                      control={<Radio color="primary" />}
                      label={t("kycBank.formControl.radio.rts")}
                      onChange={(e) => {
                        setProceedParam(e.target.value);
                      }}
                      disabled={formEditIs}
                    />
                  </Field>
                  {formEditIs &&
                    <Box mt={3}>
                      <AlertBox icon={false} variant="filled" style={{padding : "0px 12px"}} className={classes.customAlert}><Grid container alignItems="center"><img src={checkGif} height='40px' alt="success"/> {t("verifyAadhaarForm.formControl.messageText5")}</Grid></AlertBox>
                    </Box>
                  } 
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

export default withWidth()(BankDetail);
