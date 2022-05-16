import React, { useContext, useRef, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";
// import {
//   SmallScreenButton,
//   ScreenHeaderText
// } from "../Components/GeneralComponents";
// import { buildUSDate } from "../StoredData/StoreFunctions";

import { getIndustryDataAndSetResearchState } from "../StoredData/ApiFunctions/ResearchDataFunctions";

export default RenderIndustryArray = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const { industryArray, loading, error } = { ...props };

  renderIndustryArray = passedArray => {
    let shortenedArray = passedArray;

    if (passedArray.length > 25) {
      let newArray = passedArray.slice(0, 25);
      shortenedArray = newArray;
    }

    const rendered = shortenedArray.map((item, index) => {
      return (
        <IndustryButton
          key={index + item.industry}
          //   screenWidth={state.dimensions.screenWidth}
          onPress={() =>
            getIndustryDataAndSetResearchState(item.industry, dispatch)
          }
          backGroundColor={state.currentUser.themeColors.dullAccentColor}
          borderColor={state.currentUser.themeColors.accentColor}
        >
          <SmallScreenButtonText
            textColor={state.currentUser.themeColors.textColor}
          >
            {item.industry}
          </SmallScreenButtonText>
        </IndustryButton>
      );
    });
    return rendered;
  };

  return loading === true || error === true ? (
    <Container screenWidth={state.dimensions.screenWidth}></Container>
  ) : (
    <Container screenWidth={state.dimensions.screenWidth}>
      {renderIndustryArray(industryArray)}
    </Container>
  );
};

const Container = styled.View`
  height: auto;
  width: ${props => props.screenWidth}px;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 5px;
`;

const IndustryButton = styled.TouchableOpacity`
  background: ${props => props.backGroundColor};
  height: auto;
  width: auto;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${props => props.borderColor};
  border-radius: 10px;
  overflow: hidden;
  margin: 2.5px;
`;

const SmallScreenButtonText = styled.Text`
  font-size: 16px;
  color: ${props => props.textColor};
  /* margin-top: 5px;
  margin-bottom: 5px; */
  margin: 5px;
`;

// scrollDownList = () => {
//     //console.log(flatListRef.current);
//     const nextIndex = currentScrollIndex + 1;
//     const offset = flatlistlength * nextIndex;
//     flatListRef.current.scrollToOffset({ offset: offset });
//     setCurrentScrollIndex(nextIndex);
//   };

//   setCurrentIndexOnScroll = event => {
//     if (event.nativeEvent.contentOffset.y === 0) {
//       setCurrentScrollIndex(0);
//     } else if (event.nativeEvent.contentOffset.y === flatlistlength) {
//       setCurrentScrollIndex(1);
//     } else if (event.nativeEvent.contentOffset.y === flatlistlength * 2) {
//       setCurrentScrollIndex(2);
//     }
//   };
