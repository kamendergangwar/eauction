import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import ImageGallery from "react-image-gallery";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ProjectDetailsViewStyles } from "../ProjectDetailsView.styles";
import { SliderNavLeftArrow, SliderNavRightArrow, WhiteBackArrowIcon } from "../../../atoms/SvgIcons/SvgIcons";

import PrevIcon from "../../../../assets/floorPlanImgs/prevIcon.png";
import NextIcon from "../../../../assets/floorPlanImgs/nextIcon.png";

import FloorPlanImg1 from "../../../../assets/floorPlanImgs/image1.png";
import FloorPlanImg2 from "../../../../assets/floorPlanImgs/image2.png";
import FloorPlanImg3 from "../../../../assets/floorPlanImgs/image3.jpg";
import FloorPlanImg4 from "../../../../assets/floorPlanImgs/image4.jpg";

/* const AntTabs = withStyles({
  indicator: {
    backgroundColor: "#f27807",
    height: 3,
  },
})(Tabs); */

/* const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
      color: "#f27807",
      opacity: 1,
    },
    "&$selected": {
      color: "#f27807",
    },
    "&:focus": {
      color: "#f27807",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />); */

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`floorPlan-tabpanel-${index}`}
      aria-labelledby={`floorPlan-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const FloorPlansSection = (props) => {
  const { projectDetailsData, width } = props;
  const classes = ProjectDetailsViewStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [stagePaddingVal, setStagePaddingVal] = useState(100);
  const [floorImages, setFloorImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [unitImages, setUnitImages] = useState([]);

  useEffect(() => {
    if (width == "sm" || width == "xs") {
      setStagePaddingVal(0);
    } else {
      setStagePaddingVal(100);
    }
  }, [width]);

  useEffect(() => {
    if (projectDetailsData?.floorPlan?.length > 0) {
      let plan_imgs = [];
      for (let i = 0; i < projectDetailsData?.floorPlan.length; i++) {
        const element = projectDetailsData?.floorPlan[i];
        let plan_img_onj = {
          original: element,
          thumbnail: element
        };
        plan_imgs.push(plan_img_onj);
      }
      setFloorImages(plan_imgs);
    }


    if (projectDetailsData?.unitPlan?.length > 0) {
      let unit_imgs = [];
      for (let i = 0; i < projectDetailsData?.unitPlan.length; i++) {
        const element = projectDetailsData?.unitPlan[i];
        let unit_img_onj = {
          original: element,
          thumbnail: element
        };
        unit_imgs.push(unit_img_onj);
      }
      setUnitImages(unit_imgs);
    }

    if (projectDetailsData?.gallery?.length > 0) {
      let gallery_imgs = [];
      for (let i = 0; i < projectDetailsData?.gallery.length; i++) {
        const element = projectDetailsData?.gallery[i];
        let gallery_img_onj = {
          original: element,
          thumbnail: element
        };
        gallery_imgs.push(gallery_img_onj);
      }
      setGalleryImages(gallery_imgs);
    }

    if (projectDetailsData?.wingA) {
      console.log("projectDetailsData?.wingA", projectDetailsData.wingA);
      var myRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
      var text = myRegex.exec(projectDetailsData.wingA);
      console.log("text", text);
    }
  }, [projectDetailsData]);

  const handleChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <Box className={`${classes.sectionCover} floorPlans`} id="floorPlansSecId">
      <Typography variant="h2" className={`${classes.sectionTitle}`}>{t("projectDetailsPage.floorPlansSec.title")}</Typography>
      <Box className={classes.tabsView}>
        <Tabs
          vari="scrollable"
          scrollButtons="auto"
          value={selectedTabIndex}
          onChange={handleChange}
          aria-label="Floor Tabs"
          variant="scrollable"
          // scrollButtons="on"
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          <Tab label={t("projectDetailsPage.floorPlansSec.tab1")} />
          <Tab label="Unit Plan" />
          <Tab label="Key Plan" />
          {/* <Tab label={t("projectDetailsPage.floorPlansSec.tab3")} />
          <Tab label={t("projectDetailsPage.floorPlansSec.tab4")} /> */}
        </Tabs>
      </Box>

      <TabPanel value={selectedTabIndex} index={0}>
        <Box className={classes.floorPlanMapSec}>
          {floorImages.length > 0 &&
            <OwlCarousel className={classes.owlCarouselCont} margin={20} dots={false} nav={true} stagePadding={stagePaddingVal} navText={[`<img src='${PrevIcon}' />`, `<img src='${NextIcon}' />`]} responsive={{
              0: {
                items: 1
              },
              600: {
                items: 1
              },
              1000: {
                items: 2
              }
            }}>
              {floorImages.map((obj, i) => (
                <div className="item" key={i}>
                  <img src={obj.original} alt={`slide-${i}`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </OwlCarousel>
          }
          {/* <ImageGallery items={floorImages}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            useTranslate3D={false}
            renderLeftNav={(onClick, disabled) => (
              <IconButton onClick={onClick} disabled={disabled} className={`${classes.floorSliderNavBtn} left`}>
                <SliderNavLeftArrow />
              </IconButton>
            )}
            renderRightNav={(onClick, disabled) => (
              <IconButton onClick={onClick} disabled={disabled} className={classes.floorSliderNavBtn}>
                <SliderNavRightArrow />
              </IconButton>
            )}
          /> */}
        </Box>
      </TabPanel>
      <TabPanel value={selectedTabIndex} index={1}>
        <Box className={classes.floorPlanMapSec}>
          {unitImages.length > 0 &&
            <OwlCarousel className={classes.owlCarouselCont} margin={20} dots={false} nav={true} stagePadding={stagePaddingVal} navText={[`<img src='${PrevIcon}' />`, `<img src='${NextIcon}' />`]} responsive={{
              0: {
                items: 1
              },
              600: {
                items: 1
              },
              1000: {
                items: 2
              }
            }}>
              {unitImages.map((obj, i) => (
                <div className="item" key={i}>
                  <img src={obj.original} alt={`slide-${i}`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </OwlCarousel>
          }
        </Box>
      </TabPanel>
      <TabPanel value={selectedTabIndex} index={2}>
        <Box className={classes.floorPlanMapSec}>
          {galleryImages.length > 0 &&
            <OwlCarousel className={classes.owlCarouselCont} margin={20} dots={false} nav={true} stagePadding={stagePaddingVal} navText={[`<img src='${PrevIcon}' />`, `<img src='${NextIcon}' />`]} responsive={{
              0: {
                items: 1
              },
              600: {
                items: 1
              },
              1000: {
                items: 2
              }
            }}>
              {galleryImages.map((obj, i) => (
                <div className="item" key={i}>
                  <img src={obj.original} alt={`slide-${i}`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </OwlCarousel>
          }
        </Box>
      </TabPanel>
      {/* <TabPanel value={selectedTabIndex} index={3}>
        <Typography variant="h2">3Wing C - No Data</Typography>
      </TabPanel> */}

      {/* <Grid container className={classes.floorPlanTabs} spacing={3}>
        <Grid item><Button className={`${classes.floorTabBtns} active`}>Master Plan</Button></Grid>
        <Grid item><Button className={classes.floorTabBtns}>Wing A</Button></Grid>
        <Grid item><Button className={classes.floorTabBtns}>Wing B</Button></Grid>
        <Grid item><Button className={classes.floorTabBtns}>Wing C</Button></Grid>
      </Grid>
      {selectedTabIndex == "masterPlan" &&
        <Box className={classes.floorPlanMapSec}>
          <ImageGallery items={floorImages}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            useTranslate3D={false}
            renderLeftNav={(onClick, disabled) => (
              <IconButton onClick={onClick} disabled={disabled} className={`${classes.floorSliderNavBtn} left`}>
                <SliderNavLeftArrow />
              </IconButton>
            )}
            renderRightNav={(onClick, disabled) => (
              <IconButton onClick={onClick} disabled={disabled} className={classes.floorSliderNavBtn}>
                <SliderNavRightArrow />
              </IconButton>
            )}
          />
        </Box>
      }
      <Box className={classes.floorPlanMapSec}>
        <ImageGallery items={floorImages}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          useTranslate3D={false}
          renderLeftNav={(onClick, disabled) => (
            <IconButton onClick={onClick} disabled={disabled} className={`${classes.floorSliderNavBtn} left`}>
              <SliderNavLeftArrow />
            </IconButton>
          )}
          renderRightNav={(onClick, disabled) => (
            <IconButton onClick={onClick} disabled={disabled} className={classes.floorSliderNavBtn}>
              <SliderNavRightArrow />
            </IconButton>
          )}
        />
      </Box>
      <Box className={classes.floorPlanMapSec}>
        <ImageGallery items={floorImages}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          useTranslate3D={false}
          renderLeftNav={(onClick, disabled) => (
            <IconButton onClick={onClick} disabled={disabled} className={`${classes.floorSliderNavBtn} left`}>
              <SliderNavLeftArrow />
            </IconButton>
          )}
          renderRightNav={(onClick, disabled) => (
            <IconButton onClick={onClick} disabled={disabled} className={classes.floorSliderNavBtn}>
              <SliderNavRightArrow />
            </IconButton>
          )}
        />
      </Box> */}
    </Box>
  );
};

export default withWidth()(FloorPlansSection);
