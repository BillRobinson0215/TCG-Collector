import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { Dropdown } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import axios from 'axios'
import mtg from 'mtgsdk'
// import mtgUrl from '../../MTGConfig'
import DropdownMenu from '../shared/Dropdown2'
import Row from 'react-bootstrap/Row'
import { cardAdded, cardAddFailed } from '../AutoDismissAlert/messages.js'
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
      selectedCollectionName: 'Select a Collection',
      collections: [],
      cards: []
    }
  }

  componentDidMount () {
    this.updateCollections()
  }

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

handleNewChange = (event) => {
  this.setState({ selectedCollectionId: [event.target.name] })
  this.setState({ selectedCollectionName: [event.target.id] })
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
  const collectionId = this.state.selectedCollectionId
  const cardId = event.target.value
  return axios({
    method: 'PATCH',
    url: apiUrl + '/collection/' + collectionId + '/' + cardId
  })
}

onAddCard = (event) => {
  event.preventDefault()

  const { msgAlert } = this.props

  this.addCard(event)
    .then(() =>
      msgAlert({
        heading: 'Card Add Success',
        message: cardAdded,
        variant: 'success'
      })
    )
    .catch(() => {
      msgAlert({
        heading: 'Failed to Add Card: ',
        message: cardAddFailed,
        variant: 'danger'
      })
    })
}

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
        <Row className='quantity-row'>
          <p>#: <input className="input-form" id='card-quantity'></input></p>
        </Row>
        <button style={buttonStyle} value={card.id} onClick={this.onAddCard}>Add to collection</button>
      </li>
    ))

  return (
    <div>
      <div className='Forms'>
        <Form className='Forms' onSubmit={this.cardSearchByName}>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'><h4>Card Search by Name</h4></Form.Label>
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
        <Form className='Forms' id='setSearch' onSubmit={this.cardSearchBySet}>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'><h4>Card Search by Color</h4><h12 className="search-disclaimer">*Be as specific as possible in your search only 100 items returned per request</h12></Form.Label>
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
        <DropdownMenu items={this.state.collections} title={this.state.selectedCollectionName} handleNewChange={this.handleNewChange}/>
      </div>
      <ul>{cards}</ul>
    </div>
  )
}
}

export default Cards
