import React, { useState, useContext, useEffect } from "react";

import { AsyncStorage } from "react-native";
import Button from "./Components/Button";

const recents = [
  { ticker: "AAPL", timeOpened: "" },
  { ticker: "MSFT", timeOpened: "" },
  { ticker: "WORK", timeOpened: "" },
  { ticker: "AMD", timeOpened: "" },
  { ticker: "INTC", timeOpened: "" },
  { ticker: "SNAP", timeOpened: "" }
];

const watchList = [
  { ticker: "AAOI" },
  { ticker: "MSFT" },
  { ticker: "WORK" },
  { ticker: "AMD" },
  { ticker: "AGIO" },
  { ticker: "ACLS" }
];

const userEquities = [
  {
    ticker: "AAPL",
    timeOpened: "",
    watchList: true,
    recentObs: false,
    recentRD: false
  },
  {
    ticker: "MCS",
    timeOpened: "",
    watchList: false,
    recentObs: true,
    recentRD: true
  },
  {
    ticker: "MSFT",
    timeOpened: "",
    watchList: true,
    recentObs: true,
    recentRD: true
  },
  {
    ticker: "WORK",
    timeOpened: "",
    watchList: true,
    recentObs: true,
    recentRD: false
  },
  {
    ticker: "INTC",
    timeOpened: "",
    watchList: true,
    recentObs: false,
    recentRD: false
  },
  {
    ticker: "SNAP",
    timeOpened: "",
    watchList: false,
    recentObs: true,
    recentRD: true
  },
  {
    ticker: "AAOI",
    timeOpened: "",
    watchList: true,
    recentObs: true,
    recentRD: false
  },
  {
    ticker: "AGIO",
    timeOpened: "",
    watchList: false,
    recentObs: true,
    recentRD: true
  },
  {
    ticker: "ACLS",
    timeOpened: "",
    watchList: false,
    recentObs: true,
    recentRD: true
  },
  {
    ticker: "BIIB",
    timeOpened: "",
    watchList: true,
    recentObs: false,
    recentRD: false
  },
  {
    ticker: "NIO",
    timeOpened: "",
    watchList: false,
    recentObs: true,
    recentRD: true
  },
  {
    ticker: "UBER",
    timeOpened: "",
    watchList: false,
    recentObs: false,
    recentRD: true
  },
  {
    ticker: "TSLA",
    timeOpened: "",
    watchList: true,
    recentObs: true,
    recentRD: false
  }
];

const users = [
  {
    userName: "Ian",
    firstName: "Ian",
    lastName: "Bringe",
    password: "B",
    persistLogin: 7200000,
    userEquities: userEquities
  },
  {
    userName: "Sam",
    firstName: "Sam",
    lastName: "Samerson",
    password: "S",
    persistLogin: 360000,
    userEquities: userEquities
  },
  {
    userName: "Tom",
    firstName: "Tom",
    lastName: "Tomerson",
    password: "T",
    persistLogin: 360000,
    userEquities: userEquities
  }
];

export default AsyncStore = () => {
  const userStr = JSON.stringify(users);

  resetStore = async () => {
    try {
      await AsyncStorage.setItem("users", userStr);
      await AsyncStorage.setItem("localToken", "");
      alert("uploaded");
    } catch (error) {
      alert(error);
    }
  };

  return <Button onPress={() => resetStore()} title="Reset store" />;
};
