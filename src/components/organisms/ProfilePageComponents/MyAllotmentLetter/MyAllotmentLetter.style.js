import { makeStyles } from "@material-ui/core/styles";

export const MyAllotmentLetterStyle = makeStyles((theme) => ({
    docContainer: {
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
    tableContainer: {
        paddingTop: theme.spacing(3)
    },
    tableHeader: {
        padding: theme.spacing(0, 1.5),
        marginBottom: theme.spacing(2)
    },
    tblHdCol: {
        color: "#BBBBBB",
        fontWeight: 500,
        fontSize: "0.9rem",
        "&.type": {
            marginRight: theme.spacing(1.5)
        }
    },
    tableRow: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderRadius: 10,
        padding: theme.spacing(1.5, 2.5),
        marginBottom: theme.spacing(1.5),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1, 1, 1, 1.5),
        },
    },
    fileFormatIcon: {
        maxWidth: 22,
        display: "block",
        marginRight: theme.spacing(2),
    },
    fullNameCol: {
        color: "#0F2940",
        fontSize: "0.9rem",
        fontWeight: 600,
    },
    fileSizeCol: {
        color: "#4C5D6C",
        fontSize: "0.9rem",
        fontWeight: "normal",
    },
    fileViewBtn: {
        minWidth: "auto",
        padding: theme.spacing(0.5, 1),
        marginRight: theme.spacing(3),
        "&.Mui-disabled": {
            color: "rgba(0, 56, 192, 0.15)"
        }
    },
    downloadIconBtn: {
        color: "#0038C0",
        backgroundColor: '#fff',
        padding: theme.spacing(1),
        maxHeight: 50,
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0),
        },
    },
    menuIconBtn: {
        "& .MuiSvgIcon-root": {
            fontSize: "1.2rem"
        }
    },
    menuContainer: {
        "& .MuiMenuItem-root": {
            minHeight: 40,
            textTransform: "capitalize"
        },
        "& .MuiListItemIcon-root": {
            minWidth: "auto",
            marginRight: theme.spacing(1.5)
        },
        "& .MuiSvgIcon-root": {
            fontSize: "1.4rem"
        }
    },
    notFound: {
        display: "flex",
        justifyContent: "center",
        color: "#888",
        fontSize: "1.5rem"
    },
    docUploadErrorTxtView: {
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#ff9800",
        padding: theme.spacing(1, 0),
    },
    bannerContainer: {
        display: "flex",
        position: "relative",
        boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
        height: "132px",
        // alignItems: "center",
        // padding: "10px",
        color: "#ffffff",
        [theme.breakpoints.down("sm")]: {
            margin: theme.spacing(5, 2),
            padding: theme.spacing(1),
            height: "auto",
        },

        "& .MuiSvgIcon-root": {
            width: "auto",
            height: "auto",
        },
    },
    bannerHolder: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1.5),
        }
    },
    bannerUploadDoc: {
        borderRadius: "10px",
        background: "linear-gradient(93.12deg, #129EF8 6.18%, #000DC7 34.87%, #042751 91.58%)",
    },
    bannerIcon: {
        bottom: "0px",
        // left: "0px",
        position: "absolute",
    },
    secTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(3),
        "& .MuiTypography-h5": {
            fontFamily: 'Poppins',
            fontSize: "1.25rem",
            color: "#FFFFFF",
            fontWeight: "700",
            fontStyle: "normal",
            lineHeight: "38px",
            letterSpacing: "0.015em"
        },
        "& .MuiTypography-subtitle1": {
            fontSize: "12px",
            fontStyle: "normal",
            fontFamily: 'Poppins',
            fontWeight: "400"
        },
        "& .MuiTypography-subtitle2": {
            fontSize: "14px",
            fontStyle: "normal",
            fontFamily: 'Poppins',
            fontWeight: "600"
        },
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1.5),
        }
    },
    customBadge: {
        padding: "3px 12px",
        marginLeft: "10px",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        fontFamily: 'Poppins',
        fontStyle: "italic",
        fontWeight: "600",
        fontSize: "12px",
    },
    AnchorLink: {
        textDecoration: "underline",
        fontWeight: "700",
        fontSize: "14px"
    },
}));