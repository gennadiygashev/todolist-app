import React from 'react'

import Card from './Card'
import AddCard from './AddCard'
import EmptyCardsList from './EmptyCardsList';
import LoadCards from './LoadCards';

import Box from '@material-ui/core/Box';

interface ICardList {
  loading: boolean,
  cards: Array<Object>, 
  currentFolder: string, 
  addNewCard: (currentFolder: any) => void,
  deleteCard: (currentFolder: any, cardID: any) => void,
  changeCardTitle: (currentFolder: any, cardID: any, value: any) => void,
  addNewTask: (currentFolder: any, cardID: any, title: any) => void,
  deleteTask: (currentFolder: any, cardID: any, taskID: any) => void,
  changeCardsTask: (taskData: any, currentFolder: any, cardID: any, taskID: any, typeAction: any) => void,
}

const CardList: React.FC<ICardList> = ({ loading, cards, currentFolder, addNewCard, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask }) => {
  if (loading === true) {
    return (
      <Box p={1} minWidth='100%' maxWidth='100%' minHeight='85vh' borderColor="paper">
        <LoadCards/>
      </Box>
    )
  }
  if (cards === undefined || cards.length === 0 ) {
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
      {cards.map((card: any) => {
        return(
          <Box p={1} minWidth='25%' maxWidth='25%' minHeight='85vh' borderRight={1} borderColor="paper">
            <Card 
              key={card.cardID} 
              cardID={card.cardID}
              currentFolder={currentFolder}
              title={card.title}
              deleteCard={deleteCard}
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

export default CardList