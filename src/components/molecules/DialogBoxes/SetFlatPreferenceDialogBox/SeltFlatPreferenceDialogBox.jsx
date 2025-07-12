import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import RoomIcon from '@material-ui/icons/Room';
import ImageMapper from 'react-img-mapper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Loading from "../../../atoms/Loading/Loading";
import InputLabel from "@material-ui/core/InputLabel";
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Chip, Stepper, Step, StepLabel, StepContent, Paper, ImageList, ImageListItem, ImageListItemBar, Card, Slide, AppBar, Toolbar, Tab, Tabs, withStyles, Tooltip, Zoom, Popover, Badge, Checkbox } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ClearIcon from '@material-ui/icons/Clear';
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { Formik, Form } from "formik";
// import * as yup from "yup";
// import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import SnackBox from "../../../atoms/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import ListItemText from "@material-ui/core/ListItemText";
// import Select from "@material-ui/core/Select";
// import FormControl from "../../FormControl/FormControl";
import LocalFormControl from "../../FormControl/FormControl";
import { preferencesSelector, clearPreferencesState, clearBookingState, getFloorList, getFlatPreference, getFloorsDetails, getBookingEndTime, confirmFlatBooking, cancelBooking, resetPreferencesState, sendConfirmFlatOtp, clearBookingOtpState, sendConfirmFlatCancellationOtp, clearBookingCancellationOtpState, cancelBookingwithOtp, clearCancelBookingwithOtpState } from "../../../../redux/features/preferences/PreferencesSlice";
import { ScaleIcon, NonCheckOutlinedIcon, CheckedOutlinedIcon, AmenitiesMoreMenuIcon, DeleteIcon, WingIcon, UnitTypeIcon, RupeePriceIcon, FloorStepIcon, RoomTypeIcon, ExpandImgIcon, MoreImagesIcon, DownloadPrimaryIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ClockIcon } from "../../../atoms/SvgIcons/SvgIcons";
import notEligibleIcon from "../../../../assets/CloseIcon.png";
import notEligibleLegendIcon from "../../../../assets/NotEligible.png";
import MaskLinesIcon from "../../../../assets/MaskLines.png";
// import imageGallery from "../../../../assets/imageGallery.png";
import imageGallery from "../../../../assets/imageGallery.png"

import noTowerImg from "../../../../assets/noTowerSelected.png";
import rightArrowIcon from "../../../../assets/rightArrow.png";
import OwlCarousel from 'react-owl-carousel';
import PrevIcon from "../../../../assets/floorPlanImgs/prevIcon.png";
import NextIcon from "../../../../assets/floorPlanImgs/nextIcon.png";
import { addEditApplicantProgress, ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { useState } from "react";
import SelectBox from "../../FormControl/components/SelectBox/SelectBox";
import ImageMagnifyContainer from "../../../atoms/ImageMagnifyContainer/ImageMagnifyContainer";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import FlatImagesViewBox from "./FlatImagesViewBox/FlatImagesViewBox";

import shop from '../../../../assets/image_mapping/shopslayout.jpg'
import { numberWithCommas } from "../../../../utils/util";
import { AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    // dialogActions: {
    //     justifyContent: "center",
    //     padding: theme.spacing(2),
    //     paddingBottom: theme.spacing(3),
    // },
    modelBoxContainer: {
        minHeight: '75vh',
        // maxHeight: '90vh',
        // height: "600px",
        "& .MuiDialogTitle-root, .MuiDialogContent-root": {
            height: "600px",
            overflow: "hidden",
            padding: "0",
            scrollbarWidth: "thin",
            scrollbarColor: "red",

            "& ::-webkit-scrollbar-track": {
                background: "#ddd",

            }

        },
        // "& .MuiDialog-paperWidthMd": {
        //     height: "600px",
        //     maxWidth: "1050px"
        // },
        cardFooter: {
            padding: theme.spacing(2, 0),
        },
    },
    modelBoxConfirm: {
        "& .MuiDialog-paperWidthSm": {
            maxWidth: "620px"
        },
    },

    leftSide: {
        width: "400px",
        height: "100%",
        position: "fixed",
        padding: "0px 15px",
        // background: "#FFFFFF",
        boxShadow: "10px 0px 40px rgba(1, 81, 202, 0.06)",
        borderRadius: "5px 0px 0px 5px",

        // "& .MuiIconButton-label": {
        //     color: "#00437E"
        // },

        "& .MuiTypography-h6": {
            fontFamily: 'Poppins',
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "28px",
            color: "#0F2940",
            // paddingLeft: "10px",
            // borderBottom: "1px solid rgba(76, 92, 109, 0.1)",
            // paddingTop: "24px",
            // paddingBottom: "16px"
        }
    },
    wingSelectContainer: {
        // overflowY: "auto",
        // overflowX: "hidden",
        // maxHeight: "calc(750px - 244px)",
        // margin: "20px 10px 0px",
        // paddingLeft: "50px",

        "&::-webkit-scrollbar-track": {
            background: "rgba(1, 81, 202, 0.06);",
        },
        "&::-webkit-scrollbar-thumb": {
            height: "10px",
            backgroundClip: "content-box",
            borderColor: "#0151CA",
            borderStyle: "solid",
            borderWidth: "1px 1px",
            backgroundColor: "#0151CA",
            // backgroundImage: "linear - gradient(360deg, #fff 60 %, #aaa 60 %)"
        },
        "&::-webkit-scrollbar": {
            width: "8px"
        },

        "& .MuiTypography-h6": {
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "21px",
            color: "#00437E",
            marginBottom: "10px"
        },

        // "&::-webkit-scrollbar-track": {
        //     webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
        //     borderRadius: "10px"
        // },

        // "&::-webkit-scrollbar-thumb": {
        //     borderRadius: "10px",
        //     webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.5)"
        // }

    },

    projectCard: {
        paddingRight: "20px",
        background: "rgba(101, 112, 125, 0.01)",
        border: "1px solid rgba(101, 112, 125, 0.1)",
        borderRadius: "5px"
    },
    wingTable: {
        paddingRight: "20px"
    },

    wingRow: {
        background: "#FFFFFF",
        border: "2px solid rgba(1, 81, 202, 0.14)",
        borderRadius: "5px",
        margin: "0 0px 5px",
        // height: "55px",
        padding: "10px 0px",

        "&.selected": {
            borderColor: "#0151CA",
            boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
        }
    },
    roomType: {
        "& .MuiChip-root": {
            marginRight: "5px",
            background: "rgba(0, 56, 192, 0.08)",
            borderRadius: "60px",
        },
        "& .MuiChip-label": {
            fontFamily: 'Noto Sans',
            fontWeight: "600",
            fontSize: "12px",
            lineHeight: "20px",
            letterSpacing: "0.02em",
            color: "#0038C0"
        }
    },

    projectCoverImgSec: {
        position: "relative",
        width: "100%",
        // marginTop: "16px"
    },
    cover: {
        objectFit: "cover",
        borderRadius: "5px",
        height: 110
    },
    cardContentCont: {
        // marginLeft: 15,
        padding: "0 !important",
        flex: "auto"
    },
    cardHeaderCont: {
        padding: theme.spacing(1, 0),
        marginLeft: theme.spacing(1),
        "& .cardTitle": {
            paddingBottom: "10px",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "22px",
            color: "#0F2940",
            letterSpacing: "-0.02em"
        },

        "& .MuiChip-outlined": {
            background: "#EEF4FB",
            border: "1px solid #0038C0",
            fontWeight: "600",
            fontSize: "12px",
            alignItems: "center",
            color: "#00437E"
        }
    },


    // Floor css

    roomConditionList: {
        "& .MuiListItem-gutters": {
            paddingLeft: "0px"
        },
        "& .MuiListItem-gutters .MuiTypography-displayBlock, .MuiTypography-subtitle1": {
            color: "#65707D",
            fontFamily: 'Noto Sans',
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "18px"
        },
        "& .asterisk": {
            color: "#f93d5c"
        },
        "& .notEligibleTxt, .bookedTxt, .inProgressTxt, .availableTxt": {
            width: "18px",
            height: "18px",
            // box- sizing: border- box;
            borderRadius: "4px",
            marginRight: "8px",
            background: "#65707d",
        },

    },
    alertBox: {
        margin: "16px 0px"
    },

    flatSelectionContainer: {
        display: 'flex',
        justifyContent: 'center',
        "&:nth-child(2)": {
            backgroundColor: "Lightgreen"
        },

        // padding: "10px 16px",
        "& .MuiButton-outlined": {
            minWidth: "44px"
        },
        "& .MuiButton-root": {
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "24px",
            letterSpacing: "0.09em",
            color: "#0F2940",
            width: "60px",
            height: "32px"
        },
        "& .MuiTypography-displayBlock": {
            color: "#0F2940",
            textTransform: "capitalize",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "20px",
        },
        // "& img": {
        //     marginLeft: "12px"
        // }
    },
    flatNoDiv: {
        position: "relative",

        "& .MuiSvgIcon-root": {
            zIndex: "1",
            position: "absolute",
            right: "-16px",
            top: "-8px",
            fill: "#fff",
            background: "#FA3D5D",
            borderRadius: "50%",
            height: "18px",
            width: "18px",
            cursor: "pointer"
        }
    },

    dataContainer: {
        padding: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2)
        }
    },
    dataValueViewBox: {
        marginLeft: theme.spacing(0.5),
        padding: "8px 0"
    },
    dataValueView: {
        marginLeft: theme.spacing(0.5),
        padding: "5px 0"
    },
    scaleIconView: {
        fontSize: "2rem"
    },
    dataTitle: {
        color: "#65707D",
        // fontWeight: 600,
        fontSize: "0.8rem"
    },
    dataValue: {
        color: "#00437E",
        fontWeight: "700",
        fontSize: "12px",
        lineHeight: "24px"
    },

    filterInputCtrl: {
        borderRight: "1px solid #ddd",
        position: "relative",
        padding: theme.spacing(1.5, 3.8),
        boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
        borderRadius: "40px",
        marginRight: "12px",
        [theme.breakpoints.down("sm")]: {
            borderRight: 0
        },
        "& .MuiSelect-selectMenu": {
            padding: 0
        },
        "&:focus-within": {
            backgroundColor: "#fff",
            boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
            borderRadius: 40,
            "& .MuiSelect-nativeInput": {
                backgroundColor: "#fff"
            }
        },
        "& .MuiFormLabel-root": {
            color: "#263238",
            fontWeight: 500,
            fontSize: "0.8rem",
            marginBottom: theme.spacing(1.5)
        },
        "& .MuiAutocomplete-input": {
            backgroundColor: "transparent",
            color: "#0151CA",
            fontSize: "0.9rem",
            border: 0,
            outline: "none",
            fontWeight: 600,
            padding: 0,
            display: "block",
            width: "100%",
            "&::-webkit-input-placeholder": {
                color: "#BBBBBB",
                fontWeight: "normal",
            }
        },
        "&.withSearch": {
            border: 0,
            display: "flex",
            paddingRight: theme.spacing(1),
            justifyContent: "space-between"
        },

        "& .MuiInput-root": {
            color: "#0151CA",
            width: "100%",
            border: "0",
            display: "block",
            outline: "none",
            fontWeight: "600",
            fontSize: "0.9rem",
            backgroundColor: "transparent",
            border: "none",
            "&.MuiInput-underline:after": {
                display: "none"
            },
            "&.MuiInput-underline:before": {
                display: "none"
            }
        },
        "& .MuiSelect-icon": {
            display: "none"
        },

        "& .MuiIconButton-root": {
            margin: 0,
            position: "absolute",
            top: "50%",
            right: theme.spacing(1.5),
            transform: "translateY(-50%)",
            // "&.priceClearBtn": {
            //   right: 140
            // }
        },
        "& .MuiSelect-nativeInput": {
            border: 0,
            opacity: 1,
            "&::-webkit-input-placeholder": {
                color: "#BBBBBB",
                fontSize: "0.9rem",
                fontWeight: "normal"
            }
        }
    },
    sendOtpTxt: {
        display: "flex",
        flexDirection: "column",
        fontWeight: 500,
        "& span": {
            fontWeight: 600,
        }
    },

    chipCont: {
        whiteSpace: "pre-wrap",
        "& .MuiChip-root": {
            backgroundColor: "#EAF2FC",
            color: "#0038C0",
            fontWeight: 600,
            fontSize: "0.8rem",
            marginRight: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
            maxWidth: 208,
            // [theme.breakpoints.down("sm")]: {
            //     height: "auto",
            //     maxWidth: "70%",
            //     padding: theme.spacing(1)
            // },
            // "& .MuiChip-label": {
            //     [theme.breakpoints.down("sm")]: {
            //         whiteSpace: "initial",
            //         whiteSpace: "nowrap",
            //         overflow: "hidden",
            //         textOverflow: "ellipsis"
            //     }
            // }
        }
    },

    // NEW CSS

    towerCard: {
        // marginBottom: "20px",
        "& .title": {
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "28px",
            color: "#0F2940"
        },
        "& .cardContent": {
            minWidth: "175px",
            height: "75px",
            background: "#FFFFFF",
            border: "1px solid #EDEFF0",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",

            "&.active": {
                background: "#F4F8FD",
                border: "2px solid #0151CA",
                color: "#0151CA"
            }
        },

        "& .towerLabel": {
            fontWeight: "600",
            fontSize: "0.8rem",
            lineHeight: "22px",
            marginBottom: "2px"
        },

        "& .roomTypeLabel": {
            paddingLeft: "6px",
            fontWeight: "500",
            fontSize: "0.8rem",
            lineHeight: "16px",
            color: "#4C5C6D"
        },

        "& .unitsLabel": {
            fontWeight: "500",
            fontSize: "0.8rem",
            lineHeight: "16px",
            color: "#00437E"
        }
    },

    buildingFloorMap: {
        paddingTop: "10px",
        height: 495,
        overflow: "auto",

        "& .title": {
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "28px",
            color: "#0F2940"
        },
        "& .subTitle": {

            fontWeight: "400",
            fontSize: "0.75",
            lineHeight: "18px",
            color: "#65707D"
        },
        "&::-webkit-scrollbar-track": {
            background: "rgba(7, 42, 200, 0.1)",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #0038C0 0%, #006FD5 100%)",
        },
    },

    statusIndicator: {
        height: "50px",
        background: "#FFFFFF",
        border: "1px solid rgba(76, 92, 109, 0.1)",
        borderRadius: "5px",
        padding: "0px 16px",
        marginTop: "15px",

        "& .MuiTypography-body1": {
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "18px",
            color: "#0F2940"
        },

        "& .notEligibleTxt, .bookedTxt, .inProgressTxt, .availableTxt": {
            width: "18px",
            height: "18px",
            // box- sizing: border- box;
            borderRadius: "2px",
            marginRight: "8px",
            // background: "#65707d",
        },
        "& .chooseTxt": {
            color: "#0F2940",
            fontSize: "16px",
            fontWeight: "600",
            margin: "0px"
        }

    },
    flatNotEligible: {
        // color: "#2d2d2e !important",
        // border: "1px dashed #e651008c !important",
        // background: "#fb8c0087",
        color: "#B8BDC3 !important",
        border: "1px solid #B8BDC3",
        background: "#e0e0e0",
        // background: `url(${notEligibleIcon}),  #f5f7f8`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "contain",
        // backgroundPosition: "center",
    },
    flatNotEligibleLegend: {
        border: "1px solid #B8BDC3",
        color: "#B8BDC3 !important",
        background: `url(${notEligibleLegendIcon}),  #f5f7f8`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
    },

    flatBookedLabel: {
        background: "#e0e0e0",
        border: "1px solid rgba(15, 41, 64, 0.4) !important",
        // border: "2px dashed #e651008c !important",
        // background: "#fb8c0087"
    },
    flatSelectedLabel: {
        background: "#0DC143",
    },


    flatBooked: {
        background: "#e0e0e0",
        border: "1px solid #B8BDC3 !important",
        color: "rgba(101, 112, 125, 0.3) !important",
        fontWeight: "700!important"
        // color: "#2d2d2e !important",
        // border: "1px dashed #e651008c !important",
        // background: "#fb8c0087",
    },

    selectedFlat: {
        background: "#0DC143 !important",
        fontWeight: "700 !important",
        color: "#ffffff !important",

        "&.MuiButton-root:hover": {
            backgroundColor: "#067937!important"
        }
    },

    availableFlat: {
        background: "#ffffff",
        border: "2px solid #0DC143 !important",
        color: "#0DC143",
        boxShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)",
        "&.MuiButton-root:hover": {
            backgroundColor: "#0DC143!important",
            color: "#ffffff",
        }
    },

    inProgressLabel: {
        border: "1px solid #FF9800",
        background: "#fb8c0069",
        // color: "rgb(237, 108, 2)!important",
        // background: `url(${MaskLinesIcon}),  #f5f7f8`,
        // backgroundSize: "cover"
    },

    inProgressFlat: {
        // background: `url(${MaskLinesIcon}),  #f5f7f8`,
        border: "1px solid #dc8606 !important",
        color: "#EF6C00 !important",
        background: "#fb8c0033",
        fontWeight: "700!important"
    },

    flatAvailable: {
        background: "#FEFEFE",
        border: "2px solid #0DC143"
    },
    avlFlatLabel: {
        border: "1px solid #318b31",
        borderRadius: 50,
        padding: "0 5px",
        fontWeight: 700,
        color: "#318b31",
        fontSize: 14,
        background: "#94e59457"
    },

    noTowerBanner: {
        position: "relative",
        // width: 860px;
        height: "260px",

        "& .bannerContent": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",

            "& .title": {
                fontWeight: "700",
                fontSize: "1rem",
                lineHeight: "22px",
                textAlign: "center",
                color: "#0F2940",
                paddingTop: "18px"
            },

            "& .subTitle": {
                fontWeight: "400",
                fontSize: "0.75rem",
                lineHeight: "16px",
                textAlign: "center",
                color: "#65707D"
            }
        }
    },

    formSelectContainer: {
        display: "flex",
        "& .MuiFormControl-fullWidth": {
            height: "80%"
        },

        "& .selectedFlatDiv": {
            marginTop: "28px",
            maxHeight: "70px",
            border: "2px solid #0151CA",
            background: "#FAFAFD",
            borderRadius: "4px"
        },

        "& .unitPanDiv": {
            position: "relative",
            width: "260px",
            height: "115px",
            background: "#FAFAFD",
            border: "1px solid rgba(101, 112, 125, 0.4)",
            borderRadius: "4px",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "70px",
            textAlign: "center"


        }
    },

    overlayBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "10px",
        lineHeight: "15px",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "20px",
        left: "calc(50 % - 166px / 2)",
        bottom: "0px",
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
        // borderAadius: "0px 0px 4px 4px",
        borderBottomRightRadius: "3px",
        borderBottomLeftRadius: "3px",
        lineHeight: "20px",
        color: "#fff",
        cursor: "pointer",

        "& img": {
            width: "18px",
            marginRight: "10px"
        }
    },

    moreImgOverlay: {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "15px",
        "& img": {
            width: "18px",
        }
    },

    imageBoxHover: {
        visibility: "hidden",
        "& .MuiImageListItemBar-title": {
            fontSize: "0.8rem"
        },
    },
    imgContainer: {
        cursor: "pointer",
        "&:hover $imageBoxHover": {
            visibility: "visible"
        }
    },
    owlCarouselCont: {
        "&.owl-carousel": {
            transform: "rotate(90deg)",
            width: "270px",
            marginTop: "100px",
            "& .owl-item": {
                paddingBottom: theme.spacing(3.5),
                height: "fit-content",
                width: "600px"
            },
            "& .item": {
                height: "100%",
                width: "100%",
                transform: "rotate(-90deg)",
            },
            "& .owl-nav": {
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                "& button": {
                    border: "2px solid #0038C0",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    margin: theme.spacing(0, 1),
                    "&.disabled": {
                        cursor: "default",
                        opacity: 0.5,
                    },
                    "& img": {
                        Width: 250
                    }
                }
            }
        },
    },
    cardRoot: {
        background: "#FFFFFF",
        boxShadow: "0px 8px 20px rgba(0, 56, 192, 0.1)",
        borderRadius: 10,
        overflow: "hidden",
    },
    keyPlanTxt: {
        color: "#0F2940",
        fontSize: "14px",
        fontWeight: "700",
    },
    imgExpandCont: {
        backgroundColor: "transparent"
    },
    towerSelectDropDown: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0151CA",
            borderWidth: 2
        }
    },
    towerSelectDropDownLabel: {
        color: "#0151CA",
        fontWeight: 600,
    },
    projectCardCont: {
        margin: theme.spacing(2, 1),
        background: "rgba(101, 112, 125, 0.01)",
        border: "2px solid #0151CA",
        borderRadius: "5px",
    },
    upperTabBar: {

    },
    ImgTittle: {
        margin: "5px",
        fontWeight: "700",

    },
    filterBtnCon: {
        "& .MuiButton-root": {

        }
    },
    filterBtn: {
        borderRadius: 30,
        fontSize: 12,
        border: "1px solid #1976d2",

    },
    filterCon: {
        margin: theme.spacing(2, 3),
    },
    filterBadge: {
        '& .MuiBadge-colorSecondary': {
            color: "white"
        }
    },
    flatRowCon: {
        '&.selected': {
            borderRadius: 8,
            background: '#90f18b57',
            border: '1px dashed #30a730',
            boxShadow: '0px 6px 12px rgba(15, 41, 64, 0.06)'
        },
        // "&:hover": {
        //     backgroundColor: "#f7f7f780",
        //   },
    },
    flatList: {
        visibility: "hidden"
    },
    mapTooltip: {
        textAlign: "center",
        position: "absolute",
        // color: "#fff",
        // padding: "10px",
        // background: "rgb(49 113 24 / 91%)",
        // transform: "translate3d(-50%, -50%, 0)",
        // borderRadius: "5px",
        pointerEvents: "none",
        zIndex: "1000",
        // animation: "$pulse 1.5s ease-in-out infinite"
    },
    title: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 600,
        marginTop: 20
    },
    titleBar: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 47%, rgba(0,0,0,0) 100%)'
    },
    animateBtn: {
        animation: "$glowing 1500ms infinite",
    },
    '@keyframes glowing': {
        '0%': {
            backgroundColor: '#0038c0',
            boxShadow: '0 0 3px #002fb2',
        },
        '50%': {
            backgroundColor: '#0038c0',
            boxShadow: '0 0 15px #0038c0',
        },
        '100%': {
            backgroundColor: '#0038c0',
            boxShadow: '0 0 3px #0151ca',
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomTooltip = withStyles({
    tooltip: {
        backgroundColor: "#FFFFFF",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 11,
        boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
        borderRadius: "8px",
        border: "1px solid rgba(0, 56, 192, 1)",
    },
    arrow: {
        "&:before": {
            border: "1px solid rgba(0, 56, 192, 1)",
        },
        color: "#FFFFFF",
    },
})(Tooltip);
const SetFlatPerferenceDialogBox = (props) => {
    const { open, onClose, projectDetails, selectedFlat, TowerSelected } = props;
    const classes = useStyles();
    const { t } = useTranslation("ProjectDetailsPageTrans");
    const formikRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const { isSuccessResAddPreferences, isErrorAddPreferences, isSuccessResFloorList, floorListData, errorMsgAddPreferences, preferencesDetails, isFetchingAddFloor, isFetchingAddPreferences,
        isSuccessResAddFloor, floorDetails, isErrorAddFloor, errorMsgAddFloor, isFetchingConfirmFlat, isSuccessResConfirmFlat, isErrorConfirmFlat, errorMsgConfirmFlat, isSuccessResCancelFlat, errorMsgCancelFlat, isErrorCancelFlatwithotp, errorMsgCancelFlatwithotp, isSuccessResCancelFlatwithotp } = useSelector(preferencesSelector);
    const { isFetchingSendOtp, isSuccessSendOtp, isErrorSendOtp, sendOtpData, errorMessageSendOtp, bookingEndTime, isSuccessBookingEndTime, isFetchingSendCancellationOtp, isErrorSendCancellationOtp, errorMessageSendCancellationOtp, isSuccessSendCancellationOtp, sendCancellationOtpData } = useSelector(preferencesSelector);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [activeStep, setActiveStep] = React.useState(0);
    const [buildingWingRecords, setBuildingWingRecords] = React.useState([]);
    const [wingRecords, setWingRecords] = React.useState([]);
    const [floorRecords, setFloorRecords] = React.useState([]);
    const [floorRecordsCopy, setFloorRecordsCopy] = React.useState([]);
    const [selectedUnit, setSelectedUnit] = React.useState([]);
    const [selectedFloor, setSelectedFloor] = React.useState();
    const [confirmScheme, setConfirmScheme] = React.useState(false);
    const [showConfirmCancel, setShowConfirmCancel] = React.useState(false);
    const [showConfirmRebook, setShowConfirmRebook] = React.useState(false);
    const [flatConfirm, setFlatConfirm] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [typeSelectedValue, setTypeSelectedValue] = React.useState("");
    const [dropDownList, setDropDownList] = React.useState([]);
    const [showToasterMsg, setShowToasterMsg] = React.useState(false);
    const [previousSelectedFlat, setPreviousSelectedFlat] = React.useState([]);
    const [selectedTower, setSelectedTower] = React.useState([]);
    const [showPreviousBooking, setShowPreviousBooking] = React.useState(false);
    const [applicantMobile, setApplicantMobile] = useState(JSON.parse(localStorage.getItem("mobileNo")));
    const [isGeneratedOtp, setIsGeneratedOtp] = React.useState(false);
    const [isResenOtpText, setResenOtpText] = React.useState(false);
    const [countOtp, setCountOtp] = React.useState(90);
    const [PlanImageType, setPlanImageType] = React.useState([]);
    const [showPlanImage, setshowPlanImage] = React.useState(false);
    const [towerDetails, setTowerDetails] = React.useState([]);
    const [selectScheme, setSelectScheme] = React.useState("");
    const [imgCarouselPos, setImgCarouselPos] = React.useState(1);
    const [imgCarouselType, setImgCarouselType] = React.useState("");
    const [curImg, setCurImg] = React.useState("")
    const [value, setValue] = React.useState(0);
    const [filterTypeValue, setFilterTypeValue] = useState()
    const [initialFlatInfoPosition, setInitialFlatInfoPosition] = useState(null);
    const [commonPlanImg, setCommonPlanImg] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isFilterActive, setIsFilterActive] = useState(false)
    const [activeFilterValue, setActiveFilterValue] = useState()
    const [refugeeFloor, setRefugeeFloor] = useState("")
    const openFilter = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const selectedUnitRef = useRef(null);
    const selectedFloorRef = useRef(null);

    useEffect(() => {
        if (selectedUnitRef.current) {
            selectedUnitRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (selectedFloorRef.current) {
            selectedFloorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedUnit, selectedFloor]);

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
        if (activeFilterValue) {
            setFilterTypeValue(activeFilterValue);
        }
        else {
            setFilterTypeValue();
        }
    };
    const handleFilterChange = (event) => {
        setFilterTypeValue(event.target.value);
    };

    const applyFilter = () => {
        if (filterTypeValue) {
            let apiPayload = {
                "ApplicantId": localStorage.getItem("applicantId"),
                "Lang": localStorage.getItem("i18nextLng"),
                "ProjectId": projectDetails.projectId,
                "Wing": selectedValue,
                "Type": filterTypeValue
            }
            setActiveFilterValue(filterTypeValue);
            setIsFilterActive(true);
            setAnchorEl(null);
            dispatch(getFloorsDetails(apiPayload));
        }
    }

    const clearFilter = () => {
        setActiveFilterValue();
        let apiPayload = {
            "ApplicantId": localStorage.getItem("applicantId"),
            "Lang": localStorage.getItem("i18nextLng"),
            "ProjectId": projectDetails.projectId,
            "Wing": selectedValue,
        }
        setIsFilterActive(false);
        setFilterTypeValue();
        dispatch(getFloorsDetails(apiPayload));
    }

    const FlatInfoRef = useRef(null)

    const [show, setShow] = useState(false)

    const handleAddToCart = (event) => {

        if (FlatInfoRef.current) {
            const flatInfoPosition = FlatInfoRef.current.getBoundingClientRect();
            // imageGallery
            const itemPosition = {
                x: event.clientX - flatInfoPosition.x,
                y: event.clientY - flatInfoPosition.y
            }

            if (show) {
                setShow(false);
                setTimeout(() => {
                    setInitialFlatInfoPosition(itemPosition);
                    setShow(true);

                }, 50);

            } else {
                setInitialFlatInfoPosition(itemPosition);
                console.table(itemPosition)
                setShow(true);

            }
        }
    };



    const initialValues = {
        mobileNumber: "",
        oneTimePassword: "",
    };

    const initialValuesCancel = {
        mobileNumberCancel: "",
        oneTimePasswordCancel: "",
    };

    const otpCounter = () => {
        dispatch(clearBookingOtpState())
        let timeleft = 90;
        var downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
            }
            setCountOtp(timeleft);
            timeleft -= 1;
        }, 1000);
    };

    const validateOTP = (value) => {
        let error;
        if (!value) {
            error = t("projectCard.otpReqText");
        } else if (!/^[0-9]{6}$/i.test(value)) {
            error = t("projectCard.otpReqText");
        }
        return error;
    };
    useEffect(() => {
        let params = {
            "ApplicantId": localStorage.getItem("applicantId"),
            "Lang": localStorage.getItem("i18nextLng"),
            "ProjectId": projectDetails.projectId
        }
        dispatch(getFlatPreference(params));
    }, [projectDetails]);

    // useEffect(() => {
    //     console.log("--TowerSelected--",TowerSelected);
    //     if (+TowerSelected > 0) {
    //         setSelectedTower(TowerSelected);
    //         handleChange(TowerSelected);
    //         //handleChange(TowerSelected);
    //         setSelectScheme(TowerSelected);
    //     }
    // }, [TowerSelected]);

    // Load deffault view when already book flat open 
    useEffect(() => {
        if (selectedFlat.length > 0 && selectedFlat[0]?.ProjectId == projectDetails.ProjectId) {
            handleChange(selectedFlat[0].Wing);
            setSelectScheme(selectedFlat[0].Wing);
            setPreviousSelectedFlat(selectedFlat[0]);
        }
    }, [selectedFlat])

    const handleChange = (event) => {
        if (event) {
            setSelectedFloor();
            setSelectedValue(event);

            let apiPayload = {
                "ApplicantId": localStorage.getItem("applicantId"),
                "Lang": localStorage.getItem("i18nextLng"),
                "ProjectId": projectDetails.projectId,
                "Wing": event,
                "Type": filterTypeValue
            }
            dispatch(getFloorsDetails(apiPayload));
        }
    };

    const handleNext = () => {
        if (activeStep < 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const selectFloor = (floorObject, type) => {
        var tmpfloorObject = Object.assign({}, floorObject);
        //tmpfloorObject['selectedTower'] = selectedValue;
        tmpfloorObject.selectedTower = selectedValue;
        if (type == "confirmBook") {
            if (selectedUnit == "") {
                setSelectedFloor(tmpfloorObject);
            } else {
                setShowToasterMsg(true);
                setShowConfirmRebook(true);
                // setInterval(callAPI, 50000);
            }
            // setConfirmScheme(true);
        }

        if (type == "ConfirmCancel") {
            //setShowConfirmCancel(true);
            setShowConfirmRebook(true);
        }
    }

    useEffect(() => {
        dispatch(getApplicantProgress());
    }, [dispatch]);


    const { ApplicantStepperData, isSuccessProgressResStepper, superStepper } = useSelector(ApplicantProgressSelector);
    const updateApplicantProgressStepper = (status) => {
        let newStepper = [];
        let newStep = {};
        if (isSuccessProgressResStepper) {
            const ApplicantStepper = ApplicantStepperData.superStepper ? ApplicantStepperData.superStepper : superStepper;
            ApplicantStepper.forEach(step => {

                if (step.StepId == 9) {
                    newStep = {
                        ...step,
                        Status: status,
                        Description: "Flat selection"
                    }
                } else {
                    if (status == "pending") {
                        if (step.StepId == 8) {
                            newStep = {
                                ...step,
                                Status: "completed",
                            }
                        } else {
                            newStep = step
                        }
                    } else {
                        newStep = step
                    }
                }
                newStepper.push(newStep);
            });
            dispatch(addEditApplicantProgress(newStepper));
        }
    }

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        if (values.oneTimePassword) {
            setFlatConfirm(true);
            //setConfirmScheme(false);
            doPayment(values.oneTimePassword);
        }
    };

    // const confirmBooking = () => {
    //     setFlatConfirm(true);
    //     setConfirmScheme(false);
    //     doPayment();
    //     updateApplicantProgressStepper("completed");
    // }

    const doPayment = (OTP) => {
        let flatObj = {
            "ApplicantId": localStorage.getItem("applicantId"),
            "ProjectId": projectDetails.projectId,
            "SchemeId": projectDetails.schemeId,
            "Wing": selectedValue,
            "FloorNo": selectedFloor.FloorNo,
            "FlatNo": selectedFloor.FlatNo,
            "FrdId": selectedFloor.FrId,
            "Otp": OTP
        }
        dispatch(confirmFlatBooking(flatObj)).then((resp) => {
            var resp_payload = resp?.payload;
            if (resp_payload !== undefined) {
                if (resp_payload.hasOwnProperty("data")) {
                    var success = resp_payload?.success;
                    if (success) {
                        setConfirmScheme(false);
                    }
                }
            }
        });
        // setIsGeneratedOtp(false);
    }
    useEffect(() => {
        if (isSuccessSendOtp) {
            setTimeout(() => setResenOtpText(true), 90000);
            setIsGeneratedOtp(true);
            otpCounter();
            dispatch(clearBookingOtpState())
        }
    }, [dispatch, t, isSuccessSendOtp, otpCounter])


    const sendOtp = () => {
        dispatch(sendConfirmFlatOtp());
    }

    const resendOtp = () => {
        dispatch(sendConfirmFlatOtp());
        setResenOtpText(false);
        setTimeout(() => setResenOtpText(true), 90000);
    };

    const cancelFlatBooking = () => {
        let flatObj = {
            "ApplicantId": localStorage.getItem("applicantId"),
            "ProjectId": projectDetails.projectId,
            "Wing": selectedValue,
            "FloorNo": selectedFloor.FloorNo,
            "FlatNo": selectedFloor.FlatNo,
            "FrdId": selectedFloor.FrId
        }
        dispatch(cancelBooking(flatObj));

        setConfirmScheme(false);
        setFlatConfirm(true);
        setSelectedFloor();
        dispatch(clearBookingState());
    }

    const cancelPrevFlat = (item) => {
        //console.log("--item--",item);
        let flatObj = {
            "ApplicantId": localStorage.getItem("applicantId"),
            "ProjectId": projectDetails.projectId,
            "Wing": item.Wing,
            "FloorNo": item.FloorNo,
            "FlatNo": item.FlatNo,
            "FrdId": item.FrdId
        }

        dispatch(cancelBooking(flatObj));
        setPreviousSelectedFlat([]);
        // updateApplicantProgressStepper("pending");
    }

    useEffect(() => {
        if (preferencesDetails) {
            setBuildingWingRecords(preferencesDetails);
            if (selectedFlat.length > 0) {
                let filteredData = preferencesDetails?.Wings?.filter((item) => item.wing == selectedFlat[0]?.Wing);
                if (filteredData != undefined && filteredData?.length > 0) {
                    setSelectedTower(filteredData[0])
                }
            }
            setWingRecords(preferencesDetails.Wings);
            // dispatch(clearPreferencesState());
            // Added By Ashwin To Make The First Tab Selected By Default - START
            const pWIngs = preferencesDetails?.Wings;
            const SelectedWing = +preferencesDetails?.SelectedWing;
            if (pWIngs?.length > 1 && selectedFlat[0]?.ProjectId != projectDetails.ProjectId) {
                setSelectScheme(pWIngs[0]?.wing)
            }
            if (SelectedWing && selectedFlat[0]?.ProjectId == projectDetails.ProjectId) {
                handleChange(SelectedWing);
            } else {
                if (pWIngs?.length > 0) {
                    if (TowerSelected) {
                        let filteredData = pWIngs.filter((item) => item.wing == TowerSelected);
                        if (filteredData != undefined && filteredData?.length > 0) {
                            setSelectedTower(TowerSelected);
                            setSelectScheme(TowerSelected);
                            handleChange(TowerSelected);
                        } else {
                            handleChange(pWIngs[0]?.wing);
                        }
                    } else {
                        if (selectedFlat[0]?.ProjectId != projectDetails.ProjectId) {
                            handleChange(pWIngs[0]?.wing);
                        }
                    }
                }
            }
            // Added By Ashwin To Make The First Tab Selected By Default - END
        }
    }, [isSuccessResAddPreferences]);

    useEffect(() => {
        if (isSuccessResAddFloor) {
            setFloorRecords(floorDetails.floors);
            setFloorRecordsCopy(floorDetails.floors);
            setCommonPlanImg(floorDetails.CommonFloorPlan);
            setRefugeeFloor(floorDetails.RefugeFloors);
            if (floorDetails?.Applicant_Booking_Status?.length > 0) {
                setShowPreviousBooking(true);
                setSelectedUnit(floorDetails.Applicant_Booking_Status[0]);
            } else {
                setShowPreviousBooking(false);
                setSelectedUnit([]);
            }
        }
    }, [isSuccessResAddFloor]);

    useEffect(() => {
        if (isSuccessResFloorList) {
            setDropDownList(floorListData.Floors);
        }
    }, [isSuccessResFloorList]);

    useEffect(() => {
        if (isSuccessResConfirmFlat) {
            // dispatch(getFloorsDetails(apiPayload));

            setSelectedFloor();
            onClose(false);
            setFloorRecords([]);
            setIsGeneratedOtp(false);

            let jsonObj = {
                "ApplicantId": localStorage.getItem("applicantId")
            }

            dispatch(getBookingEndTime(jsonObj));

            const initialState = {
                isSuccessResConfirmFlat: false
            }
            dispatch(resetPreferencesState(initialState));
            // updateApplicantProgressStepper("completed");
        }
    }, [isSuccessResConfirmFlat])

    useEffect(() => {
        if (isSuccessResCancelFlat) {
            // setSelectedUnit([]);
            let apiPayload = {
                "ApplicantId": localStorage.getItem("applicantId"),
                "Lang": localStorage.getItem("i18nextLng"),
                "ProjectId": projectDetails.projectId,
                "Wing": selectedValue
            }
            dispatch(getFloorsDetails(apiPayload));
            setShowConfirmCancel(false);
            let jsonObj = {
                "ApplicantId": localStorage.getItem("applicantId")
            }
            dispatch(getBookingEndTime(jsonObj));
            // setSelectedUnit([]);
            // dispatch(clearBookingState());
        }
    }, [isSuccessResCancelFlat]);

    useEffect(() => {
        if (isSuccessBookingEndTime) {
            localStorage.setItem("showPaymentExpRibbon", true);
        }
    }, [isSuccessBookingEndTime]);


    // const floorFilter = (floor) => {
    //     setTypeSelectedValue(floor);
    //     const FilterData = floorRecordsCopy.filter(item => item[0].FloorNo == floor);
    //     if (FilterData.length > 0) {
    //         setFloorRecords([FilterData[0]]);
    //     }
    // }

    // const clearFilter = () => {
    //     setTypeSelectedValue("");
    //     setFloorRecords(floorRecordsCopy);
    // }

    const handleClose = () => {
        setShowToasterMsg(false);
        setShowCancellationToasterMsg(false);
        dispatch(clearCancelBookingwithOtpState());
        //setShowConfirmRebook(false);
    };

    const viewPlanImage = (type, index) => {
        // setPlanImageType(projectDetails[type][0]);
        setPlanImageType(projectDetails[type]);
        setshowPlanImage(true);
        setImgCarouselPos(index);
        setImgCarouselType(type);
    }
    const selectedFlatImg = (type, index, form) => {
        setPlanImageType(type);
        setshowPlanImage(true);
        setImgCarouselPos(index);
        setImgCarouselType(form);
    }

    const towerInitialValues = {
        location: ""
    };

    const urlReplace = (url) => {
        return url.replace("10.200.0.21", "restlotterydev.cidcohomes.com")
    }

    const isFlatSelected = (floor) => {
        const value = floor.filter((flat) => flat.FrId == (selectedUnit?.FrdId || selectedFloor?.FrId))
        return value[0];
    }

    const [showCancellationOtp, setShowCancellationOtp] = React.useState(false);
    const [isGeneratedCancellationOtp, setIsGeneratedCancellationOtp] = React.useState(false);
    const [countCancellationOtp, setCountCancellationOtp] = React.useState(90);
    const [isResenCancellationOtpText, setResenCancellationOtpText] = React.useState(false);
    const [showCancellationToasterMsg, setShowCancellationToasterMsg] = React.useState(false);
    const [isFlatListLoaded, setIsFlatListLoaded] = React.useState(true);
    const formikRefCancel = useRef();

    useEffect(() => {
        if (isSuccessResCancelFlatwithotp) {
            // setSelectedUnit([]);
            //alert('in hererer');
            setShowCancellationToasterMsg(true);
            let apiPayload = {
                "ApplicantId": localStorage.getItem("applicantId"),
                "Lang": localStorage.getItem("i18nextLng"),
                "ProjectId": projectDetails.projectId,
                "Wing": selectedValue
            }
            dispatch(getFloorsDetails(apiPayload));
            setShowConfirmCancel(false);
            let jsonObj = {
                "ApplicantId": localStorage.getItem("applicantId")
            }
            dispatch(getBookingEndTime(jsonObj));
            // setSelectedUnit([]);
            // dispatch(clearBookingState());
        }
    }, [isSuccessResCancelFlatwithotp]);

    const onSubmitCancel = (values, { setSubmitting }) => {
        setSubmitting(false)
        if (values.oneTimePasswordCancel) {
            setFlatConfirm(false);
            doCancellation(values.oneTimePasswordCancel);
        }
    };

    const doCancellation = (OTP) => {
        //console.log("--OTP--",OTP);
        //console.log("--selectedUnit--",selectedUnit);
        let flatObj = {
            "ApplicantId": localStorage.getItem("applicantId"),
            "ProjectId": projectDetails.projectId,
            "Wing": selectedUnit.Wing,
            "FloorNo": selectedUnit.FloorNo,
            "FlatNo": selectedUnit.FlatNo,
            "FrdId": selectedUnit.FrdId,
            "Otp": OTP
        }
        dispatch(cancelBookingwithOtp(flatObj)).then((resp) => {
            var resp_payload = resp?.payload;
            //console.log("resp_payload",resp_payload);
            if (resp_payload !== undefined) {
                if (resp_payload.hasOwnProperty("data")) {
                    var success = resp_payload?.success;
                    if (success) {
                        setShowCancellationOtp(false);
                        setIsGeneratedCancellationOtp(false);
                        setResenCancellationOtpText(false);
                        setShowConfirmRebook(false);
                        setPreviousSelectedFlat([]);
                        // updateApplicantProgressStepper("pending");
                        dispatch(clearCancelBookingwithOtpState());
                        // setConfirmScheme(false);
                        // setFlatConfirm(true);
                        // setSelectedFloor();
                        // dispatch(clearBookingState());                        
                    } else {
                        //dispatch(clearCancelBookingwithOtpState());
                        //setShowToasterMsg(true);
                    }
                }
            }
        });
    }

    const resendCancelOtp = () => {
        dispatch(sendConfirmFlatCancellationOtp());
        setResenCancellationOtpText(false);
        //setTimeout(() => setResenCancellationOtpText(true), 90000);
    };

    const otpCounterCancellation = () => {
        //dispatch(clearBookingCancellationOtpState())
        let timeleftCancel = 90;
        var downloadTimerCancellation = setInterval(function () {
            //console.log("--timeleftCancel--",timeleftCancel);
            if (timeleftCancel <= 0) {
                clearInterval(downloadTimerCancellation);
            }
            setCountCancellationOtp(timeleftCancel);
            timeleftCancel -= 1;
        }, 1000);
    };

    useEffect(() => {
        if (isSuccessSendCancellationOtp) {
            //setShowCancellationOtp(false);
            setTimeout(() => setResenCancellationOtpText(true), 90000);
            setIsGeneratedCancellationOtp(true);
            otpCounterCancellation();
            dispatch(clearBookingCancellationOtpState())
        }
    }, [dispatch, t, isSuccessSendCancellationOtp, otpCounterCancellation])

    const showCancellationOtpFunc = (unit) => {
        setShowCancellationOtp(true);
    }

    const sendCancellationOtp = () => {
        dispatch(sendConfirmFlatCancellationOtp());
    }

    const [lstimerTmp, setLSTimerTmp] = useState('');
    useEffect(() => {
        var Timerid = "";
        var sessionTimer = localStorage.getItem("RibbonTimer");
        function fetchTimer() {
            var sTimer = localStorage.getItem("RibbonTimer");
            if (sTimer != "") {
                var splitTime = sTimer.split(":");
                setLSTimerTmp(splitTime[0] + " Days| " + splitTime[1] + " Hr| " + splitTime[2] + " Min| " + splitTime[3] + " Sec");
            } else {
                setLSTimerTmp("");
                clearInterval(Timerid);
            }
        }
        if (sessionTimer != "") {
            Timerid = setInterval(() => {
                fetchTimer();
            }, 1000)
        }
        //setTimeout(function(){ setIsFlatListLoaded(false) },500);
    }, []);

    const [selectedShops, setSelectedShops] = useState([]);
    const [tooltip, setTooltip] = useState(null);
    const [hoveredShop, setHoveredShop] = useState(null)
    const [showDetails, setShowDetails] = useState(false);
    const [startTab, setstartTab] = useState(0);
    const [shopsMap, setShopsMap] = useState({
        name: 'Sector_Image',
        main_image: shop,
        mapLocation: 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d544.3670427136855!2d73.05855937814914!3d19.024004397884994!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1702287963653!5m2!1sen!2sin',
        areas: [
            {
                id: '1',
                name: 'Shop-1',
                coords: [473, 16, 590, 16, 592, 106, 471, 106],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['473.5px', '13px'],
                tooltipPos: ['482.5px', '40px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                emd: '90000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '5.350 x 4.1 SQMT',
                shopNo: '1',
                tenderNo: 'taloja/sector39/123',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
            {
                id: '2',
                name: 'Shop-2',
                coords: [381, 16, 466, 18, 466, 103, 398, 103, 398, 134, 375, 134, 377, 83, 370, 83, 370, 34, 381, 33],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['376px', '12.1px'],
                tooltipPos: ['466px', '40.1px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                emd: '90000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '4.3 x 3.825 SQMT',
                shopNo: '2',
                tenderNo: 'taloja/sector39/124',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
            {
                id: '3',
                name: 'Shop-3',
                coords: [263, 18, 357, 14, 358, 69, 342, 70, 341, 110, 281, 111, 283, 73, 263, 74],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['260px', '12.37px'],
                tooltipPos: ['350px', '40.37px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                emd: '90000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '4.275 x 2.915 SQMT',
                shopNo: '3',
                tenderNo: 'taloja/sector39/125',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
            {
                id: '4',
                name: 'Shop-4',
                coords: [164, 18, 242, 16, 241, 34, 253, 33, 255, 78, 246, 80, 246, 134, 164, 134, 164, 102, 156, 100, 156, 37, 165, 36],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['163.3px', '13.8px'],
                tooltipPos: ['254.3px', '41.8px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                emd: '90000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '4.3 x 5.4 SQMT',
                shopNo: '4',
                tenderNo: 'taloja/sector39/126',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
            {
                id: '5',
                name: 'Shop-5',
                coords: [33, 15, 150, 14, 151, 104, 32, 103],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['34.5px', '12px'],
                tooltipPos: ['124.5px', '40px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                emd: '90000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '5.35 x 4.1 SQMT',
                shopNo: '5',
                tenderNo: 'taloja/sector39/127',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
            {
                id: '6',
                name: 'Shop-6',
                coords: [25, 112, 151, 110, 153, 200, 97, 200, 98, 206, 52, 206, 53, 196, 26, 194, 26, 175],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['30.5px', '112px'],
                tooltipPos: ['120.5px', '140px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '5.562 x 4.1 SQMT',
                shopNo: '6',
                tenderNo: 'taloja/sector39/128',
                emd: '90000',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
            {
                id: '7',
                name: 'Shop-7',
                coords: [25, 218, 93, 219, 93, 233, 124, 236, 125, 298, 93, 297, 93, 313, 25, 313],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['36.5px', '215px'],
                tooltipPos: ['81.5px', '250px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                emd: '90000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '4.262 x 4.320 SQMT',
                shopNo: '7',
                tenderNo: 'taloja/sector39/129',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
            {
                id: '8',
                name: 'Shop-8',
                coords: [25, 337, 51, 336, 53, 324, 98, 325, 98, 331, 157, 330, 154, 513, 32, 512],
                preFillColor: 'rgba(0, 0, 0, 0.1)',
                shape: 'poly',
                position: ['38.5px', '336px'],
                tooltipPos: ['110.5px', '355px'],
                href: '#',
                image: shop,
                shop_area: '24.12 SQMT',
                base_price: '900000',
                emd: '90000',
                auctionIncrementValue: '2000',
                areaMultipleArea: '5.612 x 8.15 SQMT',
                shopNo: '8',
                tenderNo: 'taloja/sector39/130',
                shop_tower: 'EC-02',
                other_images: [shop, shop, shop, shop]
            },
        ],
    });

    const onCloseShowDetail = () => {
        setShowDetails(false);
    }

    useEffect(() => {
        if (hoveredShop) {
            handleMouseEnter(hoveredShop);
        }
    }, [hoveredShop]);

    const handleMouseEnter = (area) => {
        const tooltipContent = (
            <div style={{ minWidth: 210 }}>
                <Typography style={{ fontWeight: "700", padding: 5, color: "#00437E", textAlign: "start" }}>{area.name}</Typography>
                {/* <CardMedia className={classes.imgContainer}
                    style={{ borderRadius: "5px", maxWidth: 400 }}
                    component="img"
                    image={area.image || ""}
                    alt={"taloja"}
                /> */}
                <Divider flexItem />
                <Grid xs={12} container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly">
                    <Grid xs={5} className={classes.dataTitle}>
                        Shop Area
                        <br />
                        <span className={classes.dataValue}>
                            {area.shop_area}
                        </span>
                    </Grid>
                    <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
                    <Grid xs={5} className={classes.dataTitle}>
                        Shop EMD
                        <br />
                        <span className={classes.dataValue} style={{ color: "#0DC143", fontWeight: "900", textShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)" }}>
                            ₹&nbsp;{numberWithCommas(area.emd)}
                        </span>
                    </Grid>
                </Grid>

                <Grid xs={12} container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly" >
                    <Grid xs={5} className={classes.dataTitle}>
                        Base Price
                        <br />
                        <span className={classes.dataValue}>
                            ₹&nbsp;{numberWithCommas(area.base_price)}
                        </span>
                    </Grid>
                    <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
                    <Grid xs={5} className={classes.dataTitle}>
                        Tower no.
                        <br />
                        <span className={classes.dataValue}>
                            {area.shop_tower}
                        </span>
                    </Grid>
                </Grid>
            </div>
        );
        setTooltip({ tooltipContent, coords: area.tooltipPos });
    };

    const calculatePolygonCenter = (coords) => {
        let xSum = 0;
        let ySum = 0;

        // Sum up the x and y coordinates
        for (let i = 0; i < coords.length; i += 2) {
            xSum += coords[i];
            ySum += coords[i + 1];
        }

        // Calculate the average
        const centerX = xSum / (coords.length / 2);
        const centerY = ySum / (coords.length / 2);

        return { x: centerX, y: centerY };
    }

    const handleCheckboxChange = (area) => {
        const isSelected = selectedShops.some((shop) => shop.id === area.id);
        const updatedSelectedShops = isSelected
            ? selectedShops.filter((shop) => shop.id !== area.id)
            : [...selectedShops, area];

        setShopsMap((prevState) => ({
            ...prevState,
            areas: prevState.areas.map((shopArea) => ({
                ...shopArea,
                preFillColor: shopArea.id === area.id ? (isSelected ? 'rgba(0, 0, 0, 0.1)' : '#0042c094') : shopArea.preFillColor,
            })),
        }));

        setSelectedShops(updatedSelectedShops);
    };



    return (
        <Dialog fullScreen open={open} onClose={(event, reason) => { if (reason !== 'backdropClick') { onClose(false); dispatch(clearBookingState()); setSelectedUnit([]); setFloorRecords([]); setSelectedValue(''); setPreviousSelectedFlat([]) } }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth={true} maxWidth="lg" className={classes.modelBoxContainer}>
            {(isFetchingAddFloor || isFetchingAddPreferences || isFetchingConfirmFlat || isFetchingSendOtp) && <Loading isOpen={isFetchingAddFloor || isFetchingAddPreferences || isFetchingConfirmFlat || isFetchingSendOtp} />}
            <DialogContent>
                <SnackBox open={showToasterMsg} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Already you have selected the flat
                    </Alert>
                </SnackBox>
                <Box className={classes.selectWingContainer}>
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item sm={4}>
                            <Box className={classes.leftSide}>
                                <Grid container direction="column" columnSpacing={4}>
                                    {wingRecords?.length > 0 &&
                                        <Grid container spacing={1} alignItems="center" justifyContent="space-evenly">
                                            <Grid container xs={11} justifyContent="space-between" className={classes.projectCardCont}>
                                                <Grid xs={4} className={classes.projectCoverImgSec}>
                                                    <CardMedia
                                                        component="img"
                                                        className={classes.cover}
                                                        image={projectDetails.images[0]}
                                                        // title={area.title}
                                                        referrerPolicy="no-referrer"
                                                    />
                                                    <ImageListItemBar
                                                        classes={{ root: classes.imgExpandCont, }}
                                                        position="top"
                                                        actionIcon={
                                                            <IconButton
                                                                onClick={() => { viewPlanImage('images', 0); setCurImg(projectDetails.images[0]); setValue(4) }}
                                                                sx={{ color: 'white' }}
                                                                aria-label={`expand`}
                                                            >
                                                                <ExpandImgIcon />
                                                            </IconButton>
                                                        }
                                                        actionPosition="right"
                                                    />
                                                </Grid>
                                                <Grid className={classes.cardContentCont} XS={5}>
                                                    <Box className={classes.cardHeaderCont}>
                                                        <Grid container direction="column">
                                                            <Typography variant="body2" className="cardTitle" style={{ padding: 0 }}>
                                                                {projectDetails.title}
                                                            </Typography>
                                                            <Box className={classes.chipCont}>
                                                                {buildingWingRecords.CategoryName && <>
                                                                    {/* <Chip label={buildingWingRecords.CategoryName} /> */}
                                                                    <span className={classes.cardTitle}>{`${t("projectDetailsPage.overviewSec.reraIdText")}: ${projectDetails.reraId}`}</span>
                                                                </>}
                                                            </Box>
                                                            <Box className={classes.chipCont}>
                                                                <Typography className={classes.dataTitle}>
                                                                    {/* {t("projectCard.totalAvailUnit")} :{" "} */}
                                                                    Total Shops Available :
                                                                    <span className={classes.dataValue}>
                                                                        {/* {projectDetails.No_Of_Units} */}
                                                                        124
                                                                    </span>
                                                                </Typography>
                                                            </Box>
                                                            <Box className={classes.chipCont}>
                                                                <Typography className={classes.dataTitle}>
                                                                    {t("projectCard.totalTower")}. :{" "}
                                                                    <span className={classes.dataValue}>
                                                                        {projectDetails.No_Of_Towers}
                                                                    </span>
                                                                </Typography>
                                                            </Box>

                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Grid container justifyContent="space-between" alignItems="center" xs={11}>
                                                <Grid xs>
                                                    <FormControl className={classes.towerSelectDropDown} variant="outlined" fullWidth>
                                                        <InputLabel className={classes.towerSelectDropDownLabel}>{t("projectCard.selectTowerText")}</InputLabel>
                                                        <Select
                                                            style={{ display: "flex" }}
                                                            labelId="towerLabel"
                                                            label={t("projectCard.selectTowerText")}


                                                            value={selectScheme}
                                                            placeholder="34343434"
                                                            onChange={(event) => { setSelectScheme(event.target.value) }}
                                                        >

                                                            {wingRecords.map((element, i) => (
                                                                // <MenuItem onClick={() => { handleChange(element.wing); setSelectedTower(element); }} key={i} value={element.wing}>{`${t('selectFlatDialog.towerTxt')} ${element.wing} | ${t('selectFlatDialog.availableTxt')}  ${element.no_of_units} ${t('selectFlatDialog.unitsTxt')} `}</MenuItem>
                                                                <MenuItem onClick={() => { handleChange(element.wing); setSelectedTower(element); }} key={i} value={element.wing}>{`${t('selectFlatDialog.towerTxt')} ${element.wing} | ${t('selectFlatDialog.availableTxt')}  8 Shops `}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs>
                                                    <Grid container style={{ marginTop: "5px" }}>
                                                        <Typography variant="h6" className={classes.chipCont}>
                                                            {buildingWingRecords.CategoryName && <>
                                                                {t("projectCard.categoryTxt")}: <Chip label={buildingWingRecords.CategoryName} />
                                                            </>}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>}
                                    <Grid container alignItems="center" justifyContent="center" >
                                        {(selectedFloor?.FrId == undefined && selectedUnit?.FrdId == undefined) &&
                                            <><Grid className={classes.ImgTittle} item xs={12}>
                                                Shop Plan and Images (Click to enlarge):
                                            </Grid>
                                                <Grid container alignItems="center" justifyContent="center" xs={12}>
                                                    {/* <ImageList sx={{ width: 325, height: 230 }} cols={1} rowHeight={230}>
                                                        <ImageListItem className={classes.imgContainer} onClick={() => { selectedFlatImg(commonPlanImg, 0, "commonImg"); setCurImg(commonPlanImg); setValue(0) }}>
                                                            <img
                                                                style={{
                                                                    border: "1px solid rgba(101, 112, 125, 0.4)",
                                                                    borderRadius: "10px", width: "325px", height: "230px",
                                                                    objectFit: "contain"
                                                                }}
                                                                src={commonPlanImg}
                                                                srcSet={commonPlanImg}
                                                                alt={"img"}
                                                                loading="lazy"
                                                            />
                                                            <ImageListItemBar
                                                                title={t('selectFlatDialog.viewFloorLbl')}
                                                                sx={{
                                                                    background:
                                                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,selectedUnit?.FrdId 0,0) 100%)',
                                                                }}
                                                                actionIcon={
                                                                    <IconButton>
                                                                        <ExpandImgIcon />
                                                                    </IconButton>
                                                                }
                                                                position="bottom"
                                                                style={{ height: "50px" }}
                                                                className={classes.imageBoxHover}
                                                            />

                                                        </ImageListItem> : <></>
                                                    </ImageList> */}
                                                    <ImageList cols={shopsMap.areas?.length > 5 ? 5 : shopsMap.areas?.length} rowHeight={70}>
                                                        {shopsMap.areas?.map((item, index) => {
                                                            return index < 10 ?
                                                                <ImageListItem key={index} className={classes.imgContainer} onClick={() => { setShowDetails(true); setstartTab(index) }}>
                                                                    <img
                                                                        style={{
                                                                            border: "1px solid rgba(101, 112, 125, 0.4)",
                                                                            borderRadius: "10px", width: "70px", height: "70px"
                                                                        }}
                                                                        src={item.image}
                                                                        srcSet={item.image}
                                                                        alt={"img"}
                                                                        loading="lazy"
                                                                    />
                                                                    <ImageListItemBar
                                                                        title={(index == 9 && shopsMap.areas.length > 10) ? <Box className={classes.moreImgOverlay}><img src={imageGallery} alt="more Images" />{`${shopsMap.areas.length - 9}+`}</Box> : "View"}
                                                                        sx={{
                                                                            background:
                                                                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                                        }}
                                                                        position="top"
                                                                        style={{ height: "70px", visibility: (index == 9 && shopsMap.areas.length > 10) ? "visible" : "", borderRadius: "10px" }}
                                                                        className={classes.imageBoxHover}
                                                                    />
                                                                    {index <= 9 && <ImageListItemBar
                                                                        title={item.name}
                                                                        style={{ visibility: (index == 9 && shopsMap.areas.length > 10) && "hidden" }}
                                                                        classes={{
                                                                            root: classes.titleBar,
                                                                            title: classes.title,
                                                                        }}
                                                                    />}

                                                                </ImageListItem> : <></>
                                                        })}
                                                    </ImageList>
                                                </Grid></>}
                                    </Grid>
                                    <Grid container>
                                        <Grid className={classes.ImgTittle} item xs={12}>
                                            Tender details:
                                        </Grid>

                                        <Grid container alignItems="center" xs={12}>
                                            <Grid container justifyContent='space-around' alignItems="center" xs={12}>
                                                <Grid xs={6} style={{ padding: 4 }}>View Tender all details :</Grid>
                                                <Grid xs={6} style={{ padding: 4 }}>
                                                    <Button size="small" startIcon={<VisibilityIcon />} variant="outlined" color='primary'>
                                                        View Details
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} style={{ padding: 4 }}>
                                                Property Location :
                                                <br />
                                                <Button size="small" startIcon={<RoomIcon />} variant="outlined" color='primary' onClick={() => window.open(shopsMap.mapLocation)}>
                                                    View Map
                                                </Button>
                                            </Grid>
                                            <Grid xs={6} style={{ padding: 4 }}>
                                                <span>Tender booklet :</span>
                                                <br />
                                                <Button size="small" startIcon={<DownloadPrimaryIcon />} variant="outlined" color='primary'>
                                                    Download
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    {/* <Grid ref={FlatInfoRef}>
                                        {((selectedFloor?.FrId || selectedUnit?.FrdId)) &&
                                            <Motion
                                                defaultStyle={initialFlatInfoPosition}
                                                style={{ x: spring(0), y: spring(0) }}
                                            >
                                                {(style) => (
                                                    <div
                                                        className="card"
                                                        style={{
                                                            transition: 'transform 0.1s ease-in-out',
                                                            transform: `translate3d(${style.x}px, ${style.y}px, 0)`,
                                                        }}
                                                    >

                                                        <Grid item xs={12} className={classes.ImgTittle}>
                                                            {t("projectCard.keyPlanTxt")} {selectedFloor?.FlatNo || selectedUnit?.FlatNo || "--"}
                                                        </Grid>
                                                        <Grid direction="column-reverse" container alignItems="center" justifyContent="space-between">
                                                            <Grid container className="selectedFlatDiv" style={{ marginTop: "5px" }} >
                                                                <Grid container >
                                                                    <Box className={classes.dataValueView}>
                                                                        <Typography className={classes.dataTitle}>
                                                                            {t("projectForm.formControl.priceRange.priceRangeLabel")} :{" "}
                                                                            <span className={classes.dataValue}>
                                                                                ₹ XXXX
                                                                            </span>
                                                                        </Typography>
                                                                    </Box>
                                                                    <Divider style={{ marginLeft: "4px", marginRight: "4px" }} orientation="vertical" flexItem />
                                                                    
                                                                    <Box className={classes.dataValueView}>
                                                                        <Typography className={classes.dataTitle}>
                                                                            {t("projectCard.reraArea")} :{" "}
                                                                            <span className={classes.dataValue} style={{ fontSize: "0.7rem" }}>
                                                                                {selectedFloor?.CarpetArea || selectedUnit?.CarpetArea || "--"}{" "}
                                                                                {t('projectDetailsPage.essentialDetailsSec.sqftText')}
                                                                            </span>
                                                                        </Typography>
                                                                    </Box>

                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Box className="unitPanDiv">
                                                                    {(selectedFloor?.FrId == undefined && selectedUnit?.FrdId == undefined) && <>Select Flat to View Key Plan</>}
                                                                    {(selectedFloor?.FrId || selectedUnit?.FrdId) && <>
                                                                       
                                                                        <ImageList sx={{ width: 325, height: 230 }} cols={1} rowHeight={230}>
                                                                            <ImageListItem className={classes.imgContainer} onClick={() => { selectedFlatImg(selectedFloor?.keyplan || selectedUnit?.keyplan, 0, "keyPlanImg"); setCurImg(selectedFloor?.keyplan || selectedUnit?.keyplan); setValue(1) }}>
                                                                                <img
                                                                                    style={{
                                                                                        border: "1px solid rgba(101, 112, 125, 0.4)",
                                                                                        borderRadius: "10px", width: "325px", height: "230px",
                                                                                        objectFit: "contain"
                                                                                    }}
                                                                                    src={selectedFloor?.keyplan || selectedUnit?.keyplan}
                                                                                    srcSet={selectedFloor?.keyplan || selectedUnit?.keyplan}
                                                                                    alt={"img"}
                                                                                    loading="lazy"
                                                                                />
                                                                                <ImageListItemBar
                                                                                    title={`${t('selectFlatDialog.viewKeyLbl')}-${(selectedFloor?.FlatNo || selectedUnit?.FlatNo)}`}
                                                                                    sx={{
                                                                                        background:
                                                                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                                                            'rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
                                                                                    }}
                                                                                    position="bottom"
                                                                                    actionIcon={
                                                                                        <IconButton>
                                                                                            <ExpandImgIcon />
                                                                                        </IconButton>
                                                                                    }
                                                                                    style={{ height: "50px" }}
                                                                                    className={classes.imageBoxHover}
                                                                                />
                                                                                <ImageListItemBar
                                                                                    classes={{ root: classes.imgExpandCont, }}
                                                                                    position="top"
                                                                                    actionIcon={
                                                                                        <IconButton
                                                                                            sx={{ color: 'white' }}
                                                                                            aria-label={`expand`}
                                                                                            onClick={(e) => { e.stopPropagation(); selectedFlatImg(selectedFloor?.floorplan || selectedUnit?.floorplan, 1, "keyPlanImg"); setCurImg(selectedFloor?.floorplan || selectedUnit?.floorplan); setValue(1) }}
                                                                                        >
                                                                                            <ExposurePlus1Icon />
                                                                                        </IconButton>
                                                                                    }
                                                                                    actionPosition="right"
                                                                                />


                                                                            </ImageListItem> : <></>
                                                                        </ImageList>
                                                                    </>}
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                )}
                                            </Motion>
                                        }
                                    </Grid> */}
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid container sm={8}>
                            <Grid container xs={12} justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h6">Select Shop of your choice:</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton className={classes.closeDialogBtn} style={{ padding: "0 5 0 0" }} onClick={() => { onClose(false); dispatch(clearBookingState()); setSelectedUnit([]); setSelectedUnit([]); setFloorRecords([]); setSelectedValue(''); setPreviousSelectedFlat([]) }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid xs={9} className={classes.wingSelectContainer}>
                                {/* {wingRecords?.length > 0 &&
                                    <Box className={classes.towerCard}>
                                        <Box className={classes.formSelectContainer}>


                                        </Box>
                                        {(previousSelectedFlat != "" && floorRecords?.length != 0 || floorRecords != undefined) &&
                                            <Box className={classes.statusIndicator}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs={9} style={{ padding: "14px 0" }}>
                                                        <Grid container spacing={2}>
                                                            
                                                            <Grid item>
                                                                <Grid container>
                                                                   
                                                                    <Typography variant="h6" className="chooseTxt">{t("projectCard.chooseYourFlatText")}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container>
                                                                    <span className={`bookedTxt ${classes.flatBookedLabel}`}></span>
                                                                    <Typography>{t("projectCard.legends.sold")}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container>
                                                                    <span className={`inProgressTxt ${classes.inProgressLabel}`}></span>
                                                                    <Typography>{t("projectCard.legends.pending")}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container>
                                                                    <span className={`availableTxt ${classes.flatAvailable}`}></span>
                                                                    <Typography>{t("projectCard.legends.available")} <span className={classes.avlFlatLabel}>{wingRecords.filter((e) => e.wing == selectScheme)[0]?.no_of_units}</span></Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container>
                                                                    <span className={`bookedTxt ${classes.flatSelectedLabel}`}></span>
                                                                    <Typography>{t("projectCard.legends.selected")}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container xs={3} className={classes.filterBtnCon}>
                                                        <Badge color="secondary" className={classes.filterBadge} badgeContent={activeFilterValue} invisible={!isFilterActive} >
                                                            <Button aria-describedby={id} style={{ minWidth: 80 }} size="small" color='primary' className={classes.filterBtn} onClick={handleFilterClick} startIcon={<FilterListIcon />}>{t("selectFlatDialog.filterTxt")}</Button>
                                                        </Badge>
                                                        {isFilterActive && <Button style={{ minWidth: 50, marginLeft: 15, }} onClick={clearFilter} size="small" color='primary'>{t("selectFlatDialog.clearTxt")}</Button>}
                                                    </Grid>
                                                    <Popover
                                                        id={id}
                                                        open={openFilter}
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'center',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'center',
                                                        }}
                                                        onClose={handleFilterClose}
                                                    >
                                                        <Grid className={classes.filterCon} container direction="column">
                                                            <FormControl>
                                                                <FormLabel id="filter-radio-buttons-group">{t("selectFlatDialog.typeTxt")}</FormLabel>
                                                                <RadioGroup
                                                                    aria-labelledby="filter-radio-buttons-group"
                                                                    name="filter-radio-buttons-group"
                                                                    style={{ width: "fit-content" }}
                                                                    value={filterTypeValue}
                                                                    onChange={handleFilterChange}
                                                                >
                                                                    {projectDetails.Flat_Type?.map((type) => (
                                                                        <FormControlLabel value={type} control={<Radio />} label={type} />
                                                                    ))}
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <Grid container>
                                                                <Button style={{ minWidth: 75 }} disabled={!filterTypeValue} variant="contained" color='primary' size='small' onClick={applyFilter}>{t("selectFlatDialog.applyTxt")}</Button>
                                                                <Button style={{ minWidth: 75 }} onClick={handleFilterClose} color='primary' size='small'>{t("selectFlatDialog.cancelTxt")}</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Popover>
                                                </Grid>
                                            </Box>
                                        }
                                        
                                    </Box>

                                } */}

                                <Box className={classes.buildingFloorMap}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Box className={classes.flatSelectionContainer}>
                                                {isErrorAddFloor &&
                                                    <Box className={classes.alertBox}>
                                                        <AlertBox severity="error">{errorMsgAddFloor}</AlertBox>
                                                    </Box>}
                                                <div id="imageMap" style={{ position: "relative", width: "100%" }}>
                                                    <ImageMapper areaClass={classes.highlighted} lineWidth={2} strokeColor={"#0151CA"} src={shopsMap.main_image} map={shopsMap} natural={true} responsive={false} parentWidth={1300} fillColor="#ffff005c" onClick={(area) => handleCheckboxChange(area)} onMouseEnter={area => setHoveredShop(area)} onMouseLeave={area => { setHoveredShop(null); setTooltip(null) }}
                                                    // containerRef={sectorContainerRef} onClick={area => sectorClicked(area)} onMouseEnter={area => { sectorEnterArea(area) }} onMouseLeave={area => { sectorLeaveArea(area); handleMouseLeave(area) }} 
                                                    />
                                                    {
                                                        shopsMap.areas.map((area) => {
                                                            const center = calculatePolygonCenter(area.coords);
                                                            const tooltipStyle = {
                                                                left: area.position[0],
                                                                top: area.position[1],
                                                                background: area.href === "NONE" ? "rgb(120 31 31 / 91%)" : "",
                                                            };

                                                            return (
                                                                <span key={area.id} className={classes.mapTooltip} style={tooltipStyle}>
                                                                    <Checkbox
                                                                        size="large"
                                                                        checked={selectedShops.some((shop) => shop.id === area.id)}
                                                                        color="primary"
                                                                    />
                                                                </span>
                                                            );
                                                        })
                                                    }
                                                    {tooltip && <CustomTooltip
                                                        title={tooltip.tooltipContent}
                                                        TransitionComponent={Zoom}
                                                        open={Boolean(tooltip)}
                                                        leaveDelay={300}
                                                        placement='right'
                                                        arrow
                                                    >
                                                        <span
                                                            style={{
                                                                position: "absolute",
                                                                left: tooltip.coords[0],
                                                                top: tooltip.coords[1],
                                                                zIndex: 9999,
                                                            }}
                                                        />
                                                    </CustomTooltip>}
                                                </div>

                                                {/* {floorRecords?.length > 0 &&
                                                    floorRecords.map((floor, index) => (
                                                        <Grid container alignItems="center" spacing={2} justifyContent="flex-start" className={`${classes.flatRowCon} ${isFlatSelected(floor) ? "selected" : ""}`}>
                                                            <Grid item xs={2}>
                                                                <Grid container justifyContent="center">
                                                                    <Grid item xs={12}>
                                                                        <Typography variant="button" display="block" style={{ lineHeight: 1 }}>
                                                                            {t("projectCard.floorText")} {floor[0]?.FloorNo}
                                                                            {refugeeFloor.map((detail) =>
                                                                                floor[0]?.FloorNo == detail && <>
                                                                                    <br />
                                                                                    <span style={{ fontSize: 12, fontWeight: 400 }}>({t("selectFlatDialog.refugeFloorTxt")})</span>
                                                                                </>)}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className={isFlatListLoaded && classes.flatList} item xs={9}>
                                                                <Grid container>
                                                                    {floor.map((item, index) => (
                                                                        <>
                                                                            {item?.FrId != 0 && item?.FlatId != 0 ? <Grid item xs={1} style={{ margin: "5px 10px" }}>
                                                                                <Box className={classes.flatNoDiv}>
                                                                                    {item?.FrId == selectedUnit?.FrdId && <ClearIcon ref={selectedUnitRef} onClick={() => { setShow(false); selectFloor(item, 'ConfirmCancel'); }} />}
                                                                                    {item?.FrId == selectedFloor?.FrId && <ClearIcon ref={selectedFloorRef} onClick={() => { setShow(false); setSelectedFloor() }} />}
                                                                                    <CustomTooltip arrow placement="top" TransitionComponent={Zoom} title={
                                                                                        <div className="card">
                                                                                            <Grid item xs={12} className={classes.ImgTittle}>
                                                                                                {t('selectFlatDialog.keyPlan')} <span className={classes.dataValue}>{item.FlatNo} ({item.flat_type})</span>
                                                                                            </Grid>
                                                                                            <Grid direction="column-reverse" container alignItems="center" justifyContent="space-between">
                                                                                                <Grid container className="selectedFlatDiv" style={{ marginTop: "5px" }} >
                                                                                                    <Grid container >
                                                                                                        <Grid container xs={5}>
                                                                                                            <Box className={classes.dataValueView}>
                                                                                                                <Typography className={classes.dataTitle}>
                                                                                                                    {t("projectCard.unitNo")} :{" "}
                                                                                                                    <span className={classes.dataValue}>
                                                                                                                        {item.FlatNo}
                                                                                                                    </span>
                                                                                                                </Typography>
                                                                                                            </Box>
                                                                                                            <Box className={classes.dataValueView}>
                                                                                                                <Typography className={classes.dataTitle}>
                                                                                                                    {t("projectCard.floorNo")} :{" "}
                                                                                                                    <span className={classes.dataValue}>
                                                                                                                        {item.FloorNo}
                                                                                                                    </span>
                                                                                                                </Typography>
                                                                                                            </Box>
                                                                                                        </Grid>
                                                                                                        <Grid container xs={7}>
                                                                                                            <Box className={classes.dataValueView}>
                                                                                                                <Typography className={classes.dataTitle} style={{ fontSize: 11 }}>
                                                                                                                    {t("projectCard.reraArea")} :{" "}
                                                                                                                    <span className={classes.dataValue} style={{ fontSize: "0.7rem" }}>
                                                                                                                        {item.CarpetArea}{" "}
                                                                                                                        {t('projectDetailsPage.essentialDetailsSec.sqftText')}
                                                                                                                    </span>
                                                                                                                </Typography>
                                                                                                            </Box>
                                                                                                            <Box className={classes.dataValueView}>
                                                                                                                <Typography className={classes.dataTitle}>
                                                                                                                    {t("projectForm.formControl.priceRange.priceRangeLabel")} :{" "}
                                                                                                                    <span className={classes.dataValue}>
                                                                                                                        ₹ XX
                                                                                                                    </span>
                                                                                                                </Typography>
                                                                                                            </Box>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                                <Grid item>
                                                                                                    <Box className="unitPanDiv">
                                                                                                        <ImageList sx={{ width: 325, height: 230 }} cols={1} rowHeight={230}>
                                                                                                            <CardMedia className={classes.imgContainer}
                                                                                                                component="img"
                                                                                                                style={{ objectFit: "contain", height: 170 }}
                                                                                                                image={item.keyplan}
                                                                                                                alt={"key plan img"}
                                                                                                            />
                                                                                                        </ImageList>
                                                                                                    </Box>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </div>} enterDelay={200} leaveDelay={0}>
                                                                                        <Button variant="outlined" color="default" size="small" onClick={(e) => { handleAddToCart(e); selectFloor(item, 'confirmBook') }}
                                                                                            disabled={item.BookingStatus == "Booked" || item.Eligible == "NO" || item.BookingStatus == "In Progress"}
                                                                                            className={`${item.Eligible == "NO" ? classes.flatNotEligible : ""} ${item.BookingStatus == "Booked" ? classes.flatBooked : ""}  ${(item.BookingStatus == "Available" && item.Eligible == "YES") ? classes.availableFlat : ""} 
                                                                                            ${(item?.FrId == selectedFloor?.FrId && isErrorConfirmFlat == false) ? classes.selectedFlat : ""} 
                                                                                            ${(item?.FrId == selectedFloor?.FrId) ? classes.selectedFlat : ""}  
                                                                                            ${(item.BookingStatus == "In Progress" && selectedUnit.FrdId != item?.FrId) ? classes.inProgressFlat : ""}
                                                                                            ${selectedUnit.FrdId == item?.FrId ? classes.selectedFlat : ""}`}
                                                                                        >
                                                                                            {item.FlatNo}</Button>
                                                                                    </CustomTooltip>
                                                                                </Box>
                                                                            </Grid> : <Grid item xs={1} style={{ margin: "0px 10px", visibility: "hidden" }}></Grid>}
                                                                        </>
                                                                    ))                                                                       
                                                                    }
                                                                    
                                                                </Grid>
                                                            </Grid>
                                                            {isFlatListLoaded && setIsFlatListLoaded(false)}
                                                        </Grid>
                                                    ))
                                                } */}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid container xs={3} alignItems="flex-end">
                                <Grid container justifyContent="space-evenly" >
                                    {!selectedShops.length && (
                                        <Box m={1}>
                                            <AlertBox severity="warning" icon={false}>
                                                <strong>You've not selected any shop yet!</strong>
                                                <br />Select shop(s) you want to apply
                                            </AlertBox>
                                        </Box>
                                    )}
                                    {!!selectedShops.length && (
                                        <Box m={1}>
                                            <AlertBox severity="success" icon={false}>
                                                <strong>Selected Shop(s):</strong>
                                                {selectedShops.map((shop, index) => (
                                                    <ul>
                                                        <li>{shop.name}</li>
                                                    </ul>
                                                ))}
                                            </AlertBox>
                                            <Box m={1} display='flex' justifyContent='flex-end'>
                                                <Button type="button" className={classes.animateBtn} endIcon={<ArrowForwardIcon />} variant="contained" color="primary" autoFocus onClick={() => history.push('/apply-now')}>
                                                    Apply Now
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <SnackBox open={showCancellationToasterMsg} autoHideDuration={8000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {t("projectCard.afterCancellationToastMsg")}
                </Alert>
            </SnackBox>
            <Dialog sx={{ "& .MuiDialog-paper": { maxWidth: "600px", maxHeight: 435 } }} open={confirmScheme} fullWidth={true} className={classes.modelBoxConfirm} >
                {(isFetchingConfirmFlat || isFetchingSendOtp) && <Loading isOpen={isFetchingConfirmFlat || isFetchingSendOtp} />}
                <SnackBox open={isErrorSendOtp} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {errorMessageSendOtp}
                    </Alert>
                </SnackBox>
                <SnackBox open={isErrorConfirmFlat} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {errorMsgConfirmFlat}
                    </Alert>
                </SnackBox>
                <DialogTitle>{t("projectCard.confirmBookingText")}</DialogTitle>
                <DialogContent dividers>
                    <Grid container justifyContent="space-between" alignItems="baseline" style={{ paddingBottom: "16px" }}>
                        <Grid item >
                            {selectedFloor != undefined && (
                                <>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <UnitTypeIcon className={classes.scaleIconView} />
                                        </Grid>
                                        <Grid item>
                                            <Box className={classes.dataValueViewBox}>
                                                <Typography className={classes.dataTitle}>
                                                    {t("projectCard.unitNo")} :{" "}
                                                    <span className={classes.dataValue}>
                                                        {selectedFloor?.FlatNo || selectedUnit?.FlatNo}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <RoomTypeIcon className={classes.scaleIconView} />
                                        </Grid>
                                        <Grid item>
                                            <Box className={classes.dataValueViewBox}>
                                                <Typography className={classes.dataTitle}>
                                                    {t("projectCard.unitType")}  :{" "}
                                                    <span className={classes.dataValue}>
                                                        {" "}
                                                        {selectedFloor?.flat_type ||
                                                            selectedUnit?.flat_type}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        <Grid item>
                            {selectedFloor != undefined && (
                                <>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <FloorStepIcon className={classes.scaleIconView} />
                                        </Grid>
                                        <Grid item>
                                            <Box className={classes.dataValueViewBox}>
                                                <Typography className={classes.dataTitle}>
                                                    {t("projectCard.floorNo")} :{" "}
                                                    <span className={classes.dataValue}>
                                                        {selectedFloor?.FloorNo || selectedUnit?.FloorNo}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <ScaleIcon className={classes.scaleIconView} />
                                        </Grid>
                                        <Grid item>
                                            <Box className={classes.dataValueViewBox}>
                                                <Typography className={classes.dataTitle} style={{ fontSize: '0.7rem' }}>
                                                    {t("projectCard.reraArea")} :{" "}
                                                    <span className={classes.dataValue}>
                                                        {" "}
                                                        {selectedFloor?.CarpetArea ||
                                                            selectedUnit?.CarpetArea}{" "}
                                                        {t('projectDetailsPage.essentialDetailsSec.sqftText')}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        <Grid item >
                            {selectedFloor != undefined && (
                                <>
                                    <Grid container alignItems="center" >
                                        <Grid item>
                                            <WingIcon className={classes.scaleIconView} />
                                        </Grid>
                                        <Grid item>
                                            <Box className={classes.dataValueViewBox}>
                                                <Typography className={classes.dataTitle}>
                                                    {t("projectCard.towerNo")}  :{" "}
                                                    <span className={classes.dataValue}>
                                                        {selectedValue}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <RupeePriceIcon className={classes.scaleIconView} />
                                        </Grid>
                                        <Grid item>
                                            <Box className={classes.dataValueViewBox}>
                                                <Typography className={classes.dataTitle}>
                                                    {t("projectForm.formControl.priceRange.priceRangeLabel")} :{" "}
                                                    <span className={classes.dataValue}>
                                                        {/* ₹ {selectedFloor?.Cost || selectedUnit?.Cost} */}
                                                        ₹ XXXX
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                    <Grid Container style={{ display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
                        {!isGeneratedOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "65%", fontWeight: "600", marginRight: "130px", visibility: "hidden" }}>{t("projectCard.getOtpButtonText")}</Typography>
                            <DialogActions>
                                <Button autoFocus variant="contained" color="primary" onClick={sendOtp}>
                                    {t("projectCard.getOtpButtonText")}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setConfirmScheme(false);
                                        //dispatch(clearBookingState());
                                        dispatch(clearBookingOtpState());
                                    }}
                                    color="primary">
                                    {t("switchSchemeForm.cancelBtn")}
                                </Button>
                            </DialogActions> </>}
                        {isGeneratedOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "50%" }}>{t("projectCard.sendOtpText")}<span>{`+91 XXXXXX${applicantMobile?.toString().slice(-4)}`}</span></Typography>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                innerRef={formikRef}
                            >
                                {({ submitForm, setFieldValue, values }) => (
                                    <Form className={classes.form} noValidate autoComplete="off">
                                        <LocalFormControl
                                            control="input"
                                            variant="outlined"
                                            label={t("projectCard.enterOtpText")}
                                            placeholder={t("projectCard.enterOtpText")}
                                            name="oneTimePassword"
                                            type="tel"
                                            id="oneTimePassword"
                                            required
                                            inputProps={{ maxLength: 6 }}
                                            validate={validateOTP}
                                        />
                                        {!isResenOtpText && (
                                            <Box textAlign="left">
                                                <Typography
                                                    variant="subtitle2"
                                                    gutterBottom
                                                    style={{ color: "#65707D" }}
                                                >
                                                    {t("projectCard.resendOtpText")} 00:{countOtp} {t("projectCard.sec")}
                                                </Typography>
                                            </Box>
                                        )}
                                        {isResenOtpText && (
                                            <Box display="flex">
                                                <Box marginLeft={1}>
                                                    <Typography variant="body2" gutterBottom>
                                                        <Link
                                                            to="#"
                                                            onClick={() => resendOtp(values.mobileNumber)}
                                                            style={{ textDecoration: "none", color: "#0038C0", fontWeight: 600 }}
                                                        >
                                                            {t("Resend")}
                                                        </Link>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                        <DialogActions>
                                            <Button autoFocus variant="contained" type="submit" color="primary">
                                                {t("projectCard.submitBtn")}
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setConfirmScheme(false);
                                                    setIsGeneratedOtp(false);
                                                    //dispatch(clearBookingState());
                                                    dispatch(clearBookingOtpState());
                                                }}
                                                color="primary">
                                                {t("switchSchemeForm.cancelBtn")}
                                            </Button>
                                        </DialogActions>
                                    </Form>
                                )}
                            </Formik> </>}
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: 435 } }} open={showConfirmCancel}>
                <DialogTitle id="alert-dialog-title">
                    {t("projectCard.cancelFlatBookingText")}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        {t("projectCard.cancelFlatBookingNote")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={() => { cancelPrevFlat(selectedUnit) }}>
                        {t("projectCard.yesText")}
                    </Button>
                    <Button onClick={() => { setShowConfirmCancel(false) }} color="primary" autoFocus>
                        {t("projectCard.noText")}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog sx={{ '& .MuiDialog-paper': { width: '600px', maxHeight: 435 } }} open={showConfirmRebook}>
                <SnackBox open={isErrorCancelFlatwithotp} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {errorMsgCancelFlatwithotp}
                    </Alert>
                </SnackBox>
                <DialogTitle id="alert-dialog-title">
                    {t("projectCard.cancelPrevFlatBookingText")}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        {t("projectCard.cancelPrevFlatBookingNote")}
                    </DialogContentText>
                </DialogContent>
                <Grid Container style={{ display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(1, 81, 202, 0.1" }} alignItems="center">
                    <DialogActions>
                        {showCancellationOtp && !isGeneratedCancellationOtp && (
                            <>
                                <Button autoFocus variant="contained" color="primary" onClick={sendCancellationOtp}>
                                    {t("projectCard.getOtpButtonCancellationText")}
                                </Button>
                                <Button onClick={() => {
                                    setShowConfirmRebook(false); setShowCancellationOtp(false); setIsGeneratedCancellationOtp(false);
                                    dispatch(clearBookingCancellationOtpState())
                                }} color="primary" autoFocus>
                                    {t("projectCard.cancelBtn")}
                                </Button>
                            </>
                        )}
                        {!showCancellationOtp && !isGeneratedCancellationOtp && (
                            <>
                                <Button autoFocus color="primary" onClick={() => { showCancellationOtpFunc(selectedUnit) }}>
                                    {t("projectCard.yesText")}
                                </Button>
                                <Button onClick={() => {
                                    setShowConfirmRebook(false); setIsGeneratedCancellationOtp(false);
                                    dispatch(clearBookingCancellationOtpState())
                                }} color="primary" autoFocus>
                                    {t("projectCard.noText")}
                                </Button></>
                        )}
                    </DialogActions>
                    {isGeneratedCancellationOtp && <> <Typography className={classes.sendOtpTxt} style={{ width: "50%" }}>{t("projectCard.sendOtpText")}<span>{`+91 XXXXXX${applicantMobile?.toString().slice(-4)}`}</span></Typography>
                        <Formik
                            initialValues={initialValuesCancel}
                            onSubmit={onSubmitCancel}
                            innerRef={formikRefCancel}
                        >
                            {({ submitForm, setFieldValue, values }) => (
                                <Form className={classes.form} noValidate autoComplete="off">
                                    <LocalFormControl
                                        control="input"
                                        variant="outlined"
                                        label={t("projectCard.enterOtpText")}
                                        placeholder={t("projectCard.enterOtpText")}
                                        name="oneTimePasswordCancel"
                                        type="tel"
                                        id="oneTimePasswordCancel"
                                        required
                                        inputProps={{ maxLength: 6 }}
                                        validate={validateOTP}
                                    />
                                    {!isResenCancellationOtpText && (
                                        <Box textAlign="left">
                                            <Typography
                                                variant="subtitle2"
                                                gutterBottom
                                                style={{ color: "#65707D" }}
                                            >
                                                {t("projectCard.resendOtpText")} 00:{countCancellationOtp} {t("projectCard.sec")}
                                            </Typography>
                                        </Box>
                                    )}
                                    {isResenCancellationOtpText && (
                                        <Box display="flex">
                                            <Box marginLeft={1}>
                                                <Typography variant="body2" gutterBottom>
                                                    <Link
                                                        to="#"
                                                        onClick={() => resendCancelOtp(values.mobileNumberCancel)}
                                                        style={{ textDecoration: "none", color: "#0038C0", fontWeight: 600 }}
                                                    >
                                                        {t("Resend")}
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                    <DialogActions>
                                        <Button autoFocus variant="contained" type="submit" color="primary">
                                            {t("projectCard.submitBtn")}
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setConfirmScheme(false);
                                                setIsGeneratedCancellationOtp(false);
                                                dispatch(clearBookingCancellationOtpState());
                                            }}
                                            color="primary">
                                            {t("switchSchemeForm.cancelBtn")}
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik> </>}
                </Grid>
            </Dialog>

            {showDetails && <FlatImagesViewBox data={shopsMap} showDetails={showDetails} onCloseShowDetail={onCloseShowDetail} startTab={startTab} />}
        </Dialog>
    );
};

export default SetFlatPerferenceDialogBox;
