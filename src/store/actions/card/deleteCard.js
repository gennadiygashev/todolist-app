import Axios from '../../../axios/axios-folders'
import { DELETE_CARD } from '../actionTypes'

export function deleteCard(currentFolder, cardID) {
  Axios.delete(`/cards/${currentFolder}/${cardID}.json`)
  return {
    type: DELETE_CARD,
    cardID
  }
}