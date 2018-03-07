import {
  RECEIVE_GET_DECKS,
  RECEIVE_GET_DECK,
  RECEIVE_DELETE_DECK
} from "../actions";

/* 
The default state for the decks is
{  }

Populated decks looks like
{ deckKey: 
    {title: "deckName", 
    questions:[
        {question:"text", 
        answer:"text"}
    ], 
    created: dateValue, 
    modified: dateValue}
}
*/

const decks = (state = {}, action) => {
  const { deck, decks, deckId } = action;
  let newState;
  let newDeck;
  let keys;

  switch (action.type) {
    case RECEIVE_GET_DECKS:
      if (!decks) return state;
      // Update the state with the new set of decks
      return decks;
    case RECEIVE_GET_DECK:
      if (!deck) return state;
      // Update the state by replacing a deck with the
      // returned deck
      newDeck = {};
      newDeck[deckId] = deck;
      newState = Object.assign(this.state, newDeck);
      newState[deckId] = deck;
      return newState;
    case RECEIVE_DELETE_DECK:
      if (!deck) return state;
      // Update the state by deleting the specified deck
      newState = {};
      keys = this.state.keys();
      keys.array.forEach(key => {
        if (key !== deckId) {
          newState[key] = this.state[key];
        }
      });
      return newState;
    default:
      return state;
  }
};

export default decks;
