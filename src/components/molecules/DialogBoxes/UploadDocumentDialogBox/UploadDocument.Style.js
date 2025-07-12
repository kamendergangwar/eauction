import { makeStyles } from "@material-ui/core/styles";

export const UploadDocumentStyles = makeStyles((theme) => ({
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
  rejectSection: {
    padding: theme.spacing(2, 3, 2, 3),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 0),
    },
  },
  docInfoBox:{
    margin: theme.spacing(2, 3, 2, 3),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0),
    },
  },
  rejectDetailsCon: {
    padding: theme.spacing(1),
    borderRadius: 8,
  },
  overlayBtn: {
    width: 90,
    top: "91px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "10px",
    position: "absolute",
    height: "20px",
    bottom: "0px",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(6px)",
    borderBottomRightRadius: "3px",
    borderBottomLeftRadius: "3px",
    lineHeight: "20px",
    color: "#fff",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      top: 100,
    },

    "& img": {
      width: "18px",
      marginRight: "10px",
    },
  },
  cover: {
    borderRadius: 5,
    border: '1px solid lightgray'
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
    border: "2px dashed #00437E",
    borderRadius: "8px",
    backgroundColor: "#F5FAFD",
    textAlign: "center",
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
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
    padding: theme.spacing(1.5, 0),
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
    color: "#BBBBBB",
    fontWeight: 500,
    fontSize: "0.9rem",
    marginBottom: theme.spacing(1),
  },
  downloadSampleFileBox: {
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
  footerBox: {
    padding: theme.spacing(2, 0),
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      borderTop: "1px solid #EEEEEE",
    },
  },
}));
