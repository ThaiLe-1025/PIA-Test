import { useThree } from "@react-three/fiber";
import { useSnapshot, proxy } from "valtio";
import * as THREE from "three";
import { useState, createRef, useRef } from "react";
import { Box, Edges, Extrude, Plane } from "@react-three/drei";
import { transformStates } from "../Transform";

export const clippingState = proxy({
  clippingPlanes: [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
  ],
});
const getPlaneMat = (plane) => ({
  color: 0xffff00,
  metalness: 0.1,
  roughness: 0.75,
  clippingPlanes: plane,
  stencilWrite: true,
  stencilRef: 0,
  stencilFunc: THREE.NotEqualStencilFunc,
  stencilFail: THREE.ReplaceStencilOp,
  stencilZFail: THREE.ReplaceStencilOp,
  stencilZPass: THREE.ReplaceStencilOp,
});
let planeObjects, planeHelpers;
function Clipping() {
  const { gl, scene } = useThree();
  const boxRef = useRef();

  var planes = clippingState.clippingPlanes;
  const [planeObjects] = useState(() => [
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);

  var model = scene.getObjectByName("rootModel");
  var box = new THREE.Box3();
  box.expandByObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  // console.log(size, center);
  // scene.add(box);
  // if (model.children.length > 0) {
  //   if (boxRef.current) {
  //     var box = boxRef.current;

  //     console.log(size);
  //   }
  // }
  // gl.clippingPlanes = planes;
  console.log(scene);

  return (
    <group name="clipping">
      {planeObjects.map((planeRef, index) => (
        <Plane
          key={`0${index}`}
          args={[4, 4]}
          renderOrder={index + 1.1}
          onAfterRender={(gl) => gl.clearStencil()}
          onDoubleClick={(e) => {
            e.stopPropagation();
            transformStates.current = e.object.uuid;
          }}
          onPointerMissed={(e) => {
            e.stopPropagation();
            transformStates.current = null;

            if (e.type === "dblclick") {
              transformStates.current = null;
            }
          }}
        >
          <meshStandardMaterial
            {...getPlaneMat(planes.filter((_, i) => i !== index))}
          />
          <planeGeometry args={[0.1, 0.1, 1, 1]} />
        </Plane>
      ))}
    </group>
  );
}

export default Clipping;
