import Icon from 'components/Icon';
import Popover from 'components/Popover';
import Label from 'components/Typography/Label';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { eraserSVG } from './constants';
import { Button, Option, Picker, Preview } from './styled';

const ToolPicker = ({ onSelect, value }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const tools = [
    { iconComponent: eraserSVG, label: 'Eraser', value: 'eraser' },
    { icon: 'edit', label: 'Pen', value: 'pen' },
  ];

  const { icon, iconComponent, label } = tools.find(tool => tool.value === value);

  const onClick = tool => {
    onSelect(tool.value);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)} ref={ref}>
        <Preview>
          <Icon>{icon || iconComponent}</Icon>
        </Preview>
        {label}
      </Button>
      <Popover anchor={ref.current} open={open} onClose={() => setOpen(false)}>
        <Picker>
          <Label>Tools</Label>
          {tools.map(tool => (
            <Option key={tool.value} onClick={() => onClick(tool)}>
              <Icon>{tool.icon || tool.iconComponent}</Icon>
              {tool.label}
            </Option>
          ))}
        </Picker>
      </Popover>
    </React.Fragment>
  );
};

ToolPicker.propTypes = {
  onSelect: PropTypes.func,
  value: PropTypes.string,
};

export default ToolPicker;
