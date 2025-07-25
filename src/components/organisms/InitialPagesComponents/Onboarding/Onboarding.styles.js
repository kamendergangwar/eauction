import { makeStyles } from "@material-ui/core/styles";

export const onboardingStyles = makeStyles((theme) => ({
  tabAll: {
    fontSize: "small",
    fontWeight: "bold",
    width: "fit-content",
    position: "relative",
    lineHeight: "initial",
    // '&::before': {
    //     content: '""',
    //     position: 'absolute',
    //     top: '12%',
    //     left: 0,
    //     transform: 'translateY(-50%)',
    //     borderLeft: '10px solid #626262',
    //     borderTop: '10px solid transparent',
    //     borderBottom: '10px solid transparent',
    // },
    border: "1px solid #626262",
    "&::after": {
      height: "12px",
      width: "12px",
      position: "absolute",
      content: '""',
      background: "#D9D9D9", //"#f7f7ff",
      zIndex: 2,
      border: "2px solid #626262",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      transform: "rotate(-45deg)",
      right: "-7.4px",
      top: "10%",
    },
    "&:last-child::after": {
      display: "none",
    },
    // '&:first-child::before': {
    //     display: 'none',
    // },
  },
  tabAllActive: {
    fontSize: "small",
    fontWeight: "bold",
    width: "fit-content",
    position: "relative",
    lineHeight: "initial",
    border: "1px solid #626262",
    "&::after": {
      height: "12px",
      width: "12px",
      position: "absolute",
      content: '""',
      background: "#fff", //"#f7f7ff",
      zIndex: 2,
      border: "2px solid #626262",
      borderTopWidth: "0px",
      borderLeftWidth: "0px",
      transform: "rotate(-45deg)",
      right: "-7.4px",
      top: "10%",
    },
    "&:last-child::after": {
      display: "none",
    },
    // // '&::before': {
    // //     content: '""',
    // //     position: 'absolute',
    // //     top: '12%',
    // //     left: 0,
    // //     transform: 'translateY(-50%)',
    // //     borderLeft: '10px solid #0038C0',
    // //     borderTop: '10px solid transparent',
    // //     borderBottom: '10px solid transparent',
    // // },
    // '&:first-child::before': {
    //     display: 'none',
    // },
  },
  stepNoDiv: {
    zIndex: "1",
    position: "absolute",
    right: "42%",
    background: "#FFFFFF",
    border: "1px solid",
    top: "-14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fill: "#fff",
    borderRadius: "50%",
    height: "28px",
    width: "28px",
    fontSize: "16px",
    fontWeight: 700,
    "&.current": {
      background: "#0038C0",
      color: "white",
      border: "none",
      transform: "scale(1.1)"
    },
  },
}));
