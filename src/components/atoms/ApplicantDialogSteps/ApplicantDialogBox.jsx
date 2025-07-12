import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ApplicantDialogBoxShowProcess = (props) => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <>
            <Dialog
                // maxWidth={maxWidth}
                open={true}
                // onClose={() => {
                //   setConfirmScheme(false);
                // }}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="SessionExpired-dialog"
            >
                <DialogTitle id="SessionExpired-dialog">{props.header}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Dear Customer, Your session has been inactive for a while. Due to security reasons, you need to <Link onClick={() => props.action()}>login again</Link> .
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ApplicantDialogBoxShowProcess;
