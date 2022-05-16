import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StateContext } from "../AppContext";
import styled from "styled-components";

export default Button = props => {
  const [state] = useContext(StateContext);

  let INIT_TEXT_COLOR = "rgba(255, 255, 255, .9)";

  if (props.size === "minimal")
    return (
      <MinimalContainer onPress={props.onPress}>
        <MinimalButtonText
          textColor={
            state.currentUser.themeColors
              ? state.currentUser.themeColors.textColor
              : INIT_TEXT_COLOR
          }
        >
          {props.title}
        </MinimalButtonText>
      </MinimalContainer>
    );
  else
    return (
      <SmallContainer onPress={props.onPress}>
        <MinimalButtonText
          textColor={
            state.currentUser.themeColors
              ? state.currentUser.themeColors.textColor
              : INIT_TEXT_COLOR
          }
        >
          {props.title}
        </MinimalButtonText>
      </SmallContainer>
    );
};

const MinimalContainer = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0);
  width: auto;
  height: 30px;
  border-radius: 0px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

  margin: 10px;
`;

const MinimalButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${props => props.textColor};
`;

const SmallContainer = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0);
  width: 200px;
  height: 50px;
  border-radius: 0px;
  border: 1px #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

  margin: 10px;
`;
