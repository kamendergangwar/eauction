import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormControl from "../../../molecules/FormControl/FormControl";
import { Formik, Form } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import {
  UploadDocsTitleIcon,
  EditWhiteICon,
  WhiteArrowIcon,
  DownloadIcon,
  VerifiedDocIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import {
  ApiEndPoint,
  Fcfs_Flow,
  InfoWebSiteUrl,
} from "../../../../utils/Common";
import AddIcon from "@material-ui/icons/Add";
import { DocumentsFormStyles } from "../Document.style";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import withWidth from "@material-ui/core/withWidth";
import { useSelector, useDispatch } from "react-redux";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl as MUIform,
  styled,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DomocileDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/DomocileDialogBox/DomocileDialogBox";
import AadharCardDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/AadharCardDialogBox/AadharCardDialogBox";
import CoAppAadharCardDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/CoApplicantAadharCardDialogBox/CoAppAadharCardDialogBox";
import ApplicantProfileDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/ApplicnatProfileDialogBox/ApplicantProfileDialogBox";
import CoApplicantProfileDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/CoApplicnatProfileDialogBox/CoApplicantProfileDialogBox";
import PanCardDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/PanCardDialogBox/PanCardDialogBox";
import CoAppPanCardDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/CoApplicantPanCardDialogBox/CoAppPanCardDialogBox";
import IncomeDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/IncomeDialogBox/IncomeDialogBox";
import PmayDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/PmayDialogBox/PmayDialogBox";
import IncomeSpouceDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/IncomeSpouceDialogBox/IncomeSpouceDialogBox";
import CasteDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/CasteDialogBox/CasteDialogBox";
import CasteValidityDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/CasteValidityDialogBox/CasteValidityDialogBox";
import AffidavitDDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/AffidavitDDialogBox/AffidavitDDialogBox";
import ExServicemanDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/ExServicemanDialogBox/ExServicemanDialogBox";
import PersonalManagerDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/PersonalManagerDialogBox/PersonalManagerDialogBox";
import APMCertificateDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/APMCcertificateDialogBox/APMCertificateDialogBox";
import AffidavitFDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/AffidavitFDialogBox/AffidavitFDialogBox";
import AffidavitADialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/AffidavitADialogBox/AffidavitADialogBox";
import JournalistDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/JournalistDialogBox/JournalistDialogBox";
import PAPDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/PAPDialogBox/PAPDialogBox";
import DisabilityDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/DisabilityDialogBox/DisabilityDialogBox";
import AffidavitBDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/AffidavitBDialogBox/AffidavitBDialogBox";
import AffidavitCDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/AffidavitCDialogBox/AffidavitCDialogBox";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  clearImageUrl,
  clearFileState,
  clearDocumentImageUrl,
  clearOtherFile,
} from "../../../../redux/features/file/FileUploadSlice";
import { clearSuccessMsg, documentsSelector, saveDocument } from "../../../../redux/features/file/DocumentsSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import OutlinedCard from "../../../molecules/Cards/OutlinedCard/OutlinedCard";
/* import {
  getEstampSummary,
  eStampingSelector,
  setDocforEstamping,
} from "../../../../redux/features/transaction/EstampingSlice"; */
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  getUploadDocumentsList,
  docDeclarationSelector,
  clearDocDeclarationState,
  clearDocDeclarationtData,
} from "../../../../redux/features/file/DocDeclarationSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import UploadDocumentTnCDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/UploadDocumentTnCDialogBox/UploadDocumentTnCDialogBox";
import SampleUploadTooltip from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/SampleUploadToolTipBox/SampleUploadTooltip";
import {
  addEditApplicantProgress,
  ApplicantProgressSelector,
  clearApplicantStepperUpdateRes,
  getApplicantProgress,
} from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { maxWidth } from "@material-ui/system";
import InfoIcon from '@material-ui/icons/Info';
import DivorceeDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/DivorceeDialogBox/DivorceeDialogBox";
import { el } from "date-fns/locale";
import DocumentUploadBox from "../../../atoms/DocumentUploadBox/DocumentUploadBox";
import GenericDocDialogBox from "../../../molecules/DialogBoxes/UploadDocumentDialogBox/GenericDocDialogBox/GenericDocDialogBox";
import { RegistrationStepperSave, RegistrationStepperSelector } from "../../../../redux/features/registration/registrationStepperSlice";

const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
    maxWidth: 500,
  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);

const ErrorTooltip = withStyles((theme) => ({
  arrow: {
    color: 'rgba(200, 0, 0, 0.87)',
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(200, 0, 0, 0.87)',
    boxShadow: "0 0 20px rgba(223 19 19 / 50%)",
    fontSize: 11,
  },
}))(Tooltip);

function UploadDocuments(props) {
  const { width,active } = props;
  const classes = DocumentsFormStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const dispatch = useDispatch();
  const history = useHistory();
  const [openPop, setOpenPop] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [newReservation, setNewReservation] = React.useState([]);
  const [reservationCategory, setReservationCategory] = useState([]);
  const [documentDetails, setDocumentDetails] = React.useState([]);
  const [documentData, setDocumentData] = React.useState({});
  const [documentCardList, setDocumentCardList] = useState([]);
  const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = React.useState(false);
  const [selectedDialog, setSelectedDialog] = useState("");
  const [isAllDocsUploaded, setIsAllDocsUploaded] = useState(false);
  const [isConfirmCheckbox, setConfirmCheckbox] = useState(false);
  const [tncDialogOpenIs, setTncDialogOpenIs] = useState(false);
  const [isFcfs, setIsFcsf] = useState(Fcfs_Flow);
  const [isVerified, setIsVerified] = useState(false); // temp tag for MAHA api verification
  const updateConfirmCheckbox = () => setConfirmCheckbox(!isConfirmCheckbox);
  const [confirmScheme, setConfirmScheme] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [reservationId, setReservationId] = useState()
  const [isDocStepUpdate, setIsDocStepUpdate] = React.useState(false);
  const [confirmSkip, setConfirmSkip] = useState(false);
  const [skipDialog, setSkipDialog] = useState(false)
  const [downloadLoading, setdownloadLoading] = useState(false);
  const [skipDialogDocID, setSkipDialogDocID] = useState();
  const [verificationDone, setVerificationDone] = useState(false)
  const [skipDocs, setSkipDocs] = useState([]);
  const [stepCompleted, setIsStepCompleted] = useState(false)
  const [flag, setFlag] = useState(false);
  const {
    isEStampSelected,
    isFetching,
    isSuccess,
    isSuccessSent,
    isError,
  } = useSelector(documentsSelector);

  useEffect(() => {
    let isSkipCasteVal = JSON.parse(localStorage.getItem("isSkipDoc"));
    if (isSkipCasteVal) {
      setConfirmSkip(isSkipCasteVal)
    }
  }, [])

  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    isSuccessResApplicantGet,
    isFetchingApplicantGet,
    applicantData,
  } = useSelector(applicantSelector);
  const {
    isFetchingGetUploadList,
    isSuccessResUploadList,
    isErrorGetUploadList,
    errorMsgGetUploadList,
    getUploadListData,
  } = useSelector(docDeclarationSelector);

  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );
  /* const {
    currentEstamping,
    isSuccessReqEstamping,
    eStampingnData,
    // reservationCat,
    // isFetchingEstamping,
  } = useSelector(eStampingSelector); */

  useEffect(() => {
    dispatch(clearApplicantStepperUpdateRes())
    dispatch(getApplicantProgress());
  }, [dispatch]);

  useEffect(() => {
    setIsStepCompleted(active > 5)
}, [active])

  const {
    ApplicantStepperData,
    isSuccessProgressResStepper,
    superStepper,
    superActiveStep,
    isSuccessProgressReqStepper,
    documentPreVerificationData
  } = useSelector(ApplicantProgressSelector);
  const { isFetchRegStepper,
    isSuccessgetRegStepper,
    getRegStepper,
    getRegActiveStep,
    isErrorgetRegStepper,
    getRegStepperData,
    errorMessagegetRegStepper,
    getRegTotalStep,
    isSuccessRegStepper,
  } = useSelector(RegistrationStepperSelector);
  // useEffect(() => {
  //   if (isSuccessProgressResStepper) {
  //     ApplicantStepperData.superStepper.forEach((item) => {
  //       if (item.StepId == "7") {
  //         item.Status == "completed"
  //           ? setIsPaymentDone(true)
  //           : setIsPaymentDone(false);
  //       }
  //       if (item.StepId == "8") {
  //         item.Status == "completed"
  //           ? setVerificationDone(true)
  //           : setVerificationDone(false);
  //       }
  //       if (item.StepId == "5" && item.Status == "pending") {
  //         history.push("/dashboard");
  //       }
  //     });
  //   }
  // }, [isSuccessProgressResStepper]);

  const handleComplete = () => {
    if (isAllDocsUploaded == false || isConfirmCheckbox == false) {
      setConfirmScheme(true);

    } else {
      dispatch(clearApplicantStepperUpdateRes())
      setIsDocStepUpdate(true)
      dispatch(RegistrationStepperSave("6"))
      // console.log(isDocStepUpdate)
      // updateApplicantProgressStepper();
      // history.push("/dashboard");
    }
  };
  // const handleComplete = () => {
  //   history.push("/dashboard");
  // }
  useEffect(()=>{
if(isSuccessRegStepper){
  history.push("/dashboard");
}
  },[isSuccessRegStepper])
  useEffect(() => {
    if (isDocStepUpdate) {
      dispatch(getApplicantProgress())
    }
  }, [isDocStepUpdate])


  useEffect(() => {
    dispatch(getStepperDetails());
    dispatch(getApplicant());
    // dispatch(setDocforEstamping([]));
  }, [dispatch, t]);


  useEffect(() => {
    if (isSuccessResApplicantGet) {
      setReservationId(applicantData.RservationCatIds)
      let sendData = {
        ApplicantId: applicantData.ApplicantId,
        Lang: localStorage.getItem("i18nextLng"),
      };
      dispatch(getUploadDocumentsList(sendData));
    }
  }, [isSuccessResApplicantGet, applicantData, t]);


  const handleClickOpen = (name, key) => {
    let docId = name.DocumentId;
    // let newDocArr = documentCardList;
    // const newObj = { docName: name, status: 1 };
    // newDocArr[key] = newObj;
    // setDocumentCardList(newDocArr);
    setSelectedDialog(docId);
    setDocumentDialogBoxOpen(true);
  };

  const handleClose = () => {
    dispatch(clearImageUrl());
    setTimeout(() => {
      dispatch(clearFileState());
    }, 500);
    dispatch(clearDocumentImageUrl());
    dispatch(clearOtherFile());
    setDocumentDialogBoxOpen(false);
  };

  const afterSubmitCloseHandler = (uplDocId) => {
    dispatch(clearImageUrl());
    dispatch(clearDocumentImageUrl());
    dispatch(clearOtherFile());
    setDocumentDialogBoxOpen(false);
    dispatch(clearFileState());
    dispatch(clearSuccessMsg());
    let sendData = {
      ApplicantId: applicantData.ApplicantId,
      Lang: localStorage.getItem("i18nextLng"),
    };
    dispatch(getUploadDocumentsList(sendData));
  };

  useEffect(() => {
    if (isSuccessResUploadList && getUploadListData) {
      setDocumentCardList(getUploadListData.DocumentDetails)
    }
  }, [getUploadListData, isSuccessResUploadList])

  useEffect(() => {
    let is_uploaded = true;
    if (documentCardList.length > 0) {
      for (let i = 0; i < documentCardList.length; i++) {
        const element = documentCardList[i];
        if (element.IsUploaded === 0 && element.IsOptional != "1") {
          is_uploaded = false;
          break;
        }
        if (element.IsOptional == "1" && (element.IsUploaded === 0 && element.IsSkipped == 0)) {
          is_uploaded = false;
          break;
        }
      }
      setIsAllDocsUploaded(is_uploaded);
    }
  }, [confirmSkip, documentCardList]);

  const downloadSampleFile = (filename) => {
    let docName = filename.DocumentId;
    let fileName = filename.DocumentName;
    let docId;
    // eslint-disable-next-line default-case
    switch (docName) {
      case "1":
        docId = "1";
        break;
      case "2":
        docId = "2";
        break;
      case "15":
        docId = "15";
        break;
      case "3":
        docId = "3";
        break;
      case "5":
        docId = "5";
        break;
      case "6":
        docId = "6";
        break;
      case "9":
        docId = "9";
        break;
      case "10":
        docId = "10";
        break;
      case "14":
        docId = "14";
        break;
      case "11":
        docId = "11";
        break;
      case "13":
        docId = "13";
        break;
      case "4":
        docId = "4";
        break;
      case "8":
        docId = "8";
        break;
      case "12":
        docId = "12";
        break;
      case "7":
        docId = "7";
        break;
      case "17":
        docId = "17";
        break;
      case "16":
        docId = "16";
        break;
    }
    if (docId != undefined) {
      setdownloadLoading(true);
      fetch(`${ApiEndPoint}/DocumentDownload/${docId}?Lang=${localStorage.getItem("i18nextLng")}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }).then((response) => response.blob()).then((blob) => {
        setdownloadLoading(false);
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName + ".pdf");
        // link.setAttribute("download", "TesstFile.pdf");
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      }).catch(error => {
        setdownloadLoading(false);
        alert(error, "error");
      });
    }
  };

  const truncateContent = (content, charLimit) => {
    if (content.length > charLimit) {
      return content.slice(0, charLimit) + '...';
    }
    return content;
  };



  return (
    <>
      {(isFetchingApplicantGet ||
        isFetchingApplicant ||
        isFetchingGetUploadList ||
        downloadLoading ||
        isFetching) && (
          <Loading
            isOpen={
              isFetchingApplicantGet ||
              isFetchingApplicant ||
              isFetchingGetUploadList ||
              downloadLoading || isFetching
            }
          />
        )}
      <Box className={classes.formSection}>
        {isErrorApplicant && (
          <AlertBox severity="error">{errorMessage}</AlertBox>
        )}

        {isErrorGetUploadList && (
          <AlertBox severity="error">{errorMsgGetUploadList}</AlertBox>
        )}
        <Grid container>
          {isPaymentDone && (
            <AlertBox severity="info">
              {" "}
              {t('uploadDocAlertTxt')}
            </AlertBox>
          )}
          {/* <Grid xs={12} style={{ padding: 5 }}><span style={{ color: "rgb(249, 61, 92)" }}>*</span> {t('mandatoryTxt')}</Grid> */}
          <DocumentUploadBox active={active} documentCardList={documentCardList} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} inVerication={verificationDone} verificationDone={verificationDone} isPaymentDone={isPaymentDone} />
        </Grid>
      </Box>
      {!stepCompleted &&  <Box className={classes.actionSection}>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              className={classes.termsNdCondiCheckBoxLabel}
            >
              {t("acknowledgeContent")}
            </Typography>
          </Grid>
         <Grid container justifyContent="space-between" xs={12}>
            <MUIform component="fieldset" error={!isConfirmCheckbox}>
              {isFcfs ? (
                <FormControlLabel
                  name="isPuccaHouse"
                  checked={isConfirmCheckbox}
                  onChange={updateConfirmCheckbox}
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography
                      variant="body1"
                      className={classes.termsNdCondiCheckBoxLabel}
                    >
                      {t("acknowledgeLabel")}
                      {/* {t("FcfsCheckLabel1")} */}
                      {/* <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setTncDialogOpenIs(e);
                        }}
                      >
                        {t("FcfsCheckLabel2")}
                      </span>{" "}
                      {t("FcfsCheckLabel3")} */}
                    </Typography>
                  }
                  labelPlacement="end"
                />
              ) : (
                <FormControlLabel
                  name="isPuccaHouse"
                  checked={isConfirmCheckbox}
                  onChange={updateConfirmCheckbox}
                  control={<Checkbox color="primary" />}
                  label={t("checkLabel")}
                  labelPlacement="end"
                />
              )}
            </MUIform>
            <Button
              type="button"
              variant="contained"
              color="primary"
              endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
              className={classes.proceedBtn}
              onClick={() =>
            handleComplete()}
            // redirect to payment summary page for 2000rs (fcfs flow)
             //disabled={!isAllDocsUploaded || !isConfirmCheckbox}
             disabled={ !isConfirmCheckbox}
                 >
              {t("nextButtonText")}
            </Button>
          </Grid>
      </Box>}
      <Dialog
        onClose={handleClose}
        className={classes.dialogBox}
        open={documentDialogBoxOpen}
        disableBackdropClick
        fullWidth={true}
        maxWidth="md"
      >
        {selectedDialog && <GenericDocDialogBox
          handleClose={handleClose}
          afterSubmitCloseHandler={afterSubmitCloseHandler}
          docData={documentCardList.filter((doc) => doc.DocumentId == selectedDialog.docId)[0]}
        />}
      </Dialog>
      <UploadDocumentTnCDialogBox
        open={tncDialogOpenIs}
        onClose={setTncDialogOpenIs}
      />

      <Dialog
        open={confirmScheme}
        onClose={() => {
          setConfirmScheme(false);
        }}
        aria-labelledby="pmay-dialog"
      >
        <DialogTitle id="pmay-dialog">
          {t("acknowledgeMsg0")}
        </DialogTitle>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            onClick={() => {
              setConfirmScheme(false);
            }}
          >
            {t("okBtn")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withWidth()(UploadDocuments);