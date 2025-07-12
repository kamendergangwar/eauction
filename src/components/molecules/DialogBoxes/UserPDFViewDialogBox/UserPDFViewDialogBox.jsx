import React, { useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import { BlackDownloadIcon, DialogBackArrowIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { Button } from "@material-ui/core";


export const DialogContent = withStyles((theme) => ({
  root: {
    padding: 0,
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  dialogHeader: {
    padding: theme.spacing(1)
  },
  closeButton: {
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0
    }
  },
  downloadButton: {
    marginRight: theme.spacing(1.5)
  },
  printButton: {
    // marginRight: theme.spacing(1.5)
  },
  fileFormatIcon: {
    maxWidth: 20,
    display: "block",
    marginRight: theme.spacing(1.5),
  },
  dialogTitleText: {
    color: "#000",
    fontSize: "0.9rem",
    fontWeight: 500,
    "& span": {
      color: "#4C5D6C",
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    }
  },
  dialogContainer: {
    backgroundColor: "#3B4B63",
    textAlign: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#cbcbcb"
    },
    "& img": {
      maxWidth: "80%"
    },
  },
  dialogActions: {
    justifyContent: "center",
    padding: 0,
    "& .MuiButton-root": {
      backgroundColor: "#3B4B63",
      borderRadius: "0px 0px 5px 5px",
      border: 0,
      color: "#fff",
      fontSize: "1.125rem",
      padding: theme.spacing(2.5),
      width: "100%"
    }
  }
}));

const UserPDFViewDialogBox = (props) => {
  const { open, onClose, fileUrl, showDownload } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation("ProfilePageTrans");

  const handleClose = () => {
    onClose();
  };

  function downloadFile(Url) {
    fetch(Url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'document';
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
      });
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <MuiDialogTitle disableTypography className={classes.dialogHeader}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs="auto">
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={onClose}
                >
                  <CloseIcon />
                </IconButton>
            </Grid>
            <Grid item xs="auto">
              {showDownload &&
                <Button
                  aria-label="Download"
                  className={classes.downloadButton}
                  size="small"
                  endIcon={<BlackDownloadIcon fontSize="small" />}
                  onClick={() => downloadFile(fileUrl)}
                >
                  {t("myDocumentSec.downloadBtnText")}
                </Button>}
            </Grid>
          </Grid>
        </MuiDialogTitle>
        <DialogContent>
          <Box className={classes.dialogContainer} style={{ padding: 0 }}>
            {/* {fileUrl.split(".").pop()=='pdf' ? */}
            {fileUrl.includes(".pdf") ?
              // eslint-disable-next-line jsx-a11y/iframe-has-title
              <iframe src={`${fileUrl}#toolbar=0`} type="application/pdf" width="100%" height="500px">
                {/* <p>Alternative text - include a link <a href={fileUrl}>to the PDF!</a></p> */}
              </iframe>
              :
              <>
                <img src={fileUrl} alt="Document Preview" />
              </>}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserPDFViewDialogBox;