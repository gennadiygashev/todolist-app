import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AddCard from '../../../../UI/Card/AddCard'
import LoadCards from '../../../../UI/LoadCardsList'
import Card from './Card'
import EmptyMain from '../Empty/EmptyMain'

import { IAppState } from '../../../../../store'
import { IElement } from '../../../../../store/data/types'

import { compose, spacing, breakpoints, sizing, borders } from '@material-ui/system'
import styled from 'styled-components'

const styleFunction = breakpoints(compose(spacing, sizing, borders));
const Box = styled.div`
  ${styleFunction}
`;

interface IBoardProps { 
  currentUser: string
  currentFolder: string
}

interface IBoardState {
  loading: boolean
  cards: IElement[]
}

type IBoard = IBoardProps & IBoardState 

const Board: React.FC<IBoard> = ({ currentUser, loading, cards, currentFolder }) => {
  
  if (loading === true) {
    return (
      <Box p={1} minWidth='100%' maxWidth='100%' minHeight='85vh' borderColor="paper">
        <LoadCards/>
      </Box>
    )
  } 

  if (cards.length === 0) {
    return (
      <Box p={1} minWidth='100%' maxWidth='100%' minHeight='85vh' borderColor="paper">
        <EmptyMain
          currentUser={currentUser}
          currentFolder={currentFolder} 
        />
      </Box>
    )
  }

  return (
    <>
      {
        cards.map((card: IElement) => {
          return(
            <Box 
              p={1} 
              xs={{ minWidth: '100vw', maxWidth: '100vw', minHeight: '85vh' }}
              sm={{ minWidth: '46vw', maxWidth: '46vw', minHeight: '85vh' }}
              md={{ minWidth: '31vw', maxWidth: '31vw', minHeight: '85vh' }} 
              lg={{ minWidth: '24vw', maxWidth: '24vw', minHeight: '85vh' }}  
              key={card.elementID}
            >
              <Card 
                currentUser={currentUser}
                cardData={card}
                currentFolder={currentFolder}
              />
            </Box>
          )
        })
      }
      <Box 
        xs={{ minWidth: '100vw', maxWidth: '100vw', minHeight: '85vh' }}
        sm={{ minWidth: '46vw', maxWidth: '46vw', minHeight: '85vh' }}
        md={{ minWidth: '31vw', maxWidth: '31vw', minHeight: '85vh' }} 
        lg={{ minWidth: '24vw', maxWidth: '24vw', minHeight: '85vh' }}  
      >
        <AddCard 
          currentUser={currentUser}
          currentFolder={currentFolder}
        />
      </Box>
    </>
  )
}

const mapStateToProps = ({ data }: IAppState) => ({
  loading: data.loading,
  cards: data.elements
})

export default connect(mapStateToProps)(Board)

