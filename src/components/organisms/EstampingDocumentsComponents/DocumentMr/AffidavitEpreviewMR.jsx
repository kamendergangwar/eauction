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
              <pre>नमुना - E</pre>
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
            <pre>(नवी मुंबई क्षेत्रातील पत्रकारांकरिता)</pre>
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
              {"         "}मी नवी मुंबई क्षेत्रात पत्रकार म्हणून कार्यरत असून,
              महासंचालक, माहिती व जनसंपर्क (DGIPR) यांनी{"\n"}
              {"         "}दिलेले प्रमाणपत्र व ओळखपत्राची छायांकित प्रत जमा करणे
              बंधनकारक असल्याची मला पूर्णपणे जाणीव आहे.{"\n"}
              {"\n"}
              {"         "}माझा वर्तमानपत्राच्या आस्थापनेवरील अथवा
              वर्तमानपत्राशी संबंधित संपादक/ लिडर रायटर/ वृत्त संपादक,{"\n"}
              {"         "}वृत्त लेखक, कॉपी टेस्टर, वार्ताहर, व्यंगचित्रकार/
              वृत्त छायाचित्रकार, मुद्रित तपासणीस/ प्रख्यात साप्ताहिक/{"\n"}
              {"         "}मासिक वा नियतकालिका मधील मुक्त पत्रकार या गटामध्ये
              समावेश होतो.{"\n"}
              {"\n"}
              {"         "}तसेच वृत्तपत्र व्यवस्थापन व प्रशासन विभागातील
              कर्मचारी तसेच पर्यवेक्षक म्हणून काम करणारे कर्मचारी,
              {"\n"}
              {"         "}व्यवस्थापन स्वरूपाचे काम करणारे कर्मचारी या गटामध्ये
              माझा समावेश होत नाही.{"\n"}
              {"\n"}
              {"         "}मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद
              माहिती खोटी किंवा चुकीची आढळल्यास{"\n"}
              {"         "}वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही
              प्रकारची हरकत राहणार नाही.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"          "}दिनांक : …………………………………………{"\n"}
              {"\n"}
              {"          "}ठिकाण :…………………………………………
              {"                                   "}स्वाक्षरी{"\n"}
              {"\n"}
              {"          "}अर्जदाराचे नाव ……………………………{"\n"}
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
