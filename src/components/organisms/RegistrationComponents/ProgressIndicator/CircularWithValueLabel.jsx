import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, CircularProgress } from '@material-ui/core';

function CircularProgressWithLabel(props) {
  return (
    <Box style={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ activeStep, totalSteps }) {
  console.log(activeStep,"sctuivbef",totalSteps);
  const calculateProgress = () => {
    if (activeStep === 1 && totalSteps === 5) {
      return 0;
    } else {
      return (activeStep / totalSteps) * 100;
    }
  };

  const [progress, setProgress] = React.useState(calculateProgress());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(calculateProgress());
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, [activeStep, totalSteps]);

  return <CircularProgressWithLabel value={progress} />;
}
