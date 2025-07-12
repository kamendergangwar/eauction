import { makeStyles } from "@material-ui/core/styles";

export const personalDetailsFormStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%"
  },
 
  formSection: {
    height: "100%",
    overflow: "auto",
  },
  root: {
    height: '100%',
   
 
    
  },
  rootm: {
    height: '100%',

    
  },
  fixedContainer: {
    position: 'fixed',
    
    height: '100%',
  
    
    zIndex: theme.zIndex.appBar + 1, 
  },
  inputsSection: {
    padding: theme.spacing(5, 3, 0.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    },
  },
  recieveUpdateCheckBoxLabel: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  checkboxSection: {
    padding: theme.spacing(1, 2),
    // marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2)
    },
    "& .active": {
      backgroundColor: "#F5FAFD",
    }
  },
  errorTxt: {
    color: "rgb(244, 67, 54)",
    textAlign: "center",
    fontSize: "0.75rem",
    paddingTop: "10px"
  },
  currentAddressContainer: {
    minHeight: "100px",
    background: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06)",
    borderRadius: "8px",

    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },

    "& .header": {
      padding: "10px 20px",
    },
    "& .body": {
      padding: "5px 20px 10px",
      fontFamily: "Noto Sans",
      fontWeight: "400",
      fontSize: "0.875rem",
      lineHeight: "20px",
      color: "#65707D"
    },

    "& .leftSide": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "700",
      fontSize: "0.8rem",
      lineHeight: "22px",
      color: "#0F2940"
    },

    "& .rightSide": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      "& .MuiButton-root": {
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#0151CA",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "0.9rem",
      }
    }
  },
  postalAddYesOrNoTxt: {
    color: "#0F2940",
    fontSize: "0.9rem",
    // padding: theme.spacing(0, 1.5),
    // [theme.breakpoints.down("sm")]: {
    //   marginBottom: theme.spacing(3)
    // },
  },
  postalAddSub: {
    fontSize: "0.75rem",
    color: "#0F2940",
    fontWeight: "700",
    // [theme.breakpoints.down("sm")]: {
    //   marginBottom: theme.spacing(3)
    // },
  },
  yesOrNoRadioGroup: {
    justifyContent: "space-evenly"
  },
  yesOrNoCheckBox: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgb(23 33 61 / 6%)",
    borderRadius: 8,
    padding: theme.spacing(2, 3),
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
  imagelarge: {
    width: "82px",
    height: "81px",
    "& + .MuiBadge-badge": {
      right: "0",
      bottom: "0",
    }
  },
  actionSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  progressView: {
    color: "#007AE7",
    fontSize: "0.9rem",
    marginRight: theme.spacing(3)
  },
  /* line: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }, */
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  nextButton: {
    marginTop: theme.spacing(2),
  },
  whatsAppIcon: {
    margin: theme.spacing(0, 1)
  },
  whatsAppTxt: {
    color: "#00E676",
    fontSize: "0.8rem"
  },
  // imageContainer: {
  //   backgroundColor: "pink",
  // },
  imageStyle: {
    height: 165,
    width: 140,
    borderRadius: 5,
  },
  input: {
    display: "none",
  },
  box: {
    // height: 100,
    display: "flex",
    padding: 8,
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
    // padding: theme.spacing(1),
  },
  nameBox: {
    padding: 6,
    border: "1px solid #d4d4d4",
    borderRadius: 8
  }
}));
