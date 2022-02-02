// import React from 'react'
// import { Dropdown } from 'react-bootstrap'

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//   <a
//     href=''
//     ref={ref}
//     onClick={(e) => {
//       e.preventDefault()
//       onClick(e)
//     }}>
//     {children}&#x25bc;
//   </a>
// ))

// // forwardRef again here!
// // Dropdown needs access to the DOM of the Menu to measure it
// const CustomMenu = React.forwardRef(
//   ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
//     const [value, setValue] = useState('')

//     return (
//       <div
//         ref={ref}
//         style={style}
//         className={className}
//         aria-labelledby={labeledBy}>
//         <FormControl
//           autoFocus
//           className='mx-3 my-2 w-auto'
//           placeholder='Type to filter...'
//           onChange={(e) => setValue(e.target.value)}
//           value={value}
//         />
//         <ul className='list-unstyled'>
//           {React.Children.toArray(children).filter(
//             (child) =>
//               !value || child.props.children.toLowerCase().startsWith(value)
//           )}
//         </ul>
//       </div>
//     )
//   }
// )

// render(
//   <Dropdown>
//     <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>Custom toggle</Dropdown.Toggle>

//     <Dropdown.Menu as={CustomMenu}>
//       <Dropdown.Item eventKey='1'>Red</Dropdown.Item>
//       <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
//       <Dropdown.Item eventKey='3' active>Orange</Dropdown.Item>
//       <Dropdown.Item eventKey='1'>Red-Orange</Dropdown.Item>
//     </Dropdown.Menu>
//   </Dropdown>
// )

import React from 'react'
import { Dropdown } from 'react-bootstrap'

function DropdownMenu ({ handleNewChange, title, items }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">{title}</Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        {items.map(item => (
          <Dropdown.Item onClick={handleNewChange} name={item._id} id={item.name} key={item._id}>{item.name}</Dropdown.Item>
        ))}
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownMenu
