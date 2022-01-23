import React, { useEffect, useState } from 'react'
import apiUrl from '../../../API-Management/config'
import axios from 'axios'

const Collection = props => {
  const [collectionId, setCollectionId] = useState(null)
  // toggleLike = () => this.setState(prevState => {
  //   console.log('liked is currently', prevState.liked)
  //   return { liked: !prevState.liked }
  // })

  // toggleActors = () => this.setState(prevState => {
  //   return { hideActors: !prevState.hideActors }
  // })
  useEffect(() => {
    axios(`${apiUrl}/collection/show`)
    // .then(res => setBook({ book: res.data.book }))
      .then((res) => setCollectionId(res.data._id))
      .catch(console.error)
  }, [])

  const getCollection = () => {
    axios({
      url: 'https://evening-ocean-06506.herokuapp.com/cardsid/61cb40765540430db1d5e0b5',
      method: 'GET'
    })
      .then(console.log('victory'))
      .catch(console.error)
  }

  return (
    <div>
      <button onClick={getCollection}>Collection</button>
      <h4>{collectionId}</h4>
    </div>
  )
}

export default Collection
