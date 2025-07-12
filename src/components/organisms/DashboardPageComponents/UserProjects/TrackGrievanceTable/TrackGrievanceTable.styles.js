import { makeStyles } from "@material-ui/core/styles";

export const TrackGrievanceTableStyles = makeStyles((theme) => ({
  root: {
    display: "block"
  },
  trackTableContainer: {
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.05)",
    borderRadius: "8px",
    "& .MuiTypography-h6": {
      marginBottom: theme.spacing(2)
    }
  },
  customTableContainer: {
    marginTop: theme.spacing(2),
    "& .MuiTableHead-root":{
      height: "40px",
    },
    "& .MuiTableCell-stickyHeader":{
      background:"none"
    },
    "& .GriTableRow": {
      height: "100px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 20px 5px rgb(0 56 192 / 6%)",
      borderRadius: "10px"
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(1),
      border: "none"
    },
    "& .MuiTableCell-head": {
      color: "#0F2940",
      fontWeight: 600
    },
    "& .MuiButton-outlinedPrimary":{
      padding: "5px 12px"
    },
    "& .statusTag":{
      display: "inline-block",
      width: "126px",
      height: "29px",
      border: "1px solid rgba(33, 150, 83, 0.1)",
      fontSize: "0.875rem",
      textAlign: "center",
      borderRadius: "40px",
      fontWeight: "600",
      lineHeight: "28px",
      letterSpacing: "0.02em"
    },
    "& .successLabel": {
      background: "rgba(33, 150, 83, 0.05)",
      color: "#219653"
    },
    "& .warningLabel": {
      background: " rgba(242, 120, 7, 0.05)",
      color: "#F27807"
    },

    "& .closedLabel": {
      color: "#0f0f0f",
      background: "rgb(0 0 0 / 5%)",
    },

    "& .grievanceNo":{
      color: "#00437E",
      fontWeight: "700",
      fontSize: "1rem",
      lineHeight: "24px",
      letterSpacing: "0.04em"
    },
    "& .grievanceType":{
      fontSize: "0.875rem",
      color: "#00437E",
      fontWeight: "bold",
      lineHeight: "24px",
      letterSpacing: "0.02em"
    },
    "& .grievanceSubType":{
      fontSize: "0.75rem",
      color: "#4C5D6C",
      fontWeight: "normal",
      lineHeight: "18px",
      letterSpacing: "0.02em"
    },
    
    "& .dateIcon":{
      fontSize: "1.5rem",
      verticalAlign: "middle",
      marginRight: "10px",
    },

    "& .dateTxt":{
      fontSize: "0.875rem",
      color: "#0F2940",
      fontWeight: "400",
      lineHeight: "19px",
    }
  },
  grievanceStatus: {
    background: "rgba(255, 26, 26, 0.1)",
    border: "1px solid #FF1A1A",
    borderRadius: "40px",
    color: "#FF1A1A",
    display: "inline-block",
    fontSize: "0.7rem",
    fontFamily: "Noto Sans",
    fontWeight: 600,
    textTransform: "capitalize",
    padding: "4px 8px",
    minWidth: "130px",
    "&.inProgress": {
      background: "rgba(242, 120, 7, 0.1)",
      borderColor: "#F27807",
      color: "#F27807",
    },
    [theme.breakpoints.only("xs")]: {
      backgroundColor: "transparent !important",
      border: 0,
      minWidth: "auto",
      padding: 0,
    }
  },
  grievanceFilterSec: {

  },
  filterInputBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 0,
    "& .MuiOutlinedInput-input": {
      padding: "18.5px 14px"
    }
  },
  raisNewGrievanceBtn: {
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginTop: theme.spacing(2.5)
    }
  },
  trckListBoxCont: {
    marginTop: theme.spacing(3),
    "& .MuiCard-root": {
      marginBottom: theme.spacing(2)
    },
    "& .MuiCard-root:last-child": {
      marginBottom: 0
    }
  },
  trckDetlsCardRoot: {
    "& .MuiCardHeader-root": {
      borderBottom: "1px solid #D6D6D6",
    },
    "& .MuiCardHeader-content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }
  }
}));