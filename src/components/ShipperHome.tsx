/* eslint-disable react/display-name */
import React from "react";
import UlipBottomTab from "./UlipBottomTab";
import HomeStack from "./HomeStack";
import InTransitStack from "./InTransitStack";
import HistoryStack from "./HistoryStack";
import HomeSelected from "../images/home_selected.svg";
import HomeBlur from "../images/home_blur.svg";
import InTransitSelected from "../images/intransit_selected.svg";
import InTransitBlur from "../images/intransit_blur.svg";
import HistorySelected from "../images/history_selected.svg";
import HistoryBlur from "../images/history_blur.svg";

const tabs = [
  {
    name: "HomeStack",
    label: "HOME",
    component: HomeStack,
    activeImage: HomeSelected,
    inActiveImage: HomeBlur
  },
  {
    name: "InTransitStack",
    label: "IN-TRANSIT",
    component: InTransitStack,
    activeImage: InTransitSelected,
    inActiveImage: InTransitBlur
  },
  {
    name: "HistoryStack",
    label: "HISTORY",
    component: HistoryStack,
    activeImage: HistorySelected,
    inActiveImage: HistoryBlur
  }
];

const ShipperHome = () => {
  return <UlipBottomTab tabs={tabs}></UlipBottomTab>;
};

export default ShipperHome;
