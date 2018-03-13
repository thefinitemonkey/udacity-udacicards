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
import EditCard from "./components/EditCard";
import Review from "./components/Review";
import { setLocalNotification } from "./utils/helpers";

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
        backgroundColor: green,
        height: 40
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
        height: 40
      }
    },
    DeckInfo: {
      screen: DeckInfo,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: green,
          height: 40
        }
      }
    },
    DeckQuestions: {
      screen: DeckInfo,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: green,
          height: 40
        }
      }
    }
  },
  EditCard: {
    screen: EditCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
        height: 40
      }
    }
  },
  Review: {
    screen: Review,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green,
        height: 40
      }
    }
  }
});
export default class App extends Component {
  componentDidMount = () => {
    setLocalNotification();
  }
  
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
