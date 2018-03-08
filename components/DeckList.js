import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { getDecks, getDeck, createDeck, deleteDeck, removeAll } from "../actions";
import { green, white } from "../utils/colors";
import NewDeck from "./NewDeck";

class DeckList extends Component {
  componentDidMount = () => {
    this.props.getDecks();
    //this.props.removeAll();
  };

  componentWillReceiveProps = (props) => {
      console.log("decklist new props", props);
      this.props = props;
  }

  handleNavigateCreateDeck = () => {
    this.props.navigation.navigate("NewDeck");
  };

  render = () => {
    const { decks } = this.props;

    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.cardCountText}>{this.props.decks.length} card decks</Text>
          <TouchableOpacity
            style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
            onPress={this.handleNavigateCreateDeck}
          >
            <Text style={styles.btnText}>Create Deck</Text>
          </TouchableOpacity>
        </View>
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
  }
});

function mapStateToProps(decks) {
  // Change the format from {"deckid":{...props}} to
  // [{"id":"deckid", ...props}]

  const decksArray = [];
  const keys = Object.keys(decks);
  keys.forEach(key => {
      const newObj = {};
      newObj["id"] = key;
      const deck = decks[key];
    const newDeck = Object.assign(deck, newObj);
    decksArray.push(newDeck);
  });
  return { decks: decksArray };
}

function mapDispatchToProps(dispatch) {
  return {
    getDecks: () => dispatch(getDecks()),
    getDeck: deckId => dispatch(getDeck(deckId)),
    createDeck: title => dispatch(createDeck(title)),
    deleteDeck: deckId => dispatch(deleteDeck(deckId)),
    removeAll: () => dispatch(removeAll())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
