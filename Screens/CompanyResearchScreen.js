import React, { useEffect, useContext, useLayoutEffect } from "react";
import { ScrollView, Modal } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";
import Button from "../Components/Button";

import { getPressReleases, updateUser } from "../StoredData/StoreFunctions";

import {
  addToWatchList,
  removeFromWatchList,
  addToFrontOfRecentResearched
} from "../StoredData/ApiFunctions/CurrentUserStateFunctions";

import CategoryPickerResearch from "../Components/CategoryPickerResearch";

import TabBarButtonArray from "../ComponentFunctions/TabBarButtonArray";

import {
  ScreenContainerWithTab,
  IosSpacer,
  TopSpacerView
} from "../Components/GeneralComponents";

export default CompanyResearchScreen = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  watchListedCompany = () => {
    const inWatchList = state.currentUser.watchList.find(item =>
      item.ticker === state.focusedCompany.ticker ? true : false
    );
    return inWatchList;
  };

  useEffect(() => {
    if (
      state.currentUser.recentResearch[0].ticker !== state.focusedCompany.ticker
    ) {
      addToFrontOfRecentResearched(
        state.focusedCompany.ticker,
        state.currentUser.recentResearch,
        dispatch
      );
    }
  }, []);

  useEffect(() => {
    addOrRemoveButtonTitle();
  }, [state.currentUser.watchList]);

  useEffect(() => {
    updateUser(state.currentUser);
  }, [state.currentUser]);

  handleOpenPressReleaseLink = link => {
    console.log(link);
    const prefixURL = "https://finance.yahoo.com";
    console.log(prefixURL + link);
    WebBrowser.openBrowserAsync(prefixURL + link, { toolbarColor: "#171A27" });
  };

  handleGoogleSelectedCategories = categoryText => {};

  renderArticles = () => {
    const articleArray = state.focusedCompany.companyArticles;

    if (articleArray.length > 5) {
      const shortenedArray = articleArray.slice(0, 5);

      const arraryTorRender = shortenedArray.map(item => {
        return (
          <ArticleItem
            key={item.link}
            onPress={() => handleOpenPressReleaseLink(item.link)}
          >
            <ArticleItemText>{item.title}</ArticleItemText>
          </ArticleItem>
        );
      });
      return arraryTorRender;
    } else {
      const arraryTorRender = articleArray.map(item => {
        return (
          <ArticleItem
            key={item.link}
            onPress={() => handleOpenPressReleaseLink(item.link)}
          >
            <ArticleItemText>{item.title}</ArticleItemText>
          </ArticleItem>
        );
      });
      return arraryTorRender;
    }
  };

  grabPressReleases = async ticker => {
    const articleData = await getPressReleases(ticker);
    dispatch({
      type: "SET-FOCUSED-COMPANY-ARTICLES",
      payload: articleData
    });
  };

  addOrRemoveButtonTitle = () => {
    const title = watchListedCompany()
      ? "Remove from watch list"
      : "Add to watch list";
    return title;
  };

  let buttonArray = TabBarButtonArray(state, props, dispatch);
  const addedButton = {
    title: "state",
    onPress: () => console.log(state),
    selected: false
  };
  buttonArray.push(addedButton);

  return (
    <ScreenContainerWithTab tabButtons={buttonArray}>
      <ScrollView
        //   centerContent={true}
        contentContainerStyle={{
          width: "100%",
          //   height: screenHeight,
          alignItems: "center"
        }}
      >
        <TopSpacerView></TopSpacerView>
        <IosSpacer></IosSpacer>
        <HeaderContainer>
          <HeaderText>{state.focusedCompany.company}</HeaderText>
          <HeaderSubText selectable={true}>
            {/* <HeaderSubText> */}
            {"Industry: " + state.focusedCompany.industry}
          </HeaderSubText>

          <Button
            title={addOrRemoveButtonTitle()}
            size="minimal"
            onPress={
              watchListedCompany()
                ? () =>
                    removeFromWatchList(
                      state.focusedCompany.ticker,
                      state.currentUser.watchList,
                      dispatch
                    )
                : () =>
                    addToWatchList(
                      state.focusedCompany.ticker,
                      state.currentUser.watchList,
                      dispatch
                    )
            }
          />
        </HeaderContainer>
        <CategoryPickerResearch />
        <ArticleContainer>
          <DescriptionHeaderText>Press Releases:</DescriptionHeaderText>

          <ArticleItemContainer>
            {state.focusedCompany.companyArticles ? (
              renderArticles()
            ) : (
              <Button
                title="Tap to load Press releases"
                size="minimal"
                onPress={() => grabPressReleases(state.focusedCompany.ticker)}
              />
            )}
          </ArticleItemContainer>
        </ArticleContainer>
        <CompanyDescriptionContainer>
          <DescriptionHeaderText>Company Overview:</DescriptionHeaderText>
          <DescriptionBodyText>
            {state.focusedCompany.description
              ? state.focusedCompany.description
              : "Loading"}
          </DescriptionBodyText>
        </CompanyDescriptionContainer>
      </ScrollView>
      <Modal
        visible={state.modalName === "webViewModal" ? true : false}
        onRequestClose={() =>
          dispatch({
            type: "CLOSE-MODAL"
          })
        }
        animationType={"fade"}
        transparent={true}
      ></Modal>
    </ScreenContainerWithTab>
  );
};

const Container = styled.SafeAreaView`
  background: rgba(0, 0, 0, 1);
  height: 100%;
  width: 100%;
`;

const HeaderContainer = styled.View`
  height: auto;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  background: rgba(100, 100, 100, 0.25);
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 10px;
  font-weight: bold;
`;

const HeaderSubText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 10px;
`;

const CompanyDescriptionContainer = styled.View`
  height: auto;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  background: rgba(100, 100, 100, 0.25);
  padding-top: 10px;
  padding-bottom: 10px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ArticleContainer = styled.View`
  height: auto;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  background: rgba(100, 100, 100, 0.25);
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ArticleItemContainer = styled.View`
  height: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ArticleItem = styled.TouchableOpacity`
  height: auto;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  background: rgba(100, 100, 100, 0.15);
  margin: 5px;
`;

const ArticleItemText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 10px;
`;

const DescriptionHeaderText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 10px;
  font-weight: bold;
`;

const DescriptionBodyText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 10px;
`;
