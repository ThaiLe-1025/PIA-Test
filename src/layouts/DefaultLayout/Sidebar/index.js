import React, { useState } from "react";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

import styles from "./Sidebar.module.scss";
import Button from "../../../components/UI/Button";
import { navData } from "./navData";

const cx = className.bind(styles);

function Sidebar() {
  const [navActive, setNavActive] = useState(true);
  const [navItems, setNavItems] = useState(navData);
  const [hideNav, setHideNav] = useState(false);

  const handleItemActive = (item) => {
    navItems.map((it) => {
      if (it.title === item.title) it.active = true;
      else it.active = false;

      return null;
    });
    setNavItems(navItems);
  };

  return (
    <div
      className={
        navActive
          ? cx("wrapper", { "nav-hide": hideNav })
          : cx("wrapper", "collapse", { "nav-hide": hideNav })
      }
    >
      <button
        className={navActive ? cx("nav-button") : cx("nav-button", "active")}
        onClick={() => {
          setNavActive(!navActive);
        }}
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </button>
      <div className={cx("sidebar-items")}>
        {navItems.map((item, index) => {
          return (
            <Button
              key={index}
              className={
                navActive
                  ? cx("item", { "item-active": item.active })
                  : cx("item", "collapse", { "item-active": item.active })
              }
              leftIcon={item.icon}
              to={item.to}
              onClick={() => {
                item.active = true;
                handleItemActive(item);
              }}
            >
              {navActive && item.title}
            </Button>
          );
        })}
      </div>
      <button
        className={
          navActive
            ? cx("nav-hide-button")
            : cx("nav-hide-button", "hide-button-active")
        }
      >
        <p
          className={
            navActive
              ? cx("sidebar-version")
              : cx("sidebar-version", "version-active")
          }
        >
          Version: v0.1
        </p>
        <div className={cx("hide-icon", { "hide-icon-active": hideNav })}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => {
              setHideNav(!hideNav);
            }}
          />
        </div>
      </button>
    </div>
  );
}

export default Sidebar;
