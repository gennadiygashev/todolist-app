import React from 'react'
import { connect } from 'react-redux';

import FoldersList from './FoldersList'

import { IFolder } from '../../../store/folders/types';
import { IAppState } from '../../../store';

import { CircularProgress, Grid, List, Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddForm from '../../UI/AddForm';
import { addFolder } from '../../../store/folders/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      paddingLeft: '20px',
      paddingBottom: '20px'
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
)

interface IFoldersMainProps {
  currentUser: string
}

interface IFoldersMainState {
  loading: boolean,
  folders: IFolder[]
}

interface IFoldersMainDispatch {
  addFolder: typeof addFolder
}

type IFoldersMain = IFoldersMainProps & IFoldersMainState & IFoldersMainDispatch

const FoldersMain: React.FC<IFoldersMain> = ({ currentUser, loading, folders, addFolder }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Выберите проект
          </Typography>
          <div className={classes.demo}>
            <List>
              {
                loading ?
                <CircularProgress /> :
                <FoldersList folders={folders} />
              }
              <AddForm path={{currentUser}} addFunc={addFolder} />
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const mapDispatchToProps = {
  addFolder: addFolder
}

const mapStateToProps = ({ folders }: IAppState) => ({
  loading: folders.loading,
  folders: folders.folders,
})

export default connect(mapStateToProps, mapDispatchToProps)(FoldersMain)