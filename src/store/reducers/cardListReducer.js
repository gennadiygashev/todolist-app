const initialState = {
  cards: []
}

const cardListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CARDLIST_STARTED':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_CARDLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        cards: action.cards
      }
    case 'FETCH_CARDLIST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'CREATE_NEW_CARD':
      return {
        ...state,
        cards: [
          ...state.cards,
          action.card
        ]
      }
    case 'DELETE_CARD':
      const idx = state.cards.findIndex((el) => el.cardID === action.cardID);
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, idx),
          ...state.cards.slice(idx + 1)
        ]
      } 
    case 'CHANGE_CARD_TITLE': 
      const idxA = state.cards.findIndex((el) => el.cardID === action.cardID);
      const oldItem = state.cards[idxA];
      const newItem = {...oldItem,
        ['title']: action.value
      }  
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, idxA),
          newItem,
          ...state.cards.slice(idxA + 1)  
        ]
      }
    default:
      return state
  }
}

export default cardListReducer