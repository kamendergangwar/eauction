import { makeStyles } from "@material-ui/core/styles";

export const GrievanceTabStyles = makeStyles((theme) => ({
  root: {
    display: "block"
  },
  grievanceFormCont: {
    padding: theme.spacing(3, 6),
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgb(23 33 61 / 10%)",
    borderRadius: "8px",
    margin: "0 auto",
    maxWidth: "650px",
    position: "relative",
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 1),
      "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        transform: "translate(14px, 12px) scale(1)",
        fontSize: "0.8rem"
      },
      "& .MuiInputBase-input": {
        padding: theme.spacing(1.3, 1),
        fontSize: "0.8rem"
      }
    },
  },
  btnFullWidth: {
    display: "block",
    width: "100%"
  },
  input: {
    display: "none",
  },
  selectedFileNameView: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #697987",
    borderRadius: "5px",
    color: "#000000",
    padding: theme.spacing(1, 2),
    fontFamily: "Noto Sans",
    fontWeight: "500",
    fontSize: "18px",
    wordBreak: "break-all"
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0
  }
}));