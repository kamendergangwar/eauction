import { makeStyles } from "@material-ui/core/styles";

export const AgentHeaderStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
  },
  logo: {
    height: 50,
  },
  buttonText: {
    textTransform: "capitalize",
  },
  rightSection: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  list: {
    width: 250,
  },
}));
