import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { createDeck } from "../actions";
import { green, white, gray } from "../utils/colors";
import { NavigationActions } from "react-navigation";

class NewDeck extends Component {
  state = {
    title: ""
  };

  componentWillReceiveProps = props => {
    // Check if there is a new deck, and if so then navigate to
    // the details screen
    const keys = Object.keys(props.decks);
    let id = null;
    let title = null;
    keys.forEach(key => {
      const deck = props.decks[key];
      if (deck.new) {
        id = key;
        title = deck.title;
      }
    });

    if (id) this.props.navigation.replace("Deck", { id, title });
  };

  handleCreateDeck = () => {
    this.props.createDeck(this.state.title);
  };

  toHome = () => {
    this.props.navigation.goBack();
  };

  render = () => {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <TextInput
          placeholder={"Deck name"}
          editable={true}
          keyboardType="default"
          style={styles.titleInput}
          underlineColorAndroid={"transparent"}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TouchableOpacity
          style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
          onPress={this.handleCreateDeck}
        >
          <Text style={styles.btnText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1
  },
  column: {
    flexDirection: "column",
    flex: 1
  },
  cardCountText: {
    fontSize: 14,
    padding: 5,
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  iosBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 20,
    marginRight: 20
  },
  androidBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: white,
    fontSize: 18,
    textAlign: "center"
  },
  titleInput: {
    fontSize: 18,
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    marginBottom: 20
  }
});

function mapStateToProps(decks) {
  return { decks };
}

function mapDispatchToProps(dispatch) {
  return {
    createDeck: title => dispatch(createDeck(title))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
