import * as Api from "../utils/api";

export const RECEIVE_GET_DECKS = "RECEIVE_GET_DECKS";
export const RECEIVE_GET_DECK = "RECEIVE_GET_DECK";
export const RECEIVE_DELETE_DECK = "RECEIVE_DELETE_DECK";
export const RECEIVE_REMOVE_ALL = "RECEIVE_REMOVE_ALL";

export function receiveGetDecks(decks) {
  return {
    type: RECEIVE_GET_DECKS,
    decks
  };
}

export function receiveGetDeck(deck) {
  return {
    type: RECEIVE_GET_DECK,
    deck
  };
}

export function receiveDeleteDeck(deckId) {
  return {
    type: RECEIVE_DELETE_DECK,
    deckId
  };
}

export const removeAll = () => dispatch => {
  Api.removeAll().then(() => dispatch(receiveRemoveAll()));
}

export const getDecks = () => dispatch => {
  Api.getDecks().then(decks => dispatch(receiveGetDecks(decks)));
};

export const getDeck = deckId => dispatch => {
  Api.getDeck(deckId).then(deck => dispatch(receiveGetDeck(deck)));
};

export const createDeck = (deckId, title) => dispatch => {
  Api.createDeck(deckId, title).then(deck => dispatch(receiveGetDeck(deck)));
};

export const editDeck = (deckId, title) => dispatch => {
  Api.editDeck(deckId, title).then(deck => dispatch(receiveGetDeck(deck)));
}

export const deleteDeck = deckId => dispatch => {
  Api.deleteDeck(deckId).then(deckId => dispatch(receiveDeleteDeck(deckId)));
};

export const createCard = (deckId, card) => dispatch => {
  Api.createCard(deckId, card).then(deck => dispatch(receiveGetDeck(deck)));
};

export const editCard = (deckId, card) => dispatch => {
  Api.editCard(deckId, card).then(deck => dispatch(receiveGetDeck(deck)));
};

export const deleteCard = (deckId, card) => dispatch => {
  Api.deleteCard(deckId, card).then(deck => dispatch(receiveGetDeck(deck)));
};

