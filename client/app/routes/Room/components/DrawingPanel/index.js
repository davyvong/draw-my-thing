import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React from 'react';
import colors from 'styles/colors';

import { Canvas, Wrapper } from './styled';

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
      const width = window.innerWidth - canvasOffset.left - 348;
      const height = Math.floor(width / 1.6);

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
      this.drawLine(lineData.start, lineData.stop, this.props.strokeStyle);
    }
  }

  onMouseUp() {
    this.isDrawing = false;
    this.uploadLines();
  }

  drawLine(startOffset, stopOffset, strokeStyle) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(startOffset.offsetX, startOffset.offsetY);
    this.ctx.lineTo(stopOffset.offsetX, stopOffset.offsetY);
    this.ctx.stroke();
    this.lineStart = stopOffset;
  }

  uploadLines() {
    if (this.linesToUpload.length > 0) {
      const lineData = this.linesToUpload;
      this.linesToUpload = [];
      this.props.uploadLines(lineData);
    }
  }

  render() {
    const { disabled } = this.props;
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
      </Wrapper>
    );
  }
}

DrawingPanel.defaultProps = {
  disabled: true,
  strokeStyle: '#EE92C2',
};

DrawingPanel.propTypes = {
  disabled: PropTypes.bool,
  strokeStyle: PropTypes.string,
  uploadLines: PropTypes.func.isRequired,
};

export default DrawingPanel;
