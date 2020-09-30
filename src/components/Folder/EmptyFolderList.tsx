import React from 'react'

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'


const EmptyFolderList: React.FC = () => {
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

export default EmptyFolderList