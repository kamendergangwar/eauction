import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { Grid, Box, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ProjectSearchIcon } from "../../../atoms/SvgIcons/SvgIcons";
import BasePriceIcon from "../../../../assets/essentialInfoIcons/basePriceIcon.png";
import CarpetAreaIcon from "../../../../assets/essentialInfoIcons/carpetAreaIcon.png";
import DevelopmentStatus from "../../../../assets/essentialInfoIcons/developmentStatus.png";
import TypeIcon from "../../../../assets/essentialInfoIcons/typeIcon.png";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 40px rgba(7, 42, 200, 0.1)",
    borderRadius: 10,
    position: "relative",
    padding: theme.spacing(0, 6.25),
    margin: theme.spacing(-5, 5, 3.75),
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 0),
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
  },
  dtlsCard: {
    padding: theme.spacing(3),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3.75, 3),
    },
    "& img": {
      display: "block",
      maxWidth: 32,
      maxHeight: 32,
      marginBottom: theme.spacing(1.5)
    },
    "& .title": {
      color: "#65707D",
      fontWeight: 600,
      fontSize: "0.9rem",
      marginBottom: theme.spacing(1.5)
    },
    "& .valueView": {
      color: "#00437E",
      fontWeight: "bold",
      fontSize: "2rem"
    },
    "& .MuiDivider-vertical": {
      backgroundColor: "#001979",
      opacity: 0.2,
      height: 80,
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
      [theme.breakpoints.down("sm")]: {
        display: "none"
      },
    }
  }
}));

const EssentialDetailsCard = (props) => {
  const { projectDetailsData } = props;
  const classes = useStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val)
      ? "0"
      : amount_val.toString().split(".")[0].length > 3
        ? amount_val
          .toString()
          .substring(0, amount_val.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        amount_val
          .toString()
          .substring(amount_val.toString().split(".")[0].length - 3)
        : amount_val.toString();
  };

  return (
    <Box className={classes.cardRoot}>
      <Grid container>
        <Grid item md={3} xs={12}>
          <Box className={classes.dtlsCard}>
            <img src={BasePriceIcon} alt="icon" />
            <Typography className="title">{t("projectDetailsPage.essentialDetailsSec.label1")}</Typography>
            <Typography className="valueView">Announcing Soon</Typography>
            {/* <Typography className="valueView">₹ {projectDetailsData?.price ? numberWithCommas(projectDetailsData?.price) : "--"}</Typography> */}
            <Divider orientation="vertical" />
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box className={classes.dtlsCard}>
            <img src={CarpetAreaIcon} alt="icon" />
            <Typography className="title">{t("projectDetailsPage.essentialDetailsSec.label2")}</Typography>
            <Typography className="valueView">{projectDetailsData?.carpetArea || "--"} <small>{t("projectDetailsPage.essentialDetailsSec.sqftText")}</small></Typography>
            <Divider orientation="vertical" />
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box className={classes.dtlsCard}>
            <img src={TypeIcon} alt="icon" />
            <Typography className="title">{t("projectDetailsPage.essentialDetailsSec.label3")}</Typography>
            <Typography className="valueView">{projectDetailsData?.bhk || "--"} {t("projectDetailsPage.essentialDetailsSec.bhkText")}</Typography>
            <Divider orientation="vertical" />
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box className={classes.dtlsCard}>
            <img src={DevelopmentStatus} alt="icon" />
            <Typography className="title">{t("projectDetailsPage.essentialDetailsSec.label4")}</Typography>
            <Typography className="valueView">{projectDetailsData?.status || "--"}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EssentialDetailsCard;
