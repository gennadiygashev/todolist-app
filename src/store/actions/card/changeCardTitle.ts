import Axios from '../../../axios/axios-folders'
import { CHANGE_CARD_TITLE } from '../actionTypes'

export function changeCardTitle(currentFolder: string, cardID: string, value: string) {
  Axios.patch(`/cards/${currentFolder}/${cardID}.json`, {'title': value})
  return {
    type: CHANGE_CARD_TITLE,
    cardID, 
    value
  }
}


