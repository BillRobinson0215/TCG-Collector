import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import mtgUrl from '../../MTGConfig'

// import mtgUrl from '../API-Management/MTGconfig'

class Sets extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sets: []
    }
  }
  // state = {
  //   sets: []
  // }

  // lifecycle methods
  componentDidMount () {
    // console.log('mounted')
    this.getSets()
  }

// call the API
getSets = () => {
  // this.setState(books: axios('url'))
  axios('https://api.magicthegathering.io/v1/sets')
    .then((response) => this.setState({ sets: response.data.sets }))
    .catch(console.error)
}

// render all the books

render () {
  // console.log('rendering')

  const linkStyle = {
    color: 'white',
    textDecoration: 'none'
  }

  const listStyle = {
    listStyle: 'none'
  }

  const sets = this.state.sets.sort((setA, setB) => {
    const nameA = setA.name.toLowerCase()
    const nameB = setB.name.toLowerCase()
    return nameA < nameB
      ? -1
      : 1
  }).map((set) => (
    <li style={listStyle} key={set.name}>
      <Link style={linkStyle} to={'/sets/' + set.code}>
        {set.name}
      </Link>
    </li>
  ))

  return (
    <div>
      {/* <button onClick={this.getSets}>Show Sets</button> */}
      <ul>{sets}</ul>
    </div>
  )
}
}

export default Sets
