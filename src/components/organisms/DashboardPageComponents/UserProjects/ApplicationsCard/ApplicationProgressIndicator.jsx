import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { ProjectStsCompletedIcon, ApplicationProgressIcon1, ApplicationProgressIcon2, ApplicationProgressIcon3, ApplicationProgressIcon4, ApplicationProgressIcon5, } from "../../../../atoms/SvgIcons/SvgIcons";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import {
    getStepperDetails
} from "../../../../../redux/features/stepper/StepperSlice";

const useStyles = makeStyles((theme) => ({
    mainRoot: {
        padding: theme.spacing(5, 15),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(5, 2),
        },
    },
    defaultInfoMsgBox: {
        textAlign: "center",
        padding: theme.spacing(8, 0, 3),
        "& .MuiTypography-body1": {
            color: "#65707D",
            fontSize: "0.8rem",
            marginBottom: theme.spacing(2.5)
        }
    },
    secTitle: {
        color: "#0F2940",
        fontSize: "1.25rem",
        fontWeight: 600,
        marginBottom: theme.spacing(0.5)
    },
    secTitleSubText: {
        color: "#65707D",
        fontSize: "0.8rem",
        fontWeight: "normal",
        marginBottom: theme.spacing(3)
    },
    applctnProcessBox: {
        background: "#FFFFFF",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderRadius: 10
    },
    boxHeader: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        padding: theme.spacing(1.5, 2)
    },
    lastUpdatedDateView: {
        color: "#4C5D6C",
        fontSize: "0.8rem",
        "& .MuiSvgIcon-root": {
            fontSize: "1.2rem",
            verticalAlign: "middle",
            marginRight: theme.spacing(0.5)
        },
        "& span": {
            verticalAlign: "middle",
            display: "inline-block",
            marginRight: theme.spacing(0.5)
        },
        "& strong": {
            verticalAlign: "middle",
            display: "inline-block"
        },
    },
    statusViewChip: {
        backgroundColor: "rgba(33, 150, 83, 0.05)",
        border: "1px solid rgba(33, 150, 83, 0.1)",
        borderRadius: 40,
        color: "#219653",
        fontSize: "0.9rem",
        fontWeight: 600,
        textTransform: "capitalize",
        padding: theme.spacing(1, 4),
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.8rem",
            padding: theme.spacing(0.5, 3),
        },
        "&.rejected": {
            backgroundColor: "rgba(235, 87, 87, 0.05)",
            borderColor: "rgba(235, 87, 87, 0.1)",
            color: "#EB5757"
        }
    },
    boxContentCont: {
        maxWidth: 400
    },
    stsHeader: {
        padding: theme.spacing(2, 2, 0)
    },
    stepperSec: {
        // paddingRight: theme.spacing(5),
        // [theme.breakpoints.down("sm")]: {
        //     padding: theme.spacing(2, 0),
        // },
    },
    stepperBox: {
        textAlign: "center",
        position: "relative",
        // height: 80,
        "&:hover": {
            "& $stepperText": {
                opacity: 1,
            }
        }
    },
    stepperLabel: {
        position: "absolute",
        marginTop: "35px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "0.625rem",
        textAlign: "center",
    },
    numRoundBox: {
        backgroundColor: "#EDEEEF",
        border: "2px solid #F1F4F8",
        boxShadow: "0px 0px 20px rgba(0, 25, 121, 0.06)",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 2,
        color: "#FFFFFF",
        [theme.breakpoints.down("xs")]: {
            width: 30,
            height: 30,
        },
        /* "&.active": {
          borderColor: "rgba(204, 222, 245, 0.6)",
          width: 46,
          height: 46,
        }, */
        "&.Completed": {
            backgroundColor: "#219653",
            boxShadow: "0px 0px 40px rgba(0, 25, 121, 0.1)"
        },
        "& .MuiSvgIcon-root": {
            fontSize: "1.2rem",
            [theme.breakpoints.down("xs")]: {
                fontSize: "0.8rem",
            },
        },
    },
    stepperText: {
        color: "rgba(76, 93, 108, 0.8)",
        fontSize: "0.6rem",
        position: "absolute",
        top: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: 0,
        /* "&.active": {
          color: "#FFFFFF",
          fontWeight: "bold",
        }, */
        "&.Completed": {
            color: "#0F2940",
        },
    },
    stepBeforeAfterLine: {
        borderTop: "2px solid #F1F4F8",
        position: "absolute",
        top: "30%",
        left: 0,
        width: "calc(50% - 14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: "translate(0, -50%)",
        zIndex: 1,
        "&.after": {
            left: "50%",
            transform: "translate(14px, -50%)"
        },
        "&.Completed": {
            borderColor: "#219653"
        }
    },
    actionBtnSection: {
        [theme.breakpoints.down("sm")]: {
            borderTop: "1px solid rgba(1, 81, 202, 0.1)",
            padding: theme.spacing(1.25),
            textAlign: "center"
        },
    },
    compldBtn: {
        background: "linear-gradient(326deg, rgb(0 13 199) 0%, rgb(16 147 245) 70%)",
        border: 0
    },
    docUploadErrorTxtView: {
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#ff9800",
        padding: theme.spacing(1, 0),
    },
    applyNewProjBtnCol: {
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
            marginBottom: theme.spacing(1)
        }
    },
}));

const ApplicationProgressIndicator = (props) => {
    const { projectDetails } = props;
    const classes = useStyles();
    const { t } = useTranslation("DashboardPageTrans");
    const dispatch = useDispatch();

    const history = useHistory();
    const { stepperData, isFetchingStepper, errorMessageStepper, isErrorStepper } = useSelector((state) => state.stepper);
    const [stepperList, setStepperList] = useState([]);
    const [overallApplicationStatus, setOverallApplicationStatus] = useState("");
    const [applicationStep, setApplicationStep] = useState([]);
    const [savedProjCompletedIs, setSavedProjCompletedIs] = useState(false);


    useEffect(() => {
        if (projectDetails) {
            let ApplicationObj = [];
            setApplicationStep(projectDetails.Steps)
        }
    }, [projectDetails])


    return (
        <div className={classes.boxContentCont}>
            {/* {isFetchingStepper && <Loading isOpen={isFetchingStepper} />}
      {isErrorStepper && (
        <AlertBox severity="error">{errorMessageStepper}</AlertBox>
      )}
      {stepperList.length === 0 && (
        <Box className={classes.defaultInfoMsgBox}>
          <Typography>{t("userProjects.saved.noDataHelpText")}</Typography>
          <Button variant="contained" color="primary">{t("userProjects.saved.noDataStartApplyBtnTxt")}</Button>
        </Box>
      )} */}

            <Grid container alignItems="center">
                <Grid item md xs={12} className={classes.stepperSec}>
                    <Grid container justify="center">
                        {projectDetails.Steps.map((element, index) => (
                            <Grid item xs key={index} style={{ position: "relative" }}>
                                <Box className={classes.stepperBox}>
                                    <Tooltip title={element.description} disableInteractive>
                                        <Box className={`${classes.numRoundBox} ${element.step1 || element.step2 || element.step3 || element.step4 || element.step5}`}>
                                            {element.step1 === "Completed" && <ProjectStsCompletedIcon /> || element.step1 === "Pending" && <ApplicationProgressIcon1 />}
                                            {element.step2 === "Completed" && <ProjectStsCompletedIcon /> || element.step2 === "Pending" && <ApplicationProgressIcon2 />}
                                            {element.step3 === "Completed" && <ProjectStsCompletedIcon /> || element.step3 === "Pending" && <ApplicationProgressIcon3 />}
                                            {element.step4 === "Completed" && <ProjectStsCompletedIcon /> || element.step4 === "Pending" && <ApplicationProgressIcon5 />}
                                            {element.step5 === "Completed" && <ProjectStsCompletedIcon /> || element.step5 === "Pending" && <ApplicationProgressIcon4 />}
                                        </Box>
                                    </Tooltip>
                                    {index != 0 && (
                                        <span className={`${classes.stepBeforeAfterLine} ${element.step1 || element.step2 || element.step3 || element.step5 || element.step4}`}></span>
                                    )}
                                    {index != 4 && (
                                        <span className={`${classes.stepBeforeAfterLine} after ${element.step1 || element.step2 || element.step3 || element.step5 || element.step4}`}></span>
                                    )}
                                </Box>
                                {index == 0 && <span className={classes.stepperLabel}>{t("userProjects.projectSatus.step1.label0")} <br /> {t("userProjects.projectSatus.step1.label1")}</span>}
                                {index == 1 && <span className={classes.stepperLabel}>{t("userProjects.projectSatus.step2.label0")} <br /> {t("userProjects.projectSatus.step2.label1")}</span>}
                                {index == 2 && <span className={classes.stepperLabel}>{t("userProjects.projectSatus.step3.label0")} <br /> {t("userProjects.projectSatus.step3.label1")}</span>}
                                {index == 3 && <span className={classes.stepperLabel}>{t("userProjects.projectSatus.step4.label0")} <br /> {t("userProjects.projectSatus.step4.label1")}</span>}
                                {index == 4 && <span className={classes.stepperLabel}>{t("userProjects.projectSatus.step5.label0")} <br /> {t("userProjects.projectSatus.step5.label1")}</span>}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {/* <Grid item md="auto" xs={12} className={classes.actionBtnSection}>
                  {savedProjCompletedIs ?
                    <Button color="primary" variant="contained" className={classes.compldBtn} onClick={() => history.push("/personal-details")}>{t("userProjects.saved.applyNewBtnText")}</Button>
                    :
                    <Button color="primary" variant="contained" className={classes.compldBtn} onClick={() => pendingPageRedirecting()}>{t("userProjects.saved.prcdToCompleteBtnTxt")}</Button>
                  }
                </Grid> */}
            </Grid>
        </div>
    );
};

export default ApplicationProgressIndicator;
