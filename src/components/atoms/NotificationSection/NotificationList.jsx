import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Divider, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { NotificationSliceSelector, updateNotification } from '../../../redux/features/Notifications/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import AlertBox from '../AlertBox/AlertBox';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0
  },
  listItemWrapper: {
    cursor: 'pointer',
    padding: theme.spacing(1, 2),
    '&:hover': {
      background: '#0033f50f',
    },
  },
  listItemSecondaryAction: {
    top: theme.spacing(1),
  },
  listItemDivider: {
    my: 0,
  },
  listContainer: {
    paddingLeft: theme.spacing(7),
  },
  avatar: {
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    border: 'none',
    borderColor: theme.palette.success.main,
  },
  chip: {
    height: 24,
    padding: '0 6px',
  },
  chipError: {
    color: '#d84315',
    backgroundColor: '#fbe9e7',
    marginRight: '5px',
  },
  chipWarning: {
    color: '#ffc107',
    backgroundColor: '#fff8e1',
    marginRight: '5px',
  },
  chipSuccess: {
    color: '#00c853',
    backgroundColor: '#b9f6ca',
    marginRight: '5px',
    height: 28,
  },
  actionBtn: {
    borderRadius: 20,
    minWidth: 0
  },
  Description: {
    fontSize: '0.75rem',
    fontWeight: '400',
    color: '#697586',
  },
  noNotificationsMessage: {
    margin: theme.spacing(3, 0),
    color: theme.palette.text.secondary,
  },
  OtherMessage: {
    fontSize: "x-small",
    overflowWrap: 'break-word',
    fontWeight: 600
  }
}));

const formatTime = (createdAt) => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);

  const timeDifference = currentTime - createdTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return moment(currentTime).format('MMM D, h:mm A');
  }
};

const NotificationList = ({ loadMoreNotifications, hasMore }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);
  const [readNotifications, setReadNotifications] = useState([]);
  const [mediaLoadedMap, setMediaLoadedMap] = useState({});
  const [pendingReadNotifications, setPendingReadNotifications] = useState([]);

  const { isFetchingNotification,
    isSuccessNotification,
    isErrorNotification,
    errorMessageNotification,
    notificationData,

    isFetchingUpdateNotification,
    isSuccessUpdateNotification,
    isErrorUpdateNotification,
    updateNotificationData,
    errorMessageUpdateNotification } = useSelector(NotificationSliceSelector);

  const handleNotificationHover = (notificationId) => {
    setHoveredNotificationId(notificationId);

    const isNotificationRead = readNotifications.includes(notificationId);
    const isNotificationPending = pendingReadNotifications.includes(notificationId);
    if (!isNotificationRead && !isNotificationPending) {
      setPendingReadNotifications((prevPendingNotifications) => [...prevPendingNotifications, notificationId]);
    }
  }

  const handleNotificationLeave = () => {
    setHoveredNotificationId(null);
  };

  useEffect(() => {
    if (hoveredNotificationId !== null) {
      const hoveredNotification = notificationData.Notifications.find(item => item.NotificationId == hoveredNotificationId);

      if (hoveredNotification && hoveredNotification.IsRead == 0 && pendingReadNotifications.includes(hoveredNotification.NotificationId)) {
        dispatch(updateNotification({ Lang: localStorage.getItem('i18nextLng'), NotificationId: hoveredNotificationId }));

        setReadNotifications([...readNotifications, hoveredNotification.NotificationId]);

        setPendingReadNotifications((prevPendingNotifications) =>
          prevPendingNotifications.filter(id => id !== hoveredNotification.NotificationId)
        );
      }
    }
  }, [hoveredNotificationId, pendingReadNotifications]);



  const observer = useRef();
  const lastNotificationRef = useCallback(node => {
    if (isFetchingNotification) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreNotifications();
      }
    });
    if (node) observer.current.observe(node);
  }, [isFetchingNotification, hasMore]);

  const handleMediaLoaded = (notificationId) => {
    setMediaLoadedMap((prevMediaLoadedMap) => ({
      ...prevMediaLoadedMap,
      [notificationId]: true,
    }));
  };


  return (
    <List className={classes.list}>
      {notificationData.Notifications.length === 0 && !isFetchingNotification ? (
        <Typography variant="body1" align="center" className={classes.noNotificationsMessage}>
          No notifications to show.
        </Typography>
      ) : (
        notificationData.Notifications.map((item, index) => (
          <>
            <div
              key={item.NotificationId}
              className={classes.listItemWrapper}
              ref={index === notificationData.Notifications.length - 1 ? lastNotificationRef : null}
              onMouseEnter={() => handleNotificationHover(item.NotificationId)}
              onMouseLeave={handleNotificationLeave}
              onClick={() => {
                if (item.ActionURI) {
                  history.push(item.ActionURI);
                }
              }}
            >
              <ListItem alignItems="center" disableGutters style={{ paddingBottom: 0 }}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar} style={{ backgroundColor: (item.IsRead == 0 && !readNotifications.includes(item.NotificationId)) ? '#fbe9e7' : '' }}>
                    {(item.IsRead == 0 && !readNotifications.includes(item.NotificationId)) ? <EmailIcon stroke={1.5} size="1.3rem" style={{ color: '#d84315' }} /> : <DraftsIcon stroke={1.5} size="1.3rem" />}
                  </Avatar>
                </ListItemAvatar>
                {item.Title && <ListItemText primary={<Typography variant="subtitle2" style={{ fontWeight: 600 }}>{item.Title}</Typography>} />}
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                      <Typography variant="caption" display="block">
                        {formatTime(item.CreatedAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
              <Grid container direction="column" className={classes.listContainer}>
                {item.Description && <Grid item xs={12} style={{ paddingBottom: 12 }}>
                  <Typography variant="subtitle2" className={classes.Description}>{item.Description}</Typography>
                </Grid>}
                {item.Image && <Grid item xs={12} style={{ paddingBottom: 8 }}>
                  <CardMedia
                    style={{ borderRadius: 8 }}
                    component="img"
                    alt="Notification Image"
                    image={item.Image}
                    height="80"
                    loading="lazy"
                    title={item.Title}
                  />
                </Grid>}
                {item.OtherMessage && <Grid item xs={12} style={{ paddingBottom: 8 }}>
                  <Typography variant="subtitle2" className={classes.OtherMessage}>{item.OtherMessage}</Typography>
                </Grid>}
                <Grid item xs={12}>
                  <Grid container>
                    {item.IsRead == 0 && !readNotifications.includes(item.NotificationId) && (
                      <Grid item>
                        <Chip label="Unread" className={classes.chipError} />
                      </Grid>
                    )}
                    {item.Type == 'new' && (
                      <Grid item>
                        <Chip label="New" className={classes.chipWarning} />
                      </Grid>
                    )}
                    {item.ActionURI && (
                      <Grid item>
                        <Button size='small' color='primary' className={classes.actionBtn} variant="outlined" onClick={() => history.push(item.ActionURI)} endIcon={<LaunchIcon stroke={1.5} size="1.3rem" />}>
                          View
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <Divider />
          </>
        ))
      )}
      {/* {!hasMore && notificationData.Notifications.length > 0 && (
        <Typography variant="body1" align="center" style={{ margin: "8px, 0px" }} className={classes.noNotificationsMessage}>
          --- All notifications displayed ---
        </Typography>
      )} */}
      {/* {isFetchingNotification && hasMore && ( */}
      {isFetchingNotification && (
        <div className={classes.listItemWrapper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Skeleton animation="wave" variant="circle" width={40} height={40} />
            </Grid>
            <Grid item xs>
              <Box display="flex" flexDirection="column">
                <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="40%" />
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
      {isErrorNotification && <AlertBox severity="error">{errorMessageNotification}</AlertBox>}
    </List>
  );
};

export default NotificationList;
