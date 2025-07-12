import { makeStyles } from "@material-ui/core";

export const SelectProjectMapStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
        borderRadius: 5,
        border: 0,
        marginBottom: theme.spacing(2),
    },
    selectedProjectRoot: {
        backgroundColor: "#EAF2FC",
        border: "2px solid #0151CA",
    },
    /* projectCardCont: {
      display: "flex",
      flexWrap: "wrap"
    }, */
    projectCoverImgSec: {
        position: "relative",
        width: 250,
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    cover: {
        width: "100%",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: 200,
        },
    },
    cardContentCont: {
        padding: "0 !important",
        flex: "auto",
    },
    cardHeaderCont: {
        padding: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        },
    },
    schemeNameView: {
        color: "#0151CA",
        fontWeight: "bold",
        fontSize: "1.2rem",
    },
    schemePriceView: {
        color: "#0151CA",
        fontWeight: "bold",
        fontSize: "1.2rem",
        [theme.breakpoints.down("sm")]: {
            color: "#FFFFFF",
            position: "absolute",
            bottom: theme.spacing(1),
            right: theme.spacing(2),
            fontWeight: "bold",
            fontSize: "1.2rem",
            textShadow: "0px 0px 8px rgba(0, 0, 0, 0.6)",
        },
    },
    dividerLine: {
        backgroundColor: "rgba(1, 81, 202, 0.1)",
    },
    dataContainer: {
        padding: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1),
        },
    },
    dataValueViewBox: {
        marginLeft: theme.spacing(1.5),
    },
    scaleIconView: {
        fontSize: "2rem",
    },
    dataTitle: {
        textAlign: "center",
        color: "#65707D",
        fontWeight: 600,
        fontSize: "0.8rem",
    },
    dataValue: {
        textAlign: "center",
        color: "#00437E",
        fontWeight: "bold",
        fontSize: "0.9rem",
    },
    typeContainer: {
        display: "flex",
    },
    amenitiesIconCont: {
        marginTop: theme.spacing(3),
        "&>.MuiGrid-item": {
            padding: theme.spacing(0, 1),
        },
        "& img": {
            width: 30,
            height: 30,
        },
        "& .MuiSvgIcon-root": {
            fontSize: "1.9rem",
        },
    },
    amenitiesLabel: {
        color: "#00437E",
        fontWeight: "bold",
        fontSize: "0.9rem",
    },
    catChipCont: {
        marginTop: theme.spacing(1.5),
        display: "flex",
        justifyContent: "flex-start",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column"
        },
        "& .MuiChip-root": {
            backgroundColor: "#fff",
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
            "& .MuiChip-label": {
                color: "#00437E",
                fontSize: "0.8rem",
                fontWeight: 600,
                padding: theme.spacing(1, 2),
                maxWidth: 350,
            },
            "& .MuiChip-deleteIcon:hover": {
                color: "#FA3D5D",
            },
        },
    },
    selectedCatCont: {
        padding: theme.spacing(0, 2),
    },
    chipsTitle: {
        color: "#65707D",
        fontWeight: 600,
        fontSize: "0.8rem",
        margin: "8px 0 12px",
    },
    popoverMainCont: {
        "& .MuiPopover-paper": {
            width: 300,
            maxWidth: 300,
            padding: theme.spacing(2),
            boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
            borderRadius: 10,
        },
    },
    catChipList: {
        padding: theme.spacing(2),
        listStyle: "none",
        margin: 0,
        "&>li": {
            color: "#00437E",
            whiteSpace: "normal",
            fontWeight: 600,
            fontSize: "0.9rem",
            marginBottom: theme.spacing(2),
            "&>span": {
                color: "#E5E5E5",
                fontWeight: 100,
            },
            "&:last-child": {
                marginBottom: 0,
            },
        },
    },
    mobileCheckboxSec: {
        justifyContent: "flex-end",
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
        },
    },
    interestedTxt: {
        color: "#65707D",
        fontWeight: 500,
        fontSize: "0.8rem",
        marginBottom: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(5),
        },
    },
    selectProjBtn: {
        marginRight: "5%",
        width: "35%",
        backgroundColor: "transparent",
        padding: theme.spacing(1, 2),
        [theme.breakpoints.down("xs")]: {
            width: "80%",
            marginRight: "10%",
        },
        "&.MuiButton-contained": {
            background:
                "linear-gradient(326deg, rgb(0 13 199) 0%, rgb(16 147 245) 70%)",
            border: 0,
        },
        "& .MuiSvgIcon-root": {
            marginRight: theme.spacing(1.2),
            fontSize: "2rem",
            fill: "none",
        },
    },
    removeBtn: {
        "& .MuiSvgIcon-root": {
            fill: "rgba(0 0 0 / 26%) !important",
            fontSize: "1rem",
        },
        "&:hover": {
            "& .MuiSvgIcon-root": {
                fill: "#FA3D5D !important",
            },
        },
    },
    selectedDetail: {
        display: "flex",
        alignItems: "center",
        padding: "2px 12px",
        background: "#FFFFFF",
        borderRadius: "40px",
        width: "fit-content",
        color: "#65707D",
        fontWeight: "600",
        fontSize: "12px",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        "& span": {
            color: "#00437E",
            fontWeight: "700",
            fontSize: "14px",
        },
    },
    mapTooltip: {
        textAlign: "center",
        position: "absolute",
        color: "#fff",
        padding: "10px",
        background: "rgb(49 113 24 / 91%)",
        transform: "translate3d(-50%, -50%, 0)",
        borderRadius: "5px",
        pointerEvents: "none",
        zIndex: "1000",
        animation: "$pulse 1.5s ease-in-out infinite"
    },
    tooltipTittle: {
        color: "#0038C0",
        fontSize: "0.8rem",
        fontWeight: "700",
    },
    areatooltip: {
        position: "absolute",
        fontWeight: "bold",
        fontSize: "24px",
        border: "5px solid #5494db",
        padding: "10px 15px",
        backgroundColor: "#F7FFF7",
        width: "15vw",
        margin: "2em auto",
        textAlign: "center",
        zIndex: "1000"
    },
    areatooltipLeft: {
        borderRadius: 10,
        border: "2px solid #0151CA",
        position: "absolute",
        fontWeight: "bold",
        fontSize: "14px",
        padding: "10px 15px",
        backgroundColor: "#F7FFF7",
        width: "20vw",
        margin: "2em auto",
        textAlign: "center",
        zIndex: "1000",
        "&:before": {
            content: "",
            position: "absolute",
            display: "block",
            width: "20px",
            left: 3,
            top: "50%",
            border: "15px solid transparent",
            borderLeft: "0",
            borderRight: "15px solid #0151CA",
            transform: "translate(calc(-100% - 5px), -50%)",
            zIndex: "1000"
        }
    },
    areatooltipTop: {
        "&:before": {
            content: '',
            position: 'absolute',
            display: 'block',
            width: '0px',
            left: '50%',
            top: 3,
            border: '15px solid transparent',
            borderTop: '0',
            borderBottom: '15px solid #0151CA',
            transform: 'translate(-50%, calc(-100% - 5px))'
        }
    },
    areatooltipRight: {
        borderRadius: 10,
        border: "2px solid #0151CA",
        position: "absolute",
        fontWeight: "bold",
        fontSize: "14px",
        padding: "10px 15px",
        backgroundColor: "white",
        width: "20vw",
        margin: "2em auto",
        textAlign: "center",
        zIndex: "1000",
        "&:before": {
            content: "''",
            position: 'absolute',
            display: 'block',
            width: '0px',
            right: 3,
            top: '50%',
            border: '15px solid transparent',
            borderRight: '0',
            borderLeft: '15px solid #0151CA',
            transform: 'translate(calc(100% + 5px), -50%)'
        }
    },
    areatooltipBottom: {
        "&:before": {
            content: '',
            position: 'absolute',
            display: 'block',
            width: '0px',
            left: '50%',
            bottom: '0',
            border: '15px solid transparent',
            borderBottom: '0',
            borderTop: '15px solid #5494db',
            transform: 'translate(-50%, calc(100% + 5px))'
        }
    },
    areaPingMarker: {
        position: "absolute",
        pointerEvents: "none",
        zIndex: "1000",

    },
    btnHover: {
        display: "flex",
        position: 'absolute',
        top: '0%',
        zIndex: '1000',
        left: '10px',
        width: "100%",
        justifyContent: "space-between"
        // opacity: '0.5',
        // "&:hover": {
        //   opacity: '1'
        // }
    },
    dataValueView: {
        background: "#EEEEEE",
        padding: "10px",
        margin: "9px 9px 9px 0",
        borderRadius: " 5px"
    },
    highlighted: {
        border: `2px solid ${theme.palette.primary.main}`,
        animation: "$pulse 1.5s ease-in-out infinite"
    },
    "@keyframes pulse": {
        "0%": {
            boxShadow: "0 0 0 0 rgb(11 45 237)"
        },
        "70%": {
            boxShadow: "0 0 0 10px rgba(63, 81, 181, 0)"
        },
        "100%": {
            boxShadow: "0 0 0 0 rgba(63, 81, 181, 0)"
        }
    },
    pinAnimation: {
        height: 40,
        // width: 45,
        animation: "$pulse2 1.2s infinite ease-in-out",
    },
    "@keyframes pulse2": {
        "0%": {
            opacity: 1,
            transform: "scale(1)",
        },
        "50%": {
            opacity: 1,
            transform: "scale(1.2)",
        },
    },
    "@keyframes pulse3": {
        "0%": {
            boxShadow: "0 0 0 0 rgb(237 11 11)"
        },
        "70%": {
            boxShadow: "0 0 0 10px rgba(63, 81, 181, 0)"
        },
        "100%": {
            boxShadow: "0 0 0 0 rgba(63, 81, 181, 0)"
        }
    },
    '@keyframes opacity-animation': {
        '0%': {
            opacity: 0,
        },
    },
    '@keyframes live-animation': {
        '0%': {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0.8,
        },
        '70%': {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(3)',
        },
        to: {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 0,
        },
    },
    towerStatusTag: {
        pointerEvents: "none",
        position: "absolute",
        display: 'inline-block',
        verticalAlign: '1px',
        width: '15px',
        height: '15px',
        margin: '0 6px',
        background: '#ffdd40',
        color: 'transparent',
        borderRadius: '100%',
        flex: '0 0 auto',
        zIndex: "1000",
        animation: '$opacity-animation 1s linear',
        '&.red': {
            background: '#e60000',
        },
        '&.orange': {
            background: '#ff9900',
        },
        '&.green': {
            background: '#00e600',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            background: '#f9e9a2',
            borderRadius: '100%',
            opacity: 0.5,
            transform: 'translate(-50%,-50%) scale(3)',
            animation: '$live-animation 3s infinite',
        },
    },
    mapContainer: {
        // border: '1px solid',
        boxShadow: '0 1px 2px rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
        position: "relative",
        width: "100%",
    },
    container: {
        borderBottom: "1px solid #E7E7E7",
        padding: theme.spacing(2),
        position: "relative"
    },
    timerValidText: {
        color: "red",
        fontWeight: 600,
        animation: "$blinker 1s linear infinite",
    },
    "@keyframes blinker": {
        "50%": {
            opacity: "0.5",
        },
    },
    mapStyleBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        background: "#fff",
        borderTop: "1px solid black"
    },
    leftListContainer: {
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: '1000',
        background: "#fff",
        boxShadow: '0 1px 2px rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
        transition: 'transform 0.3s ease', // Add a smooth transition for the transform property
        transform: 'translateX(0)', // Start with the menu visible
    },
    projectList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '300px',
        overflowY: 'auto',
        "&::-webkit-scrollbar": {
            width: ".4em",
          },
    },
    collapseBtnContainer: {
        left: 315,
        position: 'absolute',
        zIndex: '1000',
        top: 'calc(50% - 24px)',
    },
    collapseBtn: {
        border: 0,
        boxShadow: '0 1px 2px rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)',
        width: 23,
        height: 48,
        cursor: 'pointer',
        borderLeft: '1px solid #dadce0',
        borderRadius: '0 8px 8px 0',
        transition: 'transform 0.3s ease',
        transform: 'translateX(0)',
        background: '#fff 7px center/7px 10px no-repeat',

    },
    moveLeft: {
        transform: 'translateX(-315px)',
    },
    hidden: {
        transform: 'translateX(-120%)',
    },
}));