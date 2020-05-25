import Popover from 'components/Popover';
import Label from 'components/Typography/Label';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { CirclePicker } from 'react-color';

import { Button, Picker, Preview } from './styled';

const ColorPicker = ({ disabled, onSelect, value }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Button disabled={disabled} onClick={() => setOpen(true)} ref={ref}>
        <Preview color={value} />
        {String(value).toUpperCase()}
      </Button>
      <Popover anchor={ref.current} open={open} onClose={() => setOpen(false)}>
        <Picker>
          <Label>Stroke Color</Label>
          <CirclePicker
            circleSize={32}
            circleSpacing={12}
            color={value}
            onChange={color => {
              onSelect(color.hex);
              setOpen(false);
            }}
            triangle={false}
            width={268}
          />
        </Picker>
      </Popover>
    </React.Fragment>
  );
};

ColorPicker.defaultProps = {
  disabled: false,
};

ColorPicker.propTypes = {
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  value: PropTypes.string,
};

export default ColorPicker;
