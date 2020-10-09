import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { addCard, addList } from '../../../../../store/data/actions'
import { changeFolder } from '../../../../../store/folders/actions'

import { Button, Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
  }
})

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
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <h1>В данный момент ваша папка пуста</h1>
        </Grid>
        <Grid item>
          <Button onClick={addCardToBoard}>Создать новую карточку</Button>
          <Button onClick={addCardToList}>Создать новый список</Button>
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