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
import { green, white, gray } from "../utils/colors";
import NewDeck from "./NewDeck";
import Deck from "./Deck";

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

  handleNavigateToDeck = (deckId, deckTitle) => {
    this.props.navigation.navigate("Deck", { id:deckId, title:deckTitle });
  };

  renderListItem = ({ item }) => {
    const date = new Date(item.modified);
    const updateDate = date.toLocaleString();
    const id = item.id;
    const title = item.title;

    return (
      <View>
        <TouchableOpacity
          style={styles.btnListItem}
          onPress={() => this.handleNavigateToDeck(id, title)}
        >
          <View>
            <Text style={styles.titleListItem}>{item.title}</Text>
          </View>
          <View style={[styles.row, styles.listItemInfo]}>
            <View>
              <Text>{item.questions.length} questions</Text>
            </View>
            <View>
              <Text>Updated {updateDate}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
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
              <Text style={styles.btnText}>New Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.deckList}>
          <FlatList
            style={styles.deckList}
            data={decks}
            keyExtractor={(deck, index) => deck.id}
            renderItem={this.renderListItem}
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
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  listItemInfo: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  twoColumn: {
    margin: 10
  },
  cardCountText: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  },
  deckList: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  titleListItem: {
    fontSize: 28
  },
  btnListItem: {
    paddingTop: 15,
    paddingBottom: 15
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

  // Sort the array by title
  decksArray.sort((a, b) => {
    const aStr = a.title.toUpperCase();
    const bStr = b.title.toUpperCase();
    if (aStr < bStr) return -1;
    if (aStr > bStr) return 1;
    return 0;
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
