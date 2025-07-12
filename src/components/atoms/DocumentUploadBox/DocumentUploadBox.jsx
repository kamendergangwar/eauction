// import {
//     Box,
//     Button,
//     Checkbox,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     FormControlLabel,
//     Grid,
//     Tooltip,
//     Typography,
//     withStyles,
// } from "@material-ui/core";
// import InfoIcon from '@material-ui/icons/Info';
// import {
//     DownloadIcon,
//     EditWhiteICon,
//     VerifiedDocIcon,
// } from "../SvgIcons/SvgIcons";
// import { DocumentUploadBoxStyle } from "./DocumentUploadBox.styles";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useDispatch, useSelector } from "react-redux";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import { useEffect, useState } from "react";
// import { ApiEndPoint } from "../../../utils/Common";
// import Loading from "../Loading/Loading";
// import { documentsSelector, saveDocument } from "../../../redux/features/file/DocumentsSlice";
// import { docDeclarationSelector, getUploadDocumentsList } from "../../../redux/features/file/DocDeclarationSlice";
// import { clearSuccessMsg } from "../../../redux/features/Grievance/GrievanceSlice";
// import { applicantSelector } from "../../../redux/features/applicant/ApplicantSlice";
// import AlertBox from "../AlertBox/AlertBox";

// const CustomTooltip = withStyles({
//     tooltip: {
//         backgroundColor: "#FFFFFF",
//         color: "rgba(0, 0, 0, 0.87)",
//         fontSize: 11,
//         boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
//         borderRadius: "8px",
//         border: "1px solid rgba(0, 56, 192, 1)",
//     },
//     arrow: {
//         "&:before": {
//             border: "1px solid rgba(0, 56, 192, 1)",
//         },
//         color: "#FFFFFF",
//     },
// })(Tooltip);

// const ErrorTooltip = withStyles((theme) => ({
//     arrow: {
//         color: 'rgba(200, 0, 0, 0.87)',
//     },
//     tooltip: {
//         backgroundColor: theme.palette.common.white,
//         color: 'rgba(200, 0, 0, 0.87)',
//         boxShadow: "0 0 20px rgba(223 19 19 / 50%)",
//         fontSize: 11,
//     },
// }))(Tooltip);

// const DocumentUploadBox = (props) => {
//     const { documentCardList, setSelectedDialog, setDocumentDialogBoxOpen, type, inVerication, disabled, isPaymentDone, verificationDone } = props;
//     const classes = DocumentUploadBoxStyle();
//     const { t } = useTranslation("DocumentsPageTrans");
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const [downloadLoading, setdownloadLoading] = useState(false)
//     const [docData, setDocData] = useState([]);
//     const [skipDialog, setSkipDialog] = useState(false)
//     const [skipDialogDocID, setSkipDialogDocID] = useState();
//     const [skipDocs, setSkipDocs] = useState([]);
//     const [flag, setFlag] = useState(false);
//     const {
//         isEStampSelected,
//         isFetching,
//         isSuccess,
//         isSuccessSent,
//         isError,
//     } = useSelector(documentsSelector);

//     const {
//         applicantData,
//     } = useSelector(applicantSelector);
//     const {
//         isFetchingGetUploadList,
//         isSuccessResUploadList,
//         isErrorGetUploadList,
//         errorMsgGetUploadList,
//         getUploadListData,
//     } = useSelector(docDeclarationSelector);

//     const handleClickOpen = (name, key) => {
//         let docId = name.DocumentId;
//         setSelectedDialog({ docId: docId, type: type });
//         setDocumentDialogBoxOpen(true);
//     };

//     const downloadSampleFile = (filename) => {
//         let docName = filename.DocumentId;
//         let fileName = filename.DocumentName;
//         let docId;
//         // eslint-disable-next-line default-case
//         switch (docName) {
//             case "1":
//                 docId = "1";
//                 break;
//             case "2":
//                 docId = "2";
//                 break;
//             case "15":
//                 docId = "15";
//                 break;
//             case "3":
//                 docId = "3";
//                 break;
//             case "5":
//                 docId = "5";
//                 break;
//             case "6":
//                 docId = "6";
//                 break;
//             case "9":
//                 docId = "9";
//                 break;
//             case "10":
//                 docId = "10";
//                 break;
//             case "14":
//                 docId = "14";
//                 break;
//             case "11":
//                 docId = "11";
//                 break;
//             case "13":
//                 docId = "13";
//                 break;
//             case "4":
//                 docId = "4";
//                 break;
//             case "8":
//                 docId = "8";
//                 break;
//             case "12":
//                 docId = "12";
//                 break;
//             case "7":
//                 docId = "7";
//                 break;
//             case "17":
//                 docId = "17";
//                 break;
//             case "16":
//                 docId = "16";
//                 break;
//         }
//         if (docId != undefined) {
//             setdownloadLoading(true);
//             fetch(`${ApiEndPoint}/DocumentDownload/${docId}?Lang=${localStorage.getItem("i18nextLng")}`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: localStorage.getItem("jwtToken"),
//                 },
//             }).then((response) => response.blob()).then((blob) => {
//                 setdownloadLoading(false);
//                 // Create blob link to download
//                 const url = window.URL.createObjectURL(
//                     new Blob([blob]),
//                 );
//                 const link = document.createElement("a");
//                 link.href = url;
//                 link.setAttribute("download", fileName + ".pdf");
//                 // link.setAttribute("download", "TesstFile.pdf");
//                 // Append to html link element page
//                 document.body.appendChild(link);
//                 // Start download
//                 link.click();
//                 // Clean up and remove the link
//                 link.parentNode.removeChild(link);
//             }).catch(error => {
//                 setdownloadLoading(false);
//                 alert(error, "error");
//             });
//         }
//     };

//     const truncateContent = (content, charLimit) => {
//         if (content.length > charLimit) {
//             return content.slice(0, charLimit) + '...';
//         }
//         return content;
//     };

//     useEffect(() => {
//         if (documentCardList) {
//             const updatedData = documentCardList.map((item) => {
//                 if (item.DocumentDetails && item.DocumentDetails.length > 0) {
//                     const IsResubmitted = item.DocumentDetails[0].isResubmitted;
//                     const IsApproved = item.DocumentDetails[0].VerifiedFlag == 1;
//                     const IsRejected = item.DocumentDetails[0].VerifiedFlag == 2;
//                     const DocVerificationMsg = item.DocumentDetails[0].VerifiedReason;
//                     return { ...item, IsResubmitted, IsApproved, IsRejected, DocVerificationMsg };
//                 }
//                 return item;
//             });
//             setDocData(updatedData);
//         }
//     }, [documentCardList]);

//     const onSkip = (skip, docId) => {
//         const requestData = new FormData();
//         requestData.append("DocumentId", docId);
//         requestData.append("ApplicantId", localStorage.getItem("applicantId"));
//         requestData.append("Lang", localStorage.getItem("i18nextLng"));
//         requestData.append("isSkip", skip);
//         dispatch(saveDocument(requestData));
//         setFlag(true)
//     };

//     useEffect(() => {
//         if (isSuccess && flag) {
//             let sendData = {
//                 ApplicantId: applicantData.ApplicantId,
//                 Lang: localStorage.getItem("i18nextLng"),
//             };
//             dispatch(getUploadDocumentsList(sendData));
//             setFlag(false);
//             dispatch(clearSuccessMsg());
//         }
//     }, [flag, isSuccess]);

//     useEffect(() => {
//         if (isSuccessResUploadList && getUploadListData) {
//             const filteredArray = getUploadListData?.DocumentDetails?.filter(item => {
//                 return item.DocumentDetails[0]?.IsSkipped == "1";
//             });
//             setSkipDocs(filteredArray);
//         }
//     }, [getUploadListData, isSuccessResUploadList])

//     return (
//         <Grid container >
//             {downloadLoading && <Loading isOpen={downloadLoading} />}
//             {(verificationDone && skipDocs.length > 0) &&
//                 <AlertBox severity="warning" style={{ marginTop: 12 }}>
//                     You have skipped some documents, that must be uploaded before receiving the allotment letter. Once these documents are uploaded, your allotment letter will be generated.
//                 </AlertBox>
//             }
//             {docData.map((docElement, index) => {
//                 return (
//                     <Grid
//                         item
//                         xs={12}
//                         md={4}
//                         sm={6}
//                         key={index}
//                         className={classes.docsBox}
//                     >
//                         <Box className={`${classes.docsCard} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
//                                         ${docElement.IsUploaded === 1 && docElement.IsApproved == true ? "verified" : ""}
//                                         ${inVerication == true && docElement.IsApproved == false && docElement.IsRejected == false ? "disable" : ""}
//                                         ${docElement.IsApproved == false && docElement.IsRejected == true ? "rejected" : ""}`}
//                             style={{ width: "100%", justifyContent: "space-evenly" }}
//                         >
//                             {docElement.IsUploaded === 1 && !docElement.IsApproved && (
//                                 <Box className={classes.tikIconBox}>
//                                     <CheckCircleIcon
//                                         fontSize="small"
//                                         style={{ color: "#FFFFFF" }}
//                                     />
//                                 </Box>
//                             )}

//                             <Box className={classes.downloadBtnArea}>
//                                 {(docElement.IsUploaded === 0 && docElement.Sample) && (
//                                     <Box>
//                                         <Button
//                                             startIcon={<DownloadIcon />}
//                                             color="primary"
//                                             className={classes.downloadBtn}
//                                             onClick={() => downloadSampleFile(docElement)}
//                                         >
//                                             {t("sampleTxt")}
//                                         </Button>
//                                     </Box>
//                                 )}
//                             </Box>
//                             <Box>
//                                 <Typography className={`${classes.docNameTxt} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
//                                             ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`} >
//                                     {docElement.DocumentName}
//                                     {docElement.IsOptional === 0 && (
//                                         <span style={{ color: "rgb(249, 61, 92)" }}> *</span>
//                                     )}
//                                     {docElement.DocInfo && (
//                                         <CustomTooltip
//                                             enterTouchDelay={0}
//                                             title={
//                                                 <DialogContent className={classes.castDropDown}>
//                                                     <span
//                                                         style={{ fontSize: 15, lineHeight: 1.2 }}
//                                                         dangerouslySetInnerHTML={{
//                                                             __html: docElement.DocInfo,
//                                                         }}
//                                                     />
//                                                 </DialogContent>
//                                             }
//                                             style={{
//                                                 display: "inline-block",
//                                                 paddingLeft: "12px",
//                                                 lineHeight: "10px",
//                                             }}
//                                         >
//                                             <Typography className={classes.toolTipTittle}>
//                                                 <InfoIcon
//                                                     className={`${classes.infoToolTipIcon} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""
//                                                         } ${docElement.IsUploaded === 1 && docElement.IsApproved
//                                                             ? "verified"
//                                                             : ""
//                                                         }`}
//                                                 />
//                                             </Typography>
//                                         </CustomTooltip>
//                                     )}
//                                 </Typography>
//                             </Box>
//                             <Box>
//                                 {docElement.IsApproved && docElement.IsUploaded === 1 ? (
//                                     <Box className={classes.verifiedBox}>
//                                         <VerifiedDocIcon />
//                                         <span>{t("docVerifiedTxt")}</span>
//                                     </Box>
//                                 ) : (
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         disableRipple
//                                         className={`${classes.docsBtn} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""
//                                             }`}
//                                         size="small"
//                                         startIcon={
//                                             docElement.IsUploaded === 0 && inVerication == false ||
//                                                 docElement.IsResubmitted == 1 ? (
//                                                 ""
//                                             ) : (
//                                                 <EditWhiteICon fontSize="small" />
//                                             )
//                                         }
//                                         onClick={() => handleClickOpen(docElement, index)}
//                                         disabled={(inVerication && docElement.IsRejected == false) ||
//                                             docElement.IsResubmitted == 1 || disabled
//                                         }
//                                     >
//                                         {docElement.IsResubmitted != 1 && (
//                                             <span className={classes.docBtnTxt}>
//                                                 {!docElement.IsRejected
//                                                     ? (docElement.IsUploaded === 0 && inVerication == false)
//                                                         ? t("addBtn")
//                                                         : t("editBtn")
//                                                     : t("documentsForm.reuploadTxt")}
//                                             </span>
//                                         )}
//                                         {docElement.IsResubmitted == 1 && (
//                                             <span
//                                                 className={classes.docBtnTxt}
//                                                 style={{ color: "black" }}
//                                             >
//                                                 {t("reUploadSuccessTxt")}
//                                             </span>
//                                         )}
//                                     </Button>
//                                 )}
//                             </Box>
//                             {(docElement.IsOptional == 1 && !(verificationDone && docElement.IsSkipped)) && !(docElement.IsUploaded === 1 && isPaymentDone) &&
//                                 <Box>
//                                     <Typography className={`${classes.divider} ${docElement.IsUploaded === 1 && isPaymentDone == false ? "done" : ""} ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`}>{t("orTxt")}</Typography>
//                                     <FormControlLabel
//                                         name="isSkip"
//                                         value={docElement.IsSkipped}
//                                         checked={docElement.IsSkipped}
//                                         disabled={isPaymentDone}
//                                         onChange={(event) => {
//                                             if (docElement.IsSkipped) {
//                                                 onSkip(0, docElement.DocumentId);
//                                             }
//                                             else {
//                                                 setSkipDialog(true);
//                                                 setSkipDialogDocID(docElement.DocumentId)
//                                             }
//                                         }}
//                                         control={<Checkbox color="primary" />}
//                                         className={`${classes.skipCheckBox} ${docElement.IsUploaded === 1 && isPaymentDone == false ? "done" : ""} ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`}
//                                         label={
//                                             <Typography
//                                                 variant="body1"
//                                                 className={`${classes.skipCheckBoxLabel} ${docElement.IsUploaded === 1 && isPaymentDone == false ? "done" : ""} ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`}
//                                             >
//                                                 {t("skipLabelTxt")}
//                                             </Typography>
//                                         }
//                                         labelPlacement="end"
//                                     />
//                                 </Box>}
//                             {(verificationDone && docElement.IsSkipped) &&
//                                 <Typography className={`${classes.docNameTxt} ${docElement.IsUploaded === 1 && isPaymentDone == false ? "done" : ""} ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`}
//                                     style={{ fontWeight: 600, fontSize: 11 }} >
//                                     (Skipped Document, Please upload it before agreement letter)
//                                 </Typography>
//                             }
//                             {/* <Box>
//                                 {docElement.DocumentId != "22" &&
//                                     docElement.DocumentId != "23" && (
//                                         <Typography
//                                             className={`${classes.docNameTxt} ${docElement.IsUploaded === 1 ? "done" : ""
//                                                 } ${docElement.IsUploaded === 1 && docElement.IsApproved
//                                                     ? "verified"
//                                                     : ""
//                                                 }`}
//                                             style={{
//                                                 fontWeight: 500,
//                                                 margin: "20px,0,0,0",
//                                                 fontSize: 11,
//                                             }}
//                                         >
//                                             {t("selfAttestedTxt")}
//                                         </Typography>
//                                     )}
//                             </Box> */}
//                             {docElement.IsRejected && (
//                                 <Box mt={1}>
//                                     {t("rejectionReasonTxt")}{" "}
//                                     <ErrorTooltip title={docElement.DocVerificationMsg} arrow placement="bottom-start">
//                                         <span style={{ fontWeight: "700" }}>
//                                             {truncateContent(docElement.DocVerificationMsg, 50)}
//                                         </span>
//                                     </ErrorTooltip>
//                                 </Box>
//                             )}
//                         </Box>
//                     </Grid>
//                 );
//             })}
//             <Dialog maxWidth={'sm'} open={skipDialog} aria-labelledby="skip-dialog">
//                 <DialogTitle >
//                     {t("skipDialogTittle")}
//                 </DialogTitle>
//                 <DialogContent style={{ fontSize: '1rem' }}>
//                     {t('skipDialogContent')}
//                 </DialogContent>
//                 <DialogActions style={{ borderTop: "1.5px solid rgb(5 103 249 / 24%)", background: "#F5FAFD", padding: 5 }}>
//                     <Button variant="contained" autoFocus onClick={() => { onSkip(1, skipDialogDocID); setSkipDialog(false) }} color="primary" >
//                         {t('confirmSkipBtn')}
//                     </Button>
//                     <Button onClick={() => {
//                         // setConfirmSkip(false);
//                         setSkipDialog(false);
//                     }} color="primary" autoFocus>
//                         {t('cancelSkip')}
//                     </Button>
//                 </DialogActions>

//             </Dialog>
//         </Grid>
//     );
// };

// export default DocumentUploadBox;


import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Tooltip,
    Typography,
    withStyles,
} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import {
    DownloadIcon,
    EditDocumentIcon,
    EditWhiteICon,
    GreencheckIcon,
    VerifiedDocIcon,
} from "../SvgIcons/SvgIcons";
import { DocumentUploadBoxStyle } from "./DocumentUploadBox.styles";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useEffect, useState } from "react";
import { ApiEndPoint } from "../../../utils/Common";
import Loading from "../Loading/Loading";
import { documentsSelector, saveDocument } from "../../../redux/features/file/DocumentsSlice";
import { docDeclarationSelector, getUploadDocumentsList } from "../../../redux/features/file/DocDeclarationSlice";
import { clearSuccessMsg } from "../../../redux/features/Grievance/GrievanceSlice";
import { applicantSelector } from "../../../redux/features/applicant/ApplicantSlice";
import AlertBox from "../AlertBox/AlertBox";

const CustomTooltip = withStyles({
    tooltip: {
        backgroundColor: "#FFFFFF",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 11,
        boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
        borderRadius: "8px",
        border: "1px solid rgba(0, 56, 192, 1)",
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

const DocumentUploadBox = (props) => {
    const { documentCardList, setSelectedDialog, setDocumentDialogBoxOpen, type, inVerication, disabled, isPaymentDone, verificationDone,active } = props;
    const classes = DocumentUploadBoxStyle();
    const { t } = useTranslation("DocumentsPageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [stepCompleted, setIsStepCompleted] = useState(false)
    const [downloadLoading, setdownloadLoading] = useState(false)
    const [docData, setDocData] = useState([]);
    const [skipDialog, setSkipDialog] = useState(false)
    const [skipDialogDocID, setSkipDialogDocID] = useState();
    const [skipDocs, setSkipDocs] = useState([]);
    const [flag, setFlag] = useState(false);
    const {
        isEStampSelected,
        isFetching,
        isSuccess,
        isSuccessSent,
        isError,
    } = useSelector(documentsSelector);

    const {
        applicantData,
    } = useSelector(applicantSelector);
    const {
        isFetchingGetUploadList,
        isSuccessResUploadList,
        isErrorGetUploadList,
        errorMsgGetUploadList,
        getUploadListData,
    } = useSelector(docDeclarationSelector);

    const handleClickOpen = (name, key) => {
        let docId = name.DocumentId;
        setSelectedDialog({ docId: docId, type: type });
        setDocumentDialogBoxOpen(true);
    };
    useEffect(() => {
        setIsStepCompleted(active > 5)
    }, [active])
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

    useEffect(() => {
        if (documentCardList) {
            const updatedData = documentCardList.map((item) => {
                if (item.DocumentDetails && item.DocumentDetails.length > 0) {
                    const IsResubmitted = item.DocumentDetails[0].isResubmitted;
                    const IsApproved = item.DocumentDetails[0].VerifiedFlag == 1;
                    const IsRejected = item.DocumentDetails[0].VerifiedFlag == 2;
                    const DocVerificationMsg = item.DocumentDetails[0].VerifiedReason;
                    return { ...item, IsResubmitted, IsApproved, IsRejected, DocVerificationMsg };
                }
                return item;
            });
            setDocData(updatedData);
        }
    }, [documentCardList]);

    const onSkip = (skip, docId) => {
        const requestData = new FormData();
        requestData.append("DocumentId", docId);
        requestData.append("ApplicantId", localStorage.getItem("applicantId"));
        requestData.append("Lang", localStorage.getItem("i18nextLng"));
        requestData.append("isSkip", skip);
        dispatch(saveDocument(requestData));
        setFlag(true)
    };

    useEffect(() => {
        if (isSuccess && flag) {
            let sendData = {
                ApplicantId: applicantData.ApplicantId,
                Lang: localStorage.getItem("i18nextLng"),
            };
            dispatch(getUploadDocumentsList(sendData));
            setFlag(false);
            dispatch(clearSuccessMsg());
        }
    }, [flag, isSuccess]);

    useEffect(() => {
        if (isSuccessResUploadList && getUploadListData) {
            const filteredArray = getUploadListData?.DocumentDetails?.filter(item => {
                return item.DocumentDetails[0]?.IsSkipped == "1";
            });
            setSkipDocs(filteredArray);
        }
    }, [getUploadListData, isSuccessResUploadList])

    return (
        //         <Grid container spacing={2}>
        //     {docData.map((docElement, index) => (
        //         <Grid item xs={12} sm={6} key={index}>
        //             <Box className={`${classes.docsCard} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
        //                                     ${docElement.IsUploaded === 1 && docElement.IsApproved == true ? "verified" : ""}
        //                                     ${inVerication == true && docElement.IsApproved == false && docElement.IsRejected == false ? "disable" : ""}
        //                                     ${docElement.IsApproved == false && docElement.IsRejected == true ? "rejected" : ""}`}
        //                  style={{ width: "100%", justifyContent: "space-between" }}>
        //                 {/* Left Box */}
        //                 <Box>
        //                     {docElement.IsUploaded === 1 && !docElement.IsApproved && (
        //                         <Box className={classes.tikIconBox}>
        //                             <CheckCircleIcon fontSize="small" style={{ color: "#FFFFFF" }} />
        //                         </Box>
        //                     )}
        //                     {/* Text */}
        //                     <Typography className={`${classes.docNameTxt} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
        //                                         ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`} >
        //                         {docElement.DocumentName}
        //                         {docElement.IsOptional === 0 && (
        //                             <span style={{ color: "rgb(249, 61, 92)" }}> *</span>
        //                         )}
        //                         {docElement.DocInfo && (
        //                             <CustomTooltip enterTouchDelay={0} title={<DialogContent className={classes.castDropDown}>
        //                                 <span style={{ fontSize: 15, lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: docElement.DocInfo }} />
        //                             </DialogContent>} style={{ display: "inline-block", paddingLeft: "12px", lineHeight: "10px" }}>
        //                                 <Typography className={classes.toolTipTittle}>
        //                                     <InfoIcon className={`${classes.infoToolTipIcon} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
        //                                             ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`} />
        //                                 </Typography>
        //                             </CustomTooltip>
        //                         )}
        //                     </Typography>
        //                     {/* Button */}
        //                     <Button variant="contained" color="primary" disableRipple
        //                             className={`${classes.docsBtn} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}`}
        //                             size="small"
        //                             startIcon={docElement.IsUploaded === 0 && inVerication == false ||
        //                             docElement.IsResubmitted == 1 ? "" : <EditWhiteICon fontSize="small" />}
        //                             onClick={() => handleClickOpen(docElement, index)}
        //                             disabled={(inVerication && docElement.IsRejected == false) || docElement.IsResubmitted == 1 || disabled}>
        //                         {docElement.IsResubmitted != 1 && (
        //                             <span className={classes.docBtnTxt}>
        //                                     {!docElement.IsRejected ? (docElement.IsUploaded === 0 && inVerication == false) ? t("addBtn") : t("editBtn")
        //                                         : t("documentsForm.reuploadTxt")}
        //                                 </span>
        //                         )}
        //                         {docElement.IsResubmitted == 1 && (
        //                             <span className={classes.docBtnTxt} style={{ color: "black" }}>{t("reUploadSuccessTxt")}</span>
        //                         )}
        //                     </Button>
        //                 </Box>
        //                 {/* Right Box */}
        //                 <Box>
        //                     {/* Download Button */}
        //                     <Box className={classes.downloadBtnArea}>
        //                         {(docElement.IsUploaded === 0 && docElement.Sample) && (
        //                             <Button startIcon={<DownloadIcon />} color="primary" className={classes.downloadBtn}
        //                                     onClick={() => downloadSampleFile(docElement)}>
        //                                 {t("sampleTxt")}
        //                             </Button>
        //                         )}
        //                     </Box>
        //                     {/* Verification Status */}
        //                     {docElement.IsApproved && docElement.IsUploaded === 1 ? (
        //                         <Box className={classes.verifiedBox}>
        //                             <VerifiedDocIcon/>
        //                             <span>{t("docVerifiedTxt")}</span>
        //                         </Box>
        //                     ) : null}
        //                 </Box>
        //             </Box>
        //         </Grid>
        //     ))}
        // </Grid>
        <Grid container spacing={2}>
            {docData.map((docElement, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <Box className={`${classes.docsCard} ${docElement.IsUploaded === 1 && inVerication == false ? "verified" : ""}
                ${docElement.IsUploaded === 1 && docElement.IsApproved == true ? "verified" : ""}
                ${inVerication == true && docElement.IsApproved == false && docElement.IsRejected == false ? "disable" : ""}
                ${docElement.IsApproved == false && docElement.IsRejected == true ? "rejected" : ""}`}
                        style={{ width: "100%", justifyContent: "space-between", display: 'flex' }}>
                        {/* Left Box */}
                        <Box className={classes.EdIconBox}>
                                    {/* <CheckCircleIcon fontSize="small" style={{ color: "#FFFFFF" }} /> */}
                                <EditDocumentIcon />
                               
                                </Box>
                        <Box>
                     
                            {/* Text */}
                            <Typography className={`${classes.docNameTxt} ${docElement.IsUploaded === 1 && inVerication == false ? "verified" : ""}
                        ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : ""}`} >
                                {docElement.DocumentName}
                                {docElement.IsOptional === 0 && (
                                    <span style={{ color: "rgb(249, 61, 92)" }}> *</span>
                                )}

                            </Typography>
                            {docElement.IsUploaded === 1 && !docElement.IsApproved && (
                                <Box className={classes.tikIconBox}>
                                    {/* <CheckCircleIcon fontSize="small" style={{ color: "#FFFFFF" }} /> */}
                                <GreencheckIcon />
                               
                                </Box>
                            )}
                            {docElement.DocInfo && (
                                <CustomTooltip enterTouchDelay={0} title={<DialogContent className={classes.castDropDown}>
                                    <span style={{ fontSize: 15, lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: docElement.DocInfo }} />
                                </DialogContent>} style={{ display: "inline-block", paddingLeft: "12px", lineHeight: "10px", position: 'absolute', top: 5 }}>
                                    <Typography className={classes.toolTipTittle}>
                                        <InfoIcon className={`${classes.infoToolTipIcon} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}
                                        ${docElement.IsUploaded === 1 && docElement.IsApproved ? "verified" : "verified     "}`} />
                                    </Typography>
                                </CustomTooltip>
                            )}
                        </Box>
                        {/* Right Box */}
                        <Box style={{ display: "flex", alignItems: "center", position: 'absolute', right: 35 }}>
                            {/* Button */}
                            {!stepCompleted &&  <Button variant="contained" color="primary" disableRipple
                                className={`${classes.docsBtn} ${docElement.IsUploaded === 1 && inVerication == false ? "done" : ""}`}
                                size="small"
                                
                                startIcon={docElement.IsUploaded === 0 && inVerication == false || docElement.IsResubmitted == 1 ? "" : 
                                 <EditWhiteICon fontSize="small" />
                                // <EditDocumentIcon/>
                            }
                                onClick={() => handleClickOpen(docElement, index)}
                                disabled={(inVerication && docElement.IsRejected == false) || docElement.IsResubmitted == 1 || disabled}>
                                {docElement.IsResubmitted != 1 && (
                                    <span className={classes.docBtnTxt}>
                                        {!docElement.IsRejected ? (docElement.IsUploaded === 0 && inVerication == false) ? t("addBtn") : t("editBtn")
                                            : t("documentsForm.reuploadTxt")}
                                    </span>
                                )}
                                {docElement.IsResubmitted == 1 && (
                                    <span className={classes.docBtnTxt} style={{ color: "black" }}>{t("reUploadSuccessTxt")}</span>
                                )}
                            </Button>}
                            {/* Download Button */}
                            <Box className={classes.downloadBtnArea}>
                                {(docElement.IsUploaded === 0 && docElement.Sample) && (
                                    <Button startIcon={<DownloadIcon />} color="primary" className={classes.downloadBtn}
                                        onClick={() => downloadSampleFile(docElement)}>
                                        {t("sampleTxt")}
                                    </Button>
                                )}
                            </Box>
                            {/* Verification Status */}
                            {docElement.IsApproved && docElement.IsUploaded === 1 ? (
                                <Box className={classes.verifiedBox}>
                                    <VerifiedDocIcon />
                                    <span>{t("docVerifiedTxt")}</span>
                                </Box>
                            ) : null}
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>

    );
};

export default DocumentUploadBox;
