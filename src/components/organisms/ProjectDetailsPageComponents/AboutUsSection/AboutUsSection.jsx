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

const AboutUsSection = (props) => {
  const { projectDetailsData } = props;
  const classes = ProjectDetailsViewStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();

  return (
    <Box className={`${classes.sectionCover} aboutUs`} id="aboutUsSecId">
      <Typography variant="h2" className={`${classes.sectionTitle}`}>{t("projectDetailsPage.aboutUsSec.title")}</Typography>
      {/* <Typography className={classes.aboutUsParagraph}>{t("projectDetailsPage.aboutUsSec.paragraph")}</Typography> */}
      <Typography className={classes.aboutUsParagraph}>{projectDetailsData?.about || "--"}</Typography>
    </Box>
  );
};

export default AboutUsSection;
