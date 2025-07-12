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
              <pre>नमुना - C</pre>
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
            <pre>(केवळ अल्प उत्पन्न गटातील अर्जदारांकरीता : नमूना फॉर्म)</pre>
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
              (रु.२००/- मुठ्रांक शुल्क पेपरवर नोटरींकरून){"\n"}
              {"                                                         "}(Non
              - Judicial Stamp Paper){"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"      "}मी/आम्ही अर्जदार श्री./श्रीमती.{" "}
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`} वय{" "}
              {age} वर्षे,{"\n"}
              {"      "}अर्ज क्र. {applicantDetails.ApplicantId} सिडको
              महागृहनिर्माण योजना ऑक्टोबर - २०१९ मधील यशस्वी अर्जदार असून मला
              {"\n"}
              {"       "}योजना संकेताक क्र. ………………………… व इमारत क्र.
              …………………………………………………… सदनिका क्र.{"\n"}
              {"      "}…………………………… चे इरादापत्र मिळालेले आहे.{"\n"}
              {"\n"}
              {"      "}माझे/ आमचे महाराष्ट्रात सलग १५ वर्ष वास्तव्य आहे. तसेच
              मी ………………………… येथे नोकरी करीत आहे/{"\n"}
              {"      "}माझा स्वतःचा ……………………… व्यवसाय आहे. आर्थिक वर्ष २०१८ -
              १९ करिता माझे सर्व मार्गानी मिळून वार्षिक
              {"\n"}
              {"      "}कौटुंबिक उत्पन्न रु. ३,००,००१/- ते रु. ६,००,०००/-
              दरम्यान आहे. मी प्रतिज्ञापत्र लिहून देते/ देतो की,
              {"\n"}
              {"\n"}
              {"      "}मी असे जाहीर करतो / करते की, मी सध्या राहत असलेले घर हे
              माझ्या स्वतःच्या मालकीचे नसून/{"\n"}
              {"      "}भाडयाचे / एकत्र कुटुंबाचे आहे. मी पुढे असे जाहीर करतो/
              करते की, माझे अथवा माझ्या पत्नीच्या/पतीच्या
              {"\n"}
              {"       "}नावे नवी मुंबईत कुठेही घर नाही. तसेच मी अथवा माझी पत्नी
              / पती कोणत्याही नवी मुंबईतील सहकारी{"\n"}
              {"               "}गृहनिर्माण संस्थेचे सभासद नाही.
              {"\n"}
              {"\n"}
              {"       "}मी असे जाहीर करतो/करते की, मी सर्वसाधारण/ अनुसूचित
              जाती/ अनुसूचित जमाती/ भटक्या जमाती/{"\n"}
              {"       "}विमक्त जमाती/ राज्य शासनाचे कर्मचार/ नवी मुंबई ई
              क्षेत्रातील पत्रकार/ अंध किंवा शारिरीक दृष्टया विकलांग{"\n"}
              {"       "}व्यक्ती/ प्रकल्पग्मस्त/ माजी सैनिक/ सुरक्षादलातील
              कर्मचारी/ माथाडी कामगार/ धार्मिक अल्पसंख्याक सिडको{"\n"}
              {"       "}कर्मचारी या प्रवर्गातील आहे. (यापैकी योग्य ती नमूद
              करावे){"\n"}
              {"\n"}
              {"       "}मी/आम्ही पुढे असेही लिहून देतो की, वर नमूद केलेली
              माहिती ही खरी व बरोबर आहे.{"\n"}
              {"\n"}
              {"       "}मी/आम्ही पुढे असे कथन करतो की, वर दिलेली माहिती
              भविष्यात जर चुकीची आढळल्यास होणाऱ्या{"\n"}
              {"       "}कारवाईस मी/आम्ही त्यास जबाबदार राहू व सिडको महामंडळास
              कोणत्याही प्रकारची तोशीस लागू देणार नाही.
              {"\n"}
              {"\n"}
              {"       "}मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद
              माहिती खोटी किंवा चुकीची आढळल्यास{"\n"}
              {"       "}वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही
              प्रकारची हरकत राहणार नाही.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"       "}अर्जदाराची सही/अंगठा{"\n"}
              {"\n"}
              {"       "}दिनांक :{"                               "}नोटरी यांची
              सही / शिक्का{"\n"}
              {"       "}ठिकाण :{"\n"}
              {"\n"}
              {"       "}(हे प्रतिज्ञापत्र यशस्वी लाभार्थ्यांनी इरादापत्रामध्ये
              नमूद केलेल्या कागदपत्रांसोबत अर्जाच्या छाननी प्रक्रीयेवेळी सादर
              {"\n"}
              {"        "}करणे जरुरी आहे.){"\n"}
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
              <b>प्रतिज्ञापत्र</b>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitCpreview;
