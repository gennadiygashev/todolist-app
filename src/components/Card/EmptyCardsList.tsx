import React from 'react'

import { Button, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
  }
})

interface IEmptyCardsList {
  addNewCard: (currentFolder: string) => void, 
  currentFolder: string
}

const EmptyCardsList:React.FC<IEmptyCardsList> = ({ addNewCard, currentFolder }) => {
  const classes = useStyles();
  return(
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <h1>Poka cartochek net</h1>
        </Grid>
        <Grid item>
          <Button onClick={() => addNewCard(currentFolder)}>Sozdat novuyu</Button>
        </Grid>
      </Grid>
  )
}

export default EmptyCardsList



