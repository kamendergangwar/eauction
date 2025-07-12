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

function AffidavitBpreview({ applicantDetails, age }) {
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
      <div style={{ position: "absolute", right: 90, top: 0 }}>
        <div
          style={{ position: "absolute", left: "271.89px", top: "15.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>Sample-B</pre>
            </b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "271.89px", top: "25.58px" }}
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
            <b></b>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "150.89px", top: "65.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>{""}(For financially weaker applicants only: Sample form)</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "150.89px", top: "71.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>{""}__________________________________________________</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "0px", top: "75.66px" }}
          className={classes.cls_003}
        >
          <span className={classes.cls_003}>
            <pre>
              {"\n"}
              {"\n"} {"                                                    "}{" "}
              (Rs.200 / - stamp duty notarized on paper){"\n"}
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
              {"        "}I / We Applicant Mr. / Mrs.{" "}
              {applicantDetails.FirstName + " " + applicantDetails.LastName} Age{" "}
              {age} years,{"\n"}
              {"        "}Application no. {applicantDetails.ApplicantId} I am a
              successful applicant for CIDCO Mahagrihanirman Yojana October -
              {"\n"}
              {"        "} 2019 Plan indicator no. ……………………………………………………… and
              building no. …………………………………………………… Flat No.{"\n"}
              {"         "}…………………………… letter of intent has been received.
              {"\n"}
              {"         "}My application no. ……………………………………………………… dated
              ……………………………………………{"  "}under Pradhan{"\n"}
              {"         "}mantri awas Yojana get an house under the scheme.
              Writing an affidavit stating that,{"\n"}
              {"         "}My / our family has the following members.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"         "}I/ we further write that I/we and my/ ours family
              mentioned above{"\n"}
              {"         "}don't own any pucca house anywhere in India.
              {"\n"}
              {"         "}I declare that I am General / Scheduled Castes /
              Scheduled Tribes Nomadic Tribes /{"\n"}
              {"         "}Deprived Tribes / State Government Employees / Navi
              Mumbai E Area Journalists / Blind or Physically{"\n"}{" "}
              {"         "}Handicapped Individuals / project victims /
              ex-servicemen / security personnel / Mathadi workers / {"\n"}
              {"         "}religious minorities
              {"  "}is in the category (the right one should be mentioned).
              {"\n"}
              {"         "}I have lived in Maharashtra for 15 years in a row.
              Also I am working at …………………………… /{"\n"}
              {"         "}I have my own business ………………………… . My family income
              for financeial year 2018-19 is Rs. 3,00,000/-.{"\n"}
              {"         "}I / we further state that the above information is
              true and correct.{"\n"}
              {"         "}I / we further state that, if the above information
              is found to be incorrect{"\n"}
              {"         "}in future, I / we will be responsible for it and will
              not impose any penalty on CIDCO Corporation.{"\n"}
              {"         "}I / we further state that, if the above mentioned
              information is found to be false or incorrect{"\n"}
              {"         "}I have no objection to cancel the allotted hous.
              {"\n"}
              {"\n"}
              {"\n"}
              {"         "}Signature/ thumbprint of the applicant{"\n"}
              {"\n"}
              {"         "}Date :
              {"                                                    "}Notary's
              signature / seal{"\n"}
              {"         "}Location :{"\n"}
              {"         "}(This affidavit must be submitted by the successful
              beneficiaries along with the documents{"\n"} {"         "}
              mentioned in the letter of intent during the application scrutiny
              process.)
              {"\n"}
              {"              "}
              {"\n"}
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
              style={{ borderCollapse: "collapse", width: "95%" }}
              border={1}
            >
              <tbody>
                <tr>
                  <td style={{ width: "11.8848%" }}>
                    <span style={{ fontWeight: 400 }}>S.No.</span>
                  </td>
                  <td style={{ width: "46.8431%" }}>
                    <span style={{ fontWeight: 400 }}>Names of members</span>
                  </td>
                  <td style={{ width: "26.2302%" }}>
                    <span style={{ fontWeight: 400 }}>
                      Relationship with the applicant
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>&nbsp;</td>
                  <td style={{ width: "26.2302%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>&nbsp;</td>
                  <td style={{ width: "26.2302%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "11.8848%" }}>&nbsp;</td>
                  <td style={{ width: "46.8431%" }}>&nbsp;</td>
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
                {"   "}Affidavit
              </h4>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitBpreview;
