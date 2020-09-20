import React, { useState } from 'react'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom'
import FolderIcon from '@material-ui/icons/Folder';
import { ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core/'
import ChangeFolder from '../ChangeFolder/ChangeFolder'


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
          changeTitle={props.changeTitle}
          folderColor={props.folderColor}
          changeColor={props.changeColor}
        />
      </ListItem>
    </> 
  )
}