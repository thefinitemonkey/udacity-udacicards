import React, { Component } from "react";
import {
  NavigationActions,
  TabNavigator,
  TabBarBottom
} from "react-navigation";
import { Platform } from "react-native";
import { gray, white, green } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import DeckInfo from "./DeckInfo";
import DeckQuestions from "./DeckQuestions";

class Deck extends Component {
  // Set the screen header options with title
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const title = params ? params.title : "Info Screen";
    return { ...params, title };
  };

  componentWillMount = () => {
    // Set up the tab navigator. The Deck class is just a navigation
    // route that contains the tabs, which contains the related
    // content for this section.
    this.TabNav = TabNavigator(
      {
        DeckInfo: {
          screen: DeckInfo,
          navigationOptions: {
            tabBarLabel: "Stats",
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-grid-outline" size={30} color={tintColor} />
            )
          }
        },
        DeckQuestions: {
          screen: DeckQuestions,
          navigationOptions: {
            tabBarLabel: "Questions",
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-list" size={30} color={tintColor} />
            )
          },
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
  };

  render = () => {
    const params = this.props.navigation.state.params;
    const id = params ? params.id : null;
    const title = params ? params.title : null;
    const TabNav = this.TabNav;

    return <TabNav screenProps={{id, title, rootNavigation: this.props.navigation}} />;
  };
}

export default Deck;
