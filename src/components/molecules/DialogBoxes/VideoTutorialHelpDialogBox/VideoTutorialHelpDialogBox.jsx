import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useSelector, useDispatch } from "react-redux";
import { TutorialVidPlayIcon } from "../../../atoms/SvgIcons/SvgIcons";
import FormControl from "../../FormControl/FormControl";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { getHelpDeskVideos, helpDeskSelector } from "../../../../redux/features/helpDesk/HelpDeskSlice";
import tempVidThumb from "../../../../assets/youtube-thumbnail.jpeg";
const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    "& .MuiDialog-paper": {
      minWidth: 750,
      [theme.breakpoints.down("sm")]: {
        minWidth: "auto",
        margin: theme.spacing(2)
      }
    }
  },
  dialogBoxTitle: {
    position: "relative",
    "& .MuiTypography-h6": {
      color: "#00437E",
      textAlign: "center",
      fontSize: "0.9rem"
    }
  },
  dialogBoxCloseBtn: {
    position: "absolute",
    top: "50%",
    right: 5,
    transform: "translateY(-50%)"
  },
  dialogContentSec: {
    padding: theme.spacing(3, 10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },
  globSearchInputBox: {
    margin: 0,
    marginBottom: theme.spacing(4.5),
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: 40,
      "& fieldset": {
        borderRadius: 40,
        border: 0,
        boxShadow: "0px 0px 20px rgb(1 81 202 / 10%)"
      },
    },
    "& .MuiInputBase-input": {
      paddingLeft: theme.spacing(3)
    },
    "& .MuiIconButton-root": {
      backgroundColor: "#0151CA",
      "& .MuiIconButton-label": {
        color: "#fff"
      }
    }
  },
  videosListViewCont: {
    padding: 0,
    "& .MuiListItem-root": {
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
      borderRadius: 8,
      padding: theme.spacing(0),
      marginBottom: theme.spacing(2),
      overflow: "hidden"
    }
  },
  cardMediaImg: {
    minWidth: 250,
    height: "100%"
  },
  cardBody: {
    padding: theme.spacing(1.5, 2)
  },
  listTitle: {
    color: "#0F2940",
    fontSize: "0.9rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  listDescription: {
    color: "#65707D",
    fontSize: "0.65rem",
    marginBottom: theme.spacing(1.2),
  },
  cardActionSec: {
    textAlign: "right",
    "& .MuiButton-root": {
      fontSize: "0.8rem",
      "& .MuiSvgIcon-root": {
        fontSize: "0.9rem"
      }
    }
  },
  tutorialVideoFrame: {
    borderRadius: 8
  }
  /* dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  }, */
}));

const VideoTutorialHelpDialogBox = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const formikRef = useRef();
  const { t } = useTranslation();
  const [tutorialVideoList, setTutorialVideoList] = useState([]);
  const [tutorialVideoSrc, setTutorialVideoSrc] = useState("");
  const dispatch = useDispatch();
  const {
    isSuccessHelpDeskVideos,
    isFetchingHelpDeskVideos,
    isErrorHelpDeskVideos,
    errorMsgHelpDeskVideos,
    resDataHelpDeskVideos,
  } = useSelector(helpDeskSelector);

  const initialValues = {
    searchedQuestion: ""
  };
  const validationSchema = yup.object({
    searchedQuestion: yup
      .string()
      .required(
        t("Search something...")
      )
      .matches(
        /^[a-zA-Z ]*$/,
        t("Write properly...")
      ),
  });

  useEffect(() => {
    dispatch(getHelpDeskVideos(""));
  }, []);

  useEffect(() => {
    if (isSuccessHelpDeskVideos && resDataHelpDeskVideos) {
      console.log("resDataHelpDeskVideos", resDataHelpDeskVideos);
      setTutorialVideoList(resDataHelpDeskVideos);
    }
  }, [isSuccessHelpDeskVideos, resDataHelpDeskVideos]);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    let param = "";
    console.log("values", values);
    if (values.searchedQuestion) {
      param = "&data=" + values.searchedQuestion;
      dispatch(getHelpDeskVideos(param));
    }
    // const requestData = new FormData();
    // dispatch(saveDocument(requestData));
  };

  const selectVideo = (params) => {
    setTutorialVideoSrc(params.VideoLink);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialogRoot}
    >
      {isFetchingHelpDeskVideos && <Loading isOpen={isFetchingHelpDeskVideos} />}
      <Box className={classes.dialogBoxTitle}>
        <DialogTitle id="alert-dialog-title">{t("videoTutorialSection.title")}</DialogTitle>
        <IconButton className={classes.dialogBoxCloseBtn} onClick={() => onClose()}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent className={classes.dialogContentSec}>
        {!tutorialVideoSrc &&
          <>
            {/* <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={onSubmit}
              innerRef={formikRef}
              enableReinitialize
            >
              {({ submitForm }) => (
                <Form noValidate autoComplete="off">
                  <FormControl
                    className={classes.globSearchInputBox}
                    control="input"
                    variant="outlined"
                    placeholder={t("videoTutorialSection.searchInputPlaceholder")}
                    name="searchedQuestion"
                    type="text"
                    id="searchedQuestion"
                    // required
                    inputProps={{ maxLength: 50 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            type="submit"
                            aria-label="Submit"
                            edge="end"
                          >
                            <SearchOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form>
              )}
            </Formik> */}
            <Box>
              <List className={classes.videosListViewCont} aria-label="secondary mailbox folders">
                {tutorialVideoList.map((element, i) => (
                  <ListItem key={i}>
                    <Grid container>
                      <Grid item>
                        {/* <CardMedia
                          className={classes.cardMediaImg}
                          // image={element?.VideoThumbNail || tempVidThumb
                          image={tempVidThumb}
                          title="Tutorial Video Post Image"
                        /> */}

                        <CardMedia>
                          <iframe className={classes.tutorialVideoFrame} width="100%" height="250" src={element.VideoLink} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                        </CardMedia>
                      </Grid>
                      <Grid item xs>
                        <Box className={classes.cardBody}>
                          <Typography variant="h4" className={classes.listTitle}>{element.Title || "-"}</Typography>
                          <Typography className={classes.listDescription}>{element.Description || "-"}</Typography>
                          {/* <Box className={classes.cardActionSec}>
                            <Button color="primary" endIcon={<TutorialVidPlayIcon />} onClick={() => selectVideo(element)}>Watch Video</Button>
                          </Box> */}
                        </Box>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
                {isSuccessHelpDeskVideos && tutorialVideoList.length === 0 &&
                  <AlertBox severity="error">{t("No Data Found!")}</AlertBox>
                }
              </List>
            </Box>
          </>
        }
        {/* {tutorialVideoSrc &&
          <Box>
            <Box marginBottom={0.5}>
              <IconButton size="small" onClick={() => setTutorialVideoSrc("")}>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Box>
            <iframe className={classes.tutorialVideoFrame} width="100%" height="350" src={tutorialVideoSrc} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
          </Box>
        } */}
      </DialogContent>
      {/* <DialogActions className={classes.dialogActions}>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={() => onClose(false)}
          color="primary"
        >
          {t("multipleCategoryDialog.cancelButton")}
        </Button>
        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={() => onClose(true)}
          color="primary"
          autoFocus
        >
          {t("multipleCategoryDialog.confirmButton")}
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default VideoTutorialHelpDialogBox;
