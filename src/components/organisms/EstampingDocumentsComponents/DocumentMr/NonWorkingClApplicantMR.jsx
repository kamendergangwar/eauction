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
            <b>स्वयंघोषणापत्र</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "110.82px", top: "135.14px" }}
          className="cls_004"
        >
          <span className="cls_004">
            <b>
              <pre>{"      "}(अर्जदार नोकरी/व्यवसाय करित नसल्यास)</pre>
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
              मी सो/श्री.{" "}
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`} ,
              वय {age} वर्ष, ………………………, व्यवसाय
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
              ............,अर्ज क्र. {applicantDetails.ApplicantId}, राहणार{" "}
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
              ……………………………………………………………… सत्य प्रतिज्ञेवर असे घोषीत करिते/करितो
              की,
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
              मी स्वत: सध्या कोठेही न नोकरी करत नाही किंबा कोणताही व्यबसाय करत
              नाही.
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
              त्यामुळे माझे सन २०१८ - २०१९ या आर्थिक वर्षचे उत्पन्न निरंक आहे
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
              मी यापुढे असे जाहीर करते की/ करतो की, माझ्या परिवारात खालील सदस्य
              आहेत
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "465.39px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>{"   "}वर नमूद केलेली माहिती खरी व बरोबर आहे</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "495.31px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"    "}
              मी यापुढे असे कथन करिते की/करितो की, वर दिलेली माहिती भविष्यात जर
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
              चुकीची आढळल्यास होणार्‍या कारवाईस मी जबाबदार राहिन आणि सिडको
              महामंडळास{"\n"}
              {"          "}कोणत्याही प्रकारची तोषीस लागू देणार नाही.
              त्याचप्रकारे वाटप करण्यात आलेले घर रद्द{"\n"}
              {"          "}करण्याबाबत माझी कोणत्याही प्रकारची हरकत राहणार नाही.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "585.71px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              सत्यप्रतिज्ञेवर आज दिनांक ……………/ …………/२० रोजी नवी मुंबई येथे जाहीर
              केले असे
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
            <pre>अर्जदार</pre>
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
                  <span style={{ fontWeight: 400 }}>अ.क्र.</span>
                </td>
                <td style={{ width: "39.8431%" }}>
                  <span style={{ fontWeight: 400 }}>नांव</span>
                </td>
                <td style={{ width: "17.2302%" }}>
                  <span style={{ fontWeight: 400 }}>नाते</span>
                </td>
                <td style={{ width: "33.2302%" }}>
                  <span style={{ fontWeight: 400 }}>
                    यवसाय/ नोकरीचे उत्पन्न
                  </span>
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
