import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./BottomBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScissors,
  faHouse,
  faRulerHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

//Local
import { Button } from "../../../../components/UI";
import { engineStates } from "../../../../libs/Engine/engineStates";
import { FitToObject, fuctionStates } from "../../../../libs/Engine/functions";

const cx = classNames.bind(styles);
function BottomBar() {
  const [measureActive, setMeasureActive] = useState(false);
  const [clippingActive, setClippingActive] = useState(false);
  const { sceneData, cameraData, controlData } = engineStates();
  // const measureItems = useCallback(() => {
  //   if (glData[0]) {
  //     MeasureItems({
  //       active: !measureActive,
  //       scene: sceneData[0],
  //       camera: cameraData[0],
  //       gl: glData[0],
  //     });
  //   }
  // }, [measureActive]);

  const fitToHome = () => {
    var sceneObjects = sceneData[0];
    var obj = sceneObjects.children.find((item) => item.name === "rootModel");
    if (obj.children.length > 0)
      FitToObject(cameraData[0], controlData[0], obj);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("bottom-bar")}>
        <Button
          className={cx("btn-bottom")}
          leftIcon={<FontAwesomeIcon icon={faHouse} onClick={fitToHome} />}
        ></Button>
        <Button
          className={
            measureActive ? cx("btn-bottom", "active") : cx("btn-bottom")
          }
          leftIcon={<FontAwesomeIcon icon={faRulerHorizontal} />}
          onClick={() => {
            fuctionStates.measureActive = !measureActive;

            setMeasureActive(!measureActive);
          }}
        ></Button>
        <Button
          className={
            clippingActive ? cx("btn-bottom", "active") : cx("btn-bottom")
          }
          leftIcon={<FontAwesomeIcon icon={faScissors} />}
          onClick={() => {
            fuctionStates.clippingActive = !clippingActive;
            setClippingActive(!clippingActive);
          }}
        ></Button>
      </div>
    </div>
  );
}

export default BottomBar;
