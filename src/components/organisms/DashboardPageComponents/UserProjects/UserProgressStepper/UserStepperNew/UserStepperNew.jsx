import React, { useState } from 'react'
import './style.css'
import { getSteps, getStepsWithDetails } from '../mockdata';
import { VerifiedSuccessIcon } from '../../../../../atoms/SvgIcons/SvgIcons';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const UserStepperNew = (props) => {

  const {activeStep, setDialogStep, handleClickPopover, redirect, title} = props
  const steps = getStepsWithDetails();
  const history = useHistory();

  const goToNextStep = () => {
    if (redirect) {
      history.push(redirect);
    }
  };

  return (
    <ol className="stepper">
        {
            steps.map((step,index)=>{
                let StepperClassName ;
                if(activeStep == index +1) {
                  StepperClassName = 'active'
                } else if(activeStep > index) {
                  StepperClassName = 'completed'
                } else {
                  StepperClassName = ''
                }
                return  <li key={index} className={StepperClassName}  onClick={(e) => {
                            if (activeStep > index + 1 || ((activeStep == 8 || activeStep == 12 )  && activeStep > index)) {
                              handleClickPopover(e);
                              setDialogStep(index + 1);
                            }
                          }} style={{cursor: activeStep > index + 1 ? "pointer" : ""}}>
                    <p className="step-number">{index +1}</p>
                    <p>{step.StepIcon}</p>
                    <p className="event-date">{step.StepName}</p>
                    <p className="view-btn" style={{visibility: (index + 1 < activeStep || ((activeStep == 8 || activeStep == 12 ) && activeStep > index)) ?  "visible" : "hidden"}}>View Detail</p>
                    {(activeStep == index+1 && activeStep!=8 && activeStep!=12) && 
                    <Button
                      varient="outlined"
                      onClick={goToNextStep}
                      className="continueBtn"
                      disabled={activeStep == 8}
                    >
                      {title}
                    </Button>
                    }
                </li>
            })
        }
    </ol>
  )
}

export default UserStepperNew