import React from 'react'

import Board from './Board/Board'
import List from './List/List'
import EmptyMain from './Empty/EmptyMain'

interface IMain {
  currentUser: string
  currentFolder: string
  currentType: string
}

const Main: React.FC<IMain> = ({ currentUser, currentFolder, currentType }) => {
  if (currentType === 'board') {
    return (
      <Board 
        currentUser={currentUser}
        currentFolder={currentFolder}
      />
    )
  }
  if (currentType === 'list') {
    return (
      <List 
        currentUser={currentUser}
        currentFolder={currentFolder}
      />
    )
  }
  return (
    <EmptyMain 
      currentUser={currentUser}
      currentFolder={currentFolder} 
    />
  )
}

export default Main

