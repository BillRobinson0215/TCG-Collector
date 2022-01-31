import React, { useEffect, useState } from 'react'

function Dropdown ({ title, items, handleOnClick }) {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [selection, setSelection] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [selectedCollectionName, setSelectedCollectionName] = useState('Select a Collection')
  // eslint-disable-next-line no-unused-vars
  const [selectedCollectionId, setSelectedCollectionId] = useState('')
  const toggle = () => setOpen(!open)

  // function handleOnClick (item) {
  //   if (!selection.some(current => current.id === item.id)) {
  //     setSelectedCollectionName([item.name])
  //     setSelectedCollectionId([item._id])
  //     console.log([item._id])
  //     window.seId = selectedCollectionId
  //     window.seName = selectedCollectionName
  //   }
  // }

  useEffect(() => {

  }, [selectedCollectionId])
  // function updateState (event) {
  //   this.state.selectedCollectionName = event.target.value
  //   selectedCollectionId.setState()
  // }

  return (
    <div className='dropdown-wrapper'>
      <h2 className='selected-collection'>{selectedCollectionName}</h2>
      <div
        tabIndex={0}
        className='dropdown-header'
        role='button'
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}>
        <div className='dropdown-header_title'>
          <h5 className='dropdown-header_title--bold'>{title} </h5>
        </div>
        <div className='dropdown-header_action'>
          <h5>{open ? '' : ''}</h5>
        </div>
      </div>
      {open && (
        <ul className='dropdown-list'>
          {items.map((item) => (
            <li
              className='dropdown-list-item'
              key={item._id}
              onClick={() => toggle(!open)}>
              <button
                className='dropdown-values'
                name={item._id}
                value={item.name}
                type='button'
                onClick={() => handleOnClick(item)}>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
