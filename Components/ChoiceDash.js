import React, { useContext, useLayoutEffect } from "react";
import { ScrollView, Dimensions } from "react-native";

import { DispatchContext, StateContext } from "../AppContext";
import styled from "styled-components";

import ChoiceDashListRender from "../ComponentFunctions/ChoiceDashListRender";
// import { findMatchedByTicker } from '../StoredData/StoreFunctions'
import { getInfo } from "../StoredData/StoreFunctions";
import ResearchTabNavigation from "../ComponentFunctions/ResearchTabNavigation";
import UpdateObservationState from "../StoredData/UpdateObservationStateFunction";

import {
  getCompanyDataAndUpdateObservationFocusedCompany,
  setObservationStateForNewObservation
} from "../StoredData/ApiFunctions/ObservationDataFunctions";

import {
  ContentContainer,
  ContainerSeperator
} from "../Components/GeneralComponents";

import {
  SmallScreenButtonWithViewContainer,
  ScreenHeaderText
} from "../Components/GeneralComponents";

import { withNavigation } from "react-navigation";

export const ChoiceDash = props => {
  const dashType = props.dashType;
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  // const userRecent =
  //   dashType === "Observations"
  //     ? state.currentUser.recentObservations
  //     : state.currentUser.recentResearch;

  const userWatchList = state.currentUser.watchList;

  ButtonText = () => {
    switch (dashType) {
      case "Observations":
        return "New Observation +";
      case "Research":
        return "Research New Company +";
    }
  };

  confirmUserRecentArray = recentArray => {
    const timeStillRecent = 5 * 24 * 3600 * 1000;
    const timeNow = Date.now();
    let recent = recentArray.filter(item => {
      item.timeOpened === "" ? 0 : item.timeOpened;
      if (timeNow - item.timeOpened <= timeStillRecent) {
        //console.log(item.ticker + " still recent");
        return item;
      } else {
        null;
      }
    });

    return recent;
  };

  useLayoutEffect(() => {
    const updatedArray =
      dashType === "Observations"
        ? confirmUserRecentArray(state.currentUser.recentObservations)
        : confirmUserRecentArray(state.currentUser.recentResearch);
    dispatch({
      type: "SET-EQUITIES-ARRAY",
      payload: updatedArray,
      payload2: dashType
    });
  }, []);

  // let data = confirmUserRecentArray(userRecent);

  getRecentCompanyDataAndNavigateToResearch = async (
    ticker,
    state,
    dispatch,
    props
  ) => {
    const companyData = await getInfo(ticker);

    //console.log(companyData);
    dispatch({
      type: "SET-FOCUSED-COMPANY-CLOSE-MODAL",
      payload: companyData
    });
    ResearchTabNavigation(
      state.currentStack,
      props.navigation.state.routeName,
      "CompanyResearchScreen",
      props,
      dispatch
    );
    // props.props.navigation.navigate("CompanyResearchScreen");
  };

  newQuickObservation = async item => {
    if (state.observation.focusedCompany.ticker !== item.ticker) {
      //getCompanyDataAndUpdateObservationFocusedCompany(item.ticker, dispatch);
      await setObservationStateForNewObservation(item.ticker, dispatch);
      props.navigation.navigate("ObservationScreen");
    } else {
      props.navigation.navigate("ObservationScreen");
    }
  };

  const watchListToRender = userWatchList
    ? userWatchList
    : [{ ticker: "Loading" }];

  return (
    <DashContainer screenWidth={state.dimensions.screenWidth}>
      <ScreenHeaderText text={"My Recent observations:"} />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          alignContent: "flex-start",
          justifyContent: "center"
        }}
      >
        <ListContainer screenWidth={state.dimensions.screenWidth}>
          <ChoiceDashListRender
            onPressObservation={passedItem => newQuickObservation(passedItem)}
            onPressResearch={passedItem =>
              getRecentCompanyDataAndNavigateToResearch(
                passedItem,
                state,
                dispatch,
                props
              )
            }
            arrayToRender={confirmUserRecentArray(
              state.currentUser.recentObservations
            )}
            dashType={"Observations"}
          />
        </ListContainer>
      </ScrollView>
      <SmallScreenButtonWithViewContainer
        onPress={() => dispatch({ type: "SHOW-MODAL", payload: "searchModal" })}
        title={"New Observation +"}
      />
      <ContainerSeperator />

      <ScreenHeaderText text={"My Recent researched:"} />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          alignContent: "flex-start",
          justifyContent: "center"
        }}
      >
        <ListContainer screenWidth={state.dimensions.screenWidth}>
          <ChoiceDashListRender
            onPressObservation={passedItem => newQuickObservation(passedItem)}
            onPressResearch={passedItem =>
              getRecentCompanyDataAndNavigateToResearch(
                passedItem,
                state,
                dispatch,
                props
              )
            }
            arrayToRender={confirmUserRecentArray(
              state.currentUser.recentResearch
            )}
            dashType={"Research"}
          />
        </ListContainer>
      </ScrollView>
      <SmallScreenButtonWithViewContainer
        onPress={() => props.props.navigation.navigate("ResearchHomeScreen")}
        title={"Research New Company +"}
      />
      <ContainerSeperator />
      <ScreenHeaderText text={"Watch list:"} />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          alignContent: "flex-start",
          justifyContent: "center"
        }}
      >
        <ListContainer screenWidth={state.dimensions.screenWidth}>
          <ChoiceDashListRender
            onPressObservation={passedItem => newQuickObservation(passedItem)}
            onPressResearch={passedItem =>
              getRecentCompanyDataAndNavigateToResearch(
                passedItem,
                state,
                dispatch,
                props
              )
            }
            arrayToRender={watchListToRender}
            dashType={dashType}
            selectable={true}
          />
        </ListContainer>
      </ScrollView>
    </DashContainer>
  );
};

export default withNavigation(ChoiceDash);

const DashContainer = styled.View`
  height: auto;
  width: ${props => props.screenWidth};
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
`;

const ListContainer = styled.View`
  height: auto;
  width: auto;
  /* flex-direction: row; */
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 10px;
`;

const ElipsisButton = styled.TouchableOpacity`
  height: auto;
  width: auto;
`;

const Elipsis = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: white;
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
