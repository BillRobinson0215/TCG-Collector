import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'

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
      cardsToShow: []
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

  onCreateCollection = (event) => {
    event.preventDefault()
    console.log(this.props.user)
    this.createCollection(event)
      .then(() => {
        this.updateCollections()
      })
  }

  updateCollections = () => {
    this.getCollection(this.props.user.token).then(
      (collections) => {
        this.setState({ collections: collections.data.collection })
        console.log(this.state.collections)
      }
    )
  }

  consoleLog = () => {
    console.log(this.state.collectionToShow)
  }

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

  getCollectionToShow =(collection,
    token) => {
    return axios({
      url: apiUrl + '/collection/show/' + collection,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(console.error)
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
    const listStyle = {
      listStyle: 'none',
      color: 'white',
      display: 'flex',
      marginTop: '1rem',
      textAlign: 'bottom',
      columnCount: '5'
    }

    const listText = {
      display: 'flex',
      marginTop: '.3rem',
      alignSelf: 'center'
    }

    const buttonStyle = {
      borderRadius: '.5rem',
      position: 'absolute',
      right: '15rem',
      display: 'flex-box',
      justifySelf: 'right',
      alignSelf: 'right'
    }

    const buttonStyleDelete = {
      borderRadius: '.5rem',
      position: 'absolute',
      right: '10rem',
      display: 'flex',
      justifySelf: 'right',
      alignSelf: 'right'
    }

    const { setCollectionName } = this.state.collectionName
    const collections = this.state.collections
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
            <Button variant="dark" style={buttonStyle} onClick={() => this.setState({ selectedCollection: true, collectionToShow: collection })}>View</Button>
            <Button variant="danger" onClick={this.deleteCollection} id={collection._id} style={buttonStyleDelete}>Delete</Button>
          </Col>
        </li>
      ))

    const cards = this.state.cardsToShow
      .sort((cardA, cardB) => {
        const nameA = cardA.name.toLowerCase()
        const nameB = cardB.name.toLowerCase()
        return nameA < nameB ? -1 : 1
      })
      .map((card) => (
        <li className='card-list' style={listStyle} key={card.id}>
          <img
            className='card-info'
            src={card.imageUrl}></img>
          <h6>
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
          <ul>{collections}</ul>
        </div>
      )
    } else {
      return (
        <>
          <Button variant="dark" onClick={() => this.setState({ selectedCollection: false })}>Back to Collections</Button>
          <Button onClick={this.consoleLog}>Selection?</Button>
          <p>{this.state.collectionToShowName}</p>
          <ul>{cards}</ul>
        </>
      )
    }
  }
}

export default withRouter(Collection)
