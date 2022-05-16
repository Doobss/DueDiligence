import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import {
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  SectionList,
  Modal
} from "react-native";
import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import { DescriptionWordButton } from "../Components/GeneralComponents";

import {
  grabFilteredWords,
  addWordToDataBase
} from "../StoredData/StoreFunctions";

import {
  wordArrayPredictiveFilter,
  searchArrayForText,
  addWord
} from "../ComponentFunctions/DescriptionBuilderFunc.js";

export default DescriptionBuilder = props => {
  let screenWidth = props.screenWidth;
  let screenHeight = props.screenHeight;

  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  //SearchValues for each section on the section lis

  const [addWordText, setAddWordText] = useState("");

  const [prevWord, setPrevWord] = useState("firstWord");
  const [predictedWordArray, setPredictedWordArray] = useState([
    { word: "Loading" }
  ]);

  useEffect(() => {
    let updatedWordArray = wordArrayPredictiveFilter(
      prevWord,
      state.observation.wordArray.data
    );
    setPredictedWordArray(updatedWordArray);
  }, [state.observation.wordArray.data, prevWord]);

  filterWordArrayByTypeAndText = (text, passedArray) => {
    const updatedArray = searchArrayForText(text, passedArray);

    setAddWordText(text);
    if (updatedArray.length <= 30) {
      setPredictedWordArray(updatedArray);
    } else {
      let reducedUpdatedArray = updatedArray.slice(0, 30);
      setPredictedWordArray(reducedUpdatedArray);
    }
  };

  addWordToTheSentance = (newWord, passedSentence) => {
    setAddWordText("");
    dispatch({
      type: "SET-DESCRIPTION",
      payload: passedSentence + " " + newWord
    });
    setPrevWord(newWord);
  };

  addWordByType = async (text, passedWordArray) => {
    let trimmedText = text.trim();

    const foundWord = passedWordArray.find(item => item.word === trimmedText);
    // console.log(foundWord);
    const splitBySpace = trimmedText.split(" ");
    if (splitBySpace.length === 1 && foundWord === undefined) {
      setAddWordText("");
      addWord(trimmedText, prevWord, passedWordArray, dispatch);
      setPrevWord(trimmedText);
      addWordToTheSentance(text, state.observation.description);
    } else if (foundWord === undefined) {
      alert("You can only add one word with no spaces");
    } else {
      alert("word already added");
    }
  };

  deleteLastWord = passedSentance => {
    setAddWordText("");
    const SentanceArray = passedSentance.split(" ");
    SentanceArray.pop();

    let newSentance = "";
    let SentanceArrayLength = SentanceArray.length;
    SentanceArray.forEach((item, index) => {
      //   console.log(index === SentanceArrayLength - 1);
      if (index === SentanceArrayLength - 1) {
        let prevWord = item ? item : "firstWord";
        setPrevWord(prevWord);
      }
      newSentance = newSentance === "" ? item : newSentance + " " + item;
    });
    dispatch({
      type: "SET-DESCRIPTION",
      payload: newSentance
    });
  };

  typeDescription = text => {
    dispatch({
      type: "SET-DESCRIPTION",
      payload: text
    });
  };

  RenderdItem = passedArray => {
    const RenderedArray = passedArray.map((item, index) => {
      return (
        <WordContainer
          disabled={
            item.word === "Loading" && item.predictiveIndex === undefined
              ? true
              : false
          }
          onPress={() =>
            addWordToTheSentance(item.word, state.observation.description)
          }
          key={index}
        >
          <WordText>{item.word}</WordText>
        </WordContainer>
      );
    });
    return RenderedArray;
  };

  addCategoryToCurrentSentanceAndStateDescription = (passedSentance, word) => {
    const newSentance = passedSentance + " " + word;
    //setCurrentSentance(newSentance);
    dispatch({
      type: "SET-DESCRIPTION",
      payload: newSentance
    });
    setPrevWord(word);
  };

  renderCategoryItem = passedArray => {
    const RenderedArray = passedArray.map((item, index) => {
      return (
        <CategoryContainer
          onPress={() =>
            addCategoryToCurrentSentanceAndStateDescription(
              state.observation.description,
              item.word
            )
          }
          key={index}
        >
          <WordText>{item.word}</WordText>
        </CategoryContainer>
      );
    });
    return RenderedArray;
  };

  inputTextAndScrollNext = (passedSentence, scrollFunc) => {
    dispatch({
      type: "SET-DESCRIPTION",
      payload: passedSentence
    });
    scrollFunc();
  };

  return (
    <SectionContainer screenWidth={screenWidth}>
      <ScrollView contentContainerStyle={{ width: "100%" }}>
        <TopHeaderText>Description</TopHeaderText>
        <TopContainer>
          <StyledTextInput
            multiline={true}
            placeholder="Build Sentance"
            placeholderTextColor="white"
            onChangeText={text => typeDescription(text)}
            value={state.observation.description}
            autoCompleteType="off"
          />
          <DeleteButtonContainer
            onPress={() => deleteLastWord(state.observation.description)}
          >
            <DeleteButtonText>Delete</DeleteButtonText>
          </DeleteButtonContainer>
        </TopContainer>
        <WordContextView>
          {renderCategoryItem(state.observation.selectedCategories)}
        </WordContextView>
        <WordContextView>
          {renderCategoryItem([
            { word: state.observation.focusedCompany.data.ticker }
          ])}
        </WordContextView>
        <WordContextView>{RenderdItem(predictedWordArray)}</WordContextView>
        <WordContextBottom>
          <FindWordStyledTextInput
            placeholder="Find word"
            placeholderTextColor="white"
            onChangeText={text =>
              filterWordArrayByTypeAndText(
                text,
                state.observation.wordArray.data
              )
            }
            value={addWordText}
            autoCompleteType="off"
          />
          <WordButtonContainer
            onPress={() =>
              addWordByType(addWordText, state.observation.wordArray.data)
            }
          >
            <WordButtonText>Add word</WordButtonText>
          </WordButtonContainer>
        </WordContextBottom>

        <WordButtonContainer
          onPress={() =>
            inputTextAndScrollNext(
              state.observation.description,
              props.scrollNext
            )
          }
        >
          <WordButtonText>Input description Text</WordButtonText>
        </WordButtonContainer>
      </ScrollView>
    </SectionContainer>
  );
};

const Spacer = styled.View`
  height: ${props => props.screenHeight * 0.25}px;
  width: 100%;
`;

const DeleteButtonContainer = styled.TouchableOpacity`
  height: auto;
  width: auto;
  /* background-color: rgba(255, 255, 255, .5); */
  background-color: rgba(79, 203, 137, 0.65);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

const DeleteButtonText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: white;
  margin: 10px;
`;

const FindWordStyledTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: 50%;
  height: 40px;
  border-radius: 10px;
  /* border: 1px #171A27; */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  margin: 5px;
  /* margin-top: 10px; */
  padding-left: 20px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.65);
  text-align: left;
`;

const SectionContainer = styled.SafeAreaView`
  background: rgba(100, 100, 100, 0.15);
  width: ${props => props.screenWidth}px;
  height: auto;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;

const TopHeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const WordContextView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  width: auto;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 2.5px;
  margin-right: 2.5px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const WordContextBottom = styled.View`
  flex-direction: row;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 2.5px;
  margin-right: 2.5px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const WordButtonContainer = styled.TouchableOpacity`
  height: auto;
  width: auto;
  /* background-color: rgba(255, 255, 255, .5); */
  background-color: rgba(79, 203, 137, 0.65);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

const WordButtonText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: white;
  margin: 10px;
`;

const CategoryContainer = styled.TouchableOpacity`
  height: 40px;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  background-color: rgba(255, 85, 31, 0.5);
`;

const WordContainer = styled.TouchableOpacity`
  height: 30px;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 3px;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  background-color: rgba(79, 203, 137, 0.65);
`;

const WordText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: white;
  margin: 2px;
  margin-left: 15px;
  margin-right: 15px;
`;

const StyledTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.4);
  width: 75%;
  height: 100%;
  border-radius: 10px;
  /* border: 1px #171A27; */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  margin: 10px;
  margin-top: 15px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
`;

const TopContainer = styled.TouchableOpacity`
  height: auto;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  background-color: rgba(79, 203, 137, 0);
`;
