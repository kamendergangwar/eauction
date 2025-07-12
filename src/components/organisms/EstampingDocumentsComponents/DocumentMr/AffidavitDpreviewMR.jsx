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
              <pre>नमुना - D</pre>
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
                (महाराष्ट्र राज्य सरकारी अधिकारी /कर्मचारी असल्याबाबत दाखल्याचा
                नमुना)
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
              {"     "}दाखला देण्यात येतो की श्री./ श्रीमती{" "}
              {`${applicantDetails.FirstName}  ${applicantDetails.MiddleName}  ${applicantDetails.LastName}`}
              {""} हे/{"\n"}
              {"     "}ही कायमस्वरूपी महाराष्ट्र राज्य सरकारी कर्मचारी म्हणून या
              विभागात कार्यरत आहेत व त्यांचा नियुक्तीचा दिनांक{"\n"}
              {"       "}……………………………… आहे. ते/त्या सध्या ……………………………………… या
              विभागात ………………………………… हया पदावर कार्यरत{"\n"}
              {"      "}आहेत.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"      "}दिनांक :{"\n"}
              {"\n"}
              {"      "}ठिकाण :{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"                                                       "}
              प्राधिकृत शासकीय अधिकाऱ्याची सही / शिक्का
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
