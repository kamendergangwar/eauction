import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import { PhoneIcon, ChatIcon, MenuVideoTtrlNavBtnIcon } from "../../atoms/SvgIcons/SvgIcons";
import Header from "../../atoms/Header/Header";
import StepperBar from "../../atoms/StepperBar/StepperBar";
// import StepperDrawer from "../../atoms/StepperDrawer/StepperDrawer";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import GuideVideoDialogBox from "../../molecules/DialogBoxes/GuideVideoDialogBox/GuideVideoDialogBox";
// import Typography from "@material-ui/core/Typography";
// import { useTranslation } from "react-i18next";
import { layoutStyles } from "./Layout.styles";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Layout = (props) => {
  const { isStepper, children, noScrollIs, width, step,bidder } = props;
  const classes = layoutStyles();
  const { t } = useTranslation("InitialPageTrans");
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const [helpVideoUrl, setHelpVideoUrl] = useState("");
  const ref = useRef(null);
  const currentPathName = useLocation().pathname;
  const [count, setCount] = useState(0);
  const [showGuideContent, setShowGuildeContent] = useState(true);
  const [guideVideoDialogOpenIs, setGuideVideoDialogOpenIs] = useState(false);


  useEffect(() => {
    if (currentPathName == "/application-details") {
      setShowScrollIcon(true);
    }

    if (currentPathName == "/personal-details") {
      setHelpVideoUrl("https://www.youtube.com/embed/uaRpbuHJNiA");
    } else if (currentPathName == "/add-co-applicant") {
      setHelpVideoUrl("https://www.youtube.com/embed/cR_aT4E9lsU")
    } else if (currentPathName == "/category-details") {
      setHelpVideoUrl("https://www.youtube.com/embed/jzniv_cVngA")
    } else if (currentPathName == "/select-projects") {
      setHelpVideoUrl("https://www.youtube.com/embed/TiGVcUL-5QY")
    } else if (currentPathName == "/application-details") {
      setHelpVideoUrl("https://www.youtube.com/embed/fZt5a7NY5Rw")
    } else if (currentPathName == "/make-payments" || currentPathName == "/emd-loan-application") {
      setHelpVideoUrl("https://www.youtube.com/embed/aIIpSK_KiHE")
    } else if (currentPathName == "/payment-details-view") {
      setHelpVideoUrl("https://www.youtube.com/embed/TBD4yetCPWs")
    } else if (currentPathName == "/upload-documents") {
      setHelpVideoUrl("https://www.youtube.com/embed/NcPYTpTguRA")
    } else if (currentPathName == "/my-profile" || currentPathName == "/transaction-details" || currentPathName == "/my-documents" || currentPathName == "/language-setting") {
      setHelpVideoUrl("https://www.youtube.com/embed/5xf7vl5Kmsk")
    } else if (currentPathName == "/dashboard") {
      setHelpVideoUrl("https://www.youtube.com/embed/a5AxUO2FrrY")
    } else {
      setShowGuildeContent(false);
    }

  }, [])



  const StepperSection = () => {
    return (
      <>
        <Hidden smDown>
          <StepperBar activeStep={step} callingForMobileIs={false} />
        </Hidden>
        {/* <Hidden only={["lg", "md", "sm"]}>
          <StepperDrawer
            step={step}
            item={t("title", {
              ns: "PersonalDetailsPageTrans",
            })}
          />
        </Hidden> */}
      </>
    );
  };

  const mainSectionClass = bidder ? classes.mainSectionBidder : classes.mainSection;
  return (
    <>
      <div className={`${classes.background} loggedIn`}>
        <Header />
        <div className={mainSectionClass} id="mainSectionId">
          {isStepper && <StepperSection />}
          <Container className={`${classes.root} ${noScrollIs ? "noInnerScroll" : ""}`} style={{ maxWidth: width ? width : "" }}>
            {children}
          </Container>
        </div>
        {showGuideContent &&
          <Hidden only={["xs", "sm"]}>
            <Box className={classes.footerSection} style={{ display: width ? "none" : "" }}>
              <Grid container alignItems="center" justify="flex-end" direction="column" spacing={2}>
                <Grid item>
                  <Fab color="primary" aria-label="add" size="small" onClick={() => setGuideVideoDialogOpenIs(true)}>
                    <MenuVideoTtrlNavBtnIcon fontSize="medium" />
                  </Fab>
                </Grid>
                <Grid item>
                  <Typography className={classes.helpText}>{t("onboarding.noticePoint3.highLight2")}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Hidden>
        }
        <GuideVideoDialogBox open={guideVideoDialogOpenIs}
          onClose={setGuideVideoDialogOpenIs} videoUrl={helpVideoUrl} />
      </div>
    </>
  );
};

export default withWidth()(Layout);
