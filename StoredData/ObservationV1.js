let articlesGrammar = ["the", "a", "an", "my", "their", "they", "Add new +"];
let arrayOne = ["Saw", "Overheard", "used", "read", "Add new +"];
let arrayTwo = ["People", "Someone", "Add new +"];
let arrayThree = ["Talking", "New", "Article", "Lamp", "Add new +"];

// to attempt to get simple prediction Im trying to save the amount of times a word has been used after another word so that it can be filterd
// and brought to the top of the list to make it easier to press
//predicitve indexV1, the word that came before is saved as the key and then the number is incremented to show that it has been used
// who knows how well this works lol

export let observationWords = [
  { word: "Saw", predictiveIndex: { firstWord: 9, plus: 1 }, type: "word" },
  {
    word: "Overheard",
    predictiveIndex: { firstWord: 8, plus: 1 },
    type: "word"
  },
  { word: "Used", predictiveIndex: { firstWord: 7, plus: 1 }, type: "word" },
  { word: "Read", predictiveIndex: { firstWord: 6, plus: 1 }, type: "word" },
  {
    word: "People",
    predictiveIndex: { firstWord: 4, Saw: 5, Overheard: 5 },
    type: "word"
  },
  {
    word: "Someone",
    predictiveIndex: { firstWord: 4, Saw: 4, Overheard: 4 },
    type: "word"
  },
  { word: "Talking", predictiveIndex: { firstWord: 4, plus: 1 }, type: "word" },
  { word: "New", predictiveIndex: { firstWord: 4, plus: 1 }, type: "word" },
  { word: "Article", predictiveIndex: { firstWord: 4, plus: 1 }, type: "word" },
  { word: "the", type: "article", predictiveIndex: {} },
  { word: "a", type: "article", predictiveIndex: {} },
  { word: "an", type: "article", predictiveIndex: {} },
  { word: "my", type: "article", predictiveIndex: {} },
  { word: "their", type: "article", predictiveIndex: {} },
  { word: "they", type: "article", predictiveIndex: {} }
];

export const predicitveFilterV1 = (type, word) => {
  if (type === "word") {
    const wordTypes = observationWords.filter(item => item.type === type);
    const sortedByWordIndex = wordTypes.sort((a, b) => {
      let B = b.predictiveIndex[word] ? b.predictiveIndex[word] : 0;
      let A = a.predictiveIndex[word] ? a.predictiveIndex[word] : 0;
      return B - A;
    });
    if (sortedByWordIndex.length <= 20) {
      return sortedByWordIndex;
    } else {
      let reducedWordIndex = sortedByWordIndex.slice(0, 21);
      return reducedWordIndex;
    }
  } else if (type === "article") {
    const articleTypes = observationWords.filter(item => item.type === type);
    const sortedByArticleIndex = articleTypes.sort((a, b) => {
      let B = b.predictiveIndex[word] ? b.predictiveIndex[word] : 0;
      let A = a.predictiveIndex[word] ? a.predictiveIndex[word] : 0;
      return B - A;
    });
    if (sortedByArticleIndex.length <= 20) {
      return sortedByArticleIndex;
    } else {
      let reducedArticleIndex = sortedByArticleIndex.slice(0, 21);
      return reducedArticleIndex;
    }
  }
};

export const findWordByTypeFilter = (type, text) => {
  //console.log(type);
  if (type === "word") {
    const wordTypes = observationWords.filter(item => {
      if (item.type === type) {
        return item;
      }
    });
    //console.log(wordTypes);
    const filterd = wordTypes.filter(item => {
      let lowerCaseWord = item.word.toLowerCase();
      let searchValue = text.toLowerCase().trim();
      return lowerCaseWord.indexOf(searchValue) > -1;
    });
    //console.log(filterd);
    return filterd;
  } else if (type === "article") {
    const articleTypes = observationWords.filter(item => {
      if (item.type === type) {
        return item;
      }
    });
    //console.log(articleTypes);
    const filterd = articleTypes.filter(item => {
      let lowerCaseWord = item.word.toLowerCase();
      let searchValue = text.toLowerCase().trim();
      return lowerCaseWord.indexOf(searchValue) > -1;
    });
    //console.log(filterd);
    return filterd;
  }
};

export const updatePredictive = (passedPrevWord, wordToUpdate) => {
  let prevWord = passedPrevWord ? passedPrevWord : "firstWord";
  let updatedWord = {};
  const nonMatchedWord = observationWords.filter(item => {
    if (item.word !== wordToUpdate) {
      return item;
    } else {
      updatedWord.item = item;
    }
  });
  updatedWord.item.predictiveIndex[prevWord]
    ? updatedWord.item.predictiveIndex[prevWord]++
    : (updatedWord.item.predictiveIndex[prevWord] = 1);
  // console.log([...nonMatchedWord, updatedWord]);
};

export const addWord = (passedWord, passedPrevWord, passedType) => {
  let prevWord = passedPrevWord ? passedPrevWord : "firstWord";
  let newWord = {
    word: passedWord,
    predictiveIndex: { [prevWord]: 1 },
    type: passedType
  };
  observationWords.push(newWord);
  return newWord;
};

export const findSingleWord = passedWord => {
  if (passedWord !== undefined) {
    let matchedWord = observationWords.find(item => item.word === passedWord);
    return matchedWord ? (matchedWord.word ? true : false) : false;
  } else {
    return false;
  }
};

//const numberValForWord = observationWords.filter(item => {
//     //console.log(item.predictiveIndex[word]);
//     return (predictedVal = item.predictiveIndex[word]
//       ? item.predictiveIndex[word]
//       : 0);
//   });
