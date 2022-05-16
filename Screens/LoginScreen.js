import React, { useEffect, useContext, useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components";
import Button from "../Components/Button";
import { AsyncStorage, KeyboardAvoidingView } from "react-native";

import { BlurView } from "expo-blur";

import { userLoginFetch } from "../StoredData/StoreFunctions";

import { DispatchContext, StateContext } from "../AppContext";

// import { ScreenContainer } from "../Components/GeneralComponents";

export default LoginScreen = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [typedUserName, setUserName] = useState("");
  const [typedPassword, setPassword] = useState("");

  login = async () => {
    setUserName("");
    setPassword("");
    const user = await userLoginFetch(typedUserName, typedPassword);

    if (user !== undefined) {
      dispatch({
        type: "SET-CURRENT-USER",
        payload: user
      });
      const userToken = { userToken: user.token, persist: user.persistLogin };
      const currentUserStr = JSON.stringify(userToken);
      await AsyncStorage.setItem("localToken", currentUserStr);
      props.navigation.navigate("ChoiceScreen");
    } else {
      alert("NO login");
    }
  };

  testState = () => {
    console.log(state);
  };

  return (
    <BackgroundImage source={require("../assets/DarkPointBG.png")}>
      <KeyboardAvoidingView style={{ height: "100%", width: "100%" }}>
        <TestBox>
          <GreetingContainer>
            <GreetingText>Hello</GreetingText>
          </GreetingContainer>
        </TestBox>

        <TestBox2>
          <Container>
            <BlurView
              tint="dark"
              intensity={80}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <LoginText>Login</LoginText>
              <StyledTextInput
                placeholder="User name"
                onChangeText={text => setUserName(text)}
                value={typedUserName}
              />
              <StyledTextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={typedPassword}
              />

              <Button
                onPress={() =>
                  typedUserName && typedPassword
                    ? login()
                    : alert("Check for missing info")
                }
                title="Login"
                size="minimal"
              />
            </BlurView>
          </Container>

          <Button
            onPress={() => testState()}
            title="Test state"
            size="minimal"
          />
        </TestBox2>
      </KeyboardAvoidingView>
    </BackgroundImage>
  );
};

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  /* background-color: rgba(255,255,255, .1); */
`;

const GreetingContainer = styled.View`
  height: auto;
  width: 100%;
  align-content: center;
  justify-content: center;
  flex-direction: row;
`;

const GreetingText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  /* color: #171A27; */
  color: white;
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
const LoginText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  /* color: #171A27; */
  color: white;
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const Container = styled.View`
  height: 55%;
  width: 90%;
  border-radius: 15px;
  overflow: hidden;
`;
const TestBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TestBox2 = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  background: rgba(0, 0, 0, 0);
  width: 280px;
  height: 50px;
  border-radius: 0px;
  border: 1px #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  margin: 10px;
  padding-left: 20px;
  font-size: 18px;
  color: white;
  text-align: left;
`;
