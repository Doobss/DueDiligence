import React, { useContext, useLayoutEffect, useEffect } from "react";
import { ScrollView, Modal } from "react-native";

import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";
import ChoiceDash from "../Components/ChoiceDash";
import SearchModal from "../Components/SearchModal";
import ObservationModal from "../Components/ObservationModal";
import TabBarButtonArray from "../ComponentFunctions/TabBarButtonArray";

import { getAddDataRecentPostsByDate } from "../StoredData/ApiFunctions/AppDataFunctions";

import {
  ScreenContainerWithTab,
  IosSpacer,
  TopSpacerView,
  ScreenHeaderText,
  TopScreenHeaderText,
  ContainerSeperator
} from "../Components/GeneralComponents";
import RenderRecentPostsArray from "../RenderFunctions/RenderRecentPostsArray";
import {
  buildUSDate,
  buildUSTodaysDate,
  todaysDateString
} from "../StoredData/StoreFunctions";

import {
  getAllCompanyDataObjAndSetAppState,
  setAppStateIndustryAndSectors
} from "../StoredData/ApiFunctions/AppDataFunctions";

import RenderAppDataRecentPosts from "../RenderFunctions/RenderAppDataRecentPosts";

export default ChoiceScreen = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  useLayoutEffect(() => {
    if (
      state.appData.trendingCompanies.data === undefined &&
      state.appData.userEquitiesObj.data === undefined
    ) {
      const todaysDate = todaysDateString();
      getAddDataRecentPostsByDate([todaysDate], dispatch);
      getAllCompanyDataObjAndSetAppState(
        state.currentUser.userEquities,
        dispatch
      );
      setAppStateIndustryAndSectors(dispatch);
    }
  }, []);

  useEffect(() => {
    getAllCompanyDataObjAndSetAppState(
      state.currentUser.userEquities,
      dispatch
    );
  }, [state.currentUser.userEquities]);

  useEffect(() => {
    if (
      state.appData.allPosts.error === false &&
      state.appData.data !== undefined
    ) {
      renderRecentPostsSeperatedByTicker(state.appData.allPosts.data);
    }
  }, [state.appData.allPosts.data]);

  let buttonArray = TabBarButtonArray(state, props, dispatch);
  const addedTab = {
    title: "state",
    onPress: () => console.log(state),
    selected: false
  };
  buttonArray.push(addedTab);

  const today = buildUSTodaysDate();

  return (
    <ScreenContainerWithTab tabButtons={buttonArray}>
      <ScrollView
        contentContainerStyle={{
          width: state.dimensions.screenWidth,
          alignItems: "flex-start",
          justifyContent: "center"
        }}
      >
        <IosSpacer />
        <TopSpacerView />
        <TopScreenHeaderText text={today} />
        <ContainerSeperator />
        <ScreenHeaderText text={"Trending today "} />
        <RenderAppDataRecentPosts
          postArray={
            state.appData.trendingCompanies.data === undefined
              ? undefined
              : state.appData.trendingCompanies.data.postedArray
          }
          loading={
            state.appData.trendingCompanies.data === undefined ? true : false
          }
          error={state.appData.trendingCompanies.error}
        />
        <ContainerSeperator />
        {/* <RenderRecentPostsArray
          loading={state.appData.allPosts.data === undefined ? true : false}
          postArray={state.appData.allPosts.data}
        /> */}
        <DashContainer>
          <ChoiceDash dashType="Observations" props={props} />
        </DashContainer>
        <BottomSpacer></BottomSpacer>
      </ScrollView>

      <Modal
        visible={state.modalName === "searchModal" ? true : false}
        onRequestClose={() =>
          dispatch({
            type: "CLOSE-MODAL"
          })
        }
        animationType={"fade"}
        transparent={true}
      >
        <SearchModal props={props} />
      </Modal>
      <Modal
        visible={state.modalName === "observationModal" ? true : false}
        onRequestClose={() =>
          dispatch({
            type: "CLOSE-MODAL"
          })
        }
        animationType={"fade"}
        transparent={true}
      >
        <ObservationModal props={props} />
      </Modal>
    </ScreenContainerWithTab>
  );
};

const TopSpacer = styled.View`
  width: 100%;
  height: 5%;
`;

const BottomSpacer = styled.View`
  width: 100%;
  height: 10px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const DashContainer = styled.View`
  height: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
