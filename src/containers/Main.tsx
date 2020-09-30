import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import CardList from '../components/Card/CardList'

import { addNewCard, fetchCardList, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask } from '../store/actions'

import Box from '@material-ui/core/Box';

interface IMain {
  currentFolder: any, 
  cards: any, 
  loading: any,
  fetchCardList: (currentFolder: any) => void,
  addNewCard: (currentFolder: any) => void,
  deleteCard: (currentFolder: any, cardID: any) => void,
  changeCardTitle: (currentFolder: any, cardID: any, value: any) => void,
  addNewTask: (currentFolder: any, cardID: any, title: any) => void,
  deleteTask: (currentFolder: any, cardID: any, taskID: any) => void,
  changeCardsTask: (taskData: any, currentFolder: any, cardID: any, taskID: any, typeAction: any) => void,
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
  fetchCardList: (currentFolder: any) => dispatch(fetchCardList(currentFolder)),
  addNewCard: (currentFolder: any) => dispatch(addNewCard(currentFolder)),
  deleteCard: (currentFolder: any, cardID: any) => dispatch(deleteCard(currentFolder, cardID)),
  changeCardTitle: (currentFolder: any, cardID: any, value: any) => dispatch(changeCardTitle(currentFolder, cardID, value)),
  addNewTask: (currentFolder: any, cardID: any, title: any) => dispatch(addNewTask(currentFolder, cardID, title)),
  deleteTask: (currentFolder: any, cardID: any, taskID: any) => dispatch(deleteTask(currentFolder, cardID, taskID)),
  changeCardsTask: (taskData: any, currentFolder: any, cardID: any, taskID: any, typeAction: any) => dispatch(changeCardsTask(taskData, currentFolder, cardID, taskID, typeAction)),
})

const mapStateToProps = (state: any) => ({
  cards: state.main.cards,
  loading: state.main.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

