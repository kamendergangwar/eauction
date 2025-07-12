import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import KycCard from "../../molecules/Cards/KycCard/KycCard";
import Header from "../../atoms/Header/Header";
import { KycTemplateStyle } from "../KycTemplate/KycTemplate.style";
import Fab from "@material-ui/core/Fab";
import { PhoneIcon, ChatIcon, MenuVideoTtrlNavBtnIcon } from "../../atoms/SvgIcons/SvgIcons";
import Hidden from "@material-ui/core/Hidden";
import KycStepperBox from "../../atoms/KycStepperBox/KycStepperBox";
import CoApplicantKycStepperBox from "../../atoms/KycStepperBox/CoApplicantKycStepperBox";
import GuideVideoDialogBox from "../../molecules/DialogBoxes/GuideVideoDialogBox/GuideVideoDialogBox";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getApplicant } from "../../../redux/features/applicant/ApplicantSlice";

function KycTemplate(props) {
  const { children, isCoApplicant, hideStepperIs } = props;
  const classes = KycTemplateStyle();
  const dispatch = useDispatch();
  const currentPathName = useLocation().pathname;
  const [helpVideoUrl, setHelpVideoUrl] = useState("");
  const [showGuideContent, setShowGuildeContent] = useState(true);
  const [guideVideoDialogOpenIs, setGuideVideoDialogOpenIs] = useState(false);
  const { t } = useTranslation("InitialPageTrans");
  
  useEffect(() => {
    
    if (currentPathName == "/auth-verify-aadhaar") {
      setHelpVideoUrl("https://www.youtube.com/embed/EECyST_b-w8");
    } else if (currentPathName == "/verify-pancard") {
      setHelpVideoUrl("https://www.youtube.com/embed/lWpdxldLQjc");
    } else if (currentPathName == "/question-1") {
      setHelpVideoUrl("https://www.youtube.com/embed/R-vglmoEbnc");
    } else {
      setShowGuildeContent(false);
    }
    
  }, [])


  return (
    <div className={classes.background}>
      <Header kycPagesIs={true} />
      {!hideStepperIs &&
        <Hidden smDown>
          {isCoApplicant ?
            <CoApplicantKycStepperBox callingForMobileIs={false} /> : <KycStepperBox callingForMobileIs={false} />}
        </Hidden>
      }
      <KycCard>
        {children}
      </KycCard>
      {showGuideContent && 
      <Hidden only={["xs", "sm"]}>
        <Box className={classes.footerSection}>
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
  );
}

export default KycTemplate;
