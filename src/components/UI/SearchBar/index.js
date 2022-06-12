import React, { useRef, useState } from "react";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.scss";
const cx = className.bind(styles);

function SearchBar({ height = "38px", ...props }) {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  const handleInput = (e) => {
    setLoading(false);
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };
  return (
    <div className={cx("wrapper")} style={{ height: height }} {...props}>
      <input
        ref={inputRef}
        value={searchValue}
        placeholder="Search"
        onChange={(e) => handleInput(e)}
        spellCheck={false}
      ></input>
      {searchValue && (
        <button className={cx("clear")} onClick={handleClear}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      )}
      {loading && (
        <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
      )}
      <button className={cx("search-btn")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default SearchBar;
