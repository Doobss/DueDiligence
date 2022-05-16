import React, { useContext } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";

// import { buildUSDate } from "../StoredData/StoreFunctions";
// import ObservationCard from "./ObservationCard";

import SmallObservationCard from "./SmallObservationCard";

export default RenderSeperatedPostArray = props => {
  const [state] = useContext(StateContext);
  // const [, dispatch] = useContext(DispatchContext);

  // const postArray = state.appData.allPosts.data;
  const { postArray, title, loading } = { ...props };

  return (
    <Container>
      {title ? (
        <PostArrayHeaderText
          textColor={state.currentUser.themeColors.textColor}
        >
          {title}
        </PostArrayHeaderText>
      ) : null}
      {loading === false ? (
        <ListContainer screenWidth={state.dimensions.screenWidth}>
          <FlatList
            horizontal={true}
            data={postArray}
            renderItem={({ item }) => {
              //console.log(item);
              return (
                <SmallObservationCard
                  empty={false}
                  item={item}
                  onPress={() => console.log(item)}
                />
              );
              // return null;
            }}
            keyExtractor={item => item.observationId}
          />
        </ListContainer>
      ) : (
        <ListContainer screenWidth={state.dimensions.screenWidth}>
          <FlatList
            horizontal={true}
            data={postArray}
            renderItem={({ item }) => {
              //console.log(item);
              return (
                <SmallObservationCard
                  empty={true}
                  item={undefined}
                  onPress={() => console.log(item)}
                />
              );
              // return null;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </ListContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  height: auto;
  width: 100%;
  /* flex-direction: row; */
`;

const LoadingContainer = styled.View`
  height: 40px;
  width: ${props => props.screenWidth}px;
`;

const ListContainer = styled.View`
  height: auto;
  /* width: ${props => props.screenWidth}px; */
  width: auto;
`;

const PostArrayHeaderText = styled.Text`
  font-size: 20px;
  /* font-weight: bold; */
  color: ${props => props.textColor};
  margin: 5px;
  margin-left: 15px;
`;
