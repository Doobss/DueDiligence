import React, { useContext } from "react";

import styled from "styled-components";
import Button from "../Components/Button";
import { DispatchContext, StateContext } from "../AppContext";

import { withNavigation } from "react-navigation";

// export default TabBar = props => {
const TabBar = props => {
  const [state] = useContext(StateContext);

  addButtons = buttonArray => {
    let numberOfButtons = buttonArray.length;
    const tabButtons = buttonArray.map(item => {
      //   console.log(item);
      return (
        <TabButton
          key={item.title}
          onPress={item.onPress}
          height={state.dimensions.screenHeight}
          width={state.dimensions.screenWidth / numberOfButtons}
          //   underlayColor={state.currentUser.themeColors.dullAccentColor}
          //   selected={item.selected}
          //   selectedColor={state.currentUser.themeColors.dullAccentColor}
        >
          <TabButtonText
            textColor={state.currentUser.themeColors.textColor}
            selected={item.selected}
            selectedColor={state.currentUser.themeColors.accentColor}
          >
            {item.title}
          </TabButtonText>
        </TabButton>
      );
    });
    return (
      <TabView
        height={state.dimensions.screenHeight}
        width={state.dimensions.screenWidth}
      >
        {tabButtons}
      </TabView>
    );
  };
  return (
    <TabContainer
      height={state.dimensions.screenHeight}
      background={
        state.currentUser.themeColors.tabBarColor
          ? state.currentUser.themeColors.tabBarColor
          : "rgba(35, 35, 35, .9)"
      }
      borderColor={
        state.currentUser.colorTheme === "light"
          ? state.currentUser.themeColors.accentColor
          : state.currentUser.themeColors.dullAccentColor
      }
    >
      {addButtons(props.itemsArray)}
      {/* <BottomSpacer></BottomSpacer> */}
    </TabContainer>
  );
};

export default withNavigation(TabBar);

const TabButton = styled.TouchableOpacity`
  height: ${props => props.height * 0.1}px;
  width: ${props => props.width}px;
  background: ${props =>
    props.selected ? props.selectedColor : "rgba( 255, 255, 255, 0 )"};
  padding-top: ${props => props.height * 0.02}px;
  justify-content: flex-start;
  align-items: center;
`;

const TabButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${props => (props.selected ? props.selectedColor : props.textColor)};
`;

const TabView = styled.View`
  width: ${props => props.width}px;
  /* height: ${props => props.height * 0.1}px; */
  flex:1;
  justify-content: space-around;
  align-content: center;
  flex-direction: row;
`;
const BottomSpacer = styled.View`
  width: 100%;
  height: 15px;
`;

const TabContainer = styled.View`
  /* position: absolute;
  left: 0;
  bottom: 0;
  top:${props => props.height - props.height * 0.1};
  right:0; */
  height: ${props => props.height * 0.1}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 5px;
  padding-top: 5px; */
  border-width: 1.5px;
  border-color: ${props => props.background};
  border-top-color: ${props => props.borderColor};
  /* background: ${props => props.background}; */
  background: rgba( 255, 255, 255, 0 );
`;
