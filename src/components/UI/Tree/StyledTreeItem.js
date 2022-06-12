import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, FormControlLabel } from "@mui/material";
import classNames from "classnames/bind";
import React from "react";

import styles from "./Tree.module.scss";

const cx = classNames.bind(styles);
function StyledTreeItem({
  nodeid,
  label,
  onChange,
  checked,
  id,
  ...passProps
}) {
  return (
    <TreeItem
      className={cx("tree-item")}
      nodeId={nodeid}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              key={nodeid}
              onChange={onChange}
              className={cx("tree-checkbox")}
            />
          }
          label={label}
          id={id}
          className={cx("label-item")}
        ></FormControlLabel>
      }
      {...passProps}
    />
  );
}

export default StyledTreeItem;
