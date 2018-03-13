import { AsyncStorage } from "react-native";
import {
  UDACI_CARDS_APPLICATION_KEY,
  NOTIFICATION_KEY,
  getUUID
} from "./helpers";

export const getDecks = () => {
  // Return all of the decks including all of their content
  // Start by getting all the keys for the decks, then getting
  // the decks for all the keys
  const op = AsyncStorage.getAllKeys()
    .then(keys => {
      // Need to filter out any keys that don't belong to the decks
      const filteredKeys = keys.filter(
        key =>
          key !== NOTIFICATION_KEY &&
          key.indexOf(UDACI_CARDS_APPLICATION_KEY) === 0
      );
      return AsyncStorage.multiGet(filteredKeys);
    })
    .then(deckArray => {
      const decks = {};
      deckArray.forEach(deck => {
        const jsonDeck = JSON.parse(deck[1]);
        decks[deck[0]] = JSON.parse(deck[1]);
      }, decks);
      return decks;
    })
    .catch(e => {
      return {};
    });

  return op;
};

export const getDeck = key => {
  // Return the specified deck
  const op = AsyncStorage.getItem(key).then((error, results) => {
    return results.json();
  });

  return op;
};

export const createDeck = title => {
  // Create a new deck with the given title and a unique key
  const key = `${UDACI_CARDS_APPLICATION_KEY}:${getUUID()}`;
  const newDate = Date.now();
  const newObj = {
    title: title,
    questions: [],
    created: newDate,
    modified: newDate
  };
  const op = AsyncStorage.setItem(key, JSON.stringify(newObj))
    .then(() => {
      const newDeck = {};
      newDeck[key] = {
        title: title,
        questions: [],
        created: newDate,
        modified: newDate
      };
      return newDeck;
    })
    .catch(error => {
      console.warn("error saving new deck: ", error);
      return null;
    });

  return op;
};

export const editDeck = (deckId, title) => {
  // Edit an existing deck with the given title
  const newDate = Date.now();
  let returnObj;
  const op = AsyncStorage.getItem(deckId)
    .then(results => results.json())
    .then(obj => {
      obj.title = title;
      obj.modified = newDate;
      returnObj = obj;
      AsyncStorage.setItem(deckId, JSON.stringify(obj));
    })
    .then(() => {
      return returnObj;
    })
    .catch(error => {
      console.warn("error saving edited deck: ", error);
      return null;
    });

  return op;
};

export const deleteDeck = deckId => {
  // Delete an existing deck
  const op = AsyncStorage.removeItem(deckId)
    .then(() => {
      return deckId;
    })
    .catch(error => {
      console.log("error deleting deck: ", error);
      return null;
    });

  return op;
};

export const createCard = (deckId, card) => {
  // Create a new card in the specified deck, save the change to
  // the AsyncStorage, then get the deck again to be returned
  const op = AsyncStorage.getItem(deckId)
    .then(response => {
      const obj = JSON.parse(response);

      card.id = getUUID();
      card.modified = Date.now();
      obj.modified = card.modified;
      obj.questions.push(card);

      return AsyncStorage.setItem(deckId, JSON.stringify(obj));
    })
    .catch(error => {
      if (error) console.warn("error adding card to deck: ", error);
      return null;
    })
    .then(() =>
      AsyncStorage.getItem(deckId).then(response => {
        const obj = JSON.parse(response);
        const returnObj = {};
        returnObj[deckId] = obj;
        return returnObj;
      })
    );

  return op;
};

export const editCard = (deckId, card) => {
  // Edit the specified card in the specified deck
  const op = AsyncStorage.getItem(deckId)
    .then(response => {
      obj = JSON.parse(response);

      // Find the index for the edited card in the
      // array of questions and splice the update in
      const pos = obj.questions.findIndex(e => e.id === card.id);
      card.modified = Date.now();
      obj.modified = card.modified;
      obj.questions.splice(pos, 1, card);

      return AsyncStorage.setItem(deckId, JSON.stringify(obj));
    })
    .catch(error => {
      if (error) console.warn("error editing card in deck: ", error);
      return null;
    })
    .then(() =>
      AsyncStorage.getItem(deckId).then(response => {
        const obj = JSON.parse(response);
        const returnObj = {};
        returnObj[deckId] = obj;
        return returnObj;
      })
    );

  return op;
};

export const deleteCard = (deckId, questionId) => {
  // Delete the specified card in the specified deck
  const op = AsyncStorage.getItem(deckId)
    .then(response => {
      const obj = JSON.parse(response);
      // Find the index for the card to delete in the
      // array of questions and splice the card out
      const pos = obj.questions.findIndex(e => e.id === questionId);
      obj.modified = Date.now();
      obj.questions.splice(pos, 1);

      return AsyncStorage.setItem(deckId, JSON.stringify(obj));
    })
    .catch(error => {
      if (error) console.warn("error deleting card in deck: ", error);
      return null;
    })
    .then(() =>
      AsyncStorage.getItem(deckId).then(response => {
        const obj = JSON.parse(response);
        const returnObj = {};
        returnObj[deckId] = obj;
        return returnObj;
      })
    );

  return op;
};

export const removeAll = () => {
  const op = AsyncStorage.getAllKeys()
    .then(keys => {
      return AsyncStorage.multiRemove(keys);
    })
    .then(result => {
      console.log("All removed");
    })
    .catch(e => {
      console.warn("Not all removed");
    });

  return op;
};
