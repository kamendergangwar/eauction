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
import { AgentProfileViewsStyles } from "../AgentProfileViews.styles";
// import AgentNotificationsDialogBox from "../../../molecules/DialogBoxes/AgentNotificationsDialogBox/AgentNotificationsDialogBox";
// import Image from "../../../../assets/Profile.jpg";

const NotifcationsSecCard = (props) => {
  const { width, applicationsData, type, agentProfileData, notificationsSendIs, notificationSettingToggle } = props;
  const { t } = useTranslation("AgentProfilePageTrans");
  const classes = AgentProfileViewsStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [marritalStatus, setMarritalStatus] = React.useState("");
  const history = useHistory();

  /* useEffect(() => {
    console.log("notificationsSendIs", notificationsSendIs);
  }, [notificationsSendIs]); */

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
      <Grid container alignItems="center">
        <Grid item sm={3}>
          <Typography variant="h6" className={classes.sectionCardTitle} style={{ margin: 0 }}>{t("notifcationsSection.title")}</Typography>
        </Grid>
        <Grid item sm={2}></Grid>
        <Grid item>
          <FormGroup>
            <FormControlLabel className={classes.switchLabel}
              control={<Switch color="primary" size="small" checked={notificationsSendIs} onChange={() => notificationSettingToggle()} />}
              label={t("notifcationsSection.switchLabel")}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withWidth()(NotifcationsSecCard);
