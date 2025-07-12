import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import GoogleMapReact from "google-map-react";
import OwlCarousel from 'react-owl-carousel';
import { GoogleMapApiKey } from "../../../../utils/Common";
import { ProjectDetailsViewStyles } from "../ProjectDetailsView.styles";
import ProjectLocationImg from "../../../../assets/projectDetails/projectLocationImg.png";
import PrevIcon from "../../../../assets/floorPlanImgs/prevIcon.png";
import NextIcon from "../../../../assets/floorPlanImgs/nextIcon.png";

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

const LocationSection = (props) => {
  const { projectDetailsData, name } = props;
  const classes = ProjectDetailsViewStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const latitude = Number(0);
  const longitude = Number(0);
  const [stagePaddingVal, setStagePaddingVal] = useState(100);
  const [connectivityImages, setConnectivityImages] = useState([]);

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: {
        lat: projectDetailsData?.lat ? Number(projectDetailsData?.lat) : latitude,
        lng: projectDetailsData?.lng ? Number(projectDetailsData?.lng) : longitude
      },
      map,
      title: name,
    });
    return marker;
  };

  useEffect(() => {
    if (projectDetailsData?.connectivity?.length > 0) {
      let connect_imgs = [];
      for (let i = 0; i < projectDetailsData?.connectivity.length; i++) {
        const element = projectDetailsData?.connectivity[i];
        let conn_img_onj = {
          original: element,
          thumbnail: element
        };
        connect_imgs.push(conn_img_onj);
      }
      setConnectivityImages(connect_imgs);
    }
  }, [projectDetailsData]);

  const handleChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <Box className={`${classes.sectionCover} location`} id="locationSecId">
      <Typography variant="h2" className={`${classes.sectionTitle}`}>{t("projectDetailsPage.locationSec.title")}</Typography>

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
          <Tab label={t("projectDetailsPage.locationSec.tab2")} />
          {/* <Tab label={t("projectDetailsPage.locationSec.tab2")} /> */}
          <Tab label={t("projectDetailsPage.locationSec.tab3")} />
        </Tabs>
      </Box>

      <TabPanel value={selectedTabIndex} index={0}>
        <Box className={classes.mapBoxContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: GoogleMapApiKey }}
            defaultCenter={{
              lat: projectDetailsData?.lat ? Number(projectDetailsData?.lat) : latitude,
              lng: projectDetailsData?.lng ? Number(projectDetailsData?.lng) : longitude
            }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          ></GoogleMapReact>
        </Box>
      </TabPanel>
      <TabPanel value={selectedTabIndex} index={1}>
        <Box className={classes.mapContainer}>
          {connectivityImages.length > 0 &&
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
              {connectivityImages.map((obj, i) => (
                <div className="item" key={i}>
                  <img src={obj.original} alt={`slide-${i}`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </OwlCarousel>
          }
        </Box>
      </TabPanel>
      <TabPanel value={selectedTabIndex} index={2}>
        <Typography variant="h2">Conectivity</Typography>
        <Box className={classes.mapContainer}>
          <img src={ProjectLocationImg} alt="Project Location" width="100%" />
        </Box>
      </TabPanel>
      {/* <Grid container className={classes.floorPlanTabs} spacing={3}>
        <Grid item><Button className={`${classes.floorTabBtns} active`}>Project Location</Button></Grid>
        <Grid item><Button className={classes.floorTabBtns}>Google Map</Button></Grid>
        <Grid item><Button className={classes.floorTabBtns}>Conectivity</Button></Grid>
      </Grid> */}
    </Box>
  );
};

export default LocationSection;
