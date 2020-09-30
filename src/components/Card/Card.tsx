import React from 'react'

import TaskList from '../Task/TaskList'
import AddTask from '../Task/AddTask'
import DeleteCard from './DeleteCard';
import ChangeCard from './ChangeCard'

import { CardHeader, CardContent, Box } from '@material-ui/core/';

interface ICardSection {
  cardID: string, 
  currentFolder: string, 
  title: string, 
  tasks: Array<Object>, 
  deleteCard: (currentFolder: any, cardID: any) => void,
  changeCardTitle: (currentFolder: any, cardID: any, value: any) => void,
  addNewTask: (currentFolder: any, cardID: any, title: any) => void,
  deleteTask: (currentFolder: any, cardID: any, taskID: any) => void,
  changeCardsTask: (taskData: any, currentFolder: any, cardID: any, taskID: any, typeAction: any) => void,
}

const CardSection: React.FC<ICardSection> = ({ cardID, currentFolder, title, tasks, deleteCard, changeCardTitle, addNewTask, changeCardsTask, deleteTask }) => {
  return (
    <Box style={{ minHeight: '90vh', height: '100%' }}>
      <CardHeader
        title={title}
        action={
          <>
            <ChangeCard 
              changeCardTitle={changeCardTitle}
              cardID={cardID}
              title={title}
              currentFolder={currentFolder}
            />
            <DeleteCard 
              deleteCard={deleteCard}
              currentFolder={currentFolder}
              cardID={cardID}
            />
          </>
        }
        style={{ display: 'flex', alignItems: 'baseline' }}
      />
      <CardContent>
        <TaskList 
          tasks={tasks} 
          currentFolder={currentFolder}
          cardID={cardID}
          changeCardsTask={changeCardsTask}
          deleteTask={deleteTask}
        />
        <AddTask 
          addNewTask={addNewTask}
          currentFolder={currentFolder}
          cardID={cardID}
        />
      </CardContent>
    </Box> 
  )
}

export default CardSection



