const svgns = "http://www.w3.org/2000/svg";
export function createSVG(className) {
  const svg = document.createElementNS(svgns, "svg");
  // var svgID = "mainSVG_" + lineId;
  // svg.id = svgID;
  svg.style.display = "block";
  svg.classList = className;

  return svg;
}

export function createCircle(radius, colorFill, strockColor, strockWidth = 2) {
  var circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "height", radius);
  circle.setAttributeNS(null, "width", radius);
  circle.setAttributeNS(null, "style", `fill: ${colorFill}; display: block;`);
  circle.setAttributeNS(null, "r", radius);
  circle.setAttributeNS(null, "stroke", strockColor);
  circle.setAttributeNS(null, "stroke-width", strockWidth);

  return circle;
}
export function createLine(strockColor, strockWidth = 3, strokeDasharray = 0) {
  var line = document.createElementNS(svgns, "line");
  line.setAttributeNS(null, "style", "display: block;");
  line.setAttributeNS(null, "stroke", strockColor);
  line.setAttributeNS(null, "stroke-width", strockWidth);
  line.setAttributeNS(null, "stroke-dasharray", strokeDasharray);

  return line;
}
export function createText(colorFill, fontSize = 14, label) {
  var text = document.createElementNS(svgns, "text");
  text.setAttributeNS(null, "style", "display: block;");
  text.setAttributeNS(null, "fill", colorFill);
  text.setAttributeNS(null, "font-size", fontSize);
  text.textContent = label;

  return text;
}
export function createRect(
  colorFill,
  strockColor,
  strockWidth = 2,
  radius = 4
) {
  var rect = document.createElementNS(svgns, "rect");
  rect.setAttributeNS(null, "style", "display: block;");
  rect.setAttributeNS(null, "stroke", strockColor);
  rect.setAttributeNS(null, "stroke-width", strockWidth);
  rect.setAttributeNS(null, "fill", colorFill);
  rect.setAttributeNS(null, "rx", radius);
  return rect;
}
