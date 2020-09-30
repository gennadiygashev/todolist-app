import { ICard, IMainInitialState, ITask } from './../../interfaces'

const initialState: IMainInitialState = {
  cards: [],
  loading: true,
  error: null
}

const mainReducer = (state = initialState, action: any) => {
  
  const cardIndex = (cardID: string): number => {
    return (
      state.cards.findIndex((el: ICard) => el.cardID === cardID)
    )
  }  

  const cardWithTaskChanges = (taskID: string, newTaskArr: ITask, cardID: any) => {
    const newTask: any = {}
    newTask[taskID] = newTaskArr
    const oldCard: ICard = state.cards[cardIndex(cardID)]
    const newCard: ICard = {...oldCard,
      'tasks': Object.assign(oldCard.tasks, newTask)
    }
    return newCard
  }

  const deleteTaskOnCard = (taskID: string, cardID: string) => {
    const oldCard: ICard = state.cards[cardIndex(cardID)]
    const taskIndex = Object.values(oldCard.tasks).findIndex((el: ITask) => el.taskID === taskID)
    const newCard: ICard = {...oldCard,
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
      const oldCard: ICard = state.cards[cardIndex(action.cardID)]
      const newCard: ICard = {...oldCard,
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