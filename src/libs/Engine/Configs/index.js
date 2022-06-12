import React, { useRef } from "react";
// import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {
  softShadows,
  GizmoHelper,
  GizmoViewcube,
  PerspectiveCamera,
  Sky,
  Environment,
  OrbitControls,
} from "@react-three/drei";
// import { EffectComposer, SSAO } from "@react-three/postprocessing";

import { engineStates } from "../engineStates";
import { OrbitControl as orbitLocal } from "./OrbitControl";

function Configs() {
  const { gl, camera, scene } = useThree();
  const orbitRef = useRef();
  let inf = 500000;
  ////////////
  const { sceneData, cameraData, controlData, glData } = engineStates();

  // Transform(gl, camera, scene);
  // camera.position.set(1, 1, 1);
  if (orbitRef.current) {
    orbitLocal(orbitRef.current);
  }

  sceneData[0] = scene;
  cameraData[0] = camera;
  controlData[0] = orbitRef.current;
  glData[0] = gl;
  return (
    <>
      {softShadows()}
      <PerspectiveCamera />
      <OrbitControls ref={orbitRef} dampingFactor={1} />

      <ambientLight intensity={0.2} />

      <directionalLight
        color={"#ffffff"}
        position={[inf, inf, inf]}
        castShadow
        intensity={0.25}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <Environment preset="city" />
      <Sky
        distance={inf}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      {/* <EffectComposer multisampling={0}>
        <SSAO
          samples={31}
          radius={0.1}
          intensity={30}
          luminanceInfluence={0.1}
          color="red"
        />
      </EffectComposer> */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewcube renderPriority={1} />
      </GizmoHelper>
    </>
  );
}

export default Configs;
