import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton, Button, FormControlLabel, FormHelperText, TableContainer, Paper, Table, TableHead, TableRow, TableCell, withStyles, TableBody, FormControl, FormLabel, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { WhiteArrowIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { ChangeNameStyle } from "../ChangeNameStyle.style";
import LocalFormControl from "../../../../../molecules/FormControl/FormControl";
import { Form, Formik } from "formik";
import CloseIcon from "@material-ui/icons/Close";
import * as yup from "yup";
import { GenericDocSliceSelector, genericGetDocuments } from "../../../../../../redux/features/UttilSlice/genericDocumentSlice";
import Loading from "../../../../../atoms/Loading/Loading";
import AlertBox from "../../../../../atoms/AlertBox/AlertBox";
import { clearGenericUpdateReqState } from "../../../../../../redux/features/UttilSlice/genericUpdateReqSlice";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


function ChangeNameStage1(props) {
    const { setChangeNameState, setShowForm, applicantData, setReasonValue } = props;
    const [open, setOpen] = useState(false);
    const classes = ChangeNameStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [changeOption, setChangeOption] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const { isFetchingGenericGetDoc, isSuccessGenericGetDoc, isErrorGenericGetDoc, genericGetDocData, errorMessageGenericGetDoc } = useSelector(GenericDocSliceSelector)
    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (applicantData.CoApplicantDetails.length > 0) {
            setChangeOption([{ value: "UpdateApplicant", label: "Main Applicant" }, { value: "UpdateCoApplicant", label: "Co-Applicant" }])
        } else {
            setChangeOption([{ value: "UpdateApplicant", label: "Main Applicant" }, { value: "UpdateCoApplicant", label: "Co-Applicant", disabled: true }])
        }
    }, [applicantData])

    useEffect(() => {
        dispatch(clearGenericUpdateReqState());
    }, [])

    const initialValues = {
        reqType: [],
        acceptTerms: false
    };

    const validationSchema = yup.object().shape({
        reqType: yup
            .array()
            .min(1, t("Please Select option")),
        reason: yup
            .string().required("Enter your reason for name change")
            .test("reason", "Reason must not exceed 80 characters", (value) => {
                return value && value.length <= 80;
            })
            .test("reasonNoSpecialChars", "Reason must not contain special characters", (value) => {
                return !/[!@#$%^&*(),.?":{}|<>]/g.test(value);
            })
            .test("reasonMinLength", "Reason must be at least 10 characters", (value) => {
                return value && value.length >= 10;
            }),
        acceptTerms: yup
            .boolean()
            .oneOf([true], "Please acknowledge the terms and conditions"),
    });

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false);
        const sendData = values.reqType.join(',');
        localStorage.setItem('reqType', sendData)
        const requestData = {
            ApplicantId: localStorage.getItem("applicantId"),
            ReqType: sendData,
            Lang: localStorage.getItem("i18nextLng"),
        };
        setReasonValue(values?.reason);
        dispatch(genericGetDocuments(requestData));
        setChangeNameState(2);
        setOpenForm(true);
    };

    useEffect(() => {
        if (isSuccessGenericGetDoc && genericGetDocData && openForm) {
            setChangeNameState(2)
        }
    }, [isSuccessGenericGetDoc, openForm])

    return (
        <Paper elevation={3} className={classes.tableContainer}>
            {isFetchingGenericGetDoc && <Loading isOpen={isFetchingGenericGetDoc} />}
            <Box display='flex' flexDirection='column' paddingX={4} paddingY={1}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ submitForm }) => (
                        <Form noValidate autoComplete="off" className={classes.catFormSection}>
                            <Box marginBottom={4}>
                                <FormLabel component="legend">Please select applicant for which you have to change name.</FormLabel>
                                <LocalFormControl
                                    control="checkboxgroup"
                                    name="reqType"
                                    options={changeOption}
                                    direction="row"
                                />
                                <Grid item xs={12}>
                                    <LocalFormControl
                                        control="input"
                                        variant="outlined"
                                        label="Enter your reason for name change"
                                        placeholder="Enter your reason for name change"
                                        name="reason"
                                        type="text"
                                        id="reason"
                                        required
                                    />
                                </Grid>
                            </Box>
                            <Grid item xs={12}>
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
                                            I have read all the <span
                                                onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                                            >instructions</span>, and I agree to all the terms and conditions.
                                        </Typography>
                                    }
                                    color="primary"
                                />
                            </Grid>
                            <Grid xs={12} container justifyContent="center" style={{ gap: 20 }}>
                                <Button color="primary" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                                    className={classes.proceedBtn}
                                >
                                    Procced
                                </Button>

                            </Grid>
                        </Form>)}
                </Formik>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle disableTypography className={classes.dialogHeader}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item xs="auto">
                            <IconButton
                                aria-label="close"
                                className={classes.closeButton}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Box className={classes.dialogContainer} style={{ padding: 0 }}>
                        <ol style={{ fontSize: 15, lineHeight: 2 }}>
                            <li><strong>Eligibility and Scope:</strong> The change name form request is applicable for both the first applicant and co-applicant, provided that a co-applicant has been added to the account. This form allows customers to request a name change on their account.</li>
                            <li><strong>Required Documents:</strong> To initiate the name change process, customers must upload a scanned copy of their new Aadhaar card and an affidavit(On Rs.100/- stamp paper, duly notarized) supporting the name change. These documents are essential for the verification process.</li>
                            <li><strong>Document Verification:</strong> Once the necessary documents are submitted, our team will conduct a thorough verification process to ensure the authenticity of the request. The verification process is aimed at maintaining the security and integrity of customer accounts.</li>
                            <li><strong>Fee Structure:</strong> Customers will be charged a nominal fee for the name change request only if the name change is considered major. Examples of major name changes include:
                                <ul>
                                    <li>Complete name change due to marriage, divorce, or legal name change.</li>
                                    <li>Change in the first or last name, resulting in a significant alteration in the overall name structure.</li>
                                    <li>Switching to a completely different name or alias.</li>
                                </ul>
                                For such major name changes, a processing fee of <strong>₹ 5000 plus applicable GST</strong> will be charged post verification of the submitted documents.
                                <br />
                                However, for minor changes in the name, such as small corrections in spelling or minor typographical errors, no fees will be charged. These include:
                                <ul>
                                    <li>Correcting a minor typo, such as a misspelled letter in the first name or last name.</li>
                                    <li>Fixing a minor formatting issue, like the capitalization of a letter in the name.</li>
                                </ul>
                                In case of any doubt about whether the name change is major or minor, our customer support team will be available to guide and assist throughout the process.
                            </li>
                            <li><strong>Approval and Confirmation:</strong> After successful document verification and payment of ₹ 5000 plus GST for a major name change, customers will receive a confirmation notification via email or SMS. The updated name will be reflected in all relevant documents and communications moving forward.</li>
                            {/* <li>We recommend reviewing our terms and conditions for cancellations and modifications for a more detailed understanding of our policies.</li> */}
                        </ol>
                    </Box>
                </DialogContent>
            </Dialog>
            {(isErrorGenericGetDoc) && <AlertBox severity="error">{errorMessageGenericGetDoc}</AlertBox>}
        </Paper >
    );
}

export default ChangeNameStage1;