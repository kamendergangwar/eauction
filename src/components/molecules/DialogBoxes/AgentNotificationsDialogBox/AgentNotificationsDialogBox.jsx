import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  dialogBoxCloseBtn: {
    backgroundColor: "#0F2940",
    color: "#fff",
    padding: "2px",
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#0F2940",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem"
    }
  },
  dialogBoxTitle: {
    padding: theme.spacing(2),
    "& .MuiDialogTitle-root": {
      padding: 0
    },
    "& h2": {
      fontSize: "1rem",
      "& .MuiSvgIcon-root": {
        verticalAlign: "middle"
      }
    }
  },
  dotView: {
    backgroundColor: "#E63626",
    borderRadius: "50%",
    display: "inline-block",
    width: 10,
    height: 10,
    marginLeft: theme.spacing(1.4)
  },
  dialogContentSec: {
    minWidth: "450px",
    padding: theme.spacing(2)
  },
  notifiListViewCont: {
    marginBottom: theme.spacing(1),
    "& h6": {
      color: "#65707D",
      fontWeight: "normal",
      fontSize: "0.8rem",
      paddingLeft: "5px"
    }
  },
  notifiListViewMain: {
    // marginBottom: theme.spacing(1),
  },
  notificationList: {
    backgroundColor: "#FCFCFC",
    boxShadow: "2px 4px 6px rgb(0 0 0 / 6%)",
    borderRadius: 5,
    padding: "10px 15px",
    "& .leftStsIcon": {
      backgroundColor: "#FBEDEC",
      borderRadius: "50%",
      color: "#CC1100",
      width: 45,
      height: 45,
      marginRight: theme.spacing(1.3),
      padding: 8,
    },
    "& .MuiListItemText-root": { margin: "0 0 5px" },
    "& .MuiTypography-displayBlock": {
      color: "#0F2940",
      fontWeight: 600,
      fontSize: "1rem",
    }
  },
  notifiDateTime: {
    color: "#4C5D6C",
    fontWeight: 500,
    fontSize: 10,
  },
  notifiNewSts: {
    color: "#007AE7",
    fontWeight: 600,
    fontSize: 10,
    marginLeft: 30,
    "& .beforeDot": {
      backgroundColor: "#007AE7",
      borderRadius: "50%",
      display: "inline-block",
      width: 5,
      height: 5,
      verticalAlign: "middle",
      marginRight: 5
    }
  }
}));

const AgentNotificationsDialogBox = (props) => {
  const { open, onClose, selectedApplication } = props;
  const classes = useStyles();
  const { t } = useTranslation("AgentApplicationDashboardPageTrans");
  const [appNotifications, setAppNotifications] = useState([]);

  useEffect(() => {
    console.log("selectedApplication", selectedApplication.DashboardNotifications);
    if (Array.isArray(selectedApplication?.DashboardNotifications)) {
      setAppNotifications(selectedApplication.DashboardNotifications);
    }
  }, [selectedApplication]);

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <Grid container alignItems="center" className={classes.dialogBoxTitle}>
        <Grid item xs>
          <DialogTitle id="alert-dialog-title">
            <NotificationsNoneOutlinedIcon /> {t("Notifications")}
            <span className={classes.dotView}></span>
          </DialogTitle>
        </Grid>
        {/* <Grid item>
          <Button
            type="button"
            color="primary" size="small"
          >
            {t("Mark All as Read")}
          </Button>
        </Grid> */}
        <Grid item>
          <IconButton className={classes.dialogBoxCloseBtn} onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <DialogContent className={classes.dialogContentSec}>
        <Grid className={classes.notifiListViewCont}>
          <Typography variant="h6">New</Typography>
          {appNotifications.map((element, i) => (
            <List key={i} component="nav" className={classes.notifiListViewMain} aria-label="secondary mailbox folders">
              <ListItem className={classes.notificationList}>
                <Grid container alignItems="center">
                  {/* <Grid item>
                    <NotInterestedOutlinedIcon className="leftStsIcon" />
                  </Grid> */}
                  <Grid item xs>
                    <ListItemText primary={element.MsgBody || "-"} />
                    <Grid container>
                      <Grid item><Typography className={classes.notifiDateTime}>{element.CreatedAt ? `${moment(element.CreatedAt).format("DD/MM")} at ${moment(element.CreatedAt).format("hh:mm a")}` : "-"}</Typography></Grid>
                      <Grid item><Typography className={classes.notifiNewSts}><span className="beforeDot"></span> New</Typography></Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <IconButton>
                      <ArrowForwardOutlinedIcon />
                    </IconButton>
                  </Grid> */}
                </Grid>
              </ListItem>
            </List>
          ))}
        </Grid>
      </DialogContent>
      {/* <DialogActions className={classes.dialogActions}>
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
      </DialogActions> */}
    </Dialog>
  );
};

export default AgentNotificationsDialogBox;
