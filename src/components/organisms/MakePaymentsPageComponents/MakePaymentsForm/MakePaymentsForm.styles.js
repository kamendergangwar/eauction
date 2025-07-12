import { makeStyles } from "@material-ui/core/styles";
import { orange, purple } from "@material-ui/core/colors";

export const makePaymentsFormStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%"
  },
  container: {
    height: "100%",
    overflow: "auto",
  },
  formSection: {
    padding: theme.spacing(5, 7.5, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    },
  },
  noteTextView: {
    color: "#0f2940",
    fontWeight: 500,
    fontSize: "1rem",
    paddingLeft: theme.spacing(5),
    margin: theme.spacing(2.2, 0, 5),
    "& span": {
      color: "#FA3D5D"
    }
  },
  checkboxSection: {
    backgroundColor: "#F5FAFD",
    padding: theme.spacing(1),
    padding: theme.spacing(2, 0),
    overflow: 'hidden',
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2)
    }
  },
  messageSection: {
    margin: "20px auto",
    padding: "0 60px",

    "& .thankTxt": {
      color: "#00437e",
      fontSize: "1.25rem",
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "24px"
    },
    "& .MuiTypography-subtitle1": {
      color: "#0F2940",
      fontSize: "0.8rem",
      fontWeight: '500',
      textAlign: "center"
    }
  },
  holdEmdTxt: {
    color: "#0F2940",
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3)
    }
  },
  headertxt: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    paddingBottom: "15px"
  },
  emdMoreTxt: {
    display: "inline-flex",
    alignItems: "center",
    fontWeight: "bold",
    paddingLeft: "15px",
    background: "-webkit-linear-gradient(#0038C0, #006FD5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  yesOrNoRadioGroup: {
    justifyContent: "space-evenly"
  },
  yesOrNoCheckBox: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgb(23 33 61 / 6%)",
    borderRadius: 8,
    padding: theme.spacing(2, 3),
    margin: 0,
    "& .MuiIconButton-root": {
      padding: 0,
      marginRight: theme.spacing(1)
    },
    "&.active": {
      backgroundColor: "#E1F4FF",
      border: "1px solid #0038C0",
      "& .MuiTypography-body1": {
        color: "#0038C0"
      }
    }
  },
  cardRoot: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    borderRadius: 5,
    marginBottom: theme.spacing(5),
    overflow: "hidden",
    padding: theme.spacing(2, 3),
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
      marginTop: 4,
      marginRight: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        display: "none"
      },
    },
    "& .cardTitle": {
      color: "#00437E",
      fontWeight: "bold",
      fontSize: "1.1rem",
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(2),
      }
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    },
  },
  referralInput: {
    margin: 0,
    minWidth: 300,
    "& .MuiOutlinedInput-root fieldset": {
      borderColor: "rgba(0, 56, 192, 0.2)",
    },
    "& .MuiInputBase-root": {
      backgroundColor: "#EAF2FC",
      borderRadius: 8,
    },
    "& .MuiInputBase-input": {
      padding: theme.spacing(1.5, 1.8),
      fontSize: "1rem"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%"
    },
  },
  totalSumCardRoot: {
    background: "linear-gradient(270deg, rgba(17,156,248,1) 0%, rgba(0,13,199,1) 100%)",
    borderRadius: "5px 5px 0px 0px",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    color: "#fff",
    padding: theme.spacing(3),
    "& .cardTitle": {
      fontSize: "1.1rem",
      fontWeight: "bold",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        marginBottom: theme.spacing(3)
      }
    },
    "& .totalAmtView": {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        marginBottom: theme.spacing(2)
      }
    },
    "& .amtInWordView": {
      fontSize: "0.9rem",
      fontWeight: 500,
      [theme.breakpoints.down("sm")]: {
        textAlign: "center"
      }
    },
  },
  impTextView: {
    color: "#00437E",
    fontWeight: 500,
    fontSize: "1rem",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 7.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    "& .totalAmtView": {
      fontSize: "1.5rem",
      color: "#000000"
    },
  },
  progressView: {
    color: "#007AE7",
    fontSize: "0.9rem",
    marginRight: theme.spacing(3)
  },
}));
