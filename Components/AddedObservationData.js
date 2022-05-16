import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { ScrollView, Modal } from "react-native";
import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";
import * as WebBrowser from "expo-web-browser";
import Button from "./Button";

import ObservationDataTypePicker from "../Components/ObservationDataTypePicker";
import GetUserLocation from "../ComponentFunctions/GetUserLocation";
import UpdateObservationState from "../StoredData/UpdateObservationStateFunction";

import { addToFrontOfRecentObservations } from "../StoredData/ApiFunctions/CurrentUserStateFunctions";

import { addNewObservation } from "../StoredData/ApiFunctions/ObservationDataFunctions";

import { getAddDataRecentPostsByDate } from "../StoredData/ApiFunctions/AppDataFunctions";

import {
  updateUser,
  buildGoolgeSearchURL,
  todaysDateString
} from "../StoredData/StoreFunctions";

export default AddedObservationData = props => {
  let screenWidth = props.screenWidth;
  let screenHeight = props.screenHeight;

  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [addedDataText, setAddedDataText] = useState("");

  useEffect(() => {
    updateUser(state.currentUser);
  }, [state.currentUser]);

  setUserLocation = async () => {
    const address = await GetUserLocation();
    dispatch({
      type: "SET-USER-ADDRESS",
      payload: address
    });
  };

  renderCategoryString = () => {
    let categoryStr = "";
    state.observation.selectedCategories.map((item, index) => {
      if (index === 0) {
        categoryStr = item.word;
      } else {
        categoryStr = categoryStr + " -> " + item.word;
      }
    });
    return categoryStr;
  };

  createNewObservationAndTryToPost = () => {
    if (
      state.observation.description !== "" &&
      state.observation.sentiment !== "" &&
      state.observation.selectedCategories[0].word !==
        "No Categories Selected" &&
      state.observation.addedData.type !== ""
    ) {
      let newObservation = {};
      newObservation.description = state.observation.description;
      newObservation.sentiment = state.observation.sentiment;
      newObservation.selectedCategories = state.observation.selectedCategories;
      newObservation.addedData = state.observation.addedData;
      newObservation.userId = state.currentUser.userId;
      newObservation.location = state.userAddress;

      //   console.log(newObservation);
      addNewObservation(
        newObservation,
        state.observation.focusedCompany.data.ticker
      );
      dispatch({
        type: "CLEAR-OBSERVATION-SELECTED-CATEGORIES"
      });

      addToFrontOfRecentObservations(
        state.observation.focusedCompany.data.ticker,
        state.currentUser.recentObservations,
        dispatch
      );
      const todaysDate = todaysDateString();
      getAddDataRecentPostsByDate([todaysDate], dispatch);
      props.passedProps.navigation.navigate("ChoiceScreen");
      alert("added");
    } else {
      let missingData = "Missing the following, ";

      let observationData = [
        state.observation.description,
        state.observation.sentiment,
        state.observation.addedData.type,
        state.observation.selectedCategories[0]
      ];

      observationData.forEach((item, index) => {
        if (index === 0 && item === "") {
          missingData = missingData + "observation description, ";
        } else if (index === 1 && item === "") {
          missingData = missingData + "observation sentiment, ";
        } else if (index === 2 && item === "") {
          missingData = missingData + "data type, ";
        } else if (index === 3 && item.word === "No Categories Selected") {
          missingData =
            missingData === "Missing the following, "
              ? missingData + "no categories selected"
              : missingData + " and there are no categories selected";
        }
      });

      alert(missingData);
    }
  };

  setAddedDataDataInState = (passedType, passedData, passedText) => {
    const newData = { type: passedType, data: passedData, text: passedText };
    const updateStateArray = [{ keyToUpdate: "addedData", payload: newData }];
    UpdateObservationState(updateStateArray, dispatch);
    // dispatch({
    //   type: "SET-OBSERVATION-ADDED-DATA-DATA",
    //   payload: text
    // });
  };

  handleOpenBrowser = textToSearch => {
    const searchURL = buildGoolgeSearchURL(textToSearch);
    WebBrowser.openBrowserAsync(searchURL);
  };

  renderAddedDataTextInput = addedDataType => {
    // console.log(addedDataType);
    if (addedDataType !== "opinion" && addedDataType !== "") {
      return (
        <AddedDataTextInputContainer>
          <DescriptionText>
            Add a link to what ever you're referencing.
          </DescriptionText>
          <AddedDataTextInput
            placeholder="paste link here"
            placeholderTextColor="white"
            onChangeText={text => setAddedDataText(text)}
            value={addedDataText}
            autoCompleteType="off"
            multiline={true}
          />
          <Button
            title="Input link"
            size="minimal"
            onPress={() =>
              setAddedDataDataInState(
                state.observation.addedData.type,
                addedDataText,
                state.observation.addedData.text
              )
            }
          />
          <Button
            title="Search Google for link"
            size="minimal"
            onPress={() => handleOpenBrowser("")}
          />
        </AddedDataTextInputContainer>
      );
    } else {
      return null;
    }
  };

  return (
    <SectionContainer screenWidth={screenWidth} screenHeight={screenHeight}>
      <ScrollView
        //   centerContent={true}
        contentContainerStyle={{
          width: screenWidth,
          //   height: screenHeight,
          alignItems: "center"
        }}
      >
        <HeaderText>Added Data</HeaderText>
        <PageDescriptionContainer>
          {state.currentUser.userTips ? (
            <DescriptionText>
              Used for adding any aditional data to the observation. Whether
              that is the article you read or the place you over heard the
              information.
            </DescriptionText>
          ) : null}

          <OverviewHeaderText>Current data input type:</OverviewHeaderText>
          <OverviewHeaderText>
            {state.observation.addedData.text === ""
              ? "not yet set"
              : state.observation.addedData.text}
          </OverviewHeaderText>

          <Button
            title="Chose data input type"
            size="minimal"
            onPress={() =>
              dispatch({
                type: "SHOW-MODAL",
                payload: "dataTypePicker"
              })
            }
          />

          {renderAddedDataTextInput(state.observation.addedData.type)}
        </PageDescriptionContainer>
        <HeaderText>Quick Overview</HeaderText>
        <ObservationOverviewContainer>
          <OverviewHeaderText>Observation Sentiment</OverviewHeaderText>
          <SentimentText sentiment={state.observation.sentiment}>
            {" "}
            {state.observation.sentiment === ""
              ? "No sentiment set yet"
              : state.observation.sentiment + " "}{" "}
          </SentimentText>
          <OverviewHeaderText>Chosen categories</OverviewHeaderText>
          <DescriptionText>{renderCategoryString()}</DescriptionText>
          <OverviewHeaderText>Description</OverviewHeaderText>
          <DescriptionText>
            {state.observation.description === ""
              ? "No description added yet"
              : state.observation.description}
          </DescriptionText>
          <OverviewHeaderText>Added Data</OverviewHeaderText>

          <DescriptionText>
            {"Type: " +
              (state.observation.addedData.text === ""
                ? "none"
                : state.observation.addedData.text)}
          </DescriptionText>
          <DescriptionText>
            Data:
            {state.observation.addedData.data === ""
              ? " None added"
              : " " + state.observation.addedData.data}
          </DescriptionText>

          <DescriptionText>
            Location:
            {state.userAddress === "" ? " None added" : " " + state.userAddress}
          </DescriptionText>
          <Button
            title="Add Location"
            size="minimal"
            onPress={() => setUserLocation()}
          />

          {/* <Button
            title="Post Observation"
            onPress={() => createNewObservationAndTryToPost()}
            size="minimal"
          /> */}
          <PostObservationButton
            onPress={() => createNewObservationAndTryToPost()}
          >
            <PostObservationText>Post Observation</PostObservationText>
          </PostObservationButton>
        </ObservationOverviewContainer>
        <BottomSpacer screenHeight={screenHeight}></BottomSpacer>
      </ScrollView>
      <Modal
        visible={state.modalName === "dataTypePicker" ? true : false}
        onRequestClose={() =>
          dispatch({
            type: "CLOSE-MODAL"
          })
        }
        animationType={"fade"}
        transparent={true}
      >
        <ObservationDataTypePicker />
      </Modal>
    </SectionContainer>
  );
};

const PostObservationButton = styled.TouchableOpacity`
  background: rgba(100, 100, 100, 0.35);
  width: 100%;
  height: 12%;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25); */
  /* border-radius: 10px; */
`;

const PostObservationText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
`;

const SentimentText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: ${props =>
    props.sentiment === ""
      ? "rgba(255, 255, 255, 0.85)"
      : props.sentiment === "Bullish"
      ? "green"
      : "red"};
  margin: 5px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const SectionContainer = styled.SafeAreaView`
  background: rgba(100, 100, 100, 0.15);
  width: ${props => props.screenWidth}px;
  /* height: ${props => props.screenHeight}px; */
  height: auto;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;

const BottomSpacer = styled.View`
  width: 100%;
  height: ${props => props.screenHeight * 0.12}px;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const PageDescriptionContainer = styled.View`
  background: rgba(100, 100, 100, 0.25);
  width: 85%;
  height: auto;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const DescriptionText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const ObservationOverviewContainer = styled.View`
  background: rgba(100, 100, 100, 0.25);
  width: 85%;
  height: auto;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
`;

const OverviewHeaderText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
  font-weight: bold;
`;

const AddedDataTextInputContainer = styled.View`
  /* background: rgba(100, 100, 100, 0.15); */
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
`;

const AddedDataTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: 90%;
  height: 35px;
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
