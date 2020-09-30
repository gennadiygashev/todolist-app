import React from 'react'

import Card from './Card'
import AddCard from './AddCard'
import EmptyCardsList from './EmptyCardsList'
import LoadCards from './LoadCards'

import Box from '@material-ui/core/Box'
import { ICard, ITask } from '../../interfaces'

interface ICardListProps {
  loading: boolean,
  cards: ICard[], 
  currentFolder: string, 
  addNewCard: (currentFolder: string) => void,
  deleteCard: (currentFolder: string, cardID: string) => void,
  changeCardTitle: (currentFolder: string, cardID: string, value: string) => void,
  addNewTask: (currentFolder: string, cardID: string, title: string) => void,
  deleteTask: (currentFolder: string, cardID: string, taskID: string) => void,
  changeCardsTask: (taskData: ITask, currentFolder: string, cardID: string, taskID: string, typeAction: string) => void,
}

const CardList: React.FC<ICardListProps> = ({ loading, cards, currentFolder, addNewCard, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask }) => {
  if (loading === true) {
    return (
      <Box p={1} minWidth='100%' maxWidth='100%' minHeight='85vh' borderColor="paper">
        <LoadCards/>
      </Box>
    )
  }
  if (cards.length === 0) {
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
      {cards.map((card: ICard) => {
        return(
          <Box p={1} minWidth='25%' maxWidth='25%' minHeight='85vh' borderRight={1} borderColor="paper" key={card.key}>
            <Card 
              cardData={card}
              currentFolder={currentFolder}
              deleteCard={deleteCard}
              changeCardTitle={changeCardTitle}
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