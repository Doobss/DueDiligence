import React, { useContext } from "react";

import styled from "styled-components";

import { buildUSDate } from "../StoredData/StoreFunctions";

import { DispatchContext, StateContext } from "../AppContext";

export default SmallObservationCard = props => {
  const [state] = useContext(StateContext);

  const {
    item,
    onPress,
    empty,
    loading,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight
  } = { ...props };

  const date = item !== undefined ? buildUSDate(item.timePosted) : undefined;

  const [, dispatch] = useContext(DispatchContext);

  const observationType =
    item !== undefined
      ? item.addedData.type !== undefined
        ? item.addedData.type
        : "notInput"
      : undefined;

  const sentiment = item !== undefined ? item.sentiment : undefined;
  const ticker = item !== undefined ? item.ticker : undefined;
  const selectedCategory =
    item !== undefined ? item.selectedCategories[0].word : undefined;
  const addedDataText =
    item !== undefined
      ? item.addedData.text
        ? item.addedData.text
        : "Opinion"
      : undefined;
  const addedDataData = item !== undefined ? item.addedData.data : undefined;
  //console.log(empty);

  if (loading === true && empty === false) {
    return (
      <ObservationContainer
        onPress={onPress === undefined ? alert("no function") : onPress}
        background={state.currentUser.themeColors.containerColor}
        screenWidth={state.dimensions.screenWidth}
        marginTop={marginTop ? marginTop : 0}
        marginBottom={marginBottom ? marginBottom : 0}
        marginLeft={marginLeft ? marginLeft : 0}
        marginRight={marginRight ? marginRight : 0}
      >
        <EmptySentimentView
          background={state.currentUser.themeColors.dullAccentColor}
        ></EmptySentimentView>
      </ObservationContainer>
    );
  } else if (empty === true) {
    return (
      <ObservationContainer
        onPress={onPress === undefined ? alert("no function") : onPress}
        background={state.currentUser.themeColors.screenBackgroundColor}
        screenWidth={state.dimensions.screenWidth}
        marginTop={marginTop ? marginTop : 0}
        marginBottom={marginBottom ? marginBottom : 0}
        marginLeft={marginLeft ? marginLeft : 0}
        marginRight={marginRight ? marginRight : 0}
      ></ObservationContainer>
    );
  } else if (observationType === "opinion" || observationType === "notInput") {
    return (
      <ObservationContainer
        onPress={onPress === undefined ? alert("no function") : onPress}
        background={state.currentUser.themeColors.containerColor}
        screenWidth={state.dimensions.screenWidth}
        marginTop={marginTop ? marginTop : 0}
        marginBottom={marginBottom ? marginBottom : 0}
        marginLeft={marginLeft ? marginLeft : 0}
        marginRight={marginRight ? marginRight : 0}
      >
        <SentimentView sentiment={sentiment}>
          <SentimentViewText
            textColor={state.currentUser.themeColors.headerTextColor}
          >
            {/* {item.sentiment + " " + item.ticker} */}
            {"$" + ticker}
          </SentimentViewText>
        </SentimentView>

        <DescriptionContainer>
          <DescriptionSubText
            textColor={state.currentUser.themeColors.textColor}
          >
            {selectedCategory}
          </DescriptionSubText>
          <DescriptionSubText
            textColor={state.currentUser.themeColors.textColor}
          >
            {addedDataText}
          </DescriptionSubText>
          <DescriptionSubText
            textColor={state.currentUser.themeColors.textColor}
          >
            {date}
          </DescriptionSubText>
        </DescriptionContainer>
      </ObservationContainer>
    );
  } else {
    return (
      <ObservationContainer
        onPress={onPress === undefined ? alert("no function") : onPress}
        background={state.currentUser.themeColors.containerColor}
        screenWidth={state.dimensions.screenWidth}
        marginTop={marginTop ? marginTop : 0}
        marginBottom={marginBottom ? marginBottom : 0}
        marginLeft={marginLeft ? marginLeft : 0}
        marginRight={marginRight ? marginRight : 0}
      >
        <SentimentView
          sentiment={item.sentiment}
          textColor={state.currentUser.themeColors.headerTextColor}
        >
          <SentimentViewText
            textColor={state.currentUser.themeColors.headerTextColor}
          >
            {/* {item.sentiment + " " + item.ticker} */}
            {"$" + item.ticker}
          </SentimentViewText>
        </SentimentView>

        <DescriptionContainer>
          <DescriptionSubText
            textColor={state.currentUser.themeColors.textColor}
          >
            {selectedCategory}
          </DescriptionSubText>
          <LinkButtonContainer
            onPress={() =>
              dispatch({
                type: "SET-LINK-TO-OPEN",
                payload: addedDataData
              })
            }
          >
            <DescriptionSubText
              textColor={state.currentUser.themeColors.textColor}
            >
              {/* {"Link: " +
                (item.addedData.data === undefined
                  ? "Not provided"
                  : item.addedData.data)} */}
              {"Tap to open " + addedDataText + " link"}
            </DescriptionSubText>
          </LinkButtonContainer>
          <DescriptionSubText
            textColor={state.currentUser.themeColors.textColor}
          >
            {date}
          </DescriptionSubText>
        </DescriptionContainer>
      </ObservationContainer>
    );
  }
};

const ObservationContainer = styled.TouchableOpacity`
  background: ${props => props.background};
  border-radius: 10px;
  overflow: hidden;
  height: 100px;
  width: ${props => (props.screenWidth - props.screenWidth * 0.09) / 3}px;
  align-content: space-between;
  justify-content: space-between;
  margin-top: ${props => props.marginTop}px;
  margin-bottom: ${props => props.marginBottom}px;
  margin-right: ${props => props.marginRight}px;
  margin-left: ${props => props.marginLeft}px;
`;

const LinkButtonContainer = styled.TouchableOpacity`
  height: auto;
  width: 100%;
  align-content: space-between;
  justify-content: center;
  /* margin: 5px; */
`;

const EmptySentimentView = styled.View`
  background: ${props => props.background};
  overflow: hidden;
  height: 30px;
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const SentimentView = styled.View`
  background: ${props =>
    props.sentiment === "Bullish"
      ? "rgba(79, 203, 137, 0.65)"
      : "rgba(193, 62, 55, 0.65)"};
  overflow: hidden;
  height: 25px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SentimentViewText = styled.Text`
  font-size: 20px;
  /* font-weight: bold; */
  color: ${props => props.textColor};
  margin: 2.5px;
`;

const DescriptionContainer = styled.View`
  background: rgba(100, 100, 100, 0);
  overflow: hidden;
  height: 70px;
  width: 100%;
  align-items: flex-start;
  justify-content: space-around;
`;

const DescriptionSubText = styled.Text`
  font-size: 14px;
  color: ${props => props.textColor};
  margin: 2.5px;
  /* margin-left: 15px;
  margin-right: 15px; */
`;

// const ObservationContainerBottom = styled.View`
//   flex-direction: row;
//   background: rgba(100, 100, 100, 0.1);
//   overflow: hidden;
//   height: 40px;
//   width: 100%;
//   align-content: center;
//   justify-content: space-around;
//   margin-top: 5px;
// `;

// const BottomButtons = styled.TouchableOpacity`
//   background: rgba(100, 100, 100, 0.05);
//   overflow: hidden;
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;
