import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Title } from './styled';

const CountdownTimer = ({ endTime }) => {
  const [timer, setTimer] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (endTime) {
        const endMoment = moment.unix(endTime);
        const difference = endMoment.diff(moment(), 'seconds');
        setTimer(difference > -1 ? difference : 0);
      }
    });
    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  if (!endTime) {
    return null;
  }
  return <Title>Time Remaining: {String(timer)}</Title>;
};

CountdownTimer.propTypes = {
  endTime: PropTypes.number,
};

export default CountdownTimer;
