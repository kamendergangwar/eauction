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
        minHeight: 820,
        borderStyle: "outset",
        overflowX: "scroll",
      }}
    >
      <div style={{ position: "absolute", left: 5, top: 0 }}>
        <div
          style={{ position: "absolute", left: "430.63px", top: "88.22px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <b>Date</b>
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
            <b>Self declaration</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "70.82px", top: "135.14px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>(If the applicant's spouse is not doing job / business)</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "185.66px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              I {applicantDetails.FirstName + " " + applicantDetails.LastName},
              age {age} years, ………………………, occupation
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "205.74px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              ………………………, Application no. {applicantDetails.ApplicantId} will
              stay ………………………………………………………………
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "225.94px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              ……………………………………………………………… Satya declares on the pledge that my
              husband /
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "255.89px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre> wife Shri./Sou …………………………………………………………………… currently not</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "275.97px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              working anywhere or doing any business. Therefore, the income for
              the financial year{"\n"}
              {"                    "}2020-2021 is fixed.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "325.21px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              I further state that the following members of my family are true
              and correct.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "485.39px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>I further state that if the above</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "515.31px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              information is found to be incorrect in the future, I will be
              responsible
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "535.39px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              for the action taken and will not impose any penalty on CIDCO
              Corporation.{"\n"}
              {""}will have no objection to the cancellation of the allotted
              {"\n"}
              {""}house in the same way.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "100.58px", top: "605.71px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              Satyapratigevar today date ……………/ …………/20 was announced in Navi
              Mumbai on
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "80.58px", top: "635.75px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>Date</pre>
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
            <pre>Applicant</pre>
          </span>
        </div>
      </div>
      <div
        style={{ position: "absolute", left: "80.89px", top: "372.58px" }}
        className={classes.cls_004}
      >
        <span className={classes.cls_004}>
          <table
            style={{ borderCollapse: "collapse", width: "117%" }}
            border={1}
          >
            <tbody>
              <tr>
                <td style={{ width: "11.8848%" }}>
                  <span style={{ fontWeight: 400 }}>S.No..</span>
                </td>
                <td style={{ width: "32.8431%" }}>
                  <span style={{ fontWeight: 400 }}>Name</span>
                </td>
                <td style={{ width: "17.2302%" }}>
                  <span style={{ fontWeight: 400 }}>Relationships</span>
                </td>
                <td style={{ width: "40.2302%" }}>
                  <span style={{ fontWeight: 400 }}>Business / job income</span>
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
