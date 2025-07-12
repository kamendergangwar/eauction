import React, { useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  getDynamicFile,
  clearDocDeclarationState,
  docDeclarationSelector,
} from "../../../../redux/features/file/DocDeclarationSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../redux/features/preferences/PreferencesSlice";
import { FormControl as MUIform } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { DialogBackArrowIcon, BlackDownloadIcon, DownloadIcon, DialogPrintIcon, ApplicationDownloadIcon } from "../../../atoms/SvgIcons/SvgIcons";
import PngIcon from "../../../../assets/pngIcon.png";
import JpgIcon from "../../../../assets/jpgIcon.png";
import PdfIcon from "../../../../assets/pdfIcon.png";
import othericon from "../../../../assets/otherFile.png";
import LargPdfIcon from "../../../../assets/largPdfIcon.png";
import Loading from "../../../atoms/Loading/Loading";
import { useSelector } from "react-redux";

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

const UserDocumentPreviewDialogBox = (props) => {
  const { open, onClose, documentPreviewData, downloadFile, bytesToSize } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation("ProfilePageTrans");
  const [isConfirmCheckbox, setConfirmCheckbox] = useState(false);
  const updateConfirmCheckbox = () => setConfirmCheckbox(!isConfirmCheckbox);
  const { isFetchingFile, isSuccessFile, fileData } = useSelector(docDeclarationSelector);
  const {
    isSuccessResGetPreferences
  } = useSelector(preferencesSelector);
  const [fileUrl, setFileUrl] = useState("");

  const handleClose = () => {
    onClose();
    dispatch(clearDocDeclarationState());
  };

  useEffect(() => {
    if (open) {
      // dispatch(getPreferencesList()).then(response => {
      // if (response.payload.success) {
      var item = documentPreviewData.DocumentValue;
      var lastItem = item.split("/").pop();
      dispatch(getDynamicFile(lastItem));
      // }
      // })
    }
  }, [open]);

  useEffect(() => {
    if (isSuccessFile) {
      setFileUrl(fileData)
    }
  }, [isSuccessFile]);

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      dispatch(clearPreferencesState());
    }
  }, [isSuccessResGetPreferences])

  return (
    <>
      {isFetchingFile && (
        <Loading isOpen={isFetchingFile} />
      )}
      <Dialog
        open={isSuccessFile}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <MuiDialogTitle disableTypography className={classes.dialogHeader}>
          <Grid container alignItems="center">
            <Hidden smDown>
              <Grid item xs="auto">
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={handleClose}
                >
                  <DialogBackArrowIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item xs="auto">
                {
                  "png" == documentPreviewData?.fileType ? (
                    <img src={PngIcon} alt="Img Fromat Icon" className={classes.fileFormatIcon} />
                  ) : ("pdf" == documentPreviewData?.fileType ? (
                    <img src={PdfIcon} alt="Img Fromat Icon" className={classes.fileFormatIcon} />
                  ) : ("jpeg" == documentPreviewData?.fileType || "jpg" == documentPreviewData?.fileType ? (
                    <img src={JpgIcon} alt="Img Fromat Icon" className={classes.fileFormatIcon} />
                  ) : (<img src={othericon} alt="Img Fromat Icon" className={classes.fileFormatIcon} />)))
                }
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography variant="h6" className={classes.dialogTitleText}> {documentPreviewData.DisplayName} <span>{t("myDocumentSec.sizeLabel")} : {bytesToSize(documentPreviewData.FileSize)} </span></Typography>
            </Grid>
            <Grid item xs="auto">
              <Hidden smDown>
                <IconButton
                  aria-label="Download"
                  className={classes.downloadButton}
                  onClick={() => downloadFile(documentPreviewData)}
                >
                  <BlackDownloadIcon fontSize="small" />
                </IconButton>
                {/* <IconButton
                aria-label="Print"
                className={classes.printButton}
              >
                <DialogPrintIcon fontSize="small" />
              </IconButton> */}
              </Hidden>
              <Hidden mdUp>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={onClose}
                >
                  <CloseIcon />
                </IconButton>
              </Hidden>
            </Grid>
          </Grid>
        </MuiDialogTitle>
        <DialogContent>
          <Box className={classes.dialogContainer}>
            {documentPreviewData?.fileType === "pdf" ?
              <>
                {/* <img src={LargPdfIcon} alt="Docuemnt Preview" width={250} /> */}
                <object data={fileUrl} type="application/pdf" width="100%" height="500px">
                  <p>Alternative text - include a link <a href={fileUrl}>to the PDF!</a></p>
                </object>
              </>
              :
              <>
                <img src={fileUrl} alt="Docuemnt Preview" />
              </>
            }
          </Box>
        </DialogContent>
        <Hidden mdUp>
          <DialogActions className={classes.dialogActions}>
            <Button
              type="button"
              variant="contained"
              startIcon={<ApplicationDownloadIcon fontSize="small" />}
              onClick={() => downloadFile(documentPreviewData)}
            >
              {t("myDocumentSec.downloadBtnText")}
            </Button>
          </DialogActions>
        </Hidden>
      </Dialog>
    </>
  );
};

export default UserDocumentPreviewDialogBox;