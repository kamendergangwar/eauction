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
        minHeight: 820,
        borderStyle: "outset",
        overflowX: "scroll",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <div
          style={{ position: "absolute", left: "271.89px", top: "35.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>Sample - D</pre>
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
                (Certificate of being a Maharashtra State Government Officer /
                Employee)
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
              {"     "}Proof is given that Mr./Mrs.
              {applicantDetails.FirstName + " " + applicantDetails.LastName}
              {"\n"}
              {"     "}is working in this department as a permanent Maharashtra
              State Government employee and his date{"\n"}
              {"    "} of appointment ……………………………… . He / she is currently
              working in ………………………………………………{"\n"}
              {"    "} or ……………………………………………… department.
              {"      "}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"      "}Date:{"\n"}
              {"\n"}
              {"      "}Location :{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"                                        "}
              Signature / stamp of authorized government official
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
              <b>(On the letterhead of the establishment)</b>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitDpreview;
