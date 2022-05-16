import React, { useEffect, useContext, useState } from "react";
import { FlatList, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";

import styled from "styled-components";
import Button from "../Components/Button";
import { DispatchContext, StateContext } from "../AppContext";

import {
  getQuote,
  getInfo,
  basicFilter,
  basicFilterByCompName
} from "../StoredData/StoreFunctions";

const ResearchScreenHeader = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchByTicker, setSearchByTicker] = useState(true);
  const [textInputFocused, setTextInputFocused] = useState(false);

  filterText = text => {
    setSearch(text);
    const filtered = searchByTicker
      ? basicFilter(text)
      : basicFilterByCompName(text);
    //alert(filtered.length)
    setResults(filtered);
  };

  getRecentCompanyDataAndNavigate = async ticker => {
    const companyData = await getInfo(ticker);
    //console.log(companyData);
    dispatch({
      type: "SET-FOCUSED-COMPANY-CLOSE-MODAL",
      payload: companyData
    });
    props.navigation.navigate("CompanyResearchScreen");
  };

  RenderdItem = item => {
    return (
      <RenderedItemContainer
        onPress={() => getRecentCompanyDataAndNavigate(item.ticker)}
      >
        <RenderItemHeaderText>${item.ticker}</RenderItemHeaderText>
        <RenderItemSubText>
          {" "}
          - {item.company ? item.company : "Missed this name"}{" "}
        </RenderItemSubText>
        {/* <ElipsisButton onPress={() => alert(JSON.stringify(state))}>
                    <Elipsis >•••</Elipsis>
                </ElipsisButton> */}
      </RenderedItemContainer>
    );
  };

  return textInputFocused ? (
    <SearchContainer>
      <SearchHeaderContainer>
        <HeaderText>
          {searchByTicker
            ? "Searching By Ticker:"
            : "Searching By Company Name:"}
        </HeaderText>
        <ElipsisButton onPress={() => setSearchByTicker(!searchByTicker)}>
          <Elipsis>•••</Elipsis>
        </ElipsisButton>
      </SearchHeaderContainer>
      <StyledTextInput
        autoFocus={true}
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={text => filterText(text)}
        value={search}
        autoCompleteType="off"
        screenHeight={state.dimensions.screenHeight}
      />
      <FlatListContainer screenHeight={state.dimensions.screenHeight}>
        <FlatList
          data={
            results.length === 0
              ? [{ company: "Type to seach", ticker: "" }]
              : results
          }
          renderItem={({ item }) => RenderdItem(item)}
          keyExtractor={item => item.ticker}
          screenHeight={state.dimensions.screenHeight}
        />
      </FlatListContainer>
      <NewButtonContainer onPress={() => setTextInputFocused(false)}>
        <NewButtonText>Close</NewButtonText>
      </NewButtonContainer>
    </SearchContainer>
  ) : (
    <HeaderContainer screenHeight={state.dimensions.screenHeight}>
      {/* <HeaderText>Searching For Company:</HeaderText>
      <ElipsisButton onPress={() => setSearchByTicker(!searchByTicker)}>
        <Elipsis>•••</Elipsis>
      </ElipsisButton> */}

      <TemporarySerachModalButton
        autoFocus={false}
        //editable={false}
        onFocus={() => setTextInputFocused(true)}
        placeholder="Search"
        placeholderTextColor="white"
        //onChangeText={text => filterText(text)}
        value={search}
        autoCompleteType="off"
        screenHeight={state.dimensions.screenHeight}
      />
    </HeaderContainer>
  );
};

export default withNavigation(ResearchScreenHeader);

const HeaderContainer = styled.View`
  height: auto;
  width: 100%;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: center;
`;

const SearchHeaderContainer = styled.View`
  height: auto;
  width: 100%;
  align-content: center;
  justify-content: space-between;
  flex-direction: row;
`;

const SearchContainer = styled.View`
  height: auto;
  width: 100%;
  align-content: center;
  /* justify-content: space-between; */
  justify-content: center;
`;

const FlatListContainer = styled.View`
  height: ${props => props.screenHeight * 0.6}px;
  width: 100%;
  align-content: center;
  /* justify-content: space-between; */
  justify-content: flex-start;
  overflow: scroll;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
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

const TemporarySerachModalButton = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: 90%;
  height: ${props => props.screenHeight * 0.06}px;
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

const StyledTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: 90%;
  height: ${props => props.screenHeight * 0.06}px;
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

const RenderItemSubText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.65);
  margin: 5px;
  /* margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px; */
`;

const NewButtonContainer = styled.TouchableOpacity`
  height: auto;
  width: 100%;
  /* background-color: rgba(255, 255, 255, .5); */
  background-color: rgba(79, 203, 137, 0.65);
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const NewButtonText = styled.Text`
  font-size: 24px;
  /* color: #171A27; */
  color: white;
  margin: 15px;
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
  color: rgba(255, 255, 255, 0.85);
  margin: 5px;
  /* margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px; */
`;
