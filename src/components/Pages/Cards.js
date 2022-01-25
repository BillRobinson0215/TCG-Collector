import React, { Component, Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import axios from 'axios'
import mtg from 'mtgsdk'
// import mtgUrl from '../../MTGConfig'
import Dropdown from '../shared/Dropdown'
// import mtgUrl from '../API-Management/MTGconfig'

class Cards extends Component {
  constructor (props) {
    super(props)

    this.state = {
      criteriaToFind: '',
      selectedCollectionId: '',
      selectedCollectionName: 'Place Holder',
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

handleChange = (event) =>
  this.setState({
    [event.target.name]: event.target.value
  })

updateCollections = () => {
  this.getCollection(this.props.user.token).then((collections) => {
    this.setState({ collections: collections.data.collection })
    console.log(this.state.collections)
  })
}

getCollection = (token) => {
  return axios({
    url: apiUrl + '/collection/show',
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
    .where({ page: 100, pageSize: 100 })
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
        <img
          className='card-info'
          style={cardImage}
          src={card.imageUrl}></img>
        <h6 style={cardDetails}>
          {card.name}
          <br />
          {card.setName}
        </h6>
        <button style={buttonStyle} id={card}>Add to collection</button>
      </li>
    ))

  return (
    <div>
      <Fragment className='Forms'>
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
      </Fragment>
      <h2 className='selected-collection'>{this.state.selectedCollectionName}</h2>
      <div className='dropDown-menu'>
        <Dropdown title='Select Collection' items= {this.state.collections} />
      </div>
      <ul>{cards}</ul>
    </div>
  )
}
}

export default Cards
