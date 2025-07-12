import { makeStyles } from "@material-ui/core/styles";

export const selectProjectFormStyles = makeStyles((theme) => ({
  formSection: {
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(1, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    },
  },
  timerValidText: {
    textAlign: "center",
    fontSize: "16px",
    color: "#d52743",
    fontWeight: "600",
    paddingTop: "10px",
  },
  filterSection: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
    borderRadius: 40,
    maxWidth: "95%",
    margin: "0 auto 30px",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 12px",
    },
    "&:focus-within": {
      backgroundColor: "#F4F4F4",
      boxShadow: "none",
      "& .MuiSelect-nativeInput": {
        backgroundColor: "#F4F4F4",
      },
    },
    /* "& > .MuiGrid-container > .MuiGrid-item": {
      padding: theme.spacing(0, 2)
    }, */
  },
  filterInputCtrl: {
    borderRight: "1px solid #ddd",
    position: "relative",
    padding: theme.spacing(1.5, 3.8),
    [theme.breakpoints.down("sm")]: {
      borderRight: 0,
    },
    "& .MuiSelect-selectMenu": {
      padding: 0,
    },
    "&:focus-within": {
      backgroundColor: "#fff",
      boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
      borderRadius: 40,
      "& .MuiSelect-nativeInput": {
        backgroundColor: "#fff",
      },
    },
    "& .MuiFormLabel-root": {
      color: "#263238",
      fontWeight: 500,
      fontSize: "0.8rem",
      marginBottom: theme.spacing(1.5),
    },
    "& .MuiAutocomplete-input": {
      backgroundColor: "transparent",
      color: "#0151CA",
      fontSize: "0.9rem",
      border: 0,
      outline: "none",
      fontWeight: 600,
      padding: 0,
      display: "block",
      width: "100%",
      "&::-webkit-input-placeholder": {
        color: "#BBBBBB",
        fontWeight: "normal",
      },
    },
    "&.withSearch": {
      border: 0,
      display: "flex",
      paddingRight: theme.spacing(1),
      justifyContent: "space-between",
    },

    "& .MuiInput-root": {
      color: "#0151CA",
      width: "100%",
      border: "0",
      display: "block",
      outline: "none",
      fontWeight: "600",
      fontSize: "0.9rem",
      backgroundColor: "transparent",
      border: "none",
      "&.MuiInput-underline:after": {
        display: "none",
      },
      "&.MuiInput-underline:before": {
        display: "none",
      },
    },
    "& .MuiSelect-icon": {
      display: "none",
    },

    "& .MuiIconButton-root": {
      margin: 0,
      position: "absolute",
      top: "50%",
      right: theme.spacing(1.5),
      transform: "translateY(-50%)",
      // "&.priceClearBtn": {
      //   right: 140
      // }
    },
    "& .MuiSelect-nativeInput": {
      border: 0,
      opacity: 1,
      "&::-webkit-input-placeholder": {
        color: "#BBBBBB",
        fontSize: "0.9rem",
        fontWeight: "normal",
      },
    },
  },
  pmayFilterDiv: {
    borderLeft: "solid #BBBBBB 1px",
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
      margin: theme.spacing(0, 2, 3),
      padding: "20px",
      borderRadius: "40px",
      borderLeft: "none",
    },

    "& .MuiInput-root": {
      color: "#0151CA",
      width: "100%",
      display: "block",
      outline: "none",
      fontWeight: "600",
      fontSize: "0.9rem",
      backgroundColor: "transparent",
      border: "none",
      "&.MuiInput-underline:after": {
        display: "none",
      },
      "&.MuiInput-underline:before": {
        display: "none",
      },
    },
    "& .MuiSelect-icon": {
      fontSize: "20px",
    },
    "& .MuiFormLabel-root": {
      fontSize: "12px",
      lineHeight: "18px",
      color: "#263238",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
  },
  searchIconBtn: {
    borderRadius: "50%",
    minWidth: "auto",
    padding: "12px",
    "& .MuiSvgIcon-root": {
      fill: "none",
    },
    "&:hover": {
      background: "rgb(9 36 102)",
    },
  },
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(1, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  progressView: {
    color: "#007AE7",
    fontSize: "0.9rem",
    marginRight: theme.spacing(3),
  },
  selectedDetail: {
    display: "flex",
  },
  mapTooltip: {
    position: "absolute",
    color: "#fff",
    padding: "10px",
    background: "rgba(0,0,0,0.8)",
    transform: "translate3d(-50%, -50%, 0)",
    borderRadius: "5px",
    pointerEvents: "none",
    zIndex: "1000",
  },
  mapNavSticker: {
    transform: "rotateZ(270deg)",
    position: "absolute",
    top: "25%",
    zIndex: "1000",
    left: "-webkit-calc(100% - 67px)",
    left: "-moz-calc(100% - 67px)",
    left: "calc(100% - 67px)",
    borderRadius: "7px 7px 0 0",
  },
}));
