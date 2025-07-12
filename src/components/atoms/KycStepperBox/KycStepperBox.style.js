import { makeStyles } from "@material-ui/core/styles";
import KycBackground from "../../../assets/KycBackground.jpg";

export const KycStepperBoxStyle = makeStyles((theme) => ({
  stepperContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    maxWidth: 450
  },
  stepperBox: {
    textAlign: "center",
    position: "relative",
    height: 60,
  },
  numRoundBox: {
    border: "2px solid #B6C8ED",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    textAlign: "center",
    color: "#B6C8ED",
    fontSize: "0.875rem",
    fontWeight: 400,
    fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","),
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    "&.active": {
      borderWidth: 4,
      borderColor: "rgba(255, 255, 255, 0.8)",
      background: "linear-gradient(180deg, #0038C0 20.1%, #006FD5 87.81%)",
      width: 36,
      height: 36,
    },
    "&.completed": {
      borderWidth: 4,
      borderColor: "#99B8E9",
      background: "linear-gradient(180deg, #0038C0 20.1%, #006FD5 87.81%)",
      width: 36,
      height: 36,
    },
  },
  stepperNumber: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    "&.active": {
      color: "#FFFFFF",
    },
    "&.completed": {
      color: "#FFFFFF",
    },
    "& .MuiSvgIcon-root": {
      color: "#0038C0",
      fontSize: "0.9rem",
    },
  },
  stepperText: {
    color: "rgba(238, 238, 238, 0.5)",
    fontSize: "0.8rem",
    fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","),
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    "&.active": {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: "0.875rem",
    },
    "&.completed": {
      color: "#FFFFFF",
    },
  },
  stepBeforeAfterLine: {
    borderTop: "2px dashed #B6C8ED",
    position: "absolute",
    top: "30%",
    left: 0,
    width: "calc(50% - 14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transform: "translate(0, -50%)",
    zIndex: 1,
    "&.after": {
      left: "50%",
      transform: "translate(14px, -50%)"
    },
    "&.active": {
      borderTopWidth: 4,
      borderTopStyle: "solid"
    },
    "&.completed": {
      borderTopWidth: 4,
      borderTopStyle: "solid"
    }
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
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  stepperBox: {
    textAlign: "center",
    position: "relative",
    height: 85,
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
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "&.active": {
      borderColor: "rgba(204, 222, 245, 0.6)",
      width: 46,
      height: 46,
    },
    "&.completed": {
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.4)",
      backgroundColor: "rgba(0, 122, 231, 0.5)",
      width: 28,
      height: 28,
    },
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
    },
    "&.completed": {
      backgroundColor: "#FFFFFF",
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
    },
    "& .MuiSvgIcon-root": {
      color: "#0038C0",
      fontSize: "0.9rem",
    },
  },
  stepperText: {
    color: "rgba(238, 238, 238, 0.5)",
    fontSize: "0.9rem",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    "&.active": {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    "&.completed": {
      color: "#FFFFFF",
    },
  },
  stepAfterLine: {
    position: "absolute",
    top: "25%",
    left: "100%",
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transform: "translate(-50%, -50%)",
  },
  stepInnerDots: {
    backgroundColor: "#FFFFFF",
    width: 12,
    height: 8,
    "&:first-child": {
      width: 6,
    },
    "&:last-child": {
      width: 6,
    },
  }, */
  // mob
  titleContainer: {
    textAlign: "left",
    // marginBottom: theme.spacing(1),
    background: "linear-gradient(180deg, #042751 20.1%, #00398D 87.81%)",
    padding: theme.spacing(3, 4),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // margin: theme.spacing(1),
    /* paddingTop: theme.spacing(5),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(2),
    }, */
  },
  title: {
    color: "#FFFFFF",
    fontSize: "2rem",
    letterSpacing: "0.02em",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: "0.9rem",
  },
}));
