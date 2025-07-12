import React, { useState, useRef } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { layoutStyles } from "./Layout.styles";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EauctionProjectStepperSelector, clearEauctiongetProjectStepperData, getProjectProgress } from "../../../redux/features/eauction/projectStepperSlice";
import { clearEauctionSingleProjectData, getSingleAuctionProject } from "../../../redux/features/eauction/eauctionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Step, StepConnector, StepLabel, Stepper, makeStyles, withStyles } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GavelIcon from '@material-ui/icons/Gavel';
import clsx from "clsx";
import Header from "../../atoms/Header/Header";

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 45,
        height: 45,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        background: "#f27807",
        borderRadius: "50%",
        // boxShadow: "inset 0px 0px 0px 3px white",
        border: "3px solid white",
    },
    completed: {
        background: "#219653",
        // boxShadow: "0px 0px 40px rgba(0, 25, 121, 0.1)",
        borderRadius: "50%",
        // boxShadow: "inset 0px 0px 0px 3px #219653",
        border: "3px solid white",
    },
});

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 20,
    },
    active: {
        "& $line": {
            background: "white",
        },
    },
    completed: {
        "& $line": {
            background: "white",
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#ccc",
        borderRadius: 1,
    },
})(StepConnector);

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
    const icons = {
        1: <DescriptionIcon />,
        2: <PaymentIcon />,
        3: <AccountBalanceIcon />,
        4: <AssignmentIcon />,
        5: <GavelIcon />,
        6: <SaveIcon />,
    };

    const checkicons = {
        1: <CheckIcon />,
        2: <CheckIcon />,
        3: <CheckIcon />,
        4: <CheckIcon />,
        5: <CheckIcon />,
        6: <CheckIcon />,
    };


    if (props?.StepCount) {
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {/* {completed ? checkicons[String(props.icon)] : icons[String(props.icon)]} */}
                {props.StepCount}
            </div>
        );
    } else {
        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {completed ? checkicons[String(props.icon)] : icons[String(props.icon)]}
            </div>
        );
    }
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,

    stepCount: PropTypes.number,
};



const ApplyTenderLayout = (props) => {
    const { isStepper, children, noScrollIs, width, step, type } = props;
    const classes = layoutStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation("InitialPageTrans");
    const {
        isgetProjectStepper,
        isSuccessgetProjectStepper,
        isErrorgetProjectStepper,
        getprojectStepperData,
        errorMessagegetProjectStepper,
        getProjectStepper,
        getProjectActiveStep
    } = useSelector(EauctionProjectStepperSelector);

    useEffect(() => {
        dispatch(getProjectProgress());
        dispatch(getSingleAuctionProject());
        return () => {
            dispatch(clearEauctionSingleProjectData());
            dispatch(clearEauctiongetProjectStepperData());
        }
    }, []);

    const getStepLabel = (step) => {
        switch (step) {
            case 1:
                return 'Declaration'
            case 2:
                return 'E-Auction Fee'
            case 3:
                return 'EMD Fee'
            case 4:
                return 'Technical Bid'
            case 5:
                return 'Close Bid'
            case 6:
                return 'Final Submission'
            default:
                return `Step ${step}`
        }
    }

    return (
        <>
            <div className={`${classes.background} loggedIn`}>
                <Header />
                <div className={classes.mainSection} id="mainSectionId">
                    <Container maxWidth="md">
                        {isStepper &&
                            <Stepper
                                alternativeLabel
                                activeStep={getProjectActiveStep - 1}
                                connector={<ColorlibConnector />}
                                className={classes.stepper}
                            >
                                {getProjectStepper.map((label, index) => (
                                    <Step key={label.StepId}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                                            <span style={{ fontWeight: "600", fontSize: "15px", color: '#fff' }}>
                                                {getStepLabel(index + 1)}
                                            </span>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>}
                    </Container>
                    <Container className={`${classes.root} ${noScrollIs ? "noInnerScroll" : ""}`} style={{ maxWidth: type == "selectProject" ? 1400 : "" }}>
                        {children}
                    </Container>
                </div>
            </div>
        </>
    );
};

export default withWidth()(ApplyTenderLayout);
