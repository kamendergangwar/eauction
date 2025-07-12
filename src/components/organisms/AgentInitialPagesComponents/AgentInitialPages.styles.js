import { makeStyles } from "@material-ui/core/styles";

export const AgentInitialPagesStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleContainer: {
    textAlign: "center",
    paddingTop: theme.spacing(3),
  },
  form: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  input: {
    display: "none",
  },
  fileUploadButton: {
    color: "#007ae7",
    // padding: "35px 30px",
    padding: 14,
    fontWeight: "normal",
  },
  kycContainer: {
    marginTop: 120,
    [theme.breakpoints.only("xs")]: {
      marginTop: 180,
    },
  },
  imageStyle: { width: "100%", height: 200 },
  iconStyle: { width: 100, height: 100 },
  paperContainer: {
    maxHeight: 400,
    overflow: "auto",
    padding: theme.spacing(5),
  },
  checkBox: {
    paddingLeft: theme.spacing(5),
  },
  button: {
    minWidth: 150,
  },
  helpText: {
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "#0F2940",
    marginBottom: theme.spacing(1.2)
  },
  passValidationIndicator: {
    "& p": {
      color: "#CC1100",
      textAlign: "right",
      fontSize: "0.7rem"
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#F3F3F3"
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#CC1100"
    },
    "&.fair p": {
      color: "#F28607"
    },
    "&.fair .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#F28607"
    },
    "&.good p": {
      color: "#F4CE08"
    },
    "&.good .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#F4CE08"
    },
    "&.great p": {
      color: "#15D734"
    },
    "&.great .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#15D734"
    },
  },
  passwordHelpTxtCont: {
    width: "auto",
    "& .MuiTableCell-root": {
      border: 0,
      padding: "3px 0"
    },
    "& .MuiSvgIcon-root": {
      color: "#15D734",
      fontSize: "1rem",
      marginLeft: theme.spacing(2),
      position: "relative",
      top: "2px",
    }
  },
  passwordHelpTxt: {
    fontSize: "0.8rem",
    color: "#4C5D6C",
  }
}));
