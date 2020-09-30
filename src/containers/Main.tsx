import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import CardList from '../components/Card/CardList'

import { addNewCard, fetchCardList, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask } from '../store/actions'

import Box from '@material-ui/core/Box'
import { ICard, ITask } from '../interfaces'

interface IMain {
  currentFolder: string, 
  cards: ICard[], 
  loading: boolean,
  fetchCardList: (currentFolder: string) => void,
  addNewCard: (currentFolder: string) => void,
  deleteCard: (currentFolder: string, cardID: string) => void,
  changeCardTitle: (currentFolder: string, cardID: string, value: string) => void,
  addNewTask: (currentFolder: string, cardID: string, title: string) => void,
  deleteTask: (currentFolder: string, cardID: string, taskID: string) => void,
  changeCardsTask: (taskData: ITask, currentFolder: string, cardID: string, taskID: string, typeAction: string) => void,
}

const Main: React.FC<IMain> = ({ currentFolder, cards, addNewCard, fetchCardList, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask, loading }) => {
  useEffect(() => {
    fetchCardList(currentFolder)
  }, [])
  
  return (
    <Box display="flex" flexDirection="row" flexWrap="nowrap" overflow='scroll'>
      <CardList 
        loading={loading}
        cards={cards}
        currentFolder={currentFolder}
        addNewCard={addNewCard}
        deleteCard={deleteCard}
        changeCardTitle={changeCardTitle}
        addNewTask={addNewTask}
        changeCardsTask={changeCardsTask}
        deleteTask={deleteTask}
      />
    </Box>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchCardList: (currentFolder: string) => dispatch(fetchCardList(currentFolder)),
  addNewCard: (currentFolder: string) => dispatch(addNewCard(currentFolder)),
  deleteCard: (currentFolder: string, cardID: string) => dispatch(deleteCard(currentFolder, cardID)),
  changeCardTitle: (currentFolder: string, cardID: string, value: string) => dispatch(changeCardTitle(currentFolder, cardID, value)),
  addNewTask: (currentFolder: string, cardID: string, title: string) => dispatch(addNewTask(currentFolder, cardID, title)),
  deleteTask: (currentFolder: string, cardID: string, taskID: string) => dispatch(deleteTask(currentFolder, cardID, taskID)),
  changeCardsTask: (taskData: ITask, currentFolder: string, cardID: string, taskID: string, typeAction: string) => dispatch(changeCardsTask(taskData, currentFolder, cardID, taskID, typeAction)),
})

const mapStateToProps = (state: any) => ({
  cards: state.main.cards,
  loading: state.main.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

