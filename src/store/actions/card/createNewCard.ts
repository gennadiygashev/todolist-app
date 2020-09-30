import Axios from '../../../axios/axios-folders'
import { ICard } from './../../../interfaces'
import { CREATE_NEW_CARD } from '../actionTypes'

const createCard = (): ICard => {
  return {
    title: 'Card',
    tasks: [],
    key: '', 
    cardID: ''
  }
}

export function addNewCard(currentFolder: string) {
  return async (dispatch: any) => {
    const newCard: ICard = createCard()
    try {
      await Axios.post(`/cards/${currentFolder}.json`, newCard)
      .then(function (res) {
        const cardKey: any = Object.values(res.data)[0]
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

export function createNewCard(card: ICard, currentFolder: string) {
  return {
    type: CREATE_NEW_CARD,
    card,
    currentFolder
  }
}

