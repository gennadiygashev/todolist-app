import Axios from '../../../axios/axios-folders'
import { CHANGE_CARD_TITLE } from '../actionTypes'

export function changeCardTitle(currentFolder: any, cardID: any, value: any) {
  Axios.patch(`/cards/${currentFolder}/${cardID}.json`, {'title': value})
  return {
    type: CHANGE_CARD_TITLE,
    cardID, 
    value
  }
}


