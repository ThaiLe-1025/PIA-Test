import React from "react";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import styles from "./Header.module.scss";

const cx = className.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <p className={cx("project-title")}>Project Name</p>
      <div>
        <button className={cx("header-btn")}>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className={cx("header-btn")}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </header>
  );
}

export default Header;
