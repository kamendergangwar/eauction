import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../../pages/Layout/Layout";
import {
  generateEstamping,
  estampingDocumentSelector,
  htmlToPdf,
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
  setDocforEstamping,
  addDocforEstamping,
} from "../../../../redux/features/transaction/EstampingSlice";
import Loading from "../../../atoms/Loading/Loading";
import { calculateEStampTotalBill } from "../../../../redux/features/masterdata/MasterDataSlice";

function EstampingProcess() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [applicantDetails, setApplicantDetails] = useState({});
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [familyData, setFamilyData] = useState({});
  const [reservationCategory, setReservationCategory] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [enCodedDocs, setEncodedDocs] = useState([]);
  const [htmlDocs, setHtmlDocs] = useState([]);
  const [signLinkUrl, setSignLinkUrl] = useState("");
  const { isSuccessResApplicant, applicantData, isFetchingApplicant } =
    useSelector(applicantSelector);
  const [sum, setSum] = useState("");
  const { isSuccessFamilyMembers, familyMembersData } =
    useSelector(familyMemberSelector);

  const {
    estampData,
    isFetchingEstamping,
    isSuccess,
    isPdfSuccess,
    ispdfError,
    pdfData,
    isFetchingPdf,
  } = useSelector(estampingDocumentSelector);

  const {
    currentEstamping,
    reservationCat,
    isSuccessReqEstamping,
    documentForEstamping,
  } = useSelector(eStampingSelector);

  useEffect(() => {
    if (isSuccessFamilyMembers) {
      if (familyMembersData?.length > 0) {
        let jointOwner = familyMembersData.filter(
          (element) => element.JointOwner === "1"
        );
        setFamilyData(jointOwner);
        // console.log(jointOwner);
        // console.log("familt", jointOwner);
      }
    }
  }, [isSuccessFamilyMembers, familyMembersData]);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getFamilyMembers());
    dispatch(setDocforEstamping([]));
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

  useEffect(() => {
    if (isSuccessResApplicant) {
      // dispatch(clearDocforEstamping())

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
    // dispatch(getEstampSummary())
    if (reservationCat?.length > 0) {
      // console.log(reservationCat);
      let totalCount = 0;
      reservationCat.forEach((element) => {
        totalCount = parseInt(element.Total) + totalCount;
        setSum(totalCount.toString());
      });
      console.log(sum);
      dispatch(calculateEStampTotalBill(sum));
    }
  }, [dispatch, reservationCat, sum]);

  useEffect(() => {
    if (documentForEstamping?.length > 0) {
      const doc = documentForEstamping.map((estamp) => estamp.EstampId);
      setDocuments(doc);
      // console.log(documentForEstamping);
    }
  }, [documentForEstamping]);

  // useEffect(() => {
  //   console.log(documents);
  //   const isAffidavitB = documents.some((element) => element == 1);
  //   const isAffidavitC = documents.some((element) => element == 2);
  //   const isAffidavitAc = documents.some((element) => element == 3);
  //   const isAffidavitD = documents.some((element) => element == 4);
  //   const isAffidavitE = documents.some((element) => element == 5);
  //   const isAffidavitF = documents.some((element) => element == 6);
  //   const isPhConcentLetter = documents.some((element) => element == 7);
  //   const isNonWorkingApplicantCl = documents.some((element) => element == 8);
  // }, [documents]);

  //   const Lang = localStorage.getItem("i18nextLng");

  // const isAffidavitB = documents.some((element) => element == 1);
  // const isAffidavitC = documents.some((element) => element == 2);
  // const isAffidavitD = documents.some((element) => element == 4);
  // const isAffidavitE = documents.some((element) => element == 5);
  // const isAffidavitF = documents.some((element) => element == 6);
  // const isPhConcentLetter = documents.some((element) => element == 7);
  // const isNonWorkingApplicantCl = documents.some((element) => element == 8);

  const affidavitBinMR = `<html><head></head><body ><div style='position:absolute; left: 50%; margin-left: -306px; top: 0px; width: 612px; height: 792px;border-style: outset; overflow: hidden;'> <div style='position: absolute; left: 0px; top: 0px'><div style='position: absolute; left: 271.89px; top: 35.58px; class='cls_004' > <span class='cls_004'><b><pre>नमुना - C</pre></b></span></div><div style='position: absolute; left: 271.89px; top: 45.58px' class='cls_004'> <span class='cls_004' ><b><pre>________</pre></b></span></div><div style='position: absolute; left: 271.89px; top: 45.58px' class='cls_004' ><span class='cls_004'><b><pre>________</pre></b></span></div><div style='position: absolute; left: 121.89px; top: 75.58px' class='cls_005'><span class='cls_005'> <pre>(केवळ अल्प उत्पन्न गटातील अर्जदारांकरीता : नमूना फॉर्म)<pre></span> </div> <div style='position: absolute; left: 121.89px; top: 81.58px'    class='cls_005'> <span class='cls_005'> <pre>_____________________________________________</pre></span></div><div style='position: absolute; left: 36.58px; top: 85.66px' class='cls_003'><span class='cls_003'> <pre>(रु.२००/- मुठ्रांक शुल्क पेपरवर नोटरींकरून)(Non - Judicial Stamp Paper)      मी/आम्ही अर्जदार श्री./श्रीमती. Akhilesh Govarekar वय 2021 वर्षे, अर्ज क्र.132706 सिडको महागृहनिर्माण योजना ऑक्टोबर - २०१९ मधील यशस्वी अर्जदार असून मला योजना संकेताक क्र. ………………………………………………………… व इमारत क्र. …………………………………………………… सदनिका क्र. …………………………… चे इरादापत्र मिळालेले आहे. माझे/ आमचे महाराष्ट्रात सलग १५ वर्ष वास्तव्य आहे. तसेच मी ………………………… येथे नोकरी करीत आहे/ माझा स्वतःचा ……………………… व्यवसाय आहे. आर्थिक वर्ष २०१८ - १९ करिता माझे सर्व मार्गानी मिळून वार्षिक कौटुंबिक उत्पन्न रु. ३,००,००१/- ते रु. ६,००,०००/- दरम्यान आहे. मी प्रतिज्ञापत्र लिहून देते/ देतो की, मी असे जाहीर करतो / करते की, मी सध्या राहत असलेले घर हे माझ्या स्वतःच्या मालकीचे नसून/ भाडयाचे / एकत्र कुटुंबाचे आहे. मी पुढे असे जाहीर करतो/ करते की, माझे अथवा माझ्या पत्नीच्या/पतीच्या नावे नवी मुंबईत कुठेही घर नाही. तसेच मी अथवा माझी पत्नी / पती कोणत्याही नवी मुंबईतील सहकारी गृहनिर्माण संस्थेचे सभासद नाही. मी असे जाहीर करतो/करते की, मी सर्वसाधारण/ अनुसूचित जाती/ अनुसूचित जमाती/ भटक्या जमाती/विमक्त जमाती/ राज्य शासनाचे कर्मचार/ नवी मुंबई ई क्षेत्रातील पत्रकार/ अंध किंवा शारिरीक दृष्टया विकलांग यक्ती/ प्रकल्पग्मस्त/ माजी सैनिक/ सुरक्षादलातील कर्मचारी/ माथाडी कामगार/ धार्मिक अल्पसंख्याक सिडको कर्मचारी या प्रवर्गातील आहे. (यापैकी योग्य ती नमूद करावे) मी/आम्ही पुढे असेही लिहून देतो की, वर नमूद केलेली माहिती ही खरी व बरोबर आहे. मी/आम्ही पुढे असे कथन करतो की, वर दिलेली माहिती भविष्यात जर चुकीची आढळल्यास होणाऱ्या कारवाईस मी/आम्ही त्यास जबाबदार राहू व सिडको महामंडळास कोणत्याही प्रकारची तोशीस लागू देणार नाही. मी/आम्ही पुढे असे नमूद करते/करतो की, जर उपरोक्त नमूद माहिती खोटी किंवा चुकीची आढळल्यास वाटप केलेले घर रद्द करण्यास माझी / आमची कोणत्याही प्रकारची हरकत राहणार नाही. अर्जदाराची सही/अंगठा दिनांक :                                                    नोटरी यांची सही / शिक्का ठिकाण : (हे प्रतिज्ञापत्र यशस्वी लाभार्थ्यांनी इरादापत्रामध्ये नमूद केलेल्या कागदपत्रांसोबत अर्जाच्या छाननी प्रक्रीयेवेळी सादर करणे जरुरी आहे.) </pre> </span> </div> <div style='position: absolute; left: 261.89px; top: 145.58px'  class='cls_004' > <span class='cls_004'> <pre><b>प्रतिज्ञापत्र</b></pre></span></div></div></div></body></html> `;
  const affidavitCinMR = `<html>
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
अर्ज क्र.${applicantDetails.ApplicantId} 

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

  const affidavitDinMR = `<html>
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

  const affidavitEinMR = `<html>
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
  const affidavitFinMR = `<html>
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

  const phConcentLetterinMR = `<html>

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

  const nonWorkingCLinMR = ` <html>
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
<div style="position:absolute;left:72.58px;top:185.66px" class="cls_003"><span class="cls_003"><pre>मी सो/श्री. ${applicantDetails.FirstName
    } ${applicantDetails.LastName
    }, वय ${age} वर्ष, ………………………, व्यवसाय</pre></span></div>
<div style="position:absolute;left:36.58px;top:205.74px" class="cls_003"><span class="cls_003"><pre>………………………, अर्ज क्र. ${applicantDetails.ApplicantId
    }, राहणार ${applicantDetails.District} ${applicantDetails.State
    }</pre></span></div>
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
    <td style="width: 11.8848%;">${familyData[0] ? 1 : ""}</td>
    <td style="width: 39.8431%;">${familyData[0] ? familyData[0].RelativeFullName : ""
    }
    </td>
    <td style="width: 17.2302%;">${familyData[0] ? familyData[0].Relationship : ""
    }</td>
    <td style="width: 33.2302%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 11.8848%;">${familyData[1] ? 1 : ""}</td>
    <td style="width: 39.8431%;">${familyData[1] ? familyData[1].RelativeFullName : ""
    }
    </td>
    <td style="width: 17.2302%;">${familyData[1] ? familyData[1].Relationship : ""
    }</td>
    <td style="width: 43.2302%;">&nbsp;</td>
    </tr>
    <tr>
   <td style="width: 11.8848%;">${familyData[2] ? 1 : ""}</td>
    <td style="width: 39.8431%;">${familyData[2] ? familyData[2].RelativeFullName : ""
    }
    </td>
    <td style="width: 17.2302%;">${familyData[2] ? familyData[2].Relationship : ""
    }</td>
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

  const nonWorkingSpouseCLinMR = `<html>
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
  ///--------------------------Document in english

  const affidavitBinEN = `
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <h2
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 0px;
            padding: 0px;
            text-align: center;
          "
        >
          Sample - B
        </h2>
        <p
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 10px;
            padding: 0px;
            text-align: center;
          "
        >
          (only financially weak or arjadarankarita components: a sample form)
        </p>

        <p style="margin: 5px; padding: 0px; text-align: right">
          (Rs.200 / - muthranka charge on paper Paper)
        </p>
        <p style="margin: 0px; padding: 0px; text-align: right">
          (Non - Judicial Stamp Paper)
        </p>

        <h2
          class="subtitle"
          style="font-size: 14px; margin: 5px; padding: 0px; text-align: center"
        >
          Affidavit
        </h2>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I / We Applicant Mr. / Mrs. ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    } Age ${age ? age : ""}
          years,Application no. 132706 I am a successful applicant for CIDCO
          Mahagrihanirman Yojana October - 2019 Plan indicator no.123456789 and
          building no. 35414848 Flat No. 84 the letter of intent has been
          received. My Application No. 123647895 dated 22/3/2021 is submitted in
          housingscheme under Pradhan Mantri Awas Yojana. I Writes an affidavit
          stating that, My / our family has the following members.
        </p>
        <table
          style="
            width: 80%;
            border: 1px solid black;
            border-collapse: collapse;
            margin-left: 20px;
            padding: 0px;
          "
        >
          <thead>
            <tr>
              <td
                style="
                  border: 1px solid black;
                  border-collapse: collapse;
                  width: 20%;
                "
              >
                S.No.
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Names of members
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Relationship
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid black; border-collapse: collapse;width: 20%;">
                ${familyData[0] ? 1 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                ${familyData[0] ? familyData[0].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                ${familyData[0] ? familyData[0].RelativeFullName : ""}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; border-collapse: collapse;width: 20%;">
                ${familyData[1] ? 2 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
               ${familyData[1] ? familyData[1].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                ${familyData[1] ? familyData[1].RelativeFullName : ""}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; border-collapse: collapse;width: 20%;">
                ${familyData[2] ? 3 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
               ${familyData[2] ? familyData[2].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                ${familyData[2] ? familyData[2].RelativeFullName : ""}
              </td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I further write that there is no permanent home anywhere in India
          owned by me / us and my / our family members mentioned above. I
          declare that I am a General / Scheduled Caste / Scheduled Tribe /
          Nomadic Tribe / Vimkat / Tribe / State Government Employee / Navi
          Mumbai E Area Journalist / Blind or Physically Handicapped Person /
          Project Worker / Ex-Serviceman / Security Force Personnel / Mathadi
          Workers / religious minorities belong to this category (which should
          be mentioned as appropriate). I / we have lived in Maharashtra for 15
          consecutive years. Also I am working here bhakhulesh nagpur
          interprises / I have my own business. For the financial year 2018-19,
          my total annual family income is Rs. 3,00,000 / -. I / we further
          state that the above information is true and correct. I / we further
          state that, if the above information is found to be incorrect in the
          future. I / We will be responsible for the action and CIDCO will not
          impose any penalty on the corporation. I / we further state that, if
          the above mentioned information is found to be false or incorrect I
          have no objection to cancel the allotted house.
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 30px;
          "
        >
          Signature / thumbprint of the applicant
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 50px;
          "
        >
          Notary's SignatureSeal / Seal
        </p>

        <p style="margin: 0px; padding: 0px">Date:</p>

        <p style="margin: 0px; padding: 0px">Place:</p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          (This affidavitsubmitted by the successful beneficiaries along with
          the documents mentioned in the letter of intent during the scrutiny
          process of the application must be.)
        </p>
      </div>
    </div>
  </body>
</html>

  `;

  //   const affidavitBinEN = `<!DOCTYPE html>
  // <html>
  //   <head> </head>
  //   <body>
  //     <div
  //       style="
  //         display: flex;
  //         flex-direction: column;
  //         justify-content: center;
  //         align-items: center;
  //         margin: 0px;
  //         padding: 0px;
  //         font-size: 12px;
  //         font-family: Arial, serif;
  //       "
  //     >
  //       <div
  //         style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
  //       >
  //         <h2
  //           style="
  //             text-decoration: underline;
  //             font-size: 14px;
  //             margin: 0px;
  //             padding: 0px;
  //             text-align: center;
  //           "
  //         >
  //           Sample - B
  //         </h2>
  //         <p
  //           style="
  //             text-decoration: underline;
  //             font-size: 14px;
  //             margin: 10px;
  //             padding: 0px;
  //             text-align: center;
  //           "
  //         >
  //           (only financially weak or arjadarankarita components: a sample form)
  //         </p>

  //         <p style="margin: 5px; padding: 0px; text-align: right">
  //           (Rs.200 / - muthranka charge on paper Paper)
  //         </p>
  //         <p style="margin: 0px; padding: 0px; text-align: right">
  //           (Non - Judicial Stamp Paper)
  //         </p>

  //         <h2
  //           class="subtitle"
  //           style="font-size: 14px; margin: 5px; padding: 0px; text-align: center"
  //         >
  //           Affidavit
  //         </h2>

  //         <p style="margin: 10px; padding: 0px; width: 90%">
  //           I / We Applicant Mr. / Mrs. ${applicantDetails?.FirstName} ${
  //     applicantDetails?.LastName
  //   } Age ${age && age}
  //           years,Application no. 132706 I am a successful applicant for CIDCO
  //           Mahagrihanirman Yojana October - 2019 Plan indicator no.123456789 and
  //           building no. 35414848 Flat No. 84 the letter of intent has been
  //           received. My Application No. 123647895 dated 22/3/2021 is submitted in
  //           housingscheme under Pradhan Mantri Awas Yojana. I Writes an affidavit
  //           stating that, My / our family has the following members.
  //         </p>
  //         <table
  //           style="
  //             width: 100%;
  //             border: 1px solid black;
  //             border-collapse: collapse;
  //             margin-left: 20px;
  //             padding: 0px;
  //           "
  //         >
  //           <thead>
  //             <tr>
  //               <td
  //                 style="
  //                   border: 1px solid black;
  //                   border-collapse: collapse;
  //                   width: 20%;
  //                 "
  //               >
  //                 S.No.
  //               </td>
  //               <td style="border: 1px solid black; border-collapse: collapse">
  //                 Names of members
  //               </td>
  //               <td style="border: 1px solid black; border-collapse: collapse">
  //                 Relationship
  //               </td>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td style="border: 1px solid black; border-collapse: collapse;
  //                   width: 20%;">
  //                ${familyData[0] ? 1 : ""}
  //               </td>
  //               </td>
  //               <td style="border: 1px solid black; border-collapse: collapse">
  //                 ${familyData[0] ? familyData[0].RelativeFullName : ""}
  //               </td>
  //                <td style="border: 1px solid black; border-collapse: collapse;
  //                   width: 20%;">
  //               ${familyData[0] ? familyData[0].Relationship : ""}
  //               </td>
  //             </tr>
  //             <tr>
  //               <td style="border: 1px solid black; border-collapse: collapse;
  //                   width: 20%;">
  //                ${familyData[1] ? 2 : ""}
  //               </td>
  //               <td style="border: 1px solid black; border-collapse: collapse">
  //                ${familyData[1] ? familyData[1].RelativeFullName : ""}
  //               </td>
  //               <td style="border: 1px solid black; border-collapse: collapse">
  //                 ${familyData[1] ? familyData[1].Relationship : ""}
  //               </td>
  //             </tr>
  //           <tr>
  //               <td style="border: 1px solid black; border-collapse: collapse;
  //                   width: 20%;">
  //                ${familyData[2] ? 3 : ""}
  //               </td>
  //               <td style="border: 1px solid black; border-collapse: collapse">
  //                ${familyData[2] ? familyData[2].RelativeFullName : ""}
  //               </td>
  //               <td style="border: 1px solid black; border-collapse: collapse">
  //                 ${familyData[2] ? familyData[2].Relationship : ""}
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //         <p style="margin: 10px; padding: 0px; width: 90%">
  //           I further write that there is no permanent home anywhere in India
  //           owned by me / us and my / our family members mentioned above. I
  //           declare that I am a General / Scheduled Caste / Scheduled Tribe /
  //           Nomadic Tribe / Vimkat / Tribe / State Government Employee / Navi
  //           Mumbai E Area Journalist / Blind or Physically Handicapped Person /
  //           Project Worker / Ex-Serviceman / Security Force Personnel / Mathadi
  //           Workers / religious minorities belong to this category (which should
  //           be mentioned as appropriate). I / we have lived in Maharashtra for 15
  //           consecutive years. Also I am working here bhakhulesh nagpur
  //           interprises / I have my own business. For the financial year 2018-19,
  //           my total annual family income is Rs. 3,00,000 / -. I / we further
  //           state that the above information is true and correct. I / we further
  //           state that, if the above information is found to be incorrect in the
  //           future. I / We will be responsible for the action and CIDCO will not
  //           impose any penalty on the corporation. I / we further state that, if
  //           the above mentioned information is found to be false or incorrect I
  //           have no objection to cancel the allotted house.
  //         </p>

  //         <p
  //           style="
  //             margin: 10px;
  //             padding: 0px;
  //             text-align: right;
  //             margin-bottom: 30px;
  //           "
  //         >
  //           Signature / thumbprint of the applicant
  //         </p>

  //         <p
  //           style="
  //             margin: 10px;
  //             padding: 0px;
  //             text-align: right;
  //             margin-bottom: 50px;
  //           "
  //         >
  //           Notary's SignatureSeal / Seal
  //         </p>

  //         <p style="margin: 0px; padding: 0px">Date:</p>

  //         <p style="margin: 0px; padding: 0px">Place:</p>

  //         <p style="margin: 10px; padding: 0px; width: 90%">
  //           (This affidavitsubmitted by the successful beneficiaries along with
  //           the documents mentioned in the letter of intent during the scrutiny
  //           process of the application must be.)
  //         </p>
  //       </div>
  //     </div>
  //   </body>
  // </html>
  // `;

  const affidavitCinEn = `<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <h2
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 0px;
            padding: 0px;
            text-align: center;
          "
        >
          Sample - C
        </h2>
        <p
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 10px;
            padding: 0px;
            text-align: center;
          "
        >
          (For low income group applicants only: Sample form)
        </p>

        <p style="margin: 5px; padding: 0px; text-align: right">
          (Rs.200 / - stamp duty notarized on paper)
        </p>
        <p style="margin: 0px; padding: 0px; text-align: right">
          (Non - Judicial Stamp Paper)
        </p>

        <h2
          class="subtitle"
          style="font-size: 14px; margin: 5px; padding: 0px; text-align: center"
        >
          Affidavit
        </h2>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I / We Applicant Mr. / Mrs. ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    } Age ${age && age} years,
          Application no. ……………………………… I am a successful applicant for CIDCO
          Mahagrihanirman Yojana October - 2019 Plan indicator no.
          ……………………………………………………… and building no. …… ……………………………………………… Flat No.
          ……………………………… the letter of intent has been received.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I / we have lived in Maharashtra for 15 consecutive years. Also I am
          working at ……………………………………… / I have my own ……………………………………… business.
          For the financial year 2018-19, my total annual family income is in
          between Rs. 3,00,001 /- to Rs. 6,00,001 /-. I write affidavit stating
          that,
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I declare that I am a General / Scheduled Caste / Scheduled Tribe /
          Nomadic Tribe/ Deprived Tribe / State Government Employee / Navi
          Mumbai E Area Journalist / Blind or Physically Handicapped Person /
          Project Worker / Ex-Serviceman / Security Force Personnel / Mathadi
          Worker / Religious minority CIDCO employees belong to this category.
          (Mention the correct one)
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I / we further state that the above information is true and correct.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I / we further state that if the above information is found to be
          incorrect in future, I / we will be responsible for it and will not
          impose any penalty on CIDCO Corporation.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I / we further state that, if the above mentioned information is found
          to be false or incorrect, I / we will not have any objection to cancel
          the allotted house.
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 30px;
          "
        >
          Signature / thumbprint of the applicant
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 50px;
          "
        >
          Notary's SignatureSeal / Seal
        </p>

        <p style="margin: 0px; padding: 0px">Date:</p>

        <p style="margin: 0px; padding: 0px">Place:</p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          (This affidavit must be submitted by the successful beneficiaries
          along with the documents mentioned in the letter of intent during the
          scrutiny process of the application.)
        </p>
      </div>
    </div>
  </body>
</html>
`;
  const affidavitDinEN = `<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <h2
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 0px;
            padding: 0px;
            text-align: center;
          "
        >
          Sample - D
        </h2>
        <p
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 10px;
            padding: 0px;
            text-align: center;
          "
        >
          (Sample of Maharashtra State Government Officer / Employee)
        </p>
        <p
          style="
            text-decoration: underline;
            font-size: 12px;
            margin: 10px;
            padding: 0px;
            text-align: center;
          "
        >
          (On the letterhead of the establishment)
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          certificate of being a He / she
          ${applicantDetails?.FirstName} ${applicantDetails?.LastName} is working in this
          department as a permanent Maharashtra State Government employee and
          his / her date of appointment is ……………………………………. He / she is currently
          working in this position ………………………………………………………… in this department
          ………………………………………………………… .
        </p>

        <p style="margin: 0px; padding: 0px">Date :</p>

        <p style="margin: 0px; padding: 0px">Location :</p>
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 30px;
          "
        >
          Signature / Seal of Authorized Government Officer
        </p>
      </div>
    </div>
  </body>
</html>
`;
  const affidavitEinEN = `<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <h2
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 0px;
            padding: 0px;
            text-align: center;
          "
        >
          Sample - E
        </h2>
        <p
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 10px;
            padding: 0px;
            text-align: center;
          "
        >
          (for Navi Mumbai area journalists)
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I / We Applicant Mr. / Mrs. ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    } Age ${age & age} years,
          application no. ……………………………………………………… CIDCO plans mahagrhanirmana
          October - 9 from 201 successful applicants Code No. I have a plan.
          ……………………………………………………… and building no. ………………… Flat No. ……………………………………
          The letter of intent has been received.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I am working as a journalist in Navi Mumbai areabyDirector General,
          Information and Public Relations (DGIPR) and I am fully aware that it
          is mandatory to submit a photocopy of the certificate and identity
          card issued the.
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          My group includes editor / leader writer / news editor, news writer,
          copy tester, newscaster, cartoonist / news photographer, print
          investigator /reputed weekly / freelance journalist in a magazine or
          magazine.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          Also,the newspaper management and administration department as well as
          staff working as supervisors, staff I do not belong to this group of
          staff working in the form of management.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I / we further state that, if the above mentioned information is found
          to be false or incorrect, I / we will not have any objection to
          cancelling the allotted house.
        </p>

        <p style="margin: 0px; padding: 0px">Date : …………………………………………</p>

        <p style="margin: 0px; padding: 0px">Location :…………………………………………</p>
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 30px;
          "
        >
          Signature
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 50px;
          "
        >
          Applicant's Name ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    }
        </p>
      </div>
    </div>
  </body>
</html>
`;
  const affidavitFinEN = `<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <h2
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 0px;
            padding: 0px;
            text-align: center;
          "
        >
          Sample - F
        </h2>
        <p
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 10px;
            padding: 0px;
            text-align: center;
          "
        >
          (For Religious Minority Category)
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I / We Applicant Mr. / Mrs. ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    } Age ${age & age} years,
          application no. …………………………………………………… CIDCO plans mahagrhanirmana
          October - 9 from 2019 successful applicants Code No. I have a plan.
          ……………………………………………………… and building no. …………………… Flat No. …………………… The
          letter of intent has been received.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I have applied in the category of religious minorities and I belong to
          the category of the National Minorities CommissionCentral Government
          Muslims /notified as religious minorities in Part 2 (a) of the Gazette
          ofAct, 1992 of the Sikhs / Christians / Buddhists / Parsis / Jains.
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I / we further state that, if the above mentioned information is found
          be false or incorrect, toI / we will not have any objection to cancel
          the allotted house.
        </p>

        <p style="margin: 0px; padding: 0px">Date : …………………………………………</p>

        <p style="margin: 0px; padding: 0px">Location :…………………………………………</p>
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 30px;
          "
        >
          Signature
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 50px;
          "
        >
          Applicant's Name ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    }
        </p>
      </div>
    </div>
  </body>
</html>
`;
  const phConcentLetterinEN = `<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <h2
          style="font-size: 14px; margin: 0px; padding: 0px; text-align: center"
        >
          Consent Form
        </h2>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I Mr. / Mrs. ${applicantDetails?.FirstName} ${applicantDetails?.LastName} Application no. …………………………………………
          CIDCO is a successful applicant from the Divyang category in leaving
          online 2020. In this draw, I got building no. …………………………… Flat No.
          ……………………………… Sector- ……………………… Plan no. I have got a flat here.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I am giving consent as follows regarding this flat.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          A) The flat should have a toilet / bathroom for the
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          B) The toilets / bathrooms of this flat general category should be
          designed for.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I have been informed that the above option cannot be changed in the
          future. Also, I will not have any complaints about the above option in
          future.
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 30px;
          "
        >
          Signature of the applicant: …………………………………………
        </p>

        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 50px;
          "
        >
          Name of the applicant: ${applicantDetails?.FirstName} ${applicantDetails?.LastName}
        </p>
        <p style="margin: 0px; padding: 0px">Date :</p>

        <p style="margin: 0px; padding: 0px">Location :</p>
      </div>
    </div>
  </body>
</html>
`;
  const nonWorkingCLinEN = `<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 10px;
            font-weight: bold;
          "
        >
          Date ……………………………………
        </p>
        <h2
          style="font-size: 14px; margin: 0px; padding: 0px; text-align: center"
        >
          Self Declaration
        </h2>
        <p
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 10px;
            padding: 0px;
            text-align: center;
            font-weight: bold;
          "
        >
          (If the applicant is not doing job / business)
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I so / Mr. ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    }, age ${age & age} years, ………………………,occupation
          ${applicantDetails?.Occupation
    }, application no. ……………………… , will stay ……………………………………………………
          declares on the true pledge that,I myself am not currently working
          anywhere or doing any business.Therefore, my income for the financial
          year 2018-2019 is fixed.I state in public, that following members are
          there in my family.
        </p>
        <table
          style="
            width: 100%;
            border: 1px solid black;
            border-collapse: collapse;
            margin-left: 20px;
            padding: 0px;
          "
        >
          <thead>
            <tr>
              <td
                style="
                  border: 1px solid black;
                  border-collapse: collapse;
                  width: 10%;
                "
              >
                S.No.
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Names of members
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Relationship
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Business / job income
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                ${familyData[0] ? 1 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                 ${familyData[0] ? familyData[0].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
               ${familyData[0] ? familyData[0].Relationship : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
          <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                ${familyData[1] ? 2 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                 ${familyData[1] ? familyData[1].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
          ${familyData[0] ? familyData[0].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
           <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                ${familyData[2] ? 3 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                 ${familyData[2] ? familyData[2].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
               ${familyData[2] ? familyData[2].Relationship : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                &nbsp;
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 10px; padding: 0px; width: 90%">
          The above information is true and correct
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I further state that, if the above information found to be incorrect
          in future, I will be responsible for the action taken and will not
          impose any kind of condolence on CIDCO Corporation. I will have no
          objection to the cancellation of the allotted house in the same way.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          Satyapratijya was announced today on ……………/……………/20 in Navi Mumbai
        </p>
        <p style="margin: 0px; padding: 0px">Date: …………………………………</p>
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 5px;
          "
        >
          (
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
        </p>
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 50px;
          "
        >
          Applicant
        </p>
      </div>
    </div>
  </body>
</html>
`;

  const nonWorkingSpouseCLinEN = `<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        font-size: 12px;
        font-family: Arial, serif;
      "
    >
      <div
        style="width: 612px; border-style: outset; padding: 30px; margin: 0px"
      >
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 10px;
            font-weight: bold;
          "
        >
          Date ……………………………………
        </p>
        <h2
          style="font-size: 14px; margin: 0px; padding: 0px; text-align: center"
        >
          Self Declaration
        </h2>
        <p
          style="
            text-decoration: underline;
            font-size: 14px;
            margin: 10px;
            padding: 0px;
            text-align: center;
            font-weight: bold;
          "
        >
          (If the spouse of the applicant is not doing job/business)
        </p>

        <p style="margin: 10px; padding: 0px; width: 90%">
          I so / Mr. ${applicantDetails?.FirstName} ${applicantDetails?.LastName
    }, age ${age & age} years, ………………………,occupation
            ${applicantDetails?.Occupation
    }, application no. ……………………… , will stay ……………………………………………………
          declares on the true pledge that,My husband / wife Shri./Sou
          …………………………………………………………………… currently notnot working anywhere or doing
          any business. Therefore, the financial income for the year 2020-2021
          is fixed.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I state in public, that following members are there in my family.
        </p>
        <table
          style="
            width: 100%;
            border: 1px solid black;
            border-collapse: collapse;
            margin-left: 20px;
            padding: 0px;
          "
        >
          <thead>
            <tr>
              <td
                style="
                  border: 1px solid black;
                  border-collapse: collapse;
                  width: 10%;
                "
              >
                S.No.
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Names of members
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Relationship
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                Business / job income
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                ${familyData[0] ? 1 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                 ${familyData[0] ? familyData[0].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
               ${familyData[0] ? familyData[0].Relationship : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
          <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                ${familyData[1] ? 2 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                 ${familyData[1] ? familyData[1].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
               ${familyData[1] ? familyData[1].Relationship : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
           <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                ${familyData[2] ? 3 : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                 ${familyData[2] ? familyData[2].RelativeFullName : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
               ${familyData[2] ? familyData[2].Relationship : ""}
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; border-collapse: collapse;
                  width: 10%;">
                &nbsp;
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
              <td style="border: 1px solid black; border-collapse: collapse">
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 10px; padding: 0px; width: 90%">
          The above information is true and correct
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          I further state that, if the above information is found to bebe
          incorrect in future, I will be responsible for the action taken and
          will not impose any kind of condolence on CIDCO Corporation. I will
          have no objection to the cancellation of the allotted house in the
          same way.
        </p>
        <p style="margin: 10px; padding: 0px; width: 90%">
          Satyapratijne on this date ……………… / ……………… / 2021 that was announced
          in Mumbai.
        </p>
        <p style="margin: 0px; padding: 0px">Date: …………………………………</p>
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 5px;
          "
        >
          (
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
        </p>
        <p
          style="
            margin: 10px;
            padding: 0px;
            text-align: right;
            margin-bottom: 50px;
          "
        >
          Applicant
        </p>
      </div>
    </div>
  </body>
</html>
`;

  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  // function b64_to_utf8(str) {
  //   return decodeURIComponent(escape(window.atob(str)));
  // }
  let encodeDataAffidavitB = utf8_to_b64(affidavitBinEN);
  let encodeDataAffidavitC = utf8_to_b64(affidavitCinEn);
  let encodeDataAffidavitD = utf8_to_b64(affidavitDinEN);
  let encodeDataAffidavitE = utf8_to_b64(affidavitEinEN);
  let encodeDataAffidavitF = utf8_to_b64(affidavitFinEN);
  let encodeDataPHcl = utf8_to_b64(phConcentLetterinEN);
  let encodeDataNonWorkApplicant = utf8_to_b64(nonWorkingCLinEN);
  let encodeDataNonWorkSpouse = utf8_to_b64(nonWorkingSpouseCLinEN);
  // console.log(encodeDataAffidavitB);
  // var decod1 = b64_to_utf8(encodeDataAffidavitB);
  // var decod2 = b64_to_utf8(encodeDataAffidavitC);
  // var decod3 = b64_to_utf8(encodeDataAffidavitD);
  // var decod4 = b64_to_utf8(encodeDataAffidavitE);
  // var decod5 = b64_to_utf8(encodeDataAffidavitF);
  // var decod6 = b64_to_utf8(encodeDataPHcl);
  // var decod7 = b64_to_utf8(encodeDataNonWorkApplicant);
  // console.log(decod1);
  // console.log(decod2);
  // console.log(decod3);
  // console.log(decod4);
  // console.log(decod5);
  // console.log(decod6);
  // console.log(decod7);

  useEffect(() => {
    console.log(documents);
    if (documents?.length > 0 && applicantData) {
      const isAffidavitB = documents.some((element) => element == 1);
      const isAffidavitC = documents.some((element) => element == 2);
      const isAffidavitAc = documents.some((element) => element == 3);
      const isAffidavitD = documents.some((element) => element == 4);
      const isAffidavitE = documents.some((element) => element == 5);
      const isAffidavitF = documents.some((element) => element == 6);
      const isPhConcentLetter = documents.some((element) => element == 7);
      const isNonWorkingApplicantCl = documents.some((element) => element == 8);
      // const Lang = localStorage.getItem("i18nextLng");
      // if (Lang === "en") {
      // console.log(isAffidavitB, isAffidavitC, isAffidavitD, isAffidavitF);
      let tempArr = [];
      if (isAffidavitB) {
        tempArr.push(encodeDataAffidavitB);
      }
      if (isAffidavitC) {
        tempArr.push(encodeDataAffidavitC);
      }
      if (isAffidavitD) {
        tempArr.push(encodeDataAffidavitD);
      }
      if (isAffidavitE) {
        tempArr.push(encodeDataAffidavitE);
      }
      if (isAffidavitF) {
        tempArr.push(encodeDataAffidavitF);
      }
      if (isPhConcentLetter) {
        tempArr.push(encodeDataPHcl);
      }
      if (isNonWorkingApplicantCl) {
        tempArr.push(encodeDataNonWorkApplicant);
      }
      setHtmlDocs(tempArr);
      // console.log(tempArr);
      // }
    }
  }, [documents]);

  useEffect(() => {
    if (htmlDocs?.length > 0) {
      // console.log(htmlDocs);
      let appicantId = localStorage.getItem("applicantId");
      htmlDocs.forEach((document) => {
        dispatch(htmlToPdf({ Applicantid: appicantId, html: document }));
      });
    }
  }, [htmlDocs]);

  const proceedEstamping = (file, addFIle) => {
    const requestData = {
      ApplicantId: localStorage.getItem("applicantId"),
      Lang: localStorage.getItem("i18nextLng"),
      LegalityPayload: {
        profileId: "v403hfm",
        file: {
          name: `documents-${applicantData.FirstName}`,
          file: file,
          fields: null,
          additionalFiles: addFIle,
        },
        stampSeries: "string",
        seriesGroup: "string",
        stampValue: sum,
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

  // useEffect(() => {
  //   if (isSuccessResApplicant) {
  //     const requestData = {
  //       Applicantid: localStorage.getItem("applicantId"),
  //       html: encodeDataAffidavitB,
  //     };
  //     dispatch(htmlToPdf(requestData));
  //   }
  // }, [dispatch, isSuccessResApplicant]);

  useEffect(() => {
    if (pdfData) {
      // console.log(pdfData);
      const addPdf = `${pdfData}.pdf`;
      setEncodedDocs((prevState) => [...prevState, addPdf]);
      // const tempBox = [];
      // enCodedDocs.push(`${pdfData}.pdf`);
      // const ActualpdfData = `${pdfData}.pdf`;
      // console.log(ActualpdfData);
      // proceedEstamping(tempBox);
      // console.log(pdfData);
      // console.log(tempBox);
      // setEncodedDocs(enCodedDocs);
    }
  }, [pdfData]);

  useEffect(() => {
    if (enCodedDocs.length > 0) {
      console.log(enCodedDocs);
      console.log(`Html: ${htmlDocs.length} & Pdf:  ${enCodedDocs.length}`);
      if (htmlDocs.length === enCodedDocs.length) {
        // const newEncoded = enCodedDocs.shift();
        proceedEstamping(enCodedDocs[0], enCodedDocs);
        console.log(enCodedDocs);
      }
    }
  }, [enCodedDocs]);

  useEffect(() => {
    if (isSuccess && estampData?.invitees?.length > 0) {
      let signLink = estampData.invitees.map((link) => link.signUrl);
      console.log(estampData);
      console.log(...signLink);
      setSignLinkUrl(...signLink);
      window.open(signLinkUrl, "_self");
    }
  }, [estampData, isSuccess, signLinkUrl, applicantDetails]);

  return (
    <div>{isFetchingEstamping && <Loading isOpen={isFetchingEstamping} />}</div>
  );
}

export default EstampingProcess;
