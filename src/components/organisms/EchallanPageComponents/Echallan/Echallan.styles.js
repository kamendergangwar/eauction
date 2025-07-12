import { makeStyles } from "@material-ui/core/styles";

export const EchallanStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    [theme.breakpoints.down("sm")]: {

    },
  },
  pageHeader: {
    background: "rgba(229, 242, 255, 0.2)",
    border: "1px solid rgba(0, 122, 231, 0.5)",
    margin: theme.spacing(2.5),
    borderRadius: "8px",
    padding: theme.spacing(4, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 2.5),
    },
  },
  headerTxt: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.125rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  },
  sectionInfo: {
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-h6": {
      color: "#00437E",
      fontWeight: 600,
      fontSize: "1.125rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
      },
    },
    "& .infoIcon": {
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(0.5),
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem"
      }
    }
  },
  unorderList: {
    color: "#495471",
    fontWeight: 500,
    fontSize: "0.75rem",
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  cardHeader: {
    padding: theme.spacing(4, 5),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 5),
    }
  },
  pageTitle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "1.8rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem"
    },
  },
  subTitleTxt: {
    color: "#4C5D6C",
    fontWeight: 600,
    fontSize: "1rem",
    "& span": {
      color: "#65707D",
      fontWeight: 500,
      fontSize: "0.9rem",
      display: "inline-block",
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem"
    },
  },
  dividerCell: {
    backgroundColor: "transparent",
    borderBottom: "3px dashed #E7E7E7",
    height: 0
  },
  scratchLine: {
    position: "relative",
    "& span": {
      backgroundColor: "#266ed2",
      borderRadius: "50%",
      position: "absolute",
      width: 28,
      height: 28,
      left: -15,
      top: -12,
      zIndex: 1,
      "&.last": {
        backgroundColor: "#0f5dca",
        left: "initial",
        right: -15
      }
    },
  },
  dataContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2.5),
    },
  },
  dataViewBox: {
    marginBottom: theme.spacing(3),
    "&:last-child": {
      marginBottom: 0
    },
    "& .title": {
      color: "#BBBBBB",
      fontWeight: 500,
      fontSize: "0.9rem",
      marginBottom: theme.spacing(1.5)
    },
    "& .valueView": {
      color: "#000000",
      fontWeight: 600,
      fontSize: "0.9rem",
      "& img": {
        display: "inline-block",
        maxWidth: 40,
        verticalAlign: "middle",
        marginRight: theme.spacing(1)
      },
      "& span": {
        display: "inline-block",
        verticalAlign: "middle"
      }
    }
  },
  totalSection: {
    padding: theme.spacing(3, 5, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5),
    },
  },
  totalAmtLabel: {
    color: "#BBBBBB",
    fontWeight: 600,
    fontSize: "0.9rem",
    paddingTop: theme.spacing(1.5),
  },
  totalAmtView: {
    color: "#0038C0",
    fontWeight: "bold",
    fontSize: "1.75rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(1),
    },
  },
  totalAmtViewInWord: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem"
  },
  cardFooter: {
    padding: theme.spacing(3, 3, 5, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 2.5, 5, 2.5),
    },
  },
  noteTextView: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(3),
    "& span": {
      color: "#FA3D5D"
    }
  },
  buttonContainer: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    },
  },
  dialogTitle: {
    padding: theme.spacing(2, 5),
    color: "#00437E",
    fontWeight: "600",
    fontSize: "1.125rem",
    lineHeight: "27px",
    letterSpacing: "0.02em",
  },
  dialogBoxContent: {
    color: "#495471",
    fontWeight: "500",
    fontSize: "0.875rem",
    letterSpacing: "0.02em",
    lineHeight: "22px",
  },
  totalAmoutSection: {
    background: "rgba(229, 242, 255, 0.6)",
    border: "1px solid rgba(0, 122, 231, 0.5)",
    boxSizing: "border-box",
    borderRadius: "8px",
    textAlign: "center",
    padding: theme.spacing(2.5, 5),
    margin: theme.spacing(2.5, 2.5, 2.5),
  },
  AmtLabel: {
    fontWeight: "600",
    fontSize: "1rem",
    lineHeight: "24px",
    textAlign: "center",
    color: "#0F2940",
    marginBottom: theme.spacing(2.5),
  },
  totalAmtValue: {
    color: "#007AE7",
    fontWeight: "bold",
    fontSize: "1.75rem",
    lineHeight: "24px",
    marginBottom: theme.spacing(2.5),
  },
  totalAmtTxt: {
    color: "#4C5D6C",
    fontWeight: "500",
    fontSize: "0.875rem",
    lineHeight: "20px",
    padding: theme.spacing(0, 4.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1),
    },
  }
}));
