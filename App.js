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

export default class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar backgroundColor={green} barStyle="light-content" />
            <DeckList />
        </View>
      </Provider>
    );
  }
}
