import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cls_003: {
      fontFamily: "Arial",
      fontSize: "12px",
      color: "rgb(0, 0, 0)",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
    },
    cls_005: {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "rgb(0, 0, 0)",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
    },
    cls_004: {
      fontFamily: "Arial",
      fontSize: "20.1px",
      color: "rgb(0, 0, 0)",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
    },
  },
}));

function AffidavitDpreview({ applicantDetails, age }) {
  const classes = useStyles();
  return (
    <div
      style={{
        fontSize: 12,
        position: "relative",
        left: "50%",
        marginLeft: "-306px",
        top: 0,
        width: 695,
        height: 792,
        borderStyle: "outset",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <div
          style={{ position: "absolute", left: "271.89px", top: "35.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>नमूना - डी</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "271.89px", top: "45.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>________</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "271.89px", top: "45.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>________</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "95.89px", top: "81.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>
              <b>
                (महाराष्ट्र राज्य सरकार के अधिकारी / कर्मचारी होने का प्रमाण
                पत्र नमुना)
              </b>
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "95.89px", top: "86.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>_________________________________________________________</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "36.58px", top: "85.66px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"     "}प्रमाण दिया जाता है कि मि./श्रीमती{" "}
              {`${applicantDetails.FirstName}  ${applicantDetails.MiddleName}  ${applicantDetails.LastName}`}{" "}
              हे/{"\n"}
              {"     "}यह स्थायी महाराष्ट्र राज्य सरकार है इस विभाग में एक
              कर्मचारी के रूप में कार्य करना और उनकी नियुक्ति दिनांक{"\n"}
              {"       "}……………………………… है। वह / वह वर्तमान में है ………………………………………
              इस अनुभाग में ………………………………… इस पद पर कार्यरत
              {"\n"}
              {"      "}हैं।{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"      "}दिनांक :{"\n"}
              {"\n"}
              {"      "}स्थान :{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"                                                       "}
              अधिकृत सरकारी अधिकारी के हस्ताक्षर/मुहर
              {"\n"}
              {"\n"}
              {"                "}
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "231.89px", top: "125.58px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              <b>(आस्थापनेच्या लेटर हेडवर)</b>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitDpreview;
