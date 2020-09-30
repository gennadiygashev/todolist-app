import Axios from '../../../axios/axios-folders'
import { DELETE_CARD } from '../actionTypes'

export function deleteCard(currentFolder: any, cardID: any) {
  Axios.delete(`/cards/${currentFolder}/${cardID}.json`)
  return {
    type: DELETE_CARD,
    cardID
  }
}
