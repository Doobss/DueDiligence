import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { Dimensions } from "react-native";
import { withNavigation } from "react-navigation";

import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import Button from "./Button";

import { getInfo } from "../StoredData/StoreFunctions";

const initalScreenWitdh = Dimensions.get("window").width;

const WatchList = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  getCompanyWatchDataAndNavigate = async ticker => {
    const companyData = await getInfo(ticker);

    dispatch({
      type: "SET-FOCUSED-COMPANY-CLOSE-MODAL",
      payload: companyData
    });
    // dispatch({
    //   type: "SET-PAST-SCREEN-NAME",
    //   payload: props.navigation.state.routeName
    // });
    props.navigation.navigate("CompanyResearchScreen");
  };

  renderUserWatchList = watchListArray => {
    // const userWatchList = state.currentUser.userEquities.filter(
    //   item => item.watchList === true
    // );

    const renderedArray = watchListArray.map(item => {
      return (
        <WatchListItem
          key={item.ticker}
          onPress={() => getCompanyWatchDataAndNavigate(item.ticker)}
          background={state.currentUser.themeColors.dullAccentColor}
          borderColor={state.currentUser.themeColors.accentColor}
          //onPress={() => console.log(props.navigation)}
        >
          <ListItemHeaderText>${item.ticker}</ListItemHeaderText>
          <ListItemHeaderText>Industry</ListItemHeaderText>
        </WatchListItem>
      );
    });
    return renderedArray;
  };

  return (
    <WatchListContainer>
      <HeaderText>WatchList:</HeaderText>
      <WatchListItemContainer>
        {renderUserWatchList(state.currentUser.watchList)}
      </WatchListItemContainer>
    </WatchListContainer>
  );
};

export default withNavigation(WatchList);

const WatchListContainer = styled.View`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  /* background: rgba(100, 100, 100, 0.25); */
  padding-top: 10px;
  padding-bottom: 10px;
`;

const HeaderText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 10px;
  font-weight: bold;
`;

const WatchListItemContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: auto;
  justify-content: space-around;
  align-content: center;
  border-radius: 10px;
  background: rgba(100, 100, 100, 0);
`;

const WatchListItem = styled.TouchableOpacity`
  flex-direction: row;
  margin: 5px;
  width: 45%;
  height: auto;
  justify-content: space-between;
  align-content: center;
  border-radius: 10px;
  /* background: rgba(100, 100, 100, 0); */
  background: ${props => props.background};
  border-color: ${props => props.borderColor};
  border-width: 1px;
`;

const ListItemHeaderText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 10px;
`;
