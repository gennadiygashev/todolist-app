import React from 'react'
import { Link } from 'react-router-dom'

import { IFolder } from '../../../store/folders/types'

import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'

interface IFoldersList {
  folders: IFolder[]
}

const FoldersList: React.FC<IFoldersList> = ({ folders = [] }) => {
  const folderType = (folder: IFolder): string => {
    switch (folder.typeData) {
      case ('board'): 
        return 'Доска'
      case ('list'): 
        return 'Список'
      default:
        return 'Тип еще не выбран'
    }
  }

  const myFolderIcon = (folder: IFolder) => {
    switch (folder.typeData) {
      case ('board'): 
        return <ViewCarouselIcon color={folder.folderColor} />
      case ('list'): 
        return <FormatListBulletedIcon color={folder.folderColor} />
      default:
        return <FolderIcon color={folder.folderColor} />
    }
  }

  if (folders.length === 0) {
    return (
      <h1>У вас еще нет ни одного списка или доски</h1>
    )
  }

  return (
    <>
      {folders.map((folder: IFolder) => {
        return (
          <ListItem key={folder.folderID}>
            <Link to={`/${folder.typeData}/${folder.folderID}`}>
              <ListItemIcon>
                {myFolderIcon(folder)}
              </ListItemIcon>
            </Link>
            <Link to={`/${folder.typeData}/${folder.folderID}`} style={{ textDecoration: 'none' }}>
              <ListItemText  
                primary={<Typography style={{ color: 'rgba(0, 0, 0, 0.75)' }}>{folder.name}</Typography>}
                secondary={folderType(folder)}
              />
            </Link>        
          </ListItem>   
        )
      })}    
    </>
  )
}

export default FoldersList