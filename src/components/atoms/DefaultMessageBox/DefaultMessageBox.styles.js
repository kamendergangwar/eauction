import { makeStyles } from "@material-ui/core/styles";

export const DefaultMessageBoxStyles = makeStyles((theme) => ({
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
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(0, 14.3),
    "& .footerNote":{
      marginTop: theme.spacing(7.5),

      "& .MuiTypography-h6":{
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
    padding: theme.spacing(6.25, 2.5),
    "& .bannerIcon":{
      width: "100%",
      fontSize: "18.75rem"
    }
  },
  customDivider:{
    display: "flex",
    margin: "40px 0px",
    alignItems: "center",
  },
  
  border:{
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
    width: "510px",
    height: "490px",
    background: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    boxShadow: "0px 8px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: "10px",
    padding: "20px",

    "& .headeTxt":{
      display: "flex",
      color: "#0F2940",
      fontWeight: "600",
      fontSize: "1.25rem",
      lineHeight: "32px",
      alignItems: "center",
      textAlign: "center",
      letterSpacing: "0.02em",
      marginBottom: "5px",
      padding: theme.spacing(3, 8, 1)
    },

    "& .subheading":{
      color: "rgba(76, 93, 108, 0.5)",
      fontSize: "0.75rem",
      lineHeight: "18px",
      alignItems: "center",
      letterSpacing: "0.02em",
      marginBottom: theme.spacing(5.5)
    },
    "& .TrackTxt":{
      fontSize: "1rem",
      color: "#0038C0",
      fontWeight: "bold",
      lineHeight: "24px",
      letterSpacing: "0.04em",
      marginBottom: theme.spacing(8.125)
    },

    "& .footerTxt":{
      color: "#4C5D6C",
      fontSize: "0.75rem",
      fontWeight: "normal",
      lineHeight: "18px",
      letterSpacing: "0.02em",
      padding: theme.spacing(0, 5)
    }
  },


 
  

}));