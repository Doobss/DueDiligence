import React, {
  useLayoutEffect,
  useEffect,
  useContext,
  useState,
  useRef
} from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import styled from "styled-components";
import { DispatchContext, StateContext } from "../AppContext";

import {
  grabObservationsByCategory,
  buildUSDate
} from "../StoredData/StoreFunctions";
import ObservationCard from "./ObservationCard";

import SmallObservationCard from "./SmallObservationCard";

import { findAllSubCategories } from "../ComponentFunctions/FindAllSubCategories";

export default SubCategoryPosts = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [subCategoriesPosts, setSubCategoriesPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const focusedCategory =
    state.research.focusedCategory === {}
      ? "loading"
      : state.research.focusedCategory;

  grabObservationsAndSubcategoriesObservations = async (
    ticker,
    categoryObj
  ) => {
    // const categoryKey = categoryObj.category.replace(/\s+/g, "").toUpperCase();
    if (Object.keys(categoryObj.subCategories).length === 0) {
      setSubCategoriesPosts([]);
      setLoading(false);
    } else {
      let subCategories = findAllSubCategories(categoryObj);

      //console.log(subCategories);

      const categoryData = Promise.all(
        subCategories.map(async item => {
          const categoryPosts = await grabObservationsByCategory(
            ticker,
            item.key
          );
          const postObj = {
            category: item.key,
            posts: categoryPosts,
            parent: item.parent
          };
          return postObj;
        })
      );
      const data = await categoryData;
      setSubCategoriesPosts(data);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    // grabObservations(state.focusedCompany.ticker, categoryKey);
    grabObservationsAndSubcategoriesObservations(
      state.focusedCompany.ticker,
      state.research.focusedCategory
    );
    //renderSubCategories(subCategoriesPosts);
  }, [state.focusedCompany.ticker, state.research.focusedCategory]);

  renderSubCategoryPosts = (passedArray, category) => {
    const rendered = passedArray.map(item => {
      const datePosted = buildUSDate(item.timePosted);
      return (
        <ObservationCard
          item={item}
          datePosted={datePosted}
          category={category}
          onPress={"none"}
          key={item.observationId}
        />
      );
    });
    return rendered;
  };

  let emptySubcategoryList = [];

  renderEmptySubCategoreis = emptyCategories => {
    const rendered = emptyCategories.map(item => {
      return (
        <EmptySubCategoryContainer
          screenHeight={state.dimensions.screenHeight}
          key={item}
        >
          <ObservationBodyText>{item}</ObservationBodyText>
        </EmptySubCategoryContainer>
      );
    });
    return (
      <ScrollView
        horizontal={true}
        style={{
          width: "auto",
          height: "auto",
          alignContent: "center",
          justifyItems: "center"
        }}
      >
        {rendered}
      </ScrollView>
    );
  };

  renderSubCategories = arrayOfSubCategories => {
    if (arrayOfSubCategories.length !== 0 && loading === false) {
      const renderedSubcategories = arrayOfSubCategories.map(item => {
        //console.log(item);
        //console.log(item.posts[0]);
        // const currentCategoryName =
        //   focusedCategory.subCategories[item.category].category;
        if (item.posts[0].description !== "No observations yet") {
          return (
            <SubCategoryObservationContainer
              key={item.category}
              screenHeight={state.dimensions.screenHeight}
            >
              {/* <ObservationBodyText>{item.category}</ObservationBodyText> */}
              {renderSubCategoryPosts(item.posts, item.category)}
            </SubCategoryObservationContainer>
          );
        } else if (item.posts[0].description === "No observations yet") {
          emptySubcategoryList.push(item.category);
        }
      });
      return renderedSubcategories;
    } else if (arrayOfSubCategories.length === 0 && loading === false) {
      return (
        <EmptyObservationContainer screenHeight={state.dimensions.screenHeight}>
          <ObservationBodyText>
            {"No subcategories for " + focusedCategory.category}
          </ObservationBodyText>
        </EmptyObservationContainer>
      );
    } else {
      return <ActivityIndicator animating={loading} />;
    }
  };

  return (
    <Container>
      <ObservationHeaderText>
        {focusedCategory.category + " subcategories posts"}
      </ObservationHeaderText>

      <SubContainer>
        {renderSubCategories(subCategoriesPosts)}
        {emptySubcategoryList.length !== 0 ? (
          <ObservationBodyText>
            No observations for these subcategories
          </ObservationBodyText>
        ) : null}
        {emptySubcategoryList.length !== 0
          ? renderEmptySubCategoreis(emptySubcategoryList)
          : null}
      </SubContainer>
    </Container>
  );
};

const Container = styled.View`
  background: rgba(100, 100, 100, 0);
  border-radius: 10px;
  overflow: hidden;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SubContainer = styled.View`
  background: rgba(100, 100, 100, 0.2);
  border-radius: 10px;
  overflow: hidden;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* margin-top: 5px; */
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ObservationHeaderText = styled.Text`
  font-size: 24px;
  /* font-weight: bold; */
  color: rgba(255, 255, 255, 0.95);
  /* margin: 5px;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px; */
`;

const ObservationBodyText = styled.Text`
  font-size: 20px;
  /* font-weight: bold; */
  color: rgba(255, 255, 255, 0.95);
  /* margin: 5px;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px; */
`;

const EmptyObservationContainer = styled.View`
  background: rgba(100, 100, 100, 0.25);
  border-radius: 10px;
  overflow: hidden;
  height: ${props => props.screenHeight * 0.075}px;
  width: 90%;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const EmptySubCategoryContainer = styled.View`
  background: rgba(100, 100, 100, 0.25);
  border-radius: 10px;
  overflow: hidden;
  flex-wrap: wrap;
  height: 50px;
  width: auto;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 10px;
`;

const SubCategoryObservationContainer = styled.View`
  /* background: rgba(100, 100, 100, 0.25); */
  /* border-radius: 10px; */
  overflow: hidden;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;
