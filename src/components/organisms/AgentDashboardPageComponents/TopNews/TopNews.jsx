import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import Image from "../../../../assets/missingPicturePlaceholder.jpg";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getLatestNewsList, latestNewsSelector, getLatestNewsListDummy } from "../../../../redux/features/dashboard/LatestNewsSlice";
import CompLoading from "../../../atoms/Loading/CompLoading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    padding: theme.spacing(1),
    // height: 430,
    // height: "58vh",
    position: "relative"
  },
  cardContainer: {
    overflow: "auto",
    [theme.breakpoints.between("sm", "md")]: {
      height: 350,
    },
  },
  orange: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(orange[200]),
    backgroundColor: orange[200],
  },
  cardRoot: {
    display: "flex",
    padding: theme.spacing(1),
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingLeft: theme.spacing(2),
  },
  cover: {
    width: 140,
    height: 95,
  },
  shortTitle: {
    overflow: "hidden",
    "-webkit-lineClamp": 1,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical"
  },
  newsShortPara: {
    overflow: "hidden",
    "-webkit-lineClamp": 2,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical"
  },
}));

const TopNews = () => {
  const classes = useStyles();
  const { t } = useTranslation("AgentDashboardPageTrans");
  const dispatch = useDispatch();
  const [latestNewsData, setLatestNewsData] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("Error, Something went wrong, please try again after some time.");
  const [isFetching, setIsFetching] = React.useState(true);
  // const { latestNewsSelector } = useSelector(latestNewsSelector);

  /* useEffect(() => {
    dispatch(getLatestNewsList());
    // console.log("latestNewsData", latestNewsData);
  }, [dispatch]); */

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
          setLatestNewsData(latest_news_arr);
          setIsError(false);
        } else {
          setLatestNewsData([]);
          setIsError(true);
        }
        setIsFetching(false);
      }
    }).catch((error) => {
      setLatestNewsData([]);
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
      <AgentIconTitle
        icon={
          <Avatar className={classes.orange}>
            <NoteOutlinedIcon fontSize="small" />
          </Avatar>
        }
        title={t("topNews.title")}
        titleVariant="body1"
      />
      <div className={classes.cardContainer}>
        {isFetching && <CompLoading isOpen={isFetching} />}
        {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
        {latestNewsData.map((item, index) => (
          <Box paddingTop={1} key={index}>
            <Card className={classes.cardRoot}>
              <CardMedia
                className={classes.cover}
                image={item.image || Image}
                title="Top News"
              />
              <div className={classes.details}>
                <Typography variant="subtitle2" color="textSecondary">
                  {moment(item.date).format("DD MMM, YYYY")}
                </Typography>
                <Typography variant="subtitle2" className={classes.shortTitle}>{item.title.rendered}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  <span className={classes.newsShortPara}>{stripHtmlTags(item.content.rendered)}</span>
                  <a href={item.link} target="_blank" style={{ color: "#007ae7", fontWeight: 600 }}>
                    {t("topNews.readMore")}
                  </a>
                </Typography>
              </div>
            </Card>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default TopNews;
