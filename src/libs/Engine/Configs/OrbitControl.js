import * as THREE from "three";
var orbitLocal;
function OrbitControl(orbit) {
  orbit.minDistance = 0.1;
  orbit.maxDistance = 1000000;
  orbit.minPolarAngle = 0;
  orbit.maxPolarAngle = 2 * Math.PI;
  orbit.target = new THREE.Vector3(0, 0, 0);

  orbit.keys = {
    LEFT: "ArrowLeft", //left arrow
    UP: "ArrowUp", // up arrow
    RIGHT: "ArrowRight", // right arrow
    BOTTOM: "ArrowDown", // down arrow
  };

  orbitLocal = orbit;
  return orbitLocal;
}
export { orbitLocal, OrbitControl };
