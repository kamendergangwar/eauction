import { makeStyles } from "@material-ui/core/styles";

export const contactDetailsFormStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    height: "58vh",
    // height: 560,
    overflow: "auto",
    // [theme.breakpoints.only("md")]: {
    // height: 450,
    // },
    [theme.breakpoints.only("sm")]: {
      height: "54vh",
      // height: 450,
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  line: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  nextButton: {
    marginTop: theme.spacing(2),
  },
}));
