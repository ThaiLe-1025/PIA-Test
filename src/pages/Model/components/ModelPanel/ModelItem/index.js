import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faXmarkCircle,
  faGear,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ModelItem.module.scss";
import { Loader } from "../../../../../libs/Engine/functions";
import { engineStates } from "../../../../../libs/Engine";
import { useProgress } from "@react-three/drei";
const cx = className.bind(styles);

function ModelItem({ height = "60px", width = "100%", item, ...props }) {
  const { objectData, sceneData, cameraData, controlData } = engineStates();
  const { progress, item: progressItem } = useProgress();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function handleLoad(item) {
    setLoading(true);
    Loader({
      title: item.title,
      type: item.type,
      file: item.file,
      sceneData: sceneData,
      cameraData: cameraData,
      controlData: controlData,
      objectData: objectData,
    });
  }
  function handleUnload(item) {
    var selectedObject = sceneData[0].getObjectByName(item.file);
    sceneData[0].remove(selectedObject);
    var temp = objectData.find(
      (ele) => ele.title === item.title && ele.value.name === item.file
    );
    var index = objectData.indexOf(temp);
    if (index !== -1) {
      objectData.splice(index, 1);
    }
    engineStates.setState({ setState: item, objectData: objectData });
    setLoaded(false);
  }
  useEffect(() => {
    let delayed;
    if (loading) {
      if (progressItem.includes(".hdr") === false && progressItem !== "") {
        if (progress === 0) setLoading(true);
        else if (progress === 100) {
          delayed = setTimeout(() => {
            setLoading(false);
            setLoaded(true);
          }, 1000);
          return () => {
            clearTimeout(delayed);
          };
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);
  return (
    <div
      className={cx("wrapper", { "model-loaded": loaded })}
      onClick={() => {
        handleLoad(item);
      }}
      style={{ height: height, width: width }}
      {...props}
    >
      <div className={cx("icon")}>
        {loading && (
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        )}

        <img alt="icon" src={item.icon} />
        <div className={cx("version")}>{item.version}</div>
      </div>
      <div className={cx("info")}>
        <div className={cx("title")}>{item.title}</div>

        <div className={cx("date")}>{item.date}</div>

        <div className={cx("creator")}>Owner: {item.owner}</div>
      </div>
      <div className={cx("functions")}>
        <div className={cx("unload")}>
          {loaded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUnload(item);
              }}
            >
              <FontAwesomeIcon icon={faXmarkCircle} />
            </button>
          )}
        </div>
        <div className={cx("more")}>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faPalette} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelItem;
