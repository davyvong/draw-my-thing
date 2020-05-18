import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React from 'react';

import { Canvas, Wrapper } from './styled';

class DrawingPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.imageHeight = 0;
    this.imageWidth = 0;

    this.isDrawing = false;
    this.lines = [];
    this.prevPost = { offsetX: 0, offsetY: 0 };

    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

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
      const width = window.innerWidth - canvasOffset.left - 300;
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
  }

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isDrawing = true;
    this.prevPos = { offsetX, offsetY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isDrawing) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.lines = this.lines.concat(positionData);
      this.drawPath(this.prevPos, offSetData, this.props.strokeStyle);
    }
  }

  onMouseUp() {
    if (this.isDrawing) {
      this.isDrawing = false;
      // this.sendPaintData();
    }
  }

  drawPath(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  render() {
    return (
      <Wrapper>
        <Canvas
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          ref={this.canvas}
        />
      </Wrapper>
    );
  }
}

DrawingPanel.defaultProps = {
  strokeStyle: '#EE92C2',
};

DrawingPanel.propTypes = {
  strokeStyle: PropTypes.string,
};

export default DrawingPanel;
