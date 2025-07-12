import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {
  TotalApplicationsIcon,
  ApplicationsInProgressIcon
} from "../../../atoms/SvgIcons/SvgIcons";

const useStyles = makeStyles((theme) => ({
  boxMainRoot: {
    boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
    borderRadius: 10,
    padding: theme.spacing(2.5, 1.5),
    width: 150,
    height: "100%"
  },
  cardTitle: {
    color: "#4C5D6C",
    fontWeight: 500,
    fontSize: "1rem",
    marginBottom: theme.spacing(2)
  },
  amountView: {
    color: "#0F2940",
    fontWeight: 800,
    fontSize: "2rem"
  },
  iconView: {
    width: 40,
    height: 40,
  }
}));

const ApplicationsCountCard = (props) => {
  const { cardData } = props;
  const classes = useStyles();
  const { t } = useTranslation("AgentProfilePageTrans");
  const history = useHistory();
  const [boxColor, setBoxColor] = useState("#0F2940");

  useEffect(() => {
    if (cardData.cardType == "inProgress") {
      setBoxColor("#F27807");
    }
  }, []);

  return (
    <Box component={Paper} className={classes.boxMainRoot}>
      <Box marginBottom={2}>
        {cardData.cardType == "inProgress" ? <ApplicationsInProgressIcon className={classes.iconView} /> : <TotalApplicationsIcon className={classes.iconView} />}
      </Box>
      <Typography className={classes.cardTitle}>
        {cardData.title}
      </Typography>
      <Typography className={classes.amountView} style={{ color: boxColor }}>{cardData.count}</Typography>
    </Box>
  );
};

export default ApplicationsCountCard;
