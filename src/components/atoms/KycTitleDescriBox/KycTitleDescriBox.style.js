import { makeStyles } from "@material-ui/core/styles";

export const kycTitleDescriBoxStyles = makeStyles((theme) => ({
  titleContainer: {
    textAlign: "center",
    // marginBottom: theme.spacing(1),
    background: "linear-gradient(180deg, #0038C0 20.1%, #006FD5 87.81%)",
    padding: theme.spacing(2.75),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // margin: theme.spacing(1),
    /* paddingTop: theme.spacing(5),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(2),
    }, */
  },
  title: {
    color: "#FFFFFF",
    fontSize: "1.75rem",
    letterSpacing: "0.02em",
    fontWeight: "bold",
    marginBottom: theme.spacing(1.2),
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: "0.9rem",
    fontWeight: 400
  },
}));
