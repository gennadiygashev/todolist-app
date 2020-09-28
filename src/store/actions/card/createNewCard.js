import Axios from '../../../axios/axios-folders'
import { CREATE_NEW_CARD } from '../actionTypes'

const createCard = () => {
  return {
    title: 'Hello World',
    tasks: false
  }
}

export function addNewCard(currentFolder) {
  return async dispatch => {
    const newCard = createCard();
    try {
      await Axios.post(`/cards/${currentFolder}.json`, newCard)
      .then(function (res) {
        const cardKey = ((Object.values(res.data))[0])
        newCard.key = cardKey
        newCard.cardID = cardKey
        Axios.patch(`/cards/${currentFolder}/${cardKey}.json`, {'key': cardKey, 'cardID': cardKey})
      })
      dispatch(createNewCard(newCard, currentFolder))  
    } catch (e) {
      console.error(e)
    }
  }
}

export function createNewCard(card, currentFolder) {
  return {
    type: CREATE_NEW_CARD,
    card,
    currentFolder
  }
}

