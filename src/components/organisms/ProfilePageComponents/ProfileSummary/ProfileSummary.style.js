import { makeStyles } from "@material-ui/core/styles";
import ProfilePageBgImage from "../../../../assets/profilePageBgImage.png";

export const ProfileSummaryStyles = makeStyles((theme) => ({
  profileContainer: {
    padding: theme.spacing(3),
  },
  myProfileHeader: {
    backgroundColor: "#EBEEF5",
    backgroundImage: `url(${ProfilePageBgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: 8,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  pageTitle: {
    color: "#0F2940",
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  pageSubText: {
    color: "#65707D",
    fontSize: "0.8rem",
    marginBottom: theme.spacing(3),
  },
  projCountViewCard: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    textAlign: "center",
    padding: theme.spacing(2.5),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.2),
    },
    "& .count": {
      color: "#0038C0",
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
    "& .cardTitle": {
      color: "#65707D",
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  },
  dotIndicator: {
    position: "absolute",
    backgroundColor: "#8CE4B2",
    width: 10,
    height: 10,
    borderRadius: "50%",
    left: theme.spacing(1),
    top: theme.spacing(1),
    "&.saved": {
      backgroundColor: "#EFBD5B",
    },
    "&.total": {
      backgroundColor: "#8CCFE4",
    },
  },

  myProfileSec: {
    borderRadius: "5px",
    marginBottom: "40px",
    backgroundColor: "#FFFFFF",
  },

  verifiedContent: {
    alignItems: "center",
    headerTxt: {
      color: "#0F2940",
      fontWeight: "600",
      fontSize: "1.125rem",
      lineHeight: "27px",
      letterSpacing: "0.02em",
    },
  },

  verifiedLogo: {
    display: "flex",
    width: "22px",
    padding: "2px",
    margin: theme.spacing(0, 0.75, 0, 1.5),
  },
  subheaderTxt: {
    color: "#65707D",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",
    paddingTop: theme.spacing(1),
  },

  verifiedMsgView: {
    background: "rgba(33, 150, 83, 0.15)",
    borderRadius: "60px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",
    padding: theme.spacing(0.125, 1.25),
  },

  verified: {
    background: "rgba(33, 150, 83, 0.15)",
    color: "#219653",
    borderRadius: "60px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",
    padding: theme.spacing(0.125, 1.25),
  },

  notVerified: {
    background: "rgb(255 16 16 / 15%)",
    color: "#962121",
    borderRadius: "60px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",
    padding: theme.spacing(0.125, 1.25),
  },

  editBtn: {
    "& .editIcon ": {
      fontSize: "14px",
    },
  },
  imagelarge: {
    width: "83px",
    height: "82px",
    "& + .MuiBadge-badge": {
      right: "0",
      bottom: "0",
    }
  },
  customBadge: {
    // position: "absolute",
  },
  "& .MuiBadge-badge": {
    position: "absolute",
    right: "0",
    bottom: "0"
  },
  contentRow: {
    padding: theme.spacing(2.5),
    "& .title": {
      color: "#4C5D6C",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "0.875",
      lineHeight: "18px",
      letterSpacing: " 0.02em",
      padding: theme.spacing(1.875, 0),
    },
    "& .valueView": {
      color: "#0F2940",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "1rem",
      lineHeight: "0px",
      letterSpacing: " 0.04em",
    },
  },
  mediawrapper: {
    padding: theme.spacing(2.5, 2.5),
    "& .title": {
      color: "#4C5D6C",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "0.875rem",
      lineHeight: "18px",
      letterSpacing: "0.02rem",
    },
    "& .mediaDec": {
      fontStyle: "normal",
      color: "#65707D",
      fontWeight: "normal",
      fontSize: "0.75rem",
      lineHeight: "18px",
      letterSpacing: "0.02rem",
    },
    "& .avatarSection": {
      display: "flex",
      alignItems: "baseline"
    },
  },
  valueViewBox: {
    background: "#FFFFFF",
    border: "1px solid #E9EAEB",
    borderRadius: "8px",
    width: "300px",
    padding: theme.spacing(3.375, 2.5),
    [theme.breakpoints.down("sm")]: {
      maxWidth : "280px",
    },
  },
  dialogHeader: {
    fontWeight: "600",
    fontSize: "14px",

    "& .fileTex": {
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#4C5D6C"
    }
  },
  uploadProfileDiaog: {
    "& .body": {
      marginBottom: "35px",
      "& .infoTxt": {
        fontWeight: "400",
        fontSize: "14px",
        color: "#4C5D6C",
      },
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1)
    }
  }
}));