import { Box, Button, Paper, Step, StepContent, StepIcon, StepLabel, Stepper, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegistrationStepperSave, RegistrationStepperSelector, getRegistrationProgress } from '../../../../redux/features/registration/registrationStepperSlice';
import { ColorlibConnector } from '../../ProfilePageComponents/MakeHousePayment/MakeHousePayment.style';
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

const useStyle = makeStyles((theme) => ({
  stepContent: {
    marginTop: 0,
    paddingRight: 0,
    borderLeft: "2px dashed #E7E7E7",
    "&.done": {
      borderLeft: "2px solid rgba(33, 150, 83, 1)",
    },
    "&.active": {
      borderLeft: "2px solid rgba(1, 81, 202, 1)",
    },
  },
  stepper: {
    '& .MuiStepConnector-vertical': {
      marginLeft: 18,
      padding: 0
    }
  }
}))

const CustomStepIcon = ({ active, completed, icon }) => {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#C3C7CF",
        border: 1,
        borderStyle: "solid",
        backgroundColor: completed ? '#00437E' : '#FFFFFF',
        borderRadius: 6,
        color: completed ? '#FFFFFF' : '#000000', // Change color based on completion
      }}
    >
      {icon}


    </div>
  );
};

const StyledStepIcon = withStyles((theme) => ({
  root: {
    width: 40,
    height: 40,
    color: '#bdbdbd',// Default color
    '&$active': {
      color: '#F27807', // Active color
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

export default function VerticalLinearStepper() {
  const { isFetchRegStepper,
    isSuccessgetRegStepper,
    getRegStepper,
    getRegActiveStep,
    isErrorgetRegStepper,
    getRegStepperData,
    errorMessagegetRegStepper,
    isSuccessRegStepper
  } = useSelector(RegistrationStepperSelector);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyle();


  useEffect(() => {
    if (isSuccessgetRegStepper) {
      setActiveStep(getRegActiveStep);
    }
  }, [isSuccessgetRegStepper, getRegActiveStep])

  
  const steps = [
    {
      label: "Bidder Selection", description: getRegStepperData[0]?.bidder_selection_date ? moment(getRegStepperData[0]?.bidder_selection_date).format("MMM DD, h:mm a") : "",
    },
    {
      label: "KYC Details", description: getRegStepperData[0]?.kyc_details_update ? moment(getRegStepperData[0]?.kyc_details_update).format("MMM DD, h:mm a") : "",
    },
    {
      label: "Personal Details & Bank Details", description: getRegStepperData[0]?.personal_and_bank_update ? moment(getRegStepperData[0]?.personal_and_bank_update).format("MMM DD, h:mm a") : "",
    },
    {
      label: "Category Details", description: getRegStepperData[0]?.category_details_update ? moment(getRegStepperData[0]?.category_details_update).format("MMM DD, h:mm a") : "",

    },
    {
      label: 'Upload Documents', description: getRegStepperData[0]?.upload_document_update ? moment(getRegStepperData[0]?.upload_document_update).format("MMM DD, h:mm a") : "",

    },
  ];


  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    
    <Box sx={{ maxWidth: 400 }}>
      {/* <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper> */}
      <Stepper activeStep={activeStep - 1} className={classes.stepper} connector={<ColorlibConnector />} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={StyledStepIcon}
            >
              {step.label}
              <Typography style={{ color: "#65707D", fontSize: "14px" }}>{step.description}</Typography>
            </StepLabel>
            <StepContent className={`${classes.stepContent} ${(activeStep == index + 1) ? "active" : ""} ${activeStep > index + 1 ? "done" : ""}`} >
              {/* <Typography>{step.description}</Typography> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}