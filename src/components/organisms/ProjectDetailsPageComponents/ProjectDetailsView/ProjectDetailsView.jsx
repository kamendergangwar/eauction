import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ImageGallery from "react-image-gallery";
import { ProjectDetailsViewStyles } from "../ProjectDetailsView.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import { SliderNavLeftArrow, SliderNavRightArrow, WhiteBackArrowIcon, BlackUpArrowIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  getProjectsData,
  setDummyProjectList,
  projectDataSelector,
  clearProjectList,
  removeDuplicateProject,
} from "../../../../redux/features/projectdata/ProjectDataSlice";
import {
  getApplicant,
  // applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getApplication,
  addApplication,
  clearApplicationState,
  applicationSelector,
} from "../../../../redux/features/application/ApplicationSlice";
import {
  getStepperDetails,
  addEditStepper,
  superStepperActiveStep,
  subSteppper2ActiveStep,
} from "../../../../redux/features/stepper/StepperSlice";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import EssentialDetailsCard from "../EssentialDetailsCard/EssentialDetailsCard";
import OverviewSection from "../OverviewSection/OverviewSection";
import AboutUsSection from "../AboutUsSection/AboutUsSection";
import FloorPlansSection from "../FloorPlansSection/FloorPlansSection";
import TakeVirtualTourCard from "../TakeVirtualTourCard/TakeVirtualTourCard";
import AmenitiesSection from "../AmenitiesSection/AmenitiesSection";
import LocationSection from "../LocationSection/LocationSection";

import BannerImg1 from "../../../../assets/bannerImages/image1.png";
import BannerImg2 from "../../../../assets/bannerImages/image2.png";
import BannerImg3 from "../../../../assets/bannerImages/image3.png";

const ProjectDetailsView = (props) => {
  const { width } = props;
  const classes = ProjectDetailsViewStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [projectDetailsData, setProjectDetailsData] = useState({});
  const [images, setImages] = useState([{
    original: BannerImg1,
    thumbnail: BannerImg1
  }, {
    original: BannerImg2,
    thumbnail: BannerImg2
  }, {
    original: BannerImg3,
    thumbnail: BannerImg3
  }]);

  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );

  useEffect(() => {
    dispatch(getStepperDetails())
  }, [dispatch])

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
            if (item.applicantKycStepper[1].status != "completed") {
              pageUrl = "/verify-pancard";
            }
          }
        }

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }

      })
      history.push(pageUrl)
    }
  }, [isSuccessResStepper])

  useEffect(() => {
    let get_project_obj = localStorage.getItem("projectDetailsObj");
    if (get_project_obj) {
      let proj_detls_obj = JSON.parse(get_project_obj);
      setProjectDetailsData(proj_detls_obj);
      if (proj_detls_obj?.images.length > 0) {
        let bg_imgs = [];
        for (let i = 0; i < proj_detls_obj?.images.length; i++) {
          const element = proj_detls_obj?.images[i];
          let bg_img_onj = {
            original: element,
            thumbnail: element
          };
          bg_imgs.push(bg_img_onj);
        }
        setImages(bg_imgs);
      }
    }
  }, [t]);

  const goPreviousPage = () => {
    history.push("/category-details");
  };

  const scrollToTopEvent = () => {
    var main_section = document.getElementById("mainSectionId");
    main_section.scrollTop = 0;
  };

  return (
    <>
      <FormCard>
        <div className={classes.formSection}>
          <div className={classes.bannerSection}>
            <Hidden mdDown>
              {/* <IconButton className={classes.backBtn} onClick={() => history.goBack()}> */}
              <IconButton className={classes.backBtn} onClick={() => history.push("/select-projects")}>
                <WhiteBackArrowIcon />
              </IconButton>
            </Hidden>
            <Box className={classes.heroTextSec}>
              <Typography variant="h1" className="title">{projectDetailsData?.title || "--"}</Typography>
              {/* <Button className="ctaBtn">{t("projectDetailsPage.erraCertifiedBtn")}</Button> */}
              <span className="reraCertifiedLabel">{t("projectDetailsPage.erraCertifiedBtn")}</span>
            </Box>
            <ImageGallery
              items={images}
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
              renderLeftNav={(onClick, disabled) => (
                <Hidden mdDown>
                  <IconButton onClick={onClick} disabled={disabled} className={`${classes.bannerSliderNavBtn} left`}>
                    <SliderNavLeftArrow />
                  </IconButton>
                </Hidden>
              )}
              renderRightNav={(onClick, disabled) => (
                <Hidden mdDown>
                  <IconButton onClick={onClick} disabled={disabled} className={classes.bannerSliderNavBtn}>
                    <SliderNavRightArrow />
                  </IconButton>
                </Hidden>
              )}
            />
          </div>
          <EssentialDetailsCard projectDetailsData={projectDetailsData} />
          <Hidden mdDown>
            <Box className={`${classes.sectionCover} navSec`}>
              <Grid container spacing={3}>
                {/* <Grid item md="auto">
                  <a className={classes.sectionNavBtn} href="#overviewSecId">{t("projectDetailsPage.navBtnsSec.navButton1")}</a>
                </Grid> */}
                <Grid item md="auto">
                  <a className={classes.sectionNavBtn} href="#aboutUsSecId">{t("projectDetailsPage.navBtnsSec.navButton2")}</a>
                </Grid>
                <Grid item md="auto">
                  <a className={classes.sectionNavBtn} href="#floorPlansSecId">{t("projectDetailsPage.navBtnsSec.navButton3")}</a>
                </Grid>
                {/* <Grid item md="auto">
                  <a className={classes.sectionNavBtn} href="#amenitiesSecId">{t("projectDetailsPage.navBtnsSec.navButton4")}</a>
                </Grid> */}
                <Grid item md="auto">
                  <a className={classes.sectionNavBtn} href="#locationSecId">{t("projectDetailsPage.navBtnsSec.navButton5")}</a>
                </Grid>
              </Grid>
            </Box>
          </Hidden>
          <AboutUsSection projectDetailsData={projectDetailsData} />
          <OverviewSection projectDetailsData={projectDetailsData} />
          <FloorPlansSection projectDetailsData={projectDetailsData} />
          {/* <Hidden mdDown>
            <TakeVirtualTourCard projectDetailsData={projectDetailsData} />
          </Hidden> */}
          {/* <AmenitiesSection projectDetailsData={projectDetailsData} /> */}
          <LocationSection projectDetailsData={projectDetailsData} />
          <Hidden mdDown>
            <Box className={classes.goToTopBtnBox}>
              <span className="text">{t("projectDetailsPage.goToTopBtnTxt")}</span> <IconButton onClick={() => scrollToTopEvent()}>
                <BlackUpArrowIcon /></IconButton>
            </Box>
          </Hidden>
        </div>
      </FormCard>
    </>
  );
};

export default withWidth()(ProjectDetailsView);
