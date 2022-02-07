import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'
import { Button, Col } from 'react-bootstrap'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class Collection extends Component {
  constructor (props) {
    super(props)
    this.createCollection = this.createCollection.bind(this)
    this.onCreateCollection = this.onCreateCollection.bind(this)
    this.updateCollections = this.updateCollections.bind(this)

    this.state = {
      collectionName: '',
      collections: [],
      selectedCollection: false,
      collectionToShow: {},
      collectionToShowName: '',
      cardsToShow: [],
      cardToUpdate: '',
      quantity: 1
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  componentDidMount () {
    // console.log('mounted')
    this.updateCollections()
  }

  // creates a collection and updates the collection list view
  onCreateCollection = (event) => {
    event.preventDefault()
    console.log(this.props.user)
    this.createCollection(event)
      .then(() => {
        this.updateCollections()
      })
  }

  // updates the collection to view on the collection page
  updateCollections = () => {
    this.getCollection(this.props.user.token).then(
      (collections) => {
        this.setState({ collections: collections.data.collection })
      }
    )
  }

  // test function to troubleshoot button functionality
  consoleLog = (event, token) => {
    event.preventDefault()
    const collectionId = this.state.collectionToShow._id
    const cardId = event.target.id
    const quantity = this.state.quantity
    return axios({
      method: 'PATCH',
      url: apiUrl + '/collection/update/' + collectionId + '/' + cardId + '/' + quantity,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(this.componentDidMount())
  }

  // deletes collection when the delete button is selected on the collection page
  deleteCollection = (event, token) => {
    const collectionId = event.target.id
    return axios({
      method: 'DELETE',
      url: apiUrl + '/collection/delete/' + collectionId,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(this.componentDidMount())
  }

  // deletes a card and updates the display when the delete button is selected
  deleteCard = (event, token) => {
    const collectionId = event.target.id
    const cardId = event.target.value
    return axios({
      method: 'DELETE',
      url: apiUrl + '/collection/delete/card/' + collectionId + '/' + cardId,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(this.updateDisplay(event))
  }

  // removes the deleted card from the collection card list display
  updateDisplay = (event) => {
    const spliceCard = event.target.value
    const display = this.state.cardsToShow
    let spliceIndex = null
    spliceIndex = display.findIndex((card) => card.id === spliceCard)
    display.splice(spliceIndex, 1)
    this.setState({ cardsToShow: display })
  }

  // creates a new collection
  createCollection = function (event) {
    const user = this.props.user
    const name = event.target[0].value
    return axios({
      method: 'POST',
      url: apiUrl + '/collection/new',
      data: {
        name: name, owner: user
      }
    })
  }

  updateQuantity = (event, token) => {
    const collectionId = this.state.collectionToShow._id
    const cardId = event.target.id
    const quantity = this.state.quantity
    return axios({
      method: 'PATCH',
      url: apiUrl + '/collection/update/' + collectionId + '/' + cardId + '/' + quantity,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(this.componentDidMount())
  }

  onUpdateQuantity = (event, token) => {
    event.preventDefault()
    this.updateQuantity(event, token)
    const updateCard = event.target.id
    const display = this.state.cardsToShow
    const quantity = this.state.quantity
    let updateIndex = null
    updateIndex = display.findIndex((card) => card.id === updateCard)
    display[updateIndex].quantity = quantity
    this.setState({ cardsToShow: display })
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

  render () {
    const backToCollections = {
      marginTop: '1rem'
    }

    const buttonStyle = {
      borderRadius: '.5rem'
    }

    const cardImage = {
      borderRadius: '1rem',
      height: '25vh',
      width: '20vh',
      marginTop: '3vh',
      marginRight: '1vh',
      backgroundImage: 'cover'
    }

    const cardListTitle = {
      color: 'white',
      display: 'flex',
      justifyContent: 'center'
    }

    const listStyle = {
      listStyle: 'none',
      color: 'white',
      display: 'flex',
      marginTop: '1rem',
      textAlign: 'bottom',
      columnCount: '5',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      justifyItems: 'center'
    }

    const listText = {
      display: 'flex',
      marginTop: '.3rem',
      alignSelf: 'center'
    }

    const { setCollectionName } = this.state.collectionName
    const { setQuantity } = this.state.quantity

    if (!this.state.selectedCollection) {
      return (
        <div>
          <Form onSubmit={this.onCreateCollection}>
            <Form.Group controlId='nameSearch'>
              <Form.Label className='form-label'>Create New Collection</Form.Label>
              <Form.Control
                className='input-form'
                required
                name='collectionName'
                value={setCollectionName}
                type='collectionName'
                placeholder='Collection Name'
                onChange={this.handleChange}
              />
              <Button variant='primary' type='submit'>Submit</Button>
            </Form.Group>
          </Form>
          {/* <button onClick={getCollection}>Show Collections</button> */}
          <h4>{this.collectionName}</h4>
          <ul>{this.state.collections
            .sort((collectionA, collectionB) => {
              const nameA = collectionA.name.toLowerCase()
              const nameB = collectionB.name.toLowerCase()
              return nameA < nameB ? -1 : 1
            })
            .map((collection) => (
              <li className='collection-list' key={collection._id} style={listStyle}>
                <Col>
                  <Button variant="dark" onClick={() => this.setState({ selectedCollection: true, collectionToShow: collection, collectionToShowName: collection.name, cardsToShow: collection.cards })}>{collection.name}</Button>
                </Col>
                <Col>
                </Col>
                <Col>
                  <h6 style={listText}>{collection.cards.length} Cards</h6>
                </Col>
                <Col>
                  <Button variant="dark" style={buttonStyle} onClick={() => this.setState({ selectedCollection: true, collectionToShow: collection, collectionToShowName: collection.name, cardsToShow: collection.cards })}>View</Button>
                </Col>
                <Col>
                  <Button variant="danger" onClick={this.deleteCollection} id={collection._id} >Delete</Button>
                </Col>
              </li>
            ))}</ul>
        </div>
      )
    } else {
      return (
        <>
          <Button variant="dark" style={backToCollections} onClick={() => this.setState({ selectedCollection: false })}>Back to Collections</Button>
          <h1 style={cardListTitle}>{this.state.collectionToShowName}</h1>
          <ul>{this.state.cardsToShow
            .sort((cardA, cardB) => {
              const nameA = cardA.name.toLowerCase()
              const nameB = cardB.name.toLowerCase()
              return nameA < nameB ? -1 : 1
            })
            .map((card) => (
              <li className='card-list' style={listStyle} key={card.id}>
                <Col>
                  <img
                    className='card-info'
                    src={card.imageUrl}
                    style={cardImage}></img>
                </Col>
                <Col>
                  <h6>
                    {card.name}
                    <br />
                    {card.setName}
                  </h6>
                </Col>
                <Col>
          Copies: {card.quantity}
                </Col>
                <Col>
                  <Form onSubmit={this.onUpdateQuantity} className='quantity-form' id={card.id}>
                    <Form.Group controlId='nameSearch'>
                      <Form.Label className='form-label-quantity'>Quantity:</Form.Label>
                      <Form.Control
                        className='input-form-quantity'
                        required
                        name='quantity'
                        value={setQuantity}
                        type='Number'
                        placeholder='123'
                        onChange={this.handleChange}
                      />
                      <Button variant='success' type='submit' id={card.id}>Update</Button>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Button variant="danger" onClick={this.deleteCard} id={this.state.collectionToShow._id} value={card.id}>Delete</Button>
                </Col>
              </li>
            ))}</ul>
        </>
      )
    }
  }
}

export default withRouter(Collection)
