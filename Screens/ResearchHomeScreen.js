import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { ScrollView, Modal, SectionList } from "react-native";
import styled from "styled-components";
import Button from "../Components/Button";
import { DispatchContext, StateContext } from "../AppContext";

import TabBarButtonArray from "../ComponentFunctions/TabBarButtonArray";

import {
  ScreenContainerWithTab,
  IosSpacer,
  ScreenHeaderText,
  ContainerSeperator
} from "../Components/GeneralComponents";

import SearchModal from "../Components/SearchModal";

import { getAllPostsUpToNumberPassed } from "../StoredData/ApiFunctions/AppDataFunctions";

// import {
//   getInfo,
//   basicFilter,
//   basicFilterByCompName
// } from "../StoredData/StoreFunctions";
import WatchList from "../Components/WatchList";
import ResearchScreenHeader from "../Components/ResearchScreenHeader";
import UserResearchRecents from "../Components/UserResearchRecents";
import RenderRecentPostsArray from "../RenderFunctions/RenderRecentPostsArray";
import RenderIndustryArray from "../RenderFunctions/RenderIndustryArray";
import RenderSectorArray from "../RenderFunctions/RenderSectorArray";

export default ResearchHomeScreen = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  //const researchSectionListRef = useRef();

  useLayoutEffect(() => {
    if (
      state.appData.allPosts.data === undefined ||
      state.appData.allPosts.loading === true
    ) {
      console.log("Loading 50 posts");
      getAllPostsUpToNumberPassed(50, dispatch);
    }
  }, [state.appData.allPosts.loading]);

  const componentsToRender = [
    { title: "Header", data: [<ResearchScreenHeader />] },
    // {
    //   title: "Recent Observations",
    //   data: [
    //     <RenderRecentPostsArray
    //       loading={state.appData.allPosts.data === undefined ? true : false}
    //       postArray={state.appData.allPosts.data}
    //     />
    //   ]
    // },
    { title: "Watch List", data: [<WatchList />] },
    { title: "Recent List", data: [<UserResearchRecents />] },
    {
      title: "State Test",
      data: [
        <Button
          onPress={() => console.log(state)}
          title="state Test"
          size="minimal"
        />
      ]
    }
  ];

  let buttonArray = TabBarButtonArray(state, props, dispatch);
  const addedButton = {
    title: "state",
    onPress: () => console.log(state),
    selected: false
  };
  buttonArray.push(addedButton);

  return (
    // <ScreenContainerWithTab tabButtons={buttonArray}>
    //   <IosSpacer></IosSpacer>

    //   <SectionList
    //     // ref={researchSectionListRef}
    //     contentContainerStyle={{ width: state.dimensions.screenWidth }}
    //     //pagingEnabled={true}
    //     //horizontal={true}
    //     sections={componentsToRender}
    //     renderItem={item => item.item}
    //     keyExtractor={item => item.key}
    //     SectionSeparatorComponent={item => (
    //       <SectionSpacer
    //         screenHeight={state.dimensions.screenHeight}
    //       ></SectionSpacer>
    //     )}
    //     renderSectionHeader={({ section: { title } }) =>
    //       //   <HeaderText>{title}</HeaderText>
    //       null
    //     }
    //   />
    //   {/* <RenderRecentPostsArray
    //     loading={state.appData.allPosts.data === undefined ? true : false}
    //     postArray={state.appData.allPosts.data}
    //   /> */}

    //   <Modal
    //     visible={state.modalName === "searchModal" ? true : false}
    //     onRequestClose={() =>
    //       dispatch({
    //         type: "CLOSE-MODAL"
    //       })
    //     }
    //     animationType={"fade"}
    //     transparent={true}
    //   >
    //     <SearchModal />
    //   </Modal>
    // </ScreenContainerWithTab>
    <ScreenContainerWithTab tabButtons={buttonArray}>
      <ScrollView
        contentContainerStyle={{
          width: state.dimensions.screenWidth,
          alignItems: "flex-start",
          justifyContent: "center"
        }}
      >
        <IosSpacer></IosSpacer>
        <ResearchScreenHeader />
        <ContainerSeperator />

        <ScreenHeaderText text={"Recent posts by users"} />
        <RenderRecentPostsArray
          error={state.appData.allPosts.error ? true : false}
          loading={state.appData.allPosts.data === undefined ? true : false}
          postArray={state.appData.allPosts.data}
        />
        <ContainerSeperator />
        <ScreenHeaderText text={"Industries"} />
        <RenderIndustryArray
          loading={
            state.appData.industryArray.data === undefined ? true : false
          }
          error={state.appData.industryArray.error ? true : false}
          industryArray={
            state.appData.industryArray.data === undefined
              ? undefined
              : state.appData.industryArray.data
          }
        />
        <ContainerSeperator />
        <ScreenHeaderText text={"Sectors"} />
        <RenderSectorArray
          loading={state.appData.sectorArray.data === undefined ? true : false}
          error={state.appData.sectorArray.error ? true : false}
          sectorArray={
            state.appData.sectorArray.data === undefined
              ? undefined
              : state.appData.sectorArray.data
          }
        />
        <ContainerSeperator />
        <WatchList />

        <UserResearchRecents />

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
          <SearchModal />
        </Modal>
      </ScrollView>
    </ScreenContainerWithTab>
  );
};

const SectionSpacer = styled.View`
  width: 100%;
  height: ${props => props.screenHeight * 0.025}px;
`;

const Container = styled.SafeAreaView`
  background: rgba(0, 0, 0, 1);
  height: 100%;
  width: 100%;
`;
