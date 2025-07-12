import { makeStyles } from "@material-ui/core/styles";
// import Background from "../../../assets/Background.png";
import MobileBackground from "../../../assets/MobileBackground.jpg";
import Background from "../../../assets/KycBackground.jpg";

export const AuthTemplateStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    overflow: "auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${MobileBackground})`,
    },
  },
  footerSection: {
    padding: theme.spacing(2),
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  supportNumber: {
    color: "#042751",
    fontSize: "0.85rem",
    fontWeight: 500,
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
      verticalAlign: "sub",
    },
  },
  helpText: {
    color: "#FFFFFF",
  },
  /* progressContainer: {
    maxWidth: 1000,
    margin: "0 auto",
  },
  progressContTitle: {
    fontWeight: 500,
    fontSize: "1.2rem",
    textAlign: "center",
    color: "#FFFFFF",
    opacity: 0.6,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1.5)
  },
  stepperBox: {
    textAlign: "center",
    position: "relative"
  },
  numRoundBox: {
    border: "1px solid #FFFFFF",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: "0.9rem",
    marginBottom: theme.spacing(2),
    "&.active": {
      borderColor: "rgba(204, 222, 245, 0.6)",
      width: 46,
      height: 46,
    }
  },
  stepperNumber: {
    display: "inline-block",
    "&.active": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg, #0038C0 20.1%, #006FD5 87.81%)",
      border: "4px solid rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
      width: 40,
      height: 40,
    }
  },
  stepperText: {
    color: "rgba(238, 238, 238, 0.5)",
    fontSize: "0.9rem",
    "&.active": {
      color: "#FFFFFF",
      fontWeight: "bold"
    }
  },
  stepAfterLine: {
    position: "absolute",
    top: "25%",
    left: "100%",
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transform: "translate(-50%, -50%)"
  },
  stepInnerDots: {
    backgroundColor: "#FFFFFF",
    width: 12,
    height: 8,
    "&:first-child": {
      width: 6
    },
    "&:last-child": {
      width: 6
    }
  } */
}));
