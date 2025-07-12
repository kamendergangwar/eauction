import React from "react";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

const SnackBox = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Snackbar  {...props} anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }} />
        </div>
    );
};

export default SnackBox;
