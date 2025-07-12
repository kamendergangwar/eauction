import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { BannerStyles } from "./Banner.styles";
import {
  BannerIcon1,
  BannerIcon2,
  BannerIcon3,
  BannerIcon4,
  BannerIcon5,
  WhiteClockIcon,
  AnchorLink,
} from "../SvgIcons/SvgIcons";
import Hidden from "@material-ui/core/Hidden";
import { useHistory } from "react-router-dom";

const Banner = (props) => {
  const { applicationState } = props;
  const classes = BannerStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const history = useHistory();

  return (
    <div className={classes.bannerContainer}>
      {applicationState == 1 && (
        <Grid
          container
          alignItems="center"
          justify="space-around"
          className={`${classes.bannerHolder} ${classes.bannerYourRegistration}`}
        >
          <Hidden smDown>
            <Grid item md={2}>
              <BannerIcon1 className={classes.bannerIcon} />
            </Grid>
          </Hidden>
          <Grid item md={9}>
            <Box className={classes.secTitle}>
              <Typography variant="h5">
                {t("banner1.title")}
                <span className={classes.customBadge}>
                  {t("banner1.category")}
                </span>
              </Typography>
              <Typography variant="subtitle1">
                {t("banner1.subTitle")}{" "}
                <span
                  className={classes.AnchorLink}
                  onClick={() => history.push("upload-documents")}
                >
                  {t("banner1.link")} <AnchorLink />{" "}
                </span>{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      {applicationState == 2 && (
        <Grid
          container
          alignItems="center"
          justify="space-around"
          className={`${classes.bannerHolder} ${classes.bannerAppointment}`}
        >
          <Hidden smDown>
            <Grid item md={2}>
              <BannerIcon2 className={classes.bannerIcon} />
            </Grid>
          </Hidden>
          <Grid item md={7}>
            <Box className={classes.secTitle}>
              <Typography variant="h5">
                {t("banner2.title")}
                <span className={classes.customBadge}>
                  {t("banner2.category")}
                </span>
              </Typography>
              <Typography variant="subtitle1">
                {t("banner2.subTitle")}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Button
              color="primary"
              className={classes.bookCtaBtn}
              onClick={() => history.push("book-appointment")}
            >
              {t("banner2.btnText")}
            </Button>
          </Grid>
        </Grid>
      )}

      {applicationState == 4 && (
        <Grid
          container
          alignItems="center"
          justify="space-around"
          className={`${classes.bannerHolder} ${classes.bannerCongratulations}`}
        >
          <Hidden smDown>
            <Grid item md={2}>
              <BannerIcon3 className={classes.bannerIcon} />
            </Grid>
          </Hidden>
          <Grid item md={7}>
            <Box className={classes.secTitle}>
              <Typography variant="h5">{t("banner3.title")}</Typography>
              <Typography variant="subtitle1">
                {t("banner3.subTitle")}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Button
              color="primary"
              className={classes.bookCtaBtn}
              onClick={() => history.push("book-appointment")}
            >
              {t("banner3.btnText")}
            </Button>
          </Grid>
        </Grid>
      )}

      {applicationState == 5 && (
        <Grid
          container
          alignItems="center"
          justify="space-around"
          className={`${classes.bannerHolder} ${classes.bannerUploadDoc}`}
        >
          <Hidden smDown>
            <Grid item md={2}>
              <BannerIcon4 className={classes.bannerIcon} />
            </Grid>
          </Hidden>
          <Grid item md={9}>
            <Box className={classes.secTitle}>
              <Typography variant="h5">
                {t("banner1.title")}
                <span className={classes.customBadge}>
                  {t("banner1.category")}
                </span>
              </Typography>
              <Typography variant="subtitle1">
                {t("banner1.subTitle")}{" "}
                <span className={classes.AnchorLink}>
                  {t("banner1.link")} <AnchorLink />{" "}
                </span>{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      {applicationState == 6 && (
        <Grid
          container
          alignItems="center"
          justify="space-around"
          className={`${classes.bannerHolder} ${classes.bannerUnfortunatelylost}`}
        >
          <Hidden smDown>
            <Grid item md={2}>
              <BannerIcon5 className={classes.bannerIcon} />
            </Grid>
          </Hidden>
          <Grid item md={10}>
            <Box className={classes.secTitle}>
              <Typography variant="h5">
                {t("banner5.title")}{" "}
                <span
                  className={classes.refundBadge}
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  {" "}
                  <WhiteClockIcon /> {t("banner5.category")}
                </span>{" "}
              </Typography>
              <Typography variant="subtitle2">
                {t("banner5.subTitle1")}
              </Typography>
              <Typography className={classes.refundableEmdText}>
                {t("banner5.subTitle2")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      {applicationState == 7 && (
        <Grid
          container
          alignItems="center"
          justify="space-around"
          className={`${classes.bannerHolder} ${classes.registrationClosedBanner}`}
        >
          <Hidden smDown>
            <Grid item md={2}>
              <BannerIcon1 className={classes.bannerIcon} />
            </Grid>
          </Hidden>
          <Grid item md={9}>
            <Box className={classes.secTitle}>
              <Typography variant="h5" className="registration">
                {t("banner6.tittle")}
              </Typography>
              <Typography variant="subtitle1" className="registrationDec">
                {t("banner6.subTitle1")}
                {t("banner6.subTitle2")}{" "}
                <span className={classes.AnchorLink} onClick={()=>window.open("https://cidcohomes.com/en/")}>
                  {t("banner6.subTitle3")} <AnchorLink />{" "}
                </span>{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Banner;
