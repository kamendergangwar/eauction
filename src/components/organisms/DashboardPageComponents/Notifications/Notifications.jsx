import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
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
import {
  getNotificationsList,
  notificationsSelector,
  getNotificationsListDummy,
} from "../../../../redux/features/dashboard/NotificationsSlice";

const boxShadow = "0px 4px 20px rgba(0, 56, 192, 0.1)";
const useStyles = makeStyles((theme) => ({
  mainRoot: {
    backgroundColor: "#FFFFFF",
    boxShadow: boxShadow,
    borderRadius: 10,
    padding: theme.spacing(2),
    position: "relative",
    minHeight: "344px"
  },
  listContainer: {
    marginTop: theme.spacing(2)
  },
  listRoot: {
    padding: 0
  },
  listItemBox: {
    borderBottom: "1px solid #EEEEEE",
    padding: theme.spacing(2, 0.5),
    "&:first-child": {
      paddingTop: 0,
    },
    /* "&:last-child": {
      borderBottom: 0,
      paddingBottom: 0,
    }, */
    "& .MuiListItemText-root": {
      margin: 0,
      paddingLeft: theme.spacing(3),
      position: "relative",
      "&:before": {
        backgroundColor: "#FF3351",
        borderRadius: "50%",
        content: "''",
        position: "absolute",
        width: 6,
        height: 6,
        left: 5,
        top: 10
      },
    },
    "& .MuiTypography-body1": {
      color: "#0F2940",
      fontSize: "0.8rem",
      marginBottom: theme.spacing(2)
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "#4C5D6C",
      fontSize: "0.7rem",
      textAlign: "right",
    }
  },
  viewAllSec: {
    paddingTop: theme.spacing(2),
    textAlign: "center"
  }
}));

const Notifications = () => {
  const classes = useStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [notificationsData, setNotificationsData] = React.useState([{
    notification: "The Appplication for Taloja Scheme will close in 5 days",
    date: "Today at 11:30 PM"
  }, {
    notification: "The Appplication for Taloja Scheme will close in 5 days",
    date: "Today at 11:30 PM"
  }, {
    notification: "The Appplication for Taloja Scheme will close in 5 days",
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

  useEffect(() => {
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
            /* var resultData2 = resultData;
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
              }); */
            setNotificationsData(resultData);
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
  }, [t]);

  return (
    <div className={classes.mainRoot}>
      <IconTitle
        icon={<NotificationsIcon fontSize="large" />}
        title={t("notifications.title")}
        titleVariant="body1"
      />
      <div className={classes.listContainer}>
        {isFetching && <CompLoading isOpen={isFetching} />}
        {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
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
        {notificationsData.length > 0 && (<Box className={classes.viewAllSec}>
          <Button color="primary" onClick={() => history.push("/view-all-notification")}>{t("notifications.viewAll")}</Button>
        </Box>)}
      </div>
    </div>
  );
};

export default Notifications;
