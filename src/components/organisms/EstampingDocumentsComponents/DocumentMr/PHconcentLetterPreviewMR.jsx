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
          height: 792,
          borderStyle: "outset",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 25, top: 0 }}>
          <div
            style={{ position: "absolute", left: "261.89px", top: "85.58px" }}
            className={classes.cls_004}
          >
            <span className={classes.cls_004}>
              <b>संमतीपत्र</b>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "72.58px", top: "155.66px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                मी श्री/श्रीमती.{" "}
                {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}{" "}
                अर्ज क्र. {applicantDetails.ApplicantId} सिडको
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "175.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                ऑनलाईन सोडत-2020 मधील दिव्यांग प्रवर्गातून यशस्वी अर्जदार आहे.
                सदर सोडतीत मला
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "195.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                इमारत क्र. ……………………… सदनिका क्र. ……………………………… सेक्टर- ………………………
                {"  "}योजना क्र.
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "215.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>…………………………………………………………… येथे सदनिका मिळाली आहे.</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "72.58px", top: "255.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>सदर सदनिकेबाबत मी खालीलप्रमाणे संमतीपत्र देत आहे. </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "305.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                अ){"  "}सदर सदनिकेमध्ये दिव्यांगांना अनुकुल शौचालय / स्नानगृह
                एकत्र करुन
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "325.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>{"    "}रॅम्प असणारी अशी रचना करुन देण्यात यावी.</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "345.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                ब{")"}
                {"  "}सदर सदनिकेच्या शौचालय / स्नानगृह मध्ये सर्व साधारण
                प्रवर्गाकरीता{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "365.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>{"    "}असणारी रचना करुन देण्यात यावी</pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "405.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"    "}वरील दिलेला पर्याय मला भविष्यात बदलता येणार नाही याबद्दल
                मला माहिती देण्यात
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "425.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                आली आहे. तसेच वरील पर्यायाबाबत भविष्यात माझी कोणतीही तक्रार
                राहणार नाही.
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "485.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>
                {"                                 "}अर्जदाराची स्वाक्षरी:
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
                {"                                 "}अर्जदाराचे नांव:{" "}
                {`${applicantDetails.FirstName} ${applicantDetails.LastName}`}{" "}
              </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "545.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>दिनांक: </pre>
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "36.58px", top: "565.74px" }}
            className={classes.cls_003}
          >
            <span className={classes.cls_003}>
              <pre>स्थळ:</pre>
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
