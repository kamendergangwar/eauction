import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { importantDatesSelector, getImpDatesListDummy } from "../../../../redux/features/dashboard/ImportantDatesSlice";
import CompLoading from "../../../atoms/Loading/CompLoading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    padding: theme.spacing(1),
    position: "relative"
  },
  deepPurple: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(deepPurple[200]),
    backgroundColor: deepPurple[200],
  },
  cardContainer: {
    overflow: "auto",
    height: "100%",
    [theme.breakpoints.between("sm", "md")]: {
      height: 350,
    },
  },
  cardRoot: {
    display: "flex",
    // padding: theme.spacing(1),
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  cover: {
    backgroundColor: "#007ae7",
    padding: theme.spacing(1, 2),
    textAlign: "center",
    flex: "0 0 auto"
  },
  dateText: {
    color: "#ffff",
    [theme.breakpoints.between("sm", "md")]: {
      paddingTop: theme.spacing(1),
    },
  },
  shortTitle: {
    overflow: "hidden",
    "-webkit-lineClamp": 1,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical"
  },
  shortPara: {
    overflow: "hidden",
    "-webkit-lineClamp": 2,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical"
  },
}));

const ImportantDates = () => {
  const classes = useStyles();
  const { t } = useTranslation("AgentDashboardPageTrans");
  const dispatch = useDispatch();
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("Error, Something went wrong, please try again after some time.");
  const [isFetching, setIsFetching] = React.useState(true);
  const [importantDatesList, setImpDatesData] = React.useState([]);

  /* const importantDatesList = [
    {
      title: "Project Name",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Project Name",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Project Name",
      description: "Lorem ipsum dolor sit amet",
    },
  ]; */

  useEffect(() => {
    setIsFetching(true);
    getImpDatesListDummy().then((response) => {
      if (response && response.status === 200) {
        if (response.data.result.length > 0) {
          setImpDatesData(response.data.result);
          setIsError(false);
        } else {
          setImpDatesData([]);
          setIsError(true);
        }
        setIsFetching(false);
      }
    }).catch((error) => {
      setImpDatesData([]);
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

  return (
    <div className={classes.mainRoot}>
      <AgentIconTitle
        icon={
          <Avatar className={classes.deepPurple}>
            <CalendarTodayOutlinedIcon fontSize="small" />
          </Avatar>
        }
        title={t("importantDates.title")}
        titleVariant="body1"
      />
      <div className={classes.cardContainer}>
        {isFetching && <CompLoading isOpen={isFetching} />}
        {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
        {importantDatesList.map((itemObj, index) => (
          <Box paddingTop={1} key={index} display="flex" alignItems="center">
            <Card className={classes.cardRoot} variant="outlined">
              <Box className={classes.cover}>
                <Typography variant="subtitle2" className={classes.dateText}>{moment(itemObj.date).format("MMM")}</Typography>
                <Typography variant="h5" className={classes.dateText}>{moment(itemObj.date).format("DD")}</Typography>
              </Box>
              <div className={classes.details}>
                <Typography variant="subtitle2" className={classes.shortTitle}>{itemObj.title.rendered}</Typography>
                <Typography variant="subtitle2" color="textSecondary" className={classes.shortPara}>
                  {stripHtmlTags(itemObj.content.rendered)}
                </Typography>
              </div>
            </Card>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ImportantDates;
