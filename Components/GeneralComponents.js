import React, { useContext, useState } from "react";
import styled from "styled-components";
import { StateContext } from "../AppContext";
import { ActivityIndicator } from "react-native";
import TabBar from "./TabBar";
import { BlurView } from "expo-blur";

const LIGHT_ORANGE = "rgba(255, 160, 0, 1)";

const DULL_ORANGE = "rgba(255, 160, 0, .1)";

const SCREEN_BACKGROUND_COLOR_DARK = "rgba(30, 30, 30, 1)";
const SCREEN_BACKGROUND_COLOR_LIGHT = "rgba(245, 245, 245, 1)";

const CONTAINER_BACKGROUND_COLOR_DARK = "rgba(30, 30, 30, 0)";
const CONTAINER_BACKGROUND_COLOR_LIGHT = "rgba(225, 225, 225, 1)";

const BLACK_TEXT = "rgba(30, 30, 30, .75)";
const WHITE_TEXT = "rgba(255, 255, 255, .9)";

const BLACK_HEADER_TEXT = "rgba(30, 30, 30, .8)";
const WHITE_HEADER_TEXT = "rgba(255, 255, 255, .85)";

// setColor();

// const text = state.currentUser.themeColors.textColor
// const headerText = state.currentUser.themeColors.headerTextColor
// const background = state.currentUser.themeColors.screenBackgroundColor
// const container = state.currentUser.themeColors.container
// const accent = state.currentUser.themeColors.accent

// const TEXT_COLOR = state.currentUser.themeColors.textColor

export const TopScreenHeaderText = props => {
  const [state] = useContext(StateContext);
  const TEXT_COLOR = state.currentUser.themeColors.headerTextColor;
  return (
    <HeaderTextView>
      <TopHeaderText textColor={TEXT_COLOR}>{props.text}</TopHeaderText>
    </HeaderTextView>
  );
};

export const ScreenHeaderText = props => {
  const [state] = useContext(StateContext);
  const TEXT_COLOR = state.currentUser.themeColors.headerTextColor;
  return (
    <HeaderTextView>
      <HeaderText textColor={TEXT_COLOR}>{props.text}</HeaderText>
    </HeaderTextView>
  );
};

const HeaderTextView = styled.View`
  height: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TopHeaderText = styled.Text`
  margin-left: 15px;
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.textColor};
`;

const HeaderText = styled.Text`
  margin-left: 15px;
  font-size: 26px;
  /* font-weight: bold; */
  color: ${props => props.textColor};
`;
export const IosSpacer = props => {
  return <IosView></IosView>;
};

const IosView = styled.View`
  width: 100%;
  height: 44px;
`;

export const TopSpacerView = props => {
  return <TopView></TopView>;
};

const TopView = styled.View`
  width: 100%;
  height: 40px;
`;

export const ContainerSeperator = props => {
  return <ContainerSeperatorView></ContainerSeperatorView>;
};

const ContainerSeperatorView = styled.View`
  width: 100%;
  height: 20px;
`;

export const ScreenContainerWithTab = props => {
  const [state] = useContext(StateContext);

  return (
    <Container
      screenWidth={state.dimensions.screenWidth}
      backGroundColor={state.currentUser.themeColors.screenBackgroundColor}
    >
      <BlurView
        intensity={100}
        tint={state.currentUser.colorTheme === "dark" ? "dark" : "default"}
        style={{
          width: state.dimensions.screenWidth,
          height: 44,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1
        }}
      />
      <TabedScreenContainer screenWidth={state.dimensions.screenWidth}>
        {props.children}
      </TabedScreenContainer>
      <TabBar itemsArray={props.tabButtons} />
    </Container>
  );
};

const TabedScreenContainer = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

export const ScreenContainer = props => {
  const [state] = useContext(StateContext);

  return (
    <Container
      screenWidth={state.dimensions.screenWidth}
      backGroundColor={state.currentUser.themeColors.screenBackgroundColor}
    ></Container>
  );
};

const Container = styled.View`
  background: ${props => props.backGroundColor};
  height: 100%;
  width: ${props => props.screenWidth}px;

  align-items: center;
  justify-content: center;
`;

export const ContentContainerWithTitle = props => {
  const [state] = useContext(StateContext);

  return (
    <ContentContainerView
      screenWidth={state.dimensions.screenWidth}
      backGroundColor={state.currentUser.themeColors.containerColor}
    >
      <TopContentContainerView
        backGroundColor={state.currentUser.themeColors.dullAccentColor}
        // backGroundColor={state.currentUser.themeColors.accentColor}
      >
        <ContentContainerHeaderText
          headerTextColor={state.currentUser.themeColors.headerTextColor}
        >
          {props.title}
        </ContentContainerHeaderText>
      </TopContentContainerView>
      <ContentContainerSpacer>{props.children}</ContentContainerSpacer>
    </ContentContainerView>
  );
};

const TopContentContainerView = styled.View`
  background: ${props => props.backGroundColor};
  height: auto;
  width: 100%;
  align-content: center;
  justify-content: space-around;
  padding: 8px;
  padding-left: 15px;
`;

export const ContentContainer = props => {
  const [state] = useContext(StateContext);

  return (
    <ContentContainerView
      screenWidth={state.dimensions.screenWidth}
      backGroundColor={state.currentUser.themeColors.containerColor}
    >
      <ContentContainerHeaderText
        headerTextColor={state.currentUser.themeColors.headerTextColor}
      >
        {props.title + ":"}
      </ContentContainerHeaderText>
      <ContentContainerSpacer>{props.children}</ContentContainerSpacer>
    </ContentContainerView>
  );
};

const ContentContainerHeaderText = styled.Text`
  font-size: 24px;
  color: ${props => props.headerTextColor};
`;
const ContentContainerSpacer = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ContentContainerView = styled.View`
  background: ${props => props.backGroundColor};
  height: auto;
  width: ${props => props.screenWidth * 0.9}px;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;
  overflow: hidden;
`;

export const CompanyQuoteButton = props => {
  const [state] = useContext(StateContext);

  const TEXT_COLOR = state.currentUser.themeColors.textColor;
  return (
    <CompanyQuoteButtonContainer
      screenWidth={state.dimensions.screenWidth}
      onPress={props.onPress}
      dailyChange={props.dailyChange}
    >
      <QuoteDollarSignText textColor={TEXT_COLOR}>$</QuoteDollarSignText>
      <QuoteBoldText textColor={TEXT_COLOR}>{props.ticker}</QuoteBoldText>

      <QuoteText textColor={TEXT_COLOR}>
        {props.text === undefined ? "            " : props.text}
      </QuoteText>
      {props.dailyChange !== undefined ? null : (
        <ActivityIndicator size="small" color="white" />
      )}
    </CompanyQuoteButtonContainer>
  );
};

export const SelectableCompanyQuoteButton = props => {
  const [state] = useContext(StateContext);
  const [selected, setSelected] = useState(false);

  const TEXT_COLOR = state.currentUser.themeColors.textColor;
  return selected === false ? (
    <CompanyQuoteButtonContainer
      screenWidth={state.dimensions.screenWidth}
      onPress={
        props.dailyChange !== undefined
          ? () => setSelected(true)
          : props.onPressLoad
      }
      dailyChange={props.dailyChange}
    >
      <QuoteDollarSignText textColor={TEXT_COLOR}>$</QuoteDollarSignText>
      <QuoteBoldText textColor={TEXT_COLOR}>{props.ticker}</QuoteBoldText>

      <QuoteText textColor={TEXT_COLOR}>
        {props.text === undefined ? "            " : props.text}
      </QuoteText>
      {props.dailyChange !== undefined ? null : (
        <ActivityIndicator size="small" color="white" />
      )}
    </CompanyQuoteButtonContainer>
  ) : (
    <SelectedCompanyQuoteButtonContainer
      screenWidth={state.dimensions.screenWidth}
      onPress={() => setSelected(false)}
      dailyChange={props.dailyChange}
    >
      <SelectedButtonTextView>
        <QuoteDollarSignText textColor={TEXT_COLOR}>$</QuoteDollarSignText>
        <QuoteBoldText textColor={TEXT_COLOR}>{props.ticker}</QuoteBoldText>

        <QuoteText textColor={TEXT_COLOR}>
          {props.text === undefined ? "            " : props.text}
        </QuoteText>
      </SelectedButtonTextView>
      <SelectedButtonTopButtonView
        colorTheme={state.currentUser.colorTheme}
        onPress={props.onPressObservation}
        dailyChange={props.dailyChange}
      >
        <QuoteText textColor={TEXT_COLOR}>New Observation</QuoteText>
      </SelectedButtonTopButtonView>
      <SelectedButtonTopButtonView
        colorTheme={state.currentUser.colorTheme}
        onPress={props.onPressResearch}
        dailyChange={props.dailyChange}
      >
        <QuoteText textColor={TEXT_COLOR}>Research</QuoteText>
      </SelectedButtonTopButtonView>
    </SelectedCompanyQuoteButtonContainer>
  );
};
const QuoteDollarSignText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: ${props => props.textColor};
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 5px;
`;
const QuoteText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: ${props => props.textColor};
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
`;
const QuoteBoldText = styled.Text`
  font-size: 20px;
  margin-top: 2px;
  margin-bottom: 2px;
  /* color: #171A27; */
  color: ${props => props.textColor};
  font-weight: bold;
`;

const SelectedButtonTopButtonView = styled.TouchableOpacity`
  background: ${props =>
    props.colorTheme === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(40, 40, 40, 0.05)"};
  flex-direction: row;
  height: auto;
  width: 100%;
  /* border-width: 1px;
  border-bottom-width: 0.5px; */
  align-content: center;
  justify-content: center;
  padding-top: 3px;
  padding-bottom: 3px;
  margin: 1px;
`;
// const SelectedButtonBottomButtonView = styled.TouchableOpacity`
//   background: ${props =>
//     props.colorTheme === "dark"
//       ? "rgba(255, 255, 255, 0.1)"
//       : "rgba(40, 40, 40, 0.1)"};
//   flex-direction: row;
//   height: auto;
//   width: 100%;
//   align-content: center;
//   justify-content: center;
//   /* border-width: 1px;
//   border-top-width: 0.5px; */
//   padding-top: 3px;
//   padding-bottom: 3px;
//   margin: 1px;
// `;

const SelectedButtonTextView = styled.View`
  flex-direction: row;
  height: auto;
  width: 100%;
  align-content: center;
  justify-content: center;
`;
const SelectedCompanyQuoteButtonContainer = styled.TouchableOpacity`
  background: ${props =>
    props.dailyChange !== undefined
      ? props.dailyChange === "+"
        ? "rgba(79, 203, 137, 0.1)"
        : "rgba(193, 62, 55, 0.1)"
      : "rgba(10, 10, 10, 1)"};
  height: auto;
  width: ${props => props.screenWidth * 0.45}px;
  align-content: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${props =>
    props.dailyChange !== undefined
      ? props.dailyChange === "+"
        ? "rgba(79, 203, 137, 0.5)"
        : "rgba(193, 62, 55, 0.5)"
      : "rgba(10, 10, 10, 1)"};
  border-radius: 10px;
  overflow: hidden;
  padding-top: 5px;
  margin: 2.5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const CompanyQuoteButtonContainer = styled.TouchableOpacity`
  background: ${props =>
    props.dailyChange !== undefined
      ? props.dailyChange === "+"
        ? "rgba(79, 203, 137, 0.1)"
        : "rgba(193, 62, 55, 0.1)"
      : "rgba(10, 10, 10, 1)"};
  flex-direction: row;
  height: auto;
  width: ${props => props.screenWidth * 0.45}px;
  align-content: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${props =>
    props.dailyChange !== undefined
      ? props.dailyChange === "+"
        ? "rgba(79, 203, 137, 0.5)"
        : "rgba(193, 62, 55, 0.5)"
      : "rgba(10, 10, 10, 1)"};
  border-radius: 10px;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 2.5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const LargeScreenButton = props => {
  const [state] = useContext(StateContext);
  const TEXT_COLOR = state.currentUser.themeColors.textColor;
  return (
    <LargeScreenButtonView>
      <LargeScreenButtonContainer
        screenWidth={state.dimensions.screenWidth}
        onPress={props.onPress}
        backGroundColor={DULL_ORANGE}
        borderColor={LIGHT_ORANGE}
      >
        <LargeScreenButtonText textColor={TEXT_COLOR}>
          {props.text}
        </LargeScreenButtonText>
      </LargeScreenButtonContainer>
    </LargeScreenButtonView>
  );
};

const LargeScreenButtonView = styled.View`
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LargeScreenButtonContainer = styled.TouchableOpacity`
  background: ${props => props.backGroundColor};
  height: auto;
  width: ${props => props.screenWidth * 0.75}px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${props => props.borderColor};
  border-radius: 10px;
  overflow: hidden;
  margin: 2.5px;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const LargeScreenButtonText = styled.Text`
  font-size: 24px;
  /* color: #171A27; */
  color: ${props => props.textColor};
  margin: 15px;
`;

export const SmallScreenButtonWithViewContainer = props => {
  const [state] = useContext(StateContext);
  const TEXT_COLOR = state.currentUser.themeColors.textColor;
  return (
    <SmallScreenButtonView>
      <SmallScreenButtonContainer
        screenWidth={state.dimensions.screenWidth}
        onPress={props.onPress}
        backGroundColor={DULL_ORANGE}
        borderColor={LIGHT_ORANGE}
      >
        <SmallScreenButtonText textColor={TEXT_COLOR}>
          {props.title}
        </SmallScreenButtonText>
      </SmallScreenButtonContainer>
    </SmallScreenButtonView>
  );
};

export const SmallScreenButton = props => {
  const [state] = useContext(StateContext);
  return (
    <SmallScreenButtonContainer
      onPress={props.onPress}
      backGroundColor={DULL_ORANGE}
      borderColor={LIGHT_ORANGE}
    >
      <SmallScreenButtonText
        textColor={state.currentUser.themeColors.textColor}
      >
        {props.title}
      </SmallScreenButtonText>
    </SmallScreenButtonContainer>
  );
};

const SmallScreenButtonView = styled.View`
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SmallScreenButtonContainer = styled.TouchableOpacity`
  background: ${props => props.backGroundColor};
  height: auto;
  width: auto;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${props => props.borderColor};
  border-radius: 10px;
  overflow: hidden;
  margin: 2.5px;
`;

const SmallScreenButtonText = styled.Text`
  font-size: 18px;
  color: ${props => props.textColor};
  margin: 7.5px;
`;

export const DescriptionWordButton = props => {
  const [state] = useContext(StateContext);
  const TEXT_COLOR = state.currentUser.themeColors.textColor;
  return (
    <DescriptionWordContainer onPress={props.onPress} disabled={props.disabled}>
      <DescriptionText textColor={TEXT_COLOR}>{props.text}</DescriptionText>
    </DescriptionWordContainer>
  );
};

const DescriptionWordContainer = styled.TouchableOpacity`
  height: auto;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 3px;
  border-width: 1px;
  border-color: rgba(79, 203, 137, 0.65);
  background-color: rgba(79, 203, 137, 0.25);
`;

export const CategoryButton = props => {
  const [state] = useContext(StateContext);
  const TEXT_COLOR = state.currentUser.themeColors.textColor;
  return (
    <CategoryButtonContainer selected={props.selected} onPress={props.onPress}>
      <DescriptionText textColor={TEXT_COLOR}>{props.text}</DescriptionText>
    </CategoryButtonContainer>
  );
};

const CategoryButtonContainer = styled.TouchableOpacity`
  height: auto;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 3px;
  border-width: 1px;
  border-color: ${props =>
    props.selected === true
      ? "rgba(79, 203, 137, 0.75)"
      : "rgba(79, 203, 137, 0.65)"};
  background-color: ${props =>
    props.selected === true
      ? "rgba(79, 203, 137, 0.75)"
      : "rgba(79, 203, 137, 0.25)"};
`;

const DescriptionText = styled.Text`
  font-size: 18px;
  color: ${props => props.textColor};
  margin: 5px;
  margin-left: 15px;
  margin-right: 15px;
`;
