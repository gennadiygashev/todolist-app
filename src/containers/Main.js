import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import Card from '../components/Card/Card'
import AddCard from '../components/Card/AddCard'

import { addNewCard, fetchCardList, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask } from '../store/actions'

import Box from '@material-ui/core/Box';

function Main({ currentFolder, cards, addNewCard, fetchCardList, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask }) {
  useEffect(() => {
    fetchCardList(currentFolder)
  }, [])

  return (
    <Box display="flex" flexDirection="row" flexWrap="nowrap" overflow='scroll'>
      {cards.map((card) => {
        return(
          <Box p={1} minWidth='25%' maxWidth='25%' minHeight='85vh' borderRight={1} borderColor="paper">
            <Card 
              key={card.cardID} 
              cardID={card.cardID}
              currentFolder={currentFolder}
              title={card.title}
              onDeleteCard={deleteCard}
              changeCardTitle={changeCardTitle}
              tasks={card.tasks}
              addNewTask={addNewTask}
              changeCardsTask={changeCardsTask} 
              deleteTask={deleteTask}
            />
          </Box>
        )
      })}
      <Box minWidth='25%' maxWidth='25%' minHeight='85vh'>
        <AddCard 
          addNewCard={addNewCard} 
          currentFolder={currentFolder}
        />
      </Box>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCardList: (currentFolder) => dispatch(fetchCardList(currentFolder)),
  addNewCard: (currentFolder) => dispatch(addNewCard(currentFolder)),
  deleteCard: (currentFolder, cardID) => dispatch(deleteCard(currentFolder, cardID)),
  changeCardTitle: (currentFolder, cardID, value) => dispatch(changeCardTitle(currentFolder, cardID, value)),
  addNewTask: (currentFolder, cardID, title) => dispatch(addNewTask(currentFolder, cardID, title)),
  deleteTask: (currentFolder, cardID, taskID) => dispatch(deleteTask(currentFolder, cardID, taskID)),
  changeCardsTask: (taskData, currentFolder, cardID, taskID, typeAction) => dispatch(changeCardsTask(taskData, currentFolder, cardID, taskID, typeAction)),
})

const mapStateToProps = (state) => ({
  cards: state.main.cards
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

