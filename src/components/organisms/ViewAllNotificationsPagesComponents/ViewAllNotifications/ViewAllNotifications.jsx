import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { NotificationsIcon } from "../../../atoms/SvgIcons/SvgIcons";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import CompLoading from "../../../atoms/Loading/CompLoading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { ViewAllNotificationsStyles } from "./ViewAllNotifications.styles";
import {
  getNotificationsList,
  notificationsSelector,
  getNotificationsListDummy,
} from "../../../../redux/features/dashboard/NotificationsSlice";

const ViewAllNotifications = () => {
  const classes = ViewAllNotificationsStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [notificationsData, setNotificationsData] = React.useState([{
    notification: "Your Application Number #123456 was rejected due to submission of Wrong Documents.",
    date: "Today at 11:30 PM"
  }, {
    notification: "Your Application Number #123456 was rejected due to submission of Wrong Documents.",
    date: "Today at 11:30 PM"
  }, {
    notification: "Your Application Number #123456 was rejected due to submission of Wrong Documents.",
    date: "Today at 11:30 PM"
  }]);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    "Error, Something went wrong, please try again after some time."
  );
  const [isFetching, setIsFetching] = React.useState(false);
  // const {notificationsData, isFetching, isSuccess, isError, errorMessage } = useSelector(notificationsSelector);

  /* useEffect(() => {
    dispatch(getNotificationsList());
    console.log("latestNewsData", latestNewsData);
  }, [dispatch]); */

  /* useEffect(() => {
    setIsFetching(true);
    getNotificationsListDummy()
      .then((response) => {
        if (response && response.status === 200) {
          if (response.data.data.data.length > 0) {
            var res_data = response.data.data.data;
            var resultData = [];
            for (let f = 0; f < res_data.length; f++) {
              const element = res_data[f];
              element.formattedDate = moment(element.date).format(
                "DD-MMM-YYYY"
              );
              resultData.push(element);
            }
            var resultData2 = resultData;
            var get_final_data = resultData.reduce(function (res, currentValue) {
                if (res.indexOf(currentValue.formattedDate) === -1) {
                  res.push(currentValue.formattedDate);
                }
                return res;
              }, [])
              .map(function (value) {
                return {
                  formattedDate: value,
                  subList: resultData2
                    .filter(function (_el) {
                      return _el.formattedDate === value;
                    })
                    .map(function (_el) {
                      return _el;
                    }),
                };
              });
            setNotificationsData(get_final_data);
            setIsError(false);
          } else {
            setNotificationsData([]);
            setIsError(true);
            setErrorMessage(t("notifications.noData"));
          }
          setIsFetching(false);
        }
      })
      .catch((error) => {
        setNotificationsData([]);
        setIsFetching(false);
        setIsError(true);
      });
  }, [t]); */

  return (
    <div className={classes.mainRoot}>
      <IconTitle
        icon={<NotificationsIcon fontSize="large" />}
        title={t("notifications.title")}
        titleVariant="body1"
      />
      <IconButton
        aria-label="close"
        onClick={() => history.push("/dashboard")}
        className={classes.closeButton}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <div className={classes.listContainer}>
        {isFetching && <CompLoading isOpen={isFetching} />}
        {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
        <Box className={classes.notifyContainer}>
          <Typography className={classes.notiGroupTtitle}>{t("notifications.todayLabel")}</Typography>
          <List className={classes.listRoot}>
            {notificationsData.map((item, index) => (
              <ListItem key={index} className={classes.listItemBox}>
                <ListItemText
                  primary={item.notification || "--"}
                  secondary={item.date || "--"}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className={classes.notifyContainer}>
          <Typography className={classes.notiGroupTtitle}>{t("notifications.earlierLabel")}</Typography>
          <List className={classes.listRoot}>
            {notificationsData.map((item, index) => (
              <ListItem key={index} className={`${classes.listItemBox} earlier`}>
                <ListItemText
                  primary={item.notification || "--"}
                  secondary={item.date || "--"}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </div>
  );
};

export default ViewAllNotifications;
