import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import DeleteCard from '../../../../UI/Card/DeleteCard'
import ChangeCard from '../../../../UI/Card/ChangeCard'
import Task from '../../../../UI/Task/Task'
import AddForm from '../../../../UI/AddForm'

import { IElement, ITask } from '../../../../../store/data/types'
import { addTask } from '../../../../../store/data/actions'

import { CardHeader, CardContent, Box, Menu, MenuItem, IconButton, makeStyles } from '@material-ui/core/'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'

const useStyles = makeStyles(() => ({
  menuItem: {
    color: 'rgba(0, 0, 0, .7)', 
    paddingTop: 10,
    paddingBottom: 10,
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(0, 0, 0, .2)',
    }
  }
}))

interface ICardCProps {
  currentUser: string
  cardData: IElement
  currentFolder: string, 
}

interface ICardCDispatch {
  addTask: typeof addTask
}

type ICardC = ICardCProps & ICardCDispatch

const Card: React.FC<ICardC> = ({ currentUser, cardData, currentFolder, addTask }) => {
  const defaultTaskList = () => (
    cardData.tasks.filter(task => task.done !== true)  
  ) 

  const classes = useStyles()
  const [tasks, setTasks] = useState(defaultTaskList())
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (showCompletedTasks) {
      setTasks(cardData.tasks)
    } else {
      defaultTaskList()
      setTasks(defaultTaskList())
    }
  }, [cardData, showCompletedTasks])

  const filterTaskButton = () => {
    if (showCompletedTasks) {
      return (
        <>
        <RemoveCircleOutlineIcon style={{ marginRight: 7 }}/> 
        <div>Скрыть выполненные</div>
      </>
      )
    } else {
      return (
        <>
          <CheckCircleOutlineIcon style={{ marginRight: 7 }}/> 
          <div>Показать выполненные</div>
        </>     
      )
    }
  }

  const showTasksHandler = () => {
    setShowCompletedTasks(!showCompletedTasks)
    handleClose()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={{ minHeight: '90vh', height: '100%' }}>
      <CardHeader
        title={cardData.title}
        action={
          <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClose} className={ classes.menuItem } >
                <ChangeCard 
                  currentFolder={currentFolder}
                  currentUser={currentUser}            
                  cardData={cardData}
                />
              </MenuItem>
              <MenuItem onClick={handleClose} className={ classes.menuItem } >
                <DeleteCard              
                  currentFolder={currentFolder}
                  currentUser={currentUser}
                  elementID={cardData.elementID}
                />
              </MenuItem>
              <MenuItem onClick={showTasksHandler} className={ classes.menuItem } >
                <Box style={{ display: 'flex', width: '100%'}}>
                  { filterTaskButton }
                </Box>
              </MenuItem>
            </Menu>
          </div>
        }
        style={{ display: 'flex', alignItems: 'baseline' }}
      />
      <CardContent> 
        {
          tasks.length === 0 ?
          <h2>В вашей карточке пока пусто</h2> :
          tasks.map((task: ITask) => { 
            return (
              <Task 
                currentUser={currentUser}
                currentFolder={currentFolder}
                key={task.taskID}
                elementID={cardData.elementID}
                taskData={task}
                classBorder='board'
              />
            )
          })
        }
        <AddForm
          path={{
            currentUser,
            currentFolder,
            elementID: cardData.elementID
          }}
          addFunc={addTask}
        />
      </CardContent>
    </Box> 
  )
}

const mapDispatchToProps = {
  addTask: addTask
}

export default connect(null, mapDispatchToProps)(Card)



