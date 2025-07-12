import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
} from "../ConfirmDialogBox/ConfirmDialogBox";
import FormHelperText from "@material-ui/core/FormHelperText";
import { ImageSizes, SupportedFormats } from "../../../../utils/Common";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
  fileDataUpload,
  fileUploadSelector,
  clearFileState,
} from "../../../../redux/features/file/FileUploadSlice";
import { updateApplicantProfilePhoto, clearApplicantData, applicantSelector } from "../../../../redux/features/applicant/ApplicantSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 10,
  },
  input: {
    display: "none",
  },
}));

const ImageDialogBox = (props) => {
  const { onClose, selectedValue, open, width, profileImg } = props;
  const { t } = useTranslation();
  const [image, setImage] = useState(
    selectedValue
  );

  const classes = useStyles();
  const [cropper, setCropper] = useState();
  const [imageerror, setImageError] = useState("");

  const dispatch = useDispatch();

  const {
    isFileFetching,
    isFileSuccess,
    isFileError,
    fileErrorMessage,
    imageUrl,
  } = useSelector(fileUploadSelector);

  const {
    isSuccessResUpdateAgentProfilePhoto,
    updateagentProfilePhotoData
  } = useSelector(applicantSelector);

  const handleClose = () => {
    setImageError("");
    onClose(selectedValue);
  };

  const onChange = (e) => {
    const fileSize = e.target.files[0].size;
    const fileFormat = e.target.files[0].type;
    e.preventDefault();
    if (!SupportedFormats.PhotoFormats.includes(fileFormat)) {
      setImageError(t("photoImageDialog.fileErrors.fileFormatError"));
    } else if (
      // !(fileSize >= ImageSizes.FiftyKB && fileSize <= ImageSizes.FiveMB)
      !(fileSize <= ImageSizes.TwoMB)
    ) {
      setImageError(t("photoImageDialog.fileErrors.fileSizeError"));
    } else {
      setImageError("");
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const getCropData = () => {
    // onClose(selectedValue);
    // console.log("cropper", cropper.getCroppedCanvas().toDataURL());
    if (typeof cropper !== "undefined") {
      var file = dataURLtoFile(
        cropper.getCroppedCanvas().toDataURL(),
        "profile.png"
      );
      var updatePhoto = new FormData();
      updatePhoto.append("file", file);
      updatePhoto.append("ApplicantId", localStorage.getItem("applicantId"))
      dispatch(updateApplicantProfilePhoto(updatePhoto));
    }
  };

  useEffect(() => {
    if (isSuccessResUpdateAgentProfilePhoto) {
      onClose(false);
      // onClose(cropper.getCroppedCanvas().toDataURL());
      dispatch(clearApplicantData());
    }
  }, [cropper, dispatch, imageUrl, isSuccessResUpdateAgentProfilePhoto, onClose]);

  return (
    <>
      {isFileFetching && <Loading isOpen={isFileFetching} />}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        fullScreen={width === "xs" ? true : false}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t("photoImageDialog.title")}
        </DialogTitle>
        <DialogContent>
          {isFileError && (
            <AlertBox severity="error">{fileErrorMessage}</AlertBox>
          )}
          <Box style={{ marginTop: "-13px" }} marginBottom={2}>
            <Typography variant="body2" gutterBottom>
              {t("photoImageDialog.description")}
            </Typography>
          </Box>
          <Box
            height={width === "xs" ? 300 : 180}
            // marginTop={width === "xs" ? 6 : 0}
            marginY={width === "xs" ? 6 : 3}
          >
            <Cropper
              style={{ height: "100%", width: "100%" }}
              // zoomTo={1}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              src={image}
              // src="https://images.pexels.com/photos/3383195/pexels-photo-3383195.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              viewMode={2}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              checkCrossOrigin={false}
              // crossOrigin="use-credentials"
              crossOrigin="anonymous"
            />
          </Box>
        </DialogContent>
        <DialogActions
          style={{
            paddingLeft: width === "xs" ? 10 : 25,
            paddingRight: width === "xs" ? 10 : 25,
          }}
        >
          <Grid container spacing={2} alignItems="baseline">
            <Grid item xs={12} sm={6} >
              {/* Need to check here */}
              {/* <img style={{ width: "100px" }} src={profileImg} /> */}
              <Box marginY={1}>
                <input
                  name="file"
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={onChange}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    {t("photoImageDialog.chooseFileButton")}
                  </Button>
                </label>
                <FormHelperText style={{ color: "#f93d5c" }}>
                  {imageerror}
                </FormHelperText>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box marginY={1} marginBottom={width === "xs" ? 4 : 0}>
                {image && (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={getCropData}
                    fullWidth
                  >
                    {t("photoImageDialog.cropButton")}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withWidth()(ImageDialogBox);

ImageDialogBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
