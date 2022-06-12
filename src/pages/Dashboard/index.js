import React from "react";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFile } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./Dashboard.module.scss";
import Button from "../../components/UI/Button";
const cx = className.bind(styles);

const data = [
  {
    name: "May-2022",
    views: 40,
    files: 24,
    amt: 24,
  },
  {
    name: "Jun-2022",
    views: 30,
    files: 13,
    amt: 22,
  },
  {
    name: "Jul-2022",
    views: 20,
    files: 98,
    amt: 22,
  },
  {
    name: "Aug-2022",
    views: 27,
    files: 39,
    amt: 20,
  },
  {
    name: "Sep-2022",
    views: 18,
    files: 48,
    amt: 21,
  },
  {
    name: "Oct-2022",
    views: 23,
    files: 38,
    amt: 25,
  },
  {
    name: "Nov-2022",
    views: 34,
    files: 43,
    amt: 21,
  },
];

function Dashboard() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("tool-bar")}>
        <Button className={cx("btn-create")}>Create</Button>
      </div>
      <div className={cx("content")}>
        <div className={cx("stat")}>
          <div className={cx("stat-item")}>
            <FontAwesomeIcon icon={faUser} />
            <p>20 users</p>
          </div>
          <div className={cx("stat-item")}>
            <FontAwesomeIcon icon={faFile} />
            <p>8 models</p>
          </div>
        </div>
        <div className={cx("dash-chart")}>
          <ResponsiveContainer height={300} width="95%">
            <AreaChart width={900} height={300} data={data}>
              {/* <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs> */}
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#8884d8"
                fillOpacity={0.5}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="files"
                stroke="#82ca9d"
                fillOpacity={0.5}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
