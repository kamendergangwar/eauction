import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
// import PermanentAddress from "../PermanentAddress/PermanentAddress";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "../../../molecules/FormControl/FormControl";
import { contactDetailsFormStyles } from "./ContactDetailsForm.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import FormHelperText from "@material-ui/core/FormHelperText";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import {
  ContactIcon,
  AccomodationIcon,
  WhatsappIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
// import { DistrictList, StateList } from "../../../../utils/List";
import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import SubStepperBar1 from "../../../atoms/StepperBar/SubStepperBar1/SubStepperBar1";
import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getPincodeDetails,
  masterDataSelector,
  clearMasterDataState,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getStepperDetails,
  addEditStepper,
  superStepperActiveStep,
  subSteppper1ActiveStep,
} from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
// import CircularProgress from "@material-ui/core/CircularProgress";

const ContactDetailsForm = (props) => {
  const { width } = props;
  const classes = contactDetailsFormStyles();
  const { t } = useTranslation("ContactDetailsPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [skipDialogOpen, setSkipDialogOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [isPermanentAddress, setPermanentAddress] = React.useState(true);
  const [formValues, setFormValues] = React.useState(null);
  const [isAadharVerified, setIsAadharVerified] = useState(true);

  const [isSameAsMobileNo, setSameAsMobileNo] = useState(false);
  const [isSameAsPermanentAdd, setSameAsPermanentAdd] = useState(true);
  const [isWhatsappNotification, setWhatsappNotification] = useState(false);
  const [isAreaDisabled, setIsAreaDisabled] = useState(false);
  const [disableWhatsapp, setDisableWhatsapp] = useState("");
  const [district, setDistrict] = useState("");
  const ErrorRef = useRef(null);
  const dispatch = useDispatch();
  const contactRef = useRef(null);
  const adressRef = useRef(null);

  const {
    isFetchingMasterData,
    isSuccessMasterData,
    isErrorMasterData,
    errorMsgMasterData,
    pincodeDetailsData,
    isFetchingPincode,
    isSuccessPincode,
    isErrorPincode,
    errorMsgPincode,
  } = useSelector(masterDataSelector);
  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,
  } = useSelector(applicantSelector);

  const { stepperData, isFetchingStepper } = useSelector(
    (state) => state.stepper
  );

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(superStepperActiveStep(0));
    dispatch(subSteppper1ActiveStep(1));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessPincode) {
      if (pincodeDetailsData.length > 0) {
        if (isPermanentAddress) {
          formikRef.current.setFieldValue(
            "district",
            pincodeDetailsData[0].District
          );
          formikRef.current.setFieldValue("state", pincodeDetailsData[0].State);
        } else {
          formikRef.current.setFieldValue(
            "commuDistrict",
            pincodeDetailsData[0].District
          );
          formikRef.current.setFieldValue(
            "commuState",
            pincodeDetailsData[0].State
          );
        }
      }
    }
  }, [isPermanentAddress, pincodeDetailsData]);

  const initialValues = {
    mobileNumber: "",
    whatsappNumber: "",
    emailId: "",
    careOf: "",
    building: "",
    area: "",
    village: "",
    landmark: "",
    pincode: "",
    district: "",
    state: "",
    commuCareOf: "",
    commuBuilding: "",
    commuArea: "",
    commuVillage: "",
    commuLandmark: "",
    commuPincode: "",
    commuDistrict: "",
    commuState: "",
  };

  const validationSchema = yup.object({
    mobileNumber: yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t(
          "applicatntsContactForm.contactForm.formControl.mobileNumberErrors.limitation"
        )
      ),
    // .required(
    //   t(
    //     "applicatntsContactForm.contactForm.formControl.mobileNumberErrors.required"
    //   )
    // )
    whatsappNumber: yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t(
          "applicatntsContactForm.contactForm.formControl.whatsappNumberErrors.limitation"
        )
      ),
    emailId: yup
      .string()
      .email(
        t(
          "applicatntsContactForm.contactForm.formControl.emailErrors.limitation"
        )
      ),
    building: yup
      .string()
      .required(
        t(
          "applicatntsaddressForm.permanentAddressForm.formControl.apartmentNumberErrors.required"
        )
      ),
    area: yup
      .string()
      .required(
        t(
          "applicatntsaddressForm.permanentAddressForm.formControl.streetErrors.required"
        )
      ),
    district: yup
      .string()
      .required(
        t(
          "applicatntsaddressForm.permanentAddressForm.formControl.districtErrors.required"
        )
      ),
    state: yup
      .string()
      .required(
        t(
          "applicatntsaddressForm.permanentAddressForm.formControl.stateErrors.required"
        )
      ),
    pincode: yup
      .string()
      .matches(
        /^[1-9][0-9]{5}$/,
        t(
          "applicatntsaddressForm.permanentAddressForm.formControl.pincodeErrors.limitation"
        )
      )
      .required(
        t(
          "applicatntsaddressForm.permanentAddressForm.formControl.pincodeErrors.required"
        )
      ),
    village: yup
      .string()
      .required(
        t(
          "applicatntsaddressForm.permanentAddressForm.formControl.villageErrors.required"
        )
      ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      OtherContactNumber: values.mobileNumber,
      WhatsappNo: values.whatsappNumber,
      EmailId: values.emailId,
      CareOf: values.careOf,
      House: values.building,
      Street: values.area,
      Area: values.area,
      City: values.village,
      Landmark: values.landmark,
      Pincode: values.pincode,
      District: values.district,
      State: values.state,
      IsSamePermanentAddress: isSameAsPermanentAdd ? "1" : "0",
      IsWhatsupNotification: isWhatsappNotification ? "1" : "0",
      Type: "Address",
      Lang: localStorage.getItem("i18nextLng"),
    };
    if (isSameAsPermanentAdd) {
      const requestDataSameAsPerAdd = {
        ...requestData,
        PresentCareof: values.careOf,
        PresentHouse: values.building,
        PresentStreet: values.area,
        PresentArea: values.area,
        PresentCity: values.village,
        PresentLandmark: values.landmark,
        PresentPincode: values.pincode,
        PresentDistrict: values.district,
        PresentState: values.state,
      };
      // console.log(requestDataSameAsPerAdd, "1");
      dispatch(editApplicant(requestDataSameAsPerAdd));
    } else {
      const requestDataCommunicateAdd = {
        ...requestData,
        PresentCareof: values.commuCareOf,
        PresentHouse: values.commuBuilding,
        PresentStreet: values.commuArea,
        PresentArea: values.commuArea,
        PresentCity: values.commuVillage,
        PresentLandmark: values.commuLandmark,
        PresentPincode: values.commuPincode,
        PresentDistrict: values.commuDistrict,
        PresentState: values.commuState,
      };
      // console.log(requestDataCommunicateAdd, "2");
      dispatch(editApplicant(requestDataCommunicateAdd));
    }
  };

  useEffect(() => {
    if (isSuccessResApplicant) {
      let pincode = "";
      if (applicantData.Pincode) {
        if (applicantData.Pincode !== "0") {
          pincode = applicantData.Pincode;
        } else {
          pincode = "";
        }
      }
      let communiPincode = "";
      if (applicantData.PresentPincode) {
        if (applicantData.PresentPincode !== "0") {
          communiPincode = applicantData.PresentPincode;
        } else {
          communiPincode = "";
        }
      }
      setPermanentAddress(
        applicantData.IsSamePermanentAddress === "1" ? true : false
      );
      setSameAsPermanentAdd(
        applicantData.IsSamePermanentAddress === "1" ? true : false
      );
      setWhatsappNotification(
        applicantData.IsWhatsupNotification === "1" ? true : false
      );
      if (applicantData.WhatsappNo.length > 0) {
        if (applicantData.OtherContactNumber === applicantData.WhatsappNo) {
          setSameAsMobileNo(true);
        }
      }

      const savedValues = {
        mobileNumber: applicantData.OtherContactNumber || "",
        whatsappNumber: applicantData.WhatsappNo || "",
        emailId:
          applicantData.EmailId &&
            applicantData.EmailId != "paymentgateway.bulk@heliosadvisory.com"
            ? applicantData.EmailId
            : "",
        careOf: applicantData.CareOf || "",
        building: applicantData.House || "",
        area: applicantData.Area || "",
        village: applicantData.City || "",
        landmark: applicantData.Landmark || "",
        pincode: pincode,
        district: applicantData.District || "",
        state: applicantData.State || "",
        commuCareOf: applicantData.PresentCareof || "",
        commuBuilding: applicantData.PresentHouse || "",
        commuArea: applicantData.PresentArea || "",
        commuVillage: applicantData.PresentCity || "",
        commuLandmark: applicantData.PresentLandmark || "",
        commuPincode: communiPincode,
        commuDistrict: applicantData.PresentDistrict || "",
        commuState: applicantData.PresentState || "",
      };
      setFormValues(savedValues);
      if (applicantData.IsAadharVerified === "1") {
        setIsAadharVerified(true);
        if (applicantData.Area) {
          setIsAreaDisabled(true);
        } else {
          setIsAreaDisabled(false);
        }
      } else {
        setIsAadharVerified(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessResApplicant, applicantData, dispatch]);

  useEffect(() => {
    if (isSuccessResApplicant) {
      dispatch(clearApplicantState());
      const stepper = stepperData.superStepper;
      const newStepper = [...stepper];
      newStepper[0] = {
        ...stepper[0],
        subStepper: [
          { ...stepper[0].subStepper[0] },
          { step: 1, description: "Address Details", completed: true },
          { ...stepper[0].subStepper[2] },
        ],
      };
      const requestData = {
        Applicantid: localStorage.getItem("applicantId"),
        Stepper: { superStepper: newStepper },
      };
      dispatch(addEditStepper(requestData));
      dispatch(getStepperDetails());
      history.push("/family-details");
    }
  }, [dispatch, history, isSuccessResApplicant, stepperData]);

  const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  };

  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "No") {
      history.push("/family-details");
      setSelectedValue(null);
    }
  };

  const goPreviousPage = () => {
    history.push("/personal-details");
  };

  const handleChange = (event) => {
    if (event.target.name === "isSameAsMobileNo") {
      setSameAsMobileNo(event.target.checked);
      if (event.target.checked) {
        formikRef.current.setFieldValue(
          "whatsappNumber",
          formikRef.current.values.mobileNumber
        );
      } else {
        formikRef.current.setFieldValue("whatsappNumber", "");
        setWhatsappNotification(false);
      }
    }
    if (event.target.name === "isSameAsPermanentAdd") {
      setSameAsPermanentAdd(event.target.checked);
    }
    if (event.target.name === "isWhatsappNotification") {
      setWhatsappNotification(event.target.checked);
    }
  };

  function validateCommuBuilding(value) {
    if (!isSameAsPermanentAdd) {
      let error;
      if (!value) {
        error = t(
          "applicatntsaddressForm.permanentAddressForm.formControl.apartmentNumberErrors.required"
        );
      }
      return error;
    }
  }

  function validateCommuArea(value) {
    if (!isSameAsPermanentAdd) {
      let error;
      if (!value) {
        error = t(
          "applicatntsaddressForm.permanentAddressForm.formControl.streetErrors.required"
        );
      }
      return error;
    }
  }

  function validateCommuVillage(value) {
    if (!isSameAsPermanentAdd) {
      let error;
      if (!value) {
        error = t(
          "applicatntsaddressForm.permanentAddressForm.formControl.villageErrors.required"
        );
      }
      return error;
    }
  }

  function validateCommuPincode(value) {
    if (!isSameAsPermanentAdd) {
      let error;
      if (!value) {
        error = t(
          "applicatntsaddressForm.permanentAddressForm.formControl.pincodeErrors.required"
        );
      } else if (!/^[1-9][0-9]{5}$/i.test(value)) {
        error = t(
          "applicatntsaddressForm.permanentAddressForm.formControl.pincodeErrors.limitation"
        );
      }
      return error;
    }
  }

  function validateCommuDistrict(value) {
    if (!isSameAsPermanentAdd) {
      let error;
      if (!value) {
        error = t(
          "applicatntsaddressForm.permanentAddressForm.formControl.districtErrors.required"
        );
      }
      return error;
    }
  }

  function validateCommuState(value) {
    if (!isSameAsPermanentAdd) {
      let error;
      if (!value) {
        error = t(
          "applicatntsaddressForm.permanentAddressForm.formControl.stateErrors.required"
        );
      }
      return error;
    }
  }

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isErrorApplicant) {
      ErrorRef.current.scrollTop = 0;
    }
  }, [isErrorApplicant, errorMessage]);

  const scrollonError = (up, down) => {
    console.log(up, down);
    if (up && !down) {
      contactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // console.log(contactRef.current);
    }
    if (!up && down) {
      adressRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // console.log(addressRef.current);
    }
    if (up && down) {
      contactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollSubmit = (errors, submitForm) => {
    let up = false;
    let down = false;

    for (const property in errors) {
      if (
        property === "mobileNumber" ||
        property === "whatsappNumber" ||
        property === "emailId"
      ) {
        up = true;
      }
      if (
        property === "building" ||
        property === "area" ||
        property === "village" ||
        property === "landmark" ||
        property === "district" ||
        property === "pincode" ||
        property === "state"
      ) {
        down = true;
      }
      scrollonError(up, down);
      // console.log(property);
    }
    submitForm();
  };

  return (
    <>
      {(isFetchingApplicant || isFetchingStepper) && (
        <Loading isOpen={isFetchingApplicant || isFetchingStepper} />
      )}
      {isFetchingMasterData && <Loading isOpen={isFetchingMasterData} />}
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, values, errors }) => (
          <Form noValidate autoComplete="off">
            <FormCard>
              <Hidden only={["sm", "md", "lg"]}>
                <Box marginLeft={2} paddingY={2}>
                  <Button
                    onClick={goPreviousPage}
                    color="primary"
                    startIcon={<NavigateBeforeIcon />}
                  >
                    {t("backButtonText")}
                  </Button>
                </Box>
              </Hidden>
              <Hidden only="xs">
                <SubStepperBar1 step={1} />
              </Hidden>
              <div className={classes.container} ref={ErrorRef}>
                <FormMandatoryText />
                {isErrorMasterData && (
                  <AlertBox severity="error">{errorMsgMasterData}</AlertBox>
                )}
                {isErrorApplicant && (
                  <AlertBox severity="error">{errorMessage}</AlertBox>
                )}
                <IconTitle
                  icon={<ContactIcon fontSize="large" />}
                  title={t("applicatntsContactForm.title")}
                />
                <Grid
                  container
                  spacing={width === "xs" ? 1 : 3}
                  ref={contactRef}
                >
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsContactForm.contactForm.formControl.mobileNumberInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsContactForm.contactForm.formControl.mobileNumberPlaceholder"
                      )}
                      name="mobileNumber"
                      type="number"
                      id="mobileNumber"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10);
                      }}
                      onChange={(e) => {
                        setFieldValue("mobileNumber", e.target.value);
                        if (isSameAsMobileNo) {
                          setFieldValue("whatsappNumber", e.target.value);
                          if (!e.target.value) {
                            setWhatsappNotification(false);
                          }
                        }
                        if (!e.target.value) {
                          setSameAsMobileNo(false);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsContactForm.contactForm.formControl.whatsappNumberInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsContactForm.contactForm.formControl.whatsappNumberPlaceholder"
                      )}
                      name="whatsappNumber"
                      type="number"
                      id="whatsappNumber"
                      // disabled={(e) => {
                      //   setFieldValue(e.target.checked);
                      //   if (e.target.checked) {
                      //     setFieldValue(e.target.mobileNumber);
                      //   } else {
                      //     setFieldValue("whatsappNumber", e.target.value);
                      //   }
                      // }}
                      disabled={isSameAsMobileNo}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10);
                      }}
                      onChange={(e) => {
                        setFieldValue("whatsappNumber", e.target.value);
                        if (!e.target.value) {
                          setWhatsappNotification(false);
                        }
                      }}
                    />
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSameAsMobileNo}
                            onChange={handleChange}
                            name="isSameAsMobileNo"
                            color="primary"
                            disabled={!values.mobileNumber}
                          />
                        }
                        label={t(
                          "applicatntsContactForm.contactForm.formControl.checkBoxLabel0"
                        )}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isWhatsappNotification}
                            onChange={handleChange}
                            name="isWhatsappNotification"
                            color="primary"
                            disabled={
                              !values.mobileNumber || !values.whatsappNumber
                            }
                          />
                        }
                        label={
                          <Typography
                            variant="body1"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            {t(
                              "applicatntsContactForm.contactForm.formControl.checkBoxLabel1"
                            )}
                            <WhatsappIcon
                              fontSize="large"
                              style={{ marginLeft: 10 }}
                            />
                            {/* {t(
                              "applicatntsContactForm.contactForm.formControl.checkBoxLabel1text0"
                            )}
                            <WhatsappIcon />
                            {t(
                              "applicatntsContactForm.contactForm.formControl.checkBoxLabel1text1"
                            )} */}
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsContactForm.contactForm.formControl.emailInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsContactForm.contactForm.formControl.emailPlaceholder"
                      )}
                      name="emailId"
                      type="email"
                      id="emailId"
                      inputProps={{ maxLength: 100 }}
                    />
                  </Grid>
                </Grid>
                <Box borderTop={1} borderColor="grey.400" marginY={2} />
                <IconTitle
                  icon={<AccomodationIcon fontSize="large" />}
                  title={t("applicatntsaddressForm.title")}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    color="textSecondary"
                  >
                    {t("applicatntsaddressForm.description")}
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={width === "xs" ? 1 : 3}
                  ref={adressRef}
                >
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      // disabled={isAadharVerified}
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.careOfInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.careOfPlaceholder"
                      )}
                      name="careOf"
                      type="text"
                      id="careOf"
                      inputProps={{ maxLength: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      disabled={isAadharVerified}
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.apartmentNumberInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.apartmentNumberPlaceholder"
                      )}
                      name="building"
                      type="text"
                      id="building"
                      required
                      inputProps={{ maxLength: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      disabled={isAreaDisabled}
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.streetInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.streetPlaceholder"
                      )}
                      name="area"
                      type="text"
                      id="area"
                      required
                      inputProps={{ maxLength: 60 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      disabled={isAadharVerified}
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.villageInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.villagePlaceholder"
                      )}
                      name="village"
                      type="text"
                      id="village"
                      required
                      inputProps={{ maxLength: 80 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      disabled={isAadharVerified}
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.landmarkInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.landmarkPlaceholder"
                      )}
                      name="landmark"
                      type="text"
                      id="landmark"
                      inputProps={{ maxLength: 30 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      disabled={isAadharVerified}
                      control="input"
                      variant="outlined"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.pincodeInputLabel"
                      )}
                      placeholder={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.pincodePlaceholder"
                      )}
                      name="pincode"
                      type="number"
                      id="pincode"
                      required
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 6);
                      }}
                      onChange={(e) => {
                        setPermanentAddress(true);
                        const pinCode = e.target.value;
                        setFieldValue("pincode", pinCode);
                        /* if (pinCode.length === 6) {
                          dispatch(getPincodeDetails(pinCode));
                        } else {
                          setFieldValue("district", "");
                          setFieldValue("state", "");
                          dispatch(clearMasterDataState());
                        } */
                      }}
                    />
                    {isErrorPincode && (
                      <FormHelperText error variant="filled">
                        {errorMsgPincode}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      // disabled
                      control="input"
                      variant="outlined"
                      name="district"
                      id="district"
                      type="text"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.districtInputLabel"
                      )}
                      required
                    />
                    {/* <FormControl
                      control="selectbox"
                      variant="outlined"
                      name="district"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.districtInputLabel"
                      )}
                      options={districtListPA}
                      required
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      // disabled
                      control="input"
                      variant="outlined"
                      name="state"
                      id="state"
                      type="text"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.stateInputLabel"
                      )}
                      required
                    />
                    {/* <FormControl
                      control="selectbox"
                      variant="outlined"
                      name="state"
                      label={t(
                        "applicatntsaddressForm.permanentAddressForm.formControl.stateInputLabel"
                      )}
                      options={stateListPA}
                      required
                    /> */}
                  </Grid>
                </Grid>
                <Box marginTop={2}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    color="textSecondary"
                  >
                    {t("applicatntsCommunicationAddressForm.description")}
                  </Typography>
                  <FormGroup style={{ width: 300 }}>
                    {/* <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.isSameAsPermanentAdd}
                          onChange={handleChange("isSameAsPermanentAdd")}
                          value="isSameAsPermanentAdd"
                          color="primary"
                        />
                      }
                      label={t(
                        "applicatntsCommunicationAddressForm.checkBoxLabel"
                      )}
                    /> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSameAsPermanentAdd}
                          onChange={handleChange}
                          name="isSameAsPermanentAdd"
                          color="primary"
                        />
                      }
                      label={t(
                        "applicatntsCommunicationAddressForm.checkBoxLabel"
                      )}
                    />
                  </FormGroup>
                </Box>
                {!isSameAsPermanentAdd && (
                  <Grid container spacing={width === "xs" ? 1 : 3}>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled={isAadharVerified}
                        control="input"
                        variant="outlined"
                        label={t(
                          "applicatntsaddressForm.permanentAddressForm.formControl.careOfInputLabel"
                        )}
                        placeholder={t(
                          "applicatntsaddressForm.permanentAddressForm.formControl.careOfPlaceholder"
                        )}
                        name="commuCareOf"
                        type="text"
                        id="commuCareOf"
                        inputProps={{ maxLength: 200 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled={isAadharVerified}
                        validate={validateCommuBuilding}
                        control="input"
                        variant="outlined"
                        label={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.apartmentNumberInputLabel"
                        )}
                        placeholder={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.apartmentNumberPlaceholder"
                        )}
                        name="commuBuilding"
                        type="text"
                        id="commuBuilding"
                        required
                        inputProps={{ maxLength: 200 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled={isAadharVerified}
                        validate={validateCommuArea}
                        control="input"
                        variant="outlined"
                        label={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.streetInputLabel"
                        )}
                        placeholder={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.streetPlaceholder"
                        )}
                        name="commuArea"
                        type="text"
                        id="commuArea"
                        required
                        inputProps={{ maxLength: 100 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled={isAadharVerified}
                        validate={validateCommuVillage}
                        control="input"
                        variant="outlined"
                        label={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.villageInputLabel"
                        )}
                        placeholder={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.villagePlaceholder"
                        )}
                        name="commuVillage"
                        type="text"
                        id="commuVillage"
                        required
                        inputProps={{ maxLength: 200 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled={isAadharVerified}
                        control="input"
                        variant="outlined"
                        label={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.landmarkInputLabel"
                        )}
                        placeholder={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.landmarkPlaceholder"
                        )}
                        name="commuLandmark"
                        type="text"
                        id="commuLandmark"
                        inputProps={{ maxLength: 200 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled={isAadharVerified}
                        validate={validateCommuPincode}
                        control="input"
                        variant="outlined"
                        label={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.pincodeInputLabel"
                        )}
                        placeholder={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.pincodePlaceholder"
                        )}
                        name="commuPincode"
                        type="number"
                        id="commuPincode"
                        required
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 6);
                        }}
                        onChange={(e) => {
                          setPermanentAddress(false);
                          const pinCode = e.target.value;
                          setFieldValue("commuPincode", pinCode);
                          /* if (pinCode.length === 6) {
                            dispatch(getPincodeDetails(pinCode));
                          } else {
                            setFieldValue("commuDistrict", "");
                            setFieldValue("commuState", "");
                            dispatch(clearMasterDataState());
                          } */
                        }}
                      />
                      {isErrorPincode && (
                        <FormHelperText error variant="filled">
                          {errorMsgPincode}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled
                        validate={validateCommuDistrict}
                        control="input"
                        variant="outlined"
                        name="commuDistrict"
                        id="commuDistrict"
                        type="text"
                        label={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.districtInputLabel"
                        )}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        // disabled
                        validate={validateCommuState}
                        control="input"
                        variant="outlined"
                        name="commuState"
                        id="commuState"
                        type="text"
                        label={t(
                          "applicatntsCommunicationAddressForm.communicationAddressForm.formControl.stateInputLabel"
                        )}
                        required
                      />
                    </Grid>
                  </Grid>
                )}
              </div>
            </FormCard>
            <Box
              marginY={width === "xs" ? 1 : 4}
              paddingY={width === "xs" ? 2 : 0}
              paddingX={2}
            >
              <Grid
                container
                spacing={2}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Hidden only="xs">
                  <Grid item xs={12} sm={2} md={2} lg={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<NavigateBeforeIcon />}
                      fullWidth
                      onClick={goPreviousPage}
                    >
                      {t("backButtonText")}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3} md={4} lg={6}></Grid>
                </Hidden>
                <Grid item xs={12} sm={3} md={3} lg={2}>
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => handleOnSkip("openDialog")}
                  >
                    {t("completeLaterButtonText")}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                    fullWidth
                    onClick={() => scrollSubmit(errors, submitForm)}
                  >
                    {t("saveButtonText")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      <ConfirmDialogBox
        title={t("Translation:skipDialog.title")}
        description={t("Translation:skipDialog.description")}
        question={t("Translation:skipDialog.question")}
        selectedValue={selectedValue}
        open={skipDialogOpen}
        onClose={handleCloseSkipDialog}
      />
    </>
  );
};

export default withWidth()(ContactDetailsForm);
