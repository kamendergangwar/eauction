import { makeStyles } from "@material-ui/core/styles";

export const AgentApplicationsViewsStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 3, 3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    height: "72vh",
    padding: theme.spacing(1.5),
    // height: 560,
    overflow: "auto",
    // [theme.breakpoints.only("md")]: {
    // height: 450,
    // },
    [theme.breakpoints.only("xs")]: {
      height: "75vh",
      // height: 450,
    },
  },
  applicationGridContainer: {

  },
  searchBoxCol: {
    [theme.breakpoints.only("xs")]: {
      order: 1
    },
  },
  filterInputBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 0,
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px"
    },
    "&.searchBox .MuiOutlinedInput-root fieldset": {
      borderRadius: 35
    },
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      fontSize: "0.8rem",
      transform: "translate(14px, 14px) scale(1)"
    },
    "&.filterInputs": {
      maxWidth: 300
    }
  },
  gridPagination: {
    "& .MuiTablePagination-toolbar": {
      [theme.breakpoints.only("xs")]: {
        padding: 0
      },
    },
    "& .MuiTablePagination-selectRoot": {
      [theme.breakpoints.only("xs")]: {
        marginRight: 10
      },
    },
    "& .MuiTablePagination-actions": {
      [theme.breakpoints.only("xs")]: {
        marginLeft: 10
      },
    },
  },
  cardMainContainer: {
    padding: theme.spacing(0.2),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 0),
    },
  },
  appFilterLabel: {
    color: "#65707D",
    textAlign: "right",
    fontWeight: 500,
    fontSize: "0.8rem",
    [theme.breakpoints.only("xs")]: {
      textAlign: "left"
    },
    "& .MuiSvgIcon-root": {
      verticalAlign: "text-top",
      marginRight: theme.spacing(1),
      fontSize: "1rem"
    }
  },
  // ----------
  applicationGridBox: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    // cursor: "pointer",
    display: "block",
    padding: theme.spacing(1.5),
    overflow: "hidden",
    position: "relative"
  },
  stepperContainer: {
    position: "absolute",
    bottom: "20px"
  },
  notificationView: {
    backgroundColor: "#E73626",
    boxShadow: "0px 0px 20px rgb(0 0 0 / 10%)",
    borderRadius: "5px 12px 12px 0px",
    fontSize: "0.8rem",
    color: "#ffffff",
    minWidth: "auto",
    padding: "2px 5px",
    position: "absolute",
    left: 0,
    top: 0,
    "&:hover": {
      backgroundColor: "#E73626",
    },
    "& .MuiSvgIcon-root": {
      marginLeft: "8px"
    }
  },
  cardHeader:{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  txtellipsis:{
    width: "230px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  infoTextView: {
    color: "#65707D",
    fontWeight: "normal",
    fontSize: "0.8rem",
    "& strong": {
      color: "#0F2940",
      "&.project": {
        color: "#007ae7",
      }
    },
  },
  profileImgCover: {
    border: "2px solid #EEEEEE",
    borderRadius: "50%",
    width: 40,
    height: 40,
    marginRight: theme.spacing(1.5)
  },
  phoneNumberView: {
    padding: theme.spacing(1, 0),
    "& .MuiSvgIcon-root": {
      color: "#65707D",
      verticalAlign: "middle",
      marginRight: theme.spacing(1)
    }
  },
  statusBox: {
    textAlign: "center",
    position: "relative",
    "& .afterLine": {
      backgroundColor: "#E1E9F0",
      width: 60,
      height: 2,
      position: "absolute",
      left: "50%",
      top: 20,
      zIndex: 0,
    },
    "& .progressIcon": {
      backgroundColor: "#E1E9F0",
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "50%",
      color: "#65707D",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      margin: "0 auto",
      zIndex: 1,
      "&.estamp": {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem"
      }
    },
    "& p": {
      color: "#4C5D6C",
      fontWeight: "normal",
      fontSize: "0.6rem",
    },
    "&.wip": {
      "& .progressIcon": {
        backgroundColor: "#F27807",
        color: "#fff"
      }
    },
    "&.done": {
      "& .afterLine": {
        backgroundColor: "#007AE7",
      },
      "& .progressIcon": {
        backgroundColor: "#007AE7",
        color: "#fff"
      }
    }
  }
}));