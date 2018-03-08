import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import {
  getDecks,
  getDeck,
  createDeck,
  deleteDeck,
  removeAll
} from "../actions";
import { green, white } from "../utils/colors";
import NewDeck from "./NewDeck";

class DeckList extends Component {
  componentDidMount = () => {
    this.props.getDecks();
    //this.props.removeAll();
  };

  componentWillReceiveProps = props => {
    console.log("decklist new props", props);
    this.props = props;
  };

  handleNavigateCreateDeck = () => {
    this.props.navigation.navigate("NewDeck");
  };

  render = () => {
    const { decks } = this.props;

    return (
      <View style={styles.column}>
        <View style={[styles.row, styles.listHeader]}>
          <View>
            <Text style={styles.cardCountText}>{decks.length} card decks</Text>
          </View>
          <View>
            <TouchableOpacity
              style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
              onPress={this.handleNavigateCreateDeck}
            >
              <Text style={styles.btnText}>Create Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.deckList}>
          <FlatList
            style={styles.deckList}
            data={decks}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1
  },
  listHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  twoColumn: {
    margin: 10
  },
  cardCountText: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  },
  deckList: {},
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
    borderRadius: 2,
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
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
