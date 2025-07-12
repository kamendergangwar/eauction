import { makeStyles } from "@material-ui/core/styles";

export const AgentAnlyDashboardStyles = makeStyles((theme) => ({
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
  activeSchmTxt: {
    fontWeight: "bold",
    fontSize: "0.8rem",
    color: "#0F2940",
    verticalAlign: "middle"
  },
  toggleBtnsContainer: {
    "& .MuiToggleButton-root": {
      borderColor: "#EEEEEE",
      fontWeight: 500,
      padding: theme.spacing(0.7, 1.5),
      "&.Mui-selected": {
        backgroundColor: "rgb(255 255 255 / 12%)",
        borderColor: "#007AE7",
        color: "#007AE7",
        fontWeight: "bold",
        zIndex: 1
      }
    }
  },
  datePickerCont: {
    width: 160,
    marginRight: theme.spacing(2)
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

  // 
  /* projOvrProgressLine: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    borderRadius: 10,
    height: 10,
    "& .MuiLinearProgress-bar": {
      borderRadius: 10
    }
  }, */
  errorMsgBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    "& p": {
      color: "#DBDBDB",
      fontWeight: "normal",
      fontSize: "1rem",
    }
  },
  activityList: {
    "& .MuiSvgIcon-root": {
      backgroundColor: "#006AE7",
      width: 40,
      height: 40,
      color: "#ffffff",
      padding: theme.spacing(1),
      borderRadius: "50%",
      marginRight: theme.spacing(1.2)
    }
  },
  activityTxt: {
    color: "#4C5D6C",
    fontWeight: "normal",
    fontSize: "0.8rem",
  },
  actDatePreview: {
    color: "#4C5D6C",
    fontWeight: 500,
    fontSize: "0.7rem",
  }
}));