import { makeStyles } from "@material-ui/core/styles";

export const RecentActivitiesNotificationsStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 3, 3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    maxHeight: "80vh",
    padding: theme.spacing(1.5),
    maxWidth: 600,
    margin: "0 auto",
    overflow: "auto",
    // [theme.breakpoints.only("md")]: {
    // height: 450,
    // },
    [theme.breakpoints.only("xs")]: {
      height: "75vh",
      // height: 450,
    },
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: theme.spacing(1),
  },
  subTitle: {
    color: "#0F2940",
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: theme.spacing(0.6),
  },
  errorMsgBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    "& p": {
      color: "#DBDBDB",
      fontWeight: "normal",
      fontSize: "1rem",
    }
  },
  activityList: {
    "& .MuiSvgIcon-root": {
      backgroundColor: "#006AE7",
      width: 40,
      height: 40,
      color: "#ffffff",
      padding: theme.spacing(1),
      borderRadius: "50%",
      marginRight: theme.spacing(1.2)
    }
  },
  activityTxt: {
    color: "#4C5D6C",
    fontWeight: "normal",
    fontSize: "0.8rem",
  },
  actDatePreview: {
    color: "#4C5D6C",
    fontWeight: 500,
    fontSize: "0.7rem",
  }
}));