import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cls_003: {
      fontFamily: "Arial",
      fontSize: "15.1px",
      color: "rgb(0, 0, 0)",
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

function PHconcentLetterPreview({ applicantDetails, age }) {
  const classes = useStyles();
  return (
    <div>
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
        <div style={{ position: "absolute", left: 25, top: 0 }}>
          <div
            style={{ position: "absolute", left: "261.89px", top: "85.58px" }}
            className={classes.cls_004}
          >
            <span className={classes.cls_004}>
              <b>Consent form</b>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "72.58px", top: "155.66px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                I am Mr./Mrs.{" "}
                {applicantDetails.FirstName + " " + applicantDetails.LastName}{" "}
                Application no. {applicantDetails.ApplicantId} CIDCO
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "175.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                is a successful applicant from the Divyang category in leaving
                online 2020. In this draw,
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "195.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                I got building no. ……………………… Flat No. Flats at ………………………………
                Sector- ………………………{"  "}Scheme No.
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "215.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>…………………………………………………………… has received.</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "72.58px", top: "255.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>I am giving consent as follows regarding this flat. </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "305.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                अ){"  "}By combining toilets / bathrooms suitable for the
                disabled in this flat
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "325.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>{"    "}The ramp should be designed in such a way.</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "345.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                B{")"}
                {"  "}For all general category in the toilet / bathroom of this
                flat.
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "365.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>{"    "}I have been informed that the</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "405.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"    "}above option should not be changed in the future.
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "425.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                Also, I will not have any complaints about the above option in
                future.
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "485.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"                            "}Signature of the applicant:
                …………………………………………{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "505.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"                                 "}Name of Applicant:
                …………………………………………………{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "545.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>Date: </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "565.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>Location:</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "456.58px", top: "278.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"            "}
                <input type="checkbox" name="checkBox2" />
                {"\n"}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "456.58px", top: "348.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"              "}
                <input type="checkbox" name="checkBox3" />
                {"\n"}
              </pre>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PHconcentLetterPreview;
