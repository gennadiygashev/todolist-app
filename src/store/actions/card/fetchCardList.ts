import Axios from '../../../axios/axios-folders'
import { ICard } from './../../../interfaces'
import { 
  FETCH_CARDLIST_STARTED,
  FETCH_CARDLIST_SUCCESS,
  FETCH_CARDLIST_FAILURE
} from '../actionTypes'

export function fetchCardList(currentFolder: string) {
  return async (dispatch: any) => {
    dispatch(fetchCardListStarted())
    try {      
      const response = await Axios.get(`/cards/${currentFolder}.json`)
      const cards: ICard[] = Object.values(response.data)
      dispatch(fetchCardListSuccess(cards))
    } catch (e) {
      dispatch(fetchCardListFailure(e))
    }  
  }
}

export function fetchCardListStarted() {
  return {
    type: FETCH_CARDLIST_STARTED
  }
}

export function fetchCardListSuccess(cards: ICard[]) {
  return {
    type: FETCH_CARDLIST_SUCCESS,
    cards
  }
}

export function fetchCardListFailure(e: any) {
  return {
    type: FETCH_CARDLIST_FAILURE,
    error: e
  }
}

