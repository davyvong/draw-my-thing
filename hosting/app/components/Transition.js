import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const Transition = React.forwardRef(({ children, delay, duration, onIn, onOut, ...props }, ref) => {
  const transition = useRef(null);
  const [opacity, setOpacity] = useState(props.in ? 1 : 0);
  const [shouldRender, setShouldRender] = useState(props.in);

  useEffect(() => {
    if (props.in) {
      transitionIn();
    } else {
      transitionOut();
    }
  }, [props.in]);

  useEffect(() => {
    if (shouldRender) {
      if (isFunction(onIn)) {
        onIn(ref);
      }
    } else if (isFunction(onOut)) {
      onOut(ref);
    }
  }, [shouldRender]);

  function transitionIn() {
    if (transition.current) {
      clearTimeout(transition.current);
      transition.current = null;
    }
    setShouldRender(true);
    setTimeout(() => {
      setOpacity(1);
    }, delay);
  }

  function transitionOut() {
    setOpacity(0);
    transition.current = setTimeout(() => {
      setShouldRender(false);
    }, duration);
  }

  if (!shouldRender) {
    return null;
  }

  return React.cloneElement(children, {
    ...children.props,
    ref,
    style: {
      opacity,
      transition: `opacity ${duration}ms ease-in-out`,
    },
  });
});

Transition.defaultProps = {
  delay: 50,
  duration: 100,
  in: false,
};

Transition.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  in: PropTypes.bool,
  onIn: PropTypes.func,
  onOut: PropTypes.func,
};

export default Transition;
