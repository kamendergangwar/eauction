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
              <pre>नमुना - F</pre>
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
            <pre>(धार्मिक अल्पसंख्यांक प्रवर्गाकरिता)</pre>
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
              {"         "}मी/आम्ही अर्जदार श्री./श्रीमती.{" "}
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`} वय{" "}
              {age} वर्षे, अर्ज क्र. {applicantDetails.ApplicantId}
              {"\n"}
              {"         "}सिडको महागृहनिर्माण योजना ऑक्टोबर - २०१९ मधील यशस्वी
              अर्जदार असून मला योजना संकेताक क्र.{"\n"}
              {"         "}……………………………………………………… व इमारत क्र. ………………………………
              सदनिका क्र. …………………………… चे इरादापत्र{"\n"}
              {"         "}मिळालेले आहे.{"\n"}
              {"\n"}
              {"         "}मी धार्मिक अल्पसंख्यांक प्रवर्गामध्ये अर्ज केला असून,
              माझा केंद्र शासनाच्या राष्ट्रीय अल्पसंख्यांक आयोग{"\n"}
              {"         "}अधिनियम - १९९२ च्या राजपत्रातील भाग २(क) मध्ये
              धार्मिक अल्पसंख्यांक म्हणून अधिसूचित केलेले मुस्लिम/{"\n"}
              {"         "}शीख/ ख्रिश्चन/ बौद्ध/ पारसी/ जैन या वर्गामध्ये समावेश
              होतो.{"\n"}
              {"\n"}
              {"         "}मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद
              माहिती खोटी किंवा चुकीची आढळल्यास{"\n"}
              {"         "}वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही
              प्रकारची हरकत राहणार नाही.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"         "}दिनांक : …………………………………………{"\n"}
              {"\n"}
              {"         "}ठिकाण :{""}
              {applicantDetails.City}
              {"                        "}स्वाक्षरी{"\n"}
              {"\n"}
              {"                                                        "}
              अर्जदाराचे नाव :{" "}
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}{" "}
              {"\n"}
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
