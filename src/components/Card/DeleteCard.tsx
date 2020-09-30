import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'

interface IDeleteCardProps {
  deleteCard: (currentFolder: string, cardID: string) => void, 
  cardID: string,
  currentFolder: string
}

const DeleteCard:React.FC<IDeleteCardProps> = ({ deleteCard, cardID, currentFolder }) => {
  return (
    <IconButton onClick={() => deleteCard(currentFolder, cardID)}>
      <ClearIcon />
    </IconButton>
  )
}

export default DeleteCard

 