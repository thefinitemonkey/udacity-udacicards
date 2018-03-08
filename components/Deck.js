import React, { Component } from "react";
import {
  NavigationActions,
  TabNavigator,
  TabBarBottom
} from "react-navigation";
import { Platform } from "react-native";
import { gray, white, green } from "../utils/colors";
import Ionicons from "@expo/vector-icons";
import DeckInfo from "./DeckInfo";
import DeckQuestions from "./DeckQuestions";

const TabNav = TabNavigator(
  {
    DeckInfo: {
      screen: DeckInfo,
      navigationOptions: {
        tabBarLabel: "Info",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ion-ios-grid" size={30} color={tintColor} />
        )
      }
    },
    DeckQuestions: {
      screen: DeckQuestions,
      navigationOptions: {
        tabBarLabel: "Questions",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ion-ios-list" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {},
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? green : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : green,
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

class Deck extends Component {
  render = () => {
    return <TabNav id={this.props.id} title={this.props.title} />;
  };
}

export default Deck;
