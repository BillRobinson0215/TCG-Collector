import React, { useState } from 'react'

function Dropdown ({ title, items, multiSelect = false }) {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)

  function handleOnClick (item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item])
      }
    }
  }

  function updateState (event) {
    this.state.selectedCollectionName = event.target.value
    selectedCollectionId.setState()
  }

  return (
    <div className='dropdown-wrapper'>
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
            <li className='dropdown-list-item' key={item._id}>
              <button
                className='dropdown-values'
                id={item._id}
                value={item.name}
                type='button'
                onClick={() => handleOnClick(item)}
                onClickCapture={() => updateState()}>
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
