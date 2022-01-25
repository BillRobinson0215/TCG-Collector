import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
      collections: []
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

  componentDidMount () {
    // console.log('mounted')
    this.updateCollections()
  }

  // getCollections = () => {
  // // this.setState(books: axios('url'))
  //   axios({
  //     method: 'GET',
  //     url: apiUrl + '/collection/:id',
  //     data: {
  //       name: name, owner: user
  //     }
  //   })
  // }

  onCreateCollection = (event) => {
    event.preventDefault()
    console.log(this.props.user)
    this.createCollection(event)
      .then(() => {
        this.updateCollections()
      })
  }

  updateCollections = () => {
    this.getCollection(this.props.user.token)
      .then((collections) => {
        this.setState({ collections: collections.data.collection })
        console.log(this.state.collections)
      })
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

  getCollection = (token) => {
    return axios({
      url: apiUrl + '/collection/show',
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
          <h5>{collection.name}</h5>
          <h6 style={listText}>{collection.cards.length} Cards</h6>
          <button style={buttonStyle}>View</button>
          <button style={buttonStyleDelete}>Delete</button>
        </li>
      ))

    console.log(this.props)
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
  }
}

export default Collection
