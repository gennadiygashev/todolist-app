import React, { useState } from 'react'
import { connect } from 'react-redux'

import { ICard } from '../../../store/data/types'
import { changeCard } from '../../../store/data/actions'

import { IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core/'
import MoreVertIcon from '@material-ui/icons/MoreVert'

interface IChangeCardProps {
  currentUser: string
  cardData: ICard, 
  currentFolder: string, 
}

interface IChangeCardDispatch {
  changeCard: typeof changeCard
}

type IChangeCard = IChangeCardProps & IChangeCardDispatch

const ChangeCard: React.FC<IChangeCard> = ({ currentUser, cardData, currentFolder, changeCard }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [newTitle, setTitle] = useState<string>(cardData.title)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    changeCard(currentUser, currentFolder, cardData.cardID, newTitle)
    setOpen(false)
  }

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Редактирование карточки</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Заголовок"
            fullWidth
            defaultValue={cardData.title}
            value={newTitle}
            onChange={changeTitleHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} variant="contained" color="primary">
            Готово
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapDispatchToProps = {
  changeCard: changeCard
}

export default connect(null, mapDispatchToProps)(ChangeCard)
