import { useThree } from "@react-three/fiber";
import { useSnapshot, proxy } from "valtio";
import React from "react";
import { TransformControls } from "@react-three/drei";
import { orbitLocal } from "../../Configs/OrbitControl";

export const transformStates = proxy({ current: null, mode: 0 });
export const modes = ["translate", "rotate", "scale"];
function Transform() {
  const snap = useSnapshot(transformStates);
  const scene = useThree((transformStates) => transformStates.scene);
  var selectedObject = scene.getObjectByProperty("uuid", snap.current);
  if (selectedObject) {
    console.log(selectedObject);
  }

  return (
    <>
      {snap.current && (
        <TransformControls
          setSpace={"local"}
          object={selectedObject}
          mode={modes[snap.mode]}
          onMouseDown={() => {
            orbitLocal.enabled = false;
          }}
          onMouseUp={() => {
            orbitLocal.enabled = true;
          }}
        />
      )}
    </>
  );
}

export default React.memo(Transform);
