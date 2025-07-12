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
        minHeight: 820,
        borderStyle: "outset",
        overflowX: "scroll",
      }}
    >
      <div style={{ position: "relative", left: 5, top: 0 }}>
        <div
          style={{ position: "absolute", left: "251.89px", top: "35.58px" }}
          className={classes.cls_004}
        >
          <span className={classes.cls_004}>
            <b>
              <pre>Sample - E</pre>
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
            <pre>(For Navi Mumbai area journalists)</pre>
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
              {"\n"} I / We Applicant Mr. / Mrs.{" "}
              {applicantDetails.FirstName + " " + applicantDetails.LastName} Age{" "}
              {age} years, application no.{applicantDetails.ApplicantId}
              {"\n"}
              {"         "}CIDCO Mahagrihanirman Yojana is a successful
              applicant in October-2019 and I have been given {"\n"}the scheme
              code no. ……………………………………………………… and building no. ……………………………… Flat
              No. Letter of intent has{"\n"} been received.{"\n"}
              {"\n"} I am working as a journalist in Navi Mumbai area and I am
              fully aware that it is mandatory to submit{"\n"} a photocopy of
              the certificate and identity card issued by the Director General,
              Information and Public{"\n"} Relations (DGIPR).
              {"\n"}
              {"\n"} My group includes editor / leader writer / news editor,
              news writer, copy tester, newscaster, cartoonist {"\n"} / news
              photographer, print investigator / freelance journalist from a
              reputed weekly / magazine or {"\n"} magazine.{"\n"} {"\n"}
              {"\n"} Also, I do not belong to this group of staff in the
              newspaper management and administration department
              {"\n"} as well as staff working as supervisors, staff working in
              the form of management.{"\n"}
              {"\n"} I / we further state that, if the above mentioned
              information is found to be false or incorrect,{"\n"} I / we will
              not have any objection to cancel the allotted house.{"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              {"  "}Date : …………………………………………{"\n"}
              {"\n"}
              {"  "}Location :…………………………………………
              {"                                    "}Signature{"\n"}
              {"\n"}
              {"  "}Name of the applicant{" "}
              {applicantDetails.FirstName + " " + applicantDetails.LastName}
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

export default AffidavitEpreview;
