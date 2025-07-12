import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import CompLoading from "../../../atoms/Loading/CompLoading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import {
  getNotificationsList,
  notificationsSelector,
  getNotificationsListDummy,
  getNotificationForDashboard
} from "../../../../redux/features/dashboard/NotificationsSlice";

const useStyles = makeStyles((theme) => ({
  mainroot: {
    padding: theme.spacing(1),
    position: "relative",
  },
  yellow: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.getContrastText(yellow[200]),
    backgroundColor: yellow[200],
  },
  listContainer: {
    overflow: "auto",
    [theme.breakpoints.between("sm", "md")]: {
      height: 350,
    },
  },
  listroot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Notifications = () => {
  const classes = useStyles();
  const { t } = useTranslation("AgentDashboardPageTrans");
  const dispatch = useDispatch();
  const [notificationsData, setNotificationsData] = React.useState([]);
  const [notificationsDataForDashBoard, setNotificationsDataForDashboard] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [isErrorForDashboard, setIsErrorForDashboard] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    "Error, Something went wrong, please try again after some time."
  );
  const [errorMessageForDashborad, setErrorMessageForDashboard] = React.useState(
    "Error, Something went wrong, please try again after some time."
  );
  const [isFetching, setIsFetching] = React.useState(true);
  // const {notificationsData, isFetching, isSuccess, isError, errorMessage } = useSelector(notificationsSelector);

  /* useEffect(() => {
    dispatch(getNotificationsList());
    console.log("latestNewsData", latestNewsData);
  }, [dispatch]); */



  useEffect(() => {
    setIsFetching(true);
    getNotificationsListDummy()
      .then((response) => {
        console.log("response anas", response);
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
            var get_final_data = resultData
              .reduce(function (res, currentValue) {
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
  }, [t]);

  useEffect(() => {
    setIsFetching(true);
    getNotificationForDashboard()
      .then((response) => {
        console.log("response anas", response);
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
            var get_final_data = resultData
              .reduce(function (res, currentValue) {
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
            setNotificationsDataForDashboard(get_final_data);
            setIsErrorForDashboard(false);
          } else {
            setNotificationsDataForDashboard([]);
            setIsErrorForDashboard(true);
            setErrorMessageForDashboard(t("notifications.noData"));
          }
          setIsFetching(false);
        }
      })
      .catch((error) => {
        setNotificationsDataForDashboard([]);
        setIsFetching(false);
        setIsErrorForDashboard(true);
      });
  }, [t]);

  return (
    <div className={classes.mainroot}>
      <AgentIconTitle
        icon={
          <Avatar className={classes.yellow}>
            <NotificationsActiveOutlinedIcon fontSize="small" />
          </Avatar>
        }
        title={t("notifications.title")}
        titleVariant="body1"
      />
      <div className={classes.listContainer}>
        {isFetching && <CompLoading isOpen={isFetching} />}
        {isErrorForDashboard && <AlertBox severity="error">{errorMessageForDashborad}</AlertBox>}
        <List className={classes.listroot}>
          {notificationsDataForDashBoard.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Typography component="span" variant="body2">
                  {item.formattedDate}
                </Typography>
              </ListItem>
              {item.subList.map((inner_item, inner_indx) => (
                <React.Fragment key={inner_indx}>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2">
                            {inner_item.SubjectLine || "--"}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="subtitle2">
                            {inner_item.MsgBody || "--"}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Notifications;
