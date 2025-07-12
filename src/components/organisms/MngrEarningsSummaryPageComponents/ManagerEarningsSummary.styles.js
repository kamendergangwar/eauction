import { makeStyles } from "@material-ui/core/styles";

export const ManagerEarningsSummaryStyles = makeStyles((theme) => ({
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
  /* areaFormControl: {
    display: "block",
    "& .MuiInputBase-root": {
      width: "100%"
    },
    "& .MuiSelect-selectMenu": {
      padding: theme.spacing(1.3)
    }
  }, */
  /* chartContainer: {
    position: "relative",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    "& .recharts-wrapper": {
      margin: "0 auto"
    }
  },
  chartTotalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
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
  }, */
  verticalLine: {
    // margin: -5 20px 0
    margin: theme.spacing(-0.3, 2.5, 0)
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
  rupeesIconBox: {
    backgroundColor: "#F6F6F6",
    borderRadius: "50%",
    width: 24,
    height: 24,
    verticalAlign: "bottom",
    marginRight: theme.spacing(1)
  },
  totalLabel: {
    color: "#4C5D6C",
    fontSize: "1rem",
    marginRight: theme.spacing(2)
  },
  totalAmount: {
    color: "#007AE7",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  filteredText: {
    color: "#4C5D6C",
    fontSize: "0.9rem"
  },
  profileImgCover: {
    border: "2px solid #EEEEEE",
    borderRadius: "50%",
    width: 40,
    height: 40,
    marginRight: theme.spacing(1.5)
  },
  appCountInBox: {
    color: "#007AE7",
    marginRight: theme.spacing(2)
  }
}));