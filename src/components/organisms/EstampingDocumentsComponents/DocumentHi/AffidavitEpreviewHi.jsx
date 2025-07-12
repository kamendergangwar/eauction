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

function AffidavitEpreview({ applicantDetails, age }) {
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
      <div style={{ position: "relative", left: 5, top: 0 }}>
        <div
          style={{ position: "absolute", left: "251.89px", top: "35.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>नमूना - ई</pre>
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
          style={{ position: "absolute", left: "201.89px", top: "75.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>(नवी मुंबई क्षेत्र के पत्रकारों के लिए)</pre>
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
              {"         "}……………………………………………………… और बिल्डिंग नं। ………………………………
              नीरस नहीं। …………………………… आशय का पत्र{"\n"}
              {"         "}मिला है।{"\n"}
              {"\n"}
              {"         "}मैं नवी मुंबई क्षेत्र में पत्रकार हूं कार्य,
              महानिदेशक, सूचना और जनसंपर्क (DGIPR) द्वारा{"\n"}
              {"         "}जारी प्रमाण पत्र और पहचान पत्र की फोटोकॉपी मैं पूरी
              तरह से जानता हूं कि एक प्रति जमा करना अनिवार्य है।{"\n"}
              {"\n"}
              {"         "}मेरे समाचार पत्र प्रतिष्ठान पर या समाचार पत्र संपादक
              / नेता लेखक / समाचार संपादक,{"\n"}
              {"         "}समाचार लेखक, कॉपी परीक्षक, वार्ताकार, कार्टूनिस्ट /
              समाचार फोटोग्राफर, प्रिंट अन्वेषक / प्रमुख साप्ताहिक/{"\n"}
              {"         "}किसी पत्रिका में स्वतंत्र पत्रकार बनें समूह के
              अंतर्गत आता है।{"\n"}
              {"\n"}
              {"         "}साथ ही समाचार पत्र प्रबंधन और प्रशासन विभाग के
              कर्मचारियों के साथ-साथ पर्यवेक्षक के रूप में काम करने वाले{"\n"}
              {"         "}कर्मचारी, प्रबंधन के रूप में काम करने वाले कर्मचारी
              मैं इस समूह से संबंधित नहीं हूं।{"\n"}
              {"\n"}
              {"         "}मैं/हम आगे यह भी कहते हैं कि, यदि यदि ऊपर दी गई
              जानकारी गलत या गलत पाई जाती है{"\n"}
              {"         "}मेरा/हमारा आवंटित मकान रद्द करने के लिए कोई समस्या
              नहीं होगी।{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"          "}दिनांक : …………………………………………{"\n"}
              {"\n"}
              {"          "}स्थान :…………………………………………
              {"                                   "}हस्ताक्षर{"\n"}
              {"\n"}
              {"          "}आवेदक का नाम ……………………………{"\n"}
              {"\n"}
              {"                "}
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitEpreview;
