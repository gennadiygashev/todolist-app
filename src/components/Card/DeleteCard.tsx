import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

interface IDeleteCard {
  deleteCard: (currentFolder: string, cardID: string) => void, 
  cardID: string,
  currentFolder: string
}

const DeleteCard:React.FC<IDeleteCard> = ({ deleteCard, cardID, currentFolder }) => {
  return (
    <IconButton onClick={() => deleteCard(currentFolder, cardID)}>
      <ClearIcon />
    </IconButton>
  )
}

export default DeleteCard

 