import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import DOMPurify from "dompurify";
// import AffidavitB from "../../../../../src/assets/docs/AffidavitBpreview/AffidavitB.html"
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

function AffidavitBpreview({ applicantDetails, age }) {
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
        height: 850,
        borderStyle: "outset",
        overflowY: "visible",
        marginTop: 15,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <div
          style={{ position: "absolute", left: "271.89px", top: "35.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>नमूना-बी</pre>
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
          style={{ position: "absolute", left: "150.89px", top: "75.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>
              {""}(केवल आर्थिक रूप से कमजोर आवेदकों के लिए: नमूना प्रपत्र)
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "150.89px", top: "81.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>{""}__________________________________________________</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "1.58px", top: "85.66px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              {"\n"}
              {"\n"} {"                                                       "}{" "}
              (कागज पर नोटरी द्वारा २००/- रुपये की स्टांप ड्यूटी)
              {"\n"}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"  "}
              {"            "}(गैर-न्यायिक स्टाम्प पेपर){"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"              "}मैं/हम आवेदक श्री/श्रीमती।{" "}
              {applicantDetails.FirstName +
                " " +
                applicantDetails.LastName +
                " "}{" "}
              उम्र {age} वर्षे,{"\n"}
              {"              "}आवेदन संख्या। ………………………… सिडको की महागृहनिर्माण
              योजना ऑक्टोबर - २०१९ मैं एक सफल आवेदक हूँ{"\n"}
              {"              "}योजना सूचक संख्या ……………………………………………………… और
              बिल्डिंग नं। …………………………………………………… नीरस नहीं।{"\n"}
              {"              "}…………………………… आशय पत्र प्राप्त हो गया है।{"\n"}
              {"              "}मी/आम्ही अर्ज क्र {applicantDetails.ApplicantId}{" "}
              दिनांक ……………………………………………{"  "}प्राइम रेजिडेंस ऑन{"\n"}
              {"              "}योजनान्तर्गत आन्तरिक मकान प्राप्त करने हेतु
              प्रस्तुत किया गया. यह कहते हुए एक हलफनामा लिखता है कि,{"\n"}
              {"              "}मेरे/हमारे परिवार में निम्नलिखित सदस्य हैं.
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"              "}मैं/हम आगे लिखते हैं कि ऊपर उल्लिखित मेरा/हमारा
              और मेरा/हमारा{"\n"}
              {"              "}भारत में कहीं भी परिवार के किसी सदस्य के
              स्वामित्व वाला स्थायी घर नहीं है।{"\n"}
              {"              "}मैं घोषणा करता हूं कि मैं सामान्य/अनुसूचित
              जाति/अनुसूचित जनजाति/घुमंतू जनजाति/{"\n"}
              {"              "}वंचित / जनजाति / राज्य सरकार के कर्मचारी / नवी
              मुंबई ई क्षेत्र के पत्रकार / नेत्रहीन या शारीरिक{"\n"}
              {"             "} रूप से विकलांग व्यक्ति/परियोजना पीड़ित/पूर्व
              सैनिक/सुरक्षाकर्मी/मथाड़ी कार्यकर्ता/धार्मिक अल्पसंख्यक{"\n"}
              {"              "}श्रेणी में है (सही का उल्लेख किया जाना चाहिए)।
              {"\n"}
              {"              "}मैं/हम लगातार १५ वर्षों से महाराष्ट्र में रह रहे
              हैं. साथ ही मैं भी …………………………… यहाँ  नौकरी कर रहे हैं/{"\n"}
              {"              "}मेरा अपना ………………………… व्यापार है. वित्तीय वर्ष
              २०१८ - १९ वार्षिक के लिए मेरे सभी रास्ते{"\n"}
              {"              "}पारिवारिक आय रु. ३,००,०००/- यह आप पर है.{"\n"}
              {"              "}मैं/हम आगे यह भी कहते हैं कि उपरोक्त जानकारी
              सत्य और सही है.{"\n"}
              {"              "}मैं/हम आगे यह भी कहते हैं कि, यदि भविष्य में
              उपरोक्त जानकारी गलत पाई जाती है{"\n"}
              {"              "}कार्रवाई के लिए मैं/हम जिम्मेदार होंगे और सिडको
              निगम पर कोई जुर्माना नहीं लगाएगा.{"\n"}
              {"              "}मैं/हम आगे यह भी कहते हैं कि, यदि उपर्युक्त
              जानकारी झूठी या गलत पाई जाती है{"\n"}
              {"              "}मुझे आवंटित मकान को रद्द करने में कोई आपत्ति
              नहीं है.{"\n"}
              {"\n"}
              {"              "}आवेदक के हस्ताक्षर/अंगूठे का निशान{"\n"}
              {"\n"}
              {"              "}दिनांक :
              {"                                                    "}नोटरी के
              हस्ताक्षर / मुहर{"\n"}
              {"              "}स्थान:{"\n"}
              {"              "}(यह शपथ पत्र सफल लाभार्थियों द्वारा आवेदन
              संवीक्षा प्रक्रिया के दौरान आशय पत्र में उल्लिखित दस्तावेजों
              {"\n"}
              {"             "} के साथ प्रस्तुत किया जाता है।{"\n"}
              {"              "}जरूर करना.){"\n"}
              {"            "}
            </pre>
          </span>
        </div>
        <div
          style={{ position: "relative", left: "94px", top: "340.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <table
              style={{ borderCollapse: "collapse", width: "130%" }}
              border={1}
            >
              <tbody>
                <tr>
                  <td style={{ width: "11.8848%" }}>
                    <span style={{ fontWeight: 400 }}>क्र.सं.</span>
                  </td>
                  <td style={{ width: "46.8431%" }}>
                    <span style={{ fontWeight: 400 }}>सदस्यों के नाम</span>
                  </td>
                  <td style={{ width: "26.2302%" }}>
                    <span style={{ fontWeight: 400 }}>आवेदक के साथ संबंध</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>&nbsp;</td>
                  <td style={{ width: "26.2302%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>&nbsp;</td>
                  <td style={{ width: "26.2302%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>&nbsp;</td>
                  <td style={{ width: "26.2302%" }}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "261.89px", top: "145.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <pre>
              <h4>
                {"\n"}
                {"   "}वायदार
              </h4>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitBpreview;
