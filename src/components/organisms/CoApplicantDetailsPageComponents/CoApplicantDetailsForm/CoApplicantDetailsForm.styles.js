import { makeStyles } from "@material-ui/core/styles";

export const CoApplicantDetailsFormStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%"
  },
  formSection: {
    height: "100%",
    overflow: "auto",
  },
  inputsSection: {
    padding: theme.spacing(3, 20),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  relationshipDropDown: {
    width: "100%",
    '& .MuiFormLabel-root.Mui-disabled': {
      fontWeight: "700",
      color: "#0f5dca",
    },

    '& input#standard-disabled': {
      fontWeight: "700",
      color: "#000000",
    },
  },
  checkboxSection: {
    backgroundColor: "#F5FAFD",
    padding: theme.spacing(2, 20),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  addressPreviewSection: {
    '& .addressContent': {
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    '& .addressLabel': {
      fontSize: "0.8rem",
      color: "#7a7a7a"
    }
  },
  removeApplcntBtn: {
    position: "absolute",
    top: 0,
    right: theme.spacing(6),
    transform: "translateY(-50%)",
    "& .MuiSvgIcon-root": {
      fontSize: "0.9rem"
    }
  },
  addDtlsTitle: {
    color: "#263238",
    fontSize: "0.9rem",
    marginBottom: theme.spacing(2)
  },
  addDtlsAddBox: {
    backgroundColor: "#EEEEEE",
    border: "1px dashed #B8B8B8",
    borderRadius: 8,
    textAlign: "center",
    padding: theme.spacing(2, 1.5),
    "&.active": {
      backgroundColor: "#fff",
      borderColor: "#00437E"
    }
  },
  cardTtitle: {
    color: "#0F2940",
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    "& .MuiSvgIcon-root": {
      verticalAlign: "middle",
      marginRight: theme.spacing(1)
    },
    "& span": {
      display: "inline-block",
      verticalAlign: "middle"
    }
  },
  addBtn: {
    minWidth: 100,
    "&.Mui-disabled": {
      border: "none",
      color: "#fff",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "0.9rem"
    }
  },
  lastInfoSection: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3, 20),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    },
  },
  lastInfoTxt: {
    color: "#00437E",
    fontSize: "1.1rem",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  progressView: {
    color: "#007AE7",
    fontSize: "0.9rem",
    marginRight: theme.spacing(3)
  },

}));
