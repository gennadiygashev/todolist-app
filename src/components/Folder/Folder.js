import React from 'react'
import { Link } from 'react-router-dom'
import FolderIcon from '@material-ui/icons/Folder';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import ChangeFolder from './ChangeFolder'


export default function Folder(props) {
  return(
    <>
      <ListItem button key={props.folderID} >
        <Link to={`/${props.folderID}`}>
          <ListItemIcon>
            <FolderIcon color={props.folderColor} />
          </ListItemIcon>
        </Link>
        <Link to={`/${props.folderID}`}>
          <ListItemText primary={props.name} />
        </Link>
        <ChangeFolder 
          deleteFolder={props.deleteFolder} 
          folderID={props.folderID} 
          name={props.name} 
          changeFolder={props.changeFolder}
          folderColor={props.folderColor}
        />
      </ListItem>
    </> 
  )
}