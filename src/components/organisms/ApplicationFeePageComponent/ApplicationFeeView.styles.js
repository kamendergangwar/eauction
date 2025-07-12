import { makeStyles } from "@material-ui/core/styles";
import { orange, purple } from "@material-ui/core/colors";

export const ApplicationFeeStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%"
  },
  container: {
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      overflowX: "hidden"
    },
  },
  formSection: {
    margin: "20px auto",
    padding: theme.spacing(0, 12.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2),
    },
    "&.banksec": {
      maxWidth: 500,
      margin: "0 auto",
      padding: 0
    }
  },
  /* EMDSection: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  EMDHeader: {
    padding: theme.spacing(5, 7.5, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    },
  }, */
  EMDBenefitInfo: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      marginBottom: theme.spacing(3),
    },
    "& .label": {
      color: "#0038C0",
      fontSize: "0.8rem",
      fontWeight: "bold"
    },
    "& .EMDIcon": {
      fontSize: "1.25rem",
      marginLeft: theme.spacing(1),
    }
  },
  /* EMDDesc: {
    fontSize: "0.875rem",
    lineHeight: "22px",
    color: "#65707D",
    margin: theme.spacing(2, 6, 5, 4.5),
  }, */
  applyEmdTxt: {
    color: "#00437E",
    fontSize: "1.1rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(0.5)
    },
  },
  /* emdMoreTxt: {
    display: "inline-flex",
    alignItems: "center",
    fontWeight: "bold",
    paddingLeft: "15px",
    background: "-webkit-linear-gradient(#0038C0, #006FD5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }, */
  yesOrNoRadioGroup: {
    justifyContent: "space-evenly"
  },
  yesOrNoCheckBox: {
    fontSize: "0",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgb(23 33 61 / 6%)",
    borderRadius: 8,
    padding: theme.spacing(0.5, 0.5),
    margin: 0,
    "& .MuiIconButton-root": {
      padding: 0,
      marginRight: theme.spacing(1)
    },
    "&.active": {
      backgroundColor: "#E1F4FF",
      border: "1px solid #0038C0",
      "& .MuiTypography-body1": {
        color: "#0038C0"
      }
    }
  },
  paymentSummSec: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    borderRadius: 5,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
    }
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
      fontWeight: "bold"
    }
  },
  amountSubLabel: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem"
  },
  amountListBox: {
    borderBottom: "1px solid rgba(231, 231, 231, 0.8)",
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      border: 0,
      marginBottom: 0,
      paddingBottom: 0
    }
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
      fontWeight: 800
    },
    "&.cancel": {
      color: "#FA3D5D",
      textDecoration: "line-through"
    }
  },
  radioGroupCont: {
    display: "block"
  },
  selectBox: {
    margin: theme.spacing(0, 0, 2, 0),
    width: "100%",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    border: "1px solid #fff",
    borderRadius: 5,
    // eslint-disable-next-line no-dupe-keys
    width: "100%",
    "&.active": {
      backgroundColor: "#E1F4FF",
      borderColor: "#00437E"
    }
  },
  checkBoxCardTitle: {
    margin: 0,
    padding: theme.spacing(1.5, 2),
    width: "100%",
    alignItems: "start",
    "& .MuiIconButton-root": {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      padding: 0,
    },
    "& .MuiFormControlLabel-label": {
      paddingTop: theme.spacing(1.5)
    }
  },
  checkBoxTitleLabel: {
    color: "#0F2940",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5)
  },
  paymentMethodsIconBox: {
    padding: theme.spacing(0, 1, 1, 0),
    "& img": {
      maxWidth: 45
    }
  },
  eChallanTxtIcon: {
    color: "#00437E",
    fontSize: "0.8rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1.5),
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
      marginRight: theme.spacing(1)
    }
  },
  checkBoxNoteText: {
    color: "rgba(15, 41, 64, 0.8)",
    fontSize: "0.7rem",
  },
  checkBoxFullAmountView: {
    color: "#0038C0",
    fontSize: "1.25rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  appliedTextBox: {
    backgroundColor: "rgba(225, 244, 255, 0.5)",
    borderRadius: 8,
    border: "4px dashed #739cff",
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(1),
    fontSize: "0.8rem",
    color: "#0038C0",
    padding: theme.spacing(1, 1.5),
    "& .MuiSvgIcon-root": {
      fill: "none",
      marginRight: theme.spacing(0.5),
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1, 0, 0, 0),
    },
  },
  emdAmountList: {
    padding: theme.spacing(0, 4),
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      margin: theme.spacing(1, 0),
    },
    "& .totalAmtLabel": {
      color: "#9095B0",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: "22px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(0),
        fontSize: "0.75rem",
      },
    },
    "& .AmtValue": {
      color: "#0F2940",
      fontWeight: "bold",
      fontSize: "0.875rem",
      lineHeight: "22px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(1),
      },
    },
    "& .totalAmtView": {
      color: "#65707D",
      fontWeight: 600,
      fontSize: "0.9rem"
    },
    "& .textWarning": {
      fontWeight: "bold",
      fontSize: "0.875rem",
      lineHeight: "22px",
      letterSpacing: "0.02em",
      color: "#EB5757"
    },
    "&.loanEmd": {
      backgroundColor: "#F5FAFD",
      "& .totalAmtLabel": {
        color: "#0038C0",
        [theme.breakpoints.down("sm")]: {
          marginBottom: 0,
        },
      },
      "& .totalAmtView": {
        color: "#0038C0",
        fontWeight: "bold"
      }
    },
    "& .forApplctnTxt": {
      color: "#9095B0",
      fontSize: "0.8rem"
    }
  },
  listFooter: {
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 0),
    },
    "& .totalAmtLabel": {
      fontWeight: "bold",
      fontSize: "0.875rem",
      color: "#0F2940"
    },
    "& .grandTotal": {
      fontWeight: "bold",
      fontSize: "1.5rem",
      color: "#0038C0",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.125rem",
      },
    }
  },
  noteText: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
    "& span": {
      color: "#FA3D5D"
    }
  },
  paymentTypeBoxView: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    border: "1px solid rgba(0, 56, 192, 0.15)",
    borderRadius: 5,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 1.5),
    },
  },
  /* transactionSection: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    borderRadius: 5,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      boxShadow: "none"
    }
  }, */
  loanAppliedSuccess: {
    background: "rgba(33, 150, 83, 0.12)",
    border: "2px dashed rgba(33, 150, 83, 0.8)",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    color: "#219653",
    [theme.breakpoints.down("sm")]: {

    },
    "& .MuiSvgIcon-root": {
      fill: "none",
      fontSize: "1.1rem",
      marginRight: theme.spacing(1),
    }
  },
  tranSecTitle: {
    color: "#00437E",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1.5),
    }
  },
  // Select Bank
  selectBankCont: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    borderRadius: 5,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      boxShadow: "none"
    },
  },
  selectBankBox: {
    border: "1px solid #fff",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06)",
    borderRadius: 8,
    padding: theme.spacing(1.5, 2),
    margin: theme.spacing(0, 0, 1.3, 0),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      alignItems: "self-start"
    },
    "&:last-child": {
      marginBottom: theme.spacing(3)
    },
    "& .MuiRadio-root": {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
    "& .MuiFormControlLabel-label": {
      width: "100%",
      paddingBottom: theme.spacing(5)
    },
    "&.active": {
      backgroundColor: "#E1F4FF",
      borderColor: "#0138C0",
    }
  },
  bankNameNdIcon: {
    display: "flex",
    alignItems: "center",
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginBottom: theme.spacing(1),
    "& img": {
      display: "inline-block",
      maxWidth: 25,
      marginRight: theme.spacing(2)
    }
  },
  proccFeeSec: {
    "& .pressFeeText": {
      color: "#65707D",
      fontWeight: 500,
      fontSize: "0.7rem"
    },
    "& .amountView": {
      color: "#0F2940",
      fontWeight: "bold",
      fontSize: "0.8rem",
    },
  },
  noRefundableTxt: {
    backgroundColor: "#E7EAEC",
    borderRadius: "8px 0",
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "0.7rem",
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: theme.spacing(1),
    "&.active": {
      background: "rgba(1, 81, 202, 0.2)",
      color: "#0151CA"
    }
  },
  // 
  progressView: {
    color: "#007AE7",
    fontSize: "0.9rem",
    marginRight: theme.spacing(3)
  },
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  filterInputCtrl: {
    position: "relative",
    marginBottom: "20px",
    "& .inputRounded": {
      "& .MuiInputBase-root": {
        background: "#FFFFFF",
        boxShadow: "0px 4px 20px rgb(1 81 202 / 10%)",
        borderRadius: "40px",
        width: "100%",
        "& .MuiInputBase-input": {
          paddingLeft: theme.spacing(3)
        }
      },
      "& .MuiOutlinedInput-root fieldset": {
        border: "none",
        borderRadius: 0
      },
      "& .MuiIconButton-root": {
        backgroundColor: "#0151CA",
        "& .MuiSvgIcon-root": {
          fill: "none"
        }
      }
    }
  },
  searchIconBtn: {
    position: "absolute",
    top: "50%",
    right: "10px",
    marginTop: "-20px",
    width: "40px",
    height: "40px",
    letterSpacing: "0.02em",
    background: "#0038C0",
    "&:hover": {
      backgroundColor: "#0038C0",
    },
  },
  emdMoreTxt: {
    display: "inline-flex",
    alignItems: "center",
    fontWeight: "bold",
    paddingLeft: "15px",
    background: "-webkit-linear-gradient(#0038C0, #006FD5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  checkboxSection: {
    padding: theme.spacing(0, 12.5),
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2)
    }
  },
  noteTxtSection:{
    padding: theme.spacing(0, 12.5),
    // margin: theme.spacing(1, 0),
    fontWeight:"700",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2)
    },
    "& span": {
      fontSize: "18px",
      fontWeight:"700"
    }
  },
  paymentTxt: {
    paddingRight: theme.spacing(2.5),
    color: "rgba(253, 0, 13, 1)",
  },
  payemtnDtlsFormSection: {
    padding: theme.spacing(0, 8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
  },
  paymentDtlsContainer: {
    padding: theme.spacing(2, 0),
    /* "&>.MuiGrid-item:fisrt-child": {
      position: "relative",
      "&:after": {
        content: "''",
        position: "absolute"
      }
    } */
  },
  /* EMDBenefit: {
    padding: theme.spacing(2.5, 7.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2)
    }
  }, */

  dialogBox: {
    Width: "834px",
  },
  dialogTitle: {
    padding: theme.spacing(2, 5),
    color: "#00437E",
    fontWeight: "600",
    fontSize: "1.125rem",
    lineHeight: "27px",
    letterSpacing: "0.02em",
  },
  dialogBoxContent: {
    color: "#495471",
    fontWeight: "500",
    fontSize: "0.875rem",
    letterSpacing: "0.02em",
    lineHeight: "22px",
  },
}));
