import React from "react";
import { Dimensions } from "react-native";
//import { InitalAppState } from "../AppContext";
import uuidv4 from "uuid/v4";

export const USERFETCH = "USER-FETCH";

export default AppStateReducer = (draft, action) => {
  switch (action.type) {
    case "ADD-NEW-WORD": {
      if (action.payload2 === "word") {
        draft.observation.wordArray = [
          ...draft.observation.wordArray,
          action.payload
        ];
      } else if (action.payload2 === "article") {
        draft.observation.articleArray = [
          ...draft.observation.articleArray,
          action.payload
        ];
      }
      return;
    }
    case "ADD-CATEGORY-TO-SELECTED": {
      draft.observation.selectedCategories[action.payload2] = action.payload;
      //console.log(categoryArray);
      return;
    }
    case "ADD-NEW-RECENT-OBSERVATION": {
      let oldArray = draft.currentUser.recentObservations;
      let filteredOldArray = oldArray.filter(item => {
        if (item.ticker !== action.payload.ticker) {
          return item;
        }
      });
      filteredOldArray.unshift(action.payload);
      draft.currentUser.recentObservations = filteredOldArray;
      return;
    }
    case "ADD-NEW-RECENT-RESEARCH": {
      let oldArray = draft.currentUser.recentResearch;
      let filteredOldArray = oldArray.filter(item => {
        if (item.ticker !== action.payload.ticker) {
          return item;
        }
      });
      filteredOldArray.unshift(action.payload);
      draft.currentUser.recentResearch = filteredOldArray;
      return;
    }
    case "CLEAR-OBSERVATION-SELECTED-CATEGORIES": {
      draft.observation.selectedCategories = [
        { word: "No Categories Selected" }
      ];
      //console.log(categoryArray);
      return;
    }
    case "ADD-TO-WATCHLIST": {
      draft.currentUser.watchList.push(action.payload);
      //console.log(categoryArray);
      return;
    }
    case "REMOVE-FROM-WATCHLIST": {
      draft.currentUser.watchList = action.payload;
      //console.log(categoryArray);
      return;
    }
    case "SET-SENTIMENT": {
      draft.observation.sentiment = action.payload;
      return;
    }
    case "UPDATE-CURRENT-USER": {
      draft.currentUser[action.payload] = action.payload2;
      return;
    }
    case "SET-OBSERVATION-STATE": {
      draft.observation[action.payload] = action.payload2;
      return;
    }
    case "SET-RESEARCH-STATE": {
      draft.research[action.payload] = action.payload2;
      return;
    }
    case "SET-APP-DATA-STATE": {
      draft.appData[action.payload] = action.payload2;
      return;
    }
    case "LOGOUT": {
      draft.userAddress = "";
      draft.focusedCompany = "";
      draft.modalName = "";
      draft.observation = {
        selectedCategories: [{ word: "No Categories Selected" }],
        category: "",
        wordArray: [],
        articleArray: [],
        description: "",
        addedData: { type: "", data: "", text: "" },
        sentiment: "",
        focusedCompany: "",
        companyCategories: ""
      };
      draft.research = {
        focusedCategory: "",
        focusedCompany: "",
        companyCategories: ""
      };
      draft.linkToOpen = "";
      draft.homeStackScreen = "ChoiceScreen";
      draft.researchStackScreen = "ResearchHomeScreen";
      draft.settingsStackScreen = "UserSettingsHomeScreen";
      draft.currentStack = "homeStackScreen";
      return;
    }

    case "SET-USER-ADDRESS": {
      draft.userAddress = action.payload;
      return;
    }
    case "SET-USER-ADDRESS": {
      draft.userAddress = action.payload;
      return;
    }
    case "SET-STACK-SCREEN": {
      draft[action.payload] = action.payload2;
      draft.currentStack = action.payload3;
      draft.tabState[action.payload] = action.payload2;
      draft.tabState.currentStack = action.payload3;
      return;
    }
    case "SET-USER-TIPS": {
      draft.currentUser.userTips = !draft.currentUser.userTips;
      return;
    }
    case "SET-OBSERVATION-DATA-TYPE": {
      draft.observation.addedData.type = action.payload;
      draft.observation.addedData.text = action.payload2;
      return;
    }
    case "SET-OBSERVATION-ADDED-DATA-DATA": {
      draft.observation.addedData.data = action.payload;
      return;
    }
    case "SET-USER-THEME": {
      draft.currentUser.colorTheme = action.payload;
      draft.currentUser.themeColors = action.payload2;
      return;
    }
    case "SET-EQUITIES-ARRAY": {
      if (action.payload2 === "Observations") {
        draft.currentUser.recentObservations = action.payload;
      } else if (action.payload2 === "Research") {
        draft.currentUser.recentResearch = action.payload;
      } else if (action.payload2 === "watchList") {
        draft.currentUser.watchList = action.payload;
      }
      return;
    }

    case "SET-DESCRIPTION": {
      draft.observation.description = action.payload;
      return;
    }

    case "SET-LINK-TO-OPEN": {
      draft.linkToOpen = action.payload;
      return;
    }

    case "REMOVE-UNSELECTED-CATEGORIES": {
      const newArray = draft.observation.selectedCategories.slice(
        0,
        action.payload2
      );

      newArray.push(action.payload);

      draft.observation.selectedCategories = newArray;
      return;
    }
    case "REMOVE-SELECTED-CATEGORIES": {
      const newArray = draft.observation.selectedCategories.slice(
        0,
        action.payload2
      );
      if (action.payload2 === 0) {
        newArray.push(action.payload);
      }
      draft.observation.selectedCategories = newArray;

      return;
    }
    case "CHANGE-SINGLE-STATE-VAR": {
      daft[action.variable] = action.payload;
      return;
    }
    case "CLOSE-MODAL": {
      draft.modalName = "";
      return;
    }
    case "SHOW-MODAL": {
      draft.modalName = action.payload;
      return;
    }

    case "FOCUSED-COMPANY-DATA": {
      draft.focusedCompany = action.payload;
      return;
    }
    case "SET-CURRENT-USER": {
      draft.currentUser = action.payload;
      return;
    }

    case "USER-FETCH": {
      draft.users = action.payload;
      return;
    }

    case "UPDATE-TICKER": {
      //draft.currentUser.userEquities ? draft.currentUser.userEquities.splice(0, 3, action.payload) : null
    }
    case "DESCIPTION-BUILDER-LOAD": {
      draft.observation.wordArray.data = action.payload.wordArray;
      //draft.observation.articleArray = action.payload.articleArray;
      return;
    }
    case "SET-FOCUSED-COMPANY-CLOSE-MODAL": {
      //draft.modalName = ''
      draft.focusedCompany = action.payload;
      draft.modalName = "";
      return;
    }
    case "SET-FOCUSED-COMPANY-ARTICLES": {
      //draft.modalName = ''
      draft.focusedCompany = {
        ...draft.focusedCompany,
        companyArticles: action.payload
      };

      return;
    }
    case "SET-RESEARCH-CATEGORY": {
      draft.research.focusedCategory = action.payload;
      return;
    }

    case "SET-OBSERVATION-CATEGORY": {
      draft.observation.category = action.payload;
      return;
    }

    case "LOAD-COMPANY-QUOTE": {
      //const userKey = action.payload2
      draft.currentUser.watchList = action.payload;
      draft.currentUser.recentObservations = action.payload2;
      draft.currentUser.recentResearch = action.payload3;
      return;
    }

    default: {
      return draft;
    }
  }
};
