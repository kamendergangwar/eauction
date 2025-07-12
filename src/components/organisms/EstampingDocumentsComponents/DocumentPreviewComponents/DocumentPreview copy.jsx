import React, { useEffect, useState } from "react";
import AffidavitBpreviewMR from "../DocumentMr/AffidavitBpreviewMR";
import AffidavitDpreviewMR from "../DocumentMr/AffidavitDpreviewMR";
import AffidavitCpreviewMR from "../DocumentMr/AffidavitCpreviewMR";
import AffidavitFpreviewMR from "../DocumentMr/AffidavitFpreviewMR";
import PHconcentLetterPreviewMR from "../DocumentMr/PHconcentLetterPreviewMR.jsx";
import NonWorkingClApplicantMR from "../DocumentMr/NonWorkingClApplicantMR";
import AffidavitEpreviewMR from "../DocumentMr/AffidavitEpreviewMR";
import AffidavitEpreviewHi from "../DocumentHi/AffidavitEpreviewHi";
import AffidavitBpreviewHi from "../DocumentHi/AffidavitBpreviewHi";
import AffidavitCPreviewHI from "../DocumentHi/AffidavitCpreviewHi";
import AffidavitDpreviewHi from "../DocumentHi/AffidavitDpreviewHi";
import AffidavitFpreviewHi from "../DocumentHi/AffidavitFpreviewHi";
import PHconcentLetterPreviewHi from "../DocumentHi/PHconcentLetterPreviewHi";
import NonWorkingClSpouseHi from "../DocumentHi/NonWorkingClSpouseHi";
import AffidavitBpreviewEn from "../DocumentEn/AffidavitBpreviewEn";
import NonWorkingClApplicantEn from "../DocumentEn/NonWorkingClApplicantEn";
import NonWorkingClApplicantHi from "../DocumentHi/NonWorkingClApplicantHi";
import AffidavitEpreviewEn from "../DocumentEn/AffidavitEpreviewEn";
import AffidavitCpreviewEn from "../DocumentEn/AffidavitCpreviewEn";
import AffidavitDpreviewEn from "../DocumentEn/AffidavitDpreviewEn";
import AffidavitFpreviewEn from "../DocumentEn/AffidavitFpreviewEn";
import PHconcentLetterPreviewEn from "../DocumentEn/PHconcentLetterPreviewEn";
import NonWorkingClSpouseEn from "../DocumentEn/NonWorkingClSpouseEn";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NonWorkingClSpouseMR from "../DocumentMr/NonWorkingClSpouseMR";
import Button from "@material-ui/core/Button";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EstampingAgreementPage from "../../../pages/EstampingAgreementPage/EstampingAgreementPage";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  generateEstamping,
  estampingDocumentSelector,
} from "../../../../redux/features/file/EstampingDocSlice";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getFamilyMembers,
  familyMemberSelector,
} from "../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import {
  eStampingSelector,
  getEstampSummary,
  addDocforEstamping,
} from "../../../../redux/features/transaction/EstampingSlice";
import Loading from "../../../atoms/Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    width: "100%",
    height: "72vh",
    overflowY: "scroll",
  },
  docs: {
    margin: 5,
  },
  topbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  sideBtn: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btn: {
    borderRadius: "12px",
  },
  head: {
    marginTop: 6,
  },
}));

function DocumentPreview() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [applicantDetails, setApplicantDetails] = useState({});
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [familyData, setFamilyData] = useState({});
  const [reservationCategory, setReservationCategory] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [agreement, setAgreement] = useState(false);
  const [imgSource, setImgSource] = useState("");
  const getBase64 = (doc) => {
    let buff = new Buffer(doc);
    let stringToBase64 = buff.toString("base64");
    return stringToBase64;
  };

  const { isSuccessResApplicant, applicantData, isFetchingApplicant } =
    useSelector(applicantSelector);

  const { isSuccessFamilyMembers, familyMembersData } =
    useSelector(familyMemberSelector);

  const { estampData } = useSelector(estampingDocumentSelector);

  const {
    currentEstamping,
    reservationCat,
    isSuccessReqEstamping,
    documentForEstamping,
  } = useSelector(eStampingSelector);

  useEffect(() => {
    if (familyMembersData?.length > 0) {
      // console.log(familyMembersData);
      setFamilyData(familyMembersData);
    }
  }, [familyMembersData]);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getFamilyMembers());
    dispatch(addDocforEstamping([]));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessResApplicant) {
      if (applicantData) {
        setApplicantDetails(applicantData);
        const DOB = applicantDetails.DOB && applicantDetails.DOB.slice(-4);
        const intDOB = DOB && parseInt(DOB);
        setDob(intDOB);
        setAge(new Date().getFullYear() - intDOB);
      }
    }
  }, [isSuccessResApplicant, applicantData, applicantDetails.DOB]);
  // useEffect(() => {
  //   if (isSuccessFamilyMembers) {
  //     setFamilyData(familyMembersData);
  //   }
  // }, [familyMembersData, isSuccessFamilyMembers]);

  useEffect(() => {
    if (isSuccessResApplicant) {
      // dispatch(clearDocforEstamping())
      setReservationCategory([]);
      if (applicantData.RservationCatIds) {
        const tempReservationCategory = applicantData.RservationCatIds.split(",");
        tempReservationCategory.forEach((element) => {
          if (element === 7) {
            setReservationCategory((prevData) => [...prevData, element]);
          }
          if (element === 8) {
            setReservationCategory((prevData) => [...prevData, element]);
          }
          if (element === 9) {
            setReservationCategory((prevData) => [...prevData, element]);
          }
          if (element === 10) {
            setReservationCategory((prevData) => [...prevData, element]);
          }
          if (element === 11) {
            setReservationCategory((prevData) => [...prevData, element]);
          }
          if (element === 12) {
            setReservationCategory((prevData) => [...prevData, element]);
          }
          if (element === 13) {
            setReservationCategory((prevData) => [...prevData, element]);
          }
        });
      }
    }
  }, [isSuccessResApplicant, applicantData, dispatch]);

  useEffect(() => {
    if (isSuccessResApplicant) {
      // dispatch(clearDocforEstamping());
      dispatch(getEstampSummary());
    }
  }, [dispatch, isSuccessResApplicant]);

  useEffect(() => {
    if (isSuccessReqEstamping) {
      // dispatch(clearDocforEstamping());
      // dispatch(clearDocforEstamping());
      currentEstamping.forEach((data) => {
        let tempArray = [];
        reservationCategory.forEach((element) => {
          if (element === 7) {
            tempArray.push(data[3]);
          }
          if (element === 11) {
            tempArray.push(data[6]);
          }
        });
        if (applicantData && applicantData.IncomeGroup === "1") {
          tempArray.push(data[0]);
        }
        if (applicantData && applicantData.IncomeGroup === "2") {
          tempArray.push(data[1]);
        }
        if (
          applicantData &&
          applicantData.CasteCatId !== "1" &&
          applicantData.CasteCatId !== "0"
        ) {
          tempArray.push(data[5]);
        }
        tempArray.push(data[2]);
        dispatch(addDocforEstamping(tempArray));
        tempArray = [];
      });
      // console.log(reservationCat);
    }
    // else {
    //   console.log("no data");
    // }
  }, [isSuccessReqEstamping, reservationCategory]);

  useEffect(() => {
    if (documentForEstamping?.length > 0) {
      const doc = documentForEstamping.map((estamp) => estamp.EstampId);
      setDocuments(doc);
      // console.log(documentForEstamping);
      // console.log(documents);
    }
  }, [documentForEstamping]);

  const Lang = localStorage.getItem("i18nextLng");

  const isAffidavitB = documents.some((element) => element == 1);
  const isAffidavitC = documents.some((element) => element == 2);
  const isAffidavitD = documents.some((element) => element == 4);
  const isAffidavitE = documents.some((element) => element == 5);
  const isAffidavitF = documents.some((element) => element == 6);
  const isPhConcentLetter = documents.some((element) => element == 7);
  const isNonWorkingApplicantCl = documents.some((element) => element == 8);

  const affidavitB =
    isAffidavitB &&
    `<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style type="text/css">
      span.cls_003 {
        font-family: Arial, serif;
        font-size: 12px;
        color: rgb(0, 0, 0);
        font-weight: normal;
        font-style: normal;
        text-decoration: none;
      }
      span.cls_005 {
        font-family: Arial, serif;
        font-size: 14px;
        color: rgb(0, 0, 0);
        font-weight: normal;
        font-style: normal;
        text-decoration: none;
      }
      div.cls_004 {
        font-family: Arial, serif;
        font-size: 20.1px;
        color: rgb(0, 0, 0);
        font-weight: normal;
        font-style: normal;
        text-decoration: none;
      } 
    </style>
  </head>
  <body>
    <div
      style="
        position: absolute;
        left: 50%;
        margin-left: -306px;
        top: 0px;
        width: 612px;
        height: 792px;
        border-style: outset;
        overflow: hidden;
      "
    >
      <div style="position: absolute; left: 0px; top: 0px; bottom: 0; right: 0">
        <div
          style="position: absolute; left: 271.89px; top: 35.58px"
          class="cls_004"
        >
          <span class="cls_004"
            ><b><pre>नमुना- B</pre></b></span
          >
        </div>
        <div
          style="position: absolute; left: 271.89px; top: 45.58px"
          class="cls_004"
        >
          <span class="cls_004"
            ><b><pre>________</pre></b></span
          >
        </div>
        <div
          style="position: absolute; left: 271.89px; top: 45.58px"
          class="cls_004"
        >
          <span class="cls_004"
            ><b><pre>________</pre></b></span
          >
        </div>
        <div
          style="position: absolute; left: 121.89px; top: 75.58px"
          class="cls_005"
        >
          <span class="cls_005">
            <pre>
(केवळ आर्थिकदृष्टया दुर्बल घटक या अर्जदारांकरीता : नमूना फॉर्म)</pre
            >
          </span>
        </div>
        <div
          style="position: absolute; left: 121.89px; top: 81.58px"
          class="cls_005"
        >
          <span class="cls_005">
            <pre>__________________________________________________</pre>
          </span>
        </div>
        <div
          style="position: absolute; left: 36.58px; top: 85.66px"
          class="cls_003"
        >
          <span class="cls_003">
            <pre>
   
                                
                                            (रु.२००/- मुठ्रांक शुल्क पेपरवर नोटरींकरून)
                                                (Non - Judicial Stamp Paper)


                                
    मी/आम्ही अर्जदार श्री./श्रीमती. ${applicantDetails.FirstName} ${applicantDetails.LastName} वय ${age} वर्षे,
अर्ज क्र. ${applicantDetails.ApplicantId} 






    
    मी / आम्ही पुढे असेही लिहून देतो की, माझे / आमचे व माझ्या/आमच्या वर उपरोक्त नमूद केलेल्या 
परिवारातील सदस्यांच्या मालकीचे भारतात कोठेही पक्के घर नाही.
    मी असे जाहीर करतो/करते की, मी सर्वसाधारण / अनुसूचित जाती/ अनुसूचित जमाती/भटक्या जमाती/
विमक्त/जमाती/ राज्य शासनाचे कर्मचार/ नवी मुंबई ई क्षेत्रातील पत्रकार/ अंध किंवा शारिरीक दृष्टया विकलांग
व्यक्ती/ प्रकल्पग्नस्त / माजी सैनिक / सुरक्षादलातील कर्मचारी / माथाडी कामगार / धार्मिक अल्पसंख्याक या 
प्रवर्गातील आहे (यापैकी योग्य ती नमूद करावे).
    माझे/ आमचे महाराष्ट्रात सलग १५ वर्ष वास्तव्य आहे. तसेच मी …………………………… येथे नोकरी करीत आहे/
माझा स्वतःचा ………………………… व्यवसाय आहे. आर्थिक वर्ष २०१८ - १९ करिता माझे सर्व मार्गानी मिळून वार्षिक
कौटुंबिक उत्पन्न रु. ३,००,०००/- पर्यंत आहे.
    मी/आम्ही पुढे असेही लिहून देतो की, वर नमूद केलेली माहिती ही खरी व बरोबर आहे.
    मी/आम्ही पुढे असे कथन करतो की, वर दिलेली माहिती भविष्यात जर चुकीची आढळल्यास होणाऱ्या
कारवाईस मी/आम्ही त्यास जबाबदार राहू व सिडको महामंडळास कोणत्याही प्रकारची तोशीस लागू देणार नाही.
    मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद माहिती खोटी किंवा चुकीची आढळल्यास 
वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही प्रकारची हरकत नाही.


                                                            अर्जदाराची सही/अंगठा
 
दिनांक :                                                    नोटरी यांची सही / शिक्का
ठिकाण :
(हे प्रतिज्ञापत्र यशस्वी लाभार्थ्यांनी इरादापत्रामध्ये नमूद केलेल्या कागदपत्रांसोबत अर्जाच्या छाननी प्रक्रीयेवेळी सादर
 करणे जरुरी आहे.)
</pre
            >
          </span>
        </div>
        <div
          style="position: absolute; left: 36.89px; top: 315.58px"
          class="cls_004"
        >
          <span class="cls_004">
            <table
              style="border-collapse: collapse; width: 310.9579%"
              border="1"
            >
              <tbody>
                <tr>
                  <td style="width: 11.8848%">
                    <span style="font-weight: 400">अ.क्र.</span>
                  </td>
                  <td style="width: 46.8431%">
                    <span style="font-weight: 400">सदस्यांची नावे</span>
                  </td>
                  <td style="width: 26.2302%">
                    <span style="font-weight: 400">अर्जदाराशी नाते</span>
                  </td>
                </tr>
                <tr>
                  <td style="width: 11.8848%">&nbsp;</td>
                  <td style="width: 46.8431%">&nbsp;</td>
                  <td style="width: 26.2302%">&nbsp;</td>
                </tr>
                <tr>
                  <td style="width: 11.8848%">&nbsp;</td>
                  <td style="width: 46.8431%">&nbsp;</td>
                  <td style="width: 26.2302%">&nbsp;</td>
                </tr>
                <tr>
                  <td style="width: 11.8848%">&nbsp;</td>
                  <td style="width: 46.8431%">&nbsp;</td>
                  <td style="width: 26.2302%">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>

        <div
          style="position: absolute; left: 261.89px; top: 145.58px"
          class="cls_004"
        >
          <span class="cls_004">
            <pre><b>प्रतिज्ञापत्र</b></pre>
          </span>
        </div>
      </div>
    </div>
  </body>
</html>
`;

  const affidavitC =
    isAffidavitC &&
    `<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style type="text/css">
      
      span.cls_003{font-family:Arial,serif;font-size:12px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
      span.cls_005{font-family:Arial,serif;font-size:14px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
      div.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
      
    </style>
  </head>
  <body>
    <div
      style="
        position: absolute;
        left: 50%;
        margin-left: -306px;
        top: 0px;
        width: 612px;
        height: 792px;
        border-style: outset;
        overflow: hidden;
      "
    >
      <div style="position: absolute; left: 0px; top: 0px">
        <div
          style="position: absolute; left: 271.89px; top: 35.58px"
          class="cls_004"
        >
          <span class="cls_004"
            ><b><pre>नमुना - C</pre></b></span
          >
        </div>
        <div
          style="position: absolute; left: 271.89px; top: 45.58px"
          class="cls_004"
        >
          <span class="cls_004"
            ><b><pre>________</pre></b></span
          >
        </div>
        <div
          style="position: absolute; left: 271.89px; top: 45.58px"
          class="cls_004"
        >
          <span class="cls_004"
            ><b><pre>________</pre></b></span
          >
        </div>
        <div
          style="position: absolute; left: 121.89px; top: 75.58px"
          class="cls_005"
        >
          <span class="cls_005">
            <pre>(केवळ अल्प उत्पन्न गटातील अर्जदारांकरीता : नमूना फॉर्म)</pre>
          </span>
        </div>
        <div
          style="position: absolute; left: 121.89px; top: 81.58px"
          class="cls_005"
        >
          <span class="cls_005">
            <pre>_____________________________________________</pre>
          </span>
        </div>
        <div
          style="position: absolute; left: 36.58px; top: 85.66px"
          class="cls_003"
        >
          <span class="cls_003">
            <pre>
   
                                
                                            (रु.२००/- मुठ्रांक शुल्क पेपरवर नोटरींकरून)
                                                (Non - Judicial Stamp Paper)


                                
    मी/आम्ही अर्जदार श्री./श्रीमती. ${applicantDetails.FirstName} ${applicantDetails.LastName} वय ${age} वर्षे,
अर्ज क्र.${applicantDetails.ApplicantId} सिडको महागृहनिर्माण योजना ऑक्टोबर - २०१९ मधील यशस्वी अर्जदार असून मला
योजना संकेताक क्र. ………………………………………………………… व इमारत क्र. …………………………………………………… सदनिका क्र.
…………………………… चे इरादापत्र मिळालेले आहे.

    माझे/ आमचे महाराष्ट्रात सलग १५ वर्ष वास्तव्य आहे. तसेच मी ………………………… येथे नोकरी करीत आहे/
माझा स्वतःचा ……………………… व्यवसाय आहे. आर्थिक वर्ष २०१८ - १९ करिता माझे सर्व मार्गानी मिळून वार्षिक
कौटुंबिक उत्पन्न रु. ३,००,००१/- ते रु. ६,००,०००/- दरम्यान आहे. मी प्रतिज्ञापत्र लिहून देते/ देतो की,

    मी असे जाहीर करतो / करते की, मी सध्या राहत असलेले घर हे माझ्या स्वतःच्या मालकीचे नसून/
भाडयाचे / एकत्र कुटुंबाचे आहे. मी पुढे असे जाहीर करतो/ करते की, माझे अथवा माझ्या पत्नीच्या/पतीच्या
नावे नवी मुंबईत कुठेही घर नाही. तसेच मी अथवा माझी पत्नी / पती कोणत्याही नवी मुंबईतील सहकारी 
गृहनिर्माण संस्थेचे सभासद नाही.

    मी असे जाहीर करतो/करते की, मी सर्वसाधारण/ अनुसूचित जाती/ अनुसूचित जमाती/ भटक्या जमाती/
विमक्त जमाती/ राज्य शासनाचे कर्मचार/ नवी मुंबई ई क्षेत्रातील पत्रकार/ अंध किंवा शारिरीक दृष्टया विकलांग
व्यक्ती/ प्रकल्पग्मस्त/ माजी सैनिक/ सुरक्षादलातील कर्मचारी/ माथाडी कामगार/ धार्मिक अल्पसंख्याक सिडको
कर्मचारी या प्रवर्गातील आहे. (यापैकी योग्य ती नमूद करावे)

    मी/आम्ही पुढे असेही लिहून देतो की, वर नमूद केलेली माहिती ही खरी व बरोबर आहे.
    
    मी/आम्ही पुढे असे कथन करतो की, वर दिलेली माहिती भविष्यात जर चुकीची आढळल्यास होणाऱ्या
कारवाईस मी/आम्ही त्यास जबाबदार राहू व सिडको महामंडळास कोणत्याही प्रकारची तोशीस लागू देणार नाही.
    
    मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद माहिती खोटी किंवा चुकीची आढळल्यास
वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही प्रकारची हरकत राहणार नाही.

    

                                                            अर्जदाराची सही/अंगठा
 
दिनांक :                                                    नोटरी यांची सही / शिक्का
ठिकाण :

(हे प्रतिज्ञापत्र यशस्वी लाभार्थ्यांनी इरादापत्रामध्ये नमूद केलेल्या कागदपत्रांसोबत अर्जाच्या छाननी प्रक्रीयेवेळी सादर
 करणे जरुरी आहे.)
</pre
            >
          </span>
        </div>

        <div
          style="position: absolute; left: 261.89px; top: 145.58px"
          class="cls_004"
        >
          <span class="cls_004">
            <pre><b>प्रतिज्ञापत्र</b></pre>
          </span>
        </div>
      </div>
    </div>
  </body>
</html>
`;

  const affidavitD =
    isAffidavitD &&
    `<html>
<head><meta http-equiv=Content-Type content="text/html; charset=UTF-8">
<style type="text/css">

span.cls_003{font-family:Arial,serif;font-size:12px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
span.cls_005{font-family:Arial,serif;font-size:14px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
div.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}

</style>
</head>
<body>
<div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
<div style="position:absolute;left:0px;top:0px">
<div style="position:absolute;left:271.89px;top:35.58px" class="cls_004"><span class="cls_004"><b><pre>नमुना - D</pre></b></span></div>
<div style="position:absolute;left:271.89px;top:45.58px" class="cls_004"><span class="cls_004"><b><pre>________</pre></b></span></div>
<div style="position:absolute;left:271.89px;top:45.58px" class="cls_004"><span class="cls_004"><b><pre>________</pre></b></span></div>
<div style="position:absolute;left:95.89px;top:81.58px" class="cls_005"><span class="cls_005"><pre><b>(महाराष्ट्र राज्य सरकारी अधिकारी /कर्मचारी असल्याबाबत दाखल्याचा नमुना)</b></pre></span></div>
<div style="position:absolute;left:95.89px;top:86.58px" class="cls_005"><span class="cls_005"><pre>_________________________________________________________</pre></span></div>
<div style="position:absolute;left:36.58px;top:85.66px" class="cls_003"><span class="cls_003"><pre>
   
                                
 




    दाखला देण्यात येतो की श्री./ श्रीमती ${applicantDetails.FirstName} ${applicantDetails.LastName}  हे/
ही कायमस्वरूपी महाराष्ट्र राज्य सरकारी कर्मचारी म्हणून या विभागात कार्यरत आहेत व त्यांचा नियुक्तीचा दिनांक
……………………………… आहे. ते/त्या सध्या ……………………………………… या विभागात ………………………………… हया पदावर कार्यरत
आहेत.


 
दिनांक :     

ठिकाण :



                                                प्राधिकृत शासकीय अधिकाऱ्याची सही / शिक्का

</pre></span></div>


<div style="position:absolute;left:231.89px;top:125.58px" class="cls_003"><span class="cls_003"><pre><b>(आस्थापनेच्या लेटर हेडवर)</b></pre></span></div>
`;

  const affidavitE =
    isAffidavitE &&
    `<html>
<head><meta http-equiv=Content-Type content="text/html; charset=UTF-8">
<style type="text/css">

span.cls_003{font-family:Arial,serif;font-size:12px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
span.cls_005{font-family:Arial,serif;font-size:14px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
div.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}

</style>
</head>
<body>
<div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
<div style="position:absolute;left:0px;top:0px">
<div style="position:absolute;left:251.89px;top:35.58px" class="cls_004"><span class="cls_004"><b><pre>नमुना - E</pre></b></span></div>
<div style="position:absolute;left:251.89px;top:45.58px" class="cls_004"><span class="cls_004"><b><pre>_________</pre></b></span></div>
<div style="position:absolute;left:251.89px;top:45.58px" class="cls_004"><span class="cls_004"><b><pre>_________</pre></b></span></div>
<div style="position:absolute;left:201.89px;top:75.58px" class="cls_005"><span class="cls_005"><pre>(नवी मुंबई क्षेत्रातील पत्रकारांकरिता)</pre></span></div>
<div style="position:absolute;left:36.58px;top:85.66px" class="cls_003"><span class="cls_003"><pre>
   


    मी/आम्ही अर्जदार श्री./श्रीमती. ${applicantDetails.FirstName} ${applicantDetails.LastName}  वय ${age} वर्षे, अर्ज क्र. ${applicantDetails.ApplicantId}
सिडको महागृहनिर्माण योजना ऑक्टोबर - २०१९ मधील यशस्वी अर्जदार असून मला योजना संकेताक क्र.
……………………………………………………… व इमारत क्र. ……………………………… सदनिका क्र. …………………………… चे इरादापत्र
मिळालेले आहे.

    मी नवी मुंबई क्षेत्रात पत्रकार म्हणून कार्यरत असून, महासंचालक, माहिती व जनसंपर्क (DGIPR) यांनी
दिलेले प्रमाणपत्र व ओळखपत्राची छायांकित प्रत जमा करणे बंधनकारक असल्याची मला पूर्णपणे जाणीव आहे.

    माझा वर्तमानपत्राच्या आस्थापनेवरील अथवा वर्तमानपत्राशी संबंधित संपादक/ लिडर रायटर/ वृत्त संपादक,
वृत्त लेखक, कॉपी टेस्टर, वार्ताहर, व्यंगचित्रकार/ वृत्त छायाचित्रकार, मुद्रित तपासणीस/ प्रख्यात साप्ताहिक/ 
मासिक वा नियतकालिका मधील मुक्त पत्रकार या गटामध्ये समावेश होतो.

    तसेच वृत्तपत्र व्यवस्थापन व प्रशासन विभागातील कर्मचारी तसेच पर्यवेक्षक म्हणून काम करणारे कर्मचारी,
व्यवस्थापन स्वरूपाचे काम करणारे कर्मचारी या गटामध्ये माझा समावेश होत नाही.

    मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद माहिती खोटी किंवा चुकीची आढळल्यास
वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही प्रकारची हरकत राहणार नाही.


                                                        
 
दिनांक : …………………………………………                                  

ठिकाण :…………………………………………                                   स्वाक्षरी

                                                        अर्जदाराचे नाव ……………………………

</pre></span></div>


`;
  const affidavitF =
    isAffidavitF &&
    `<html>
<head><meta http-equiv=Content-Type content="text/html; charset=UTF-8">
<style type="text/css">

span.cls_003{font-family:Arial,serif;font-size:12px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
span.cls_005{font-family:Arial,serif;font-size:14px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
div.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}

</style>
</head>
<body>
<div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
<div style="position:absolute;left:0px;top:0px">
<div style="position:absolute;left:251.89px;top:35.58px" class="cls_004"><span class="cls_004"><b><pre>नमुना - F</pre></b></span></div>
<div style="position:absolute;left:251.89px;top:45.58px" class="cls_004"><span class="cls_004"><b><pre>_________</pre></b></span></div>
<div style="position:absolute;left:251.89px;top:45.58px" class="cls_004"><span class="cls_004"><b><pre>_________</pre></b></span></div>
<div style="position:absolute;left:200.89px;top:75.58px" class="cls_005"><span class="cls_005"><pre>(धार्मिक अल्पसंख्यांक प्रवर्गाकरिता)</pre></span></div>
<div style="position:absolute;left:36.58px;top:85.66px" class="cls_003"><span class="cls_003"><pre>
   


    मी/आम्ही अर्जदार श्री./श्रीमती. ${applicantDetails.FirstName} ${applicantDetails.LastName} वय ${age} वर्षे, अर्ज क्र. ${applicantDetails.ApplicantId}
सिडको महागृहनिर्माण योजना ऑक्टोबर - २०१९ मधील यशस्वी अर्जदार असून मला योजना संकेताक क्र.
……………………………………………………… व इमारत क्र. ……………………………… सदनिका क्र. …………………………… चे इरादापत्र
मिळालेले आहे.

    मी धार्मिक अल्पसंख्यांक प्रवर्गामध्ये अर्ज केला असून, माझा केंद्र शासनाच्या राष्ट्रीय अल्पसंख्यांक आयोग
अधिनियम - १९९२ च्या राजपत्रातील भाग २(क) मध्ये धार्मिक अल्पसंख्यांक म्हणून अधिसूचित केलेले मुस्लिम/
शीख/ ख्रिश्चन/ बौद्ध/ पारसी/ जैन या वर्गामध्ये समावेश होतो.

    मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद माहिती खोटी किंवा चुकीची आढळल्यास
वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही प्रकारची हरकत राहणार नाही.


                                                        
 
दिनांक : …………………………………………                                  

ठिकाण :…………………………………………                                   स्वाक्षरी

                                                        अर्जदाराचे नाव ……………………………

</pre></span></div>


 `;

  const phConcentLetter =
    isPhConcentLetter &&
    `<html>

<head>
  <meta http-equiv=Content-Type content="text/html; charset=UTF-8">
  <style type="text/css">
    
    span.cls_003 {
      font-family: Arial, serif;
      font-size: 15.1px;
      color: rgb(0, 0, 0);
      font-weight: normal;
      font-style: normal;
      text-decoration: none
    }

    div.cls_003 {
      font-family: Arial, serif;
      font-size: 15.1px;
      color: rgb(0, 0, 0);
      font-weight: normal;
      font-style: normal;
      text-decoration: none
    }
    

    span.cls_004 {
      font-family: Arial, serif;
      font-size: 20.1px;
      color: rgb(0, 0, 0);
      font-weight: normal;
      font-style: normal;
      text-decoration: none
    }

    div.cls_004 {
      font-family: Arial, serif;
      font-size: 20.1px;
      color: rgb(0, 0, 0);
      font-weight: normal;
      font-style: normal;
      text-decoration: none
    }
    
  </style>
</head>

<body>
  <div
    style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
    <div style="position:absolute;left:0px;top:0px">

      <div style="position:absolute;left:261.89px;top:85.58px" class="cls_004">
        <span class="cls_004"><b>संमतीपत्र</b></span></div>

      <div style="position:absolute;left:72.58px;top:155.66px" class="cls_003"><span class="cls_003">
          <pre>मी श्री/श्रीमती. ${applicantDetails.FirstName} ${applicantDetails.LastName}अर्ज क्र.${applicantDetails.ApplicantId} सिडको</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:175.74px" class="cls_003"><span class="cls_003">
          <pre>ऑनलाईन सोडत-2020 मधील दिव्यांग प्रवर्गातून यशस्वी अर्जदार आहे. सदर सोडतीत मला</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:195.74px" class="cls_003"><span class="cls_003">
          <pre>इमारत क्र. ……………………… सदनिका क्र. ……………………………… सेक्टर- ………………………  योजना क्र.</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:215.74px" class="cls_003"><span class="cls_003">
          <pre>…………………………………………………………… येथे सदनिका मिळाली आहे.</pre>
        </span></div>

      <div style="position:absolute;left:72.58px;top:255.74px" class="cls_003"><span class="cls_003">
          <pre>सदर सदनिकेबाबत मी खालीलप्रमाणे संमतीपत्र देत आहे. </pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:305.74px" class="cls_003"><span class="cls_003">
          <pre>अ)  सदर सदनिकेमध्ये दिव्यांगांना अनुकुल शौचालय / स्नानगृह एकत्र करुन</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:325.74px" class="cls_003"><span class="cls_003">
          <pre>    रॅम्प असणारी अशी रचना करुन देण्यात यावी.</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:345.74px" class="cls_003"><span class="cls_003">
          <pre>ब)  सदर सदनिकेच्या शौचालय / स्नानगृह मध्ये सर्व साधारण प्रवर्गाकरीता </pre>
        </span></div>

        <div style="position:absolute;left:36.58px;top:365.74px" class="cls_003"><span class="cls_003">
          <pre>    असणारी रचना करुन देण्यात यावी</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:405.74px" class="cls_003"><span class="cls_003">
          <pre>    वरील दिलेला पर्याय मला भविष्यात बदलता येणार नाही याबद्दल मला माहिती देण्यात</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:425.74px" class="cls_003"><span class="cls_003">
          <pre>आली आहे. तसेच वरील पर्यायाबाबत भविष्यात माझी कोणतीही तक्रार राहणार नाही.</pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:485.74px" class="cls_003"><span class="cls_003">
          <pre>                                 अर्जदाराची स्वाक्षरी: ………………………………………… </pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:505.74px" class="cls_003"><span class="cls_003">
          <pre>                                 अर्जदाराचे नांव: ………………………………………………… </pre>
        </span></div>

      <div style="position:absolute;left:36.58px;top:545.74px" class="cls_003"><span class="cls_003">
          <pre>दिनांक: </pre>
        </span></div>
        
      <div style="position:absolute;left:36.58px;top:565.74px" class="cls_003"><span class="cls_003">
          <pre>स्थळ:</pre>
        </span></div>

      <div style="position:absolute;left:456.58px;top:278.74px" class="cls_003"><span class="cls_003">
          <pre>
            <input type="checkbox" name="checkBox2">
</pre>
</span>
</div>
<div style="position:absolute;left:456.58px;top:348.74px" class="cls_003"><span class="cls_003">
          <pre>
            <input type="checkbox" name="checkBox3">
</pre>
</span>

</div>





      </div>
      </div>
</body>
</html>


  `;

  const nonWorkingCL =
    isNonWorkingApplicantCl &&
    ` <html>
<head><meta http-equiv=Content-Type content="text/html; charset=UTF-8">
<style type="text/css">

span.cls_003{font-family:Arial,serif;font-size:15.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
div.cls_003{font-family:Arial,serif;font-size:15.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
span.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
div.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}

</style>
</head>
<body>
<div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
<div style="position:absolute;left:0px;top:0px">
<div style="position:absolute;left:430.63px;top:88.22px" class="cls_003"><span class="cls_003"><b>दिनांक</b></span></div>
<div style="position:absolute;left:475.73px;top:75.22px" class="cls_003"><span class="cls_003"><pre>……………………………………</pre></span></div>
<div style="position:absolute;left:261.89px;top:115.58px" class="cls_004"><span class="cls_004"><b>स्वयंघोषणापत्र</b></span></div>
<div style="position:absolute;left:110.82px;top:135.14px" class="cls_004"><span class="cls_004"><b><pre>(अर्जदार नोकरी/व्यवसाय करित नसल्यास)</pre></b></span></div>
<div style="position:absolute;left:72.58px;top:185.66px" class="cls_003"><span class="cls_003"><pre>मी सो/श्री. ${applicantDetails.FirstName} ${applicantDetails.LastName}, वय ${age} वर्ष, ………………………, व्यवसाय</pre></span></div>
<div style="position:absolute;left:36.58px;top:205.74px" class="cls_003"><span class="cls_003"><pre>………………………, अर्ज क्र. ${applicantDetails.ApplicantId}, राहणार ${applicantDetails.District} ${applicantDetails.State}</pre></span></div>
<div style="position:absolute;left:36.58px;top:225.94px" class="cls_003"><span class="cls_003"><pre>……………………………………………………………… सत्य प्रतिज्ञेवर असे घोषीत करिते/करितो की,</pre></span></div>
<div style="position:absolute;left:72.58px;top:255.89px" class="cls_003"><span class="cls_003"><pre>मी स्वत: सध्या कोठेही न नोकरी करत नाही किंबा कोणताही व्यबसाय करत नाही.</pre></span></div>
<div style="position:absolute;left:36.58px;top:275.94px" class="cls_003"><span class="cls_003"><pre>त्यामुळे माझे सन २०१८ - २०१९ या आर्थिक वर्षचे उत्पन्न निरंक आहे</pre></span></div>
<div style="position:absolute;left:72.58px;top:305.21px" class="cls_003"><span class="cls_003"><pre>मी यापुढे असे जाहीर करते की/ करतो की, माझ्या परिवारात खालील सदस्य आहेत</pre></span></div>
<div style="position:absolute;left:72.58px;top: 465.39px" class="cls_003"><span class="cls_003"><pre>वर नमूद केलेली माहिती खरी व बरोबर आहे</pre></span></div>
<div style="position:absolute;left:72.58px;top: 495.31px" class="cls_003"><span class="cls_003"><pre>मी यापुढे असे कथन करिते की/करितो की, वर दिलेली माहिती भविष्यात जर</pre></span></div>
<div style="position:absolute;left:36.58px;top: 515.39px" class="cls_003"><span class="cls_003"><pre>चुकीची आढळल्यास होणार्‍या कारवाईस मी जबाबदार राहिन आणि सिडको महामंडळास 
कोणत्याही प्रकारची तोषीस लागू देणार नाही. त्याचप्रकारे वाटप करण्यात आलेले घर रद्द
करण्याबाबत माझी कोणत्याही प्रकारची हरकत राहणार नाही.</pre></span></div>
<div style="position:absolute;left:72.58px;top:585.71px" class="cls_003"><span class="cls_003"><pre>सत्यप्रतिज्ञेवर आज दिनांक ……………/ …………/२० रोजी नवी मुंबई येथे जाहीर केले असे</pre></span></div>
<div style="position:absolute;left:36.58px;top:635.75px" class="cls_003"><span class="cls_003"><pre>दिनांक</pre></span></div>
<div style="position:absolute;left:72.54px;top:635.75px" class="cls_003"><span class="cls_003"><pre> …………………………………</pre></span></div>
<div style="position:absolute;left:348.79px;top:675.46px" class="cls_003"><span class="cls_003">(</span></div>
<div style="position:absolute;left:510.60px;top:675.46px" class="cls_003"><span class="cls_003">)</span></div>
<div style="position:absolute;left:414.34px;top:705.90px" class="cls_003"><span class="cls_003"><pre>अर्जदार</pre></span></div>
</div>

<div style="position:absolute;left:36.89px;top:355.58px" class="cls_004"><span class="cls_004">
    <table style="border-collapse: collapse; width: 117%;" border="1">
    <tbody>
    <tr>
    <td style="width: 11.8848%;"><span style="font-weight: 400;">अ.क्र.</span></td>
    <td style="width: 39.8431%;"><span style="font-weight: 400;">नांव</span></td>
    <td style="width: 17.2302%;"><span style="font-weight: 400;">नाते</span></td>
    <td style="width: 33.2302%;"><span style="font-weight: 400;">यवसाय/ नोकरीचे उत्पन्न</span></td>
    </tr>
    <tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 39.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 33.2302%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 39.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 43.2302%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 39.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 33.2302%;">&nbsp;</td>
    </tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 39.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 33.2302%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
</span></div>
 `;

  const nonWorkingSpouseCL = `<html>
<head><meta http-equiv=Content-Type content="text/html; charset=UTF-8">
<style type="text/css">

span.cls_003{font-family:Arial,serif;font-size:15.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
div.cls_003{font-family:Arial,serif;font-size:15.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
span.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
div.cls_004{font-family:Arial,serif;font-size:20.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}

</style>
</head>
<body>
<div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden">
<div style="position:absolute;left:0px;top:0px">
<div style="position:absolute;left:430.63px;top:88.22px" class="cls_003"><span class="cls_003"><b>दिनांक</b></span></div>
<div style="position:absolute;left:475.73px;top:75.22px" class="cls_003"><span class="cls_003"><pre>……………………………………</pre></span></div>
<div style="position:absolute;left:261.89px;top:115.58px" class="cls_004"><span class="cls_004"><b>स्वयंघोषणापत्र</b></span></div>
<div style="position:absolute;left:70.82px;top:135.14px" class="cls_004"><span class="cls_004"><b><pre>(अर्जदाराची पती/पत्नी नोकरी/व्यवसाय करित नसल्यास)</pre></b></span></div>
<div style="position:absolute;left:72.58px;top:185.66px" class="cls_003"><span class="cls_003"><pre>मी सो/श्री. ${applicantDetails.FirstName} ${applicantDetails.LastName}, वय ${age} वर्ष, ………………………, व्यवसाय</pre></span></div>
<div style="position:absolute;left:36.58px;top:205.74px" class="cls_003"><span class="cls_003"><pre>………………………, अर्ज क्र. ${applicantDetails.ApplicantId}, राहणार ${applicantDetails.District} ${applicantDetails.State}</pre></span></div>
<div style="position:absolute;left:36.58px;top:225.94px" class="cls_003"><span class="cls_003"><pre>……………………………………………………………… सत्य प्रतिज्ञेवर असे घोषीत करिते/करितो की,</pre></span></div>
<div style="position:absolute;left:72.58px;top:255.89px" class="cls_003"><span class="cls_003"><pre>माझे पती/पत्नी श्री./सौ. …………………………………………………………………… सध्या कोठेही नोकरी</pre></span></div>
<div style="position:absolute;left:36.58px;top:275.97px" class="cls_003"><span class="cls_003"><pre>करत नाही किंवा कोणताही व्यवसाय करत नाही. त्यामुळे सन २०२० - २०२१ या आर्थिक
वर्षाचे उत्पन्न निरंक आहे.</pre></span></div>
<div style="position:absolute;left:72.58px;top:325.21px" class="cls_003"><span class="cls_003"><pre>मी यापुढे असे जाहीर करते की/ करतो की, माझ्या परिवारात खालील सदस्य आहेत</pre></span></div>

<div style="position:absolute;left:72.58px;top: 485.39px" class="cls_003"><span class="cls_003"><pre>वर नमूद केलेली माहिती खरी व बरोबर आहे</pre></span></div>
<div style="position:absolute;left:72.58px;top: 515.31px" class="cls_003"><span class="cls_003"><pre>मी यापुढे असे कथन करिते की/करितो की, वर दिलेली माहिती भविष्यात जर</pre></span></div>
<div style="position:absolute;left:36.58px;top: 535.39px" class="cls_003"><span class="cls_003"><pre>चुकीची आढळल्यास होणार्‍या कारवाईस मी जबाबदार राहिन आणि सिडको महामंडळास 
कोणत्याही प्रकारची तोषीस लागू देणार नाही. त्याचप्रकारे वाटप करण्यात आलेले घर रद्द
करण्याबाबत माझी कोणत्याही प्रकारची हरकत राहणार नाही.</pre></span></div>
<div style="position:absolute;left:72.58px;top:605.71px" class="cls_003"><span class="cls_003"><pre>सत्यप्रतिज्ञेवर आज दिनांक ……………/ …………/२० रोजी नवी मुंबई येथे जाहीर केले असे</pre></span></div>
<div style="position:absolute;left:36.58px;top:635.75px" class="cls_003"><span class="cls_003"><pre>दिनांक</pre></span></div>
<div style="position:absolute;left:72.54px;top:635.75px" class="cls_003"><span class="cls_003"><pre> …………………………………</pre></span></div>
<div style="position:absolute;left:348.79px;top:675.46px" class="cls_003"><span class="cls_003">(</span></div>
<div style="position:absolute;left:510.60px;top:675.46px" class="cls_003"><span class="cls_003">)</span></div>
<div style="position:absolute;left:414.34px;top:705.90px" class="cls_003"><span class="cls_003"><pre>अर्जदार</pre></span></div>
</div>

<div style="position:absolute;left:36.89px;top:372.58px" class="cls_004"><span class="cls_004">
    <table style="border-collapse: collapse; width: 139%;" border="1">
    <tbody>
    <tr>
    <td style="width: 11.8848%;"><span style="font-weight: 400;">अ.क्र.</span></td>
    <td style="width: 32.8431%;"><span style="font-weight: 400;">नांव</span></td>
    <td style="width: 17.2302%;"><span style="font-weight: 400;">नाते</span></td>
    <td style="width: 40.2302%;"><span style="font-weight: 400;">यवसाय/ नोकरीचे उत्पन्न</span></td>
    </tr>
    <tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 32.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 40.2302%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 32.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 40.2302%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 32.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 40.2302%;">&nbsp;</td>
    </tr>
    <td style="width: 11.8848%;">&nbsp;</td>
    <td style="width: 32.8431%;">&nbsp;</td>
    <td style="width: 17.2302%;">&nbsp;</td>
    <td style="width: 40.2302%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
</span></div>
`;

  // const mockB= ""
  // const affB = getBase64(affidavitB);

  // let decode = new Buffer(affB, "base64");
  // let base64ToStringNew = decode.toString("ascii");
  // console.log(base64ToStringNew);
  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  // Usage:
  let encodeDataAffidavitB = utf8_to_b64(affidavitB);
  // let encodeDataAffidavitC = utf8_to_b64(affidavitC);
  // let encodeDataAffidavitE = utf8_to_b64(affidavitE);
  // let encodeDataAffidavitD = utf8_to_b64(affidavitD);
  // let encodeDataAffidavitF = utf8_to_b64(affidavitF);
  // let encodeDataPhCl = utf8_to_b64(phConcentLetter);
  // let encodeDataNonWork = utf8_to_b64(nonWorkingCL);
  // let encodeDataNonWorkSpouce = utf8_to_b64(nonWorkingSpouseCL);

  // const finalAffidavitB = encodeDataAffidavitB.concat(".pdf");
  // console.log(encodeDataAffidavitB);
  // var decod = b64_to_utf8(encodeDataAffidavitB);
  // console.log(decod);

  const proceedEstamping = () => {
    const requestData = {
      ApplicantId: localStorage.getItem("applicantId"),
      Lang: localStorage.getItem("i18nextLng"),
      LegalityPayload: {
        profileId: "v403hfm",
        file: {
          name: "AffidavitB",
          file: "",
          fields: null,
          additionalFiles: null,
        },
        stampSeries: "string",
        seriesGroup: "string",
        stampValue: "200",
        invitees: [
          {
            name: applicantData.FirstName,
            email: applicantData.EmailId,
            phone: applicantData.MobileNo,
          },
        ],
        irn: "string",
      },
    };
    dispatch(generateEstamping(requestData));
  };
  useEffect(() => {
    if (estampData?.length > 0) {
      console.log(estampData);
    }
  }, [estampData]);

  const handleCLick = () => {
    setAgreement(true);
  };

  // htmlToImage
  //   .toPng(affidavitB)
  //   .then(function (dataUrl) {
  //     let img = new Image();
  //     img.src = dataUrl;
  //     setImgSource(img.src);
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });

  //   function base64ToArrayBuffer(data) {
  //     let bString = window.atob(data);
  //     let bLength = bString.length;
  //     let bytes = new Uint8Array(bLength);
  //     for (var i = 0; i < bLength; i++) {
  //       var ascii = bString.charCodeAt(i);
  //       bytes[i] = ascii;
  //     }
  //     return bytes;
  //   }
  //   function base64toPDF(dataP) {
  //     var bufferArray = base64ToArrayBuffer(dataP);
  //     var blobStore = new Blob([bufferArray], { type: "application/pdf" });
  //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //       window.navigator.msSaveOrOpenBlob(blobStore);
  //       return;
  //     }
  //   }
  // const pdfEnoded64 = base64toPDF;
  //   // // console.log(dataPdf);
  // useEffect(() => {
  //   var doc = new jsPDF("p", "pt", "a4");
  //   doc.html(affidavitB, {
  //     callback: function (pdf) {
  //       setImgSource(pdf);
  //     },
  //   });
  //   console.log(imgSource);
  // }, [affidavitB]);

  // Convert file to base64 string
  // const fileToBase64 = (filename, filepath) => {
  //   return new Promise((resolve) => {
  //     var file = new File([filename], filepath);
  //     var reader = new FileReader();
  //     // Read file content on file loaded event
  //     reader.onload = function (event) {
  //       resolve(event.target.result);
  //     };

  //     // Convert data to base64
  //     reader.readAsDataURL(file);
  //   });
  // };
  // // Example call:
  // fileToBase64(imgSource).then((result) => {
  //   console.log(result);
  // });

  return (
    <>
      {!agreement && (
        <div>
          <div className={classes.root}>
            {isFetchingApplicant && <Loading isOpen={isFetchingApplicant} />}
            <div className={classes.topbar}>
              <div className={classes.head}>
                <Typography variant="h5" align="center">
                  Preview Documents
                </Typography>
              </div>

              <div className={classes.sideBtn}>
                <div>
                  <Button color="primary">
                    <PrintOutlinedIcon />
                    Print document{" "}
                  </Button>
                </div>
              </div>
            </div>
            {Lang === "en" && (
              <div>
                {isAffidavitB && (
                  <div className={classes.docs}>
                    <AffidavitBpreviewEn
                      applicantDetails={applicantDetails}
                      age={age}
                      familyData={familyData}
                    />
                  </div>
                )}
                {isAffidavitD && (
                  <div className={classes.docs}>
                    <AffidavitDpreviewEn
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitC && (
                  <div className={classes.docs}>
                    <AffidavitCpreviewEn
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitE && (
                  <div className={classes.docs}>
                    <AffidavitEpreviewEn
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitF && (
                  <div className={classes.docs}>
                    <AffidavitFpreviewEn
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isPhConcentLetter && (
                  <div className={classes.docs}>
                    <PHconcentLetterPreviewEn
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isNonWorkingApplicantCl && (
                  <div className={classes.docs}>
                    <NonWorkingClApplicantEn
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                <div className={classes.docs}>
                  <NonWorkingClSpouseEn
                    applicantDetails={applicantDetails}
                    age={age}
                    familyData={familyData}
                  />
                </div>
              </div>
            )}

            {Lang === "mr" && (
              <div>
                {isAffidavitB && (
                  <div className={classes.docs}>
                    <AffidavitBpreviewMR
                      applicantDetails={applicantDetails}
                      age={age}
                      familyData={familyData}
                    />
                  </div>
                )}
                {isAffidavitD && (
                  <div className={classes.docs}>
                    <AffidavitDpreviewMR
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitC && (
                  <div className={classes.docs}>
                    <AffidavitCpreviewMR
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitE && (
                  <div className={classes.docs}>
                    <AffidavitEpreviewMR
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitF && (
                  <div className={classes.docs}>
                    <AffidavitFpreviewMR
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isPhConcentLetter && (
                  <div className={classes.docs}>
                    <PHconcentLetterPreviewMR
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isNonWorkingApplicantCl && (
                  <div className={classes.docs}>
                    <NonWorkingClApplicantMR
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}

                <div className={classes.docs}>
                  <NonWorkingClSpouseMR
                    applicantDetails={applicantDetails}
                    age={age}
                    familyData={familyData}
                  />
                </div>
              </div>
            )}

            {Lang === "hi" && (
              <div>
                {isAffidavitB && (
                  <div className={classes.docs}>
                    <AffidavitBpreviewHi
                      applicantDetails={applicantDetails}
                      age={age}
                      familyData={familyData}
                    />
                  </div>
                )}
                {isAffidavitD && (
                  <div className={classes.docs}>
                    <AffidavitDpreviewHi
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitC && (
                  <div className={classes.docs}>
                    <AffidavitCPreviewHI
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitE && (
                  <div className={classes.docs}>
                    <AffidavitEpreviewHi
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isAffidavitF && (
                  <div className={classes.docs}>
                    <AffidavitFpreviewHi
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isPhConcentLetter && (
                  <div className={classes.docs}>
                    <PHconcentLetterPreviewHi
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}
                {isNonWorkingApplicantCl && (
                  <div className={classes.docs}>
                    <NonWorkingClApplicantHi
                      applicantDetails={applicantDetails}
                      age={age}
                    />
                  </div>
                )}

                <div className={classes.docs}>
                  <NonWorkingClSpouseHi
                    applicantDetails={applicantDetails}
                    age={age}
                    familyData={familyData}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleCLick}
            >
              Proceed to sign
            </Button>
          </div>
        </div>
      )}
      {agreement && (
        <EstampingAgreementPage proceedEstamping={proceedEstamping} />
      )}
    </>
  );
}

export default DocumentPreview;
