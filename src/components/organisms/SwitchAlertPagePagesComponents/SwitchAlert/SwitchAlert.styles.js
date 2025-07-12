import { makeStyles } from "@material-ui/core/styles";
const boxShadow = "0px 4px 20px rgba(0, 56, 192, 0.1)";

export const SwitchAlertStyles = makeStyles((theme) => ({
  mainRoot: {
    backgroundColor: "#FFFFFF",
    boxShadow: boxShadow,
    borderRadius: 10,
    padding: theme.spacing(8, 5),
    position: "relative",
    textAlign: "center"
  },
  mobIcon: {
    maxWidth: 100
  },
  msgTextBox: {
    color: "#4C5D6C",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  actionBtn: {
    fontWeight: 700,
    fontSize: "1rem",
  },
}));
