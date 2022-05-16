import React, { useEffect, useContext, useState, useRef } from "react";
// import { FlatList, Modal, SectionList } from "react-native";
import styled from "styled-components";
// import Button from "../Components/Button";
import { DispatchContext, StateContext } from "../AppContext";

import CategoryObservationPosts from "../Components/CategoryObservationPosts";
import SubCategoryPosts from "../Components/SubCategoryPosts";
// import SearchModal from "../Components/SearchModal";
import * as WebBrowser from "expo-web-browser";

import {
  ScreenContainerWithTab,
  TopSpacerView,
  IosSpacer
} from "../Components/GeneralComponents";

import TabBarButtonArray from "../ComponentFunctions/TabBarButtonArray";

import { grabObservationsByCategory } from "../StoredData/StoreFunctions";
import { ScrollView } from "react-native-gesture-handler";

export default CategoryResearchScreen = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const focusedCategory =
    state.research.focusedCategory === {}
      ? "loading"
      : state.research.focusedCategory;

  useEffect(() => {
    if (state.linkToOpen !== "") {
      WebBrowser.openBrowserAsync(state.linkToOpen, {
        toolbarColor: "#171A27"
      });
      dispatch({
        type: "SET-LINK-TO-OPEN",
        payload: ""
      });
    }
  }, [state.linkToOpen]);

  // grabObservations = async (ticker, category) => {
  //   const data = await grabObservationsByCategory(ticker, category);
  //   console.log(data);
  // };

  let buttonArray = TabBarButtonArray(state, props, dispatch);
  const addedButton = {
    title: "Back",
    onPress: () => props.navigation.goBack(),
    selected: false
  };
  buttonArray.unshift(addedButton);

  // let buttonArray = [
  //   {
  //     title: "Back",
  //     onPress: () => props.navigation.goBack(),
  //     selected: false
  //   },
  //   {
  //     title: "Home",
  //     onPress: () => props.navigation.navigate("ChoiceScreen"),
  //     selected: false
  //   },
  //   {
  //     title: "Research",
  //     onPress: () => props.navigation.navigate("ResearchHomeScreen"),
  //     selected: true
  //   },
  //   {
  //     title: "User",
  //     onPress: () => props.navigation.navigate("UserSettingsHomeScreen"),
  //     selected: false
  //   }
  // ];

  return (
    <ScreenContainerWithTab tabButtons={buttonArray}>
      <ScrollView
        style={{
          width: "100%",
          alignContent: "center",
          justifyItems: "center"
        }}
      >
        <IosSpacer></IosSpacer>
        <TopSpacerView></TopSpacerView>
        <HeaderText>{state.focusedCompany.ticker}</HeaderText>
        {/* <HeaderText>
          {state.research.focusedCategory === {}
            ? "loading"
            : focusedCategory.category}
        </HeaderText> */}
        <CategoryObservationPosts />
        <SubCategoryPosts />
        {/* <Button
          title="Category console log"
          size="minimal"
          onPress={() => console.log(focusedCategory)}
        /> */}
      </ScrollView>
    </ScreenContainerWithTab>
  );
};

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.95);
`;
