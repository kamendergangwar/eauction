import { makeStyles } from "@material-ui/core/styles";
import Background from "../../../assets/Background-v1.png";

export const AgentLayoutStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Background})`,
    // background: "linear-gradient(140.72deg, #002C54 16.11%, #004583 66.52%)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: 430,
  },
  root: {
    paddingRight: theme.spacing(0),
    paddingLeft: theme.spacing(0),
  },
}));
