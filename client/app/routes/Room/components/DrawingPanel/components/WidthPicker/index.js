import Popover from 'components/Popover';
import Tooltip from 'components/Tooltip';
import Label from 'components/Typography/Label';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { Button, Line, Option, Picker, Preview } from './styled';

const WidthPicker = ({ onSelect, value }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const sizes = [
    { label: 'Extra Small', value: 3 },
    { label: 'Small', value: 5 },
    { label: 'Regular', value: 7 },
    { label: 'Medium', value: 9 },
    { label: 'Large', value: 11 },
  ];
  const { label } = sizes.find(size => size.value === value);
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)} ref={ref}>
        <Preview>
          <Line size={value} />
        </Preview>
        {label}
      </Button>
      <Popover anchor={ref.current} open={open} onClose={() => setOpen(false)}>
        <Picker>
          <Label>Stroke Width</Label>
          {sizes.map(size => (
            <Tooltip message={size.label}>
              <Option
                key={size.value}
                onClick={() => {
                  onSelect(size.value);
                  setOpen(false);
                }}
                selected={size.value === value}
              >
                <Line size={size.value} />
              </Option>
            </Tooltip>
          ))}
        </Picker>
      </Popover>
    </React.Fragment>
  );
};

WidthPicker.propTypes = {
  onSelect: PropTypes.func,
  value: PropTypes.number,
};

export default WidthPicker;
