import { makeStyles } from "@material-ui/core/styles";
// import ProjectPageBannerImg from "../../../../assets/projectPageBannerImg.png";
import TourSectionBg from "../../../assets/projectDetails/tourSectionBg.png";
import AboutUsSecBg from "../../../assets/projectDetails/aboutUsBgPattern.png";

export const ProjectDetailsViewStyles = makeStyles((theme) => ({
  formSection: {
    /* height: "100%",
    overflow: "auto", */
    position: "relative",
    paddingBottom: theme.spacing(15)
  },
  bannerSection: {
    // backgroundImage: `url(${ProjectPageBannerImg})`,
    // height: 500,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    position: "relative",
    "& .image-gallery-content::after": {
      background: "linear-gradient(111.33deg, #000000 -70.54%, rgba(0, 0, 0, 0) 115.87%)",
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 0,
      pointerEvents: "none"
    },
    "& .image-gallery-slide .image-gallery-image": {
      maxHeight: 550,
      objectFit: "cover",
      [theme.breakpoints.down("sm")]: {
        maxHeight: 450,
        height: 450,
      },
    }
  },
  backBtn: {
    position: "absolute",
    top: theme.spacing(3.75),
    left: theme.spacing(3.75),
    zIndex: 1,
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem"
    },
  },
  heroTextSec: {
    position: "absolute",
    top: theme.spacing(15),
    left: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    zIndex: 1,
    "& .title": {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: "3rem",
      marginRight: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    "& .reraCertifiedLabel": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: 40,
      color: "#001979",
      fontSize: "0.9rem",
      fontWeight: 600,
      padding: theme.spacing(1, 2),
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(3)
      },
    },
    [theme.breakpoints.down("sm")]: {
      top: theme.spacing(7.5),
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  bannerSliderNavBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    border: "2px solid #001979",
    position: "absolute",
    padding: 0,
    width: 40,
    height: 40,
    right: 40,
    bottom: theme.spacing(8),
    zIndex: 1,
    "&.left": {
      right: 100
    },
    "& .MuiSvgIcon-root": {
      fill: "none",
      fontSize: "1.2rem"
    }
  },
  sectionCover: {
    padding: theme.spacing(3.75, 5),
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    /* "&.navSec": {
      position: "sticky",
      top: 0,
      backgroundColor: "#fff",
      zIndex: 5,
    }, */
    "&.aboutUs": {
      // backgroundImage: `url(${AboutUsSecBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(0)
    },
    "&.floorPlans": {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(9.5)
    },
    "&.takeTour": {
      padding: theme.spacing(0)
    },
    "&.amenities": {
      background: "#FAFBFE",
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(7.5)
    }
  },
  sectionNavBtn: {
    backgroundColor: "#F5FAFD",
    //background: "linear-gradient(126.64deg, #14AEFE 21.57%, #000DC7 95.88%)",
    borderRadius: 40,
    // color: "#434A6C",
    color: "#000",
    fontWeight: 700,
    fontSize: "1.25rem",
    padding: theme.spacing(1.5, 7.5),
    textDecoration: "none",
    display: "block",
    "&:hover": {
      background: "linear-gradient(126.64deg, #14AEFE 21.57%, #000DC7 95.88%)",
      color: "#fff"
    },
    "&.active": {
      background: "linear-gradient(126.64deg, #14AEFE 21.57%, #000DC7 95.88%)",
      color: "#fff"
    }
  },

  sectionTitle: {
    color: "#001979",
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: theme.spacing(3),
    "&.white": {
      color: "#fff"
    },
    "&.amenities": {
      marginBottom: theme.spacing(5)
    }
  },
  horizontalLst: {
    display: "flex",
    margin: 0,
    padding: 0,
    listStyle: "none",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginBottom: theme.spacing(7.5)
    },
    "&>li": {
      color: "#434A6C",
      padding: theme.spacing(0, 3),
      position: "relative",
      fontWeight: "bold",
      fontSize: "1.2rem",
      [theme.breakpoints.down("sm")]: {
        padding: 0,
        marginBottom: theme.spacing(1)
      },
      "& span": {
        color: "#072AC8",
      },
      "&:first-child": {
        paddingLeft: 0,
      },
      "&:last-child": {
        paddingRight: 0,
        "&::after": {
          display: "none"
        }
      },
      "&::after": {
        backgroundColor: "#434A6C",
        borderRadius: "50%",
        content: "''",
        position: "absolute",
        top: "50%",
        right: 0,
        width: 8,
        height: 8,
        transform: "translate(50%,-50%)",
        zIndex: 1,
        [theme.breakpoints.down("sm")]: {
          display: "none"
        },
      }
    }
  },
  dividerCell: {
    backgroundColor: "#E4E4E4",
    margin: theme.spacing(5, 0)
  },
  categoryTitleIcon: {
    display: "block",
    marginRight: theme.spacing(1.5),
    maxWidth: 30
  },
  categoryTitle: {
    color: "#00437E",
    fontWeight: 600,
    fontSize: "1.1rem"
  },
  catChipContainer: {
    marginTop: theme.spacing(3),
    "& .MuiChip-root": {
      backgroundColor: "rgba(7, 42, 200, 0.1)",
      borderRadius: 40,
      height: "auto",
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      maxWidth: "100%"
    },
    "& .MuiChip-label": {
      color: "#001979",
      fontSize: "0.9rem",
      fontWeight: 600,
      padding: theme.spacing(1, 2)
    }
  },
  aboutUsParagraph: {
    color: "#434A6C",
    fontWeight: "normal",
    fontSize: "1rem"
  },
  // 
  tabsView: {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(7.5),
    "& .MuiTab-root": {
      backgroundColor: "#F2F2F2",
      borderRadius: 40,
      color: "#434A6C",
      fontWeight: 500,
      fontSize: "1rem",
      marginRight: theme.spacing(2.5),
      padding: theme.spacing(1, 3),
      "&.Mui-selected": {
        backgroundColor: "#072AC8",
        color: "#fff"
      }
    },
  },
  /* floorPlanMapSec: {
    "& .image-gallery-slide-wrapper": {
      paddingBottom: theme.spacing(8)
    },
    "& .image-gallery-content .image-gallery-slide .image-gallery-image": {
      maxHeight: 300
    }
  }, */
  owlCarouselCont: {
    "&.owl-carousel": {
      "& .owl-item .item": {
        border: "1px solid #CCD1E4",
        height: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& img": {
          width: "auto",
          maxWidth: "100%",
          maxHeight: "100%"
        }
      },
      "& .owl-nav": {
        marginTop: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        "& button": {
          backgroundColor: "transparent",
          border: "2px solid #001979",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.down("sm")]: {
            // right: 16
          },
          "&.owl-prev": {
            marginRight: theme.spacing(2.5),
            [theme.breakpoints.down("sm")]: {
              marginRight: theme.spacing(2.5),
            },
          },
          "& img": {
            maxWidth: 19
          }
        },
      },
      "& .owl-nav .owl-prev.disabled, .owl-nav .owl-next.disabled": {
        display: "none"
      }
    }
  },
  // 
  takeTourCard: {
    background: "linear-gradient(180deg, #0038C0 20.1%, #006FD5 87.81%)",
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.1)",
    height: "100%",
    padding: theme.spacing(7.5, 5)
  },
  tourParagraph: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "1rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5)
  },
  takeTourBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    color: "#001979",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: theme.spacing(1.2, 3),
    textDecoration: "none"
  },
  tourSecBgImg: {
    backgroundImage: `url(${TourSectionBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100%",
  },
  // 
  amenitiesList: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3.75),
    "& img": {
      maxWidth: 40,
      marginRight: theme.spacing(2.5)
    },
    "& .MuiTypography-root": {
      color: "#001979",
      fontWeight: "bold",
      fontSize: "1.2rem"
    }
  },
  mapContainer: {
    // marginBottom: theme.spacing(15)
  },
  mapBoxContainer: {
    border: "1px solid #CCD1E4",
    borderRadius: 10,
    height: 400,
    overflow: "hidden"
  },
  // 
  goToTopBtnBox: {
    position: "absolute",
    bottom: 60,
    right: 40,
    display: "flex",
    alignItems: "center",
    "& .text": {
      color: "#001979",
      fontWeight: 500,
      fontSize: "1rem",
      marginRight: theme.spacing(2)
    },
    "& .MuiIconButton-root": {
      backgroundColor: "transparent",
      border: "2px solid #001979",
      padding: 0,
      width: 40,
      height: 40,
      "& .MuiSvgIcon-root": {
        fill: "none"
      }
    }
  }
}));
