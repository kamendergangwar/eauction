import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
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
import { TutorialVidPlayIcon } from "../../../atoms/SvgIcons/SvgIcons";
import FormControl from "../../FormControl/FormControl";
import PropTypes from 'prop-types';
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector, useDispatch } from "react-redux";
import { getTermsAndPrivacyPolicy, clearHelpDeskData, clearFelpDeskState, helpDeskSelector } from "../../../../redux/features/helpDesk/HelpDeskSlice";

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
    padding: theme.spacing(0)
  },
  tabsRootCont: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  termsNdPolicyTabs: {
    minWidth: 225,
    padding: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      minHeight: 75
    },
    "& .MuiTab-root": {
      color: "#1D3D62",
      fontSize: "0.8rem",
      fontWeight: "normal",
      textAlign: "left",
      minWidth: "auto",
      minHeight: "auto",
      width: "100%",
      position: "relative",
      padding: theme.spacing(1, 1.5),
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        backgroundColor: "#FFFFFF",
        border: "1px solid #EEEEEE",
        borderRadius: 8,
        color: "#1D3D62",
        marginRight: theme.spacing(1),
        padding: theme.spacing(0.5, 1.5)
      },
      "&.Mui-selected": {
        color: "#0038C0",
        [theme.breakpoints.down("sm")]: {
          backgroundColor: "rgba(1, 81, 202, 0.1)",
          borderColor: "#0151CA",
          color: "#0151CA"
        },

        "&:before": {
          backgroundColor: "#0038C0",
          content: "''",
          display: "inline-block",
          width: 4,
          height: 15,
          marginRight: theme.spacing(1),
          [theme.breakpoints.down("sm")]: {
            display: "none"
          },
        }
      },
      "& .MuiTab-wrapper": {
        alignItems: "flex-start"
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#0038C0",
      height: 4
    }
  },
  tabContentSection: {
    padding: theme.spacing(3, 3, 3, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    }
  },
  sectionTitle: {
    color: "#0038C0",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2)
  },
  sectionPara: {
    color: "#65707D",
    fontSize: "0.8rem",
    fontWeight: "normal",
    marginBottom: theme.spacing(2)
  },
  listTitle: {
    color: "#0F2940",
    fontWeight: 600,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(1),
  },
  secListContent: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    "& li": {
      color: "#65707D",
      fontSize: "0.8rem",
      fontWeight: "normal",
      marginBottom: theme.spacing(1)
    }
  },
  sectionDivider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  paraContTitle: {
    color: "#0F2940",
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2)
  },

  /* dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  }, */
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TermsPrivacyPolicyDialogBox = (props) => {
  const { open, onClose, width } = props;
  const classes = useStyles();
  const formikRef = useRef();
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [mobileIs, setMobileIs] = React.useState(false);
  const dispatch = useDispatch();
  const [termsAndPrivacyList, setTermsAndPrivacyList] = useState([])

  const {
    isFetchingTermsAndPrivacy,
    isErrorTermsAndPrivacy,
    errorMsgTermsAndPrivacy,
    isSuccessTermsAndPrivacy,
    resDataTermsAndPrivacy,
  } = useSelector(helpDeskSelector);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (width == "xs" || width == "sm") {
      setMobileIs(true);
    } else {
      setMobileIs(false);
    }
  }, [width]);

  useEffect(() => {
    dispatch(getTermsAndPrivacyPolicy());
  }, [t]);

  useEffect(() => {
    if(isSuccessTermsAndPrivacy) {
      setTermsAndPrivacyList(resDataTermsAndPrivacy);
      dispatch(clearFelpDeskState());
    }
  },[isSuccessTermsAndPrivacy])

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialogRoot}
    >
        {(isFetchingTermsAndPrivacy) && (
            <Loading isOpen={isFetchingTermsAndPrivacy} />
        )}
        {isErrorTermsAndPrivacy && <AlertBox severity="error">{errorMsgTermsAndPrivacy}</AlertBox>}
      <Box className={classes.dialogBoxTitle}>
        <DialogTitle id="alert-dialog-title">{t("termsAndPpSection.title")}</DialogTitle>
        <IconButton className={classes.dialogBoxCloseBtn} onClick={() => onClose()}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent className={classes.dialogContentSec}>
        <Box className={classes.tabsRootCont}>
          <Tabs
            orientation={mobileIs ? "horizontal" : "vertical"}
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.termsNdPolicyTabs}
            TabIndicatorProps={{
              style: {
                display: mobileIs ? "block" : "none",
              },
            }}
          >
            <Tab label={termsAndPrivacyList?.basic_terms?.side_heading} {...a11yProps(0)} />
            <Tab label={termsAndPrivacyList?.project_fee?.side_heading} {...a11yProps(1)} />
            <Tab label={termsAndPrivacyList?.refund_policy?.side_heading} {...a11yProps(2)} />
            <Tab label={termsAndPrivacyList?.data_security?.side_heading} {...a11yProps(3)} />
            <Tab label={termsAndPrivacyList?.payment_setting?.side_heading} {...a11yProps(4)} />
            <Tab label={termsAndPrivacyList?.legal_policies?.side_heading} {...a11yProps(5)} />
            <Tab label={termsAndPrivacyList?.site_features?.side_heading} {...a11yProps(6)} />
          </Tabs>
            <TabPanel value={value} index={0}>
              <Box className={classes.tabContentSection}>
                <Typography variant="h4" className={classes.sectionTitle}>{termsAndPrivacyList?.basic_terms?.side_content?.heading}</Typography>
                <Typography className={classes.sectionPara}>{termsAndPrivacyList?.basic_terms?.side_content?.content}</Typography>

                <Typography variant="h5" className={classes.listTitle}>{termsAndPrivacyList?.basic_terms?.side_content?.Regisration_fee?.heading} :</Typography>
                <ol className={classes.secListContent}>
                  <li>{termsAndPrivacyList?.basic_terms?.side_content?.Regisration_fee?.content_one}</li>
                  <li>{termsAndPrivacyList.basic_terms?.side_content?.Regisration_fee?.content_two}</li>
                </ol>
                {/* <Divider className={classes.sectionDivider} /> */}

                {/* <Typography variant="h5" className  ={classes.paraContTitle}>{termsAndPrivacyList?.project_fee?.side_content?.heading}</Typography>
                <Typography className={classes.sectionPara}>
                  {termsAndPrivacyList?.project_fee?.side_content?.content}
                </Typography> */}
              </Box>
            </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{termsAndPrivacyList?.project_fee?.side_heading}</Typography>
              <Typography className={classes.sectionPara}>
                {termsAndPrivacyList?.project_fee?.side_content?.content}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{termsAndPrivacyList?.refund_policy?.side_heading}</Typography>
              <Typography className={classes.sectionPara}>
                {termsAndPrivacyList?.refund_policy?.side_content?.content}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{termsAndPrivacyList?.data_security?.side_heading}</Typography>
              <Typography className={classes.sectionPara}>
                {termsAndPrivacyList?.data_security?.side_content?.content}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{termsAndPrivacyList?.payment_setting?.side_heading}</Typography>
              <Typography className={classes.sectionPara}>
                {termsAndPrivacyList?.payment_setting?.side_content?.content}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{termsAndPrivacyList?.legal_policies?.side_heading}</Typography>
              <Typography className={classes.sectionPara}>
                {termsAndPrivacyList?.legal_policies?.side_content?.content}
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{termsAndPrivacyList?.site_features?.side_heading}</Typography>
              <Typography className={classes.sectionPara}>
                {termsAndPrivacyList?.site_features?.side_content?.content}
              </Typography>
            </Box>
          </TabPanel>
        </Box>
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

export default withWidth()(TermsPrivacyPolicyDialogBox);
