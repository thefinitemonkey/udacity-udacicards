import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { green, white, gray, blue, red } from "../utils/colors";

class Review extends Component {
  state = {
    correct: 0,
    total: 0,
    current: 0,
    state: "question"
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const title = "Quiz";
    return { ...params, title };
  };

  componentDidMount = () => {
    // Set the deck and questions into the component state
    const deck =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.deck;
    const questions = deck && deck.questions;

    this.setState({
      correct: 0,
      total: questions.length,
      current: 0,
      state: "question"
    });
  };

  handleSeeAnswer = () => {
    this.setState({ state: "answer" });
  };

  handleGotWrong = () => {
    this.setState({
      correct: this.state.correct,
      current: this.state.current + 1,
      state: "question"
    });
  };

  handleGotRight = () => {
    this.setState({
      correct: this.state.correct + 1,
      current: this.state.current + 1,
      state: "question"
    });
  };

  handleReset = () => {
    this.setState({
      correct: 0,
      current: 0,
      state: "question"
    });
  };

  handleReturn = () => {
    this.props.navigation.goBack();
  };

  renderQuestionSeries = (questions, correct, total, current, state) => {
    // Determine button stack style based on OS
    const btnStyle =
      Platform.OS === "ios" ? styles.btnStackIOS : styles.btnStackAndroid;

    return (
      <View style={[styles.column, styles.mainContainer]}>
        <View style={{ flex: 5 }}>
          <View>
            <Text style={styles.cardCount}>{`Card ${current + 1} of ${total}`}</Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            {questions && state === "question" ? (
              <Text style={styles.featureText}>
                {questions && questions[current].question}
              </Text>
            ) : (
              <Text style={styles.featureText}>
                {questions && questions[current].answer}
              </Text>
            )}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          {questions && state === "question" ? (
            <View style={[styles.row, btnStyle]}>
              <View>
                <TouchableOpacity
                  style={[
                    Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn
                  ]}
                >
                  <Text
                    style={styles.btnText}
                    onPress={() => this.handleSeeAnswer()}
                  >
                    See Answer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[styles.row, btnStyle]}>
              <View>
                <TouchableOpacity
                  onPress={() => this.handleGotWrong()}
                  style={[
                    Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                    Platform.OS === "ios" ? styles.iosBtnRight : "",
                    styles.btnWrong
                  ]}
                >
                  <Text style={styles.btnText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.handleGotRight()}
                  style={[
                    Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                    Platform.OS === "ios" ? styles.iosBtnLeft : ""
                  ]}
                >
                  <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  renderResults = (correct, total) => {
    // Calculate the percentage correct and display results
    const percentage = Math.round(correct / total * 100);
    // Determine button stack style based on OS
    const btnStyle =
      Platform.OS === "ios" ? styles.btnStackIOS : styles.btnStackAndroid;

    return (
      <View
        style={[
          styles.column,
          styles.mainContainer,
          { justifyContent: "center" }
        ]}
      >
        <View style={{ flex: 1 }} />
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={styles.percentage}>{`${percentage}%`}</Text>
          <Text
            style={styles.score}
          >{`You got ${correct} out of ${total} right`}</Text>
        </View>
        <View style={{ alignContent: "center" }}>
          <View style={[styles.row, btnStyle]}>
            <TouchableOpacity
              onPress={() => this.handleReset()}
              style={[
                Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                Platform.OS === "ios" ? styles.iosBtnRight : ""
              ]}
            >
              <Text style={styles.btnText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleReturn()}
              style={[
                Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                Platform.OS === "ios" ? styles.iosBtnLeft : ""
              ]}
            >
              <Text style={styles.btnText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 2 }} />
      </View>
    );
  };

  render = () => {
    // Get the deck, questions, and other values for use in rendering
    const deck =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.deck;
    const questions = deck && deck.questions;

    const { correct, total, current, state } = this.state;

    // If we aren't at the end of the questions then render the question
    // display, otherwise render the results display
    if (current < total) {
      return this.renderQuestionSeries(
        questions,
        correct,
        total,
        current,
        state
      );
    } else {
      return this.renderResults(correct, total);
    }
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 15,
    marginRight: 15
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1
  },
  cardCount: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20
  },
  featureText: {
    fontSize: 26,
    marginBottom: 20
  },
  btnStackIOS: {
    justifyContent: "center"
  },
  btnStackAndroid: {
    justifyContent: "flex-end"
  },
  iosBtnLeft: {
    marginLeft: 20,
    marginRight: 10
  },
  iosBtnRight: {
    marginLeft: 10,
    marginRight: 20
  },
  iosBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45
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
  btnWrong: {
    backgroundColor: red
  },
  btnText: {
    color: white,
    fontSize: 18,
    textAlign: "center"
  },
  retultsDisplay: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "center",
    alignItems: "center"
  },
  score: {
    fontSize: 18
  },
  percentage: {
    fontSize: 100,
    fontWeight: "bold"
  }
});

export default Review;
