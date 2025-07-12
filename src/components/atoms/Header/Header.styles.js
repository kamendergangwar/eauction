import { makeStyles } from "@material-ui/core/styles";

export const headerStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#042751",
      "&.kyc": {
        backgroundColor: "transparent",
      },
      "&.loggedIn": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
    "& .MuiToolbar-regular": {
      padding: theme.spacing(0, 11.5),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 2),
      },
    },
  },
  logo: {
    maxWidth: 100,
    maxHeight: 50,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 80,
      maxHeight: 40,
    },
  },
  ribContainer: {
    height: "34px",
    position: "relative",
    background: "linear-gradient(90.02deg, #ED2D41 23.51%, #2F0054 100%)",
    boxShadow: "0px 10px 34px rgba(0, 0, 0, 0.2)",
    color: "white",
    lineHeight: "34px",
    textAlign: "center",

    "&:before, &:after": {
      content: "",
      position: "absolute",
      right: "-10px",
      top: "0",
      height: "50 %",
      width: "40px",
      background: "inherit",
    },

    "&:before": {
      transform: "skewX(-45deg)",
    },

    "&:after": {
      transform: "skewX(45deg)",
      top: "50%",
    },
    "& .marqueeTxt": {
      fontFamily: "Noto Sans",
      fontStyle: "italic",
      fontWeight: "400",
      fontSize: "16px",
    },
  },
  innerRib: {
    position: "absolute",
    height: "42px",
    width: "260px",
    bottom: "0",
    left: "0",
    background: "#ED2D41",
    transformOrigin: "top left",
    boxShadow: "40px 15px 20px rgb(0 0 0 / 15%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontFamily: "Poppins",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: "18px",
    lineHeight: "30px",

    "&::after": {
      content: "''",
      borderWidth: "0px 17.5px 42px 0",
      position: "absolute",
      height: "0",
      width: "0",
      borderStyle: "solid",
      right: "-17px",
      borderColor: "#ED2D41 transparent",
    },

    "& .ribIcon": {
      width: "30px",
      height: "30px",
    },
    "& .hurryImage": {
      width: "109px",
      animation: "$shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) 1s 2",
    },
  },
  '@keyframes shake': {
    '10%, 90%': {
      transform: 'translate3d(-1px, 0, 0)',
    },
    '20%, 80%': {
      transform: 'translate3d(2px, 0, 0)',
    },
    '30%, 50%, 70%': {
      transform: 'translate3d(-4px, 0, 0)',
    },
    '40%, 60%': {
      transform: 'translate3d(4px, 0, 0)',
    },
  },


  hurryRib: {},

  hurryInnerRib: {
    background:
      "linear-gradient(97.59deg, #FFCF00 8.61%, #EA7000 86.04%) !important",
    "&::after": {
      borderColor: "#ea7100 transparent",
    },
  },

  timeContainer: {
    marginLeft: "260px",
    height: "34px",
    "& .MuiSvgIcon-root": {
      height: "30px",
    },
  },

  timerContent: {
    "&>.MuiGrid-root": {
      borderRight: "solid 1px #fff",
      height: "30px",
      margin: "2px 1px",
      lineHeight: "30px",
      "&:last-child, &:first-child": {
        borderRight: "none",
      },
    },
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    "&.loggedIn": {
      flex: "auto",
      width: "100%",
      justifyContent: "flex-end",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-end",
      },
    },
    "&.kyc": {
      flex: "auto",
      justifyContent: "flex-end",
      // justifyContent: "space-between",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-end",
        width: "auto",
      },
    },
  },
  supportButton: {
    textTransform: "capitalize",
    color: "#fff",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(12.5),
  },
  userMenuToggleBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    color: "#fff",
    overflow: "hidden",
    padding: theme.spacing(1, 1.2),
    marginLeft: theme.spacing(3),
  },
  langToggleBtn: {
    [theme.breakpoints.down("sm")]: {
      "&.kyc": {
        color: "#042751",
      },
    },
  },
  langToggleBtnGroup: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
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
      minWidth: 100,
      padding: theme.spacing(1, 0.5),
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.85rem",
        minWidth: 70,
        padding: theme.spacing(0.5),
      },
    },
    "& span.MuiToggleButtonGroup-groupedHorizontal": {
      borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      height: "70%",
      marginLeft: 2,
      zIndex: 1,
    },
  },
  prflMenuDropdown: {
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
      marginRight: theme.spacing(1.1),
      "& .MuiSvgIcon-root": {
        fontSize: "1.1rem",
      },
    },
  },
  //
  mobileMenuIconBtn: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(1),
  },
  drawerListContainer: {
    width: 270,
    "& .MuiList-root": {},
  },
  mobSideMenuHeader: {
    padding: theme.spacing(0, 1.5),
    marginBottom: theme.spacing(3),
  },
  listItemCont: {
    "& .MuiSvgIcon-root": {
      color: "#1D3D62",
    },
    "&.active": {
      backgroundColor: "#EDF2FF",
      color: "#0038C0",
      "& .MuiTypography-body1": {
        fontWeight: 600,
      },
      "& .MuiSvgIcon-root": {
        color: "#0038C0",
      },
    },
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
      marginRight: theme.spacing(1.5),
    },
    '&.nested':{
      paddingLeft: theme.spacing(4)
    }
  },
  sideMenuDivider: {
    margin: theme.spacing(2, 1.5),
  },
  menuSecTitle: {
    color: "rgba(29, 61, 98, 0.3)",
    fontSize: "0.8rem",
    fontWeight: 500,
    padding: theme.spacing(0, 1.5),
    marginBottom: theme.spacing(0.5),
  },
  // ---------------
  helpDeskMenuCont: {
    padding: theme.spacing(2, 0, 4),
    minWidth: 450,
    position: "relative",
  },
  menuTitle: {
    color: "#00437E",
    fontSize: "0.9rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 5,
    zIndex: 1,
  },
  searchBoxContainer: {
    backgroundColor: "rgba(225, 244, 255, 0.4)",
    padding: theme.spacing(2, 4),
  },
  searchQstnImg: {
    maxWidth: 80,
    display: "block",
    marginRight: theme.spacing(2),
  },
  globSearchInputBox: {
    margin: 0,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: 40,
      "& fieldset": {
        borderRadius: 40,
        border: 0,
        boxShadow: "0px 0px 20px rgb(1 81 202 / 10%)",
      },
    },
    "& .MuiInputBase-input": {
      padding: theme.spacing(1.6, 0, 1.6, 3),
    },
    "& .MuiIconButton-root": {
      backgroundColor: "#0151CA",
      padding: 5,
      fontSize: "1rem",
      marginRight: -7,
      "& .MuiIconButton-label": {
        color: "#fff",
      },
    },
  },
  navListSection: {
    padding: theme.spacing(3, 4),
    "&>.MuiBox-root": {
      marginBottom: theme.spacing(2),
      "&:last-child": {
        marginBottom: 0,
      },
    },
    "& .MuiButton-outlined": {
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(1, 81, 202, 0.3)",
      boxShadow: "0px 4px 20px rgb(23 33 61 / 6%)",
      borderRadius: 8,
      color: "#0F2940",
      fontSize: "0.9rem",
      fontWeight: 500,
      width: "100%",
      padding: theme.spacing(1.5, 5),
      justifyContent: "flex-start",
      "& .MuiSvgIcon-root": {
        color: "#fff",
        fontSize: "1.6rem",
        marginRight: theme.spacing(1.5),
      },
    },
  },
  querryNumberView: {
    color: "#65707D",
    fontSize: "0.8rem",
    fontWeight: "normal",
    textAlign: "center",
    "& span": {
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: theme.spacing(1),
    },
    "& a": {
      textDecoration: "none",
      display: "inline-block",
      verticalAlign: "middle",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "0.9rem",
      verticalAlign: "middle",
      marginRight: theme.spacing(0.5),
    },
    "& strong": {
      color: "#00437E",
      display: "inline-block",
      verticalAlign: "middle",
    },
  },
}));
