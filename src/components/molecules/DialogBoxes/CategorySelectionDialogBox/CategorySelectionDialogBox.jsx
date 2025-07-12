import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Typography from "@material-ui/core/Typography";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import { useSelector, useDispatch } from "react-redux";
import {
  updateDocumentsList,
  docDeclarationSelector,
  clearDocDeclarationState,
  clearDocDeclarationtData
} from "../../../../redux/features/file/DocDeclarationSlice";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  catFormSection: {
    height: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    "& .MuiTypography-root": {
      color: "#0F2940",
      fontSize: "0.9rem"
    }
  },
  helpText: {
    color: "#434A6C",
    fontWeight: 500,
    fontSize: "0.9rem",
    padding: theme.spacing(1.5, 3),
    marginBottom: theme.spacing(1)
  }
}));

const CategorySelectionDialogBox = (props) => {
  const { onClose, categoryList, open, projectobj, ...other } = props;
  const classes = useStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const dispatch = useDispatch();
  const [categoryListArray, setCategoryListArray] = useState([]);
  const {
    isFetchingGetDocsList,
    isSuccessResGetDocsList,
    isErrorGetDocsList,
    errorMsgGetDocsList,
    getDocsListData
  } = useSelector(docDeclarationSelector);

  const castArray = projectobj.castCategory?.split(",");
  let reservationArray = castArray.concat(projectobj.reservationCategoryIds?.split(","));
  const uniqCategoryList = [...new Set(categoryList)];

  useEffect(() => {
    let finaliData = [];
    uniqCategoryList.forEach((item) => {
      return reservationArray.filter(function (obj2) {
        if (obj2 == item.value) {
          finaliData.push(item);
        }
      }
      );
    });

    setCategoryListArray(finaliData);
  }, [categoryList])

  const handleCancel = () => {
    onClose();
  };

  const initialValues = {
    categories: [],
  };


  const validationSchema = yup.object().shape({
    categories: yup
      .array()
      .min(1, t("categorySelectionForm.formControl.selectionError")),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    let sendData = {
      ApplicantId: localStorage.getItem("applicantId"),
      CasteCatId: "1",
      ReservationCatIds: values.categories,
    };

    dispatch(updateDocumentsList(sendData));

    var a = [];
    let sessionData = JSON.parse(localStorage.getItem("ReservationCatIds"));
    if (sessionData) {
      a = sessionData;
    }

    values.categories.forEach((item) => {
      a.push(item);
    })

    localStorage.setItem("ReservationCatIds", JSON.stringify(a));
    if (values.categories.length > 0) {
      onClose(values.categories);
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <DialogTitle id="alert-dialog-title">
            {t("categorySelectionForm.title")}
          </DialogTitle>
        </Box>
        <Box p={1}>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      {categoryListArray.length != 0 &&
        <>
          <Typography className={classes.helpText}>{t("categorySelectionForm.helpText1")}</Typography>
          <Typography className={classes.helpText}>{t("categorySelectionForm.helpText2")}</Typography>
        </>
      }
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm }) => (
          <Form noValidate autoComplete="off" className={classes.catFormSection}>
            <DialogContent className={classes.catCheckBoxList}>
              

              {categoryListArray.length != 0 &&
                <FormControl
                  control="checkboxgroup"
                  name="categories"
                  options={categoryListArray.filter(
                    (data, index, acc) => {
                      return index === acc.findIndex((t) => t.value === data.value && t.value)
                    }
                  )}
                />
              }
              {categoryListArray.length == 0 &&
                <AlertBox severity="error">
                  {t("categorySelectionForm.dataNotFoundMessage")}
                </AlertBox>
              }
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              {/* <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  onClick={handleCancel}
                  color="primary"
                >
                  {t("categorySelectionForm.formControl.cancelButton")}
                </Button> */}
              {categoryListArray.length != 0 &&
                <Button type="button" variant="contained" onClick={submitForm} color="primary" autoFocus>
                  {t("categorySelectionForm.formControl.okayButton")}
                </Button>
              }
            </DialogActions>
          </Form>
        )}
      </Formik>
      {/* {categoryList.length === 0 && (
        <AlertBox severity="error">
          {t("categorySelectionForm.dataNotFoundMessage")}
        </AlertBox>
      )} */}
    </Dialog>
  );
};

export default CategorySelectionDialogBox;

CategorySelectionDialogBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
