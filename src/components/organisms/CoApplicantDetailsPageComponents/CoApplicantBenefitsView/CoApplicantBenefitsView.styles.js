import { makeStyles } from "@material-ui/core/styles";

export const CoApplicantBenefitsViewStyles = makeStyles((theme) => ({
  formSection: {
    height: "100%",
    overflow: "auto",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
    },
  },
  checkboxSection: {
    backgroundColor: "#F5FAFD",
    padding: theme.spacing(1, 20),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2),
    },
  },
  wantTextBox: {
    color: "#00437E",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
      fontSize: "1rem"
    },
  },
  benefitsSection: {
    padding: theme.spacing(5, 20),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  orderList: {
    color: "#65707D",
    margin: theme.spacing(2, 0, 0, 0),
    paddingLeft: theme.spacing(2),
    lineHeight: "26px",
    fontSize: "0.9rem",
  },
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
}));
