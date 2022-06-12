import React from "react";
import className from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Engine } from "../../libs";

const cx = className.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div id="canvas" className={cx("model-view")}>
        <Engine />
        <div id="function-container" />
      </div>
      <Sidebar />
      <div className={cx("container")}>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
