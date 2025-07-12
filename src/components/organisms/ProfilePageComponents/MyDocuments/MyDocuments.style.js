import { makeStyles } from "@material-ui/core/styles";

export const MyDocumentsStyles = makeStyles((theme) => ({
    docContainer: {
        padding: theme.spacing(4),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2.5, 2),
        },
    },
    pageHeader: {
        borderBottom: "1px solid #EEEEEE",
        paddingBottom: theme.spacing(1)
    },
    pageTitle: {
        color: "#0F2940",
        fontSize: "1.25rem",
        fontWeight: "bold",
        // marginBottom: theme.spacing(1.5)
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
        padding: theme.spacing(1)
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
}));