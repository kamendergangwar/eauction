import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const MultiCategoryDialogBox = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <DialogTitle id="alert-dialog-title">
            {t("multipleCategoryDialog.title")}
          </DialogTitle>
        </Box>
        <Box p={1}>
          <IconButton onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("multipleCategoryDialog.description1")}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          {t("multipleCategoryDialog.description2")}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={() => onClose(false)}
          color="primary"
        >
          {t("multipleCategoryDialog.cancelButton")}
        </Button>
        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={() => onClose(true)}
          color="primary"
          autoFocus
        >
          {t("multipleCategoryDialog.confirmButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MultiCategoryDialogBox;
