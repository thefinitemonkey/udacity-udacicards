import { AsyncStorage } from "react-native";
import { UDACI_CARDS_APPLICATION_KEY, getUUID } from "./helpers";

export const getDecks = () => {
  // Return all of the decks including all of their content
  // Start by getting all the keys for the decks, then getting
  // the decks for all the keys
  AsyncStorage.getAllKeys().then(keys => {
    AsyncStorage.multiGet(keys).then(results => {
      results.json();
      const decks = {};
      results.forEach(deck => decks[deck[0]] = deck[1]);
      return decks;
    });
  });
};

export const getDeck = key => {
  // Return the specified deck
  AsyncStorage.getItem(key).then((error, results) => results.json());
};

export const createDeck = title => {
  // Create a new deck with the given title and a unique key
  const key = `${UDACI_CARDS_APPLICATION_KEY}:${getUUID()}`;
  const newDate = Date.now();
  AsyncStorage.setItem(
    key,
    `{title:${title}, questions:[], created:${newDate}, modified:${newDate}`
  ).catch(error => console.warn("error saving new deck: ", error));
  return {
    key: { title: title, questions: [], created: newDate, modified: newDate }
  };
};

export const editDeck = (deckId, title) => {
  // Edit an existing deck with the given title
  const newDate = Date.now();
  let returnObj;
  AsynStorage.getItem(deckId).then(results => results.json()).then(
    obj => {
      obj.title = title;
      obj.modified = newDate;
      returnObj = obj;
      AsynStorage.setItem(deckId, JSON.stringify(obj))
  }).catch(error => console.warn("error saving edited deck: ", error));
  return returnObj;
}

export const deleteDeck = (deckId) => {
  // Delete an existing deck
  AsyncStorage.removeItem(deckId).catch(error => "error deleting deck: ", error);
  return deckId;
}

export const createCard = (key, card) => {
  // Create a new card in the specified deck, save the change to
  // the AsyncStorage, then get the deck again to be returned
  getDeck(key)
    .then(results => results.json())
    .then(obj => {
      card.id = getUUID();
      obj.modified = Date.now();
      obj.questions.push(card);
      AsyncStorage.setItem(key, JSON.stringify(obj));
    })
    .catch(error => {
      if (error) console.warn("error adding card to deck: ", error);
    })
    getDeck(key).then(results => results.json());
};

export const editCard = (deckId, card) => {
  // Edit the specified card in the specified deck
  getDeck(key)
    .then(results => results.json())
    .then(obj => {
      // Find the index for the edited card in the
      // array of questions and splice the update in
      const pos = obj.questions.findIndex(e => e.id === card.id);
      obj.questions.splice(pos, 1, card);

      obj.modified = Date.now();
      AsyncStorage.setItem(key, JSON.stringify(obj));
    })
    .catch(error => {
      if (error) console.warn("error editing card in deck: ", error);
    })
    getDeck(key).then(results => results.json());
};

export const deleteCard = (deckId, card) => {
  // Delete the specified card in the specified deck
  getDeck(key)
    .then(results => results.json())
    .then(obj => {
      // Find the index for the card to delete in the
      // array of questions and splice the card out
      const pos = obj.questions.findIndex(e => e.id === card.id);
      obj.questions.splice(pos, 1);

      obj.modified = Date.now();
      AsyncStorage.setItem(key, JSON.stringify(obj));
    })
    .catch(error => {
      if (error) console.warn("error deleting card in deck: ", error);
    })
    getDeck(key).then(results => results.json());
};