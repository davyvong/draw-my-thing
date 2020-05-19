import PropTypes from 'prop-types';
import React from 'react';

import { Bouncer, Spinner } from './styled';

const Loading = ({ color, size }) => (
  <Spinner>
    <Bouncer color={color} delay="-0.32s" size={size} />
    <Bouncer color={color} delay="-0.16s" size={size} />
    <Bouncer color={color} size={size} />
  </Spinner>
);

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default Loading;
