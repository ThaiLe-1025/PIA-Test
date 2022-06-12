import React, { Suspense } from "react";
import className from "classnames/bind";
import { Canvas } from "@react-three/fiber";

//local
import styles from "./Engine.module.scss";
import Configs from "./Configs";
import Functions, { Model } from "./functions";

const cx = className.bind(styles);

function Engine() {
  return (
    <div className={cx("wrapper")}>
      <Canvas
        performance={{ current: 1, min: 0.5, max: 1, debounce: 200 }}
        frameloop="always"
        onCreated={(state) => {
          state.gl.localClippingEnabled = true;
          state.camera.position.set(1, 1, 1);
        }}
      >
        <Suspense fallback={null}>
          <Configs />
          <Model />
          <Functions />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Engine;
export { engineStates } from "./engineStates";
