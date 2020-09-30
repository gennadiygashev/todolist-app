import React from 'react'

import { ITask } from '../../interfaces'

import { FormControlLabel, Checkbox, IconButton, Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import BookmarkIcon from '@material-ui/icons/Bookmark'

const useStyles = makeStyles({
  label: {
    color: 'red'
  }
})

interface ITaskProps {
  title: string, 
  currentFolder: string, 
  cardID: string, 
  taskID: string, 
  done: boolean, 
  important: boolean, 
  changeCardsTask: (taskData: ITask, currentFolder: string, cardID: string, taskID: string, typeAction: string) => void, 
  taskData: ITask, 
  deleteTask: (currentFolder: string, cardID: string, taskID: string) => void
}

const Task: React.FC<ITaskProps> = ({ title, currentFolder, cardID, taskID, done, important, changeCardsTask, taskData, deleteTask }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={done}
              id={taskID}
              onChange={() => changeCardsTask(taskData, currentFolder, cardID, taskID, 'done')}
              color={important ? 'secondary' : 'primary'}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label={title}
          className={important ? classes.label : ''}
        />
      </Grid>
      <Grid item>
        <IconButton 
          color="secondary"
          onClick={() => deleteTask(currentFolder, cardID, taskID)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton 
          color="primary"
          onClick={() => changeCardsTask(taskData, currentFolder, cardID, taskID, 'important')}
        >
          <BookmarkIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Task