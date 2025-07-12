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

function AffidavitBpreview({ applicantDetails, age, familyData }) {
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
              <pre>नमुना- B</pre>
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
              {""}(केवळ आर्थिकदृष्टया दुर्बल घटक या अर्जदारांकरीता : नमूना
              फॉर्म)
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
              {"\n"}{" "}
              {"                                                         "}{" "}
              (रु.२००/- मुठ्रांक शुल्क पेपरवर नोटरींकरून)
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
              {"  "}(Non - Judicial Stamp Paper){"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"              "}मी/आम्ही अर्जदार श्री./श्रीमती.{" "}
              {applicantDetails.FirstName +
                " " +
                applicantDetails.LastName +
                " "}
              वय {age} वर्षे,{"\n"}
              {"              "}अर्ज क्र.{""} {applicantDetails.ApplicantId}
              {""} सिडको महागृहनिर्माण योजना ऑक्टोबर - २०१९ मधील यशस्वी अर्जदार
              असून मला{"\n"}
              {"              "}योजना संकेताक क्र. ……………………………………………………… व इमारत
              क्र. …………………………………………………… सदनिका क्र.{"\n"}
              {"              "}…………………………… चे इरादापत्र मिळालेले आहे.{"\n"}
              {"              "}मी/आम्ही अर्ज क्र……………………………………………………… दिनांक
              ……………………………………………{"  "}रोजी प्रधानमंत्री आवास{"\n"}
              {"              "}योजनेअंतर्गत अंतर्गत घर मिळणेकरीता सादर केला
              आहे. असे प्रतिज्ञापत्र लिहून देते/ देतो की,{"\n"}
              {"              "}माझ्या / आमच्या परिवारात खालील नमूदप्रमाणे सदस्य
              आहेत.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"              "}मी / आम्ही पुढे असेही लिहून देतो की, माझे / आमचे
              व माझ्या/आमच्या वर उपरोक्त नमूद केलेल्या{"\n"}
              {"              "}परिवारातील सदस्यांच्या मालकीचे भारतात कोठेही
              पक्के घर नाही.{"\n"}
              {"              "}मी असे जाहीर करतो/करते की, मी सर्वसाधारण /
              अनुसूचित जाती/ अनुसूचित जमाती/भटक्या जमाती/{"\n"}
              {"              "}विमक्त/जमाती/ राज्य शासनाचे कर्मचार/ नवी मुंबई ई
              क्षेत्रातील पत्रकार/ अंध किंवा शारिरीक दृष्टया विकलांग{"\n"}
              {"              "}व्यक्ती/ प्रकल्पग्नस्त / माजी सैनिक /
              सुरक्षादलातील कर्मचारी / माथाडी कामगार / धार्मिक अल्पसंख्याक या
              {"\n"}
              {"              "}प्रवर्गातील आहे (यापैकी योग्य ती नमूद करावे).
              {"\n"}
              {"              "}माझे/ आमचे महाराष्ट्रात सलग १५ वर्ष वास्तव्य
              आहे. तसेच मी …………………………… येथे नोकरी करीत आहे/{"\n"}
              {"              "}माझा स्वतःचा ………………………… व्यवसाय आहे. आर्थिक वर्ष
              २०१८ - १९ करिता माझे सर्व मार्गानी मिळून वार्षिक{"\n"}
              {"              "}कौटुंबिक उत्पन्न रु. ३,००,०००/- पर्यंत आहे.
              {"\n"}
              {"              "}मी/आम्ही पुढे असेही लिहून देतो की, वर नमूद
              केलेली माहिती ही खरी व बरोबर आहे.{"\n"}
              {"              "}मी/आम्ही पुढे असे कथन करतो की, वर दिलेली माहिती
              भविष्यात जर चुकीची आढळल्यास होणाऱ्या{"\n"}
              {"              "}कारवाईस मी/आम्ही त्यास जबाबदार राहू व सिडको
              महामंडळास कोणत्याही प्रकारची तोशीस लागू देणार नाही.{"\n"}
              {"              "}मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त
              नमूद माहिती खोटी किंवा चुकीची आढळल्यास{"\n"}
              {"              "}वाटप केलेले घर रद्द करण्यास माझी / आमची
              कोणत्याही प्रकारची हरकत नाही.{"\n"}
              {"\n"}
              {"\n"}
              {"              "}अर्जदाराची सही/अंगठा{"\n"}
              {"\n"}
              {"              "}दिनांक :
              {"                                                    "}नोटरी
              यांची सही / शिक्का{"\n"}
              {"              "}ठिकाण :{"\n"}
              {"              "}(हे प्रतिज्ञापत्र यशस्वी लाभार्थ्यांनी
              इरादापत्रामध्ये नमूद केलेल्या कागदपत्रांसोबत अर्जाच्या छाननी
              प्रक्रीयेवेळी सादर{"\n"}
              {"              "}करणे जरुरी आहे.){"\n"}
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
              style={{ borderCollapse: "collapse", width: "187.9579%" }}
              border={1}
            >
              <tbody>
                <tr>
                  <td style={{ width: "11.8848%" }}>
                    <span style={{ fontWeight: 400 }}>अ.क्र.</span>
                  </td>
                  <td style={{ width: "46.8431%" }}>
                    <span style={{ fontWeight: 400 }}>सदस्यांची नावे</span>
                  </td>
                  <td style={{ width: "26.2302%" }}>
                    <span style={{ fontWeight: 400 }}>अर्जदाराशी नाते</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>
                    {familyData[0] ? 1 : ""}
                  </td>
                  <td style={{ width: "46.8431%" }}>
                    {familyData[0] ? familyData[0].RelativeFullName : ""}
                  </td>
                  <td style={{ width: "26.2302%" }}>
                    {familyData[0] ? familyData[0].Relationship : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>&nbsp;</td>
                  <td style={{ width: "26.2302%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>
                    {familyData[2] ? familyData[2].RelativeFullName : ""}
                  </td>
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
                {"   "}प्रतिज्ञापत्र
              </h4>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitBpreview;
