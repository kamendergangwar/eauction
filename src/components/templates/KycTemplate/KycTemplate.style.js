import { makeStyles } from "@material-ui/core/styles";
import KycBackground from "../../../assets/KycBackground.jpg";
import MobileBackground from "../../../assets/MobileBackground.jpg";

export const KycTemplateStyle = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${KycBackground})`,
    backgroundPosition: "center",
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
    padding: theme.spacing(1.5, 2.5),
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  helpText: {
    color: "#FFFFFF",
    fontSize: "0.8rem"
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
}));
