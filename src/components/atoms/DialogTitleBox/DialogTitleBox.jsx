import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { BlackBackArrowIcon } from "../SvgIcons/SvgIcons";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  dialogHeader: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    "& > .MuiGrid-container": {
      flexWrap: "nowrap"
    },
  },
  mainTitle: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      paddingRight: theme.spacing(5),
      display: "flex",
      alignItems: "center",
      textAlign: "left",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1.5),
      display: "inline-block",
      verticalAlign: "middle",
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(1.2),
        fontSize: "1.8rem"
      },
    },
    "& span": {
      display: "inline-block",
      verticalAlign: "middle"
    }
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[800],
    [theme.breakpoints.down("sm")]: {
      right: theme.spacing(0.5),
      top: theme.spacing(0.5),
    },
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { title, titleIcon, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogHeader} {...other}>
      <Typography variant="h5" className={classes.mainTitle}>{titleIcon} <span>{title}</span></Typography>
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

const DialogTitleBox = (props) => {
  const { title, titleIcon, handleClose } = props;
  // const classes = styles();

  return (
    <DialogTitle id="customized-dialog-title" onClose={handleClose} title={title} titleIcon={titleIcon} />
  );
}

export default DialogTitleBox;
