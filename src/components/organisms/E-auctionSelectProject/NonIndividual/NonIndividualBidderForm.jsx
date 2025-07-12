import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Container, Grid, Button, Box, Typography, InputAdornment } from '@material-ui/core';
import LocalFormControl from '../../../molecules/FormControl/FormControl';
import { eauctionStyle } from '../eauctionStyle.style';
import FormTitleBox from '../../../atoms/FormTitleBox/FormTitleBox';
import { PersonalDetailsTitleIcon } from '../../../atoms/SvgIcons/SvgIcons';
import { NonIndividualSelector, clearsaveCorporateState, getCorporate, getLegalStatus, saveCorporate } from '../../../../redux/features/eauction/nonIndividualSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import Loading from '../../../atoms/Loading/Loading';
import { applicantSelector } from '../../../../redux/features/applicant/ApplicantSlice';


const NonIndividualBidderForm = () => {
  const classes = eauctionStyle();
  const {
    isFetchingSaveCorporate,
    isSuccessSaveCorporate,
    isErrorSaveCorporate,
    saveCorporateData,
    errorMessageSaveCorporate,
    // get corporate details state
    isFetchingGetCorporate,
    isSuccessGetCorporate,
    isErrorGetCorporate,
    getCorporateData,
    errorMessageGetCorporate,
    // get Legal Status 
    isFetchingGetLegalStatus,
    isSuccessGetLegalStatus,
    isErrorGetLegalStatus,
    getLegalStatusData,
    errorMessageGetLegalStatus,
  } = useSelector(NonIndividualSelector);
  const {
    isFetchingApplicant,
    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,

  } = useSelector(applicantSelector);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    companyName: '',
    compEmailId: '',
    legalStatus:  { value: "0", label: "Select" },
    registrationNumber: '',
    company_gst: '',
    registeredAddress: '',
    city: '',
    state: '',
    postalCode: '',
    partnersDirectors: '',
    panTan: '',
    establishmentYear: '',
    natureOfBusiness: '',
    preferentialBidder: 'false',
    title: '',
    contactName: '',
    compBidDOB: '',
    designation: '',
    compContactNo: '',
    compBidMobileNo: '',
    companyType:  { value: "0", label: "Select" },
  });

  useEffect(() => {
    dispatch(getCorporate());
    //dispatch(getLegalStatus());
  }, [])

useEffect(()=>{
  if(isSuccessGetCorporate){
    setFormValues(getCorporateData);
  }
},[isSuccessGetCorporate])

  const validationSchema = yup.object().shape({
    companyName: yup.string().required('Company Name is required'),
    companyEmail: yup.string().email('Invalid email address').required('Company Email is required'),
    legalStatus: yup.string().required('Legal Status is required'),
    registrationNumber: yup.string().required('Registration Number is required'),
    company_gst: yup.string().required('GST Number is required'),
    registeredAddress: yup.string().required('Registered Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    postalCode: yup.string().required('Postal Code is required'),
    partnersDirectors: yup.string().required('Name of Partner/Director is required'),
    panTan: yup.string().required('Pan/Tan is required'),
    establishmentYear: yup.date().required('Date Of Incorporation is required'),
    natureOfBusiness: yup.string().required('Nature Of Business is required'),
    title: yup.string().required('Title is required'),
    contactName: yup.string().required('Contact Name is required'),
    dateOfBirth: yup.date().required('Date Of Birth is required'),
    designation: yup.string().required('Designation is required'),
    contactnumber: yup.string().required('Contact Number is required'),
    mobileNumber: yup.string()
      .matches(/^[0-9]*$/, 'Mobile Number must be a number')
      .min(10, 'Mobile Number must be at least 10 digits')
      .max(10, 'Mobile Number can be at most 10 digits')
      .required('Mobile Number is required'),
  });

  const handleSubmit = (values) => {
    // Handle form submission here (you can send the data to an API, etc.)
    console.log(values);
    const data = {
      ...values,
      applicant_id: localStorage.getItem('applicantId'),
      
      preferentialBidder: values.preferentialBidder.toString() === 1 ? "true": "false" ,
    }
    dispatch(saveCorporate(data));
  };
  const history = useHistory();
  useEffect(() => {
    if (isSuccessSaveCorporate) {
      dispatch(clearsaveCorporateState());
      history.push("/upload-documents");
    }
  }, [isSuccessSaveCorporate])
  const legalStatusOptions = [

   
    { value: "1", label: "Limited Company" },
    { value: "2", label: "Undertaking" },
    { value: "3", label: "Jointventure" },
    { value: "4", label: "Partnership" },
    { value: "5", label: "Others" }

  ];
  const companyTypeOptions = [

    { value: "0", label: "-Select-" },
    { value: "1", label: "Micro Unit as per MSME" },
    { value: "2", label: "Small Unit as per MSME" },
    { value: "3", label: "Medium Unit as per MSME" },
    { value: "4", label: "Ancillary Unit" },
    { value: "5", label: "Project Affected Person of this Company" },
    { value: "6", label: "SSI" },
    { value: "7", label: "Others" }

  ];

  return (
    <>
    { isFetchingGetCorporate && <Loading isOpen={ isFetchingGetCorporate} />}
    {isFetchingApplicantGet && <Loading isOpen={isFetchingApplicantGet} />}
    <Box style={{ padding: 30, backgroundColor: '#fff', borderRadius: 10 }}>
      <FormTitleBox
        title="Corporate Details"
        backUrl="/question-1"
        titleIcon={<PersonalDetailsTitleIcon fontSize="large" />}
      />
      <Container>
        <Formik
          initialValues={formValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          <Form>
            <Box className={classes.divider1} sx={{ marginBottom: 10, marginTop: 10 }}>
              <Typography variant="h6" className={classes.dividercontent}>Company Details</Typography>
            </Box>
            <Grid container spacing={2}>


              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="companyName"
                  id="companyName"
                  label="Company Name"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="compEmailId"
                  id="compEmailId"
                  label="Company Email"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <LocalFormControl
                  control="selectbox"
                  name="legalStatus"
                  id="legalStatus"
                  label="Legal Status"
                  variant="outlined"
                  type="text"
                  required
                  options={legalStatusOptions}
                 // value={formValues?.legalStatus}
                />
              </Grid>

              <Grid item xs={6}>

                <LocalFormControl
                  control="input"
                  variant="outlined"
                  label={("Contact Number")}
                  placeholder={(
                    "Enter Corporate Contact Number"
                  )}
                  name="compContactNo"
                  type="number"
                  id="compContactNo"
                  required
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <strong>+91 - </strong>{" "}
                      </InputAdornment>
                    ),
                  }}
                // autoFocus={true}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="registrationNumber"
                  id="registrationNumber"
                  label="Registration Number"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="company_gst"
                  id="company_gst"
                  label="GST Number"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="registeredAddress"
                  id="registeredAddress"
                  label="Registered Address"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="city"
                  id="city"
                  label="City"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="state"
                  id="state"
                  label="State"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="postalCode"
                  id="postalCode"
                  label="Postal Code"
                  variant="outlined"
                  type="number"
                  required
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="partnersDirectors"
                  id="partnersDirectors"
                  label="Name of Partner/Director"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="panTan"
                  id="panTan"
                  label="Pan/Tan"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="establishmentYear"
                  id="establishmentYear"
                  label="Establishment Year"
                  type='number'
                  variant="outlined"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 4);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="selectbox"
                  name="companyType"
                  id="companyType"
                  label="Company Category"
                  variant="outlined"
                  type="text"
                  // required
                  options={companyTypeOptions}
                  //value={formValues?.companyType}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="natureOfBusiness"
                  id="natureOfBusiness"
                  label="Nature Of Business"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <LocalFormControl
                  control="checkbox"
                  name="preferentialBidder"
                  id="preferentialBidder"
                  label="Preferential Bidder"
                  variant="outlined"
                   type="checkbox"
                //  checked={formValues.preferentialBidder} 
                />
              </Grid>
            </Grid>
            <Box className={classes.divider1} sx={{ marginBottom: 10 }}>
              <Typography variant="h6" className={classes.dividercontent}>Personal Detail For Authorized Signatory</Typography>
            </Box>
            <Grid container spacing={3} xs={12}>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <LocalFormControl
                      control="input"
                      name="title"
                      id="title"
                      label="Title"
                      variant="outlined"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <LocalFormControl
                      control="input"
                      name="compBidName"
                      id="compBidName"
                     // label="Contact Name"
                      variant="outlined"
                      type="text"
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Box >
                  <LocalFormControl
                    control="datepicker"
                    name="compBidDOB"
                    id="compBidDOB"
                    //label="Date Of Birth"
                    inputVariant="outlined"
                    maxDate={new Date()}
                    required
                  />
                </Box>

              </Grid>
            </Grid>
            <Grid container spacing={3} xs={12}>
              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="designation"
                  id="designation"
                  label="Designation"
                  variant="outlined"
                  type="text"
                  required
                />
              </Grid>


              <Grid item xs={6}>
                <LocalFormControl
                  control="input"
                  name="compBidMobileNo"
                  id="compBidMobileNo"
                  label="Contact Number For Bidder"
                  variant="outlined"
                  type="number"
                  required
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <strong>+91 - </strong>{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} style={{ textAlign: 'right' }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Form>
        </Formik>
      </Container>
    </Box>
    </>
  );
};



export default NonIndividualBidderForm;
