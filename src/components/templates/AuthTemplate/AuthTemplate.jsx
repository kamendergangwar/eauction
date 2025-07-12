import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import Header from "../../atoms/Header/Header";
import AuthCard from "../../molecules/Cards/AuthCard/AuthCard";
import { PhoneIcon, ChatIcon, MenuVideoTtrlNavBtnIcon } from "../../atoms/SvgIcons/SvgIcons";
import GuideVideoDialogBox from "../../molecules/DialogBoxes/GuideVideoDialogBox/GuideVideoDialogBox";
import { AuthTemplateStyles } from "./AuthTemplate.styles";

const AuthTemplate = (props) => {
  const { children } = props;
  const classes = AuthTemplateStyles();
  const [helpVideoUrl, setHelpVideoUrl] = useState("");
  const [showGuideContent, setShowGuildeContent] = useState(true);
  const [guideVideoDialogOpenIs, setGuideVideoDialogOpenIs] = useState(false);
  const currentPathName = useLocation().pathname;
  const [stepperList, setStepperList] = useState([
    {
      step: 1,
      title: "Verify Aadhaar",
      status: "completed",
      isAfterLine: true,
    },
    {
      step: 2,
      title: "Upload Aadhaar",
      status: "active",
      isAfterLine: true,
    },
    {
      step: 3,
      title: "Verify PAN",
      status: "pending",
      isAfterLine: true,
    },
    {
      step: 4,
      title: "Upload PAN",
      status: "pending",
      isAfterLine: true,
    },
    {
      step: 5,
      title: "Bank Details",
      status: "pending",
      isAfterLine: true,
    },
    {
      step: 6,
      title: "Cancelled Cheque",
      status: "pending",
      isAfterLine: false,
    },
  ]);
  
  useEffect(() => {
    if (currentPathName == "/" || currentPathName == "/otp-login") {
      setHelpVideoUrl("https://www.youtube.com/embed/v51nM11-Si8");
    } else {
      setShowGuildeContent(false);
    }

  }, [])

  return (
    <div className={classes.background}>
      <Header kycPagesIs={true} />
      <AuthCard setGuideVideoDialogOpenIs={setGuideVideoDialogOpenIs}>{children}</AuthCard>
      {/* <Hidden only={["md", "lg"]}>
        <Box className={classes.footerSection}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography className={classes.supportNumber}>
                <PhoneIcon /> Call : <strong>993-087-0000</strong>
              </Typography>
            </Grid>
            <Grid item>
              <Fab color="primary" aria-label="add">
                <ChatIcon />
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Hidden> */}
      {/* <Hidden only={["md", "lg"]}>
        <Box className={classes.footerSection}>
          <Grid container alignItems="center" justify="space-between" spacing={2}>
            <Grid item>
              <Typography className={classes.supportNumber}>
                Help Video
              </Typography>
            </Grid>
            <Grid item>
              <Fab color="primary" aria-label="add" size="small" onClick={() => setGuideVideoDialogOpenIs(true)}>
                <MenuVideoTtrlNavBtnIcon fontSize="medium" />
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Hidden> */}
      {/* {showGuideContent && 
      <Hidden only={["xs", "sm"]}>
        <Box className={classes.footerSection}>
          <Grid container alignItems="center" justify="flex-end" spacing={2}>
            <Grid item>
              <Fab color="primary" aria-label="add" size="small" onClick={() => setGuideVideoDialogOpenIs(true)}>
                <MenuVideoTtrlNavBtnIcon fontSize="medium" />
              </Fab>
            </Grid>
            <Grid item>
              <Typography className={classes.helpText}>Help Video</Typography>
            </Grid>
          </Grid>
        </Box>
      </Hidden>
      } */}
      <GuideVideoDialogBox open={guideVideoDialogOpenIs}
        onClose={setGuideVideoDialogOpenIs} videoUrl={helpVideoUrl} />
      {/* <Box padding={1}>
        <Box className={classes.progressContainer}>
          <Typography variant="h4" className={classes.progressContTitle}>KYC Details</Typography>
          <Grid container alignItems="center">
            {stepperList.map((element, index) => (
              <Grid item xs key={index}>
                <Box className={classes.stepperBox}>
                  <Box className={`${classes.numRoundBox} ${element.status}`}>
                    <span className={`${classes.stepperNumber} ${element.status}`}>{element.step}</span>
                  </Box>
                  <Typography className={`${classes.stepperText} ${element.status}`}>{element.title}</Typography>
                  {element.isAfterLine &&
                    <span className={classes.stepAfterLine}>
                      <span className={classes.stepInnerDots}></span>
                      <span className={classes.stepInnerDots}></span>
                      <span className={classes.stepInnerDots}></span>
                      <span className={classes.stepInnerDots}></span>
                    </span>
                  }
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box> */}
    </div>
  );
};

export default AuthTemplate;
