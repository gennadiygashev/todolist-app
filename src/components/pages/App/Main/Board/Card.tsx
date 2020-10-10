import React from 'react'

import AddTask from '../../../../UI/Task/AddTask'
import DeleteCard from '../../../../UI/Card/DeleteCard'
import ChangeCard from '../../../../UI/Card/ChangeCard'
import Task from '../../../../UI/Task/Task'

import { IElement, ITask } from '../../../../../store/data/types'

import { CardHeader, CardContent, Box } from '@material-ui/core/'

interface ICardC {
  currentUser: string
  cardData: IElement
  currentFolder: string, 
}

const Card: React.FC<ICardC> = ({ currentUser, cardData, currentFolder }) => {
  return (
    <Box style={{ minHeight: '90vh', height: '100%' }}>
      <CardHeader
        title={cardData.title}
        action={
          <>
            <ChangeCard 
              currentFolder={currentFolder}
              currentUser={currentUser}            
              cardData={cardData}
            />
            <DeleteCard              
              currentFolder={currentFolder}
              currentUser={currentUser}
              elementID={cardData.elementID}
            />
          </>
        }
        style={{ display: 'flex', alignItems: 'baseline' }}
      />
      <CardContent> 
        {
          cardData.tasks === undefined || Object.values(cardData.tasks).length === 0 ?
          <h2>В вашей карточке пока пусто</h2> :
          Object.values(cardData.tasks).map((task: ITask) => {
            return (
              <Task 
                currentUser={currentUser}
                currentFolder={currentFolder}
                key={task.taskID}
                elementID={cardData.elementID}
                taskData={task}
              />
            )
          })
        }
        <AddTask 
          currentUser={currentUser}
          currentFolder={currentFolder}
          elementID={cardData.elementID}
        />
      </CardContent>
    </Box> 
  )
}

export default Card



