import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Paper from "@material-ui/core/Paper";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import DescriptionIcon from "@material-ui/icons/Description";
import FolderIcon from "@material-ui/icons/Folder";
import ProfileWrap from "../ProfileWrap/ProfileWrap";
import { MyDocumentsStyles } from "./MyDocuments.style";
import { IconButton, Button, withStyles, Tabs, Tab, Divider } from "@material-ui/core";
import Loading from "../../../atoms/Loading/Loading";
import { DownloadIcon, BlackDownloadIcon, MyDocMoreMenuIcon, MyDocViewIcon } from "../../../atoms/SvgIcons/SvgIcons";
import UserDocumentPreviewDialogBox from "../../../molecules/DialogBoxes/UserDocumentPreviewDialogBox/UserDocumentPreviewDialogBox";
import PngIcon from "../../../../assets/pngIcon.png";
import JpgIcon from "../../../../assets/jpgIcon.png";
import PdfIcon from "../../../../assets/pdfIcon.png";
import othericon from "../../../../assets/otherFile.png";
import {
  getDocuments,
  myProfileSelector,
} from "../../../../redux/features/myProfile/MyProfileSlice";
import {
  getApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getDocumentsList,
  docDeclarationSelector,
  clearDocDeclarationState,
  clearDocDeclarationtData,
 // getOtherDocumentsList,
  //clearDocListState
} from "../../../../redux/features/file/DocDeclarationSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../redux/features/preferences/PreferencesSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { ApiEndPoint } from "../../../../utils/Common";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    // color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function MyDocuments(props) {
  const classes = MyDocumentsStyles();
  const { t } = useTranslation("ProfilePageTrans");
  const history = useHistory();
  const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [myDocumentData, setMyDocumentData] = useState([]);
  const [myDocumentRecords, setMyDocumentRecords] = useState([]);
  const [documentPreviewData, setDocumentPreviewData] = useState({});
  const dispatch = useDispatch();
  const { applicationDocuments, isSuccessDocuments, isFetchingDocuments } =
    useSelector(myProfileSelector);
  const [totalDocCount, setTotalDocCount] = useState(0);
  const [isPendingDocUpload, setIsPendingDocUpload] = useState(false);
  const [downloadLoading, setdownloadLoading] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    applicantData,
    isSuccessResApplicantGet,
    isFetchingApplicantGet,
    isErrorApplicantGet,
    errorMessageGet
  } = useSelector(applicantSelector);

  const {
    isFetchingGetDocsList,
    isSuccessResGetDocsList,
    isErrorGetDocsList,
    errorMsgGetDocsList,
    getDocsListData,


    isFetchingOtherDocsList,
    isSuccessResOtherDocsList,
    isErrorOtherDocsList,
    errorMsgOtherDocsList,
    otherDocsListData,
  } = useSelector(docDeclarationSelector);

  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );

  const {
    isSuccessResGetPreferences
  } = useSelector(preferencesSelector);

  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);

  useEffect(() => {
    // dispatch(getDocuments());
    // dispatch(getApplicant());
    dispatch(getStepperDetails());
    dispatch(getDocumentsList());
   // dispatch(getOtherDocumentsList());
    return () => {
     // dispatch(clearDocListState());
      dispatch(clearDocDeclarationtData());
    }
  }, []);

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
            if (item.applicantKycStepper[1].status != "completed") {
              pageUrl = "/verify-pancard";
            }
          }
        }

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }

      })
      history.push(pageUrl)
    }
  }, [isSuccessResStepper])

  useEffect(() => {
    if (isSuccessResGetDocsList && getDocsListData && value === 0) {
      const hasPendingUpload = getDocsListData.some(element => element.IsUploaded == 0);
      setIsPendingDocUpload(hasPendingUpload);

      const documentObject = getDocsListData.map(element => ({
        ...element,
        imageIs: ["jpg", "jpeg", "png"].includes(element.DocType.toLowerCase()),
        fileType: element.DocType
      }));

      setTotalDocCount(documentObject.length);
      setMyDocumentRecords(documentObject);
    }
  }, [isSuccessResGetDocsList, getDocsListData, value]);

  useEffect(() => {
    if (isSuccessResOtherDocsList && otherDocsListData && value === 1) {
      const mergedArray = [];

      for (const key in otherDocsListData) {
        if (otherDocsListData.hasOwnProperty(key)) {
          mergedArray.push(...otherDocsListData[key]);
        }
      }

      const documentObject = mergedArray.map(element => ({
        ...element,
        // imageIs: ["jpg", "jpeg", "png"].includes(element.DocType.toLowerCase()),
        fileType: element.DocType
      }));

      setTotalDocCount(documentObject.length);
      setMyDocumentRecords(documentObject);
    }
  }, [isSuccessResOtherDocsList, otherDocsListData, value]);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "7") {
          item.Status == "completed" ? setIsPaymentDone(false) : setIsPaymentDone(true);
        }
      })
    }
  }, [isSuccessProgressResStepper])



  function bytesToSize(bytes, decimals = 1) {
    if (bytes == 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const docPreviewDialogCloseFun = () => {
    setDocPreviewDialogOpen(false);
    // dispatch(getDocumentsList());
    // dispatch(getOtherDocumentsList());
  };

  const documentPreview = (file) => {
    setDocumentPreviewData(file);
    setDocPreviewDialogOpen(true);
  };

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      dispatch(clearPreferencesState());
    }
  }, [isSuccessResGetPreferences])

  const downloadFile = (fileUrl) => {
    dispatch(getPreferencesList()).then(response => {
      if (response.payload.success) {
        var item = fileUrl.DocumentValue;
        var lastItem = item.split("/").pop();
        setdownloadLoading(true)
        fetch(`${ApiEndPoint}/FileUpload/getAWSPrivateDocFileDownload?fileName=${lastItem}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }).then((response) => response.blob()).then((blob) => {
          setdownloadLoading(false)
          // Create blob link to download
          const url = window.URL.createObjectURL(
            new Blob([blob]),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileUrl?.DocumentValue.substring(fileUrl?.DocumentValue.lastIndexOf('/') + 1).split('?')[0]);
          // Append to html link element page
          document.body.appendChild(link);
          // Start download
          link.click();
          // Clean up and remove the link
          link.parentNode.removeChild(link);
        }).catch(error => {
          setdownloadLoading(false)
          alert(error, "error");
        });
      }
    });
  };

  return (
    <ProfileWrap>
      {(isFetchingDocuments || isFetchingGetDocsList || downloadLoading || isFetchingOtherDocsList) && (
        <Loading isOpen={isFetchingDocuments || isFetchingGetDocsList || downloadLoading || isFetchingOtherDocsList} />
      )}
      <div className={classes.docContainer}>
        <Box className={classes.pageHeader}>
          <Grid container justify="space-between">
            {/* <Grid container>
              <Grid item alignItems="center">
                <Typography variant="h4" className={classes.pageTitle}>{t("myDocumentSec.title")}</Typography>
              </Grid>
              <Divider flexItem variant="middle" orientation="vertical" />
              <Grid item>
                <Typography className={classes.pageSubTitle}>{t("myDocumentSec.subTitle")} : <strong>{totalDocCount}</strong></Typography>
              </Grid>
            </Grid> */}
            <Grid item md="auto" xs={12}>
              {/* {isPaymentDone && <Button color="primary" variant="contained" onClick={() => history.push("/upload-documents")}>{t("myDocumentSec.goUploadDocsBtnTxt")}</Button>} */}
              {/* {isPendingDocUpload &&
                <Typography className={classes.docUploadErrorTxtView}>{t("myDocumentSec.uploadDocsPendingStatusTxt")}</Typography>
              } */}
            </Grid>
          </Grid>
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab label="Main Documents" />
            <StyledTab label="Other Documents" />
          </StyledTabs>
        </Box>
        {isErrorGetDocsList && <AlertBox style={{ margin: 10 }} severity="error">{errorMsgGetDocsList}</AlertBox>}
        {isErrorOtherDocsList && <AlertBox style={{ margin: 10 }} severity="error">{errorMsgOtherDocsList}</AlertBox>}
        <Box className={classes.tableContainer}>
          {applicationDocuments.length > 0 ? (
            <Hidden smDown>
              <Box className={classes.tableHeader}>
                <Grid container alignItems="center">
                  <Grid item md="auto">
                    <Typography className={`${classes.tblHdCol} type`}>{t("myDocumentSec.table.head1")}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={classes.tblHdCol}>{t("myDocumentSec.table.head2")}</Typography>
                  </Grid>
                  <Grid item md>
                    <Typography className={classes.tblHdCol}>{t("myDocumentSec.table.head3")}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Hidden>) : false}
          <Box className={classes.tableBody}>
            {myDocumentRecords.length > 0 ? (myDocumentRecords.map((element, i) => (
              <Box className={classes.tableRow} key={i}>
                <Grid container alignItems="center">
                  <Grid item md="auto">
                    {element.fileType === "png" ? (
                      <img src={PngIcon} alt={element.DocumentName} className={classes.fileFormatIcon} />
                    ) : (element.fileType === "pdf" ? (
                      <img src={PdfIcon} alt={element.DocumentName} className={classes.fileFormatIcon} />
                    ) : (element.fileType === "jpeg" || element.fileType === "jpg" ? (
                      <img src={JpgIcon} alt={element.DocumentName} className={classes.fileFormatIcon} />
                    ) : (<img src={othericon} alt={element.DocumentName} className={classes.fileFormatIcon} />)))
                    }
                  </Grid>
                  <Grid item md={6} xs>
                    <Typography className={classes.fullNameCol}>{element.DocumentName}</Typography>
                    <Hidden mdUp>
                      <Typography className={classes.fileSizeCol}>
                        {bytesToSize(element.FileSize)}
                      </Typography>
                    </Hidden>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md>
                      <Typography className={classes.fileSizeCol}>
                        {bytesToSize(element.FileSize)}
                      </Typography>
                    </Grid>
                    <Grid item md="auto">
                      {/* disabled={element.fileFormat == "pdf"} */}
                      {/* {element.imageIs && */}
                      <Button color="primary" size="small" className={classes.fileViewBtn} disabled={!element?.DocumentValue} onClick={() => documentPreview(element)}> {t("myDocumentSec.viewBtnText")}</Button>
                      {/* } */}
                    </Grid>
                  </Hidden>
                  <Grid item md="auto">
                    <Hidden smDown>
                      <IconButton className={classes.downloadIconBtn} disabled={!element?.DocumentValue} onClick={() => downloadFile(element)}>
                        <DownloadIcon />
                      </IconButton>
                    </Hidden>
                    <Hidden mdUp>
                      <IconButton className={classes.menuIconBtn} onClick={handleMenuClick} disabled={!element?.DocumentValue}><MyDocMoreMenuIcon /></IconButton>
                      <Menu id="more-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose} className={classes.menuContainer}>
                        <MenuItem onClick={() => downloadFile(element)}>
                          <ListItemIcon>
                            <BlackDownloadIcon />
                          </ListItemIcon>
                          {t("myDocumentSec.downloadBtnText")}
                        </MenuItem>
                        <MenuItem onClick={() => documentPreview(element)}>
                          <ListItemIcon>
                            <MyDocViewIcon />
                          </ListItemIcon>
                          {t("myDocumentSec.previewBtnText")}
                        </MenuItem>
                      </Menu>
                    </Hidden>
                  </Grid>
                </Grid>
              </Box>
            ))) : (isFetchingDocuments == false ? (<h1 className={classes.notFound}>{t("myDocumentSec.documentNotFoundTxt")}</h1>) : false)}
          </Box>
        </Box>
      </div>
      <UserDocumentPreviewDialogBox open={docPreviewDialogOpenIs} onClose={docPreviewDialogCloseFun} documentPreviewData={documentPreviewData} downloadFile={downloadFile} bytesToSize={bytesToSize} />
    </ProfileWrap>
  );
}

export default MyDocuments;