import { makeStyles } from "@material-ui/core/styles";

export const LoanApplicationStyle = makeStyles((theme) => ({
  formContainer: {
    height: "100%",
  },
  docContainer: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 2),
    },
  },
  pageHeader: {
    // borderBottom: "1px solid #EEEEEE",
    paddingBottom: theme.spacing(2)
  },
  pageTitle: {
    color: "#0F2940",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5)
  },
  divider: {
    display: 'flex',
    flexDirection: 'row',
    color: "#65707D",
    fontSize: "15px",
    "&::before,&::after": {
      content: "''",
      flex: '1 1',
      borderBottom: '2px solid #EEEEEE',
      margin: 'auto',
      marginRight: "10px",
      marginLeft: "10px",
    }
  },
  tabsView: {
    "& .MuiTabs-root": {
    },
    "& .MuiTabs-flexContainer": {
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-start"
      },
    },
    "& .MuiTab-root": {
      color: "#0038C0",
      fontWeight: 600,
      fontSize: "0.9rem",
      textTransform: "initial",
      margin: theme.spacing(0, 1.5),
      padding: theme.spacing(0.5, 2),
      opacity: 1,
      "&:hover": {
        color: "#6f93eb"
      },
      "&.Mui-selected": {
        // backgroundColor: "#EDF2FF",
        // border: "2px solid #0038C0",
        // borderRadius: 10,
        // boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
      }
    },
  },
  NoDetailsSvg: {
    width: "100%",
    fontSize: "14rem",
    marginBottom: 10,
  },
  NoDetailsCon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  nodetailSubHeading: {
    fontSize: "14px",
    fontWeight: 600,
  },
  nodetailHeading: {
    fontSize: "12px",
  },
  nocDetailTxtlabel: {
    fontSize: ".8rem",
  },
  nocDetailTxtlabelVal: {
    fontSize: ".8rem",
    color: "#666664",
    fontWeight: "bold"
  },
  noteTxt: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 4, 0, 4),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 0, 0),
    },
  },
  generatedTag: {
    marginTop: '-44px',
    fontSize: "6rem",
    position: "absolute"
  },
  paymentSummSec: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    borderRadius: 5,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  amountLabel: {
    fontWeight: 500,
    fontSize: "0.9rem",
    color: "#0F2940",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    "&.grtl": {
      color: "#0F2940",
      fontWeight: "bold",
    },
  },
  amountSubLabel: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
  },
  amountListBox: {
    borderBottom: "1px solid rgba(231, 231, 231, 0.8)",
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      border: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },
  },
  amountBox: {
    fontWeight: 500,
    fontSize: "1rem",
    color: "#0F2940",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    "&.grtl": {
      color: "#0038C0",
      fontWeight: 800,
    },
    "&.cancel": {
      color: "#FA3D5D",
      textDecoration: "line-through",
    },
  },
}));