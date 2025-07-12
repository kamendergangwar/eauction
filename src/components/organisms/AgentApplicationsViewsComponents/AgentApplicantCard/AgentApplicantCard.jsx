import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  PersonalDetailsBlackIcon,
  PersonalDetailsWhiteIcon,
  CategoryDetailsBlackIcon,
  CategoryDetailsWhiteIcon,
  DocumentsUploadBlackIcon,
  DocumentsUploadWhiteIcon,
  MakePaymentBlackIcon,
  MakePaymentWhiteIcon,
  EStampDefaultIcon,
  EStampColoredIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { AgentApplicationsViewsStyles } from "../AgentApplicationsViews.styles";
import AgentNotificationsDialogBox from "../../../molecules/DialogBoxes/AgentNotificationsDialogBox/AgentNotificationsDialogBox";
import { useSelector, useDispatch } from "react-redux";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import DefaultMessageBox from "../../../atoms/DefaultMessageBox/DefaultMessageBox";
import ApplicationDetailsPage from "../../../pages/ApplicationDetailsPage/ApplicationDetailsPage";
import ApplicationDetailsView from "../../../organisms/ApplicationDetailsComponents/ApplicationDetailsView/ApplicationDetailsView";
import Image from "../../../../assets/Profile.jpg";

const AgentApplicantCard = (props) => {
  const { width, applicationsData, type } = props;
  const { t } = useTranslation(["AgentApplicationDashboardPageTrans","AgentAppDetailsViewPageTrans"]);
  const classes = AgentApplicationsViewsStyles();
  const { reservationCategory, castCategory } = useSelector(masterDataSelector);
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [marritalStatus, setMarritalStatus] = React.useState("");
  const history = useHistory();
  const [notificatioDialogOpen, setNotificatioDialogOpen] = React.useState(false);
  const [showApplicationdetails, setShowApplicationdetails] = React.useState(false);
  const [stepsProgressList, setStepsProgressList] = React.useState([]);
  const [applicationCardList, setApplicationCardList] = React.useState([]);
  const [selectedApplicationObj, setSelectedApplicationObj] = React.useState({});
  
  const [formatedCardList, setFormatedCardList] = React.useState([]); // Added By Ashwin

  const handleClose = (value) => {
    setNotificatioDialogOpen(false);
  };

  useEffect(() => {
    let appCardList = [];
    var caste_reser_categories = [...reservationCategory, ...castCategory];
    for (let i = 0; i < applicationsData.length; i++) {
      const element = applicationsData[i];
      let ApplicationStatus = element.ApplicationStatus;
      let stepper = JSON.parse(element.Stepper);
      //console.log("stepper", stepper);
      let superStepper = stepper.superStepper;
      let steps_list = [];
      let step_1_obj = {
        icon: <DocumentsUploadBlackIcon />,
        activeClass: "wip",
        stepText: t("cardViewLabels.progressStatusText.step3"),
        afterLineIs: true
      };
      if (superStepper[0].completed) {
        step_1_obj.icon = <PersonalDetailsWhiteIcon />;
        step_1_obj.activeClass = "done";
      }
      steps_list.push(step_1_obj);

      let step_3_obj = {
        icon: <PersonalDetailsBlackIcon />,
        activeClass: "wip",
        stepText: t("cardViewLabels.progressStatusText.step1"),
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

      let step_2_obj = {
        icon: <CategoryDetailsBlackIcon />,
        activeClass: "wip",
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
      if (ApplicationStatus == 1) { 
          step_4_obj.activeClass = "wip";
      }
      steps_list.push(step_4_obj);
      let step_5_obj = {
        icon: <EStampDefaultIcon />,
        activeClass: "",
        stepText: "",
        afterLineIs: false
      };
      if (element.IsEstamp == "1") {
        step_5_obj.icon = <EStampColoredIcon />;
        step_5_obj.activeClass = "done";
      }
      steps_list.push(step_5_obj);

      let castCatName = caste_reser_categories.find(obj => {
        return +obj.value === +element.ReservationId
      });
      
      var progressPercentage = element.ApplicationStatus * 10;
      let newObj = {
        ...element,
        castCatName: castCatName?.label,
        progressPercentage: progressPercentage,
        stepsProgress: steps_list
      };
      appCardList.push(newObj);
    }
    setApplicationCardList(appCardList);
    // setStepsProgressList(steps_list);
  }, [applicationsData]);
  // }, []);

  /* useEffect(() => {
    console.log("castCategory", castCategory);
  }, [castCategory]); */

  const showAllNotifications = (notifiData) => {
    setSelectedApplicationObj(notifiData);
    setNotificatioDialogOpen(true);
  };

  const goToViewApplication = (selectedCardData) => {
    localStorage.setItem("applicantId", selectedCardData.ApplicantId);
    localStorage.setItem("applicationId", selectedCardData.ApplicationId);
    localStorage.setItem("jwtToken", localStorage.getItem("agentjwtToken"));
    history.push("/application-overview");
  };

  /* useEffect(() => {
    var fullName = "-";
    if (applicationsData.FirstName || applicationsData.MiddleName || applicationsData.LastName) {
      fullName = "";
    }
    if (applicationsData.FirstName) {
      fullName = applicationsData.FirstName + " ";
    }
    if (applicationsData.MiddleName) {
      fullName += applicationsData.MiddleName + " ";
    }
    if (applicationsData.LastName) {
      fullName += applicationsData.LastName;
    }
    setApplicantsFullName(fullName);

    if (applicationsData.Gender) {
      if (applicationsData.Gender == "1") {
        setGender("Male");
      } else {
        setGender("Female");
      }
    }

    switch (applicationsData.MarritalStatus) {
      case "1": setMarritalStatus("Single");
        break;
      case "2": setMarritalStatus("Married");
        break;
      case "3": setMarritalStatus("Divorced");
        break;
      case "4": setMarritalStatus("Widow");
        break;
      case "5": setMarritalStatus("Widower");
        break;
    }
  }, [applicationsData]); */
  
  const dashBoardRedirect = (event) => {
     history.push("/cfc-dashboard");
     setTimeout(() => {
      const homeBrowseProjects = document.getElementById('browse-projects');
      homeBrowseProjects.scrollIntoView({behavior: "smooth"});
     }, 0);
  };
  
  useEffect(() => {
    console.log("applicationCardList Length : ",applicationCardList.length);
    if(Array.isArray(applicationCardList)){
      if(applicationCardList.length > 0) {
        var tmp_array = {};
        applicationCardList.forEach((item,index) =>{
          if(item.ApplicantId in tmp_array == false){
            tmp_array[item.ApplicantId] = {}; // ApplicantID , //must initialize the sub-object, otherwise will get 'undefined' errors
          }
          if('personalInfo' in tmp_array[item.ApplicantId] == false){
            tmp_array[item.ApplicantId]['personalInfo'] = {}; // personalInfo
          }
          
          /* Personal Information - Start */
          tmp_array[item.ApplicantId]['personalInfo'] = {
            'AadharNo'               : item.AadharNo,
            'ApplicantId'            : item.ApplicantId,
            'DashboardNotifications' : item.DashboardNotifications,
            'FirstName'              : item.FirstName,
            'ImagePath'              : item.ImagePath,
            'IsEstamp'               : item.IsEstamp,
            'LastName'               : item.LastName,
            'MobileNo'               : item.MobileNo
          };
          /* Personal Information - End */
  
          if('projects' in tmp_array[item.ApplicantId] == false){
            tmp_array[item.ApplicantId]['projects'] = {}; // projects
          }
  
          if(item.ProjectId in tmp_array[item.ApplicantId]['projects'] == false){
            tmp_array[item.ApplicantId]['projects'][item.ProjectId] = {}; // project ID's
          }
  
          if('projectInfo' in tmp_array[item.ApplicantId]['projects'][item.ProjectId] == false){
            tmp_array[item.ApplicantId]['projects'][item.ProjectId]['projectInfo'] = {}; // project Info
          }
  
          tmp_array[item.ApplicantId]['projects'][item.ProjectId]['projectInfo'] = {
            'ProjectId'  : item.ProjectId,
            'ProjectName': item.ProjectName
          };
  
          if('categories' in tmp_array[item.ApplicantId]['projects'][item.ProjectId] == false){
            tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'] = {}; // Categories
          }
  
          if(item.ReservationId in tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'] == false){
            tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'][item.ReservationId] = {}; // Category ID's
          }
          
          tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'][item.ReservationId] = {
              'castCatName'        : item.castCatName,
              'progressPercentage' : item.progressPercentage,
              'stepsProgress'      : item.stepsProgress,
              'ApplicationId'      : item.ApplicationId
          };
  
          // if('Applications' in tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'][item.ReservationId] == false){
          //   tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'][item.ReservationId]['Applications'] = {}; // Applications
          // }
  
          // if(item.ApplicationId in tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'][item.ReservationId]['Applications'] == false){
          //   tmp_array[item.ApplicantId]['projects'][item.ProjectId]['categories'][item.ReservationId]['Applications'][item.ApplicationId] = {}; // Application ID's
          // }
        });
        Object.keys(tmp_array).map((element, index) => {
            var tmp_projects = tmp_array[element].projects;
            Object.keys(tmp_projects).map((item, indx) => {
              var tmp_categories = tmp_projects[item].categories;
              var tmp_max_percent = Object.entries(tmp_categories).reduce(function (p, v) {
                return ( p[1]?.progressPercentage > v[1]?.progressPercentage ? p : v );
              });
              tmp_projects[item].stepsProgress = tmp_max_percent[1]?.stepsProgress;
            });
        });
        setFormatedCardList(tmp_array);
      }
    }
  },[applicationCardList]);

  //console.log(formatedCardList);
  //console.log("applicationCardList",applicationCardList);
  const latest = 0;

  if( latest === 1) {       
      return (
        <Box className={classes.cardMainContainer}>
          <Grid container spacing={3}>
          {applicationCardList.length > 0 && Object.entries(formatedCardList).map(([Ckey, Capplicantid]) => (
              Object.entries(Capplicantid.projects).map(([Pkey, Pprojectid]) => {
                // { console.log(Capplicantid.projects) }
                var personalInfo   = Capplicantid.personalInfo;
                var projectInfo    = Pprojectid.projectInfo;
                var categoriesInfo = Pprojectid.categories;
                var stepsProgress  = Pprojectid.stepsProgress;
                return (
                  <Grid item md={4} key={Pkey}>
                    <Grid className={classes.applicationGridBox} style={{height: '385px'}}>
                      {personalInfo.DashboardNotifications.length > 0 &&
                        <Button className={classes.notificationView} onClick={() => showAllNotifications(personalInfo)}>{personalInfo.DashboardNotifications.length > 1 ? "+1" : "1"} <NotificationsNoneOutlinedIcon size="small" /></Button>
                      }
                      <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                          <Typography className={classes.infoTextView} style={{marginLeft: '40px'}}>{t("applicatntProfilePage.applicationDetail.formControl.applicantNoLabel", { ns: 'AgentAppDetailsViewPageTrans' })}: <strong>{personalInfo.ApplicantId || "-"}</strong></Typography>
                        </Grid>
                        <Grid item>
                          {type == "completed" && 
                            <Button color="primary" size="small" onClick={() => goToViewApplication(personalInfo)}>View Application</Button>
                          }
                        </Grid>
                      </Grid>
                      <Box paddingTop={1.5}>
                        <Grid container>
                          <Grid item md={2}>
                            <CardMedia
                              className={classes.profileImgCover}
                              image={personalInfo.ImagePath || Image}
                              title="Profile Cover"
                            />
                          </Grid>
                          <Grid item md={10}>
                            <Typography variant="h6" className={`${classes.cardHeader}`}>{personalInfo.FirstName ? (personalInfo.FirstName + " " + personalInfo.LastName) : "-"}</Typography>
                            <Typography className={classes.phoneNumberView}><PhoneOutlinedIcon /> {personalInfo.MobileNo ? ("+91 " + personalInfo.MobileNo) : "-"}</Typography>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr style={{verticalAlign: 'baseline'}}>
                                  <td>
                                    <Typography className={classes.infoTextView}>{t("cardViewLabels.aadhaarLabel")}:</Typography>
                                  </td>
                                  <td>
                                    <Typography className={classes.infoTextView}><strong>{personalInfo.AadharNo != 0 ? personalInfo.AadharNo : "-"}</strong></Typography>
                                  </td>
                                </tr>
                                <tr style={{verticalAlign: 'baseline'}}>
                                  <td>
                                    <Typography className={classes.infoTextView}>{t("cardViewLabels.projectLabel")}:</Typography>
                                  </td>
                                  <td>
                                    <Typography className={`${classes.infoTextView}`}><strong className="project">{projectInfo.ProjectName || "-"}</strong></Typography>
                                  </td>
                                </tr>
                                {/* <tr style={{verticalAlign: 'baseline'}}>
                                  <td>
                                    <Typography className={classes.infoTextView}>&nbsp;&nbsp;</Typography>
                                  </td>
                                  <td>
                                    <Typography className={`${classes.infoTextView}`}>&nbsp;&nbsp;</Typography>
                                  </td>
                                </tr> */}
                              </tbody>
                            </table>                            
                          </Grid>
                        </Grid>
                        <Grid container style={{ height: "125px",overflow:"auto",border: "1px solid rgba(0, 0, 0, 0.23)",borderRadius: "10px" }}>
                            <table style={{ width: "100%",border: "0px solid grey",textAlign: 'center' }}>
                               {/* <thead style={{ position: "sticky",top: "0px",margin: '0 0 0 0' }}> */}
                               <thead>
                                  <tr style={{verticalAlign: 'baseline'}}>
                                    <td style={{borderBottom: "1px solid black"}}>
                                      <Typography className={classes.infoTextView}>{t("cardViewLabels.apnNoLabel")}</Typography>
                                    </td>
                                    <td style={{borderBottom: "1px solid black"}}>
                                      <Typography className={classes.infoTextView}>{t("cardViewLabels.categoryLabel")}</Typography>
                                    </td>
                                    <td style={{borderBottom: "1px solid black"}}>
                                      <Typography className={classes.infoTextView}>{t("cardViewLabels.inProgresslabel")}</Typography>
                                    </td>
                                  </tr>
                                  </thead>
                                <tbody>
                                {
                                  Object.entries(categoriesInfo).map(([Catkey, Catid]) => {
                                    return (
                                      <tr style={{verticalAlign: 'baseline'}}>
                                        <td><Typography className={classes.infoTextView}><strong>{Catid.ApplicationId || "-"}</strong></Typography></td>
                                        <td><Typography className={classes.infoTextView}><strong>{Catid.castCatName || "-"}</strong></Typography></td>
                                        <td><Typography className={classes.infoTextView}><strong style={{ color: "#F27807" }}>{Catid.progressPercentage + "%"}</strong></Typography></td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                        </Grid>    
                      </Box>
                      <Box style={{bottom: '0px'}} paddingTop={3.5} maxWidth="80%" marginX="auto"className={classes.stepperContainer}>
                        <Grid container spacing={2} style={{marginLeft: '10px'}}>
                          {stepsProgress?.map((element, index) => (
                            <Grid item xs key={index}>
                              <Grid className={`${classes.statusBox} ${element.activeClass}`}>
                                <Box className={`progressIcon ${!element.stepText ? "estamp" : ""}`}>{element.icon}</Box>
                                {element.stepText && <Typography>{element.stepText}</Typography>}
                                {element.afterLineIs && <span className="afterLine"></span>}
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                )
              })
          ))}
          </Grid>
          {applicationCardList.length == 0 &&
            <div>
              <Box textAlign="center" paddingY={8}>
                <Box className={classes.errorMsgView}>
                  <Typography style={{ fontSize: 16 }}>No Records Found !!</Typography>
                </Box>
              </Box>
            </div>
          }
          {applicationCardList.length == 0 &&
            <DefaultMessageBox firstLineMsg={t("firstLineErrorMsg")} secdLineMsg={t("secondLineErrorMsg")} actionBtnTxt={t("actionButtonText")} action={dashBoardRedirect} />
          }
          <AgentNotificationsDialogBox open={notificatioDialogOpen} onClose={handleClose} selectedApplication={selectedApplicationObj} />
        </Box>  
      );
  } else {
      return (
        <Box className={classes.cardMainContainer}>
          <Grid container spacing={3}>
            {applicationCardList.map((element, index) => (
              <Grid item md={4} key={index}>
                {/* <ButtonBase focusRipple component="div" className={classes.applicationGridBox} onClick={() => history.push("/cfc-application-view")}> */}
                <Grid className={classes.applicationGridBox} style={{height: '376px'}}>
                  {element.DashboardNotifications.length > 0 &&
                    <Button className={classes.notificationView} onClick={() => showAllNotifications(element)}>{element.DashboardNotifications.length > 1 ? "+1" : "1"} <NotificationsNoneOutlinedIcon size="small" /></Button>
                  }
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography className={classes.infoTextView} style={{marginLeft: '40px'}}>{t("cardViewLabels.apnNoLabel")}: <strong>{element.ApplicationId || "-"}</strong></Typography>
                    </Grid>
                    <Grid item>
                      {type == "inprogress" && 
                        <Typography className={classes.infoTextView}> {t("cardViewLabels.inProgresslabel")} <strong style={{ color: "#F27807" }}>{element.progressPercentage + "%"}</strong></Typography>
                      }
                      {type == "completed" && 
                        <Button color="primary" size="small" onClick={() => goToViewApplication(element)}>View Application</Button>
                      }
                    </Grid>
                  </Grid>
                  <Box paddingTop={2.5}>
                    <Grid container>
                      <Grid item md={2}>
                        <CardMedia
                          className={classes.profileImgCover}
                          image={element.ImagePath || Image}
                          title="Profile Cover"
                        />
                      </Grid>
                      <Grid item md={10}>
                        <Typography variant="h6" className={`${classes.cardHeader}`}>{element.FirstName ? (element.FirstName + " " + element.LastName) : "-"}</Typography>
                        <Typography className={classes.phoneNumberView}><PhoneOutlinedIcon /> {element.MobileNo ? ("+91 " + element.MobileNo) : "-"}</Typography>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr style={{verticalAlign: 'baseline'}}>
                              <td>
                                <Typography className={classes.infoTextView}>{t("cardViewLabels.aadhaarLabel")}:</Typography>
                              </td>
                              <td>
                                <Typography className={classes.infoTextView}><strong>{element.AadharNo != 0 ? element.AadharNo : "-"}</strong></Typography>
                              </td>
                            </tr>
                            <tr style={{verticalAlign: 'baseline'}}>
                              <td>
                                <Typography className={classes.infoTextView}>{t("cardViewLabels.projectLabel")}:</Typography>
                              </td>
                              <td>
                                <Typography className={`${classes.infoTextView}`}><strong className="project">{element.ProjectName || "-"}</strong></Typography>
                              </td>
                            </tr>
                            <tr style={{verticalAlign: 'baseline'}}>
                              <td>
                                <Typography className={classes.infoTextView}>{t("cardViewLabels.categoryLabel")}:</Typography>
                              </td>
                              <td>
                                <Typography className={`${classes.infoTextView}`}><strong>{element.castCatName || "-"}</strong></Typography>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box paddingTop={3.5} maxWidth="80%" marginX="auto"className={classes.stepperContainer}>
                    <Grid container spacing={2} style={{marginLeft: '10px'}}>
                      {element.stepsProgress.map((element, index) => (
                        <Grid item xs key={index}>
                          <Grid className={`${classes.statusBox} ${element.activeClass}`}>
                            <Box className={`progressIcon ${!element.stepText ? "estamp" : ""}`}>{element.icon}</Box>
                            {element.stepText && <Typography>{element.stepText}</Typography>}
                            {element.afterLineIs && <span className="afterLine"></span>}
                          </Grid>
                        </Grid>
                      ))}
                      {/* <Grid item xs>
                        <Grid className={`${classes.statusBox} ${stepsProgress == "Personal Details" ? "wip" : ""}`}>
                          <Box className="progressIcon"><CategoryDetailsIcon /></Box>
                          <Typography>{t("cardViewLabels.progressStatusText.step2")}</Typography>
                          <span className="afterLine"></span>
                        </Grid>
                      </Grid>
                      <Grid item xs>
                        <Grid className={`${classes.statusBox}`}>
                          <Box className="progressIcon"><DocumentsUploadIcon /></Box>
                          <Typography>{t("cardViewLabels.progressStatusText.step3")}</Typography>
                          <span className="afterLine"></span>
                        </Grid>
                      </Grid>
                      <Grid item xs>
                        <Grid className={`${classes.statusBox}`}>
                          <Box className="progressIcon"><MakePaymentIcon /></Box>
                          <Typography>{t("cardViewLabels.progressStatusText.step4")}</Typography>
                          <span className="afterLine"></span>
                        </Grid>
                      </Grid>
                      <Grid item xs>
                        <Grid className={`${classes.statusBox} estamp`}>
                          <Box className="progressIcon"><EStampColoredIcon /></Box>
                        </Grid>
                      </Grid> */}
                    </Grid>
                  </Box>
                </Grid>
                {/* </ButtonBase> */}
              </Grid>
            ))}
          </Grid>
          {/* { console.log("--inn--") }
          { console.log(applicationCardList) } */}
          {applicationCardList.length == 0 &&
            <div>
              <Box textAlign="center" paddingY={8}>
                <Box className={classes.errorMsgView}>
                  <Typography style={{ fontSize: 16 }}>No Records Found !!</Typography>
                </Box>
              </Box>
            </div>
          }
          {applicationCardList.length == 0 &&
            <DefaultMessageBox firstLineMsg={t("firstLineErrorMsg")} secdLineMsg={t("secondLineErrorMsg")} actionBtnTxt={t("actionButtonText")} action={dashBoardRedirect} />
          }
          <AgentNotificationsDialogBox open={notificatioDialogOpen} onClose={handleClose} selectedApplication={selectedApplicationObj} />
        </Box>
      );
  }
};

export default withWidth()(AgentApplicantCard);
