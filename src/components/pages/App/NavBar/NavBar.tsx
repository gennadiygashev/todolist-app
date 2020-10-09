import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AddFolder from '../../../UI/Folder/AddFolder'
import Folder from '../../../UI/Folder/Folder'

import { IAppState } from '../../../../store'
import { IFolder } from '../../../../store/folders/types'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { IconButton, CssBaseline, List, Toolbar, AppBar, Drawer, Divider, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import { fetchFoldersFailure } from '../../../../store/folders/actions'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
}))

interface INavBarProps {
  currentUser: string
}

interface INavBarState {
  folders: IFolder[]
}

type INavBar = INavBarProps & INavBarState 

const NavBar: React.FC<INavBar> = ({ folders, currentUser }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  if (folders.length === 0) {
    return (
      <Redirect to={'/folders'} />
    )
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link to={'/logout'} style={{ color: 'white', textDecoration: 'none' }}><Button color="inherit">Выйти</Button></Link>        
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          {
            folders.map((folder: IFolder) => (
              <Folder
                currentUser={currentUser}
                folderData={folder}
                key={folder.key}
              />
            ))          
          }
          <Divider />
          <ListItem>
            <ListItemIcon style={{transform: 'translateY(7px)'}}><CreateNewFolderIcon /></ListItemIcon>
            <ListItemText primary={
              <AddFolder 
                currentUser={currentUser}
              />       
            }/>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

const mapStateToProps = ({ folders }: IAppState) => ({
  folders: folders.folders,
})

export default connect(mapStateToProps)(NavBar)