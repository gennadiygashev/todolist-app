// Чекбокс задач
import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  label: {
    color: 'red',
    fontWeight: 500
  }
})

export default function Task(props) {
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
              checked={props.done}
              id={props.taskID}
              onChange={() => props.onComplete(props.taskID)}
              color={props.important ? 'secondary' : 'primary'}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label={props.name}
          classes={props.important ? {label: classes.label} : ''}
        />
      </Grid>
      <Grid item>
        <IconButton 
          color="secondary"
          onClick={() => props.onDeleted(props.taskID)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton 
          color="primary"
          onClick={() => props.onToggleImportant(props.taskID)}
        >
          <BookmarkIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

