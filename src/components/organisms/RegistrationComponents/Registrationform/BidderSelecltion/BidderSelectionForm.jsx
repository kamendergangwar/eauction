import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Collapse,
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
    makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { initialPagesStyles } from "../../../InitialPagesComponents/InitialPages.styles";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import FormControl from "../../../../molecules/FormControl/FormControl";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    applicantSelector,
    clearApplicantState,
    getApplicant,
    getDistrict,
    getState,
    getstaeCityByPinCode,
} from "../../../../../redux/features/applicant/ApplicantSlice";
import { PmayNonPmaySelector, RegisterBidderType } from "../../../../../redux/features/pmayNonPmay/pmayNonPmaySlice";
import { RegistrationStepperSave } from "../../../../../redux/features/registration/registrationStepperSlice";
import { NonIndividualSelector, getBidderSelectionData } from "../../../../../redux/features/eauction/nonIndividualSlice";

function BidderSelectionForm(props) {
    const { active } = props;
    const {
        isFetchingApplicantAdd,
        isSuccessReqApplicantAdd,
        isErrorApplicantAdd,
        errorMessageAdd,
        isSuccessResApplicantAdd,
        isFetchingApplicantGet,
        isSuccessResApplicantGet,
        applicantData,
        isSuccessResStateCity,
        StateCityData,
        isSuccessResState,
        StateData,
        isSuccessResDistrict,
        DistrictData,
    } = useSelector(applicantSelector);
    const {

        isFetchingGetBidderData,
        isSuccessGetBidderData,
        isErrorGetBidderData,
        getBidderData,
        errorMessageGetBidderData,

    } = useSelector(NonIndividualSelector);
    const { isFetchingBidder,
        isSuccessBidder } = useSelector(PmayNonPmaySelector)

    const formikRef = useRef();
    const { t } = useTranslation("InitialPageTrans");
    const [bidderSelected, setBidderSelected] = useState("");
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [stepCompleted, setIsStepCompleted] = useState(false)
    const [formEditIs, setFormEditIs] = useState(false);
    const isIndividualBidder = bidderSelected === "Individual";
    const [stateList, setStateList] = useState([]);
    const [districList, setDistricList] = useState([]);
    const [countries, setCountries] = useState([
        { value: "India", label: "India" },
    ]);
    const [formValues, setFormValues] = useState({
        bidder_type: "",
        entity_name: "",
        gst_number: "",
        registration_no: "",
        business_type: [],
        permanant_addrs: "",
        bid_country: "",
        bid_state: "",
        bid_city: "",
        pin_code: "",
        bid_district: "",
    });


    const [bidderArray, setBidderArray] = useState([
        { value: "Individual", label: "Individual" },
        { value: "Company", label: "Company" },
        { value: "Cooperative Society", label: "Cooperative Society" },
        { value: "Hospital", label: "Hospital" },
        { value: "LLP", label: "LLP" },
        { value: "Partnership", label: "Partnership" },
        { value: "Propritorship", label: "Propritorship" },
        { value: "Public Trust", label: "Public Trust" },
    ]);
    const [businessTypeArray, setBusinessTypeArray] = useState([
        { value: 0, label: "Manufacturer" },
        { value: 1, label: "Buying Office" },
        { value: 2, label: "Agent" },
        { value: 3, label: "Government" },
        { value: 4, label: "Service" },
        { value: 5, label: "Wholesaler" },
        { value: 6, label: "Diversified" },
        { value: 7, label: "Retailer" },
        { value: 8, label: "Importer" },
        { value: 9, label: " Exporter" },
        { value: 10, label: "Distributor" },
        { value: 11, label: "Trading Company" },
        { value: 12, label: "Construction" },
    ]);
    // const fetchCountries = async () => {
    //     try {
    //         const response = await fetch("https://countriesnow.space/api/v0.1/countries/iso");

    //         if (response.ok) {
    //             const data = await response.json();
    //             setCountries(data);
    //         } else {
    //             console.error(`Error: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchCountries();
    // }, []);

    useEffect(() => {
        if (isSuccessBidder) {
            dispatch(RegistrationStepperSave("2"))
        }
    }, [isSuccessBidder]);

    useEffect(() => {
        setIsStepCompleted(active > 1)
        setFormEditIs(active > 1)
    }, [active])
    useEffect(() => {
        dispatch(getBidderSelectionData());
    }, [])


    useEffect(() => {
        if (isSuccessGetBidderData && getBidderData.length !== 0)  {

            const { bidder_type, entity_name, gst_number, registration_no, business_type, permanant_addrs, bid_country, bid_state, bid_city, pin_code, bid_district } = getBidderData[0];
            const formattedBusinessType = business_type ? business_type.split(',').map(type => type.trim()) : [];
           
            setBidderSelected(bidder_type);
            setSelectedValues(formattedBusinessType);
            setFormValues({
                bidder_type,
                entity_name,
                gst_number,
                registration_no,
                business_type: formattedBusinessType,
                permanant_addrs,
                bid_country,
                bid_state,
                bid_city,
                pin_code,
                bid_district,
            });
        }
    }, [isSuccessGetBidderData]);
 


    useEffect(() => {
        let StateArray = [];
        let DistrictArray = [];
        if (isSuccessResState) {
            if (StateData) {
                StateData.forEach((element) => {
                    StateArray.push({ value: element.State, label: element.State });
                });
                setStateList(StateArray);
            }
        }

        if (isSuccessResDistrict) {
            if (DistrictData) {
                DistrictData.forEach((item) => {
                    DistrictArray.push({ value: item.District, label: item.District });
                });
                setDistricList(DistrictArray);
            }
        }
    }, [isSuccessResState, isSuccessResDistrict]);
    useEffect(() => {
        if (isSuccessResApplicantAdd) {
            refreshData();
            dispatch(clearApplicantState());
        }
    }, [isSuccessResApplicantAdd]);

    const refreshData = () => {
        dispatch(getApplicant());
    };

    useEffect(() => {
        dispatch(getState());
        dispatch(getDistrict());
    }, []);


    useEffect(() => {
        if (isSuccessResStateCity) {
            // let pin_code = applicantData.PresentPincode;

            let pin_code;
            if (StateCityData.PinCode) {
                if (StateCityData.PinCode !== "0") {
                    pin_code = StateCityData.PinCode;
                } else {
                    pin_code = "";
                }
            }

            let state_val;
            if (StateCityData.State) {
                state_val = StateCityData.State;
            } else {
                state_val = "";
            }

            let dis_val;
            if (StateCityData.District) {
                dis_val = StateCityData.District;
            } else {
                dis_val = "";
            }

            const savedValues = {
                ...formikRef.current.values,
                permanant_addrs: formikRef.current.values.permanant_addrs,
                pin_code: pin_code,
                bid_city: formikRef.current.values.bid_city,
                bid_district: dis_val,
                bid_state: state_val,
                bid_country: formikRef.current.values.bid_country,
                business_type: formikRef.current.values.business_type.join(", "),
            };

            setFormValues(savedValues);
            dispatch(clearApplicantState());
        }
    }, [isSuccessResStateCity, StateCityData]);

    useEffect(() => {
        if (isSuccessResApplicantGet) {
            let pin_code;
            if (applicantData.PresentPincode) {
                if (applicantData.PresentPincode !== "0") {
                    pin_code = applicantData.PresentPincode;
                } else {
                    pin_code = "";
                }
            }
            let city_town;
            if (applicantData.PresentCity) {
                if (applicantData.PresentCity !== "0") {
                    city_town = applicantData.PresentCity;
                } else {
                    city_town = "";
                }
            }
            let district_val;
            if (applicantData.PresentDistrict) {
                if (applicantData.PresentDistrict !== "0") {
                    district_val = applicantData.PresentDistrict;
                } else {
                    district_val = "";
                }
            }
            let state_val;
            if (applicantData.PresentState) {
                if (applicantData.PresentState !== "0") {
                    state_val = applicantData.PresentState;
                } else {
                    state_val = "";
                }
            }

            if (pin_code && city_town && district_val && state_val) {
                const savedValues = {
                    pincode: pin_code,
                    village: city_town,
                    district: district_val,
                    state: state_val,
                };

                setFormValues(savedValues);
            }
        }
    }, [applicantData, isSuccessResApplicantGet]);

    const handleMultiSelectChange = (event) => {
        setSelectedValues(event.target.value);
        console.log(selectedValues, "sdfsfsd");
    };


    const handleDelete = (itemToDelete) => {
       
        if (!formEditIs) {
            setSelectedValues((prevItems) =>
                prevItems.filter((item) => item !== itemToDelete)
            );
        }
    };


    const validationSchema = yup.object().shape({
        ...(bidderSelected !== "Individual" && {
            bidder_type: yup.string().required("Bidder type is required"),
            entity_name: yup.string().required("Entity name is required"),
            gst_number:  yup
            .string()
            .matches(
              /^[0-9A-Za-z]{15}$/,
              t("authVerifyAadhaarForm.formControl.aadhaarNumErrors.limitation")
            )
            .required(
              t("authVerifyAadhaarForm.formControl.aadhaarNumErrors.required")
            ),
            registration_no: yup.string().required("Registration No is required"),
            // business_type: yup
            //     .array()
            //     .min(1, "Select at least one business type")
            //     .required("Business type is required"),
            permanant_addrs: yup.string().required("Permanent address is required"),
            bid_country: yup.string().required("Country is required"),
            bid_state: yup.string().required("State is required"),
            bid_city: yup.string().required("City is required"),
            pin_code: yup
                .string()
                .required("Pincode is required")
                .matches(/^\d{6}$/, "Invalid Pincode"),
            bid_district: yup.string().required("District is required"),
        }),
    });

    const classes = initialPagesStyles();
    const dispatch = useDispatch();

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        const data = {
            ...values,
            business_type: selectedValues.join(',')
        }
        dispatch(RegisterBidderType(data));
    };

    const autoCompletePincode = (event) => {
        let pin_code = event.target.value;
        if (pin_code.length == 6) {
            dispatch(getstaeCityByPinCode(pin_code));
        }
    };

    return (
        <>
            <Formik
                initialValues={formValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formikRef}
            >
                {({ submitForm, values, setFieldValue }) => (
                    <Form noValidate autoComplete="off">
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <FormControl
                                        control="selectbox"
                                        variant="outlined"
                                        name="bidder_type"
                                        label="Bidder Type"
                                        options={bidderArray}
                                        value={bidderSelected}
                                        onChange={(e) => {
                                            setFieldValue("bidder_type", e.target.value);
                                            setBidderSelected(e.target.value);

                                        }}
                                        required
                                        margin="dense"
                                        disabled={formEditIs}
                                    />
                                </Box>
                            </Grid>

                            {!isIndividualBidder && (
                                <Grid item xs={6}>
                                    <FormControl
                                        control="input"
                                        variant="outlined"
                                        label="Entity Name"
                                        placeholder="Company/Society/Propriter/Trust/LLP"
                                        name="entity_name"
                                        type="text"
                                        id="entity_name"
                                        inputProps={{ maxLength: 50 }}
                                        required
                                        onInput={(e) =>
                                            (e.target.value = ("" + e.target.value).toUpperCase())
                                        }
                                        margin="dense"
                                        disabled={formEditIs}
                                    />
                                </Grid>
                            )}
                            {!isIndividualBidder && (
                                <Grid item xs={6}>
                                    <FormControl
                                        control="input"
                                        variant="outlined"
                                        label="G.S.T No"
                                        placeholder="Enter G.S.T Number"
                                        name="gst_number"
                                        type="text"
                                        id="gst_number"
                                        inputProps={{ maxLength: 15 }}
                                        required
                                        onInput={(e) =>
                                            (e.target.value = ("" + e.target.value))
                                        }
                                        margin="dense"
                                        disabled={formEditIs}
                                    />
                                </Grid>
                            )}
                            {!isIndividualBidder && (
                                <Grid item xs={6}>
                                    <FormControl
                                        control="input"
                                        variant="outlined"
                                        label="Registration No"
                                        placeholder="Registration Number"
                                        name="registration_no"
                                        type="text"
                                        disabled={formEditIs}
                                        id="registration_no"
                                        inputProps={{ maxLength: 20 }}
                                        required
                                        onInput={(e) =>
                                            (e.target.value = ("" + e.target.value).toUpperCase())
                                        }
                                        margin="dense"
                                    />
                                </Grid>
                            )}
                            {!isIndividualBidder && (
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        control="multipleselectbox"
                                        variant="outlined"
                                        name="business_type"
                                        label="Business Type"
                                        options={businessTypeArray}
                                        value={selectedValues}
                                        handleChange={handleMultiSelectChange}
                                        handleDelete={handleDelete}
                                        required
                                        margin="dense"
                                        disabled={formEditIs}
                                    />
                                </Grid>
                            )}
                            {!isIndividualBidder && (
                                <Grid item xs={6}>
                                    <FormControl
                                        control="input"
                                        variant="outlined"
                                        label="Permanent Address"
                                        multiline="true"
                                        placeholder="Permanent Address"
                                        name="permanant_addrs"
                                        type="text"
                                        id="permanent_addrs"
                                        inputProps={{ maxLength: 100 }}
                                        required
                                        disabled={formEditIs}
                                        onInput={(e) =>
                                            (e.target.value = ("" + e.target.value).toString())
                                        }
                                        margin="dense"
                                    />
                                </Grid>
                            )}
                        </Grid>

                        {!isIndividualBidder && (
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <FormControl
                                        control="input"
                                        variant="outlined"
                                        label="Pincode"
                                        placeholder="Pincode"
                                        name="pin_code"
                                        type="number"
                                        id="pin_code"
                                        required
                                        disabled={formEditIs}
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, 6);
                                        }}
                                        onChange={(e) => {
                                            autoCompletePincode(e);
                                            const pinCode = e.target.value;
                                            setFieldValue("pin_code", pinCode);
                                        }}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl
                                        control="selectbox"
                                        variant="outlined"
                                        label="District"
                                        options={districList}
                                        placeholder="district"
                                        name="bid_district"
                                        type="text"
                                        id="bid_district"
                                        required
                                        margin="dense"
                                        disabled={formEditIs}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl
                                        control="input"
                                        variant="outlined"
                                        label="City"
                                        placeholder="City"
                                        name="bid_city"
                                        type="text"
                                        id="bid_city"
                                        inputProps={{ maxLength: 150 }}
                                        required
                                        margin="dense"
                                        disabled={formEditIs}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl
                                        control="selectbox"
                                        variant="outlined"
                                        label="State"
                                        placeholder="State"
                                        name="bid_state"
                                        type="text"
                                        id="bid_state"
                                        // options={states.length === 0 ? [{ value: selectedCountry, label: selectedCountry }] : states?.map(state => ({
                                        //     value: state.state_code,
                                        //     label: state.name,
                                        // }))}
                                        options={stateList}
                                        disabled={formEditIs}
                                        required
                                        // onChange={(e) => {
                                        //     setFieldValue("state", e.target.value);
                                        // }}

                                        margin="dense"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl
                                        control="selectbox"
                                        options={countries}
                                        // options={countries.map(country => ({
                                        //     value: country.name,
                                        //     label: country.name,
                                        // }))}
                                        onChange={(e) => {
                                            setFieldValue("bid_country", e.target.value);
                                            setSelectedCountry(e.target.value);
                                        }}
                                        variant="outlined"
                                        label="Country"
                                        placeholder="Country"
                                        name="bid_country"
                                        type="text"
                                        id="bid_country"
                                        required
                                        disabled={formEditIs}
                                        margin="dense"
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {!stepCompleted &&
                        <Box className={classes.kycCardFooterRoot}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={isFetchingBidder}
                            >
                                {isFetchingBidder && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                                {isFetchingBidder && 'Saving...'}
                                {!isFetchingBidder && 'Save & Continue'}
                            </Button>
                        </Box>
                        }
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default BidderSelectionForm;
