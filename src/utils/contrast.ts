export const getContrastFromBg = (
  background: string,
  darkReturn = "#000000",
  lightReturn = "#ffffff"
) => {
  const hexRegex = /#[0-9A-Fa-f]{6}/;
  const hex = background.match(hexRegex)?.[0] || background;
  const hexCode = hex.charAt(0) === "#" ? hex.substr(1, 6) : hex;

  const hexR = parseInt(hexCode.substr(0, 2), 16);
  const hexG = parseInt(hexCode.substr(2, 2), 16);
  const hexB = parseInt(hexCode.substr(4, 2), 16);
  // Gets the average value of the colors
  const contrastRatio = (hexR + hexG + hexB) / (255 * 3);

  return contrastRatio >= 0.6 ? darkReturn : lightReturn;
};
