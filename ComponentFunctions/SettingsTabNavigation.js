import SetStackScreenAndNavigate from "./SetStackScreenAndNavigate";

export default SettingsTabNavigation = (
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
    "settingsStackScreen"
  );
  return null;
};
