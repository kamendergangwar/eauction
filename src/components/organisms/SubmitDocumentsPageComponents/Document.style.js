import { makeStyles } from "@material-ui/core/styles";
import NoticeBgIcon from "../../../assets/header/noticeBgIcon.png";
export const DocumentsFormStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%",
  },
  formSection: {
    height: "100%",
    // overflow: "auto",
    // padding: theme.spacing(0, 5, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  termsNdCondiCheckBoxLabel: {
    fontWeight: 600,
    fontSize: "0.9rem",
    "& span": {
      color: "#0038c0",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "&.done": {
      color: "#FFFFFF",
      fontWeight: 700,
    },
    "&.verified": {
      color: "#263238",
    },
  },
  skipCheckBox: {
    "&.done": {
      "& .MuiCheckbox-root": {
        color: "#FFFFFF",
      },
    },
    "&.verified": {
      "& .MuiCheckbox-root": {
        color: "#263238",
      },
    },
  },
  skipCheckBoxLabel: {
    fontWeight: 600,
    fontSize: "0.8rem",
    textDecoration: "underline",
    textAlign: 'initial',
    "& span": {
      color: "#0038c0",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "&.done": {
      color: "#FFFFFF",
    },
    "&.verified": {
      color: "#263238",
    },
  },
  LightTooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  line: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  nextButton: {
    marginTop: theme.spacing(2),
  },
  chipsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  nxtBtn: {
    background: " #0038C0",
    color: "#FFFFFF",
    Width: "1.5rem",
    padding: "0.8rem",
  },
  titleBox: {
    // display: "flex",
    marginLeft: theme.spacing(9.5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(1),
    },
    // alignItems: "Center",
  },
  selectedDocName: {
    fontWeight: "normal",
    fontSize: "0.875rem",

    "& .MuiChip-root": {
      maxWidth: "530px",
      margin: theme.spacing(1.5, 1, 0, 0),
      color: "#00437E",
    },
  },
  sectionBox: {
    paddingLeft: theme.spacing(16.25),
    "&.checkBox": {
      background: "#F5FAFD",
    },
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(1),
    },
  },
  boldText: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
  },
  /* dialogBox: {
    margin: 0,
    padding: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0),
    },
  }, */
  noticeBox: {
    background: `url(${NoticeBgIcon}) no-repeat center right -12px, linear-gradient(91.22deg, #042751 54.21%, #0038C0 75.21%)`,
    backgroundSize: "270px, contain",
    border: "1px solid rgba(23, 81, 238, 0.1)",
    boxShadow: "0px 4px 10px rgba(1, 81, 202, 0.05)",
    borderRadius: 10,
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      background: `linear-gradient(91.22deg, #042751 54.21%, #0038C0 75.21%)`,
    },
  },
  noticePaperTitle: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: "1.1rem",
    marginBottom: theme.spacing(1),
  },
  noticePara: {
    color: "#FFFFFF",
    fontWeight: 400,
    fontSize: "0.8rem",
    "& a": {
      color: "#FFFFFF",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogueTitle: {
    fontWeight: 600,
    fontSize: "1.5rem",
  },
  dialogueContentText: {
    fontSize: "0.9rem",
  },
  docsBox: {
    padding: theme.spacing(2),
  },
  docsCard: {
    backgroundColor: "#F5FAFD",
    border: "1px dashed #00437E",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    maxWidth: 270,
    textAlign: "center",
    margin: "0 auto",
    paddingBottom: "30px",
    padding: theme.spacing(1, 1.5),
    minHeight: 150,
    height: "100%",
    position: "relative",
    "&.done": {
      background: "linear-gradient(0deg, #0038C0 20.1%, #006FD5 87.81%)",
      border: "none",
    },
    "&.disable": {
      backgroundColor: "#F5FAFD",
      border: "1px dashed #00437E",
    },
    "&.verified": {
      background: "linear-gradient(-90deg, #FFFFFF 5%, #A9FFD3 252.67%)",
      border: "1px dashed #00437E",
    },
    "&.rejected": {
      background: "linear-gradient(342deg, #FFFFFF 5%, #e20000 252.67%)",
      border: "1px dashed #00437E",
    },
    "&.skipped": {
      background: "rgb(255, 244, 229)"
    }
  },
  docNameTxt: {
    color: "#263238",
    fontSize: "0.9rem",
    fontWeight: 700,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    display: "inline-block",
    "&.done": {
      color: "#FFFFFF",
      fontWeight: 700,
    },
    "&.verified": {
      color: "#263238",
    },
  },
  infoToolTipIcon: {
    color: "#0038C0",
    fontSize: "1.5rem",
    "&.done": {
      color: "#FFFFFF",
    },
    "&.verified": {
      color: "#0038C0",
    },
  },
  verifiedBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    gap: "6px",
    borderRadius: "40px",
    background: "linear-gradient(113.08deg, #10BAEF -80.36%, #00A848 124.11%)",
    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontSize: "11px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  docsBtn: {
    "&.done": {
      border: "1px solid #FFFFFF",
    },
    "&.MuiButton-contained.Mui-disabled": {
      // color: "#fff",
      cursor: "not-allowed",
      border: "none",
    },
  },
  tikIconBox: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  downloadBtnArea: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
    marginBottom: "15px",
  },
  downloadBtn: {
    padding: "4px",
    fontFamily: "Noto Sans",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
  },
  progressView: {
    color: "#007AE7",
    fontSize: "0.9rem",
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  actionSection: {
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      "& .MuiFormControlLabel-root": {
        margin: theme.spacing(0, 0, 3),
        "& .MuiTypography-body1": {
          fontSize: "0.8rem",
        },
      },
    },
  },
  proceedBtn: {
    "&.Mui-disabled": {
      backgroundColor: "#99CAF5",
      color: "#fff",
    },
  },
  divider: {
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
    "&::before,&::after": {
      content: "''",
      flex: "1 1",
      borderBottom: "2px solid #00000033",
      margin: "auto",
      marginRight: "10px",
      marginLeft: "10px",
    },
    "&.done": {
      color: "#FFFFFF",
      fontWeight: 700,
    },
    "&.verified": {
      color: "#263238",
    },
  },
  /* footertxt: {
    fontSize: "0.9em",
    color: "#FFFFFF",
    fontWeight: 400,
    textAlign: "center",
    letterSpacing: "0.2px",
    "& .link": {
      color: "#FFFFFF",
      fontWeight: "bold",
      textDecoration: "underline",
    },
  }, */
}));
