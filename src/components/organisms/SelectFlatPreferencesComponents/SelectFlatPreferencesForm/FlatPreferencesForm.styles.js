import { makeStyles } from "@material-ui/core/styles";

export const FlatPreferencesFormStyles = makeStyles((theme) => ({
  formSection: {
    height: "100%",
    overflow: "auto",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
    },
  },
  checkboxSection: {
    backgroundColor: "#F5FAFD",
    padding: theme.spacing(1, 20),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2),
    },
  },
  pageTitle: {
    color: "#0F2940",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em"
  },
  bannerIcon: {
    width: "339px",
    height: "170px",
    margin: "20px"
  },
  wrapIcon: {
    alignItems: "center",
    display: "flex",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "28px",
    color: "#0F2940"
  },
  benefitsSection: {
    padding: theme.spacing(5, 20),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  orderList: {
    color: "#65707D",
    margin: theme.spacing(2, 0, 0, 0),
    paddingLeft: theme.spacing(2),
    lineHeight: "26px",
    fontSize: "0.9rem",
  },
  actionSection: {
    width: "70%",
    margin: "40px auto",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06)",
    borderRadius: "8px",
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    "& .contentIcon": {
      width: "32px",
      height: "32px",
      marginRight: "10px"
    }
  },
  contentWapper: {

  },
  contentTitle: {
    color: "#263238",
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "18px",
    letterSpacing: "0.02em",
    marginLeft: "44px",
    marginBottom: "12px"
  },

  radioBtnsGroup: {
    // marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
    "& .MuiFormControlLabel-root": {
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(1, 81, 202, 0.08)",
      boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
      borderRadius: 40,
      display: "flex",
      // width: "100%",
      margin: theme.spacing(1),
      padding: theme.spacing(0, 2, 0, 0.5),
      // "& .MuiIconButton-root": {
      //   marginRight: theme.spacing(2),
      // },
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
      "&.congratsSec": {
        padding: theme.spacing(3, 4),
        alignItems: "start",
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(2, 1.5),
        },
        "& .MuiIconButton-root": {
          marginTop: theme.spacing(-1),
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0.5),
            marginRight: theme.spacing(1),
            marginTop: "-5px"
          },
        },
      },
      "&.active": {
        backgroundColor: "#E1F4FF",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderColor: "#0038C0",
        "& .MuiFormControlLabel-label": {
          color: "#0038C0",
          fontWeight: "bold"
        },
      }
    }
  },

  footerSection: {
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.1)",
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },


}));
