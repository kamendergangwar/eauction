// ThreeminTimer.js

import { Paper, Typography, makeStyles } from "@material-ui/core";

import React, { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";

const ThreeminTimer = ({ reset }) => {
  const initialSeconds = 3 * 60; // 3 minutes in seconds
  const [seconds, setSeconds] = useState(initialSeconds);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (reset) {
      setSeconds(initialSeconds);
      setExpired(false);
    }
  }, [reset, initialSeconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <Container>
      {expired ? (
        <ExpiredNotice/> 
      ) : (
        <>
         {/* <Typography variant='h6' fontWeight="600" margin="3px"> Extended Bid Time Closing in   </Typography> */}
          <TimerText>
            {String(minutes).padStart(2, "0")}:
            {String(remainingSeconds).padStart(2, "0")}
          </TimerText>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const timerAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const TimerText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  animation: ${timerAnimation} 1s infinite;
`;

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
      padding: '0.5rem',
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
      border: '2px solid #333',
      borderRadius: '0.25rem',
      padding: '0.5rem',
      backgroundColor : "#f0f0f0",
      animation: '$scaleAnimation 1s ease-in-out infinite',
    },
  
    '@keyframes scaleAnimation': {
      '0%': {
        transform: 'scale(1)',
      },
      '50%': {
        transform: 'scale(1.1)',
      },
      '100%': {
        transform: 'scale(1)',
      },
    },
  }));
const ExpiredNotice = () => {
    const classes = useStyles();
  
    return (
      <Paper elevation={3} className={`${classes.expiredNotice} ${classes.fadeIn}`}>
       {/* <Paper elevation={3} className={classes.expiredNotice}> */}
        <Typography variant="h6" className={classes.expiredNoticeText}>
          Expired!!!
        </Typography>
        <Typography className={classes.expiredNoticeMessage}>
          Bidding Close For This Project.
        </Typography>
      </Paper>
    );
  };
export default ThreeminTimer;


