import React from 'react'
import { connect } from 'react-redux'

import { addCard } from '../../../store/data/actions'

import { Box, Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'

const useStyles = makeStyles({
  root: {
    height: '100%',
    cursor: 'pointer'
  },
  block: {
    height: '100%',
  }
})

interface IAddCardProps {
  currentUser: string
  currentFolder: string
}

interface IAddCardDispatch {
  addCard: typeof addCard
}

type IAddCard = IAddCardProps & IAddCardDispatch

const AddCard: React.FC<IAddCard> = ({ currentUser, currentFolder, addCard }) => {
  const classes = useStyles()
  return (
    <Box onClick={() => addCard(currentUser, currentFolder)} className={classes.root}> 
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.block}
      >
        <Grid item>
          <AddBoxIcon  />
        </Grid>
      </Grid>
    </Box> 
  )
}

const mapDispatchToProps = {
  addCard: addCard
}

export default connect(null, mapDispatchToProps)(AddCard)
