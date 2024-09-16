export const getOptimalColorFromBackground = (background: string) => {
  if (background.startsWith("#")) {
    return background;
  }

  if (background.startsWith("linear-gradient")) {
    const colors = background.match(/#[0-9A-Fa-f]{6}/g);

    if (!colors) {
      return "#ffffff";
    }

    const middleColor = colors[Math.round((colors.length - 1) / 2)];

    return middleColor;
  }

  return "#ffffff";
};
