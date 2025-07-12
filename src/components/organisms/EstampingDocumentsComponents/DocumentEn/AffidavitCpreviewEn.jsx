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

function AffidavitCpreview({ applicantDetails, age }) {
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
          style={{ position: "absolute", left: "271.89px", top: "35.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>Sample - C</pre>
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
          style={{ position: "absolute", left: "121.89px", top: "75.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>(For low income group applicants only: Sample Form)</pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "121.89px", top: "81.58px" }}
          className={classes.cls_005}
        >
          <span className={classes.cls_005}>
            <pre>_____________________________________________</pre>
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
              {"                                                       "}
              (Rs.200 / - stamp duty notarized on paper){"\n"}
              {"                                                         "}
              (Non - Judicial Stamp Paper){"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {""}I / We Applicant Mr. / Mrs.{" "}
              {applicantDetails.FirstName + " " + applicantDetails.LastName} Age{" "}
              {age} years,
              {"\n"}
              {""}Application no. {applicantDetails.ApplicantId} I am a
              successful applicant for CIDCO Mahagrihanirman Yojana October -
              2019{"\n"}
              {""}Plan indicator no. ……………………………………………………… and building no.
              …………………………………………………… Flat No.{"\n"}
              {""}…………………………… letter of intent has been received.
              {"\n"}
              {"\n"}
              {""}I have lived in Maharashtra for 15 years in a row. Also I am
              working at …………………………… /{"\n"}
              {""}I have my own business ………………………… . My family income for
              financeial year 2018-19{"\n"}
              {"      "}is in between Rs. 3,00,001/- and Rs. 6,00,000/-. I write
              an affidavit stating that,
              {"\n"}
              {"\n"}
              {""}I declare that the house I currently live in does not belong
              to me but to a rented / joint family.{"\n"}
              {""}I further declare that there is no house in Navi Mumbai in my
              or my wife's / husband's name.
              {"\n"}
              {""}Also, neither I nor my spouse is a member of any Navi Mumbai
              Co-operative Housing Society.{"\n"}
              {"\n"}
              {""}I declare that I am a General / Scheduled Caste / Scheduled
              Tribe / Nomadic Tribe /{"\n"}
              {""}Deprived Tribe / State Government Employee / Navi Mumbai E
              Area Journalist / Blind or Physically Handicapped Person /{"\n"}
              {""}Project Worker / Ex-Serviceman / Security Force Personnel /
              Mathadi Worker / Religious minority CIDCO{"\n"}
              {""}employees belong to this category. (Mention the correct one)
              {"\n"}
              {"\n"}
              {""}I / we further state that the above information is true and
              correct.{"\n"}
              {"\n"}
              {""}I / we further state that if the above information is found to
              be incorrect{"\n"}
              {""}in future, I / we will be responsible for it and will not
              impose any penalty on CIDCO Corporation.
              {"\n"}
              {"\n"}
              {""}I / we further state that, if the above mentioned information
              is found to be false or incorrect{"\n"}
              {""}I / we will not have any objection to cancel the allotted
              house.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"} Signature / thumbprint of the applicant{"\n"}
              {"\n"} Date :{"                               "}Notary's signature
              / seal{"\n"}
              {"      "}Location :{"\n"}
              {"\n"} (This affidavit must be submitted by the successful
              beneficiaries along with the documents mentioned {"\n"} in the
              letter of intent during the application scrutiny process.){"\n"}
              {"      "}
              {"\n"}
              {"                        "}
            </pre>
          </span>
        </div>
        <div
          style={{ position: "absolute", left: "261.89px", top: "145.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <pre>
              <b>Affidavit</b>
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AffidavitCpreview;
