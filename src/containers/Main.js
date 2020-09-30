import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import Card from '../components/Card/Card'
import AddCard from '../components/Card/AddCard'
import EmptyCardsList from '../components/Card/EmptyCardsList';

import { addNewCard, fetchCardList, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask } from '../store/actions'

import Box from '@material-ui/core/Box';
import LoadCards from '../components/Card/LoadCards';

function Main({ currentFolder, cards, addNewCard, fetchCardList, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask, loading }) {
  useEffect(() => {
    fetchCardList(currentFolder)
  }, [])
  
  const CardList = () => {
    if (loading === true) {
      return (
        <Box p={1} minWidth='100%' maxWidth='100%' minHeight='85vh' borderColor="paper">
          <LoadCards/>
        </Box>
      )
    }
    if (cards === false || cards === undefined || cards.length === 0 ) {
      return (
        <Box p={1} minWidth='100%' maxWidth='100%' minHeight='85vh' borderColor="paper">
          <EmptyCardsList
            addNewCard={addNewCard} 
            currentFolder={currentFolder}             
          />
        </Box>
      )
    }
    return (
      <>
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
      </>
    )

  }


  return (
    <Box display="flex" flexDirection="row" flexWrap="nowrap" overflow='scroll'>
      <CardList/>
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
  cards: state.main.cards,
  loading: state.main.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

