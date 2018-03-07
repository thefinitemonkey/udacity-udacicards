import * as Api from "../utils/api";

const RECEIVE_GET_DECKS = "GET_DECKS";
const RECEIVE_GET_DECK = "GET_DECK";
const RECEIVE_DELETE_DECK = "DELETE_DECK";

export const getDecks = () => dispatch => {
  Api.getDecks().then(decks => dispatch(receiveGetDecks(decks)));
};

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

