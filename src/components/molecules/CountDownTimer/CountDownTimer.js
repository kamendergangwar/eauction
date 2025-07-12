// import React, { useEffect } from 'react';
// import { Typography, Grid, Paper } from '@material-ui/core';
// import { useCountdown } from './hooks/useCountDown';
// import { makeStyles } from '@material-ui/core/styles';
// import { extend } from 'lodash';


// const useStyles = makeStyles((theme) => ({
//   expiredNotice: {
//     textAlign: 'center',
//     padding: '2rem',
//     border: '1px solid #ebebeb',
//     borderRadius: '0.25rem',
//     margin: '0.5rem',
//   },
//   expiredNoticeText: {
//     fontSize: '2.5rem',
//     fontWeight: 'bold',
//     color: 'red',
//   },
//   expiredNoticeMessage: {
//     fontSize: '1.5rem',
//   },
//   showCounter: {
//     padding: '0.5rem',
//   },
//   countdownLink: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontWeight: 700,
//     fontSize: '1.25rem',
//     lineHeight: '1.75rem',
//     padding: '0.5rem',
//     border: '1px solid #ebebeb',
//     borderRadius: '0.25rem',
//     textDecoration: 'none',
//     color: '#000',
//   },
//   countdown: {
//     lineHeight: '1.25rem',
//     padding: '0 0.75rem 0 0.75rem',
//     alignItems: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   danger: {
//     color: '#ff0000',
//   },
//   countdownText: {
//     margin: 0,
//   },
//   countdownType: {
//     textTransform: 'uppercase',
//     fontSize: '0.75rem',
//     lineHeight: '1rem',
//   },
//   showCounterWrapper: {
//     border: '2px solid #333',
//     borderRadius: '0.25rem',
//     padding: '0.5rem',
//     backgroundColor: "#f0f0f0",
//     // animation: '$scaleAnimation 1s ease-in-out infinite',
//   },

//   '@keyframes scaleAnimation': {
//     '0%': {
//       transform: 'scale(1)',
//     },
//     '50%': {
//       transform: 'scale(1.1)',
//     },
//     '100%': {
//       transform: 'scale(1)',
//     },
//   },
// }));

// const ExpiredNotice = () => {
//   const classes = useStyles();

//   return (
//     // <Paper elevation={3} className={`${classes.expiredNotice} ${classes.fadeIn}`}>
//     <Paper elevation={3} className={classes.expiredNotice}>
//       <Typography variant="h6" className={classes.expiredNoticeText}>
//         Closed!!!
//       </Typography>
//       <Typography className={classes.expiredNoticeMessage}>
//         Bidding Close For This Project.
//       </Typography>
//     </Paper>
//   );
// };

// const ShowCounter = ({ days, hours, minutes, seconds }) => {
//   const classes = useStyles();
//   return (
//     // <Paper elevation={3} className={`${classes.showCounterWrapper} show-counter ${classes.fadeIn}`}>
//     <Paper elevation={3} className={`${classes.showCounterWrapper} show-counter`}>
//       <Grid container spacing={1} alignItems="center" justifyContent='center' className={classes.showCounter}>
//         <Grid item style={{ textAlign: 'center' }}>
//           <Typography variant="h4">{days}</Typography>
//           <Typography>Days</Typography>
//         </Grid>
//         <Grid item style={{ textAlign: 'center' }}>
//           <Typography>:</Typography>
//         </Grid>
//         <Grid item style={{ textAlign: 'center' }}>
//           <Typography variant="h4">{hours}</Typography>
//           <Typography>Hours</Typography>
//         </Grid>
//         <Grid item style={{ textAlign: 'center' }}>
//           <Typography>:</Typography>
//         </Grid>
//         <Grid item style={{ textAlign: 'center' }}>
//           <Typography variant="h4">{minutes}</Typography>
//           <Typography>Mins</Typography>
//         </Grid>
//         <Grid item style={{ textAlign: 'center' }}>
//           <Typography>:</Typography>
//         </Grid>
//         <Grid item style={{ textAlign: 'center' }}>
//           <Typography variant="h4">{seconds}</Typography>
//           <Typography>Seconds</Typography>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };


// export default function CountdownTimer({ targetDate, onTimerEnd, isExtended, onBidClose ,serverTime }) {

//   const [days, hours, minutes, seconds] = useCountdown(targetDate,serverTime);
 
//   useEffect(() => {
//     if (days + hours + minutes + seconds <= 0) {
//       // Call the callback function when the timer reaches 0
//       if (onTimerEnd && typeof onTimerEnd === 'function') {
//         onTimerEnd();

//       }
//     }
//   }, [days, hours, minutes, seconds, onTimerEnd,]);


//   if (days + hours + minutes + seconds >= 0) {
//     return (<>
//       {/* <Typography variant='h6' fontWeight="600" margin="3px"> Bidding Will Close in   </Typography> */}
//       <Typography variant='h6' fontWeight="600" margin="3px">
//         {isExtended ? "" : "Bidding Will Close in"}
//       </Typography>
//       <ShowCounter
//         days={days}
//         hours={hours}
//         minutes={minutes}
//         seconds={seconds}
//       />
//     </>
//     );

//   } else {
//     if (onBidClose && typeof onBidClose === 'function') {
//       onBidClose();
//     }

//     return <ExpiredNotice />;
//   }
// };



import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    padding: '0 0.75rem',
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
    backgroundColor: "#f0f0f0",
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
    <Paper elevation={3} className={classes.expiredNotice}>
      <Typography variant="h6" className={classes.expiredNoticeText}>
        Closed!!!
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
    <Paper elevation={3} className={`${classes.showCounterWrapper} show-counter`}>
      <Grid container spacing={1} alignItems="center" justifyContent='center' className={classes.showCounter}>
        {[{ label: 'Days', value: days }, { label: 'Hours', value: hours }, { label: 'Mins', value: minutes }, { label: 'Seconds', value: seconds }]
          .map((item, index) => (
            <React.Fragment key={item.label}>
              {index > 0 && (
                <Grid item style={{ textAlign: 'center' }}>
                  <Typography>:</Typography>
                </Grid>
              )}
              <Grid item style={{ textAlign: 'center' }}>
                <Typography variant="h4">{item.value}</Typography>
                <Typography>{item.label}</Typography>
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </Paper>
  );
};

const parseTimeString = (timeString) => {
  if (!timeString || typeof timeString !== 'string') {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const [days, hours, minutes, seconds] = timeString.split(':').map(Number);
  return { days: days || 0, hours: hours || 0, minutes: minutes || 0, seconds: seconds || 0 };
};

export default function CountdownTimer({ apiResponse, isExtended }) {
  const time = parseTimeString(apiResponse);
  console.log(apiResponse,"insidecounter");
  const { days, hours, minutes, seconds } = time;

  return (
    <>
      <Typography variant='h6' fontWeight="600" margin="3px">
        {isExtended ? "" : "Bidding Will Close in"}
      </Typography>
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </>
  );
}
