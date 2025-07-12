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
import Divider from '@material-ui/core/Divider';
import Loading from "../../../atoms/Loading/Loading";

const styles = (theme) => ({
    root: {
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[800],
    },
    wantTextBox: {
        color: "#00437E",
        fontSize: "1.2rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
            marginRight: theme.spacing(2.5)
        },
    },
});

export const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" className={classes.wantTextBox}>{children}</Typography>
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
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
    /* dialogActions: {
      justifyContent: "center",
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(3),
    }, */
    /* benefitsSection: {
      padding: theme.spacing(5, 20),
    }, */
    orderList: {
        color: "#65707D",
        margin: theme.spacing(2, 0, 0, 0),
        paddingLeft: theme.spacing(2),
        lineHeight: "26px",
        fontSize: "0.9rem",
    },
}));

const GuideVideoDialogBox = (props) => {
    const {  onClose, videoUrl, open } = props;
    const classes = useStyles();
    const { t } = useTranslation("PersonalDetailsPageTrans");

    const handleClose = () => {
        onClose();
    };

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
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>Video Tutorial/help</DialogTitle>
                <Divider />
                <DialogContent>
                    {/* <Loading isOpen="true" /> */}
                    <iframe width="100%" height="320" src={videoUrl} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                </DialogContent>
                {/* <DialogActions className={classes.dialogActions}>
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
                </DialogActions> */}
            </Dialog>
        </>
    );
};

export default GuideVideoDialogBox;
