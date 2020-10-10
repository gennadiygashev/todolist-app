import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import FoldersMain from './FoldersMain' 

import { IAppState } from '../../../store'
import { fetchFolders } from '../../../store/folders/actions'

import clsx from 'clsx'
import { CssBaseline, Toolbar, AppBar } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    fontSize: 20
  },
}))

interface IFoldersRouterProps {
  currentUser: string 
  fetchFolders: typeof fetchFolders
}

interface IFoldersDispatch {
  fetchFolders: typeof fetchFolders
}

type IFolders = IFoldersRouterProps & IFoldersDispatch

const Folders: React.FC<IFolders> = ({ currentUser, fetchFolders }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchFolders(currentUser)
  }, []) 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <h1 className={classes.title}>Список Ваших проектов</h1>
        </Toolbar>
      </AppBar>
      <main className={classes.content} style={{ padding: '0' }} >
        <div className={classes.toolbar} />
        <FoldersMain 
          currentUser={currentUser}
        />
      </main>
    </div>

  )
}

const mapDispatchToProps = {
  fetchFolders: fetchFolders,
}

const mapStateToProps = ({ folders }: IAppState) => ({
  folders: folders.folders,
})

export default connect(mapStateToProps, mapDispatchToProps)(Folders)



