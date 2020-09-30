import React from 'react'

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';


export default function EmptyFolderList() {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <FolderOpenIcon />
        </ListItemIcon>
        <ListItemText primary={'Создайте папку'} />
      </ListItem>
    </>  
  )
}