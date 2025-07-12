import React from "react";
import { useTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { EStampPinkIcon } from "../../../atoms/SvgIcons/SvgIcons";
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";
import EStampBillingTable from "../../Tables/EStampBillingTable/EStampBillingTable";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Box display="flex" alignItems="center">
        <Box paddingRight={1}>
          <EStampPinkIcon fontSize="large" />
        </Box>
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
      </Box>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles({
  content: {
    marginTop: "-30px",
  },
});

const EStampBillInfoDialogBox = (props) => {
  const { openValue, onClose, width } = props;
  const classes = useStyles();
  const { t } = useTranslation("DocumentsPageTrans");

  return (
    <Dialog
      open={openValue}
      onClose={onClose}
      fullScreen={width === "xs" ? true : false}
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="bill-dialog-title" onClose={onClose}>
        {t("eStampForm.billingSummary.title")}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <EStampBillingTable isRemoveOption={false} />
      </DialogContent>
    </Dialog>
  );
};

export default withWidth()(EStampBillInfoDialogBox);
