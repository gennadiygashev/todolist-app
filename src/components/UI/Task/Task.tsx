import React, { useState } from 'react'
import { connect } from 'react-redux'

import { ITask } from '../../../store/data/types'
import { deleteTask, toggleTaskProperty } from '../../../store/data/actions'

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
  currentUser: string
  currentFolder: string
  elementID: string
  taskData: ITask 
}

interface ITaskDispatch {
  deleteTask: typeof deleteTask,
  toggleTaskProperty: typeof toggleTaskProperty
}

type ITaskC = ITaskProps & ITaskDispatch

const Task: React.FC<ITaskC> = ({ currentUser, currentFolder, elementID, taskData, deleteTask, toggleTaskProperty }) => {
  const classes = useStyles()
  const [check, toggleCheck] = useState<boolean>(taskData.done)
  const [important, toggleImportant] = useState<boolean>(taskData.important)

  const changeCheckedHandler = () => {
    toggleTaskProperty(currentUser, taskData, currentFolder, elementID, taskData.taskID, 'done')
    toggleCheck(!check)
  }

  const changeImportantHandler = () => {
    toggleTaskProperty(currentUser, taskData, currentFolder, elementID, taskData.taskID, 'important')
    toggleImportant(!important)
  }

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
              checked={taskData.done}
              id={taskData.taskID}
              onChange={() => changeCheckedHandler()}
              color={taskData.important ? 'secondary' : 'primary'}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label={taskData.title}
          className={important ? classes.label : ''}
        />
      </Grid>
      <Grid item>
        <IconButton 
          color="secondary"
          onClick={() => deleteTask(currentUser, currentFolder, elementID, taskData.taskID)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton 
          color="primary"
          onClick={() => changeImportantHandler()}
        >
          <BookmarkIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = {
  deleteTask: deleteTask,
  toggleTaskProperty: toggleTaskProperty
}

export default connect(null, mapDispatchToProps)(Task)
