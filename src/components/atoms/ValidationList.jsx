import React from 'react'

const ValidationList = ({ validaciones }) => {
  return (
    <ul className='list-unstyled mt-2'>
      {validaciones.map((item, index) => (
        <li key={index} className={item.cumple ? 'text-success' : 'text-danger'}>
          <i className={`fa-solid ${item.cumple ? 'fa-circle-check' : 'fa-circle-xmark'} me-1`}></i>
          {item.mensaje}
        </li>
      ))}
    </ul>
  )
}

export default ValidationList