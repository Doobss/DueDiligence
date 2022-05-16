import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import {
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  WebView,
  Linking
} from "react-native";
import { withNavigation } from "react-navigation";

import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import Button from "../Components/Button";

// import { WebView } from "react-native";

const WebViewModal = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

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
          <WebView
            javaScriptEnabled
            // style={{ flex: 1 }}
            scalesPageToFit={false}
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={["*"]}
            mixedContentMode="always"
            source={{
              uri: "https://www.google.com"
            }}
          />
          <Button
            title="Close Webview"
            size="minimal"
            onPress={() =>
              dispatch({
                type: "CLOSE-MODAL"
              })
            }
          />
        </ModalContainer>
      </Container>
    </BlurView>
  );
};

export default withNavigation(WebViewModal);

const Container = styled.View`
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;
const ModalContainer = styled.View`
  border-radius: 15px;
  width: 95%;
  height: 90%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  overflow: hidden;
`;
