import React, { useState } from 'react'
import { connect } from 'react-redux'

import { ITask } from '../../../store/data/types'
import { deleteTask, toggleTaskProperty } from '../../../store/data/actions'

import { FormControlLabel, Checkbox, IconButton, Grid } from '@material-ui/core/'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import BookmarkIcon from '@material-ui/icons/Bookmark'

const useStyles = makeStyles((theme) => ({
  label: {
    color: 'red'
  },
  board: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    marginBottom: 7,
    marginTop: 7,
    paddingLeft: 7,
    borderRadius: 10, 
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      '&:hover .buttons': {
        opacity: 1,
        transition: 'opacity .2s ease-in'
      }
    }
  },
  list: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    marginBottom: 7,
    marginTop: 7,
    paddingLeft: 7,
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      '&:hover .buttons': {
        opacity: 1,
        transition: 'opacity .2s ease-in'
      }
    }
  },
  buttons: {
    [theme.breakpoints.up('sm')]: {

    }
  },
  checkBoxTitle: {
    wordBreak: 'break-word'
  }
}))

const StyledCheckbox = withStyles({
  label: {
    wordBreak: 'break-word',
  },
})(FormControlLabel);

interface ITaskProps {
  currentUser: string
  currentFolder: string
  elementID: string
  taskData: ITask,
  classBorder: 'board' | 'list'
}

interface ITaskDispatch {
  deleteTask: typeof deleteTask,
  toggleTaskProperty: typeof toggleTaskProperty
}

type ITaskC = ITaskProps & ITaskDispatch

const Task: React.FC<ITaskC> = ({ currentUser, currentFolder, elementID, taskData, classBorder, deleteTask, toggleTaskProperty }) => {
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
      wrap='nowrap' 
      className={classBorder === 'board' ? classes.board : classes.list}
    >
      <Grid item>
        <StyledCheckbox
          control={
            <Checkbox
              checked={taskData.done}
              id={taskData.taskID}
              onChange={() => changeCheckedHandler()}
              color={taskData.important ? 'secondary' : 'primary'}
            />
          }
          classes={{ label: 'checkBoxTitle' }} 
          label={taskData.title}
          className={important ? classes.label : ''}
        />
      </Grid>
      <Grid item className={classes.buttons}>
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
