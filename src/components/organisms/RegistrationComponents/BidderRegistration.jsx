import React, { useEffect, useState } from 'react';
import { Avatar, Box, Grid, Paper, Typography } from '@material-ui/core';
import CircularWithValueLabel from './ProgressIndicator/CircularWithValueLabel';
import Stepper from './Stepper/Stepper';
import Applicationform from '../../../assets/SvgIcons/ApplicationForm.svg';
import NewRegistration from '../../../assets/SvgIcons/Newregistration.svg';
import RegistrationForm from './Registrationform/RegistrationForm';
import { useDispatch, useSelector } from 'react-redux';
import { applicantSelector } from '../../../redux/features/applicant/ApplicantSlice';
import { personalDetailsFormStyles } from '../PersonalDetailsPageComponents/PersonalDetailsForm/PersonalDetailsForm.styles';
import { RegistrationStepperSelector, clearRegistrationStepperData, cleargetRegistrationStepperData, getRegistrationProgress } from '../../../redux/features/registration/registrationStepperSlice';

export default function BidderRegistration() {
  const classes = personalDetailsFormStyles();
  const {
    isFetchingApplicant,
    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,
    isSuccessEmailVerificationOTP,
    isErrorVerifyEmailVerificationOTP,
    errorMsgVerifyEmailVerificationOTP,
    isSuccessVerifyEmailVerificationOTP,
    isFetchingVerifyEmailVerificationOTP,
  } = useSelector(applicantSelector);

  const dispatch = useDispatch();

  const { isFetchRegStepper,
    isSuccessgetRegStepper,
    getRegStepper,
    getRegActiveStep,
    isErrorgetRegStepper,
    getRegStepperData,
    errorMessagegetRegStepper,
    getRegTotalStep,
    isSuccessRegStepper,
  } = useSelector(RegistrationStepperSelector);
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(5);



  useEffect(() => {
    dispatch(getRegistrationProgress());
    dispatch(clearRegistrationStepperData())
  }, [isSuccessRegStepper])

  useEffect(() => {
    if (isSuccessgetRegStepper || getRegActiveStep) {
      setActiveStep(getRegActiveStep);
      setTotalSteps(getRegTotalStep);
    }
  }, [isSuccessgetRegStepper, getRegActiveStep])


  return (

    <Grid container spacing={2} justifyContent='space-between' className={classes.root} >
      {/* <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} style={{ maxWidth: '32%', overflow: 'hidden' }}> */}
      <Grid item xs={4}  >

        <Paper variant="outlined" className={classes.rootm}>
          <Box

            sx={{

              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',


            }}
          >
            {Object.keys(applicantData).length === 0 ? (
              <img src={NewRegistration} alt="New Registration Logo" />
            ) : (
              <Grid container item xs={12} sm={12} alignItems="center" >

                <Grid className={classes.nameBox} container alignItems="center">
                  {applicantData.ImagePath ? <Avatar src={
                    applicantData.ImagePath
                  } className={classes.imagelarge}

                  /> : <Avatar src={
                    'https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg'
                  } className={classes.imagelarge}

                  />}

                  <Grid item style={{ marginLeft: "10px" }}>
                    <Typography className={classes.applicantName}>{applicantData.FirstName}</Typography>
                    {applicantData.Age > 0 && (
                      <span style={{ color: "#65707D", fontSize: "14px" }}>{"Age"}: {applicantData.Age} |</span>
                    )}
                    {applicantData.Gender != 0 && <span style={{ color: "#65707D", fontSize: "14px" }}>
                      {applicantData.Gender === 1 ? "Female" : "Male"}
                    </span>}

                    {applicantData.MobileNo ? <Typography style={{ color: "#65707D", fontSize: "14px" }}>Mobile No: {applicantData.MobileNo}</Typography> : ""}
                    {applicantData.bidder_type ? <Typography style={{ color: "#65707D", fontSize: "14px" }}>Bidder Type: {applicantData.bidder_type}</Typography> : ""}
                    {applicantData.EmailId ? <Typography style={{ color: "#65707D", fontSize: "14px" }}>Email Id: {applicantData.EmailId}</Typography> : ""}
                  </Grid>

                </Grid>
              </Grid>
            )}
            <Grid container alignItems="center" spacing={1} style={{ marginTop: "5px" }} >
              <Grid item  >
                <img src={Applicationform} alt="Logo" />
              </Grid>
              <Grid item  >
                <Typography variant="h6" component="span" fontWeight="500">
                  Registration Progress
                </Typography>

              </Grid>
              {/* <Grid item>
              <CircularWithValueLabel activeStep={activeStep} totalSteps={totalSteps} />
              </Grid> */}

              <Grid item   >

                <Stepper />
              </Grid>
            </Grid>



          </Box>
        </Paper>

      </Grid>
      {/* <Grid
          item
          xs={false}
          sm={4}
          md={8}
          style={{
            overflowY: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          component={Paper} elevation={3}
        > */}

      <Grid item xs={8}   >
        <Paper variant="outlined" className={classes.rootm}>
          <Grid style={{ overflowY: 'auto', maxHeight: '90vh' }}>
            <RegistrationForm section={activeStep} />
          </Grid>
        </Paper>


      </Grid>
    </Grid>



  );
}