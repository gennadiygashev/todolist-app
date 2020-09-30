import React from 'react'

import TaskList from '../Task/TaskList'
import AddTask from '../Task/AddTask'
import DeleteCard from './DeleteCard'
import ChangeCard from './ChangeCard'

import { ICard, ITask } from '../../interfaces'

import { CardHeader, CardContent, Box } from '@material-ui/core/'

interface ICardSectionProps {
  cardData: ICard
  currentFolder: string, 
  deleteCard: (currentFolder: string, cardID: string) => void,
  changeCardTitle: (currentFolder: string, cardID: string, value: string) => void,
  addNewTask: (currentFolder: string, cardID: string, title: string) => void,
  deleteTask: (currentFolder: string, cardID: string, taskID: string) => void,
  changeCardsTask: (taskData: ITask, currentFolder: string, cardID: string, taskID: string, typeAction: string) => void,
}

const CardSection: React.FC<ICardSectionProps> = ({ cardData, currentFolder, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask }) => {
  return (
    <Box style={{ minHeight: '90vh', height: '100%' }}>
      <CardHeader
        title={cardData.title}
        action={
          <>
            <ChangeCard 
              changeCardTitle={changeCardTitle}
              cardID={cardData.cardID}
              title={cardData.title}
              currentFolder={currentFolder}
            />
            <DeleteCard 
              deleteCard={deleteCard}
              currentFolder={currentFolder}
              cardID={cardData.cardID}
            />
          </>
        }
        style={{ display: 'flex', alignItems: 'baseline' }}
      />
      <CardContent>
        <TaskList 
          tasks={cardData.tasks} 
          currentFolder={currentFolder}
          cardID={cardData.cardID}
          changeCardsTask={changeCardsTask}
          deleteTask={deleteTask}
        />
        <AddTask 
          addNewTask={addNewTask}
          currentFolder={currentFolder}
          cardID={cardData.cardID}
        />
      </CardContent>
    </Box> 
  )
}

export default CardSection



