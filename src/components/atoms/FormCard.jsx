import React from 'react'

const FormCard = ({ title, children }) => {
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-4 shadow form-card-box'>
        <h2 className='text-center mb-4'>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default FormCard