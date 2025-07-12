import { makeStyles } from "@material-ui/core/styles";

export const LanguageSettingStyles = makeStyles((theme) => ({
    settingContainer: {
        padding: theme.spacing(4),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2.5, 2),
        },
    },
    pageHeader: {
        borderBottom: "1px solid #EEEEEE",
        paddingBottom: theme.spacing(3)
    },
    pageTitle: {
        color: "#0F2940",
        fontSize: "1.25rem",
        fontWeight: "bold",
        marginBottom: theme.spacing(1.5)
    },
    pageSubTitle: {
        color: "#65707D",
        fontSize: "0.8rem"
    },
    langChangeSection: {
        borderBottom: "1px solid #EEEEEE",
        padding: theme.spacing(2.5, 0)
    },
    langSettingLabel: {
        color: "#0F2940",
        fontSize: "1.25rem",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(2)
        },
    },
    langToggleBtnGroup: {
        position: "relative",
        borderRadius: 0,
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
        },
        "& .MuiToggleButton-root": {
            backgroundColor: "#fff",
            borderRadius: 8,
            border: "2px solid #EEEEEE",
            color: "#0F2940",
            margin: theme.spacing(0, 1),
            fontWeight: 600,
            fontSize: "0.9rem",
            padding: theme.spacing(1, 2),
            minWidth: 100,
            [theme.breakpoints.down("sm")]: {
                margin: 0,
                minWidth: 80,
                padding: theme.spacing(1),
                fontSize: "0.8rem"
            },
            "&.Mui-selected": {
                backgroundColor: "#E1F4FF",
                borderColor: "#0038C0",
                color: "#0038C0",
            }
        }
    },
    actionSection: {
        padding: theme.spacing(2.5, 0),
        textAlign: "right",
        [theme.breakpoints.down("sm")]: {
            paddingBottom: 0
        },
    }
}));