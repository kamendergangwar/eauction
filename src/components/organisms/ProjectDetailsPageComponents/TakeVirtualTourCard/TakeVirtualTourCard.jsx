import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { ProjectDetailsViewStyles } from "../ProjectDetailsView.styles";
import TourSectionBg from "../../../../assets/projectDetails/tourSectionBg.png";

const TakeVirtualTourCard = (props) => {
  const { applicationsList } = props;
  const classes = ProjectDetailsViewStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();

  return (
    <Box className={`${classes.sectionCover} takeTour`}>
      <Grid container>
        <Grid item md={6}>
          <Box className={classes.takeTourCard}>
            <Typography variant="h2" className={`${classes.sectionTitle} white`}>{t("projectDetailsPage.viewHomesSec.title")}</Typography>
            <Typography className={classes.tourParagraph}>{t("projectDetailsPage.viewHomesSec.paragraph")}</Typography>
            <a href="https://experience.cognilements.com/Helioscart/" target="_blank" rel="noreferrer" className={classes.takeTourBtn}>{t("projectDetailsPage.viewHomesSec.takeTourBtnTxt")}</a>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box className={classes.tourSecBgImg}>
            {/* <img className={classes.tourSecBgImg} src={TourSectionBg} alt="img" /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TakeVirtualTourCard;
