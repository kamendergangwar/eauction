import { makeStyles } from "@material-ui/core/styles";
import InvoiceBgImg from "../../../assets/header/invoiceBgImg.png";

export const paymentSuccessfulStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    [theme.breakpoints.down("sm")]: {},
  },
  cardHeader: {
    padding: theme.spacing(4, 5),
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
    // c,
    backgroundSize: 300,
    padding: theme.spacing(2, 5, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2.5),
    },
  },
  DialogContainer: {
    background: "rgba(235, 241, 251, 0.5)",
    border: "1px solid rgba(0, 56, 192, 0.1)",
    borderRadius: "10px",
    margin: theme.spacing(0, 5),
    FontWeight: "500",
    fontSize: "12px",
    color: "#65707D",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2.5, 5),
    },
  },
  DialogTittle: {
    padding: theme.spacing(2,3),
    fontWeight: "700",
    fontSize: "18px",
    color: "#00437E",
  },
  toolTipTittle: {
    display: "flex",
    padding: theme.spacing(1,3),
    fontWeight: "600",
    fontSize: "14px",
    color: "#00437E",
    textDecorationLine: "underline",
  },
  orderList: {
    color: "#65707D",
    margin: theme.spacing(2, 0, 0, 0),
    paddingLeft: theme.spacing(2),
    lineHeight: "26px",
    fontSize: "0.9rem",
  },
  tooltipTittle: {
    color: "#0038C0",
    fontSize: "1rem",
    fontWeight: "700",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2, 5, 5),
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
    padding: theme.spacing(5),
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
    marginBottom: theme.spacing(2),
    "&.failed": {
      color: "#EB5757",
    },
  },
  totalAmtViewInWord: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
  },
  //
  /* cardFooter: {
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
  }, */
}));
