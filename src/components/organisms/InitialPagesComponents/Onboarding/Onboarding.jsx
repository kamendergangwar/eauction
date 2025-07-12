import {
  Container,
  Tabs,
  Tab,
  Typography,
  Grid,
  Box,
  Divider,
  IconButton,
  Hidden,
  Button,
  Icon,
} from "@material-ui/core";
import React from "react";
import {
  SliderNavLeftArrow,
  BlueArrowIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import { ApiEndPoint } from "../../../../utils/Common";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormControl from "../../../molecules/FormControl/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { changeIsReadInstruction, changeReadInstructionErrorMessage, uncontrolledFormSelector } from "../../../../redux/features/uncontrolledForm/UncontrolledForm";
import { useTranslation } from "react-i18next";
import { ActiveAllotmentLetterImage, ActivePayApplicationFeeImage, ActiveProveEligibilityImage, ActiveSelectFlatImage, ActiveUploadDocumentImage, AllotmentLetterImage, PayApplicationFeeImage, ProveEligibilityImage, SelectFlatImage, UploadDocumentImage } from "../../../molecules/DialogBoxes/OnboardingDialogBox/OnboardingSvgImages";
import { onboardingStyles } from "./Onboarding.styles";
import UserPDFViewDialogBox from "../../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import { useState } from "react";

const Onboarding = (props) => {
  const { t } = useTranslation("InitialPageTrans");
  const classes = onboardingStyles();
  const { setGuideVideoDialogOpenIs, handleClose } = props;
  const dispatch = useDispatch();
  const readInstructionFormikRef = React.useRef();
  const { isReadInstruction, readInstructionErrorMessage } = useSelector(uncontrolledFormSelector);
  const [activeStep, setActiveStep] = React.useState(0);
  const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);
  const initialValues = {
    checkbox: isReadInstruction
  };

  const getOnboardingSteps = activeStep => {
    let titleImageStyle = { width: '110px', height: "106px" }
    return [
      {
        step: 1,
        name: t("onboarding.journeySteps.step1"),
        icon: activeStep == 0 ? <ActiveProveEligibilityImage style={titleImageStyle} /> : <ActiveProveEligibilityImage style={titleImageStyle} />
      },
      {
        step: 2,
        name: t("onboarding.journeySteps.step2"),
        icon: activeStep == 1 ? <ActiveUploadDocumentImage style={titleImageStyle} /> : <ActiveUploadDocumentImage style={titleImageStyle} />
      },
      {
        step: 3,
        name: t("onboarding.journeySteps.step3"),
        icon: activeStep == 2 ? <ActivePayApplicationFeeImage style={titleImageStyle} /> : <ActivePayApplicationFeeImage style={titleImageStyle} />
      },
      {
        step: 4,
        name: t("onboarding.journeySteps.step4"),
        icon: activeStep == 3 ? <ActiveSelectFlatImage style={titleImageStyle} /> : <ActiveSelectFlatImage style={titleImageStyle} />
      },
      {
        step: 5,
        name: t("onboarding.journeySteps.step5"),
        icon: activeStep == 4 ? <ActiveAllotmentLetterImage style={titleImageStyle} /> : <ActiveAllotmentLetterImage style={titleImageStyle} />
      },
    ];
  }

  const validationSchema = yup.object({
    acceptTerms: yup
      .bool()
      .oneOf([true], "required, I have read the instructions and understood"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log(values)
  }
  const docPreviewDialogCloseFun = () => {
    setDocPreviewDialogOpen(false);
  };

  const Steps = getOnboardingSteps(activeStep);

  const handleChange = (event, newActiveStep) => {
    setActiveStep(newActiveStep);
  };

  const handleAcceptCondition = () => {
    dispatch(changeReadInstructionErrorMessage(""))
    dispatch(changeIsReadInstruction(isReadInstruction))
  }


  React.useEffect(() => {
    const readInstructionFormik = readInstructionFormikRef.current;
    if (readInstructionFormik) {
      readInstructionFormik.resetForm();
    }
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      activeStep + 1 === Steps.length
        ? setActiveStep(0)
        : setActiveStep(activeStep + 1);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [activeStep]);

  const tabsStyles = index => {
    return {
      borderRadius: 5,
      cursor: "pointer",
      color: activeStep === index ? "#001979" : "inherit",
      backgroundColor: activeStep === index ? "#FFFFFF" : "#D9D9D9",//"#fcfcfc",
      boxShadow: activeStep === index ? "rgb(0, 56, 192) 14px 2px 29px -16px" : "",
      zIndex: activeStep === index ? 1 : '',
      alignItems: "flex-start"
    }
  }

  return (
    <>
      <Container maxWidth="lg" style={{ padding: '10px' }}>
        {/* <Typography variant="h5" align="center" style={{fontWeight:600, fontSize: 22}}>{t("onboarding.noticeHeading")}</Typography> */}
        <ol style={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>
          <li>{t("onboarding.noticePoint1")}</li>
          <li>{t("onboarding.noticePoint2")}<span style={{ color: "#0038C0", fontWeight: "700", cursor: "pointer" }} onClick={(e) => { setDocPreviewDialogOpen(true); e.stopPropagation() }}> {t("onboarding.clickHere")}</span> </li>
          <li>{t("onboarding.noticePoint3.before")}<span style={{ color: "#0038C0", fontWeight: "700", cursor: "pointer" }} onClick={() => setGuideVideoDialogOpenIs(true)}> {t("onboarding.noticePoint3.highLight2")} </span> {t("onboarding.noticePoint3.after")}</li>
          <li>{t("onboarding.noticePoint4.before")}<span style={{ fontWeight: "700" }}> {t("onboarding.noticePoint4.highLight")} </span>{t("onboarding.noticePoint4.after")}
            <ul style={{ fontSize: "15px" }}>
              <li>{t("onboarding.noticePoint4.subPoint1")}</li>
              <li>{t("onboarding.noticePoint4.subPoint2")}</li>
            </ul>
          </li>
          <li>{t("onboarding.noticePoint5")}:<span style={{ color: "#0038C0", fontWeight: "700" }}> +91 9930870000</span>{" "}{t("onboarding.noticePoint5A")}</li>
        </ol>
      </Container>
      <Divider />
      <Hidden smDown>
        <Grid container maxWidth="lg" justifyContent="space-between" alignItems="center" style={{ padding: '10px 15px' }}>
          <Typography align='center' variant='h6' style={{ fontWeight: 700, fontSize: 20 }}>{t("onboarding.journeyHeading")}</Typography>
          <Grid
            item
            md={2}
            sm={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton
              size="small"
              onClick={() => { setActiveStep(activeStep - 1); }}
              disabled={activeStep === 0}
            >
              <SliderNavLeftArrow style={{ fontSize: "x-large", fill: "transparent"}} stroke={activeStep === 0 ? "rgb(151 153 161 / 97%)" : '#001979'}/>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => { setActiveStep(activeStep + 1) }}
              disabled={activeStep + 1 === Steps.length}
            >
              <BlueArrowIcon style={{ fontSize: "28px", fill: "transparent"}} stroke={activeStep + 1 === Steps.length? "rgb(151 153 161 / 97%)" : '#001979'} />
            </IconButton>
          </Grid>
        </Grid>
        <Box display="flex" paddingBottom="10px" paddingX={2}>
          {/* <Tabs
            value={activeStep}
            onChange={handleChange}
            textColor="primary"
            aria-label="icon label tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#0038C0",
              },
            }}
            style={{ borderLeft: activeStep === 0 ? "2px solid #0038C0" : "1px solid #626262" }}
          >
            {Steps.map((element, index) => {
              return (
                  <Tab
                    onClick={() => { setActiveStep(index) }}
                    icon={element.icon}
                    value={index}
                    label={element.name}
                    className={activeStep + 1 == index ? classes.tabAllActive : classes.tabAll}
                    style={{ ...tabsStyles(index), }}
                  />
              );
            })}
          </Tabs> */}
          {Steps.map((element, index) => {
            return (
              <Box onClick={() => { setActiveStep(index) }} className={activeStep == index ? classes.tabAllActive : classes.tabAll} style={{ ...tabsStyles(index) }}>
                <span
                  className={`${classes.stepNoDiv} ${activeStep == index  ? "current" : ""
                    }`}
                >
                  {element.step}
                </span>
                <Box display="flex" flexDirection="column" alignItems="center" width="fit-content" maxWidth="250px" minWidth="160px" padding="5px">
                  <Box>
                    <Icon>{element.icon}</Icon>
                  </Box>
                  <Typography align="center">{element.name}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Hidden>
      <Container maxWidth="lg">
        <Grid xs={12} container justifyContent="space-between" alignItems="center">
          <Grid conatiner justifyContent="center" alignItems="center" flexDirection="column" paddingBottom="5px">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              innerRef={readInstructionFormikRef}
            >
              {({ values, setFieldValue }) => (
                <Form noValidate autoComplete="off" style={{ paddingLeft: "15px" }}>
                  <div>
                    <FormControl
                      control="checkbox"
                      type="checkbox"
                      name='checkbox'
                      id='check'
                      label={t("onboarding.acceptCondition")}
                      color="primary"
                      style={{ color: readInstructionErrorMessage ? 'red' : '' }}
                      checked={isReadInstruction}
                      onChange={() => { setFieldValue("check", !isReadInstruction); handleAcceptCondition(); }}
                    />
                  </div>
                </Form>
              )}
            </Formik>
            <Typography style={{ fontSize: "1em", lineHeight: 0.5, color: "#fff", backgroundColor: readInstructionErrorMessage ? "rgb(255,0,0)" : "transparent", borderRadius: "10px", padding: "8px" }}>{readInstructionErrorMessage}</Typography>
          </Grid>
          <Grid>
            <Button variant="contained" color='primary' onClick={handleClose}>{t("termsConditions.formControl.buttonText")}</Button>
          </Grid>
        </Grid>
        <UserPDFViewDialogBox showDownload={true} open={docPreviewDialogOpenIs} onClose={docPreviewDialogCloseFun} fileUrl={`${ApiEndPoint}/uploads/files/Mandatory_Document.pdf`} />
      </Container>
    </>
  );
};

export default Onboarding;
