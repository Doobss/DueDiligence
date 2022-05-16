import React, { useContext } from "react";
import { FlatList } from "react-native";

import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import Button from "./Button";
import { SmallScreenButton } from "../Components/GeneralComponents";

// import {
//   getQuote,
//   getInfo,
//   basicFilter,
//   basicFilterByCompName
// } from "../StoredData/StoreFunctions";

export default ObservationDataTypePicker = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const dataTypes = [
    { type: "opinion", text: "Opinion" },
    { type: "articleLink", text: "Article" },
    { type: "videoLink", text: "Video" },
    { type: "threadLink", text: "Thread" },
    { type: "tweetLink", text: "Tweet" }
  ];

  setDataType = (type, text) => {
    dispatch({
      type: "SET-OBSERVATION-DATA-TYPE",
      payload: type,
      payload2: text
    });
    dispatch({
      type: "CLOSE-MODAL"
    });
  };

  return (
    <Container
      screenHeight={state.dimensions.screenHeight}
      backGroundColor={state.currentUser.themeColors.containerColor}
    >
      <BlurView
        tint={state.currentUser.colorTheme === "dark" ? "dark" : "light"}
        intensity={90}
        style={{ flex: 1 }}
      >
        <TopSpacer />
        <FlatList
          data={dataTypes}
          renderItem={item => (
            <TypeContainer
              onPress={() => setDataType(item.item.type, item.item.text)}
              screenHeight={state.dimensions.screenHeight}
              backGroundColor={state.currentUser.themeColors.containerColor}
            >
              <TypeText textColor={state.currentUser.themeColors.textColor}>
                {item.item.text}
              </TypeText>
            </TypeContainer>
          )}
          keyExtractor={item => item.type}
        />
        <BottomButton
          screenHeight={state.dimensions.screenHeight}
          backGroundColor={state.currentUser.themeColors.dullAccentColor}
          borderColor={state.currentUser.themeColors.accentColor}
          onPress={() =>
            dispatch({
              type: "CLOSE-MODAL"
            })
          }
        >
          <TypeText textColor={state.currentUser.themeColors.textColor}>
            Close
          </TypeText>
        </BottomButton>
        <TopSpacer />
      </BlurView>
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: ${props => props.screenHeight - props.screenHeight * 0.35}px;
  background: ${props => props.backGroundColor};
`;

const TopSpacer = styled.View`
  width: 100%;
  height: 5px;
`;

const TypeContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${props => props.screenHeight * 0.06}px;
  background-color: ${props => props.backGroundColor};
  align-items: center;
  justify-content: center;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
`;

const BottomButton = styled.TouchableOpacity`
  width: 100%;
  height: ${props => props.screenHeight * 0.075}px;
  background: ${props => props.backGroundColor};
  align-items: center;
  justify-content: center;
  border-top-width: 1.5px;
  border-color: ${props => props.borderColor};
  margin-top: 2.5px;
`;

const TypeText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  /* color: #171A27; */
  color: ${props => props.textColor};
`;
