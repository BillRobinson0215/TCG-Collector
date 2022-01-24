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
  // toggleLike = () => this.setState(prevState => {
  //   console.log('liked is currently', prevState.liked)
  //   return { liked: !prevState.liked }
  // })

  // toggleActors = () => this.setState(prevState => {
  //   return { hideActors: !prevState.hideActors }
  // })

  // useEffect(() => {
  //   axios(`${apiUrl}/collection/show`)
  //   // .then(res => setBook({ book: res.data.book }))
  //     .then((res) => setCollectionName(res.data.name))
  //     .catch(console.error)
  // }, [])

  // componentDidMount () {
  //   // console.log('mounted')
  //   this.getCollections()
  // }

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
    const collection = this.props.user.collections
    console.log(this.props.user)
    this.createCollection(event)
    console.log(collection)
    this.props.user.collections.push()
    console.log(this.props.user)
    console.log('end of onCreateCollection')
  }

  createCollection = function (event) {
    const user = this.props.user
    const name = event.target[0].value
    axios({
      method: 'POST',
      url: apiUrl + '/collection/new',
      data: {
        name: name, owner: user
      }
    })
  }

  // const getCollection = () => {
  //   axios({
  //     url: apiUrl + '/collection/show',
  //     method: 'GET'
  //   })
  //     .then(console.log('victory'))
  //     .catch(console.error)
  // }

  render () {
    const { setCollectionName } = this.state.collectionName
    console.log(this.props)
    return (
      <div>
        <Form onSubmit={this.onCreateCollection}>
          <Form.Group controlId='nameSearch'>
            <Form.Label className='form-label'>Create New Collection</Form.Label>
            <Form.Control className='input-form'
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
      </div>
    )
  }
}

export default Collection
