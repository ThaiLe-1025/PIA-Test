import React from "react";
import className from "classnames/bind";
import styles from "./ModelPanel.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, SearchBar } from "../../../../components/UI";
import { modelData } from "./modelData";
import ModelItem from "./ModelItem";

const cx = className.bind(styles);

function ModelPanel() {
  return (
    <div className={cx("wrapper")}>
      <div style={{ height: "40px", width: "100%" }}>
        <SearchBar />
      </div>
      <div style={{ height: "500px", width: "100%" }}>
        {modelData.map((item, index) => {
          return <ModelItem key={index} item={item} />;
        })}
      </div>
      <Button
        className={cx("btn-create-model")}
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        Add new model
      </Button>
    </div>
  );
}

export default ModelPanel;
