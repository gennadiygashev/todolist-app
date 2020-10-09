import React from 'react'
import { connect } from 'react-redux'

import { deleteCard } from '../../../store/data/actions'

import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'

interface IDeleteCardProps {
  cardID: string,
  currentFolder: string
  currentUser: string
}

interface IDeleteCardDispatch {
  deleteCard: typeof deleteCard
}

type IDeleteCard = IDeleteCardProps & IDeleteCardDispatch

const DeleteCard:React.FC<IDeleteCard> = ({ currentUser, cardID, currentFolder, deleteCard }) => {
  return (
    <IconButton onClick={() => deleteCard(currentUser, currentFolder, cardID)}>
      <ClearIcon />
    </IconButton>
  )
}

const mapDispatchToProps = {
  deleteCard: deleteCard
}

export default connect(null, mapDispatchToProps)(DeleteCard)

 