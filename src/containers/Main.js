import React, { useEffect } from 'react'
import Card from '../components/Card/Card'
import AddCard from '../components/Card/AddCard'
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { addNewCard } from '../store/actions/card/createNewCard'
import { fetchCardList } from '../store/actions/card/fetchCardList'
import { deleteCard } from '../store/actions/card/deleteCard'
import { changeCardTitle } from '../store/actions/card/changeCardTitle'

function Main({ currentFolder, cards, addNewCard, fetchCardList, deleteCard, changeCardTitle }) {
  useEffect(() => {
    fetchCardList(currentFolder)
  }, [])

  return (
    <Box display="flex" flexDirection="row" flexWrap="nowrap" overflow='scroll'>
      {cards.map((card) => {
        return(
          <Box p={1} minWidth='25%' maxWidth='25%' minHeight='85vh' borderRight={1} borderColor="paper" >
            <Card 
              key={card.cardID} 
              cardID={card.cardID}
              currentFolder={currentFolder}
              title={card.title}
              onDeleteCard={deleteCard}
              changeCardTitle={changeCardTitle}
            />
          </Box>
        )
      })}
      <Box minWidth='25%' maxWidth='25%' minHeight='85vh'>
        <AddCard 
          addNewCard={addNewCard} 
          currentFolder={currentFolder}
        />
      </Box>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCardList: (currentFolder) => dispatch(fetchCardList(currentFolder)),
  addNewCard: (currentFolder) => dispatch(addNewCard(currentFolder)),
  deleteCard: (currentFolder, cardID) => dispatch(deleteCard(currentFolder, cardID)),
  changeCardTitle: (currentFolder, cardID, value) => dispatch(changeCardTitle(currentFolder, cardID, value)),
})

const mapStateToProps = (state) => ({
  cards: state.cardList.cards
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

