import ResearchTabNavigation from "./ResearchTabNavigation";
import HomeTabNavigation from "./HomeTabNavigation";
import SettingsTabNavigation from "./SettingsTabNavigation";

export default TabBarButtonArray = (state, props, dispatch) => {
  let navigationButtons = [
    {
      title: "Home",
      onPress: () =>
        HomeTabNavigation(
          state.tabState.currentStack,
          props.navigation.state.routeName,
          state.tabState.currentStack === "homeStackScreen"
            ? "ChoiceScreen"
            : state.tabState.homeStackScreen,
          props,
          dispatch
        ),
      selected: state.tabState.currentStack === "homeStackScreen" ? true : false
    },
    {
      title: "Research",
      onPress: () =>
        ResearchTabNavigation(
          state.tabState.currentStack,
          props.navigation.state.routeName,
          state.tabState.currentStack === "researchStackScreen"
            ? "ResearchHomeScreen"
            : state.tabState.researchStackScreen,
          props,
          dispatch
        ),
      selected:
        state.tabState.currentStack === "researchStackScreen" ? true : false
    },
    {
      title: "User",
      onPress: () =>
        SettingsTabNavigation(
          state.tabState.currentStack,
          props.navigation.state.routeName,
          state.tabState.currentStack === "settingsStackScreen"
            ? "UserSettingsHomeScreen"
            : state.tabState.settingsStackScreen,
          props,
          dispatch
        ),
      selected:
        state.tabState.currentStack === "settingsStackScreen" ? true : false
    }
  ];

  return navigationButtons;
};
