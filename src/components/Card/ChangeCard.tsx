import React, { useState } from 'react'

import { IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core/'
import MoreVertIcon from '@material-ui/icons/MoreVert'

interface IChangeCardProps {
  title: string, 
  currentFolder: string, 
  cardID: string,
  changeCardTitle: (currentFolder: string, cardID: string, value: string) => void
}

const ChangeCard: React.FC<IChangeCardProps> = ({ title, changeCardTitle, currentFolder, cardID }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [newTitle, setTitle] = useState<string>(title)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    changeCardTitle(currentFolder, cardID, newTitle)
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
            defaultValue={title}
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

export default ChangeCard
