import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[800],
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const ConfirmDialogBox = (props) => {
  const { title, description, question, onClose, selectedValue, open } = props;
  const classes = useStyles();
  const { t } = useTranslation("FamilyDetailsPageTrans");

  const handleClose = () => {
    onClose("No");
  };

  const handleConfirm = (value) => {
    onClose(value);
  };

  return (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      // fullScreen={width === "xs" ? true : false}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description0">
            {description}
          </DialogContentText>
          {question && (
            <Typography variant="subtitle1" gutterBottom>
              <Trans i18nKey="Translation:skipDialog.question">
                Are you sure you want to
                <strong>skip without saving</strong>
                changes?
              </Trans>
            </Typography>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleClose}
            color="primary"
          >
            {t("addFamilyDetailForm.memberDetelePopup.cancelButton")}
          </Button>
          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={() => handleConfirm(selectedValue)}
            color="primary"
            autoFocus
          >
            {t("addFamilyDetailForm.memberDetelePopup.confirmButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialogBox;
