import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { ProjectDetailsViewStyles } from "../ProjectDetailsView.styles";
import SolarPanelsIcon from "../../../../assets/amenities/icon1.png";
import FootballFieldIcon from "../../../../assets/amenities/icon2.png";
import GarderForSeniorsIcon from "../../../../assets/amenities/icon3.png";
import RainwaterHarvestingIcon from "../../../../assets/amenities/icon4.png";
import CricketGroundIcon from "../../../../assets/amenities/icon5.png";
import ParkingAreaIcon from "../../../../assets/amenities/icon6.png";
import DifferentSpclsTreesIcon from "../../../../assets/amenities/icon7.png";
import BasketBallCourtIcon from "../../../../assets/amenities/icon8.png";
// import FitnessClubIcon from "../../../../assets/amenities/icon9.png";
import FitnessClubIcon from "../../../../assets/amenities/Gym.png";
import CommercialShopsIcon from "../../../../assets/amenities/icon10.png";
import BusTerminusIcon from "../../../../assets/amenities/icon11.png";
import RailwayForcourtIcon from "../../../../assets/amenities/icon12.png";
// import MultipurposeGroundIcon from "../../../../assets/amenities/icon13.png";
import MultipurposeGroundIcon from "../../../../assets/amenities/MultipurposeCourt.png";
import AmphitheaterIcon from "../../../../assets/amenities/Amphitheatre.png";
import LawnIcon from "../../../../assets/amenities/Lawn.png";
import YogaLawnIcon from "../../../../assets/amenities/YogaLawn.png";
import FootballCourtIcon from "../../../../assets/amenities/FootballCourt.png";
import GardenIcon from "../../../../assets/amenities/Garden.png";
import AwaitingAreaIcon from "../../../../assets/amenities/AwaitingArea.png";
import PicnicAreaIcon from "../../../../assets/amenities/PicnicArea.png";
import KidsPlayAreaIcon from "../../../../assets/amenities/KidsPlayArea.png";
import ReflexologyPathwayIcon from "../../../../assets/amenities/ReflexologyPathway.png";
import SandPlayCourtIcon from "../../../../assets/amenities/SandPlayCourt.png";
import ShoppingPlazzaIcon from "../../../../assets/amenities/ShoppingPlazza.png";
import VolleyballCourtIcon from "../../../../assets/amenities/VolleyballCourt.png";

const AmenitiesSection = (props) => {
  const { projectDetailsData } = props;
  const classes = ProjectDetailsViewStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();
  const [amenitiesListArr, setAmenitiesListArr] = useState([
    /* {
      name: "Solar Panels",
      icon: SolarPanelsIcon
    },
    {
      name: "Football Field",
      icon: FootballFieldIcon
    },
    {
      name: "Garden for Seniors",
      icon: GarderForSeniorsIcon
    },
    {
      name: "Rainwater Harvesting",
      icon: RainwaterHarvestingIcon
    },
    {
      name: "Cricket Ground",
      icon: CricketGroundIcon
    },
    {
      name: "Parking",
      icon: ParkingAreaIcon
    },
    {
      name: "Different Species of Trees",
      icon: DifferentSpclsTreesIcon
    },
    {
      name: "Basketball Court",
      icon: BasketBallCourtIcon
    },
    {
      name: "Fitness Club",
      icon: FitnessClubIcon
    },
    {
      name: "Commercial Shops",
      icon: CommercialShopsIcon
    },
    {
      name: "Bus Terminus",
      icon: BusTerminusIcon
    },
    {
      name: "Railway Forcourt",
      icon: RailwayForcourtIcon
    },
    {
      name: "Multipurpose Ground",
      icon: MultipurposeGroundIcon
    } */
  ]);
  useEffect(() => {
    let amnts_list = projectDetailsData.amenities;
    let amnts_new_list = [];
    if (amnts_list) {
      for (let i = 0; i < amnts_list.length; i++) {
        const element = amnts_list[i];
        let icon_url = "";
        switch (element) {
          case "Amphitheatre":
          case "अँफिथिएटर":
          case "एम्फ़ीथिएटर":
            icon_url = AmphitheaterIcon
            break;

          case "Basketball Court":
          case "बास्केटबॉल कोर्ट":
            icon_url = BasketBallCourtIcon
            break;

          case "Cricket Pitch":
          case "क्रिकेट खेळपट्टी":
          case "क्रिकेट पिच":
            icon_url = CricketGroundIcon
            break;

          case "Lawn":
          case "हिरवळ":
          case "हरियाली":
            icon_url = LawnIcon
            break;

          case "Yoga Lawn":
          case "योगा लॉन":
            icon_url = YogaLawnIcon
            break;

          case "Football Field":
          case "फुटबॉल मैदान":
            icon_url = FootballFieldIcon
            break;

          case "Solar Panels":
          case "सौरपत्रे":
          case "सौर पेनल्स":
            icon_url = SolarPanelsIcon
            break;

          case "Football Ground":
          case "फुटबाल मैदान":
            icon_url = FootballCourtIcon
            break;

          case "Garden":
          case "उद्यान":
            icon_url = GardenIcon
            break;

          case "Multipurpose Court":
          case "बहुउद्देशीय मैदान":
            icon_url = MultipurposeGroundIcon
            break;

          case "Seating Area":
          case "बसायची जागा":
          case "बैठने की जगह":
            icon_url = AwaitingAreaIcon
            break;

          case "Outdoor Gym":
          case "आउटडोर जिम":
            icon_url = FitnessClubIcon
            break;

          case "Picnic Area":
            icon_url = PicnicAreaIcon
            break;

          case "Kids Play Area":
          case "लहान मुलांचे क्रीडांगण":
          case "किड्स प्ले एरिया":
            icon_url = KidsPlayAreaIcon
            break;

          case "Reflexology Pathway":
          case "रिफ्लेक्सोलॉजी रास्ता":
          case "रिफ्लेक्सोलॉजी पायवाट":
            icon_url = ReflexologyPathwayIcon
            break;

          case "Sand Play Court":
            icon_url = SandPlayCourtIcon
            break;

          case "Shopping Plaza":
          case "खरेदी संकुल":
          case "खरीदारी प्लाजा":
            icon_url = ShoppingPlazzaIcon
            break;

          case "Fitness Center":
          case "स्वास्थ्य केंद्र":
          case "फिटनेस सेंटर":
            icon_url = FitnessClubIcon
            break;

          case "Parking":
          case "पार्किंग":
            icon_url = ParkingAreaIcon
            break;

          case "Garden for Seniors":
          case "ज्येष्ठांसाठी बाग":
          case "वरिष्ठों के लिए उद्यान":
            icon_url = GarderForSeniorsIcon
            break;

          case "Volleyball Court":
          case "व्हॉलीबॉल कोर्ट":
          case "वॉलीबॉल कोर्ट":
            icon_url = VolleyballCourtIcon
            break;

          default:
            icon_url = ""
            break;
        }
        let new_obj = {
          name: element,
          icon: icon_url
        };
        amnts_new_list.push(new_obj);
      }
      setAmenitiesListArr(amnts_new_list);
    }
  }, [projectDetailsData]);

  return (
    <Box className={`${classes.sectionCover} amenities`} id="amenitiesSecId">
      <Typography variant="h2" className={`${classes.sectionTitle} amenities`}>{t("projectDetailsPage.amenitiesSec.title")}</Typography>

      <Grid container>
        {amenitiesListArr.map((element, i) => (
          <Grid item md={4} xs={12} key={i}>
            <Box className={classes.amenitiesList}>
              <img src={element.icon} alt={element.name} title={element.name} /><Typography>{element.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AmenitiesSection;
