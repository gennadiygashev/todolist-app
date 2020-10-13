import React from 'react'
import { connect } from 'react-redux'

import { deleteCard } from '../../../store/data/actions'

import ClearIcon from '@material-ui/icons/Clear'
import { Box } from '@material-ui/core'

interface IDeleteCardProps {
  elementID: string
  currentFolder: string
  currentUser: string
  cardLength: number
}

interface IDeleteCardDispatch {
  deleteCard: typeof deleteCard
}

type IDeleteCard = IDeleteCardProps & IDeleteCardDispatch

const DeleteCard:React.FC<IDeleteCard> = ({ currentUser, elementID, currentFolder, cardLength, deleteCard }) => {
  return (
    <Box onClick={() => deleteCard(currentUser, currentFolder, elementID, cardLength)} style={{ display: 'flex', width: '100%'}}>
      <ClearIcon style={{ marginRight: 7 }}/> <div>Удалить карточку</div>  
    </Box>
  ) 
}

const mapDispatchToProps = {
  deleteCard: deleteCard
}

export default connect(null, mapDispatchToProps)(DeleteCard)

 