import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import withWidth from "@material-ui/core/withWidth";
import {
  DialogTitle,
  DialogContent,
} from "../ConfirmDialogBox/ConfirmDialogBox";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import Image from "../../../../assets/DummyProfile.jpg";
import Typography from "@material-ui/core/Typography";
import FormControl from "../../FormControl/FormControl";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { FormControlLabel, Radio } from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import ImageDialogBox from "../ImageDialogBox/ImageDialogBox";
import { useSelector, useDispatch } from "react-redux";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import RecentActorsOutlinedIcon from "@material-ui/icons/RecentActorsOutlined";
import {
  addFamilyMember,
  editFamilyMember,
  familyMemberSelector,
  clearFamilyState,
} from "../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import {
  fileUploadSelector,
  setImageUrl,
  clearImageUrl,
} from "../../../../redux/features/file/FileUploadSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
// import moment from "moment";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  imageStyle: {
    height: 175,
    width: 150,
    // borderRadius: 5,
  },
  leftContainer: {
    float: "left",
    width: "25%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rightContainer: {
    float: "right",
    width: "75%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    padding: 4,
  },
}));

const FamilyDetailsFormDialogBox = (props) => {
  const { open, onCloseForm, selectedValue, width } = props;
  const { t } = useTranslation("FamilyDetailsPageTrans");
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [isJointOwner, setJointOwner] = useState("no");
  const [relationshipValue, setRelationshipValue] = useState("");
  const [formValues, setFormValues] = useState(null);
  const [adharNoRequiredIs, setAdharNoRequiredIs] = useState(false);
  const [relationshipArray, setRelationshipArray] = useState([]);
  const [isMarried, setMarried] = useState(false);
  const [isImagePathMsg, setIsImagePathMsg] = useState(false);
  const dispatch = useDispatch();
  const [genderSelected, setGenderSelected] = useState("");
  const classes = useStyles();
  const formikRef = useRef();
  const [genderArray, setGenderArray] = useState([
    {
      value: 2,
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.gender.options.female"
      ),
    },
    {
      value: 1,
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.gender.options.male"
      ),
    },
    {
      value: 3,
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.gender.options.other"
      ),
    },
  ]);
  const {
    isFetchingFamilyMember,
    isSuccessAddMember,
    addMemberData,
    isSuccessEditMember,
    editMemberData,
    isErrorFamilyMember,
    errorMsgFamilyMember,
    jointOwnerExist,
  } = useSelector(familyMemberSelector);

  const { imageUrl } = useSelector(fileUploadSelector);
  const { applicantData } = useSelector(applicantSelector);
  useEffect(() => {
    dispatch(getApplicant());
  }, [dispatch]);

  useEffect(() => {
    if (applicantData.MarritalStatus) {
      if (applicantData.MarritalStatus === "2") {
        setMarried(true);
      } else {
        setMarried(false);
      }
    }
  }, [applicantData]);

  useEffect(() => {
    setIsImagePathMsg(false);
    if (selectedValue) {
      dispatch(setImageUrl(selectedValue.photoFile));
      let aadhaarNo;
      if (selectedValue.aadhaarNumber) {
        if (selectedValue.aadhaarNumber !== "0") {
          aadhaarNo = selectedValue.aadhaarNumber;
        } else {
          aadhaarNo = "";
        }
      }
      let mobileNo;
      if (selectedValue.mobileNumber) {
        if (selectedValue.mobileNumber !== "0") {
          mobileNo = selectedValue.mobileNumber;
        } else {
          mobileNo = "";
        }
      }
      let ownerShip;
      if (selectedValue.ownership) {
        if (selectedValue.ownership === "yes") {
          setJointOwner("yes");
          ownerShip = selectedValue.ownership;
        } else {
          ownerShip = "no";
          setJointOwner("no");
        }
      }
      let panNo;
      if (selectedValue.panNo) {
        if (selectedValue.panNo !== "") {
          panNo = selectedValue.panNo;
          // console.log(panNo);
        } else {
          panNo = "";
        }
      }
      let email;
      if (selectedValue.email) {
        if (selectedValue.email !== "") {
          email = selectedValue.email;
        } else {
          email = "";
        }
      }
      let dob;
      if (selectedValue.dob) {
        /* if (selectedValue.dob !== "0") {
          dob = selectedValue.dob;
        } else {
          dob = "";
        } */
        if (selectedValue.dob !== null || selectedValue.dob !== "00/00/0000") {
          let apiDate = selectedValue.dob;
          let convertDate = apiDate.split("/");
          const finalDate = new Date(
            parseInt(convertDate[2]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[0])
          );
          dob = finalDate;
        } else {
          dob = null;
        }
      }
      let address;
      if (selectedValue.address) {
        if (selectedValue.address !== "") {
          address = selectedValue.address;
        } else {
          address = "";
        }
      }
      let relationship;
      if (selectedValue.relationship) {
        if (selectedValue.relationship !== "") {
          relationship = selectedValue.relationship;
        } else {
          relationship = "";
        }
      }

      const savedValues = {
        ...selectedValue,
        ownership: ownerShip || "",
        aadhaarNumber: aadhaarNo || "",
        mobileNumber: mobileNo || "",
        dob: dob,
        pan: panNo || "",
        emailId: email || "",
        Address: address || "",
        relationship: relationship || "",
      };
      setFormValues(savedValues);
    } else {
      setFormValues(null);
      dispatch(clearImageUrl());
    }
  }, [dispatch, selectedValue]);

  useEffect(() => {
    if (isJointOwner === "yes" || relationshipValue === "Spouse") {
      setAdharNoRequiredIs(true);
    } else {
      setAdharNoRequiredIs(false);
    }
  }, [isJointOwner]);

  const handleClickOpenPhotoDialog = () => {
    setOpenPhotoDialog(true);
  };

  const handleClosePhotoDialog = (value) => {
    dispatch(setImageUrl(value));
    setOpenPhotoDialog(false);
  };

  const handleClose = () => {
    onCloseForm(null);
    dispatch(clearImageUrl());
  };

  const initialValues = {
    id: null,
    ownership: "no",
    memberName: "",
    age: "",
    gender: "",
    relationship: "",
    aadhaarNumber: "",
    mobileNumber: "",
    photoFile: null,
    dob: null,
    pan: "",
    emailID: "",
    address: "",
  };

  const validationSchema = yup.object().shape({
    ownership: yup.string(),
    memberName: yup
      .string()
      .required(
        t(
          "addFamilyDetailForm.familyMemberForm.formControl.nameErrors.required"
        )
      )
      .matches(
        /^[.a-zA-Z ]*$/,
        t(
          "addFamilyDetailForm.familyMemberForm.formControl.nameErrors.limitation"
        )
      ),
    gender: yup
      .string()
      .required(
        t(
          "addFamilyDetailForm.familyMemberForm.formControl.gender.genderErrors.required"
        )
      ),
    dob: yup
      .date()
      .nullable()
      .default(null)
      .required(
        t(
          "addFamilyDetailForm.familyMemberForm.formControl.dateOfBirthErrors.required"
        )
      ),
    relationship: yup
      .string()
      .required(
        t(
          "addFamilyDetailForm.familyMemberForm.formControl.relationship.relationshipErrors.required"
        )
      ),
    age: yup
      .string()
      .required(
        t(
          "addFamilyDetailForm.familyMemberForm.formControl.memberAgeErrors.required"
        )
      )
      .matches(
        /^[0-9]{1,3}$/,
        t(
          "addFamilyDetailForm.familyMemberForm.formControl.memberAgeErrors.required"
        )
      ),
    pan: yup.string().when("ownership", {
      is: "yes",
      then: yup
        .string()
        .required(
          t(
            "addFamilyDetailForm.familyMemberForm.formControl.panNumberErrors.required"
          )
        )
        .matches(
          /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
          t(
            "addFamilyDetailForm.familyMemberForm.formControl.panNumberErrors.limitation"
          )
        ),
    }),
    address: yup.string().when("ownership", {
      is: "yes",
      then: yup
        .string()
        .required(
          t(
            "addFamilyDetailForm.familyMemberForm.formControl.addressErrors.required"
          )
        ),
    }),
    aadhaarNumber: yup.string().when("ownership", {
      is: "yes",
      then: yup
        .string()
        .matches(
          /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
          t(
            "addFamilyDetailForm.familyMemberForm.formControl.aadhaarNumberErrors.limitation"
          )
        )
        .required(
          t(
            "addFamilyDetailForm.familyMemberForm.formControl.aadhaarNumberErrors.required"
          )
        ),
    }),
    mobileNumber: yup.string().when("ownership", {
      is: "yes",
      then: yup
        .string()
        .matches(
          /^[6-9]\d{9}$/,
          t(
            "addFamilyDetailForm.familyMemberForm.formControl.mobileNumberErrors.limitation"
          )
        )
        .required(
          t(
            "addFamilyDetailForm.familyMemberForm.formControl.mobileNumberErrors.required"
          )
        ),
    }),
  });

  /* function validateAddress(value) {
    let error;
    if (!value) {
      error = "Address is required";
    }
    return error;
  }

  function validatePan(value) {
    let error;
    if (!value) {
      if (isJointOwner === "yes") {
        error = "Pan number is required";
      }
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/i.test(value)) {
      error = "Please enter valid pan number";
    }
    return error;
  }

  function validateAge(value) {
    let error;
    if (!value) {
      error = t(
        "addFamilyDetailForm.familyMemberForm.formControl.memberAgeErrors.required"
      );
    } else if (!(value > 0 && value < 140)) {
      error = t(
        "addFamilyDetailForm.familyMemberForm.formControl.memberAgeErrors.limitation"
      );
    }
    return error;
  }

  function validateMobileNumber(value) {
    let error;
    if (!value) {
      if (isJointOwner === "yes" || relationshipValue === "Spouse") {
        error = t(
          "addFamilyDetailForm.familyMemberForm.formControl.mobileNumberErrors.required"
        );
      }
    } else if (!/^[6-9]\d{9}$/i.test(value)) {
      error = t(
        "addFamilyDetailForm.familyMemberForm.formControl.mobileNumberErrors.limitation"
      );
    }
    return error;
  }

  function validateAadhaarNumber(value) {
    let error;
    if (!value) {
      if (isJointOwner === "yes" || relationshipValue === "Spouse") {
        error = t(
          "addFamilyDetailForm.familyMemberForm.formControl.aadhaarNumberErrors.required"
        );
      }
    } else if (!/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/i.test(value)) {
      error = t(
        "addFamilyDetailForm.familyMemberForm.formControl.aadhaarNumberErrors.limitation"
      );
    }
    return error;
  } */

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // if (values.ownership === "yes") {
    //   if (!imageUrl) {
    //     setIsImagePathMsg(true);
    //     return false;
    //   }
    // }
    const requestData = {
      ApplicantId: localStorage.getItem("applicantId"),
      Relationship: values.relationship,
      RelativeFullName: values.memberName,
      Gender: values.gender,
      MobileNo: values.mobileNumber,
      JointOwner: values.ownership === "yes" ? 1 : 0,
      Age: values.age,
      AadharNo: values.aadhaarNumber,
      ImagePath: imageUrl,
      IsActive: "1",
      Lang: localStorage.getItem("i18nextLng"),
      DOB: values.dob,
      PANNo: values.pan,
      EmailID: values.emailId,
      Address: values.address,
    };
    if (selectedValue) {
      localStorage.setItem("familyMemberId", selectedValue.id);
      dispatch(editFamilyMember(requestData));
    }
    if (!selectedValue) {
      dispatch(addFamilyMember(requestData));
    }
    setJointOwner("no");
    setRelationshipValue("");
  };

  useEffect(() => {
    if (isSuccessAddMember) {
      onCloseForm({ addData: addMemberData });
      dispatch(clearFamilyState());
      dispatch(clearImageUrl());
    }
    if (isSuccessEditMember) {
      onCloseForm({ editData: editMemberData });
      localStorage.removeItem("familyMemberId");
      dispatch(clearFamilyState());
      dispatch(clearImageUrl());
    }
  }, [
    dispatch,
    addMemberData,
    editMemberData,
    isSuccessAddMember,
    isSuccessEditMember,
    onCloseForm,
  ]);

  const genderList = [
    {
      value: 2,
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.gender.options.female"
      ),
    },
    {
      value: 1,
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.gender.options.male"
      ),
    },
    {
      value: 3,
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.gender.options.other"
      ),
    },
  ];

  const FemaleGenderList = [
    {
      value: 2,
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.gender.options.female"
      ),
    },
  ];

  const relationshipList = [
    {
      value: "Spouse",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.spouse"
      ),
    },
    {
      value: "Son",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.son"
      ),
    },
    {
      value: "Daughter",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.daughter"
      ),
    },
    {
      value: "Father",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.father"
      ),
    },
    {
      value: "Mother",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.mother"
      ),
    },
    {
      value: "Sister",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.sister"
      ),
    },
    {
      value: "Brother",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.brother"
      ),
    },
    {
      value: "Grandfather",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandFather"
      ),
    },
    {
      value: "Grandmother",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandMother"
      ),
    },
    {
      value: "Grandson",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandSon"
      ),
    },
    {
      value: "Granddaughter",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandDaughter"
      ),
    },
  ];

  const relationshipListMarried = [
    {
      value: "Spouse",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.spouse"
      ),
    },
  ];

  const relationshipListNotMarried = [
    {
      value: "Mother",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.mother"
      ),
    },
  ];
  const relationshipListMale = [
    {
      value: "Spouse",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.spouse"
      ),
    },
    {
      value: "Son",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.son"
      ),
    },

    {
      value: "Father",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.father"
      ),
    },

    {
      value: "Brother",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.brother"
      ),
    },
    {
      value: "Grandfather",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandFather"
      ),
    },

    {
      value: "Grandson",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandSon"
      ),
    },
  ];
  const relationshipListFemale = [
    {
      value: "Spouse",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.spouse"
      ),
    },

    {
      value: "Daughter",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.daughter"
      ),
    },

    {
      value: "Mother",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.mother"
      ),
    },
    {
      value: "Sister",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.sister"
      ),
    },

    {
      value: "Grandmother",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandMother"
      ),
    },

    {
      value: "Granddaughter",
      label: t(
        "addFamilyDetailForm.familyMemberForm.formControl.relationship.options.grandDaughter"
      ),
    },
  ];

  useEffect(() => {
    if (isMarried && isJointOwner === "yes") {
      setRelationshipArray(relationshipListMarried);
    } else if (!isMarried && isJointOwner === "yes") {
      setGenderArray(FemaleGenderList);
      setRelationshipArray(relationshipListNotMarried);
    } else if (isJointOwner === "no") {
      setGenderArray(genderList);
      setRelationshipArray(relationshipList);
    } else {
      setRelationshipArray(relationshipList);
    }
  }, [isJointOwner, isMarried, t]);

  useEffect(() => {
    if (isJointOwner === "no" && genderSelected === 1) {
      setRelationshipArray(relationshipListMale);
    } else if (isJointOwner === "no" && genderSelected === 2) {
      setRelationshipArray(relationshipListFemale);
    } else if (isJointOwner === "no" && genderSelected === 3) {
      setRelationshipArray(relationshipList);
    }
  }, [genderSelected, isJointOwner]);

  /* const getDate = (value) => {
    // moment(values.documentDate).format("YYYY-MM-DD");
    console.log("value", value);
    var dd = String(value.getDate()).padStart(2, "0");
    var mm = String(value.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = value.getFullYear();
    const newDate = dd + "/" + mm + "/" + yyyy;
    console.log(newDate);
    return newDate;
  }; */

  useEffect(() => {
    if (!open) {
      setJointOwner("no");
    }
  }, [open]);

  return (
    <>
      {isFetchingFamilyMember && <Loading isOpen={isFetchingFamilyMember} />}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen={width === "xs" ? true : false}
        fullWidth={true}
        maxWidth="md"
      >
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
          enableReinitialize
        >
          {({ submitForm, setFieldValue, isSubmitting, values }) => (
            <Form noValidate autoComplete="off">
              <DialogTitle id="form-dialog-title" onClose={handleClose}>
                {t("addFamilyDetailForm.title")}
              </DialogTitle>
              {isErrorFamilyMember && (
                <AlertBox severity="error">{errorMsgFamilyMember}</AlertBox>
              )}
              {isImagePathMsg && (
                <AlertBox severity="error">Image is Required</AlertBox>
              )}
              <DialogContent>
                <div className={classes.leftContainer}>
                  <Box
                    bgcolor="grey.100"
                    paddingY={2}
                    style={{ width: width === "xs" ? "80%" : "98%" }}
                  >
                    <Box textAlign="center">
                      <img
                        className={classes.imageStyle}
                        src={
                          imageUrl ||
                          "https://mass-dev-documents.s3.ap-south-1.amazonaws.com/lottery_132591_1625461229_profile.png"
                        }
                        alt="Profile Img"
                      />
                    </Box>
                    <Box textAlign="center" marginY={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ textTransform: "capitalize" }}
                        onClick={handleClickOpenPhotoDialog}
                      >
                        {t(
                          "addFamilyDetailForm.familyMemberForm.formControl.editButtonText"
                        )}
                      </Button>
                    </Box>
                    <Box textAlign="center" marginY={2}>
                      <Typography variant="body2" gutterBottom>
                        {t(
                          "addFamilyDetailForm.familyMemberForm.formControl.photoMessage"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className={classes.rightContainer}>
                  <Grid container>
                    <Grid item xs={12} sm={12}>
                      <Box
                        paddingX={width === "xs" ? 0 : 1}
                        marginTop={1}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <Typography
                          variant="body2"
                          gutterBottom
                          style={{ fontWeight: 600 }}
                        >
                          {t(
                            "addFamilyDetailForm.familyMemberForm.formControl.jointOwnerMessage"
                          )}{" "}
                          <span style={{ color: "#f93d5c" }}>*</span>
                        </Typography>
                        <Field
                          component={RadioGroup}
                          name="ownership"
                          row
                          style={{ marginLeft: "20px" }}
                        // disabled={jointOwnerExist}
                        // disabled={!isMarried}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio color="primary" />}
                            label={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.checkBoxYesLabel"
                            )}
                            onChange={(e) => {
                              setJointOwner(e.target.value);
                            }}
                            disabled={jointOwnerExist}
                          // disabled={!isMarried}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio color="primary" />}
                            label={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.checkBoxNoLabel"
                            )}
                            onChange={(e) => {
                              setJointOwner(e.target.value);
                            }}
                          // disabled={jointOwnerExist}
                          />
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box paddingX={width === "xs" ? 0 : 1}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.nameLabel"
                          )}
                          placeholder={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.namePlaceholder"
                          )}
                          name="memberName"
                          type="text"
                          id="memberName"
                          required
                          inputProps={{ maxLength: 50 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box paddingX={width === "xs" ? 0 : 1}>
                        <FormControl
                          control="datepicker"
                          name="dob"
                          label={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.dateOfBirthInputLabel"
                          )}
                          inputVariant="outlined"
                          required
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box paddingX={width === "xs" ? 0 : 1}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.memberAgeInputLabel"
                          )}
                          placeholder={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.memberAgePlaceholder"
                          )}
                          name="age"
                          type="tel"
                          id="age"
                          required
                          // onInput={(e) => {
                          //   e.target.value = Math.max(
                          //     0,
                          //     parseInt(e.target.value)
                          //   )
                          //     .toString()
                          //     .slice(0, 3);
                          // }}
                          inputProps={{ maxLength: 3 }}
                        // validate={validateAge}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box paddingX={width === "xs" ? 0 : 1}>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          name="gender"
                          label={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.gender.genderLabel"
                          )}
                          options={genderArray}
                          onChange={(e) => {
                            setFieldValue("gender", e.target.value);
                            setGenderSelected(e.target.value);
                          }}
                          required
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box paddingX={width === "xs" ? 0 : 1}>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          name="relationship"
                          label={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.relationship.relationshipLabel"
                          )}
                          options={relationshipArray}
                          onChange={(e) => {
                            setFieldValue("relationship", e.target.value);
                            setRelationshipValue(e.target.value);
                          }}
                          required
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box paddingX={width === "xs" ? 0 : 1}>
                        <FormControl
                          // validate={validateMobileNumber}
                          control="input"
                          variant="outlined"
                          label={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.mobileNumberInputLabel"
                          )}
                          placeholder={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.mobileNumberPlaceholder"
                          )}
                          name="mobileNumber"
                          type="number"
                          id="mobileNumber"
                          required={adharNoRequiredIs}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 10);
                          }}
                        />
                      </Box>
                    </Grid>
                    {isJointOwner === "yes" && (
                      <Grid item xs={12} sm={6}>
                        <Box paddingX={width === "xs" ? 0 : 1}>
                          <FormControl
                            control="input"
                            variant="outlined"
                            label={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.emailAddressInputLabel"
                            )}
                            placeholder={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.emailAddressPlaceholder"
                            )}
                            name="emailId"
                            id="emailId"
                            inputProps={{ maxLength: 200 }}
                          />
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <Box paddingX={width === "xs" ? 0 : 1}>
                        <FormControl
                          // validate={validateAadhaarNumber}
                          control="input"
                          variant="outlined"
                          label={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.aadhaarNumberInputLabel"
                          )}
                          placeholder={t(
                            "addFamilyDetailForm.familyMemberForm.formControl.aadhaarNumberPlaceholder"
                          )}
                          name="aadhaarNumber"
                          type="number"
                          id="aadhaarNumber"
                          required={adharNoRequiredIs}
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 12);
                          }}
                        />
                      </Box>
                    </Grid>
                    {isJointOwner === "yes" && (
                      <Grid item xs={12} sm={6}>
                        <Box paddingX={width === "xs" ? 0 : 1}>
                          <FormControl
                            // validate={validatePan}
                            control="input"
                            variant="outlined"
                            label={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.panNumberInputLabel"
                            )}
                            placeholder={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.panNumberPlaceholder"
                            )}
                            name="pan"
                            id="pan"
                            // inputProps={{ maxLength: 200 }}
                            required={adharNoRequiredIs}
                            // InputProps={{
                            //   endAdornment: (
                            //     <InputAdornment position="start">
                            //       <RecentActorsOutlinedIcon htmlColor="#757575" />
                            //     </InputAdornment>
                            //   ),
                            // }}
                            inputProps={{
                              maxLength: 10,
                            }}
                            onInput={(e) =>
                            (e.target.value = (
                              "" + e.target.value
                            ).toUpperCase())
                            }
                          />
                        </Box>
                      </Grid>
                    )}
                    {isJointOwner === "yes" && (
                      <Grid item xs={12} sm={12}>
                        <Box paddingX={width === "xs" ? 0 : 1}>
                          <FormControl
                            // validate={validateAddress}
                            control="input"
                            variant="outlined"
                            label={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.addressInputLabel"
                            )}
                            placeholder={t(
                              "addFamilyDetailForm.familyMemberForm.formControl.addressPlaceholder"
                            )}
                            name="address"
                            id="address"
                            multiline
                            // maxRows={4}
                            rows={4}
                            required={isJointOwner === "yes" && true}
                          />
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </div>
              </DialogContent>
              <Box marginY={1} />
              <DialogActions className={classes.dialogActions}>
                <Grid
                  spacing={1}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={2}>
                    <Button
                      type="button"
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={handleClose}
                    >
                      {t(
                        "addFamilyDetailForm.familyMemberForm.formControl.cancelButtonText"
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                    >
                      {t(
                        "addFamilyDetailForm.familyMemberForm.formControl.saveFamilyButtonText"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      {openPhotoDialog && (
        <ImageDialogBox
          selectedValue={
            imageUrl ||
            "https://mass-dev-documents.s3.ap-south-1.amazonaws.com/lottery_132591_1625461229_profile.png"
          }
          open={openPhotoDialog}
          onClose={handleClosePhotoDialog}
        />
      )}
    </>
  );
};

export default withWidth()(FamilyDetailsFormDialogBox);
