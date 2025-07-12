import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { KycStepperBoxStyle } from "./KycStepperBox.style";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import MobileStepper from "../MobileStepper/MobileStepper";
import { useSelector, useDispatch } from "react-redux";
import { getStepperDetails } from "../../../redux/features/stepper/StepperSlice";
import { CheckRounded, WhiteBackArrowIcon } from "../SvgIcons/SvgIcons";
import { IconButton } from "@material-ui/core";
import { applicantSelector } from "../../../redux/features/applicant/ApplicantSlice";

const KycStepperBox = (props) => {
  const { title, description, callingForMobileIs, onBack, otpOn } = props;
  const classes = KycStepperBoxStyle();
  const { t } = useTranslation("Translation");
  const currentPathName = useLocation().pathname;
  const dispatch = useDispatch();
  const stepperData = useSelector((state) => state.stepper.stepperData);
  const [stepperList, setStepperList] = useState([]);

  const { applicantData, isSuccessResApplicantGet } =
    useSelector(applicantSelector);
  useEffect(() => {
    dispatch(getStepperDetails());
  }, [dispatch]);

  useEffect(() => {
    if (stepperData.superStepper) {
      let modifiedStpprList = [];
      for (let y = 0; y < stepperData.superStepper[0].applicantKycStepper.length; y++) {
        const element = stepperData.superStepper[0].applicantKycStepper[y];
        let json_path = `subStepperSection.step${element.step}`;
        let activePath = ''
        var new_obj = {
          ...element,
          pageName: applicantData?.register_type === 'company' && json_path === `subStepperSection.step${1}` ? 'Verify GST': t(json_path),
          activePath
        };
        modifiedStpprList.push(new_obj);
      }
      // if (currentPathName === "/auth-verify-aadhaar") {
        // modifiedStpprList[0].status = "active";
        // modifiedStpprList[0].activePath = 'active'
      // }

      if (currentPathName === "/auth-verify-aadhaar") {
        modifiedStpprList[0].activePath = 'active';
      } else if (currentPathName === "/auth-verify-gst") {
        modifiedStpprList[0].pageName = t(`subStepperSection.step${4}`);
        modifiedStpprList[0].activePath = 'active';
      }

      // if (currentPathName === "/upload-aadhaar") {
      //   modifiedStpprList[1].status = "active";
      // }
      if (currentPathName === "/verify-pancard") {
        // modifiedStpprList[1].status = "active";
        modifiedStpprList[1].activePath = 'active'
      }
      // if (currentPathName === "/upload-pancard") {
      //   modifiedStpprList[3].status = "active";
      // }
      if (currentPathName === "/bank-account-detail" || currentPathName === "/bank-detail") {
         modifiedStpprList[2].activePath = "active";
          }
      // if (currentPathName === "/upload-cheque") {
      //   modifiedStpprList[5].status = "active";
      // }
      setStepperList(modifiedStpprList);
    }
    /* if (stepperData.superStepper) {
      setStepperList(stepperData.superStepper[0].applicantKycStepper);
    } */
  }, [stepperData, t]);

  return (
    <>
      {!callingForMobileIs && (
        <Container className={classes.stepperContainer}>
          <Grid container justify="center">
            {stepperList?.map((element, index) => (
              <Grid item xs key={index}>
                 {element.title === "Verify Aadhaar" || element.title === "Verify PAN" || element.title === "Bank Details" ? (
                  <Box className={classes.stepperBox}>
                    <Box className={`${classes.numRoundBox} ${element.activePath}`}>
                      <span className={`${classes.stepperNumber} ${element.activePath}`}>
                        {element.status !== 'completed' ? element.step : <CheckRounded color="white" style={{ fontSize: '1.9rem' }} />}
                      </span>
                    </Box>
                    <Typography className={`${classes.stepperText} ${element.activePath}`}>
                      {element.pageName}
                    </Typography>
                    {element.isBeforeLine && (
                      <span className={`${classes.stepBeforeAfterLine} ${element.status}`}></span>
                    )}
                    {(element.isAfterLine && index !== stepperList.length - 1) && (
                      <span className={`${classes.stepBeforeAfterLine} after ${element.status}`}></span>
                    )}
                  </Box>
                ) : ""}
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {callingForMobileIs && (
        <>
          <div className={classes.titleContainer}>
            {otpOn ? <Grid container style={{ gap: 16 }}>
              <IconButton style={{ marginBottom: 14 }} onClick={() => onBack()}> <WhiteBackArrowIcon fontSize="small" /></IconButton>
              <Typography variant="h5" gutterBottom className={classes.title}>
                {title}
              </Typography>
            </Grid> :
              <Typography variant="h5" gutterBottom className={classes.title}>
                {title}
              </Typography>}
            {description && (
              <Typography variant="subtitle1" className={classes.subtitle} style={{ textAlign: "center" }}>
                {description}
              </Typography>
            )}
            {/* <Grid container spacing={2}> */}
            {/* <Grid item xs={12}>
                
              </Grid> */}
            {/* <Grid item xs={2}>
                {stepperList.length > 0 &&
                  <MobileStepper stepperList={stepperList} />
                }
              </Grid> */}
            {/* <Grid item xs={12}>
                
              </Grid> */}
            {/* <Grid item xs={4}></Grid> */}
            {/* </Grid> */}
          </div>
        </>
      )}
    </>
  );
};

export default KycStepperBox;


// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";
// import Box from "@material-ui/core/Box";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import { KycStepperBoxStyle } from "./KycStepperBox.style";
// import { CheckRounded, WhiteBackArrowIcon } from "../SvgIcons/SvgIcons";
// import { Container, IconButton } from "@material-ui/core";

// const KycStepperBox = (props) => {
//   const { title, description, callingForMobileIs, onBack, otpOn } = props;
//   const classes = KycStepperBoxStyle();
//   const { t } = useTranslation("Translation");
//   const currentPathName = useLocation().pathname;

//   // Replace the initial state with the provided data
//   const [stepperData, setStepperData] = useState({
//     superStepper: [
//       {
//         step: 1,
//         description: "Personal Details",
//         status: "completed",
//         applicantKycStepper: [
//           {
//             step: 1,
//             title: "Verify Aadhaar",
//             status: "completed",
//             isAfterLine: true,
//             isBeforeLine: false,
//           },
//           {
//             step: 2,
//             title: "Verify PAN",
//             status: "completed",
//             isAfterLine:true,
//             isBeforeLine: true,
//           },
//           {
//             step: 3,
//             title: "Bank Detail",
//             status: "completed",
//             isAfterLine: false,
//             isBeforeLine: true,
//           },
//         ],
//         coApplicantKycStepper: [
//           {
//             step: 1,
//             title: "Verify Aadhaar",
//             status: "pending",
//             isAfterLine: true,
//             isBeforeLine: false,
//           },
//           {
//             step: 2,
//             title: "Verify PAN",
//             status: "pending",
//             isAfterLine: false,
//             isBeforeLine: true,
//           },
//         ],
//       },
//       {
//         step: 2,
//         description: "Category Details",
//         status: "pending",
//       },
//       {
//         step: 3,
//         description: "Submit Affidavit",
//         status: "pending",
//       },
//       {
//         step: 4,
//         description: "Make Payment",
//         status: "pending",
//       },
//     ],
//   });

//   const [stepperList, setStepperList] = useState([]);

//   useEffect(() => {
//     if (stepperData.superStepper) {
//       let modifiedStpprList = [];
//       for (let y = 0; y < stepperData.superStepper[0].applicantKycStepper.length; y++) {
//         const element = stepperData.superStepper[0].applicantKycStepper[y];
//         let json_path = `subStepperSection.step${element.step}`;
//         let activePath = "";
//         var new_obj = {
//           ...element,
//           pageName: t(json_path),
//           activePath,
//         };
//         modifiedStpprList.push(new_obj);
//       }
//       if (currentPathName === "/auth-verify-aadhaar") {
//         modifiedStpprList[0].activePath = "active";
//       }
//       if (currentPathName === "/verify-pancard") {
//         modifiedStpprList[1].activePath = "active";
//       }
//       if (currentPathName === "/bank-account-detail" || currentPathName === "/bank-detail") {
//         modifiedStpprList[2].activePath = "active";
//       }
//       setStepperList(modifiedStpprList);
//     }
//   }, [stepperData, t]);
  

//   return (
//     <>
//       {!callingForMobileIs && (
//         <Container className={classes.stepperContainer}>
//           <Grid container justify="center">
//             {stepperList?.map((element, index) => (
//               <Grid item xs key={index}>
//                 {element.title === "Verify Aadhaar" || element.title === "Verify PAN" || element.title === "Bank Detail" ? (
//                   <Box className={classes.stepperBox}>
//                     <Box className={`${classes.numRoundBox} ${element.activePath}`}>
//                       <span className={`${classes.stepperNumber} ${element.activePath}`}>
//                         {element.status !== 'completed' ? element.step : <CheckRounded color="white" style={{ fontSize: '1.9rem' }} />}
//                       </span>
//                     </Box>
//                     <Typography className={`${classes.stepperText} ${element.activePath}`}>
//                       {element.pageName}
//                     </Typography>
//                     {element.isBeforeLine && (
//                       <span className={`${classes.stepBeforeAfterLine} ${element.status}`}></span>
//                     )}
//                     {element.isAfterLine && index !== stepperList.length - 1 && (
//                       <span className={`${classes.stepBeforeAfterLine} after ${element.status}`}></span>
//                     )}
//                   </Box>
//                 ) : ""}
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       )}
//       {callingForMobileIs && (
//         <div className={classes.titleContainer}>
//           {otpOn ? (
//             <Grid container style={{ gap: 16 }}>
//               <IconButton style={{ marginBottom: 14 }} onClick={() => onBack()}>
//                 <WhiteBackArrowIcon fontSize="small" />
//               </IconButton>
//               <Typography variant="h5" gutterBottom className={classes.title}>
//                 {title}
//               </Typography>
//             </Grid>
//           ) : (
//             <Typography variant="h5" gutterBottom className={classes.title}>
//               {title}
//             </Typography>
//           )}
//           {description && (
//             <Typography variant="subtitle1" className={classes.subtitle} style={{ textAlign: "center" }}>
//               {description}
//             </Typography>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default KycStepperBox;
