import {
    makeStyles
} from "@material-ui/core/styles";

export const ScheduleStyle = makeStyles((theme) => ({
    AppoinetmentContainer: {
        minWidth: 275,
        textAlign: 'left',
        marginTop: 25
    },
    sideCard: {
        marginBottom: 20, marginTop: 20
    },
    sideContainer: {
        backgroundColor: '#E6EAF9',
        borderRadius: '5px',
        textAlign: 'center',
        width: '90%!important',
        margin: '0 auto',
        padding: '10px 25px'
    },
    oldAppointmentSection: {
        textAlign: 'left'
    },
    subHeading: {
        fontWeight: 'bold',
        color: '#0F2940',
        // marginTop: 15,
    },
    subSmallHeading: {
        color: '#65707D',
        fontSize: 13,
        marginTop: 6,
        marginBottom: 30,
    },
    title: {
        fontSize: 18,
        color: '#00437E',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    titleIcon: {
        color: '#4C5C6D'
    },
    pos: {
        marginTop: 15,
        fontSize: 12,
        color: ' #4C5C6D'
    },
    scheduleDateCard: {
        width: '90px',
        textAlign: 'center',
        // marginRight: '10px',
        borderRadius: 8,
        boxShadow: '0px 0px 2px 2px #dddddd8a',
        // border: '1px solid #E6EAF9', 
        marginBottom: 10,
        border: 'none'
    },
    redCrossIcon: {
        fontSize: '2rem',
    },
    bookNow: {
        justifyContent: "center",
        backgroundColor: '#E6EAF9', textAlign: 'center',
    },
    slotText: {
        color: '#4C5C6D', fontSize: 12
    },
    slotCount: {
        fontWeight: 600, marginBottom: 10, fontSize: 30,
    },
    lowAvailablity: {
        color: '#F2994A'
    },
    hightAvailablity: {
        color: '#219653'
    },
    notAvailable: {
        color: '#d12525'
    },
    ButtonBook: {
        fontSize: 11, color: '#0151CA', fontWeight: 800,
    },

    appointmentContainer: {
        padding: "40px 56px",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            padding: "15px",
        },
        "& .MuiTypography-h5": {
            paddingBottom: "20px",
            fontSize: "1.25rem",
            fontFamily: "Poppins",
            fontWeight: "600",
            lineHeight: "38px",
            color: "#0F2940"
        },
    },
    body: {
        padding: "20px 20px",
        "& .MuiTypography-subtitle1": {
            fontWeight: "700",
            fontSize: "1rem",
            color: "#00437E",
            lineHeight: "18px",
            letterSpacing: "0.08em",
            paddingBottom: theme.spacing(1.5),
        }
    },
    headeTxt: {
        color: "#0038C0",
        fontFamily: 'Noto Sans',
        fontWeight: "700",
        fontSize: "1.3rem",
        paddingBottom: theme.spacing(1),
    },

    scheduleddeContent: {
        fontSize: "1.1rem",
        fontFamily: 'Noto Sans',
        fontWeight: "400",
        lineHeight: "1.30rem",
        color: "#4C5C6D",
    },
    scheduledDateLabel: {
        paddingBottom: theme.spacing(1),
        fontFamily: 'Noto Sans',
        fontWeight: "400",
        fontSize: "0.875rem",
        lineHeight: "22px",
        letterSpacing: "0.02em",
        color: "#00437E",
    },
    scheduledTimeLabel: {
        fontFamily: 'Noto Sans',
        fontWeight: "600",
        fontSize: "0.875rem",
        lineHeight: "22px",
        letterSpacing: "0.02em",
    },
    footer: {
        padding: "10px",
    },
    scheduledBtn: {
        marginLeft: theme.spacing(2)
    },
    appointmentWrapper: {
        width: "100%",
        minHeight: "204px",
        background: "#FFFFFF",
        boxShadow: "2px 4px 40px rgba(0, 56, 192, 0.16)",
        borderRadius: "10px",
        padding: "0px 25px",

        "& .MuiTypography-body1": {
            color: '#0038C0',
            fontWeight: 700,
            fontSize: "0.875rem",
            lineHeight: "19px",
        },
        // "& .MuiTypography-body2": {
        //     paddingTop: '10px',
        //     color: '#4C5C6D',
        //     fontWeight: '400',
        //     fontSize: '12px',
        //     lineHeight: '18px',
        // },
    },
    dateLabel: {
        color: '#00437E',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '22px',
    },
    timeLabel: {
        paddingTop: '10px',
        color: '#0038C0',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '22px',
    },
    formContainer: {
        height: "100%"
    },
    formSection: {
        height: "100%",
        overflow: "auto",
    },
    inputsSection: {
        padding: theme.spacing(5, 3),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(3, 2),
        },
    },
    SelectedOfficeContainer: {
        height: "content-fit",
        padding: "20px",
        background: "#FFFFFF",
        border: "1px solid rgba(230, 234, 249, 0.8)",
        boxShadow: "0px 2px 20px rgba(1, 81, 202, 0.1)",
        borderRadius: "8px",
        marginBottom: "30px"
    },
    AvalilableSlotContainer: {
        height: "315px",
        overflow: "hidden",
        padding: "20px",
        background: "#FFFFFF",
        border: "1px solid rgba(230, 234, 249, 0.8)",
        boxShadow: "0px 2px 20px rgba(1, 81, 202, 0.1)",
        borderRadius: "8px",
        marginBottom: "20px",

        "& .header": {
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "27px",
            color: "#0F2940"
        },
        "& .body": {
            height: "250px",
            padding: "2px",
            overflowY: "scroll",
            paddingRight: "50px",
            paddingLeft: "10px",

            "&::-webkit-scrollbar-track": {
                background: "rgba(7, 42, 200, 0.1)",
            },
            "&::-webkit-scrollbar-thumb": {
                background: "linear-gradient(180deg, #0038C0 0%, #006FD5 100%)",
            },
        },
        "& .SlotTime": {
            padding: "10px",
            background: "#FFFFFF",
            border: "1px solid rgba(76, 92, 109, 0.16)",
            boxShadow: "0px 4px 20px rgba(1, 81, 202, 0.1)",
            borderRadius: "8px",
            fontSize: "0.875rem",
            lineHeight: "20px",
            letterSpacing: "0.02em",
            color: "#4C5C6D",
            textAlign: "center",

            "&:hover": {
                cursor: "pointer"
            }
        },
        "& .selectedTime": {
            background: "rgba(1, 81, 202, 0.1)",
            border: "2px solid #0151CA",
            color: "#0151CA",
            fontWeight: 600,
            fontSize: "14px"
        }
    },
    MeetingDetailContaine: {
        height: "550px",
        background: "#FFFFFF",
        textAlign: "center",
        border: "1px solid rgba(230, 234, 249, 0.8)",
        boxShadow: "0px 2px 20px rgba(1, 81, 202, 0.1)",
        borderRadius: "8px",

        "& .tittle": {
            fontSize: "1.25rem",
            fontWeight: "700",
            lineHeight: "38px",
            color: "#0F2940"
        },
        "& .meetingInfo": {
            // paddingBottom: "40px"
            "& .MuiListItem-gutters": {
                paddingTop: "0px"
            },

            "& .MuiListSubheader-sticky": {
                fontSize: '18px',
                fontFamily: 'Poppins',
                fontWeight: '600',
                color: '#0F2940',
            },
            "& .MuiListItemIcon-root": {
                minWidth: '40px',
            }
        }
    },
    DetailsCon:{
        paddingRight: "64px",
        [theme.breakpoints.down("sm")]: {
            padding: "0",
        },
    },
    confirmBtn: {
        marginTop: "40px"
    },
    fontBoldStyle: {
        fontWeight: 600,
        color: '#0038C0',
        fontSize: '0.875rem',
        fontFamily: 'Noto Sans',
    },
    details: {
        color: '#65707D',
        fontSize: '14px',
    },
    detailcontain: {
        borderRight: "1px dashed #eee", padding: 10,

        "& .MuiTypography-subtitle1": {
            fontWeight: "700",
            fontSize: "1rem",
            color: "#00437E",
            lineHeight: "18px",
            letterSpacing: "0.08em",
            paddingBottom: theme.spacing(1.5),
        }
    },
    mainContainer: {
        backgroundColor: '#fff',
        borderRadius: '5px',

        "& .header": {
            padding: "16px",
            position: "relative",
            borderBottom: "1px solid #E7E7E7",
            "& .MuiButton-text": {
                top: "50%",
                left: "16px",
                position: "absolute",
                transform: "translateY(-50%)"
            },
            "& .pageTitle": {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        },
        "& .tabsView": {
            padding: theme.spacing(1, 0),
            "& .MuiTabs-root": {
                minHeight: "auto"
            },
            "& .MuiTabs-flexContainer": {
                alignItems: "center",
                justifyContent: "center",
                [theme.breakpoints.down("sm")]: {
                    justifyContent: "flex-start"
                },
            },
            "& .MuiTab-root": {
                color: "#0038C0",
                fontWeight: 600,
                fontSize: "0.9rem",
                textTransform: "initial",
                margin: theme.spacing(0, 1.5),
                padding: theme.spacing(0.5, 2),
                minHeight: "auto",
                opacity: 1,
                // "&:hover": {
                //     color: "#6f93eb"
                // },
                "&.Mui-selected": {
                    backgroundColor: "#EDF2FF",
                    border: "2px solid #0038C0",
                    borderRadius: 10,
                    boxShadow: "0px 4px 20px rgb(0 56 192 / 10%)",
                }
            },
            "& .verticalline": {
                margin: "0",
                height: "25px",
                borderColor: "#E4E7ED"
            }
        },

        "& .centerListRow": {
            "& .MuiIconButton-root:hover": {
                color: '#007AE7',
                backgroundColor: 'transparent',
            },
        }

    },
    slotContainer: {
        position: 'relative',
        "& .prevBtn": {
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '-3px',
            display: '-webkit-box',
            display: '-ms-flexbox',
            display: 'flex',
            webkitBoxAlign: 'center',
            msFlexAlign: 'center',
            alignItems: 'center',
            MsFlexPack: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
        "& .nextBtn": {
            position: 'absolute',
            top: '0',
            bottom: '0',
            right: '-15px',
            display: '-webkit-box',
            display: '-ms-flexbox',
            display: 'flex',
            webkitBoxAlign: 'center',
            msFlexAlign: 'center',
            alignItems: 'center',
            MsFlexPack: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }
    },

    filterSection: {
        padding: theme.spacing(1.2, 0, 2),
        [theme.breakpoints.down("sm")]: {
            margin: "0 auto 12px",
        },
        // "&:focus-within": {
        //     backgroundColor: "#F4F4F4",
        //     boxShadow: "none",
        //     "& .MuiSelect-nativeInput": {
        //         width: "200px",
        //         backgroundColor: "#f4f4f4",
        //         border: "0",
        //         opacity: "1",
        //     }
        // }

        // "& .MuiAutocomplete-inputRoot[class*='MuiInput-root']": {
        //     background: "red"
        // },

        "& .MuiAutocomplete-inputRoot[class*='MuiInput-root']": {
            fontFamily: 'Poppins',
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0F2940",
        },

        "& .MuiInput-underline:before , .MuiInput-underline:after": {
            border: "none"
        },

        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            border: "none"
        }
    },
    searchIconBtn: {
        borderRadius: "50%",
        minWidth: "auto",
        padding: "12px",
        "& .MuiSvgIcon-root": {
            fill: "none",
        },
        "&:hover": {
            background: "rgb(9 36 102)",
        }
    },
    searchNotFound: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "120px",

        "& .MuiTypography-h6": {
            fontFamily: 'Noto Sans',
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "19px",
            color: "#4C5C6D"
        }
    },

    globSearchInputBox: {
        width: "500px",
        margin: 0,
        // marginBottom: theme.spacing(4.5),
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: 40,
            "& fieldset": {
                borderRadius: 40,
                border: 0,
                boxShadow: "0px 0px 20px rgb(1 81 202 / 10%)"
            },
        },
        "& .MuiInputBase-input": {
            paddingLeft: theme.spacing(3)
        },
        "& .MuiIconButton-root": {
            backgroundColor: "#0151CA",
            "& .MuiIconButton-label": {
                color: "#fff"
            }
        }
    },
    dialogBox: {
        maxWidth: 500,
        margin: '0 auto',
        textAlign: 'center',
        '&.MuiTypography-body1': {
            color: '#000'
        },
    },
    dialogTitle: {
        fontWeight: 700,
        fontSize: '1.5rem',
    },
    dialogBoxButton: {
        justifyContent: 'center', padding: 40
    },
    centerAddress: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,

        "& .timeTxt": {
            color: '#0038C0',
            fontSize: '0.875rem',
            fontFamily: 'Noto Sans',
            fontWeight: '700',
        }
    },
    noteIcon: {
        color: "#65707D", fontSize: 20, marginRight: 10
    },
    slotHeaderWrap: {
        height: '100%',
        width: '100%',
        background: '#FFFFFF',
        boxShadow: '0px 4px 20px rgb(1 81 202 / 10 %)',
        margin: '0',
        padding: '0',
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "& li": {
            width: '100px',
        },

        "& li:not(:first-child)": {
            border: 'solid #f0f0f0',
            borderWidth: '0 0 0 1px',
            padding: '5px 0',
            textAlign: 'center',
            width: '100px'
        }
    },
    slotAvailableWrap: {
        height: '80%',
        width: '100%',
        margin: '0',
        padding: '0',
        listStyle: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',

        "& li": {
            // border: 'solid #f0f0f0',
            borderWidth: '0 0 0 1px',
            padding: '5px 5px',
            textAlign: 'center',
            width: '100px',
            marginTop: '20px',
        }
    },
    slotsBox: {
        minHeight: '130px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        // borderBottom: '1px solid #f0f0f0',
        // borderRight: '1px solid #f0f0f0',
    }
}));