// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormControl,
//   FormLabel,
//   Box,
// } from '@mui/material';
// import * as yup from 'yup';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import ShieldCheck from '../../../../Assets/SvgIcons/ShieldCheck.svg';
// import Handshake from '../../../../Assets/SvgIcons/Handshake.svg';
// import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// import theme from '../../../../Components/Theme/Theme';

// // Make the theme responsive
// const responsiveTheme = responsiveFontSizes(theme);

// const validationSchema = yup.object().shape({
//   aadhar: yup.string().matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits').required('Aadhar number is required'),
//   pan: yup.string().matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN format').required('PAN number is required'),
//   monthlyIncome: yup.string().required('Please select your monthly income'),
//   ownPuccaHouse: yup.string().required('Please select if you own a Pucca House in Navi Mumbai'),
//   eligibilityForCIDCO: yup.string().required('Please select your eligibility for CIDCO Mass Housing Scheme'),
// });

// const initialValues = {
//   aadhar: '',
//   pan: '',
//   monthlyIncome: '',
//   ownPuccaHouse: '',
//   eligibilityForCIDCO: '',
// };

// const AadharPanForm = () => {
//   const handleSubmit = (values) => {
//     // You can perform your verification logic here
//     console.log('Submitted values:', values);
//   };

//   return (
//     <ThemeProvider theme={responsiveTheme}>
//       <Grid container>
//         <Grid item xs={12} sm={8} md={6}>
//           <Typography variant="h5" m={2}>
//             <Box component="span"
//             sx={{
//               display:"inline-flex",
//               alignItems:"center",
//               marginRight:"10px",
//               bgcolor:"#E9F1FF",
//               borderRadius:"50%",
//               padding:"10px",
//             }}

//             >
//               <img src={ShieldCheck} alt="Custom Icon" width={16} height={16} />
//             </Box>
//             KYC Details
//           </Typography>
//           <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//             {({ errors, touched }) => (
//               <Box component={Form} >

//                 <Box component={'div'}  >
//                 <TextField
//                 id="aadhar"
//                 name="aadhar"
//                 label="Aadhar Detail"
//                 fullWidth
//                 variant="outlined"
//                 required='true'
//                 error={touched.aadhar && !!errors.aadhar}
//                 helperText={touched.aadhar && errors.aadhar}
//                 />
//                 </Box>
//                 <Box component={'div'} sx={{mt:2 }}>
//                 <TextField
//                  id='pan'
//                   name="pan"
//                   label="PAN Detail"
//                   fullWidth
//                   variant="outlined"
//                   required='true'
//                   error={touched.pan && !!errors.pan}
//                   helperText={touched.pan && errors.pan}


//                 />
// </Box>
// <Typography variant="h5" m={2} mt={4}>
//             <Box component="span"
//             sx={{
//               display:"inline-flex",
//               alignItems:"center",
//               marginRight:"10px",
//               bgcolor:"#E9F1FF",
//               borderRadius:"50%",
//               padding:"10px",
//             }}

//             >
//                     <img src={Handshake} alt="Custom Icon" width={18} height={18} />
//                   </Box>
//                   Scheme Eligibility
//                 </Typography>

//                 <FormControl component="fieldset" style={{ marginTop: '10px' }}>
//                   <FormLabel component="legend" id="monthly-income" className="bold-label">
//                     Monthly Income Of Your Family?
//                   </FormLabel>
//                   <Field as={RadioGroup} name="monthlyIncome" row aria-labelledby="monthly-income">
//                     <FormControlLabel value="UpTo 25000" control={<Radio />} label="UpTo 25000" />
//                     <FormControlLabel value="Above 25000" control={<Radio />} label="Above 25000" />
//                   </Field>
//                 </FormControl>

//                 <FormControl component="fieldset" style={{ marginTop: '10px' }}>
//                   <FormLabel component="legend" id="own-pucca-house" className="bold-label">
//                     Do you own a Pucca House in Navi Mumbai?
//                   </FormLabel>
//                   <Field as={RadioGroup} name="ownPuccaHouse" row aria-labelledby="own-pucca-house">
//                     <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//                     <FormControlLabel value="No" control={<Radio />} label="No" />
//                   </Field>
//                 </FormControl>

//                 <FormControl component="fieldset" style={{ marginTop: '10px' }}>
//                   <FormLabel component="legend" id="cidco-eligibility" className="bold-label">
//                     You are eligible to apply for both (PMAY & NON PMAY) CIDCO Mass Housing Scheme?
//                   </FormLabel>
//                   <Field as={RadioGroup} name="eligibilityForCIDCO" row aria-labelledby="cidco-eligibility">
//                     <FormControlLabel
//                       value="PMAY"
//                       control={<Radio />}
//                       label="PMAY Government Subsidy of ₹2.5 Lakhs for EWS"
//                     />
//                     <FormControlLabel value="NON PMAY" control={<Radio />} label="NON PMAY No Government Subsidy" />
//                   </Field>
//                 </FormControl>

//                 <Button type="submit" variant="contained" background='linear-gradient( #2B51D6, #119BF7)'>
//                   Save & Continue
//                 </Button>
//                 </Box>
//             )}
//           </Formik>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default AadharPanForm;


import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  InputAdornment,
  Link,
  CircularProgress,
} from '@material-ui/core';
import * as yup from 'yup';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ShieldCheck from '../../../../../assets/SvgIcons/ShieldCheck.svg';
import Handshake from '../../../../../assets/SvgIcons/Handshake.svg';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { VerifiedDocIcon } from '../../../../atoms/SvgIcons/SvgIcons';
import { useDispatch, useSelector } from 'react-redux';
import { aadhaarVerifyOtpMahaIT, clearVerifyAadhaarState, sendOTPMahaIT, tempVerifyAadhaarPost, verifyAadhaarSelector } from '../../../../../redux/features/verify/VerifyAadhaarSlice';
import { applicantSelector, clearApplicantState, clearEmailVerificationOTPState, clearVerifyEmailVerificationOTPState, getApplicant, getDetailsFromPanCard, sendEmailVerificationOTP, verifyEmailVerificationOTP } from '../../../../../redux/features/applicant/ApplicantSlice';
import AlertBox from '../../../../atoms/AlertBox/AlertBox';
import { EditCoApplicantStyle } from '../../../ProfilePageComponents/OtherRequestPageComponents/EditCoApplicantPageComponent/EditCoApplicantStyle.style';
import FormControl from '../../../../molecules/FormControl/FormControl';
import Loading from '../../../../atoms/Loading/Loading';
import { RegistrationStepperSave } from '../../../../../redux/features/registration/registrationStepperSlice';

const AadharPanForm = (props) => {
  const { active } = props;
  const [isResenOtpText, setResenOtpText] = React.useState(false);
  const [isResenOtpEmail, setResenOtpEmail] = React.useState(false);
  const [countOtp, setCountOtp] = React.useState(90);
  const [isPanVerified, setIsPanVerified] = useState(false);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [formEditIs, setFormEditIs] = useState(false);
  const [stepCompleted, setIsStepCompleted] = useState(false)
  const dispatch = useDispatch();
  const classes = EditCoApplicantStyle();
  const [disableEmailVerifyBtn, setDisableEmailVerifyBtn] = useState(true);
  const formikRef = useRef();
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const {
    isFetchingVerifyAadhaar,
    isErrorVerifyAadhaar,
    isErrorSendOtp,
    isFetchingGetAdarCaptch,
    isSuccessGetAdarCaptch,
    isErrorGetAdarCaptch,
    aadhaarErrorMessage,
    captchData,
    isSuccessSent,
    sentOTPData,
    isFetchingTempAdrVrf,
    isSuccessTempAdrVrf,
    isErrorTempAdrVrf,
    errorMessageTempAdrVrf,
    //Maha- IT adhaar sent otp
    isFetchingVerifyAadhaarMahaIT,
    isSuccessSentMahaIT,
    isErrorSendOtpMahaIT,
    sentOTPDataMahaIT,
    //Maha- IT adhaar Verify otp
    isSuccessVerifyAadhaarMahaIT,
    isErrorVerifyAadhaarMahaI,
    aadhaarErrorMessageMahaIT,
    aadhaarDataMahaIT,

    isSuccessResTempVerify,
    isFetchingTempVerify,
    isErrorTempVerify,
    errorMsgTempVerify
  } = useSelector(verifyAadhaarSelector);

  const { isSuccessResPanCard,
    isErrorPanCard,
    errorMessagePanCard,
    isFetchingPanCard,
    panCardData } = useSelector(applicantSelector)

  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    isErrorApplicant,
    isFetchingApplicantGet,
    errorMessage,
    applicantData,

    isSuccessEmailVerificationOTP,
    isErrorVerifyEmailVerificationOTP,
    errorMsgVerifyEmailVerificationOTP,
    isSuccessVerifyEmailVerificationOTP,
    isFetchingVerifyEmailVerificationOTP,
    isFetchingEmailVerificationOTP

  } = useSelector(applicantSelector);

  const [formValues, setFormValues] = useState({
    aadharNumber: "",
    oneTimePassword: "",
    pancardNumber: "",
    emailId: "",
    oneTimePasswordVerifyemail: ''
  });

  useEffect(() => {
    dispatch(getApplicant());
    return () => {
      dispatch(clearVerifyAadhaarState());
      dispatch(clearVerifyEmailVerificationOTPState());
      dispatch(clearEmailVerificationOTPState());
      dispatch(clearApplicantState());
    }
  }, []);

  useEffect(() => {
    setIsStepCompleted(active > 2)
  }, [active])


  const otpCounter = () => {
    let timeleft = 90;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
      }
      setCountOtp(timeleft);
      timeleft -= 1;
    }, 1000);
  };

  useEffect(() => {
    if (isSuccessSentMahaIT) {
      setTimeout(() => setResenOtpText(true), 90000);
      otpCounter();
    }
  }, [isSuccessSentMahaIT]);

  const retryKYC = () => {
    // sendAadhaarOtp(formikRef.current.values.aadharNumber);
    dispatch(clearVerifyAadhaarState());
    setResenOtpText(false);
    otpCounter();
  };

  const validateOTP = (value) => {
    let error;
    if (!value) {
      error = "OTP is required";
    } else if (!/^[0-9]{6}$/i.test(value)) {
      error =
        "Please enter valid 6 digit OTP"
    }
    return error;
  };

  const tempVerifyAadhaar = () => {
    const requestData = {
      adharNumber: localStorage.getItem("aadharNo"),
      IsCoApplicant: "0"
    };
    dispatch(tempVerifyAadhaarPost(requestData));
  };

  useEffect(() => {
    if (isSuccessTempAdrVrf) {
      dispatch(getApplicant());
      dispatch(clearVerifyAadhaarState())
    }
  }, [isSuccessTempAdrVrf]);

  const validateEmailOTP = (value) => {
    let error;
    if (!value) {
      error = "OTP is Required";
    } else if (!/^[0-9]{4}$/i.test(value)) {
      error = 'Enter 4 digit OTP';
    }
    return error;
  };

  const resendOtp = () => {
    if (window.downloadTimer != undefined && window.downloadTimer != 'undefined') {
      window.clearInterval(window.downloadTimer);
    }
    const requestData = {
      EmailId: formikRef.current.values.emailId,
      ApplicantId: localStorage.getItem("applicantId"),
    };
    dispatch(sendEmailVerificationOTP(requestData));
    setResenOtpEmail(false);
    //setTimeout(() => setResenOtpText(true), 90000);
  };

  useEffect(() => {
    if (isSuccessVerifyEmailVerificationOTP) {
      dispatch(getApplicant());
    }
  }, [isSuccessVerifyEmailVerificationOTP])

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      const savedValue = {}
      if (applicantData.IsAadharVerified == "1") {
        setIsAadhaarVerified(true);
        savedValue['aadharNumber'] = applicantData.AadharNo
      }
      if (applicantData.isPanVerified == "1") {
        setIsPanVerified(true);
        savedValue['pancardNumber'] = applicantData.PANNo
      }
      if (applicantData.EmailId) {
        setIsEmailVerified(true);
        savedValue['emailId'] = applicantData.EmailId
      }
      setFormValues(savedValue);
    }
  }, [isSuccessResApplicantGet, applicantData]);

  const sendAadhaarOtp = (aadhaar) => {
    let aadhaar_num = aadhaar.replace(/-/g, "");
    localStorage.setItem("aadharNo", aadhaar_num)
    if (aadhaar_num.length === 12) {
      const requestData = {
        docNumber: aadhaar_num,
        IsCoApplicant: 0,
      };
      dispatch(sendOTPMahaIT(requestData));
    }
  };

  const verifyAadhaarOtp = (otp, aadhaar) => {
    if (otp) {
      const requestData = {
        tsTransID: sentOTPDataMahaIT?.tsTransID || "",
        mobileCode: otp,
        docNumber: localStorage.getItem("aadharNo"),
        IsCoApplicant: 0
      };
      // setCustomErrorMsg("");
      dispatch(aadhaarVerifyOtpMahaIT(requestData));
    }
  };

  const verifyPan = (pan) => {
    localStorage.removeItem("aadharNo")
    if (pan.length == 10) {
      let sendParam = {
        docNumber: pan,
        Lang: localStorage.getItem("i18nextLng"),
        ApplicantId: localStorage.getItem("applicantId"),
        type: applicantData.bidder_type,
        IsCoApplicant: 0
      };
      dispatch(getDetailsFromPanCard(sendParam));
    }
  };

  const verifyEmailFunc = () => {
    const requestData = {
      EmailId: formikRef.current.values.emailId,
      ApplicantId: localStorage.getItem("applicantId"),
    };
    dispatch(sendEmailVerificationOTP(requestData));
    setResenOtpText(false);
    //setCountOtp(90);
    //setResenOtpText(false);
    //setTimeout(() => setResenOtpText(true), 90000);
  };

  const verifyEmailOtp = (email, otp) => {
    if (otp) {
      const requestData = {
        Otp: otp,
        ApplicantId: localStorage.getItem("applicantId"),
        EmailId: email,
      };
      dispatch(verifyEmailVerificationOTP(requestData));
    }
  };
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false)
    dispatch(RegistrationStepperSave("3"))
  };
  console.log(formikRef, "wertrewq")
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={12} sx={{ mt: 2 }} >
        {(isFetchingApplicant || isFetchingApplicantGet || isFetchingTempAdrVrf) && <Loading isOpen={(isFetchingApplicant || isFetchingApplicantGet || isFetchingTempAdrVrf)} />}
        <Formik initialValues={formValues}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
          innerRef={formikRef}
        >
          {({ errors, touched, values, handleChange, setFieldValue }) => (
            <Form>
              <Box >
                {(isErrorSendOtpMahaIT) && <AlertBox style={{ margin: 8, wordBreak: 'break-all' }} severity="error">{aadhaarErrorMessageMahaIT}</AlertBox>}
                {(isErrorVerifyAadhaar || isErrorSendOtpMahaIT) && <AlertBox style={{ margin: 8, wordBreak: 'break-all' }} severity="error">{aadhaarErrorMessageMahaIT}
                  <span onClick={retryKYC} style={{ textDecoration: "none", color: "#0038C0", cursor: 'pointer' }}>
                    &nbsp;Retry again
                  </span>
                  <span onClick={tempVerifyAadhaar} style={{ textDecoration: "none", color: "red", cursor: 'pointer' }}>
                    &nbsp;or skip now.
                  </span>
                </AlertBox>}
                {isErrorPanCard && <AlertBox style={{ margin: 8, wordBreak: 'break-all' }} severity="error">{errorMessagePanCard}</AlertBox>}
                {/* <Typography style={{ fontWeight: 600 }} gutterBottom>Aadhaar card KYC</Typography> */}
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <FormControl
                      control="input"
                      variant="outlined"
                      label=
                      "Enter Aadhaar number"
                      placeholder=
                      "Enter Aadhaar number"
                      name="aadharNumber"
                      type="text"
                      id="aadharNumber"
                      required
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
                      }}
                      inputProps={{
                        maxLength: 14,
                      }}
                      autoFocus={true}
                      disabled={isSuccessSentMahaIT || isAadhaarVerified}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {(isSuccessVerifyAadhaarMahaIT || isAadhaarVerified) ?
                              <Box className={classes.verifiedBox}>
                                <VerifiedDocIcon />
                                <span>Aadhaar Verified</span>
                              </Box>
                              :
                              (values.aadharNumber && !isSuccessSentMahaIT) && <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ minWidth: 0 }}
                                disabled={values.aadharNumber.length < 14 || isFetchingVerifyAadhaarMahaIT}
                                onClick={() => sendAadhaarOtp(values.aadharNumber)}
                              >
                                {isFetchingVerifyAadhaarMahaIT && <CircularProgress size={20} />}
                                {!isFetchingVerifyAadhaarMahaIT && 'Get OTP'}
                              </Button>}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Button onClick={tempVerifyAadhaar} color='secondary' disabled={isFetchingTempAdrVrf || isSuccessVerifyAadhaarMahaIT || isAadhaarVerified}>
                    {isFetchingTempAdrVrf && "Please Wait..."}
                    {!isFetchingTempAdrVrf && "Skip for Now"}
                  </Button>
                  {(isSuccessSentMahaIT && !isSuccessVerifyAadhaarMahaIT) &&
                    <Grid container direction="column" item md={6} xs={12}>
                      <FormControl
                        control="input"
                        variant="outlined"
                        label=
                        "Enter Aadhaar OTP"
                        placeholder=
                        "Enter Aadhaar OTP"
                        name="oneTimePassword"
                        type="tel"
                        id="oneTimePassword"
                        autoFocus={true}
                        required
                        inputProps={{ maxLength: 6 }}
                        validate={validateOTP}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {(values.oneTimePassword) && <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ minWidth: 0 }}
                                disabled={values.oneTimePassword.length < 6 || isFetchingVerifyAadhaarMahaIT}
                                onClick={() => verifyAadhaarOtp(values.oneTimePassword, values.aadharNumber)}
                              >
                                {isFetchingVerifyAadhaarMahaIT && <CircularProgress size={20} />}
                                {!isFetchingVerifyAadhaarMahaIT && 'Verify'}

                              </Button>}
                            </InputAdornment>
                          ),
                        }}
                      />
                      {!isResenOtpText && (
                        <Box textAlign="left">
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            style={{ color: "#65707D" }}
                          >
                            Retry in 0:{countOtp} sec
                          </Typography>
                        </Box>
                      )}
                      {isResenOtpText && (
                        <Box display="flex">
                          <Box marginLeft={1}>
                            <Typography variant="body2" gutterBottom>
                              <span
                                to="#"
                                onClick={retryKYC}
                                style={{ textDecoration: "none", color: "#0038C0", cursor: 'pointer' }}
                              >
                                Resend
                              </span>
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  }
                </Grid>
              </Box>

              {(isSuccessVerifyAadhaarMahaIT || isAadhaarVerified) &&
                <Box >
                  {/* <Typography style={{ fontWeight: 600 }} gutterBottom>PAN card KYC</Typography> */}
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item md={6} xs={12}>
                      <FormControl
                        control="input"
                        variant="outlined"
                        label=
                        "Enter PAN Number"
                        placeholder=
                        "Enter PAN Number"
                        name="pancardNumber"
                        type="text"
                        id="pancardNumber"
                        required
                        inputProps={{
                          maxLength: 10,
                        }}
                        autoFocus={true}
                        onInput={(e) =>
                          (e.target.value = ("" + e.target.value).toUpperCase())
                        }
                        disabled={isSuccessResPanCard || isPanVerified}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {(isSuccessResPanCard || isPanVerified) ?
                                <Box className={classes.verifiedBox}>
                                  <VerifiedDocIcon />
                                  <span>PAN Verified</span>
                                </Box>
                                :
                                (values.pancardNumber) && <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  style={{ minWidth: 0 }}
                                  disabled={values.pancardNumber.length < 10 || isFetchingPanCard}
                                  onClick={() => verifyPan(values.pancardNumber)}
                                >
                                  {!isFetchingPanCard && 'Verify'}
                                  {isFetchingPanCard && <CircularProgress size={20} />}
                                </Button>}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>}
              {(isSuccessResPanCard || isPanVerified) && <Grid container alignItems="flex-start" spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl
                    control="input"
                    variant="outlined"
                    label={"Enter Email"}
                    placeholder={"Enter Email"}
                    name="emailId"
                    type="email"
                    id="emailId"
                    inputProps={{ maxLength: 100 }}
                    disabled={isEmailVerified}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment variant="standard" position="end" >
                          {(!isEmailVerified) &&
                            <Button variant="contained" disabled={!emailReg.test(values.emailId) || isFetchingEmailVerificationOTP} color="primary" size="small" onClick={verifyEmailFunc}>
                              {isFetchingEmailVerificationOTP && <CircularProgress size={20} />}
                              {!isFetchingEmailVerificationOTP && 'Get OTP'}
                            </Button>
                          }
                          {(isEmailVerified || isSuccessVerifyEmailVerificationOTP) &&
                            <Box className={classes.verifiedBox}>
                              <VerifiedDocIcon />
                              <span>Email Verified</span>
                            </Box>
                          }
                        </InputAdornment>
                      ),
                    }}
                  />

                </Grid>
                {(isSuccessEmailVerificationOTP && !isEmailVerified) &&
                  <Grid container direction="column" item md={6} xs={12}>
                    <FormControl
                      control="input"
                      variant="outlined"
                      label='Enter Email OTP'
                      placeholder='Enter Email otp send to your Email ID'
                      name="oneTimePasswordVerifyemail"
                      type="tel"
                      id="oneTimePasswordVerifyemail"
                      required
                      inputProps={{ maxLength: 4 }}
                      validate={validateEmailOTP}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {(values.oneTimePasswordVerifyemail) && <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              style={{ minWidth: 0 }}
                              disabled={values.oneTimePasswordVerifyemail.length < 4 || isFetchingVerifyEmailVerificationOTP}
                              onClick={() => verifyEmailOtp(values.emailId, values.oneTimePasswordVerifyemail)}
                            >
                              {isFetchingVerifyEmailVerificationOTP && <CircularProgress size={20} />}
                              {!isFetchingVerifyEmailVerificationOTP && 'Verify'}
                            </Button>}
                          </InputAdornment>
                        ),
                      }}
                    />
                    {!isResenOtpEmail && (
                      <Box textAlign="left">
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          style={{ color: "#65707D" }}
                        >
                          Retry in  00:{countOtp} sec
                        </Typography>
                      </Box>
                    )}
                    {isResenOtpEmail && (
                      <Box display="flex">
                        <Box marginLeft={1}>
                          <Typography variant="body2" gutterBottom>
                            <Link
                              to="#"
                              onClick={() => resendOtp(values.emailIdVerifyemail)}
                              style={{ textDecoration: "none", color: "#0038C0", fontWeight: 600 }}
                            >
                              Resend
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Grid>}
              </Grid>}
              <Grid container justifyContent="flex-end"  >
                {!stepCompleted && <Grid item style={{ marginTop: "10px" }}>
                  <Button type="submit" variant="contained" color='primary' disabled={!(isAadhaarVerified && isPanVerified && isEmailVerified) || active >= 3}>
                    Save & Continue
                  </Button>
                </Grid>}
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AadharPanForm;
