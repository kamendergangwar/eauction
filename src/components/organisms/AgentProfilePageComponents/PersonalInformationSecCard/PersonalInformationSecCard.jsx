import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from "moment";
import { useHistory } from "react-router-dom";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {
  EStampColoredIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { AgentProfileViewsStyles } from "../AgentProfileViews.styles";
import AgntPersonalInformationEditDialogBox from "../../../molecules/DialogBoxes/AgntPersonalInformationEditDialogBox/AgntPersonalInformationEditDialogBox";
import Image from "../../../../assets/Profile.jpg";
import { Icon, IconButton } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { ApiEndPoint } from "../../../../utils/Common";

const PersonalInformationSecCard = (props) => {
  const { agentProfileData, profileImageUrl, notificationsSendIs, afterUpdateProfile } = props;
  const { t } = useTranslation("AgentProfilePageTrans");
  const classes = AgentProfileViewsStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [marritalStatus, setMarritalStatus] = React.useState("");
  const history = useHistory();
  const [checked, setChecked] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [pdfLoading, setPdfLoading] = React.useState(false);


  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const handleModalClose = (value) => {
    setEditDialogOpen(false);
  };

  const downloadApplicantReport = () => {
    
    setPdfLoading(true);
    let fileUrl = `${ApiEndPoint}/AgentApplicants/GetApplicantsRecord/${localStorage.getItem('agentcode')}`;
    fetch(fileUrl, {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("agentjwtToken"),
        },
    }).then((response) => response.blob()).then((blob) => {
        setPdfLoading(false);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ApplicantsRecord.csv';
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 300);
    }).catch(function (error) {
        setPdfLoading(false);
        alert("Applicants Record not found");
    });
};


  /* const genderList = [
    {
      value: "1",
      label: t(
        "personalInfoEdit.formControl.genderOptions.male"
      ),
    },
    {
      value: "2",
      label: t(
        "personalInfoEdit.formControl.genderOptions.female"
      ),
    },
    {
      value: "3",
      label: t(
        "personalInfoEdit.formControl.genderOptions.other"
      ),
    },
  ]; */

  /* useEffect(() => {
    let appCardList = [];
    console.log("applicationsData", applicationsData);
    for (let i = 0; i < applicationsData.length; i++) {
      const element = applicationsData[i];
      let stepper = JSON.parse(element.Stepper);
      let superStepper = stepper.superStepper;
      let steps_list = [];
      let step_1_obj = {
        icon: <PersonalDetailsBlackIcon />,
        activeClass: "wip",
        stepText: t("cardViewLabels.progressStatusText.step1"),
        afterLineIs: true
      };
      if (superStepper[0].completed) {
        step_1_obj.icon = <PersonalDetailsWhiteIcon />;
        step_1_obj.activeClass = "done";
      }
      steps_list.push(step_1_obj);
      let step_2_obj = {
        icon: <CategoryDetailsBlackIcon />,
        activeClass: "",
        stepText: t("cardViewLabels.progressStatusText.step2"),
        afterLineIs: true
      };
      if (superStepper[1].completed) {
        step_2_obj.icon = <CategoryDetailsWhiteIcon />;
        step_2_obj.activeClass = "done";
      } else {
        if (superStepper[0].completed) {
          step_2_obj.icon = <CategoryDetailsWhiteIcon />;
          step_2_obj.activeClass = "wip";
        }
      }
      steps_list.push(step_2_obj);
      let step_3_obj = {
        icon: <DocumentsUploadBlackIcon />,
        activeClass: "",
        stepText: t("cardViewLabels.progressStatusText.step3"),
        afterLineIs: true
      };
      if (superStepper[2].completed) {
        step_3_obj.icon = <DocumentsUploadWhiteIcon />;
        step_3_obj.activeClass = "done";
      } else {
        if (superStepper[1].completed) {
          step_3_obj.icon = <DocumentsUploadWhiteIcon />;
          step_3_obj.activeClass = "wip";
        }
      }
      steps_list.push(step_3_obj);
      let step_4_obj = {
        icon: <MakePaymentBlackIcon />,
        activeClass: "",
        stepText: t("cardViewLabels.progressStatusText.step4"),
        afterLineIs: true
      };
      if (superStepper[3].completed) {
        step_4_obj.icon = <MakePaymentWhiteIcon />;
        step_4_obj.activeClass = "done";
      } else {
        if (superStepper[2].completed) {
          step_4_obj.icon = <MakePaymentWhiteIcon />;
          step_4_obj.activeClass = "wip";
        }
      }
      steps_list.push(step_4_obj);
      let step_5_obj = {
        icon: <EStampDefaultIcon />,
        activeClass: "",
        stepText: "",
        afterLineIs: false
      };
      if (element.Estamp) {
        step_5_obj.icon = <EStampColoredIcon />;
        step_5_obj.activeClass = "done";
      }
      steps_list.push(step_5_obj);
      let newObj = {
        ...element,
        stepsProgress: steps_list
      };
      appCardList.push(newObj);
    }
    setApplicationCardList(appCardList);
    // setStepsProgressList(steps_list);
  }, []); */

  return (
    <Box className={`${classes.profileCoverBox} innerSection`}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h6" className={classes.sectionCardTitle}>{t("personalInformationSection.title")}</Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<GetApp />}
            onClick={downloadApplicantReport}
          >
            Applicant Reports
          </Button>
        </Box>
      </Box>
      <Box marginY={2}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Typography className={classes.sectionLabel}>{t("Agent Code")}</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.sectionLabel}>:</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.sectionValue}>#{agentProfileData?.Agentcode}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box marginY={2}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Typography className={classes.sectionLabel}>{t("personalInformationSection.dataLabel1")}</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.sectionLabel}>:</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.sectionValue}>{agentProfileData.fullName}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box marginY={2}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Typography className={classes.sectionLabel}>{t("companyDetailsSection.dataLabel2")}</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.sectionLabel}>:</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.sectionValue}>{agentProfileData.AgentCompany}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box marginY={2}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Typography className={classes.sectionLabel}>{t("personalInformationSection.dataLabel2")}</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.sectionLabel}>:</Typography>
          </Grid>
          <Grid item>
            {/* {agentProfileData.Gender && */}
            <Typography className={classes.sectionValue}>{agentProfileData.genderText}</Typography>
            {/* } */}
          </Grid>
        </Grid>
      </Box>
      <Box marginY={2}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Typography className={classes.sectionLabel}>{t("personalInformationSection.dataLabel3")}</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.sectionLabel}>:</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.sectionValue}>+91 {agentProfileData.MobileNo}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box marginY={2}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Typography className={classes.sectionLabel}>{t("personalInformationSection.dataLabel4")}</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.sectionLabel}>:</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.sectionValue}>{agentProfileData.EmailId}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box marginY={2}>
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Typography className={classes.sectionLabel}>{t("personalInformationSection.dataLabel5")}</Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography className={classes.sectionLabel}>:</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.sectionValue}>{agentProfileData.AgentAddress}</Typography>
          </Grid>
        </Grid>
      </Box>
      {/* <Box textAlign="right" paddingTop={2}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<EditOutlinedIcon />}
          style={{ minWidth: 120 }}
          onClick={() => setEditDialogOpen(true)}
        >
          {t("personalInformationSection.editBtnText")}
        </Button>
      </Box> */}

      <AgntPersonalInformationEditDialogBox open={editDialogOpen} onClose={handleModalClose} agentProfileData={agentProfileData} profileImageUrl={profileImageUrl}
        notificationsSendIs={notificationsSendIs} afterUpdateProfile={afterUpdateProfile} />
    </Box>
  );
};

export default withWidth()(PersonalInformationSecCard);
