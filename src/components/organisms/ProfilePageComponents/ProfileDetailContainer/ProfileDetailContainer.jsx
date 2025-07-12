import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { useTranslation, Trans } from "react-i18next";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import DetailTab from "./DetailTab/DetailTab";
import Transactiontable from "./Transactiontable.jsx/Transactiontable";
import TabContext from "@material-ui/lab/TabContext";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
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
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

function ProfileDetailContainer({ selectedValue }) {
    const { t } = useTranslation("ProfilePageTrans");

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab
                        label={t("profileDetailContainer.profile")}
                        {...a11yProps(0)}
                        style={{ fontWeight: "bold" }}
                    />

                    <Tab
                        label={t("profileDetailContainer.transaction")}
                        {...a11yProps(1)}
                        style={{ fontWeight: "bold" }}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <>
                    <DetailTab selectedValue={selectedValue} />
                </>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <>
                    <Transactiontable userData={selectedValue} />
                </>
            </TabPanel>
        </div>
    );
}

export default ProfileDetailContainer;
