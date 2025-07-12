import { makeStyles } from "@material-ui/core/styles";

export const AgentLeadViewsStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3, 3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  dataContainer: {
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      // height: 450,
    },
  },
  popoverMenu: {

  },
  popoverMenuTittle: {
    fontSize: "10px",
    fontWeight: "bold",
    lineHeight: 1
  },
  container: {
    height: "84vh",
    padding: theme.spacing(1.5, 4),
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
  leadHeader: {
    backgroundColor: "#012D54",
    boxShadow: "0 4px 20px rgb(23 33 61 / 10%)",
    marginRight: "10px",
    borderRadius: 10,
    color: "#fff",
    width: "20%",
    // padding: theme.spacing(3.5, 12.5),
    height: "fit-content",
    marginBottom: theme.spacing(2),
    "&.innerSection": {
      backgroundColor: "#fff",
      color: "#65707D",
    },
  },
  innerGrid: {
    width: "100%",
  },
  appFilterLabel: {
    color: "#65707D",
    textAlign: "right",
    fontWeight: 500,
    fontSize: "0.8rem",
    [theme.breakpoints.only("xs")]: {
      textAlign: "left",
    },
    "& .MuiSvgIcon-root": {
      verticalAlign: "text-top",
      marginRight: theme.spacing(1),
      fontSize: "1rem",
    },
  },
  filterInputBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 0,
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px",
    },
    "&.searchBox .MuiOutlinedInput-root fieldset": {
      borderRadius: 35,
    },
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      fontSize: "0.8rem",
      transform: "translate(14px, 14px) scale(1)",
    },
    "&.filterInputs": {
      maxWidth: 300,
    },
  },
  profileImgSection: {
    display: "inline-block",
    position: "relative",
    marginBottom: theme.spacing(3),
  },
  uploadPhotoBtn: {
    backgroundColor: "#007AE7",
    border: "4px solid #012D54",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    right: 0,
    "&:hover": {
      backgroundColor: "#007AE7",
    },
  },
  profileImgCover: {
    borderRadius: "50%",
    border: "4px solid #012D54",
    width: 170,
    height: 170,
  },
  docsBox: {
    padding: theme.spacing(2),
  },
  docsCard: {
    backgroundColor: "#F5FAFD",
    border: "1px dashed #00437E",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",

    maxWidth: 235,
    textAlign: "center",
    margin: "0 auto",
    padding: theme.spacing(1, 1.5),
    minHeight: 50,
    height: "100%",
    position: "relative",
    "&.done": {
      background: "linear-gradient(0deg, #0038C0 20.1%, #006FD5 87.81%)",
      border: "none",
    },
  },
  browseBtn: {
    marginLeft: theme.spacing(1),
    padding: "4px",
  },
  uploadBtn: {
    marginLeft: theme.spacing(1),
    padding: "4px",
  },
  overview: {
    minHeight: 150,
    height: "100%",
    width: "100%",
    maxWidth: 235,
  },
  downloadBtn: {
    padding: "4px",
    fontFamily: "Noto Sans",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
  },
  downloadBtnArea: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
    marginBottom: "10px",
  },
  subBtn: {
    marginLeft: theme.spacing(1),
  },
  searchBoxCol: {
    [theme.breakpoints.only("xs")]: {
      order: 1,
    },
  },
  chartTotalLanel: {
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "1rem",
    textAlign: "center",
    "& strong": {
      color: "#007AE7",
      fontSize: "1.5rem",
      verticalAlign: "middle",
    },
  },
  errorMsgView: {
    width: "100vh",
    textAlign: "center",
    paddingTop: "64px",
    paddingBottom: "64px",
  },
  filterInputBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 0,
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px",
    },
    "&.searchBox .MuiOutlinedInput-root fieldset": {
      borderRadius: 35,
    },
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      fontSize: "0.8rem",
      transform: "translate(14px, 14px) scale(1)",
    },
    "&.filterInputs": {
      maxWidth: 300,
    },
  },
  validateText: {
    color: "#65707D",
    fontSize: "0.8rem",
  },
  agentFullName: {
    fontWeight: "bold",
    fontSize: "1.52rem",
    marginBottom: theme.spacing(2),
  },
  agentGenderView: {
    color: "#C4C4C4",
    fontWeight: 600,
    fontSize: "1rem",
    "& .MuiSvgIcon-root": {
      verticalAlign: "sub",
      marginRight: theme.spacing(1),
    },
  },
  sectionCardTitle: {
    width: "max-content",
    color: "#007AE7",
    fontWeight: 800,
    fontSize: "1.5rem",
    marginBottom: theme.spacing(4),
  },
  input: {
    display: "none",
  },
  innerGrid: {
    alignItems: "center",
    justifyContent: "center",
  },
  switchLabel: {
    "& .MuiTypography-body1": {
      color: "#4C5D6C",
      fontWeight: "bold",
      fontSize: "0.8rem",
    },
  },
  sectionLabel: {
    color: "#65707D",
    fontWeight: 500,
  },
  sectionValue: {
    color: "#0F2940",
    fontWeight: "bold",
  },
  status: {
    "&._0": {
      borderLeft: "12px solid #2196F3",   // Unattented - Blue
    },
    "&._1": {
      borderLeft: "12px solid #FF9800",   // Call Back - orange
    },
    "&._2": {
      borderLeft: "12px solid #a5493b",   // Reminder - brown
    },
    "&._3": {
      borderLeft: "12px solid #8BC34A",   // Call Successful - Blue
    },
    "&._4": {
      borderLeft: "12px solid #F44336",   // Call not Picked up - Red
    },
    "&._5": {
      borderLeft: "12px solid #9E9E9E",   // Not interested - Grey
    },
    "&._6": {
      borderLeft: "12px solid #d434d7",   // Not connected - violet
    },
    // "&._7": {
    //   borderLeft: "12px solid #2196F3",   // Connected - Light Green
    // },
    "&._8": {
      borderLeft: "12px solid #d434d7",   // site visit - Violet
    },
  },
  statusLegends: {
    width: 12,
    height: 12,
    borderRadius: "2px",
    marginRight: "8px",
    fontSize: 12,
    "&._0": {
      background: "#2196F3",   // Unattented - Blue
    },
    "&._1": {
      background: "#FF9800",   // Call Back - orange
    },
    "&._2": {
      background: "#a5493b",   // Reminder - brown
    },
    "&._3": {
      background: "#8BC34A",   // Call Successful - Blue
    },
    "&._4": {
      background: "#F44336",   // Call not Picked up - Red
    },
    "&._5": {
      background: "#9E9E9E",   // Not interested - Grey
    },
    "&._6": {
      background: "#d434d7",   // Not connected - violet
    },
    // "&._7": {
    //   background: "#2196F3",   // Connected - Light Green
    // },
    "&._8": {
      background: "#da03ff",   // site visit - Violet
    },
  },
}));
