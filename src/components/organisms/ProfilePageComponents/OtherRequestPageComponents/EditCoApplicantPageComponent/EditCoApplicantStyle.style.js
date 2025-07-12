import { makeStyles } from "@material-ui/core/styles";

export const EditCoApplicantStyle = makeStyles((theme) => ({
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
  statusSelect: {
    padding: theme.spacing(2)
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
  },
  nodetailSubHeading: {
    fontSize: "14px",
    fontWeight: 600,
  },
  nodetailHeading: {
    fontSize: "12px",
  },
  dragAndDropTxt: {
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  projectSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 0,
    // background: "rgb(255, 244, 229)",
    background: "#EDF2FF",
    // color: 'rgb(102, 60, 0)',
    color: '#0038C0',
    padding: theme.spacing(1.5, 3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 0),
    },
    '&.done': {
      // color: 'rgb(30, 70, 32)',
      color: '#0038C0',
      // background: 'rgb(237, 247, 237)',
      background: "#EDF2FF",
    }
  },
  successChip: {
    fontWeight: 600,
    color: '#219653',
    border: '2px solid #219653'
  },
  pendingChip: {
    fontWeight: 600,
    border: "2px solid #F27807;"
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
  secTitle: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
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
  cancelBookingBtn: {
    "&.MuiButton-contained": {
      background: "white",
      color: '#0038C0',
      "&.MuiButton-contained:hover": {
        background: "rgb(240 234 253)",
      },
    },
  },
  applyCancelBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(2, 0),
    height: 100,
    padding: theme.spacing(2),
    background: "linear-gradient(92.65deg, #4a4343 -7.82%, #4468f1 106.08%)",
    borderRadius: 10,
    color: "white",
  },
  formSection: {
    height: "100%",
    overflow: "auto",
  },
  inputsSection: {
    padding: theme.spacing(3, 7),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  relationshipDropDown: {
    width: "100%",
    '& .MuiFormLabel-root.Mui-disabled': {
      fontWeight: "700",
      color: "#0f5dca",
    },

    '& input#standard-disabled': {
      fontWeight: "700",
      color: "#000000",
    },
  },
  checkboxSection: {
    backgroundColor: "#F5FAFD",
    padding: theme.spacing(2, 7),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  verifiedBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    gap: "6px",
    borderRadius: "40px",
    background: "linear-gradient(113.08deg, #10BAEF -80.36%, #00A848 124.11%)",
    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontSize: "11px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  cancelInprogressCon: {
    display: "flex",
    background: "#d3e9fb30",
    borderRadius: 10,
    // color: "white",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: 10,
    },
  },
  detailInprogressCon: {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  statusChip: {
    "& .MuiChip-outlined": {
      border: "2px solid #0038C0",
    },
    "& .MuiChip-icon": {
      color: "#0038C0",
    },
    "& .MuiChip-root": {
      color: "#0038C0",
    },
  },
  nocDetailTxtlabel: {
    fontSize: ".8rem",
  },
  nocDetailTxtlabelVal: {
    fontSize: ".8rem",
    color: "#666664",
  },
  boldColortxt: {
    color: 'rgb(102, 102, 100)',
    fontWeight: "600"
  }
}));

