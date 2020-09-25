import React from 'react'
import { Link } from 'react-router-dom'
import FolderIcon from '@material-ui/icons/Folder';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import ChangeFolder from './ChangeFolder'


export default function Folder({ folderID, folderColor, name, deleteFolder, changeFolder }) {
  return(
    <>
      <ListItem button key={folderID} >
        <Link to={`/${folderID}`}>
          <ListItemIcon>
            <FolderIcon color={folderColor} />
          </ListItemIcon>
        </Link>
        <Link to={`/${folderID}`}>
          <ListItemText primary={name} />
        </Link>
        <ChangeFolder 
          deleteFolder={deleteFolder} 
          folderID={folderID} 
          name={name} 
          changeFolder={changeFolder}
          folderColor={folderColor}
        />
      </ListItem>
    </> 
  )
}