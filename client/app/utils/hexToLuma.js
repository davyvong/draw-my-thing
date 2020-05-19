// https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black

function hexToLuma(hex) {
  const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!c) {
    return null;
  }
  const [r, g, b] = c.slice(1, 4).map(h => parseInt(h, 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default hexToLuma;
