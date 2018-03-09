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
import { createCard, editCard } from "../actions";
import { green, white, gray } from "../utils/colors";
import { NavigationActions } from "react-navigation";

class EditCard extends Component {
  state = {
    question: "",
    answer: "",
    deckId,
    questionId
  };

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    // Get the question id. If there is none, then this is
    // the edit for a new card, so display that title.
    const qId = params ? params.questionId : null;
    const dId = params ? params.deckId : null;
    let title = "New Card";
    let question;
    let answer;

    // Use the id to get the question text and display that
    // as the title
    if (qId && dId) {
      const questions = this.props.decks[dId].questions;
      const questionItem = questions[questions.indexOf(q => q.id === qId)];
      question = questionItem.question;
      answer = questionItem.answer;

      title = questionItem.question;
    }

    this.setState({ question, answer, deckId: dId, questionId: qId });
    this.props.navigation.state.setParams({ ...params, title });
  };

  handleCreateCard = () => {
    const card = { question: this.state.question, answer: this.state.answer };

    this.props.createCard(this.state.deckId, card);
    this.goBack();
  };

  handleEditCard = () => {
    const card = { question: this.state.question, answer: this.state.answer };

    this.props.editCard(this.state.deckId, card);
    this.goBack();
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render = () => {
    return (
      <View style={{ flex: 1 }}>
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
          <Text style={styles.btnText}>Save</Text>
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
    borderWidth: 1
  }
});

function mapDispatchToProps(dispatch) {
  return {
    createDeck: title => dispatch(createDeck(title))
  };
}

export default connect(null, mapDispatchToProps)(EditCard);
