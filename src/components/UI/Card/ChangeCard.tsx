import React, { useState } from 'react'
import { connect } from 'react-redux'

import { IElement } from '../../../store/data/types'
import { changeCard } from '../../../store/data/actions'

import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@material-ui/core/'
import CreateIcon from '@material-ui/icons/Create'

interface IChangeCardProps {
  currentUser: string
  cardData: IElement, 
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
    changeCard(currentUser, currentFolder, cardData.elementID, newTitle)
    setOpen(false)
  }

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <>
      <Box onClick={handleClickOpen} style={{ display: 'flex', width: '100%'}}>
        <CreateIcon style={{ marginRight: 7 }}/> <div>Изменить карточку</div>  
      </Box>
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
