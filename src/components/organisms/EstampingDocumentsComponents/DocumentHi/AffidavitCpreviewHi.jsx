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

function AffidavitCpreview({ applicantDetails, age }) {
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
        height: 835,
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
              <pre>नमूना - सी </pre>
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
          style={{ position: "absolute", left: "121.89px", top: "75.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>(केवल निम्न आय वर्ग के आवेदकों के लिए: नमूना प्रपत्र)</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "121.89px", top: "81.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>_____________________________________________</pre>
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
              {"                                                       "}
              (कागज पर नोटरी द्वारा २००/- रुपये की स्टांप ड्यूटी){"\n"}
              {"                                                         "}
              (गैर - न्यायिक स्टाम्प पेपर){"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"      "}मैं/हम आवेदक श्री/श्रीमती।.
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`} वय
              उम्र {age} वर्षे,{"\n"}
              {"      "}आवेदन संख्या {applicantDetails.ApplicantId} सिडको
              महागृहनिर्माण योजना ऑक्टोबर - २०१९ मैं एक सफल आवेदक हूँ
              {"\n"}
              {"       "}योजना सूचक संख्या ………………………………………………………… और बिल्डिंग
              नं। …………………………………………………… समतल नहीं।{"\n"}
              {"      "}…………………………… आशय पत्र प्राप्त हुआ है।{"\n"}
              {"\n"}
              {"      "}महाराष्ट्र में मेरा / हमारा १५ वर्षों से जी रहा है। साथ
              ही मैं भी ………………………… यहाँ  नौकरी कर रहे हैं/{"\n"}
              {"      "}मेरा अपना ……………………… व्यापार है। वित्तीय वर्ष २०१८ - १९
              वार्षिक के लिए मेरे सभी रास्ते
              {"\n"}
              {"      "}परिवार की आय रु. ३,००,००१/- ते रु. ६,००,०००/- बीच में
              है। मैं एक हलफनामा लिखता हूं कि,
              {"\n"}
              {"\n"}
              {"      "}मैं घोषणा करता हूँ कि मैं मैं वर्तमान में जिस घर में रह
              रहा हूं वह मेरा नहीं है/{"\n"}
              {"      "}किराए के/संयुक्त परिवार से ताल्लुक रखते हैं। मैं वह आगे
              घोषणा करता है कि यह मेरा या मेरी पत्नी/पति का है
              {"\n"}
              {"       "}नवी मुंबई में कहीं कोई घर नहीं है। साथ ही मैं या मेरी
              पत्नी नवी मुंबई का कोई सहयोगी{"\n"}
              {"               "}हाउसिंग सोसाइटी का सदस्य नहीं है।
              {"\n"}
              {"\n"}
              {"       "}मैं घोषणा करता हूँ कि मैं सामान्य/अनुसूचित
              जाति/अनुसूचित जनजाति/घुमंतू जनजाति/{"\n"}
              {"       "}वंचित जनजातियाँ / राज्य सरकार स्टाफ / नवी मुंबई ई
              क्षेत्र पत्रकार / नेत्रहीन या शारीरिक नेत्रहीन{"\n"}
              {"       "}व्यक्तिगत / प्रोजेक्टिस्ट / पूर्व
              सैनिक/सुरक्षाकर्मी/मथाड़ी कार्यकर्ता/धार्मिक अल्पसंख्यक सिडको
              {"\n"}
              {"       "}कर्मचारी इस श्रेणी में है। (सही का उल्लेख किया जाना
              चाहिए){"\n"}
              {"\n"}
              {"       "}मैं/हम आगे लिखते हैं कि, ऊपर दी गई जानकारी सत्य और सही
              है.{"\n"}
              {"\n"}
              {"       "}मैं/हम आगे बताते हैं कि, ऊपर यदि प्रदान की गई जानकारी
              भविष्य में गलत पाई जाती है{"\n"}
              {"       "}मैं / हम कार्रवाई के लिए जिम्मेदार हैं राहु और सिडको
              निगम पर कोई टैक्स नहीं लगाएंगे।
              {"\n"}
              {"\n"}
              {"       "}मैं / हम इसका बाद में उल्लेख करेंगे यानी अगर ऊपर बताई
              गई जानकारी गलत या गलत पाई जाती है{"\n"}
              {"       "}मेरा आवंटित घर रद्द करने के लिए / हमें कोई दिक्कत नहीं
              होगी।{"\n"}
              {"\n"}
              {"\n"}
              {"       "}आवेदक के हस्ताक्षर/अंगूठे का निशान{"\n"}
              {"\n"}
              {"       "}दिनांक :{"                               "}नोटरी के
              हस्ताक्षर / मुहर{"\n"}
              {"       "}ठिकाण :{"\n"}
              {"\n"}
              {"       "}(यह हलफनामा सफल है लाभार्थियों द्वारा आशय पत्र में
              उल्लिखित दस्तावेजों के साथ आवेदन जांच प्रक्रिया के दौरान जमा किया
              गया{"\n"}
              {"        "}जरूर करना.){"\n"}
              {"                        "}
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "261.89px", top: "145.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <pre>
              <b>शपत पात्र</b>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitCpreview;
