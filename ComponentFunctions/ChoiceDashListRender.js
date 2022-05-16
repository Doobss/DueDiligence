import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";

import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";

import { getQuote } from "../StoredData/StoreFunctions";

import {
  CompanyQuoteButton,
  SelectableCompanyQuoteButton
} from "../Components/GeneralComponents";

export default ChoiceDashListRender = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const arrayToRender = props.arrayToRender;
  const dashType = props.dashType;

  loadQuote = async (passedItem, watchList, recentObs, recentRes) => {
    const updatedQuote = await getQuote(passedItem);
    //alert(JSON.stringify(array))
    const updatedItem = {
      ...passedItem,
      exchange: updatedQuote.exchange,
      company: updatedQuote.company,
      dailyChange: updatedQuote.dailyChange,
      percentChange: updatedQuote.percentChange,
      dollarChange: updatedQuote.dollarChange
    };
    //console.log(updatedItem);
    const updatedWatchlistArray = watchList.map(item =>
      item.ticker === passedItem.ticker ? updatedItem : item
    );
    const updatedRecentObsArray = recentObs.map(item =>
      item.ticker === passedItem.ticker ? updatedItem : item
    );
    const updatedRecentResArray = recentRes.map(item =>
      item.ticker === passedItem.ticker ? updatedItem : item
    );
    // alert(JSON.stringify(updatedArray))
    dispatch({
      type: "LOAD-COMPANY-QUOTE",
      payload: updatedWatchlistArray,
      payload2: updatedRecentObsArray,
      payload3: updatedRecentResArray
    });
  };

  const obsFunction = props.onPressObservation;
  const resFunction = props.onPressResearch;

  const RenderItems = arrayToRender.map((item, index) => {
    if (item.dailyChange === undefined) {
      return (
        <CompanyQuoteButton
          key={item.company}
          onPress={
            item.ticker !== "Loading"
              ? () =>
                  loadQuote(
                    item,
                    state.currentUser.watchList,
                    state.currentUser.recentObservations,
                    state.currentUser.recentResearch
                  )
              : null
          }
          text={undefined}
          dailyChange={undefined}
          ticker={item.ticker}
        />
      );
    } else if (props.selectable === true) {
      return (
        <SelectableCompanyQuoteButton
          key={item.company}
          onPressLoad={() =>
            loadQuote(
              item,
              state.currentUser.watchList,
              state.currentUser.recentObservations,
              state.currentUser.recentResearch
            )
          }
          onPressObservation={() => obsFunction(item)}
          onPressResearch={() => resFunction(item.ticker)}
          text={" " + item.dailyChange + " " + item.percentChange + "% "}
          dailyChange={item.dailyChange}
          ticker={item.ticker}
        />
      );
    } else {
      return (
        <CompanyQuoteButton
          key={item.company}
          onPress={
            dashType === "Observations"
              ? () => obsFunction(item)
              : () => resFunction(item.ticker)
          }
          text={" " + item.dailyChange + " " + item.percentChange + "% "}
          ticker={item.ticker}
          dailyChange={item.dailyChange}
        />
      );
    }
  });

  const render = RenderItems.map((item, index) => {
    return index % 2 === 0 ? (
      <VerticalTickerContainer key={index}>
        {RenderItems[index]}
        {RenderItems[index + 1]}
      </VerticalTickerContainer>
    ) : (
      <VerticalTickerContainer key={index}></VerticalTickerContainer>
    );
  });

  return render;
};

const VerticalTickerContainer = styled.View`
  flex-direction: row;
  height: auto;
  width: auto;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 1.5px;
  margin-right: 1.5px;
  /* margin-bottom: 10px; */
`;
