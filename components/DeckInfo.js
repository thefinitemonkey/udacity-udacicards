import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { green, white, gray } from "../utils/colors";
import { NavigationActions } from "react-navigation";

class DeckInfo extends Component {
  state = { id: null, deck: null };

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    const id = params ? params.id : null;
    let deck = {};
    if (id) {
      deck = this.props.decks[id];
      this.props.navigation.setParams({ title: deck.title });
    }

    this.state = {
      id,
      deck
    };
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const title = params ? params.title : "Info Screen";
    return { ...params, title };
  };

  render = () => {
    const { id, deck } = this.state;

    return (
      <View>
        <Text>Welcome to the info screen!</Text>
      </View>
    );
  };
}

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(DeckInfo);
