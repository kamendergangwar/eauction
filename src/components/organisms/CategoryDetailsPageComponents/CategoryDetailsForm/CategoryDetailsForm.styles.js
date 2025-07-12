import { makeStyles } from "@material-ui/core/styles";

export const categoryDetailsFormStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%"
  },
  formSection: {
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(0, 3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  // form: {
  //   marginTop: theme.spacing(1),
  // },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  line: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  progressView: {
    color: "#007AE7",
    fontSize: "0.9rem",
    marginRight: theme.spacing(3)
  },
  nextButton: {
    marginTop: theme.spacing(2),
  },
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  chipsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  nxtBtn: {
    background: " #0038C0",
    color: "#FFFFFF",
    Width: "1.5rem",
    padding: "0.8rem",
  },
  chips: {
    background: "#EAF2FC",
    color: "#006FD5",
    maxWidth: "18rem",
    margin: 3,
    padding: 3,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
  },
  /* toggleBtn: {
    border: "none",
    padding: 1,
  }, */
  /* bottomGroup: {
    marginTop: 5,
  }, */
  incomeTextBox: { background: "#F5FAFD", margin: theme.spacing(3, 0, 3) },
  familyIncome: {
    margin: "30px 10px 10px",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem"
    },
    "& .tag": {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      backgroundColor: "transparent",
      padding: "0 12px",
      fontWeight: "600",
      borderRadius: "16px"
    },
    "& .link": {
      color: "red"
    }
  },
  amountText: {
    color: "#000000de",
    marginLeft: "14px"
  },
  termsNdCondiCheckBoxLabel: {
    color: "#263238",
    fontWeight: 600,
    fontSize: "0.9rem",
    "& span": {
      color: "#0038c0",
      "&:hover": {
        textDecoration: "underline"
      }
    }
  },
  categoryInfoList: {
    "& .MuiTypography-body1": {
      color: "#00437E",
      fontSize: "1rem",
      fontWeight: "bold"
    },
    "& .religionLabel": {
      fontSize: "14px",
      color: "#000",
      paddingLeft: "10px"
    }
  }
}));
