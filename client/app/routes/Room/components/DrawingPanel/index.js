import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React from 'react';
import colors from 'styles/colors';

import ColorPicker from './components/ColorPicker';
import WidthPicker from './components/WidthPicker';
import { Canvas, Controls, Wrapper } from './styled';

class DrawingPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: false };

    this.canvas = React.createRef();
    this.imageHeight = 0;
    this.imageWidth = 0;

    this.isDrawing = false;
    this.linesToUpload = [];

    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    this.drawLine = this.drawLine.bind(this);
    this.onCanvasResize = debounce(this.onCanvasResize.bind(this), 500);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    if (this.canvas.current) {
      this.ctx = this.canvas.current.getContext('2d');
      this.onCanvasResize();
    }
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
    if (this.windowHeight === window.innerHeight && this.windowWidth === window.innerWidth) {
      return;
    }
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.animationFrame = window.requestAnimationFrame(this.onCanvasResize);
  }

  onCanvasResize() {
    if (this.canvas.current) {
      const canvasOffset = this.canvas.current.getBoundingClientRect();
      const width = Math.min(Math.floor(window.innerWidth - canvasOffset.left * 5 - 2) * 0.65, 976);
      const height = Math.floor(width * 0.5625 + 16);

      this.imageHeight = Math.max(this.imageHeight, height);
      this.imageWidth = Math.max(this.imageWidth, width);
      this.imageData = this.ctx.getImageData(0, 0, this.imageWidth, this.imageHeight);
      this.canvas.current.height = height;
      this.canvas.current.width = width;
      this.ctx.putImageData(this.imageData, 0, 0);
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.lineWidth = 5;
    }
    if (!this.state.visible) {
      this.setState({ visible: true });
    }
  }

  onMouseDown({ nativeEvent, preventDefault }) {
    if (this.props.disabled) {
      preventDefault();
    }
    const { offsetX, offsetY } = nativeEvent;
    this.isDrawing = true;
    this.lineStart = { offsetX, offsetY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isDrawing) {
      const { offsetX, offsetY } = nativeEvent;
      const lineData = {
        start: this.lineStart,
        stop: { offsetX, offsetY },
      };
      this.linesToUpload = this.linesToUpload.concat(lineData);
      this.drawLine(lineData.start, lineData.stop, this.props.strokeColor);
    }
  }

  onMouseUp() {
    this.isDrawing = false;
    this.uploadLines();
  }

  drawLine(startOffset, stopOffset, strokeColor, strokeWidth) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeColor || this.props.strokeColor;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = strokeWidth || this.props.strokeWidth;
    this.ctx.moveTo(startOffset.offsetX, startOffset.offsetY);
    this.ctx.lineTo(stopOffset.offsetX, stopOffset.offsetY);
    this.ctx.stroke();
    this.lineStart = stopOffset;
  }

  uploadLines() {
    if (this.linesToUpload.length > 0) {
      const lineData = this.linesToUpload;
      this.linesToUpload = [];
      const { strokeColor, strokeWidth } = this.props;
      this.props.uploadLines({
        lines: lineData,
        strokeColor,
        strokeWidth,
      });
    }
  }

  render() {
    const { disabled, strokeColor, strokeWidth, updateStrokeColor, updateStrokeWidth } = this.props;
    const { visible } = this.state;
    return (
      <Wrapper>
        <Canvas
          disabled={disabled}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          ref={this.canvas}
          style={visible ? { backgroundColor: colors.gainsboro } : {}}
        />
        <Controls>
          <ColorPicker onSelect={updateStrokeColor} value={strokeColor} />
          <WidthPicker onSelect={updateStrokeWidth} value={strokeWidth} />
        </Controls>
      </Wrapper>
    );
  }
}

DrawingPanel.defaultProps = {
  disabled: true,
  strokeColor: '#EE92C2',
  strokeWidth: 5,
};

DrawingPanel.propTypes = {
  disabled: PropTypes.bool,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  updateStrokeColor: PropTypes.func.isRequired,
  updateStrokeWidth: PropTypes.func.isRequired,
  uploadLines: PropTypes.func.isRequired,
};

export default DrawingPanel;
