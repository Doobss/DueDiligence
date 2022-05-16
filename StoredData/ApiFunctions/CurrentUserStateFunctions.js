import { APIURL } from "../ApiUrl";
import UpdateCurrentUserState from "../UpdateCurrentUserStateFunction";

export const addToWatchList = (ticker, currentWatchlist, dispatch) => {
  const newWatchListItem = { ticker: ticker, timeOpened: Date.now() };
  let newWatchListArray = [...currentWatchlist, newWatchListItem];
  const updatedStateArray = [
    { keyToUpdate: "watchList", payload: newWatchListArray }
  ];
  UpdateCurrentUserState(updatedStateArray, dispatch);
};

export const removeFromWatchList = (ticker, currentWatchlist, dispatch) => {
  let updatedArray = currentWatchlist.filter(item =>
    item.ticker === ticker ? null : item
  );
  const updatedStateArray = [
    { keyToUpdate: "watchList", payload: updatedArray }
  ];
  UpdateCurrentUserState(updatedStateArray, dispatch);
};

export const addToFrontOfRecentResearched = (
  ticker,
  currentRecentResearched,
  dispatch
) => {
  const arrayWithoutPassedTicker = currentRecentResearched.filter(
    item => item.ticker !== ticker
  );
  const newWatchListItem = { ticker: ticker, timeOpened: Date.now() };
  let newResearchArray = [newWatchListItem, ...arrayWithoutPassedTicker];
  const updatedStateArray = [
    { keyToUpdate: "recentResearch", payload: newResearchArray }
  ];
  UpdateCurrentUserState(updatedStateArray, dispatch);
};

export const addToFrontOfRecentObservations = (
  ticker,
  currentRecentObservations,
  dispatch
) => {
  const arrayWithoutPassedTicker = currentRecentObservations.filter(
    item => item.ticker !== ticker
  );
  const newWatchListItem = { ticker: ticker, timeOpened: Date.now() };
  let newObservationArray = [newWatchListItem, ...arrayWithoutPassedTicker];
  const updatedStateArray = [
    { keyToUpdate: "recentObservations", payload: newObservationArray }
  ];
  UpdateCurrentUserState(updatedStateArray, dispatch);
};

export const setUserEquities = async (
  userWatchList,
  userRecentObservations,
  userRecentResearched,
  dispatch
) => {
  const totalList = [
    ...userWatchList,
    ...userRecentObservations,
    ...userRecentResearched
  ];
  let addedTickerObj = {};

  let tickerArray = [];

  totalList.forEach(item => {
    if (addedTickerObj[item.ticker] === undefined) {
      addedTickerObj[item.ticker] = true;
      tickerArray.push({ ticker: item.ticker });
    }
  });

  const updatedStateArray = [
    { keyToUpdate: "userEquities", payload: tickerArray }
  ];
  UpdateCurrentUserState(updatedStateArray, dispatch);
};

export const setUserArchivedLnksAndSendToServer = async (
  ticker,
  linkName,
  URL,
  currentUserLinksObj,
  dispatch
) => {
  fetch(APIURL + "/api/achriveURLTextByTicker/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ticker: ticker,
      URL: URL
    })
  })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      // return Promise.resolve({
      //   error: false,
      //   data: jsonResponse,
      //   loading: false
      // });
    })
    .catch(error => {
      console.log("error archiving" + URL + " for " + ticker);
      console.log(error);
    });
  return;

  // let newLinkObj = { linkName: linkName, url: URL };
  // let updatedLinkArray = [];
  // let updatedLinksObj = {};

  // if (currentUserLinksObj[ticker] !== undefined) {
  //   const foundLink = currentUserLinksObj[ticker].find(
  //     item => item.url === URL || item.linkName === linkName
  //   );
  //   console.log(foundLink);
  //   if (foundLink === undefined) {
  //     updatedLinkArray = [...currentUserLinksObj[ticker], newLinkObj];
  //     updatedLinksObj = { ...currentUserLinksObj, [ticker]: updatedLinkArray };

  //     const updatedStateArray = [
  //       { keyToUpdate: "userArchivedLinks", payload: updatedLinksObj }
  //     ];
  //     UpdateCurrentUserState(updatedStateArray, dispatch);
  //     return;
  //   } else if (foundLink.url === URL) {
  //     alert("Already saved that link");
  //     return;
  //   } else if (foundLink.linkName === linkName) {
  //     alert("Already a link with that name");
  //     return;
  //   }
  // } else {
  //   fetch(APIURL + "/api/achriveURLTextByTicker/", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       ticker: ticker,
  //       URL: URL
  //     })
  //   }).catch(error => {
  //     console.log("error archiving" + URL + " for " + ticker);
  //     console.log(error);
  //   });
  //   updatedLinksObj = { ...currentUserLinksObj, [ticker]: [newLinkObj] };
  //   const updatedStateArray = [
  //     { keyToUpdate: "userArchivedLinks", payload: updatedLinksObj }
  //   ];
  //   UpdateCurrentUserState(updatedStateArray, dispatch);
  //   return;
  // }
  // const updatedStateArray = [{ keyToUpdate: "userArchivedLinks", payload: {} }];
  // UpdateCurrentUserState(updatedStateArray, dispatch);
  // return;
};

// const equities = [
//   { ticker: "AAPL", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "MCS", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "MSFT", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "WORK", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "INTC", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "SNAP", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "AAOI", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "AGIO", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "ACLS", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "BIIB", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "NIO", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "UBER", watchList: true, recentObs: false, recentRD: true },
//   { ticker: "TSLA", watchList: true, recentObs: false, recentRD: true }
// ];
