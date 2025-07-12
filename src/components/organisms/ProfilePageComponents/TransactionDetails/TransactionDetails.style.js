import { makeStyles } from "@material-ui/core/styles";

export const TransactionDetailsStyles = makeStyles((theme) => ({
  profileContainer: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5)
    },
  },

  translationContainer: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 0)
    },
  },

  transDate: {
    color: "#BBBBBB",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",
  },
  tranCard: {
    background: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: "10px",
    margin: theme.spacing(1.5, 0, 3, 0),
  },

  TranIDTxt: {
    color: "#65707D",
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",

    "& .IDValue": {
      color: "#0F2940",
      fontWeight: "600",
      fontSize: "0.875rem",
      lineHeight: "18px",
      letterSpacing: "0.02em",
    },
  },

  accountTxt: {
    color: "#4C5D6C",
    fontWeight: "500",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",

    "& .tranDate": {
      color: "rgba(101, 112, 125, 0.5)",
      fontWeight: "normal",
    },
  },

  cardHeader: {
    padding: theme.spacing(1.5, 2),
    "& .headerleft": {
      display: "flex",
      alignItems: "center",
      "&>.MuiSvgIcon-root": {
        fill: "#65707D",
        fontSize: "20px",
        marginRight: theme.spacing(1.25),
      },
    }
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    "& .transTxt": {
      display: "flex",
      fontWeight: "600",
      fontSize: "0.75rem",
      lineHeight: "18px",
      alignItems: "center",
      letterSpacing: "0.02em",
      marginLeft: theme.spacing(1),

      "& .MuiSvgIcon-root": {
        fill: "#65707D",
        fontSize: "20px",
        marginRight: theme.spacing(1)
      },
    },

    "& .transactionPass": {
      color: "#219653",
    },

    "& .transactionFail": {
      color: "#EB5757",
    },
  },

  cardBody: {
    padding: theme.spacing(2, 2),
    "& .fromTxt": {
      color: "#65707D",
      fontWeight: "normal",
      fontSize: "0.75rem",
      lineHeight: "18px",
      letterSpacing: "0.02em",
    },

    "& .bankLogoDiv": {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(1, 0),

      "& .bankNameTxt": {
        color: "#0F2940",
        fontWeight: "bold",
        fontSize: "1rem",
        lineHeight: "24px",
        letterSpacing: "0.02em",
      },
    },
  },
  schemeBody: {
    borderBottom: "1px solid rgba(76, 93, 108, 0.15)",
    marginBottom: "16px",
    "& .cidcoLogo": {
      width: "130px",
    },
    "& .MuiTypography-subtitle1": {
      fontWeight: "600",
      lineHeight: "30px"
    },
    "& .MuiTypography-subtitle2": {
      fontWeight: "500",
      lineHeight: "30px",
      paddingBottom: "10px"
    }
  },
  bankLogo: {
    width: "30px",
    marginRight: theme.spacing(1),
    fontSize: "0.6rem",
    "&.emdLoad": {
      marginLeft: theme.spacing(1)
    }
  },
  bankDetails: {
    padding: theme.spacing(1),

    "& .infoLabel": {
      color: "#65707D",
      fontWeight: "300",
      fontSize: "0.75rem",
      lineHeight: "24px"
    },

    "& .infoValue": {
      color: "#0F2940",
      fontWeight: "500",
      fontSize: "0.875rem",
    },
  },
  paymentDetails: {
    padding: theme.spacing(1),
  },
  loadAmountTxt: {
    background: "linear-gradient(180deg, rgba(0, 56, 192, 0.1) 0%, rgba(0, 111, 213, 0.1) 100%)",
    borderRadius: 40,
    color: "#003",
    minWidth: 104,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.8rem",
    textAlign: "center",
    letterSpacing: "0.04em",
    padding: theme.spacing(0.5, 1.2)
  },
  loadAmountVal: {
    color: "#4C5D6C",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "0.875rem",
    textAlign: "right",
    lineHeight: "22px",
    letterSpacing: "0.04em",
    margin: theme.spacing(1.25, 0),
    [theme.breakpoints.down("xs")]: {
      textAlign: "left"
    },
  },
  paidAmountTxt: {
    color: "#65707D",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "22px",
  },
  paidAmountVal: {
    color: "#0F2940",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "1.125rem",
    lineHeight: "22px",
    letterSpacing: "0.04em",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left"
    },
  },
  borderDashed: {
    borderRight: "dashed 2px #EEEEEE",
    [theme.breakpoints.down("sm")]: {
      borderRight: "none",
      // borderBottom: "dashed 2px #EEEEEE",
    },
  },
  cardFooter: {
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down("sm")]: {
      padding: "unset",
    },

    "& .downloadIcon": {
      fill: "#65707D",
      fontSize: "20px",
    },

    "& .viewDetailBtn": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "0.875rem",
      lineHeight: "21px",
      letterSpacing: "0.02em",
      color: "#0038C0",
      marginLeft: theme.spacing(1),
      "&.viewBtn": {
        [theme.breakpoints.down("xs")]: {
          marginBottom: theme.spacing(1)
        },
      }
    },
  },

  downloadBtn: {
    color: "#0038C0",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "0.875rem",
    lineHeight: "21px",
    letterSpacing: "0.02em",
  },

  backIcon: {
    fontSize: "1rem"
  },
  primaryColor: {
    color: "#0038C0 !important"
  },
  modelBoxContainer: {
    "& .MuiDialogTitle-root, .MuiDialogContent-root": {
      padding: theme.spacing(0),
    },
    cardFooter: {
      padding: theme.spacing(2, 0),
    },
  },
  modalCloseIconBtn: {
    marginRight: theme.spacing(1)
  },
  paymentDetailsCard: {
    border: "1px solid rgba(76, 93, 108, 0.15)",
    boxSizing: "border-box",
    borderRadius: 5,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {

    },
    "& .secDivider": {
      borderRight: "solid 1px #ddd",
      padding: "33px 0px",
      [theme.breakpoints.down("sm")]: {
        borderRight: "none",
        borderBottom: "solid 1px #ddd",
        paddingTop: 0,
        paddingBottom: theme.spacing(2)
      },
    },
    "& .infoLabel": {
      color: "#65707D",
      fontWeight: "300",
      fontSize: "0.75rem",
      lineHeight: "24px"
    },
    "& .colonTxt": {
      fontSize: "0.75rem",
      alignItems: "center",
      color: "#4C5D6C"
    },
    "& .totalAmoutCon": {
      background: "#FAFAFA",
      border: "2px dashed #E2E2E2",
      boxSizing: "border-box",
      margin: theme.spacing(2, 0, 1.5, 0),
      padding: theme.spacing(1),
      "& .totalLabel": {
        color: "#35485E",
        fontWeight: "600",
        fontSize: "1rem",
        lineHeight: "24px",
        letterSpacing: "0.04em"
      },
      "& .totalValue": {
        color: "#35485E",
        fontWeight: "600",
        fontSize: "1.125rem",
        lineHeight: "20px",
        textTransform: "capitalize"
      }
    },
    "& .paymentValue": {
      color: "#4C5D6C",
      fontWeight: "600",
      fontSize: "0.875rem",
      "&.loanEmd": {
        color: "#FA3D5D",
        textDecoration: "line-through"
      }
    }
  },
  paymentSummary: {
    paddingTop: theme.spacing(2)
  },
  paymentTitle: {
    color: "#4C5D6C",
    fontWeight: "500",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.04em",
    marginBottom: theme.spacing(2)
  },
  paymentInfo: {
    // "& .categoryTag": {
    //   width: "80%",
    //   marginBottom: "10px",
    //   background: "rgba(0, 56, 192, 0.05)",
    //   border: "1px solid rgba(0, 56, 192, 0.15)",
    //   borderRadius: "40px",
    //   textAlign: "center",
    //   fontWeight: "600",
    //   fontSize: "0.875rem",
    //   color: "#1D3D62",
    //   padding: theme.spacing(1, 1.5),
    //   [theme.breakpoints.down("sm")]: {
    //     width: "100%",
    //   },
    // },
    "& .infoValue": {
      color: "#0F2940",
      fontWeight: "500",
      fontSize: "0.875rem",
    },
  },
  categoryTag: {
    width: "80%",
    marginBottom: "10px",
    background: "rgba(0, 56, 192, 0.05)",
    border: "1px solid rgba(0, 56, 192, 0.15)",
    borderRadius: "40px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "0.875rem",
    color: "#1D3D62",
    padding: theme.spacing(1, 1.5),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  notFound: {
    display: "flex",
    justifyContent: "center",
    color: "#888",
    fontSize: "1.5rem"
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
  statusChip1: {
    "& .MuiChip-outlined": {
      border: "2px solid rgb(33, 150, 83)",
    },
    "& .MuiChip-icon": {
      color: "rgb(33, 150, 83)",
    },
    "& .MuiChip-root": {
      color: "rgb(33, 150, 83)",
    },
    "& .MuiChip-label": {
      fontWeight: 600
    }
  },
  statusChip2: {
    "& .MuiChip-outlined": {
      border: "2px solid #f44336",
    },
    "& .MuiChip-icon": {
      color: "#f44336",
    },
    "& .MuiChip-root": {
      color: "#f44336",
    },
    "& .MuiChip-label": {
      fontWeight: 600
    }
  },
  statusChip3: {
    "& .MuiChip-outlined": {
      border: "2px solid #F27807",
    },
    "& .MuiChip-icon": {
      color: "#F27807",
    },
    "& .MuiChip-root": {
      color: "#F27807",
    },
    "& .MuiChip-label": {
      fontWeight: 600
    }
  },
  statusChip0: {
    "& .MuiChip-outlined": {
      border: "2px solid #0038C0",
    },
    "& .MuiChip-icon": {
      color: "#0038C0",
    },
    "& .MuiChip-root": {
      color: "#0038C0",
    },
    "& .MuiChip-label": {
      fontWeight: 600
    }
  },
  footerText: {
    fontSize: 14,
    fontWeight: 600,
    "& span": {
      fontWeight: 500
    }
  }
}));
