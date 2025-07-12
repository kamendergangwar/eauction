import { makeStyles } from "@material-ui/core/styles";

export const genericCardStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxHeight: 470,
    overflow: "auto",
    [theme.breakpoints.only("md")]: {
      height: 450,
      // backgroundColor: "red",
      // padding: theme.spacing(2),
    },
    // [theme.breakpoints.down("sm")]: {
    //   padding: theme.spacing(3),
    // },
  },
}));
