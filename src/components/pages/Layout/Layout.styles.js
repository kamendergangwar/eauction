import { makeStyles } from "@material-ui/core/styles";
import Background from "../../../assets/KycBackground.jpg";

export const layoutStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      backgroundImage: "none",
      "&.loggedIn": {
        backgroundImage: `url(${Background})`,
      }
    },
  },
  footerSection: {
    padding: theme.spacing(2),
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  helpText: {
    color: "#FFFFFF",
    fontSize: "0.8rem"
  },
  mainSection: {
    height: "100%",
    overflow: "auto",
    paddingBottom: theme.spacing(1.5),
    display: "flex",
    flexDirection: "column",
    "&.paymentSuccessPage": {
      paddingBottom: theme.spacing(10),
    },
    "&::-webkit-scrollbar-track": {
      background: "#fff",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgb(0 0 0 / 30%)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    },
  },
  mainSectionBidder: {
    height: "100%",
    overflow: "hidden",
    paddingBottom: theme.spacing(1.5),
    display: "flex",
    flexDirection: "column",
    "&.paymentSuccessPage": {
      paddingBottom: theme.spacing(10),
    },
    "&::-webkit-scrollbar-track": {
      background: "#fff",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgb(0 0 0 / 30%)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    },
  },
  stepper: {
    background: 'none',
    padding: '8px !important'
  },
  root: {
    paddingRight: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    maxWidth: 1100,
    height: "100%",
    overflow: "auto",
    "&.noInnerScroll": {
      height: "auto",
      overflow: "initial",
    },
    "&.paymentSuccessPage": {
      maxWidth: 550,
    },
    "&.notifyPage": {
      maxWidth: 550,
    },
  },


  Iconcontainer: {
    position: "relative",
  },
  subWrapper: {
    right: '-60px',
    bottom: '90px',
    position: 'absolute',
  },

  chevron: {
    position: "fixed",
    width: "28px",
    height: "8px",
    opacity: 0,
    bottom: '80px',
    transform: "scale3d(0.5, 0.5, 0.5)",
    animation: "$move 3s ease-out infinite",

    [theme.breakpoints.down("md")]: {
      display: 'none',
    },

    "&:first-child": {
      animation: '$move 3s ease - out 1s infinite',
    },
    "&:nth-child(2)": {
      animation: `$move 3s ease - out 2s $infinite`,
    },
    "&:before, &:after": {
      content: ' ',
      position: 'absolute',
      top: '0',
      height: '100 %',
      width: '51 %',
      background: '#fff',
    },
    "&:first-child": { animation: `$move 3s ease-out 1s infinite` },
    "&:nth-child(2)": { animation: `$move 3s ease-out 2s infinite` },
    "&:before,&:after": {
      content: "' '",
      position: "absolute",
      top: "0",
      height: "100%",
      width: "51%",
      background: "#fff"
    },
    "&:before": { left: "0", transform: "skew(0deg, 30deg)" },
    "&:after": {
      right: "0",
      width: "50%",
      transform: "skew(0deg, -30deg)"
    },
  },

  "@keyframes move": {
    "25%": { opacity: 1 },
    "33%": { opacity: 1, transform: "translateY(30px)" },
    "67%": { opacity: 1, transform: "translateY(40px)" },
    "100%": { opacity: 0, transform: "translateY(55px) scale3d(0.5, 0.5, 0.5)" }
  },
  text: {
    display: "block",
    marginTop: "75px",
    marginLeft: "-30px",
    fontFamily: '"Helvetica Neue", "Helvetica", Arial, sans-serif',
    fontSize: "12px",
    color: "#fff",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    opacity: 0.25,
    animation: `$pulse 2s linear alternate infinite`
  },
  "@keyframes pulse": { to: { opacity: 1 } },

  text: {
    display: 'block',
    marginTop: '75px',
    marginLeft: '-30px',
    fontFamily: '"Helvetica Neue", "Helvetica", Arial, sans - serif',
    fontSize: '12px',
    color: '#fff',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    opacity: '.25',
    animation: 'pulse 2s linear alternate infinite',
  },
}));
