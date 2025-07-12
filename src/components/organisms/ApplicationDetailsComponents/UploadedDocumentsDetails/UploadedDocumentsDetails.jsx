import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import { useHistory, useLocation } from "react-router-dom";
import { CategoryDetailsIcon, ApplicationEditIcon } from "../../../atoms/SvgIcons/SvgIcons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { IconButton, Button } from "@material-ui/core";
import Loading from "../../../atoms/Loading/Loading";
import { DownloadIcon, BlackDownloadIcon, MyDocMoreMenuIcon, MyDocViewIcon } from "../../../atoms/SvgIcons/SvgIcons";
import UserDocumentPreviewDialogBox from "../../../molecules/DialogBoxes/UserDocumentPreviewDialogBox/UserDocumentPreviewDialogBox";
import PngIcon from "../../../../assets/pngIcon.png";
import JpgIcon from "../../../../assets/jpgIcon.png";
import PdfIcon from "../../../../assets/pdfIcon.png";
import othericon from "../../../../assets/otherFile.png";
import {
  myProfileSelector,
} from "../../../../redux/features/myProfile/MyProfileSlice";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getDocumentsList,
  docDeclarationSelector,
} from "../../../../redux/features/file/DocDeclarationSlice";
import {
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector
} from "../../../../redux/features/preferences/PreferencesSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { ApiEndPoint } from "../../../../utils/Common";
import { MyDocumentsStyles } from "../../ProfilePageComponents/MyDocuments/MyDocuments.style";

function MyDocuments(props) {

  const {applicantData} = props

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
  const {
    // applicantData,
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
    getDocsListData
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
  }, [dispatch]);

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
    if (isSuccessResApplicantGet && applicantData) {
      // let sendData = {
      //   ApplicantId: applicantData.ApplicantId,
      //   CasteCatId: applicantData.CasteCatId,
      //   ReservationCatIds: applicantData.RservationCatIds,
      //   IncomeGroup: applicantData.IncomeGroup,
      // };
      dispatch(getDocumentsList());
    }
  }, [isSuccessResApplicantGet, applicantData, t]);

  useEffect(() => {
    if (isSuccessResGetDocsList && getDocsListData) {
      let set_val = false;
      let documentObject = [];
      for (let u = 0; u < getDocsListData.length; u++) {
        const element = getDocsListData[u];
        if (element.IsUploaded === 0) {
          set_val = true;
          break;
        } else {
          set_val = false;
        }
      }
      setIsPendingDocUpload(set_val);
      getDocsListData.forEach(element => {
        let new_obj = {
          ...element,
          imageIs: "jpg" === element.DocumentValue.split('.').pop() || "jpeg" === element.DocumentValue.split('.').pop() || "png" === element.DocumentValue.split('.').pop() ? true : false,
          fileType: element.DocumentValue.split('.').pop()
        }
        documentObject.push(new_obj);
      });
      setTotalDocCount(documentObject.length);
      setMyDocumentRecords(documentObject);
    }
  }, [isSuccessResGetDocsList, getDocsListData]);
  
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

  const menuList = [
    {
      label: t("myDocumentSec.downloadBtnText"),
      value: "download",
      icon: <BlackDownloadIcon />
    },
    {
      label: t("myDocumentSec.previewBtnText"),
      value: "preview",
      icon: <MyDocViewIcon />
    }
  ];
  const menuList_2 = [
    {
      label: t("myDocumentSec.downloadBtnText"),
      value: "download",
      icon: <BlackDownloadIcon />
    }
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const docPreviewDialogCloseFun = () => {
    setDocPreviewDialogOpen(false);
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
        fetch(`${ApiEndPoint}/FileUpload/getAWSFileDownload?fileName=${lastItem}`, {
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
          link.setAttribute("download", fileUrl?.DocumentValue.substring(fileUrl?.DocumentValue.lastIndexOf('/') + 1));
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
    <>
      {(isFetchingDocuments || isFetchingApplicantGet || isFetchingGetDocsList || downloadLoading) && (
        <Loading isOpen={isFetchingDocuments || isFetchingApplicantGet || isFetchingGetDocsList || downloadLoading} />
      )}
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
                      <img src={PngIcon} alt={element.DisplayName} className={classes.fileFormatIcon} />
                    ) : (element.fileType === "pdf" ? (
                      <img src={PdfIcon} alt={element.DisplayName} className={classes.fileFormatIcon} />
                    ) : (element.fileType === "jpeg" || element.fileType === "jpg" ? (
                      <img src={JpgIcon} alt={element.DisplayName} className={classes.fileFormatIcon} />
                    ) : (<img src={othericon} alt={element.DisplayName} className={classes.fileFormatIcon} />)))
                    }
                  </Grid>
                  <Grid item md={6} xs>
                    <Typography className={classes.fullNameCol}>{element.DisplayName}</Typography>
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
                      <Button color="primary" size="small" className={classes.fileViewBtn} disabled={!element?.DocumentValue} onClick={() => documentPreview(element)}> {t("myDocumentSec.viewBtnText")}</Button>
                    </Grid>
                  </Hidden>
                  <Grid item md="auto">
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
      <UserDocumentPreviewDialogBox open={docPreviewDialogOpenIs} onClose={docPreviewDialogCloseFun} documentPreviewData={documentPreviewData} downloadFile={downloadFile} bytesToSize={bytesToSize} />
    </>
  );
}


const UploadedDocumentsDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();

  const currentPathName = useLocation().pathname;
  const history = useHistory();

  return (
    <Box className={classes.detailBoxContainer}>
      <Box>
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<CategoryDetailsIcon fontSize="large" />}
              title="Uploaded Documents"
            />
          </Grid>
          <Grid item md="auto" xs={12}>
          {/* {currentPathName=="/application-details" && (<Button color="primary" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => history.push("/upload-documents")}>{t("categoryDetails.editButtonText")}</Button>)}	 */}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        <Grid container>
          <Grid item md={12} xs={12}>
            <MyDocuments applicantData={applicantData} />            
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default withWidth()(UploadedDocumentsDetails);
