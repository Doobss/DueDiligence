import SetStackScreenAndNavigate from "./SetStackScreenAndNavigate";

export default HomeTabNavigation = (
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
    "homeStackScreen"
  );
  return null;
};
