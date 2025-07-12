import { makeStyles } from "@material-ui/core";

export const FcfsDialogsStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    borderRadius: "10px",
    fontWeight: "700",
    padding: 0,
    [theme.breakpoints.down("sm")]: {},
  },
  dialogHeader: {
    padding: theme.spacing(0, 1.5),
    display: "flex",
    alignItems: "center",
    height: "30px",
    borderRadius: "10px 10px 0px 0px",
    fontSize: "14px",
  },
  dialogGrid: {
    padding: theme.spacing(1.5, 0),
    display: "flex",
    alignItems: "center",
    justifyContent:"space-around",
    background: "#F9FAFB",
    height: "100px",
    flexWrap: "wrap",
  },
  dialogContent: {
    padding: theme.spacing(0, 2),
    background: "#F9FAFB",
  },
  dialogAction:{
    display: "flex",
    justifyContent: "center",
    background: "#F9FAFB",
    padding: theme.spacing(1.5, 0),

  },
  verifiedBox: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    minWidth: "max-content",
    gap: "6px",
    borderRadius: "40px",
    background: "rgba(33, 150, 83, 0.1)",
    "& span": {
    
      color: "#039824",
      fontSize: "13px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  scaleIconView: {
    fontSize: "2rem",
},
dataTitle: {
    color: "#65707D",
    // fontWeight: 600,
    fontSize: "0.8rem"
},
dataValue: {
    color: "#00437E",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "24px"
},
}));
