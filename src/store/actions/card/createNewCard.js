import Axios from '../../../axios/axios-folders'
import { CREATE_NEW_CARD } from '../actionTypes'

const createCard = () => {
  return {
    title: 'Hello World',
    tasks: ''
  }
}

export function addNewCard(currentFolder) {
  return async dispatch => {
    const newCard = createCard();
    try {
      await Axios.post(`/folders/${currentFolder}/cards.json`, newCard)
      .then(function (res) {
        const cardKey = ((Object.values(res.data))[0])
        newCard.key = cardKey
        Axios.patch(`/folders/${currentFolder}/cards/${cardKey}.json`, {'key': cardKey})
        Axios.patch(`/folders/${currentFolder}/cards/${cardKey}.json`, {'cardID': cardKey})
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

