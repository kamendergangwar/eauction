import React, { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import withWidth from "@material-ui/core/withWidth";
import { Schedule } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { clearCoApplicantState, coApplicantSelector, deleteCoApplicant, getCoApplicantDetails } from "../../../../../../redux/features/coApplicant/CoApplicantSlice";
import { getFamilyRelationshipList, getMaritalStatusList, masterDataSelector } from "../../../../../../redux/features/masterdata/MasterDataSlice";
import { applicantSelector, clearApplicantData, clearApplicantState, getDetailsFromPanCard } from "../../../../../../redux/features/applicant/ApplicantSlice";
import Loading from "../../../../../atoms/Loading/Loading";
import FormCard from "../../../../../molecules/Cards/FormCard/FormCard";
import { CoApplicantSectionIcon2, PersonalDetailsTitleIcon, VerifiedDocIcon, } from "../../../../../atoms/SvgIcons/SvgIcons";
import AlertBox from "../../../../../atoms/AlertBox/AlertBox";
import { Chip, CircularProgress, IconButton, InputAdornment, Paper, Snackbar } from "@material-ui/core";
import { EditCoApplicantStyle } from "../EditCoApplicantStyle.style";
import EditCoapplicantStage3 from "./EditCoApplicantStage3";
import { GenericDocSliceSelector } from "../../../../../../redux/features/UttilSlice/genericDocumentSlice";
import FormControl from "../../../../../molecules/FormControl/FormControl";
import { aadhaarTempVerifyMahaIT, aadhaarVerifyOtpMahaIT, clearVerifyAadhaarState, sendOTPMahaIT, verifyAadhaarSelector } from "../../../../../../redux/features/verify/VerifyAadhaarSlice";
import { Alert, Skeleton } from "@material-ui/lab";
import { GenericUpdateReqSliceSelector, getTempAddCoAppReq } from "../../../../../../redux/features/UttilSlice/genericUpdateReqSlice";

const EditCoapplicantStage2 = (props) => {
    const { setEditCoApplicantStage, onGoingReqData, setShowForm } = props;
    const classes = EditCoApplicantStyle();
    const { t } = useTranslation("PersonalDetailsPageTrans");
    const formikRef = useRef();
    const history = useHistory();
    const [benefitsDialogOpenIs, setBenefitsDialogOpenIs] = useState(false);
    const [coApplcntPersonalDetlsModalOpenIs, setCoApplcntPersonalDetlsModalOpenIs] = useState(false);
    const [coApplcntAddressDetlsModalOpenIs, setCoApplcntAddressDetlsModalOpenIs] = useState(false);
    const [coApplicntDetailsPreviewModalOpenIs, setCoApplicntDetailsPreviewModalOpenIs] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const myScrollContainerRef = useRef(null);
    const [relationshipList, setRelationshipList] = useState([]);
    const [confirmScheme, setConfirmScheme] = useState(false);
    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const [martialStatus, setMartialStatus] = useState();
    const [step1Status, setStep1Status] = useState(false);
    const [step2Status, setStep2Status] = useState(false);
    const [isAadharOtpSent, setIsAadharOtpSent] = useState(false);
    const [isAadharVerified, setIsAadharVerified] = useState(false);
    const [formValue, setFormValue] = useState(null);
    const [formEditIs, setFormEditIs] = useState(false);
    const [isPanVerified, setIsPanVerified] = useState(false);
    const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
    const [isMartialStatus, setIsMartialStatus] = useState(false);
    const [isResenOtpText, setResenOtpText] = React.useState(false);
    const [countOtp, setCountOtp] = React.useState(90);
    const { isFetchingTempAddCoAppReq, isSuccessTempAddCoAppReq, isErrorTempAddCoAppReq, tempAddCoAppReqData, errorMessageTempAddCoAppReq } = useSelector(GenericUpdateReqSliceSelector)
    const dispatch = useDispatch();
    const stepperData = useSelector((state) => state.stepper.stepperData);
    const {
        isSuccessResStepper,
        isSuccessReqStepper,
    } = useSelector((state) => state.stepper);
    const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
    const {
        isFetchingGetCoApplicant,
        isSuccessResGetCoApplicant,
        isErrorGetCoApplicant,
        errorMsgGetCoApplicant,
        coApplicantData,

        isFetchingCoApplicantEdit,
        isSuccessResCoApplicantEdit,
        isErrorCoApplicantEdit,
        errorMsgCoApplicantEdit,
        coApplicantDataEdit,

        isFetchingCoApplicantDelete,
        isSuccessResCoApplicantDelete,
        isErrorCoApplicantDelete,
        errorMsgCoApplicantDelete
    } = useSelector(coApplicantSelector);
    const {
        relationshipListData,
        isFetchingRelationship,
        isSuccessRelationship,
        isErrorRelationship,
        errorMsgRelationship,
    } = useSelector(masterDataSelector);
    const {
        isFetchingApplicant,
        isSuccessResApplicantGet,
        applicantData
    } = useSelector(applicantSelector);

    const {
        maritalStatusListData,
        isFetchingMaritalStatus,
        isSuccessMaritalStatus,
        isErrorMaritalStatus,
        errorMsgMaritalStatus,
    } = useSelector(masterDataSelector);

    const {
        //Maha- IT adhaar sent otp
        isFetchingVerifyAadhaarMahaIT,
        isSuccessSentMahaIT,
        isErrorSendOtpMahaIT,
        sentOTPDataMahaIT,
        aadhaarErrorMessageMahaIT,
        //Maha- IT adhaar Verify otp
        // isSuccessTempVerifyMahaIT,
        // isErrorVerifyAadhaarMahaI,
        // aadhaarErrorMessageMahaIT,
        // aadhaarDataMahaIT,

        //temp verify aadhaar Maha IT
        isFetchingTempVerifyMahaIT,
        isSuccessTempVerifyMahaIT,
        isErrorTempVerifyMahaIT,
        tempVerifyMahaITErrorMessage,
        aadhaarTempVerifyDataMahaIT,
    } = useSelector(verifyAadhaarSelector);

    const {
        isSuccessResPanCard,
        isErrorPanCard,
        errorMessagePanCard,
        isFetchingPanCard,
        panCardData,
    } = useSelector(applicantSelector);

    useEffect(() => {
        dispatch(getMaritalStatusList());
    }, [dispatch]);

    const otpCounter = () => {
        let timeleft = 90;
        var downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
            }
            setCountOtp(timeleft);
            timeleft -= 1;
        }, 1000);
    };

    useEffect(() => {
        if (isSuccessSentMahaIT) {
            setTimeout(() => setResenOtpText(true), 90000);
            otpCounter();
        }
    }, [isSuccessSentMahaIT]);

    const retryKYC = () => {
        // sendAadhaarOtp(formikRef.current.values.aadharNumber);
        dispatch(clearVerifyAadhaarState());
        setResenOtpText(false);
        otpCounter();
    };

    useEffect(() => {
        if (isSuccessMaritalStatus && maritalStatusListData) {
            const temp_marital_status_list = maritalStatusListData.map(element => ({
                value: element.DdtId,
                label: element.Title,
            }));
            setMaritalStatusList(temp_marital_status_list);
        }

        if (relationshipListData) {
            const temp_rel_list = relationshipListData.map(element => ({
                value: element.DdtId,
                label: element.Title
            }));
            setRelationshipList(temp_rel_list);
        }
    }, [isSuccessMaritalStatus, relationshipListData]);


    useEffect(() => {
        if (relationshipList[0]?.label) {
            setStep1Status(true);
        }
    }, [relationshipList]);

    useEffect(() => {
        if ((isSuccessResPanCard && isSuccessTempVerifyMahaIT) || formEditIs) {
            setStep2Status(true);
        }
    }, [isSuccessResPanCard, isSuccessTempVerifyMahaIT, formEditIs]);

    const initialValues = {
        relationship: "",
        maritalStatus: "",
        aadharNumber: onGoingReqData ? onGoingReqData.AadharNo : "",
        oneTimePassword: "",
        pancardNumber: onGoingReqData ? onGoingReqData.PANNo : "",
    };

    useEffect(() => {
        if (onGoingReqData) {
            if (onGoingReqData.IsAadharVerified == "1" && onGoingReqData.isPanVerified == "1") {
                setFormEditIs(true);
                const savedValue = {
                    aadharNumber: onGoingReqData.AadharNo,
                    pancardNumber: onGoingReqData.PANNo,
                };
                setFormValue(savedValue);
            }
            if (onGoingReqData.IsAadharVerified == "1") {
                setIsAadhaarVerified(true)
            }
            if (onGoingReqData.isPanVerified == "1") {
                setIsPanVerified(true)
            }
            if (onGoingReqData.MarritalStatus) {
                setIsMartialStatus(true);
                setMartialStatus(onGoingReqData.MarritalStatus)
            }
        }
    }, [onGoingReqData]);

    const validationSchema = yup.object().shape({
        relationship: yup
            .string()
            .required(
                t(
                    "coApplicant.relationshipErrors.required"
                )
            ),
    });

    useEffect(() => {
        if (isSuccessResCoApplicantEdit) {
            dispatch(clearCoApplicantState());
            dispatch(getCoApplicantDetails());
        }
    }, [isSuccessResCoApplicantEdit]);


    useEffect(() => {
        const formik = formikRef.current;
        formik.resetForm();
    }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (martialStatus) {
            let MarritalStatusString;
            if (martialStatus == "1") {
                MarritalStatusString = "Single";
            } else if (martialStatus == "2") {
                MarritalStatusString = "Married";
            } else if (martialStatus == "11" || martialStatus == "123") {
                MarritalStatusString = "Other";
            }
            dispatch(getFamilyRelationshipList(MarritalStatusString));
        }
    }, [martialStatus, onGoingReqData])

    const removeCoApplicant = () => {
        dispatch(deleteCoApplicant());
    };

    const validateOTP = (value) => {
        let error;
        if (!value) {
            error = t("OTP is required");
        } else if (!/^[0-9]{6}$/i.test(value)) {
            error = t(
                "Please enter valid 6 digit OTP"
            );
        }
        return error;
    };

    const sendAadhaarOtp = (aadhaar) => {
        let aadhaar_num = aadhaar.replace(/-/g, "");
        if (aadhaar_num.length == 12) {
            const requestData = {
                docNumber: aadhaar_num,
                IsCoApplicant: 1,
                addCoApplicant: "addCoApplicant",
                applicantId: localStorage.getItem("applicantId"),
            };
            dispatch(sendOTPMahaIT(requestData));
        }
    }

    useEffect(() => {
        if (isSuccessSentMahaIT) {
            setIsAadharOtpSent(true);
        }
    }, [isSuccessSentMahaIT]);

    const verifyAadhaarOtp = (otp, aadhaar) => {
        let aadhaar_num = aadhaar.replace(/-/g, "");
        if (otp.length == 6 && martialStatus) {
            const requestData = {
                MarritalStatus: martialStatus,
                tsTransID: sentOTPDataMahaIT?.tsTransID || "",
                mobileCode: otp,
                docNumber: aadhaar_num,
                IsCoApplicant: 1,
                addCoApplicant: "addCoApplicant",
                applicantId: localStorage.getItem("applicantId"),
            };
            dispatch(aadhaarTempVerifyMahaIT(requestData));
        }
    };

    useEffect(() => {
        if (isSuccessTempVerifyMahaIT) {
            setIsAadharVerified(true);
            dispatch(getTempAddCoAppReq());
        }
    }, [isSuccessTempVerifyMahaIT]);

    const verifyPan = (pan) => {
        if (pan.length == 10) {
            let sendParam = {
                docNumber: pan,
                Lang: localStorage.getItem("i18nextLng"),
                ApplicantId: localStorage.getItem("applicantId"),
                IsCoApplicant: 1,
                addCoApplicant: "addCoApplicant"
            };
            dispatch(getDetailsFromPanCard(sendParam));
        }
    };

    useEffect(() => {
        if (isSuccessResPanCard) {
            dispatch(getTempAddCoAppReq());
        }
    }, [isSuccessResPanCard]);

    useEffect(() => {
        return () => {
            dispatch(clearVerifyAadhaarState());
            dispatch(clearApplicantState())
        }
    }, [])

    return (
        <>
            <Snackbar open={isAadharOtpSent}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={5000}
                onClose={() => setIsAadharOtpSent(false)}
            >
                <Alert onClose={() => setIsAadharOtpSent(false)} severity="success" variant="filled">
                    Aadhaar OTP sent successfully. Please enter OTP to continue
                </Alert>
            </Snackbar>
            <Snackbar open={isAadharVerified}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={5000}
                onClose={() => setIsAadharVerified(false)}
            >
                <Alert onClose={() => setIsAadharVerified(false)} severity="success" variant="filled">
                    Aadhaar successfully verified. Please enter your PAN to continue
                </Alert>
            </Snackbar>
            <Grid container alignItems="center" style={{ marginBottom: 16 }}>
                {/* <IconButton
                    aria-label="close"
                    onClick={() => setEditCoApplicantStage(1)}
                    style={{ marginRight: 8 }}
                >
                    <ArrowBackIcon />
                </IconButton> */}
                <Typography variant='h6' className={classes.cancelTittle} style={{ fontWeight: 'bold' }}>
                    Add Co-Applicant
                </Typography>
            </Grid>
            {(isFetchingRelationship || isFetchingCoApplicantDelete || isFetchingGetCoApplicant || isFetchingVerifyAadhaarMahaIT || isFetchingPanCard || isFetchingTempVerifyMahaIT || isFetchingTempAddCoAppReq) && (
                <Loading isOpen={isFetchingRelationship || isFetchingCoApplicantDelete || isFetchingGetCoApplicant || isFetchingVerifyAadhaarMahaIT || isFetchingPanCard || isFetchingTempVerifyMahaIT || isFetchingTempAddCoAppReq} />
            )}
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                // onSubmit={onSubmit}
                innerRef={formikRef}
                enableReinitialize
            >
                {({ submitForm, setFieldValue, touched, errors, values }) => (
                    <Form noValidate autoComplete="off" className={classes.formContainer}>
                        <FormCard>
                            <Paper elevation={1} square className={`${classes.projectSection} ${step1Status ? "done" : ""}`}>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', }}><PersonalDetailsTitleIcon fontSize="large" style={{ marginRight: 8 }} /> Select your Marital Status</Typography>
                                {/* {relationshipList[0]?.label ?
                                    <Chip color="primary" icon={<VerifiedDocIconGreen />} className={classes.successChip} label="Completed" variant={'outlined'} /> :
                                    <Chip color={'secondary'} icon={<Schedule />} className={classes.pendingChip} label="Pending" variant={'outlined'} />
                                } */}
                            </Paper>
                            <Grid container spacing={3} alignItems="center" className={classes.statusSelect}>
                                <Grid item md={6} xs={10} >
                                    <FormControl
                                        control="selectbox"
                                        variant="outlined"
                                        id="maritalStatus"
                                        name="maritalStatus"
                                        value={martialStatus}
                                        onChange={(e) => { setMartialStatus(e.target.value); }}
                                        label={t(
                                            "personalDetailsForm.formControl.maritalStatus.maritalStatusLabel"
                                        )}
                                        options={maritalStatusList}
                                        required
                                    // disabled={isMartialStatus}
                                    />
                                </Grid>
                                <Grid item xs={10} md={6}>
                                    {relationshipList[0]?.label && <TextField disabled id="standard-disabled" className={classes.relationshipDropDown} label={t("coApplicant.relationshipInputLabel")} defaultValue={relationshipList[0]?.label} />}
                                </Grid>
                            </Grid>
                            <Paper elevation={1} square className={`${classes.projectSection} ${step2Status ? "done" : ""}`}>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', }}><CoApplicantSectionIcon2 fontSize="large" style={{ marginRight: 8 }} /> Co-Applicant KYC</Typography>
                                {/* {isSuccessResPanCard ?
                                    <Chip color="primary" icon={<VerifiedDocIconGreen />} className={classes.successChip} label="KYC Completed" variant={'outlined'} /> :
                                    <Chip color={'secondary'} icon={<Schedule />} className={classes.pendingChip} label="Pending" variant={'outlined'} />
                                } */}
                            </Paper>
                            {(isErrorSendOtpMahaIT) && <AlertBox style={{ margin: 8, wordBreak: 'break-all' }} severity="error">{aadhaarErrorMessageMahaIT}</AlertBox>}
                            {(isErrorTempVerifyMahaIT) && <AlertBox style={{ margin: 8, wordBreak: 'break-all' }} severity="error">{tempVerifyMahaITErrorMessage}<span onClick={retryKYC} style={{ textDecoration: "none", color: "#0038C0", cursor: 'pointer' }}>&nbsp;Retry again.</span></AlertBox>}
                            {isErrorPanCard && <AlertBox style={{ margin: 8, wordBreak: 'break-all' }} severity="error">{errorMessagePanCard}</AlertBox>}
                            <Box p={2}>
                                <Typography style={{ fontWeight: 600 }} gutterBottom>Co-Applicant Aadhaar card KYC</Typography>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <FormControl
                                            control="input"
                                            variant="outlined"
                                            label={t(
                                                "Enter co-applicant Aadhaar number"
                                            )}
                                            placeholder={t(
                                                "Enter co-applicant Aadhaar number"
                                            )}
                                            name="aadharNumber"
                                            type="text"
                                            id="aadharNumber"
                                            required
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
                                            }}
                                            inputProps={{
                                                maxLength: 14,
                                            }}
                                            autoFocus={true}
                                            disabled={isSuccessSentMahaIT || !relationshipList[0]?.label || isAadhaarVerified}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {(isSuccessTempVerifyMahaIT || isAadhaarVerified) ?
                                                            <Box className={classes.verifiedBox}>
                                                                <VerifiedDocIcon />
                                                                <span>Aadhaar Verified</span>
                                                            </Box>
                                                            :
                                                            (values.aadharNumber && !isSuccessSentMahaIT) && <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                style={{ minWidth: 0 }}
                                                                disabled={values.aadharNumber.length < 14}
                                                                onClick={() => sendAadhaarOtp(values.aadharNumber)}
                                                            >
                                                                Get OTP
                                                            </Button>}
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    {(isSuccessSentMahaIT && !isSuccessTempVerifyMahaIT) &&
                                        <Grid container direction="column" item md={6} xs={12}>
                                            <FormControl
                                                control="input"
                                                variant="outlined"
                                                label={t(
                                                    "Enter Aadhaar OTP"
                                                )}
                                                placeholder={t(
                                                    "Enter Aadhaar OTP"
                                                )}
                                                name="oneTimePassword"
                                                type="tel"
                                                id="oneTimePassword"
                                                autoFocus={true}
                                                required
                                                inputProps={{ maxLength: 6 }}
                                                validate={validateOTP}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {(values.oneTimePassword) && <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                style={{ minWidth: 0 }}
                                                                disabled={values.oneTimePassword.length < 6}
                                                                onClick={() => verifyAadhaarOtp(values.oneTimePassword, values.aadharNumber)}
                                                            >
                                                                Verify
                                                            </Button>}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            {!isResenOtpText && (
                                                <Box textAlign="left">
                                                    <Typography
                                                        variant="subtitle2"
                                                        gutterBottom
                                                        style={{ color: "#65707D" }}
                                                    >
                                                        Retry in 0:{countOtp} sec
                                                    </Typography>
                                                </Box>
                                            )}
                                            {isResenOtpText && (
                                                <Box display="flex">
                                                    <Box marginLeft={1}>
                                                        <Typography variant="body2" gutterBottom>
                                                            <span
                                                                to="#"
                                                                onClick={retryKYC}
                                                                style={{ textDecoration: "none", color: "#0038C0", cursor: 'pointer' }}
                                                            >
                                                                Resend
                                                            </span>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Grid>
                                    }
                                </Grid>
                            </Box>

                            {(isSuccessTempVerifyMahaIT || isAadhaarVerified) && <Box p={2}>
                                <Typography style={{ fontWeight: 600 }} gutterBottom>Co-Applicant PAN card KYC</Typography>
                                <Grid container alignItems="center" spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <FormControl
                                            control="input"
                                            variant="outlined"
                                            label={t(
                                                "Enter Co-Applicant PAN Number"
                                            )}
                                            placeholder={t(
                                                "Enter Co-Applicant PAN Number"
                                            )}
                                            name="pancardNumber"
                                            type="text"
                                            id="pancardNumber"
                                            required
                                            inputProps={{
                                                maxLength: 10,
                                            }}
                                            autoFocus={true}
                                            onInput={(e) =>
                                                (e.target.value = ("" + e.target.value).toUpperCase())
                                            }
                                            disabled={isSuccessResPanCard || isPanVerified}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {(isSuccessResPanCard || isPanVerified) ?
                                                            <Box className={classes.verifiedBox}>
                                                                <VerifiedDocIcon />
                                                                <span>PAN Verified</span>
                                                            </Box>
                                                            :
                                                            (values.pancardNumber) && <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                style={{ minWidth: 0 }}
                                                                disabled={values.pancardNumber.length < 10}
                                                                onClick={() => verifyPan(values.pancardNumber)}
                                                            >
                                                                Verify
                                                            </Button>}
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>}
                            {(applicantData && genericGetDocData) ?
                                <EditCoapplicantStage3 setEditCoApplicantStage={setEditCoApplicantStage} step1Status={step1Status} step2Status={step2Status} martialStatus={martialStatus} onGoingReqData={onGoingReqData} setShowForm={setShowForm} />
                                :
                                <Box height="100px" display='flex' justifyContent='center' alignItems='center'>
                                    <CircularProgress color="primary" />
                                </Box>}
                        </FormCard>
                    </Form>
                )}
            </Formik >
        </>
    );
};

export default withWidth()(EditCoapplicantStage2);
