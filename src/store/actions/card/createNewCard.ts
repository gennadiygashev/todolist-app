import Axios from '../../../axios/axios-folders'
import { CREATE_NEW_CARD } from '../actionTypes'

const createCard = () => {
  return {
    title: 'Card',
    tasks: false,
    key: '', 
    cardID: ''
  }
}

export function addNewCard(currentFolder: any) {
  return async (dispatch: (arg0: { type: string; card: any; currentFolder: any }) => void) => {
    const newCard = createCard();
    try {
      await Axios.post(`/cards/${currentFolder}.json`, newCard)
      .then(function (res) {
        const cardKey: any = ((Object.values(res.data))[0])
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

export function createNewCard(card: any, currentFolder: any) {
  return {
    type: CREATE_NEW_CARD,
    card,
    currentFolder
  }
}

