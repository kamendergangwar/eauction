import { makeStyles } from "@material-ui/core/styles";

export const StartFreshStyle = makeStyles((theme) => ({
  docContainer: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 2),
    },
  },
  pageHeader: {
    borderBottom: "1px solid #EEEEEE",
    paddingBottom: theme.spacing(3),
  },
  pageTitle: {
    color: "#0F2940",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
  },
  pageSubTitle: {
    color: "#65707D",
    fontSize: "0.8rem",
  },
  tableContainer: {
    paddingTop: theme.spacing(3),
  },
  tableHeader: {
    padding: theme.spacing(0, 1.5),
    marginBottom: theme.spacing(2),
  },
  tblHdCol: {
    color: "#BBBBBB",
    fontWeight: 500,
    fontSize: "0.9rem",
    "&.type": {
      marginRight: theme.spacing(1.5),
    },
  },
  tableRow: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    padding: theme.spacing(1.5, 2.5),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 1, 1, 1.5),
    },
  },
  fileFormatIcon: {
    maxWidth: 22,
    display: "block",
    marginRight: theme.spacing(2),
  },
  fullNameCol: {
    color: "#0F2940",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  fileSizeCol: {
    color: "#4C5D6C",
    fontSize: "0.9rem",
    fontWeight: "normal",
  },
  fileViewBtn: {
    minWidth: "auto",
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(3),
    "&.Mui-disabled": {
      color: "rgba(0, 56, 192, 0.15)",
    },
  },
  downloadIconBtn: {
    padding: theme.spacing(1),
  },
  menuIconBtn: {
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  },
  menuContainer: {
    "& .MuiMenuItem-root": {
      minHeight: 40,
      textTransform: "capitalize",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
      marginRight: theme.spacing(1.5),
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.4rem",
    },
  },
  notFound: {
    display: "flex",
    justifyContent: "center",
    color: "#888",
    fontSize: "1.5rem",
  },
  docUploadErrorTxtView: {
    textAlign: "center",
    fontSize: "0.8rem",
    color: "#ff9800",
    padding: theme.spacing(1, 0),
  },
  proceedBtn: {
    "&.Mui-disabled": {
      backgroundColor: "#99CAF5",
      color: "#fff",
    },
  },
  formContainer: {
    height: "100%",
  },
  innerCont: {
    borderRight: "1px solid #EEEEEE",
    [theme.breakpoints.down("sm")]: {
      borderRight: 0,
    },
  },
  radioSection: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1.5),
    },
  },
  fileUploadSection: {
    padding: theme.spacing(2, 3, 2, 0),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 0),
    },
  },
  uploadDocLoader: {
    border: "2px dashed #00437E",
    borderRadius: 8,
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minHeight: 200,
  },
  inputsSection: {
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },

    "& .MuiFormGroup-row": {
      justifyContent: "end",
    },
  },
  fileUploadTitle: {
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "0.8rem",
    marginBottom: theme.spacing(0.5),
  },
  kycDragnDropBox: {
    height: 67,
    // border: "2px dashed #00437E",
    backgroundColor: "#F5FAFD",
    textAlign: "center",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(2),
    "&.dragover": {
      borderColor: "#ff5722",
      backgroundColor: "#fff6f4",
    },
    "& .MuiFormHelperText-root": {
      textAlign: "center",
      margin: theme.spacing(0, 0, 1, 0),
    },
  },
  dragAndDropTxt: {
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  iconStyle: { maxWidth: 200, maxHeight: 200 },
  input: {
    display: "none",
  },
  kycUploadBtn: {
    // textDecoration: "underline",
    // minWidth: "auto",
    // padding: theme.spacing(0, 1)
    marginLeft: theme.spacing(1),
  },
  validateText: {
    color: "#65707D",
    fontSize: "0.8rem",
  },
  kycCaption: {
    color: "#65707D",
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  fileViewArea: {
    border: "2px solid rgba(0, 122, 231, 0.3)",
    borderRadius: 8,
    backgroundColor: "rgba(0, 122, 231, 0.1)",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    "& .MuiTypography-root": {
      fontSize: "0.8rem",
      marginLeft: theme.spacing(1),
    },
    "& .MuiButton-root": {
      minWidth: "auto",
      padding: theme.spacing(0.5, 1),
    },
  },
  filePreviewCard: {
    border: "1px dashed #C1C1C1",
    borderRadius: 8,
    textAlign: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    minHeight: 200,
  },
  fileUploadedSuccessText: {
    color: "#65707D",
    fontSize: "0.8rem",
    fontWeight: 600,
    marginTop: theme.spacing(3),
  },
  panPreviewImg: {
    maxWidth: 250,
    maxHeight: 150,
  },
  sampleDownTitle: {
    fontWeight: 500,
    fontSize: "0.9rem",
    marginBottom: theme.spacing(1),
  },
  downloadSampleFileBox: {
    height: 67,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    "& .templateNameBox": {
      overflow: "hidden",
    },
    "& .MuiTypography-root": {
      fontSize: "0.8rem",
      marginLeft: theme.spacing(1),
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      overflow: "hidden",
    },
  },
  formSection: {
    height: "100%",
    // padding: theme.spacing(0, 3),
    // [theme.breakpoints.only("xs")]: {
    //   padding: theme.spacing(2),
    // },
  },
  container: {
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      overflowX: "hidden",
    },
  },
  modelBoxConfirm: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "620px",
    },
  },
  dataContainer: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  dataValueViewBox: {
    marginLeft: theme.spacing(0.5),
    padding: "8px 0",
  },
  dataValueView: {
    marginLeft: theme.spacing(0.5),
    padding: "5px 0",
  },
  scaleIconView: {
    fontSize: "2rem",
  },
  dataTitle: {
    color: "#65707D",
    // fontWeight: 600,
    fontSize: "0.8rem",
  },
  dataValue: {
    color: "#00437E",
    fontWeight: "700",
    fontSize: "12px",
    lineHeight: "24px",
  },
  sendOtpTxt: {
    display: "flex",
    flexDirection: "column",
    fontWeight: 500,
    "& span": {
      fontWeight: 600,
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
    margin: "auto",
    textAlign: "center",
  }
}));
