import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ImageGallery from "react-image-gallery";
import "./ImageStyle.css";
import Chip from "@material-ui/core/Chip";
import GoogleMap from "../GoogleMap/GoogleMap";
import withWidth from "@material-ui/core/withWidth";

const AntTabs = withStyles({
  indicator: {
    backgroundColor: "#f27807",
    height: 3,
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
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
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  wrapIcon: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  chipRoot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const ProjectDetailsTabs = (props) => {
  const { moreDetails, width } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [images, setImages] = useState([]);
  const [floorImages, setFloorImages] = useState([]);
  const [thumbPositionStr, setThumbPositionStr] = useState("right");
  const { t } = useTranslation("ProjectDetailsPageTrans");

  useEffect(() => {
    if (moreDetails.images.length > 0) {
      const imageGallery = moreDetails.images;
      imageGallery.forEach((item) => {
        const newItem = {
          original: item,
          thumbnail: item,
        };
        setImages((prevData) => [...prevData, newItem]);
      });
    }
    if (moreDetails.floorPlan.length > 0) {
      const imageGallery = moreDetails.floorPlan;
      imageGallery.forEach((item) => {
        const newItem = {
          original: item,
          thumbnail: item,
        };
        setFloorImages((prevData) => [...prevData, newItem]);
      });
    }
  }, [moreDetails.floorPlan, moreDetails.images]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (width == "sm" || width == "xs") {
      setThumbPositionStr("bottom");
    } else {
      setThumbPositionStr("right");
    }
  }, [width]);

  return (
    <div className={classes.root}>
      <AntTabs
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        aria-label="ant example"
      >
        <AntTab label={t("projectForm.projectTable.tableTh0")} />
        <AntTab label={t("projectForm.projectTable.tableTh1")} />
        <AntTab label={t("projectForm.projectTable.tableTh2")} />
        <AntTab label={t("projectForm.projectTable.tableTh3")} />
        <AntTab label={t("projectForm.projectTable.tableTh4")} />
      </AntTabs>
      <TabPanel value={value} index={0}>
        <Box marginY={2}>
          <Grid container spacing={1}>
            <Grid item>
              <Typography
                variant="body2"
                style={{ color: "#4c5d6c" }}
                gutterBottom
              >
                {moreDetails.about}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GoogleMap
          name={moreDetails.name}
          lat={moreDetails.lat}
          lng={moreDetails.lng}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {images.length > 0 && <ImageGallery items={images} />}
        {images.length === 0 && (
          <Box textAlign="center" marginY={5}>
            <Typography variant="body2" gutterBottom>
              No Data
            </Typography>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.chipRoot}>
              {moreDetails.amenities.map((item, index) => (
                <React.Fragment key={`amenities` + index}>
                  <Chip
                    size="small"
                    style={{ backgroundColor: "#edf5ff", color: "#456b8d" }}
                    label={item}
                  />
                </React.Fragment>
              ))}
              {moreDetails.amenities.length === 0 && (
                <Box textAlign="center" marginY={5}>
                  <Typography variant="body2" gutterBottom>
                    No Data
                  </Typography>
                </Box>
              )}
            </div>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        {floorImages.length > 0 && (
          <ImageGallery items={floorImages} thumbnailPosition={thumbPositionStr} />
        )}
        {floorImages.length === 0 && (
          <Box textAlign="center" marginY={5}>
            <Typography variant="body2" gutterBottom>
              No Data
            </Typography>
          </Box>
        )}
      </TabPanel>
    </div>
  )
};
export default withWidth()(ProjectDetailsTabs);
