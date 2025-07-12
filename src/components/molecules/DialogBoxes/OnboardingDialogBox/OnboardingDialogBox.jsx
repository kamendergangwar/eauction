import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tab, Tabs, Typography } from '@material-ui/core'
import React from 'react'
import { WhiteArrowIcon } from '../../../atoms/SvgIcons/SvgIcons'
import { getOnboardingSteps } from './mockOnboarding';

const OnboardingDialogBox = (props) => {
    const {showOnboarding} = props

    const [activeStep, setActiveStep] = React.useState(0);

    const Steps = getOnboardingSteps(activeStep);
    
    const handleChange = (event, newActiveStep) => {
        setActiveStep(newActiveStep);
    };

    React.useEffect(() => {
      const intervalId =  setInterval(() => {
        activeStep + 1 === Steps.length ? setActiveStep(0) : setActiveStep(activeStep+1)
      }, 2500);
      
      return () => clearInterval(intervalId);
    }, [activeStep])
    

  return (
    <Dialog open={showOnboarding} maxWidth="md" fullWidth>
        <DialogTitle sx={{ m: 0, p: 1 }}><Typography align='center' variant='h6' style={{fontWeight:700}}>Welcome to CIDCO lottery</Typography></DialogTitle>
        <DialogContent>
            <Container maxWidth="lg" style={{paddingBottom:"24px"}}>
                <Tabs
                    value={activeStep}
                    onChange={handleChange}
                    textColor="primary"
                    aria-label="icon label tabs example"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#007AE7",                     
                        }}
                    }
                >
                    {
                        Steps.map((element,index)=>{
                           return <Tab icon={element.icon} value={index} style={{backgroundColor: activeStep === index ? "#FFFFFF":"#EDEDED",borderRadius:'2px',padding:"20px"}} />
                        })
                    }
                </Tabs>
            </Container>
            <Container maxWidth="lg">
                <Typography variant="subtitle2" style={{fontWeight:700}}>Step {Steps[activeStep].step} : {Steps[activeStep].name}</Typography>
                <Typography variant="subtitle2" style={{color: 'rgba(101, 112, 125, 0.8)'}}>
                    {Steps[activeStep].description}
                </Typography>
            </Container>
        </DialogContent>
        <DialogActions>
            <Grid container style={{margin:"10px"}}>
                <Grid item md={6} sm={6}>
                    <Button variant="text" style={{color:"#434A6C",textDecoration:"underline",marginLeft:'20px',fontSize:"inherit"}}>I’ve got it, let’s skip this Guide</Button>
                </Grid>
                <Grid item md={6} sm={6} style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                    <Button variant="outlined" onClick={()=>{setActiveStep(activeStep-1)}} disabled={activeStep === 0}>Prev</Button>
                    <Button variant="contained" style={{marginLeft:"10px"}} endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />} onClick={()=>{setActiveStep(activeStep+1)}} disabled={activeStep + 1 === Steps.length} >Next</Button>
                </Grid>
            </Grid>
        </DialogActions>
    </Dialog>
  )
}

export default OnboardingDialogBox