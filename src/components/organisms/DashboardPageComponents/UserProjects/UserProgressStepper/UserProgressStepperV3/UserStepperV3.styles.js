import { makeStyles } from "@material-ui/core/styles";

export const StepperV3Styles = makeStyles((theme) => ({
  root: {},
  stepper: {
    display: "flex",
    margin: "0 10px",
    padding: 0,
    width: "60rem",
    listStyle: "none",
    position: "relative",

    "&::before": {
      position: "absolute",
      top: 0,
      left: 0,
      height: "10%",
      content: '""',
      width: "calc(100% - 20px)",
      //   background: '#e7e7e7',
    },
  },
  stepItem: {
    zIndex: 1,
    fontFamily: "Poppins",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 1 0%",
    minWidth: "108px",
    padding: "5px 20px 5px 30px",
    borderTop: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey",
    color: "white",
    textAlign: "center",
    fontWeight: 600,
    // background:"repeating-linear-gradient(-65deg, #fff, #fff 20px, #fcfcfc 20px, #fcfcfc 40px)",
    background: "lightgrey",
    margin: "0 0 0 -16px",
    clipPath:
      "polygon(20px 50%, 0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)",
    "&.current": {
      animation: "$pulse 1.5s infinite ease-in-out",
      background: "linear-gradient(98deg, #ffa502 0%, #fa8231 97.25%)",
      boxShadow:
        "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);",
      fontWeight: "bold",
      color: "white",
      borderTop: "1px solid white",
      borderBottom: "1px solid white",
      "&:hover": {
        background: "#0038C0",
        color: "white",
        boxShadow: "0 0.4rem 1.2rem 0 rgba(8, 114, 244, 0.6)",
        // transition: "transform 150ms",
        // transform: "scale(1.03)",
      },
    },
    // "&:nth-child(n+13):nth-child(-n+14)": {
    //   minWidth: 153
    // },
    "&.complete": {
      background: "rgba(208, 234, 189, 1)",
      color: "black",
      borderTop: "1px solid white",
      borderBottom: "1px solid white",
      "&:nth-child(n+4):nth-child(-n+6)": {
        background: "#BDEAE2",
      },
      "&:nth-child(n+7):nth-child(-n+9)": {
        background: "#bebce6",
      },
      "&:nth-child(n+10):nth-child(-n+12)": {
        background: "#F8CBCB",
      },
      "&:nth-child(n+13):nth-child(-n+14)": {
        background: "#B2C3F0",
      },
      "&:hover": {
        // background: "#719b5d",
      },
    },
    // '&:first-child': {
    //   padding: '20px',
    //   clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)',
    // },
    // '&:last-child': {
    //   clipPath: 'polygon(20px 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    // },
  },
  stepItemSpan: {
    position: "absolute",
    background: "linear-gradient(98deg, #ffa502 0%, #fa8231 97.25%)",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    clipPath:
    "polygon(12px 50%, -6% -1%, calc(100% - 22px) 0%, 100% 50%, calc(100% - 22px) 100%, -6% 100%)",
  },
  arrowBg: {
    filter:
      "drop-shadow(0.5px 0px 0px black) " +
      "drop-shadow(-0.5px 0px 0px black) " +
      "drop-shadow(0px 0.5px 0px black) " +
      "drop-shadow(0px -0.5px 0px black) " +
      "drop-shadow(0.5px 0.5px 0px black) " +
      "drop-shadow(-0.5px -0.5px 0px black) " +
      "drop-shadow(-0.5px 0.5px 0px black) " +
      "drop-shadow(0.5px -0.5px 0px black)",
  },
  CardContent: {
    overflowX: "auto",
    padding: "10px",
  },
  lowerStepCon: {
    padding: "7px",
    display: "flex",
    minWidth: "264px",
    border: "2px solid lightgrey",
    borderTop: 0,
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    // padding: "10px 30px 10px 30px",
    width: "60rem",
    listStyle: "none",
    position: "relative",
    marginRight: "12px",
    // background:
    //   "repeating-linear-gradient(-65deg, #fff, #fff 20px, #fcfcfc 20px, #fcfcfc 40px)",

    "&.current": {
      // background: "#EDF2FF",
      // fontWeight: "bold",
      // borderTop: 0,
      // border: "2px solid #0038C0",
      // boxShadow:
      //   "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
    "&.complete": {
      border: "2px solid #039824",
      borderTop: 0,
      background: "rgba(33, 150, 83, 0.1)",
      "&:hover": {
        //   background: "#719b5d",
        //   color: "white",
      },
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(7, 42, 200, 0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg, #bebce6 0%, #bebce6 100%)",
    },
  },
  UpperStepCon: {
    marginTop: "12px",
    fontFamily: "Poppins",
    minWidth: "264px",
    border: "2px solid lightgrey",
    borderBottom: 0,
    borderRadius: "8px 8px 0 0",
    display: "flex",
    justifyContent: "center",
    fontWeight: "600",
    padding: "20px 30px 15px 30px",
    width: "60rem",
    listStyle: "none",
    position: "relative",
    marginRight: "12px",
    // background:
    //   "repeating-linear-gradient(-65deg, #fff, #fff 20px, #fcfcfc 20px, #fcfcfc 40px)",
    "&.current": {
      // background: "#EDF2FF",
      // fontWeight: "bold",
      // borderBottom: 0,
      // border: "2px solid #0038C0",
      // boxShadow:
      //   "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    },

    "&.complete": {
      border: "2px solid #039824",
      borderBottom: 0,
      background: "rgba(33, 150, 83, 0.1)",
      "&:hover": {
        //   background: "#719b5d",
        //   color: "white",
      },
    },
  },
  upperStepperCount: {
    display: "flex",
    margin: "10px 10px 0 0",
    padding: 0,
    width: "60rem",
    listStyle: "none",
    position: "relative",
    "&::before": {
      position: "absolute",
      top: 0,
      left: 0,
      height: "10%",
      content: '""',
      width: "calc(100% - 20px)",
    },
  },
  lowerStepperContainer: {
    display: "flex",
    margin: "0 10px 10px 0",
    padding: 0,
    width: "60rem",
    height: "310px",
    listStyle: "none",
    position: "relative",
    "&::before": {
      position: "absolute",
      top: 0,
      left: 0,
      height: "10%",
      content: '""',
      width: "calc(100% - 20px)",
    },
  },
  stepNoDiv: {
    zIndex: "1",
    position: "absolute",
    right: "95px",
    top: "-20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fill: "#fff",
    background: "lightgrey",
    borderRadius: "50%",
    height: "35px",
    width: "35px",
    fontSize: "16px",
    fontWeight: 700,
    "&.current": {
      animation: "$at-ripple-pink 0.6s linear infinite",
      background: "#0038C0",
      boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
    "&.complete": {
      background: "#039824",
      "&:hover": {
        //   background: "#719b5d",
        //   color: "white",
      },
    },
  },
  StepTag: {
    zIndex: "1",
    position: "absolute",
    right: "-2px",
    top: "-34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    borderRadius: "10px",
    fontWeight: "700",
    padding: 0,
    [theme.breakpoints.down("sm")]: {},
  },
  dialogHeader: {
    padding: "8px",
    display: "flex",
    alignItems: "center",
    fontSize: "10px",
  },
  dialogGrid: {
    padding: theme.spacing(1.5, 0),
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100px",
    flexWrap: "wrap",
  },
  dialogContent: {
    gap: "40px",
    width: "inherit",
    display: "flex",
    alignItems: "center",
  },
  viewBtn: {
    padding: theme.spacing(0, 1.5),
    display: "flex",
    alignItems: "center",
  },
  detailBox: {
    borderRadius: "4px",
    padding: "0 0 0 5px",
    height: "21%",
    width: "100%",
    background: "#F6F6F6",
    // "&:nth-child(even)": {
    //   background: "#F6F6F6",
    // },
    // "&:nth-child(odd)": {
    //   background: "#FCFCFC",
    // },
  },
  setp5Con:{
    borderRadius: 5,
    width: "100%",
    background: "#F6F6F6",
    height: "fit-content", 
    padding: 6, 
    margin: "8px 0"
  },
  documnetBox: {
    borderRadius: "4px",
    width: "100%",
    padding: "3px",
    // '&:nth-child(even)':{
    //   background: "#F6F6F6"
    // },
  },
  reUploadBtn: {
    color: "#EB5757",
    "&:hover": {
      background: "rgba(250, 61, 93, 0.1)",
    },
    "& .MuiButton-outlined": {
      padding: 0,
    },
  },
  DocumentBox: {
    borderRadius: "4px",
    width: "100%",
    paddingBottom: "5px",
    "&:nth-child(even)": {
      background: "#F6F6F6",
    },
    "&:nth-child(odd)": {
      background: "#FCFCFC",
    },
  },
  dataTitle: {
    marginRight: 2,
    padding: "1px",
    color: "#65707D",
    fontWeight: 600,
    fontSize: "0.7rem",
  },
  dataValue: {
    color: "#00437E",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  "@keyframes at-ripple-top": {
    "0%": {
      boxShadow: " 0 0 20px rgba(50, 160, 50, 0.9)",
    },
    "50%": {
      boxShadow: "0 0 20px rgba(50, 160, 50, .2)",
    },
    "100%": {
      boxShadow: "0 0 20px rgba(50, 160, 50, 0.9)",
    },
  },
  "@keyframes at-ripple-pink": {
    "0%": {
      boxShadow:
        "0 4px 10px rgba(102, 102, 102, 0.1), 0 0 0 0 rgba(102, 102, 102, 0.1), 0 0 0 5px rgba(102, 102, 102, 0.1), 0 0 0 10px rgba(102, 102, 102, 0.1)",
    },
    "100%": {
      boxShadow:
        "0 4px 10px rgba(102, 102, 102, 0.1), 0 0 0 5px rgba(102, 102, 102, 0.1), 0 0 0 10px rgba(102, 102, 102, 0.1), 0 0 0 20px rgba(102, 102, 102, 0)",
    },
  },
  "@keyframes pulse": {
    "0%": {
      opacity: 1,
      transform: "scale(1)",
    },
    "50%": {
      opacity: 1,
      transform: "scale(1.06)",
    },
  },

  accordianRoot: {
    "&.MuiAccordion-root": {
      border: "1px solid #ccc",
      boxShadow: "none",
      "&.Mui-expanded": {
        margin: 0,
      },
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&.Mui-disabled": {
        opacity: 0.5,
      },
    },
  },
  accordianSummary: {
    "&.MuiAccordionSummary-root": {
      minHeight: "30px",
      margin: 0,
    },
    "& .MuiAccordionSummary-expandIcon": {
      padding: 0,
    },
    "& .MuiAccordion-rounded": {
      margin: "0 5px",
    },
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ccc",
    "& .MuiAccordionSummary-content": {
      margin: "9px 0",
    },
  },
  accordianDetails: {
    // maxHeight: "149px",
    padding: "5px 8px",
  },
  accordianDetailsMiddle: {
    maxHeight: "145px",
    padding: "5px 8px",
  },
  centerAddress: {
    display: "flex",
    alignItems: "center",

    "& .timeTxt": {
      color: "#0038C0",
      fontSize: "0.875rem",
      fontFamily: "Noto Sans",
      fontWeight: "700",
    },
  },
  noteIcon: {
    color: "#65707D",
    fontSize: 20,
    marginRight: 10,
  },
  fontBoldStyle: {
    fontWeight: 600,
    color: "#0038C0",
    fontSize: "0.875rem",
    fontFamily: "Noto Sans",
  },
  castDropDown: {
    padding: "10px",
    "& ul": {
      paddingLeft: "20px",

      "& li": {
        paddingBottom: "8px",
        fontSize: "0.8rem",
      },
    },
  },
  cover: {
    width: 92,
    height: "97%",
    borderRadius: "5px",
    border: "1px solid rgba(101, 112, 125, 0.4)",
  },
  cover2: {
    borderRadius: "5px",
    height: 350,
    border: "2px solid black",
  },

  timerValidText: {
    textAlign: "center",
    padding: "10px",
    color: "red",
    fontWeight: 600,
    animation: "$blinker 1s linear infinite",
  },
  "@keyframes blinker": {
    "50%": {
      opacity: "0.5",
    },
  },
}));
