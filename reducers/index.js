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

  switch (action.type) {
    case RECEIVE_GET_DECKS:
      if (!decks) return state;
      // Update the state with the new set of decks
      return decks;
    case RECEIVE_GET_DECK:
      if (!deck) return state;
      // Update the state by replacing a deck with the
      // returned deck
      return {...state, ...deck};
    case RECEIVE_DELETE_DECK:
      if (!deckId) return state;
      // Update the state by deleting the specified deck
      let newState = {...state};
      delete newState[deckId];
      return newState;
    default:
      return state;
  }
};

export default decks;
