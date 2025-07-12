import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationSliceSelector, clearNotificationOverlay } from '../../../redux/features/Notifications/notificationSlice';

const useStyles = makeStyles((theme) => ({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        transformOrigin: 'top right',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        borderRadius: '43% 0 42% 50%',
        padding: 16,
        transition: 'transform 0.3s ease-in-out',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 10,
        width: 250,
        height: 165
    },
    visible: {
        opacity: 1,
        pointerEvents: 'auto',
    },
    animateIn: {
        transform: 'scale(1)',
    },
    animateOut: {
        transform: 'scale(0)',
    },
    overlayContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const NotificationOverlay = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isNewNotification, showOverlay } = useSelector(NotificationSliceSelector);

    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (isNewNotification) {
            setAnimationClass(classes.animateIn);
        }
    }, [isNewNotification, classes.animateIn]);

    const handleCloseOverlay = () => {
        setAnimationClass(classes.animateOut);
        setTimeout(() => {
            dispatch(clearNotificationOverlay());
        }, 300);
    };

    return (
        <div className={`${classes.overlay} ${isNewNotification ? classes.visible : ''} ${animationClass}`}>
            <div className={classes.overlayContent}>
                <p>New notification received!</p>
                <Button onClick={handleCloseOverlay}>Got it</Button>
            </div>
        </div>
    );
};

export default NotificationOverlay;
