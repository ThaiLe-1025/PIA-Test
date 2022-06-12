import * as THREE from "three";
export default function FitToObject(camera, orbit, object, fitOffset = 2) {
  try {
    const box = new THREE.Box3();

    box.expandByObject(object);

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance =
      maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = orbit.target
      .clone()
      .sub(camera.position)
      .normalize()
      .multiplyScalar(distance);

    orbit.maxDistance = distance * 10;
    orbit.target.copy(center);

    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    camera.position.copy(orbit.target).sub(direction);

    orbit.update();
  } catch (error) {}

  return null;
}
