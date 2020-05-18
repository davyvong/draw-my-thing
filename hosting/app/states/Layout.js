import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const LayoutContext = React.createContext({});

export const LayoutConsumer = LayoutContext.Consumer;

export const LayoutProvider = ({ children }) => {
  const [mobile, setMobile] = useState(window.innerWidth <= 1024);
  const timeout = useRef(null);
  const width = useRef(window.innerWidth);

  const onResize = () => {
    if (timeout.current) {
      window.cancelAnimationFrame(timeout.current);
    }
    if (width.current === window.innerWidth) {
      return;
    }
    width.current = window.innerWidth;
    timeout.current = window.requestAnimationFrame(() => {
      if (mobile && window.innerWidth > 1024) {
        setMobile(false);
      } else if (!mobile && window.innerWidth <= 1024) {
        setMobile(true);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('orientationchange', onResize, false);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('orientationchange', onResize, false);
      window.removeEventListener('resize', onResize);
    };
  }, [mobile]);

  const state = { mobile };

  return <LayoutContext.Provider value={state}>{children}</LayoutContext.Provider>;
};

LayoutProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default LayoutContext;
