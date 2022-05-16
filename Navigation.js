import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import { createBottomTabNavigator } from "react-navigation-tabs";

import React from "react";

import ResearchHomeScreen from "./Screens/ResearchHomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import AuthScreen from "./Screens/AuthScreen";
import ChoiceScreen from "./Screens/ChoiceScreen";
import ObservationScreen from "./Screens/ObservationScreen";
import CompanyResearchScreen from "./Screens/CompanyResearchScreen";
import UserSettingsHomeScreen from "./Screens/UserSettingsHomeScreen";
import CategoryResearchScreen from "./Screens/CategoryResearchScreen";

// import BuildTabBar from "./ComponentFunctions/BuildTabBar";

const InitAuthStack = createStackNavigator(
  {
    AuthScreen: { screen: AuthScreen }
  },
  {
    initialRouteName: "AuthScreen",
    headerMode: "none",
    mode: "modal"
  }
);

const ChoiceStack = createStackNavigator(
  {
    ChoiceScreen: { screen: ChoiceScreen },
    ObservationScreen: { screen: ObservationScreen }
    // ResearchHomeScreen: { screen: ResearchHomeScreen },
    // CompanyResearchScreen: { screen: CompanyResearchScreen },
    // CategoryResearchScreen: { screen: CategoryResearchScreen },
    // UserSettingsHomeScreen: { screen: UserSettingsHomeScreen }
  },
  {
    initialRouteName: "ChoiceScreen",
    headerMode: "none"
  }
);

const ResearchStack = createStackNavigator(
  {
    ResearchHomeScreen: { screen: ResearchHomeScreen },
    CompanyResearchScreen: { screen: CompanyResearchScreen },
    CategoryResearchScreen: { screen: CategoryResearchScreen }
    // UserSettingsHomeScreen: { screen: UserSettingsHomeScreen }
  },
  {
    initialRouteName: "ResearchHomeScreen",
    headerMode: "none"
  }
);

const SettingsStack = createStackNavigator(
  {
    UserSettingsHomeScreen: { screen: UserSettingsHomeScreen }
  },
  {
    initialRouteName: "UserSettingsHomeScreen",
    headerMode: "none"
  }
);

const TabSwitchNavigation = createSwitchNavigator(
  { ChoiceStack, ResearchStack, SettingsStack },
  { initialRouteName: "ChoiceStack", headerMode: "none" }
);

// const UserSettingsStack = createStackNavigator(
//   {
//     UserSettingsHomeScreen: { screen: UserSettingsHomeScreen }
//   },
//   {
//     initialRouteName: "UserSettingsHomeScreen",
//     headerMode: "none"
//   }
// );

const LoginStack = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen }
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none"
  }
);

// returnTabbar = () => {
//   return (
//     <BuildTabBar
//       SettingsStack={SettingsStack}
//       ResearchStack={ResearchStack}
//       ChoiceStack={ChoiceStack}
//     />
//   );
// };

// const TabNavigator = returnTabbar();

// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: ChoiceStack,
//       navigationOptions: {
//         tabBarLabel: "Home"
//       }
//     },
//     Research: {
//       screen: ResearchStack,
//       navigationOptions: {
//         tabBarLabel: "Research"
//       }
//     },
//     Settings: {
//       screen: SettingsStack,
//       navigationOptions: {
//         tabBarLabel: "Settings"
//       }
//     }
//   },
//   {
//     initialRouteName: "Home",
//     order: ["Home", "Research", "Settings"],
//     headerMode: "none",
//     tabBarOptions: {
//       // activeBackgroundColor: 'rgba(0, 0, 0, .25)',
//       // inactiveBackgroundColor: 'rgba(0, 0, 0, .25)',
//       style: {
//         backgroundColor: "rgba(0, 0, 0, .85)"
//         // height: "100%",
//         // width: "100%"
//         //backgroundColor: '#171A27',
//       },
//       labelStyle: {
//         flex: 1,
//         justifyContent: "center",
//         alignContent: "center",
//         // color: '#171A27',
//         color: "white",
//         fontSize: 20
//       }
//     }
//   }
// );

const RootStack = createStackNavigator(
  {
    Init: { screen: InitAuthStack },
    Login: { screen: LoginStack },
    App: { screen: TabSwitchNavigation }
    // App: { screen: ResearchAndUserStack }
  },
  {
    initialRouteName: "Init",

    headerMode: "none"
  }
);

export default AppStack = createAppContainer(RootStack);
