import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React, { createRef } from 'react';
import colors from 'styles/colors';
import hexToRGB from 'utils/hexToRGB';

import ColorPicker from './components/ColorPicker';
import StartGameOverlay from './components/GameStartOverlay';
import ToolPicker from './components/ToolPicker';
import WidthPicker from './components/WidthPicker';
import { Canvas, Controls, Wrapper } from './styled';

class DrawingPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { visible: false };

    this.canvas = createRef();
    this.bufferCanvas = createRef();

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
      const prevHeight = this.canvas.current.height;
      const prevWidth = this.canvas.current.width;

      const canvasOffset = this.canvas.current.getBoundingClientRect();
      const nextWidth = Math.min(Math.floor(window.innerWidth - canvasOffset.left * 5 - 2) * 0.65, 976);
      const nextHeight = Math.floor(nextWidth * 0.5625 + 16);

      this.bufferCanvas.current.height = prevHeight;
      this.bufferCanvas.current.width = prevWidth;
      this.bufferCanvas.current.getContext('2d').drawImage(this.canvas.current, 0, 0);

      this.canvas.current.height = nextHeight;
      this.canvas.current.width = nextWidth;
      this.ctx.scale(nextWidth / prevWidth, nextHeight / prevHeight);
      this.ctx.clearRect(0, 0, prevWidth, prevHeight);
      this.ctx.drawImage(this.bufferCanvas.current, 0, 0);
      this.ctx.scale(prevWidth / nextWidth, prevHeight / nextHeight);

      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
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
      const { strokeColor, strokeWidth, tool } = this.props;
      this.drawLine({
        canvasHeight: this.canvas.current.height,
        canvasWidth: this.canvas.current.width,
        startOffset: lineData.start,
        stopOffset: lineData.stop,
        strokeColor,
        strokeWidth,
        tool,
      });
    }
  }

  onMouseUp() {
    this.isDrawing = false;
    this.uploadLines();
  }

  drawLine({ startOffset, stopOffset, strokeColor, strokeWidth, canvasHeight, canvasWidth, tool }) {
    const scaleX = this.canvas.current.width / canvasWidth;
    const scaleY = this.canvas.current.height / canvasHeight;
    if (tool === 'eraser') {
      this.drawUsingEraser({ startOffset, stopOffset, strokeWidth, scaleX, scaleY });
    } else {
      this.drawUsingPen({ startOffset, stopOffset, strokeColor, strokeWidth, scaleX, scaleY });
    }
  }

  drawUsingPen({ startOffset, stopOffset, strokeColor, strokeWidth, scaleX, scaleY }) {
    this.ctx.beginPath();
    this.ctx.scale(scaleX, scaleY);
    this.ctx.strokeStyle = strokeColor || this.props.strokeColor;
    this.ctx.lineWidth = strokeWidth || this.props.strokeWidth;
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.moveTo(startOffset.offsetX, startOffset.offsetY);
    this.ctx.lineTo(stopOffset.offsetX, stopOffset.offsetY);
    this.ctx.stroke();
    this.ctx.scale(1 / scaleX, 1 / scaleY);
    this.lineStart = stopOffset;
  }

  drawUsingEraser({ startOffset, stopOffset, strokeWidth, scaleX, scaleY }) {
    this.ctx.beginPath();
    this.ctx.scale(scaleX, scaleY);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    this.ctx.lineWidth = strokeWidth || this.props.strokeWidth;
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.moveTo(startOffset.offsetX, startOffset.offsetY);
    this.ctx.lineTo(stopOffset.offsetX, stopOffset.offsetY);
    this.ctx.stroke();
    this.ctx.scale(1 / scaleX, 1 / scaleY);
    this.lineStart = stopOffset;
  }

  uploadLines() {
    if (this.linesToUpload.length > 0) {
      const lineData = this.linesToUpload;
      this.linesToUpload = [];
      const { strokeColor, strokeWidth, tool } = this.props;
      this.props.uploadLines({
        canvasHeight: this.canvas.current.height,
        canvasWidth: this.canvas.current.width,
        lines: lineData,
        strokeColor,
        strokeWidth,
        tool,
      });
    }
  }

  render() {
    const {
      disabled,
      gameStarted,
      startGame,
      strokeColor,
      strokeWidth,
      tool,
      updateStrokeColor,
      updateStrokeWidth,
      updateTool,
    } = this.props;
    const { visible } = this.state;
    const canvasStyle = {
      backgroundColor: hexToRGB(colors.gray, 0.05),
      border: `1px solid ${hexToRGB(colors.gray, 0.25, { useAlpha: false })}`,
    };
    return (
      <Wrapper>
        <StartGameOverlay onStart={startGame} visible={!gameStarted} />
        <Canvas
          disabled={disabled}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          ref={this.canvas}
          style={visible ? canvasStyle : {}}
        />
        <canvas ref={this.bufferCanvas} style={{ display: 'none' }}></canvas>
        <Controls>
          <ToolPicker onSelect={updateTool} value={tool} />
          <ColorPicker disabled={tool !== 'pen'} onSelect={updateStrokeColor} value={strokeColor} />
          <WidthPicker onSelect={updateStrokeWidth} value={strokeWidth} />
        </Controls>
      </Wrapper>
    );
  }
}

DrawingPanel.defaultProps = {
  disabled: true,
  gameStarted: false,
  strokeColor: '#f44336',
  strokeWidth: 5,
  tool: 'pen',
};

DrawingPanel.propTypes = {
  disabled: PropTypes.bool,
  gameStarted: PropTypes.bool,
  startGame: PropTypes.func.isRequired,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  tool: PropTypes.string,
  updateStrokeColor: PropTypes.func.isRequired,
  updateStrokeWidth: PropTypes.func.isRequired,
  updateTool: PropTypes.func.isRequired,
  uploadLines: PropTypes.func.isRequired,
};

export default DrawingPanel;
