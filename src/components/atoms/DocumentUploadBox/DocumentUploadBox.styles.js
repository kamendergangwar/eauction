// import { makeStyles } from "@material-ui/core";

// export const DocumentUploadBoxStyle = makeStyles((theme) => ({
//   docsBox: {
//     padding: theme.spacing(2),
//   },
//   docsCard: {
//     backgroundColor: "#F5FAFD",
//     border: "1px dashed #00437E",
//     borderRadius: 8,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     maxWidth: 270,
//     textAlign: "center",
//     margin: "0 auto",
//     paddingBottom: "30px",
//     padding: theme.spacing(1, 1.5),
//     minHeight: 150,
//     height: "100%",
//     position: "relative",
//     "&.done": {
//       background: "linear-gradient(0deg, #0038C0 20.1%, #006FD5 87.81%)",
//       border: "none",
//     },
//     "&.disable": {
//       backgroundColor: "#F5FAFD",
//       border: "1px dashed #00437E",
//     },
//     "&.verified": {
//       background: "linear-gradient(-90deg, #FFFFFF 5%, #A9FFD3 252.67%)",
//       border: "1px dashed #00437E",
//     },
//     "&.rejected": {
//       background: "linear-gradient(342deg, #FFFFFF 5%, #e20000 252.67%)",
//       border: "1px dashed #00437E",
//     },
//   },
//   docNameTxt: {
//     color: "#263238",
//     fontSize: "0.9rem",
//     fontWeight: 700,
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1.5),
//     display: "inline-block",
//     "&.done": {
//       color: "#FFFFFF",
//       fontWeight: 700,
//     },
//     "&.verified": {
//       color: "#263238",
//     },
//   },
//   infoToolTipIcon: {
//     color: "#0038C0",
//     fontSize: "1.5rem",
//     "&.done": {
//       color: "#FFFFFF",
//     },
//     "&.verified": {
//       color: "#0038C0",
//     },
//   },
//   verifiedBox: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "4px 8px 4px 6px",
//     gap: "6px",
//     borderRadius: "40px",
//     background: "linear-gradient(113.08deg, #10BAEF -80.36%, #00A848 124.11%)",
//     "& span": {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#FFFFFF",
//       fontSize: "11px",
//       fontWeight: "700",
//       width: "100px",
//       height: "25px",
//     },
//   },
//   docsBtn: {
//     "&.done": {
//       border: "1px solid #FFFFFF",
//     },
//     "&.MuiButton-contained.Mui-disabled": {
//       // color: "#fff",
//       cursor: "not-allowed",
//       border: "none",
//     },
//   },
//   tikIconBox: {
//     position: "absolute",
//     top: theme.spacing(1),
//     left: theme.spacing(1),
//   },
//   downloadBtnArea: {
//     display: "flex",
//     width: "100%",
//     justifyContent: "end",
//     marginBottom: "15px",
//   },
//   downloadBtn: {
//     padding: "4px",
//     fontFamily: "Noto Sans",
//     fontWeight: "400",
//     fontSize: "12px",
//     lineHeight: "16px",
//   },
// }));

import { makeStyles } from "@material-ui/core";

export const DocumentUploadBoxStyle = makeStyles((theme) => ({
  docsBox: {
    padding: theme.spacing(2),
  },
  docsCard: {
    backgroundColor: "#F5FAFD",
    border: "1px dashed #00437E",
    borderRadius: 8,
    // display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    // maxWidth: 270,
    textAlign: "center",
    margin: "0 auto",
    // paddingBottom: "30px",
    padding: theme.spacing(0, 1.5),
   // minHeight: 150,
    //height: "100%",
    position: "relative",
    "&.done": {
     // background: "linear-gradient(0deg, #0038C0 20.1%, #006FD5 87.81%)",
     
     background: 'linear-gradient(0deg, #0300c0a6 30.1%, #7900d5d1 77.81%)',
     border: "none",
    },
    "&.disable": {
      backgroundColor: "#F5FAFD",
      border: "1px dashed #00437E",
    },
    "&.verified": {
      background: "linear-gradient(-90deg, #FFFFFF 5%, #A9FFD3 252.67%)",
      border: "1px dashed #00437E",
    },
    "&.rejected": {
      background: "linear-gradient(342deg, #FFFFFF 5%, #e20000 252.67%)",
      border: "1px dashed #00437E",
    },
  },
  docNameTxt: {
    color: "#263238",
    fontSize: "0.9rem",
    fontWeight: 700,
    marginTop: theme.spacing(1),
    marginLeft:theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    display: "inline-block",
    "&.done": {
      color: "#FFFFFF",
      fontWeight: 700,
    },
    "&.verified": {
      color: "#263238",
    },
  },
  infoToolTipIcon: {
    color: "#0038C0",
    fontSize: "1.5rem",
    "&.done": {
      color: "#FFFFFF",
    },
    "&.verified": {
      color: "#0038C0",
    },
  },
  verifiedBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px 4px 6px",
    gap: "6px",
    borderRadius: "40px",
    background: "linear-gradient(113.08deg, #10BAEF -80.36%, #00A848 124.11%)",
    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontSize: "11px",
      fontWeight: "700",
      width: "100px",
      height: "25px",
    },
  },
  docsBtn: {
    minWidth:65,
    "&.done": {
      border: "1px solid #FFFFFF",
    },
    "&.MuiButton-contained.Mui-disabled": {
      // color: "#fff",
      cursor: "not-allowed",
      border: "none",
    },
  },
  tikIconBox: {
    position: "absolute",
    top: theme.spacing(1),
   // left: theme.spacing(1),
   right:theme.spacing(1),
  },
  EdIconBox: {
    position: "absolute",
    top: theme.spacing(1),
   // left: theme.spacing(1),
   left:theme.spacing(1),
  },
  downloadBtnArea: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
    marginBottom: "15px",
  },
  downloadBtn: {
    padding: "4px",
    fontFamily: "Noto Sans",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
  },
}));
