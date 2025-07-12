import { makeStyles } from "@material-ui/core/styles";

export const AgentProjectsReportsStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 3, 3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    height: "80vh",
    padding: theme.spacing(1.5),
    // height: 560,
    overflow: "auto",
    // [theme.breakpoints.only("md")]: {
    // height: 450,
    // },
    [theme.breakpoints.only("xs")]: {
      height: "75vh",
      // height: 450,
    },
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: theme.spacing(1),
  },
  subTitle: {
    color: "#0F2940",
    fontWeight: 500,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(0.6),
  },
  areaFormControl: {
    display: "block",
    "& .MuiInputBase-root": {
      width: "100%"
    },
    "& .MuiSelect-selectMenu": {
      padding: theme.spacing(1.3)
    }
  },
  chartContainer: {
    position: "relative",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    "& .recharts-wrapper": {
      margin: "0 auto",
      zIndex: 1
    }
  },
  chartTotalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 0
  },
  legendsDotTxt: {
    color: "#4C5D6C",
    fontWeight: "normal",
    fontSize: "0.8rem",
    maxWidth: 160,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "& span": {
      backgroundColor: "#0090BD",
      display: "inline-block",
      width: 10,
      height: 10,
      marginRight: theme.spacing(1)
    }
  },
  legendsCountTxt: {
    color: "#0F2940",
    fontWeight: "normal",
    fontSize: "0.8rem",
    textSlign: "right",
  },
  filterInputBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 0,
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px"
    },
    "&.search .MuiOutlinedInput-root fieldset": {
      borderRadius: 30
    }
  },
  chartTotalLanel: {
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "1rem",
    textAlign: "center",
    "& strong": {
      color: "#007AE7",
      fontSize: "1.5rem",
      verticalAlign: "middle"
    }
  }
}));