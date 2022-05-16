import React, { useContext } from "react";

import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";

export default ObservationCard = props => {
  const { item, datePosted, category, onPress } = { ...props };

  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const observationType = item.addedData.type;

  renderCategoryText = category => {
    if (category !== undefined) {
      return <DescriptionSubText>{"Posted in " + category}</DescriptionSubText>;
    } else {
      return null;
    }
  };

  if (observationType === "opinion" || observationType === undefined) {
    return (
      <ObservationContainer>
        <SentimentView sentiment={item.sentiment}>
          <SentimentViewText>{item.sentiment}</SentimentViewText>
        </SentimentView>

        <DescriptionContainer>
          <DescriptionSubText>
            {"Type: " +
              (item.addedData.text === undefined
                ? "Opinion"
                : item.addedData.text)}
          </DescriptionSubText>
          <DescriptionText>{item.description}</DescriptionText>

          <DescriptionSubText>{"Posted: " + datePosted}</DescriptionSubText>
          {renderCategoryText(category)}
        </DescriptionContainer>

        <ObservationContainerBottom>
          <BottomButtons>
            <ObservationBodyText>Save</ObservationBodyText>
          </BottomButtons>
          <BottomButtons onPress={() => console.log(item)}>
            <ObservationBodyText>Log post</ObservationBodyText>
          </BottomButtons>
        </ObservationContainerBottom>
      </ObservationContainer>
    );
  } else {
    return (
      <ObservationContainer>
        <SentimentView sentiment={item.sentiment}>
          <SentimentViewText>{item.sentiment}</SentimentViewText>
        </SentimentView>

        <DescriptionContainer>
          <DescriptionSubText>
            {"Type: " +
              (item.addedData.text === undefined
                ? "Opinion"
                : item.addedData.text)}
          </DescriptionSubText>
          <LinkButtonContainer
            onPress={() =>
              dispatch({
                type: "SET-LINK-TO-OPEN",
                payload: item.addedData.data
              })
            }
          >
            <DescriptionSubText>
              {"Link: " +
                (item.addedData.data === undefined
                  ? "Not provided"
                  : item.addedData.data)}
            </DescriptionSubText>
          </LinkButtonContainer>
          <DescriptionText>{item.description}</DescriptionText>

          <DescriptionSubText>{"Posted: " + datePosted}</DescriptionSubText>
          {renderCategoryText(category)}
        </DescriptionContainer>

        <ObservationContainerBottom>
          <BottomButtons>
            <ObservationBodyText>Save</ObservationBodyText>
          </BottomButtons>
          <BottomButtons onPress={() => console.log(item)}>
            <ObservationBodyText>Log post</ObservationBodyText>
          </BottomButtons>
        </ObservationContainerBottom>
      </ObservationContainer>
    );
  }
};

const ObservationContainer = styled.View`
  background: rgba(100, 100, 100, 0.25);
  border-radius: 10px;
  overflow: hidden;
  height: auto;
  width: 90%;
  align-content: space-between;
  justify-content: space-between;
  margin: 5px;
`;

const ObservationBodyText = styled.Text`
  font-size: 20px;
  /* font-weight: bold; */
  color: rgba(255, 255, 255, 0.95);
  /* margin: 5px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px; */
`;

const LinkButtonContainer = styled.TouchableOpacity`
  height: auto;
  width: 100%;
  align-content: space-between;
  justify-content: center;
  /* margin: 5px; */
`;

const SentimentView = styled.View`
  background: ${props =>
    props.sentiment === "Bullish"
      ? "rgba(79, 203, 137, 0.65)"
      : "rgba(193, 62, 55, 0.65)"};
  overflow: hidden;
  height: 30px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SentimentViewText = styled.Text`
  font-size: 22px;
  /* font-weight: bold; */
  color: rgba(255, 255, 255, 0.95);
  margin: 5px;
  margin-left: 15px;
`;

const DescriptionContainer = styled.View`
  background: rgba(100, 100, 100, 0);
  overflow: hidden;
  height: auto;
  width: 100%;
  align-content: flex-start;
  justify-content: center;
  margin: 5px;
`;

const DescriptionText = styled.Text`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
  margin: 5px;
  margin-top: 10px;
  /* margin-left: 15px;
  margin-right: 15px; */
`;

const DescriptionSubText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  /* margin-left: 15px;
  margin-right: 15px; */
`;

const ObservationContainerBottom = styled.View`
  flex-direction: row;
  background: rgba(100, 100, 100, 0.1);
  overflow: hidden;
  height: 40px;
  width: 100%;
  align-content: center;
  justify-content: space-around;
  margin-top: 5px;
`;

const BottomButtons = styled.TouchableOpacity`
  background: rgba(100, 100, 100, 0);
  overflow: hidden;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
