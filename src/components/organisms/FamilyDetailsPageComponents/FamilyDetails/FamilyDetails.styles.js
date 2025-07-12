import { makeStyles } from "@material-ui/core/styles";

export const familyDetailsStyles = makeStyles((theme) => ({
  container: {
    // padding: theme.spacing(3),
    // height: 560,
    // [theme.breakpoints.only("md")]: {
    //   height: 450,
    // },
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
  tableContainer: {
    height: 215,
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      height: 175,
      // padding: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      height: 190,
    },
    [theme.breakpoints.down("xs")]: {
      height: 220,
    },
  },
}));
