import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import { IconButton, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Divider, FormLabel, InputLabel, MenuItem, Select } from "@material-ui/core";
import Loading from "../../../../../atoms/Loading/Loading";
import { WhiteArrowIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { Alert } from "@material-ui/lab";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ApiEndPoint, ImageSizes, SupportedFormats } from "../../../../../../utils/Common";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SnackBox from "../../../../../atoms/Snackbar/Snackbar";
import { applicantSelector, getApplicant } from "../../../../../../redux/features/applicant/ApplicantSlice";
import LocalFormControl from "../../../../../molecules/FormControl/FormControl";
import { UtilsSelector, clearGenericOtpState, sendGenericOtp } from "../../../../../../redux/features/UttilSlice/genericOtpSlice";
import { ChangeNameStyle } from "../ChangeNameStyle.style";
import { GenericDocSliceSelector, clearGenericGetDocState, genericGetDocuments } from "../../../../../../redux/features/UttilSlice/genericDocumentSlice";
import DocumentUploadBox from "../../../../../atoms/DocumentUploadBox/DocumentUploadBox";
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from "../../../../../../redux/features/file/FileUploadSlice";
import GenericDocDialogBox from "../../../../../molecules/DialogBoxes/UploadDocumentDialogBox/GenericDocDialogBox/GenericDocDialogBox";
import { ApplicantReqHistory, GenericUpdateReqSliceSelector, clearGenericUpdateReqState, genericUpdateReq } from "../../../../../../redux/features/UttilSlice/genericUpdateReqSlice";

function ChangeNameStage2(props) {
    const { setChangeNameState, setShowForm, reasonValue } = props;
    const [formValues, setFormValues] = React.useState(null);
    const classes = ChangeNameStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [changeData, setChangeData] = useState();
    const [confirmChange, setConfirmChange] = useState(false)
    const [applicantMobile, setApplicantMobile] = useState(JSON.parse(localStorage.getItem("mobileNo")));
    const formikRef = React.useRef();
    const formikOtpRef = React.useRef();
    const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
    const [isResenOtpText, setResenOtpText] = React.useState(false);
    const [countOtp, setCountOtp] = React.useState(90);
    const [showToasterMsg, setShowToasterMsg] = React.useState(false);
    const [isAllDocsUploaded, setIsAllDocsUploaded] = useState(false)
    const [allDocumentList, setAllDocumentList] = useState([]);
    const [downloadLoading, setdownloadLoading] = React.useState(false);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = useState(false);
    const { applicantData } = useSelector(applicantSelector);
    const [uploadDialog, setUploadDialog] = useState(false);
    const [applicantNewName, SetApplicantNewName] = useState(null);
    const [coApplicantNewName, SetCoApplicantNewName] = useState(null);
    const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
    const { isFetchingSendOtp, isSuccessSendOtp, isErrorSendOtp, sendOtpData, errorMessageSendOtp } = useSelector(UtilsSelector);
    const { isFetchingGenericUpdateReq, isSuccessGenericUpdateReq, isErrorGenericUpdateReq, genericUpdateReqData, errorMessageGenericUpdateReq } = useSelector(GenericUpdateReqSliceSelector);
    const [flag, setFlag] = useState(false);
    const { isFetchingGetReqHistory, isSuccessGetReqHistory, isErrorGetReqHistory, getReqHistoryData, errorMessageGetReqHistory, requestType, allReqData } = useSelector(GenericUpdateReqSliceSelector)
    const salutationOptions = [{ value: 'Mr.', label: "Mr." }, { value: 'Ms.', label: "Ms." }, { value: 'Mrs.', label: "Mrs." }];

    useEffect(() => {
        if (isSuccessGenericGetDoc && genericGetDocData) {
            const arrGenericDocData = Object.values(genericGetDocData);
            const combinedDoc = [].concat(...arrGenericDocData);
            setAllDocumentList(combinedDoc);
        }
    }, [genericGetDocData, isSuccessGenericGetDoc])

    const initialValues = {
        // applicantSalutation: "",
        applicantFirstName: "",
        applicantMiddleName: "",
        applicantLastName: "",
        // coapplicantSalutation: "",
        coapplicantFirstName: "",
        coapplicantMiddleName: "",
        coapplicantLastName: "",
        acceptTerms: false
    }

    // useEffect(() => {
    //     if (genericGetDocData.UpdateApplicant && !genericGetDocData.UpdateCoApplicant) {
    //         setInitialValue({
    //             applicantSalutation: "",
    //             applicantFirstName: "",
    //             applicantMiddleName: "",
    //             applicantLastName: "",
    //             acceptTerms: false
    //         })
    //     }
    //     if (genericGetDocData.UpdateCoApplicant && !genericGetDocData.UpdateApplicant) {
    //         setInitialValue({
    //             coapplicantSalutation: "",
    //             coapplicantFirstName: "",
    //             coapplicantMiddleName: "",
    //             coapplicantLastName: "",
    //             acceptTerms: false
    //         })
    //     }
    //     if(genericGetDocData.UpdateCoApplicant && genericGetDocData.UpdateApplicant) {
    //         setInitialValue({
    //             applicantSalutation: "",
    //             applicantFirstName: "",
    //             applicantMiddleName: "",
    //             applicantLastName: "",
    //             coapplicantSalutation: "",
    //             coapplicantFirstName: "",
    //             coapplicantMiddleName: "",
    //             coapplicantLastName: "",
    //             acceptTerms: false
    //         })
    //     }
    // }, [])

    const handleCloseDocBox = () => {
        dispatch(clearImageUrl());
        setTimeout(() => {
            dispatch(clearFileState());
        }, 500);
        dispatch(clearDocumentImageUrl());
        dispatch(clearOtherFile());
        setDocumentDialogBoxOpen(false);
    };

    const afterSubmitCloseHandler = (uplDocId) => {
        // dispatch(getApplicant());
        const requestData = {
            ApplicantId: localStorage.getItem("applicantId"),
            ReqType: localStorage.getItem('reqType'),
            Lang: localStorage.getItem("i18nextLng"),
        };
        dispatch(genericGetDocuments(requestData))
        dispatch(clearImageUrl());
        dispatch(clearDocumentImageUrl());
        dispatch(clearOtherFile());
        setTimeout(() => {
            dispatch(clearFileState());
        }, 500);
        setDocumentDialogBoxOpen(false);
    };

    const validationSchemaApplicant = yup.object({
        applicantFirstName: yup.string().required('Name is required')
            .test('applicantFirstName', 'Name must not exceed 30 characters', (value) => {
                return !value || value.length <= 50;
            })
            .test('applicantFirstNameNoSpecialChars', 'Name must not contain special characters or numbers', (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        applicantMiddleName: yup.string()
            .test("applicantMiddleName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("applicantMiddleNameSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        applicantLastName: yup.string()
            .test("applicantLastName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("applicantLastNameNoSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        acceptTerms: yup
            .boolean()
            .oneOf([true], "Please acknowledge the terms and conditions"),
    });

    const validationSchemaCoApplicant = yup.object({
        coapplicantFirstName: yup.string().required('Name is required')
            .test('coapplicantFirstName', 'Name must not exceed 30 characters', (value) => {
                return !value || value.length <= 50;
            })
            .test('applicantFirstNameNoSpecialChars', 'Name must not contain special characters or numbers', (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        coapplicantMiddleName: yup.string()
            .test("coapplicantMiddleName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("coapplicantMiddleNameSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        coapplicantLastName: yup.string()
            .test("coapplicantLastName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("coapplicantLastNameNoSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        acceptTerms: yup
            .boolean()
            .oneOf([true], "Please acknowledge the terms and conditions"),
    });

    const validationSchemaBoth = yup.object({
        applicantFirstName: yup.string().required('Name is required')
            .test('applicantFirstName', 'Name must not exceed 30 characters', (value) => {
                return !value || value.length <= 50;
            })
            .test('applicantFirstNameNoSpecialChars', 'Name must not contain special characters or numbers', (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        applicantMiddleName: yup.string()
            .test("applicantMiddleName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("applicantMiddleNameSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        applicantLastName: yup.string()
            .test("applicantLastName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("applicantLastNameNoSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        coapplicantFirstName: yup.string().required('Name is required')
            .test('coapplicantFirstName', 'Name must not exceed 30 characters', (value) => {
                return !value || value.length <= 50;
            })
            .test('coapplicantFirstNameNoSpecialChars', 'Name must not contain special characters or numbers', (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        coapplicantMiddleName: yup.string()
            .test("coapplicantMiddleName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("coapplicantMiddleNameSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        coapplicantLastName: yup.string()
            .test("coapplicantLastName", "Name must not exceed 30 characters", (value) => {
                if (!value) {
                    return true;
                }
                return value.length <= 30;
            })
            .test("coapplicantLastNameNoSpecialChars", "Name must not contain special characters or numbers", (value) => {
                return !value || /^[A-Za-z\s]*$/.test(value);
            }),
        acceptTerms: yup
            .boolean()
            .oneOf([true], "Please acknowledge the terms and conditions"),
    });

    const getValidationSchema = () => {
        if (genericGetDocData.UpdateApplicant && !genericGetDocData.UpdateCoApplicant) {
            return validationSchemaApplicant
        }
        if (genericGetDocData.UpdateCoApplicant && !genericGetDocData.UpdateApplicant) {
            return validationSchemaCoApplicant
        }
        if (genericGetDocData.UpdateCoApplicant && genericGetDocData.UpdateApplicant) {
            return validationSchemaBoth
        }
    };

    const initialOtpValues = {
        mobileNumber: "",
        oneTimePassword: "",
    };

    const handleClose = () => {
        setShowToasterMsg(false);
    };
    const otpCounter = () => {
        dispatch(clearGenericOtpState())
        let timeleft = 90;
        var downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
            }
            setCountOtp(timeleft);
            timeleft -= 1;
        }, 1000);
    };

    const validateOTP = (value) => {
        let error;
        if (!value) {
            error = t("projectCard.otpReqText");
        } else if (!/^[0-9]{6}$/i.test(value)) {
            error = t("projectCard.otpReqText");
        }
        return error;
    };

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false);
        // dispatch(genericGetDocuments(localStorage.getItem('reqType')))

        let insertData = []
        if (genericGetDocData.UpdateApplicant && !genericGetDocData.UpdateCoApplicant) {
            SetApplicantNewName(`${values.applicantFirstName} ${values.applicantMiddleName} ${values.applicantLastName}`);
            insertData = [{
                "ReqType": "UpdateApplicant",
                // "Salutation": values.applicantSalutation,
                "FullName": values.applicantFirstName,
                // "MiddleName": values.applicantMiddleName,
                // "LastName": values.applicantLastName,
                // "accept_terms": values?.acceptTerms,
            }];
        }
        if (genericGetDocData.UpdateCoApplicant && !genericGetDocData.UpdateApplicant) {
            SetCoApplicantNewName(`${values.coapplicantFirstName} ${values.coapplicantMiddleName} ${values.coapplicantLastName}`)
            insertData = [{
                "ReqType": "UpdateCoApplicant",
                // "Salutation": values.coapplicantSalutation,
                "FullName": values.coapplicantFirstName,
                // "MiddleName": values.coapplicantMiddleName,
                // "LastName": values.coapplicantLastName,
                // "accept_terms": values?.acceptTerms,
            }];
        }
        if (genericGetDocData.UpdateCoApplicant && genericGetDocData.UpdateApplicant) {
            SetApplicantNewName(`${values.applicantFirstName} ${values.applicantMiddleName} ${values.applicantLastName}`);
            SetCoApplicantNewName(`${values.coapplicantFirstName} ${values.coapplicantMiddleName} ${values.coapplicantLastName}`)
            insertData = [{
                "ReqType": "UpdateApplicant",
                // "Salutation": values.applicantSalutation,
                "FullName": values.applicantFirstName,
                // "MiddleName": values.applicantMiddleName,
                // "LastName": values.applicantLastName,
                // "accept_terms": values?.acceptTerms,
            },
            {
                "ReqType": "UpdateCoApplicant",
                // "Salutation": values.coapplicantSalutation,
                "FullName": values.coapplicantFirstName,
                // "MiddleName": values.coapplicantMiddleName,
                // "LastName": values.coapplicantLastName,
                // "accept_terms": values?.acceptTerms,
            }];
        };
        setChangeData(insertData);
        if (isAllDocsUploaded == false) {
            setUploadDialog(true);
        } else {
            setConfirmChange(true);
        }
    };

    useEffect(() => {
        let is_uploaded = true;
        if (allDocumentList.length > 0) {
            for (let i = 0; i < allDocumentList.length; i++) {
                const element = allDocumentList[i];
                if (element.IsUploaded === 0 && element.IsRequired == 1) {
                    is_uploaded = false;
                    break;
                }
            }
            setIsAllDocsUploaded(is_uploaded);
        }
    }, [confirmChange, allDocumentList]);


    useEffect(() => {
        if (isSuccessSendOtp) {
            setTimeout(() => setResenOtpText(true), 90000);
            setIsGeneratedOtp(true);
            otpCounter();
            dispatch(clearGenericOtpState())
        }
    }, [dispatch, t, isSuccessSendOtp, otpCounter])


    const sendOtp = () => {
        dispatch(sendGenericOtp("user_change_name"));
    }

    const resendOtp = () => {
        dispatch(sendGenericOtp("user_change_name"));
        setResenOtpText(false);
        setTimeout(() => setResenOtpText(true), 90000);
    };

    const onOtpSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        if (values.oneTimePassword) {
            // setConfirmChange(false);
            createRequest(values.oneTimePassword);
        }
    };

    const createRequest = (otp) => {
        if (changeData && otp) {
            let finalData = {
                ApplicantId: localStorage.getItem("applicantId"),
                Lang: localStorage.getItem("i18nextLng"),
                UpdateReq: changeData,
                type: "user_change_name",
                otp: otp.toString(),
                reason: reasonValue
            };
            dispatch(genericUpdateReq(finalData));
        }
    };

    // useEffect(() => {
    //     if (isSuccessGenericUpdateReq) {
    //         dispatch(clearGenericGetDocState());
    //         alert(genericUpdateReqData)
    //         // dispatch(GetCancelStatus());
    //     }
    // }, [isSuccessGenericUpdateReq])

    useEffect(() => {
        if (isSuccessGenericUpdateReq && genericUpdateReqData) {
            dispatch(clearGenericGetDocState());
            dispatch(ApplicantReqHistory());
            setFlag(true)

        }
    }, [isSuccessGenericUpdateReq, genericUpdateReqData]);

    useEffect(() => {
        if (isSuccessGetReqHistory && getReqHistoryData && flag) {
            setConfirmChange(false);
            setShowForm(false);
            setChangeNameState(1);
        }
    }, [isSuccessGetReqHistory, getReqHistoryData, flag])

    return (
        <Box>
            {(downloadLoading || isFetchingGenericGetDoc || isFetchingGetReqHistory) && <Loading isOpen={(downloadLoading || isFetchingGenericGetDoc || isFetchingGetReqHistory)} />}
            <Grid container alignItems="center" >
                <IconButton
                    aria-label="close"
                    onClick={() => { setChangeNameState(1); dispatch(clearGenericGetDocState()); setShowForm(false) }}
                    style={{ marginRight: 8 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h6' className={classes.cancelTittle}>
                    Change Name
                    <br />
                    {/* <Typography variant='body2'>Cancellation of your flat booking may result in a penalty.</Typography> */}
                </Typography>
            </Grid>
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={getValidationSchema()}
                onSubmit={onSubmit}
                innerRef={formikRef}
                enableReinitialize
            >
                {({ submitForm, setFieldValue, touched, errors, values }) => (
                    <Form noValidate autoComplete="off" className={classes.formContainer}>
                        {genericGetDocData.UpdateApplicant && <div className={classes.formSection}>
                            <Paper elevation={3} className={classes.projectSection}>
                                <Typography variant="h6">First Applicant</Typography>
                            </Paper>
                            <Box display='flex' marginX={4} padding={2} xs={12} flexDirection='column' className={classes.applicationBox} justifyContent="space-between">
                                <Grid container xs={12} alignItems="center">
                                    <Typography style={{ fontSize: "1.2rem" }}>Current Name:&nbsp;</Typography>
                                    <Typography style={{ fontSize: "1.3rem", fontWeight: 600 }}>{applicantData.FirstName}</Typography>
                                </Grid>
                                <Divider variant="middle" style={{ margin: "16px 0" }} />
                                <Grid item xs={12}>
                                    <Typography style={{ fontSize: "1.2rem" }}>Enter your New Name:</Typography>
                                    <Grid container xs={12}>
                                        {/* <Grid item xs={2} style={{ marginRight: 16 }}>
                                            <LocalFormControl
                                                control="selectbox"
                                                variant="outlined"
                                                name="applicantSalutation"
                                                label={"Tittle"}
                                                options={salutationOptions}
                                                onChange={(e) => {
                                                    const formik = formikRef.current;
                                                    // formik.resetForm();
                                                    setFieldValue(
                                                        "applicantSalutation",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Grid> */}
                                        <Grid container justifyContent="space-between" spacing={2}>
                                            <Grid item xs={12}>
                                                <LocalFormControl
                                                    control="input"
                                                    variant="outlined"
                                                    label="Full Name"
                                                    placeholder="Full Name"
                                                    name="applicantFirstName"
                                                    type="text"
                                                    id="applicantFirstName"
                                                    inputProps={{
                                                        maxLength: 50,
                                                    }}
                                                    required
                                                />
                                            </Grid>
                                            {/* <Grid item md={4} xs={6}>
                                                <LocalFormControl
                                                    control="input"
                                                    variant="outlined"
                                                    label="Middle Name"
                                                    placeholder="Middle Name"
                                                    name="applicantMiddleName"
                                                    type="text"
                                                    id="applicantMiddleName"
                                                    inputProps={{
                                                        maxLength: 30,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={6}>
                                                <LocalFormControl
                                                    control="input"
                                                    variant="outlined"
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    name="applicantLastName"
                                                    type="text"
                                                    id="applicantLastName"
                                                    inputProps={{
                                                        maxLength: 30,
                                                    }}
                                                />
                                            </Grid> */}
                                            {(values.applicantSalutation || values.applicantFirstName || values.applicantMiddleName || values.applicantLastName) && <Box display='flex' marginLeft={2} alignItems='center'>
                                                <Typography style={{ fontSize: "1.1rem" }}>New Name:&nbsp;</Typography>
                                                <Typography style={{ fontSize: "1.2rem", fontWeight: 600, wordBreak: "break-all" }}>{`${values.applicantSalutation || ""} ${values.applicantFirstName || ""} ${values.applicantMiddleName || ""} ${values.applicantLastName || ""}`}</Typography>
                                            </Box>}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Divider variant="middle" style={{ margin: "16px 0" }} />
                                <Typography style={{ fontSize: "1.2rem" }}>Upload Documents:</Typography>
                                {genericGetDocData.UpdateApplicant && <DocumentUploadBox documentCardList={genericGetDocData.UpdateApplicant} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} type={"UpdateApplicant"} inVerication={false} />}
                            </Box>
                        </div>}
                        {genericGetDocData.UpdateCoApplicant && <div className={classes.formSection}>
                            <Paper elevation={3} className={classes.projectSection}>
                                <Typography variant="h6">Co-Applicant</Typography>
                            </Paper>
                            <Box display='flex' marginX={4} padding={2} xs={12} flexDirection='column' className={classes.applicationBox} justifyContent="space-between">
                                <Grid container xs={12} alignItems="center">
                                    <Typography style={{ fontSize: "1.2rem" }}>Co-Applicant's Current Name:&nbsp;</Typography>
                                    <Typography style={{ fontSize: "1.3rem", fontWeight: 600 }}>{applicantData.CoApplicantDetails[0]?.FirstName}</Typography>
                                </Grid>
                                <Divider variant="middle" style={{ margin: "16px 0" }} />
                                <Grid item xs={12}>
                                    <Typography style={{ fontSize: "1.2rem" }}>Enter Co-Applicant's new Name:</Typography>
                                    <Grid container xs={12}>
                                        {/* <Grid item xs={2} style={{ marginRight: 16 }}>
                                            <LocalFormControl
                                                control="selectbox"
                                                variant="outlined"
                                                name="coapplicantSalutation"
                                                label={"Tittle"}
                                                options={salutationOptions}
                                                onChange={(e) => {
                                                    const formik = formikRef.current;
                                                    // formik.resetForm();
                                                    setFieldValue(
                                                        "coapplicantSalutation",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Grid> */}
                                        <Grid container justifyContent="space-between" spacing={2}>
                                            <Grid item xs={12}>
                                                <LocalFormControl
                                                    control="input"
                                                    variant="outlined"
                                                    label="Full Name"
                                                    placeholder="Full Name"
                                                    name="coapplicantFirstName"
                                                    type="text"
                                                    id="coapplicantFirstName"
                                                    inputProps={{
                                                        maxLength: 50,
                                                    }}
                                                    required
                                                />
                                            </Grid>
                                            {/* <Grid item md={4} xs={6}>
                                                <LocalFormControl
                                                    control="input"
                                                    variant="outlined"
                                                    label="Middle Name"
                                                    placeholder="Middle Name"
                                                    name="coapplicantMiddleName"
                                                    type="text"
                                                    id="coapplicantMiddleName"
                                                    inputProps={{
                                                        maxLength: 30,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={6}>
                                                <LocalFormControl
                                                    control="input"
                                                    variant="outlined"
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    name="coapplicantLastName"
                                                    type="text"
                                                    id="coapplicantLastName"
                                                    inputProps={{
                                                        maxLength: 30,
                                                    }}
                                                />
                                            </Grid> */}
                                            {(values.coapplicantSalutation || values.coapplicantFirstName || values.coapplicantMiddleName || values.coapplicantLastName) && <Box display='flex' marginLeft={2} alignItems='center'>
                                                <Typography style={{ fontSize: "1.1rem" }}>Co-Applicant's New Name:&nbsp;</Typography>
                                                <Typography style={{ fontSize: "1.2rem", fontWeight: 600 }}>{`${values.coapplicantSalutation || ""} ${values.coapplicantFirstName || ""} ${values.coapplicantMiddleName || ""} ${values.coapplicantLastName || ""}`}</Typography>
                                            </Box>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider variant="middle" style={{ margin: "16px 0" }} />
                                <Typography style={{ fontSize: "1.2rem" }}>Upload Documents:</Typography>
                                {genericGetDocData.UpdateCoApplicant && <DocumentUploadBox documentCardList={genericGetDocData.UpdateCoApplicant} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} type={"UpdateCoApplicant"} inVerication={false} />}
                            </Box>
                        </div>}
                        <Box className={classes.footerSection}>
                            <LocalFormControl
                                control="checkbox"
                                type="checkbox"
                                name="acceptTerms"
                                id="acceptTerms"
                                label={
                                    <Typography
                                        variant="body1"
                                        className={classes.termsNdCondiCheckBoxLabel}
                                    >
                                        I agree to the <span>Terms and condition</span>.
                                    </Typography>
                                }
                                color="primary"
                            />
                            {/* <Alert icon={false} severity="info" style={{ padding: "0px 16px" }}>
                                By clicking submit you agree to the <span style={{ color: '#007AE7', cursor: "pointer" }}>Terms and condition</span> which include the <span style={{ color: '#007AE7', cursor: "pointer" }}>cancelation and refund policy</span>.
                            </Alert> */}
                        </Box>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={
                                    <WhiteArrowIcon style={{ fill: "transparent" }} />
                                }
                            >
                                {t("Submit")}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={confirmChange} fullWidth={true} className={classes.modelBoxConfirm} >
                {(isFetchingSendOtp || isFetchingGenericUpdateReq) && <Loading isOpen={(isFetchingSendOtp || isFetchingGenericUpdateReq)} />}
                <SnackBox open={(isErrorSendOtp || isErrorGenericUpdateReq)} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {(errorMessageSendOtp || errorMessageGenericUpdateReq)}
                    </Alert>
                </SnackBox>
                <DialogTitle>Confirm your request</DialogTitle>
                <DialogContent dividers>
                    <Grid container direction="column" alignItems="baseline" style={{ paddingBottom: "16px" }}>
                        {applicantNewName && <Typography gutterBottom style={{ fontSize: "1.2rem" }}>New Applicant Name: <span style={{ fontSize: "1.3rem", fontWeight: 600 }}>{applicantNewName}</span></Typography>}
                        {coApplicantNewName && <Typography style={{ fontSize: "1.2rem" }}>New Co-Applicant Name: <span style={{ fontSize: "1.3rem", fontWeight: 600 }}>{coApplicantNewName}</span></Typography>}
                    </Grid>
                    <Grid Container style={{ display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
                        {!isGeneratedOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "65%", fontWeight: "600", marginRight: "130px", visibility: "hidden" }}>{t("projectCard.getOtpButtonText")}</Typography>
                            <DialogActions>
                                <Button autoFocus variant="contained" color="primary" onClick={sendOtp}>
                                    Get OTP
                                </Button>
                                <Button
                                    onClick={() => {
                                        setConfirmChange(false);
                                        dispatch(clearGenericOtpState());
                                    }}
                                    color="primary">
                                    {t("cancelButtonText")}
                                </Button>
                            </DialogActions> </>}
                        {isGeneratedOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "50%" }}>{t("projectCard.sendOtpText")}<span>{`+91 XXXXXX${applicantMobile?.toString().slice(-4)}`}</span></Typography>
                            <Formik
                                initialValues={initialOtpValues}
                                onSubmit={onOtpSubmit}
                                innerRef={formikOtpRef}
                            >
                                {({ submitForm, setFieldValue, values }) => (
                                    <Form className={classes.form} noValidate autoComplete="off">
                                        <LocalFormControl
                                            control="input"
                                            variant="outlined"
                                            label={t("projectCard.enterOtpText")}
                                            placeholder={t("projectCard.enterOtpText")}
                                            name="oneTimePassword"
                                            type="tel"
                                            id="oneTimePassword"
                                            required
                                            inputProps={{ maxLength: 6 }}
                                            validate={validateOTP}
                                        />
                                        {!isResenOtpText && (
                                            <Box textAlign="left">
                                                <Typography
                                                    variant="subtitle2"
                                                    gutterBottom
                                                    style={{ color: "#65707D" }}
                                                >
                                                    {t("projectCard.resendOtpText")} 00:{countOtp} {t("projectCard.sec")}
                                                </Typography>
                                            </Box>
                                        )}
                                        {isResenOtpText && (
                                            <Box display="flex">
                                                <Box marginLeft={1}>
                                                    <Typography variant="body2" gutterBottom>
                                                        <Link
                                                            to="#"
                                                            onClick={() => resendOtp(values.mobileNumber)}
                                                            style={{ textDecoration: "none", color: "#0038C0", fontWeight: 600 }}
                                                        >
                                                            {t("Resend")}
                                                        </Link>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                        <DialogActions>
                                            <Button autoFocus variant="contained" type="submit" color="primary">
                                                {t("projectCard.submitBtn")}
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setConfirmChange(false);
                                                    setIsGeneratedOtp(false);
                                                    dispatch(clearGenericOtpState());
                                                }}
                                                color="primary">
                                                {t("cancelButtonText")}
                                            </Button>
                                        </DialogActions>
                                    </Form>
                                )}
                            </Formik> </>}
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog
                onClose={handleClose}
                className={classes.dialogBox}
                open={documentDialogBoxOpen}
                disableBackdropClick
                fullWidth={true}
                maxWidth="md"
            >
                {selectedDialog && <GenericDocDialogBox
                    handleClose={handleCloseDocBox}
                    afterSubmitCloseHandler={afterSubmitCloseHandler}
                    docData={selectedDialog.type == "UpdateApplicant" ? genericGetDocData.UpdateApplicant.filter((doc) => doc.DocumentId == selectedDialog.docId)[0] : genericGetDocData.UpdateCoApplicant.filter((doc) => doc.DocumentId == selectedDialog.docId)[0]}
                />}
            </Dialog>
            <Dialog
                open={uploadDialog}
                onClose={() => {
                    setUploadDialog(false);
                }}
                aria-labelledby="pmay-dialog"
            >
                <DialogTitle id="pmay-dialog">
                    Please Upload all the document before submitting.
                </DialogTitle>
                <DialogActions>
                    <Button
                        autoFocus
                        color="primary"
                        onClick={() => {
                            setUploadDialog(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default ChangeNameStage2;