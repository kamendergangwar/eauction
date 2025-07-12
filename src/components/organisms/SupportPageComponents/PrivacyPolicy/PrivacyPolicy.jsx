import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SupportPagesStyles } from "../SupportPages.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";

const PrivacyPolicy = (props) => {
  const { width } = props;
  const classes = SupportPagesStyles();
  const { t } = useTranslation("SupportPageTrans");
  const history = useHistory();

  return (
    <FormCard>
      <Box className={classes.rootContainer}>
        <Typography variant="h2" className={classes.pageTitle}>
          {t("privacyPolicy.title")}
        </Typography>
        <Box className={classes.contentSection}>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section1.paragraph1")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section1.paragraph2")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section1.paragraph3")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section1.paragraph4")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section2.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section2.paragraph1")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section3.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section3.paragraph1")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section4.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section4.paragraph1")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section4.paragraph2")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section5.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section5.paragraph1")}
          </Typography>
          <ul>
            <li>{t("privacyPolicy.section5.listItems.item1")}</li>
            <li>{t("privacyPolicy.section5.listItems.item2")}</li>
            <li>{t("privacyPolicy.section5.listItems.item3")}</li>
            <li>{t("privacyPolicy.section5.listItems.item4")}</li>
          </ul>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section5.paragraph2")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section6.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section6.paragraph1")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section7.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section7.paragraph1")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section8.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section8.paragraph1")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section9.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section9.paragraph1")}
          </Typography>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("privacyPolicy.section10.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section10.paragraph1")} <a href="tel:+91 9930870000">9930870000</a>
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("privacyPolicy.section10.paragraph2")} <a href="https://beta.helioscart.com/privacy-policy" target="_blank" rel="noopener noreferrer">https://beta.helioscart.com/privacy-policy</a>
          </Typography>
          {/* <Box className={classes.infoBox}>
            <Grid container alignItems="flex-end">
              <Grid item xs="auto">
                <Typography className={classes.sectionPara}>
                  {t("privacyPolicy.section10.addressLine1")}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.underlinePara}></Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography className={classes.sectionPara}>,</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end">
              <Grid item xs="auto">
                <Typography className={classes.sectionPara}>
                  {t("privacyPolicy.section10.addressLine2")}: {t("privacyPolicy.section10.addressLine3")}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.underlinePara}></Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography className={classes.sectionPara}>{t("privacyPolicy.section10.addressLine4")}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end">
              <Grid item xs>
                <Typography className={classes.underlinePara}></Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end">
              <Grid item xs="auto">
                <Typography className={classes.sectionPara}>
                  {t("privacyPolicy.section10.addressLine5")}:
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.underlinePara}></Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end">
              <Grid item xs="auto">
                <Typography className={classes.sectionPara}>
                  {t("privacyPolicy.section10.addressLine6")}:
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.underlinePara}></Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end">
              <Grid item xs="auto">
                <Typography className={classes.sectionPara}>
                  {t("privacyPolicy.section10.addressLine7")}:
                </Typography>
              </Grid>
              <Grid item xs>
                <a href="#" className={classes.portalLink}> https://----------.com/grievances/</a>
              </Grid>
            </Grid>
          </Box> */}
        </Box>
      </Box>
    </FormCard>
  );
};

export default PrivacyPolicy;
