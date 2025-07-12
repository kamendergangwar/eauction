import React, { useState, useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "../../FormControl/FormControl";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { PersonalDetailsTitleIcon } from "../../../atoms/SvgIcons/SvgIcons";
// import { DistrictList, StateList } from "../../../../utils/List";
// import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoApplicantDetails,
  coApplicantSelector,
  editCoApplicant,
  clearCoApplicantState
} from "../../../../redux/features/coApplicant/CoApplicantSlice";


import {
  applicantSelector,
  getstaeCityByPinCode,
  getState,
  getDistrict,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import Loading from "../../../atoms/Loading/Loading";

const styles = (theme) => ({
  dialogHeader: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(5)
    },
    "& > .MuiGrid-container": {
      flexWrap: "nowrap"
    },
  },
  titleIcon: {
    marginRight: theme.spacing(1.9),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(1.2),
      fontSize: "1.8rem"
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[800],
  },
  mainTitle: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  mainSubTitle: {
    color: "#0F2940",
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  }
});

export const DialogTitle = withStyles(styles)((props) => {
  const { title, subTitle, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogHeader} {...other}>
      <Grid container>
        <Grid item><PersonalDetailsTitleIcon fontSize="large" className={classes.titleIcon} /></Grid>
        <Grid item>
          <Typography variant="h5" className={classes.mainTitle}>{title}</Typography>
          <Typography variant="h6" className={classes.mainSubTitle}>{subTitle}</Typography>
        </Grid>
      </Grid>

      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  /* dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  }, */
  formSection: {
    padding: theme.spacing(5, 6),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  formActionSec: {
    textAlign: "right",
    paddingTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  }
}));

const AddCoApplicntAddressDtlsDialogBox = (props) => {
  const { onClose, open } = props;
  const classes = useStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const [isEligible, setIsEligible] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [stateList, setStateList] = useState([])
  const [districList, setDistricList] = useState([])
  const formikRef = useRef();
  const dispatch = useDispatch();
  const {
    isFetchingGetCoApplicant,
    isSuccessResGetCoApplicant,
    isErrorGetCoApplicant,
    errorMsgGetCoApplicant,
    coApplicantData,

    isFetchingCoApplicantEdit,
    isSuccessResCoApplicantEdit,
    isErrorCoApplicantEdit,
    errorMsgCoApplicantEdit
  } = useSelector(coApplicantSelector);

  const {
    isSuccessResStateCity,
    StateCityData,
    isSuccessResState,
    StateData,
    isSuccessResDistrict,
    DistrictData
  } = useSelector(applicantSelector);

  const handleClose = () => {
    onClose();
  };

  const initialValues = {
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    village: "",
    district: "",
    state: "",
  };

  const validationSchema = yup.object().shape({
    addressLine1: yup
      .string()
      .matches(/^([a-zA-Z0-9\_,]\s*)+$/, t("coApplicant.addAddressDetailsForm.formControl.charactersNotAllowed"))
      .required(
        t(
          "coApplicant.addAddressDetailsForm.formControl.addressLine1Errors.required"
        )
      ),
    addressLine2: yup
      .string()
      .matches(/^([a-zA-Z0-9\_,]\s*)+$/, t("coApplicant.addAddressDetailsForm.formControl.charactersNotAllowed")),
    pincode: yup
      .string()
      .matches(
        /^[1-9][0-9]{5}$/,
        t(
          "coApplicant.addAddressDetailsForm.formControl.postalCodeErrors.limitation"
        )
      )
      .required(
        t(
          "coApplicant.addAddressDetailsForm.formControl.postalCodeErrors.required"
        )
      ),
    village: yup
      .string()
      .matches(/^([a-zA-Z0-9\_]\s*)+$/, t("coApplicant.addAddressDetailsForm.formControl.charactersNotAllowed"))
      .required(
        t(
          "coApplicant.addAddressDetailsForm.formControl.cityTownErrors.required"
        )
      ),
    district: yup
      .string()
      .required(
        t(
          "coApplicant.addAddressDetailsForm.formControl.districtErrors.required"
        )
      ),
    state: yup
      .string()
      .required(
        t(
          "coApplicant.addAddressDetailsForm.formControl.stateErrors.required"
        )
      ),
  });

  useEffect(() => {
    dispatch(getCoApplicantDetails());
    dispatch(getState());
    dispatch(getDistrict());
  }, []);

  useEffect(() => {
    if (isSuccessResGetCoApplicant) {
      let address_line_1;
      if (coApplicantData.House) {
        if (coApplicantData.House !== "0") {
          address_line_1 = coApplicantData.House;
        } else {
          address_line_1 = "";
        }
      }
      let address_line_2;
      if (coApplicantData.Area) {
        if (coApplicantData.Area !== "0") {
          address_line_2 = coApplicantData.Area;
        } else {
          address_line_2 = "";
        }
      }
      let pin_code;
      if (coApplicantData.Pincode) {
        if (coApplicantData.Pincode !== "0") {
          pin_code = coApplicantData.Pincode;
        } else {
          pin_code = "";
        }
      }
      let city_town;
      if (coApplicantData.City) {
        if (coApplicantData.City !== "0") {
          city_town = coApplicantData.City;
        } else {
          city_town = "";
        }
      }
      let district_val;
      if (coApplicantData.District) {
        if (coApplicantData.District !== "0") {
          district_val = coApplicantData.District;
        } else {
          district_val = "";
        }
      }
      let state_val;
      if (coApplicantData.State) {
        if (coApplicantData.State !== "0") {
          state_val = coApplicantData.State;
        } else {
          state_val = "";
        }
      }

      const savedValues = {
        addressLine1: address_line_1,
        addressLine2: address_line_2,
        pincode: pin_code,
        village: city_town,
        district: district_val,
        state: state_val
      };

      setFormValues(savedValues);
    }
  }, [isSuccessResGetCoApplicant, coApplicantData]);



  useEffect(() => {
    let StateArray = [];
    let DistrictArray = [];
    if (isSuccessResState) {
      if (StateData) {
        StateData.forEach(element => {
          StateArray.push({ "value": element.State, "label": element.State })
        });
        setStateList(StateArray);
      }
    }

    if (isSuccessResDistrict) {
      if (DistrictData) {
        DistrictData.forEach(item => {
          DistrictArray.push({ "value": item.District, "label": item.District })
        });
        setDistricList(DistrictArray);
      }

    }

  }, [isSuccessResState, isSuccessResDistrict])


  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      "ApplicantId": localStorage.getItem("applicantId"),
      "CoApplicantFullNAme": coApplicantData.FirstName || "",
      "DOB": coApplicantData.DOB || "",
      "MobileNo": coApplicantData.MobileNo || "",
      "EmailId": coApplicantData.EmailId || "",
      "AddressLine1": values.addressLine1,
      "AddressLine2": values.addressLine2,
      "PostalCode": values.pincode,
      "City": values.village,
      "District": values.district,
      "State": values.state,
      Type: "CoapplicantAddressv2",
      /* PresentHouse: values.addressLine1,
      PresentArea: values.addressLine2,
      PresentCity: values.village,
      PresentPincode: values.pincode,
      PresentDistrict: values.district,
      PresentState: values.state,
      Type: "CoapplicantAddressv2",
      Lang: localStorage.getItem("i18nextLng"), */
    };
    dispatch(editCoApplicant(requestData));
  };

  useEffect(() => {
    if (isSuccessResCoApplicantEdit) {
      onClose();
      dispatch(clearCoApplicantState());
    }
  }, [isSuccessResCoApplicantEdit]);

  /* useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    setIsEligible(false);
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); */

  /* const calculateAge = (dob) => {
    const diffMs = Date.now() - dob.getTime();
    const ageDT = new Date(diffMs);
    const age = Math.abs(ageDT.getUTCFullYear() - 1970);
    if (age < 18) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  }; */

  const autoCompletePincode = (event) => {
    let pin_code = event.target.value;
    if (pin_code.length == 6) {
      dispatch(getstaeCityByPinCode(pin_code));
    }
  }


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
        addressLine1: formikRef.current.values.addressLine1,
        addressLine2: formikRef.current.values.addressLine2,
        pincode: pin_code,
        village: formikRef.current.values.village,
        district: dis_val,
        state: state_val
      };

      setFormValues(savedValues);
      dispatch(clearApplicantState());
    }
  }, [isSuccessResStateCity, StateCityData])

  return (
    <>
      <Dialog
        open={open || false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      // fullScreen={width === "xs" ? true : false}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} title={t("coApplicant.addAddressDetailsForm.title")} subTitle={t("coApplicant.addAddressDetailsForm.subTitle")} />
        <DialogContent>
          <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
            enableReinitialize
          >
            {({ submitForm, setFieldValue, touched, errors, values }) => (
              <Form noValidate autoComplete="off">
                <div className={classes.formSection}>
                  {isErrorCoApplicantEdit && (
                    <AlertBox severity="error">{errorMsgCoApplicantEdit}</AlertBox>
                  )}
                  {isErrorGetCoApplicant && (
                    <AlertBox severity="error">{errorMsgGetCoApplicant}</AlertBox>
                  )}
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t("coApplicant.addAddressDetailsForm.formControl.addressLine1Label")}
                          placeholder={t("coApplicant.addAddressDetailsForm.formControl.addressLine1Placeholder")}
                          name="addressLine1"
                          type="text"
                          id="addressLine1"
                          required
                          inputProps={{ maxLength: 300 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t("coApplicant.addAddressDetailsForm.formControl.addressLine2Label")}
                          placeholder={t("coApplicant.addAddressDetailsForm.formControl.addressLine2Placeholder")}
                          name="addressLine2"
                          type="text"
                          id="addressLine2"
                          inputProps={{ maxLength: 300 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t("coApplicant.addAddressDetailsForm.formControl.postalCodeLabel")}
                          placeholder={t("coApplicant.addAddressDetailsForm.formControl.postalCodePlaceholder")}
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
                            autoCompletePincode(e);
                            const pinCode = e.target.value;
                            setFieldValue("pincode", pinCode);
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t("coApplicant.addAddressDetailsForm.formControl.cityTownLabel")}
                          placeholder={t("coApplicant.addAddressDetailsForm.formControl.cityTownPlaceholder")}
                          name="village"
                          type="text"
                          id="village"
                          required
                          inputProps={{ maxLength: 80 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          name="district"
                          label={t(
                            "coApplicant.addAddressDetailsForm.formControl.districtLabel"
                          )}
                          options={districList}
                          required
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          name="state"
                          label={t(
                            "coApplicant.addAddressDetailsForm.formControl.stateLabel"
                          )}
                          options={stateList}
                          required
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box className={classes.formActionSec}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    // onClick={submitForm}
                    >
                      {t(
                        "coApplicant.addAddressDetailsForm.saveBtnTxt"
                      )}
                    </Button>
                  </Box>
                </div>
              </Form>
            )}
          </Formik>
          {(isFetchingCoApplicantEdit) && (
            <Loading isOpen={isFetchingCoApplicantEdit} />
          )}
        </DialogContent>
        {/* <DialogActions className={classes.dialogActions}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleClose}
            color="primary"
          >
            {t("addFamilyDetailForm.memberDetelePopup.cancelButton")}
          </Button>
          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={() => handleConfirm(selectedValue)}
            color="primary"
            autoFocus
          >
            {t("addFamilyDetailForm.memberDetelePopup.confirmButton")}
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default AddCoApplicntAddressDtlsDialogBox;
