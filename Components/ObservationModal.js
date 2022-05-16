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
import Button from "./Button";

import {
  predicitveFilterV1,
  updatePredictive,
  addWord
} from "../StoredData/ObservationV1";
import CategoryPicker from "./CategoryPicker";
import DescriptionBuilder from "./DescriptionBuilder";

export default ObservationModal = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [addWordModal, setAddWordModal] = useState(false);
  const [addWordText, setAddWordText] = useState("");

  //SearchValues for each section on the section lis

  const componentsToRender = [
    {
      title: "Category Picker",
      data: [<CategoryPicker />]
    },
    { title: "Description", data: [<DescriptionBuilder />] }
  ];

  test = () => {
    console.log(state);
  };

  return (
    <BlurView
      tint="dark"
      intensity={65}
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      <Container>
        <ModalContainer>
          <HeaderContainer>
            <HeaderText>
              New quick Observation: {state.focusedCompany.ticker}
            </HeaderText>
            <ElipsisButton onPress={() => test()}>
              <Elipsis>•••</Elipsis>
            </ElipsisButton>
          </HeaderContainer>

          <ObservationOverView>
            <OverViewHeaderText>Observation Overview</OverViewHeaderText>
            <OverViewBodyText>
              Sector: {state.focusedCompany.sector}
            </OverViewBodyText>
            {/* <OverViewBodyText>Description:</OverViewBodyText>
            <OverViewBodyText>Added Data:</OverViewBodyText> */}
          </ObservationOverView>

          <SectionList
            pagingEnabled={true}
            horizontal={true}
            sections={componentsToRender}
            renderItem={item => {
              console.log(item);
              return item.item;
            }}
            keyExtractor={(item, index) => index.toString()}
            renderSectionHeader={({ section: { title } }) =>
              //   <HeaderText>{title}</HeaderText>
              null
            }
          />
          <NewButtonContainer onPress={() => dispatch({ type: "CLOSE-MODAL" })}>
            <NewButtonText>Close</NewButtonText>
          </NewButtonContainer>
        </ModalContainer>
        <Modal
          visible={addWordModal}
          onRequestClose={() =>
            dispatch({
              type: "CLOSE-MODAL"
            })
          }
          animationType={"fade"}
          transparent={true}
        >
          <BlurView
            tint="dark"
            intensity={65}
            style={{
              height: "100%",
              width: "100%"
            }}
          >
            <Container>
              <AddWordModalView>
                <StyledTextInput
                  placeholder="Search"
                  placeholderTextColor="white"
                  onChangeText={text => setAddWordText(text)}
                  value={addWordText}
                  autoCompleteType="off"
                />
                <Button
                  title="Add word"
                  //   onPress={() => addWordAndCloseModal()}
                  size="minimal"
                />
                <Button
                  title="Close"
                  onPress={() => setAddWordModal(!addWordModal)}
                  size="minimal"
                />
              </AddWordModalView>
            </Container>
          </BlurView>
        </Modal>
      </Container>
    </BlurView>
  );
};

const ObservationOverView = styled.View`
  height: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

const OverViewBodyText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
const OverViewHeaderText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 5px;
  margin-top: 20px;
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

const WordContainer = styled.TouchableOpacity`
  height: 40px;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  background-color: rgba(79, 203, 137, 0.65);
`;

const WordText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: white;
  margin: 2px;
  margin-left: 15px;
  margin-right: 15px;
`;

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

const AddWordModalView = styled.View`
  width: 320px;
  height: auto;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: rgba(50, 50, 50, 0.85);
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

const SectionContainer = styled.View`
  background: rgba(100, 100, 100, 0.35);
  width: 370px;
  height: auto;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
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
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2;
  overflow: hidden;
`;

//${props => (props.theme === 'dark') ? 'rgba(25, 25, 25, .75)' : 'rgba(255, 255, 255, .75)'}

const StyledTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: 90%;
  height: 40px;
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

const FindWordStyledTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: 50%;
  height: 40px;
  border-radius: 10px;
  /* border: 1px #171A27; */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  margin: 10px;
  margin-top: 15px;
  padding-left: 20px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.65);
  text-align: left;
`;
