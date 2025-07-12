import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cls_003: {
      fontFamily: "Arial",
      fontSize: "12px",
      color: " rgb(0, 0, 0)",
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

function AffidavitFpreview({ applicantDetails, age }) {
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
          style={{ position: "absolute", left: "251.89px", top: "35.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>नमूना - एफ</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "251.89px", top: "45.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>_________</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "251.89px", top: "45.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>_________</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "200.89px", top: "75.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>(धार्मिक अल्पसंख्यकों के लिए)</pre>
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
              {"         "}मैं/हम आवेदक श्री/श्रीमती।
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}{" "}
              उम्र {age} वर्षे, आवेदन संख्या। {applicantDetails.ApplicantId}
              {"\n"}
              {"         "}सिडको की महागृहनिर्माण योजना ऑक्टोबर - २०१९ में एक
              सफल आवेदक है{"\n"}
              {"         "}……………………………………………………… और बिल्डिंग नं. ………………………………
              नीरस नहीं। ……………………………आशय का पत्र{"\n"}
              {"         "}मिला है।{"\n"}
              {"\n"}
              {"         "}मैं धार्मिक अल्पसंख्यक वर्ग में आवेदन करता हूं मेरी
              केंद्र सरकार का राष्ट्रीय अल्पसंख्यक आयोग{"\n"}
              {"         "}अधिनियम - १९९२ के राजपत्र का भाग २(क) मुसलमानों को एक
              धार्मिक अल्पसंख्यक के रूप में अधिसूचित/{"\n"}
              {"         "}शईसाई/बौद्ध/पारसी/जैन या वर्ग शामिल है।{"\n"}
              {"\n"}
              {"         "}मैं/हम आगे यह भी कहते हैं कि, यदि यदि ऊपर दी गई
              जानकारी गलत या गलत पाई जाती है{"\n"}
              {"         "}मेरा/हमारा आवंटित मकान रद्द करने के लिए कोई समस्या
              नहीं होगी।{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"         "}दिनांक : …………………………………………{"\n"}
              {"\n"}
              {"         "}स्थान :…………………………………………
              {"                        "}हस्ताक्षर{"\n"}
              {"\n"}
              {"                                                        "}
              आवेदक का नाम ……………………………{"\n"}
              {"\n"}
              {"                "}
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitFpreview;
