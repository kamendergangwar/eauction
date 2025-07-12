import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Badge, Box, Button, ButtonBase, CardActions, Chip, CircularProgress, ClickAwayListener, Divider, Grid, Paper, Popper, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import Transitions from '../Transitions/Transitions';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationSliceSelector, clearNotificationData, clearNotificationState, getNotifications, updateNotification } from '../../../redux/features/Notifications/notificationSlice';
import NotificationList from './NotificationList';


const useStyles = makeStyles((theme) => ({
  buttonBase: {
    background: "rgba(255, 255, 255, 0.02)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    color: "#fff",
    overflow: "hidden",
    '&:hover': {
      background: "rgba(0, 0, 0, 0.05)",
    },
  },
  listCon: {
    height: '100%',
    maxHeight: 'calc(100vh - 205px)',
    overflowX: 'hidden',
    "&::-webkit-scrollbar": {
      width: ".4em",
    },
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .2s ease-in-out',
    background: "rgba(255, 255, 255, 0.02)",
    color: "#fff",
    '&[aria-controls="menu-list-grow"]': {
      background: "#0038C0",
      color: "#fff",
    },
    '&:hover': {
      background: "rgba(0, 0, 0, 0.05)",
    },
  },
  shake: {
    animation: '$shakeRotate 3s infinite'
  },
  '@keyframes shakeRotate': {
    '0%, 100%': {
      transform: 'translateX(0) rotate(0deg)',
    },
    '10%, 30%, 50%, 70%, 90%': {
      transform: 'translateX(-2px) rotate(7deg)',
    },
    '20%, 40%, 60%, 80%': {
      transform: 'translateX(2px) rotate(-7deg)',
    },
  },
  paper: {
    width: 360,
    marginTop: 10,
    // padding: theme.spacing(1),
    boxShadow: theme.shadows[16],
  },
  cardActions: {
    padding: theme.spacing(1.25),
    justifyContent: 'center',
  },
  CountChip: {
    marginLeft: 16,
    color: '#ffffff',
    backgroundColor: '#ffc107',
  }
}));

const status = [
  {
    value: 'all',
    label: 'All Notification'
  },
  {
    value: 'new',
    label: 'New'
  },
  {
    value: 'unread',
    label: 'Unread'
  },
];

const NotificationSection = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [markRead, setMarkRead] = useState(false);
  const location = useLocation();
  const { isFetchingNotification,
    isSuccessNotification,
    isErrorNotification,
    notificationData,
    errorMessageNotification,
    isNewNotification,
    isNewUnreadNotification,

    isFetchingUpdateNotification,
    isSuccessUpdateNotification,
    isErrorUpdateNotification,
    updateNotificationData,
    errorMessageUpdateNotification } = useSelector(NotificationSliceSelector);

  const shouldShake = notificationData?.OtherData?.UnreadNotifications > 0;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setTimeout(() => {
      setCurrentPage(1);
      setHasMore(true);
      dispatch(clearNotificationState());
      dispatch(clearNotificationData());
      dispatch(getNotifications(1));
    }, 500);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => {
    if (event?.target.value) setValue(event?.target.value);
  };

  useEffect(() => {
    dispatch(getNotifications(currentPage));
    return () => {
      dispatch(clearNotificationState());
      dispatch(clearNotificationData());
    };
  }, [location.pathname]);



  const loadMoreNotifications = () => {
    if (notificationData.OtherData.Notifications.length > 5) {
      dispatch(getNotifications(currentPage + 1));
      setCurrentPage(prevPage => prevPage + 1);
    } else {
      setHasMore(false);
    }
  };

  const readAllNotification = () => {
    dispatch(updateNotification({ Lang: localStorage.getItem('i18nextLng'), MarkAllRead: true }));
    setMarkRead(true);
  };

  useEffect(() => {
    if (isSuccessUpdateNotification && markRead) {
      setCurrentPage(1);
      setHasMore(true);
      dispatch(clearNotificationState());
      dispatch(clearNotificationData());
      dispatch(getNotifications(1));
      setMarkRead(false);
    }
  }, [isSuccessUpdateNotification, markRead])

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          }
        }}
      >
        <Badge color="error" badgeContent={notificationData?.OtherData?.UnreadNotifications} max={99}>
          <ButtonBase className={classes.buttonBase}>
            <Avatar
              variant="rounded"
              className={`${classes.avatar}`}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              color="inherit"
            >
              <NotificationsIcon className={`${shouldShake ? classes.shake : ''}`} />
            </Avatar>
          </ButtonBase>
        </Badge>
      </Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper elevation={3} className={classes.paper}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" justifyContent="space-between" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16 }}>
                        <Grid item>
                          <Grid container spacing={2} alignItems='baseline'>
                            <Typography variant="subtitle1">All Notification</Typography>
                            {notificationData?.OtherData?.TotalNotifications ? <Chip
                              size="small"
                              label={notificationData?.OtherData?.TotalNotifications}
                              className={classes.CountChip}
                            /> : <></>}
                          </Grid>
                        </Grid>
                        {shouldShake && <Grid item>
                          {!markRead ? <Typography onClick={readAllNotification} variant="subtitle2" color="primary" style={{ fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>
                            Mark as all read ({notificationData?.OtherData?.UnreadNotifications})
                          </Typography> : <CircularProgress size={10} style={{ marginRight: 30 }} />}
                        </Grid>}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.listCon}>
                        <Grid container direction="column" spacing={2}>
                          {/* <Grid item xs={12}>
                            <Box sx={{ px: 2, pt: 0.25 }}>
                              <TextField
                                id="outlined-select-currency-native"
                                select
                                fullWidth
                                variant="outlined"
                                value={value}
                                onChange={handleChange}
                                margin="dense"
                                SelectProps={{
                                  native: true,
                                }}
                              >
                                {status.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Box>
                          </Grid> */}
                          <Grid item xs={12} p={0}>
                            <Divider sx={{ my: 0 }} />
                          </Grid>
                        </Grid>
                        <NotificationList
                          loadMoreNotifications={loadMoreNotifications}
                          hasMore={hasMore}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                  {/* {notificationData.Notifications.length > 0 && <CardActions className={classes.cardActions}>
                    <Button size="small" disableElevation color='primary'>
                      View All
                    </Button>
                  </CardActions>} */}
                </Paper>
              </ClickAwayListener>
            </>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
