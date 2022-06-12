import React, { useState } from "react";
import { useSnapshot, proxy } from "valtio";
import Clipping from "./Clipping";
import MeasureItems from "./MeasureItems";
import Transform from "./Transform";

export const fuctionStates = proxy({
  clippingActive: false,
  measureActive: false,
});
function Functions() {
  const snap = useSnapshot(fuctionStates);

  return (
    <>
      {snap.measureActive && <MeasureItems active={snap.measureActive} />}
      {snap.clippingActive && <Clipping />}
      <Transform />
    </>
  );
}

export default Functions;
///export local
export { default as Loader } from "./Loader";
export { default as FitToObject } from "./FitToObject";
export { default as ParserToTreeData } from "./ParserToTreeData";
export { default as Model } from "./Model";
