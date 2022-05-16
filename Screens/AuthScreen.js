import React, { useEffect, useContext, useLayoutEffect } from "react";
import styled from "styled-components";
import AsyncStore from "../AsyncStore";
import Button from "../Components/Button";
import { AsyncStorage } from "react-native";
import { StateContext, DispatchContext } from "../AppContext";
import { postUserFirstTime, checkPersist } from "../StoredData/StoreFunctions";
import { USERFETCH } from "../Reducers/AppStateReducer";

export default AuthScreen = props => {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);

  useLayoutEffect(() => {
    testToken();
  }, []);

  postTest = () => {
    if (state.currentUser !== "") {
      postUserFirstTime(state.currentUser);
    } else {
      console.log("no user");
    }
  };

  loginScreenButton = () => {
    props.navigation.navigate("LoginScreen");
  };

  testToken = async () => {
    const response = await AsyncStorage.getItem("localToken");
    if (response === null) {
      props.navigation.navigate("LoginScreen");
    } else {
      const tokenData = JSON.parse(response);
      const token = tokenData.userToken;
      const time = tokenData.persist;
      console.log(token);
      const persisted = await checkPersist(token, time);
      if (persisted.bool) {
        console.log("persisted");
        const updatedToken = { userToken: token, persist: Date.now() };
        const updatedTokenStr = JSON.stringify(updatedToken);
        AsyncStorage.setItem("localToken", updatedTokenStr);

        dispatch({
          type: "SET-CURRENT-USER",
          payload: persisted.user
        });
        props.navigation.navigate("ChoiceScreen");
      } else if (!persisted.bool) {
        console.log("persisted false");
        props.navigation.navigate("LoginScreen");
      } else {
        Console.log("undefined");
        props.navigation.navigate("LoginScreen");
      }
    }
  };

  return (
    <Container>
      <TestBox>
        <AsyncStore />
      </TestBox>
      <TestBox2>
        <Button onPress={() => testToken()} title="Token test" />
        <Button onPress={() => postTest()} title="post test" />
        <Button onPress={() => loginScreenButton()} title="Login Screen" />
        <Button
          onPress={() => props.navigation.navigate("HomeScreen")}
          title="Home Screen"
        />
      </TestBox2>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
`;
const TestBox = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const TestBox2 = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;
