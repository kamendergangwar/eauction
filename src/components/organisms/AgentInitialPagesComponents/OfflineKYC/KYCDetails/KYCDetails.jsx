import React from "react";
import { useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Step1 from "../../../../../assets/Step1.png";
import Step2 from "../../../../../assets/Step2.png";
import Step3 from "../../../../../assets/Step3.png";
import Step4 from "../../../../../assets/Step4.png";
import { initialPagesStyles } from "../../InitialPages.styles";

const KYCDetails = () => {
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");

  return (
    <div className={classes.kycContainer}>
      <Box textAlign="center" p={1}>
        <Typography variant="h6" gutterBottom>
          {t("kycOfflineForm.offlineKYC.title")}
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" m={1}>
              <img className={classes.imageStyle} src={Step1} alt="step 1" />
              <br />
              <Typography variant="body2" gutterBottom>
                {t("kycOfflineForm.offlineKYC.description1")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" m={1}>
              <img className={classes.imageStyle} src={Step2} alt="step 2" />
              <br />
              <Typography variant="body2" gutterBottom>
                {t("kycOfflineForm.offlineKYC.description2")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" m={1}>
              <img className={classes.imageStyle} src={Step3} alt="step 3" />
              <br />
              <Typography variant="body2" gutterBottom>
                {t("kycOfflineForm.offlineKYC.description3")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center" m={1}>
              <img className={classes.imageStyle} src={Step4} alt="step 4" />
              <br />
              <Typography variant="body2" gutterBottom>
                {t("kycOfflineForm.offlineKYC.description4")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default KYCDetails;
