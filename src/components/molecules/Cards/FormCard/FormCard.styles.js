import { makeStyles } from "@material-ui/core/styles";

export const formCardStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // overflow: "auto",
    // [theme.breakpoints.only("md")]: {
    //   height: 450,
    //   // backgroundColor: "red",
    //   // padding: theme.spacing(2),
    // },
    "&.appDetails": {
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "transparent",
        overflow: "hidden"
      }
    }
  },
}));
