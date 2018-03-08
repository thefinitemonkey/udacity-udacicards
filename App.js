import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StackNavigator } from "react-navigation";
import { Constants } from "expo";
import store from "./store/store";
import { green, white } from "./utils/colors";
import CustomStatusBar from "./components/CustomStatusBar";
import DeckList from "./components/DeckList";
import NewDeck from "./components/NewDeck";
import DeckInfo from "./components/DeckInfo";
import Deck from "./components/Deck";

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: { title: "Deck List", header: null }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: "New Deck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  }
});
export default class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar backgroundColor={green} barStyle="light-content" />
          <MainNavigator style={{ flex: 1 }} />
        </View>
      </Provider>
    );
  }
}

