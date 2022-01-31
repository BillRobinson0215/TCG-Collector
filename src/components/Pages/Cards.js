import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { Dropdown } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import axios from 'axios'
import mtg from 'mtgsdk'
// import mtgUrl from '../../MTGConfig'
import Dropdown from '../shared/Dropdown'
// import { cardAdded } from '../AutoDismissAlert/messages.js'
// import mtgUrl from '../API-Management/MTGconfig'

class Cards extends Component {
  constructor (props) {
    super(props)
    // this.handleOnClick = this.handleOnClick.bind(this)
    // this.state.selectedCollectionId = this.state.selectedCollectionId.bind(this)
    // this.state.selectedCollectionName = this.state.selectedCollectionName.bind(this)

    this.state = {
      criteriaToFind: '',
      selection: [],
      selectedCollectionId: '',
      selectedCollectionName: '',
      collections: [],
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

  componentDidMount () {
    // console.log('mounted')
    this.updateCollections()
  }

  // handleOnClick (event) {
  //   if (!this.state.selection.some(current => current.id === event.id)) {
  //     this.state.selectedCollectionName([event.name])
  //     this.state.selectedCollectionId([event._id])
  //     console.log([event._id])
  //     // window.seId = selectedCollectionId
  //     // window.seName = selectedCollectionName
  //   }
  // }

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

handleNewChange = (event) => {
  this.setState({ selectedCollectionId: event._id })
  console.log(this.state.selectedCollectionId)
}

updateCollections = () => {
  this.getCollection(this.props.user.token).then((collections) => {
    this.setState({ collections: collections.data.collection })
  })
}

  getCollection = (token) => {
    return axios({
      url: apiUrl + '/collection/find-collection/',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(console.error)
  }

cardSearchByName = (event) => {
  event.preventDefault()
  const nameToFind = event.target[0].value
  console.log(nameToFind)
  mtg.card
    .where({ name: nameToFind })
    .then((cards) => {
      console.log(cards)
      this.setState({ cards: cards })
    })
    .catch(console.error)
}

cardSearchBySet = (event) => {
  event.preventDefault()
  const setToFind = event.target[0].value
  const colorToFind = event.target[1].value
  mtg.card
    .where({ setName: setToFind, colors: colorToFind })
    .then((cards) => {
      console.log(cards)
      this.setState({ cards: cards })
    })
    .catch(console.error)
}

addCard = (event) => {
  const collectionId = window.seId
  const cardId = event.target.value
  console.log(window.seId)
  return axios({
    method: 'PATCH',
    url: apiUrl + '/collection/' + collectionId + '/' + cardId
  })
}

// onAddCard = (event) => {
//   const msgAlert = this.props
//   this.addCard()
//     .then(() =>
//       msgAlert({
//         heading: 'Card Added Success',
//         message: cardAdded,
//         variant: 'success'
//       })
//     )
// }

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
    marginRight: '1vh',
    backgroundImage: 'cover'
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
        <img
          className='card-info'
          style={cardImage}
          src={card.imageUrl}></img>
        <h6 style={cardDetails}>
          {card.name}
          <br />
          {card.setName}
        </h6>
        <button style={buttonStyle} value={card.id} onClick={this.addCard}>Add to collection</button>
      </li>
    ))

  return (
    <div>
      <div className='Forms'>
        <Form className='Forms' onSubmit={this.cardSearchByName}>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'>Card Search by Name</Form.Label>
            <Form.Control
              className='input-form'
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
        <Form className='Forms' onSubmit={this.cardSearchBySet}>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'>Card Search by Color</Form.Label>
            <Form.Control
              className='input-form'
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
            <Form.Control
              className='input-form'
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
      </div>
      <div className='dropDown-menu'>
        <Dropdown title='Select Collection' items= {this.state.collections} handleOnClick={this.handleNewChange} />
      </div>
      <ul>{cards}</ul>
    </div>
  )
}
}

export default Cards
