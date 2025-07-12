import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Checkbox,
  MenuItem,
  InputAdornment,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import * as yup from "yup";
import User from "../../../../../assets/SvgIcons/User.svg";
import MultipleUsers from "../../../../../assets/SvgIcons/MultipleUsers.svg";
import QrCode from "../../../../../assets/SvgIcons/QrCode.svg";
import Whatsapp from "../../../../../assets/SvgIcons/Whatsapp.svg";
import PersonalDetailsForm from "../../../PersonalDetailsPageComponents/PersonalDetailsForm/PersonalDetailsForm";
import {
  FileUploadIcon,
  NextArrowIcon,
  WhiteArrowIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import { initialPagesStyles } from "../../../InitialPagesComponents/InitialPages.styles";
import { useTranslation } from "react-i18next";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import checkGif from "../../../../../assets/checkGif.webp";
import UploadLoading from "../../../../atoms/Loading/UploadLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  clearImageUrl,
  fileDataUpload,
  fileUploadSelector,
} from "../../../../../redux/features/file/FileUploadSlice";
import { ImageSizes, SupportedFormats } from "../../../../../utils/Common";
import Upload from "../../../../../assets/Upload.svg";
import UploadedKyc from "../../../../../assets/UploadedKyc.svg";
import { ApplicantBankDetails, applicantSelector, getBankdetails } from "../../../../../redux/features/applicant/ApplicantSlice";
import { RegistrationStepperSave } from "../../../../../redux/features/registration/registrationStepperSlice";

const MyForm = (props) => {
  const { active } = props;
  const {
    isFileFetching,
    isFileSuccess,
    imageUrl,
    isFileError,
    fileErrorMessage,
  } = useSelector(fileUploadSelector);
  const {
    isFetchingApplicantBank,
    isSuccessResApplicantBank,
    isErrorApplicantBank,
    errorMessage,
    isgetBankDetails,
    isSuccessgetBankDetails,
    isErrorgetBankDetails,
    getBankDetailsData,
    errorMessagegetBankDetails,
    applicantData

  } = useSelector(applicantSelector);
  const formikRef = useRef();
  const { t } = useTranslation("InitialPageTrans");
  const [formValue, setFormValue] = useState(null);
  const [formEditIs, setFormEditIs] = useState(false);
  const [proceedParam, setProceedParam] = useState("1");
  const [stepCompleted, setIsStepCompleted] = useState(false)
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isUploaded, setUploaded] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isUserDeclarationDialogOpen, setUserDeclarationDialogOpen] =
    useState(false);
  const [dragBoxClass, setDragBoxClass] = useState("");
  function validateAccountNumber(value) {
    let error;
    if (!value) {
      error = t("kycBank.formControl.accountNumber.required");
    } else if (!(value.length > 9 && value > 0)) {
      error = t("kycBank.formControl.accountNumber.limitation");
    }
    return error;
  }
  function validateConfirmAccountNumber(value) {
    let error;
    if (!value) {
      error = t("kycBank.formControl.confirmaccountNumber.required");
    } else if (!(value.length > 9 && value > 0)) {
      error = t("kycBank.formControl.confirmaccountNumber.limitation");
    }
    return error;
  }
  const validationSchema = yup.object({
    account_number:
      formEditIs == false &&
      yup
        .string()
        .required(t("kycBank.formControl.accountNumber.required"))
        .min(9, t("kycBank.formControl.accountNumber.limitation")),
    // confirm_account_number: yup.string()
    // .required(t("kycBank.formControl.confirmaccountNumber.required"))
    // .min(9, t("kycBank.formControl.confirmaccountNumber.limitation")),
    confirm_account_number:
      formEditIs == false &&
      yup
        .string()
        .required(t("kycBank.formControl.confirmaccountNumber.required"))
        .min(9, t("kycBank.formControl.confirmaccountNumber.limitation"))
        .test(
          "accountNumbersMatch",
          "Confirm Account Number Should be Same As Account number",
          function (value) {
            return value === this.parent.account_number;
          }
        ),
    ifsc_code:
      formEditIs == false &&
      yup
        .string()
        .matches(
          /^[A-Za-z]{4}0[A-Z0-9]{6}$/,
          t("kycBank.formControl.ifsc.limitation")
        )
        .required(t("kycBank.formControl.ifsc.required"))
        .min(11, t("kycBank.formControl.ifsc.limitation")),
    micr_code:
      formEditIs == false &&
      yup
        .string()
        .required(t("kycBank.formControl.micr.required"))
        .min(9, t("kycBank.formControl.micr.limitation")),
    bank_name:
      formEditIs == false &&
      yup
        .string()
        .required(t("kycBank.formControl.bank.required"))
        .matches(
          /^[\u0900-\u097F.a-zA-Z ]*$/,
          t("kycBank.formControl.bank.limitation")
        ),
    branch_name:
      formEditIs == false &&
      yup
        .string()
        .required(t("kycBank.formControl.branch.required"))
        .matches(
          /^[\u0900-\u097F.a-zA-Z ]*$/,
          t("kycBank.formControl.branch.limitation")
        ),
    fileData:
      !imageUrl &&
      yup
        .mixed()
        .required(t("kycBank.formControl.uploadErrors.required"))
        .test(
          "fileSize",
          t("kycBank.formControl.uploadErrors.limitation"),
          (value) => value && value.size <= ImageSizes.TwoMB
        )
        .test(
          "fileFormat",
          t("kycBank.formControl.uploadErrors.fileFormat"),
          (value) => value && SupportedFormats.DocsFormats.includes(value.type)
        ),
  });
  const initialValues = {
    account_holder_name: "",
    account_number: "",
    confirm_account_number: "",
    ifsc_code: "",
    micr_code: "",
    bank_name: "",
    branch_name: "",
    refund_type: "",
    fileData: "",
  };

  const classes = initialPagesStyles();
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false)
    const data = {
      ...values,
      fileData: imageUrl

    }
    dispatch(ApplicantBankDetails(data));
  };
  useEffect(() => {
    dispatch(getBankdetails());
  }, [])
  useEffect(() => {
    setIsStepCompleted(active > 3)
}, [active])
  useEffect(() => {
    if (isSuccessgetBankDetails) {
      if (getBankDetailsData && getBankDetailsData[0]) {
        setFormEditIs(true);
        // let AadharNo = applicantData.AadharNo.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
        let AccountName = getBankDetailsData[0]?.account_holder_name;
        let AccountNo = getBankDetailsData[0]?.account_number;
        let ConfirmAccountNo = getBankDetailsData[0]?.confirm_account_number;
        let IFSC = getBankDetailsData[0]?.ifsc_code;
        let MICR = getBankDetailsData[0]?.micr_code;
        let BankName = getBankDetailsData[0]?.bank_name;
        let BranchName = getBankDetailsData[0]?.branch_name;
        let RefundType = getBankDetailsData[0]?.refund_type;
        let CancelledCheque = getBankDetailsData[0]?.cancelledcheque;

        const savedValue = {
          account_holder_name: AccountName,
          account_number: AccountNo,
          confirm_account_number: ConfirmAccountNo,
          ifsc_code: IFSC,
          micr_code: MICR,
          bank_name: BankName,
          branch_name: BranchName,
          refund_type: RefundType,
          fileData: CancelledCheque
        };
        setFormValue(savedValue);
        savedValue.fileData ? setUploaded(true) : setUploaded(false);
      }
    }
  }, [isSuccessgetBankDetails]);
  console.log(formValue, "formvalues");

  useEffect(() => {
    if (isSuccessResApplicantBank) {
      dispatch(RegistrationStepperSave("4"));
    }
  }, [isSuccessResApplicantBank])


  const dragOver = (e) => {
    e.preventDefault();
    setDragBoxClass("dragover");
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setDragBoxClass("dragover");
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setDragBoxClass("");
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    formikRef.current.setFieldValue("fileData", files);
    setData(files);
    setDragBoxClass("");
  };

  const onReUpload = () => {
    formikRef.current.setFieldValue("fileData", null);
    setData({});
    setUploaded(false);
    dispatch(clearImageUrl());
  };

  useEffect(() => {
    if (data.name) {
      if (SupportedFormats.DocsFormats.includes(data["type"])) {
        // setUploaded(true);
        if (data["type"].split("/")[0] == "image") {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        let sendData = {
          doc: data,
          docName: "cancel cheque",
        };
        dispatch(fileDataUpload(sendData));
      }
    }
  }, [data]);

  useEffect(() => {
    if (isFileSuccess) {
      setUploaded(true);
    }
  }, [isFileSuccess]);

  return (
    <>
      <PersonalDetailsForm />

      <Typography>
        <Box
          component="span"
          my={1}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: "10px",
            bgcolor: "#E9F1FF",
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          <img src={QrCode} alt="Custom Icon" width={16} height={16} />
        </Box>
        Bank Details
      </Typography>
      <Formik
        enableReinitialize={true}
        initialValues={formEditIs ? formValue : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ submitForm, values, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            {isErrorApplicantBank && (
                  <AlertBox severity="error">{errorMessage}</AlertBox>
                )}
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("kycBank.formControl.accountholdername.label")}
                  placeholder={t(
                    "kycBank.formControl.accountholdername.placeholder"
                  )}
                  name="account_holder_name"
                  type="text"
                  id="account_holder_name"
                  inputProps={{ maxLength: 50 }}
                  required
                  onInput={(e) =>
                    (e.target.value = ("" + e.target.value).toUpperCase())
                  }
                  disabled={formEditIs}
                  margin="dense"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  validate={validateAccountNumber}
                  control="input"
                  variant="outlined"
                  label={t("kycBank.formControl.accountNumber.label")}
                  placeholder={t(
                    "kycBank.formControl.accountNumber.placeholder"
                  )}
                  name="account_number"
                  type="text"
                  id="account_number"
                  margin="dense"
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                  }}
                  inputProps={{
                    minLength: 9,
                    maxLength: 18,
                  }}
                  disabled={formEditIs}
                  autoFocus={true}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  validate={validateConfirmAccountNumber}
                  control="input"
                  variant="outlined"
                  label={t("kycBank.formControl.confirmaccountNumber.label")}
                  placeholder={t(
                    "kycBank.formControl.confirmaccountNumber.placeholder"
                  )}
                  name="confirm_account_number"
                  type="text"
                  id="confirm_account_number"
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/gi, "");
                  }}
                  inputProps={{
                    minLength: 9,
                    maxLength: 18,
                  }}
                  autoFocus={true}
                  disabled={formEditIs}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("kycBank.formControl.ifsc.label")}
                  placeholder={t("kycBank.formControl.ifsc.placeholder")}
                  name="ifsc_code"
                  // type="number"
                  id="ifsc_code"
                  margin="dense"
                  inputProps={{
                    maxLength: 11,
                  }}
                  onInput={(e) =>
                    (e.target.value = ("" + e.target.value).toUpperCase())
                  }
                  required
                  disabled={formEditIs}
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("kycBank.formControl.micr.label")}
                  placeholder={t("kycBank.formControl.micr.placeholder")}
                  name="micr_code"
                  type="number"
                  id="micr_code"
                  required
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 9);
                  }}
                  disabled={formEditIs}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("kycBank.formControl.bank.label")}
                  placeholder={t("kycBank.formControl.bank.placeholder")}
                  name="bank_name"
                  type="text"
                  id="bank_name"
                  inputProps={{ maxLength: 50 }}
                  required
                  onInput={(e) =>
                    (e.target.value = ("" + e.target.value).toUpperCase())
                  }
                  disabled={formEditIs}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("kycBank.formControl.branch.label")}
                  placeholder={t("kycBank.formControl.branch.placeholder")}
                  name="branch_name"
                  type="text"
                  id="branch_name"
                  inputProps={{ maxLength: 50 }}
                  required
                  onInput={(e) =>
                    (e.target.value = ("" + e.target.value).toUpperCase())
                  }
                  disabled={formEditIs}
                  margin="dense"
                />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontWeight: 600, fontSize: 14 }}
                >
                  {t("kycBank.formControl.radio.label")}
                </Typography>
                <Field
                  component={RadioGroup}
                  name="refund_type"
                  style={{


                    flexDirection: "row",

                  }}
                  disabled={formEditIs}
                >
                  <FormControlLabel
                    value="other_account"
                    control={<Radio color="primary" />}
                    label={t("kycBank.formControl.radio.rtman")}
                    onChange={(e) => {
                      setProceedParam(e.target.value);
                    }}
                    disabled={formEditIs}
                  />

                  <FormControlLabel
                    value="source_account"
                    control={<Radio color="primary" />}
                    label={t("kycBank.formControl.radio.rts")}
                    onChange={(e) => {
                      setProceedParam(e.target.value);
                    }}
                    disabled={formEditIs}
                  />
                </Field>

                {/* {formEditIs && (
                  <Box mt={3}>
                    <AlertBox
                      icon={false}
                      variant="filled"
                      style={{ padding: "0px 12px" }}
                      className={classes.customAlert}
                    >
                      <Grid container alignItems="center">
                        <img src={checkGif} height="40px" alt="success" />{" "}
                        {t("verifyAadhaarForm.formControl.messageText5")}
                      </Grid>
                    </AlertBox>
                  </Box>
                )} */}
              </Grid>
              <Grid item xs={6}>
                {/* {isFileFetching && <UploadLoading />} */}
                {!isUploaded && !isFileFetching && (
                  <Box
                    textAlign="center"
                    margin={2}
                    p={5}
                    className={`${classes.kycDragnDropBox} ${dragBoxClass}`}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                  >
                    {isFileError && (
                      <AlertBox severity="error">{fileErrorMessage}</AlertBox>
                    )}
                    {/* {isErrorApplicant && (
                      <AlertBox severity="error">{errorMessage}</AlertBox>
                    )} */}
                    <Box textAlign="center" marginBottom={3}>
                      <img
                        className={classes.iconStyle}
                        src={Upload}
                        alt="Verify OTP"
                      />
                    </Box>
                    <Box>
                      {t("kycBank.formControl.upload.dragNdDropText")}
                      <input
                        accept="image/jpeg,image/png,application/pdf,image/x-eps"
                        className={classes.input}
                        id="fileData"
                        type="file"
                        name="fileData"
                        onChange={(event) => {
                          if (event.currentTarget.files[0]) {
                            setFieldValue(
                              "fileData",
                              event.currentTarget.files[0]
                            );
                            setData(event.currentTarget.files[0]);
                          }
                        }}
                      />
                      <label htmlFor="fileData">
                        <Button
                          color="primary"
                          variant="contained"
                          component="span"
                          className={classes.kycUploadBtn}
                          size="small"
                        >
                          {t("kycBank.formControl.upload.browseBtnText")}
                        </Button>
                      </label>
                    </Box>
                    <FormHelperText
                      error
                      variant="filled"
                      className={classes.helperTextBox}
                    >
                      <ErrorMessage name="fileData" />
                    </FormHelperText>
                    <Box margint={2}>
                      <Typography style={{ fontSize: 12 }}>
                        {t("kycBank.formControl.upload.fileLimit0")}
                        <strong>
                          {" "}
                          {t("kycBank.formControl.upload.fileLimit1")}{" "}
                        </strong>
                        {t("kycBank.formControl.upload.fileLimit2")}
                      </Typography>
                    </Box>
                  </Box>
                )}


                {isUploaded && !isFileFetching && (
                  <Box>
                    <Typography
                      className={classes.kycCaption}
                      variant="subtitle1"
                    >
                      {t("kycBank.formControl.upload.kycCaptionTxt1")}
                    </Typography>
                    {isImage ? (
                      <Box className={classes.panCardPreviewCard}>
                        <img
                          className={classes.panPreviewImg}
                          src={imageUrl}
                          alt="uploaded successfully"
                        />
                      </Box>
                    ) : (
                      <Box
                        textAlign="center"
                        className={classes.panCardPreviewCard}
                      >
                        <img
                          className={classes.panPreviewImg}
                          src={UploadedKyc}
                          alt="uploaded successfully"
                        />
                        <Typography className={classes.kycCaption}>
                          {t("kycBank.formControl.upload.success")}
                        </Typography>
                      </Box>
                    )}
                    <Box textAlign="left" marginTop={2}>
                      <Typography
                        className={classes.kycCaption}
                        variant="subtitle1"
                      >
                        {t("kycBank.formControl.upload.uploaded")}
                      </Typography>
                    </Box>
                    {active < 4 && <Box className={classes.fileViewArea}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs="auto">
                          <FileUploadIcon color="primary" />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                          <Typography
                            variant="body2"
                            className={classes.fileUrlPreview}
                          >
                            {imageUrl || "--"}
                          </Typography>
                        </Grid>
                        <Grid item xs="auto">
                          <Button
                            variant="text"
                            size="small"
                            color="primary"
                            onClick={onReUpload}
                          >
                            {t("kycBank.formControl.upload.reupload")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>}
                  </Box>
                )}
              </Grid>
            </Grid>

            {!stepCompleted && <Box className={classes.kycCardFooterRoot}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                // className={classes.nxtBtn}
                
              >
                {isFetchingApplicantBank && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                {isFetchingApplicantBank && 'Saving...'}
                {!isFetchingApplicantBank && 'Save & Continue'}
              </Button>
            </Box>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MyForm;
