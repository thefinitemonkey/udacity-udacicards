import * as Api from "../utils/api";

const RECEIVE_GET_DECKS = "GET_DECKS";
const RECEIVE_GET_DECK = "GET_DECK";
const RECEIVE_SAVE_DECK_TITLE = "SAVE_DECK_TITLE";
const RECEIVE_ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
const RECEIVE_EDIT_CARD = "EDIT_CARD";
const RECEIVE_DELETE_CARD = "DELETE_CARD";

export const getDecks = () => dispatch => {
  Api.getDecks().then(decks => dispatch(receiveGetDecks(decks)));
};

export function receiveGetDecks(decks) {
  return {
    type: RECEIVE_GET_DECKS,
    decks
  };
}

export const getDeck = deckId => dispatch => {
  Api.getDeck(deckId).then(deck => dispatch(receiveGetDeck(deck)));
};

export function receiveGetDeck(deck) {
  return {
    type: RECEIVE_GET_DECK,
    deck
  };
}

export const saveDeckTitle = (deckId, title) => dispatch => {
  Api.saveDeckTitle(deckId, title).then(deck => dispatch(receiveGetDeck(deck)));
};

export const addCardToDeck = (deckId, card) => dispatch => {
  Api.addCardToDeck(deckId, card).then(deck => dispatch(receiveGetDeck(deck)));
};

export const editCard = (deckId, card) => dispatch => {
  Api.editCard(deckId, card).then(deck => dispatch(receiveGetDeck(deck)));
};

export const deleteCard = (deckId, card) => dispatch => {
  Api.deleteCard(deckId, card).then(deck => dispatch(receiveGetDeck(deck)));
};

export const deleteDeck = deckId => dispatch => {
  Api.deleteDeck(deckId).then(deckId => dispatch(receiveDeleteDeck(deckId)));
};

export function receiveDeleteDeck(deckId) {
  return {
    type: RECEIVE_DELETE_DECK,
    deckId
  };
}
