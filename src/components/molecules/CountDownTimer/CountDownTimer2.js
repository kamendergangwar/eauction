import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useCountdown2 } from './hooks/useCountDown2';

const useStyles = makeStyles((theme) => ({
    expiredNotice: {
        textAlign: 'center',
        padding: '2rem',
        border: '1px solid #ebebeb',
        borderRadius: '0.25rem',
        margin: '0.5rem',
    },
    expiredNoticeText: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: 'red',
    },
    expiredNoticeMessage: {
        fontSize: '1.5rem',
    },
    showCounter: {
        // padding: '0.5rem',
    },
    textStyle: {
        fontWeight: 600,
        fontSize: 12,
        lineHeight: 1
    },
    countdownLink: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        padding: '0.5rem',
        border: '1px solid #ebebeb',
        borderRadius: '0.25rem',
        textDecoration: 'none',
        color: '#000',
    },
    countdown: {
        lineHeight: '1.25rem',
        padding: '0 0.75rem 0 0.75rem',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    danger: {
        color: '#ff0000',
    },
    countdownText: {
        margin: 0,
    },
    countdownType: {
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        lineHeight: '1rem',
    },
    showCounterWrapper: {
        border: '2px solid blue',
        borderRadius: '0.25rem',
        // padding: '0.5rem',
    },
}));

const ExpiredNotice = () => {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.expiredNotice}>
            <Typography variant="h6" className={classes.expiredNoticeText}>
                Times Up!!!
            </Typography>
            <Typography className={classes.expiredNoticeMessage}>
                Bidding Close For This Project.
            </Typography>
        </Paper>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1} alignItems="center" className={classes.showCounter}>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography className={classes.textStyle}>{days}</Typography>
                <Typography className={classes.textStyle}>Days</Typography>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography className={classes.textStyle}>:</Typography>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography className={classes.textStyle}>{hours}</Typography>
                <Typography className={classes.textStyle}>Hours</Typography>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography className={classes.textStyle}>:</Typography>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography className={classes.textStyle}>{minutes}</Typography>
                <Typography className={classes.textStyle}>Mins</Typography>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography className={classes.textStyle}>:</Typography>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography className={classes.textStyle}>{seconds}</Typography>
                <Typography className={classes.textStyle}>Seconds</Typography>
            </Grid>
        </Grid>
    );
};


export default function CountdownTimer2({ targetDate }) {
    const classes = useStyles();
    const [days, hours, minutes, seconds] = useCountdown2(targetDate);
    if (days + hours + minutes + seconds >= 0) {


    return (
        <>
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        </>
    );}
    else

        return(

            <>
                <ShowCounter
                    days={0}
                    hours={0}
                    minutes={0}
                    seconds={0}
                />
            </>
        )
        // <ExpiredNotice />;

};

