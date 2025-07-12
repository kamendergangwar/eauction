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
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";

import { styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EauctionSelector,
  clearEauctionProjectData,
} from "../../../../redux/features/eauction/eauctionSlice";
import {
  getAuctionData,
  getAppliedProjectData,
} from "../../../../redux/features/eauction/eauctionSlice";

import moment from "moment";
import { eauctionStyle } from "../eauctionStyle.style";
import BiddingDetail from "../BiddingDetail/BiddingDetail";
import { useTranslation } from "react-i18next";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import {
  FloorStepIcon,
  RoomTypeIcon,
  ScaleIcon,
  UnitTypeIcon,
  UploadDocsTitleIcon,
  WingIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import clsx from "clsx";

const StyledButton = styled(Button)({
  variant: "contained",
  color: "primary",
  background: "#0038C0",

  marginTop: 5,
  //marginRight: "15px",
});

const AppliedProject = ({ onTabChange }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("ProfilePageTrans");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const history = useHistory();
  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const {
    //MyProject Listing Variable state
    isFetchingMyProject,
    isSuccessMyProject,
    isErrorMyProject,
    myprojectData,
    errorMessageMyProject,
  } = useSelector(EauctionSelector);
  console.log(myprojectData);
  const classes = eauctionStyle();
  const [livebid, setLiveBid] = useState([]);
  let liveBids = [];

  const currentDate = moment();

  // const liveBids = myprojectData?.filter((product) => {
  //   const bidStartDate = moment(product.eauctionStartDate);
  //   const bidEndDate = moment(product.eauctionEndDate);
  //   return currentDate.isBetween(bidStartDate, bidEndDate) || currentDate.isSame(bidStartDate);
  // });

  useEffect(() => {
    dispatch(getAppliedProjectData())
  }, [])

  useEffect(() => {
    if (Array.isArray(myprojectData) && isSuccessMyProject) {
      liveBids = myprojectData.filter((product) => {
        const bidStartDate = moment(product.eauctionStartDate);
        const bidEndDate = moment(product.eauctionEndDate);
        return (
          currentDate.isBetween(bidStartDate, bidEndDate) ||
          currentDate.isSame(bidStartDate)
        );
      });
      setLiveBid(liveBids);
    } else {
      console.error("myprojectData is not an array.");
    }
  }, [myprojectData, isSuccessMyProject]);

  const upcomingBids = myprojectData.filter((product) => {
    const bidStartDate = moment(product.eauctionStartDate);
    return currentDate.isBefore(bidStartDate);
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/select-projects");
          }}
        >
          Apply For New Project
        </StyledButton>
      </Box>
      <Box
        sx={{
          //backgroundColor: "white",

          margin: 30,
          borderRadius: 30,
        }}
      >
        {livebid.length !== 0 && (
          <Box className={classes.divider} sx={{ marginBottom: 10 }}>
            <Typography variant="h6">Live Bidding</Typography>
          </Box>
        )}
        {myprojectData.length === 0 && (
          <Box sx={{ marginBottom: 10 }}>
            <Typography variant="h6">
              No Upcoming Bid Available . Please Apply A Project{" "}
            </Typography>
          </Box>
        )}
        {livebid.map((product) => (
          <Card
            className={clsx(classes.root)}
            variant="outlined"
            key={product.id}
          >
            <Grid container>
              <Grid item md="auto" xs={12}>
                <div className={classes.projectCoverImgSec}>
                  {product?.title && (
                    <CardMedia
                      component="img"
                      className={classes.cover}
                      // image={Image}
                      //image="https://www.eauctionsindia.com/storage/propertytypes/property-default.webp"
                      image={`https://resteauctiondev.cidcohomes.com/rest-api/applicationservice/assets/aadhaar_image/${product?.image_path}`}

                      title={product.title}
                      referrerPolicy="no-referrer"
                    />
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
                          {product.title}
                        </Typography>




                        {
                          // <div className={classes.selectedChip}>
                          //   <Chip label={"Live"} variant="outlined" />
                          // </div>
                          <div className={classes.bidChip}>
                            {" "}
                            <Chip
                              label="Live"
                              variant="outlined"
                              avatar={
                                <Typography
                                  className={classes.blinkingDot}
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                  }}
                                />
                              }
                            />
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
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <ScaleIcon className={classes.scaleIconView} />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {"Type"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  {product.project_type || "--"}{" "}
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
                                  {product.bid_type || "--"}{" "}
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
                                  {"Bid Start Date"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  {moment(product.eauctionStartDate).format(
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
                              <FloorStepIcon
                                className={classes.scaleIconView}
                              />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {"Bid End Date"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  {moment(product.eauctionEndDate).format(
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
                              <FloorStepIcon
                                className={classes.scaleIconView}
                              />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {"EMD Paid"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  ₹{product.emd_amount || "--"}{" "}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                  <Box sx={{ marginBottom: 10 }} >{
                    product.project_stepper && typeof product.project_stepper === 'string' ? (
                      <Stepper className={classes.MuiStepper} alternativeLabel activeStep={product?.ActiveStepId}>
                        {JSON.parse(product.project_stepper).map((stepData, index) => (
                          <Step key={stepData.StepId}>
                            <StepLabel>{stepData.Description}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    ) : (
                      <div>No project steps available</div>
                    )
                  }
                  </Box>

                  <div style={{ marginBottom: "5px", }}>


                    

                        <Button
                          className={classes.selectProjBtn}
                          variant={"contained"}
                          color="primary"
                          onClick={() => {
                            handleOpenDialog(product);
                            localStorage.setItem("productId", product.id);
                          }}
                        >
                          Submit Bid{" "}
                        </Button>
                     
                  </div>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
        {upcomingBids.length !== 0 && (
          <Box className={classes.divider} sx={{ marginBottom: 10 }}>
            <Typography variant="h6">Upcoming Bidding</Typography>
          </Box>
        )}
        {upcomingBids.map((product) => (
          <Card
            className={clsx(classes.root)}
            variant="outlined"
            key={product.id}
          >
            <Grid container>
              <Grid item md="auto" xs={12}>
                <div className={classes.projectCoverImgSec}>
                  {product?.title && (
                    <CardMedia
                      component="img"
                      className={classes.cover}
                      // image={Image}
                      // image="https://img.staticmb.com/mbcontent/images/uploads/2023/2/13-plots-available-for-sale-in-Navi-Mumbai.jpg"
                      image={`https://resteauctiondev.cidcohomes.com/rest-api/applicationservice/assets/aadhaar_image/${product?.image_path}`}

                      title={product.title}
                      referrerPolicy="no-referrer"
                    />
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
                          {product.title}
                        </Typography>
                        {
                          <div className={classes.selectedChip}>
                            <Chip label={"Upcoming"} variant="outlined" />
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
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center">
                            <Grid item>
                              <ScaleIcon className={classes.scaleIconView} />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {"Type"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  {product.project_type || "--"}{" "}
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
                                  {product.bid_type || "--"}{" "}
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
                                  {"Bid Start Date"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  {moment(product.eauctionStartDate).format(
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
                              <FloorStepIcon
                                className={classes.scaleIconView}
                              />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {"Bid End Date"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  {moment(product.eauctionEndDate).format(
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
                              <FloorStepIcon
                                className={classes.scaleIconView}
                              />
                            </Grid>
                            <Grid item>
                              <Box className={classes.dataValueViewBox}>
                                <Typography className={classes.dataTitle}>
                                  {"EMD Paid"}
                                </Typography>
                                <Typography className={classes.dataValue}>
                                  ₹{product.emd_amount || "--"}{" "}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                  <Box sx={{ marginBottom: 10 }} >{
                    product.project_stepper && typeof product.project_stepper === 'string' ? (
                      <Stepper className={classes.MuiStepper} alternativeLabel activeStep={product?.ActiveStepId}>
                        {JSON.parse(product.project_stepper).map((stepData, index) => (
                          <Step key={stepData.StepId}>
                            <StepLabel>{stepData.Description}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    ) : (
                      <div>No project steps available</div>
                    )
                  }
                  </Box>
                  <Grid container xs={12} md="auto" className={classes.mobileCheckboxSec}>
                    {product?.ActiveStepId !== '6' ?
                      <Button className={classes.selectProjBtn}
                        variant={"contained"}
                        color="primary" onClick={() => {
                          //  history.push("/make-emdproject-payment")
                          history.push('/apply-now')
                          localStorage.setItem('productId', product.id);
                        }}
                      >
                        {"Continue..."}
                      </Button> : product?.ActiveStepId === '6' ?
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
                          Wait For Bid to Open
                        </Button>
                        : ""}


                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>

        ))

        }
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>
            <FormTitleBox
              title={`Submit Bid for ${selectedProject?.title}`}
              titleIcon={<UploadDocsTitleIcon fontSize="large" />}
            />
          </DialogTitle>
          <DialogContent>
            <BiddingDetail />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AppliedProject;
