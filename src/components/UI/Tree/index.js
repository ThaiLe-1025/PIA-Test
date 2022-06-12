import React, { useState } from "react";
import classNames from "classnames/bind";
import TreeView from "@mui/lab/TreeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Tree.module.scss";
import StyledTreeItem from "./StyledTreeItem";

const cx = classNames.bind(styles);

function Tree({ data, scene, className }) {
  const classes = cx("wrapper", { [className]: className });

  const [update, setUpdate] = useState(false);
  ///Tree Structre Data
  // Treedata
  //         id: item.id,
  //         name: item.name,
  //         fullPath: item.fullPath,
  //         checked: item.visible,
  //         index: index,
  //         children
  //               id: item.id,
  //               name: item.name,
  //               fullPath: item.fullPath,
  //               checked: item.visible,
  //               index: index,

  const LoopChildren = ({ data }) => {
    return (
      <>
        {data.map((item) => (
          <StyledTreeItem
            key={item.id}
            nodeid={item.id}
            label={item.name}
            id={item.id}
            checked={item.checked}
            onChange={(e, checked) => {
              const id = e.target.labels[0].id;

              const objFound = findAllArray({ data: data, id: id });

              setUpdate(!update);

              handleHideAsId({
                scene: scene,
                objFound: objFound,
                checked: checked,
              });
            }}
          >
            {!!item.children && <LoopChildren data={item.children} />}
          </StyledTreeItem>
        ))}
      </>
    );
  };

  return (
    <>
      {!!data && (
        <TreeView
          className={classes}
          aria-label="Tree"
          defaultCollapseIcon={
            <FontAwesomeIcon className={cx("icon-item")} icon={faChevronDown} />
          }
          defaultExpandIcon={
            <FontAwesomeIcon
              className={cx("icon-item")}
              icon={faChevronRight}
            />
          }
          defaultChecked
          sx={{
            height: 240,
            flexGrow: 1,
            maxWidth: 400,
            overflowY: "auto",
            "& .Mui-selected": {
              backgroundColor: "transparent !important",
            },
          }}
        >
          <LoopChildren data={data} />
        </TreeView>
      )}
    </>
  );
}

function handleHideAsId({ scene, objFound, checked }) {
  let indexs = [];
  let tmpObj = [];
  tmpObj.push(objFound);

  for (let i = 0; i < tmpObj.length; i++) {
    const element = tmpObj[i];
    if (element.children) {
      let index = element.index;
      element.checked = checked;
      indexs.push(index);
      element.children.map((item2) => {
        tmpObj.push(item2);
        return null;
      });
    } else {
      let index = element.index;
      element.checked = checked;
      indexs.push(index);
    }
  }

  scene.traverse(function (child) {
    if (child.userData.hasOwnProperty("attributes")) {
      if ("layerIndex" in child.userData.attributes) {
        const layerIndex = child.userData.attributes.layerIndex;

        indexs.map((item) => {
          if (layerIndex === item) {
            child.visible = checked;
          }
          return null;
        });
      }
    }
  });
  return null;
}

// const LoopChildren = React.memo(function LoopChildren({ data, onUpdate }) {
//   const [update, setUpdate] = useState(false);
//   return (
//     <>
//       {data.map((item) => (
//         <StyledTreeItem
//           key={item.id}
//           nodeid={item.id}
//           label={item.name}
//           id={item.id}
//           checked={item.checked}
//           onChange={(e, checked) => {
//             const _id = e.target.labels[0].id;

//             const objFound = findAllArray({ data: data, id: _id });
//             objFound.checked = checked;
//             onUpdate();
//           }}
//         >
//           {!!item.children && <LoopChildren data={item.children} />}
//         </StyledTreeItem>
//       ))}
//     </>
//   );
// });
const findAllArray = ({ data, id }) => {
  let result = [];
  data.forEach((element) => {
    if (element.id === id) result = element;
  });
  return result;
};

export default Tree;
