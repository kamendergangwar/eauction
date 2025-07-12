import { makeStyles, withStyles } from "@material-ui/core/styles";
import { StepConnector } from "@material-ui/core";
const boxShadow = "0px 4px 20px rgba(0, 56, 192, 0.1)";

export const useStyles = makeStyles((theme) => ({
  mainRoot: {
    padding: theme.spacing(3, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },
  stepper: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  step: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  continueBtn: {
    float: "right",
  },
  continueBtnContainer: {},
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  cardRoot: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: theme.spacing(1, 1),
    display: "flex-column",
    // boxShadow: 'inset 6px 0 4px -4px rgba(0,0,0,0.5),inset -6px 0 4px -4px rgba(0,0,0,0.5)',
    // MozBoxShadow: 'inset 6px 0 4px -4px #999,inset -6px 0 4px -4px rgba(0,0,0,0.5)',
    // WebkitBoxShadow: 'inset 6px 0 4px -4px rgba(0,0,0,0.5),inset -6px 0 4px -4px rgba(0,0,0,0.5)',
    // zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      borderRadius: 0,
      marginBottom: theme.spacing(0),
      borderBottom: "1px solid #EEEEEE",
    },
  },
  CardHeader: {
    borderBottom: 1,
    "&:before": {
      borderColor: "black",
    },
    "&:after": {
      borderColor: "black",
    },
    borderColor: "black",
  },
  updatedDate: {
    display: "flex",
    alignItems: "center",
    "& span": {
      marginLeft: "10px",
      color: "#4C5D6C",
      fontWeight: "400",
      fontSize: "12px",
    },
  },
  appStatus: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      "& h6": {
        display: "none",
      },
    },
  },
  progressContainer: {
    display: "flex",
    background: " rgba(1, 81, 202, 0.11)",
    padding: " 4px 20px",
    borderRadius: "40px",
    "& span": {
      fontWeight: "600",
      fontSize: "14px",
      color: "#0151CA;",
      display: "flex",
      alignItems: "center",
    },
  },
  CardContent: {
    overflowX: "auto",
    padding: "10px",
  },
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  viewBtn: {
    color: "blue",
    fontSize: "10px",
    fontWeight: "600",
    cursor: "pointer",

    "& :hover": {
      textDecoration: "underline",
    },
  },
  viewDocBtn: {
    color: "blue",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "rgba(237, 242, 255, 1)",
    },
  },
  dialogHeader: {
    padding: theme.spacing(1, 0, 0, 0),
    display: "flex",
    alignItems: "center",
    height: "50px",
    borderRadius: "10px 10px 0px 0px",
    fontSize: "14px",
  },
  verifiedBox: {
    textAlign: "center",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    width: "fit-content",
    gap: "6px",
    borderRadius: "40px",
    background: "rgba(0, 56, 192, 0.1)",
    "& span": {
      color: "#0038C0",
      fontSize: "13px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  rejectedBox: {
    textAlign: "center",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    width: "fir-content",
    gap: "6px",
    borderRadius: "40px",
    background: "rgba(255, 0, 0, 0.1)",
    "& span": {
      color: "red",
      fontSize: "13px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  scaleIconView: {
    fontSize: "2rem",
  },
  docHeader: {
    fontWeight: "700",
    fontSize: "15px",
  },
  docVerificationCon: {
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 0 7px rgba(255, 255, 255, 0.5)",
    animation: "$glow 2s ease-in-out infinite",
  },
  "@keyframes glow": {
    "0%": {
      boxShadow: "0 0 7px rgba(235 93 93 / 50%)",
    },
    "50%": {
      boxShadow: "0 0 7px rgba(255, 255, 255, 0.9)",
    },
    "100%": {
      boxShadow: "0 0 7px rgba(223 19 19 / 50%)",
    },
  },
  docVerificationSuccesCon: {
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 0 7px rgba(255, 255, 255, 0.5)",
    animation: "$glow2 2s ease-in-out infinite",
  },
  "@keyframes glow2": {
    "0%": {
      boxShadow: "0 0 7px rgba(54 209 76 / 50%)",
    },
    "50%": {
      boxShadow: "0 0 7px rgba(255, 255, 255, 0.9)",
    },
    "100%": {
      boxShadow: "0 0 7px rgba(16 237 78 / 50%)",
    },
  },
  LoItextContainer: {
    padding: "5px",
    color: "#039824",
    fontSize: "13px",
    fontWeight: "700",
    background: "rgba(33, 150, 83, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "40px",
  },
  RejectedDocSpan: {
    width: "200px",
    marginLeft: "5px",
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      padding: 0,
    },
  },
  rejectedDocIcon: {
    fontSize: "1rem",
  },
  reUploadBtn: {
    color: "#EB5757",
    border: "solid 2px #EB5757",
    "&:hover": {
      background: "rgba(250, 61, 93, 0.1)",
    },
  },
  rejectedDocList: {
    color: " #4C5D6C",
    fontWeight: "700",
    fontSize: "12px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  secTitle: {
    paddingBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(3),
    },
    "& span": {
      color: "#65707D",
      fontSize: "12px",
      fontWeight: "400",
    },
  },
  secText: {
    color: "#0F2940",
    fontSize: "20px",
    fontWeight: 600,
  },
  imagelarge: {
    width: "83px",
    height: "82px",
    border: "3px solid #cadaf2",
  },
  applicantCard: {
    background: "rgba(0, 67, 126, 0.01)",
    border: "1px solid rgba(1, 81, 202, 0.1)",
    marginBottom: "10px",
  },
  applicantName: {
    fontWeight: "700",
    fontWize: "16px",
  },
  timerValidText: {
    color: "red",
    fontWeight: 600,
    animation: "$blinker 1s linear infinite",
    "& span": {
      fontWeight: 700,
      textDecoration: "underline",
      fontSize: "0.9rem",
      cursor: "pointer"
    }
  },
  "@keyframes blinker": {
    "50%": {
      opacity: "0.5",
    },
  },
}));

export const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 45,
    height: 45,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    background: "#0151CA",
    borderRadius: "50%",
    boxShadow: "inset 0px 0px 0px 3px white",
    border: "3px solid #0151CA",
  },
  completed: {
    background: "#219653",
    boxShadow: "0px 0px 40px rgba(0, 25, 121, 0.1)",
    borderRadius: "50%",
    "&:hover": {
      boxShadow: "inset 0px 0px 0px 3px white",
      border: "3px solid #219653",
    },
  },
});

export const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 20,
  },
  active: {
    "& $line": {
      background: "rgba(1, 81, 202, 1)",
    },
  },
  completed: {
    "& $line": {
      background: "rgba(33, 150, 83, 1)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);
