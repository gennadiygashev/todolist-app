const initialState = {
  cards: [],
  loading: true,
  error: null
}

const mainReducer = (state = initialState, action: any) => {
  
  const cardIndex = (cardID: any): any => {
    return (
      state.cards.findIndex((el: any) => el.cardID === cardID)
    )
  }  

  const cardWithTaskChanges = (taskID: any, newTaskArr: any, cardID: any) => {
    const newTask: any = {}
    newTask[taskID] = newTaskArr
    const oldCard: any = state.cards[cardIndex(cardID)]
    const newCard = {...oldCard,
      'tasks': Object.assign(oldCard.tasks, newTask)
    }
    return newCard
  }

  const deleteTaskOnCard = (taskID: any, cardID: any) => {
    const oldCard: any = state.cards[cardIndex(cardID)]
    const taskIndex = Object.values(oldCard.tasks).findIndex((el: any) => el.taskID === taskID)
    const newCard: any = {...oldCard,
      'tasks': [
        ...Object.values(oldCard.tasks).slice(0, taskIndex),
        ...Object.values(oldCard.tasks).slice(taskIndex + 1)
      ]
    }
    return newCard
  }

  switch (action.type) {
    case 'FETCH_CARDLIST_STARTED':
      return {
        ...state
      }
    case 'FETCH_CARDLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        cards: action.cards
      }
    case 'FETCH_CARDLIST_FAILURE':
      return {
        cards: [],
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
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex(action.cardID)),
          ...state.cards.slice(cardIndex(action.cardID) + 1)
        ]
      } 
    case 'CHANGE_CARD_TITLE': 
      const oldCard: any = state.cards[cardIndex(action.cardID)]
      const newCard = {...oldCard,
        'title': action.value
      }  
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex(action.cardID)),
          newCard,
          ...state.cards.slice(cardIndex(action.cardID) + 1)  
        ]
      }
    case 'CREATE_NEW_TASK': 
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex(action.cardID)),
          cardWithTaskChanges(action.taskID, action.newTask, action.cardID),
          ...state.cards.slice(cardIndex(action.cardID) + 1)  
        ]
      }
    case 'DELETE_TASK':
      console.log(action)
      return {
        ...state, 
        cards: [
          ...state.cards.slice(0, cardIndex(action.cardID)),
          deleteTaskOnCard(action.taskID, action.cardID),
          ...state.cards.slice(cardIndex(action.cardID) + 1)  
        ]
      }
    case 'TOGGLE_TASK_PROPERTY':
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, cardIndex(action.cardID)),
          cardWithTaskChanges(action.taskID, action.newTask, action.cardID),
          ...state.cards.slice(cardIndex(action.cardID) + 1)  
        ]
      }  
    default:
      return state
  }
}

export default mainReducer