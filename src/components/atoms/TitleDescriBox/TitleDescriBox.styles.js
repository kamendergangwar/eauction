import { makeStyles } from "@material-ui/core/styles";

export const titleDescriBoxStyles = makeStyles((theme) => ({
  titleContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(3)
    /* margin: theme.spacing(3),
    paddingTop: theme.spacing(5),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(2),
    }, */
  },
  title: {
    color: "#0F2940",
    fontSize: "1.5rem",
    letterSpacing: "0.02em",
    fontWeight: 700,
    marginBottom: theme.spacing(1.2)
  },
  subtitle: {
    color: "#4C5D6C",
    fontSize: "0.9rem"
  }
}));
