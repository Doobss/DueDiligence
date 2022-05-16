import SetStackScreenAndNavigate from "./SetStackScreenAndNavigate";

export default ResearchTabNavigation = (
  currentStack,
  currentScreen,
  screenToNavigateTo,
  props,
  dispatch
) => {
  SetStackScreenAndNavigate(
    currentStack,
    currentScreen,
    screenToNavigateTo,
    props,
    dispatch,
    "researchStackScreen"
  );
  return null;
};
