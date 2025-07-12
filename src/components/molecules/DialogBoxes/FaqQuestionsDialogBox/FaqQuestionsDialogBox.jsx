import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from "react-redux";
import Divider from '@material-ui/core/Divider';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import moment from "moment";
import FormControl from "../../FormControl/FormControl";
import Loading from "../../../atoms/Loading/Loading";
import { getfrequentlyAskedQue, clearHelpDeskData, clearFelpDeskState, helpDeskSelector } from "../../../../redux/features/helpDesk/HelpDeskSlice";

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
  searchIcon: {
    backgroundColor: "#0151CA",
    "& .MuiIconButton-label": {
      color: "#fff"
    }
  },
  clearIcon: {
    backgroundColor: "#000 !important",
    padding: 0,
  },
  questionsListViewCont: {
    padding: 0,
    "& .MuiListItem-root": {
      backgroundColor: "#FFFFFF",
      border: "1px solid #E6EAF9",
      boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
      borderRadius: 10,
      padding: theme.spacing(1.5, 2),
      marginBottom: theme.spacing(1.5),
      "& .MuiTypography-body1": {
        color: "#0F2940",
        fontSize: "0.9rem"
      }
    },
    "& .MuiIconButton-root": {
      backgroundColor: "rgba(1, 81, 202, 0.1)",
      padding: 5,
      "& .MuiSvgIcon-root": {
        color: "#0151CA",
        fontSize: "1.1rem"
      }
    }
  },
  qstnAnswerViewCont: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E6EAF9",
    borderRadius: 10
  },
  qstnTitle: {
    color: "#00437E",
    fontSize: "1rem",
    textAlign: "center",
    padding: theme.spacing(3)
  },
  answerViewCont: {
    backgroundColor: "rgba(225, 244, 255, 0.38)",
    "& ul": {
      margin: 0,
      padding: theme.spacing(2, 2, 2, 4),
      "& li": {
        color: "#0F2940",
        fontSize: "0.8rem",
        marginBottom: theme.spacing(2),
        "&:last-child": {
          marginBottom: 0
        }
      }
    }
  },
  faqTittle: {
    color: "#00437E",
    fontSize: "1rem",
    fontWeight: 600
  },
  faqDesc: {
    fontSize: "0.9rem",
  }

  /* dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  }, */
}));

const FaqQuestionsDialogBox = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const formikRef = useRef();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [allFaqList, setAllFaqList] = useState([]);
  const [allFaqListCopy, setAllFaqListCopy] = useState([]);
  const [selectedQstAndAns, setSelectedQstAndAns] = useState({});
  const [qstAndAnsSecIs, setQstAndAnsSecIs] = useState(false);
  const [expanded, setExpanded] = React.useState(0);
  const {
    isSuccessFaq,
    resDataFaq,
    isFetchingFaq,
  } = useSelector(helpDeskSelector);


  useEffect(() => {
    dispatch(getfrequentlyAskedQue());
  }, []);


  useEffect(() => {
    if (isSuccessFaq) {
      setAllFaqList(resDataFaq);
      setAllFaqListCopy(resDataFaq);
      dispatch(clearFelpDeskState());
    }
  }, [isSuccessFaq]);

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
  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log("values", values.searchedQuestion);


    // const obj ={
    //   1: {name:"josh",age:2, symbol: "abc", id: 1},
    //   2: {name:"mike",age:4, symbol: "efg", id: 2}
    // }

    // const search = (input) => {
    //   return allFaqList.filter(key => {
    //     return allFaqList[key].includes('documents');
    //   })
    //   .map(foundKey => ({...obj[foundKey], key: foundKey }))
    // }

    // console.log(allFaqList, "allFaqList")
    // const result = search(values.searchedQuestion)
    // console.log(result);

    // console.log(handleSearch(allFaqList, values.searchedQuestion), "handleSearch(allFaqList, 'A1') ----------------")

    const result = handleSearch(allFaqList, values.searchedQuestion == "" ? "" : values.searchedQuestion);

    if (result.length != 0) {
      setAllFaqList(handleSearch(allFaqList, values.searchedQuestion));
    }

  };

  const handleSearch = (allFaqList, data) => (
    allFaqList.filter((obj) => (
      Object.values(obj)
        .flat()
        .some((v) => (
          `${v}`.toLowerCase().includes(`${data}`.toLowerCase())
        ))
    ))
  );

  const selectQstAndAns = (param) => {
    setSelectedQstAndAns(param);
    setQstAndAnsSecIs(true);
  };

  const clearSearch = () => {
    formikRef.current.setFieldValue("searchedQuestion", "");
    setAllFaqList(allFaqListCopy);
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialogRoot}
    >
      {(isFetchingFaq) && (
        <Loading isOpen={isFetchingFaq} />
      )}
      <Box className={classes.dialogBoxTitle}>
        <DialogTitle id="alert-dialog-title">{t("faqSection.title")}</DialogTitle>
        <IconButton className={classes.dialogBoxCloseBtn} onClick={() => onClose()}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent className={classes.dialogContentSec}>
        {qstAndAnsSecIs == false && <Formik
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
                placeholder={t("faqSection.searchInputPlaceholder")}
                name="searchedQuestion"
                type="text"
                id="searchedQuestion"
                // required
                inputProps={{ maxLength: 50 }}
                InputProps={{
                  endAdornment: (
                    <>
                      {formikRef.current?.values?.searchedQuestion?.length > 0 ? (<InputAdornment position="end">
                        <IconButton className={classes.clearIcon}>
                          <ClearOutlinedIcon onClick={() => clearSearch()} />
                        </IconButton>
                      </InputAdornment>) : ""}

                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          aria-label="Submit"
                          edge="end" className={classes.searchIcon}
                        >
                          <SearchOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            </Form>
          )}
        </Formik>}
        {!qstAndAnsSecIs &&
          <Box>
            <List className={classes.questionsListViewCont} aria-label="secondary mailbox folders">
              {/* {allFaqList.map((element, i) => (
                <ListItem key={i}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography>{element?.group_name || "-"}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton size="small" onClick={() => selectQstAndAns(element)}>
                        <ArrowForwardIosOutlinedIcon size="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              ))} */}

              <Box>
                {allFaqList.map((element, i) => (
                  <Accordion expanded={expanded == element.group_id}
                    onChange={handleChange(element.group_id)}>
                    <AccordionSummary
                      style={{ background: "rgb(0 0 0 / 2%)" }}
                      expandIcon={<IconButton size="small">
                        <ExpandLessOutlinedIcon size="small" />
                      </IconButton>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.faqTittle}>{element.group_name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {(element.questions[0]?.answer.split('.').pop() == "jpeg" || element.questions[0]?.answer.split('.').pop() == "png") ? <img
                        src={`${element.questions[0]?.answer}`}
                        alt={element.question}
                        loading="lazy"
                        width="100%"
                      /> : <span dangerouslySetInnerHTML={{ __html: element.questions[0]?.answer }} />
                        // <Typography className={classes.faqDesc}>
                        //   {element.questions[0]?.answer}
                        // </Typography>
                      }
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </List>
          </Box>
        }
        {qstAndAnsSecIs &&
          <Box>
            <Box marginBottom={0.5}>
              <IconButton size="small" onClick={() => setQstAndAnsSecIs(false)}>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Box>
            <Box className={classes.qstnAnswerViewCont}>
              <Typography variant="h4" className={classes.qstnTitle}>{selectedQstAndAns.group_name}</Typography>
              <Box className={classes.answerViewCont}>
                <ul>
                  {selectedQstAndAns.questions.map((element, i) => (
                    <>
                      {/* {element.answer && <li key={i}>{element.answer}</li>}
                      {(element.question_id != "2035" || element.question_id == "2038" || element.question_id == "2037") && <li key={i}>{element.answer}</li>}
                      <li key={i}>{element.answer}</li> */}
                      {(element.answer.split('.').pop() == "jpeg" || element.answer.split('.').pop() == "png") ? <img
                        src={`${element.answer}`}
                        alt={element.question}
                        loading="lazy"
                        width="100%"
                      /> : <li key={i}>{element.answer}</li>}
                    </>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>
        }
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

export default FaqQuestionsDialogBox;
