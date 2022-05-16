import RenderSeperatedPostArray from "../Components/RenderSeperatedPostArray";

import React from "react";

export default RenderRecentPosts = props => {
  const { loading, recentPosts } = { ...props };

  seperateRecentPostsByTicker = recentPostArray => {
    let tickerArray = [];
    recentPostArray.forEach(item => {
      if (tickerArray.length === 0) {
        tickerArray = [{ ticker: item.ticker, array: [item] }];
      } else {
        let postArrayIndex = tickerArray.findIndex(
          item2 => item2.ticker === item.ticker
        );
        if (postArrayIndex === -1) {
          const newObj = { ticker: item.ticker, array: [item] };
          tickerArray.push(newObj);
        } else {
          let currentObj = tickerArray[postArrayIndex];
          let updatePostObj = {
            ticker: currentObj.ticker,
            array: [...currentObj.array, item]
          };
          tickerArray[postArrayIndex] = updatePostObj;
        }
      }
    });
    return tickerArray;
  };

  renderRecentPostsSeperatedByTicker = passedArray => {
    let postObjArray = seperateRecentPostsByTicker(passedArray);

    if (postObjArray.length > 5) {
      let shortedArray = postObjArray.slice(0, 5);
      postObjArray = shortedArray;
    }

    const toBeRendered = postObjArray.map((item, index) => {
      //let date = buildUSDate(item.array[0].timePosted);

      return (
        <RenderSeperatedPostArray
          key={item.ticker === undefined ? index : item.ticker}
          loading={item.loading === undefined ? false : true}
          //itle={"Most recently posted at " + date}
          postArray={item.array === undefined ? undefined : item.array}
        />
      );
    });
    return toBeRendered;
  };

  renderPassedPostArray = passedArray => {
    console.log(passedArray);
    let postObjArray = [];
    if (passedArray.length > 15) {
      let shortedArray = passedArray.slice(0, 15);
      postObjArray = shortedArray;
    }

    const toBeRendered = postObjArray.map((item, index) => {
      //let date = buildUSDate(item.array[0].timePosted);

      return (
        <RenderSeperatedPostArray
          key={item.ticker === undefined ? index : item.ticker}
          loading={item.loading === undefined ? false : true}
          //itle={"Most recently posted at " + date}
          postArray={item.array === undefined ? undefined : item.array}
        />
      );
    });
    return toBeRendered;
  };

  renderLoadingArray = () => {
    const loadingPostsArray = [
      {
        ticker: undefined,
        array: [{ empty: true }, { empty: true }, { empty: true }]
      },
      {
        ticker: undefined,
        array: [{ empty: true }, { empty: true }, { empty: true }]
      },
      {
        ticker: undefined,
        array: [{ empty: true }, { empty: true }, { empty: true }]
      },
      {
        ticker: undefined,
        array: [{ empty: true }, { empty: true }, { empty: true }]
      },
      {
        ticker: undefined,
        array: [{ empty: true }, { empty: true }, { empty: true }]
      }
    ];
    const toBeRendered = loadingPostsArray.map((item, index) => {
      return (
        <RenderSeperatedPostArray
          key={item.ticker === undefined ? index : item.ticker}
          loading={true}
          postArray={item.array}
        />
      );
    });
    return toBeRendered;
  };

  return loading
    ? renderLoadingArray()
    : renderRecentPostsSeperatedByTicker(recentPosts);
};
