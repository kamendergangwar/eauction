import { makeStyles } from "@material-ui/core/styles";

export const kycCardStyles = makeStyles((theme) => ({
  authSectionMain: {
    height: "100%",
    overflow: "auto",
    marginBottom: "20px",
    // boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
  },
  containerRoot: {
    padding: theme.spacing(1),
    maxWidth: 460,
    height: "100%",
    /* "&>.MuiPaper-root": {
      height: "100%",
    } */
    /* [theme.breakpoints.only("lg")]: {
      width: 550,
    }, */
    /* [theme.breakpoints.only("md")]: {
      width: 660,
    }, */
    /* [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(9),
      paddingBottom: theme.spacing(9),
    }, */
  },
  kycPaperCont: {
    height: "100%"
  }
}));
