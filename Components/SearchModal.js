import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import {
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList
} from "react-native";
import { withNavigation } from "react-navigation";

import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import Button from "./Button";
import {
  getQuote,
  getInfo,
  basicFilter,
  basicFilterByCompName
} from "../StoredData/StoreFunctions";

import UpdateObservationState from "../StoredData/UpdateObservationStateFunction";

const SearchModal = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchByTicker, setSearchByTicker] = useState(true);

  filterText = text => {
    setSearch(text);
    const filtered = searchByTicker
      ? basicFilter(text)
      : basicFilterByCompName(text);
    //alert(filtered.length)
    setResults(filtered);
  };

  newQuickObservation = async item => {
    if (state.focusedCompany.ticker !== item.ticker) {
      const screenData = await getInfo(item.ticker);
      const updateArray = [
        { keyToUpdate: "focusedCompany", payload: screenData }
      ];
      UpdateObservationState(updateArray, dispatch);

      dispatch({
        type: "SET-FOCUSED-COMPANY-CLOSE-MODAL",
        payload: screenData
      });
      props.navigation.navigate("ObservationScreen");
    } else {
      dispatch({
        type: "SET-FOCUSED-COMPANY-CLOSE-MODAL",
        payload: state.focusedCompany
      });
      props.navigation.navigate("ObservationScreen");
    }
  };

  // newObservation = async item => {
  //   const screenData = await getInfo(item.ticker);

  //   dispatch({
  //     type: "SET-FOCUSED-COMPANY-CLOSE-MODAL",
  //     payload: screenData
  //   });
  //   props.navigation.navigate("ObservationScreen");
  // };

  RenderdItem = item => {
    return (
      <RenderedItemContainer onPress={() => newQuickObservation(item)}>
        <RenderItemHeaderText
          headerTextColor={state.currentUser.themeColors.headerTextColor}
        >
          ${item.ticker}
        </RenderItemHeaderText>
        <RenderItemSubText textColor={state.currentUser.themeColors.textColor}>
          {" "}
          - {item.company ? item.company : "Missed this name"}{" "}
        </RenderItemSubText>
        {/* <ElipsisButton onPress={() => alert(JSON.stringify(state))}>
                    <Elipsis >•••</Elipsis>
                </ElipsisButton> */}
      </RenderedItemContainer>
    );
  };

  return (
    <BlurView
      tint={state.currentUser.colorTheme === "dark" ? "dark" : "light"}
      intensity={65}
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      <Container>
        <ModalContainer
          backGroundColor={state.currentUser.themeColors.containerColor}
        >
          <HeaderContainer>
            <HeaderText
              headerTextColor={state.currentUser.themeColors.headerTextColor}
            >
              {searchByTicker
                ? "Searching By Ticker:"
                : "Searching By Company Name:"}
            </HeaderText>
            <ElipsisButton onPress={() => setSearchByTicker(!searchByTicker)}>
              <Elipsis>•••</Elipsis>
            </ElipsisButton>
          </HeaderContainer>
          <StyledTextInput
            //autoFocus={true}
            placeholder="Search"
            placeholderTextColor="white"
            onChangeText={text => filterText(text)}
            value={search}
            autoCompleteType="off"
          />
          <FlatList
            data={
              results.length === 0
                ? [{ company: "Type to seach", ticker: "" }]
                : results
            }
            renderItem={({ item }) => RenderdItem(item)}
            keyExtractor={item => item.ticker}
          />
          <NewButtonContainer
            accentColor={state.currentUser.themeColors.accentColor}
            onPress={() => dispatch({ type: "CLOSE-MODAL" })}
          >
            <NewButtonText textColor={state.currentUser.themeColors.textColor}>
              Close
            </NewButtonText>
          </NewButtonContainer>
        </ModalContainer>
      </Container>
    </BlurView>
  );
};

export default withNavigation(SearchModal);

const HeaderContainer = styled.View`
  height: auto;
  width: 100%;
  align-content: center;
  justify-content: space-between;
  flex-direction: row;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: ${props => props.headerTextColor};
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
const ElipsisButton = styled.TouchableOpacity`
  height: auto;
  width: auto;
  justify-content: center;
  align-items: center;
`;

const Elipsis = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: white;
  margin: 5px;
  /* margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px; */
`;

const RenderedItemContainer = styled.TouchableOpacity`
  width: 320px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: rgba(50, 50, 50, 0.5);
`;

const RenderItemHeaderText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: ${props => props.headerTextColor};
  margin: 5px;
  /* margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px; */
`;
const RenderItemSubText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: ${props => props.textColor};
  margin: 5px;
  /* margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px; */
`;

const NewButtonContainer = styled.TouchableOpacity`
  height: auto;
  width: 100%;
  /* background-color: rgba(255, 255, 255, .5); */
  background-color: ${props => props.accentColor};
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const NewButtonText = styled.Text`
  font-size: 24px;
  color: white;
  /* color: ${props => props.textColor}; */
  margin: 15px;
`;

const Container = styled.View`
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;
const ModalContainer = styled.View`
  border-radius: 15px;
  width: 95%;
  height: 90%;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  background-color: ${props => props.backGroundColor};
  z-index: 2;
  overflow: hidden;
`;

//${props => (props.theme === 'dark') ? 'rgba(25, 25, 25, .75)' : 'rgba(255, 255, 255, .75)'}

const StyledTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: 90%;
  height: 7.5%;
  border-radius: 10px;
  /* border: 1px #171A27; */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  margin: 10px;
  margin-top: 15px;
  padding-left: 20px;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;
`;
