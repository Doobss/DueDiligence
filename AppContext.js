import React from "react";
import { Dimensions } from "react-native";
import { useImmerReducer } from "use-immer";
import AppStateReducer from "./Reducers/AppStateReducer";

export const DispatchContext = React.createContext([, () => {}]);
export const StateContext = React.createContext([{}]);

const initUser = {
  userName: "",
  firstName: "",
  lastName: "",
  password: "",
  colorTheme: "dark",
  persistLogin: 7200000,
  userEquities: [],
  loginTime: undefined,
  userId: "",
  userAPIKey: "",
  token: "",
  watchList: [],
  recentObservations: [],
  recentResearch: [],
  themeColors: {
    screenBackgroundColor: "rgba(30, 30, 30, 1)",
    textColor: "rgba(255, 255, 255, .9)",
    headerTextColor: "rgba(255, 255, 255, .85)",
    containerColor: "rgba(45, 45, 45, 1)",
    accentColor: "rgba(255, 160, 0, 1)",
    dullAccentColor: "rgba(255, 160, 0, .1)",
    tabBarColor: "rgba(35, 35, 35, .9)"
  },
  userTips: true,
  userArchivedLinks: {}
};

const focusedCompanyObj = { error: false, data: undefined, loading: false };

const initObservationState = {
  selectedCategories: [{ word: "No Categories Selected" }],
  wordArray: { error: false, data: undefined, loading: false },
  // articleArray: [],
  description: "",
  addedData: { type: "", data: "", text: "" },
  sentiment: "",
  focusedCompany: { error: false, data: undefined, loading: false },
  focusedIndustry: { error: false, data: undefined, loading: false },
  focusedSector: { error: false, data: undefined, loading: false },
  companyCategories: {
    error: false,
    data: undefined,
    loading: false
  },
  currentPath: {
    error: false,
    data: [{ LOADING: { category: "loading" } }],
    loading: false
  },
  selectedItems: ""
};

const initResearchState = {
  focusedCategory: {},
  focusedCompany: {
    ticker: "none"
  },
  focusedIndustry: { error: false, data: undefined, loading: false },
  focusedSector: { error: false, data: undefined, loading: false },
  companyCategories: ""
};

const initAppDataState = {
  allPosts: { error: false, data: undefined, loading: false },
  trendingCompanies: { error: false, data: undefined, loading: false },
  userEquitiesObj: { error: false, data: undefined, loading: false },
  sectorArray: { error: false, data: undefined, loading: false },
  industryArray: { error: false, data: undefined, loading: false }
};

const initTabState = {
  homeStackScreen: "ChoiceScreen",
  researchStackScreen: "ResearchHomeScreen",
  settingsStackScreen: "UserSettingsHomeScreen",
  currentStack: "homeStackScreen"
};

const InitalAppState = {
  userAddress: "",
  dimensions: {
    screenWidth: Dimensions.get("window").width,
    screenHeight: Dimensions.get("window").height
  },
  currentUser: initUser,
  // focusedCompany: "",
  modalName: "",
  observation: initObservationState,
  research: initResearchState,
  linkToOpen: "",
  tabState: initTabState,
  appData: initAppDataState
};

export const DispatchContextProvider = props => {
  const [state, dispatch] = useImmerReducer(AppStateReducer, InitalAppState);

  return (
    <DispatchContext.Provider value={[, dispatch]}>
      <StateContext.Provider value={[state]}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
