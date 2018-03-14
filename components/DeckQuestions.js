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
import { green, white, gray, blue } from "../utils/colors";
import EditCard from "./EditCard";

class DeckQuestions extends Component {
  state = { deck: { questions: [] } };

  componentDidMount = () => {
    // Set the state to reflect the selected deck
    this.setState({
      deck: this.props.decks[this.props.screenProps.id],
      questions: this.props.decks[this.props.screenProps.id].questions || []
    });
  };

  componentWillReceiveProps = props => {
    this.props = props;
    this.setState({
      deck: this.props.decks[this.props.screenProps.id],
      questions: this.props.decks[this.props.screenProps.id].questions || []
    });
  };

  handleNavigateCreateCard = deckId => {
    this.props.screenProps.rootNavigation.navigate("EditCard", {
      deckId,
      questionId: null
    });
  };

  handleNavigateToCard = (deckId, questionId) => {
    this.props.screenProps.rootNavigation.navigate("EditCard", {
      deckId,
      questionId
    });
  };

  handleDeleteCard = (deckId, questionId) => {
      this.props.deleteCard(deckId, questionId);
  }

  renderListItem = ({ item }) => {
    const date = item.modified ? new Date(item.modified) : "unknown";
    const updateDate = date.toLocaleString();
    const questionId = item.id;
    const question = item.question;
    const answer = item.answer;

    return (
      <View style={styles.questionListItem}>
        <View style={styles.questionSegment}>
          <Text style={{ fontWeight: "bold" }}>Question: </Text>
          <Text style={styles.questionListContent}>{item.question}</Text>
        </View>
        <View style={styles.questionSegment}>
          <Text style={{ fontWeight: "bold" }}>Answer: </Text>
          <Text style={styles.questionListContent}>{item.answer}</Text>
        </View>
        <View style={[styles.row, styles.listItemInfo]}>
          <View>
            <Text>Updated {updateDate}</Text>
          </View>
          <View style={styles.row}>
            <View>
              <TouchableOpacity
                style={[styles.btnLeft]}
                onPress={() =>
                  this.handleDeleteCard(this.state.deck.id, questionId)
                }
              >
                <Text style={styles.commandLink}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.btnRight]}
                onPress={() =>
                  this.handleNavigateToCard(this.state.deck.id, questionId)
                }
              >
                <Text style={styles.commandLink}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render = () => {
    const { decks } = this.props;
    const deck = this.state.deck;
    const deckId = deck.id;
    const questions = this.state.questions;

    return (
      <View style={styles.column}>
        <View style={[styles.row, styles.listHeader]}>
          <View>
            <Text style={styles.cardCountText}>
              {questions && questions.length} cards in deck
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn}
              onPress={() => this.handleNavigateCreateCard(deckId)}
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
  questionListContent: {
    fontSize: 20
  },
  questionSegment: {
    marginBottom: 7
  },
  questionListItem: {
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
  },
  btnLeft: {
      marginRight: 15
  },
  btnRight: {
      marginLeft: 15
  },
  commandLink: {
    color: blue
  }
});

function mapStateToProps(decks) {
  return { decks };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCard: (deckId, questionId) => dispatch(deleteCard(deckId, questionId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckQuestions);
