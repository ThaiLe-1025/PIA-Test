import React, { useState } from "react";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Model.module.scss";
import { BottomBar, ModelPanel, TreeModel } from "./components";

const cx = className.bind(styles);
// const items = [
//   {
//     title: "Models",
//     children: "Models",
//   },
//   { title: "Drawings", children: "Drawings" },
// ];

function Model() {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className={cx("wrapper")}>
      <TreeModel />
      <div className={cx("sidepanel", { "hide-sidepanel": !showPanel })}>
        <button
          className={!showPanel ? cx("btn-sidepanel") : cx("hide")}
          onClick={() => setShowPanel(!showPanel)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button
          className={showPanel ? cx("btn-close") : cx("hide")}
          onClick={() => setShowPanel(!showPanel)}
        >
          <FontAwesomeIcon icon={faXmarkCircle} />
        </button>

        <div className={cx("panel-item")}>
          <ModelPanel />
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default Model;
