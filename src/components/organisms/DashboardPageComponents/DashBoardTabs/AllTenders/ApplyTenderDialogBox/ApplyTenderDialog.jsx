import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Slide,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState } from "react";
import imageGallery from "../../../../../../assets/imageGallery.png";
import { ApiEndPoint, ImageEndpoint } from "../../../../../../utils/Common";
import DataTableBox from "../../../../../atoms/DataTableBox/DataTableBox";
import ImageMagnifyContainer from "../../../../../atoms/ImageMagnifyContainer/ImageMagnifyContainer";
import Loading from "../../../../../atoms/Loading/Loading";
import ProjectFiltersDialogBox from "../../../../../molecules/DialogBoxes/ProjectFiltersDialogBox/ProjectFiltersDialogBox";
import SetFlatPerferenceDialogBox from "../../../../../molecules/DialogBoxes/SetFlatPreferenceDialogBox/SeltFlatPreferenceDialogBox";
import shop from "../../../../../../assets/image_mapping/shopslayout.jpg";
import isometricview from "../../../../../../assets/isometricview.jpg";
import actualpic from '../../../../../../assets/actualpic.png';
import FlatImagesViewBox from "../../../../../molecules/DialogBoxes/SetFlatPreferenceDialogBox/FlatImagesViewBox/FlatImagesViewBox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RoomIcon from "@material-ui/icons/Room";
import {
  ScaleIcon,
  NonCheckOutlinedIcon,
  CheckedOutlinedIcon,
  AmenitiesMoreMenuIcon,
  DeleteIcon,
  WingIcon,
  UnitTypeIcon,
  RupeePriceIcon,
  FloorStepIcon,
  RoomTypeIcon,
  ExpandImgIcon,
  MoreImagesIcon,
  DownloadPrimaryIcon,
} from "../../../../../atoms/SvgIcons/SvgIcons";
const useStyles = makeStyles((theme) => ({
  modelBoxContainer: {
    // minHeight: '75vh',
    // maxHeight: '90vh',
    // height: "600px",
    "& .MuiDialog-paperWidthLg": {
      minHeight: "90vh",
      // maxWidth: "1050px"
    },
    cardFooter: {
      padding: theme.spacing(2, 0),
    },
  },
  imgContainer: {
    cursor: "pointer",
    "&:hover $imageBoxHover": {
      visibility: "visible",
    },
  },
  title: {
    color: "#fff",
    fontSize: 10,
    fontWeight: 600,
    marginTop: 20,
  },
  titleBar: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 47%, rgba(0,0,0,0) 100%)",
  },
  leftSide: {
    // width: "400px",
    height: "100%",
    position: "fixed",
    // padding: "0px 15px",
    // background: "#FFFFFF",
    boxShadow: "10px 0px 40px rgba(1, 81, 202, 0.06)",
    borderRadius: "5px 0px 0px 5px",

    // "& .MuiIconButton-label": {
    //     color: "#00437E"
    // },

    "& .MuiTypography-h6": {
      fontFamily: "Poppins",
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0F2940",
      // paddingLeft: "10px",
      // borderBottom: "1px solid rgba(76, 92, 109, 0.1)",
      // paddingTop: "24px",
      // paddingBottom: "16px"
    },
  },
  coverImg: {
    border: "1px solid grey",
    borderRadius: 5,
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
    },
  },
  overlayBtn: {
    position: "relative",
    width: 281,
    top: "-33px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "10px",
    height: "32px",
    bottom: "0px",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(6px)",
    borderBottomRightRadius: "3px",
    borderBottomLeftRadius: "3px",
    lineHeight: "20px",
    color: "#fff",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      top: 100,
    },

    "& img": {
      width: "18px",
      marginRight: "10px",
    },
  },
  cardContentCont: {
    // marginLeft: 15,
    padding: "0 !important",
    flex: "auto",
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
      letterSpacing: "-0.02em",
    },

    "& .MuiChip-outlined": {
      background: "#EEF4FB",
      border: "1px solid #0038C0",
      fontWeight: "600",
      fontSize: "12px",
      alignItems: "center",
      color: "#00437E",
    },
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
    },
  },
  dataTitle: {
    color: "#65707D",
    // fontWeight: 600,
    fontSize: "0.8rem",
  },
  dataValue: {
    color: "#00437E",
    fontWeight: "700",
    fontSize: "12px",
    lineHeight: "24px",
  },

  detailBox: {
    // borderRadius: 8,
    background: "#F9F9F9",
    borderLeft: "2px solid darkgrey",
    paddingLeft: "5px",
  },
  boxTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    padding: 5,
  },
  boxSubTitle: {
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: 2,
    paddingTop: "5px",
  },
  projectCardCont: {
    margin: theme.spacing(2, 1),
    background: "rgba(101, 112, 125, 0.01)",
    border: "2px solid #0151CA",
    borderRadius: "5px",
  },
  cover: {
    objectFit: "cover",
    borderRadius: "5px",
    height: 110,
  },
  DataTableBox: {
    padding: 2,

    "& .infoLabel": {
      color: "#65707D",
      fontWeight: "300",
      fontSize: "0.75rem",
      lineHeight: "24px",
    },

    "& .infoValue": {
      color: "#0F2940",
      fontWeight: "500",
      fontSize: "0.875rem",
    },
  },
  imageBoxHover: {
    visibility: "hidden",
    "& .MuiImageListItemBar-title": {
      fontSize: "0.8rem",
    },
  },
  gridbutton: {
    display: "contents",
    alignContent: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const numberWithCommas = (amount_val) => {
  return isNaN(amount_val)
    ? "0"
    : amount_val.toString().split(".")[0].length > 3
      ? amount_val
        .toString()
        .substring(0, amount_val.toString().split(".")[0].length - 3)
        .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      "," +
      amount_val
        .toString()
        .substring(amount_val.toString().split(".")[0].length - 3)
      : amount_val.toString();
};

const ApplyNowDialog = (props) => {
  const { open, handleClose, projectData, isBottomAction = true } = props;
  const [showDetails, setShowDetails] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [showPlanImage, setshowPlanImage] = useState(false);
  const [curImg, setCurImg] = useState(`${ImageEndpoint + "Vashitruck.jpg"}`);
  const [imgCarouselPos, setImgCarouselPos] = useState(1);
  const [startTab, setstartTab] = useState(0);
  const [downloadLoading, setdownloadLoading] = useState(false);
  const imagesData = [
    `${ImageEndpoint + "Vashitruck.jpg"}`,
    `${ImageEndpoint + "Khargharproject.jpg"}`,
    // 'https://www.buylanddholera.com/wp-content/uploads/2022/08/Commercial-plots-in-Ahmedabad.jpg',
    // 'https://is1-3.housingcdn.com/01c16c28/09240b00e764955575cfc02418843709/v0/fs/residential_plot-for-sale-sector_108-Gurgaon-plot_view.jpg',
    // 'https://4.imimg.com/data4/LN/HS/MY-28755596/commercial-plot-at-indore.jpg'
  ];
  console.log(projectData, "sdsdsdsdsdsk");
  const onCloseShowDetail = () => {
    setShowDetails(false);
  };
  const [shopsMap, setShopsMap] = useState({
    name: "Sector_Image",
    main_image: `${ImageEndpoint}${projectData.image_path}`,
    mapLocation:
      "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d544.3670427136855!2d73.05855937814914!3d19.024004397884994!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1702287963653!5m2!1sen!2sin",
    areas: [
      {
        id: "1",
        name: ` ${projectData?.eventID}`,
        coords: [473, 16, 590, 16, 592, 106, 471, 106],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        shape: "poly",
        position: ["473.5px", "13px"],
        tooltipPos: ["482.5px", "40px"],
        href: "#",
        image: `${ImageEndpoint}${projectData.image_path}`,
        shop_area: ` ${projectData?.area}`,
        base_price: ` ${projectData?.auctionBasePrice}`,
        emd: ` ${projectData?.emdFee}`,
        auctionIncrementValue: ` ${projectData?.auctionIncrementValue}`,
       // areaMultipleArea: "5.350 x 4.1 SQMT",
        shopNo: ` ${projectData?.shopNo}`,
        tenderNo: ` ${projectData?.eventID}`,
        shop_tower: "EC-02",
        other_images: [
          `${ImageEndpoint}${projectData.key_image}`,
          `${ImageEndpoint}${projectData?.image_path}`,
          actualpic,
          // isometricview,
          // "https://my.matterport.com/show/?m=Wvu2SQUGRka",
        ],
      },
      
    ],
  });
  const downloadTenderPdf = () => {
    setdownloadLoading(true);
    fetch(`${ApiEndPoint}/uploads/sample_docs`, {
      //change with tender document api
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        setdownloadLoading(false);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${projectData.eventID}_document.pdf`;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 300);
      })
      .catch((error) => {
        setdownloadLoading(false);
        alert(error, "error");
      });
  };

  const handleImageHover = (image) => {
    setCurImg(image);
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="lg"
        className={classes.modelBoxContainer}
      >
        {downloadLoading && <Loading isOpen={downloadLoading} />}
        <DialogTitle>Auction Detail For {projectData?.eventID}</DialogTitle>
        <IconButton
          edge="end"
          color="red"
          onClick={handleClose}
          aria-label="close"
          style={{ position: "absolute", top: 8, right: 20 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ padding: "0px 16px" }}>
          <Grid container direction="row">
            <Grid item xs={4}>
              <Box className={classes.leftSide}>
                <Grid container direction="column" columnSpacing={4}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <Grid
                      container
                      xs={11}
                      justifyContent="space-between"
                      className={classes.projectCardCont}
                    >
                      <Grid xs={3} className={classes.projectCoverImgSec}>
                        <CardMedia
                          component="img"
                          className={classes.cover}
                          image={`${ImageEndpoint}${projectData.image_path}`}
                          // title={area.title}
                          referrerPolicy="no-referrer"
                        />
                      </Grid>
                      <Grid className={classes.cardContentCont} XS={5}>
                        <Box className={classes.cardHeaderCont}>
                          <Grid container direction="column">
                            <Typography
                              variant="body2"
                              className="cardTitle"
                              style={{ padding: 0 }}
                            >
                              {projectData.eventID}
                            </Typography>

                            <Box className={classes.chipCont}>
                              <Typography className={classes.dataTitle}>
                                {/* {t("projectCard.totalAvailUnit")} :{" "} */}
                                Tender No :
                                <span className={classes.dataValue}>
                                  {/* {projectDetails.No_Of_Units} */}
                                  {projectData.eventID}
                                </span>
                              </Typography>
                            </Box>
                            <Box className={classes.chipCont}>
                              <span className={classes.cardTitle}>
                                MahaRERA No. : P52000000960
                              </span>
                            </Box>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid
                      container
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    >
                      <Typography variant="h6" className={classes.chipCont}>
                        Category : <Chip label="General" />
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                      direction="column"
                    >
                      <Typography variant="h6" className={classes.chipCont}>
                        Location Map
                      </Typography>
                      {/* <GoogleMap
                                            name={'Taloja Shop-1'}
                                            lat={19.025680}
                                            lng={73.060012}
                                        /> */}
                      <iframe
                        className={classes.projectCardCont}
                        src={projectData.mapLocation}
                        width="93%"
                        height="90%"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="map"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid
              container
              direction="column"
              xs={5}
              style={{ height: "98%", display: "flex" }}
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={`${ImageEndpoint}${projectData?.key_image}`}
                alt="Shop Image"
                loading="lazy"
                height="85%"
                width="85%"
                className={classes.coverImg}
                style={{ objectFit: "contain" }}
              />

              <Grid
                container
                alignItems="center"
                style={{ marginTop: "5px" }}
                justifyContent="center"
                spacing={3}
              >
                <Grid
                  container
                  justifyContent="space-evenly"
                  alignItems="center"
                  xs={12}
                >
                  {/* <Grid  >View Tender Details : </Grid> */}
                  <Grid xs={6} className={classes.gridbutton}>
                    <Button
                      onClick={() => {
                        setShowDetails(true);
                      }}
                      size="small"
                      startIcon={<VisibilityIcon />}
                      variant="outlined"
                      color="primary"
                    >
                      View Details
                    </Button>
                  </Grid>
                  {/* <Grid xs={6} >
                                    Property Location :
                                    </Grid> */}
                  {/* <Grid xs={4} className={classes.gridbutton}>
                                        <Button size="small" startIcon={<RoomIcon />} variant="outlined" color='primary' onClick={() => window.open(shopsMap.mapLocation)}>
                                            View Map
                                        </Button>
                                    </Grid> */}

                  {/* <Grid xs={6} >Tender booklet :</Grid> */}
                  <Grid xs={6} className={classes.gridbutton}>
                    <Button
                      size="small"
                      onClick={() => {
                        downloadTenderPdf();
                      }}
                      startIcon={<DownloadPrimaryIcon />}
                      variant="outlined"
                      color="primary"
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              xs={3}
              item
              className={classes.detailBox}
              style={{ borderRight: "2px solid darkgrey" }}
            >
              <Grid
                container
                justifyContent="flex-start"
                style={{ borderBottom: "1px solid darkgrey" }}
              >
                <Typography className={classes.boxTitle}>
                  Schedule Dates
                </Typography>
              </Grid>
              <Grid
                container
                justifyContent="flex-start"
                style={{ backgroundColor: "gainsboro" }}
              >
                <Typography className={classes.boxSubTitle}>
                  1. Pay Document fee
                </Typography>
                <DataTableBox
                  label={"Start Date"}
                  value={projectData.eauctionDocumentStartDate}
                />
                <DataTableBox
                  label={"End Date"}
                  value={projectData.eauctionDocumentEndDate}
                />
              </Grid>
              <Grid
                container
                justifyContent="flex-start"
                style={{ backgroundColor: "white" }}
              >
                <Typography className={classes.boxSubTitle}>
                  2. Pay EMD
                </Typography>
                <DataTableBox
                  label={"Start Date"}
                  value={projectData.eauctionEmdStartDate}
                />
                <DataTableBox
                  label={"End Date"}
                  value={projectData.eauctionEmdEndDate}
                />
              </Grid>

              <Grid
                container
                justifyContent="flex-start"
                style={{ backgroundColor: "gainsboro" }}
              >
                <Typography className={classes.boxSubTitle}>
                  3. Close Bid Submit
                </Typography>
                <DataTableBox
                  label={"Start Date"}
                  value={projectData.closeBidSubmitStartDate}
                />
                <DataTableBox
                  label={"End Date"}
                  value={projectData.closeBidSubmitEndDate}
                />
              </Grid>

              <Grid
                container
                justifyContent="flex-start"
                style={{ backgroundColor: "white" }}
              >
                <Typography className={classes.boxSubTitle}>
                  4. e-Auction
                </Typography>
                <DataTableBox
                  label={"Auction Start Date"}
                  value={projectData.eauctionStartDate}
                />
                <DataTableBox
                  label={"Auction End Date"}
                  value={projectData.eauctionEndDate}
                />
              </Grid>

              <Grid
                container
                justifyContent="flex-start"
                style={{ backgroundColor: "gainsboro" }}
              >
                <Typography className={classes.boxSubTitle}>
                  5. Result Opening
                </Typography>
                <DataTableBox
                  label={"Result Date"}
                  value={projectData.eauctionResultOpenDate}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {isBottomAction && (
          <DialogActions>
            {/* {projectData.already_applied === "no" ? */}

            {/* {projectData.status === "Active" &&
              && ({projectData.already_applied == "no" &&
                (<Grid container justifyContent="flex-end" alignItems="end">
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    autoFocus
                    onClick={() => {
                      history.push("/apply-now");
                      localStorage.setItem("productId", projectData.id);
                    }}
                  >
                    {"Apply Tender"}
                  </Button>
                </Grid>)}
              )} */}
            {(projectData.status === "Active" || projectData.status === "active") && projectData.already_applied === "no" && (
              <Grid container justifyContent="flex-end" alignItems="end">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  autoFocus
                  onClick={() => {
                    history.push("/apply-now");
                    localStorage.setItem("productId", projectData.id);
                  }}
                >
                  Apply Tender
                </Button>
              </Grid>
            )
            }
            {/* : <Grid
                                container justifyContent="flex-end" alignItems="end"

                            >
                                <Button
                                    className={classes.selectProjBtn}
                                    variant={"contained"}
                                    color="primary"
                                    disabled
                                // onClick={() => {
                                //   // history.push("/make-emdproject-payment");
                                //   //       history.push("/apply-now")
                                //   setOpen(true)
                                //   localStorage.setItem("productId", product.id);
                                // }}
                                >
                                    Already Applied
                                </Button>
                            </Grid>} */}
          </DialogActions>
        )}
        <Dialog
          open={showPlanImage}
          fullScreen
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setshowPlanImage(false);
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Tabs value={0} aria-label="basic tabs example">
                <Tab label={"Shop View"} />
              </Tabs>
            </Toolbar>
          </AppBar>
          <DialogContent style={{ marginTop: "65px", overflow: "hidden" }}>
            <Grid container xs={12} style={{ width: "100%", height: "100%" }}>
              <Grid
                container
                xs={1}
                direction="row"
                justifyContent="flex-start"
              >
                <Grid item>
                  <ImageList
                    sx={{ width: 80, height: 80 }}
                    cols={1}
                    rowHeight={80}
                  >
                    {imagesData.map((item, index) => (
                      <ImageListItem
                        key={item}
                        className={classes.imgContainer}
                        style={{ cursor: "default" }}
                      >
                        <img
                          onMouseOver={() => {
                            setCurImg(item);
                            setImgCarouselPos(index);
                          }}
                          style={{
                            border:
                              imgCarouselPos == index
                                ? "3px solid #f27807"
                                : "1px solid rgba(101, 112, 125, 0.4)",
                            borderRadius: "10px",
                            width: "80px",
                            height: "80px",
                            cursor: "pointer",
                          }}
                          src={item}
                          srcSet={item}
                          alt={"img"}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Grid>
              <Grid item xs={11}>
                <ImageMagnifyContainer img={curImg} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Dialog>
      {showDetails && (
        <FlatImagesViewBox
          data={shopsMap}
          showDetails={showDetails}
          onCloseShowDetail={onCloseShowDetail}
          startTab={startTab}
        />
      )}
    </>
  );
};

export default ApplyNowDialog;
