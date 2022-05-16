import React, { useEffect, useContext, useState } from "react";
import { AsyncStorage, Modal, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";
import GetUserLocation from "../ComponentFunctions/GetUserLocation";

import { getAllPostsUpToNumberPassed } from "../StoredData/ApiFunctions/AppDataFunctions";

import TabBarButtonArray from "../ComponentFunctions/TabBarButtonArray";

import SearchModal from "../Components/SearchModal";

import {
  ScreenContainerWithTab,
  ContentContainerWithTitle,
  IosSpacer,
  TopSpacerView,
  SmallScreenButton,
  ContainerSeperator
} from "../Components/GeneralComponents";

import { updateUser, buildGoolgeSearchURL } from "../StoredData/StoreFunctions";

import { getAllCompanyDataObjAndSetAppState } from "../StoredData/ApiFunctions/AppDataFunctions";
import {
  setUserEquities,
  setUserArchivedLnksAndSendToServer
} from "../StoredData/ApiFunctions/CurrentUserStateFunctions";

import { getCompanyDataAndUpdateObservationFocusedCompany } from "../StoredData/ApiFunctions/ObservationDataFunctions";

import { getIndustryDataAndSetResearchState } from "../StoredData/ApiFunctions/ResearchDataFunctions";

export default UserSettingsHomeScreen = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [searchText, setSearchText] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const LIGHT_ORANGE = "rgba(255, 160, 0, 1)";

  const DULL_ORANGE = "rgba(255, 160, 0, .1)";

  const TAB_LIGHT = "rgba(255, 255, 255, .8)";
  const TAB_DARK = "rgba(35, 35, 35, .9)";

  const SCREEN_BACKGROUND_COLOR_DARK = "rgba(30, 30, 30, 1)";
  const SCREEN_BACKGROUND_COLOR_LIGHT = "rgba(245, 245, 245, 1)";

  const CONTAINER_BACKGROUND_COLOR_DARK = "rgba(45, 45, 45, 1)";
  const CONTAINER_BACKGROUND_COLOR_LIGHT = "rgba(225, 225, 225, 1)";

  const BLACK_TEXT = "rgba(30, 30, 30, .75)";
  const WHITE_TEXT = "rgba(255, 255, 255, .9)";

  const BLACK_HEADER_TEXT = "rgba(30, 30, 30, .8)";
  const WHITE_HEADER_TEXT = "rgba(255, 255, 255, .85)";

  let darkThemeColors = {
    screenBackgroundColor: SCREEN_BACKGROUND_COLOR_DARK,
    textColor: WHITE_TEXT,
    headerTextColor: WHITE_HEADER_TEXT,
    containerColor: CONTAINER_BACKGROUND_COLOR_DARK,
    accentColor: LIGHT_ORANGE,
    dullAccentColor: DULL_ORANGE,
    tabBarColor: TAB_DARK
  };

  let lightThemeColors = {
    screenBackgroundColor: SCREEN_BACKGROUND_COLOR_LIGHT,
    textColor: BLACK_TEXT,
    headerTextColor: BLACK_HEADER_TEXT,
    containerColor: CONTAINER_BACKGROUND_COLOR_LIGHT,
    accentColor: LIGHT_ORANGE,
    dullAccentColor: DULL_ORANGE,
    tabBarColor: TAB_LIGHT
  };

  logOutAndNavigateToLogin = async () => {
    await AsyncStorage.setItem("localToken", "");
    dispatch({ type: "LOGOUT" });
    props.navigation.navigate("LoginScreen");
  };

  switchUserTips = () => {
    dispatch({ type: "SET-USER-TIPS" });
  };

  useEffect(() => {
    updateUser(state.currentUser);
  }, [state.currentUser]);

  handleOpenBrowser = textToSearch => {
    const searchURL = buildGoolgeSearchURL(textToSearch);
    WebBrowser.openBrowserAsync(searchURL);
  };
  let buttonArray = TabBarButtonArray(state, props, dispatch);
  const addedButton = {
    title: "state",
    onPress: () => console.log(state),
    selected: false
  };
  buttonArray.push(addedButton);

  setUserLocation = async () => {
    const address = await GetUserLocation();
    dispatch({
      type: "SET-USER-ADDRESS",
      payload: address
    });
  };

  editUserInfo = dataType => {
    const alertText = dataType + " type to update";
    alert(alertText);
  };

  return (
    <ScreenContainerWithTab tabButtons={buttonArray}>
      <ScrollView
        style={{
          width: "100%",
          alignContent: "center",
          justifyItems: "center"
        }}
      >
        <TopSpacerView></TopSpacerView>
        <IosSpacer></IosSpacer>
        <ContentContainerWithTitle title="User Settings">
          <ButtonContainer>
            <WordView>
              <BodyText textColor={state.currentUser.themeColors.textColor}>
                {"Logged in as: "}
              </BodyText>
              <BoldBodyText textColor={state.currentUser.themeColors.textColor}>
                {state.currentUser.userName}
              </BoldBodyText>
            </WordView>
            <SmallScreenButton
              title="Log out"
              size="minimal"
              onPress={() => logOutAndNavigateToLogin()}
            />
          </ButtonContainer>
          <ButtonContainer>
            <WordView>
              <BodyText textColor={state.currentUser.themeColors.textColor}>
                {"Location: "}
              </BodyText>
              <BoldBodyText textColor={state.currentUser.themeColors.textColor}>
                {state.userAddress === "" ? "Not set" : state.userAddress}
              </BoldBodyText>
            </WordView>
            <SmallScreenButton
              title={
                state.userAddress === "" ? "Find location" : "Save Location"
              }
              size="minimal"
              onPress={
                state.userAddress === ""
                  ? () => setUserLocation()
                  : () => editUserInfo("userLocation")
              }
            />
          </ButtonContainer>

          <ButtonContainer>
            <WordView>
              <BodyText textColor={state.currentUser.themeColors.textColor}>
                {"First name: "}
              </BodyText>
              <BoldBodyText textColor={state.currentUser.themeColors.textColor}>
                {state.currentUser.firstName}
              </BoldBodyText>
            </WordView>

            <SmallScreenButton
              // title="First Name"
              title=" Edit "
              size="minimal"
              onPress={() => editUserInfo("firstName")}
            />
          </ButtonContainer>
          <ButtonContainer>
            <WordView>
              <BodyText textColor={state.currentUser.themeColors.textColor}>
                {"Last Name: "}
              </BodyText>
              <BoldBodyText textColor={state.currentUser.themeColors.textColor}>
                {state.currentUser.lastName}
              </BoldBodyText>
            </WordView>
            <SmallScreenButton
              // title="Last Name"
              title=" Edit "
              size="minimal"
              onPress={() => editUserInfo("lastName")}
            />
          </ButtonContainer>
          <ButtonContainer>
            <WordView>
              <BodyText textColor={state.currentUser.themeColors.textColor}>
                {state.currentUser.userTips
                  ? "App tips are on"
                  : "App tips are off"}
              </BodyText>
              {/* <BoldBodyText textColor={state.currentUser.themeColors.textColor}>
                {state.currentUser.userTips ? "true" : "false"}
              </BoldBodyText> */}
            </WordView>
            <SmallScreenButton
              // title="Last Name"
              title={state.currentUser.userTips ? "Turn off" : "Turn on"}
              size="minimal"
              onPress={() => switchUserTips()}
            />
          </ButtonContainer>
          <ButtonContainer>
            <WordView>
              <BodyText textColor={state.currentUser.themeColors.textColor}>
                {showPassword ? "Password: " : "Password: "}
              </BodyText>
              <BoldBodyText textColor={state.currentUser.themeColors.textColor}>
                {showPassword ? state.currentUser.password : "*"}
              </BoldBodyText>
            </WordView>

            <SmallScreenButton
              // title="Password"
              title={showPassword ? " Edit " : "Show password"}
              size="minimal"
              onPress={
                showPassword
                  ? () => editUserInfo("password")
                  : () => setShowPassword(true)
              }
            />
          </ButtonContainer>
          <ButtonContainer>
            <SmallScreenButton
              title="log user"
              size="minimal"
              onPress={() => console.log(state.currentUser)}
            />
            <SmallScreenButton
              title="Update user"
              size="minimal"
              onPress={() => updateUser(state.currentUser)}
            />
          </ButtonContainer>
        </ContentContainerWithTitle>
        <ContainerSeperator></ContainerSeperator>

        <ContentContainerWithTitle title="Themes">
          <ButtonContainer>
            <SmallScreenButton
              title="Set Dark Theme"
              size="minimal"
              onPress={() =>
                dispatch({
                  type: "SET-USER-THEME",
                  payload: "dark",
                  payload2: darkThemeColors
                })
              }
            />
            <SmallScreenButton
              title="Set Light Theme"
              size="minimal"
              onPress={() =>
                dispatch({
                  type: "SET-USER-THEME",
                  payload: "light",
                  payload2: lightThemeColors
                })
              }
            />
            <BodyText textColor={state.currentUser.themeColors.textColor}>
              {" "}
            </BodyText>
          </ButtonContainer>
          <ButtonContainer>
            <BodyText textColor={state.currentUser.themeColors.textColor}>
              {"Current Theme: " + state.currentUser.colorTheme}
            </BodyText>
          </ButtonContainer>
        </ContentContainerWithTitle>
        <ContainerSeperator></ContainerSeperator>
        <ContentContainerWithTitle title="Search test">
          <TextInputView>
            <StyledTextInput
              screenHeight={state.dimensions.screenHeight}
              screenWidth={state.dimensions.screenWidth}
              placeholder="Search"
              placeholderTextColor={state.currentUser.themeColors.textColor}
              onChangeText={text => setSearchText(text)}
              value={searchText}
              autoCompleteType="off"
            />
          </TextInputView>
          <ButtonContainer>
            <SmallScreenButton
              title="Search this on google"
              size="minimal"
              onPress={() => handleOpenBrowser(searchText)}
            />
          </ButtonContainer>
          <ButtonContainer>
            <SmallScreenButton
              title="get 100 posts"
              size="minimal"
              onPress={() => getAllPostsUpToNumberPassed(100, dispatch)}
            />
          </ButtonContainer>
          <ButtonContainer>
            <SmallScreenButton
              title="set user Links"
              size="minimal"
              onPress={() =>
                setUserArchivedLnksAndSendToServer(
                  "AMD",
                  "Events page",
                  "http://ir.amd.com/upcoming-events",
                  state.currentUser.userArchivedLinks
                    ? state.currentUser.userArchivedLinks
                    : {},
                  dispatch
                )
              }
            />
          </ButtonContainer>
          <ButtonContainer>
            <SmallScreenButton
              title="Fetch All test"
              size="minimal"
              onPress={() =>
                getAllCompanyDataObjAndSetAppState(
                  state.currentUser.userEquities,
                  dispatch
                )
              }
            />

            <SmallScreenButton
              title="Set user equitites test"
              size="minimal"
              onPress={() =>
                setUserEquities(
                  state.currentUser.watchList,
                  state.currentUser.recentObservations,
                  state.currentUser.recentResearch,
                  dispatch
                )
              }
            />
          </ButtonContainer>
        </ContentContainerWithTitle>
        <ContainerSeperator></ContainerSeperator>
      </ScrollView>

      <Modal
        visible={state.modalName === "searchModal" ? true : false}
        onRequestClose={() =>
          dispatch({
            type: "CLOSE-MODAL"
          })
        }
        animationType={"fade"}
        transparent={true}
      >
        <SearchModal />
      </Modal>
    </ScreenContainerWithTab>
  );
};

const WordView = styled.View`
  width: auto;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BodyText = styled.Text`
  font-size: 20px;
  color: ${props => props.textColor};
`;

const BoldBodyText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${props => props.textColor};
`;

const TextInputView = styled.View`
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
  margin-bottom: 3px;
  padding-left: 5px;
  padding-right: 10px;
`;

const StyledTextInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: ${props => props.screenWidth * 0.8}px;
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
