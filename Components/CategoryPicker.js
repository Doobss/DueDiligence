import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { ScrollView, SectionList } from "react-native";
import { DispatchContext, StateContext } from "../AppContext";

import UpdateObservationState from "../StoredData/UpdateObservationStateFunction";

import {
  getCompCategories,
  addCompCategory
} from "../StoredData/StoreFunctions";

export default CategoryPicker = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [selectedItems, setSelectedItems] = useState({});
  const [addCategoryDescription, setAddCategoryDescription] = useState("");
  const [addCategoryText, setAddCategoryText] = useState("");
  const [renderedArray, setRenderedArray] = useState([]);

  const initPath = [{ LOADING: { category: "loading" } }];

  const [currentPath, setCurrentPath] = useState(initPath);

  sectionTitle = index => {
    let newCategoryTile =
      state.observation.focusedCompany.data.ticker + " Categories";
    let currentPathLength = currentPath.length;
    if (currentPathLength >= 2 && index > 0) {
      let selectedCategory = selectedItems[index - 1];
      newCategoryTile = selectedCategory.category + " subcategories";
      //   console.log(selectedCategory.category);
    }
    return newCategoryTile;
  };

  buildSectionArrayToRender = passedPathArray => {
    const passedArrayLength = passedPathArray.length;
    const renderArray = passedPathArray.map((obj, index) => {
      let title = sectionTitle(index);

      if (passedArrayLength - 1 === index) {
        const description = "Add to " + title;
        setAddCategoryDescription(description);
      }

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
    if (
      state.observation.currentPath.data.length === 1 &&
      renderedArray.length === 0 &&
      state.observation.selectedItems !== ""
    ) {
      setSelectedItems(state.observation.selectedItems);
      setCurrentPath([state.observation.companyCategories.data]);
      const sectionArray = buildSectionArrayToRender(currentPath);
      setRenderedArray(renderedArray => {
        return [...sectionArray];
      });
      // console.log("layout 2");
    } else if (
      renderedArray.length === 0 &&
      state.observation.currentPath.data.length === 1
    ) {
      setCurrentPath([state.observation.companyCategories.data]);
      const sectionArray = buildSectionArrayToRender(currentPath);
      setRenderedArray(renderedArray => {
        return [...sectionArray];
      });
    } else if (state.observation.currentPath.data.length !== 1) {
      setCurrentPath([state.observation.currentPath.data]);
      const sectionArray = buildSectionArrayToRender(currentPath);
      setRenderedArray(renderedArray => {
        return [...sectionArray];
      });
    }
  }, []);

  useEffect(() => {
    const updateArray = [
      { keyToUpdate: "selectedItems", payload: selectedItems },
      {
        keyToUpdate: "currentPath",
        payload: { error: false, data: currentPath, loading: false }
      }
    ];
    UpdateObservationState(updateArray, dispatch);
    const sectionArray = buildSectionArrayToRender(currentPath);
    setRenderedArray(renderedArray => {
      return [...sectionArray];
    });
  }, [currentPath]);

  // loadCategories = async () => {
  //   const data = await getCompCategories(
  //     state.observation.focusedCompany.ticker,
  //     state.currentUser.userName
  //   );
  //   // const categoryData = {
  //   //   categoryObj: data,
  //   //   ticker: state.observation.focusedCompany.ticker,
  //   //   currentPath: [data]
  //   // };
  //   const categoryData = {
  //     error: false,
  //     data:
  //   }
  //   const updateArray = [
  //     { keyToUpdate: "companyCategories", payload: categoryData }
  //   ];
  //   UpdateObservationState(updateArray, dispatch);
  //   setCurrentPath([data]);
  // };

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
    }
    //for setting a category as selected and clearing all selected subcategories of the original category
    else if (
      selectedItems[index]
        ? selectedItems[index][category] === true
          ? false
          : true
        : false
    ) {
      // console.log("else iff cat !== selected");
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
    }
    //for clearing
    else if (
      selectedItems[index]
        ? selectedItems[index][category]
          ? true
          : false
        : false
    ) {
      // console.log("else iff cat === selected");
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
    }
  };

  PrepareCategoryListForRender = (arrayToRender, arrayIndex) => {
    // console.log(arrayToRender);
    // console.log(arrayIndex);
    const Rendered = arrayToRender.map((item, index) => {
      const capitalizedCat = item.category.toUpperCase();
      const normalizedCat = capitalizedCat.replace(/\s+/g, "");
      return selectedItems[arrayIndex] ? (
        selectedItems[arrayIndex][normalizedCat] ? (
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

    return <CatListContainer>{Rendered}</CatListContainer>;
  };

  chooseCategoryForOBservation = () => {
    if (currentPath.length - 2 >= 0) {
      const category = Object.keys(selectedItems[currentPath.length - 2])[0];
      let chosenCategory = currentPath[currentPath.length - 2][category];
      //   chosenCategory.observations = { userId: state.currentUser.userId };
      //console.log(chosenCategory);
      dispatch({
        type: "SET-OBSERVATION-CATEGORY",
        payload: chosenCategory
      });
    } else {
      alert("Tap to choose a category");
    }
  };

  addNewCompanyCategory = newCategoryText => {
    const capitalCategoy = newCategoryText.toUpperCase();
    const normalizedCat = capitalCategoy.replace(/\s+/g, "");
    setAddCategoryText("");

    if (currentPath.length === 1) {
      let newObj = currentPath[0];

      newObj[normalizedCat] = {
        parent: "root",
        category: newCategoryText,
        subCategories: {},
        predictiveIndex: {}
      };
      console.log(newObj);
      //addCompCategory(state.observation.focusedCompany.ticker, currentPath[0]);
      const sectionArray = buildSectionArrayToRender(currentPath);
      setRenderedArray(renderedArray => {
        return sectionArray;
      });
    } else {
      const capitalParentName = selectedItems[
        currentPath.length - 2
      ].category.toUpperCase();
      const normalizedParent = capitalParentName.replace(/\s+/g, "");

      let newObj = currentPath[currentPath.length - 1];

      newObj[normalizedCat] = {
        parent: normalizedParent,
        category: newCategoryText,
        subCategories: {},
        predictiveIndex: {}
      };

      // let updatedObj = {
      //   ...newObj,
      //   [normalizedCat]: {
      //     parent: normalizedParent,
      //     category: newCategoryText,
      //     subCategories: {},
      //     predictiveIndex: {}
      //   }
      // };

      console.log(newObj);
      //addCompCategory(state.observation.focusedCompany.ticker, currentPath[0]);
      const sectionArray = buildSectionArrayToRender(currentPath);
      setRenderedArray(renderedArray => {
        return sectionArray;
      });
    }
  };

  return (
    <SectionContainer screenWidth={state.dimensions.screenWidth}>
      <ScrollView
        //   centerContent={true}
        contentContainerStyle={{
          width: state.dimensions.screenWidth,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <SectionList
          contentContainerStyle={{
            // height: state.dimensions.screenHeight * 0.7,
            alignContent: "flex-end",
            justifyContent: "flex-end"
          }}
          sections={renderedArray}
          renderItem={item =>
            PrepareCategoryListForRender(
              item.section.dataToRender,
              item.section.index
            )
          }
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <HeaderText>{title}</HeaderText>
          )}
        />
        <BottomOptionsView screenHeight={state.dimensions.screenHeight}>
          <BottomOptionsDesriptionView>
            <AddCatDescriptionText>
              {addCategoryDescription}
            </AddCatDescriptionText>
          </BottomOptionsDesriptionView>

          <BottomOptionsAddCategoryView>
            <FindCategoryInput
              screenWidth={state.dimensions.screenWidth}
              stickySectionHeadersEnabled={true}
              placeholder="New category Name"
              placeholderTextColor="white"
              onChangeText={text => setAddCategoryText(text)}
              value={addCategoryText}
              autoCompleteType="off"
            />

            <AddCatButton
              onPress={() =>
                addCategoryText
                  ? addNewCompanyCategory(addCategoryText)
                  : alert("Type in a category to add")
              }
            >
              <AddCatText>Add Category</AddCatText>
            </AddCatButton>
          </BottomOptionsAddCategoryView>
        </BottomOptionsView>
      </ScrollView>
    </SectionContainer>
  );
};

const SectionContainer = styled.SafeAreaView`
  background: rgba(100, 100, 100, 0.15);
  width: ${props => props.screenWidth}px;
  height: auto;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
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
  flex-direction: row;
  background: rgba(100, 100, 100, 0);
  width: 370px;
  height: auto;
  align-content: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;

const AddCatText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: white;
  margin: 10px;
`;

const BottomOptionsDesriptionView = styled.View`
  /* background: rgba(100, 100, 100, 0.15); */
  height: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  /* margin-left: 2.5px;
  margin-right: 2.5px;
  margin-bottom: 5px; */
  margin-top: 5px;
`;

const AddCatDescriptionText = styled.Text`
  font-size: 20px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.85);
  margin: 5px;
`;

const BottomOptionsAddCategoryView = styled.View`
  /* background: rgba(100, 100, 100, 0.15); */
  flex-direction: row;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* margin-left: 2.5px;
  margin-right: 2.5px;
  margin-bottom: 5px;
  margin-top: 5px; */
`;

const BottomOptionsView = styled.View`
  background: rgba(100, 100, 100, 0.1);
  height: ${props => props.screenHeight * 0.15}px;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* margin-left: 2.5px;
  margin-right: 2.5px;
  margin-bottom: 5px;
  margin-top: 5px; */
`;

const AddCatButton = styled.TouchableOpacity`
  height: 45px;
  width: auto;
  /* background-color: rgba(255, 255, 255, .5); */
  background-color: rgba(79, 203, 137, 0.65);
  border-radius: 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  /* color: #171A27; */
  color: rgba(255, 255, 255, 0.75);
  margin: 5px;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
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

//finds whether or not this caetgory is selected in this index
// const selected = selectedItems[index]
//   ? selectedItems[index][category]
//     ? true
//     : false
//   : false;

// //checks to see if any categories or sub ccategories in this index are selected and sets onekeyselected to true
// let oneKeySelected = {};
// oneKeySelected.item = false;
// const checkIfAnyAreSelected = prevPath[index]
//   ? Object.keys(prevPath[index]).forEach(item => {
//       //   console.log(item);
//       //   const itemCat = item.category;
//       if (
//         selectedItems[index]
//           ? selectedItems[index][item]
//             ? true
//             : false
//           : false === true
//       ) {
//         oneKeySelected.item = true;
//       }
//     })
//   : null;
