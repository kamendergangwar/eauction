import { makeStyles } from "@material-ui/core/styles";

export const initialPagesStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5.5, 10),
    position: "relative",
    /* display: "flex",
    flexDirection: "column",
    alignItems: "center", */
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    "&.back": {
      left: 5,
      right: "auto",
    },
  },
  mobileNuTxt: {
    fontWeight: 700,
    fontSize: "0.875rem",
    color: "#0f2940",
  },
  KycTnc: {
    color: "#666666",
  },
  tncTxtField: {
    fontSize: "0.8rem",
  },
  captchaBox: {
    border: "1px solid #E9EAEB",
    borderRadius: 8,
    "& img": {
      maxWidth: "100%",
      display: "block",
    },
  },
  inputLabel: {
    color: "#263238",
    fontWeight: 500,
    fontSize: "0.8rem",
    display: "block",
    marginBottom: theme.spacing(1),
  },
  nxtBtn: {
    color: "#0038C0",
    [theme.breakpoints.down("sm")]: {
      background: "linear-gradient(180deg, #042751 20.1%, #00398D 87.81%)",
      color: "#FFFFFF",
    },
    "&.Mui-disabled": {
      "& .MuiSvgIcon-root": {
        opacity: "0.3",
      },
    },
  },
  titleContainer: {
    textAlign: "center",
    paddingTop: theme.spacing(3),
  },
  /* form: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }, */
  kycCompMainBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  kycFormContainer: {
    height: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  kycCardFormRoot: {
    padding: theme.spacing(2, 4.5),
    height: "100%",
    overflow: "auto",
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
    "& .MuiFormControl-root": {
      margin: 0,
    },
  },
  formControlRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2.5),
    "&:last-child": {
      marginBottom: 0,
    },

    "& .MuiInputBase-input": {
      padding: theme.spacing(2),
    },
  },
  refreshBtn: {
    padding: theme.spacing(1.75),
  },
  kycCardFooterRoot: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  fileUploadButton: {
    color: "#007ae7",
    // padding: "35px 30px",
    padding: 14,
    fontWeight: "normal",
  },
  kycContainer: {
    marginTop: 120,
    [theme.breakpoints.only("xs")]: {
      marginTop: 180,
    },
  },
  kycUploadBtn: {
    marginLeft: theme.spacing(1),
  },
  kycDragnDropBox: {
    border: "2px dashed #C1C1C1",
    borderRadius: "8px",
    "&.dragover": {
      borderColor: "#ff5722",
      backgroundColor: "#fff6f4",
    },
  },
  helperTextBox: {
    textAlign: "center",
    fontWeight: "bold",
  },
  kycCaption: {
    color: "#65707D",
    fontSize: "0.75rem",
    fontWeight: "bold",
    letterSpacing: "0.02em",
    marginBottom: theme.spacing(1),
  },
  panCardPreviewCard: {
    border: "1px dashed #C1C1C1",
    borderRadius: 8,
    textAlign: "center",
    padding: theme.spacing(2),
  },
  panPreviewImg: {
    maxWidth: 250,
    maxHeight: 150,
    marginBottom: theme.spacing(1),
  },
  fileViewArea: {
    border: "2px solid rgba(0, 122, 231, 0.3)",
    padding: 10,
    borderRadius: 8,
    background: "rgba(0, 122, 231, 0.1)",
  },
  fileUrlPreview: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    direction: "rtl",
  },
  fileFormatIcon: {
    marginRight: theme.spacing(1),
  },
  fileNameView: {
    color: "#0F2940",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  fileSizeView: {
    color: "#65707D",
    fontSize: "0.7rem",
  },
  loadingText: {
    color: "#0038C0",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  imageStyle: { width: "100%", height: 200 },
  iconStyle: { maxWidth: 80, maxHeight: 80 },
  dragNdDropText: {
    color: "#0F2940",
    fontWeight: "bold",
  },
  termnsNdCondTitle: {
    fontWeight: 700,
  },
  paperContainer: {
    maxHeight: 400,
    overflow: "auto",
    padding: theme.spacing(5),
  },
  checkBox: {
    paddingLeft: theme.spacing(5),
  },
  button: {
    minWidth: 280,
    fontSize: "1rem",
    letterSpacing: "0.04em",
    textTransform: "none",
  },
  // linktext: { textDecoration: "none", color: "#007AE7", fontWeight: "bold" },
  helpText: {
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "#0F2940",
    marginBottom: theme.spacing(1.2),
  },
  passValidationIndicator: {
    "& p": {
      color: "#CC1100",
      textAlign: "right",
      fontSize: "0.7rem",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#F3F3F3",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#CC1100",
    },
    "&.fair p": {
      color: "#F28607",
    },
    "&.fair .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#F28607",
    },
    "&.good p": {
      color: "#F4CE08",
    },
    "&.good .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#F4CE08",
    },
    "&.great p": {
      color: "#15D734",
    },
    "&.great .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#15D734",
    },
  },
  passwordHelpTxtCont: {
    width: "auto",
    "& .MuiTableCell-root": {
      border: 0,
      padding: "3px 0",
    },
    "& .MuiSvgIcon-root": {
      color: "#15D734",
      fontSize: "1rem",
      marginLeft: theme.spacing(2),
      position: "relative",
      top: "2px",
    },
  },
  passwordHelpTxt: {
    fontSize: "0.8rem",
    color: "#4C5D6C",
  },
  content: {
    padding: "0 10px 0 10px",
  },
  dividerLine: {
    borderBottom: "2px solid #EEEEEE",
    width: "100%",
  },
  registerLinkTxt: {
    textAlign: "center",
    color: "#4C5D6C",
    fontSize: "0.85rem",
    margin: 0,
    "& a": {
      textDecoration: "none",
      color: "#007AE7",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
  },
  // ------------
  qstnContainer: {
    padding: theme.spacing(5, 6, 0),
    position: "relative",
    height: "100%",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  backButton: {
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[800],
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5),
      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
      },
    },
  },
  questionText: {
    color: "#0F2940",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    textAlign: "center",
    "& .primaryColor": {
      color: "#0038C0",
    },
    "&.big": {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.125rem",
    },
  },
  infoTitleText: {
    color: "#0F2940",
    fontSize: "0.9rem",
    textAlign: "center",
    fontWeight: 500,
    marginBottom: theme.spacing(3),
    "&.small": {
      color: "#4C5D6C",
      fontSize: "0.8rem",
      fontWeight: "normal",
      marginBottom: theme.spacing(4),
    },
  },
  helpTextBox: {
    backgroundColor: "rgba(235, 241, 251, 0.5)",
    border: "1px solid rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    marginBottom: theme.spacing(2.5),
    padding: theme.spacing(1.5),
  },
  helpTextPara: {
    color: "#0F2940",
    fontSize: "0.8rem",
    fontWeight: 500,

    "& .helpText1": {
      display: "block",
      marginBottom: "8px",
    },
  },
  exampleTextPara: {
    color: "#65707D",
    fontSize: "0.8rem",
    fontWeight: "normal",
    marginTop: theme.spacing(1.75),
  },
  showMoreBtn: {
    padding: theme.spacing(0, 0.1),
    fontSize: "0.8rem",
    minHeight: "auto",
    lineHeight: "normal",
    minWidth: "auto",
    marginTop: -2,
    marginLeft: theme.spacing(0.4),
  },
  radioBtnsGroup: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
    "& .MuiFormControlLabel-root": {
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(1, 81, 202, 0.08)",
      boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
      borderRadius: 8,
      display: "flex",
      width: "100%",
      margin: theme.spacing(0, 0, 2, 0),
      padding: theme.spacing(1, 3),
      "& .MuiIconButton-root": {
        marginRight: theme.spacing(2),
      },
      "& .MuiFormControlLabel-label": {
        color: "#0F2940",
        fontSize: "0.9rem",
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.8rem",
        },
      },
      "& .selectBoxTitle": {
        fontSize: "1rem",
        fontWeight: 600,
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.8rem",
          marginBottom: theme.spacing(0.5),
        },
      },

      "& .knowLink": {
        textDecoration: "none",
        color: "rgb(0, 122, 231)",
        fontSize: "0.75rem",
      },

      "&.congratsSec": {
        padding: theme.spacing(3, 4),
        alignItems: "start",
        // justifyContent: "end",
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(2, 1.5),
        },
        "& .MuiIconButton-root": {
          marginTop: theme.spacing(-1),
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0.5),
            marginRight: theme.spacing(1),
            marginTop: "-5px",
          },
        },
      },
      "&.active": {
        backgroundColor: "#E1F4FF",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderColor: "#0038C0",
        "& .MuiFormControlLabel-label": {
          color: "#0038C0",
          fontWeight: "bold",
        },
      },
    },
  },
  radioBtnsBoxGroup: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-around",
    },
    "& .MuiFormControlLabel-root": {
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(1, 81, 202, 0.08)",
      boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
      borderRadius: 8,
      margin: theme.spacing(0, 2),
      padding: theme.spacing(2.5, 1),
      position: "relative",
      flex: "0 0 auto",
      flexGrow: 1,
      justifyContent: "center",
      /* [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1.5, 2.5),
        margin: 0
      }, */
      "& .MuiIconButton-root": {
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0,
      },
      "& p": {
        color: "#0F2940",
        fontSize: "0.9rem",
        fontWeight: "bold",
        textAlign: "center",
      },
      "& .yesNdNoIconBtnBox": {
        backgroundColor: "rgba(101, 112, 125, 0.08)",
        borderRadius: "50%",
        width: 80,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing(1.5),
        [theme.breakpoints.down("sm")]: {
          width: 50,
          height: 50,
        },
        "& .MuiSvgIcon-root": {
          fill: "none",
          fontSize: "1.8rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.5rem",
          },
        },
      },
      "&.active": {
        backgroundColor: "#F9FDFF",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderColor: "#0038C0",
        "& .yesNdNoIconBtnBox": {
          backgroundColor: "#E1F4FF",
        },
        "& p": {
          color: "#0038C0",
        },
      },
    },
  },
  successSectionIconBox: {
    background: "rgba(0, 255, 10, 0.1)",
    borderRadius: "50%",
    width: 150,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
    "& .MuiSvgIcon-root": {
      width: 100,
      height: 100,
      [theme.breakpoints.down("sm")]: {
        width: 70,
        height: 70,
      },
    },
  },
  congratsMstText: {
    color: "#0F2940",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  yourEligibleText: {
    color: "#0F2940",
    fontSize: "0.9rem",
    fontFamily: "Noto Sans",
    fontStyle: "italic",
    marginBottom: theme.spacing(5),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  questionSubTitle: {
    color: "#4C5D6C",
    fontSize: "0.9rem",
    fontWeight: 500,
    textAlign: "center",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  formSection: {
    marginBottom: theme.spacing(5),
  },
  recieveUpdateCheckBoxLabel: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    color: "#263238",
    fontSize: "0.8rem",
    "& .MuiSvgIcon-root": {
      margin: theme.spacing(0, 0.5),
    },
    "& .whatsAppTxt": {
      color: "#00E676",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  continueBtn: {
    borderRadius: 16,
    border: 0,
    fontSize: "1.125rem",
    padding: theme.spacing(1.5, 4),
    marginBottom: theme.spacing(3.5),
    "&.Mui-disabled": {
      backgroundColor: "#99CAF5",
      color: "#fff",
    },
  },
  inputFormBox: {
    marginBottom: theme.spacing(4),
    "& .MuiFormControl-root": {
      marginBottom: theme.spacing(2.5),
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
  bottomTxtView: {
    color: "#4C5D6C",
    fontSize: "1rem",
    "& a": {
      textDecoration: "none",
      color: "#00437E",
      fontSize: "1.125rem",
      fontWeight: 800,
    },
  },
  customAlert: {
    "& .MuiAlert-message": {
      color: "#fff",
    },
  },
  disableIcon: {
    opacity: "0.3",
  },
  "& .MuiButton-root.Mui-disabled": {
    background: "#4C5D6C",
  },
  footerContainer: {
    position: "fixed",
    left: "50%",
    bottom: "10px", //20px
    color: "#fff",
    transform: "translate(-50%, -20%)",
    [theme.breakpoints.down("sm")]: {
      color: "#5b5757",
    },
  },
  toggleBtnWrapper: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
  langToggleBtn: {
    fontSize: "0.9rem",
    lineHeight: 1,
    [theme.breakpoints.down("sm")]: {
      "&.kyc": {
        color: "#042751",
      },
    },
  },
  langToggleBtnGroup: {
    backgroundColor: "#0038c0",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 8,
      "&.kyc": {
        border: "1px solid rgba(4, 39, 81, 0.2)",
      },
    },
    "& .MuiToggleButton-root": {
      color: "#fff",
      border: "none",
      fontWeight: 500,
      fontSize: "1rem",
      minWidth: 80,
      padding: theme.spacing(1, 0.5),
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.85rem",
        minWidth: 70,
        padding: theme.spacing(0.5),
      },
    },
    "& span.MuiToggleButtonGroup-groupedHorizontal": {
      borderLeft: "1px solid rgba(255, 255, 255, 1)",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      height: "70%",
      marginLeft: 2,
      zIndex: 1,
    },
  },
  // footerContainer: {
  //   position: "fixed",
  //   bottom: theme.spacing(2.5),
  //   padding: theme.spacing(0, 11.5),
  //   display: "flex",
  //   alignItems: "center",
  //   color: "rgba(255, 255, 255, 0.87)",
  //   "& .MuiSvgIcon-root": {
  //     width: "100px",
  //     margin: theme.spacing(0, 1.5),
  //   },
  //   [theme.breakpoints.down("sm")]: {
  //     justifyContent: "center",
  //     width: "100%",
  //     padding: theme.spacing(0),
  //   }
  // }
}));
