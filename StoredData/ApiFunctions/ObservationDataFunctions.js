import { APIURL } from "../ApiUrl";
import UpdateObservationState from "../UpdateObservationStateFunction";
import uuid from "uuid";

export const getCompanyDataAndUpdateObservationFocusedCompany = async (
  ticker,
  dispatch
) => {
  const data = await fetch(APIURL + "/api/CompDataObj/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ticker: ticker
    })
  })
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse;
    })
    .catch(error => {
      console.log(error);
    });
  //console.log(data);
  const updateStateArray = [{ keyToUpdate: "focusedCompany", payload: data }];

  UpdateObservationState(updateStateArray, dispatch);
};

export const setObservationStateForNewObservation = async (
  ticker,
  dispatch
) => {
  const categoryObj = await fetch(APIURL + "/api/GetCompanyCategories/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ticker: ticker
    })
  })
    .then(response => response.json())
    .then(jsonResponse => {
      const newObj = {
        error: false,
        data: jsonResponse,
        loading: false
      };
      return newObj;
    })
    .catch(error => {
      console.log(error);
      return {
        error: true,
        data: undefined,
        loading: false
      };
    });

  const companyDataObj = await fetch(APIURL + "/api/CompDataObj/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ticker: ticker
    })
  })
    .then(response => response.json())
    .then(jsonResponse => {
      return { error: false, data: jsonResponse, loading: false };
    })
    .catch(error => {
      console.log(error);
      return { error: true, data: undefined, loading: false };
    });
  const wordArrayObj = await fetch(APIURL + "/api/GetObservationWordArray/")
    .then(response => response.json())
    .then(jsonResponse => {
      return { error: false, data: jsonResponse, loading: false };
    })
    .catch(error => {
      console.log(error);
      return { error: true, data: undefined, loading: false };
    });

  //console.log(wordArray);

  const updateStateArray = [
    { keyToUpdate: "focusedCompany", payload: companyDataObj },
    { keyToUpdate: "companyCategories", payload: categoryObj },
    { keyToUpdate: "wordArray", payload: wordArrayObj }
  ];

  UpdateObservationState(updateStateArray, dispatch);
};

export const addNewObservation = async (newObservation, ticker) => {
  newObservation.observationId = "OBS" + uuid.v4();
  newObservation.timePosted = Date.now();
  fetch(APIURL + "/api/AddObservation/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      newObservation: newObservation,
      ticker: ticker
    })
  })
    .then(response => response.text())
    .then(jsonResponse => {
      console.log(jsonResponse);
    })
    .catch(error => {
      console.warn(error);
    });
};

export const setObservationAddedData = async (type, data, text, dispatch) => {
  const updateStateArray = [
    {
      keyToUpdate: "addedData",
      payload: { type: type, data: data, text: text }
    }
  ];

  UpdateObservationState(updateStateArray, dispatch);
};

export const addWordToBataBaseAndUpdateState = async (
  newWord,
  wordArray,
  dispatch
) => {
  const data = await fetch(APIURL + "/api/AddWordToWordArray/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      newWord: newWord
    })
  })
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse
        ? { error: false, data: [newWord, ...wordArray], loading: false }
        : null;
    })
    .catch(error => {
      console.log(error);
      return { error: true, data: undefined, loading: false };
    });

  const updateStateArray = [{ keyToUpdate: "wordArray", payload: data }];
  UpdateObservationState(updateStateArray, dispatch);
};

export const setObservationSentiment = async (text, dispatch) => {
  const updateStateArray = [{ keyToUpdate: "sentiment", payload: text }];

  UpdateObservationState(updateStateArray, dispatch);
};
