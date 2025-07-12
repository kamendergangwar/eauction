// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CardMedia,
//   Dialog,
//   Box,
//   DialogActions,
//   Grid,
//   DialogTitle,
//   DialogContent,
//   Paper,
//   makeStyles,
//   Divider,
//   Chip,
//   Slide,
//   withStyles,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   IconButton,
//   Badge,
//   InputLabel,
//   Popover,
//   Table,
//   TableContainer,
//   AppBar,
//   Toolbar,
//   Tabs,
//   Tab,
// } from "@material-ui/core";
// import AreaIcon from '../../../assets/area.jsx';
// import Talojaplotview from '../../../assets/Talojaplotview.jpg';
// import PriceIcon from "../../../assets/price.jsx";
// import { styled } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   EauctionSelector,
//   clearEauctionGenericOtpState,
//   clearEauctionVerifyOtpState,
//   getAppliedProjectData,
// } from "../../../redux/features/eauction/eauctionSlice";
// import {
//   getAuctionData,
//   eAuctionGenericOtp,
//   eAuctionVerifyOtp,
// } from "../../../redux/features/eauction/eauctionSlice";
// import moment from "moment";
// import SnackBox from "../../atoms/Snackbar/Snackbar";
// import { Alert } from "@material-ui/lab";
// import { Form, Formik } from "formik";
// import FormControl from "../../molecules/FormControl/FormControl";
// import { eauctionStyle } from "./eauctionStyle.style";
// import Loading from "../../atoms/Loading/Loading";
// import { useTranslation } from "react-i18next";
// import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import FormTitleBox from "../../atoms/FormTitleBox/FormTitleBox";
// import {
//   ExpandImgIcon,
//   FloorStepIcon,
//   RoomTypeIcon,
//   ScaleIcon,
//   UnitTypeIcon,
//   UploadDocsTitleIcon,
//   WingIcon,
// } from "../../atoms/SvgIcons/SvgIcons";
// import CloseIcon from '@material-ui/icons/Close';
// import clsx from "clsx";
// import AlertBox from "../../atoms/AlertBox/AlertBox";
// import { useRef } from "react";
// import { Motion, spring } from "react-motion";
// import { Select } from "formik-material-ui";
// import ImageMagnifyContainer from "../../atoms/ImageMagnifyContainer/ImageMagnifyContainer";
// import AddressIcon from "../../../assets/address.jsx";
// import CompassIcon from "../../../assets/compass.jsx";
// import PlotSidesIcon from "../../../assets/Plotsides.jsx";
// import RoadIcon from "../../../assets/road.jsx";
// import DescriptionIcon from "../../../assets/description.jsx";
// import ApplyNowDialog from "./ApplyTenderDialogBox/ApplyTenderDialog.jsx";
// import { ImageEndpoint } from "../../../utils/Common.js";
// const useStyles = makeStyles((theme) => ({
//   // dialogActions: {
//   //     justifyContent: "center",
//   //     padding: theme.spacing(2),
//   //     paddingBottom: theme.spacing(3),
//   // },
//   modelBoxContainer: {
//     minHeight: '75vh',
//     // maxHeight: '90vh',
//     // height: "600px",
//     "& .MuiDialogTitle-root, .MuiDialogContent-root": {
//       height: "600px",
//       overflow: "hidden",
//       padding: "0",
//       scrollbarWidth: "thin",
//       scrollbarColor: "red",

//       "& ::-webkit-scrollbar-track": {
//         background: "#ddd",

//       }

//     },
//     // "& .MuiDialog-paperWidthMd": {
//     //     height: "600px",
//     //     maxWidth: "1050px"
//     // },
//     cardFooter: {
//       padding: theme.spacing(2, 0),
//     },
//   },
//   modelBoxConfirm: {
//     "& .MuiDialog-paperWidthSm": {
//       maxWidth: "620px"
//     },
//   },

//   leftSide: {
//     width: "400px",
//     height: "100%",
//     position: "fixed",
//     padding: "0px 15px",
//     // background: "#FFFFFF",
//     boxShadow: "10px 0px 40px rgba(1, 81, 202, 0.06)",
//     borderRadius: "5px 0px 0px 5px",

//     // "& .MuiIconButton-label": {
//     //     color: "#00437E"
//     // },

//     "& .MuiTypography-h6": {
//       fontFamily: 'Poppins',
//       fontWeight: "600",
//       fontSize: "18px",
//       lineHeight: "28px",
//       color: "#0F2940",
//       paddingLeft: "10px",
//       borderBottom: "1px solid rgba(76, 92, 109, 0.1)",
//       paddingTop: "24px",
//       paddingBottom: "16px"
//     }
//   },
//   wingSelectContainer: {
//     // overflowY: "auto",
//     // overflowX: "hidden",
//     // maxHeight: "calc(750px - 244px)",
//     margin: "20px 10px 0px",
//     // paddingLeft: "50px",

//     "&::-webkit-scrollbar-track": {
//       background: "rgba(1, 81, 202, 0.06);",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       height: "10px",
//       backgroundClip: "content-box",
//       borderColor: "#0151CA",
//       borderStyle: "solid",
//       borderWidth: "1px 1px",
//       backgroundColor: "#0151CA",
//       // backgroundImage: "linear - gradient(360deg, #fff 60 %, #aaa 60 %)"
//     },
//     "&::-webkit-scrollbar": {
//       width: "8px"
//     },

//     "& .MuiTypography-h6": {
//       fontWeight: "400",
//       fontSize: "14px",
//       lineHeight: "21px",
//       color: "#00437E",
//       marginBottom: "10px"
//     },

//     // "&::-webkit-scrollbar-track": {
//     //     webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
//     //     borderRadius: "10px"
//     // },

//     // "&::-webkit-scrollbar-thumb": {
//     //     borderRadius: "10px",
//     //     webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.5)"
//     // }

//   },

//   projectCard: {
//     paddingRight: "20px",
//     background: "rgba(101, 112, 125, 0.01)",
//     border: "1px solid rgba(101, 112, 125, 0.1)",
//     borderRadius: "5px"
//   },
//   wingTable: {
//     paddingRight: "20px"
//   },

//   wingRow: {
//     background: "#FFFFFF",
//     border: "2px solid rgba(1, 81, 202, 0.14)",
//     borderRadius: "5px",
//     margin: "0 0px 5px",
//     // height: "55px",
//     padding: "10px 0px",

//     "&.selected": {
//       borderColor: "#0151CA",
//       boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
//     }
//   },
//   roomType: {
//     "& .MuiChip-root": {
//       marginRight: "5px",
//       background: "rgba(0, 56, 192, 0.08)",
//       borderRadius: "60px",
//     },
//     "& .MuiChip-label": {
//       fontFamily: 'Noto Sans',
//       fontWeight: "600",
//       fontSize: "12px",
//       lineHeight: "20px",
//       letterSpacing: "0.02em",
//       color: "#0038C0"
//     }
//   },

//   projectCoverImgSec: {
//     position: "relative",
//     width: "100%",
//     // marginTop: "16px"
//   },
//   cover: {
//     objectFit: "cover",
//     borderRadius: "5px",
//     height: 110
//   },
//   cardContentCont: {
//     marginLeft: 15,
//     padding: "0 !important",
//     flex: "auto"
//   },
//   cardHeaderCont: {
//     padding: theme.spacing(1, 0),

//     "& .cardTitle": {
//       paddingBottom: "10px",
//       fontWeight: "600",
//       fontSize: "14px",
//       lineHeight: "22px",
//       color: "#0F2940",
//       letterSpacing: "-0.02em"
//     },

//     "& .MuiChip-outlined": {
//       background: "#EEF4FB",
//       border: "1px solid #0038C0",
//       fontWeight: "600",
//       fontSize: "12px",
//       alignItems: "center",
//       color: "#00437E"
//     }
//   },


//   // Floor css

//   roomConditionList: {
//     "& .MuiListItem-gutters": {
//       paddingLeft: "0px"
//     },
//     "& .MuiListItem-gutters .MuiTypography-displayBlock, .MuiTypography-subtitle1": {
//       color: "#65707D",
//       fontFamily: 'Noto Sans',
//       fontWeight: "400",
//       fontSize: "12px",
//       lineHeight: "18px"
//     },
//     "& .asterisk": {
//       color: "#f93d5c"
//     },
//     "& .notEligibleTxt, .bookedTxt, .inProgressTxt, .availableTxt": {
//       width: "18px",
//       height: "18px",
//       // box- sizing: border- box;
//       borderRadius: "4px",
//       marginRight: "8px",
//       background: "#65707d",
//     },

//   },
//   alertBox: {
//     margin: "16px 0px"
//   },

//   flatSelectionContainer: {
//     "&:nth-child(2)": {
//       backgroundColor: "Lightgreen"
//     },

//     padding: "10px 16px",
//     "& .MuiButton-outlined": {
//       minWidth: "44px"
//     },
//     "& .MuiButton-root": {
//       fontWeight: "400",
//       fontSize: "15px",
//       lineHeight: "24px",
//       letterSpacing: "0.09em",
//       color: "#0F2940",
//       width: "60px",
//       height: "32px"
//     },
//     "& .MuiTypography-displayBlock": {
//       color: "#0F2940",
//       textTransform: "capitalize",
//       fontWeight: "600",
//       fontSize: "14px",
//       lineHeight: "20px",
//     },
//     // "& img": {
//     //     marginLeft: "12px"
//     // }
//   },
//   flatNoDiv: {
//     position: "relative",

//     "& .MuiSvgIcon-root": {
//       zIndex: "1",
//       position: "absolute",
//       right: "-16px",
//       top: "-8px",
//       fill: "#fff",
//       background: "#FA3D5D",
//       borderRadius: "50%",
//       height: "18px",
//       width: "18px",
//       cursor: "pointer"
//     }
//   },

//   dataContainer: {
//     padding: theme.spacing(2),
//     [theme.breakpoints.down("sm")]: {
//       padding: theme.spacing(2)
//     }
//   },
//   dataValueViewBox: {
//     marginLeft: theme.spacing(0.5),
//     padding: "8px 0"
//   },
//   dataValueView: {
//     marginLeft: theme.spacing(0.5),
//     padding: "5px 0"
//   },
//   scaleIconView: {
//     fontSize: "2rem"
//   },
//   dataTitle: {
//     color: "#65707D",
//     // fontWeight: 600,
//     fontSize: "0.8rem"
//   },
//   dataValue: {
//     color: "#00437E",
//     fontWeight: "700",
//     fontSize: "12px",
//     lineHeight: "24px"
//   },

//   filterInputCtrl: {
//     borderRight: "1px solid #ddd",
//     position: "relative",
//     padding: theme.spacing(1.5, 3.8),
//     boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
//     borderRadius: "40px",
//     marginRight: "12px",
//     [theme.breakpoints.down("sm")]: {
//       borderRight: 0
//     },
//     "& .MuiSelect-selectMenu": {
//       padding: 0
//     },
//     "&:focus-within": {
//       backgroundColor: "#fff",
//       boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
//       borderRadius: 40,
//       "& .MuiSelect-nativeInput": {
//         backgroundColor: "#fff"
//       }
//     },
//     "& .MuiFormLabel-root": {
//       color: "#263238",
//       fontWeight: 500,
//       fontSize: "0.8rem",
//       marginBottom: theme.spacing(1.5)
//     },
//     "& .MuiAutocomplete-input": {
//       backgroundColor: "transparent",
//       color: "#0151CA",
//       fontSize: "0.9rem",
//       border: 0,
//       outline: "none",
//       fontWeight: 600,
//       padding: 0,
//       display: "block",
//       width: "100%",
//       "&::-webkit-input-placeholder": {
//         color: "#BBBBBB",
//         fontWeight: "normal",
//       }
//     },
//     "&.withSearch": {
//       border: 0,
//       display: "flex",
//       paddingRight: theme.spacing(1),
//       justifyContent: "space-between"
//     },

//     "& .MuiInput-root": {
//       color: "#0151CA",
//       width: "100%",
//       border: "0",
//       display: "block",
//       outline: "none",
//       fontWeight: "600",
//       fontSize: "0.9rem",
//       backgroundColor: "transparent",
//       border: "none",
//       "&.MuiInput-underline:after": {
//         display: "none"
//       },
//       "&.MuiInput-underline:before": {
//         display: "none"
//       }
//     },
//     "& .MuiSelect-icon": {
//       display: "none"
//     },

//     "& .MuiIconButton-root": {
//       margin: 0,
//       position: "absolute",
//       top: "50%",
//       right: theme.spacing(1.5),
//       transform: "translateY(-50%)",
//       // "&.priceClearBtn": {
//       //   right: 140
//       // }
//     },
//     "& .MuiSelect-nativeInput": {
//       border: 0,
//       opacity: 1,
//       "&::-webkit-input-placeholder": {
//         color: "#BBBBBB",
//         fontSize: "0.9rem",
//         fontWeight: "normal"
//       }
//     }
//   },
//   sendOtpTxt: {
//     display: "flex",
//     flexDirection: "column",
//     fontWeight: 500,
//     "& span": {
//       fontWeight: 600,
//     }
//   },

//   chipCont: {
//     whiteSpace: "pre-wrap",
//     "& .MuiChip-root": {
//       backgroundColor: "#EAF2FC",
//       color: "#0038C0",
//       fontWeight: 600,
//       fontSize: "0.8rem",
//       marginRight: theme.spacing(0.5),
//       marginBottom: theme.spacing(0.5),
//       maxWidth: 208,
//       // [theme.breakpoints.down("sm")]: {
//       //     height: "auto",
//       //     maxWidth: "70%",
//       //     padding: theme.spacing(1)
//       // },
//       // "& .MuiChip-label": {
//       //     [theme.breakpoints.down("sm")]: {
//       //         whiteSpace: "initial",
//       //         whiteSpace: "nowrap",
//       //         overflow: "hidden",
//       //         textOverflow: "ellipsis"
//       //     }
//       // }
//     }
//   },

//   // NEW CSS

//   towerCard: {
//     // marginBottom: "20px",
//     "& .title": {
//       fontWeight: "600",
//       fontSize: "16px",
//       lineHeight: "28px",
//       color: "#0F2940"
//     },
//     "& .cardContent": {
//       minWidth: "175px",
//       height: "75px",
//       background: "#FFFFFF",
//       border: "1px solid #EDEFF0",
//       borderRadius: "5px",
//       padding: "5px 10px",
//       cursor: "pointer",

//       "&.active": {
//         background: "#F4F8FD",
//         border: "2px solid #0151CA",
//         color: "#0151CA"
//       }
//     },

//     "& .towerLabel": {
//       fontWeight: "600",
//       fontSize: "0.8rem",
//       lineHeight: "22px",
//       marginBottom: "2px"
//     },

//     "& .roomTypeLabel": {
//       paddingLeft: "6px",
//       fontWeight: "500",
//       fontSize: "0.8rem",
//       lineHeight: "16px",
//       color: "#4C5C6D"
//     },

//     "& .unitsLabel": {
//       fontWeight: "500",
//       fontSize: "0.8rem",
//       lineHeight: "16px",
//       color: "#00437E"
//     }
//   },

//   buildingFloorMap: {
//     paddingTop: "10px",
//     height: "350px",
//     //overflow: "auto",

//     "& .title": {
//       fontWeight: "600",
//       fontSize: "16px",
//       lineHeight: "28px",
//       color: "#0F2940"
//     },
//     "& .subTitle": {

//       fontWeight: "400",
//       fontSize: "0.75",
//       lineHeight: "18px",
//       color: "#65707D"
//     },
//     "&::-webkit-scrollbar-track": {
//       background: "rgba(7, 42, 200, 0.1)",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       background: "linear-gradient(180deg, #0038C0 0%, #006FD5 100%)",
//     },
//   },

//   statusIndicator: {
//     height: "50px",
//     background: "#FFFFFF",
//     border: "1px solid rgba(76, 92, 109, 0.1)",
//     borderRadius: "5px",
//     padding: "0px 16px",
//     marginTop: "15px",

//     "& .MuiTypography-body1": {
//       fontWeight: "400",
//       fontSize: "12px",
//       lineHeight: "18px",
//       color: "#0F2940"
//     },

//     "& .notEligibleTxt, .bookedTxt, .inProgressTxt, .availableTxt": {
//       width: "18px",
//       height: "18px",
//       // box- sizing: border- box;
//       borderRadius: "2px",
//       marginRight: "8px",
//       // background: "#65707d",
//     },
//     "& .chooseTxt": {
//       color: "#0F2940",
//       fontSize: "16px",
//       fontWeight: "600",
//       margin: "0px"
//     }

//   },
//   flatNotEligible: {
//     // color: "#2d2d2e !important",
//     // border: "1px dashed #e651008c !important",
//     // background: "#fb8c0087",
//     color: "#B8BDC3 !important",
//     border: "1px solid #B8BDC3",
//     background: "#e0e0e0",
//     // background: `url(${notEligibleIcon}),  #f5f7f8`,
//     // backgroundRepeat: "no-repeat",
//     // backgroundSize: "contain",
//     // backgroundPosition: "center",
//   },


//   flatBookedLabel: {
//     background: "#e0e0e0",
//     border: "1px solid rgba(15, 41, 64, 0.4) !important",
//     // border: "2px dashed #e651008c !important",
//     // background: "#fb8c0087"
//   },
//   flatSelectedLabel: {
//     background: "#0DC143",
//   },


//   flatBooked: {
//     background: "#e0e0e0",
//     border: "1px solid #B8BDC3 !important",
//     color: "rgba(101, 112, 125, 0.3) !important",
//     fontWeight: "700!important"
//     // color: "#2d2d2e !important",
//     // border: "1px dashed #e651008c !important",
//     // background: "#fb8c0087",
//   },

//   selectedFlat: {
//     background: "#0DC143 !important",
//     fontWeight: "700 !important",
//     color: "#ffffff !important",

//     "&.MuiButton-root:hover": {
//       backgroundColor: "#067937!important"
//     }
//   },

//   availableFlat: {
//     background: "#ffffff",
//     border: "2px solid #0DC143 !important",
//     color: "#0DC143",
//     boxShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)",
//     "&.MuiButton-root:hover": {
//       backgroundColor: "#0DC143!important",
//       color: "#ffffff",
//     }
//   },

//   inProgressLabel: {
//     border: "1px solid #FF9800",
//     background: "#fb8c0069",
//     // color: "rgb(237, 108, 2)!important",
//     // background: `url(${MaskLinesIcon}),  #f5f7f8`,
//     // backgroundSize: "cover"
//   },

//   inProgressFlat: {
//     // background: `url(${MaskLinesIcon}),  #f5f7f8`,
//     border: "1px solid #dc8606 !important",
//     color: "#EF6C00 !important",
//     background: "#fb8c0033",
//     fontWeight: "700!important"
//   },

//   flatAvailable: {
//     background: "#FEFEFE",
//     border: "2px solid #0DC143"
//   },
//   avlFlatLabel: {
//     border: "1px solid #318b31",
//     borderRadius: 50,
//     padding: "0 5px",
//     fontWeight: 700,
//     color: "#318b31",
//     fontSize: 14,
//     background: "#94e59457"
//   },

//   noTowerBanner: {
//     position: "relative",
//     // width: 860px;
//     height: "260px",

//     "& .bannerContent": {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       textAlign: "center",

//       "& .title": {
//         fontWeight: "700",
//         fontSize: "1rem",
//         lineHeight: "22px",
//         textAlign: "center",
//         color: "#0F2940",
//         paddingTop: "18px"
//       },

//       "& .subTitle": {
//         fontWeight: "400",
//         fontSize: "0.75rem",
//         lineHeight: "16px",
//         textAlign: "center",
//         color: "#65707D"
//       }
//     }
//   },

//   formSelectContainer: {
//     display: "flex",
//     "& .MuiFormControl-fullWidth": {
//       height: "80%"
//     },

//     "& .selectedFlatDiv": {
//       marginTop: "28px",
//       maxHeight: "70px",
//       border: "2px solid #0151CA",
//       background: "#FAFAFD",
//       borderRadius: "4px"
//     },

//     "& .unitPanDiv": {
//       position: "relative",
//       width: "260px",
//       height: "115px",
//       background: "#FAFAFD",
//       border: "1px solid rgba(101, 112, 125, 0.4)",
//       borderRadius: "4px",
//       fontWeight: "400",
//       fontSize: "12px",
//       lineHeight: "70px",
//       textAlign: "center"


//     }
//   },

//   overlayBtn: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontWeight: "600",
//     fontSize: "10px",
//     lineHeight: "15px",
//     alignItems: "center",
//     position: "absolute",
//     width: "100%",
//     height: "20px",
//     left: "calc(50 % - 166px / 2)",
//     bottom: "0px",
//     background: "rgba(0, 0, 0, 0.6)",
//     backdropFilter: "blur(6px)",
//     // borderAadius: "0px 0px 4px 4px",
//     borderBottomRightRadius: "3px",
//     borderBottomLeftRadius: "3px",
//     lineHeight: "20px",
//     color: "#fff",
//     cursor: "pointer",

//     "& img": {
//       width: "18px",
//       marginRight: "10px"
//     }
//   },
//   MuiImageListItemBarroot1: {
//     left: 0,
//     right: 0,
//     height: '48px',
//     display: 'flex',
//     position: 'absolute',
//     background: 'rgba(0, 0, 0, 0)',
//     alignItems: 'center',
//     fontFamily: "Noto Sans",
//   },
//   moreImgOverlay: {
//     display: "flex",
//     textAlign: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     fontWeight: "600",
//     fontSize: "10px",
//     lineHeight: "15px",
//     "& img": {
//       width: "18px",
//     }
//   },

//   imageBoxHover: {
//     visibility: "hidden",
//     "& .MuiImageListItemBar-title": {
//       fontSize: "0.8rem"
//     },
//   },
//   imgContainer: {
//     cursor: "pointer",
//     "&:hover $imageBoxHover": {
//       visibility: "visible"
//     }
//   },
//   owlCarouselCont: {
//     "&.owl-carousel": {
//       transform: "rotate(90deg)",
//       width: "270px",
//       marginTop: "100px",
//       "& .owl-item": {
//         paddingBottom: theme.spacing(3.5),
//         height: "fit-content",
//         width: "600px"
//       },
//       "& .item": {
//         height: "100%",
//         width: "100%",
//         transform: "rotate(-90deg)",
//       },
//       "& .owl-nav": {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "right",
//         "& button": {
//           border: "2px solid #0038C0",
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: 40,
//           height: 40,
//           margin: theme.spacing(0, 1),
//           "&.disabled": {
//             cursor: "default",
//             opacity: 0.5,
//           },
//           "& img": {
//             Width: 250
//           }
//         }
//       }
//     },
//   },
//   cardRoot: {
//     background: "#FFFFFF",
//     boxShadow: "0px 8px 20px rgba(0, 56, 192, 0.1)",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   keyPlanTxt: {
//     color: "#0F2940",
//     fontSize: "14px",
//     fontWeight: "700",
//   },
//   imgExpandCont: {
//     backgroundColor: "transparent"
//   },
//   towerSelectDropDown: {
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#0151CA",
//       borderWidth: 2
//     }
//   },
//   towerSelectDropDownLabel: {
//     color: "#0151CA",
//     fontWeight: 600,
//   },
//   projectCardCont: {
//     background: "rgba(101, 112, 125, 0.01)",
//     border: "2px solid #0151CA",
//     borderRadius: "5px",
//   },
//   closeDialogBtn: {
//     position: "relative",
//     top: "-22px",
//     left: "8px",
//   },
//   ImgTittle: {
//     margin: "5px",
//     fontWeight: "700",

//   },
//   filterBtnCon: {
//     "& .MuiButton-root": {

//     }
//   },
//   filterBtn: {
//     borderRadius: 30,
//     fontSize: 12,
//     border: "1px solid #1976d2",

//   },
//   filterCon: {
//     margin: theme.spacing(2, 3),
//   },
//   filterBadge: {
//     '& .MuiBadge-colorSecondary': {
//       color: "white"
//     }
//   },
//   flatRowCon: {
//     '&.selected': {
//       borderRadius: 8,
//       background: '#90f18b57',
//       border: '1px dashed #30a730',
//       boxShadow: '0px 6px 12px rgba(15, 41, 64, 0.06)'
//     },
//     // "&:hover": {
//     //     backgroundColor: "#f7f7f780",
//     //   },
//   },
//   flatList: {
//     visibility: "hidden"
//   }
// }));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });


// function ThreeSectionCard({ onTabChange, onClose }) {
//   const classes = eauctionStyle();
//   const dispatch = useDispatch();
//   const [id, setId] = useState("");
//   const classs = useStyles();
//   const { t } = useTranslation("ProjectDetailsPageTrans");
//   const [curImg, setCurImg] = React.useState("https://roofandfloor.thehindu.com/raf/real-estate-blog/wp-content/uploads/sites/14/2021/07/Vaastu-Tips-for-Buying-a-Plot.png");
//   const [imgCarouselPos, setImgCarouselPos] = React.useState(1);
//   const [projectSelected, setProjectSelected] = useState(null);
//   const {
//     //Project Listing Variable state
//     isFetchingProject,
//     isSuccessProject,
//     isErrorProject,
//     projectData,
//     errorMessageProject,
//   } = useSelector(EauctionSelector);
//   const FlatInfoRef = useRef(null)
//   useEffect(() => {
//     dispatch(getAuctionData());
//     // dispatch(eAuctionGenericOtp());
//   }, []);

//   const [open, setOpen] = useState(false);
//   const history = useHistory();
//   const currentDate = moment();
//   const [initialFlatInfoPosition, setInitialFlatInfoPosition] = useState(null);
//   const [showPlanImage, setshowPlanImage] = useState(false)
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };
//   const handleClose = () => {
//     setOpen(false);
//     setProjectSelected(null)
//   };
//   const handleClose2 = () => {
//     setshowPlanImage(false);
//   };
//   const [show, setShow] = useState(false)
//   const imagesData = ['https://magichousing.in/wp-content/uploads/2022/03/1596869832bptp-amstoria-plots7.jpg'
//     , 'https://roofandfloor.thehindu.com/raf/real-estate-blog/wp-content/uploads/sites/14/2021/07/Vaastu-Tips-for-Buying-a-Plot.png',
//     'https://www.buylanddholera.com/wp-content/uploads/2022/08/Commercial-plots-in-Ahmedabad.jpg',
//     'https://is1-3.housingcdn.com/01c16c28/09240b00e764955575cfc02418843709/v0/fs/residential_plot-for-sale-sector_108-Gurgaon-plot_view.jpg',
//     'https://4.imimg.com/data4/LN/HS/MY-28755596/commercial-plot-at-indore.jpg']

//   return (
//     <Box style={{ padding: "0 16px" }}>
//       {projectData.map((product) => (
//         <Card
//           className={clsx(classes.root)}
//           variant="outlined"
//           key={product.id}
//         >
//           <Grid container>
//             <Grid item md="auto" xs={12}>
//               <div className={classes.projectCoverImgSec}>
//                 {product?.eventID && (
//                   <>

//                     <CardMedia
//                       component="img"
//                       className={classes.cover}
//                       image={`${ImageEndpoint}${product.image_path}`}

//                       // image="https://img.staticmb.com/mbcontent/images/uploads/2023/2/13-plots-available-for-sale-in-Navi-Mumbai.jpg"
//                       title={product.title}
//                       referrerPolicy="no-referrer"

//                       onClick={toggleExpand}
//                     />
//                     <IconButton



//                       style={{
//                         position: 'absolute',
//                         bottom: '0px',
//                         right: '0px',
//                         zIndex: 1,
//                       }}
//                     >
//                       <ExpandImgIcon />

//                     </IconButton>

//                   </>
//                 )}
//               </div>
//             </Grid>
//             <Grid item md xs={12}>
//               <CardContent className={classes.cardContentCont}>
//                 <Box className={classes.cardHeaderCont}>
//                   <Grid container justify="space-between">
//                     <Grid
//                       container
//                       justifyContent="space-between"
//                       xs={12}
//                       md="auto"
//                     >
//                       <Typography
//                         variant="body2"
//                         className={classes.schemeNameView}
//                       >
//                         {product.eventID}
//                       </Typography>
//                       {
//                         <div className={classes.selectedChip}>
//                           <Chip label={"Active"} variant="outlined" />
//                         </div>
//                       }
//                     </Grid>
//                   </Grid>
//                 </Box>
//                 <Divider className={classes.dividerLine} />
//                 <div className={classes.dataContainer}>
//                   <Grid
//                     container
//                     spacing={1}
//                     className={classes.mainDetailCon}
//                     justify="space-between"
//                   >
//                     <Grid
//                       container
//                       xs={11}
//                       alignItems="center"
//                       justifyContent="space-between"
//                       className={classes.projectDetailsCon}
//                     >
//                       {/* <Grid item>
//                         <Grid container alignItems="center">
//                           <Grid item>
//                             <RoomTypeIcon className={classes.scaleIconView} />
//                           </Grid>
//                           <Grid item>
//                             <Box className={classes.dataValueViewBox}>
//                               <Typography className={classes.dataTitle}>
//                                 {"Location"}
//                               </Typography>
//                               <Typography className={classes.dataValue}>
//                                 {product.location || "--"}{" "}
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         </Grid>
//                       </Grid> */}
//                       <Grid item>
//                         <Grid container alignItems="center">
//                           <Grid item>
//                             <ScaleIcon className={classes.scaleIconView} />
//                           </Grid>
//                           <Grid item>
//                             <Box className={classes.dataValueViewBox}>
//                               <Typography className={classes.dataTitle}>
//                                 {"Auction For"}
//                               </Typography>
//                               <Typography className={classes.dataValue}>
//                                 {product.auctionFor || "--"}{" "}
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item>
//                         <Grid container alignItems="center">
//                           <Grid item>
//                             <UnitTypeIcon className={classes.scaleIconView} />
//                           </Grid>
//                           <Grid item>
//                             <Box className={classes.dataValueViewBox}>
//                               <Typography className={classes.dataTitle}>
//                                 {"BID Type"}
//                               </Typography>
//                               <Typography className={classes.dataValue}>
//                                 {product.type || "--"}{" "}
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item>
//                         <Grid container alignItems="center">
//                           <Grid item>
//                             <WingIcon className={classes.scaleIconView} />
//                           </Grid>
//                           <Grid item>
//                             <Box className={classes.dataValueViewBox}>
//                               <Typography className={classes.dataTitle}>
//                                 {"Registration Start Date"}
//                               </Typography>
//                               <Typography className={classes.dataValue}>
//                                 {moment(product.regStartDate).format(
//                                   "MMM DD, YYYY h:mm a"
//                                 ) || "--"}{" "}
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item>
//                         <Grid container alignItems="center">
//                           <Grid item>
//                             <FloorStepIcon className={classes.scaleIconView} />
//                           </Grid>
//                           <Grid item>
//                             <Box className={classes.dataValueViewBox}>
//                               <Typography className={classes.dataTitle}>
//                                 {"Registration End Date"}
//                               </Typography>
//                               <Typography className={classes.dataValue}>
//                                 {moment(product.regEndDate).format(
//                                   "MMM DD, YYYY h:mm a"
//                                 ) || "--"}{" "}
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                       <Grid item>
//                         <Grid container alignItems="center">
//                           <Grid item>
//                             <FloorStepIcon className={classes.scaleIconView} />
//                           </Grid>
//                           <Grid item>
//                             <Box className={classes.dataValueViewBox}>
//                               <Typography className={classes.dataTitle}>
//                                 {"Base Price "}
//                               </Typography>
//                               <Typography className={classes.dataValue}>
//                                 ₹ {product.auctionBasePrice || "--"}{" "}
//                               </Typography>
//                             </Box>
//                           </Grid>

//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </div>
//                 <div style={{ marginBottom: "5px" }}>
//                    <Grid
//                     container
//                     xs={12}
//                     md="auto"
//                     className={classes.mobileCheckboxSec}
//                   >
//                     {currentDate.isBefore(product.regEndDate)
//                       ? (
//                         <Button
//                           className={classes.selectProjBtn}
//                           variant={"contained"}
//                           color="primary"
//                           onClick={() => {
//                             setOpen(true);
//                             setProjectSelected(product)
//                           }}
//                         >
//                           {"View Detail"}
//                         </Button>
//                       ) : (
//                         <Button
//                           className={classes.selectProjBtn}
//                           variant="contained"
//                           color="primary"
//                           disabled
//                         // onClick={() => {
//                         //    history.push("/make-emdproject-payment")
//                         //     localStorage.setItem('productId', product.id);
//                         //  }}
//                         >
//                           Registration End
//                         </Button>
//                       )}
//                   </Grid> 
//                   {/* :<Grid
//                     container
//                     xs={12}
//                     md="auto"
//                     className={classes.mobileCheckboxSec}
//                   >
//                     <Button
//                       className={classes.selectProjBtn}
//                       variant={"contained"}
//                       color="primary"
//                       style={{ background: "green" }}
//                     // onClick={() => {
//                     //   // history.push("/make-emdproject-payment");
//                     //   //       history.push("/apply-now")
//                     //   setOpen(true)
//                     //   localStorage.setItem("productId", product.id);
//                     // }}
//                     >
//                       Already Applied
//                     </Button>


//                   </Grid>} */}
//                 </div>
//               </CardContent>
//             </Grid>
//           </Grid>
//         </Card>
//       ))}
//       {projectSelected && <ApplyNowDialog open={open} handleClose={handleClose} projectData={projectSelected} />}
//       {/* <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth={true} maxWidth="lg" className={classs.modelBoxContainer}>
//         <IconButton
//           edge="end"
//           color="red"
//           onClick={handleClose}
//           aria-label="close"
//           style={{ position: 'absolute', top: 0, right: 10 }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent >
//           <Box className={classs.selectWingContainer}>
//             <Grid container direction="row" justifyContent="space-between">
//               <Grid item sm={4}>
//                 <Box className={classs.leftSide}>
//                   <Grid container direction="column" columnSpacing={4}>
//                     <Grid container alignItems="center" justifyContent="center" >

//                       <><Grid className={classs.ImgTittle} item xs={12}>
//                         {'Plot View'}
//                       </Grid>
//                         <Grid container alignItems="center" justifyContent="center" xs={12}>
//                           <ImageList sx={{ width: 325, height: 230 }} cols={1} rowHeight={230}>
//                             <ImageListItem className={classs.imgContainer} onClick={() => { setshowPlanImage(true) }} >
//                               <img
//                                 style={{
//                                   border: "1px solid rgba(101, 112, 125, 0.4)",
//                                   borderRadius: "10px", width: "325px", height: "230px",
//                                   objectFit: "cover"
//                                 }}
//                                 src={Talojaplotview}
//                                 srcSet={Talojaplotview}
//                                 //src={'https://roofandfloor.thehindu.com/raf/real-estate-blog/wp-content/uploads/sites/14/2021/07/Vaastu-Tips-for-Buying-a-Plot.png'}
//                                 // srcSet={'https://roofandfloor.thehindu.com/raf/real-estate-blog/wp-content/uploads/sites/14/2021/07/Vaastu-Tips-for-Buying-a-Plot.png'}
//                                 alt={"img"}
//                                 loading="lazy"
//                               />
//                               <ImageListItemBar
//                                 title={'Click To View Plot View'}
//                                 sx={{
//                                   background:
//                                     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
//                                     'rgba(0,0,0,0.3) 70%, rgba(0,0,selectedUnit?.FrdId 0,0) 100%)',
//                                 }}
//                                 actionIcon={
//                                   <IconButton>
//                                     <ExpandImgIcon />
//                                   </IconButton>
//                                 }
//                                 position="bottom"
//                                 style={{ height: "50px" }}
//                                 className={classs.imageBoxHover}
//                               />

//                             </ImageListItem> : <></>
//                           </ImageList>
//                         </Grid></>
//                       <><Grid item xs={12} className={classs.ImgTittle}>
//                         {'Help Video for E-auction'} &nbsp;&nbsp;<span style={{ color: "red", fontSize: "12px", background: "yellow", float: "right" }}></span>
//                       </Grid>
//                         <Grid Grid container alignItems="center" justifyContent="center" xs={12}>
//                           <iframe
//                             title="Video Player"
//                             width="325"
//                             height="230"
//                             src="https://www.youtube.com/embed/p3csw03IgpU"
//                             border="0"
//                             allowFullScreen
//                           ></iframe>
//                         </Grid></>

//                     </Grid>
//                     <Grid ref={FlatInfoRef}>
//                       <Motion
//                         defaultStyle={initialFlatInfoPosition}
//                         style={{ x: spring(0), y: spring(0) }}
//                       >
//                         {(style) => (
//                           <div
//                             className="card"
//                             style={{
//                               transition: 'transform 0.1s ease-in-out',
//                               transform: `translate3d(${style.x}px, ${style.y}px, 0)`,
//                             }}
//                           >
//                           </div>
//                         )}
//                       </Motion>

//                     </Grid>
//                   </Grid></Box>

//               </Grid>
//               <Grid item sm={8}>
//                 <Box className={classs.buildingFloorMap}>
//                   <Grid container>
//                     <Grid item xs={12}>
//                       <Box className={classs.flatSelectionContainer}>
//                         <Grid
//                           container
//                           spacing={1}
//                           className={classes.mainDetailCon}
//                           justify="space-between"
//                         >
//                           <Grid container xs={11} alignItems="center" justifyContent="space-between" className={classes.projectDetailss}>
//                             <Grid item xs={8}>
//                               <Grid container alignItems="center">
//                                 <Grid item>
//                                   <AreaIcon className={classes.scaleIconView} />
//                                 </Grid>
//                                 <Grid item>
//                                   <Box className={classes.dataValueViewBox}>

//                                     <Typography component='span' className={classes.dataTitle}>
//                                       {"Area"}
//                                     </Typography>

//                                   </Box>
//                                 </Grid>

//                               </Grid>
//                               <Grid item>
//                                 <Typography component='span' className={classes.dataValue}>
//                                   {" "}{" "}{"Plot area 1089 sq.ft" || "--"}{" "}
//                                 </Typography>
//                                 <Typography className={classes.dataTitle}>{" "}{" "}{" (101.17 sq.m.)" || "--"}{" "}</Typography>
//                                 <Typography className={classes.dataValue}>l x b : 34.00 ft.(10.36 mt.) x 32.00 ft.(9.75 mt.)</Typography>
//                               </Grid>
//                             </Grid>
//                             <Grid item xs={4}>
//                               <Grid container alignItems="center">
//                                 <Grid item>
//                                   <PriceIcon className={classes.scaleIconView} />
//                                 </Grid>
//                                 <Grid item>

//                                   <Box className={classes.dataValueViewBox}>
//                                     <Typography component='span' className={classes.dataTitle}>
//                                       {"Base Price"}
//                                     </Typography>
//                                   </Box>
//                                 </Grid>

//                               </Grid>

//                               <Grid item>
//                                 <Typography className={classes.dataValue}>
//                                   {" "}{" ₹"}{" 3.5 Lac+ Govt Charges & Tax" || "--"}{" "}
//                                 </Typography>
//                                 <Typography className={classes.dataTitle}>@ 321 per sq.ft.</Typography>
//                               </Grid>
//                             </Grid>
//                           </Grid>

//                           <Grid container xs={11} alignItems="center" justifyContent="space-between" className={classes.projectDetailss}>

//                             <Grid item xs={8}>
//                               <Grid container alignItems="center">
//                                 <Grid item>
//                                   <AddressIcon className={classes.scaleIconView} />
//                                 </Grid>
//                                 <Grid item>
//                                   <Box className={classes.dataValueViewBox}>

//                                     <Typography component='div' className={classes.dataTitle}>
//                                       {"Address"}
//                                     </Typography>

//                                   </Box>
//                                 </Grid>

//                               </Grid>
//                               <Grid item>
//                                 <Typography component='div' className={classes.dataValue}>
//                                   {" "}{" "}{"Taloja, Navi Mumbai" || "--"}{" "}
//                                 </Typography>

//                               </Grid>
//                             </Grid>
//                             <Grid item xs={4}>
//                               <Grid container alignItems="center">
//                                 <Grid item>
//                                   <CompassIcon className={classes.scaleIconView} />

//                                 </Grid>
//                                 <Grid item>

//                                   <Box className={classes.dataValueViewBox}>
//                                     <Typography className={classes.dataTitle}>
//                                       {" Facing"}
//                                     </Typography>
//                                   </Box>
//                                 </Grid>

//                               </Grid>
//                               <Grid item>
//                                 <Typography className={classes.dataValue}>
//                                   {" "}{" "}{"East" || "--"}{" "}
//                                 </Typography>

//                               </Grid>
//                             </Grid>
//                           </Grid>
//                           <Grid container xs={11} alignItems="center" justifyContent="space-between" className={classes.projectDetailss}>

//                             <Grid item xs={8}>
//                               <Grid container alignItems="center">
//                                 <Grid item>
//                                   <PlotSidesIcon className={classes.scaleIconView} />
//                                 </Grid>
//                                 <Grid item>
//                                   <Box className={classes.dataValueViewBox}>

//                                     <Typography component='div' className={classes.dataTitle}>
//                                       {"No Of Open Sides"}
//                                     </Typography>

//                                   </Box>
//                                 </Grid>

//                               </Grid>
//                               <Grid item>
//                                 <Typography component='div' className={classes.dataValue}>
//                                   {" "}{" "}{"4" || "--"}{" "}
//                                 </Typography>

//                               </Grid>
//                             </Grid>
//                             <Grid item xs={4}>
//                               <Grid container alignItems="center">
//                                 <Grid item>
//                                   <RoadIcon className={classes.scaleIconView} />

//                                 </Grid>
//                                 <Grid item>

//                                   <Box className={classes.dataValueViewBox}>
//                                     <Typography className={classes.dataTitle}>
//                                       {" Width of facing road"}
//                                     </Typography>
//                                   </Box>
//                                 </Grid>

//                               </Grid>
//                               <Grid item>
//                                 <Typography className={classes.dataValue}>
//                                   {" "}{" "}{"17.0 Feet" || "--"}{" "}
//                                 </Typography>

//                               </Grid>
//                             </Grid>
//                           </Grid>
//                           <Grid container xs={11}
//                             alignItems="center"
//                             justifyContent="space-between"
//                             className={classes.projectDetailss}
//                           >
//                             <Grid item>
//                               <Grid container alignItems="center">
//                                 <Grid item>
//                                   <DescriptionIcon className={classes.scaleIconView} />
//                                 </Grid>
//                                 <Grid item>
//                                   <Box className={classes.dataValueViewBox}>
//                                     <Typography className={classes.dataTitle}>
//                                       {"Description"}
//                                     </Typography>

//                                   </Box>
//                                 </Grid>
//                                 <Grid
//                                   item>
//                                   <Typography className={classes.dataValue}>
//                                     {"Open plots non agricultural land East side facing Nearby: Taloja railway station, navi mumbai airport, mthl sealink, mmc (Virar - Alibag multimodal corridor) Most desirable plots under nmai (Navi mumbai airport influence) zone." || "--"}{" "}
//                                   </Typography>
//                                 </Grid>
//                               </Grid>
//                             </Grid>






//                           </Grid>


//                         </Grid>


//                       </Box>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Grid>
//             </Grid>

//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Grid container justifyContent="flex-end" alignItems="end">

//             <Button type="button" variant="contained" color="primary" autoFocus onClick={() => {
//               //  history.push("/make-emdproject-payment")
//               history.push('/apply-now')
//               //  localStorage.setItem('productId', product.id);
//             }}
//             >
//               {"Select Project"}
//             </Button>




//           </Grid>



//         </DialogActions>

//       </Dialog> */}
//     </Box>
//   );
// }

// function ApplicationCard() {
//   return (
//     <Box
//     // sx={{
//     //   backgroundColor: "white",
//     //   padding: 5,
//     //   margin: 25,
//     //   borderRadius: 10,
//     // }}
//     >
//       {/* <FormTitleBox
//         title={"Select Your Project"}
//         backUrl={"/dashboard"}
//         titleIcon={<UploadDocsTitleIcon fontSize="large" />}
//       /> */}

//       <ThreeSectionCard />
//     </Box>
//   );
// }

// export default ApplicationCard;
