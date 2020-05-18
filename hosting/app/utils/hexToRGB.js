// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

const defaultOptions = {
  useAlpha: true,
};

function hexToRGB(hex, alpha = null, options = defaultOptions) {
  const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!c) {
    return null;
  }
  const rgb = c
    .slice(1, 4)
    .map(h => (options.useAlpha ? parseInt(h, 16) : Math.round(parseInt(h, 16) * alpha + 255 * (1 - alpha))))
    .join(',');
  if (alpha && options.useAlpha) {
    return `rgba(${rgb}, ${alpha})`;
  }
  return `rgb(${rgb})`;
}

export default hexToRGB;
