import { makeStyles } from "@material-ui/core/styles";
import Background from "../../../../assets/Background.png";

export const AgentAuthCardStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: `url(${Background})`,
    background: "linear-gradient(140.72deg, #002C54 16.11%, #004583 66.52%)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: 430,
  },
  containerRoot: {
    paddingTop: theme.spacing(5),
    [theme.breakpoints.only("lg")]: {
      width: 880,
    },
    [theme.breakpoints.only("md")]: {
      width: 660,
    },
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(8),
    },
  },
}));
