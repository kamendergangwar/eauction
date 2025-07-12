import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cls_003: {
      fontFamily: "Arial",
      fontSize: "15.1px",
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

function PHconcentLetterPreview({ applicantDetails }) {
  const classes = useStyles();
  return (
    <div>
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
        <div style={{ position: "absolute", left: 25, top: 0 }}>
          <div
            style={{ position: "absolute", left: "261.89px", top: "85.58px" }}
            className={classes.cls_004}
          >
            <span className={classes.cls_004}>
              <b>सहमति पत्र</b>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "72.58px", top: "155.66px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                मैं मिस्टर/मिसेज हूं.{" "}
                {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}{" "}
                आवेदन संख्या। {applicantDetails.ApplicantId} सिडको
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "175.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                ऑनलाइन जा रहा है-2020 दिव्यांग श्रेणी से एक सफल आवेदक है। मैं इस
                ड्रॉ में
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "195.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                भवन संख्या। ……………………… नीरस नहीं। ……………………………… क्षेत्र- ………………………
                {"  "}योजना संख्या
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "215.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>…………………………………………………………… मेरे यहाँ एक फ्लैट है.</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "72.58px", top: "255.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                मैं इस फ्लैट के संबंध में निम्नानुसार सहमति दे रहा हूं.{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "305.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                अ){"  "}इस फ्लैट में विकलांगों के लिए उपयुक्त शौचालय/बाथरूम को
                मिलाकर
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "325.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>{"    "}इसे रैंप के साथ डिजाइन किया जाना चाहिए.</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "345.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                ब{")"}
                {"  "}इस फ्लैट के शौचालय/बाथरूम में सभी सामान्य वर्ग के लिए{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "365.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>{"    "}होने के लिए डिज़ाइन किया जाना चाहिए</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "405.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"    "}मुझे सूचित करें कि भविष्य में उपरोक्त विकल्प को बदला
                नहीं जा सकता है
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "425.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                आ गया है। साथ ही, मुझे भविष्य में उपरोक्त विकल्प के बारे में कोई
                शिकायत नहीं होगी।
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "485.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"                                 "}आवेदक के हस्ताक्षर:
                …………………………………………{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "505.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"                                 "}आवेदक का नाम:{" "}
                {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "545.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>दिनांक: </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "565.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>स्थान:</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "456.58px", top: "278.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"            "}
                <input type="checkbox" name="checkBox2" />
                {"\n"}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "456.58px", top: "348.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"              "}
                <input type="checkbox" name="checkBox3" />
                {"\n"}
              </pre>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PHconcentLetterPreview;
