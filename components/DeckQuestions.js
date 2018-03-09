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
import { createCard, editCard, deleteCard } from "../actions";
import { green, white, gray } from "../utils/colors";

class DeckQuestions extends Component {
  state = { deck: { questions: [] } };

  componentDidMount = () => {
    // Set the state to reflect the selected deck
    this.setState({ deck: this.props.decks[this.props.screenProps.id] });
  };

  componentWillReceiveProps = props => {
    this.props = props;
  };

  handleNavigateCreateCard = deckId => {
    this.props.navigation.navigate("EditCard", { deckId, question: null });
  };

  handleNavigateToCard = (deckId, questionId) => {
    this.props.navigation.navigate("EditCard", {
      deckId,
      questionId
    });
  };

  renderListItem = ({ item }) => {
    const date = new Date(item.modified);
    const updateDate = date.toLocaleString();
    const questionId = item.id;
    const question = item.question;
    const answer = item.answer;

    return (
      <View>
        <TouchableOpacity
          style={styles.btnListItem}
          onPress={() =>
            this.handleNavigateToCard(this.state.deck.id, questionId)
          }
        >
          <View>
            <Text style={{ fontWeight: "bold" }}>Question: </Text>
            <Text style={styles.titleListItem}>{item.question}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Answer: </Text>
            <Text style={styles.titleListItem}>{item.answer}</Text>
          </View>
          <View style={[styles.row, styles.listItemInfo]}>
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
    const deck = this.state.deck;
    const deckId = deck.id;
    const questions = deck.questions;

    return (
      <View style={styles.column}>
        <View style={[styles.row, styles.listHeader]}>
          <View>
            <Text style={styles.cardCountText}>
              {questions.length} cards in deck
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
              onPress={deckId => this.handleNavigateCreateCard(deckId)}
            >
              <Text style={styles.btnText}>New Card</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.questionList}>
          <FlatList
            style={styles.questionList}
            data={questions}
            keyExtractor={(question, index) => question.id}
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
  questionList: {
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
  return { decks };
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

export default connect(mapStateToProps, mapDispatchToProps)(DeckQuestions);
