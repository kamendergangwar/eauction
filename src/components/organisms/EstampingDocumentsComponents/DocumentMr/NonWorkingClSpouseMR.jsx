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
            <b>स्वयंघोषणापत्र</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "70.82px", top: "135.14px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>(अर्जदाराची पती/पत्नी नोकरी/व्यवसाय करित नसल्यास)</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "185.66px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              मी सो/श्री.{" "}
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}, वय
              {age} वर्ष, ………………………, व्यवसाय
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "205.74px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              ………………………, अर्ज क्र. {applicantDetails.ApplicantId}, राहणार{" "}
              {applicantDetails.District} , {applicantDetails.State}
              {""}
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "225.94px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              ……………………………………………………………… सत्य प्रतिज्ञेवर असे घोषीत करिते/करितो
              की,
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "255.89px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              माझे पती/पत्नी श्री./सौ. …………………………………………………………………… सध्या कोठेही
              नोकरी
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "275.97px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              करत नाही किंवा कोणताही व्यवसाय करत नाही. त्यामुळे सन २०२० - २०२१
              या आर्थिक{"\n"}
              {"                    "}वर्षाचे उत्पन्न निरंक आहे.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "325.21px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              मी यापुढे असे जाहीर करते की/ करतो की, माझ्या परिवारात खालील सदस्य
              आहेत
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "485.39px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>वर नमूद केलेली माहिती खरी व बरोबर आहे</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "515.31px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              मी यापुढे असे कथन करिते की/करितो की, वर दिलेली माहिती भविष्यात जर
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "535.39px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              चुकीची आढळल्यास होणार्‍या कारवाईस मी जबाबदार राहिन आणि सिडको
              महामंडळास{"\n"}
              {""}कोणत्याही प्रकारची तोषीस लागू देणार नाही. त्याचप्रकारे वाटप
              करण्यात आलेले घर रद्द{"\n"}
              {""}करण्याबाबत माझी कोणत्याही प्रकारची हरकत राहणार नाही.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "605.71px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              सत्यप्रतिज्ञेवर आज दिनांक ……………/ …………/२० रोजी नवी मुंबई येथे जाहीर
              केले असे
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
            <pre>अर्जदार</pre>
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
                  <span style={{ fontWeight: 400 }}>नांव</span>
                </td>
                <td style={{ width: "17.2302%" }}>
                  <span style={{ fontWeight: 400 }}>नाते</span>
                </td>
                <td style={{ width: "40.2302%" }}>
                  <span style={{ fontWeight: 400 }}>
                    यवसाय/ नोकरीचे उत्पन्न
                  </span>
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
