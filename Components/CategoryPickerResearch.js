import React, {
  useEffect,
  useContext,
  useState,
  useLayoutEffect,
  useRef
} from "react";
import styled from "styled-components";
import { ScrollView, SectionList } from "react-native";
import { DispatchContext, StateContext } from "../AppContext";
import { withNavigation } from "react-navigation";

import * as WebBrowser from "expo-web-browser";

import {
  getCompCategories,
  addCompCategory,
  buildGoolgeSearchURL
} from "../StoredData/StoreFunctions";

import { sectionTitle } from "../ComponentFunctions/CategoryPickerResearchFunc";
import Button from "./Button";

const CategoryPickerResearch = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [selectedItems, setSelectedItems] = useState({});
  const [addCategoryText, setAddCategoryText] = useState("");
  const [praticeList, setPracticeList] = useState([]);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sectionListCategoryRef = useRef();

  const [currentPath, setCurrentPath] = useState([
    { LOADING: { category: "loading" } }
  ]);

  scrollForward = indexToScrollTo => {
    sectionListCategoryRef.current.scrollToLocation({
      itemIndex: indexToScrollTo,
      sectionIndex: indexToScrollTo
    });
  };

  useEffect(() => {
    if (
      praticeList.length > 0 &&
      praticeList[praticeList.length - 1].title !== "No Subcategories yet"
    ) {
      setTimeout(() => {
        scrollForward(currentSectionIndex);
      }, 50);
    } else {
      console.log("No index for that or practiceList isnt defined yet");
    }
  }, [praticeList]);

  buildSectionArrayToRender = (passedPathArray, ticker) => {
    const renderArray = passedPathArray.map((obj, index) => {
      let title = sectionTitle(
        index,
        state.focusedCompany.ticker,
        currentPath.length,
        selectedItems
      );

      const categoriesForIndex = Object.keys(obj).map(key => {
        let capitalizedKey = key.toUpperCase();
        let normalizedKey = capitalizedKey.replace(/\s+/g, "");
        return obj[normalizedKey];
      });
      if (categoriesForIndex.length === 0) {
        title = "No Subcategories yet";
        let categorySection = {
          title: title,
          dataToRender: categoriesForIndex,
          data: [""],
          index: index
        };
        return categorySection;
      }
      let categorySection = {
        title: title,
        dataToRender: categoriesForIndex,
        data: [""],
        index: index
      };
      return categorySection;
    });
    return renderArray;
  };

  useLayoutEffect(() => {
    if (praticeList.length === 0) {
      loadCategories(state.focusedCompany.ticker);
    }
    const sectionArray = buildSectionArrayToRender(currentPath);
    setPracticeList(praticeList => {
      return [...sectionArray];
    });
  }, [currentPath]);

  loadCategories = async ticker => {
    console.log(ticker);
    const data = await getCompCategories(ticker, state.currentUser.userName);
    setCurrentPath([data]);
  };

  setSelectedAndFindNextCategory = async (categoryStr, index) => {
    let capitalizedCat = categoryStr.toUpperCase();
    let category = capitalizedCat.replace(/\s+/g, "");

    if (selectedItems[index] ? false : true) {
      //console.log(category);
      dispatch({
        type: "ADD-CATEGORY-TO-SELECTED",
        payload: { word: categoryStr, category: category },
        payload2: index
      });
      setSelectedItems(selectedItems => {
        return {
          ...selectedItems,
          [index]: {
            [category]: selectedItems[index]
              ? !selectedItems[index][category]
              : true,
            category: categoryStr
          }
        };
      });

      const nextInPathToRender = currentPath[index][category]["subCategories"];
      setCurrentPath(currentPath => {
        return [...currentPath, nextInPathToRender];
      });
      //Scrol the section forward, hopefully...
      setCurrentSectionIndex(index + 1);
    }
    //for setting a category as selected and clearing all selected subcategories of the original category
    else if (
      selectedItems[index]
        ? selectedItems[index][category] === true
          ? false
          : true
        : false
    ) {
      console.log("else iff cat !== selected");

      dispatch({
        type: "REMOVE-UNSELECTED-CATEGORIES",
        payload: { word: categoryStr, category: category },
        payload2: index
      });
      setSelectedItems(selectedItems => {
        let returnedObj = {};
        let returnedMatchedIndex = Object.keys(selectedItems).map(key => {
          if (key === index.toString()) {
            returnedObj[key] = { [category]: true, category: categoryStr };
          } else if (key < index.toString()) {
            returnedObj[key] = selectedItems[key];
          }
        });
        return returnedObj;
      });

      const currentPathMinusIndex = currentPath.slice(0, index + 1);
      const userTappedCategory = currentPath[index];
      const tappedCatSubCategories =
        userTappedCategory[category]["subCategories"];
      currentPathMinusIndex[index] = userTappedCategory;
      currentPathMinusIndex[index + 1] = tappedCatSubCategories;
      setCurrentPath(currentPathMinusIndex);
      setCurrentSectionIndex(index + 1);
    }
    //for clearing
    else if (
      selectedItems[index]
        ? selectedItems[index][category]
          ? true
          : false
        : false
    ) {
      console.log("else iff cat === selected");
      if (index === 0) {
        dispatch({
          type: "REMOVE-SELECTED-CATEGORIES",
          payload: { word: "No Categories Selected" },
          payload2: index
        });
      } else {
        dispatch({
          type: "REMOVE-SELECTED-CATEGORIES",
          payload: { word: categoryStr, category: category },
          payload2: index
        });
      }
      let newUnSelected = {};
      setSelectedItems(selectedItems => {
        let returnSelectedLessthan = Object.keys(selectedItems).forEach(key => {
          if (key > index.toString()) {
            // newUnSelected[key] = null;
          } else if (key === index.toString()) {
            // newUnSelected[key] = { [category]: false };
          } else {
            newUnSelected[key] = selectedItems[key];
          }
        });
        return newUnSelected;
      });

      const newCurrentPath = currentPath.slice(0, index + 1);
      setCurrentPath(newCurrentPath);
      setCurrentSectionIndex(index);
    }
  };

  setCategoryForResearchAndNavigate = item => {
    //console.log(item);
    dispatch({
      type: "SET-RESEARCH-CATEGORY",
      payload: item
    });

    props.navigation.navigate("CategoryResearchScreen");
  };

  PrepareCategoryListForRender = (arrayToRender, arrayIndex) => {
    //console.log(arrayToRender);
    // console.log(arrayIndex);
    const Rendered = arrayToRender.map((item, index) => {
      const capitalizedCat = item.category.toUpperCase();
      const normalizedCat = capitalizedCat.replace(/\s+/g, "");
      return selectedItems[arrayIndex] ? (
        selectedItems[arrayIndex][normalizedCat] ? (
          <SelectedCatContainer
            key={item.category}
            onPress={() =>
              setSelectedAndFindNextCategory(item.category, arrayIndex)
            }
            selected={
              selectedItems[arrayIndex]
                ? selectedItems[arrayIndex][normalizedCat]
                  ? selectedItems[arrayIndex][normalizedCat]
                  : false
                : false
            }
          >
            <SelectedCatTextView>
              <CatText>{item.category}</CatText>
            </SelectedCatTextView>
            <SelectedCAtExpandButton
              onPress={() => setCategoryForResearchAndNavigate(item)}
            >
              <CatText>Expand +</CatText>
            </SelectedCAtExpandButton>
          </SelectedCatContainer>
        ) : (
          <UnSelectedCatContainer
            key={item.category}
            onPress={() =>
              setSelectedAndFindNextCategory(item.category, arrayIndex)
            }
            selected={
              selectedItems[arrayIndex]
                ? selectedItems[arrayIndex][normalizedCat]
                  ? selectedItems[arrayIndex][normalizedCat]
                  : false
                : false
            }
          >
            <UnSelectedCatText>{item.category}</UnSelectedCatText>
          </UnSelectedCatContainer>
        )
      ) : (
        <CatContainer
          key={item.category}
          onPress={() =>
            setSelectedAndFindNextCategory(item.category, arrayIndex)
          }
          selected={
            selectedItems[arrayIndex]
              ? selectedItems[arrayIndex][normalizedCat]
                ? selectedItems[arrayIndex][normalizedCat]
                : false
              : false
          }
        >
          <CatText>{item.category}</CatText>
        </CatContainer>
      );
    });

    return (
      <CatListContainer screenWidth={state.dimensions.screenWidth}>
        {Rendered}
      </CatListContainer>
    );
  };

  chooseCategoryForOBservation = () => {
    if (currentPath.length - 2 >= 0) {
      const category = Object.keys(selectedItems[currentPath.length - 2])[0];
      let chosenCategory = currentPath[currentPath.length - 2][category];

      dispatch({
        type: "SET-OBSERVATION-CATEGORY",
        payload: chosenCategory
      });
    } else {
      alert("Tap to choose a category");
    }
  };

  testSel = newCategory => {
    const capitalCategoy = newCategory.toUpperCase();
    const normalizedCat = capitalCategoy.replace(/\s+/g, "");
    setAddCategoryText("");

    if (currentPath.length === 1) {
      currentPath[0][normalizedCat] = {
        category: newCategory,
        subCategories: {}
      };
      console.log(currentPath);
      addCompCategory(state.focusedCompany.ticker, currentPath[0]);
      const sectionArray = buildSectionArrayToRender(currentPath);
      setPracticeList(praticeList => {
        return sectionArray;
      });
    } else {
      currentPath[currentPath.length - 1][normalizedCat] = {
        category: newCategory,
        subCategories: {}
      };
      console.log(currentPath);
      addCompCategory(state.focusedCompany.ticker, currentPath[0]);
      const sectionArray = buildSectionArrayToRender(currentPath);
      setPracticeList(praticeList => {
        return sectionArray;
      });
    }
  };

  testCurrent = () => {
    console.log(state.observation.selectedCategories);
  };

  searchCurrentSelectedCategories = (categorObjArray, companyName, ticker) => {
    //let textToSearch = companyName === undefined ? ticker : companyName;
    let textToSearch = ticker;
    if (
      categorObjArray.length >= 1 &&
      categorObjArray[0].word !== "No Categories Selected"
    ) {
      // const newString = categorObjArray.map(item => {
      //   textToSearch = textToSearch + " " + item.word;
      // });

      const arrayLength = categorObjArray.length;
      const categoryToSearch = categorObjArray[arrayLength - 1].word;
      textToSearch = textToSearch + " " + categoryToSearch;
    }
    const URL = buildGoolgeSearchURL(textToSearch);
    WebBrowser.openBrowserAsync(URL, { toolbarColor: "#171A27" });
  };

  return (
    <Container screenWidth={state.dimensions.screenWidth}>
      <HeaderText>{state.focusedCompany.ticker + " categories"}</HeaderText>
      <SectionListContainer>
        <SectionList
          ref={sectionListCategoryRef}
          horizontal={true}
          // pagingEnabled={true}
          contentContainerStyle={{
            // width: state.dimensions.screenWidth * 0.9,
            height: "auto",
            alignContent: "flex-start",
            justifyContent: "flex-start"
          }}
          sections={praticeList}
          renderItem={item =>
            PrepareCategoryListForRender(
              item.section.dataToRender,
              item.section.index
            )
          }
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section: { title } }) =>
            //   <HeaderText>{title}</HeaderText>
            null
          }
        />
      </SectionListContainer>
      <SearchButton
        onPress={() =>
          searchCurrentSelectedCategories(
            state.observation.selectedCategories,
            state.focusedCompany.company,
            state.focusedCompany.ticker
          )
        }
      >
        <SearchButtonText>Google selected categories</SearchButtonText>
      </SearchButton>

      {/* <Button
        title="Search Goodle with selected categories"
        size="minimal"
        onPress={() =>
          searchCurrentSelectedCategories(
            state.observation.selectedCategories,
            state.focusedCompany.company,
            state.focusedCompany.ticker
          )
        }
      /> */}
    </Container>
  );
};

export default withNavigation(CategoryPickerResearch);

const Container = styled.SafeAreaView`
  background: rgba(100, 100, 100, 0.15);
  width: 90%;
  height: auto;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SectionListContainer = styled.View`
  /* background: rgba(100, 100, 100, 0.15); */
  width: 100%;
  height: auto;
  align-items: flex-start;
  justify-content: center;
  /* box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25); */
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SelectedCAtExpandButton = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* margin-top: 5px;
margin-bottom: 5px; */
  background-color: rgba(255, 85, 31, 0.75);
`;

const SelectedCatTextView = styled.View`
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* margin-top: 5px;
margin-bottom: 5px; */
  background-color: rgba(255, 85, 31, 0);
`;

const SelectedCatContainer = styled.TouchableOpacity`
  height: 80px;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  background-color: ${props =>
    props.selected === true
      ? "rgba(255, 85, 31, .75)"
      : "rgba(79, 203, 137, 0.65)"};
`;

const CatContainer = styled.TouchableOpacity`
  height: 40px;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  background-color: ${props =>
    props.selected === true
      ? "rgba(255, 85, 31, .75)"
      : "rgba(79, 203, 137, 0.65)"};
`;
const UnSelectedCatContainer = styled.TouchableOpacity`
  height: 40px;
  width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin: 5px;
  /* margin-top: 5px;
  margin-bottom: 5px; */
  background-color: ${props =>
    props.selected === true
      ? "rgba(255, 85, 31, .75)"
      : "rgba(79, 203, 137, 0.25)"};
`;

const UnSelectedCatText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: white;
  margin: 2px;
  margin-left: 15px;
  margin-right: 15px;
  opacity: 0.75;
`;

const CatText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: white;
  margin: 2px;
  margin-left: 15px;
  margin-right: 15px;
`;

const CatListContainer = styled.View`
  /* flex-direction: row; */
  background: rgba(100, 100, 100, 0);
  width: ${props => props.screenWidth * 0.5}px;
  height: auto;
  align-content: center;
  justify-content: flex-start;
  /* flex-wrap: wrap; */
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;

const BottomOptionsView = styled.View`
  flex-direction: row;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 2.5px;
  margin-right: 2.5px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const SearchButton = styled.TouchableOpacity`
  height: auto;
  width: 75%;
  /* background-color: rgba(255, 255, 255, .5); */
  border-color: rgba(79, 203, 137, 0.65);
  border-width: 1px;
  background-color: rgba(79, 203, 137, 0.05);
  border-radius: 10px;
  /* box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5); */
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 5px;
`;

const SearchButtonText = styled.Text`
  font-size: 20px;
  color: rgba(79, 203, 137, 0.65);
  /* color: white; */
  margin: 10px;
`;

const HeaderText = styled.Text`
  font-size: 22px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
  font-weight: bold;
`;

const FindCategoryInput = styled.TextInput`
  background: rgba(100, 100, 100, 0.35);
  width: ${props => props.screenWidth * 0.55}px;
  /* width: auto; */
  height: 45px;
  border-radius: 10px;
  /* border: 1px #171A27; */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  margin-left: 5px;
  /* margin-top: 15px;  */
  padding-left: 15px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.65);
  text-align: left;
`;
