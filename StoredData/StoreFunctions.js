import { NYSE } from "./NYSE";
import { NQNM } from "./NQNM";
import uuid from "uuid";

import { APIURL } from "./ApiUrl";

//const APIURL = "https://c60d3686.ngrok.io";

const allTickers = [...NQNM, ...NYSE];

// Builds Google URL

export const buildGoolgeSearchURL = textToSearch => {
  let searchWordsArray = textToSearch.split(" ");

  let searchTerm = "";
  if (searchWordsArray.length === 1) {
    searchTerm = searchWordsArray[0];
  } else {
    const newString = searchWordsArray.reduce((acc, item, index) => {
      if (index === 0) {
        return item;
      } else {
        return acc + "+" + item;
      }
    });
    searchTerm = newString;
  }
  const URL =
    "https://www.google.com/search?biw=1370&bih=1176&tbm=nws&sxsrf=ACYBGNQZqTEdku_894p0tIh5ZzeHVEvs0A%3A1573680088016&ei=2HPMXbpF7PLmAujyv_gI&q=" +
    searchTerm +
    "&oq=" +
    searchTerm +
    "&gs_l=psy-ab.3..0l2.13627.18730.0.18994.19.17.1.1.1.0.228.1227.15j0j1.17.0....0...1c.1.64.psy-ab..0.18.1229.0..0i13k1.57.nTc-62rpPeQ";

  return URL;
};

//Google news
//https://www.google.com/search?biw=1370&bih=1176&tbm=nws&sxsrf=ACYBGNQZqTEdku_894p0tIh5ZzeHVEvs0A%3A1573680088016&ei=2HPMXbpF7PLmAujyv_gI&q="+searchTerm+"&oq="+searchTerm+"&gs_l=psy-ab.3..0l2.13627.18730.0.18994.19.17.1.1.1.0.228.1227.15j0j1.17.0....0...1c.1.64.psy-ab..0.18.1229.0..0i13k1.57.nTc-62rpPeQ

// Date funtions

export const buildUSDate = miliseconds => {
  const postedDate = new Date(miliseconds);
  const nowsMiliseconds = Date.now();
  const today = new Date(nowsMiliseconds);

  const year = postedDate.getFullYear();
  const month = postedDate.getMonth();
  const day = postedDate.getDate();

  const yearToday = today.getFullYear();
  const monthToday = today.getMonth();
  const dayToday = today.getDate();

  let datePosted = month + "/" + day + "/" + year;
  let todayDate = monthToday + "/" + dayToday + "/" + yearToday;
  //If posted today, returns time posted
  if (datePosted === todayDate) {
    //let timeSincePosted = new Date(nowsMiliseconds - miliseconds);
    const postedHour = postedDate.getHours();
    const postedMinute =
      postedDate.getMinutes() === 0 ? "00" : postedDate.getMinutes();
    //const normalizedMinutes = postedMinute === 0 ? "00" : postedMinute;
    if (postedHour >= 12) {
      let nonMilitaryTimeHour = 0;
      if (postedHour === 12) {
        nonMilitaryTimeHour = postedHour;
      } else {
        nonMilitaryTimeHour = postedHour - 12;
      }
      datePosted = nonMilitaryTimeHour + ":" + postedMinute + "pm";
    } else {
      datePosted = postedHour + ":" + postedMinute + "am";
    }
  }

  return datePosted;
};

export const todaysDateString = () => {
  const nowsMiliseconds = Date.now();
  const today = new Date(nowsMiliseconds);

  const yearToday = today.getFullYear();
  const monthToday = today.getMonth() + 1;
  const dayToday = today.getDate();

  let todayDate = monthToday + "/" + dayToday + "/" + yearToday;

  return todayDate;
};

export const buildUSTodaysDate = () => {
  const nowsMiliseconds = Date.now();
  const today = new Date(nowsMiliseconds);

  const yearToday = today.getFullYear();
  let monthToday = today.getMonth();
  const dayToday = today.getDate();

  const monthTextFromNumber = monthToday.toString();

  //console.log(monthToday);

  let monthText = "";

  switch (monthTextFromNumber) {
    case "0": {
      monthText = "January";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "1": {
      monthText = "Febuaray";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "2": {
      monthText = "March";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "3": {
      monthText = "April";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "4": {
      monthText = "May";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "5": {
      monthText = "June";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "6": {
      monthText = "July";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "7": {
      monthText = "August";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "8": {
      monthText = "September";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "9": {
      monthText = "October";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "10": {
      monthText = "November";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
    case "11": {
      monthText = "December";
      let todayDate = monthText + ", " + dayToday + " " + yearToday;
      return todayDate;
    }
  }

  return "Error dude";
};

//Observation fetch's

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

export const grabObservationsByCategory = async (ticker, category) => {
  const data = fetch(APIURL + "/api/GrabObservationsByCategory/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      category: category,
      ticker: ticker
    })
  })
    .then(response => {
      if (response.ok) {
        //console.log("ok grabObservationsByCategory");
        //console.log(response);
        return response.json();
      } else {
        console.log("not ok grabObservationsByCategory");
        console.log(response);
        return response.json();
      }
    })
    .then(jsonResponse => {
      //console.log(jsonResponse);
      return jsonResponse;
    })
    .catch(error => {
      console.warn(error);
    });
  return Promise.resolve(data);
};

//QuickType functions

export const addWordToDataBase = async item => {
  fetch(APIURL + "/api/AddWordToDataBase/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      newWord: item
    })
  })
    .then(response => response.text())
    .then(jsonResponse => {
      //console.log(jsonResponse);
    })
    .catch(error => {
      console.warn(error);
    });
};

export const grabFilteredWords = prevWord => {
  const data = fetch(APIURL + "/api/WordFilter/")
    .then(response => response.json())
    .then(resJson => {
      //console.log(resJson);
      return resJson;
    })
    .catch(error => console.log("error"));
  return data;
};

export const grabCompanyByTicker = passedItem => {
  const match = allTickers.find(item => item.ticker === passedItem.ticker);
  //console.log(match)
  return match.dailyChange;
};

export const basicFilter = text => {
  const filterd = allTickers.filter(item => {
    let tickerLowerCase = item.ticker.toLowerCase();
    let searchValue = text.toLowerCase().trim();
    return tickerLowerCase.indexOf(searchValue) > -1;
  });
  return filterd;
};

export const basicFilterByCompName = text => {
  const filterd = allTickers.filter(item => {
    let compToLowercase = item.company.toLowerCase();
    let searchValue = text.toLowerCase().trim();
    return compToLowercase.indexOf(searchValue) > -1;
  });
  return filterd;
};

export const getPressReleases = ticker => {
  const data = fetch(APIURL + "/api/PressRelease/" + ticker)
    .then(response => response.json())
    .then(jsonResponse => {
      //console.log(jsonResponse);
      return jsonResponse;
    })
    .catch(error => {
      console.log(error);
    });
  return Promise.resolve(data);
};

export const getInfo = ticker => {
  const data = fetch(APIURL + "/api/CompData/" + ticker)
    .then(response => {
      if (response.ok) {
        //console.log("ok getInfo");
        //console.log(response);
        return response.json();
      } else {
        console.log("not ok getInfo");
        console.log(response);
        return response.json();
      }
    })
    .then(jsonResponse => {
      return jsonResponse;
    })
    .catch(error => {
      console.warn(error);
    });
  return Promise.resolve(data);
};

export const getQuote = item => {
  const data = fetch(APIURL + "/api/Quote/" + item.ticker)
    .then(response => response.json())
    .then(jsonResponse => {
      //console.log(jsonResponse);
      return jsonResponse;
    })
    .catch(error => {
      console.warn(error);
    });

  return Promise.resolve(data);
};

export const getCompCategories = (ticker, userName) => {
  const data = fetch(
    APIURL + "/api/Observations/" + ticker + "?userName=" + userName
  )
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse;
    })
    .catch(error => {
      console.warn(error);
    });
  return Promise.resolve(data);
};

export const addCompCategory = (ticker, updatedCategory) => {
  fetch(APIURL + "/api/Observations/AddCategory/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ticker: ticker,
      updatedCategory: updatedCategory
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

//USER FUNCTIONS

("/users/login/");

export const userLoginFetch = (userName, password) => {
  const data = fetch(APIURL + "/api/usersLogin/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName: userName,
      password: password
    })
  })
    .then(response => response.json())
    .then(resJson => resJson)
    .catch(error => alert(error));
  //console.log(Promise.resolve(data));
  return Promise.resolve(data);
};

export const checkPersist = (token, persistTime) => {
  const data = fetch(
    APIURL + "/users/persistCheck/?token=" + token + "&time=" + persistTime
  )
    .then(response => {
      if (response.ok) {
        //console.log("ok checkPersisted");
        //console.log(response);
        return response.json();
      } else {
        console.log("not ok checkPersisted");
        console.log(response);
        return response.json();
      }
    })
    .then(resJson => {
      return resJson;
    })
    .catch(error => console.log(error));
  //console.log(Promise.resolve(data));
  return Promise.resolve(data);
};

export const postUserFirstTime = user => {
  const userid = uuid.v4();
  const userNameLength = user.userName.length;
  const randomizer = Math.floor(Math.random() * Math.floor(3));
  let addedData = "";
  if (randomizer == 0) {
    addedData = "dD";
  } else if (randomizer === 1) {
    addedData = "dd";
  } else if (randomizer === 2) {
    addedData = "Dd";
  } else {
    addedData = "DD";
  }
  const userAPIKey = addedData + userid + randomizer;
  //const APIkeyStr = JSON.stringify(userAPIKey);
  const newPosted = { ...user, userId: userid, userAPIKey: userAPIKey };
  const newPostedStr = JSON.stringify(newPosted);
  //console.log(newPosted);
  fetch(APIURL + "/api/updateUser/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: newPostedStr
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

export const updateUser = user => {
  fetch(APIURL + "/api/updateUser/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user
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

export const checkCompanyEventPage = ticker => {
  fetch(APIURL + "/api/companyEvent/", {
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
      console.log(jsonResponse);
    })
    .catch(error => {
      console.warn(error);
    });
};

//https://mean-chipmunk-35.localtunnel.me/api/CompData/JPM

//https://ancient-owl-21.localtunnel.me/api/CompData/JPM

// export const buildUserEquityList = state => {
//   const list = state.currentUser.userEquities;

//   //alert(JSON.stringify(list))
//   let recentObsList = [];
//   let recentRDList = [];
//   let watchList = [];

//   const seperate = list.map(item => {
//     if (item.watchList === true) {
//       if (item.recentObs === true) {
//         if (item.recentRD === true) {
//           watchList.push(item);
//           recentObsList.push(item);
//           recentRDList.push(item);
//         } else {
//           watchList.push(item);
//           recentObsList.push(item);
//         }
//       } else if (item.recentRD === true) {
//         watchList.push(item);
//         recentRDList.push(item);
//       } else {
//         watchList.push(item);
//       }
//     } else if (item.recentObs === true) {
//       if (item.recentRD === true) {
//         recentObsList.push(item);
//         recentRDList.push(item);
//       } else {
//         recentObsList.push(item);
//       }
//     } else {
//       recentRDList.push(item);
//     }
//   });

//   //alert(JSON.stringify(dailyChange))
//   const listObj = {
//     recentObs: recentObsList,
//     recentRD: recentRDList,
//     watchList: watchList
//   };

//   return listObj;
// };

// export const findMatch = async passedArray => {
//   const recents = [
//     { ticker: "AAPL", timeOpened: "", dailyChange: "+" },
//     { ticker: "MSFT", timeOpened: "", dailyChange: "+" },
//     { ticker: "WORK", timeOpened: "", dailyChange: "-" },
//     { ticker: "AMD", timeOpened: "", dailyChange: "+" },
//     { ticker: "INTC", timeOpened: "", dailyChange: "-" },
//     { ticker: "SNAP", timeOpened: "", dailyChange: "+" }
//   ];

//   const res = recents.forEach(passedItem =>
//     allTickers.find(item => item.ticker === passedItem.ticker)
//   );
//   setInterval(() => {
//     console.log(res);
//   }, 1000);
// };

// export const asyncFindMatch = async item => {
//   return await findMatch(item);
// };
