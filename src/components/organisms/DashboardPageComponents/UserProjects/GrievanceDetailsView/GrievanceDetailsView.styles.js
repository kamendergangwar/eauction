import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

export const GrievanceDetailsViewStyles = makeStyles((theme) => ({
  root: {
    display: "block"
  },
  errorMsgView: {
    margin: "26px 0",
    "& p": {
      fontFamily: "Noto Sans",
      fontWeight: 500,
      fontSize: "0.8rem",
      color: "#0F2940"
    }
  },
  grevianceContainer: {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(5, 14.3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3.75, 2),
    },
    "& .MuiGrid-container": {
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      }
    },
    "& .footerNote": {
      marginTop: theme.spacing(7.5),
      marginBottom: theme.spacing(7.5),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(17.5),
        marginBottom: theme.spacing(0),
      },

      "& .MuiTypography-h6": {
        fontSize: "0.875rem",
        color: "#4C5D6C",
        fontWeight: "300",
        fontStyle: "normal",
        lineHeight: "24px",
        letterSpacing: "0.02em"
      }
    }
  },
  grievanceLeftSection: {
    width: "100%",
    // padding: theme.spacing(6.25, 0),
    "& .bannerIcon": {
      width: "100%",
      fontSize: "18.75rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "7.5rem",
        margin: theme.spacing(4.375, 0),
      },
    },
    "& .bannerIconSmall": {
      fontSize: "5.75rem"
    },
    "& .stepsInfoContainer": {

      "& .stepContent": {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2, 0),
        flexFlow: "nowrap",
        alignItems: "center",
        textAlign: "left",

        "& .stepCount": {
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(0, 56, 192, 0.08)",
          fontSize: "12px",
          color: "#00437E",
          textAlign: "center",
          lineHeight: "26px",
          fontWeight: "bold",
          letterSpacing: "0.02em",
          flex: "0 0 auto",
          // width: "10%",
          marginRight: "10px"
          // marginRight: theme.spacing(1.25),
        },

        "& .setpTxt": {
          color: "#4C5D6C",
          fontSize: "0.75rem",
          fontWeight: "500",
          lineHeight: "18px",
          letterSpacing: "0.02em"
        }


      }
    }
  },

  secHeader: {
    color: "#00437E",
    fontSeight: "600",
    fontSize: "1.125rem",
    lineHeight: "27px",
    letterSpacing: "0.02em",
    marginBottom: theme.spacing(2.5),
  },

  customDivider: {
    display: "flex",
    margin: "30px 0px",
    alignItems: "center",
  },

  border: {
    borderBottom: "1px solid #EEEEEE",
    width: "100%",
  },

  content: {
    padding: theme.spacing(0, 1.25, 0, 1.25),
    color: "#4C5D6C",
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "30px",
    letterSpacing: "0.04em",
  },
  grievanceRightSection: {

    display: "flex",
    justifyContent: "center",
    // [theme.breakpoints.down("sm")]: {
    //   display: "block",
    // },

    trackGriBtn: {
      margin: theme.spacing(8, 1.25)
    },

    "& .footerTxt": {
      color: "#4C5D6C",
      fontSize: "0.75rem",
      fontWeight: "normal",
      lineHeight: "18px",
      letterSpacing: "0.02em",
      padding: theme.spacing(0, 5),
      marginTop: theme.spacing(1.2),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 3),
      },

    }
  },

  grievanceFormCont: {
    width: "510px",
    // height: "490px",
    background: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    boxShadow: "0px 8px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: "10px",
    padding: theme.spacing(3.75, 7.5),

    [theme.breakpoints.down("sm")]: {
      // width: "auto",
      width: "90%",
      height: "auto",
      border: "none",
      boxShadow: "none",
      padding: theme.spacing(0),
    },

    "& .MuiSelect-outlined": {
      textAlign: "left"
    },

    "& .passIcon": {
      fontSize: "6.25rem"
    },
    "& .subTitle": {
      fontSize: "0.875rem",
      fontWeight: "normal",
      color: "#9095B0",
      lineHeight: "18px",
      textAlign: "center",
      letterSpacing: "0.02em",
      margin: theme.spacing(3.75, 0)
    },
    "& form": {
      position: "relative",
      height: "100%"
    },
    grievanceFormCont: {
      padding: theme.spacing(1, 1.25, 0)
    },
    "& .MuiFormControl-fullWidth": {
      background: "#F7F7F7",
      margin: "6px 0px 20px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%"
      },
    }
  },

  secTitle: {
    color: "#00437E",
    fontSize: "1.5rem",
    fontWeight: "600",
    lineHeight: "38px",
    letterSpacing: "0.02em",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.125rem",
      color: "#0F2940",
      lineHeight: "27px",
    },
  },
  formLabel: {
    margin: "0",
    fontWeight: "500",
    fontSize: "0.875rem",
    lineHeight: "19px",
    color: "#0F2940",
    textAlign: "left"
  },
  thankuTitle: {
    color: "#00437E",
    fontWeight: "600",
    fontSize: "1.125rem",
    lineHeight: "38px",
    letterSpacing: "0.02em",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      lineHeight: "26px"
    },
  },

  TrackTxt: {
    fontSize: "1rem",
    color: "#0038C0",
    fontWeight: "bold",
    lineHeight: "24px",
    letterSpacing: "0.04em",
    marginBottom: theme.spacing(1.2)
  },

  headeTxt: {
    display: "flex",
    color: "#0F2940",
    fontWeight: "600",
    fontSize: "1.25rem",
    lineHeight: "32px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "0.02em",
    marginBottom: "5px",
    padding: theme.spacing(3, 3.75, 1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.4, 0),
    },
  },
  grievanceClosedheaderTxt: {
    display: "flex",
    color: "#0F2940",
    fontWeight: "600",
    fontSize: "1.25rem",
    lineHeight: "35px",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "20px",
    padding: theme.spacing(3, 3.75, 1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.4, 0),
    },
  },

  subheading: {
    color: "rgba(76, 93, 108, 0.5)",
    fontSize: "0.75rem",
    lineHeight: "18px",
    alignItems: "center",
    letterSpacing: "0.02em",
    marginBottom: theme.spacing(5.5),

    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(0),
    },
  },


  formFooter: {
    width: "100%",
    bottom: theme.spacing(5.5),
    [theme.breakpoints.down("sm")]: {
      bottom: theme.spacing(0),
    },
    "& .arrowLeft": {
      fontSize: "1rem",
    },
    "& .NextArrowIcon1": {
      fontSize: "2rem",
    }
  },


  fileUploadSection: {
    padding: theme.spacing(2, 0, 0, 0)
  },

  kycDragnDropBox: {
    height: "70px",
    display: "block",
    border: "2px dashed #00437E",
    borderRadius: "4px",
    backgroundColor: "#EDF2FF",
    fontSize: "1rem",
    lineHeight: "24px",
    textAlign: "center",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.25),
      justifyContent: "center"
    },
    "&.dragover": {
      borderColor: "#ff5722",
      backgroundColor: "#fff6f4"
    },
    "& .MuiFormHelperText-root": {
      textAlign: "center",
      margin: theme.spacing(0, 0, 1, 0)
    },

    "& .fileIploadDes": {
      display: "flex",
      alignItems: "center",
      color: "#0038C0",
      fontWeight: "bold",

      "& .placeHolderTxt": {
        color: "#4C5D6C",
        paddingLeft: theme.spacing(1)
      },


    }
  },
  kycUploadBtn: {
    padding: "10px 8px"
  },


  fileDetailSection: {
    height: "70px",
    display: "block",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
    backgroundColor: "#ffffff",
    fontSize: "1rem",
    lineHeight: "24px",
    textAlign: "center",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  fileNameTxt: {
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: "25px",
    color: "#0F2940"
  },
  ErrorMessageTxt: {
    color: "#f44336"
  },
  // Details view css

  detailsSecContainer: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.05)",
    borderRadius: "8px",
    overflow: "hidden",
    "& .MuiTypography-h6": {
      fontSize: "1.5rem",
      color: "#0F2940",
      fontWeight: "600",
      lineHeight: "36px",
      lineHeight: 1,
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.only("xs")]: {
      boxShadow: "none",
    },

    "& .MuiTypography-subtitle2": {
      fontSize: "1rem",
      color: "#0F2940",
      fontWeight: "600",
      lineHeight: "22px"
    },
  },
  detailsSection: {
    position: "relative",
    padding: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 2),
    },
    "& .leftbox": {
      flex: "0 0 50%"
    },
    "& .rightbox": {
      flex: "0 0 50%",
      textAlign: "right"
    }
  },
  multiFormContent: {
    display: "flex",
    justifyContent: "space-between",
    "& .MuiBox-root": {
      flex: "0 0 50%"
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 0),
    },
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
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    textAlign: "center",
    "&.inProgress": {
      background: "rgba(242, 120, 7, 0.1)",
      borderColor: "#F27807",
      color: "#F27807",
    },
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },

  successTag: {
    display: "inline-block",
    minWidth: "130px",
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    textAlign: "center",
    border: "1px solid rgba(33, 150, 83, 0.1)",
    fontSize: "0.875rem",
    textAlign: "center",
    borderRadius: "40px",
    fontWeight: "600",
    lineHeight: "28px",
    letterSpacing: "0.02em",
    background: "rgba(33, 150, 83, 0.05)",
    color: "#219653"
  },

  warningTag: {
    display: "inline-block",
    minWidth: "130px",
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    textAlign: "center",
    border: "1px solid rgba(33, 150, 83, 0.1)",
    fontSize: "0.875rem",
    textAlign: "center",
    borderRadius: "40px",
    fontWeight: "600",
    lineHeight: "28px",
    letterSpacing: "0.02em",
    background: " rgba(242, 120, 7, 0.05)",
    color: "#F27807"
  },

  closedTag: {
    display: "inline-block",
    minWidth: "130px",
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    textAlign: "center",
    border: "1px solid rgba(33, 150, 83, 0.1)",
    fontSize: "0.875rem",
    textAlign: "center",
    borderRadius: "40px",
    fontWeight: "600",
    lineHeight: "28px",
    letterSpacing: "0.02em",
    background: "rgb(0 0 0 / 5%)",
    color: "#0f0f0f"
  },

  infosLabel: {
    fontFamily: "Noto Sans",
    fontWeight: "normal",
    fontSize: "0.875rem",
    color: "rgba(76, 93, 108, 0.7)",
    marginBottom: 5
  },
  infosText: {
    fontFamily: "Noto Sans",
    fontWeight: "600",
    fontSize: "1rem",
    color: "#0F2940",
    letterSpacing: "0.04em"
  },
  trxScrnShotFileName: {
    border: "1px solid #C1C1C1",
    borderRadius: 8,
    fontFamily: "Noto Sans",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#000000",
    letterSpacing: "0.04em",
    lineHeight: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 12px",
    "& span": {
      flex: "auto",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .MuiButton-root": {
      flex: "0 0 auto",
      fontSize: "0.875rem",
      color: "#007AE7",
      fontWeight: "bold",
      lineHeight: "32px",
      letterSpacing: "0.04em"
    },
  },
  attachmentIframe: {
    width: "550px",
    height: "450px",
    [theme.breakpoints.only("xs")]: {
      width: "250px",
    },
  },
  commentsSec: {
    backgroundColor: "#F9F9F9",
    boxShadow: "0px 10px 20px rgb(0 56 192 / 10%)",
    border: "1px solid #F3F3F3",
    borderRadius: "10px",
    padding: theme.spacing(2),
    height: "100%",
    position: "relative",
    "&>.MuiIconButton-root": {
      position: "absolute",
      right: 0,
      top: 0,
    },
  },
  commentInputBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 0,
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px",
    },
  },
  chatViewSection: {
    backgroundColor: "#FFFFFF",
    boxShadow: "inset 0px 0px 4px rgba(0, 0, 0, 0.12)",
    borderRadius: 8,
    padding: theme.spacing(1.2, 1.5),
    overflowY: "auto",
    height: "406px",
    maxHeight: "500px",
    border: "1px solid rgba(218, 220, 221, 0.5)",
    boxShadow: "inset 0px 0px 4px rgb(0 0 0 / 12%)"
  },
  chatMainCardView: {
    marginBottom: theme.spacing(4),
    "&.rightBox": {
      textAlign: "right",
    },
    "&.rightBoxImg": {
      textAlign: "right",
    },
    "&:last-child": {
      marginBottom: 0,
    },
  },
  userProfileIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: orange[500],
    color: "#fff",
    marginRight: theme.spacing(1),
    "&.rightBox": {
      backgroundColor: "#0F2940",
      marginRight: 0,
      marginLeft: theme.spacing(1),
    },
    "&.rightBoxImg": {
      backgroundColor: "#0F2940",
      marginRight: 0,
      marginLeft: theme.spacing(1),
    },
  },
  applicantName: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#0F2940",
  },
  chatDateNdTime: {
    fontSize: "0.6rem",
    color: "#4C5D6C",
  },
  msgBox: {
    marginTop: theme.spacing(1),

    "& p": {
      backgroundColor: "#FFECDB",
      borderRadius: 8,
      color: "#0F2940",
      display: "inline-block",
      padding: "4px 10px",
      fontFamily: "Noto Sans",
      fontSize: "0.875rem",
      letterSpacing: "0.02em",
      textAlign: "left",
    },
    "&.rightBox p": {
      backgroundColor: "#DED1F3",
      textAlign: "right",
    },
  },

  resolvedBtn: {
    backgroundColor: "#fff",
    borderColor: "#32BA7C",
    color: "#32BA7C",
  },
  input: { display: "none" },
  previewImg: {

  }
}));
