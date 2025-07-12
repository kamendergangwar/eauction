import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import OwlCarousel from 'react-owl-carousel';
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import Image from "../../../../assets/missingPicturePlaceholder.jpg";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getLatestNewsList, latestNewsSelector, getLatestNewsListDummy } from "../../../../redux/features/dashboard/LatestNewsSlice";
import CompLoading from "../../../atoms/Loading/CompLoading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import PrevIcon from "../../../../assets/floorPlanImgs/prevIcon.png";
import NextIcon from "../../../../assets/floorPlanImgs/nextIcon.png";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    position: "relative"
  },
  cardContainer: {
    position: "relative"
  },
  owlCarouselCont: {
    "&.owl-carousel": {

      "& .owl-item": {
        paddingBottom: theme.spacing(3.5),
        height: "360px"
      },
      "& .item": {
        height: "100%"
      },
      "& .owl-nav": {
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        "& button": {
          border: "2px solid #0038C0",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          margin: theme.spacing(0, 1),
          "&.disabled": {
            cursor: "default",
            opacity: 0.5,
          },
          "& img": {
            maxWidth: 25
          }
        }
      }
    }
  },
  cardRoot: {
    height: "100%",
    background: "#FFFFFF",
    boxShadow: "0px 8px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    height: 170
  },
  details: {
    padding: theme.spacing(2),
  },
  shortTitle: {
    color: "#0F2940",
    fontWeight: 600,
    fontSize: "0.9rem",
    overflow: "hidden",
    "-webkit-lineClamp": 1,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    marginBottom: theme.spacing(1)
  },
  newsShortPara: {
    color: "#4C5D6C",
    fontSize: "0.8rem",
    overflow: "hidden",
    "-webkit-lineClamp": 4,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    minHeight: 78
  },
  readMoreBtn: {
    color: "#0A5DE2",
    fontWeight: "bold",
    fontSize: "0.8rem",
    textDecoration: "none"
  }
}));

const RecentPosts = () => {
  const classes = useStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const dispatch = useDispatch();
  const [recentPostData, setRecentPostData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error, Something went wrong, please try again after some time.");
  const [isFetching, setIsFetching] = useState(true);
  // const { latestNewsSelector } = useSelector(latestNewsSelector);

  useEffect(() => {
    // console.log("recentPostData", recentPostData);
  }, [dispatch]);

  useEffect(() => {
    setIsFetching(true);
    getLatestNewsListDummy().then((response) => {
      if (response && response.status === 200) {
        if (response.data.result.length > 0) {
          let latest_news_arr = [];
          for (let i = 0; i < response.data.result.length; i++) {
            const element = response.data.result[i];
            let image_url = "";
            if (element._links["wp:featuredmedia"]) {
              image_url = element._links["wp:featuredmedia"][0].href;
            }
            let new_obj = {
              ...element,
              image: image_url
            };
            latest_news_arr.push(new_obj);
          }
          setRecentPostData(latest_news_arr);
          setIsError(false);
        } else {
          setRecentPostData([]);
          setIsError(true);
        }
        setIsFetching(false);
      }
    }).catch((error) => {
      setRecentPostData([]);
      setIsFetching(false);
      setIsError(true);
    });
  }, [t]);

  const stripHtmlTags = (str) => {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  };

  /* const topNews = [
    {
      date: "21st Aug, 2021",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus pharetra mi.",
    },
    {
      date: "21st Aug, 2021",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus pharetra mi.",
    },
    {
      date: "21st Aug, 2021",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus pharetra mi.",
    },
  ]; */

  return (
    <div className={classes.mainRoot}>
      {/* <IconTitle
        icon={<NoteOutlinedIcon fontSize="large" />}
        title={t("topNews.title")}
        titleVariant="body1"
      /> */}
      <div className={classes.cardContainer}>
        {isFetching && <CompLoading isOpen={isFetching} />}
        {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
        <Box>
          <OwlCarousel className={classes.owlCarouselCont} margin={20} dots={false} nav={true} stagePadding={5} navText={[`<img src='${PrevIcon}' />`, `<img src='${NextIcon}' />`]} responsive={{
            0: {
              items: 1
            },
            600: {
              items: 3
            },
            1000: {
              items: 3
            }
          }}>
            {recentPostData.map((item, index) => (
              <Box key={index}>
                {/* {item.content.rendered.length > 0 && ( */}
                <div className="item">
                  <Card className={classes.cardRoot}>
                    <CardMedia
                      className={classes.cover}
                      // image={item.image || Image}
                      image="https://media.istockphoto.com/photos/taj-mahal-hotel-and-gateway-of-india-picture-id539018660?k=20&m=539018660&s=612x612&w=0&h=bkeZQaQ1xyHZxrOM7Wwujj7gcKzVMt7FlKiILC3QyhI="
                      title="Top News"
                    />
                    <div className={classes.details}>
                      {/* <Typography variant="subtitle2" color="textSecondary">
                      {moment(item.date).format("DD MMM, YYYY")}
                    </Typography> */}
                      <Typography variant="subtitle2" className={classes.shortTitle}>{item?.title?.rendered || "--"}</Typography>
                      <Typography>
                        <span className={classes.newsShortPara}>{item?.content?.rendered ? stripHtmlTags(item.content.rendered) : "--"}</span>
                        <a href={item.link} target="_blank" className={classes.readMoreBtn} rel="noopener noreferrer">{t("topNews.readMore")}</a>
                      </Typography>
                    </div>
                  </Card>
                </div>
                {/* )} */}
              </Box>
            ))}
          </OwlCarousel>
        </Box>
      </div>
    </div>
  );
};

export default RecentPosts;
