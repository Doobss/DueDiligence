import React, { useContext, useRef, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";
import SmallObservationCard from "../Components/SmallObservationCard";

// import { buildUSDate } from "../StoredData/StoreFunctions";

export default RenderRecentPostsArray = props => {
  const [state] = useContext(StateContext);
  // const [, dispatch] = useContext(DispatchContext);

  const { postArray, loading, error } = { ...props };

  const loadingPostsArray = [
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true }
  ];

  const flatListRef = useRef();

  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  const [flatlistlength, setFlatlistlength] = useState(440);

  scrollDownList = () => {
    //console.log(flatListRef.current);
    const nextIndex = currentScrollIndex + 1;
    const offset = flatlistlength * nextIndex;
    flatListRef.current.scrollToOffset({ offset: offset });
    setCurrentScrollIndex(nextIndex);
  };

  setCurrentIndexOnScroll = event => {
    if (event.nativeEvent.contentOffset.y === 0) {
      setCurrentScrollIndex(0);
    } else if (event.nativeEvent.contentOffset.y === flatlistlength) {
      setCurrentScrollIndex(1);
    } else if (event.nativeEvent.contentOffset.y === flatlistlength * 2) {
      setCurrentScrollIndex(2);
    }
  };

  loadingAndErrorRender = passedArray => {
    const toReturn = passedArray.map((item, index) => {
      if ((index + 1) % 3 === 0) {
        const item2 = passedArray[index - 1];
        const item3 = passedArray[index - 2];

        return (
          <FlatListRow key={index} screenWidth={state.dimensions.screenWidth}>
            <SmallObservationCard
              //   key={item.ticker === undefined ? index : item.ticker + index}
              empty={false}
              loading={item.loading !== undefined ? item.loading : false}
              item={item.loading === true ? undefined : item}
              onPress={() => console.log(item)}
            />
            {item2 === undefined ? null : (
              <SmallObservationCard
                // key={item2.ticker === undefined ? index : item2.ticker + index}
                empty={false}
                loading={item2.loading !== undefined ? item2.loading : false}
                item={item2.loading === true ? undefined : item2}
                onPress={() => console.log(item2)}
              />
            )}
            {item3 === undefined ? null : (
              <SmallObservationCard
                // key={item3.ticker === undefined ? index : item3.ticker + index}
                empty={false}
                loading={item3.loading !== undefined ? item3.loading : false}
                item={item3.loading === true ? undefined : item3}
                onPress={() => console.log(item3)}
              />
            )}
          </FlatListRow>
        );
      }
      return null;
    });
    return toReturn;
  };

  renderContainerItemWithThreePosts = (item, item2, item3) => {
    return (
      <FlatListRow screenWidth={state.dimensions.screenWidth}>
        <SmallObservationCard
          //   key={item.ticker === undefined ? index : item.ticker + index}
          loading={false}
          empty={item === undefined ? true : false}
          item={item.empty === true ? undefined : item}
          onPress={() => console.log(item)}
        />
        {/* {item2 === undefined ? null : ( */}
        <SmallObservationCard
          // key={item2.ticker === undefined ? index : item2.ticker + index}
          loading={false}
          empty={item2 === undefined ? true : false}
          item={item2 === undefined ? undefined : item2}
          onPress={() => console.log(item2)}
        />
        {/* )} */}
        {/* {item3 === undefined ? null : ( */}
        <SmallObservationCard
          // key={item3.ticker === undefined ? index : item3.ticker + index}
          loading={false}
          empty={item3 === undefined ? true : false}
          item={item3 === undefined ? undefined : item3}
          onPress={() => console.log(item3)}
        />
        {/* )} */}
      </FlatListRow>
    );
  };

  return loading === true || error === true ? (
    <Container flatlistlength={flatlistlength}>
      <FlatListContainer
        flatlistlength={flatlistlength}
        screenWidth={state.dimensions.screenWidth}
      >
        {/* <ListContainer screenWidth={state.dimensions.screenWidth}> */}
        {loadingAndErrorRender(loadingPostsArray)}
        {/* </ListContainer> */}
      </FlatListContainer>
      <BottomView>
        <BottomButton
          onPress={() => console.log("Loading or error")}
          background={state.currentUser.themeColors.containerColor}
        >
          <BottomButtonText textColor={state.currentUser.themeColors.textColor}>
            More
          </BottomButtonText>
        </BottomButton>
      </BottomView>
    </Container>
  ) : (
    <Container flatlistlength={flatlistlength}>
      <FlatListContainer
        flatlistlength={flatlistlength}
        screenWidth={state.dimensions.screenWidth}
      >
        <FlatList
          onScroll={event => setCurrentIndexOnScroll(event)}
          ref={flatListRef}
          pagingEnabled={true}
          data={postArray}
          renderItem={({ item, index }) => {
            if ((index + 3) % 3 === 0) {
              return renderContainerItemWithThreePosts(
                postArray[index],
                postArray[index + 1],
                postArray[index + 2]
              );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </FlatListContainer>
      <BottomView>
        <BottomButton
          onPress={() => scrollDownList()}
          background={state.currentUser.themeColors.containerColor}
        >
          <BottomButtonText textColor={state.currentUser.themeColors.textColor}>
            More
          </BottomButtonText>
        </BottomButton>
      </BottomView>
    </Container>
  );
};

const Container = styled.View`
  height: ${props => props.flatlistlength + 50}px;
  width: 100%;
  /* flex-direction: row; */
`;

const BottomButtonText = styled.Text`
  font-size: 20px;
  color: ${props => props.textColor};
  margin: 2.5px;
`;

const BottomView = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const BottomButton = styled.TouchableOpacity`
  height: 40px;
  width: 160px;
  border-radius: 10px;
  background: ${props => props.background};
  justify-content: center;
  align-items: center;
`;
const FlatListRow = styled.View`
  height: auto;
  width: ${props => props.screenWidth}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
`;

const FlatListContainer = styled.View`
  height: ${props => props.flatlistlength}px;
  width: ${props => props.screenWidth}px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ListContainer = styled.View`
  height: auto;
  width: ${props => props.screenWidth}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const PostArrayHeaderText = styled.Text`
  font-size: 20px;
  /* font-weight: bold; */
  color: ${props => props.textColor};
  margin: 5px;
  margin-left: 15px;
`;
