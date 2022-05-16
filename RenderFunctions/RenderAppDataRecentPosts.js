import React, { useContext, useRef, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";
import {
  SmallScreenButton,
  ScreenHeaderText
} from "../Components/GeneralComponents";
// import { buildUSDate } from "../StoredData/StoreFunctions";

export default RendeAppDataRecentPosts = props => {
  const [state] = useContext(StateContext);
  // const [, dispatch] = useContext(DispatchContext);

  const { postArray, loading, error } = { ...props };

  const loadingPostsArray = [{ empty: true }, { empty: true }, { empty: true }];

  const appDataFlatList = useRef();

  renderItem = item => {
    return (
      <SmallScreenButton
        title={item.ticker ? "$" + item.ticker : "   "}
        onPress={() => console.log(item)}
      />
    );
  };

  return error ? (
    <FlatListContainer screenWidth={state.dimensions.screenWidth}>
      <SmallScreenButton
        title={"No posts today yet"}
        onPress={() => console.log("HAHA")}
      />
    </FlatListContainer>
  ) : (
    <FlatListContainer screenWidth={state.dimensions.screenWidth}>
      <FlatList
        //onScroll={event => setCurrentIndexOnScroll(event)}
        horizontal={true}
        //ref={appDataFlatList}

        data={loading === true ? loadingPostsArray : postArray}
        renderItem={({ item, index }) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </FlatListContainer>
  );
};

const BottomButtonText = styled.Text`
  font-size: 20px;
  color: ${props => props.textColor};
  margin: 2.5px;
`;

// const BottomView = styled.View`
//   height: 50px;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
// `;

// const BottomButton = styled.TouchableOpacity`
//   height: 40px;
//   width: 160px;
//   border-radius: 10px;
//   background: ${props => props.background};
//   justify-content: center;
//   align-items: center;
// `;

const FlatListContainer = styled.View`
  /* height: ${props => props.flatlistlength}px; */
  height: auto;
  width: ${props => props.screenWidth}px;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 15px;
`;

// const ListContainer = styled.View`
//   height: auto;
//   width: ${props => props.screenWidth}px;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
// `;

const RecentPostContainer = styled.TouchableOpacity`
  background: ${props => props.background};
  height: 50px;
  width: ${props => props.screenWidth / 3 - 10}px;
  border-radius: 10px;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  margin-left: 5px;
  margin-right: 5px;
`;
const RecentPostTopsContainer = styled.View`
  background: ${props => props.background};
  height: 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

// const PostArrayHeaderText = styled.Text`
//   font-size: 20px;
//   /* font-weight: bold; */
//   color: ${props => props.textColor};
//   margin: 5px;
//   margin-left: 15px;
// `;
