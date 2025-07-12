import React, { useState, useRef, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormTitleBox from "../../../../atoms/FormTitleBox/FormTitleBox";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import moment from "moment";
import {
  NextArrowIcon,
  ChipCrossIcon,
  DownloadIcon,
  DeclarationtitleIcon,
  HomeIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import { UploadDocumentStyles } from "../UploadDocument.Style";
import DialogTitleBox from "../../../../atoms/DialogTitleBox/DialogTitleBox";
import UploadedKyc from "../../../../../assets/UploadedKyc.svg";
import Upload from "../../../../../assets/Upload.svg";
import * as yup from "yup";
import { ImageSizes, SupportedFormats, ApiEndPoint } from "../../../../../utils/Common";
import Paper from "@material-ui/core/Paper";
import withWidth from "@material-ui/core/withWidth";
/* import {
  DefenceTypeList,
  ReligionInAffidavitFList,
  ReligionInLeavingCertiList,
} from "../../../../../utils/MasterData"; */
import DocumentMobileIcon from "../../../../../assets/DocumentMobileIcon.svg";
import { RadioGroup } from "formik-material-ui";
import { FormControlLabel, Radio } from "@material-ui/core";
import Loading from "../../../../atoms/Loading/Loading";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import { useSelector, useDispatch } from "react-redux";
import {
  saveDocument,
  eStampSelectOrDeselect,
  documentsSelector,
  clearSuccessMsg,
} from "../../../../../redux/features/file/DocumentsSlice";
import {
  fileDataUpload,
  fileUploadSelector,
  setImageUrl,
  clearImageUrl,
  clearFileState,
  setDocumentImageUrl,
  clearDocumentImageUrl,
  setOtherFile,
  clearOtherFile
} from "../../../../../redux/features/file/FileUploadSlice";
import RejectedDocview from "../RejectedDocView/RejectedDocView";
import { Alert } from "@material-ui/lab";

const PAPDialogBox = (props) => {
  const { handleClose, afterSubmitCloseHandler, width, docData, allDocData } = props;
  const classes = UploadDocumentStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const formikRef = useRef();
  const [isSelfOrHeir, setSelfOrHeir] = React.useState("yes");
  const [isOtherDoc, setOtherDoc] = React.useState("no");
  const [formValue, setFormValue] = React.useState({});
  const [formEditIs, setFormEditIs] = React.useState(false);
  const [docFileData, setDocFileData] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [isUploaded1, setUploaded1] = useState(false);
  const [isUploaded2, setUploaded2] = useState(false);
  const [isUploaded3, setUploaded3] = useState(false);
  const [isImage1, setIsImage1] = useState(false);
  const [isImage2, setIsImage2] = useState(false);
  const [isImage3, setIsImage3] = useState(false);
  const [dragBoxClass1, setDragBoxClass1] = useState("");
  const [dragBoxClass2, setDragBoxClass2] = useState("");
  const [dragBoxClass3, setDragBoxClass3] = useState("");
  const [fileUploadLoaderState, setFileUploadLoaderState] = useState("");
  const [isBarCode, setIsBarCode] = React.useState("");
  const [isRejected, setIsRejected] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState("");
  const [rejectedDocFile, setRejectedDocFile] = useState(null);


  useEffect(() => {
    if (allDocData.IsRejected) {
      if (docData.subList[0]?.DocumentValue) {
        setRejectedDocFile(docData.subList[0]?.DocumentValue);
      }
      setIsRejected(allDocData.IsRejected);
      setRejectionReason(allDocData.DocVerificationMsg)
      setTimeout(onReUpload1, 100)
      setTimeout(onReUpload2, 100)
      setTimeout(onReUpload3, 100)
    }
  }, [allDocData])

  const dispatch = useDispatch();
  const {
    isFileFetching,
    isFileSuccess,
    documentImageUrl,
    otherFileUrl,
    imageUrl,
    isFileError,
    fileErrorMessage,
  } = useSelector(fileUploadSelector);
  const {
    isEStampSelected,
    isFetching,
    isSuccess,
    isSuccessSent,
    isError,
    errorMessage,
    documentId,
  } = useSelector(documentsSelector);

  useEffect(() => {
    if (docData?.DocumentName) {
      var detailObj = {};
      var keys = [];
      var values = [];
      docData.subList.forEach((element) => {
        keys.push(element.DocFieldName);
        values.push(element.DocumentValue);
      });
      for (var i = 0; i < keys.length; i++) {
        detailObj[keys[i]] = values[i];
      }
      let papNo = "";
      if (detailObj.DocumentNumber) {
        papNo = detailObj.DocumentNumber;
      }
      let papName = "";
      if (detailObj.DisplayName) {
        papName = detailObj.DisplayName;
      }

      let papDate = null;
      if (detailObj.DocumentDate) {
        if (
          detailObj.DocumentDate !== null ||
          detailObj.DocumentDate !== "00/00/0000"
        ) {
          let apiDate = detailObj.DocumentDate;
          let convertDate = apiDate.split("/");
          const finalDate = new Date(
            parseInt(convertDate[2]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[0])
          );
          papDate = finalDate;
        }
      }
      let otherNo = "";
      if (detailObj.OtherDocNumber) {
        otherNo = detailObj.OtherDocNumber;
      }
      let otherName = "";
      if (detailObj.OtherDocDisplayName) {
        otherName = detailObj.OtherDocDisplayName;
      }
      let otherDate = null;
      if (detailObj.OtherDocDate) {
        if (
          detailObj.OtherDocDate !== null ||
          detailObj.OtherDocDate !== "00/00/0000"
        ) {
          let apiDate = detailObj.OtherDocDate;
          let convertDate = apiDate.split("/");
          const finalDate = new Date(
            parseInt(convertDate[2]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[0])
          );
          otherDate = finalDate;
        }
      }
      let vanshvalNO = "";
      if (detailObj.VanshavalDocNumber) {
        vanshvalNO = detailObj.VanshavalDocNumber;
      }
      let vanshvalName = "";
      if (detailObj.LegalHeirRelationship) {
        vanshvalName = detailObj.LegalHeirRelationship;
      }
      let vanshvalDate = null;
      if (detailObj.VanshavalDocDate) {
        if (
          detailObj.VanshavalDocDate !== null ||
          detailObj.VanshavalDocDate !== "00/00/0000"
        ) {
          let apiDate = detailObj.VanshavalDocDate;
          let convertDate = apiDate.split("/");
          const finalDate = new Date(
            parseInt(convertDate[2]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[0])
          );
          vanshvalDate = finalDate;
        }
      }
      let type = "";
      if (detailObj.ApplicantType) {
        setSelfOrHeir(detailObj.ApplicantType);
        type = detailObj.ApplicantType;
      }
      let hasPapDoc = "";
      if (detailObj.HasOtherPAP) {
        setOtherDoc(detailObj.HasOtherPAP);
        hasPapDoc = detailObj.HasOtherPAP;
      }

      let papUrl = "";
      if (detailObj.DocumentFileUrl) {
        papUrl = detailObj.DocumentFileUrl;
        const [path] = papUrl.split("?");
        const parts = path.split(".");
        const extension = parts[parts.length - 1];
        if (extension == "jpg" || extension == "jpeg" || extension == "png") {
          setIsImage1(true);
        } else {
          setIsImage1(false);
        }
        setUploaded1(true);
        dispatch(setDocumentImageUrl(papUrl));
      }

      let otherDocUrl = "";
      if (detailObj.OtherDocumentFileUrl) {
        otherDocUrl = detailObj.OtherDocumentFileUrl;
        const [path] = otherDocUrl.split("?");
        const parts = path.split(".");
        const extension = parts[parts.length - 1];
        if (extension == "jpg" || extension == "jpeg" || extension == "png") {
          setIsImage2(true);
        } else {
          setIsImage2(false);
        }
        setUploaded2(true);
        dispatch(setOtherFile(otherDocUrl));
      }

      let vanshavalUrl = "";
      if (detailObj.VanshavalDocumentFileUrl) {
        vanshavalUrl = detailObj.VanshavalDocumentFileUrl;
        const [path] = vanshavalUrl.split("?");
        const parts = path.split(".");
        const extension = parts[parts.length - 1];
        if (extension == "jpg" || extension == "jpeg" || extension == "png") {
          setIsImage3(true);
        } else {
          setIsImage3(false);
        }
        setUploaded3(true);
        dispatch(setImageUrl(vanshavalUrl));
      }

      if (detailObj.IsBarCode == "yes") {
        setIsBarCode("yes")
      }
      let barCode = "";
      if (detailObj.BarCodeNum) {
        barCode = detailObj.BarCodeNum;
      }
      let code = "";
      if (detailObj.IsBarCode) {
        code = detailObj.IsBarCode;
      }

      const savedValue = {
        barCodeNumber: barCode || "",
        isBarCode: code || "",
        papCertificateNumber: papNo || "",
        papNameOnCertificate: papName || "",
        papDocumentDate: papDate || "",
        otherCertificateNumber: otherNo || "",
        otherNameOnCertificate: otherName || "",
        otherDocumentDate: otherDate || "",
        vanshavalCertificateNumber: vanshvalNO || "",
        vanshavalNameOnCertificate: vanshvalName || "",
        vanshavalDocumentDate: vanshvalDate || "",
        applicantType: type || "yes",
        otherPapDocument: hasPapDoc || "yes",
        papFile: null,
        vanshavalFile: null,
        otherFile: null,
      };
      setFormValue(savedValue);
      setFormEditIs(true);
    }
  }, [docData]);

  const dragOver1 = (e) => {
    e.preventDefault();
    setDragBoxClass1("dragover");
  };

  const dragEnter1 = (e) => {
    e.preventDefault();
    setDragBoxClass1("dragover");
  };

  const dragLeave1 = (e) => {
    e.preventDefault();
    setDragBoxClass1("");
  };

  const fileDrop1 = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    formikRef.current.setFieldValue("papFile", files);
    setDocFileData(files);
    setDragBoxClass1("");
  };

  const onReUpload1 = () => {
    formikRef.current.setFieldValue("papFile", null);
    setDocFileData({});
    setUploaded1(false);
    dispatch(clearDocumentImageUrl());
  };

  const dragOver2 = (e) => {
    e.preventDefault();
    setDragBoxClass2("dragover");
  };

  const dragEnter2 = (e) => {
    e.preventDefault();
    setDragBoxClass2("dragover");
  };

  const dragLeave2 = (e) => {
    e.preventDefault();
    setDragBoxClass2("");
  };

  const fileDrop2 = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    formikRef.current.setFieldValue("otherFile", files);
    setData2(files);
    setDragBoxClass2("");
  };

  const onReUpload2 = () => {
    formikRef.current.setFieldValue("otherFile", null);
    setData2({});
    setUploaded2(false);
    dispatch(clearOtherFile());
  };

  const dragOver3 = (e) => {
    e.preventDefault();
    setDragBoxClass3("dragover");
  };

  const dragEnter3 = (e) => {
    e.preventDefault();
    setDragBoxClass3("dragover");
  };

  const dragLeave3 = (e) => {
    e.preventDefault();
    setDragBoxClass3("");
  };

  const fileDrop3 = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    formikRef.current.setFieldValue("vanshavalFile", files);
    setData3(files);
    setDragBoxClass3("");
  };

  const onReUpload3 = () => {
    formikRef.current.setFieldValue("vanshavalFile", null);
    setData3({});
    setUploaded3(false);
    dispatch(clearImageUrl());
  };

  useEffect(() => {
    if (docFileData.name && allDocData.DocumentenName) {
      if (SupportedFormats.DocsFormats.includes(docFileData['type'])) {
        // setUploaded1(true);
        if (docFileData['type'].split('/')[0] == 'image') {
          setIsImage1(true);
        } else {
          setIsImage1(false);
        }
        const docObj = {
          doc: docFileData,
          docType: "DocumentUrl",
          docName: allDocData.DocumentenName
        };
        setFileUploadLoaderState("doc1");
        dispatch(fileDataUpload(docObj));
      }
    }
  }, [docFileData]);

  useEffect(() => {
    if (data2.name) {
      if (SupportedFormats.DocsFormats.includes(data2['type'])) {
        // setUploaded2(true);
        if (data2['type'].split('/')[0] == 'image') {
          setIsImage2(true);
        } else {
          setIsImage2(false);
        }
        const docObj = {
          doc: data2,
          docType: "OtherDocument",
          docName: 'other document'
        };
        setFileUploadLoaderState("doc2");
        dispatch(fileDataUpload(docObj));
      }
    }
  }, [data2]);

  useEffect(() => {
    if (data3.name) {
      if (data3['type'].split('/')[0] == 'image' || data3['type'].split('/')[1] == 'pdf') {
        // setUploaded3(true);
        if (data3['type'].split('/')[0] == 'image') {
          setIsImage3(true);
        } else {
          setIsImage3(false);
        }
        const docObj = {
          doc: data3,
          docType: "VanshavalDocumentFileUrl",
          docName: 'Vanshaval Document'
        };
        setFileUploadLoaderState("doc3");
        dispatch(fileDataUpload(docObj));
      }
    }
  }, [data3]);

  useEffect(() => {
    if (isFileSuccess) {
      if (fileUploadLoaderState == "doc1") {
        setUploaded1(true);
      }
      if (fileUploadLoaderState == "doc2") {
        setUploaded2(true);
      }
      if (fileUploadLoaderState == "doc3") {
        setUploaded3(true);
      }
      setFileUploadLoaderState("");
      dispatch(clearFileState());
    }
  }, [dispatch, isFileSuccess]);

  const initialValues = {
    barCodeNumber: "",
    isBarCode: "",
    papCertificateNumber: "",
    papNameOnCertificate: "",
    papDocumentDate: null,
    otherCertificateNumber: "",
    otherNameOnCertificate: "",
    otherDocumentDate: null,
    vanshavalCertificateNumber: "",
    vanshavalNameOnCertificate: "",
    vanshavalDocumentDate: null,
    applicantType: "yes",
    otherPapDocument: "yes",
    papFile: null,
    vanshavalFile: null,
    otherFile: null,
  };

  //  .number()
  // .required(
  //   t("incomeGroupForm.incomeForm.formControl.familyincomeErrors.required")
  // )
  // .min(minFamilyIncome, averageIncomeError)
  // .max(maxFamilyIncome, averageIncomeError),

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d{0,20}$/.test(inputValue)) {
      formikRef.current.setFieldValue('barCodeNumber', inputValue);
    }
  };

  const validationSchema = yup.object({
    isBarCode: yup.string()
      .required(t("barCodeHelperTxt")),
    barCodeNumber: isBarCode == "yes" && yup
      .string()
      .required(t("documentsForm.domicileForm.formControl.barcodeRequired"))
      .min(20, t("documentsForm.domicileForm.formControl.barcodeLimit"))
      .max(20, t("documentsForm.domicileForm.formControl.barcodeLimit")),
    // papCertificateNumber: isBarCode == "no" && yup
    //   .string()
    // .required(
    //   t("documentsForm.pjLetterForm.formControl.judgementErrors.required")
    // )
    // .matches(
    //   /^[a-zA-Z0-9]*$/,
    //   t("documentsForm.pjLetterForm.formControl.judgementErrors.limitation")
    // ),
    // papNameOnCertificate: isBarCode == "no" && yup
    //   .string()
    // .required(t("documentsForm.pjLetterForm.formControl.nameErrors.required"))
    // .matches(
    //   /^[a-zA-Z ]*$/,
    //   t("documentsForm.pjLetterForm.formControl.nameErrors.limitation")
    // ),
    // papDocumentDate: isBarCode == "no" && yup
    //   .date()
    //   .nullable()
    //   .default(null),
    // .required(
    //   t(
    //     "documentsForm.pjLetterForm.formControl.documentDate.documentDateErrors.required"
    //   )
    // ),
    // vanshavalCertificateNumber: (isBarCode == "no" && isSelfOrHeir === "no") && yup
    //   .string()
    // .required(
    //   t("documentsForm.pjLetterForm.formControl.vanshavalDocsErrors.required")
    // )
    // .matches(
    //   /^[a-zA-Z0-9]*$/,
    //   t(
    //     "documentsForm.pjLetterForm.formControl.vanshavalDocsErrors.limitation"
    //   )
    // ),
    // vanshavalNameOnCertificate: (isBarCode == "no" && isSelfOrHeir === "no") && yup
    //   .string()
    // .required(
    //   t(
    //     "documentsForm.pjLetterForm.formControl.vanshavalDocsRelationshipErrors.required"
    //   )
    // )
    // .matches(
    //   /^[a-zA-Z ]*$/,
    //   t(
    //     "documentsForm.pjLetterForm.formControl.vanshavalDocsRelationshipErrors.limitation"
    //   )
    // ),
    // vanshavalDocumentDate: (isBarCode == "no" && isSelfOrHeir === "no") && yup
    //   .date()
    //   .nullable()
    //   .default(null),
    // .required(
    //   t(
    //     "documentsForm.pjLetterForm.formControl.vanshavalDocstDate.documentDateErrors.required"
    //   )
    // ),
    // otherCertificateNumber: (isBarCode == "no" && isOtherDoc === "yes") && yup
    //   .string()
    // .required(
    //   t("documentsForm.pjLetterForm.formControl.docuNoErrors.required")
    // )
    // .matches(
    //   /^[a-zA-Z0-9]*$/,
    //   t("documentsForm.pjLetterForm.formControl.docuNoErrors.limitation")
    // ),
    // otherNameOnCertificate: (isBarCode == "no" && isOtherDoc === "yes") && yup
    //   .string()
    // .required(
    //   t("documentsForm.pjLetterForm.formControl.docuNameErrors.required")
    // )
    // .matches(
    //   /^[a-zA-Z ]*$/,
    //   t("documentsForm.pjLetterForm.formControl.docuNameErrors.limitation")
    // ),
    // otherDocumentDate: (isBarCode == "no" && isOtherDoc === "yes") && yup
    //   .date()
    //   .nullable()
    //   .default(null),
    // .required(
    //   t(
    //     "documentsForm.pjLetterForm.formControl.otherDocumentDate.documentDateErrors.required"
    //   )
    // ),
    papFile: !documentImageUrl && yup
      .mixed()
      .required(
        t("documentsForm.pjLetterForm.formControl.uploadErrors0.required")
      )
      .test(
        "fileSize",
        t(
          "documentsForm.pjLetterForm.formControl.uploadErrors0.limitation"
        ),
        (value) => value && value.size <= ImageSizes.TwoMB
      )
      .test(
        "fileFormat",
        t(
          "documentsForm.pjLetterForm.formControl.uploadErrors0.fileFormat"
        ),
        (value) => value && SupportedFormats.DocsFormats.includes(value.type)
      ),
    // vanshavalFile: !imageUrl && isSelfOrHeir === "no" && yup
    //   .mixed()
    //   .required("File is required")
    //   .test(
    //     "fileSize",
    //     t(
    //       "documentsForm.pjLetterForm.formControl.uploadErrors1.limitation"
    //     ),
    //     (value) => value && value.size <= ImageSizes.TwoMB
    //   )
    //   .test(
    //     "fileFormat",
    //     t(
    //       "documentsForm.pjLetterForm.formControl.uploadErrors1.fileFormat"
    //     ),
    //     (value) => value && SupportedFormats.DocsFormats.includes(value.type)
    //   ),
    // otherFile: !otherFileUrl && isOtherDoc === "yes" && yup
    //   .mixed()
    //   .required(
    //     t("documentsForm.pjLetterForm.formControl.uploadErrors1.required")
    //   )
    //   .test(
    //     "fileSize",
    //     t(
    //       "documentsForm.pjLetterForm.formControl.uploadErrors1.limitation"
    //     ),
    //     (value) => value && value.size <= ImageSizes.TwoMB
    //   )
    //   .test(
    //     "fileFormat",
    //     t(
    //       "documentsForm.pjLetterForm.formControl.uploadErrors1.fileFormat"
    //     ),
    //     (value) => value && SupportedFormats.DocsFormats.includes(value.type)
    //   ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = new FormData();
    requestData.append("DocumentId", "12");
    requestData.append("ApplicantId", localStorage.getItem("applicantId"));
    requestData.append("Lang", localStorage.getItem("i18nextLng"));
    requestData.append("isReupload", isRejected ? "1" : "0");
    // requestData.append("PAPDocumentFileUrl", papFileUrl);
    // requestData.append("VanshavalDocumentFileUrl", vanshavalFileUrl);
    // requestData.append("OtherDocumentFileUrl", otherFileUrl);
    // requestData.append("DocumentNumber", values.papCertificateNumber);
    // requestData.append("DisplayName", values.papNameOnCertificate);
    // requestData.append(
    //   "DocumentDate",
    //   moment(values.papDocumentDate).format("YYYY-MM-DD")
    // );
    // requestData.append("ApplicantType", values.applicantType);
    // requestData.append("HasOtherPAP", values.otherPapDocument);
    // requestData.append(
    //   "LegalHeirRelationship",
    //   values.vanshavalNameOnCertificate
    // );
    // requestData.append("VanshavalDocNumber", values.vanshavalCertificateNumber);
    // requestData.append("OtherDocDisplayName", values.otherNameOnCertificate);
    // requestData.append("OtherDocNumber", values.otherCertificateNumber);
    // requestData.append(
    //   "VanshavalDocDate",
    //   moment(values.vanshavalDocumentDate).format("YYYY-MM-DD")
    // );
    // requestData.append(
    //   "OtherDocDate",
    //   moment(values.otherDocumentDate).format("YYYY-MM-DD")
    // );
    requestData.append("IsBarCode", values.isBarCode);
    if (values.isBarCode == "yes") {
      requestData.append("BarCodeNum", values.barCodeNumber);
    }
    if (documentImageUrl) {
      requestData.append("PAPDocumentFileUrl", documentImageUrl);
    } else {
      requestData.append("PAPDocumentFileUrl", "");
    }
    if (imageUrl) {
      requestData.append("VanshavalDocumentFileUrl", imageUrl);
    } else {
      requestData.append("VanshavalDocumentFileUrl", "");
    }
    if (otherFileUrl) {
      requestData.append("OtherDocumentFileUrl", otherFileUrl);
    } else {
      requestData.append("OtherDocumentFileUrl", "");
    }
    dispatch(saveDocument(requestData));
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMsg());
        afterSubmitCloseHandler("12");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFileError) {
      if (fileUploadLoaderState == "doc1") {
        formikRef.current.setFieldValue("papFile", null);
      }
      if (fileUploadLoaderState == "doc2") {
        formikRef.current.setFieldValue("otherFile", null);
      }
      if (fileUploadLoaderState == "doc3") {
        formikRef.current.setFieldValue("vanshavalFile", null);
      }
    }
  }, [isFileError])

  return (
    <>
      <DialogTitleBox
        title={isRejected ? `${t("documentsForm.reuploadTxt")} ${docData.DocumentName}` : docData.DocumentName}
        titleIcon={<DeclarationtitleIcon fontSize="large" />}
        handleClose={handleClose}
      />
      <DialogContent>
        <Formik
          initialValues={formEditIs ? formValue : initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form noValidate autoComplete="off">
              {(isFetching) && (
                <Loading isOpen={isFetching} />
              )}
              <Grid container>
                <Grid item md={6} xs={12} className={classes.innerCont}>
                  <Box className={classes.fileUploadSection}>
                    <Typography className={classes.fileUploadTitle}>{docData?.DocumentName}</Typography>
                    {isFileFetching && fileUploadLoaderState === "doc1" && <Box className={classes.uploadDocLoader}><UploadLoading /></Box>}
                    {((!isUploaded1 && !isFileFetching) || (!isUploaded1 && (fileUploadLoaderState === "doc2" || fileUploadLoaderState === "doc3"))) && (
                      <Box
                        className={`${classes.kycDragnDropBox} ${dragBoxClass1}`}
                        onDragOver={dragOver1}
                        onDragEnter={dragEnter1}
                        onDragLeave={dragLeave1}
                        onDrop={fileDrop1}
                      >
                        {/* <Box>
                          <Hidden smDown>
                            <img className={classes.iconStyle} src={Upload} alt="Doc Icon" />
                          </Hidden>
                          <Hidden smUp>
                            <img className={classes.iconStyle} src={DocumentMobileIcon} alt="Doc Icon" />
                          </Hidden>
                        </Box> */}
                        <Typography className={classes.dragAndDropTxt}>
                          <Hidden smDown>
                            {t("dragDropLabel")}
                          </Hidden>
                          <input
                            accept="image/jpeg,image/png,application/pdf,image/x-eps"
                            className={classes.input}
                            id="papFile"
                            type="file"
                            name="papFile"
                            onChange={(event) => {
                              if (event.currentTarget.files[0]) {
                                setFieldValue(
                                  "papFile",
                                  event.currentTarget.files[0]
                                );
                                setDocFileData(event.currentTarget.files[0]);
                              }
                            }}
                          />
                          <label htmlFor="papFile">
                            <Button
                              color="primary"
                              variant="contained"
                              component="span"
                              size="small"
                              className={classes.kycUploadBtn}
                            >{isRejected ? t("documentsForm.reuploadTxt") : t("browse")}</Button>
                          </label>
                        </Typography>
                        {isFileError == false && <FormHelperText error variant="filled">
                          <ErrorMessage name="papFile" />
                        </FormHelperText>}
                        {isFileError && (
                          <>
                            <FormHelperText error variant="filled">
                              {fileErrorMessage}
                            </FormHelperText>
                          </>
                        )}
                        <Typography className={classes.validateText}>
                          {t("fileLimit0")}
                          <strong> {t("fileLimit1")} </strong>
                          <br />
                          {t("fileLimit2")}
                        </Typography>
                      </Box>
                    )}
                    {((isUploaded1 && !isFileFetching) || (isUploaded1 && (fileUploadLoaderState === "doc2" || fileUploadLoaderState === "doc3"))) && (
                      <Box>
                        {isImage1 ? <Box className={classes.filePreviewCard}>
                          <img
                            className={classes.panPreviewImg}
                            src={documentImageUrl}
                            alt="uploaded successfully"
                          />
                        </Box> : <Box className={classes.filePreviewCard}>
                          <img
                            className={classes.panPreviewImg}
                            src={UploadedKyc}
                            alt="uploaded successfully"
                          />
                          <Typography className={classes.fileUploadedSuccessText}>{t("documentsForm.docUploadedSuccessMsg")}</Typography>
                        </Box>}
                        <Box>
                          <Typography
                            className={classes.kycCaption}
                            variant="subtitle1"
                          >
                            {t("documentsForm.fileUploadedTitle")}
                          </Typography>
                          <Box className={classes.fileViewArea}>
                            <Grid container alignItems="center">
                              <Grid item>
                                <InsertDriveFileIcon
                                  color="primary"
                                />
                              </Grid>
                              <Grid item xs>
                                <Typography variant="body2">
                                  {documentImageUrl.length > 20 ? `...${documentImageUrl.slice(-20)}` : documentImageUrl}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="text"
                                  size="small"
                                  color="primary"
                                  onClick={onReUpload1}
                                >
                                  {t("documentsForm.cancelButtonText")}
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {/* <Box>
                      <Typography variant="body2" className={classes.sampleDownTitle}>
                        {t("documentsForm.pjLetterForm.formControl.downloadCertiText0")}
                      </Typography>
                      <Paper elevation={4} className={classes.downloadSampleFileBox}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <InsertDriveFileIcon color="primary" />
                          </Grid>
                          <Grid item xs>
                            <Typography variant="body2">Template1.png</Typography>
                          </Grid>
                          <Grid item>
                            <Button color="primary" size="small" startIcon={<DownloadIcon />} onClick={() =>
                              window.open(ApiEndPoint + "/DocumentDownload/12")
                            }>{t("documentsForm.downloadButtonText")}</Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box> */}
                  </Box>

                  {/* ----------------------- */}
                  {isOtherDoc === "yes" && (
                    <Box className={classes.fileUploadSection}>
                      <Typography className={classes.fileUploadTitle}>{t("documentsForm.pjLetterForm.formControl.fileUploadTitleTxt1")}</Typography>
                      {isFileFetching && fileUploadLoaderState === "doc2" && <Box className={classes.uploadDocLoader}><UploadLoading /></Box>}
                      {((!isUploaded2 && !isFileFetching) || (!isUploaded2 && (fileUploadLoaderState === "doc1" || fileUploadLoaderState === "doc3"))) && (
                        <Box
                          className={`${classes.kycDragnDropBox} ${dragBoxClass2}`}
                          onDragOver={dragOver2}
                          onDragEnter={dragEnter2}
                          onDragLeave={dragLeave2}
                          onDrop={fileDrop2}
                        >
                          {/* <Box>
                            <Hidden smDown>
                              <img className={classes.iconStyle} src={Upload} alt="Doc Icon" />
                            </Hidden>
                            <Hidden smUp>
                              <img className={classes.iconStyle} src={DocumentMobileIcon} alt="Doc Icon" />
                            </Hidden>
                          </Box> */}
                          <Typography className={classes.dragAndDropTxt}>
                            <Hidden smDown>
                              {t("dragDropLabel")}
                            </Hidden>
                            <input
                              accept="image/jpeg,image/png,application/pdf,image/x-eps"
                              className={classes.input}
                              id="otherFile"
                              type="file"
                              name="otherFile"
                              onChange={(event) => {
                                if (event.currentTarget.files[0]) {
                                  setFieldValue(
                                    "otherFile",
                                    event.currentTarget.files[0]
                                  );
                                  setData2(event.currentTarget.files[0]);
                                }
                              }}
                            />
                            <label htmlFor="otherFile">
                              <Button
                                color="primary"
                                variant="contained"
                                component="span"
                                size="small"
                                className={classes.kycUploadBtn}
                              >{isRejected ? t("documentsForm.reuploadTxt") : t("browse")}</Button>
                            </label>
                          </Typography>
                          {isFileError == false && <FormHelperText error variant="filled">
                            <ErrorMessage name="otherFile" />
                          </FormHelperText>}
                          {isFileError && (
                            <>
                              <FormHelperText error variant="filled">
                                {fileErrorMessage}
                              </FormHelperText>
                            </>
                          )}
                          <Typography className={classes.validateText}>
                            {t("fileLimit0")}
                            <strong> {t("fileLimit1")} </strong>
                            <br />
                            {t("fileLimit2")}
                          </Typography>
                        </Box>
                      )}
                      {((isUploaded2 && !isFileFetching) || (isUploaded2 && (fileUploadLoaderState === "doc1" || fileUploadLoaderState === "doc3"))) && (
                        <Box>
                          {isImage2 ? <Box className={classes.filePreviewCard}>
                            <img
                              className={classes.panPreviewImg}
                              src={otherFileUrl}
                              alt="uploaded successfully"
                            />
                          </Box> : <Box className={classes.filePreviewCard}>
                            <img
                              className={classes.panPreviewImg}
                              src={UploadedKyc}
                              alt="uploaded successfully"
                            />
                            <Typography className={classes.fileUploadedSuccessText}>{t("documentsForm.docUploadedSuccessMsg")}</Typography>
                          </Box>}
                          <Box>
                            <Typography
                              className={classes.kycCaption}
                              variant="subtitle1"
                            >
                              {t("documentsForm.fileUploadedTitle")}
                            </Typography>
                            <Box className={classes.fileViewArea}>
                              <Grid container alignItems="center">
                                <Grid item>
                                  <InsertDriveFileIcon
                                    color="primary"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Typography variant="body2">
                                    {otherFileUrl.length > 20 ? `...${otherFileUrl.slice(-20)}` : otherFileUrl}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Button
                                    variant="text"
                                    size="small"
                                    color="primary"
                                    onClick={onReUpload2}
                                  >
                                    {t("documentsForm.cancelButtonText")}
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      {/* <Box>
                        <Typography variant="body2" className={classes.sampleDownTitle}>
                          {t("documentsForm.pjLetterForm.formControl.downloadCertiText1")}
                        </Typography>
                        <Paper elevation={4} className={classes.downloadSampleFileBox}>
                          <Grid container alignItems="center">
                            <Grid item>
                              <InsertDriveFileIcon color="primary" />
                            </Grid>
                            <Grid item xs>
                              <Typography variant="body2">Template1.png</Typography>
                            </Grid>
                            <Grid item>
                              <Button color="primary" size="small" startIcon={<DownloadIcon />} onClick={() =>
                                window.open(ApiEndPoint + "/DocumentDownload/12")
                              }>{t("documentsForm.downloadButtonText")}</Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box> */}
                    </Box>
                  )}

                  {/* ----------------------- */}
                  {isSelfOrHeir === "no" && (
                    <Box className={classes.fileUploadSection}>
                      <Typography className={classes.fileUploadTitle}>{t("documentsForm.pjLetterForm.formControl.fileUploadTitleTxt2")}</Typography>
                      {isFileFetching && fileUploadLoaderState === "doc3" && <Box className={classes.uploadDocLoader}><UploadLoading /></Box>}
                      {((!isUploaded3 && !isFileFetching) || (!isUploaded3 && (fileUploadLoaderState === "doc1" || fileUploadLoaderState === "doc2"))) && (
                        <Box
                          className={`${classes.kycDragnDropBox} ${dragBoxClass3}`}
                          onDragOver={dragOver3}
                          onDragEnter={dragEnter3}
                          onDragLeave={dragLeave3}
                          onDrop={fileDrop3}
                        >
                          {/* <Box>
                            <Hidden smDown>
                              <img className={classes.iconStyle} src={Upload} alt="Doc Icon" />
                            </Hidden>
                            <Hidden smUp>
                              <img className={classes.iconStyle} src={DocumentMobileIcon} alt="Doc Icon" />
                            </Hidden>
                          </Box> */}
                          <Typography className={classes.dragAndDropTxt}>
                            <Hidden smDown>
                              {t("dragDropLabel")}
                            </Hidden>
                            <input
                              accept="image/jpeg,image/png,application/pdf,image/x-eps"
                              className={classes.input}
                              id="vanshavalFile"
                              type="file"
                              name="vanshavalFile"
                              onChange={(event) => {
                                if (event.currentTarget.files[0]) {
                                  setFieldValue(
                                    "vanshavalFile",
                                    event.currentTarget.files[0]
                                  );
                                  setData3(event.currentTarget.files[0]);
                                }
                              }}
                            />
                            <label htmlFor="vanshavalFile">
                              <Button
                                color="primary"
                                variant="contained"
                                component="span"
                                size="small"
                                className={classes.kycUploadBtn}
                              >{isRejected ? t("documentsForm.reuploadTxt") : t("browse")}</Button>
                            </label>
                          </Typography>
                          {isFileError == false && <FormHelperText error variant="filled">
                            <ErrorMessage name="vanshavalFile" />
                          </FormHelperText>}
                          {isFileError && (
                            <>
                              <FormHelperText error variant="filled">
                                {fileErrorMessage}
                              </FormHelperText>
                            </>
                          )}
                          <Typography className={classes.validateText}>
                            {t("fileLimit0")}
                            <strong> {t("fileLimit1")} </strong>
                            <br />
                            {t("fileLimit2")}
                          </Typography>
                        </Box>
                      )}
                      {((isUploaded3 && !isFileFetching) || (isUploaded3 && (fileUploadLoaderState === "doc1" || fileUploadLoaderState === "doc2"))) && (
                        <Box>
                          {isImage3 ? <Box className={classes.filePreviewCard}>
                            <img
                              className={classes.panPreviewImg}
                              src={imageUrl}
                              alt="uploaded successfully"
                            />
                          </Box> : <Box className={classes.filePreviewCard}>
                            <img
                              className={classes.panPreviewImg}
                              src={UploadedKyc}
                              alt="uploaded successfully"
                            />
                            <Typography className={classes.fileUploadedSuccessText}>{t("documentsForm.docUploadedSuccessMsg")}</Typography>
                          </Box>}
                          <Box>
                            <Typography
                              className={classes.kycCaption}
                              variant="subtitle1"
                            >
                              {t("documentsForm.fileUploadedTitle")}
                            </Typography>
                            <Box className={classes.fileViewArea}>
                              <Grid container alignItems="center">
                                <Grid item>
                                  <InsertDriveFileIcon
                                    color="primary"
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Typography variant="body2">
                                    {imageUrl.length > 20 ? `...${imageUrl.slice(-20)}` : imageUrl}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Button
                                    variant="text"
                                    size="small"
                                    color="primary"
                                    onClick={onReUpload3}
                                  >
                                    {t("documentsForm.cancelButtonText")}
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      {/* <Box>
                        <Typography variant="body2" className={classes.sampleDownTitle}>
                          {t("documentsForm.pjLetterForm.formControl.downloadCertiText2")}
                        </Typography>
                        <Paper elevation={4} className={classes.downloadSampleFileBox}>
                          <Grid container alignItems="center">
                            <Grid item>
                              <InsertDriveFileIcon color="primary" />
                            </Grid>
                            <Grid item xs>
                              <Typography variant="body2">Template1.png</Typography>
                            </Grid>
                            <Grid item>
                              <Button color="primary" size="small" startIcon={<DownloadIcon />}>{t("documentsForm.downloadButtonText")}</Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box> */}
                    </Box>
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={classes.inputsSection}>
                    <Box marginBottom={2}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          md
                          className={classes.radioSection}
                        >
                          <Typography
                            variant="body2"
                            gutterBottom
                            style={{ fontWeight: 600 }}
                          >
                            {t(
                              "documentsForm.castCertificateForm.formControl.barCodeLabel"
                            )}
                            <span style={{ color: "#f93d5c" }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md="auto">
                          <Field component={RadioGroup} name="isBarCode" row>
                            <FormControlLabel
                              value="yes"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.selfIncomeForm.formControl.checkBoxLabel2"
                              )}
                              onChange={() => {
                                setIsBarCode("yes");
                              }}
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.selfIncomeForm.formControl.checkBoxLabel3"
                              )}
                              onChange={() => {
                                setIsBarCode("no");
                              }}
                            />
                          </Field>
                          <FormHelperText error variant="filled">
                            <ErrorMessage name="isBarCode" />
                          </FormHelperText>
                        </Grid>
                      </Grid>
                      {/* {isBarCode == "no" && 
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          md
                          className={classes.radioSection}
                        >
                          <Typography
                            variant="body2"
                            gutterBottom
                            style={{ fontWeight: 600 }}
                          >
                            {t(
                              "documentsForm.pjLetterForm.formControl.applicantLabel"
                            )}
                            <span style={{ color: "#f93d5c" }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md="auto">
                          <Field component={RadioGroup} name="applicantType" row>
                            <FormControlLabel
                              value="yes"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.pjLetterForm.formControl.checkBoxLabel0"
                              )}
                              onChange={(e) => {
                                setSelfOrHeir(e.target.value);
                              }}
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.pjLetterForm.formControl.checkBoxLabel1"
                              )}
                              onChange={(e) => {
                                setSelfOrHeir(e.target.value);
                              }}
                            />
                          </Field>
                        </Grid>
                        </Grid>
                      } */}
                    </Box>
                    {/* {isBarCode == "no" && 
                    <Box>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          md
                          className={classes.radioSection}
                        >
                          <Typography
                            variant="body2"
                            gutterBottom
                            style={{ fontWeight: 600 }}
                          >
                            {t(
                              "documentsForm.pjLetterForm.formControl.otherDocumentLabel"
                            )}
                            <span style={{ color: "#f93d5c" }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md="auto">
                          <Field
                            component={RadioGroup}
                            name="otherPapDocument"
                            row
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.pjLetterForm.formControl.checkBoxLabel2"
                              )}
                              onChange={(e) => {
                                setOtherDoc(e.target.value);
                              }}
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio color="primary" />}
                              label={t(
                                "documentsForm.pjLetterForm.formControl.checkBoxLabel3"
                              )}
                              onChange={(e) => {
                                setOtherDoc(e.target.value);
                              }}
                            />
                          </Field>
                        </Grid>
                      </Grid>
                      </Box>
                    } */}
                    {isBarCode == "yes" &&
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={t("documentsForm.domicileForm.formControl.barcodeNumber")}
                        placeholder={t("documentsForm.domicileForm.formControl.barcodeNumber")}
                        name="barCodeNumber"
                        onChange={handleChange}
                        type="text"
                        id="barCodeNumber"
                        required
                        inputProps={{ maxLength: 20 }}
                      />
                    }
                    {/* {isBarCode == "no" && <>
                    
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={t(
                          "documentsForm.pjLetterForm.formControl.nameInputLabel"
                        )}
                        placeholder={t(
                          "documentsForm.pjLetterForm.formControl.namePlaceholder"
                        )}
                        name="papNameOnCertificate"
                        type="text"
                        id="papNameOnCertificate"
                        required
                        inputProps={{ maxLength: 50 }}
                      />
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={t(
                          "documentsForm.pjLetterForm.formControl.judgementInputLabel"
                        )}
                        placeholder={t(
                          "documentsForm.pjLetterForm.formControl.judgementPlaceholder"
                        )}
                        name="papCertificateNumber"
                        type="text"
                        id="papCertificateNumber"
                        required
                        inputProps={{ maxLength: 30 }}
                      />
                      <FormControl
                        control="datepicker"
                        name="papDocumentDate"
                        maxDate={new Date()}
                        label={t(
                          "documentsForm.pjLetterForm.formControl.documentDate.documentDateLabel"
                        )}
                        placeholder={"DD/MM/YYYY"}
                        // onChange={(value) => {
                        //   if (!isNaN(value) && value !== null) {
                        //     getDateFormat(value);
                        //     setFieldValue(
                        //       "papDocumentDate",
                        //       getDateFormat(value)
                        //     );
                        //   }
                        // }}
                        inputVariant="outlined"
                        required
                      />
                    </>} */}

                    {/* {(isOtherDoc === "yes" && isBarCode == "no") && (
                      <>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "documentsForm.pjLetterForm.formControl.docuNameInputLabel"
                          )}
                          placeholder={t(
                            "documentsForm.pjLetterForm.formControl.docuNamePlaceholder"
                          )}
                          name="otherNameOnCertificate"
                          type="text"
                          id="otherNameOnCertificate"
                          required={isOtherDoc === "yes" ? true : false}
                          inputProps={{ maxLength: 50 }}
                        />
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "documentsForm.pjLetterForm.formControl.docuNoInputLabel"
                          )}
                          placeholder={t(
                            "documentsForm.pjLetterForm.formControl.docuNoPlaceholder"
                          )}
                          name="otherCertificateNumber"
                          type="text"
                          id="otherCertificateNumber"
                          required
                          inputProps={{ maxLength: 30 }}
                        />
                        <FormControl
                          control="datepicker"
                          name="otherDocumentDate"
                          maxDate={new Date()}
                          label={t(
                            "documentsForm.pjLetterForm.formControl.otherDocumentDate.documentDateLabel"
                          )}
                          placeholder={"DD/MM/YYYY"}
                          // onChange={(value) => {
                          //   if (!isNaN(value) && value !== null) {
                          //     getDateFormat(value);
                          //     setFieldValue(
                          //       "otherDocumentDate",
                          //       getDateFormat(value)
                          //     );
                          //   }
                          // }}
                          inputVariant="outlined"
                          required
                        />
                      </>
                    )} */}
                    {/* {(isSelfOrHeir === "no" && isBarCode == "no") && (
                      <>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "documentsForm.pjLetterForm.formControl.vanshavalDocsRelationInputLabel"
                          )}
                          placeholder={t(
                            "documentsForm.pjLetterForm.formControl.vanshavalDocsRelationPlaceholder"
                          )}
                          name="vanshavalNameOnCertificate"
                          type="text"
                          id="vanshavalNameOnCertificate"
                          required
                          inputProps={{ maxLength: 50 }}
                        />
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "documentsForm.pjLetterForm.formControl.vanshavalDocsInputLabel"
                          )}
                          placeholder={t(
                            "documentsForm.pjLetterForm.formControl.vanshavalDocsPlaceholder"
                          )}
                          name="vanshavalCertificateNumber"
                          type="text"
                          id="vanshavalCertificateNumber"
                          required
                          inputProps={{ maxLength: 30 }}
                        />
                        <FormControl
                          control="datepicker"
                          name="vanshavalDocumentDate"
                          maxDate={new Date()}
                          label={t(
                            "documentsForm.pjLetterForm.formControl.vanshavalDocstDate.documentDateLabel"
                          )}
                          placeholder={"DD/MM/YYYY"}
                          // onChange={(value) => {
                          //   if (!isNaN(value) && value !== null) {
                          //     getDateFormat(value);
                          //     setFieldValue(
                          //       "vanshavalDocumentDate",
                          //       getDateFormat(value)
                          //     );
                          //   }
                          // }}
                          inputVariant="outlined"
                          required
                        />
                      </>
                    )} */}
                  </Box>
                  <Grid item xs={12} className={classes.innerCont} style={{ border: "none" }}>
                    {isRejected && <RejectedDocview imageUrl={rejectedDocFile} rejectionReason={rejectionReason} />}
                    {allDocData.docInfo && <Alert className={classes.docInfoBox} severity="info"><span dangerouslySetInnerHTML={{ __html: allDocData.docInfo }} /></Alert>}
                  </Grid>
                </Grid>
              </Grid>
              <Box className={classes.footerBox}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                // onClick={submitForm}
                >
                  {t("documentsForm.saveButtonText")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}

export default withWidth()(PAPDialogBox);