import React from 'react'
import './Modal.css'
const Modal = (props) => {
  return (props.trigger)? (
    <div className='modal'>
        <div className="modalContent">
            {props.children}
        </div>
        <button onClick={()=> props.setModal(false)}>Submit</button>
    </div>
  ):""
}

export default Modal