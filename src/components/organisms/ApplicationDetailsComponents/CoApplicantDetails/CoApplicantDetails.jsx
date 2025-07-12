import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import { CoApplicantDetailsIcon, ApplicationEditIcon, VerifiedSuccessIcon, PdfFileViewIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getGenderList,
  masterDataSelector
} from "../../../../redux/features/masterdata/MasterDataSlice";
import Image from "../../../../assets/Profile.jpg";

const CoApplicantDetails = (props) => {
  const { width, CoAppData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  // const [marritalStatus, setMarritalStatus] = React.useState("");
  const [personalDob, setPersonalDob] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [coApplicantData, setCoApplicantData] = React.useState("");
  const [coApplicantGender, setCoApplicantGender] = React.useState("");
  const [pdfFineName, setPdfFineName] = React.useState({ fileName: '', fileSize: '' });
  const [panFineName, setPanFineName] = React.useState({ fileName: '', fileSize: '' });
  const dispatch = useDispatch();
  const currentPathName = useLocation().pathname;
  const history = useHistory();

  useEffect(() => {
    setCoApplicantData(CoAppData);

    // var fullName = "--";
    // if (coApplicantData?.FirstName || applicantData?.MiddleName || applicantData?.LastName) {
    //   fullName = "";
    // }
    // if (applicantData?.FirstName) {
    //   fullName = applicantData.FirstName + " ";
    // }
    // if (applicantData?.MiddleName) {
    //   fullName += applicantData.MiddleName + " ";
    // }
    // if (applicantData?.LastName) {
    //   fullName += applicantData.LastName;
    // }

    if (CoAppData?.FullName) {
      setApplicantsFullName(CoAppData.FullName);
    }

    // if (applicantData?.Gender) {
    //   if (applicantData.Gender == "1") {
    //     setGender(t("applicatntProfilePage.genderOptions.male"));
    //   } else if (applicantData.Gender == "2") {
    //     setGender(t("applicatntProfilePage.genderOptions.female"));
    //   } else {
    //     setGender(t("applicatntProfilePage.genderOptions.other"));
    //   }
    // }

    if (CoAppData?.Gender) {
      if (CoAppData?.Gender == "1") {
        setGender("Male");
      } else if (CoAppData?.Gender == "2") {
        setGender("Female");
      } else {
        setGender("Other");
      }
    } else {
      setGender("--");
    }


    // switch (applicantData?.MarritalStatus) {
    //   case "1": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.single"));
    //     break;
    //   case "2": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.married"));
    //     break;
    //   case "3": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.divorced"));
    //     break;
    //   case "4": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.widow"));
    //     break;
    //   case "5": setMarritalStatus(t("applicatntProfilePage.personalDetail.maritalStsOptions.widower"));
    //     break;
    // }

    if (CoAppData?.DOB && CoAppData?.DOB != "00/00/0000") {
      let dates = CoAppData.DOB.split("/");
      let dobFormated = moment(new Date(dates[1] + "/" + dates[0] + "/" + dates[2])).format("DD/MM/YYYY");
      setPersonalDob(dobFormated);
    }

    if (CoAppData?.ImagePath) {
      setProfileImage(CoAppData?.ImagePath);
    } else {
      setProfileImage("https://freepikpsd.com/file/2019/10/default-profile-picture-png-1-Transparent-Images.png");
    }


    if (CoAppData?.Gender) {
      if (CoAppData.Gender == "1") {
        setCoApplicantGender("Male");
      } else {
        setCoApplicantGender("Female");
      }
    }


    if (CoAppData?.AadharFile) {
      let pdfFileobject = CoAppData.AadharFile.split("/");
      let pdfFileName = pdfFileobject[pdfFileobject.length - 1];
      get_filesize(CoAppData?.AadharFile, function (size) {
        setPdfFineName({ fileName: pdfFileName, fileSize: readableBytes(size) });
      });
    }


    if (CoAppData?.PANFile) {
      let panFileobject = CoAppData.PANFile.split("/");
      let panFileName = panFileobject[panFileobject.length - 1];

      get_filesize(CoAppData?.PANFile, function (size) {
        setPanFineName({ fileName: panFileName, fileSize: readableBytes(size) });
      });
    }

  }, [CoAppData]);

  const {
    genderListData,
    isFetchingGender,
    isSuccessGender,
    isErrorGender,
    errorMsgGender,
  } = useSelector(masterDataSelector);

  // useEffect(() => {
  //   dispatch(getGenderList());
  // }, [dispatch, t]);

  // useEffect(() => {
  //   if (isSuccessGender) {
  //     console.log("genderListData", genderListData);
  //     for (let g = 0; g < genderListData.length; g++) {
  //       const element = genderListData[g];
  //       if (coApplicantData?.Gender == element.DdtId) {
  //         setCoApplicantGender(element.Title);
  //       }
  //     }
  //   }
  // }, [isSuccessGender]);


  const openPdfFile = (file) => {
    window.open(file, '_blank');
  }

  function get_filesize(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
        callback(parseInt(xhr.getResponseHeader("Content-Length")));
      }
    };
    xhr.send();
  }


  function readableBytes(bytes) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
  }

  return (
    <Box className={classes.detailBoxContainer}>
      {CoAppData ? (<>
        <Box>
          <Grid container alignItems="center">
            <Grid item md xs={12}>
              <IconTitle
                icon={<CoApplicantDetailsIcon fontSize="large" />}
                title={t("coApplicantDetails.title")}
              />
            </Grid>
            <Grid item md="auto" xs={12}>
              {currentPathName == "/application-details" && (<Button color="primary" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => history.push("/add-co-applicant")}>{t("coApplicantDetails.editButtonText")}</Button>)}
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.secCardContent}>
          <Grid container>
            <Grid item md="auto" xs={12}>
              <Grid container alignItems="center">
                <Grid item>
                  <CardMedia
                    className={classes.applicationProfileImgCover}
                    image={profileImage}
                    title="Profile Cover" component="img"
                    referrerPolicy="no-referrer"
                  />
                </Grid>
                <Hidden mdUp>
                  <Grid item className={classes.prsnlDtlsSideBox}>
                    <Box className={classes.dataRow}>
                      <Typography className={classes.dataLabel}>{t("coApplicantDetails.formControl.genderLabel")}</Typography>
                      <Typography className={classes.dataValView}>{coApplicantGender || "--"}</Typography>
                    </Box>
                    <Box>
                      <Typography className={classes.dataLabel}>{t("coApplicantDetails.formControl.relationshipLabel")}</Typography>
                      <Typography className={classes.dataValView}>{CoAppData?.RelationshipName || "--"}</Typography>
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid item md xs={12}>
              <Box className={classes.applicantDetailsBox}>
                <Grid container className={classes.dataRow}>
                  <Grid item md={3} xs={12} className={classes.dataResCell}>
                    <Typography className={classes.dataLabel}>{t("coApplicantDetails.formControl.fullNameLabel")}</Typography>
                    <Typography className={classes.dataValView}>{CoAppData?.FullName || "--"}</Typography>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Typography className={classes.dataLabel}>{t("coApplicantDetails.formControl.dateOfBirthLabel")}</Typography>
                    <Typography className={classes.dataValView}>{personalDob || "--"}</Typography>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={3} xs={12}>
                      <Typography className={classes.dataLabel}>{t("coApplicantDetails.formControl.genderLabel")}</Typography>
                      <Typography className={classes.dataValView}>{coApplicantGender || "--"}</Typography>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <Typography className={classes.dataLabel}>{t("coApplicantDetails.formControl.relationshipLabel")}</Typography>
                      <Typography className={classes.dataValView}>{CoAppData?.RelationshipName || "--"}</Typography>
                    </Grid>
                  </Hidden>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Hidden mdUp>
          <Box>
            <IconTitle
              icon={<CoApplicantDetailsIcon fontSize="large" />}
              title={t("coApplicantsKycDetails.title")}
            />
          </Box>
        </Hidden>
        <Box className={classes.secCardContent}>
          <Grid container>
            <Grid item md={3} xs={12} className="aadhaarCardDtls">
              <Typography className={classes.dataLabel}>{t("coApplicantsKycDetails.formControl.aadhaarNumberLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.AadharNo || "--"}</Typography>

              <Typography className={`${CoAppData?.IsAadharVerified == "1" ? classes.verifiedMsgView : classes.notverifiedMsgView}`}>
                <VerifiedSuccessIcon /> {t("coApplicantsKycDetails.formControl.aadhaarVerifiedText")}
              </Typography>

              {/* <Box className={classes.docViewBox}>
              <img src={coApplicantData?.AadharFile || "https://i.pinimg.com/originals/83/b3/0f/83b30f1a065cbf872c0c945602b14503.jpg"} alt="Aadhaar Card" />
            </Box> */}

              {CoAppData?.AadharFile != undefined && CoAppData?.AadharFile?.indexOf(".pdf") != -1 ? (<>
                <Box className={classes.pdfPreviewBox} onClick={() => openPdfFile(CoAppData?.AadharFile)}>
                  <Grid container>
                    <Grid item xs>
                      <Typography className={classes.pdfFileName}><PdfFileViewIcon />
                        {pdfFineName.fileName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.fileSizeView}>{t("applicantKycDetails.formControl.fileSizeLabel")}: {pdfFineName.fileSize}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>) : ('')}

              {CoAppData?.AadharFile && CoAppData?.AadharFile?.indexOf(".png") != -1 ? (<>
                <Box className={classes.docViewBox}>
                  <img src={CoAppData?.AadharFile || "https://i.pinimg.com/originals/83/b3/0f/83b30f1a065cbf872c0c945602b14503.jpg"} alt="Aadhaar Card" referrerPolicy="no-referrer" />
                </Box>
              </>) : ('')}

              {CoAppData?.AadharFile && CoAppData?.AadharFile?.indexOf(".jpg") != -1 ? (<>
                <Box className={classes.docViewBox}>
                  <img src={CoAppData?.AadharFile || "https://i.pinimg.com/originals/83/b3/0f/83b30f1a065cbf872c0c945602b14503.jpg"} alt="Aadhaar Card" referrerPolicy="no-referrer" />
                </Box>
              </>) : ('')}

              {CoAppData?.AadharFile && CoAppData?.AadharFile?.indexOf(".jpeg") != -1 ? (<>
                <Box className={classes.docViewBox}>
                  <img src={CoAppData?.AadharFile || "https://i.pinimg.com/originals/83/b3/0f/83b30f1a065cbf872c0c945602b14503.jpg"} alt="Aadhaar Card" referrerPolicy="no-referrer" />
                </Box>
              </>) : ('')}
            </Grid>
            <Grid item md={3} xs={12} className="panCardDtls">
              <Typography className={classes.dataLabel}>{t("coApplicantsKycDetails.formControl.panNumberLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.PANNo || "--"}</Typography>

              <Typography className={`${CoAppData?.isPanVerified == "1" ? classes.verifiedMsgView : classes.notverifiedMsgView}`}>
                <VerifiedSuccessIcon /> {t("coApplicantsKycDetails.formControl.panVerifiedText")}
              </Typography>

              {/* <Box className={classes.docViewBox}>
              <img src={coApplicantData?.PANFile || "https://images.news18.com/ibnlive/uploads/2021/07/1625318976_pan.jpg?impolicy=website&width=510&height=356"} alt="Pan Card" />
            </Box> */}


              {CoAppData?.PANFile != undefined && CoAppData?.PANFile?.indexOf(".pdf") != -1 ? (<>
                <Box className={classes.pdfPreviewBox} onClick={() => openPdfFile(CoAppData?.PANFile)}>
                  <Grid container>
                    <Grid item xs>
                      <Typography className={classes.pdfFileName}><PdfFileViewIcon />
                        {panFineName.fileName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.fileSizeView}>{t("applicantKycDetails.formControl.fileSizeLabel")}: {panFineName.fileSize}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>) : ('')}

              {CoAppData?.PANFile != undefined && CoAppData?.PANFile?.indexOf(".png") != -1 ? (<>
                <Box className={classes.docViewBox}>
                  <img src={CoAppData?.PANFile || "https://images.news18.com/ibnlive/uploads/2021/07/1625318976_pan.jpg?impolicy=website&width=510&height=356"} alt="Pan Card" />
                </Box>
              </>) : ('')}

              {CoAppData?.PANFile != undefined && CoAppData?.PANFile?.indexOf(".jpg") != -1 ? (<>
                <Box className={classes.docViewBox}>
                  <img src={CoAppData?.PANFile || "https://images.news18.com/ibnlive/uploads/2021/07/1625318976_pan.jpg?impolicy=website&width=510&height=356"} alt="Pan Card" />
                </Box>
              </>) : ('')}

              {CoAppData?.PANFile != undefined && CoAppData?.PANFile?.indexOf(".jpeg") != -1 ? (<>
                <Box className={classes.docViewBox}>
                  <img src={CoAppData?.PANFile || "https://images.news18.com/ibnlive/uploads/2021/07/1625318976_pan.jpg?impolicy=website&width=510&height=356"} alt="Pan Card" />
                </Box>
              </>) : ('')}
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Hidden mdUp>
          <Box>
            <IconTitle
              icon={<CoApplicantDetailsIcon fontSize="large" />}
              title={t("coApplicantsAddressDetails.title")}
            />
          </Box>
        </Hidden>
        <Box className={classes.secCardContent}>
          <Grid container className={classes.dataRow}>
            <Grid item md={4} xs={12} className={classes.dataResCell}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.addressLine1Label")}</Typography>
              <Typography className={classes.dataValView}>{`${CoAppData?.House || '--'} ${CoAppData?.Street}`}</Typography>
            </Grid>
            <Grid item md={4} xs={12} className={classes.dataResCell}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.addressLine2Label")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.area || '--'}</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.postalCodeLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.Pincode || '--'}</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.dataRow}>
            <Grid item md={4} xs={12} className={classes.dataResCell}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.stateLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.State || '--'}</Typography>
            </Grid>
            <Grid item md={4} xs={12} className={classes.dataResCell}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.cityTownLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.City || '--'}</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.mobileNumberLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.MobileNo || '--'}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4} xs={12} className={classes.dataResCell}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.emailAddressLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.EmailId || '--'}</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={classes.dataLabel}>{t("coApplicantsAddressDetails.formControl.districtLabel")}</Typography>
              <Typography className={classes.dataValView}>{CoAppData?.District || '--'}</Typography>
            </Grid>
          </Grid>
        </Box>
      </>) : (false)}


    </Box>
  );
};

export default withWidth()(CoApplicantDetails);
