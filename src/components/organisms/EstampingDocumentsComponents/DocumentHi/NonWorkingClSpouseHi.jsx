import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cls_003: {
      fontFamily: "Arial",
      fontSize: "15.1px",
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

function NonWorkingClSpouse({ applicantDetails, age }) {
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
      <div style={{ position: "absolute", left: 5, top: 0 }}>
        <div
          style={{ position: "absolute", left: "430.63px", top: "88.22px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <b>दिनांक</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "475.73px", top: "75.22px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>……………………………………</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "261.89px", top: "115.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>स्वयं घोषित</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "70.82px", top: "135.14px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>(यदि आवेदक का पति/पत्नी नौकरी/व्यवसाय नहीं कर रहा है)</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "185.66px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              मैं सोता/मि.{" "}
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`},
              आयु {age} वर्ष, ………………………, पेशा
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "205.74px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              ………………………, आवेदन संख्या। ……………………………………, रहेगा
              ………………………………………………………………
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "225.94px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              ……………………………………………………………… सच्ची प्रतिज्ञा पर घोषणा करता है कि,
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "255.89px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              मेरे पति/पत्नी श्री/श्रीमती. …………………………………………………………………… अभी कहीं
              भी नौकरी
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "275.97px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              कोई व्यवसाय नहीं करता है या नहीं करता है। इसलिए वित्तीय वर्ष
              २०२०-२०२१{"\n"}
              {"                    "}वर्ष के लिए आय निश्चित है.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "325.21px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>मैं आगे कहता हूं कि मेरे परिवार में निम्नलिखित सदस्य हैं</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "485.39px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>उपरोक्त जानकारी सत्य और सही है</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "515.31px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              मैं आगे कहता हूं कि यदि भविष्य में उपरोक्त जानकारी दी जाती है
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "535.39px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              गलत पाये जाने पर की गई कार्यवाही एवं सिडको कार्पोरेशन के लिए मैं
              स्वयं जिम्मेदार होऊंगा{"\n"}
              {""}किसी भी प्रकार की तोषी नहीं लगायेंगे। इसी तरह रद्द आवंटित मकान
              {"\n"}
              {""}मुझे ऐसा करने में कोई आपत्ति नहीं है.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "605.71px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              सत्यप्रतिज्ञा पर आज ……………/ …………/२० नवी मुंबई में घोषणा की गई थी
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "635.75px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>दिनांक</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.54px", top: "635.75px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre> …………………………………</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "348.79px", top: "675.46px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>(</span>
        </div>
        <div
          style={{ position: "absolute", left: "510.60px", top: "675.46px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>)</span>
        </div>
        <div
          style={{ position: "absolute", left: "414.34px", top: "705.90px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>आवेदक</pre>
          </span>
        </div>
      </div>
      <div
        style={{ position: "absolute", left: "80.89px", top: "372.58px" }}
        className={classes.cls_004}
      >
        <span className={classes.cls_004}>
          <table
            style={{ borderCollapse: "collapse", width: "139%" }}
            border={1}
          >
            <tbody>
              <tr>
                <td style={{ width: "11.8848%" }}>
                  <span style={{ fontWeight: 400 }}>अ.क्र.</span>
                </td>
                <td style={{ width: "32.8431%" }}>
                  <span style={{ fontWeight: 400 }}>नाम</span>
                </td>
                <td style={{ width: "17.2302%" }}>
                  <span style={{ fontWeight: 400 }}>रिश्तों</span>
                </td>
                <td style={{ width: "40.2302%" }}>
                  <span style={{ fontWeight: 400 }}>व्यापार/नौकरी आय</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "32.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "40.2302%" }}>&nbsp;</td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "32.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "40.2302%" }}>&nbsp;</td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "32.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "40.2302%" }}>&nbsp;</td>
              </tr>
              <tr>
                <td style={{ width: "11.8848%" }}>&nbsp;</td>
                <td style={{ width: "32.8431%" }}>&nbsp;</td>
                <td style={{ width: "17.2302%" }}>&nbsp;</td>
                <td style={{ width: "40.2302%" }}>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </div>
  );
}

export default NonWorkingClSpouse;
