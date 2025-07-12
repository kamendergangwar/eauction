import { makeStyles } from "@material-ui/core/styles";

export const AppDetailsViewStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 3, 3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  applicationHeader: {
    padding: theme.spacing(1),
    margin: 0,
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      padding: 0
    }
  },
  container: {
    height: "58vh",
    // height: 560,
    overflow: "auto",
    // [theme.breakpoints.only("md")]: {
    // height: 450,
    // },
    [theme.breakpoints.only("sm")]: {
      height: "54vh",
      // height: 450,
    },
    "&.print": {
      height: "auto",
    }
  },
  secContainer: {
    padding: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1.5),
    },
  },
  topButton: {
    minWidth: 200,
    [theme.breakpoints.only("xs")]: {
      minWidth: "100%",
    },
  },
  grayscaleLabel: {
    fontWeight: 500,
    fontSize: 14,
    color: "#6E7191"
  },
  infoLabel: {
    fontWeight: 600,
    fontSize: "0.8rem"
  },
  infoValueTxt: {
    fontSize: "0.8rem",
    wordBreak: "break-word"
  },
  profilePhoto: {
    height: 150,
    width: 140,
    borderRadius: 5,
  },
  table: {
    minWidth: 650,
  },
  customTableContainer: {
    overflowX: "initial",
  },
  /* tableContainer: {
    height: 215,
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      height: 175,
    },
    [theme.breakpoints.down("sm")]: {
      height: 190,
    },
    [theme.breakpoints.down("xs")]: {
      height: 220,
    },
  }, */

  chipsUi: {
    background: "#EDF5FF",
    borderRadius: 60,
    display: "inline-block",
    padding: "2px 10px",
    color: "#45688D",
    fontSize: "0.7rem",
    margin: "10px 10px 10px 0",
    "&.filled": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff"
    }
  },

  incomeGroupTxt: {
    fontFamily: "Noto Sans",
    fontSize: "0.8rem",
    color: "#F27807",
    marginRight: 5
  },

  incomeGroupVal: {
    fontSize: "0.8rem",
  },
  paccaHouseCheckBox: {
    "& .MuiTypography-body1": {
      fontSize: "0.8rem",
    },
    "& .MuiSvgIcon-root": {
      width: "0.8em",
      height: "0.8em"
    }
  },
  innerTitle: {
    "& .MuiTypography-h6": {
      fontSize: "1rem"
    }
  },
  subTitle: {
    fontSize: "1rem"
  },
  cardRoot: {
    padding: theme.spacing(1),
    margin: theme.spacing(0, 0, 3, 0),
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
    },
  },
  cover: {
    width: 200,
    height: 180,
    borderRadius: 5,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      height: "170px"
    },
  },
  dataCotainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.only("xs")]: {
      "& > *": {
        margin: 0,
        padding: "5px",
        flex: "0 0 50%"
      },
    },
  },
  chipCotainer: {
    display: "flex",
    alignItems: "center"
  },
  wrapIcon: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  button: {
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 10,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  amountView: {
    float: "right",
    backgroundColor: "#65707d",
    color: "#ffffff",
    cursor: "default",
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  cardFoot: {
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      "& > *": {
        width: "100%"
      },
    },
  },
  catChip: {
    padding: "5px 12px",
    background: "#EDF5FF",
    borderRadius: "5px",
    color: "#45688D",
    fontSize: 10,
    display: "inline-block",
    marginBottom: "5px"
  }
}));