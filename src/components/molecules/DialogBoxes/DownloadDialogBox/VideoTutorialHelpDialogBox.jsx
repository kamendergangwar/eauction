import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { Button, ButtonBase } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { TutorialVidPlayIcon } from "../../../atoms/SvgIcons/SvgIcons";
import FormControl from "../../FormControl/FormControl";
import { DownloadUserManualBanner, DownloadIcon } from "../../../atoms/SvgIcons/SvgIcons";
import Loading from "../../../atoms/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserManual,
  clearUserManualData,
  masterDataSelector,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import { ApiEndPoint } from "../../../../utils/Common";

const StyledButton = withStyles(() => ({
  root: {
    minWidth: "100px",
    boxSizing: "borderBox",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "24px",
    borderRadius: "4px",
    padding: "6px 8px",
    boxShadow: "inset 0px 0px 10px 2px rgb(0 0 0 / 6%)",
    borderRadius: "40px",
    color: "#9095B0",
    margin: "0 5px"
  }
}))(ButtonBase);


const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    "& .MuiDialog-paper": {
      minWidth: 750,
      [theme.breakpoints.down("sm")]: {
        minWidth: "auto",
        margin: theme.spacing(2)
      }
    }
  },
  dialogBoxTitle: {
    position: "relative",
    "& .MuiTypography-h6": {
      color: "#00437E",
      textAlign: "center",
      fontSize: "0.9rem"
    }
  },
  dialogBoxCloseBtn: {
    position: "absolute",
    top: "50%",
    right: 5,
    transform: "translateY(-50%)"
  },
  dialogContentSec: {
    padding: theme.spacing(3, 10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },
  bannerICon: {
    width: "165px",
    height: "160px"
  },
  decContent:{
    color: "#0F2940",
    fontSize: "0.875rem",
    fontWeight: "600",
    lineHeight: "21px",
    letterSpacing: "0.02em",
    textTransform: "capitalize"
  },
  languageBtn:{
    background: "#FFFFFF",
    boxShadow: "inset 0px 0px 10px 2px rgba(0, 0, 0, 0.06)",
    borderRadius: "40px",
    color: "#9095B0",
    fontWeight: "bold",
    fontSize: "0.875rem",
    lineHeight: "24px",
    textTransform: "capitalize",
    margin: "10px",
    "&:hover": {
      backgroundColor: "#0038C0",
    }
  },
  activeBtn: {
    background: "#0151CA",
    borderRadius: "40px",
    color: "#FFFFFF",
    padding: theme.spacing(0.6, 3),
    boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.06)"
  },
  downloadBtn:{
    width: "248px",
    height: "48px",
    marginTop: "20px",
    marginBottom: "45px"
  },
  activeButton: {
    background: "#0151CA",
    color: "#fff"
  }
}));


const DownloadDialogBox = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [downloadLanguage, setDownloadLanguage] = useState("en");
  const { downloadUsermanual, isSuccessUsermanual, isFetchingUsermanual } = useSelector(masterDataSelector);


  const downloadFile = () => {
    dispatch(getUserManual(downloadLanguage));
  }


  useEffect(() => {
    if(isSuccessUsermanual && downloadUsermanual.length > 0) {
      let fileUrl = downloadUsermanual;
      window.open(fileUrl[0]?.FileName);

      dispatch(clearUserManualData());

    }
  },[isSuccessUsermanual])

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialogRoot}
    >
      {(isFetchingUsermanual) && (
          <Loading isOpen={isFetchingUsermanual} />
        )}
      <Box className={classes.dialogBoxTitle}>
        <DialogTitle id="alert-dialog-title">
          Download User Manual
          {/* {t("videoTutorialSection.title")} */}
        </DialogTitle>
        <IconButton
          className={classes.dialogBoxCloseBtn}
          onClick={() => onClose()}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent className={classes.dialogContentSec}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
          <Box p={2}>
            <DownloadUserManualBanner className={classes.bannerICon} />
          </Box>
              <Typography variant="h1" className={classes.decContent}>
                Select the Language to Download the User Manual.
              </Typography>

              <Box p={4}>
                <StyledButton name="second" className={downloadLanguage === "en" ? `${classes.activeButton}` : ""} onClick={() => setDownloadLanguage("en")}>
                  English
                </StyledButton>

                <StyledButton name="second" className={downloadLanguage === "mr" ? `${classes.activeButton}` : ""} onClick={() => setDownloadLanguage("mr")}>
                  मराठी
                </StyledButton>

                <StyledButton name="second" className={downloadLanguage === "hi" ? `${classes.activeButton}` : ""} onClick={() => setDownloadLanguage("hi")}>
                  हिंदी
                </StyledButton>
              </Box>

              <Button variant="outlined" color="primary" size="large" className={classes.downloadBtn} startIcon={<DownloadIcon />} onClick={() => downloadFile()}>
                Download Manual
              </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialogBox;
