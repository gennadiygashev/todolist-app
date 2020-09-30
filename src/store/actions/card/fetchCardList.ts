import Axios from '../../../axios/axios-folders'
import { 
  FETCH_CARDLIST_STARTED,
  FETCH_CARDLIST_SUCCESS,
  FETCH_CARDLIST_FAILURE
} from '../actionTypes'

export function fetchCardList(currentFolder: any) {
  return async (dispatch: (arg0: { type: string; cards?: any; error?: any }) => void) => {
    dispatch(fetchCardListStarted())
    try {      
      const response = await Axios.get(`/cards/${currentFolder}.json`)
      const cards: any = []
      Object.values(response.data).forEach((card) => {
        cards.push(card)
      })  
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

export function fetchCardListSuccess(cards: any) {
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

