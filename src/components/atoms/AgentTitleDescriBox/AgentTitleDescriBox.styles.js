import { makeStyles } from "@material-ui/core/styles";

export const agentTitleDescriBoxStyles = makeStyles((theme) => ({
  titleContainer: {
    textAlign: "center",
    margin: theme.spacing(3),
    paddingTop: theme.spacing(5),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(2),
    },
  },
}));
