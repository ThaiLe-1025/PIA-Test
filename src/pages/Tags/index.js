import React from "react";
import className from "classnames/bind";
import styles from "./Tags.module.scss";
const cx = className.bind(styles);

function Tags() {
  return <div className={cx("wrapper")}>Tags</div>;
}

export default Tags;
