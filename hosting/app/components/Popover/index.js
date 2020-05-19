import Transition from 'components/Transition';
import PopperJS from 'popper.js';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { Popup } from './styled';

const Popover = ({ anchor, children, open, ...props }) => {
  const child = useRef(null);
  const popper = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      document.addEventListener('mousedown', onClick, false);
    }
    return () => {
      document.removeEventListener('mousedown', onClick, false);
    };
  }, [props.onClose, shouldRender]);

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [open]);

  function updatePosition() {
    if (!anchor || !child.current) {
      return;
    }
    if (popper.current) {
      popper.current.destroy();
    }
    popper.current = new PopperJS(anchor, child.current, {
      modifiers: {
        offset: {
          enabled: true,
          offset: '0, 12',
        },
      },
      placement: 'bottom-start',
    });
  }

  function onClick(event) {
    if (anchor && !anchor.contains(event.target) && child.current && !child.current.contains(event.target)) {
      onClose();
    }
  }

  function onClose() {
    props.onClose();
    setShouldRender(false);
  }

  function onOpen() {
    setShouldRender(true);
  }

  return ReactDOM.createPortal(
    <Transition in={anchor && shouldRender} onIn={updatePosition} ref={child}>
      <Popup>{children}</Popup>
    </Transition>,
    document.body,
  );
};

Popover.defaultProps = {
  anchor: null,
  onClose: () => {},
  open: false,
};

Popover.propTypes = {
  anchor: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Popover;
