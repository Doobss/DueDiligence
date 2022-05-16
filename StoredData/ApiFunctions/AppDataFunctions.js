import { APIURL } from "../ApiUrl";
import UpdateAppDataState from "../UpdateAppDataStateFunction";

export const getAllPostsUpToNumberPassed = async (numberOfPosts, dispatch) => {
  const response = await fetch(APIURL + "/api/getAllPosts/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numberOfPosts: numberOfPosts
    })
  })
    .then(response => response.json())
    .then(jsonResponse => {
      //console.log(jsonResponse);
      return { error: false, data: jsonResponse, loading: false };
    })
    .catch(error => {
      console.warn(error);
      return { error: true, data: undefined, loading: false };
    });
  //return data;
  const sortedArray = response.data.sort((a, b) => b.timePosted - a.timePosted);
  const updateAppDataArray = [
    {
      keyToUpdate: "allPosts",
      payload: { error: response.error, data: sortedArray, loading: false }
    }
  ];
  UpdateAppDataState(updateAppDataArray, dispatch);
};

export const updateAppDataRecentPosts = async (ticker, dispatch) => {
  const response = await fetch(APIURL + "/api/UpdateRecentPosts/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ticker: ticker
    })
  })
    .then(response => response.text())
    .then(jsonResponse => {
      //console.log(jsonResponse);
      return { error: false, data: jsonResponse, loading: false };
    })
    .catch(error => {
      console.warn(error);
      return { error: true, data: undefined, loading: false };
    });
  //return data;
  const updateAppDataArray = [{ keyToUpdate: "allPosts", payload: response }];
  UpdateAppDataState(updateAppDataArray, dispatch);
};

export const getAddDataRecentPostsByDate = async (date, dispatch) => {
  console.log(date);
  const response = await fetch(APIURL + "/api/GetAppDataRecentPostsByDate/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: date
    })
  })
    .then(response => {
      //console.log(response);
      return response.json();
    })
    .then(jsonResponse => {
      console.log(jsonResponse);
      return { error: false, data: jsonResponse, loading: false };
    })
    .catch(error => {
      console.log("error no App Data Recent Posts");
      return { error: true, data: undefined, loading: false };
    });

  //return data;
  if (response.data === undefined) {
    const updateAppDataArray = [
      { keyToUpdate: "trendingCompanies", payload: response }
    ];
    UpdateAppDataState(updateAppDataArray, dispatch);
  } else {
    const sortedArray = response.data.postedArray.sort(
      (a, b) => b.numberOfPosts - a.numberOfPosts
    );

    const sortedStateData = {
      error: false,
      data: { datePosted: response.data.datePosted, postedArray: sortedArray },
      loading: false
    };
    const updateAppDataArray = [
      { keyToUpdate: "trendingCompanies", payload: sortedStateData }
    ];
    UpdateAppDataState(updateAppDataArray, dispatch);
  }
};

export const getAllCompanyDataObjAndSetAppState = async (
  tickerArray,
  dispatch
) => {
  const response = await fetch(APIURL + "/api/fetchAllCompanyDataObj/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tickerArray: tickerArray
    })
  })
    .then(response => response.json())
    .then(jsonResponse => {
      //console.log(jsonResponse);
      return Promise.resolve({
        error: false,
        data: jsonResponse,
        loading: false
      });
    })
    .catch(error => {
      console.log(error);
      return Promise.resolve({ error: true, data: undefined, loading: false });
    });

  const updatedStateArray = [
    { keyToUpdate: "userEquitiesObj", payload: response }
  ];
  UpdateAppDataState(updatedStateArray, dispatch);
};

export const setAppStateIndustryAndSectors = async dispatch => {
  const data = await fetch(APIURL + "/api/SetIndustryAndSectorArrays/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(jsonResponse => {
      return {
        industry: { error: false, data: jsonResponse.industry, loading: false },
        sector: { error: false, data: jsonResponse.sector, loading: false }
      };
    })
    .catch(error => {
      console.log(error);
      return { error: true, data: undefined, loading: false };
    });
  // return Promise.resolve(data);
  //console.log(data);

  const updateStateArray = [
    { keyToUpdate: "industryArray", payload: data.industry },
    { keyToUpdate: "sectorArray", payload: data.sector }
  ];
  UpdateAppDataState(updateStateArray, dispatch);
};
