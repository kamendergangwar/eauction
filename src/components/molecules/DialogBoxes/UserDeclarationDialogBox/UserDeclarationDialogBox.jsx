import React, { useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { fileDataUpload, fileUploadSelector, setImageUrl, clearImageUrl } from "../../../../redux/features/file/FileUploadSlice";
import { agreeDeclaration, clearDocDeclarationState, docDeclarationSelector } from "../../../../redux/features/file/DocDeclarationSlice";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { FormControl as MUIform } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import UserDeclarationIcon from "../../../../assets/userDeclarationIcon.png";
import { getApplicant } from "../../../../redux/features/applicant/ApplicantSlice";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[800],
  },
  dialogTitleText: {
    color: "#0F2940",
    fontSize: "1.2rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  const { isFileFetching, isFileSuccess, imageUrl, isFileError, fileErrorMessage } = useSelector(fileUploadSelector);
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.dialogTitleText}>{children}</Typography>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: 0,
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1)
    }
  },
  declarationIconBox: {
    marginBottom: theme.spacing(3),
    textAlign: "center",
    "& img": {
      maxWidth: 150
    }
  },
  noteCheckbox: {
    color: "#4C5D6C",
    "& .MuiFormControlLabel-root": {
      alignItems: "start",
      margin: 0
    },
    "& .MuiIconButton-root": {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(-1),
      [theme.breakpoints.down("sm")]: {
        marginRight: 0
      }
    },
    "& .MuiTypography-body1": {
      fontSize: "0.9rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      }
    }
  },
  dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(4),
    "& .MuiButton-root": {
      borderRadius: 16,
      border: 0,
      fontSize: "1.125rem",
      padding: theme.spacing(1.5, 4),
      "&.Mui-disabled": {
        backgroundColor: "#99CAF5",
        color: "#fff"
      }
    }
  }
}));

const UserDeclarationDialogBox = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation("InitialPageTrans");
  const [isConfirmCheckbox, setConfirmCheckbox] = useState(false);
  const dispatch = useDispatch();
  const updateConfirmCheckbox = () => setConfirmCheckbox(!isConfirmCheckbox);
  const { isSuccessResDeclaration } = useSelector(docDeclarationSelector);
  
  const handleClose = () => {
    onClose();
  };

  
  const continueDeclaration = () => {
    let paramsObj = {
      "agreed_declaration": isConfirmCheckbox == true ? true : false
    };
    dispatch(agreeDeclaration(paramsObj));
  };

  useEffect(() => {
    if (isSuccessResDeclaration) {
      dispatch(clearDocDeclarationState());
      localStorage.removeItem("agreedDeclaration");
      history.push("/personal-details");
    }
  }, [isSuccessResDeclaration]);

  return (
    <>
      <Dialog
        open={open || false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      // fullScreen={width === "xs" ? true : false}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>{t("userDeclaration.title")}</DialogTitle>
        <DialogContent>
          <div className={classes.dialogContainer}>
            <Box className={classes.declarationIconBox}>
              <img src={UserDeclarationIcon} alt="User Declaration Icon" />
            </Box>
            <MUIform component="fieldset" error={!isConfirmCheckbox} className={classes.noteCheckbox}>
              <FormControlLabel
                name="unchangedRemainsIs"
                checked={isConfirmCheckbox}
                onChange={updateConfirmCheckbox}
                control={<Checkbox color="primary" />}
                label={t("userDeclaration.confirmationCheckBoxLabel")}
                labelPlacement="end"
              />
            </MUIform>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={!isConfirmCheckbox}
            onClick={() => continueDeclaration()}
          >
            {t("userDeclaration.continueBtnText")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserDeclarationDialogBox;
