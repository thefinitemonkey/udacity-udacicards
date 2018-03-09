import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { green, white, gray } from "../utils/colors";
import { NavigationActions } from "react-navigation";
import { deleteDeck } from "../actions";

class DeckInfo extends Component {
  state = { id: null, deck: null };

  constructor(props) {
    super(props);
    this.props = props;

    const screenProps = this.props.screenProps;
    const id = screenProps ? screenProps.id : null;
    let deck = {};
    if (id) {
      deck = this.props.decks[id];
      this.props.navigation.setParams({ title: deck.title });
    }

    this.state = {
      id,
      deck
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const title = params ? params.title : "Info Screen";
    return { ...params, title };
  };

  handleDeleteDeck = () => {
    if (this.state.deck) this.props.deleteDeck(this.state.deck.id);
    this.props.navigation.goBack();
  };

  handleStartReview = () => {};

  render = () => {
    const { id, deck } = this.state;

    if (!deck) return null;
    const dateCreated = new Date(deck.created);
    const dateModified = new Date(deck.modified);
    const deckSize = deck.questions ? deck.questions.length : 0;

    return (
      <View style={styles.column}>
        <View style={styles.deckInfoBlock}>
          <View>
            <Text style={styles.deckInfoHeader}>Stats</Text>
          </View>
          <View>
            <Text style={styles.deckInfoItem}>{deckSize} cards in deck</Text>
          </View>
          <View>
            <Text style={styles.deckInfoItem}>
              Created on {dateCreated.toLocaleString()}
            </Text>
          </View>
          <View>
            <Text style={styles.deckInfoItem}>
              Modified on {dateModified.toLocaleString()}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.row,
            Platform.OS === "ios" ? styles.btnStackIOS : styles.btnStackAndroid
          ]}
        >
          <View>
            <TouchableOpacity
              style={[
                Platform.OS === "ios" ? styles.iosBtnLeft : styles.androidBtn
              ]}
              onPress={this.handleStartReview}
            >
              <Text style={styles.btnText}>Start Review</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={[
                Platform.OS === "ios" ? styles.iosBtnRight : styles.androidBtn
              ]}
              onPress={this.handleDeleteDeck}
            >
              <Text style={styles.btnText}>Delete Deck</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "flex-start",
    flex: 1
  },
  deckInfoBlock: {
    margin: 20
  },
  deckInfoHeader: {
    fontSize: 24,
    fontWeight: "bold"
  },
  deckInfoItem: {
    fontSize: 18
  },
  btnStackIOS: {
    justifyContent: "center"
  },
  btnStackAndroid: {
    justifyContent: "flex-end"
  },
  iosBtnLeft: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 20,
    marginRight: 10
  },
  iosBtnRight: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 10,
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
  return { decks };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteDeck: deckId => dispatch(deleteDeck(deckId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckInfo);
