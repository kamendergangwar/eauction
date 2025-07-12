import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Dialog,
  Box,
  DialogActions,
  Grid,
  DialogTitle,
  DialogContent,
  Paper,
  makeStyles,
  Divider,
  Chip,
  Slide,
  withStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Badge,
  InputLabel,
  Popover,
  Table,
  TableContainer,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  EauctionSelector,
  clearLiveTenderData, getLiveTenderData,
} from "../../../../../redux/features/eauction/eauctionSlice.js";
import moment from "moment";
import { Alert, Pagination } from "@material-ui/lab";
import { eauctionStyle } from "../../../E-auctionSelectProject/eauctionStyle.style.js";
import Loading from "../../../../atoms/Loading/Loading.jsx";
import { useTranslation } from "react-i18next";
import {
  ExpandImgIcon,
  FloorStepIcon,
  RoomTypeIcon,
  ScaleIcon,
  UnitTypeIcon,
  UploadDocsTitleIcon,
  WingIcon,
} from "../../../../atoms/SvgIcons/SvgIcons.jsx";
import clsx from "clsx";
import { ImageEndpoint } from "../../../../../utils/Common.js";
import ApplyNowDialog from "../AllTenders/ApplyTenderDialogBox/ApplyTenderDialog.jsx";

function LiveTenderCard({ onTabChange, onClose }) {
  const {
    //Project Listing Variable state
    isFetchingLiveTenderData,
    isSuccessLiveTenderData,
    isErrorLiveTenderData,
    liveTenderData,
    errorMessageLiveTenderData,
  } = useSelector(EauctionSelector);
  const classes = eauctionStyle();
  const dispatch = useDispatch();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const [projectSelected, setProjectSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const currentDate = moment();
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1)
  const perPage = 5;

  useEffect(() => {
    dispatch(getLiveTenderData());
    return () => {
      dispatch(clearLiveTenderData());
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("livetenderPageNo", page);
    dispatch(getLiveTenderData());
  }, [page]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
    setProjectSelected(null)
  };


  return (
    <>
      {isFetchingLiveTenderData && <Loading isOpen={isFetchingLiveTenderData} />}
      <Box style={{ padding: "0 16px" }}>
        {isErrorLiveTenderData && <Alert severity="error">{errorMessageLiveTenderData}</Alert>}
        {liveTenderData.length === 0 ? (
          <Typography variant="h5">No Live Tender Present. Wait For the Tender To Active.</Typography>
        ) : (
          liveTenderData.map((product) => (
            <Card
              className={clsx(classes.root)}
              variant="outlined"
              key={product.id}
            >
              <Grid container>
                <Grid item md="auto" xs={12}>
                  <div className={classes.projectCoverImgSec}>
                    {product?.eventID && (
                      <>

                        <CardMedia
                          component="img"
                          className={classes.cover}
                          image={`${ImageEndpoint}${product.image_path}`}

                          // image="https://img.staticmb.com/mbcontent/images/uploads/2023/2/13-plots-available-for-sale-in-Navi-Mumbai.jpg"
                          title={product.title}
                          referrerPolicy="no-referrer"

                          onClick={toggleExpand}
                        />
                        <IconButton



                          style={{
                            position: 'absolute',
                            bottom: '0px',
                            right: '0px',
                            zIndex: 1,
                          }}
                        >
                          <ExpandImgIcon />

                        </IconButton>

                      </>
                    )}
                  </div>
                </Grid>
                <Grid item md xs={12}>
                  <CardContent className={classes.cardContentCont}>
                    <Box className={classes.cardHeaderCont}>
                      <Grid container justify="space-between">
                        <Grid
                          container
                          justifyContent="space-between"
                          xs={12}
                          md="auto"
                        >
                          <Typography
                            variant="body2"
                            className={classes.schemeNameView}
                          >
                            {product.eventID}
                          </Typography>
                          {
                            <div className={classes.selectedChip}>
                              <Chip label={"Active"} variant="outlined" />
                            </div>
                          }
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider className={classes.dividerLine} />
                    <div className={classes.dataContainer}>
                      <Grid
                        container
                        spacing={1}
                        className={classes.mainDetailCon}
                        justify="space-between"
                      >
                        <Grid
                          container
                          xs={11}
                          alignItems="center"
                          justifyContent="space-between"
                          className={classes.projectDetailsCon}
                        >
                          {/* <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <RoomTypeIcon className={classes.scaleIconView} />
                          </Grid>
                          <Grid item>
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle}>
                                {"Location"}
                              </Typography>
                              <Typography className={classes.dataValue}>
                                {product.location || "--"}{" "}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid> */}
                          <Grid item>
                            <Grid container alignItems="center">
                              <Grid item>
                                <ScaleIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    {"Auction For"}
                                  </Typography>
                                  <Typography className={classes.dataValue}>
                                    {product.auctionFor || "--"}{" "}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center">
                              <Grid item>
                                <UnitTypeIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    {"BID Type"}
                                  </Typography>
                                  <Typography className={classes.dataValue}>
                                    {product.type || "--"}{" "}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center">
                              <Grid item>
                                <WingIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    {"Registration Start Date"}
                                  </Typography>
                                  <Typography className={classes.dataValue}>
                                    {moment(product.regStartDate).format(
                                      "MMM DD, YYYY h:mm a"
                                    ) || "--"}{" "}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center">
                              <Grid item>
                                <FloorStepIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    {"Registration End Date"}
                                  </Typography>
                                  <Typography className={classes.dataValue}>
                                    {moment(product.regEndDate).format(
                                      "MMM DD, YYYY h:mm a"
                                    ) || "--"}{" "}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center">
                              <Grid item>
                                <FloorStepIcon className={classes.scaleIconView} />
                              </Grid>
                              <Grid item>
                                <Box className={classes.dataValueViewBox}>
                                  <Typography className={classes.dataTitle}>
                                    {"Base Price "}
                                  </Typography>
                                  <Typography className={classes.dataValue}>
                                    ₹ {product.auctionBasePrice || "--"}{" "}
                                  </Typography>
                                </Box>
                              </Grid>

                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <Grid
                        container
                        xs={12}
                        md="auto"
                        className={classes.mobileCheckboxSec}
                      >
                        {currentDate.isBefore(product.regEndDate)
                          ? (
                            <Button
                              className={classes.selectProjBtn}
                              variant={"contained"}
                              color="primary"
                              onClick={() => {
                                setOpen(true);
                                setProjectSelected(product)
                              }}
                            >
                              {"View Detail"}
                            </Button>
                          ) : (
                            <Button
                              className={classes.selectProjBtn}
                              variant="contained"
                              color="primary"
                              disabled
                            // onClick={() => {
                            //    history.push("/make-emdproject-payment")
                            //     localStorage.setItem('productId', product.id);
                            //  }}
                            >
                              Registration End
                            </Button>
                          )}
                      </Grid>

                    </div>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          )))}
          {liveTenderData?.total > perPage && <Box width='100%' justifyContent='center' display='flex' alignItems='center' m={2}>
        <Pagination
          // count={Math.ceil(projectData?.total / perPage)}
          count={2}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary" />
      </Box>}
        {projectSelected && <ApplyNowDialog open={open} handleClose={handleClose} projectData={projectSelected} />}
      </Box>
    </>
  );
}

function LiveTender() {
  return (
    <Box>
  <LiveTenderCard />
    </Box>
  );
}

export default LiveTender;
