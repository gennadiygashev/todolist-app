import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { addCard, addList } from '../../../../../store/data/actions'
import { changeFolder } from '../../../../../store/folders/actions'

import { Button, Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    }
  },
  button: {
    marginBottom: 10, 
    marginRight: 10
  }
}))

interface IEmptyMainProps {
  currentUser: string
  currentFolder: string
}

interface IEmptyMainDispatch {
  addCard: typeof addCard
  addList: typeof addList
  changeFolder: typeof changeFolder
}

type IEmptyMain = IEmptyMainProps & IEmptyMainDispatch

const EmptyMain:React.FC<IEmptyMain> = ({ currentUser, currentFolder, addCard, addList, changeFolder }) => {
  const classes = useStyles()
  const [currentType, setCurrentType] = useState('notChosen')

  const addCardToBoard = () => {
    addCard(currentUser, currentFolder)
    changeFolder(currentUser, 'board', currentFolder, 'typeData')
    setCurrentType('board')
  }

  const addCardToList = () => {
    addList(currentUser, currentFolder)
    changeFolder(currentUser, 'list', currentFolder, 'typeData')
    setCurrentType('list')
  }

  if (currentType === 'board') {
    return <Redirect to={`/board/${currentFolder}`} />
  }

  if (currentType === 'list') {
    return <Redirect to={`/list/${currentFolder}`} />
  }

  return(
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid item>
          <h1>В данный момент ваш проект пуст</h1>
        </Grid>
        <Grid item className={classes.buttons}>
          <Button variant='outlined' onClick={addCardToBoard} className={classes.button}>Создать карточку</Button>
          <Button variant='outlined' onClick={addCardToList} className={classes.button}>Создать список</Button> 
        </Grid>
      </Grid>
  )
}

const mapDispatchToProps = {
  addCard: addCard,
  addList: addList,
  changeFolder: changeFolder
}

export default connect(null, mapDispatchToProps)(EmptyMain)