import { StepConnector, StepIcon, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const MakeHousePaymentStyle = makeStyles((theme) => ({
  docContainer: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 2),
    },
  },
  pageHeader: {
    // borderBottom: "1px solid #EEEEEE",
    paddingBottom: theme.spacing(3),
  },
  pageTitle: {
    color: "#0F2940",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
  },
  divider: {
    display: "flex",
    flexDirection: "row",
    color: "#65707D",
    fontSize: "15px",
    "&::before,&::after": {
      content: "''",
      flex: "1 1",
      borderBottom: "2px solid #EEEEEE",
      margin: "auto",
      marginRight: "10px",
      marginLeft: "10px",
    },
  },
  progressChip: {
    background: "rgba(101, 112, 125, 0.1)",
    fontWeight: 700,
    color: "#4C5D6C",
    border: "none",
    "&.done": {
      background: "rgba(33, 150, 83, 0.12)",
      color: "#219653",
    },
    "&.pending": {
      background: "#FDF7E5",
      color: "#F27807",
    },
    "&.overdue": {
      color: "#FD000D",
      background: "rgba(235, 87, 87, 0.06)",
    },
    '&.daysChip': {
      color: "#0038C0",
      background: "#EDF2FF",
    }
  },
  accordianSummary: {
    "&.MuiAccordionSummary-root": {
      minHeight: "50px",
    },

    // backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ccc",
    "& .MuiAccordionSummary-content": {
      margin: "9px 10px 9px 0",
    },
  },
  accordianCon: {
    "&.Mui-disabled": {
      backgroundColor: "rgb(243 243 243 / 0%)",
    },
    boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
    "& .MuiIconButton-root": {
      backgroundColor: "rgba(1, 81, 202, 0.1)",
      padding: 5,
      "& .MuiSvgIcon-root": {
        color: "#0151CA",
        fontSize: "1.1rem",
      },
    },
  },
  stepContent: {
    marginTop: 0,
    paddingRight: 0,
    borderLeft: "2px dashed #E7E7E7",
    "&.done": {
      borderLeft: "2px solid rgba(33, 150, 83, 1)",
    },
    "&.active": {
      borderLeft: "2px solid rgba(1, 81, 202, 1)",
    },
  },
  stepperCollapseCon: {
    boxShadow: "0px 6px 20px rgba(1, 81, 202, 0.1)",
    borderTop: "1px solid #8080801f",
    padding: 8,
  },
  stepperLabelCon: {
    padding: 8,
    boxShadow: "0px -5px 20px rgba(1, 81, 202, 0.1)",
  },
  subHeading: {
    fontSize: 12,
    color: "#65707D",
  },
  amountTxt: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 17,
    fontWeight: 700,
    "& span": {
      color: "rgba(101, 112, 125, 0.5)",
      fontSize: 12,
      fontWeight: 400,
    },
  },
  dateTxt: {
    color: "#4C5D6C",
    fontSize: 14,
    fontWeight: 700,
  },
  totalPayCon: {
    height: 153,
    background: "linear-gradient(92.65deg, #194DC7 -7.82%, #0CBC8B 106.08%)",
    borderRadius: '10px 10px 0 0',
    color: "white",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: 10,
    },
  },
  reasonCon: {
    marginLeft: 35,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  detailCon: {
    paddingRight: 10,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  paymentDetail: {
    padding: theme.spacing(1, 0),
    background: "rgba(255, 255, 255, 0.06)",
    borderRadius: 10,
  },
  cancelBookingBtn: {
    "&.MuiButton-contained": {
      background: "white",
      color: "rgb(253, 0, 13)",
      "&.MuiButton-contained:hover": {
        background: "rgb(253, 236, 234)",
      },
    },
  },
  tableCon: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '0 0 4px 0',
    padding: 8,
    color: '#fff',
    background: "linear-gradient(92.65deg, #194DC7 -7.82%, #0CBC8B 106.08%)",
    borderRadius: '0 0 10px 10px',
  },
  table: {
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    padding: 8
  },
  th: {
    fontSize: '12px',
    fontWeight: 600
  },
  td: {
    fontSize: '12px',
  },
  modelBoxConfirm: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "620px",
    },
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

export const ColorlibConnector = withStyles({
  alternativeLabel: {},

  active: {
    "& .MuiStepConnector-line": {
      borderLeft: "2px solid #F27807",
    },
  },
  completed: {
    "& .MuiStepConnector-line": {
      borderLeft: "2px solid rgba(33, 150, 83, 1)",
    },
  },
  line: {
    borderLeft: "2px dashed #eaeaf0",
  },
})(StepConnector);
