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
import {
  getCategoryWiseDocumentsList,
  docDeclarationSelector
} from "../../../../redux/features/file/DocDeclarationSlice";

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
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    minWidth: 225,
    margin: theme.spacing(0,1.5,0,0),
    // height: "400px",
    overflow: "scroll",
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
        borderColor: "#0038C0",
        backgroundColor: "#EDF2FF",
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
    padding: theme.spacing(6, 3, 3, 0),
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

const ReservationMappingDialogBox = (props) => {
  const { open, onClose, width } = props;
  const classes = useStyles();
  const { t } = useTranslation("DeclarationAffidavitPageTrans");
  const formikRef = useRef();
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
    if (isSuccessTermsAndPrivacy) {
      setTermsAndPrivacyList(resDataTermsAndPrivacy);
      dispatch(clearFelpDeskState());
    }
  }, [isSuccessTermsAndPrivacy])

  const [categorywiseDocRecords, setCategoryWiseDocRecords] = useState([]);

  useEffect(() => {
    dispatch(getCategoryWiseDocumentsList()).then((resp) => {
      var resp_payload = resp?.payload;
      if (resp_payload !== undefined) {
        if (resp_payload.hasOwnProperty("data")) {
          if (resp_payload?.success) {
            setCategoryWiseDocRecords(resp_payload?.data);
          }
        }
      }
    });
  }, []);
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
        <DialogTitle id="alert-dialog-title">{t("DeclarationPage.title1")}</DialogTitle>
        <IconButton className={classes.dialogBoxCloseBtn} onClick={() => onClose()}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent className={classes.dialogContentSec}>
        {/* <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid>
            <Typography variant="h4" className={classes.sectionTitle}>Reservation/category</Typography>
          </Grid>
          <Grid>
            <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
          </Grid>
        </Grid> */}
        <Box className={classes.tabsRootCont}>
          <Tabs
            orientation={mobileIs ? "horizontal" : "vertical"}
            // variant="scrollable"
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
            {(categorywiseDocRecords && typeof categorywiseDocRecords === 'object' && Object.getPrototypeOf(categorywiseDocRecords).isPrototypeOf(Object)) ? Object.keys(categorywiseDocRecords).map((catitem, catkey) => (
              <Tab label={catitem} {...a11yProps(catkey)} />
            )) : ""
            }
            {/* <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography> */}

            {/* <Tab label={t("DeclarationPage.tabsLists.tabsGeneral")} {...a11yProps(0)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsCaste")} {...a11yProps(1)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsTribes")} {...a11yProps(2)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsDenotified")} {...a11yProps(3)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsNomadic")} {...a11yProps(4)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsDivyang")} {...a11yProps(5)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsState")} {...a11yProps(6)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsProject")}  {...a11yProps(7)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsReligious")} {...a11yProps(8)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsEx")} {...a11yProps(9)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsCIDCO")} {...a11yProps(10)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsNaviMathadi")} {...a11yProps(11)} />
            <Tab label={t("DeclarationPage.tabsLists.tabsNaviJournalist")} {...a11yProps(12)} /> */}

            {/* <Tab label={t("DeclarationPage.tabsLists.tabsEWS")} {...a11yProps(13)} /> */}
            {/* <Tab label={t("DeclarationPage.tabsLists.tabsGeneralCategory")} {...a11yProps(14)} /> */}
          </Tabs>
          {(categorywiseDocRecords && typeof categorywiseDocRecords === 'object' && Object.getPrototypeOf(categorywiseDocRecords).isPrototypeOf(Object)) ? Object.keys(categorywiseDocRecords).map((catitem, catkey) => (
            <TabPanel value={value} index={catkey}>
              <Box className={classes.tabContentSection}>
                <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
                <ol className={classes.secListContent}>
                  {Object.values(categorywiseDocRecords[catitem]['req_doc_list']).map((docitem, dockey) => (
                    <li>{docitem}</li>
                  ))}
                </ol>
              </Box>
            </TabPanel>
          )) : ""
          }
          {/* <TabPanel value={value} index={0}>
              <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
                <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                  <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                  <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                  <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                  <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                </ol>
              </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={1}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.caste")}</li>
                <li>{t("DeclarationPage.listofDocuments.casteValidity")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={2}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.caste")}</li>
                <li>{t("DeclarationPage.listofDocuments.casteValidity")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={3}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.caste")}</li>
                <li>{t("DeclarationPage.listofDocuments.casteValidity")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={4}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.caste")}</li>
                <li>{t("DeclarationPage.listofDocuments.casteValidity")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={5}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.handiCertificate")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={6}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.form-D")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={7}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAPCertificate")}</li>
                <li>{t("DeclarationPage.listofDocuments.geneology")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={8}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.affidavitF")}</li>
                <li>{t("DeclarationPage.listofDocuments.schoolCertificate")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={9}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.exServiceman")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={10}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.form-D")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={11}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.mathadi")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={12}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.Aadhar")}</li>
                <li>{t("DeclarationPage.listofDocuments.PAN")}</li>
                <li>{t("DeclarationPage.listofDocuments.cancelled")}</li>
                <li>{t("DeclarationPage.listofDocuments.domicile")}</li>
                <li>{t("DeclarationPage.listofDocuments.Income")}</li>
                <li>{t("DeclarationPage.listofDocuments.certificateIssued")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={13}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.notaryB")}</li>
              </ol>
            </Box>
          </TabPanel> */}
          {/* <TabPanel value={value} index={14}>
            <Box className={classes.tabContentSection}>
              <Typography variant="h4" className={classes.sectionTitle}>{t("DeclarationPage.listofDocuments.title")}</Typography>
              <ol className={classes.secListContent}>
                <li>{t("DeclarationPage.listofDocuments.notaryC")}</li>
              </ol>
            </Box>
          </TabPanel> */}
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

export default withWidth()(ReservationMappingDialogBox);
