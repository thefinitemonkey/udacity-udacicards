import {
  RECEIVE_GET_DECKS,
  RECEIVE_GET_DECK,
  RECEIVE_CREATE_DECK,
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

  // Iterate over the state as a new variable to remove
  // all settings of a deck being "new"
  const newState = Object.assign({}, state);
  const keys = Object.keys(newState);
  keys.forEach(key => {
    const item = newState[key];
    delete item.new;
  });

  switch (action.type) {
    case RECEIVE_GET_DECKS: {
      if (!decks) return newState;
      // Update the state with the new set of decks
      return decks;
    }
    case RECEIVE_GET_DECK: {
      if (!deck) return newState;
      // Update the state by replacing a deck with the
      // returned deck
      return { ...newState, ...deck };
    }
    case RECEIVE_CREATE_DECK: {
      if (!deck) return state;
      const deckKeys = Object.keys(deck);
      deck[deckKeys[0]].new = true;
      return { ...newState, ...deck };
    }
    case RECEIVE_DELETE_DECK: {
      if (!deckId) return state;
      // Update the state by deleting the specified deck
      const remState = { ...newState };
      delete remState[deckId];
      return remState;
    }
    default: {
      return newState;
    }
  }
};

export default decks;
