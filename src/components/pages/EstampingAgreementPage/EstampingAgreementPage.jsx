import React from "react";
import Layout from "../Layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
const useStyles = makeStyles((theme) => ({
  ContainerBox: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
      width: theme.spacing(65),
      height: theme.spacing(42),
      padding: 20,
    },
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
    top: 160,
    // left: 500
  },
  buttonComponent: {
    borderRadius: 10,
    width: 150,
    height: 39,
    display: "block",
    margin: "auto",
  },
  box: {
    // display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "6px",
  },
  caption: {
    fontFamily: "Noto Sans",
    color: "#0F2940",
    fontWeight: "500",
    fontSize: "15px",
    color: "#65707D",
  },
  texts: {
    margin: 15,
    fontSize: "12px",
    color: "#65707D",
  },
}));

function EstampingAgreementPage({ proceedEstamping }) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    proceedEstamping();
    // window.open(
    //   "https://sandbox.leegality.com/sign/07c137c0-9a38-4e04-a110-34e53c3e0261",
    //   "_self"
    // );
  };
  return (
    <>
      <div className={classes.ContainerBox}>
        <Paper className={classes.box}>
          <Typography variant="h6" display="block" align="left">
            I agree that :
          </Typography>
          <div className={classes.texts}>
            <Typography
              variant="subtitle1"
              display="block"
              align="left"
              className={classes.caption}
            >
              By clicking this checkbox and the eSign button, I agree that this
              mark will be the electronic representation of my signature for the
              electronic document. I also understand that recipients of
              electronic documents I sign will be able to see my signing
              details, including but not restricted to my Email ID/ Phone Number
              and IP address.{" "}
            </Typography>
          </div>

          <Button
            variant="contained"
            color="primary"
            className={classes.buttonComponent}
            size="small"
            disableElevation={true}
            onClick={handleClick}
          >
            link
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default EstampingAgreementPage;
