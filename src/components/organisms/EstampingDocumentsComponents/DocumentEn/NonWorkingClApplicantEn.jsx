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
        minHeight: 820,
        borderStyle: "outset",
        overflowX: "scroll",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <div
          style={{ position: "absolute", left: "430.63px", top: "88.22px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <b>Date</b>
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
            <b>Self declaration</b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "110.82px", top: "135.14px" }}
          className="cls_004"
        >
          <span className="cls_004">
            <b>
              <pre>
                {"      "}(If the applicant is not doing job / business)
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
              {"      "}I{" "}
              {`${applicantDetails.FirstName} ${applicantDetails.LastName}`} ,
              age {age} year, ………………………, occupation
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
              ............,application No. {applicantDetails.ApplicantId}, stay{" "}
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
              ………………………………………………………………declares on the pledge that, I myself am
              not
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
              currently working anywhere or doing any business.
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
              Therefore, my income for the financial year 2018-2019 is fixed.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "305.21px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"      "}I further state that I have the following members in my
              family.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "465.39px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>{"   "}The above information is true and correct.</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "495.31px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>
              {"    "}I further state that if the above information is found to
              be
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
              incorrect in the future, I will be responsible for the action
              taken and will not impose{"\n"}
              {"          "}any penalty on CIDCO Corporation. I will have no
              objection to the cancellation{"\n"}
              {"          "}of the allotted house in the same way.
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "72.58px", top: "585.71px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>Pledge is taken today on ……………/ …………/2020 in Navi Mumbai.</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "36.58px", top: "635.75px" }}
          className="cls_003"
        >
          <span className="cls_003">
            <pre>{"      "}Date</pre>
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
            <pre>Applicant</pre>
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
                  <span style={{ fontWeight: 400 }}>S.No.</span>
                </td>
                <td style={{ width: "39.8431%" }}>
                  <span style={{ fontWeight: 400 }}>Name</span>
                </td>
                <td style={{ width: "17.2302%" }}>
                  <span style={{ fontWeight: 400 }}>Relationships</span>
                </td>
                <td style={{ width: "33.2302%" }}>
                  <span style={{ fontWeight: 400 }}>Business / job income</span>
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
