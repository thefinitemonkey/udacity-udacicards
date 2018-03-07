import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StackNavigator } from "react-navigation";
import { Constants } from "expo";
import reducer from "./reducers";
import { green, white } from "./utils/colors";
import CustomStatusBar from "./components/CustomStatusBar";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <CustomStatusBar backgroundColor={green} barStyle="light-content" />
          <View>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text>Shake your phone to open the developer menu.</Text>
          </View>
        </View>
      </Provider>
    );
  }
}
