import Axios from '../../../axios/axios-folders'
import { CHANGE_CARD_TITLE } from '../actionTypes'

export function changeCardTitle(currentFolder, cardID, value) {
  Axios.patch(`/folders/${currentFolder}/cards/${cardID}.json`, {'title': value})
  return {
    type: CHANGE_CARD_TITLE,
    cardID, 
    value
  }
}


