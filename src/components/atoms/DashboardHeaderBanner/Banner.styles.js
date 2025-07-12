import {
    makeStyles
} from "@material-ui/core/styles";

export const BannerStyles = makeStyles((theme) => ({
    bannerContainer: {
        display: "flex",
        position: "relative",
        margin: theme.spacing(5, 7),
        boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
        borderRadius: "10px",
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
    secTitle: {
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
    bannerHolder: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1.5),
        }
    },
    bannerYourRegistration: {
        background: "linear-gradient(93.12deg, #129EF8 6.18%, #000DC7 34.87%, #042751 91.58%)",
    },
    bannerAppointment: {
        background: "linear-gradient(92.15deg, #269ADC -1.99%, #140282 27.81%, #001F6F 52.83%, #02061C 101.7%)",
    },

    bannerCongratulations: {
        background: "linear-gradient(92.15deg, #8F00FF -24.63%, #28005B 32.57%, #1D00D0 90.97%)",
    },
    bannerUploadDoc: {
        background: "linear-gradient(93.12deg, #129EF8 6.18%, #000DC7 34.87%, #042751 91.58%)",
    },
    bannerUnfortunatelylost: {
        background: "linear-gradient(91.38deg, #0E213F -6.72%, #868A8C 19.23%, #0E213F 117.16%)",
        border: "1px solid #EEEEEE",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderRadius: "10px",
    },
    bannerIcon: {
        bottom: "0px",
        // left: "0px",
        position: "absolute",
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
    refundBadge: {
        fontSize: "12px",
        padding: "0px 12px",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: "30px",
        gap: "5px",
        borderRadius: "38px"
    },
    refundableEmdText: {
        fontFamily: 'Poppins',
        fontStyle: "italic",
        fontWeight: "400",
        fontSize: "12px"
    },
    bookCtaBtn: {
        background: "#FFFFFF",
        borderRadius: "8px",
        fontWeight: 700,
        fontSize: "14px",
        "&:hover": {
            backgroundColor: "#e9e6e6"
        }
    },
    registrationClosedBanner: {
        background: "#FFFFFF",
        fontFamily: "Poppins",

        "& .registration": {
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#FF3351"
        },
        "& .registrationDec": {

            fontWeight: "500",
            fontSize: "12px",
            lineHeight: "20px",
            color: "rgba(38, 50, 56, 0.8)",

            AnchorLink: {
                textDecoration: "underline",
                fontWeight: "700",
                fontSize: "14px",
                color: "red"
            },
        },
    }
}));