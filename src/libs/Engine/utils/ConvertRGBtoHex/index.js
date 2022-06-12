export default function ConvertRGBtoHex(red, green, blue) {
  return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}
function ColorToHex(color) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}
