import { makeStyles } from "@material-ui/core/styles";

export const stepperBarStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2)
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
    fontSize: "0.8rem",
    fontWeight: "bold",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
    "&.active": {
      borderWidth: 4,
      borderColor: "#ff9800",
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
    display: "inline-block",
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
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    "&.active": {
      color: "#FFFFFF",
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
  /* stepInnerDots: {
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
  /* stepper: {
    backgroundColor: "transparent",
  }, */
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  // mob
  titleContainer: {
    padding: theme.spacing(2, 3, 2, 2),
    borderBottom: "1px solid #EEEEEE"
  },
  title: {
    color: "#0038C0",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
    "& small": {
      color: "#7a7a7a"
    }
  },
}));
