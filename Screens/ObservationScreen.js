import React, { useEffect, useContext, useState, useRef } from "react";
import { ScrollView, Modal, SectionList, Dimensions } from "react-native";

import styled from "styled-components";
import Button from "../Components/Button";
import { DispatchContext, StateContext } from "../AppContext";
import AsyncStore from "../AsyncStore";
import SearchModal from "../Components/SearchModal";
import { BlurView } from "expo-blur";
import CategoryPicker from "../Components/CategoryPicker";
import DescriptionBuilder from "../Components/DescriptionBuilder";
import AddedObservationData from "../Components/AddedObservationData";
import { updateAppDataRecentPosts } from "../StoredData/ApiFunctions/AppDataFunctions";

import {
  ScreenContainerWithTab,
  IosSpacer,
  TopSpacerView
} from "../Components/GeneralComponents";
import ObservationTabBar from "../Components/ObservationTabBar";
import TabBarButtonArray from "../ComponentFunctions/TabBarButtonArray";

// const initScreenWidth = Dimensions.get("window").width;
// const initScreenHeight = Dimensions.get("window").height;

export default ObservationScreen = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [bullBearModalShowing, setbullBearModalShowing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [screenWidth, setScreenWidth] = useState(initScreenWidth);
  // const [screenHeight, setScreenHeight] = useState(initScreenHeight);

  let screenWidth = state.dimensions.screenWidth;
  let screenHeight = state.dimensions.screenHeight;

  const sectionListRef = useRef();
  //SearchValues for each section on the section lis

  setSentimentBullAndCloseModal = () => {
    dispatch({
      type: "SET-SENTIMENT",
      payload: "Bullish"
    });
    setbullBearModalShowing(false);
  };

  setSentimentBearAndCloseModal = () => {
    dispatch({
      type: "SET-SENTIMENT",
      payload: "Bearish"
    });
    setbullBearModalShowing(false);
  };

  scrollForward = () => {
    sectionListRef.current.scrollToLocation({
      itemIndex: currentIndex + 1,
      sectionIndex: currentIndex + 1
    });
    setCurrentIndex(currentIndex + 1);
  };

  scrollBackOrBackToChoiceScreen = () => {
    if (currentIndex >= 1) {
      sectionListRef.current.scrollToLocation({
        itemIndex: currentIndex - 1,
        sectionIndex: currentIndex - 1
      });
      setCurrentIndex(currentIndex - 1);
    } else {
      dispatch({
        type: "CLEAR-OBSERVATION-SELECTED-CATEGORIES"
      });
      props.navigation.navigate("ChoiceScreen");
    }
  };

  useEffect(() => {
    if (
      state.observation.companyCategories.ticker === "" ||
      state.observation.companyCategories.ticker !==
        state.observation.focusedCompany.ticker
    ) {
      dispatch({
        type: "CLEAR-OBSERVATION-SELECTED-CATEGORIES"
      });
    }
  }, []);

  handleScroll = event => {
    //console.log(event.nativeEvent);
    if (event.nativeEvent.contentOffset.x === 0) {
      setCurrentIndex(0);
    } else if (event.nativeEvent.contentOffset.x === screenWidth) {
      setCurrentIndex(1);
    } else if (event.nativeEvent.contentOffset.x === screenWidth * 2) {
      setCurrentIndex(2);
    }
  };

  test = () => {
    console.log(currentIndex);
  };

  // {
  //   title: currentIndex === 0 ? "Exit" : "Back",
  //   onPress: () => scrollBackOrBackToChoiceScreen()
  // },

  let observationNav = [
    {
      title: "<-",
      onPress:
        currentIndex === 0
          ? () => alert("Cant scroll back")
          : () => scrollBackOrBackToChoiceScreen()
    },
    {
      title: "Sentiment",
      onPress: () => setbullBearModalShowing(!bullBearModalShowing)
    },
    {
      title: "->",
      onPress:
        currentIndex === 2
          ? () => alert("Cant scroll forward")
          : () => scrollForward()
    }
  ];

  let buttonArray = TabBarButtonArray(state, props, dispatch);
  const addedButton = {
    title: "state",
    onPress: () => console.log(state),
    selected: false
  };
  // const addedButton2 = {
  //   title: "test",
  //   onPress:
  //     state.observation.focusedCompany === undefined
  //       ? () => alert("no company")
  //       : () =>
  //           updateAppDataRecentPosts(
  //             state.observation.focusedCompany.ticker,
  //             dispatch
  //           ),
  //   selected: false
  // };
  buttonArray.push(addedButton);
  //buttonArray.push(addedButton2);

  const componentsToRender = [
    {
      title: "Category Picker",
      data: [
        <CategoryPicker screenWidth={screenWidth} screenHeight={screenHeight} />
      ],
      id: "CategoryPicker"
    },
    {
      title: "Description",
      data: [
        <DescriptionBuilder
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          scrollNext={() => scrollForward()}
        />
      ],
      id: "DescriptionBuilder"
    },
    {
      title: "Added Data",
      data: [
        <AddedObservationData
          passedProps={props}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
        />
      ],
      id: "AddedObservationData"
    }
  ];

  return (
    <ScreenContainerWithTab tabButtons={buttonArray}>
      {/* <TopSpacerView></TopSpacerView> */}
      <IosSpacer></IosSpacer>
      <SectionList
        onScroll={event => handleScroll(event)}
        ref={sectionListRef}
        pagingEnabled={true}
        horizontal={true}
        sections={componentsToRender}
        renderItem={item => item.item}
        keyExtractor={item => item.key}
        renderSectionHeader={({ section: { title } }) =>
          //   <HeaderText>{title}</HeaderText>
          null
        }
      />

      <ObservationTabBar itemsArray={observationNav} />

      <Modal
        visible={bullBearModalShowing}
        onRequestClose={() =>
          dispatch({
            type: "CLOSE-MODAL"
          })
        }
        animationType={"fade"}
        transparent={true}
      >
        <BlurView
          tint={state.currentUser.colorTheme === "dark" ? "dark" : "light"}
          intensity={65}
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ModalContainer
            backGroundColor={state.currentUser.themeColors.containerColor}
            screenWidth={state.dimensions.screenWidth}
          >
            {/* <SentimentModalView
              backGroundColor={state.currentUser.themeColors.containerColor}
            > */}
            <BullButton
              screenWidth={state.dimensions.screenWidth}
              onPress={() => setSentimentBullAndCloseModal()}
            >
              <ButtonText textColor={state.currentUser.themeColors.textColor}>
                Bullish
              </ButtonText>
            </BullButton>
            <BearButton
              screenWidth={state.dimensions.screenWidth}
              onPress={() => setSentimentBearAndCloseModal()}
            >
              <ButtonText textColor={state.currentUser.themeColors.textColor}>
                Bearish
              </ButtonText>
            </BearButton>
            <Button
              title="Close"
              onPress={() => setbullBearModalShowing(!bullBearModalShowing)}
              size="minimal"
            />
            {/* </SentimentModalView> */}
          </ModalContainer>
        </BlurView>
      </Modal>
    </ScreenContainerWithTab>
  );
};

// const SentimentModalView = styled.View`
//   width: 100%;
//   height: 100%;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   overflow: hidden;
//   padding: 10px;
//   margin-top: 5px;
//   margin-bottom: 5px;
//   /* background: ${props => props.backGroundColor}; */
// `;

const ButtonText = styled.Text`
  font-size: 26px;
  color: white;
  /* color: ${props => props.textColor}; */
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
`;

const BullButton = styled.TouchableOpacity`
  background: rgba(79, 203, 137, 0.1);
  height: auto;
  width: ${props => props.screenWidth * 0.6}px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: rgba(79, 203, 137, 0.5);

  border-radius: 10px;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 2.5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const BearButton = styled.TouchableOpacity`
  background: rgba(193, 62, 55, 0.1);
  height: auto;
  width: ${props => props.screenWidth * 0.6}px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: rgba(193, 62, 55, 0.5);
  border-radius: 10px;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 2.5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Container = styled.View`
  background: rgba(0, 0, 0, 1);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.View`
  width: ${props => props.screenWidth * 0.65}px;
  height: 25%;
  align-items: center;
  justify-content: center;
  background: ${props => props.backGroundColor};
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: hidden;
`;

//${props => (props.theme === 'dark') ? 'rgba(25, 25, 25, .75)' : 'rgba(255, 255, 255, .75)'}
