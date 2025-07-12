import { makeStyles } from "@material-ui/core/styles";
import Background from "../../../assets/Background.png";
import BlueBackground from "../../../assets/blue-background.png";

export const entryTemplateStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: `url(${Background})`,
    backgroundImage: `url(${BlueBackground})`,
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
      paddingTop: theme.spacing(3),
    },
  },
}));
