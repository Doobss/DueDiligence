import React, {
  useLayoutEffect,
  useEffect,
  useContext,
  useState,
  useRef
} from "react";
import {
  ActivityIndicator,
  Modal,
  SectionList,
  ScrollView
} from "react-native";
import styled from "styled-components";
import Button from "./Button";
import { DispatchContext, StateContext } from "../AppContext";

import ObservationCard from "../Components/ObservationCard";

import {
  grabObservationsByCategory,
  buildUSDate
} from "../StoredData/StoreFunctions";

export default CategoryObservationPosts = props => {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  const [postsArray, setPostArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const focusedCategory =
    state.research.focusedCategory === {}
      ? "loading"
      : state.research.focusedCategory;

  const categoryKey = focusedCategory.category
    .replace(/\s+/g, "")
    .toUpperCase();

  grabObservations = async (ticker, category) => {
    const data = await grabObservationsByCategory(ticker, category);
    //console.log(data);
    if (data[0].description !== "No observations yet") {
      setPostArray(data);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    grabObservations(state.focusedCompany.ticker, categoryKey);
  }, [state.focusedCompany.ticker, state.research.focusedCategory]);

  renderObservations = passedArray => {
    if (passedArray.length !== 0 && loading === false) {
      const rendered = passedArray.map(item => {
        const datePosted = buildUSDate(item.timePosted);
        return (
          <ObservationCard
            item={item}
            datePosted={datePosted}
            key={item.observationId}
          />
        );
      });
      return rendered;
    } else if (passedArray.length === 0 && loading === false) {
      return (
        // <EmptyObservationContainer screenHeight={state.dimensions.screenHeight}>
        //   <ObservationHeaderText>No observations yet</ObservationHeaderText>
        // </EmptyObservationContainer>
        null
      );
    } else {
      return <ActivityIndicator animating={loading} />;
    }
  };

  return (
    <Container>
      <ObservationHeaderText>{focusedCategory.category}</ObservationHeaderText>

      <SubContainer>{renderObservations(postsArray)}</SubContainer>
      {/* <Button
        title="Current category posts array"
        size="minimal"
        onPress={() => setLoading(postsArray)}
      /> */}
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
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ObservationHeaderText = styled.Text`
  font-size: 24px;
  /* font-weight: bold; */
  color: rgba(255, 255, 255, 0.95);
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

// const EmptySubCategoryContainer = styled.View`
//   background: rgba(100, 100, 100, 0.25);
//   border-radius: 10px;
//   overflow: hidden;
//   flex-wrap: wrap;
//   height: 50px;
//   width: auto;
//   align-items: center;
//   justify-content: center;
//   margin: 5px;
//   padding: 10px;
// `;
