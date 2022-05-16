import { APIURL } from "../ApiUrl";

import UpdateResearchState from "../UpdateResearchStateFunction";

export const getCompanyDataAndUpdateResearchFocusedCompany = async (
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
  // return Promise.resolve(data);
  //console.log(data);
  const updateStateArray = [{ keyToUpdate: "focusedCompany", payload: data }];
  UpdateResearchState(updateStateArray, dispatch);
};

export const getIndustryDataAndSetResearchState = async (
  industry,
  dispatch
) => {
  const data = await fetch(APIURL + "/api/GetIndustryWithArray/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      industry: industry
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
  // return Promise.resolve(data);
  //console.log(data);

  const updateStateArray = [{ keyToUpdate: "focusedIndustry", payload: data }];
  UpdateResearchState(updateStateArray, dispatch);
};

export const getSectorDataAndSetResearchState = async (sector, dispatch) => {
  const data = await fetch(APIURL + "/api/GetSectorWithArray/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sector: sector
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
  // // return Promise.resolve(data);
  // console.log(data);
  const updateStateArray = [{ keyToUpdate: "focusedSector", payload: data }];
  UpdateResearchState(updateStateArray, dispatch);
};
