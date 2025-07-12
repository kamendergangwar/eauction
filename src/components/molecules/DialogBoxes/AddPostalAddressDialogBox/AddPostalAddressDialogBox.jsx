import React, { useState, useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "../../FormControl/FormControl";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { KycViewIcon } from "../../../atoms/SvgIcons/SvgIcons";
// import { DistrictList, CityList } from "../../../../utils/List";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  updateApplicantAddressDtls,
  applicantSelector,
  clearApplicantState,
  getDetailsFromPanCard,
  getstaeCityByPinCode,
  getState,
  getDistrict
} from "../../../../redux/features/applicant/ApplicantSlice";

const styles = (theme) => ({
  dialogHeader: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
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
      fontSize: "1.2rem"
    }
  },
  mainSubTitle: {
    color: "#0F2940",
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  }
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3),
  }
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
      paddingBottom: theme.spacing(2),
    },
  }
}));

export const DialogTitle = withStyles(styles)((props) => {
  const { title, subTitle, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogHeader} {...other}>
      <Grid container>
        <Grid item><KycViewIcon fontSize="large" className={classes.titleIcon} /></Grid>
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

const AddPostalAddressDialogBox = (props) => {
  const { onClose, open, applicantData, width, isSuccessResApplicantGet, refreshData, postalAddressIs } = props;
  const classes = useStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const formikRef = useRef();
  const [formValues, setFormValues] = useState(null);
  const [stateList, setStateList] = useState([])
  const [districList, setDistricList] = useState([])
  const dispatch = useDispatch();

  const {
    isFetchingApplicantAdd,
    isSuccessReqApplicantAdd,
    isErrorApplicantAdd,
    errorMessageAdd,
    isSuccessResApplicantAdd,
    isFetchingApplicantGet,
    isSuccessResStateCity,
    StateCityData,
    isSuccessResState,
    StateData,
    isSuccessResDistrict,
    DistrictData
  } = useSelector(applicantSelector);

  useEffect(() => {
    if (isSuccessResApplicantAdd) {
      onClose();
      refreshData();
      dispatch(clearApplicantState());
    }
  }, [isSuccessResApplicantAdd])

  useEffect(() => {
    dispatch(getState());
    dispatch(getDistrict());
  }, []);

  const handleClose = () => {
    onClose();
  };

  const initialValues = {
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    village: "",
    district: "",
    state: ""
  };

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



  const validationSchema = yup.object().shape({
    addressLine1: yup
      .string()
      .matches(/^([a-zA-Z0-9\_,.-]\s*)+$/, t("addPostalAddressModal.formControl.charactersNotAllowed"))
      .required(
        t(
          "addPostalAddressModal.formControl.addressLine1Errors.required"
        )
      ),
    addressLine2: yup
      .string()
      .matches(/^([a-zA-Z0-9\_,.-]\s*)+$/, t("addPostalAddressModal.formControl.charactersNotAllowed")),
    pincode: yup
      .string()
      // .matches(
      //   /^[1-9][0-9]{5}$/,
      //   t(
      //     "addPostalAddressModal.formControl.postalCodeErrors.limitation"
      //   )
      // )
      .required(
        t(
          "addPostalAddressModal.formControl.postalCodeErrors.required"
        )
      ),
    village: yup
      .string()
      .matches(/^([a-zA-Z0-9\_,]\s*)+$/, t("addPostalAddressModal.formControl.charactersNotAllowed"))
      .required(
        t(
          "addPostalAddressModal.formControl.cityTownErrors.required"
        )
      ),
    district: yup
      .string()
      .required(
        t(
          "addPostalAddressModal.formControl.districtErrors.required"
        )
      ),
    state: yup
      .string()
      .required(
        t(
          "addPostalAddressModal.formControl.stateErrors.required"
        )
      ),
  });


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


  const autoCompletePincode = (event) => {
    let pin_code = event.target.value;
    if (pin_code.length == 6) {
      dispatch(getstaeCityByPinCode(pin_code));
    }
  }

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      let address_line_1;
      if (applicantData.PresentHouse) {
        if (applicantData.PresentHouse !== "0") {
          address_line_1 = applicantData.PresentHouse;
        } else {
          address_line_1 = "";
        }
      }
      let address_line_2;
      if (applicantData.PresentArea) {
        if (applicantData.PresentArea !== "0") {
          address_line_2 = applicantData.PresentArea;
        } else {
          address_line_2 = "";
        }
      }
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

      if (address_line_1 && pin_code && city_town && district_val && state_val) {
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
    }
  }, [applicantData, isSuccessResApplicantGet]);


  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      "PresentHouse": values.addressLine1,
      "PresentArea": values.addressLine2,
      "PresentCity": values.village,
      "PresentPincode": values.pincode,
      "PresentDistrict": values.district,
      "PresentState": values.state,
      "Type": "Addressv2",
      "Lang": localStorage.getItem("i18nextLng"),
      "isAddressSameOrNot": postalAddressIs == "yes" ? "1" : "0"
    };
    dispatch(updateApplicantAddressDtls(requestData));
  };

  return (
    <>
      {(isFetchingApplicantAdd) && (
        <Loading isOpen={isFetchingApplicantAdd} />
      )}
      <Dialog
        open={open || false}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen={width === "xs" ? true : false}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} title={t("addPostalAddressModal.title")} subTitle={t("addPostalAddressModal.subTitle")} />
        <DialogContent>
          <Formik
            initialValues={formValues || initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
          >
            {({ submitForm, setFieldValue, isSubmitting, values }) => (
              <Form noValidate autoComplete="off">
                {isErrorApplicantAdd && (
                  <AlertBox severity="error">{errorMessageAdd}</AlertBox>
                )}
                {/* {isImagePathMsg && (
                  <AlertBox severity="error">Image is Required</AlertBox>
                )} */}

                <div className={classes.formSection}>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t("addPostalAddressModal.formControl.addressLine1Label")}
                          placeholder={t("addPostalAddressModal.formControl.addressLine1Placeholder")}
                          name="addressLine1"
                          type="text"
                          id="addressLine1"
                          required
                          inputProps={{ maxLength: 100 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t("addPostalAddressModal.formControl.addressLine2Label")}
                          placeholder={t("addPostalAddressModal.formControl.addressLine2Placeholder")}
                          name="addressLine2"
                          type="text"
                          id="addressLine2"
                          inputProps={{ maxLength: 50 }}
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
                          label={t("addPostalAddressModal.formControl.postalCodeLabel")}
                          placeholder={t("addPostalAddressModal.formControl.postalCodePlaceholder")}
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
                          control="selectbox"
                          variant="outlined"
                          name="state"
                          label={t(
                            "addPostalAddressModal.formControl.stateLabel"
                          )}
                          options={stateList}
                          required
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
                            "addPostalAddressModal.formControl.districtLabel"
                          )}
                          options={districList}
                          required
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          // control="selectbox"
                          // variant="outlined"
                          // label={t("addPostalAddressModal.formControl.cityTownLabel")}
                          // placeholder={t("addPostalAddressModal.formControl.cityTownPlaceholder")}
                          // name="village"
                          // type="text"
                          // id="village"
                          // options={CityList}
                          // required
                          // inputProps={{ maxLength: 80 }}
                          control="input"
                          variant="outlined"
                          label={t("addPostalAddressModal.formControl.cityTownLabel")}
                          placeholder={t("addPostalAddressModal.formControl.cityTownPlaceholder")}
                          name="village"
                          type="text"
                          id="village"
                          inputProps={{ maxLength: 150 }}
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
                        "addPostalAddressModal.formControl.submitBtnTxt"
                      )}
                    </Button>
                  </Box>
                </div>
              </Form>
            )}
          </Formik>
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

export default AddPostalAddressDialogBox;
