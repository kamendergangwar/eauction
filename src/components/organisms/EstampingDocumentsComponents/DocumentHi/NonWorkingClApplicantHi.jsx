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

function NonWorkingClApplicant({ applicantDetails, age }) {
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
          style={{ position: "absolute", left: "430.63px", top: "88.22px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <b>दिनांक</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "475.73px", top: "75.22px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>……………………………………</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "261.89px", top: "115.58px" }}
          className="cls_004"
        >
          <span className="cls_004">
            <b>स्वयं घोषणा पत्र</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "110.82px", top: "135.14px" }}
          className="cls_004"
        >
          <span className="cls_004">
            <b>
              <pre>
                {"\n"}
                {"      "}यदि आवेदक नौकरी/व्यवसाय नहीं कर रहा है
              </pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "185.66px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"      "}
              मैं {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}{" "}
              , आयु {age} वर्ष, ………………………, व्यवसाय
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "36.58px", top: "205.74px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"      "}
              ............,आवेदन संख्या {applicantDetails.ApplicantId}, रहेगा{" "}
              {applicantDetails.District} , {applicantDetails.State}
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "36.58px", top: "225.94px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"      "}
              ……………………………………………………………… सत्य प्रतिज्ञा पर घोषणा करता है कि
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "255.89px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"      "}
              मैं स्वयं वर्तमान में कहीं भी काम नहीं कर रहा हूं या कोई व्यवसाय
              नहीं कर रहा हूं।
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "36.58px", top: "275.94px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"            "}
              अतः वित्तीय वर्ष 2018-2019 के लिए मेरी आय निश्चित है
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "305.21px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"      "}
              मैं आगे कहता हूं कि मेरे परिवार में निम्नलिखित सदस्य हैं
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "465.39px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>{"   "}उपरोक्त जानकारी सत्य और सही है</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "495.31px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"    "}
              मैं आगे यह भी कहता हूं कि यदि उपरोक्त जानकारी गलत पाई जाती है
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "36.58px", top: "515.39px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"          "}
              तो भविष्य में की गई किसी भी कार्रवाई के लिए मैं जिम्मेदार रहूंगा
              और मैं सिडको{"\n"}
              {"          "}कॉर्पोरेशन पर किसी भी प्रकार की फटकार नहीं लगाऊंगा।
              इसी प्रकार मुझे{"\n"}
              {"          "}आवंटित मकान के निरस्तीकरण से कोई आपत्ति नहीं होगी।
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "585.71px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              सत्यप्रतिज्ञा की घोषणा आज दिनांक ……………/ …………/२० को नवी मुंबई में
              की गई
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "36.58px", top: "635.75px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>{"      "}दिनांक</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.54px", top: "635.75px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre> …………………………………</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "348.79px", top: "675.46px" }}
          className="cls_003"
        >
          <span className="cls_003">(</span>
        </div>
        <div
          style={{ position: "absolute", left: "510.60px", top: "675.46px" }}
          className="cls_003"
        >
          <span className="cls_003">)</span>
        </div>
        <div
          style={{ position: "absolute", left: "414.34px", top: "705.90px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>आवेदक</pre>
          </span>
        </div>
      </div>
      <div
        style={{ position: "absolute", left: "100.89px", top: "355.58px" }}
        className="cls_004"
      >
        <span className="cls_004">
          <table
            style={{ borderCollapse: "collapse", width: "117%" }}
            border={1}
          >
            <tbody>
              <tr>
                <td style={{ width: "11.8848%" }}>
                  <span style={{ fontWeight: 400 }}>क्र.सं.</span>
                </td>
                <td style={{ width: "39.8431%" }}>
                  <span style={{ fontWeight: 400 }}>नाम</span>
                </td>
                <td style={{ width: "17.2302%" }}>
                  <span style={{ fontWeight: 400 }}>रिश्तों</span>
                </td>
                <td style={{ width: "33.2302%" }}>
                  <span style={{ fontWeight: 400 }}>व्यापार/नौकरी आय</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "39.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "33.2302%" }}>&nbsp;</td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "39.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "43.2302%" }}>&nbsp;</td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "39.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "33.2302%" }}>&nbsp;</td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "39.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "33.2302%" }}>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </div>
  );
}

export default NonWorkingClApplicant;
