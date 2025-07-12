import React, { useCallback, useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTranslation, Trans } from "react-i18next";
import { FlatPreferencesFormStyles } from "./FlatPreferencesForm.styles";
import { Box } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { useHistory } from "react-router-dom";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import {
  CoApplicantSectionIcon,
  FlatPreferenceTitleIcon,
  FlatPreferenceBannerIcon,
  FloorIcon,
  ViewIcon,
  ParkingIcon,
  AmenitiesIcon,
  WhiteArrowIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import { useSelector, useDispatch } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import {
  addApplicantPreferences,
  getPreferencesList,
  clearPreferencesState,
  preferencesSelector,
} from "../../../../redux/features/preferences/PreferencesSlice";

const FlatPreferencesForm = (props) => {
  const { width } = props;
  const classes = FlatPreferencesFormStyles();
  const { t } = useTranslation("PreferencesPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isFetchingGetPreferences,
    isSuccessResGetPreferences,
    isErrorGetPreferences,
    errorMsgGetPreferences,
    PreferencesData,
    isSuccessResAddPreferences,
    isFetchingAddPreferences,
    isErrorAddPreferences,
    errorMsgAddPreferences,
  } = useSelector(preferencesSelector);

  const [floorPresData, setFloorPresData] = useState([]);
  const [viewPreferData, setViewPreferData] = useState([]);
  const [parkingPreferData, setParkingPreferData] = useState([]);
  const [amenitiesPreferData, setAmenitiesPreferData] = useState([]);


  useEffect(() => {
    dispatch(getPreferencesList());
  }, [dispatch, t]);

  useEffect(() => {
    if (isSuccessResGetPreferences) {
      setFloorPresData(PreferencesData?.project_floor);
      setViewPreferData(PreferencesData?.project_view);
      setParkingPreferData(PreferencesData?.project_parking);
      setAmenitiesPreferData(PreferencesData?.project_amenities);
    }
  }, [isSuccessResGetPreferences]);


  useEffect(() => {
    if (isSuccessResAddPreferences) {
      dispatch(clearPreferencesState());
      history.push("/select-projects");
    }
  }, [isSuccessResAddPreferences])

  const docSelectOnChange = (elmParam, type) => {
    let temp_doc_list = [];
    if (type == "floor") {
      for (let f = 0; f < floorPresData.length; f++) {
        const doc_element = floorPresData[f];
        let temp_obj = {
          ...doc_element,
          isSelected:
            doc_element.DdtId == elmParam.DdtId
              ? elmParam.isSelected == 0 ? '1' : '0'
              : doc_element.isSelected == 1 ? '1' : '0',
          Title:
            doc_element.Title == elmParam.Title
              ? doc_element.Title
              : doc_element.Title,
          DdtId:
            doc_element.Title == elmParam.Title
              ? doc_element.DdtId
              : doc_element.DdtId,
          Status:
            doc_element.Title == elmParam.Title
              ? doc_element.Status
              : doc_element.Status,
        };

        temp_doc_list.push(temp_obj);
      }
      setFloorPresData(temp_doc_list);
    }

    if (type == "view") {
      for (let f = 0; f < viewPreferData.length; f++) {
        const doc_element = viewPreferData[f];
        let temp_obj = {
          ...doc_element,
          isSelected:
            doc_element.DdtId == elmParam.DdtId
              ? elmParam.isSelected == 0 ? '1' : '0'
              : doc_element.isSelected == 1 ? '1' : '0',
          Title:
            doc_element.Title == elmParam.Title
              ? doc_element.Title
              : doc_element.Title,
          DdtId:
            doc_element.Title == elmParam.Title
              ? doc_element.DdtId
              : doc_element.DdtId,
          Status:
            doc_element.Title == elmParam.Title
              ? doc_element.Status
              : doc_element.Status,
        };

        temp_doc_list.push(temp_obj);
      }
      setViewPreferData(temp_doc_list);
    }

    if (type == "parking") {
      for (let f = 0; f < parkingPreferData.length; f++) {
        const doc_element = parkingPreferData[f];
        let temp_obj = {
          ...doc_element,
          isSelected:
            doc_element.DdtId == elmParam.DdtId
              ? elmParam.isSelected == 0 ? '1' : '0'
              : doc_element.isSelected == 1 ? '1' : '0',
          Title:
            doc_element.Title == elmParam.Title
              ? doc_element.Title
              : doc_element.Title,
          DdtId:
            doc_element.Title == elmParam.Title
              ? doc_element.DdtId
              : doc_element.DdtId,
          Status:
            doc_element.Title == elmParam.Title
              ? doc_element.Status
              : doc_element.Status,
        };

        temp_doc_list.push(temp_obj);
      }
      setParkingPreferData(temp_doc_list);
    }

    if (type == "amenities") {
      for (let f = 0; f < amenitiesPreferData.length; f++) {
        const doc_element = amenitiesPreferData[f];
        let temp_obj = {
          ...doc_element,
          isSelected:
            doc_element.DdtId == elmParam.DdtId
              ? elmParam.isSelected == 0 ? '1' : '0'
              : doc_element.isSelected == 1 ? '1' : '0',
          Title:
            doc_element.Title == elmParam.Title
              ? doc_element.Title
              : doc_element.Title,
          DdtId:
            doc_element.Title == elmParam.Title
              ? doc_element.DdtId
              : doc_element.DdtId,
          Status:
            doc_element.Title == elmParam.Title
              ? doc_element.Status
              : doc_element.Status,
        };

        temp_doc_list.push(temp_obj);
      }
      setAmenitiesPreferData(temp_doc_list);
    }
  };

  const [infoMsgDialogBoxOpen, setInfoMsgDialogBoxOpen] = React.useState(false);

  const handleClose = () => {
    setInfoMsgDialogBoxOpen(false);
  };


  const addApplicantPrefe = () => {

    // const isFloor = floorPresData.find(element => {
    //   return element.isSelected == true;
    // });

    // const isView = viewPreferData.find(element => {
    //   return element.isSelected == true;
    // });

    // const isParking = parkingPreferData.find(element => {
    //   return element.isSelected == true;
    // });

    // const isAmenities = amenitiesPreferData.find(element => {
    //   return element.isSelected == true;
    // });

    // if(isFloor?.isSelected!=undefined || isFloor?.isSelected!=false && isView?.isSelected!=undefined || isView?.isSelected!=false && isParking?.isSelected!=undefined || isParking?.isSelected!=false && isAmenities?.isSelected!=undefined || isAmenities?.isSelected!=false){
    //   if(isFloor?.isSelected==true && isView?.isSelected==true && isParking?.isSelected==true && isAmenities?.isSelected==true){
    //     setInfoMsgDialogBoxOpen(false);
    //     history.push("/select-projects")
    //   } else{
    //     setInfoMsgDialogBoxOpen(true);
    //   }
    // }


    const allPreference = [...floorPresData, ...viewPreferData, ...parkingPreferData, ...amenitiesPreferData];
    var filteredArray = allPreference.filter(function (obj) {
      return obj.isSelected === "1" || obj.isSelected === true;
    }).map(function (obj) {
      return obj.DdtId;
    });

    let params = filteredArray;
    dispatch(addApplicantPreferences(params))
  }


  return (
    <FormCard>
      {(isFetchingGetPreferences) && (
        <Loading isOpen={isFetchingGetPreferences} />
      )}

      {(isFetchingAddPreferences) && (
        <Loading isOpen={isFetchingAddPreferences} />
      )}

      <Hidden smDown>
        <FormTitleBox
          title={t("title")}
          backUrl="/income-details"
          titleIcon={<FlatPreferenceTitleIcon fontSize="large" />}
        />
      </Hidden>
      <Hidden mdUp>
        <StepperBar
          callingForMobileIs={true}
          title={t("title")}
          backUrl="/income-details"
        />
      </Hidden>
      {isErrorGetPreferences && <AlertBox severity="error">{errorMsgGetPreferences}</AlertBox>}
      {isErrorAddPreferences && <AlertBox severity="error">{errorMsgAddPreferences}</AlertBox>}

      <div className={classes.formSection}>
        <div>
          <Grid container justify="center" alignItems="center">
            <Grid item md="auto" xs="auto">
              <Typography className={classes.pageTitle}>
                {t("subTitle")}
              </Typography>
              <FlatPreferenceBannerIcon className={classes.bannerIcon} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.actionSection}>
          <Typography variant="subtitle1" className={classes.wrapIcon}>
            <FloorIcon className="contentIcon" /> {t("floorSection.title")}
          </Typography>


          <div className={classes.contentWapper}>
            <Typography variant="h6" className={classes.contentTitle}>
              {t("floorSection.subTitle")}
            </Typography>
            <FormGroup
              row
              aria-label="familyIncome"
              name="familyIncome"
              className={classes.radioBtnsGroup}
            >
              {floorPresData?.map((item, index) => (
                <FormControlLabel key={index}
                  control={
                    <Checkbox
                      checked={item.isSelected == true}
                      name={item.Title}
                      color="primary"
                      key={item.DdtId}
                      onChange={(e) => docSelectOnChange(item, "floor")}
                    />
                  }
                  label={item.Title}
                  labelPlacement="end"
                  className={`${item.isSelected == true ? "active" : ""}`}
                />
              ))}
            </FormGroup>
          </div>
        </div>

        <div className={classes.actionSection}>
          <Typography variant="subtitle1" className={classes.wrapIcon}>
            <ViewIcon className="contentIcon" /> {t("viewSection.title")}
          </Typography>

          <div className={classes.contentWapper}>
            <Typography variant="h6" className={classes.contentTitle}>
              {t("viewSection.subTitle")}
            </Typography>
            <FormGroup
              row
              aria-label="familyIncome"
              name="familyIncome"
              className={classes.radioBtnsGroup}
            >
              {viewPreferData?.map((item, index) => (
                <FormControlLabel key={index}
                  control={
                    <Checkbox
                      color="primary"
                      checked={item.isSelected == true}
                      onChange={(e) => docSelectOnChange(item, "view")}
                      key={item.DdtId}
                      name={item.Title}
                    />
                  }
                  label={item.Title}
                  labelPlacement="end"
                  className={`${item.isSelected == true ? "active" : ""}`}
                />
              ))}
            </FormGroup>
          </div>
        </div>

        <div className={classes.actionSection}>
          <Typography variant="subtitle1" className={classes.wrapIcon}>
            <ParkingIcon className="contentIcon" /> {t("parkingSection.title")}
          </Typography>

          <div className={classes.contentWapper}>
            <Typography variant="h6" className={classes.contentTitle}>
              {t("parkingSection.subTitle")}
            </Typography>

            <FormGroup
              row
              aria-label="familyIncome"
              name="familyIncome"
              className={classes.radioBtnsGroup}
            >
              {parkingPreferData?.map((item, index) => (
                <FormControlLabel key={index}
                  control={
                    <Checkbox
                      color="primary"
                      checked={item.isSelected == true}
                      onChange={(e) => docSelectOnChange(item, "parking")}
                      key={item.DdtId}
                      name={item.Title}
                    />
                  }
                  label={item.Title}
                  labelPlacement="end"
                  className={`${item.isSelected == true ? "active" : ""}`}
                />
              ))}
            </FormGroup>
          </div>
        </div>

        <div className={classes.actionSection}>
          <Typography variant="subtitle1" className={classes.wrapIcon}>
            <AmenitiesIcon className="contentIcon" /> {t("smenitiesSection.title")}
          </Typography>

          <div className={classes.contentWapper}>
            <Typography variant="h6" className={classes.contentTitle}>
              {t("smenitiesSection.subTitle")}
            </Typography>
            <FormGroup
              row
              aria-label="familyIncome"
              name="familyIncome"
              className={classes.radioBtnsGroup}
            >
              {amenitiesPreferData?.map((item, index) => (
                <FormControlLabel key={index}
                  control={
                    <Checkbox
                      color="primary"
                      checked={item.isSelected == true}
                      onChange={(e) => docSelectOnChange(item, "amenities")}
                      key={item.DdtId}
                      name={item.Title}
                    />
                  }
                  label={item.Title}
                  labelPlacement="end"
                  className={`${item.isSelected == true ? "active" : ""}`}
                />
              ))}
            </FormGroup>
          </div>
        </div>
      </div>

      <div className={classes.footerSection}>
        <Grid container alignItems="center" justify="flex-end">
          <Grid item xs="auto">
            <Button
              // type="submit"
              variant="contained"
              color="primary"
              endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
              // onClick={() => history.push("/select-projects")}
              onClick={() => addApplicantPrefe()}
            >
              {t("submitButtonText")}
            </Button>
          </Grid>
        </Grid>
      </div>

      <Dialog
        onClose={handleClose}
        className={classes.dialogBox}
        aria-labelledby="customized-dialog-title"
        open={infoMsgDialogBoxOpen}
      >
        <DialogTitle
          onClose={handleClose}
          className={classes.dialogueTitle}
        >
          Please select all the listed Preferences
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            gutterBottom
            className={classes.dialogueContentText}
          >
            Please select all the listed Preferences options
          </Typography>
        </DialogContent>
      </Dialog>
    </FormCard>
  );
};

export default FlatPreferencesForm;
