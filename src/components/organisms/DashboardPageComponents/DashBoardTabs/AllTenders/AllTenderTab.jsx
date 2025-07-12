import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  Grid,
  makeStyles,
  Divider,
  Chip,
  IconButton,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import clsx from "clsx";
import { useRef } from "react";
import ApplyNowDialog from "./ApplyTenderDialogBox/ApplyTenderDialog.jsx";
import { AllTenderTabStyle } from "./AllTender.style.js";
import { EauctionSelector, getAuctionData } from "../../../../../redux/features/eauction/eauctionSlice.js";
import { ImageEndpoint } from "../../../../../utils/Common.js";
import { ExpandImgIcon, FloorStepIcon, ScaleIcon, UnitTypeIcon, WingIcon } from "../../../../atoms/SvgIcons/SvgIcons.jsx";
import { Pagination } from "@material-ui/lab";
import Loading from "../../../../atoms/Loading/Loading.jsx";


function AllTendersTab({ onTabChange, onClose }) {
  const classes = AllTenderTabStyle();
  const [page, setPage] = useState(1)
  const perPage = 5;
  const dispatch = useDispatch();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const [curImg, setCurImg] = React.useState("https://roofandfloor.thehindu.com/raf/real-estate-blog/wp-content/uploads/sites/14/2021/07/Vaastu-Tips-for-Buying-a-Plot.png");
  const [imgCarouselPos, setImgCarouselPos] = React.useState(1);
  const [projectSelected, setProjectSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const currentDate = moment();
  const [expanded, setExpanded] = useState(false);
  const getChipClass = (status) => {
    switch (status) {
      case "Active":
        return classes.activeChip;
      case "Inactive":
        return classes.inactiveChip;
      case "Expired":
        return classes.expiredChip;
      default:
        return "";
    }
  };
  const {
    //Project Listing Variable state
    isFetchingProject,
    isSuccessProject,
    isErrorProject,
    projectData,
    errorMessageProject,
  } = useSelector(EauctionSelector);

  useEffect(() => {
    localStorage.setItem("allProjectsPageNo", page);
    dispatch(getAuctionData());
  }, [page]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const handleClose = () => {
    setOpen(false);
    setProjectSelected(null)
  };

  return (
    <Box style={{ padding: "0 20px" }}>
      {isFetchingProject && <Loading isOpen={isFetchingProject} />}
      {/* {Object.values(projectData).map((product) =>( */}
      {projectData?.data?.map((product) => (
        <Card
          className={clsx(classes.root)}
          variant="outlined"
          key={product.id}
        >
         <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <div className={classes.projectCoverImgSec}>
                {product?.eventID && (
                  <CardMedia
                    component="img"
                    className={classes.cover}
                    image={`${ImageEndpoint}${product.image_path}`}
                    title={product.title}
                    referrerPolicy="no-referrer"
                    onClick={toggleExpand}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
              </div>
            </Grid>
            <Grid item md={9} xs={12}>
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
                          <div className={getChipClass(product.status)}>
                         <Chip label={product.status} variant="outlined" />
                        </div>
                      }

                      {/* {
                        (() => {
                          let label;
                          if (currentDate.isBefore(product.regStartDate)) {
                            label = "Inactive";
                          } else if (
                            currentDate.isBetween(
                              product.regStartDate,
                              product.regEndDate,
                              null,
                              '[]'
                            )
                          ) {
                            label = "Active";
                          } else {
                            label = "Expired";
                          }

                          return (
                            <div className={classes.selectedChip}>
                              <Chip label={label} variant="outlined" />
                            </div>
                          );
                        })()
                      } */}


                    </Grid>
                  </Grid>
                </Box>
                <Divider className={classes.dividerLine} />
                <div className={classes.dataContainer}>
                  <Grid
                    container
                    spacing={2}
                    className={classes.mainDetailCon}
                    justify="space-between"
                  >
                    <Grid
                      container
                      xs={12}
                      alignItems="center"
                      justifyContent="space-between"
                      className={classes.projectDetailsCon}
                    >
                      <Grid item >
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
                            <UnitTypeIcon className={classes.scaleIconView} />
                          </Grid>
                          <Grid item>
                            <Box className={classes.dataValueViewBox}>
                              <Typography className={classes.dataTitle}>
                                {"Use Type"}
                              </Typography>
                              <Typography className={classes.dataValue}>
                                {product.Use_type || "--"}{" "}
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
                                {"Base Price Per SQ.MT "}
                              </Typography>
                              <Typography className={classes.dataValue}>
                                ₹ {product.auctionBasePrice || "--"}{" "}
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
                                {"Area"}
                              </Typography>
                              <Typography className={classes.dataValue}>
                                ₹ {product.area || "--"}{" "}
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
                                {"EMD Fees "}
                              </Typography>
                              <Typography className={classes.dataValue}>
                                ₹ {product.emdFee || "--"}{" "}
                              </Typography>
                            </Box>
                          </Grid>

                        </Grid>
                      </Grid>
                     
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    className={classes.mainDetailCon}
                    
                  >
                      <Grid
                      container
                      xs={12}
                      alignItems="center"
                     
                      className={classes.projectDetailsCon}
                    >
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
                    <Button
                     variant={"contained"}
                      color="primary"
                      style={{ marginRight: 8 }}
                      onClick={() => {
                        setOpen(true);
                        setProjectSelected(product)
                      }}
                    >
                      View Details
                    </Button>
                    {/* {currentDate.isBefore(product.regEndDate)
                      ? (
                        <Button
                          className={classes.selectProjBtn2}
                          variant={"contained"}
                          color="primary"
                          onClick={() => {
                            localStorage.setItem('productId', projectData.id);
                            history.push("/apply-now");
                          }}
                        >
                          {"Apply now"}
                        </Button>
                      ) : (
                        <Button
                          className={classes.selectProjBtn}
                          variant="contained"
                          color="primary"
                          disabled
                        >
                          Registration End
                        </Button>
                      )} */}
                  </Grid>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
      {projectData?.total_count?.total > perPage && <Box width='100%' justifyContent='center' display='flex' alignItems='center' m={2}>
        <Pagination
          count={Math.ceil(projectData?.total_count?.total / perPage)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary" />
      </Box>}
      {projectSelected && <ApplyNowDialog open={open} handleClose={handleClose} projectData={projectSelected} />}
    </Box>


  );
};

export default AllTendersTab;