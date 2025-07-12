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
import AgentNotificationsDialogBox from "../../../molecules/DialogBoxes/AgentNotificationsDialogBox/AgentNotificationsDialogBox";
import { useDispatch, useSelector } from "react-redux";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import DefaultMessageBox from "../../../atoms/DefaultMessageBox/DefaultMessageBox";
import Image from "../../../../assets/DummyProfile.jpg";
import { AgentApplicantsViewsStyles } from "../AgentApplicantsView.styles";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import { getStepsWithDetails } from "../../DashboardPageComponents/UserProjects/UserProgressStepper/mockdata";
import { agentApplicantSelector } from "../../../../redux/features/agent/AgentApplicantsSlice";
import { agentProfileSelector } from "../../../../redux/features/agent/AgentProfileSlice";
import UploadSactionLetterDialogBox from "./UploadSactionLetterDialogBox/UploadSactionLetterDialogBox";
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from "../../../../redux/features/file/FileUploadSlice";

const AgentApplicantCard = (props) => {
  const { applicationsData, type } = props;
  const { t } = useTranslation(["AgentApplicationDashboardPageTrans","AgentAppDetailsViewPageTrans"]);
  const classes = AgentApplicantsViewsStyles();
  const { reservationCategory, castCategory } = useSelector(agentApplicantSelector);
  const history = useHistory();
  const [notificatioDialogOpen, setNotificatioDialogOpen] = React.useState(false);
  const [uploadSactionLetterDialogBoxOpen, setUploadSactionLetterDialogBoxOpen] = React.useState(false);
  const [applicationCardList, setApplicationCardList] = React.useState([]);
  const [selectedApplicationObj, setSelectedApplicationObj] = React.useState({});
  const [selectedApplicantObj, setSelectedApplicantObj] = React.useState(null);
  const [agentProfile, setAgentProfile] = React.useState(null);
  const [uploadedLetter, setUploadedLetter] = React.useState([]);
  
  const [formatedCardList, setFormatedCardList] = React.useState([]); // Added By Ashwin
  const steps = getStepsWithDetails();
  const { isFetchingAgentProfile, agentProfileData, isSuccessResAgentProfile } = useSelector(agentProfileSelector);

  const dispatch = useDispatch();
  const handleClose = (value) => {
    setNotificatioDialogOpen(false);

    dispatch(clearImageUrl());
    setTimeout(() => {
      dispatch(clearFileState());
    }, 500);
    dispatch(clearDocumentImageUrl());
    dispatch(clearOtherFile());
    setUploadSactionLetterDialogBoxOpen(false);
  };
  
  React.useEffect(() => {
    if (isSuccessResAgentProfile && agentProfileData.AgentDetails.length > 0) {
      setAgentProfile(agentProfileData?.AgentDetails[0]);
    }
  }, [isSuccessResAgentProfile,agentProfileData])

  useEffect(() => {
    let appCardList = [];
    var caste_reser_categories = [...reservationCategory, ...castCategory];
    for (let i = 0; i < applicationsData.length; i++) {
      const element = applicationsData[i];
      let castCatName = caste_reser_categories.find(obj => {
        return +obj.value === +element.RservationCatIds
      });
      
      var progressPercentage = element.ApplicationStatus * 10;
      let newObj = {
        ...element,
        castCatName: castCatName?.label,
        progressPercentage: progressPercentage,
      };
      appCardList.push(newObj);
    }
    console.log('caste_reser_categories :', caste_reser_categories);
    console.log('appCardList :'+ appCardList);
    console.log(applicationsData);
    setApplicationCardList(appCardList);
    // setStepsProgressList(steps_list);
  }, [applicationsData]);

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

  const UploadSactionLetter = (ApplicantData) =>{
    setSelectedApplicantObj(ApplicantData);
    setUploadSactionLetterDialogBoxOpen(true)
  } 
  const afterSubmitCloseHandler = (applicantId) => {
    setUploadedLetter([...uploadedLetter,applicantId])
  }

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
                    <Grid className={classes.applicationGridBox} style={{height: '420px'}}>
                      {personalInfo.DashboardNotifications.length > 0 &&
                        <Button className={classes.notificationView} onClick={() => showAllNotifications(personalInfo)}>{personalInfo.DashboardNotifications.length > 1 ? "+1" : "1"} <NotificationsNoneOutlinedIcon size="small" /></Button>
                      }
                      <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                          <Typography className={classes.infoTextView} style={{marginLeft: '40px'}}>{t("applicatntProfilePage.applicationDetail.formControl.applicantNoLabel", { ns: 'AgentAppDetailsViewPageTrans' })}: <strong>{personalInfo.ApplicantId || "-"}</strong></Typography>
                        </Grid>
                        <Grid item>
                          {type == "completed" && 
                            {/* <Button color="primary" size="small" onClick={() => goToViewApplication(personalInfo)}>View Application</Button> */}
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
                              </tbody>
                            </table>                            
                          </Grid>
                        </Grid>
                        <Grid container style={{ height: "125px",overflow:"auto",border: "1px solid rgba(0, 0, 0, 0.23)",borderRadius: "10px" }}>
                            <table style={{ width: "100%",border: "0px solid grey",textAlign: 'center' }}>
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
                                        <td><Typography className={classes.infoTextView}><strong>{Catid.ApplicationI || "-"}</strong></Typography></td>
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
          {/* {applicationCardList.length == 0 &&
            <DefaultMessageBox firstLineMsg={t("firstLineErrorMsg")} secdLineMsg={t("secondLineErrorMsg")} actionBtnTxt={t("actionButtonText")} action={dashBoardRedirect} />
          } */}
          <AgentNotificationsDialogBox open={notificatioDialogOpen} onClose={handleClose} selectedApplication={selectedApplicationObj} />
        </Box>  
      );
  } else {
      return (
        <Box className={classes.cardMainContainer}>
          <Grid container spacing={3}>
            {applicationCardList.map((element, index) => (
              <Grid item md={4} key={index}>
                <Grid className={classes.applicationGridBox} style={{height: '420px'}}>
                  {/* {element.DashboardNotifications.length > 0 &&
                    <Button className={classes.notificationView} onClick={() => showAllNotifications(element)}>{element.DashboardNotifications.length > 1 ? "+1" : "1"} <NotificationsNoneOutlinedIcon size="small" /></Button>
                  } */}
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography className={classes.infoTextView}>{t("Applicant Id")}: <strong>{element.ApplicantId || "-"}</strong></Typography>
                    </Grid>
                    <Grid item>
                      {type == "inprogress" && 
                        <Typography className={classes.infoTextView}> {t("cardViewLabels.inProgresslabel")} <strong style={{ color: "#F27807" }}>{Math.round(((element.ApplicantActiveStep - 1) * 100) / steps.length) + "%"}</strong></Typography>
                      }
                      {/* {type == "completed" && 
                        <Button color="primary" size="small" onClick={() => goToViewApplication(element)}>View Application</Button>
                      } */}
                      {type == "completed" && agentProfile?.source === 'bank' && (
                        element?.SanctionLetterFile !== null || uploadedLetter.includes(element.ApplicantId) ?
                        <Button color="primary" size="small" style={{pointerEvents:"none"}}>Sanction Letter Uploaded</Button> :
                        <Button color="primary" size="small" variant="outlined" onClick={() => UploadSactionLetter(element)}>Upload Sanction Letter</Button>
                      )}
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
                                <Typography className={classes.infoTextView}>{t("Application No")}</Typography>
                              </td>
                              <td>:</td>
                              <td>
                                <Typography className={`${classes.infoTextView}`}><strong>{element.ApplicationNo ? element.ApplicationNo : ('-') }</strong></Typography>
                              </td>
                            </tr>
                            <tr style={{verticalAlign: 'baseline'}}>
                              <td>
                                <Typography className={classes.infoTextView}>{t("cardViewLabels.aadhaarLabel")}</Typography>
                              </td>
                              <td>:</td>
                              <td>
                                <Typography className={classes.infoTextView}><strong>{element.AadharNo != 0 ? element.AadharNo : "-"}</strong></Typography>
                              </td>
                            </tr>
                            {/* <tr style={{verticalAlign: 'baseline'}}>
                              <td>
                                <Typography className={classes.infoTextView}>{t("cardViewLabels.projectLabel")}:</Typography>
                              </td>
                              <td>
                                <Typography className={`${classes.infoTextView}`}><strong className="project">{element.ProjectName || "-"}</strong></Typography>
                              </td>
                            </tr> */}
                            <tr style={{verticalAlign: 'baseline'}}>
                              <td>
                                <Typography className={classes.infoTextView}>{t("Email")}</Typography>
                              </td>
                              <td>:</td>
                              <td>
                                <Typography className={`${classes.infoTextView}`}><strong className="project">{element.EmailId || "-"}</strong></Typography>
                              </td>
                            </tr>
                            <tr style={{verticalAlign: 'baseline'}}>
                              <td>
                                <Typography className={classes.infoTextView}>{t("cardViewLabels.categoryLabel")}</Typography>
                              </td>
                              <td>:</td>
                              <td>
                                <Typography className={`${classes.infoTextView}`}><strong>{element.castCatName || "-"}</strong></Typography>
                              </td>
                            </tr>
                            { +element.WaitingForLoan === 1 && 
                              <tr style={{verticalAlign: 'baseline'}}>
                                <td>
                                  <Typography className={classes.infoTextView}>{t("Loan Interested")}</Typography>
                                </td>
                                <td>:</td>
                                <td>
                                  <Typography className={`${classes.infoTextView}`}><strong>{element.interested_in_loan}</strong></Typography>
                                </td>
                              </tr>
                            }
                          </tbody>
                        </table>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box paddingTop={3.5} maxWidth="92%" overflowX={"auto"} className={classes.stepperContainer}>
                      <ProgressStepper key={index} activeStep={element.ApplicantActiveStep} />
                  </Box>
                </Grid>
              </Grid>
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
          {/* {applicationCardList.length == 0 &&
            <DefaultMessageBox firstLineMsg={t("firstLineErrorMsg")} secdLineMsg={t("secondLineErrorMsg")} actionBtnTxt={t("actionButtonText")} action={dashBoardRedirect} />
          } */}
          <AgentNotificationsDialogBox open={notificatioDialogOpen} onClose={handleClose} selectedApplication={selectedApplicationObj} />
          <UploadSactionLetterDialogBox
            open={uploadSactionLetterDialogBoxOpen} 
            ApplicantData={selectedApplicantObj}
            handleClose={handleClose}
            afterSubmitCloseHandler={afterSubmitCloseHandler}
          />
        </Box>
      );
  }
};

export default withWidth()(AgentApplicantCard);
