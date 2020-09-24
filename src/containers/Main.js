// Контейнер для отображения элементов карточек с задачами
import React, { useState, useEffect } from 'react'
import Card from '../components/Card/Card'
import AddCard from '../components/Card/AddCard'
import Axios from '../axios/axios-folders'
import Box from '@material-ui/core/Box';

export default function Main(props) {

  const [data, setData] = useState({ currentCards: [] })
  
  const createCard = () => {
    return {
      title: 'Hello World'
    }
  }

  const changeTitle = (value, key) => {
    const idx = data.currentCards.findIndex((el) => el.key === key);
    const activeFolder = props.folderID
    const oldItem = data.currentCards[idx];
    const newItem = {...oldItem,
      ['title']: value
    }
    setData(({ currentCards }) => {
      const newArr = [
        ...currentCards.slice(0, idx),
        newItem,
        ...currentCards.slice(idx + 1)
      ]  
      return {
        currentCards: newArr
      }      
    })
    Axios.patch(`/folders/${activeFolder}/cards/${key}.json`, {'title': value})
  }

  const addCard = async () => {
    const activeFolder = props.folderID
    const newCard = createCard();
    await Axios.post(`/folders/${activeFolder}/cards.json`, newCard)
    .then(function (res) {
      const cardKey = ((Object.values(res.data))[0])
      newCard.key = cardKey
      Axios.patch(`/folders/${activeFolder}/cards/${cardKey}.json`, {'key': cardKey})
    })
    setData(({ currentCards }) => {
      const newArr = [
        ...currentCards,
        newCard
      ];
      return {
        currentCards: newArr
      }
    })  
  }

  const onDeleteCard = (cardID) => {
    const idx = data.currentCards.findIndex((el) => el.key === cardID)
    const activeFolderKey = props.folderID
    Axios.delete(`/folders/${activeFolderKey}/cards/${cardID}.json`)
    setData(({ currentCards }) => {
      const newArr = [
        ...currentCards.slice(0, idx),
        ...currentCards.slice(idx + 1)
      ]
      return {
        currentCards: newArr
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {  
        const activeFolder = props.folderID   
        const responseCards = await Axios.get(`/folders/${activeFolder}/cards.json`)
        const currentCards = []
        Object.values(responseCards.data).forEach((card) => {
          currentCards.push(card)
        })  
        setData({
          currentCards
        }) 
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  return (
    <Box display="flex" flexDirection="row" flexWrap="nowrap" overflow='scroll'>
      {data.currentCards.map((card) => {
        return(
          <Box p={1} minWidth='25%' maxWidth='25%' minHeight='85vh' borderRight={1} borderColor="paper" >
            <Card 
              key={card.key} 
              cardID={card.key}
              activeFolderKey={props.folderID}
              title={card.title}
              onDeleteCard={onDeleteCard}
              changeTitle={changeTitle}
            />
          </Box>
        )
      })}
      <Box minWidth='25%' maxWidth='25%' minHeight='85vh'>
        <AddCard addCard={addCard} />
      </Box>
    </Box>
  )
}

