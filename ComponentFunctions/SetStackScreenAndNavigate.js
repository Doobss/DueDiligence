import React, { useContext } from "react";

export default SetStackScreenAndNavigate = (
  stack,
  screenName,
  navigateTo,
  props,
  dispatch,
  newStack
) => {
  // export default SetStackScreenAndNavigate = props => {
  // console.log(stack);
  // console.log(screenName);
  // console.log(navigateTo);
  //console.log(dispatch);

  dispatch({
    type: "SET-STACK-SCREEN",
    payload: stack,
    payload2: screenName,
    payload3: newStack
  });
  props.navigation.navigate(navigateTo);
  return null;
};
