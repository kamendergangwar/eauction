import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormHelperText, FormLabel, Grid, Hidden, IconButton, Paper, Snackbar, Typography, withWidth } from '@material-ui/core';
import React, { useEffect } from 'react'
import { ErrorMessage, Form, Formik } from 'formik';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { GenericDocSliceSelector, genericGetDocuments } from '../../../../../redux/features/UttilSlice/genericDocumentSlice';
import { useState } from 'react';
import { LoanApplicationStyle } from '../LoanApplication.style';
import { applicantSelector, clearApplicantState, getApplicant } from '../../../../../redux/features/applicant/ApplicantSlice';
import { NocApplicationSelector, addEditNocApplication, clearNocApplication } from '../../../../../redux/features/noc/NocSlice';
import { flatPaymentCreateTrans, flatPaymentSbiTransmode, razorpayPaymentGatewaySelector } from '../../../../../redux/features/transaction/RazorpayPaymentSlice';
import Loading from '../../../../atoms/Loading/Loading';
import FormControl from '../../../../molecules/FormControl/FormControl';
import DocumentUploadBox from '../../../../atoms/DocumentUploadBox/DocumentUploadBox';
import { clearDocumentImageUrl, clearFileState, clearImageUrl, clearOtherFile } from '../../../../../redux/features/file/FileUploadSlice';
import GenericDocDialogBox from '../../../../molecules/DialogBoxes/UploadDocumentDialogBox/GenericDocDialogBox/GenericDocDialogBox';
import SendIcon from '@material-ui/icons/Send';
import InfoIcon from '@material-ui/icons/Info';
import AlertBox from '../../../../atoms/AlertBox/AlertBox';
import { GetApp } from '@material-ui/icons';
import { ApiEndPoint } from '../../../../../utils/Common';

const NocStage1 = (props) => {
    const { setNocStage } = props;
    const { t } = useTranslation("DocumentsPageTrans");
    const classes = LoanApplicationStyle();
    const [formValues, setFormValues] = React.useState(null);
    const [paymentGateway, setPaymentGateway] = React.useState({});
    const [inProcessTrans, setInProcessTrans] = React.useState(false)
    const [nocApplicationFile, setNocApplicationFile] = React.useState("")
    const [sanctionLetterFile, setSanctionLetterFile] = React.useState("")
    const [fileUploadLoaderState, setFileUploadLoaderState] = React.useState("");
    const [banksList, setBanksList] = React.useState([]);
    const [nocApplicationDetails, setNocApplicationDetails] = React.useState([]);
    const [activeNocApplicationId, setActiveNocApplicationId] = React.useState('');
    const [disableEdit, setDisableEdit] = React.useState(false);
    const [displayError, setDisplayError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isPmay, setIsPmay] = React.useState(0);
    const [applicationId, setApplicationId] = React.useState(null);
    const [allDocumentList, setAllDocumentList] = useState([]);
    const formikRef = React.useRef();
    const history = useHistory();
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [documentDialogBoxOpen, setDocumentDialogBoxOpen] = useState(false);
    const [isAllDocsUploaded, setIsAllDocsUploaded] = useState(false);
    const [uploadDialog, setUploadDialog] = useState(false);
    const [sanctionLetter, setSanctionLetter] = React.useState(null);
    const [downloadLoading, setdownloadLoading] = useState(false)
    const dispatch = useDispatch();

    const {
        isFetchingApplicant,
        isSuccessResApplicantGet,
        isErrorApplicant,
        isFetchingApplicantGet,
        errorMessage,
        applicantData,
    } = useSelector(applicantSelector);

    const {
        isFetchingUpdateNocApplication,
        isErrorUpdateNocApplication,
        errorMessageUpdateNocApplication,
        isSuccessUpdateNocApplication,
    } = useSelector(NocApplicationSelector);
    const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)

    useEffect(() => {
        const requestData = {
            ApplicantId: localStorage.getItem("applicantId"),
            ReqType: "RequestNOC",
            Lang: localStorage.getItem("i18nextLng"),
        };
        dispatch(genericGetDocuments(requestData));
    }, []);

    useEffect(() => {
        if (isSuccessResApplicantGet) {
            setSanctionLetter(applicantData.ApplicantSanctionLetter[0]?.SanctionLetterFile);
        }
    }, [isSuccessResApplicantGet]);

    useEffect(() => {
        if (isSuccessGenericGetDoc && genericGetDocData) {
            const arrGenericDocData = Object.values(genericGetDocData);
            const combinedDoc = [].concat(...arrGenericDocData);
            setAllDocumentList(combinedDoc);
        }
    }, [genericGetDocData, isSuccessGenericGetDoc])

    const initialValues = {
        bank: "",
    };

    const validationSchema = yup.object({
        bank: yup.string().required("Please Select any one option"),
    })

    React.useEffect(() => {
        dispatch(getApplicant());
        dispatch(clearNocApplication())
    }, []);

    React.useEffect(() => {
        if (isSuccessResApplicantGet) {
            setIsPmay(applicantData.is_pmy);
            setApplicationId(applicantData.SavedApplicationDetails[0]?.ApplicationId);
        }
    }, [isSuccessResApplicantGet])


    React.useEffect(() => {
        axios.get(`https://cidcohomes.com/wp-json/wp/v2/categories?lang=en&category=2&banking_partners=1&restapi=1`)
            .then((res) => {
                var data = res?.data;
                if (data) {
                    var status = data?.status;
                    if (status === '200') {
                        setBanksList((typeof data?.banks === 'object' && Object.getPrototypeOf(data?.banks).isPrototypeOf(Object)) ? Object.keys(data?.banks).map((bankitem, bankkey) => ({ value: data?.banks[bankitem]?.id, label: data?.banks[bankitem]?.title })) : [])
                    }
                }
            });
    }, []);


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
            ReqType: "RequestNOC",
            Lang: localStorage.getItem("i18nextLng"),
        };
        dispatch(genericGetDocuments(requestData))
        dispatch(clearImageUrl());
        dispatch(clearDocumentImageUrl());
        dispatch(clearOtherFile());
        dispatch(clearFileState());
        setDocumentDialogBoxOpen(false);
    };

    // React.useEffect(() => {
    //     if (isSuccessUpdateNocApplication) {
    //         setNocStage(0);
    //         // history.push('/dashboard')
    //     }
    // }, [isSuccessUpdateNocApplication]);


    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false);
        let insertData = {
            "Bank": values.bank,
            "Is_pmay": isPmay,
        }
        if (isAllDocsUploaded == false) {
            setUploadDialog(true);
        } else {
            dispatch(addEditNocApplication(insertData));
        }
    }

    const handleClose = () => {
        setDocumentDialogBoxOpen(false);
    }

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
    }, [allDocumentList]);

    useEffect(() => {
        if (isSuccessUpdateNocApplication) {
            setOpen(true);
        }
    }, [isSuccessUpdateNocApplication]);

    const downloadSanctionLetter = (sanctionLetter) => {
        var item = sanctionLetter;
        var lastItem = item.split("/").pop();

        setdownloadLoading(true)
        fetch(`${ApiEndPoint}/FileUpload/getAWSPrivateDocFileDownload?fileName=${lastItem}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        }).then((response) => response.blob()).then((blob) => {
            setdownloadLoading(false)

            console.log(blob);

            // Create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.substring(item.lastIndexOf('/') + 1).split('?')[0]);
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
    };

    return (
        <Paper elevation={3}>
            {(banksList.length < 1 || isFetchingGenericGetDoc || isFetchingUpdateNocApplication || downloadLoading) && (
                <Loading isOpen={banksList.length < 1 || isFetchingGenericGetDoc || isFetchingUpdateNocApplication || downloadLoading} />
            )}
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                innerRef={formikRef}
            >
                {({ submitForm, setFieldValue, touched, errors, values }) => (
                    <Form noValidate autoComplete="off" className={classes.formContainer}>
                        <div className={classes.formSection}>
                            {/* <Typography variant='h6' style={{ padding: 8, textAlign: "center" }}>Request for CIDCO NOC</Typography> */}
                            <Grid container justifyContent='center' style={{ marginBottom: 15 }}>
                                <Grid xs={10} item style={{ marginTop: 16 }}>
                                    {/* <FormHelperText>Select Bank</FormHelperText> */}
                                    <FormControl
                                        control="selectbox"
                                        variant="outlined"
                                        name="bank"
                                        label={t("Select Bank")}
                                        placeholder={t("Select Bank")}
                                        options={banksList}
                                        disabled={disableEdit}
                                        required
                                    />
                                </Grid>
                                <Grid xs={10} item>
                                    <Divider variant="middle" style={{ margin: "16px 0" }} />
                                    <Typography style={{ fontSize: "1.2rem" }}>Upload Documents:</Typography>
                                    {sanctionLetter && (
                                        <Button variant='text' color='primary' style={{ paddingTop: 0 }} endIcon={<GetApp />} onClick={() => downloadSanctionLetter(sanctionLetter)} >Download Sanction Letter</Button>
                                    )}
                                    {allDocumentList.length > 0 && <DocumentUploadBox documentCardList={allDocumentList} setSelectedDialog={setSelectedDialog} setDocumentDialogBoxOpen={setDocumentDialogBoxOpen} type={"RequestNOC"} inVerication={false} />}
                                </Grid>
                                {isErrorUpdateNocApplication && (
                                    <AlertBox severity="error" style={{ margin: 10 }}>{errorMessageUpdateNocApplication}</AlertBox>
                                )}
                                <Grid item xs={10} container justifyContent="flex-end" style={{ margin: 12 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        endIcon={<SendIcon />}
                                    >
                                        {t("Submit")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Form>
                )}
            </Formik>
            <Dialog open={open} maxWidth="sm" fullWidth >
                <DialogTitle sx={{ m: 0, p: 1 }} style={{ padding: "8px 24px 0 24px" }}>
                    <Grid container xs={12}>
                        <Grid item xs={11} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}></Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Box paddingBottom={3}>
                        <Typography variant="h6" style={{ fontWeight: "700" }}>You have successfully applied for Mortgage NOC.</Typography>
                        {
                            <Box>
                                <ol>
                                    <li>Once the verification of your documents is completed, the NOC letter will be available to you within 2 to 3 business days.</li>
                                    <li>Non-PMAY customers are required to pay ₹ 250 + GST after their documents have been verified.</li>
                                </ol>

                                <Typography variant="subtitle2">Once your payment is recieved the Mortgage NOC will be available for you to download in 4/5 business days.</Typography>
                            </Box>
                        }
                    </Box>
                    <Box paddingY={3} textAlign="center">
                        <Button onClick={() => { setOpen(false); setNocStage(0); }} variant="contained" color="primary" >Close</Button>
                    </Box>
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
                    reqType={"RequestNOC"}
                    docData={selectedDialog.type == "RequestNOC" && genericGetDocData.RequestNOC.filter((doc) => doc.DocumentId == selectedDialog.docId)[0]}
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
        </Paper>
    )
};

export default withWidth()(NocStage1);