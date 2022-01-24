import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import axios from 'axios'
import mtg from 'mtgsdk'
// import mtgUrl from '../../MTGConfig'

// import mtgUrl from '../API-Management/MTGconfig'

class Cards extends Component {
  constructor (props) {
    super(props)

    this.state = {
      criteriaToFind: '',
      cards: []
    }
  }
  // state = {
  //   sets: []
  // }

  // lifecycle methods
  // componentDidMount () {
  //   // console.log('mounted')
  //   this.getCards()
  // }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  cardSearchByName = (event) => {
    event.preventDefault()
    const nameToFind = event.target[0].value
    console.log(nameToFind)
    mtg.card
      .where({ name: nameToFind })
      .then(cards => {
        console.log(cards)
        this.setState({ cards: cards })
      })
      .catch(console.error)
  }

  cardSearchBySet = (event) => {
    event.preventDefault()
    const setToFind = event.target[0].value
    const colorToFind = event.target[1].value
    console.log(setToFind)
    mtg.card
      .where({ setName: setToFind, colors: colorToFind })
      .then(cards => {
        console.log(cards)
        this.setState({ cards: cards })
      })
      .catch(console.error)
  }

  // onCardSearch = function (event) {
  //   event.preventDefault()
  //   $('.card').empty()
  //   const searchData = $('#cardName').val()

  //   mtgApi
  //     .cardSearch(searchData)
  //     .then(card => {
  //       const cardForm = {
  //         Name: card.cards.name,
  //         Mana_Cost: card.cards.manaCost,
  //         CMC: card.cards.convertedManaCost,
  //         Identity: card.cards.colorIdentity,
  //         Type: card.cards.type,
  //         SubType: card.cards.subtypes,
  //         Keywords: card.cards.keywords,
  //         Text: card.cards.text,
  //         Power: card.cards.power,
  //         Toughness: card.cards.toughness,
  //         Loyalty: card.cards.loyalty,
  //         Rarity: card.cards.rarity
  //       }
  //       cardId = card.cards._id
  //       cardName = card.cards.name
  //       return cardForm
  //     })
  //     .then((cardForm) => {
  //       appUi.onCardSearchSuccess(cardForm)
  //       $('#addCard').on('click', onAddCard)
  //     })
  //     .catch(appUi.onCardSearchFailure)
  // }

  // call the API
  // getCards = () => {
  //   // this.setState(books: axios('url'))
  //   axios('https://api.magicthegathering.io/v1/cards')
  //     .then((response) => this.setState({ cards: response.data.cards }))
  //     .catch(console.error)
  // }

  // render all the books

  render () {
  // console.log('rendering')
    const { criteriaToFind } = this.state.criteriaToFind

    const listStyle = {
      listStyle: 'none',
      color: 'white',
      display: 'inline-block',
      width: '36vh',
      height: '45vh'
    }

    const cardDetails = {
      textAlign: 'center'
    }

    const cardImage = {
      borderRadius: '1rem',
      height: '45vh',
      width: '35vh',
      marginTop: '3vh',
      marginRight: '1vh'
    }

    const buttonStyle = {
      borderRadius: '.5rem'
    }

    const cards = this.state.cards
      .sort((cardA, cardB) => {
        const nameA = cardA.name.toLowerCase()
        const nameB = cardB.name.toLowerCase()
        return nameA < nameB ? -1 : 1
      })
      .map((card) => (
        <li className='card-list' style={listStyle} key={card.id}>
          <img className='card-info' style={cardImage} src={card.imageUrl}></img><h6 style={cardDetails}>{card.name}<br/>{card.setName}</h6>
          <button style={buttonStyle} id={card}>Add to collection</button>
        </li>
      ))

    return (
      <div>
        <Form onSubmit={this.cardSearchByName}>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'>Card Search by Name</Form.Label>
            <Form.Control className='input-form'
              required
              name='cardName'
              value={criteriaToFind}
              type='cardName'
              placeholder='Card Name'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
        <Form onSubmit={this.cardSearchBySet}>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'>Card Search by Color</Form.Label>
            <Form.Control className='input-form'
              required
              name='setName'
              value={criteriaToFind}
              type='setName'
              placeholder='Set Name'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'></Form.Label>
            <Form.Control className='input-form'
              required
              name='color'
              value={criteriaToFind}
              type='setName'
              placeholder='Color'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
        {/* <button onClick={this.getSets}>Show Sets</button> */}
        <ul>{cards}</ul>
      </div>
    )
  }
}

export default Cards
