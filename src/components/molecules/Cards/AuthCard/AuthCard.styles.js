import { makeStyles } from "@material-ui/core/styles";
// import Background from "../../../../assets/Background.png";

export const authCardStyles = makeStyles((theme) => ({

  authSectionMain: {
    height: "100%",
    overflow: "auto"
  },
  onboarding:{
    padding: theme.spacing(0,0),
    borderRadius:'10px'
    // maxWidth: 1050,
  },
  containerRoot: {
    padding: theme.spacing(1),
    maxWidth: 500,
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
  authRoot: {
    borderRadius: 10,
    boxShadow: "none"
  }
}));
