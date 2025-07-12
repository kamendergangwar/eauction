import { makeStyles } from "@material-ui/core/styles";

export const addCoAppSuccessfulStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    [theme.breakpoints.down("sm")]: {},
  },
  cardHeader: {
    padding: theme.spacing(4, 5),
    paddingBottom:0,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 5),
    },
  },
  successIcon: {
    marginBottom: theme.spacing(2),
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
  pageTitle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "1.8rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },
  subTitleTxt: {
    color: "#4C5D6C",
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: theme.spacing(3),
    "& span": {
      color: "#65707D",
      fontWeight: 500,
      fontSize: "0.9rem",
      display: "inline-block",
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  failedBtn: {
    borderColor: "#EB5757",
    backgroundColor: "transparent",
    color: "#EB5757",
    "&:hover": {
      borderColor: "#EB5757",
    },
  },
  dividerCell: {
    backgroundColor: "transparent",
    borderBottom: "3px dashed #E7E7E7",
    height: 0,
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
        right: -15,
      },
    },
  },
  dataContainer: {
    // background: `url(${InvoiceBgImg}) no-repeat center`,
    backgroundSize: 300,
    padding: theme.spacing(2, 5, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2.5),
    },
  },
  invoiceTitle: {
    color: "#65707D",
    fontWeight: 700,
    fontSize: "0.9rem",
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  dataViewBox: {
    marginBottom: theme.spacing(3),
    "&:last-child": {
      marginBottom: 0,
    },
    "&>.MuiGrid-container>.MuiGrid-item:first-child": {
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(3),
      },
    },
    "& .title": {
      color: "rgb(76, 93, 108);",
      fontWeight: 700,
      fontSize: "0.9rem",
      marginBottom: theme.spacing(1.5),
    },
    "& .valueView": {
      color: "#000000",
      fontWeight: 600,
      fontSize: "0.9rem",
      "& img": {
        display: "inline-block",
        maxWidth: 60,
        maxHeight: 60,
        verticalAlign: "middle",
        marginRight: theme.spacing(1),
      },
      "& span": {
        display: "inline-block",
        verticalAlign: "middle",
      },
    },
  },
  totalSection: {
    padding: theme.spacing(2.5,5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5),
    },
  },
  totalAmtLabel: {
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  totalAmtView: {
    color: "#0038C0",
    fontWeight: "bold",
    fontSize: "1.75rem",
    // marginBottom: theme.spacing(2),
    "&.failed": {
      color: "#EB5757",
    },
  },
  totalAmtViewInWord: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
  },
  dataValueViewBox: {
    marginLeft: theme.spacing(0.5),
    padding: "8px 0",
  },
  scaleIconView: {
    fontSize: "2rem",
  },
  dataTitle: {
    color: "#65707D",
    // fontWeight: 600,
    fontSize: "0.8rem",
  },
  dataValue: {
    color: "#00437E",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "24px",
  },
}));
