import { makeStyles } from "@material-ui/core/styles";
import UpdatesSecBgImg from "../../../../assets/dashboard/updatesSecBg.png";

export const DashboardStyles = makeStyles((theme) => ({
    mainRoot: {
        padding: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0),
        },
    },
    secText: {
        color: "#0F2940",
        fontSize: "20px",
        fontWeight: 600,
    },
    dashboardHeadingCon: {
        margin: theme.spacing(1.5, 2)
    },
    topTabSection: {
        padding: theme.spacing(0, 2),
        display: "flex",
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    tabsection: {
        // height: '87vh',
        // backgroundImage: `url(${UpdatesSecBgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    pageInfoText: {
        color: "#FFFFFF",
        fontWeight: "normal",
        fontSize: "1.75rem",
        marginBottom: theme.spacing(3),
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            color: "#EEEEEE",
            fontSize: "0.9rem",
            paddingTop: theme.spacing(1),
            marginBottom: theme.spacing(3.5),
            "& strong": {
                display: "block",
                marginBottom: theme.spacing(1.5),
                fontWeight: "600",
                lineHeight: "36px",
                fontSize: "1.5rem"
            }
        },
        "& strong": {
            textTransform: "capitalize",
        }
    },
    sectionTitle: {
        color: "#00437E",
        fontWeight: 600,
        fontSize: "1.5rem",
        textAlign: "center",
        marginBottom: theme.spacing(2.5),
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.125rem",
            "&.rcntPost": {
                textAlign: "left"
            }
        },
    },
    latestUpdatesSection: {
        backgroundImage: `url(${UpdatesSecBgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: theme.spacing(8),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(6, 2),
        },
    },
    impDatesSec: {
        paddingRight: theme.spacing(8),
        [theme.breakpoints.down("sm")]: {
            paddingRight: 0,
            marginBottom: theme.spacing(5)
        },
    },
    recentPostsSection: {
        padding: theme.spacing(8),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(6, 2),
        },
    }
}));