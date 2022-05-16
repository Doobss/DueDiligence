import { addWordToBataBaseAndUpdateState } from "../StoredData/ApiFunctions/ObservationDataFunctions";

export const wordArrayPredictiveFilter = (word, wordArray) => {
  let arrayToSort = [...wordArray];
  let sortedByWordIndex = arrayToSort.sort((a, b) => {
    let B = b.predictiveIndex[word] ? b.predictiveIndex[word] : 0;
    let A = a.predictiveIndex[word] ? a.predictiveIndex[word] : 0;
    return B - A;
  });
  if (sortedByWordIndex.length <= 30) {
    return sortedByWordIndex;
  } else {
    let reducedArticleIndex = sortedByWordIndex.slice(0, 30);
    return reducedArticleIndex;
  }
  //return sortedByWordIndex;
};

export const searchArrayForText = (text, wordArray) => {
  const filterd = wordArray.filter(item => {
    let lowerCaseWord = item.word.toLowerCase();
    let searchValue = text.toLowerCase().trim();
    return lowerCaseWord.indexOf(searchValue) > -1;
  });
  //console.log(filterd);
  return filterd;
};

export const addWord = (
  passedWord,
  passedPrevWord,
  passedWordArray,
  dispatch
) => {
  let prevWord = passedPrevWord ? passedPrevWord : "firstWord";
  let newWord = {
    word: passedWord,
    predictiveIndex: { [prevWord]: 1 }
  };

  addWordToBataBaseAndUpdateState(newWord, passedWordArray, dispatch);
  //return newWord;
};
