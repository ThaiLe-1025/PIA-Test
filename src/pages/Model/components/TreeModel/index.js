import React, { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import shallow from "zustand/shallow";
//Local
import styles from "./Treemodel.module.scss";
import { Tree, Button } from "../../../../components/UI";
import { engineStates } from "../../../../libs/Engine/engineStates";
import ParserToTreeData from "../../../../libs/Engine/functions/ParserToTreeData";

//
const cx = classNames.bind(styles);
function TreeModel() {
  const [treeOpen, setTreeOpen] = useState(false);
  const { objectData, sceneData } = engineStates(
    (state) => ({
      objectData: state.objectData,
      sceneData: state.sceneData,
      setState: state.setState,
    }),
    shallow
  );

  const handleTree = () => {
    setTreeOpen(!treeOpen);
  };
  return (
    <div className={cx("tree-wrapper")}>
      <Button
        className={treeOpen ? cx("btn-tree", "active") : cx("btn-tree")}
        leftIcon={<FontAwesomeIcon icon={faList} />}
        onClick={handleTree}
      />
      {treeOpen && (
        <div className={cx("tree")}>
          <Tree
            data={ParserToTreeData(objectData)}
            scene={sceneData[0]}
            className={cx("tree-items")}
          />
        </div>
      )}
    </div>
  );
}

export default TreeModel;
